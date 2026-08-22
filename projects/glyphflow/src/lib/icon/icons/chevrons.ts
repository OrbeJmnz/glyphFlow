// Familia `chevrons` del catálogo curado (8 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { moveYSeq, track, icon } from '../choreography';
import { chevronsUpDownShapes } from '../animated-icons.shapes';

export const chevronsDownUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 20 5-5 5 5" },
    { tag: 'path', d: "m7 4 5 5 5-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chevronsDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 6 5 5 5-5" },
    { tag: 'path', d: "m7 13 5 5 5-5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const chevronsLeftRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 7-5 5 5 5" },
    { tag: 'path', d: "m15 7 5 5-5 5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chevronsLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 17-5-5 5-5" },
    { tag: 'path', d: "m18 17-5-5 5-5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const chevronsRightLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20 17-5-5 5-5" },
    { tag: 'path', d: "m4 17 5-5-5-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chevronsRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m6 17 5-5-5-5" },
    { tag: 'path', d: "m13 17 5-5-5-5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const chevronsUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 11-5-5-5 5" },
    { tag: 'path', d: "m17 18-5-5-5 5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

/** Ordenar: las dos flechas se separan — el gesto de "esto se puede mover". */
export const chevronsUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronsUpDownShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 500),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });
