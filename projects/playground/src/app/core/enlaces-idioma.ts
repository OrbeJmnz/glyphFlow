import { DOCUMENT, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { IDIOMAS } from './idioma';
import { alternativas } from './rutas';
import { ORIGEN } from './sitio';

/**
 * `hreflang` recíproco + `canonical`, reescritos en cada navegación.
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

  effect(() => {
    // Sin query ni fragmento: `?q=…` es un filtro de la interfaz, no otra página, y anunciarlo
    // como canónico partiría una sola página en tantas URLs como búsquedas haga la gente.
    const camino = url().split(/[?#]/)[0];
    const otras = alternativas(camino);

    fijar(doc, 'canonical', null, ORIGEN + camino);
    for (const idioma of IDIOMAS) fijar(doc, 'alternate', idioma, ORIGEN + otras[idioma]);
    fijar(doc, 'alternate', 'x-default', ORIGEN + otras.en);
  });
}

/**
 * Reusa el `<link>` que ya esté puesto en vez de acumular uno por navegación. La búsqueda incluye
 * el `hreflang` a propósito: `rel="alternate"` solo casaría con el primero de los tres y los otros
 * dos se duplicarían en cada cambio de página.
 */
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
