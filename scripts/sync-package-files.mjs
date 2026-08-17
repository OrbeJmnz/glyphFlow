// Copia LICENSE, NOTICE y el README real de la raíz hacia projects/glyphflow/, para que
// ng-packagr los empaque en el tarball.
//
// Por qué existe: ng-packagr solo empaqueta lo que vive DENTRO del paquete, y estos tres archivos
// viven en la raíz del workspace. Sin este paso, el tarball salía con 5 archivos y sin LICENSE ni
// NOTICE — o sea, un paquete MIT sin su licencia y, peor, redistribuyendo los paths de Lucide
// (ISC) sin el aviso de atribución que esa licencia exige. Encontrado en el readiness check.
//
// Las copias SÍ se commitean: así un `ng build glyphflow` a secas, sin pasar por este script,
// sigue produciendo un tarball completo. El script las mantiene en sync; nadie las edita a mano
// (por eso el encabezado de advertencia en el README copiado no aplica: se copia tal cual).
//
//   npm run sync:package-files            # copia
//   npm run sync:package-files -- --check # no escribe; sale en error si están desincronizadas
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = new URL('../', import.meta.url);
const DEST = new URL('../projects/glyphflow/', import.meta.url);
const ARCHIVOS = ['LICENSE', 'NOTICE', 'README.md', 'LICENSE-morphicons'];

const check = process.argv.includes('--check');
const desincronizados = [];

for (const archivo of ARCHIVOS) {
  const origen = readFileSync(new URL(archivo, ROOT), 'utf8');
  const destino = new URL(archivo, DEST);
  let actual = null;
  try {
    actual = readFileSync(destino, 'utf8');
  } catch {
    actual = null;
  }
  if (actual === origen) continue;

  if (check) {
    desincronizados.push(`${archivo}: ${actual === null ? 'falta en el paquete' : 'difiere de la raíz'}`);
  } else {
    writeFileSync(destino, origen);
    console.log(`  copiado: ${archivo}`);
  }
}

if (check) {
  if (desincronizados.length) {
    console.error(
      'sync:package-files --check: el paquete no refleja los archivos de la raíz.\n  ' +
        desincronizados.join('\n  ') +
        '\nCorre `npm run sync:package-files` y commitea el resultado.',
    );
    process.exit(1);
  }
  console.log('sync:package-files --check: LICENSE, NOTICE y README en sync.');
} else {
  console.log('sync:package-files OK.');
}
