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

const CASES = [
  {
    name: 'core — solo el componente, sin ningún icono',
    // La fila del README que promete ESTE número. Ver `verificarREADME()` abajo.
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

function verificarREADME(medidos: Map<string, number>): boolean {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  let ok = true;

  for (const [fila, kb] of medidos) {
    // `| <fila> | **4.57 KB** |`
    const escapada = fila.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = readme.match(
      new RegExp(`\\|\\s*${escapada}\\s*\\|\\s*\\*\\*([0-9.]+) KB\\*\\*`),
    );
    if (!m) {
      console.error(`  ✗ README: no encuentro la fila "${fila}" en la tabla de bundle.`);
      ok = false;
      continue;
    }
    const publicado = Number(m[1]);
    const desvio = Math.abs(publicado - kb) / kb;
    if (desvio > TOLERANCIA) {
      console.error(
        `  ✗ README miente en "${fila}": publica ${publicado} KB, el CI mide ${kb.toFixed(2)} KB ` +
          `(${(desvio * 100).toFixed(1)}% de desvío). Actualiza la tabla en README.md Y en README.es.md.`,
      );
      ok = false;
    }
  }

  if (ok) console.log('\nREADME: la tabla de bundle coincide con lo medido.');
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

    medidos.set(c.filaReadme, gzip / 1024);
  }

  if (!verificarREADME(medidos)) failed = true;

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
