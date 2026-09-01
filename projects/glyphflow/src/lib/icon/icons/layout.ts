// Familia `layout` del catálogo curado (7 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { scaleSeq, track, strokeDraw, icon } from '../choreography';
import { layoutDashboardShapes, layoutFreeformShapes, layoutGridShapes, layoutListShapes, layoutPanelLeftShapes, layoutPanelTopShapes, layoutTemplateShapes } from '../animated-icons.shapes';

/** Tablero armándose, tarjeta por tarjeta. */
/* ── Variantes de la tanda 5 ──────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). Easing por keyframe y `times` como
 * `offset`, igual que en las tandas anteriores.
 *
 * Tres adaptaciones declaradas, no descuidos: `layout-grid` va sin el destello que barre el
 * icono (una figura extra que se desplaza 26 unidades fuera del viewBox), y `repeat` y
 * `shuffle` portan UN ciclo de lo que allá repite infinito — en glyphflow el bucle es un input
 * del componente, no una propiedad de la variante.
 */
const T5_EASE = 'ease-in-out';

export const layoutDashboardIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutDashboardShapes, {
    default: {
      // Los cuadros crecen y se achican alternado, pivotando desde su esquina EXTERIOR (la que
      // toca el marco de 18x18) para que el cuadrado que forman entre los 4 no se deforme —
      // solo respira el hueco interior, el contorno exterior se queda fijo.
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '3px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '21px 3px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 240,
          origin: '3px 21px',
        }),
      },
    },
    /** Los grandes se encogen al tamaño de los chicos y viceversa; luego regresan. */
    swap: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '3px 3px' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '21px 21px' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '21px 3px' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '3px 21px' },
        ),
      },
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-10px)', offset: 0 }, { opacity: 0, transform: 'translateY(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 200 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 100 }),
        3: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(10px)', offset: 0 }, { opacity: 0, transform: 'translateY(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 300 }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', easing: T5_EASE }, { transform: 'scale(1.06) rotate(-1.5deg)', easing: T5_EASE }, { transform: 'scale(0.98) rotate(1.5deg)', easing: T5_EASE }, { transform: 'scale(1) rotate(0deg)' }], 1100, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(3px) scale(0.95)', opacity: '0.6', easing: T5_EASE }, { transform: 'translateY(-2px) scale(1.04)', opacity: '1', easing: T5_EASE }, { transform: 'translateY(0px) scale(1)', opacity: '1' }], 900, { easing: 'linear', origin: '6.5px 7.5px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(3px) scale(0.95)', opacity: '0.6', easing: T5_EASE }, { transform: 'translateY(-2px) scale(1.04)', opacity: '1', easing: T5_EASE }, { transform: 'translateY(0px) scale(1)', opacity: '1' }], 900, { easing: 'linear', delay: 80, fill: 'backwards', origin: '17.5px 5.5px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(3px) scale(0.95)', opacity: '0.6', easing: T5_EASE }, { transform: 'translateY(-2px) scale(1.04)', opacity: '1', easing: T5_EASE }, { transform: 'translateY(0px) scale(1)', opacity: '1' }], 900, { easing: 'linear', delay: 160, fill: 'backwards', origin: '17.5px 16.5px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(3px) scale(0.95)', opacity: '0.6', easing: T5_EASE }, { transform: 'translateY(-2px) scale(1.04)', opacity: '1', easing: T5_EASE }, { transform: 'translateY(0px) scale(1)', opacity: '1' }], 900, { easing: 'linear', delay: 240, fill: 'backwards', origin: '6.5px 18.5px' }),
      },
    },
  });

/** Igual que el tablero pero en diagonal. */
export const layoutGridIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutGridShapes, {
    default: {
      // Mismo criterio que layout-dashboard: pivote en la esquina exterior, el cuadrado que
      // forman los 4 no se deforma.
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '3px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 70,
          origin: '21px 3px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 140,
          origin: '21px 21px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 210,
          origin: '3px 21px',
        }),
      },
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 300 }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-10px)', offset: 0 }, { opacity: 0, transform: 'translateY(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 100 }),
        3: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(10px)', offset: 0 }, { opacity: 0, transform: 'translateY(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 200 }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', easing: T5_EASE }, { transform: 'scale(1.03) rotate(1deg)', easing: T5_EASE }, { transform: 'scale(1) rotate(0deg)' }], 600, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.85)', opacity: '0.4', easing: 'ease-out' }, { transform: 'scale(1.08)', opacity: '1', easing: 'ease-out' }, { transform: 'scale(1)', opacity: '1' }], 550, { easing: 'linear', origin: '6.5px 6.5px' }),
        1: /* @__PURE__ */ track([{ transform: 'scale(0.85)', opacity: '0.4', easing: 'ease-out' }, { transform: 'scale(1.08)', opacity: '1', easing: 'ease-out' }, { transform: 'scale(1)', opacity: '1' }], 550, { easing: 'linear', delay: 80, fill: 'backwards', origin: '17.5px 6.5px' }),
        2: /* @__PURE__ */ track([{ transform: 'scale(0.85)', opacity: '0.4', easing: 'ease-out' }, { transform: 'scale(1.08)', opacity: '1', easing: 'ease-out' }, { transform: 'scale(1)', opacity: '1' }], 550, { easing: 'linear', delay: 160, fill: 'backwards', origin: '17.5px 17.5px' }),
        3: /* @__PURE__ */ track([{ transform: 'scale(0.85)', opacity: '0.4', easing: 'ease-out' }, { transform: 'scale(1.08)', opacity: '1', easing: 'ease-out' }, { transform: 'scale(1)', opacity: '1' }], 550, { easing: 'linear', delay: 240, fill: 'backwards', origin: '6.5px 17.5px' }),
      },
    },
  });

