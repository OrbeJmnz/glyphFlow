// Familia `copy` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, strokeDraw, icon } from '../choreography';
import { copyCheckShapes, copyMinusShapes, copyPlusShapes, copyShapes, copySlashShapes, copyXShapes } from '../animated-icons.shapes';
import { COPY_PEEL } from './_shared';

/** Copiar: la hoja de enfrente se desliza y vuelve — el gesto de sacar una copia. */
const COPY_HANDSHAKE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(1.5px, -1.5px)' },
  { transform: 'translate(0, 0)' },
];

export const copyIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(COPY_HANDSHAKE, 600) } },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const copyCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Quitar copia: se separa y el "-" se dibuja de insignia. */
export const copyMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Agregar copia: se separa y el "+" se dibuja de insignia, en dos trazos. */
export const copyPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyPlusShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Copia inválida: se separa y una sola diagonal la tacha. */
export const copySlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(copySlashShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 350 }),
      },
    },
  });

/** Cancelar copia: se separa y la equis se dibuja de insignia. */
export const copyXIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyXShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
    peel: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
  });
