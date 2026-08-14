// npm pack + instalar en un proyecto limpio + import real. Un `ng build` en verde no garantiza un
// paquete npm que funcione: detecta roturas de `exports`/`sideEffects`/tipos que ng build no ve,
// porque arma el paquete EXACTAMENTE como lo instalaría un consumidor real (tarball, no symlink).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:');
const DIST = join(ROOT, 'dist', 'glyphflow');

async function main() {
  const tmp = mkdtempSync(join(tmpdir(), 'glyphflow-pack-check-'));
  console.log(`Workspace temporal: ${tmp}`);

  console.log('1. npm pack sobre dist/glyphflow...');
  execFileSync('npm', ['pack', '--pack-destination', tmp], { cwd: DIST, stdio: 'inherit', shell: true });
  const tarball = readdirSync(tmp).find((f) => f.endsWith('.tgz'));
  if (!tarball) throw new Error('npm pack no generó ningún .tgz');
  const tarballPath = join(tmp, tarball);

  console.log('2. Instalando el .tgz en un proyecto limpio (sin symlinks, como un consumidor real)...');
  writeFileSync(join(tmp, 'package.json'), JSON.stringify({ name: 'pack-check', private: true }), 'utf8');
  execFileSync(
    'npm',
    [
      'install',
      tarballPath,
      '@angular/core@22',
      '@angular/common@22',
      '@angular/compiler@22',
      '--no-audit',
      '--no-fund',
    ],
    { cwd: tmp, stdio: 'inherit', shell: true },
  );

  console.log('3. Import real desde el paquete instalado...');
  const testFile = join(tmp, 'test-import.mjs');
  writeFileSync(
    testFile,
    `// Plain Node no corre el Angular Linker (eso solo lo hacen los builders de Angular/webpack) —
// una librería publicada correctamente usa "partial compilation", que necesita el linker O el
// compilador JIT como fallback. Este import es ESE fallback, no un indicio de que algo esté mal.
import '@angular/compiler';
import { bellIcon, MaxIconComponent, provideIconCatalog, ANIMATED_ICONS, resolveIconName } from 'glyphflow';
if (!bellIcon || !bellIcon.shapes) throw new Error('bellIcon no resolvió con shapes');
if (typeof MaxIconComponent !== 'function') throw new Error('MaxIconComponent no es una clase/función');
if (typeof provideIconCatalog !== 'function') throw new Error('provideIconCatalog no resolvió');
if (Object.keys(ANIMATED_ICONS).length < 100) throw new Error('ANIMATED_ICONS no trae el catálogo completo');
if (resolveIconName('alert-triangle') !== 'triangle-alert') throw new Error('resolveIconName no resolvió el alias');
console.log('Import real OK — exports/sideEffects/secondary-entry-points sin romperse.');
`,
    'utf8',
  );
  execFileSync('node', [testFile], { cwd: tmp, stdio: 'inherit' });

  console.log('4. Verificando que los tipos (.d.ts) también resuelvan...');
  writeFileSync(
    join(tmp, 'test-types.ts'),
    `import { bellIcon, AnimatedIconDef } from 'glyphflow';
const x: AnimatedIconDef = bellIcon;
console.log(x.shapes.length);
`,
    'utf8',
  );
  writeFileSync(
    join(tmp, 'tsconfig.json'),
    JSON.stringify({ compilerOptions: { module: 'esnext', moduleResolution: 'bundler', strict: true, noEmit: true, skipLibCheck: true } }),
    'utf8',
  );
  const localTsc = join(ROOT, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
  execFileSync(localTsc, ['-p', 'tsconfig.json'], { cwd: tmp, stdio: 'inherit', shell: true });

  rmSync(tmp, { recursive: true, force: true });
  console.log('\npack-check OK.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