/** Sidebar + 2 tarjetas: crecen/achican alternado, el panel lateral respira en ancho (no alto). */
export const layoutPanelLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutPanelLeftShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.12)' }, { transform: 'scaleX(1)' }],
          420,
          { origin: '3px 12px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '21px 3px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
      },
    },
    /** El sidebar es el protagonista: late dos veces, las tarjetas se quedan quietas. */
    focus: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(1.18)' },
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(1.18)' },
            { transform: 'scaleX(1)' },
          ],
          700,
          { origin: '3px 12px' },
        ),
      },
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-5px)', offset: 0 }, { opacity: 0, transform: 'translateX(-5px)', offset: 0.2 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 200 }),
      },
    },
  });

/** Header + 2 tarjetas: crecen/achican alternado, el header respira en alto (no ancho). */
export const layoutPanelTopIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutPanelTopShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.15)' }, { transform: 'scaleY(1)' }],
          420,
          { origin: '12px 3px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '3px 21px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
      },
    },
    /** El header es el protagonista: late dos veces, las tarjetas se quedan quietas. */
    focus: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(1.22)' },
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(1.22)' },
            { transform: 'scaleY(1)' },
          ],
          700,
          { origin: '12px 3px' },
        ),
      },
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-5px)', offset: 0 }, { opacity: 0, transform: 'translateY(-5px)', offset: 0.2 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 200 }),
      },
    },
  });

/** Lista: las 2 miniaturas crecen/achican alternado, los renglones se dibujan de arriba a abajo. */
export const layoutListIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutListShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '3px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 100,
          origin: '3px 21px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 460 }),
      },
    },
    /** Leyendo: los renglones se iluminan uno a uno, en orden, como si se recorrieran. */
    read: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, { delay: 0 }),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, {
          delay: 140,
        }),
        4: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, {
          delay: 280,
        }),
        5: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, {
          delay: 420,
        }),
      },
    },
  });

/** Header + 2 tarjetas asimétricas: los 3 crecen/achican alternado. */
export const layoutTemplateIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutTemplateShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.15)' }, { transform: 'scaleY(1)' }],
          420,
          { origin: '12px 3px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '3px 21px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
      },
    },
    /** Las dos tarjetas intercambian ancho (la angosta se hace ancha y viceversa), luego regresan. */
    select: {
      shapes: {
        1: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.556)' }, { transform: 'scaleX(0.556)' }, { transform: 'scaleX(1)' }],
          900,
          { origin: '3px 21px' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.8)' }, { transform: 'scaleX(1.8)' }, { transform: 'scaleX(1)' }],
          900,
          { delay: 60, origin: '21px 21px' },
        ),
      },
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-5px)', offset: 0 }, { opacity: 0, transform: 'translateY(-5px)', offset: 0.2 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(3px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 200 }),
      },
    },
  });

/** Freeform: sin cuadrado que mantener — cada bloque late desde su propio centro. */
export const layoutFreeformIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutFreeformShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '6.5px 6.5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 90,
          origin: '17.5px 7.5px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 180,
          origin: '7.5px 17.5px',
        }),
      },
    },
    /** Suelto de verdad: cada bloque se ladea y escala a su propio ritmo, sin sincronía. */
    shuffle: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-6deg) scale(1.08)' },
            { transform: 'rotate(0deg) scale(1)' },
          ],
          520,
          { origin: '6.5px 6.5px' },
        ),
        1: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(5deg) scale(0.9)' },
            { transform: 'rotate(0deg) scale(1)' },
          ],
          520,
          { delay: 110, origin: '17.5px 7.5px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-4deg) scale(1.1)' },
            { transform: 'rotate(0deg) scale(1)' },
          ],
          520,
          { delay: 220, origin: '7.5px 17.5px' },
        ),
      },
    },
  });
