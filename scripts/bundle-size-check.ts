// Bundle budget de v0.1 — "importa un icono, paga por ese icono", medido en CI, no prometido.
// Corre esbuild directo (sin el wrapper de Angular) contra el FESM ya construido, con
// @angular/core externo para aislar SOLO lo que aporta glyphflow. Requiere `ng build glyphflow`
// antes (lo hace `npm run bundle-check`).
import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const FESM = new URL('../dist/glyphflow/fesm2022/glyphflow.mjs', import.meta.url).pathname.replace(
  /^\/([A-Za-z]):/,
  '$1:',
);

const CASES = [
  {
    name: 'A — import individual (tree-shakeable)',
    entry: `import { bellIcon } from '${FESM.replace(/\\/g, '/')}'; console.log(bellIcon);`,
    // Presupuesto: runtime compartido (track/rotateSeq/icon/...) + UN icono, medido en ~3.5KB
    // gzip real. 5KB da margen sin dejar de detectar una regresión real (el registro completo son
    // ~16.6KB — si esto se acerca a eso, algo volvió a arrastrar los 183 iconos que no se usan).
    maxGzipBytes: 5 * 1024,
  },
  {
    name: 'B — name= (registro completo, ruta de conveniencia)',
    entry: `import { MaxIconComponent, provideIconCatalog, ANIMATED_ICONS } from '${FESM.replace(/\\/g, '/')}'; console.log(MaxIconComponent, provideIconCatalog, ANIMATED_ICONS);`,
    // Sin presupuesto estricto — se ACEPTA que cargue todo, solo se reporta para tener el número.
    maxGzipBytes: null as number | null,
  },
];

async function main() {
  const tmp = mkdtempSync(join(tmpdir(), 'glyphflow-bundle-check-'));
  let failed = false;

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
  }

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
