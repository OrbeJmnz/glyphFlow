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
