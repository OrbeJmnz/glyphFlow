// Familia `smartphone` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_SMOOTH, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { smartphoneShapes } from '../animated-icons.shapes';

export const smartphoneChargingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 14, height: 20, x: 5, y: 2, rx: 2, ry: 2 },
    { tag: 'path', d: "M12.667 8 10 12h4l-2.667 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const smartphoneNfcIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 7, height: 12, x: 2, y: 6, rx: 1 },
    { tag: 'path', d: "M13 8.32a7.43 7.43 0 0 1 0 7.36" },
    { tag: 'path', d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58" },
    { tag: 'path', d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
      },
    },
  },
);

/** Vibración de celular: corta y nerviosa, no un mecidito. */
export const smartphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(smartphoneShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 7, -5, 5, -2, 0]), 600, {
        easing: SPRING_SMOOTH,
      }),
    },
  });
