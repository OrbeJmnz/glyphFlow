import type { Idioma } from './idioma';
import { idsDeLaRuta, ruta, type RutaId } from './rutas';
import { ORIGEN } from './sitio';

/**
 * Los datos estructurados (JSON-LD) de cada página, como funciones PURAS: sin Angular ni DOM, así se prueban en Node y se prerenderizan igual.
 * Quien los escribe en el `<head>` es `json-ld.ts`; quien decide cuándo, `enlaces-idioma.ts` (la parte común) y las páginas de docs (FAQ y pasos).
 *
 * Qué declara y por qué:
 *  - `WebSite` + `SoftwareSourceCode` + autor: la ENTIDAD. Antes era un solo `SoftwareSourceCode` idéntico en las 30 páginas y con la `url` siempre en
 *    la portada; un motor generativo no tenía de dónde sacar quién hace glyphflow ni dónde está el paquete (`sameAs`: GitHub y npm).
 *  - `WebPage` o `TechArticle` (las docs) con su `url`, su idioma y su descripción reales.
 *  - `BreadcrumbList`: dónde está la página dentro del sitio.
 *
 * No se inventa nada que la página no diga: `dateModified` solo sale en las docs, y solo si quien llama pasa la fecha real (`fechas-docs.ts`, que
 * lleva el mismo dato que el pie visible de la página). `datePublished` no existe: ningún sitio guarda cuándo nació cada página.
 */

/** Los perfiles públicos del proyecto: de aquí sale `sameAs`, que es lo que une el sitio con el paquete y el repo. */
export const REPO_URL = 'https://github.com/OrbeJmnz/glyphFlow';
export const NPM_URL = 'https://www.npmjs.com/package/glyphflow';
const AUTOR_URL = 'https://github.com/OrbeJmnz';
/** El nombre con su ortografía correcta. El `name` de un `Person` es uno solo. */
export const AUTOR_NOMBRE = 'Orbelin Jiménez Vázquez';
/**
 * Los alias van en `alternateName`: el usuario de GitHub, que es lo que une a la persona con el repo y el paquete, y el nombre SIN acentos, que es
 * como lo escribe `LICENSE` (público y dentro del paquete de npm). Así quien lea el copyright y quien lea el JSON-LD resuelven a la misma entidad.
 */
export const AUTOR_ALIAS = ['OrbeJmnz', 'Orbelin Jimenez Vazquez'] as const;

const ID = {
  sitio: `${ORIGEN}/#website`,
  paquete: `${ORIGEN}/#software`,
  autor: `${ORIGEN}/#autor`,
} as const;

/** La clave `routes.<clave>.title` de cada página, de donde sale su nombre. `docs` no es una página: es una sección sin portada propia. */
const CLAVE_RUTA: Partial<Record<RutaId, string>> = {
  iconos: 'iconos',
  patrones: 'patrones',
  editor: 'editor',
  lab: 'lab',
  faceLab: 'faceLab',
  bots: 'bots',
  empezando: 'docsEmpezando',
  accesibilidad: 'docsAccesibilidad',
  ssr: 'docsSsr',
  api: 'docsApi',
  migracion: 'docsMigracion',
  comparativa: 'docsComparativa',
  verificar: 'docsVerificar',
  problemas: 'docsProblemas',
  temas: 'docsTemas',
  docsBots: 'docsBots',
};

/** Las páginas de la sección Docs (llevan `TechArticle` y cuelgan de «Docs» en las migas). */
export const ES_DOC: ReadonlySet<RutaId> = new Set<RutaId>([
  'empezando',
  'accesibilidad',
  'ssr',
  'api',
  'migracion',
  'comparativa',
  'verificar',
  'problemas',
  'temas',
  'docsBots',
]);

export const claveDeRuta = (id: RutaId): string | undefined => CLAVE_RUTA[id];

/** «Bots — glyphflow» → «Bots». El sufijo de marca es del `<title>`, no del nombre de la página. */
export const sinMarca = (titulo: string): string => titulo.split(' — ')[0].trim();

export interface EntradaGrafo {
  idioma: Idioma;
  /** El camino sin query ni fragmento: `/es/docs/empezando`. */
  camino: string;
  /** El `<title>` real de la página. */
  titulo: string;
  descripcion: string;
  /** La versión publicada de glyphflow (`CIFRAS.version`). */
  version: string;
  /** El nombre de cada página por clave de ruta (`docsApi` → «API») y el de la sección Docs (`docs`). */
  nombres: Readonly<Record<string, string>>;
  /** AAAA-MM-DD de la última modificación del contenido. Solo se usa en las docs; sin él no se declara fecha. */
  fechaModificacion?: string;
}

/**
 * El grafo de la página, o `null` si el camino no es una página del sitio (el 404 no debe declarar un `WebPage` con una URL que no existe).
 */
