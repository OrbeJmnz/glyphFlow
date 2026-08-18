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

// ── Entry point secundario: glyphflow/morph ──────────────────────────────────────────────────
import { MaxIconMorphComponent, runMorph, morphKeyframes, PASOS_DEFAULT } from 'glyphflow/morph';
if (typeof MaxIconMorphComponent !== 'function') throw new Error('MaxIconMorphComponent no resolvió desde glyphflow/morph');
if (typeof runMorph !== 'function' || typeof morphKeyframes !== 'function') throw new Error('la API de morph no resolvió');
if (morphKeyframes(bellIcon.shapes.map(({ tag, ...a }) => [tag, a]), bellIcon.shapes.map(({ tag, ...a }) => [tag, a])).keyframes.length !== PASOS_DEFAULT) {
  throw new Error('morphKeyframes no produjo los keyframes esperados desde el paquete instalado');
}

// EL punto: que el token de DI sea el MISMO objeto en los dos entry points. Si el bundle de morph
// hubiera duplicado el primario (lo que pasa al importarlo por ruta relativa en vez de por nombre
// de paquete), MAX_ICONS_CONFIG sería otra instancia de InjectionToken y el provideMaxIcons del
// consumidor no llegaría NUNCA al componente de morph — en silencio, sin error.
import { Injector, runInInjectionContext } from '@angular/core';
import { provideMaxIcons } from 'glyphflow';
const injector = Injector.create({ providers: [provideMaxIcons({ durationScale: 3 })] });
const instancia = runInInjectionContext(injector, () => new MaxIconMorphComponent());
if (instancia.config?.durationScale !== 3) {
  throw new Error(
    'TOKEN DUPLICADO: <max-icon-morph> no recibió el provideMaxIcons del consumidor (leyó ' +
      JSON.stringify(instancia.config) + '). El entry point secundario debe importar el primario ' +
      'por NOMBRE DE PAQUETE, no por ruta relativa.',
  );
}

console.log('Import real OK — exports/sideEffects/secondary-entry-points sin romperse.');
console.log('Token compartido OK — provideMaxIcons llega a <max-icon-morph> a través de los dos entry points.');
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
