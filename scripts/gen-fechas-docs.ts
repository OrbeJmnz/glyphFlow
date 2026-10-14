// Mantiene `core/fechas-docs.json`: la fecha de «última modificación» de cada página de Docs, que el sitio pinta en el pie de la página, en su
// JSON-LD (`dateModified`) y en el `<lastmod>` del sitemap.
//
// POR QUÉ UN HASH Y NO `git log`: el contenido de las 10 páginas vive en UN solo `i18n/docs/{en,es}.json`, así que la fecha del último commit de ese
// archivo es la del último cambio de CUALQUIER página y las diez saldrían iguales. Y un clon shallow (Vercel, `actions/checkout` por defecto) no
// trae historia de dónde sacarla. Aquí cada página tiene su huella —su plantilla, sus snippets de código y SU subárbol de i18n en los dos idiomas— y la fecha
// solo se mueve cuando la huella cambia: no depende de git, un reformateo no la toca y el check corre igual en cualquier máquina.
//
// Flujo: editas una doc → `npm run gen:fechas-docs` (pone la fecha de hoy a las páginas cuya huella cambió) → `npm run gen:sitemap` → comiteas. Si
// se te olvida, `--check` (parte de `verify:clean`) falla con el nombre de las páginas.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ES_DOC } from '../projects/playground/src/app/core/datos-estructurados.ts';
import type { RutaId } from '../projects/playground/src/app/core/rutas.ts';
import { sinCr } from './sin-cr';

export const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DOCS = join(RAIZ, 'projects', 'playground', 'src', 'app', 'features', 'docs');
export const I18N = join(RAIZ, 'projects', 'playground', 'src', 'i18n', 'docs');
export const MANIFIESTO = join(RAIZ, 'projects', 'playground', 'src', 'app', 'core', 'fechas-docs.json');

/** Algo que la página muestra y que no vive en su plantilla: un archivo entero o solo algunos de sus exports. */
type Extra = { archivo: string; simbolos?: string[] };

export interface Pagina {
  id: RutaId;
  /** `features/docs/<archivo>.html` y `.ts`. */
  archivo: string;
  /** Su clave en `docs.*` de los JSON de i18n (y en `docs.nav.*`, donde está su título). */
  clave: string;
  extras?: Extra[];
}

/*
 * Los `SNIPPET_*` que una página importa se detectan solos (ver `huella`). Esto es lo que NO se puede detectar: contenido que llega por otro
 * camino. Si una página empieza a leer texto de otro archivo, súmalo aquí o sus cambios no moverán la fecha.
 */
export const PAGINAS: Pagina[] = [
  { id: 'empezando', archivo: 'empezando', clave: 'empezando' },
  { id: 'accesibilidad', archivo: 'accesibilidad', clave: 'accesibilidad' },
  { id: 'ssr', archivo: 'ssr', clave: 'ssr' },
  { id: 'api', archivo: 'api', clave: 'api', extras: [{ archivo: 'api-surface.ts' }] },
  { id: 'temas', archivo: 'temas', clave: 'temas' },
  { id: 'migracion', archivo: 'migracion', clave: 'migracion' },
  { id: 'verificar', archivo: 'verificar', clave: 'verificar' },
  {
    id: 'docsBots',
    archivo: 'bots',
    clave: 'bots',
    extras: [{ archivo: 'bots-traduccion.ts' }, { archivo: '../bots/bots-datos.ts', simbolos: ['GESTOS', 'PESOS'] }],
  },
  { id: 'problemas', archivo: 'problemas', clave: 'problemas' },
  { id: 'comparativa', archivo: 'comparativa', clave: 'comparativa' },
];

interface Entrada {
  huella: string;
  /** AAAA-MM-DD, el día en que la huella cambió por última vez. */
  fecha: string;
}
type Manifiesto = Partial<Record<RutaId, Entrada>>;

const leer = (ruta: string): string => sinCr(readFileSync(ruta, 'utf8'));

/** Sin comentarios ni espacios de más: reformatear o comentar no es cambiar el contenido. */
const sinRuido = (texto: string, tipo: 'html' | 'ts'): string =>
  (tipo === 'html'
    ? texto.replace(/<!--[\s\S]*?-->/g, '')
    : // `(^|\s)//` y no `//` a secas: así `https://…` no se confunde con un comentario.
      texto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/[^\n]*/g, '$1')
  )
    .replace(/\s+/g, ' ')
    .trim();

/** El JSON con las claves ordenadas: reordenarlas no cambia lo que dice la página. */
function canonico(valor: unknown): unknown {
  if (Array.isArray(valor)) return valor.map(canonico);
  if (valor && typeof valor === 'object') {
    return Object.fromEntries(
      Object.entries(valor as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, canonico(v)]),
    );
  }
  return valor;
}

