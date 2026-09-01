// Familia `pencil` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { pencilShapes } from '../animated-icons.shapes';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Aparece de golpe con un rebote corto. */
const E2_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

const E2_PUSH_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.28 },
  { transform: 'translateX(-1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

/** Una chispa: destella y se apaga. */
const E2_SPARK = /* @__PURE__ */ [
  { transform: 'scale(0.4)', opacity: 0, offset: 0 },
  { transform: 'scale(1.15)', opacity: 1, offset: 0.4 },
  { transform: 'scale(1)', opacity: 1, offset: 0.75 },
  { transform: 'scale(1)', opacity: 1, offset: 1 },
];

/** El mango de un pincel se mece mientras pinta. */
const E2_BRUSH = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-4deg)', offset: 0.3 },
  { transform: 'rotate(4deg)', offset: 0.65 },
  { transform: 'rotate(0deg)', offset: 1 },
];

export const pencilLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 21h8" },
    { tag: 'path', d: "m15 5 4 4" },
    { tag: 'path', d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  },
);

export const pencilOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" },
    { tag: 'path', d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" },
    { tag: 'path', d: "m15 5 4 4" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 52 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 70 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 104 }),
      },
    },
  },
);

/** Escribir: el lápiz recorre su propia diagonal. */
export const pencilIcon: AnimatedIconDef = /* @__PURE__ */ icon(pencilShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(1.5px, -1.5px)' },
          { transform: 'translate(-1px, 1px)' },
          { transform: 'translate(0, 0)' },
        ],
        700,
      ),
    },
    /** Escribiendo: gira desde la punta, fija, simulando el trazo de la mano. */
    write: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 6, -8, 5, -6, 3, 0]), 950, {
        origin: '2.3px 21.5px',
      }),
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(-15deg)', offset: 0.25 }, { transform: 'rotate(15deg)', offset: 0.75 }], 400, { easing: EASE }),
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Cada herramienta se mueve por su eje: el lápiz escribe y la regla mide. */
export const pencilRulerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" },
    { tag: 'path', d: "m8 6 2-2" },
    { tag: 'path', d: "m18 16 2-2" },
    { tag: 'path', d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" },
    {
      tag: 'path',
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
    },
    { tag: 'path', d: "m15 5 4 4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PUSH_LEFT, 620, { easing: EASE, delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '9px 5px', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '19px 15px', delay: 380, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_PUSH_LEFT, 620, { easing: EASE, delay: 160, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '17px 7px', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

/** Las chispas destellan alrededor del lápiz, no todas a la vez. */
export const pencilSparklesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 3H8" },
    { tag: 'path', d: "m15.007 5.008 3.987 3.986" },
    { tag: 'path', d: "M20 15v4" },
    {
      tag: 'path',
      d: "M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
    },
    { tag: 'path', d: "M22 17h-4" },
    { tag: 'path', d: "M4 5v4" },
    { tag: 'path', d: "M6 7H2" },
    { tag: 'path', d: "M9 2v2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '9px 3px', delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '20px 17px', delay: 400, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '20px 17px', delay: 400, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '4px 7px', delay: 280, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '4px 7px', delay: 280, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '9px 3px', delay: 160, fill: 'backwards' }),
      },
    },
  },
);
