// Familia `alarm` del catálogo curado (5 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { alarmClockCheckShapes, alarmClockMinusShapes, alarmClockOffShapes, alarmClockPlusShapes, alarmClockShapes } from '../animated-icons.shapes';

/** Alarma confirmada: el mismo temblor de alarm-clock y la palomita se dibuja al final. */
// Sonando de verdad: sacudida más grande y rápida que el temblor de despertar.
const CLOCK_RING = /* @__PURE__ */ rotateSeq([0, -15, 12, -10, 8, -4, 0]);

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Late una vez. */
const E2_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** El humo sube y se desvanece por arriba. */
const E2_SMOKE = /* @__PURE__ */ [
  { transform: 'translateY(1.5px)', opacity: 0.2, offset: 0 },
  { transform: 'translateY(0)', opacity: 1, offset: 0.55 },
  { transform: 'translateY(0)', opacity: 1, offset: 1 },
];

/** Despertador sonando: campanas y patas se sacuden juntas. */
export const alarmClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        4: /* @__PURE__ */ track([{ transform: 'translate(0, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(0, -2.5px)' }], 300, { easing: 'linear' }),
        5: /* @__PURE__ */ track([{ transform: 'translate(0, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(0, -2.5px)' }], 300, { easing: 'linear' }),
      },
    },
  });

export const alarmClockCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 400 }) },
    },
    ring: {
      root: /* @__PURE__ */ track(CLOCK_RING, 350, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 250 }) },
    },
    reveal: {
      shapes: {
        5: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Quitar alarma: tiembla y el "-" se dibuja al final. */
export const alarmClockMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }) },
    },
    ring: {
      root: /* @__PURE__ */ track(CLOCK_RING, 350, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 250 }) },
    },
  });

/** Alarma apagada: se fragmenta y la diagonal la cruza al final. */
export const alarmClockOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 140 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 220 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 300 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 420 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 13 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 44 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 76 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 117 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 121 }),
      },
    },
  });

/** Agregar alarma: tiembla y el "+" se dibuja al final, en dos trazos. */
export const alarmClockPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    ring: {
      root: /* @__PURE__ */ track(CLOCK_RING, 350, { origin: 'center' }),
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 250 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 250 }),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** El humo sube en tres columnas desfasadas y la alarma responde. */
export const alarmSmokeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 21c0-2.5 2-2.5 2-5" },
    { tag: 'path', d: "M16 21c0-2.5 2-2.5 2-5" },
    { tag: 'path', d: "m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8" },
    { tag: 'path', d: "M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M6 21c0-2.5 2-2.5 2-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_SMOKE, 620, { easing: EASE, delay: 110, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_SMOKE, 620, { easing: EASE, delay: 220, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: 'center' }),
        4: /* @__PURE__ */ track(E2_SMOKE, 620, { easing: EASE }),
      },
    },
  },
);
