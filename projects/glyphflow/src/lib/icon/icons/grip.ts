// Familia `grip` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { moveXSeq, track, icon } from '../choreography';
import { gripVerticalShapes } from '../animated-icons.shapes';

export const gripHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 9, r: 1 },
    { tag: 'circle', cx: 19, cy: 9, r: 1 },
    { tag: 'circle', cx: 5, cy: 9, r: 1 },
    { tag: 'circle', cx: 12, cy: 15, r: 1 },
    { tag: 'circle', cx: 19, cy: 15, r: 1 },
    { tag: 'circle', cx: 5, cy: 15, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
      },
    },
  },
);

export const gripIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 5, r: 1 },
    { tag: 'circle', cx: 19, cy: 5, r: 1 },
    { tag: 'circle', cx: 5, cy: 5, r: 1 },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 19, cy: 12, r: 1 },
    { tag: 'circle', cx: 5, cy: 12, r: 1 },
    { tag: 'circle', cx: 12, cy: 19, r: 1 },
    { tag: 'circle', cx: 19, cy: 19, r: 1 },
    { tag: 'circle', cx: 5, cy: 19, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 280, fill: 'backwards' }),
        8: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

/** Agarradera: los puntos se cimbran por filas — invita a arrastrar. */
export const gripVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(gripVerticalShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 90 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 180 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 180 }),
      },
    },
    cascade: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out' }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
      },
    },
  });
