import { computed, DOCUMENT, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { translateSignal } from '@jsverse/transloco';
import { filter, map } from 'rxjs';
import { IDIOMAS } from './idioma';
import { alternativas, idiomaDeLaRuta } from './rutas';
import { ORIGEN } from './sitio';
import { TranslatedTitleStrategy } from './translated-title-strategy';

/**
 * `hreflang` recíproco + `canonical`, más `og:url`/`og:locale`/`og:title`/`og:description` y sus
 * espejos de Twitter Card — todo reescrito en cada navegación.
 *
 * Con dos árboles de rutas que dicen lo mismo en dos idiomas, un buscador que no sepa que
 * `/en/patterns` y `/es/patrones` son la MISMA página las trata como contenido duplicado y elige
 * una por su cuenta. `hreflang` es lo que las hermana, y tiene que ser recíproco: cada versión
 * apunta a las dos, a la otra y a sí misma, o Google descarta el grupo entero.
 *
 * `x-default` apunta al inglés porque es a donde manda `/` cuando no hay nada guardado.
 *
 * Se escribe desde el cliente, y sí cuenta: el sitio es una SPA sin prerender, así que el HTML
 * servido es el mismo para todas las rutas — estas etiquetas no pueden venir en `index.html`
 * porque ahí no se sabe qué página es. Googlebot renderiza JS y las ve; el día que haya
 * prerender, esto se mueve al build y deja de depender de eso.
 */
export function conectarEnlacesDeIdioma(): void {
  // `optional`: `test:ssr` prerenderiza sin documento, y ahí no hay `<head>` que escribir.
  const doc = inject(DOCUMENT, { optional: true });
  if (!doc) return;
  const router = inject(Router);

  // Por señal y no con `.subscribe()`: el estándar prohíbe suscribirse desde un componente, y esto
  // se llama desde el constructor del shell. `initialValue` cubre el hueco entre que arranca la app
  // y que el router termina su primera navegación.
  const url = toSignal(
    router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: router.url },
  );

  /*
   * T16: `og:description`/`twitter:*` se quedaban con el bloque estático de `index.html` en TODAS
   * las páginas, igual que `og:url`/`og:title` antes de que existiera este archivo. La clave sale
   * de `TranslatedTitleStrategy.claveActual` (`routes.iconos.title` → `routes.iconos.descripcion`)
   * en vez de volver a caminar el árbol de rutas — mismo convenio que ya usa `tituloConConteo` como
   * hermano de `title` bajo la misma clave.
   *
   * Es de la clave raíz (`i18n/{en,es}.json`), no de un scope diferido — llega con el bundle
   * inicial, así que no hay el hueco async que rompía la primera versión de
   * `TranslatedTitleStrategy` (ver su comentario). `translateSignal` de todos modos, por
   * consistencia y porque re-evalúa solo si la clave cambia.
   */
  const claveTitulo = inject(TranslatedTitleStrategy).claveActual;
  const claveDescripcion = computed(() => {
    const clave = claveTitulo();
    return clave ? clave.replace(/\.title$/, '.descripcion') : '';
  });
  const descripcion = translateSignal(claveDescripcion);

  effect(() => {
    // Sin query ni fragmento: `?q=…` es un filtro de la interfaz, no otra página, y anunciarlo
    // como canónico partiría una sola página en tantas URLs como búsquedas haga la gente.
    const camino = url().split(/[?#]/)[0];
    const otras = alternativas(camino);

    fijar(doc, 'canonical', null, ORIGEN + camino);
    for (const idioma of IDIOMAS) fijar(doc, 'alternate', idioma, ORIGEN + otras[idioma]);
    fijar(doc, 'alternate', 'x-default', ORIGEN + otras.en);

    // Open Graph, que hasta ahora se quedaba con los valores estáticos del `index.html` en TODAS
    // las páginas. `og:url` así era incorrecto, no solo genérico: le decía al scraper que la URL
    // canónica de `/es/patrones` era la portada, y es el campo del que las redes sacan a dónde
    // apunta la tarjeta. `og:locale` completa el par: la tarjeta de una página en español no
    // debería anunciarse como inglesa.
    fijarMeta(doc, 'og:url', ORIGEN + camino);
    fijarMeta(doc, 'og:locale', idiomaDeLaRuta(camino) === 'es' ? 'es_ES' : 'en_US');
    // `og:title` sigue al `<title>` real en vez de repetir el estático del `index.html`, que era
    // inglés en TODAS las páginas — incluidas las españolas. Se lee del documento y no de la clave
    // de traducción porque el título tiene DOS orígenes: `TranslatedTitleStrategy` para casi todas
    // las rutas y el propio componente para la portada, que le agrega el conteo.
    //
    // Medido sobre las 19: en las páginas internas captura su título traducido, y en las portadas
    // el descriptivo (`glyphflow — iconos de Lucide animados para Angular`) en vez del que lleva
    // el conteo, porque el efecto del componente corre después. No es un defecto: para una tarjeta
    // de compartir, «qué es esto» vale más que «cuántos hay». Lo que importaba —que la página en
    // español no se anuncie en inglés— sí queda resuelto.
    if (doc.title) fijarMeta(doc, 'og:title', doc.title);

    /*
     * `og:image`/`twitter:image` NO se tocan aquí: siguen el cartel único de `index.html`
     * (`glyphflow-og-card.png`). Un cartel por icono —lo que T16 deja como "si es viable"— pediría
     * generar 1767 imágenes o un pipeline de render bajo demanda; ninguno de los dos existe, así
     * que "viable" hoy es NO, y el cartel por defecto es el mismo en las ~30 rutas.
     *
     * `translateSignal` devuelve la CLAVE cruda si no encuentra traducción (mismo comportamiento
     * que `translate()`) — la comparación descarta ese caso en vez de publicar
     * "routes.x.descripcion" como si fuera texto real. Hoy solo le pasa a `noEncontrado`, que se
     * queda a propósito con la descripción global del 404.
     */
    const desc = descripcion();
    if (desc && desc !== claveDescripcion()) {
      fijarMeta(doc, 'og:description', desc);
      fijarMetaName(doc, 'twitter:title', doc.title);
      fijarMetaName(doc, 'twitter:description', desc);
    }
  });
}

/**
 * Reusa el `<link>` que ya esté puesto en vez de acumular uno por navegación. La búsqueda incluye
 * el `hreflang` a propósito: `rel="alternate"` solo casaría con el primero de los tres y los otros
 * dos se duplicarían en cada cambio de página.
 */
function fijarMeta(doc: Document, property: string, content: string): void {
  // Por `property` y no por `name`: Open Graph usa el primero, y buscar por `name` no encontraría
  // las etiquetas que ya trae el `index.html` — se duplicarían en vez de actualizarse.
  let meta = doc.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!meta) {
    meta = doc.createElement('meta');
    meta.setAttribute('property', property);
    doc.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/** Igual que `fijarMeta`, pero por `name` — el atributo que usa Twitter Card, no Open Graph. */
function fijarMetaName(doc: Document, name: string, content: string): void {
  let meta = doc.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = doc.createElement('meta');
    meta.setAttribute('name', name);
    doc.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function fijar(doc: Document, rel: string, hreflang: string | null, href: string): void {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let enlace = doc.head.querySelector<HTMLLinkElement>(selector);
  if (!enlace) {
    enlace = doc.createElement('link');
    enlace.rel = rel;
    if (hreflang) enlace.hreflang = hreflang;
    doc.head.appendChild(enlace);
  }
  enlace.href = href;
}
