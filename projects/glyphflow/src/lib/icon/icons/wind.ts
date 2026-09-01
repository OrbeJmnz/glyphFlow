// Familia `wind` del catálogo curado (2 iconos).
//
// El viento no es una figura: es el desfase entre tres. Las ráfagas salen en cadena de arriba
// abajo y la de en medio llega más lejos, porque es la más larga. Soplarlas a la vez, o con el
// mismo recorrido, las convierte en un bloque que se desliza.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, moveYSeq, track, icon } from '../choreography';

/** Sopla en cadena, y la ráfaga larga viaja más. */
/* ── Variantes de la tanda 6 ──────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). Easing por keyframe, `times` como
 * `offset`, y un solo ciclo donde el original repite infinito — en glyphflow el bucle es un
 * input del componente, no una propiedad de la variante.
 *
 * Donde el trazo se dibuja de cero y dejaría el icono incompleto va una GUÍA: una figura anexa
 * con `opacity: '0'` que se enciende tenue mientras dura el gesto. Mismo mecanismo que las
 * monedas y que la arista de `archive`.
 */
const T6_EASE = 'ease-in-out';
const T6_DECEL = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const windIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.8 19.6A2 2 0 1 0 14 16H2" },
    { tag: 'path', d: "M17.5 8a2.5 2.5 0 1 1 2 4H2" },
    { tag: 'path', d: "M9.8 4.4A2 2 0 1 1 11 8H2" },
    // Guía del relleno: sin ella las tres ráfagas se dibujan de cero y el icono queda
    // COMPLETAMENTE vacío al arrancar el gesto — medido, la tinta caía a 0.00.
    { tag: 'path', d: "M12.8 19.6A2 2 0 1 0 14 16H2", opacity: '0' },
    { tag: 'path', d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", opacity: '0' },
    { tag: 'path', d: "M9.8 4.4A2 2 0 1 1 11 8H2", opacity: '0' },
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
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.0976)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '2px 6px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.0976)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '2px 10px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.0976)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 120, origin: '2px 18px' }),
      },
      reverseOnLeave: true,
    },
    reveal: {
      shapes: {
        3: /* @__PURE__ */ track([{ opacity: '0.22', offset: 0 }, { opacity: '0.22', offset: 0.82 }, { opacity: '0', offset: 1 }], 900, { easing: T6_EASE }),
        4: /* @__PURE__ */ track([{ opacity: '0.22', offset: 0 }, { opacity: '0.22', offset: 0.82 }, { opacity: '0', offset: 1 }], 900, { easing: T6_EASE }),
        5: /* @__PURE__ */ track([{ opacity: '0.22', offset: 0 }, { opacity: '0.22', offset: 0.82 }, { opacity: '0', offset: 1 }], 900, { easing: T6_EASE }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '0 1', transform: 'translateX(-3px)', opacity: '0' }, { strokeDasharray: '1 1', transform: 'translateX(0px)', opacity: '1' }], 600, { easing: T6_DECEL }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1', transform: 'translateX(-3px)', opacity: '0' }, { strokeDasharray: '1 1', transform: 'translateX(0px)', opacity: '1' }], 600, { easing: T6_DECEL, delay: 120, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ strokeDasharray: '0 1', transform: 'translateX(-3px)', opacity: '0' }, { strokeDasharray: '1 1', transform: 'translateX(0px)', opacity: '1' }], 600, { easing: T6_DECEL, delay: 240, fill: 'backwards' }),
      },
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
