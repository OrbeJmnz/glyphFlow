import { IDIOMAS, esIdioma, type Idioma } from './idioma';

/**
 * SIN Angular a propósito: este archivo es la única fuente de verdad de las URLs del sitio, y
 * `scripts/gen-sitemap.ts` lo importa desde Node crudo para escribir el sitemap. Con un
 * `@Injectable` dentro, ese import arrastraba el DI de Angular y tronaba con «needs to be compiled
 * using the JIT compiler». El adaptador reactivo vive al lado, en `rutas.service.ts`.
 *
 * El id de una página NO cambia con el idioma; su slug sí. Todo lo que enlaza a una página lo hace
 * por id, así que traducir una URL es cambiar la tabla, no perseguir `routerLink` por el repo.
 */
export type RutaId =
  'iconos' | 'patrones' | 'editor' | 'lab' | 'docs' | 'empezando' | 'accesibilidad' | 'ssr' | 'api';

/**
 * Solo se traduce el slug cuando en el otro idioma es OTRA palabra que alguien podría buscar.
 * `editor`, `lab`, `docs`, `ssr` y `api` se escriben igual o son jerga que nadie teclea en
 * español: dos slugs para la misma cadena solo serían dos URLs que mantener.
 *
 * La tabla es el contrato público del sitio. Cambiar un slug de aquí mata una URL viva, así que
 * pide su 301 en `vercel.json` — igual que las tres que murieron al nacer el prefijo de idioma.
 */
export const SLUGS: Record<RutaId, Record<Idioma, string>> = {
  iconos: { en: '', es: '' },
  patrones: { en: 'patterns', es: 'patrones' },
  editor: { en: 'editor', es: 'editor' },
  lab: { en: 'lab', es: 'lab' },
  docs: { en: 'docs', es: 'docs' },
  empezando: { en: 'getting-started', es: 'empezando' },
  accesibilidad: { en: 'accessibility', es: 'accesibilidad' },
  ssr: { en: 'ssr', es: 'ssr' },
  api: { en: 'api', es: 'api' },
};

/** Índice inverso: de cualquier slug, en cualquier idioma, al id que representa. */
const POR_SLUG = new Map<string, RutaId>(
  Object.entries(SLUGS).flatMap(([id, porIdioma]) =>
    Object.values(porIdioma)
      .filter(Boolean)
      .map((s) => [s, id as RutaId] as const),
  ),
);

export function slug(id: RutaId, idioma: Idioma): string {
  return SLUGS[id][idioma];
}

/** Ruta absoluta a una página: `ruta('en', 'docs', 'api')` → `/en/docs/api`. */
export function ruta(idioma: Idioma, ...ids: RutaId[]): string {
  const segmentos = ids.map((id) => slug(id, idioma)).filter(Boolean);
  return '/' + [idioma, ...segmentos].join('/');
}

/** El idioma que declara una URL, o `null` si no trae prefijo (una ruta vieja, sin migrar). */
export function idiomaDeLaRuta(camino: string): Idioma | null {
  const primero = camino.split('/').filter(Boolean)[0];
  return esIdioma(primero) ? primero : null;
}

/**
 * La MISMA página en el otro idioma, conservando query y fragmento. Es lo que hace que el switcher
 * no mande a la portada: `/en/docs/getting-started#api-x` → `/es/docs/empezando#api-x`.
 *
 * Un segmento que no está en la tabla se copia tal cual en vez de descartarse — así una URL
 * desconocida cae en el comodín del idioma destino y no en un 404 silencioso a medio traducir.
 */
export function traducirRuta(url: string, destino: Idioma): string {
  const corte = url.search(/[?#]/);
  const camino = corte === -1 ? url : url.slice(0, corte);
  const cola = corte === -1 ? '' : url.slice(corte);

  const segmentos = camino.split('/').filter(Boolean);
  if (esIdioma(segmentos[0])) segmentos.shift();

  const traducidos = segmentos.map((s) => {
    const id = POR_SLUG.get(s);
    return id ? slug(id, destino) : s;
  });

  return '/' + [destino, ...traducidos].join('/') + cola;
}

/** Las dos URLs de una misma página, para el `hreflang` recíproco. */
export function alternativas(url: string): Record<Idioma, string> {
  return Object.fromEntries(IDIOMAS.map((i) => [i, traducirRuta(url, i)])) as Record<
    Idioma,
    string
  >;
}
