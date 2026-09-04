// Familia `rows` del catálogo curado (3 iconos).
//
// Mismo divisor que `panel-*` y `panels-*`, importado de _shared: se desliza y se SOSTIENE ahí,
// con regreso rápido al final. No es el despliegue desde el borde de `columns-*`, aunque sean
// familias espejo — un divisor de fila se lee como algo que se arrastra, no como algo que crece.
//
// Los tres van hacia abajo porque aquí el nombre no da dirección: en `panels-left-bottom` cada
// divisor sabe hacia qué panel ir, y en `rows-3` no hay tal cosa. Lo que evita que se lean como
// un bloque es el escalonado de 90 ms, no la dirección.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';
import { despliegaLuego, PANEL_DIVIDER_DOWN } from './_shared';

/** Dos filas: el divisor se desliza hacia abajo y se sostiene. */
export const rows2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M3 12h18" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550),
      },
    },
    /**
     * El divisor se despliega desde su borde y LUEGO baja y se sostiene, igual que el default.
     */
    assemble: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ despliegaLuego('X', PANEL_DIVIDER_DOWN), 780, { delay: 0, fill: 'backwards' }),
      },
    },
  },
);

/** Tres filas: los divisores bajan uno tras otro. */
export const rows3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M21 9H3" },
    { tag: 'path', d: "M21 15H3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550),
        2: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550, { delay: 90 }),
      },
    },
    /**
     * El divisor se despliega desde su borde y LUEGO baja y se sostiene, igual que el default.
     */
    assemble: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ despliegaLuego('X', PANEL_DIVIDER_DOWN), 780, { delay: 0, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ despliegaLuego('X', PANEL_DIVIDER_DOWN), 780, { delay: 90, fill: 'backwards' }),
      },
    },
  },
);

/** Y cuatro. */
export const rows4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M21 7.5H3" },
    { tag: 'path', d: "M21 12H3" },
    { tag: 'path', d: "M21 16.5H3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550),
        2: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550, { delay: 90 }),
        3: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550, { delay: 180 }),
      },
    },
    /**
     * El divisor se despliega desde su borde y LUEGO baja y se sostiene, igual que el default.
     */
    assemble: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ despliegaLuego('X', PANEL_DIVIDER_DOWN), 780, { delay: 0, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ despliegaLuego('X', PANEL_DIVIDER_DOWN), 780, { delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ despliegaLuego('X', PANEL_DIVIDER_DOWN), 780, { delay: 180, fill: 'backwards' }),
      },
    },
  },
);
