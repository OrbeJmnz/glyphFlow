// Escribe la copia de los tags que consume el buscador del sitio, desde el paquete PUBLICADO.
//
// Por qué existe una copia en vez de importar `ICON_TAGS` del paquete: MEDIDO. Un import estático
// mete los tags en el bundle INICIAL, no en el chunk de la página — el shell ya importa
// `glyphflow` estáticamente (para `<gf-icon>` del header), así que referenciar cualquier export
// suyo lo ancla a la entrada. Salta de 147.90 kB a 181.10 kB de transferencia, +33 kB gzip que
// paga TODO visitante, incluido el que nunca busca. Es el mismo mecanismo que midió T29 y el
// mismo motivo por el que existe `nombres-generados.ts`.
//
// La copia vive en un JSON que se carga por `import()` dinámico, así que esbuild le da su propio
// chunk y solo lo baja quien escribe en el buscador. Mismo patrón que `i18n/es.json`.
//
// Se genera desde `lucide-static/tags.json` y NO importando `ICON_TAGS` del paquete, por una razón
// mecánica: importar el entry point principal en Node crudo evalúa el componente y Angular intenta
// compilarlo JIT — truena antes de llegar al dato. Es la MISMA fuente de la que el paquete genera
// su `ICON_TAGS`, así que no es una segunda verdad.
//
// La red de seguridad es `tags-catalogo.spec.ts`: corre en vitest, ahí sí puede importar el paquete
// publicado, y truena si esta copia y `ICON_TAGS` dejan de coincidir.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import tagsJson from 'lucide-static/tags.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const SALIDA = join(
  __dirname,
  '..',
  'projects',
  'playground',
  'src',
  'app',
  'features',
  'iconos',
  'tags-catalogo.json',
);

const tags = tagsJson as Record<string, string[]>;
const nombres = Object.keys(tags).sort();
if (nombres.length === 0) throw new Error('tags.json vino vacío.');

const sinTags = nombres.filter((n) => !tags[n]?.length);
if (sinTags.length > 0) {
  throw new Error(`${sinTags.length} icono(s) sin tags: ${sinTags.slice(0, 5).join(', ')}`);
}

// Sin indentar: es dato generado que nadie lee a mano, y la indentación serían ~60 kB de espacios
// viajando por la red en el chunk.
const datos = Object.fromEntries(nombres.map((n) => [n, tags[n]]));
writeFileSync(SALIDA, JSON.stringify(datos) + '\n', 'utf8');

console.log(
  `tags-catalogo.json: ${nombres.length} iconos, ${Object.values(datos).flat().length} tags.`,
);
