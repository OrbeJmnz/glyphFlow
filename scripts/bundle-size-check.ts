// Bundle budget de v0.1 — "importa un icono, paga por ese icono", medido en CI, no prometido.
// Corre esbuild directo (sin el wrapper de Angular) contra el FESM ya construido, con
// @angular/core externo para aislar SOLO lo que aporta glyphflow. Requiere `ng build glyphflow`
// antes (lo hace `npm run bundle-check`).
import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const FESM = new URL('../dist/glyphflow/fesm2022/glyphflow.mjs', import.meta.url).pathname.replace(
  /^\/([A-Za-z]):/,
  '$1:',
);
const FESM_MORPH = new URL(
  '../dist/glyphflow/fesm2022/glyphflow-morph.mjs',
  import.meta.url,
).pathname.replace(/^\/([A-Za-z]):/, '$1:');

const CASES = [
  {
    name: 'core — solo el componente, sin ningún icono',
    // La fila del README que promete ESTE número. Ver `PUBLICACIONES` y `verificarDocs()` abajo.
    filaReadme: 'The component alone, no icons',
    entry: `import { MaxIconComponent } from '${FESM.replace(/\\/g, '/')}'; console.log(MaxIconComponent);`,
    // El runtime compartido que paga TODO consumidor, use un icono o mil: el componente, su
    // template y el motor de auto-draw. El presupuesto de v0.1 era <10KB gzip; se vigila aparte de
    // los iconos porque una extensión del modelo (ej. el soporte de `fill`) cae aquí, no por icono.
    maxGzipBytes: 10 * 1024,
  },
  {
    name: 'A — import individual (tree-shakeable)',
    filaReadme: 'One icon (`[iconDef]="bellIcon"`)',
    entry: `import { bellIcon } from '${FESM.replace(/\\/g, '/')}'; console.log(bellIcon);`,
    // Presupuesto: vocabulario de coreografía (track/rotateSeq/icon/...) + UN icono, medido en
    // ~3.5KB gzip real. 5KB da margen sin dejar de detectar una regresión real (el catálogo
    // completo son ~94KB — si esto se acerca, algo volvió a arrastrar los 1766 que no se usan).
    maxGzipBytes: 5 * 1024,
  },
  {
    name: 'B — name= (registro completo, ruta de conveniencia)',
    filaReadme: 'The whole catalog (`name="bell"`)',
    entry: `import { MaxIconComponent, provideIconCatalog, ANIMATED_ICONS } from '${FESM.replace(/\\/g, '/')}'; console.log(MaxIconComponent, provideIconCatalog, ANIMATED_ICONS);`,
    // Sin presupuesto estricto — se ACEPTA que cargue todo, solo se reporta para tener el número.
    maxGzipBytes: null as number | null,
  },
  {
    name: 'morph — GfIconMorphComponent, live=false por default',
    // Sin fila en el README: esto es un budget de CI, no una cifra publicada — ver la nota de
    // `filaReadme?` abajo. Existe porque el motor "en vivo" (`live-morph.ts`) se importa ESTÁTICO
    // desde el componente, así que hasta quien nunca pone `live=true` paga por él. Medido a mano
    // (esbuild+gzip) al agregar ese motor: 11.99KB → 12.56KB (+0.57KB, ~5%).
    //
    // Subido de 15KB a 21KB al agregar `curated-morphs.ts` (9 pares curados: sun/moon, copy/check,
    // volume/volume-off, y el patrón "-off" de eye/bell/pin/star/heart + eye/eye-closed). Estos
    // pares NO son tree-shakeables entre sí — `findCuratedMorph` compara el `d` canónico de
    // CUALQUIER llamada contra TODO el registro en runtime, así que un consumidor que solo usa
    // bell→bell-ring paga igual por los 9. Medido: 14.51KB → 18.20KB (+3.69KB por los 6 pares
    // nuevos, ~0.6KB c/u). 21KB deja margen para el crecimiento normal del registro sin dejar de
    // cazar una regresión real — agregar el DÉCIMO par curado probablemente vuelva a acercarse al
    // límite, y en ese punto toca decidir de nuevo, no ampliar en silencio.
    filaReadme: null as string | null,
    entry: `import { GfIconMorphComponent } from '${FESM_MORPH.replace(/\\/g, '/')}'; console.log(GfIconMorphComponent);`,
    maxGzipBytes: 21 * 1024,
  },
];

/**
 * El README dice, literal, *"Measured in CI on every push, not promised"*. Esto es lo que hace
 * cierta esa frase — y no es hipotético: hasta el 2026-08-23 la tabla imprimía 3.74 / 4.09 / 94.48
 * mientras el CI medía 4.57 / 4.83 / 119.11. Se congeló cuando el catálogo tenía 180 curados, el
 * catálogo creció a 911, y nadie se enteró porque **nada comparaba las dos cosas**.
 *
 * Tolerancia del 2%: absorbe el ruido de agregar un icono sin obligar a editar el README por cada
 * commit, pero cualquier deriva de verdad la caza — la que se coló era del 26%.
 *
 * Se hace AQUÍ y no en un script aparte a propósito: quien mide es quien afirma. Un segundo script
 * necesitaría su propia copia de los números, que es exactamente el problema que viene a resolver.
 */
const TOLERANCIA = 0.02;

