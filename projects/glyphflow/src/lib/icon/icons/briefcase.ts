// Familia `briefcase` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, moveYSeq, track, icon } from '../choreography';
import { briefcaseShapes } from '../animated-icons.shapes';

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Parpadea: un indicador encendido, un aviso. */
const E2_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

const E2_PUSH_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.28 },
  { transform: 'translateX(-1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

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

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Los rodillos pasan de derecha a izquierda y el maletín avanza sobre ellos. */
export const briefcaseConveyorBeltIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 20v2" },
    { tag: 'path', d: "M14 20v2" },
    { tag: 'path', d: "M18 20v2" },
    { tag: 'path', d: "M21 20H3" },
    { tag: 'path', d: "M6 20v2" },
    { tag: 'path', d: "M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" },
    { tag: 'rect', x: 4, y: 6, width: 16, height: 10, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_BLINK, 600, { easing: EASE, delay: 180, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_BLINK, 600, { easing: EASE, delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_BLINK, 600, { easing: EASE }),
        4: /* @__PURE__ */ track(E2_BLINK, 600, { easing: EASE, delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E2_PUSH_LEFT, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E2_PUSH_LEFT, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);
