// Familia `hard` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';
import { hardDriveShapes } from '../animated-icons.shapes';

export const hardDriveDownloadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v8" },
    { tag: 'path', d: "m16 6-4 4-4-4" },
    { tag: 'rect', width: 20, height: 8, x: 2, y: 14, rx: 2 },
    { tag: 'path', d: "M6 18h.01" },
    { tag: 'path', d: "M10 18h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const hardDriveUploadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 6-4-4-4 4" },
    { tag: 'path', d: "M12 2v8" },
    { tag: 'rect', width: 20, height: 8, x: 2, y: 14, rx: 2 },
    { tag: 'path', d: "M6 18h.01" },
    { tag: 'path', d: "M10 18h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Disco duro leyendo: el foquito parpadea. */
export const hardDriveIcon: AnimatedIconDef = /* @__PURE__ */ icon(hardDriveShapes, {
    default: {
      shapes: { 2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.25' }, { opacity: '1' }], 500) },
    },
  });
