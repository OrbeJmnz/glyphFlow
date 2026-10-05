// Bundle budget de v0.1 — "importa un icono, paga por ese icono", medido en CI, no prometido.
// Corre esbuild directo (sin el wrapper de Angular) contra el FESM ya construido, con
// @angular/core externo para aislar SOLO lo que aporta glyphflow. Requiere `ng build glyphflow`
// antes (lo hace `npm run bundle-check`).
import { build, type Plugin } from 'esbuild';
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

const FESM_BOTS = new URL(
  '../dist/glyphflow/fesm2022/glyphflow-bots.mjs',
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
    // ~3.5KB gzip real. El techo da margen sin dejar de detectar una regresión real (el catálogo
    // completo son ~94KB — si esto se acerca, algo volvió a arrastrar los 1766 que no se usan).
    //
    // **Este caso NO mide el icono solo: trae el componente entero.** La definición de un
    // componente de Angular (`ɵɵdefineComponent`) es un efecto de nivel de módulo que esbuild no
    // puede tirar del FESM, así que viaja aunque el entry solo importe `bellIcon`. Comprobado
    // buscando el selector en la salida de los dos casos, y la aritmética sola ya lo delataba: si
    // fuera el icono solo costaría 4.59KB gzip, imposible cuando los 1767 juntos son 169KB.
    // Consecuencia: `core` NO es un presupuesto aparte del que quede aire — está DENTRO de éste, y
    // todo lo que se le agregue al componente se cobra aquí, que es el techo apretado.
    //
    // Subido de 5KB a 5.5KB el 2026-09-03 por el `reveal` universal con fantasma (+0.45KB):
    // 4.59 → 5.04. Esa nota decía que una SEGUNDA subida significaría que el techo dejó de
    // servir — y aun así, subido de nuevo a 6KB el 2026-09-04 por el `flicker` universal
    // (+0.16KB: 5.44 → 5.60), decisión explícita de Orbe ("el presupuesto no debería ser un
    // limitante, es algo que podemos seguir aumentando"). El tripwire sigue siendo real: existe
    // para cazar el catálogo colándose entero (~175KB), y 5.60 no lo amenaza ni de lejos. Lo que
    // cambió es el criterio: el techo ya no se toca solo cuando alguien mide y decide que vale la
    // pena, no cuando el número se acerca solo.
    maxGzipBytes: 6 * 1024,
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
    // nuevos, ~0.6KB c/u).
    //
    // Subido de 21KB a 22KB el 2026-09-06 por `animateAtRest` (`GfIconComponent` importado
    // ESTÁTICO desde `gf-icon-morph.component.ts` — ver el comentario de ese import: un
    // `import('glyphflow')` dinámico se probó primero y empeoró a 259KB gzip, porque esbuild no
    // tree-shakea qué exporta un barrel resuelto detrás de una promesa sin `splitting`). Medido:
    // 21.31KB real contra el techo viejo de 21KB. Mismo criterio que `core` 5→5.5→6KB: decisión
    // explícita de Orbe de subir el presupuesto en vez de descontinuar el input o aislarlo en su
    // propio entry point — el ahorro de ese aislamiento (~0.3KB) no justificaba la superficie
    // pública nueva. 22KB deja margen; la próxima feature que toque este entry point vuelve a medir.
    //
    // Subido de 22KB a 22.5KB el 2026-09-28: este caso incluye `GfIconComponent` entero (el de
    // reposo), así que lo que crece el componente se cobra aquí también. El input `touch` y el
    // reconocimiento de controles que son web components (`ion-button` y similares, por su shadow
    // root) lo llevaron de 21.98 a 22.04KB, medido. Mismo criterio de siempre: se midió y el costo
    // (~0.06KB) vale la feature; el tripwire sigue cazando lo que importa, el catálogo colándose.
    filaReadme: null as string | null,
    entry: `import { GfIconMorphComponent } from '${FESM_MORPH.replace(/\\/g, '/')}'; console.log(GfIconMorphComponent);`,
    maxGzipBytes: 22.5 * 1024,
  },
  {
    name: 'morph + 1 intent — un gesto curado, no los seis',
    // La razón de ser de este caso: los intents son SEIS consts, cada uno con dos figuras — doce
    // iconos en el mismo módulo. Se exportan uno por uno precisamente para que quien importe
    // `COPY_INTENT` no pague las figuras de los otros cinco; un registro por nombre (`intent="copy"`)
    // los habría hecho a todos alcanzables desde el componente y habría arrastrado los doce.
    //
    // El presupuesto es el del caso `morph` (22KB, ver su nota de `animateAtRest`) más el par de
    // figuras que este intent SÍ usa. Si el tree-shaking dejara de podar, aquí se verían los doce
    // y el número saltaría, no crecería.
    filaReadme: null as string | null,
    entry: `import { GfIconMorphComponent, COPY_INTENT } from '${FESM_MORPH.replace(/\\/g, '/')}'; console.log(GfIconMorphComponent, COPY_INTENT);`,
    maxGzipBytes: 23 * 1024,
  },
  {
    name: 'bots — solo los estados: importar uno NO arrastra el motor',
    // Sin fila en el README todavía: los bots no están publicados. Este caso existe desde el andamio
    // (F0) para que el entry point tenga su fila desde el primer día; el techo de 1KB es el del
    // andamio y se fija de verdad en F2, cuando el motor y `<gf-bot>` existan y se midan.
    // Si este número salta sin que `bots/` haya crecido, algo del primario se coló por una ruta
    // relativa (regla 6 de CLAUDE.md).
    filaReadme: null as string | null,
    entry: `import { GF_BOT_STATES, isGfBotState } from '${FESM_BOTS.replace(/\\/g, '/')}'; console.log(GF_BOT_STATES, isGfBotState);`,
    maxGzipBytes: 1 * 1024,
    optimizadorAngular: true,
  },
  {
    name: 'bots + createBot — el motor completo, sin ninguna forma',
    // El motor entero (gestos, emociones, kawaii, rutinas, arrastre, juguetes, agente) sin una sola
    // forma: lo que cuesta TENER un bot antes de elegir cuál. Las formas suman aparte, cada una la
    // suya. El caso de arriba (solo los estados) cuida lo contrario: que importar un estado NO
    // arrastre el motor — ese era el spread de `K` en una constante de módulo.
    //
    // Medido el 2026-10-02 (F2, con el optimizador de Angular aplicado): 232KB raw / 68.2KB gzip, repartido parejo (hats 25KB, rutinas 22KB,
    // variantes de trabajo 17KB, esqueleto 16KB, juguetes 14KB, gestos 13KB…): es coreografía, no un
    // import colado. Techo con ~3% de holgura. Con una forma y el componente ver los casos de abajo.
    filaReadme: null as string | null,
    entry: `import { createBot } from '${FESM_BOTS.replace(/\\/g, '/')}'; console.log(createBot);`,
    maxGzipBytes: 70 * 1024,
    optimizadorAngular: true,
  },
  {
    name: 'bots + createBot + catShape — un bot con UNA forma',
    // El caso real de quien usa el gato: el motor más SU forma, no las otras cinco ni las diez nocturnas.
    // Si salta, una forma está reteniendo a las demás (una llamada sin `@__PURE__` o un acceso a
    // propiedad a nivel de módulo: `d: CAT.body` arrastraba la forma entera al caso de solo estados).
    filaReadme: null as string | null,
    entry: `import { createBot, catShape } from '${FESM_BOTS.replace(/\\/g, '/')}'; console.log(createBot, catShape);`,
    maxGzipBytes: 78 * 1024,
    optimizadorAngular: true,
  },
  {
    name: 'bots + <gf-bot> + catShape — lo que paga quien usa el componente con una forma',
    // El caso del consumidor real: el componente (con sus ~45KB de CSS de pieles, que viajan DENTRO del
    // componente a propósito: un solo import y funciona) más el motor y una forma. Medido el 2026-10-02.
    filaReadme: null as string | null,
    entry: `import { GfBotComponent, catShape } from '${FESM_BOTS.replace(/\\/g, '/')}'; console.log(GfBotComponent, catShape);`,
    maxGzipBytes: 86 * 1024,
    optimizadorAngular: true,
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

/**
 * Envuelve cada declaración parcial de Angular (`i0.ɵɵngDeclareComponent|Factory|ClassMetadata(...)`) en una
 * IIFE anotada `@__PURE__`: lo mismo que hace el optimizador del Angular CLI en un build de producción, y
 * por lo mismo un componente que nadie usa se cae del bundle. Anotar solo la llamada NO basta: sus
 * argumentos traen accesos a propiedad (`i0.ChangeDetectionStrategy.OnPush`) que esbuild no puede probar
 * puros, y los conserva — con ellos, la clase entera. Se envuelve la llamada completa, con su paréntesis
 * de cierre (escaneo consciente de cadenas), para que esbuild la juzgue como una sola unidad.
 */
function purificarDeclaraciones(src: string): string {
  const re = /\bi0\.ɵɵngDeclare(?:Component|Factory|ClassMetadata|ClassMetadataAsync)\(/g;
  let out = '';
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length;
    let depth = 1;
    while (i < src.length && depth > 0) {
      const c = src[i];
      if (c === '"' || c === "'" || c === '`') {
        for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++;
      } else if (c === '(') depth++;
      else if (c === ')') depth--;
      i++;
    }
    out += src.slice(last, m.index) + '/* @__PURE__ */ (() => ' + src.slice(m.index, i) + ')()';
    last = i;
    re.lastIndex = i;
  }
  return out + src.slice(last);
}

/** Plugin de esbuild que aplica `purificarDeclaraciones` a los FESM de dist (ver `optimizadorAngular`). */
const pureAngular: Plugin = {
  name: 'angular-pure',
  setup(b) {
    b.onLoad({ filter: /fesm2022[\\/].*\.mjs$/ }, (args) => ({
      contents: purificarDeclaraciones(readFileSync(args.path, 'utf8')),
      loader: 'js',
    }));
  },
};

/**
 * Iconos y bots son INDEPENDIENTES en las dos direcciones: quien solo quiere iconos no carga nada
 * de bots, y quien solo quiere bots no carga nada de iconos. Medirlo con un bundle no basta (un
 * import suelto se cuela por una ruta que ningún caso ejercita), así que se prohíbe en la fuente:
 *  - el FESM de bots no importa del primario (`glyphflow`) ni de morph;
 *  - el FESM del primario no importa de bots.
 * Un `import` del primario dentro de bots arrastraba el componente de iconos entero (+5.5 KB gzip).
 */
function verificarIndependencia(): boolean {
  // Solo sentencias reales: anclado al inicio de línea, así un comentario que mencione
  // `from 'glyphflow'` (el FESM conserva los JSDoc) no cuenta como import.
  const importa = (src: string, paquete: string): boolean => {
    const p = paquete.replace(/[/.]/g, '\\$&');
    return new RegExp(
      `(?:^|\\n)[ \\t]*(?:import|export)\\s[^;]*?from\\s*['"]${p}['"]|(?:^|\\n)[ \\t]*import\\s*['"]${p}['"]`,
    ).test(src);
  };
  let ok = true;
  const bots = readFileSync(FESM_BOTS, 'utf8');
  for (const p of ['glyphflow', 'glyphflow/morph']) {
    if (importa(bots, p)) {
      console.error(`  ✗ glyphflow/bots importa de '${p}': quien solo quiere bots cargaría iconos.`);
      ok = false;
    }
  }
  if (importa(readFileSync(FESM, 'utf8'), 'glyphflow/bots')) {
    console.error(`  ✗ el primario importa de 'glyphflow/bots': quien solo quiere iconos cargaría bots.`);
    ok = false;
  }
  if (ok) console.log('independencia iconos ⇄ bots: el FESM de bots no importa del primario y viceversa.');
  return ok;
}

async function main() {
  const tmp = mkdtempSync(join(tmpdir(), 'glyphflow-bundle-check-'));
  let failed = !verificarIndependencia();
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
      // Lo que hace el optimizador del Angular CLI en un build de producción: las declaraciones parciales
      // (`ɵɵngDeclare*`) son puras, así que un componente que nadie usa se cae del bundle. Sin esto esbuild
      // las trata como efectos y el componente viaja pegado a cualquier import del entry point. La opción
      // `pure` de esbuild NO sirve aquí: solo marca identificadores globales, y `i0` es un import.
      plugins: c.optimizadorAngular ? [pureAngular] : [],
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
