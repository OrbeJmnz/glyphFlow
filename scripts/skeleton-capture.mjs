// Recaptura los skeleton loaders de boneyard-js contra un dev server real — el CLI necesita un
// servidor VIVO para medir el DOM de verdad, y Vercel (`vercel.json`: `ng build playground`) no
// levanta ninguno durante el build. Por eso esto es un paso MANUAL, deliberado, nunca parte de
// `build`/`vercel.json` — mismo patrón que `curated:lock` con `curated-choreography.lock.json`:
// se corre a propósito, se comitea el resultado, y el build de producción solo lo consume.
import { execFileSync, spawn } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:');
const PORT = 4300;
const URL_DEV = `http://localhost:${PORT}`;

function servidorArriba() {
  try {
    execFileSync('curl', ['-s', '-o', process.platform === 'win32' ? 'NUL' : '/dev/null', '-w', '%{http_code}', URL_DEV], {
      cwd: ROOT,
      shell: true,
    });
    return true;
  } catch {
    return false;
  }
}

async function esperarServidor(maxSegundos = 60) {
  for (let i = 0; i < maxSegundos; i++) {
    if (servidorArriba()) return;
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`El dev server no respondió en ${URL_DEV} tras ${maxSegundos}s.`);
}

console.log(`=== Levantando ng serve playground --port ${PORT} ===`);
const servidor = spawn('npx', ['ng', 'serve', 'playground', '--port', String(PORT)], {
  cwd: ROOT,
  shell: true,
  stdio: 'inherit',
  detached: process.platform !== 'win32',
});

let capturaOk = false;
try {
  await esperarServidor();

  console.log(`\n=== npx boneyard-js build ${URL_DEV} ===`);
  execFileSync('npx', ['boneyard-js', 'build', URL_DEV], {
    cwd: `${ROOT}projects/playground`,
    stdio: 'inherit',
    shell: true,
  });
  capturaOk = true;
} finally {
  console.log('\n=== Bajando el dev server ===');
  if (process.platform === 'win32') {
    // `spawn` con `shell:true` en Windows deja el proceso real de ng bajo un hijo de cmd.exe —
    // matar solo el PID de `servidor` no lo alcanza. `/T` mata todo el árbol.
    try {
      execFileSync('taskkill', ['/PID', String(servidor.pid), '/T', '/F'], { stdio: 'ignore' });
    } catch {
      // Ya estaba abajo — no es un error real.
    }
  } else {
    process.kill(-servidor.pid, 'SIGTERM');
  }
}

if (capturaOk) {
  console.log('\nskeleton:capture OK — revisa el diff de projects/playground/src/bones/ antes de comitear.');
} else {
  process.exit(1);
}
