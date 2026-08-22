// Familia `user` del catálogo curado (17 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, scaleSeq, moveYSeq, track, burst, strokeDraw, icon } from '../choreography';
import { userCheckShapes, userCogShapes, userMinusShapes, userPlusShapes, userRoundArrowLeftShapes, userRoundCheckShapes, userRoundCogShapes, userRoundKeyShapes, userRoundMinusShapes, userRoundPenShapes, userRoundPlusShapes, userRoundSearchShapes, userRoundShapes, userRoundXShapes, userShapes, userXShapes } from '../animated-icons.shapes';

const USER_ROUND_HEAD_BOB = /* @__PURE__ */ moveYSeq([0, -1, 0]);

const USER_ROUND_GEAR_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.15) rotate(360deg)' },
  { transform: 'scale(1) rotate(720deg)' },
];

export const userPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.5 15H7a4 4 0 0 0-4 4v2" },
    { tag: 'path', d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" },
    { tag: 'circle', cx: 10, cy: 7, r: 4 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  },
);

/** Persona: la cabeza asoma tantito. */
export const userIcon: AnimatedIconDef = /* @__PURE__ */ icon(userShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500) },
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 500, { origin: 'center' }),
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(2px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(4px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
      },
    },
  });

/** Usuario validado: la palomita se dibuja al final. */
export const userCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(userCheckShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 200 }),
      },
    },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

export const userMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
      },
    },
  });

export const userPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userPlusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 240 }),
      },
    },
  });

export const userXIcon: AnimatedIconDef = /* @__PURE__ */ icon(userXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
  });

/**
   * Configurar usuario: la cabeza asoma y el engrane late. Los índices NO son intercambiables —
   * 10 es la cabeza (9,7) y 9 el engrane (18,15); al revés, la cabeza escala respecto a un pivote
   * que le queda a media figura de distancia y sale volando.
   */
export const userCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(userCogShapes, {
    default: {
      shapes: {
        10: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        // El engrane es el círculo Y los 8 dientes que lo rodean (índices 1-8) — deben girar
        // juntos como una sola pieza, no el círculo solo.
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        6: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        7: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        8: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        9: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
      },
    },
    /** Ajuste fino: el engrane da vueltas cortas de matraca, en vez del giro completo. */
    tune: {
      shapes: {
        10: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        6: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        7: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        8: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        9: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Usuario redondo: la cabeza asoma, igual que en `user`. */
export const userRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundShapes, {
    default: {
      shapes: { 0: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450) },
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(1px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(4px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
      },
    },
  });

/** Ir atrás: la cabeza asoma y la flecha se dibuja hacia la izquierda. */
export const userRoundArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundArrowLeftShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 340 }),
      },
    },
  });

export const userRoundCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 200 }),
      },
    },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Configurar usuario redondo: la cabeza asoma y el engrane late — mismo criterio que `user-cog`. */
export const userRoundCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundCogShapes, {
    default: {
      shapes: {
        9: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        0: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        1: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        2: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        3: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        4: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        5: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        7: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        8: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        10: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
      },
    },
    active: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        9: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        10: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Llave de usuario: la cabeza asoma, la llave aparece de insignia y el diente se dibuja. */
export const userRoundKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundKeyShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 320 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 460 }),
      },
    },
  });

export const userRoundMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
      },
    },
  });

export const userRoundPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundPenShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 200 }),
      },
    },
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });

export const userRoundPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundPlusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 240 }),
      },
    },
  });

export const userRoundSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundSearchShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 460 }),
      },
    },
  });

export const userRoundXIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
  });
