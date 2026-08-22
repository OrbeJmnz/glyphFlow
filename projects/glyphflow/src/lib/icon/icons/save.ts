// Familia `save` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, track, strokeDraw, icon } from '../choreography';
import { saveAllShapes, saveCheckShapes, saveOffShapes, savePenShapes, savePlusShapes, saveShapes } from '../animated-icons.shapes';

const SAVE_POP_ROOT = /* @__PURE__ */ scaleSeq([1, 0.85, 1.06, 1]);

const SAVE_POP_BADGE = /* @__PURE__ */ scaleSeq([1, 1.55, 0.8, 1]);

/** Guardar: se hunde como un botón físico. */
export const saveIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveShapes, {
    default: {
      // El bounce sale de ADENTRO (la etiqueta) más grande y elástico; el cuerpo solo se asienta
      // un poco, no es él quien rebota.
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: EASE,
          origin: '12px 17px',
        }),
      },
    },
  });

/** Guardado y confirmado: la etiqueta rebota y la palomita se dibuja de insignia. */
export const saveCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: EASE,
          origin: '12px 17px',
        }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
    pop: {
      root: /* @__PURE__ */ track(SAVE_POP_ROOT, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(SAVE_POP_BADGE, 550, { delay: 80, easing: EASE, origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
  });

/** Guardado desactivado: se fragmenta y la diagonal la cruza al final. */
export const saveOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 400 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 460 }),
      },
    },
    quick: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 30 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 70 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 110 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 160 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 230, easing: SPRING_OUT }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

/** Guardar y editar: la etiqueta rebota y la pluma se dibuja de insignia. */
export const savePenIcon: AnimatedIconDef = /* @__PURE__ */ icon(savePenShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: EASE,
          origin: '12px 17px',
        }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
    pop: {
      root: /* @__PURE__ */ track(SAVE_POP_ROOT, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(SAVE_POP_BADGE, 550, { delay: 80, easing: EASE, origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
  });

/** Guardar y agregar: la etiqueta rebota y el "+" se dibuja de insignia, en dos trazos. */
export const savePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(savePlusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: EASE,
          origin: '12px 17px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
      },
    },
    pop: {
      root: /* @__PURE__ */ track(SAVE_POP_ROOT, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(SAVE_POP_BADGE, 550, { delay: 80, easing: EASE, origin: '12px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
      },
    },
  });

/** Guardar todo: las dos hojas se asientan una tras otra, la de atrás primero. */
export const saveAllIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveAllShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.9, 1]), 380, { easing: SPRING_OUT, origin: '13px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, {
          delay: 140,
          easing: SPRING_OUT,
          origin: '12px 12px',
        }),
      },
    },
    stack: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.78, 1.05, 1]), 460, {
          easing: EASE,
          origin: '13px 14px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1.08, 1]), 500, {
          delay: 160,
          easing: EASE,
          origin: '12px 12px',
        }),
      },
    },
  });
