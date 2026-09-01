// Familia `flower` del catálogo curado (2 iconos).
//
// Una flor solo hace una cosa: ABRIRSE. Los pétalos arrancan encogidos sobre el corazón y crecen
// desde ahí — nunca desde el centro del lienzo, que en `flower-2` no es el mismo punto: esa tiene
// tallo, así que su corazón está en (12,8) y no en (12,12).
//
// La diferencia entre las dos la marca lo que cuelga del pétalo: la primera remata con sus ocho
// marcas interiores, que aparecen detrás; la segunda tiene hojas, y las hojas se mecen.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, burst, icon } from '../choreography';

/** Los pétalos: arrancan cerrados, se pasan un poco y se asientan. */
const ABRE_PETALOS = /* @__PURE__ */ scaleSeq([0.86, 1.03, 1]);

/** Se abre desde su corazón y las ocho marcas aparecen detrás, en cruz. */
export const flowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'path', d: "M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" },
    { tag: 'path', d: "M12 7.5V9" },
    { tag: 'path', d: "M7.5 12H9" },
    { tag: 'path', d: "M16.5 12H15" },
    { tag: 'path', d: "M12 16.5V15" },
    { tag: 'path', d: "m8 8 1.88 1.88" },
    { tag: 'path', d: "M14.12 9.88 16 8" },
    { tag: 'path', d: "m8 16 1.88-1.88" },
    { tag: 'path', d: "M14.12 14.12 16 16" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ABRE_PETALOS, 620, { easing: SPRING_OUT, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 560, { easing: EASE, delay: 120, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 240, origin: '12px 8.25px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 280, origin: '8.25px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 320, origin: '15.75px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 360, origin: '12px 15.75px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 400, origin: '8.94px 8.94px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 440, origin: '15.06px 8.94px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 480, origin: '8.94px 15.06px' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 520, origin: '15.06px 15.06px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.13)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se abre sobre su tallo y las dos hojas se mecen en sentidos contrarios. */
export const flower2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" },
    { tag: 'circle', cx: 12, cy: 8, r: 2 },
    { tag: 'path', d: "M12 10v12" },
    { tag: 'path', d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" },
    { tag: 'path', d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ABRE_PETALOS, 620, { easing: SPRING_OUT, origin: '12px 8px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 560, { easing: EASE, delay: 120, origin: '12px 8px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2, 0]), 720, { easing: EASE, delay: 220, origin: '12px 21px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, -2, 0]), 720, { easing: EASE, delay: 220, origin: '12px 21px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.13)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);
