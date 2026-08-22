// Familia `between` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';

export const betweenHorizontalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 13, height: 7, x: 3, y: 3, rx: 1 },
    { tag: 'path', d: "m22 15-3-3 3-3" },
    { tag: 'rect', width: 13, height: 7, x: 3, y: 14, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const betweenHorizontalStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 13, height: 7, x: 8, y: 3, rx: 1 },
    { tag: 'path', d: "m2 9 3 3-3 3" },
    { tag: 'rect', width: 13, height: 7, x: 8, y: 14, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const betweenVerticalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 7, height: 13, x: 3, y: 3, rx: 1 },
    { tag: 'path', d: "m9 22 3-3 3 3" },
    { tag: 'rect', width: 7, height: 13, x: 14, y: 3, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const betweenVerticalStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 7, height: 13, x: 3, y: 8, rx: 1 },
    { tag: 'path', d: "m15 2-3 3-3-3" },
    { tag: 'rect', width: 7, height: 13, x: 14, y: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