/** El `export const NOMBRE …` completo, hasta el siguiente export (sin el JSDoc que lo precede). Sin tocar espacios: en un snippet la sangría se ve. */
function declaracion(texto: string, nombre: string): string {
  const inicio = texto.indexOf(`export const ${nombre}`);
  if (inicio < 0) throw new Error(`gen:fechas-docs: no encuentro «export const ${nombre}».`);
  const resto = texto.slice(inicio + 1);
  const fin = resto.search(/\n(?:\/\*[\s\S]*?\*\/\n|\/\/[^\n]*\n)*export /);
  return (fin < 0 ? texto.slice(inicio) : texto.slice(inicio, inicio + 1 + fin)).trim();
}

/** `lector` es la única razón de que reciba un parámetro: la semilla inicial de las fechas lee cada archivo tal como estaba en un commit, no del disco. */
export function huella(p: Pagina, lector: (ruta: string) => string = leer): string {
  const html = lector(join(DOCS, `${p.archivo}.html`));
  const ts = lector(join(DOCS, `${p.archivo}.ts`));
  // El `.ts` de una página es lógica (inyección, señales, JSON-LD): el contenido que se lee vive en la plantilla, el i18n y los snippets. Se lee
  // solo para saber qué `SNIPPET_*` usa. Medido en la semilla: con el `.ts` dentro, tocar el JSON-LD de Empezando le ponía fecha nueva sin cambiar una palabra.
  const partes: string[] = [sinRuido(html, 'html')];

  const snippets = lector(join(DOCS, 'snippets.ts'));
  const usados = new Set(`${ts}\n${html}`.match(/\bSNIPPET_[A-Z0-9_]+\b/g) ?? []);
  for (const nombre of [...usados].sort()) partes.push(declaracion(snippets, nombre));

  for (const extra of p.extras ?? []) {
    const texto = lector(join(DOCS, extra.archivo));
    if (extra.simbolos) for (const s of extra.simbolos) partes.push(declaracion(texto, s));
    else partes.push(sinRuido(texto, 'ts'));
  }

  for (const idioma of ['en', 'es']) {
    const docs = JSON.parse(lector(join(I18N, `${idioma}.json`))) as Record<string, unknown> & { nav: Record<string, unknown> };
    partes.push(JSON.stringify(canonico({ pagina: docs[p.clave], nav: docs.nav[p.clave] })));
  }
  return createHash('sha256').update(partes.join('\u0000')).digest('hex').slice(0, 16);
}

/** La huella de cada página tal como está HOY en disco. */
export const huellasActuales = (): Record<string, string> => Object.fromEntries(PAGINAS.map((p) => [p.id, huella(p)]));

export const leerManifiesto = (): Manifiesto => {
  try {
    return JSON.parse(readFileSync(MANIFIESTO, 'utf8')) as Manifiesto;
  } catch {
    return {};
  }
};

const hoy = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function main(): void {
  // Una página de Docs sin entrada aquí no tendría fecha en ningún sitio, y no truena en ninguna otra parte: se pilla aquí.
  const sinFila = [...ES_DOC].filter((id) => !PAGINAS.some((p) => p.id === id));
  const sobra = PAGINAS.filter((p) => !ES_DOC.has(p.id)).map((p) => p.id);
  if (sinFila.length || sobra.length) {
    console.error(
      `gen:fechas-docs: la tabla PAGINAS no coincide con ES_DOC de datos-estructurados.ts.${sinFila.length ? ` Faltan: ${sinFila.join(', ')}.` : ''}${sobra.length ? ` Sobran: ${sobra.join(', ')}.` : ''}`,
    );
    process.exit(1);
  }

  const huellas = huellasActuales();
  const previo = leerManifiesto();
  const cambiadas = PAGINAS.filter((p) => previo[p.id]?.huella !== huellas[p.id]).map((p) => p.id);
  const sobrantes = Object.keys(previo).filter((id) => !PAGINAS.some((p) => p.id === id));

  if (process.argv.includes('--check')) {
    if (cambiadas.length || sobrantes.length) {
      console.error(
        `gen:fechas-docs --check: ${[...cambiadas, ...sobrantes].join(', ')} ${cambiadas.length + sobrantes.length === 1 ? 'cambió' : 'cambiaron'} y su fecha no.
Corre \`npm run gen:fechas-docs\` y \`npm run gen:sitemap\`, y comitea el resultado.`,
      );
      process.exit(1);
    }
    console.log('gen:fechas-docs --check: la fecha de cada página de Docs corresponde a su contenido.');
    return;
  }

  const dia = hoy();
  const siguiente: Manifiesto = {};
  for (const p of PAGINAS) {
    siguiente[p.id] = cambiadas.includes(p.id) ? { huella: huellas[p.id], fecha: dia } : previo[p.id];
  }
  writeFileSync(MANIFIESTO, `${JSON.stringify(siguiente, null, 2)}\n`);
  console.log(cambiadas.length ? `gen:fechas-docs: ${cambiadas.join(', ')} → ${dia}.` : 'gen:fechas-docs: sin cambios.');
}

// Importable (la semilla y los specs piden `huellasActuales`) sin que importar ejecute nada.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
