// Familia `signal` del catálogo curado (5 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, burst, strokeDraw, icon } from '../choreography';
import { signalHighShapes, signalLowShapes, signalMediumShapes, signalShapes, signalZeroShapes } from '../animated-icons.shapes';

/** Señal completa: el punto y las 4 barras se dibujan de abajo hacia arriba, creciendo. */
export const signalIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 300 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 400 }),
      },
    },
  });

/** Señal fuerte: como signal, sin la barra más alta. */
export const signalHighIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalHighShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 300 }),
      },
    },
  });

/** Señal media: punto + 2 barras. */
export const signalMediumIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalMediumShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  });

/** Señal débil: punto + 1 barra. */
export const signalLowIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalLowShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  });

/** Sin señal: solo el punto. */
export const signalZeroIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalZeroShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260) } },
    cascade: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 1200),
      },
    },
  });
