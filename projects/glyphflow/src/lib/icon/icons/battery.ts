// Familia `battery` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryChargingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 7-3 5h4l-3 5" },
    { tag: 'path', d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.1 }, { opacity: 1 }], 500),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryFullIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10v4" },
    { tag: 'path', d: "M14 10v4" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 10v4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 520, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryLowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 14v-4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryMediumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 14v-4" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 14v-4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 17h.01" },
    { tag: 'path', d: "M10 7v6" },
    { tag: 'path', d: "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 500),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 500),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M 22 14 L 22 10" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'ease-in-out' }),
      },
    },
  },
);
