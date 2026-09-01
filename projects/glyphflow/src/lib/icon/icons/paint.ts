// Familia `paint` del catálogo curado (2 iconos).
//
// Pintar son dos gestos distintos y no se pueden intercambiar: el cubo VIERTE —se ladea sobre su
// base y la gota cae después, nunca a la vez— y el rodillo PASA, con el mango llegando tarde
// porque va detrás de la mano.
//
// El cubo se ladea solo 3°: con más, su asa se sale del lienzo por la izquierda.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, rotateSeq, track, burst, icon, held } from '../choreography';

/** Vierte: se ladea sobre la base y la gota cae detrás. */
export const paintBucketIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 7 6 2" },
    { tag: 'path', d: "M18.992 12H2.041" },
    { tag: 'path', d: "M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595" },
    { tag: 'path', d: "m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 0]), 760, { easing: EASE, origin: '11px 19px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 0]), 760, { easing: EASE, origin: '11px 19px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 0]), 760, { easing: EASE, origin: '11px 19px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 320, origin: '20px 19px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '20px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Da la pasada: el rodillo va delante y el mango llega tarde, que es donde está la mano. */
export const paintRollerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 16, height: 6, x: 2, y: 2, rx: 2 },
    { tag: 'path', d: "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" },
    { tag: 'rect', width: 4, height: 6, x: 8, y: 16, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 720, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.5, 0]), 720, { easing: EASE, delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.5, 0]), 720, { easing: EASE, delay: 90 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(1.9496px)' }], 320),
  },
);
