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
