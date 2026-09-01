// Familia `heart` del catálogo curado (8 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, track, strokeDraw, icon } from '../choreography';
import { heartCrackShapes, heartHandshakeShapes, heartMinusShapes, heartOffShapes, heartPlusShapes, heartPulseShapes, heartShapes, heartXShapes } from '../animated-icons.shapes';
import { HEART_QUAD_PULSE } from './_shared';

const HEART_BEAT = /* @__PURE__ */ scaleSeq([1, 1.1, 1]);

/**
 * El corazón base — cierra la familia: sus cinco hermanos (`heart-crack`, `-handshake`, `-minus`,
 * `-plus`, `-x`) ya comparten este par exacto de variantes, y este era el único que se quedaba con
 * solo `draw`. Sin figura extra que trazar: aquí todo el gesto es la silueta completa.
 */
export const heartIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
    },
    spark: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.55)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'scale(0.95)', opacity: '0.28', offset: 0.4, easing: 'ease-out' }, { transform: 'scale(1.25)', opacity: '0', offset: 1 }], 620, { easing: 'linear', origin: '12px 12px' }),
      },
    },
  });

/** Latido doble (como el de verdad) y el electro trazándose encima. */
export const heartPulseIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartPulseShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1, 1.08, 1]), 900, { origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 700, { delay: 150 }) },
    },
  });

export const heartCrackIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartCrackShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 260 }) },
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 260 }) },
    },
  });

/** Un solo trazo — no hay insignia que dibujar aparte, todo el gesto es la figura completa. */
export const heartHandshakeIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartHandshakeShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
    },
  });

export const heartMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }) },
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }) },
    },
  });

/** Ya no es favorito: se fragmenta y la diagonal cruza al final — sin latido. */
export const heartOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 160 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 18 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 68 }),
      },
    },
  });

export const heartPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
      },
    },
  });

export const heartXIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartXShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
  });
