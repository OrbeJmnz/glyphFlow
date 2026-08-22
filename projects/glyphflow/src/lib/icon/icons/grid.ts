// Familia `grid` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, burst, strokeDraw, icon } from '../choreography';
import { grid2x2CheckShapes, grid2x2PlusShapes, grid2x2Shapes, grid2x2XShapes } from '../animated-icons.shapes';

// El marco entra con un pop; las divisiones/insignia se dibujan encima.
// Parpadeo corto tras dibujarse, como refrescando la vista.
const GRID_FLASH = /* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.3' }, { opacity: '1' }];

export const grid2x2Icon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2Shapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    flash: {
      shapes: {
        0: /* @__PURE__ */ track(GRID_FLASH, 240),
        1: /* @__PURE__ */ track(GRID_FLASH, 240, { delay: 100 }),
      },
    },
  });

/** Selección confirmada: el marco entra y la palomita se dibuja de insignia. */
export const grid2x2CheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2CheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 340 }),
      },
    },
    flash: { shapes: { 0: /* @__PURE__ */ track(GRID_FLASH, 240) } },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Agregar: el marco entra y el "+" se dibuja de insignia, en dos trazos. */
export const grid2x2PlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2PlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    flash: { shapes: { 0: /* @__PURE__ */ track(GRID_FLASH, 240) } },
  });

/** Quitar: el marco entra y la equis se dibuja de insignia. */
export const grid2x2XIcon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2XShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      },
    },
    flash: { shapes: { 0: /* @__PURE__ */ track(GRID_FLASH, 240) } },
  });
