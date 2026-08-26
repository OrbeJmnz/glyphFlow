// Familia `wind` del catálogo curado (2 iconos).
//
// El viento no es una figura: es el desfase entre tres. Las ráfagas salen en cadena de arriba
// abajo y la de en medio llega más lejos, porque es la más larga. Soplarlas a la vez, o con el
// mismo recorrido, las convierte en un bloque que se desliza.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, moveYSeq, track, icon } from '../choreography';

/** Sopla en cadena, y la ráfaga larga viaja más. */
export const windIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.8 19.6A2 2 0 1 0 14 16H2" },
    { tag: 'path', d: "M17.5 8a2.5 2.5 0 1 1 2 4H2" },
    { tag: 'path', d: "M9.8 4.4A2 2 0 1 1 11 8H2" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 720, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.9, 0]), 720, { easing: EASE, delay: 110 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 720, { easing: EASE, delay: 220 }),
      },
    },
    // Sostenido no es «sopla más lejos», es ventarrón: las tres ráfagas se ESTIRAN desde el borde
    // por donde entra el aire. El default mueve; el hold cuenta en qué acaba ese movimiento.
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.05)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '2px 6px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.05)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '2px 10px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.05)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 120, origin: '2px 18px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Cae la racha: la flecha baja con su punta y las ráfagas soplan detrás. */
export const windArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v8" },
    { tag: 'path', d: "M12.8 21.6A2 2 0 1 0 14 18H2" },
    { tag: 'path', d: "M17.5 10a2.5 2.5 0 1 1 2 4H2" },
    { tag: 'path', d: "m6 6 4 4 4-4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 620, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 720, { easing: EASE, delay: 140 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 720, { easing: EASE, delay: 270 }),
      },
    },
    // La racha ya cayó: la flecha se queda abajo, clavada, y el viento tira de las dos ráfagas.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.05)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 80, origin: '2px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.05)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 140, origin: '2px 20px' }),
      },
      reverseOnLeave: true,
    },
  },
);
