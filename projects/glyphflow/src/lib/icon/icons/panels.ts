// Familia `panels` del catálogo curado (3 iconos).
//
// Mismo divisor que `panel-*`, importado de _shared: se mueve hacia donde apunta su nombre y se
// sostiene ahí. Aquí hay DOS divisores por icono, uno por cada panel que el nombre menciona, y
// cada uno va hacia el suyo — el desfase de 90 ms es para que no se lean como un bloque.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';
import { PANEL_DIVIDER_DOWN, PANEL_DIVIDER_LEFT, PANEL_DIVIDER_RIGHT, PANEL_DIVIDER_UP } from './_shared';

/** El divisor vertical se va a la izquierda y el horizontal, abajo. Cada uno hacia su panel. */
export const panelsLeftBottomIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M9 3v18" },
    { tag: 'path', d: "M9 15h12" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550),
        2: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550, { delay: 90 }),
      },
    },
  },
);

/** A la derecha y abajo. */
export const panelsRightBottomIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M3 15h12" },
    { tag: 'path', d: "M15 3v18" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550),
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550, { delay: 90 }),
      },
    },
  },
);

/** Arriba y a la izquierda. */
export const panelsTopLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M3 9h18" },
    { tag: 'path', d: "M9 21V9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550),
        2: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550, { delay: 90 }),
      },
    },
  },
);
