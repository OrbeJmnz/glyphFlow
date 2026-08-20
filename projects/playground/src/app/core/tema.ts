import { DOCUMENT, effect, inject, signal } from '@angular/core';
import { conTransicion } from './transicion';

export type Tema = 'oscuro' | 'claro';

const CLAVE = 'gf:tema';

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
    const v = localStorage.getItem(CLAVE);
    return v === 'claro' || v === 'oscuro' ? v : null;
  } catch {
    return null; // Modo privado o cookies bloqueadas: se arranca con el default y no se persiste.
  }
}

/**
 * Semilla: primero lo que el visitante eligió alguna vez, y si nunca eligió, lo que pide su sistema.
 *
 * Se lee AQUÍ, en el módulo, y no dentro de un efecto: el valor tiene que estar puesto antes del
 * primer pintado o se ve el parpadeo de arrancar oscuro y saltar a claro.
 */
function semilla(): Tema {
  const elegido = guardado();
  if (elegido) return elegido;
  try {
    return matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'oscuro';
  } catch {
    return 'oscuro';
  }
}

export const tema = signal<Tema>(semilla());

function aplicar(t: Tema): void {
  if (!doc) return;
  // Corchetes, no `.tema`: `noPropertyAccessFromIndexSignature` prohíbe el acceso por punto sobre
  // `DOMStringMap`.
  doc.documentElement.dataset['tema'] = t;
  // La barra del navegador en Android sigue al `theme-color`; con dos <meta> y su `media`, el que
  // manda es el que casa con `prefers-color-scheme`, no con nuestra elección manual. Por eso se
  // escribe a mano el que corresponde.
  doc
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', t === 'claro' ? '#ffffff' : '#121212');
  try {
    localStorage.setItem(CLAVE, t);
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
    marca: 'tema',
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
