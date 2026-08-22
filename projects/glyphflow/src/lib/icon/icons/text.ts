// Familia `text` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textAlignCenterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M17 12H7" },
    { tag: 'path', d: "M19 19H5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(3px)', offset: 0.2 }, { transform: 'translateX(-3px)', offset: 0.4 }, { transform: 'translateX(2px)', offset: 0.6 }, { transform: 'translateX(0)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textCursorInputIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" },
    { tag: 'path', d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" },
    { tag: 'path', d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" },
    { tag: 'path', d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" },
    { tag: 'path', d: "M9 6v12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textCursorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" },
    { tag: 'path', d: "M7 22h1a4 4 0 0 0 4-4" },
    { tag: 'path', d: "M7 2h1a4 4 0 0 1 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, { easing: 'linear' }),
    },
  },
);

export const textSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M10 12H3" },
    { tag: 'path', d: "M10 19H3" },
    { tag: 'circle', cx: 17, cy: 15, r: 3 },
    { tag: 'path', d: "m21 19-1.9-1.9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.25 }, { transform: 'scaleX(0.7)', offset: 0.5 }, { transform: 'scaleX(1)', offset: 1 }], 1000, { easing: EASE }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.3 }, { transform: 'scaleX(0.8)', offset: 0.5 }, { transform: 'scaleX(1)', offset: 1 }], 1000, { easing: EASE, delay: 50 }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
      },
    },
  },
);
