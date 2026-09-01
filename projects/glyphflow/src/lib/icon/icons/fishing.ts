// Familia `fishing` del catálogo curado (2 iconos).
//
// Las dos animan el MISMO instante —que pique— desde los dos lados de la línea: en el anzuelo se
// ve el tirón de abajo, y en la caña se ve lo que ese tirón le hace arriba. Por eso el anzuelo
// cuelga de su argolla y la caña se dobla desde la empuñadura: son los dos extremos del mismo
// sedal, y cada uno gira sobre el punto que NO se mueve.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, moveYSeq, track, icon } from '../choreography';

/** Pica: el anzuelo da el tirón colgado de su argolla. */
export const fishingHookIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10" },
    { tag: 'path', d: "M20.414 8.586 22 7" },
    { tag: 'circle', cx: 19, cy: 10, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 4, 0]), 720, { easing: EASE, origin: '19px 10px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10.997deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '19px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El otro extremo del mismo tirón: la caña se dobla y el flotador salta. */
export const fishingRodIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 11h1" },
    { tag: 'path', d: "M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4" },
    { tag: 'circle', cx: 18, cy: 18, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 1.5, 0]), 820, { easing: EASE, origin: '6px 15px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 720, { easing: EASE, delay: 140 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-8.613deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '6px 15px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-2.0097px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
