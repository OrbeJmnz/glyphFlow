// Familia `grid` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, burst, strokeDraw, icon } from '../choreography';
import { grid2x2CheckShapes, grid2x2PlusShapes, grid2x2Shapes, grid2x2XShapes } from '../animated-icons.shapes';
import { lineaDespliegaYVaga } from './_shared';

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
    mark: {
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

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** La rejilla se arma: primero el travesaño y después las columnas. */
export const grid3x2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 3v18" },
    { tag: 'path', d: "M3 12h18" },
    { tag: 'path', d: "M9 3v18" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 2.2, 2), 930, { origin: '15px 3px', delay: 170, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('X', 'Y', 3, 1), 930, { origin: '3px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 2.2, 0), 930, { origin: '9px 3px', delay: 108, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo con dos de cada. */
export const grid3x3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M3 9h18" },
    { tag: 'path', d: "M3 15h18" },
    { tag: 'path', d: "M9 3v18" },
    { tag: 'path', d: "M15 3v18" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('X', 'Y', 2.2, 0), 904, { origin: '3px 9px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('X', 'Y', 2.2, 2), 904, { origin: '3px 15px', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 2.2, 1), 904, { origin: '9px 3px', delay: 136, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 2.2, 0), 904, { origin: '15px 3px', delay: 196, fill: 'backwards' }),
      },
    },
  },
);
