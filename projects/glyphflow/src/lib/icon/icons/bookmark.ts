// Familia `bookmark` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { bookmarkCheckShapes, bookmarkMinusShapes, bookmarkOffShapes, bookmarkPlusShapes, bookmarkShapes, bookmarkXShapes } from '../animated-icons.shapes';

// El listón cae desde arriba y se asienta — así se coloca un separador de verdad.
const BOOKMARK_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-3px)' },
  { transform: 'translateY(0)' },
];

// El listón ondea como bandera, colgado desde arriba.
const BOOKMARK_WAVE = /* @__PURE__ */ track(
  /* @__PURE__ */ rotateSeq([0, -4, 3, -2, 0]),
  450,
  { origin: 'top center' },
);

export const bookmarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(BOOKMARK_DROP, 450, { easing: SPRING_OUT }) } },
    wave: { root: BOOKMARK_WAVE },
    pulse: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
      },
    },
  });

/** Guardado: el listón cae y la palomita se dibuja de insignia. */
export const bookmarkCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Quitar: el listón cae y el "-" se dibuja de insignia. */
export const bookmarkMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  });

/** Sin guardar: el listón se dibuja en fragmentos y la diagonal lo tacha al final. */
export const bookmarkOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkOffShapes, {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 380 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es su proyección sobre el eje del corte, no un número a ojo.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 140 }),
      },
    },
  });

/** Guardar: el listón cae y el "+" se dibuja de insignia, en dos trazos. */
export const bookmarkPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkPlusShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });

/** Quitar: el listón cae y la equis se dibuja de insignia. */
export const bookmarkXIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });
