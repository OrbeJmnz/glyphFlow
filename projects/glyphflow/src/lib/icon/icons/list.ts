// Familia `list` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, burst, strokeDraw, icon } from '../choreography';
import { listChecksShapes, listShapes } from '../animated-icons.shapes';

export const listFilterPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5H2" },
    { tag: 'path', d: "M6 12h12" },
    { tag: 'path', d: "M9 19h6" },
    { tag: 'path', d: "M16 5h6" },
    { tag: 'path', d: "M19 8V2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

export const listTreeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 5h13" },
    { tag: 'path', d: "M13 12h8" },
    { tag: 'path', d: "M13 19h8" },
    { tag: 'path', d: "M3 10a2 2 0 0 0 2 2h3" },
    { tag: 'path', d: "M3 5v12a2 2 0 0 0 2 2h3" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const listCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M16 12H3" },
    { tag: 'path', d: "M11 19H3" },
    { tag: 'path', d: "m15 18 2 2 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const listTodoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M13 5h8' },
    { tag: 'path', d: 'M13 12h8' },
    { tag: 'path', d: 'M13 19h8' },
    { tag: 'path', d: 'm3 17 2 2 4-4' },
    { tag: 'rect', x: 3, y: 4, width: 6, height: 6, rx: 1 },
  ],
  {
    /** Las 3 líneas se dibujan de arriba a abajo; el cuadro y el check aparecen de un salto. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, {}),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 180, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, {
          delay: 150,
          fill: 'backwards',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, {
          delay: 300,
          fill: 'backwards',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480, fill: 'backwards' }),
      },
    },
  },
);

/** Lista: las viñetas caen en orden. */
export const listIcon: AnimatedIconDef = /* @__PURE__ */ icon(listShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 90 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }),
      },
    },
  });

/** Pendientes que se van palomeando. */
export const listChecksIcon: AnimatedIconDef = /* @__PURE__ */ icon(listChecksShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 160 }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });
