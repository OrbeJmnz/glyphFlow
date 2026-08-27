// Vuelca el catálogo curado a un JSON que el sitio importa con `import()`.
//
// Por qué existe: importar `CURATED_ICONS` del paquete mete el catálogo entero en el bundle
// INICIAL y no hay forma de sacarlo desde el sitio — medido y documentado en `app.routes.ts` y en
// Engram (`architecture/tree-shaking`). La razón es que `glyphflow` ya se alcanza desde la
// entrada, así que cualquier símbolo suyo que alguien necesite acaba ahí.
//
// Un `.json` del propio sitio no lo alcanza nadie más, así que `import()` sí le da su chunk. Es el
// mismo patrón que ya usan `tags-catalogo.json` y el índice de búsqueda de Docs.
//
// Uso:
//   tsx scripts/gen-catalogo-json.ts            # escribe el archivo
//   tsx scripts/gen-catalogo-json.ts --check    # falla si lo escrito no coincide (CI)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CURATED_ICONS } from '../projects/glyphflow/src/lib/icon/curated-icons.ts';
import { ICON_ALIASES } from '../projects/glyphflow/src/lib/icon/animated-icons.registry.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'projects', 'playground', 'src', 'app', 'core');
const OUT = join(DIR, 'catalogo-curado.json');

/**
 * Las claves van ORDENADAS. El JSON es un artefacto versionado y su `--check` compara texto: sin
 * un orden estable, dos generaciones de los mismos datos darían diffs distintos y el check
 * fallaría por nada.
 */
const iconos = Object.fromEntries(
  Object.keys(CURATED_ICONS)
    .sort()
    .map((nombre) => [nombre, CURATED_ICONS[nombre]]),
);

/**
 * Los alias viajan en el MISMO archivo. Son 30 KB al lado de un megabyte, y el buscador del editor
 * los necesita justo cuando ya está esperando al catálogo: pedirlos aparte serían dos viajes para
 * llegar al mismo sitio.
 */
const contenido = JSON.stringify({ iconos, alias: ICON_ALIASES });

const check = process.argv.includes('--check');
if (check) {
  let actual: string;
  try {
    actual = readFileSync(OUT, 'utf8');
  } catch {
    console.error(`✗ falta ${OUT}. Corre \`npm run gen:catalogo\` y commitea el resultado.`);
    process.exit(1);
  }
  if (actual !== contenido) {
    console.error(
      `✗ catalogo-curado.json no refleja el catálogo actual.\n` +
        `  Corre \`npm run gen:catalogo\` y commitea el resultado.`,
    );
    process.exit(1);
  }
  console.log(`gen:catalogo:check OK — ${Object.keys(iconos).length} iconos.`);
} else {
  mkdirSync(DIR, { recursive: true });
  writeFileSync(OUT, contenido, 'utf8');
  console.log(
    `gen:catalogo: ${Object.keys(iconos).length} iconos, ` +
      `${Math.round(contenido.length / 1024)} KB en ${OUT}.`,
  );
}
