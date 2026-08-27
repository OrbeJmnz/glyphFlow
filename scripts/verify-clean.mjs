// Verificación desde checkout limpio de verdad — node_modules y dist fuera, npm ci desde cero,
// y todo el pipeline de nuevo. Esto existe porque "verificado localmente" con node_modules/dist ya
// construidos de sesiones anteriores fue un falso positivo real: el CI en GitHub Actions falló en
// los 4 jobs con el mismo repo que localmente daba todo verde. De aquí en adelante, "verificado
// localmente" significa "pasó por este script", no "until corrí los comandos sueltos".
import { rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:');

function run(cmd, args, opts = {}) {
  console.log(`\n$ ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: true, ...opts });
}

console.log('=== verify:clean — borrando node_modules/ y dist/ ===');
for (const dir of ['node_modules', 'dist']) {
  const p = join(ROOT, dir);
  if (!existsSync(p)) continue;
  try {
    rmSync(p, { recursive: true, force: true });
  } catch (err) {
    // Windows no borra un ejecutable en uso: un `ng serve` vivo mantiene abierto esbuild.exe y
    // esto truena con EPERM antes de la PRIMERA verificación. El error crudo no dice nada de un
    // dev server, así que se traduce — ya costó dos corridas completas.
    if (err.code === 'EPERM' || err.code === 'EBUSY') {
      console.error(
        `\nNo se pudo borrar ${dir}/: hay un proceso usándolo (${err.code}).\n` +
          `Casi siempre es un \`ng serve\` vivo — bájalo y vuelve a correr verify:clean.\n` +
          `Ruta bloqueada: ${err.path ?? '(desconocida)'}\n`,
      );
      process.exit(1);
    }
    throw err;
  }
}

console.log('\n=== npm ci (desde cero, sin caché de node_modules) ===');
run('npm', ['ci']);

const steps = [
  ['LICENSE/NOTICE/README en sync con la raíz', 'npm', ['run', 'sync:package-files']],
  ['Build glyphflow (production)', 'npx', ['ng', 'build', 'glyphflow', '--configuration', 'production']],
  ['Lint', 'npm', ['run', 'lint']],
  ['Typecheck', 'npm', ['run', 'typecheck']],
  ['Drift del lock de coreografía curada', 'npm', ['run', 'curated:lock:check']],
  ['Drift de sitemap.xml y robots.txt', 'npm', ['run', 'gen:sitemap:check']],
  ['README: paridad EN/ES y sin API de la v1', 'npm', ['run', 'docs:check']],
  ['Snippets copiables del sitio', 'npm', ['run', 'snippets:check']],
  ['Drift de examples/ contra los snippets', 'npm', ['run', 'gen:examples:check']],
  ['Drift del índice de búsqueda de Docs', 'npm', ['run', 'gen:docs-index:check']],
  // El catálogo que el sitio importa como JSON. Si no se regenera tras curar iconos, la rejilla
  // enseña el catálogo de ayer sin que nada truene — es un archivo, no una dependencia.
  ['Drift del catálogo JSON del sitio', 'npm', ['run', 'gen:catalogo:check']],
  ['Los ejemplos compilan contra el paquete PUBLICADO', 'npx', ['tsc', '-p', 'examples/tsconfig.check.json']],
  ['Unit tests (glyphflow)', 'npx', ['ng', 'test', 'glyphflow', '--watch=false']],
  ['Unit tests (playground)', 'npx', ['ng', 'test', 'playground', '--watch=false']],
  ['Build glyphflow (development)', 'npx', ['ng', 'build', 'glyphflow', '--configuration', 'development']],
  ['Build playground', 'npx', ['ng', 'build', 'playground']],
  ['SSR smoke test', 'npm', ['run', 'test:ssr']],
  ['Bundle-size check', 'npm', ['run', 'bundle-check']],
  ['NOTICE check', 'npm', ['run', 'notice-check']],
  ['npm pack + instalar limpio + import real', 'npm', ['run', 'pack-check']],
];

for (const [label, cmd, args] of steps) {
  console.log(`\n=== ${label} ===`);
  run(cmd, args);
}

console.log('\nverify:clean OK — esto sí es "verificado localmente" desde checkout limpio.');
