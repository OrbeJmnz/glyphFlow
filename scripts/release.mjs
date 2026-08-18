// Publica el paquete CONSTRUIDO y crea el tag. Lo llama el job `release` vía `npm run release`.
//
// Existe como script y no como cadena de `&&` en el YAML por tres razones que ya cobraron caro:
//
// 1. Se publica dist/, NUNCA projects/glyphflow: esa carpeta tiene el código fuente, sin
//    fesm2022/ ni types/. Aquí se verifica ANTES de subir nada — un número de npm no se reescribe.
// 2. Cuando el publish falla, el log tiene que decir POR QUÉ. La primera vez dio `ENEEDAUTH` sin
//    una sola pista de si el npm era el correcto o si el OIDC siquiera estaba disponible.
// 3. `npm publish` responde 403 si la versión ya existe, mientras `changeset publish` la saltaba
//    en silencio. Aquí se consulta el registro y se sale limpio.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:');
const DIST = join(ROOT, 'dist', 'glyphflow');
const dryRun = process.argv.includes('--dry-run');

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', shell: true, ...opts }).trim();

// ── 1. ¿dist/ es de verdad un paquete construido? ────────────────────────────────────────────
if (!existsSync(DIST)) {
  console.error(`No existe ${DIST}. Corre \`npm run build:lib\` antes.`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(join(DIST, 'package.json'), 'utf8'));
const faltantes = [
  !existsSync(join(DIST, 'fesm2022')) && 'fesm2022/',
  !existsSync(join(DIST, 'types')) && 'types/',
  !manifest.exports && 'campo "exports" en package.json',
].filter(Boolean);
if (faltantes.length) {
  console.error(
    `${DIST} no parece un paquete construido — falta: ${faltantes.join(', ')}.\n` +
      'Publicar esto subiría código fuente sin entry points. Abortado.',
  );
  process.exit(1);
}

// ── 2. Diagnóstico: que el log diga por qué, no solo que falló ───────────────────────────────
console.log(`paquete   : ${manifest.name}@${manifest.version}`);
console.log(`node      : ${process.version}`);
console.log(`npm       : ${run('npm', ['--version'])}   (trusted publishing pide >= 11.5.1)`);
console.log(
  `OIDC      : ACTIONS_ID_TOKEN_REQUEST_URL ${process.env['ACTIONS_ID_TOKEN_REQUEST_URL'] ? 'presente' : 'AUSENTE'}` +
    ` · NPM_TOKEN ${process.env['NPM_TOKEN'] ? 'presente' : 'ausente'}`,
);

// ── 3. ¿Ya está publicada esa versión? ───────────────────────────────────────────────────────
let yaEsta = false;
try {
  run('npm', ['view', `${manifest.name}@${manifest.version}`, 'version'], { stdio: 'pipe' });
  yaEsta = true;
} catch {
  yaEsta = false;
}
if (yaEsta) {
  console.log(`\n${manifest.name}@${manifest.version} ya está en el registro. Nada que publicar.`);
  process.exit(0);
}

// ── 4. Publicar desde DENTRO de la carpeta ───────────────────────────────────────────────────
// `cd` en vez de pasar la ruta como argumento: es como se publicó la 1.0.0 a mano, y quita de en
// medio la interpretación de la ruta (npm lee `dist/glyphflow` sin `./` como atajo de repo git).
console.log(`\npublicando desde ${DIST}…`);
execFileSync('npm', ['publish', '--access', 'public', ...(dryRun ? ['--dry-run'] : [])], {
  cwd: DIST,
  stdio: 'inherit',
  shell: true,
});

if (dryRun) {
  console.log('\n--dry-run: no se publicó ni se creó el tag.');
  process.exit(0);
}

// ── 5. El tag que `changeset publish` habría creado ──────────────────────────────────────────
execFileSync('npx', ['changeset', 'git-tag'], { cwd: ROOT, stdio: 'inherit', shell: true });
console.log('\nrelease OK.');
