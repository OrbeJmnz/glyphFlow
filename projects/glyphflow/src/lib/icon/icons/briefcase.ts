// Familia `briefcase` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, moveYSeq, track, icon } from '../choreography';
import { briefcaseShapes } from '../animated-icons.shapes';

export const briefcaseBusinessIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12h.01" },
    { tag: 'path', d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
    { tag: 'path', d: "M22 13a18.15 18.15 0 0 1-20 0" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 6, rx: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(12deg)', offset: 0.25 }, { transform: 'rotate(-10deg)', offset: 0.55 }, { transform: 'rotate(3deg)', offset: 0.85 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE }),
    },
  },
);

export const briefcaseMedicalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 11v4" },
    { tag: 'path', d: "M14 13h-4" },
    { tag: 'path', d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
    { tag: 'path', d: "M18 6v14" },
    { tag: 'path', d: "M6 6v14" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 6, rx: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(12deg)', offset: 0.25 }, { transform: 'rotate(-10deg)', offset: 0.55 }, { transform: 'rotate(3deg)', offset: 0.85 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE }),
    },
  },
);

/** Portafolio: se levanta del asa. */
export const briefcaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(briefcaseShapes, {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500) },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(12deg)', offset: 0.25 }, { transform: 'rotate(-10deg)', offset: 0.55 }, { transform: 'rotate(3deg)', offset: 0.85 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE }),
    },
  });
