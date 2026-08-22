// Familia `move` del catálogo curado (12 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';
import { moveRightShapes } from '../animated-icons.shapes';

export const moveDiagonal2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 13v6h-6" },
    { tag: 'path', d: "M5 11V5h6" },
    { tag: 'path', d: "m5 5 14 14" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(-3px, -3px)', offset: 0.25 }, { transform: 'translate(0, 0)', offset: 0.45 }, { transform: 'translate(0, 0)', offset: 0.55 }, { transform: 'translate(3px, 3px)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000),
    },
  },
);

export const moveDiagonalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 19H5v-6" },
    { tag: 'path', d: "M13 5h6v6" },
    { tag: 'path', d: "M19 5 5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(3px, -3px)', offset: 0.25 }, { transform: 'translate(0, 0)', offset: 0.45 }, { transform: 'translate(0, 0)', offset: 0.55 }, { transform: 'translate(-3px, 3px)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 19H5V13" },
    { tag: 'path', d: "M19 5L5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, 3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 13V19H13" },
    { tag: 'path', d: "M5 5L19 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, 3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

export const moveDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 18L12 22L16 18" },
    { tag: 'path', d: "M12 2V22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(3px)' }, { transform: 'translateY(0)' }], 500),
    },
  },
);

export const moveHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 8 4 4-4 4" },
    { tag: 'path', d: "M2 12h20" },
    { tag: 'path', d: "m6 8-4 4 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-3px)', offset: 0.25 }, { transform: 'translateX(0)', offset: 0.45 }, { transform: 'translateX(0)', offset: 0.55 }, { transform: 'translateX(3px)', offset: 0.75 }, { transform: 'translateX(0)', offset: 1 }], 1000),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 8L2 12L6 16" },
    { tag: 'path', d: "M2 12H22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
    },
  },
);

/**
 * Mover a la derecha: la punta se recoge y sale disparada. El asta NO se mueve, y no es pereza —
 * a diferencia de `arrow-right` (que va de 5 a 19 y tiene aire para deslizarse entero), esta flecha
 * cruza el viewBox de borde a borde (x 2→22). El `<svg>` raíz recorta por defecto, así que
 * cualquier traslación del conjunto se comería la punta o el nacimiento del asta. El gesto se va a
 * la única figura que sí tiene margen.
 */
export const moveRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(moveRightShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translateX(0)' },
            // 0.6: recogerse tarda más que salir. Simétrico se siente un temblor, no un disparo.
            { transform: 'translateX(-2.5px)', offset: 0.6 },
            { transform: 'translateX(0)' },
          ],
          440,
        ),
      },
    },
  });

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 11V5H11" },
    { tag: 'path', d: "M5 5L19 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, -3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 5H19V11" },
    { tag: 'path', d: "M19 5L5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, -3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

export const moveUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 6L12 2L16 6" },
    { tag: 'path', d: "M12 2V22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)' }, { transform: 'translateY(0)' }], 500),
    },
  },
);

export const moveVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v20" },
    { tag: 'path', d: "m8 18 4 4 4-4" },
    { tag: 'path', d: "m8 6 4-4 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-3px)', offset: 0.25 }, { transform: 'translateY(0)', offset: 0.45 }, { transform: 'translateY(0)', offset: 0.55 }, { transform: 'translateY(3px)', offset: 0.75 }, { transform: 'translateY(0)', offset: 1 }], 1000),
    },
  },
);
