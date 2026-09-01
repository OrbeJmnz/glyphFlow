// Familia `bell` del catálogo curado (7 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, moveXSeq, track, burst, strokeDraw, icon } from '../choreography';
import { bellCheckShapes, bellDotShapes, bellMinusShapes, bellOffShapes, bellPlusShapes, bellRingShapes, bellShapes } from '../animated-icons.shapes';

const BELL_SHAKE_ROOT = /* @__PURE__ */ rotateSeq([0, 18, -12, 9, -5, 0]);

const BELL_CLAPPER = /* @__PURE__ */ moveXSeq([0, -4, 3, -2, 1, 0]);

// Mismo repique que el `bell` base (sin -ring), como prefijo largo antes de mostrar la insignia.
const BELL_RING_ROOT = /* @__PURE__ */ rotateSeq([0, 20, -10, 10, -5, 3, 0]);

const BELL_RING_CLAPPER = /* @__PURE__ */ moveXSeq([0, -6, 5, -5, 4, -3, 2, 0]);

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Aparece de golpe con un rebote corto. */
const E2_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

/** Lo que vibra al sonar: una campana, un megáfono. Corto y rápido, o parece que se cae. */
const E2_RING = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-8deg)', offset: 0.2 },
  { transform: 'rotate(7deg)', offset: 0.45 },
  { transform: 'rotate(-4deg)', offset: 0.7 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** Una onda que sale hacia fuera. */
const E2_WAVE_OUT = /* @__PURE__ */ [
  { transform: 'scale(0.6)', opacity: 0, offset: 0 },
  { transform: 'scale(1)', opacity: 1, offset: 0.6 },
  { transform: 'scale(1)', opacity: 1, offset: 1 },
];

/**
 * El martillo golpea la campana y rebota. Va hacia ella —está en (9,9) y él en (20,16)— y el
 * recorrido se reparte entre los dos ejes en esa proporción, o el golpe no apuntaría a nada.
 */
const E2_STRIKE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(-1.7px, -1.1px)', offset: 0.3 },
  { transform: 'translate(0.5px, 0.3px)', offset: 0.55 },
  { transform: 'translate(-0.7px, -0.45px)', offset: 0.75 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Cuerpo 0.9s y badajo 1.1s: ese desfase ES el efecto (portado de Animate UI). */
export const bellIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 20, -10, 10, -5, 3, 0]), 900, { origin: 'top center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -6, 5, -5, 4, -3, 2, 0]), 1100) },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(20deg)' }, { transform: 'rotate(-10deg)' }, { transform: 'rotate(10deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: EASE, origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(0)' }], 1100, { easing: EASE }),
      },
    },
    spark: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 20, -10, 10, -5, 3, 0]), 900, { origin: 'top center' }),
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'scale(0.4)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-1.5px, 0px)', opacity: '0.9', offset: 0.4, easing: 'ease-out' }, { transform: 'translate(-1.5px, 0px)', opacity: '0', offset: 1 }], 620, { easing: 'linear', origin: '12px 12px', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scale(0.4)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(1.5px, 0px)', opacity: '0.9', offset: 0.4, easing: 'ease-out' }, { transform: 'translate(1.5px, 0px)', opacity: '0', offset: 1 }], 620, { easing: 'linear', origin: '12px 12px', delay: 60, fill: 'backwards' }), 0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -6, 5, -5, 4, -3, 2, 0]), 1100) },
    },
  });

/** Campana con ondas: repica y las ondas salen DESPUÉS del primer golpe, no junto con él. */
export const bellRingIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellRingShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 18, -12, 9, -5, 0]), 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -5, 4, -3, 2, 0]), 1050),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 650, { delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 650, { delay: 140 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(20deg)' }, { transform: 'rotate(-10deg)' }, { transform: 'rotate(10deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: EASE, origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(0)' }], 1100, { easing: EASE }),
      },
    },
  });

export const bellCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 550 }),
      },
    },
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 850 }),
      },
    },
  });

export const bellDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellDotShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 550 }),
      },
    },
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 850 }),
      },
    },
  });

export const bellMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 550 }),
      },
    },
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
      },
    },
  });

/** Silenciada: se fragmenta y la diagonal cruza al final — sin repique, ya no suena. */
export const bellOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 360 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es su proyección sobre el eje del corte, no un número a ojo.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 120 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 140 }),
      },
    },
  });

export const bellPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 550 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 550 }),
      },
    },
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** El martillo golpea la campana y rebota; ella suena después del impacto, no a la vez. */
export const bellElectricIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18.518 17.347A7 7 0 0 1 14 19" },
    { tag: 'path', d: "M18.8 4A11 11 0 0 1 20 9" },
    { tag: 'path', d: "M9 9h.01" },
    { tag: 'circle', cx: 20, cy: 16, r: 2 },
    { tag: 'circle', cx: 9, cy: 9, r: 7 },
    { tag: 'rect', x: 4, y: 16, width: 10, height: 6, rx: 2 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(E2_STRIKE, 700, { easing: EASE }),
        0: /* @__PURE__ */ track(E2_STRIKE, 700, { easing: EASE }),
        4: /* @__PURE__ */ track(E2_RING, 620, { easing: EASE, origin: '9px 9px', delay: 210, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_POP, 300, { easing: 'ease-out', origin: '9px 9px', delay: 260, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_WAVE_OUT, 480, { easing: 'ease-out', origin: '19px 6.5px', delay: 340, fill: 'backwards' }),
      },
    },
  },
);