export function grafoDeLaPagina(e: EntradaGrafo): object | null {
  const ids = idsDeLaRuta(e.camino);
  if (!ids) return null;
  const url = ORIGEN + e.camino;
  const esDoc = ids.length > 0 && ES_DOC.has(ids[ids.length - 1]);
  const nombre = sinMarca(e.titulo);

  const migas = [{ nombre: e.nombres['inicio'] ?? 'glyphflow', url: ORIGEN + ruta(e.idioma) }];
  const acumulado: RutaId[] = [];
  for (const id of ids) {
    acumulado.push(id);
    if (id === 'docs') {
      // «Docs» no tiene portada: su miga lleva a la primera página de la sección.
      migas.push({ nombre: e.nombres['docs'] ?? 'Docs', url: ORIGEN + ruta(e.idioma, 'docs', 'empezando') });
      continue;
    }
    const clave = CLAVE_RUTA[id];
    const esLaPagina = acumulado.length === ids.length;
    migas.push({
      nombre: esLaPagina ? nombre : sinMarca(e.nombres[clave ?? ''] ?? id),
      url: ORIGEN + ruta(e.idioma, ...acumulado),
    });
  }
  // La portada es su propia primera miga: no se repite.
  const lista = ids.length === 0 ? migas.slice(0, 1) : migas;

  const pagina: Record<string, unknown> = esDoc
    ? {
        '@type': 'TechArticle',
        '@id': `${url}#pagina`,
        headline: nombre,
        description: e.descripcion,
        url,
        inLanguage: e.idioma,
        ...(e.fechaModificacion ? { dateModified: e.fechaModificacion } : {}),
        about: { '@id': ID.paquete },
        author: { '@id': ID.autor },
        publisher: { '@id': ID.autor },
        isPartOf: { '@id': ID.sitio },
        mainEntityOfPage: url,
        breadcrumb: { '@id': `${url}#migas` },
      }
    : {
        '@type': 'WebPage',
        '@id': `${url}#pagina`,
        name: ids.length === 0 ? e.titulo : nombre,
        description: e.descripcion,
        url,
        inLanguage: e.idioma,
        isPartOf: { '@id': ID.sitio },
        about: { '@id': ID.paquete },
        breadcrumb: { '@id': `${url}#migas` },
      };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ID.sitio,
        name: 'glyphflow',
        url: `${ORIGEN}/`,
        inLanguage: ['en', 'es'],
        publisher: { '@id': ID.autor },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': ID.paquete,
        name: 'glyphflow',
        description: 'Lucide icons animated on the native Web Animations API. Zero animation dependencies, real tree-shaking, and morphing between shapes.',
        url: `${ORIGEN}/`,
        version: e.version,
        codeRepository: REPO_URL,
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Angular',
        license: 'https://opensource.org/licenses/MIT',
        isAccessibleForFree: true,
        author: { '@id': ID.autor },
        sameAs: [REPO_URL, NPM_URL],
      },
      {
        '@type': 'Person',
        '@id': ID.autor,
        name: AUTOR_NOMBRE,
        alternateName: [...AUTOR_ALIAS],
        url: AUTOR_URL,
        sameAs: [AUTOR_URL],
      },
      pagina,
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#migas`,
        itemListElement: lista.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: m.nombre,
          // La última miga es la página actual: sin `item`, como pide Google.
          ...(i < lista.length - 1 ? { item: m.url } : {}),
        })),
      },
    ],
  };
}

/** Texto plano a partir del HTML de una traducción (`<code>`, `<strong>`, entidades): lo que ve quien lee, sin marcas. */
export function aTexto(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface PreguntaFaq {
  pregunta: string;
  /** Una o varias partes de la respuesta, en HTML de traducción: se unen en un solo texto. */
  respuesta: readonly string[];
}

/** `FAQPage` con lo que la página ya dice: la pregunta es el encabezado y la respuesta, su texto. Sin contenido que no se vea. */
export function faqDe(idioma: Idioma, camino: string, preguntas: readonly PreguntaFaq[]): object | null {
  const utiles = preguntas.filter((p) => aTexto(p.pregunta) && p.respuesta.some((r) => aTexto(r)));
  if (!utiles.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${ORIGEN}${camino}#faq`,
    inLanguage: idioma,
    mainEntity: utiles.map((p) => ({
      '@type': 'Question',
      name: aTexto(p.pregunta),
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta.map(aTexto).filter(Boolean).join(' ') },
    })),
  };
}

export interface PasoHowTo {
  nombre: string;
  texto: string;
}

/** `HowTo` con los pasos de la página, en el orden en que aparecen. */
export function howToDe(idioma: Idioma, camino: string, nombre: string, descripcion: string, pasos: readonly PasoHowTo[]): object | null {
  const utiles = pasos.filter((p) => aTexto(p.nombre) && aTexto(p.texto));
  if (!utiles.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${ORIGEN}${camino}#howto`,
    name: aTexto(nombre),
    description: aTexto(descripcion),
    inLanguage: idioma,
    step: utiles.map((p, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: aTexto(p.nombre),
      text: aTexto(p.texto),
      url: `${ORIGEN}${camino}`,
    })),
  };
}
