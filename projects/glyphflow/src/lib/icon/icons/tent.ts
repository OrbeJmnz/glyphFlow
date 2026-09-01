// Familia `tent` del catálogo curado (2 iconos).
//
// Una tienda de campaña no tiene piezas móviles: lo único que se mueve de verdad es el momento en
// que se PLANTA. Por eso los dos palos giran desde su cumbre —que es donde se cruzan y no se
// separan nunca— y el suelo se queda quieto: es el suelo.
//
// `tent-tree` no es una tienda, es un campamento. Ahí la tienda ya está plantada y lo que se mueve
// es lo vivo: el pino se mece con más amplitud arriba que abajo, y el sol late.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, icon } from '../choreography';

/** La solapa de la entrada se estrecha: se abre. */
const ENTRADA_ABRE = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.55)', offset: 0.55 },
  { transform: 'scaleX(1)', offset: 1 },
];

/** Se planta: los dos palos se clavan desde la cumbre y la entrada se abre detrás. */
export const tentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3.5 21 14 3" },
    { tag: 'path', d: "M20.5 21 10 3" },
    { tag: 'path', d: "M15.5 21 12 15l-3.5 6" },
    { tag: 'path', d: "M2 21h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 2.5, 0]), 620, { easing: EASE, origin: '14px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -2.5, 0]), 620, { easing: EASE, origin: '10px 3px' }),
        2: /* @__PURE__ */ track(ENTRADA_ABRE, 560, { easing: EASE, delay: 160, origin: '12px 21px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(2.5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-2.5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 3px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.55)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El campamento: el pino se mece —más arriba que abajo— y el sol late. La tienda no se mueve. */
export const tentTreeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 4, cy: 4, r: 2 },
    { tag: 'path', d: "m14 5 3-3 3 3" },
    { tag: 'path', d: "m14 10 3-3 3 3" },
    { tag: 'path', d: "M17 14V2" },
    { tag: 'path', d: "M17 14H7l-5 8h20Z" },
    { tag: 'path', d: "M8 14v8" },
    { tag: 'path', d: "m9 14 5 8" },
  ],
  {
    default: {
      shapes: {
        // Mismo pivote —el pie del tronco— y distinta amplitud: así se dobla, en vez de bascular.
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.8, 0]), 900, { easing: EASE, origin: '17px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 2, -1.2, 0]), 900, { easing: EASE, origin: '17px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 1.2, -0.7, 0]), 900, { easing: EASE, origin: '17px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.14, 1]), 720, { easing: EASE, delay: 120, origin: '4px 4px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(20.148deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(13.432deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(8.0592deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);
