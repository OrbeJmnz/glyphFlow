// Familia `tally` del catálogo curado (5 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, strokeDraw, icon } from '../choreography';
import { tally1Shapes, tally2Shapes, tally3Shapes, tally4Shapes, tally5Shapes } from '../animated-icons.shapes';

// Contando con golpe: cada raya "pega" desde abajo con rebote elástico, en vez de dibujarse
// despacio — la sensación de ir marcando 1, 2, 3... con énfasis.
const TALLY_BOUNCE = /* @__PURE__ */ [
  { transform: 'scaleY(0)' },
  { transform: 'scaleY(1.15)' },
  { transform: 'scaleY(1)' },
];

export const tally1Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally1Shapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260) } },
    count: { shapes: { 0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: EASE, origin: '4px 20px' }) } },
  });

export const tally2Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
      },
    },
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: EASE, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: EASE, origin: '9px 20px' }),
      },
    },
  });

export const tally3Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally3Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
      },
    },
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: EASE, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: EASE, origin: '9px 20px' }),
        2: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 160, easing: EASE, origin: '14px 20px' }),
      },
    },
  });

export const tally4Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally4Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: EASE, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: EASE, origin: '9px 20px' }),
        2: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 160, easing: EASE, origin: '14px 20px' }),
        3: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 240, easing: EASE, origin: '19px 20px' }),
      },
    },
  });

/** Tally de 5: las 4 rayas se dibujan y la diagonal las tacha al final. */
export const tally5Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally5Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 460 }),
      },
    },
    /** Las 4 rayas pegan con rebote; la diagonal remata con un tachón rápido y seco. */
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: EASE, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: EASE, origin: '9px 20px' }),
        2: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 160, easing: EASE, origin: '14px 20px' }),
        3: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 240, easing: EASE, origin: '19px 20px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 420 }),
      },
    },
  });