/**
 * Dónde se publica cada cifra. **Son DOS sitios, no uno**, y eso lo enseñó el propio bug: se
 * arreglaron los README y la tabla de `Getting started` del sitio siguió imprimiendo 3.74 / 4.09 /
 * 94.48 durante horas, porque la guarda solo miraba `README.md`. Una guarda que cubre la mitad de
 * los lugares da la peor de las señales: verde, y la mentira sigue publicada.
 *
 * `cifras.ts` es la única copia del lado del sitio — la plantilla lee de ahí, no escribe números.
 */
const PUBLICACIONES: { archivo: string; patron: (fila: string, clave: string) => RegExp }[] = [
  // `| The component alone, no icons | **4.57 KB** |`
  {
    archivo: '../README.md',
    patron: (fila) => new RegExp(`\\|\\s*${escapar(fila)}\\s*\\|\\s*\\*\\*([0-9.]+) KB\\*\\*`),
  },
  /*
   * `README.es.md` lleva la MISMA tabla con las filas traducidas, y hasta hoy no la miraba nadie:
   * el mensaje de error de este script acababa diciendo «recuerda que README.es.md lleva la misma
   * tabla», o sea confiando en que alguien se acordara. Es por ese hueco exacto por el que
   * `MaxIconComponent` sobrevivió toda la v2 en el README español.
   */
  {
    archivo: '../README.es.md',
    patron: (fila) => new RegExp(`\\|\\s*${escapar(FILA_ES[fila])}\\s*\\|\\s*\\*\\*([0-9.]+) KB\\*\\*`),
  },
  // `bundleCoreKb: 4.57,`
  {
    archivo: '../projects/playground/src/app/core/cifras.ts',
    patron: (_fila, clave) => new RegExp(`${clave}:\\s*([0-9.]+),`),
  },
];

/** La misma fila, como está escrita en el README español. */
const FILA_ES: Record<string, string> = {
  'The component alone, no icons': 'Solo el componente, sin iconos',
  'One icon (`[iconDef]="bellIcon"`)': 'Un icono individual (`[iconDef]="bellIcon"`)',
  'The whole catalog (`name="bell"`)': 'El catálogo completo (`name="bell"`)',
};

/** La clave de `CIFRAS` que publica cada escenario. */
const CLAVE_CIFRAS: Record<string, string> = {
  'The component alone, no icons': 'bundleCoreKb',
  'One icon (`[iconDef]="bellIcon"`)': 'pesoIconoKb',
  'The whole catalog (`name="bell"`)': 'bundleCatalogoKb',
};

const escapar = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function verificarDocs(medidos: Map<string, number>): boolean {
  let ok = true;

  for (const { archivo, patron } of PUBLICACIONES) {
    const texto = readFileSync(new URL(archivo, import.meta.url), 'utf8');
    for (const [fila, kb] of medidos) {
      const m = texto.match(patron(fila, CLAVE_CIFRAS[fila]));
      if (!m) {
        console.error(`  ✗ ${archivo}: no encuentro la cifra de "${fila}".`);
        ok = false;
        continue;
      }
      const publicado = Number(m[1]);
      const desvio = Math.abs(publicado - kb) / kb;
      if (desvio > TOLERANCIA) {
        console.error(
          `  ✗ ${archivo} miente en "${fila}": publica ${publicado} KB, el CI mide ${kb.toFixed(2)} KB ` +
            `(${(desvio * 100).toFixed(1)}% de desvío).`,
        );
        ok = false;
      }
    }
  }

  if (ok) console.log('\nCifras publicadas: README y el sitio coinciden con lo medido.');
  return ok;
}

async function main() {
  const tmp = mkdtempSync(join(tmpdir(), 'glyphflow-bundle-check-'));
  let failed = false;
  const medidos = new Map<string, number>();

  for (const c of CASES) {
    const entryFile = join(tmp, 'entry.mjs');
    writeFileSync(entryFile, c.entry, 'utf8');

    const result = await build({
      entryPoints: [entryFile],
      bundle: true,
      minify: true,
      format: 'esm',
      platform: 'browser',
      external: ['@angular/core', '@angular/common'],
      write: false,
    });

    const code = result.outputFiles[0].text;
    const raw = Buffer.byteLength(code, 'utf8');
    const gzip = gzipSync(code).length;

    const budget = c.maxGzipBytes ? ` (presupuesto: ${(c.maxGzipBytes / 1024).toFixed(1)}KB gzip)` : '';
    console.log(`${c.name}: ${(raw / 1024).toFixed(2)}KB raw / ${(gzip / 1024).toFixed(2)}KB gzip${budget}`);

    if (c.maxGzipBytes && gzip > c.maxGzipBytes) {
      console.error(`  ✗ EXCEDE el presupuesto — algo está arrastrando más de lo esperado.`);
      failed = true;
    }

    // `filaReadme: null` = presupuesto de CI sin fila publicada (ver el caso `morph` arriba) — no
    // entra a `verificarDocs`, que solo compara lo que el README/cifras.ts prometen de verdad.
    if (c.filaReadme) medidos.set(c.filaReadme, gzip / 1024);
  }

  if (!verificarDocs(medidos)) failed = true;

  rmSync(tmp, { recursive: true, force: true });

  if (failed) {
    console.error(
      '\nbundle-size-check FALLÓ — revisa qué import rompió el tree-shaking (ver v0.1 en el plan).',
    );
    process.exit(1);
  }
  console.log('\nbundle-size-check OK.');
}

main();
