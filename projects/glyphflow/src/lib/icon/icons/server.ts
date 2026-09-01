// Familia `server` del catálogo curado (5 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef, IconChoreography } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, moveXSeq, track, burst, strokeDraw, icon } from '../choreography';
import { serverCogShapes, serverCrashShapes, serverOffShapes, serverPlusShapes, serverShapes } from '../animated-icons.shapes';

// Los indicadores parpadean desfasados, igual que en server — sin importar en qué índice les
// haya tocado caer por el badge.
const SERVER_BLINK = /* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }];

/** Servidor: los indicadores parpadean desfasados. */
export const serverIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 550),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 550, { delay: 180 }),
      },
    },
  });

/** Configurar servidor: el engrane entero gira; los indicadores parpadean desfasados. */
export const serverCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverCogShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        8: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 200 }),
        9: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 380 }),
      },
    },
    spin: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        8: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 250 }),
        9: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 430 }),
      },
    },
  });

/** Servidor caído: los indicadores parpadean y el rayo pega al final. */
const SERVER_CRASH_SHAKE: IconChoreography = /* @__PURE__ */ {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 2, -1, 0]), 300, { easing: EASE }),
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 250),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 250, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 220, easing: EASE }),
      },
    };

export const serverCrashIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverCrashShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(SERVER_BLINK, 400),
        3: /* @__PURE__ */ track(SERVER_BLINK, 400, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 350 }),
      },
    },
    shake: SERVER_CRASH_SHAKE,
    /** @deprecated Se llamaba `shock`. El alias sale en la v3. */
    shock: SERVER_CRASH_SHAKE,
  });

/** Servidor apagado: se fragmenta y la diagonal lo cruza al final. */
export const serverOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 280 }),
        4: /* @__PURE__ */ track(SERVER_BLINK, 300, { delay: 400 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 480 }),
      },
    },
    quick: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 100, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 170 }),
        4: /* @__PURE__ */ track(SERVER_BLINK, 200, { delay: 240 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 190, { delay: 290, easing: SPRING_OUT }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es su proyección sobre el eje del corte, no un número a ojo.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        5: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 40 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 50 }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 70 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 140 }),
      },
    },
  });

/** Agregar servidor: los indicadores parpadean y el "+" se dibuja de insignia. */
export const serverPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverPlusShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(SERVER_BLINK, 550),
        5: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 180 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    alert: {
      shapes: {
        4: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 350),
        5: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 350, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 0.9, 1]), 400, {
          delay: 240,
          easing: EASE,
          origin: '18px 8px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 0.9, 1]), 400, {
          delay: 240,
          easing: EASE,
          origin: '18px 8px',
        }),
      },
    },
  });
