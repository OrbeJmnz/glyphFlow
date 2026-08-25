// Familia `hard` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';
import { hardDriveShapes } from '../animated-icons.shapes';

/* ── Vocabulario de la etapa 3: el mundo ─────────────────────────────────────────────────── */

/** Late una vez. */
const E3_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Cae y rebota: un fruto, un casco que se asienta. */
const E3_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-2.5px)', offset: 0 },
  { transform: 'translateY(0.5px)', offset: 0.55 },
  { transform: 'translateY(-0.25px)', offset: 0.78 },
  { transform: 'translateY(0)', offset: 1 },
];

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

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** El casco se asienta: cae y rebota sobre su ala. */
export const hardHatIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" },
    { tag: 'path', d: "M14 6a6 6 0 0 1 6 6v3" },
    { tag: 'path', d: "M4 15v-3a6 6 0 0 1 6-6" },
    { tag: 'rect', x: 2, y: 15, width: 20, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_DROP, 600, { easing: EASE }),
        1: /* @__PURE__ */ track(E3_DROP, 600, { easing: EASE }),
        2: /* @__PURE__ */ track(E3_DROP, 600, { easing: EASE }),
        3: /* @__PURE__ */ track(E3_PULSE, 420, { easing: EASE, origin: '12px 17px', delay: 260, fill: 'backwards' }),
      },
    },
  },
);
