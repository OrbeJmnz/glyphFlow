// Familia `sticky` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, strokeDraw, icon } from '../choreography';
import { stickyNoteCheckShapes, stickyNoteMinusShapes, stickyNoteOffShapes, stickyNotePlusShapes, stickyNoteShapes, stickyNoteXShapes } from '../animated-icons.shapes';
import { FOLD_CHIDA } from './_shared';

const FOLD_FLIP = /* @__PURE__ */ [{ transform: 'rotate(-25deg)' }, { transform: 'rotate(0deg)' }];

export const stickyNoteIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }) },
    },
    flip: {
      shapes: { 1: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }) },
    },
  });

/** Tarea lista: la esquina se aprieta y la palomita se dibuja de insignia. */
export const stickyNoteCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        1: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
  });

/** Quitar: la esquina se aprieta y el "-" se dibuja de insignia. */
export const stickyNoteMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteMinusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Descartada: la esquina se aprieta, el cuerpo se dibuja en fragmentos y la diagonal la tacha. */
export const stickyNoteOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 420 }),
      },
    },
  });

/** Nueva nota: la esquina se aprieta y el "+" se dibuja de insignia, en dos trazos. */
export const stickyNotePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNotePlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Quitar: la esquina se aprieta y la equis se dibuja de insignia. */
export const stickyNoteXIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
  });
