// Familia `sticky` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, strokeDraw, icon } from '../choreography';
import { stickyNoteCheckShapes, stickyNoteMinusShapes, stickyNoteOffShapes, stickyNotePlusShapes, stickyNoteShapes, stickyNoteXShapes } from '../animated-icons.shapes';
import { FOLD_CHIDA } from './_shared';

const FOLD_FLIP = /* @__PURE__ */ [{ transform: 'rotate(-25deg)' }, { transform: 'rotate(0deg)' }];

/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** La nota de encima se despega de la pila. */
const E1_PEEL = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(-1.5px, 1.5px)' },
  { transform: 'translate(0, 0)' },
];

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
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 17 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 50 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 91 }),
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

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** La nota de encima se despega de la pila. */
export const stickyNotesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10 8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 16 14v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z",
    },
    { tag: 'path', d: "M10 8v5a1 1 0 0 0 1 1h5" },
    {
      tag: 'path',
      d: "M8 4a2 2 0 0 1 2-2h6a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 22 8v6a2 2 0 0 1-2 2",
    },
    { tag: 'path', d: "M16 2v5a1 1 0 0 0 1 1h5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PEEL, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PEEL, 620, { easing: EASE }),
      },
    },
  },
);
