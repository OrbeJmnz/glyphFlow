import { DOCUMENT, effect, inject, signal } from '@angular/core';
import { conTransicion } from './transicion';

export type Tema = 'oscuro' | 'claro';

/**
 * El vocabulario que sale al DOM y al storage. Adentro el código sigue en español como todo el
 * resto del playground; afuera, inglés — `data-theme` y `gf:theme` los ve cualquiera en las
 * herramientas del navegador, y uno de los ejemplos de la portada los enseña. La frontera es aquí,
 * no repartida por el archivo (T19: los atributos y las claves de almacenamiento no se traducen).
 */
const VALOR: Record<Tema, 'dark' | 'light'> = { oscuro: 'dark', claro: 'light' };

const CLAVE = 'gf:theme';
/** La de antes de T19. Se lee una sola vez para no tirar el tema de quien ya venía usando el sitio. */
const CLAVE_VIEJA = 'gf:tema';

/**
 * El documento, guardado al conectar.
 *
 * `alternarTema()` se llama desde una plantilla, fuera de contexto de inyección, y necesita el
 * documento para la transición. Guardarlo aquí evita el `document` global y deja `core/` sin
 * depender del navegador hasta que alguien lo conecta — que es lo que lo mantiene prerenderizable.
 */
let doc: Document | null = null;

function guardado(): Tema | null {
  try {
    const v = localStorage.getItem(CLAVE) ?? localStorage.getItem(CLAVE_VIEJA);
    if (v === 'dark' || v === 'oscuro') return 'oscuro';
    if (v === 'light' || v === 'claro') return 'claro';
    return null;
  } catch {
    return null; // Modo privado o cookies bloqueadas: se arranca con el default y no se persiste.
  }
}

/**
 * Semilla: lo PRIMERO que se mira es el atributo que ya está en el `<html>`.
 *
 * Ese atributo lo escribe el script del `<head>` (ver `index.html`) antes del primer pintado, con
 * esta misma regla — elección guardada, y si no, la del sistema. Heredarlo en vez de volver a
 * decidir es lo que mata el parpadeo, y la razón es el PRERENDER: corre en Node, donde
 * `matchMedia` no existe, así que este módulo caía al `catch`, devolvía oscuro y ese valor se
 * horneaba en el `data-theme` de las 19 rutas estáticas. Todo visitante recibía HTML que decía
 * «dark»; al hidratar, aquí sí hay `matchMedia`, y quien prefiere claro veía el salto.
 *
 * El orden de abajo solo aplica cuando NO hay atributo: en el prerender, y en el navegador si
 * alguien sirve el `index.csr.html` pelado.
 */
export function semilla(): Tema {
  const puesto = leerAtributo();
  if (puesto) return puesto;
  const elegido = guardado();
  if (elegido) return elegido;
  try {
    return matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'oscuro';
  } catch {
    return 'oscuro';
  }
}

/**
 * Lo que el script del `<head>` dejó puesto. `globalThis.document` y no `inject(DOCUMENT)` porque
 * esto corre al evaluar el módulo, mucho antes de que exista un inyector — y en el prerender no
 * hay ninguno, que es justo el caso que devuelve `null`.
 */
function leerAtributo(): Tema | null {
  const html = (globalThis as { document?: Document }).document?.documentElement;
  const v = html?.getAttribute('data-theme');
  if (v === 'dark') return 'oscuro';
  if (v === 'light') return 'claro';
  return null;
}

export const tema = signal<Tema>(semilla());

/**
 * `true` mientras nadie haya tocado el interruptor — o sea, mientras mande `prefers-color-scheme`.
 *
 * Existe para el `<picture>` del hero: cuando manda el sistema, el logo se elige con un
 * `<source media>` que el navegador resuelve ANTES de pintar y sin bajar la fuente que no casa.
 * En cuanto alguien elige a mano, esa media query dejaría de valer —siempre le ganaría al
 * visitante— y el `<source>` se retira. Mismo criterio y misma señal que `movimiento.ts`.
 *
 * Se siembra de `guardado()` y no de `tema()`: lo que importa no es qué tema hay, es si alguien
 * lo eligió.
 */
