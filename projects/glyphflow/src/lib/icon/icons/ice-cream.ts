// Familia `ice-cream` del catálogo curado (2 iconos).
//
// Las dos son bolas de helado servidas, así que las dos hacen lo mismo: caer y posarse. Lo que
// cambia es cuántas y sobre qué. En el cuenco son tres y llegan escalonadas —servir es un gesto
// repetido—; en el cono es una sola y aterriza sobre el barquillo, que acusa el peso.
//
// Ninguna gira: son casi círculos, y un círculo girando no se ve.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveYSeq, scaleSeq, track, icon } from '../choreography';

/** Cae desde arriba y se asienta. El margen del lienzo da 1 unidad: se usa 0.9. */
const SIRVE = /* @__PURE__ */ moveYSeq([-0.9, 0]);

/** Tres bolas que llegan una tras otra, no un bloque que baja. */
export const iceCreamBowlIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0" },
    { tag: 'path', d: "M12.14 11a3.5 3.5 0 1 1 6.71 0" },
    { tag: 'path', d: "M15.5 6.5a3.5 3.5 0 1 0-7 0" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(SIRVE, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SIRVE, 520, { easing: SPRING_OUT, delay: 110 }),
        0: /* @__PURE__ */ track(SIRVE, 520, { easing: SPRING_OUT, delay: 220 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Una bola que aterriza y un barquillo que acusa el peso. */
export const iceCreamConeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" },
    { tag: 'path', d: "M17 7A5 5 0 0 0 7 7" },
    { tag: 'path', d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(SIRVE, 520, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.45, 0]), 520, { easing: SPRING_OUT, delay: 60 }),
        // El cono se comprime cuando la bola llega, con el pivote en su punta.
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 520, { easing: EASE, delay: 220, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
