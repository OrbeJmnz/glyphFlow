// Familia `house` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveYSeq, track, strokeDraw, icon } from '../choreography';
import { houseShapes } from '../animated-icons.shapes';

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Un cuarto de vuelta y de regreso. */
const E2_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(90deg)' },
  { transform: 'rotate(0deg)' },
];

/** Late una vez. */
const E2_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Aparece de golpe con un rebote corto. */
const E2_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

/**
 * Se desplaza y vuelve, con anticipación: casi todo lo que va hacia un borde tiene 1 de margen, y
 * un recorrido de 1 se ve como un temblor.
 */
const E2_PUSH_DOWN = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1px)', offset: 0.28 },
  { transform: 'translateY(1.5px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

export const houseHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" },
    { tag: 'path', d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const houseWifiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9.5 13.866a4 4 0 0 1 5 .01" },
    { tag: 'path', d: "M12 17h.01" },
    { tag: 'path', d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { tag: 'path', d: "M7 10.754a8 8 0 0 1 10 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
      },
    },
  },
);

export const houseIcon: AnimatedIconDef = /* @__PURE__ */ icon(houseShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }) },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease-out' }),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Las dos patillas bajan a enchufarse y el contacto responde. */
export const housePlugIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12V8.964" },
    { tag: 'path', d: "M14 12V8.964" },
    { tag: 'path', d: "M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z" },
    {
      tag: 'path',
      d: "M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PUSH_DOWN, 560, { easing: EASE, delay: 120, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PUSH_DOWN, 560, { easing: EASE, delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: '12px 15px', delay: 300, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** La casa late y la cruz gira al lado. */
export const housePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35",
    },
    { tag: 'path', d: "M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8" },
    { tag: 'path', d: "M15 18h6" },
    { tag: 'path', d: "M18 15v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E2_POP, 320, { easing: EASE, origin: '12px 16px', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_TURN, 600, { easing: EASE, origin: '18px 18px', delay: 260, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_TURN, 600, { easing: EASE, origin: '18px 18px', delay: 260, fill: 'backwards' }),
      },
    },
  },
);
