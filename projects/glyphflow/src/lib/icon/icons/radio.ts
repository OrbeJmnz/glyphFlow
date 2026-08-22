// Familia `radio` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, strokeDraw, icon } from '../choreography';

export const radioOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.414 13.414a2 2 0 1 1-2.828-2.828" },
    { tag: 'path', d: "M16.247 7.761a6 6 0 0 1 1.744 4.572" },
    { tag: 'path', d: "M19.075 4.933a10 10 0 0 1 2.234 10.72" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M4.925 19.067a10 10 0 0 1 0-14.134" },
    { tag: 'path', d: "M7.753 16.239a6 6 0 0 1 0-8.478" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const radioTowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" },
    { tag: 'path', d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" },
    { tag: 'circle', cx: 12, cy: 9, r: 2 },
    { tag: 'path', d: "M16.2 4.8c2 2 2.26 5.11.8 7.47" },
    { tag: 'path', d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" },
    { tag: 'path', d: "M9.5 18h5" },
    { tag: 'path', d: "m8 22 4-11 4 11" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 150 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const radioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16.247 7.761a6 6 0 0 1 0 8.478" },
    { tag: 'path', d: "M19.075 4.933a10 10 0 0 1 0 14.134" },
    { tag: 'path', d: "M4.925 19.067a10 10 0 0 1 0-14.134" },
    { tag: 'path', d: "M7.753 16.239a6 6 0 0 1 0-8.478" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 150 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
      },
    },
  },
);
