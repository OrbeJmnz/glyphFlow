// Familia `utensils` del catálogo curado (2 iconos).
//
// Los mismos dos cubiertos en dos situaciones distintas, y por eso NO se mueven igual: puestos en
// paralelo, poner la mesa es separarlos; cruzados, lo único que pueden hacer es abrirse sobre el
// punto donde se cruzan, como unas tijeras.
//
// El tenedor viaja entero —cabeza y mango— porque es una pieza: si el mango se quedara, se
// partiría por el cuello.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, rotateSeq, track, icon } from '../choreography';

/** Poner la mesa: los cubiertos se apartan a sus lados y vuelven. */
export const utensilsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" },
    { tag: 'path', d: "M7 2v20" },
    { tag: 'path', d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.9, 0]), 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.9, 0]), 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.9, 0]), 620, { easing: EASE, delay: 80 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-2.1996px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-2.1996px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(2.1996px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Cruzados solo pueden abrirse: giran en sentidos opuestos sobre el punto donde se cruzan. */
export const utensilsCrossedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" },
    { tag: 'path', d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" },
    { tag: 'path', d: "m2.1 21.8 6.4-6.3" },
    { tag: 'path', d: "m19 5-7 7" },
  ],
  {
    default: {
      shapes: {
        // El tenedor (cabeza + asta) hacia un lado…
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, 0]), 660, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, 0]), 660, { easing: EASE, origin: '12px 12px' }),
        // …y el cuchillo con su mango hacia el otro.
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 660, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 660, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(11deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(11deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-11deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-11deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);