export const temaSiguiendoAlSistema = signal(guardado() === null);

function aplicar(t: Tema): void {
  if (!doc) return;
  // `setAttribute` y NO `dataset`: el DOM del prerender no implementa `DOMStringMap`, así que
  // `dataset['theme'] = …` truena con «Cannot set properties of undefined» en cada una de las 19
  // rutas — y el error llega minificado, sin decir de qué archivo salió. Escriben el MISMO
  // atributo; esta forma existe en los dos lados.
  doc.documentElement.setAttribute('data-theme', VALOR[t]);
  // La barra del navegador en Android sigue al `theme-color`; con dos <meta> y su `media`, el que
  // manda es el que casa con `prefers-color-scheme`, no con nuestra elección manual. Por eso se
  // escribe a mano el que corresponde.
  doc
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', t === 'claro' ? '#ffffff' : '#121212');
  try {
    localStorage.setItem(CLAVE, VALOR[t]);
  } catch {
    // Sin storage la elección dura lo que la pestaña. Degradación aceptable, no un error.
  }
}

/** Punto desde el que se abre el círculo del cambio de tema. */
export interface Origen {
  x: number;
  y: number;
}

/**
 * Cambia el tema descubriéndolo con un círculo que crece desde `origen` — el botón que lo disparó.
 *
 * Usa la View Transitions API: el navegador congela la pantalla vieja, corre el callback y anima
 * entre las dos fotos. Sin librería, y el recorte lo mueve `element.animate()`, o sea WAAPI, el
 * mismo motor que la librería.
 *
 * El orden importa y es la parte fácil de romper: `startViewTransition` PRIMERO y el cambio DENTRO
 * del callback. Si se cambia el tema antes, la foto «vieja» ya sale con los colores nuevos y no se
 * ve ninguna transición.
 */
export function alternarTema(origen?: Origen): void {
  const siguiente: Tema = tema() === 'oscuro' ? 'claro' : 'oscuro';

  const cambiar = (): void => {
    tema.set(siguiente);
    // A partir de aquí manda el visitante, no su sistema.
    temaSiguiendoAlSistema.set(false);
    // Se aplica a mano y no se espera al efecto: el callback tiene que dejar el DOM ya cambiado
    // cuando retorna, y con Angular sin zonas el efecto todavía no corrió.
    aplicar(siguiente);
  };

  const d = doc;
  const ventana = d?.defaultView;

  // Sin origen no hay círculo que dibujar (pasa al llamarlo por código), así que se ahorra la
  // transición entera. Los demás casos —sin soporte, con movimiento reducido— los cubre
  // `conTransicion`, que es quien sabe de eso.
  if (!d || !ventana || !origen) {
    cambiar();
    return;
  }

  conTransicion(cambiar, {
    marca: 'theme',
    alEstarLista: () => {
      const { innerWidth: ancho, innerHeight: alto } = ventana;
      // Radio hasta la esquina MÁS LEJANA. Con la diagonal de la pantalla a secas, un botón pegado
      // a una orilla dejaría sin descubrir el rincón opuesto.
      const radio = Math.hypot(
        Math.max(origen.x, ancho - origen.x),
        Math.max(origen.y, alto - origen.y),
      );

      d.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origen.x}px ${origen.y}px)`,
            `circle(${radio}px at ${origen.x}px ${origen.y}px)`,
          ],
        },
        {
          duration: 620,
          // El expo-out de la casa. Arranca rápido y frena largo: el círculo se lee como una onda
          // que sale del botón y no como un barrido a velocidad constante.
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    },
  });
}

/**
 * Conecta la señal al documento. Se llama UNA vez, desde el shell, porque necesita contexto de
 * inyección. `DOCUMENT` y no el `document` global, por lo mismo que arriba.
 */
export function conectarTema(): void {
  doc = inject(DOCUMENT);
  effect(() => aplicar(tema()));
}
