// Familia `shield` del catálogo curado (14 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { shieldAlertShapes, shieldBanShapes, shieldCheckShapes, shieldCogShapes, shieldHalfShapes, shieldKeyholeShapes, shieldLockShapes, shieldMinusShapes, shieldOffShapes, shieldPlusShapes, shieldShapes, shieldUserShapes, shieldXShapes } from '../animated-icons.shapes';
import { SHIELD_GEAR_SPIN } from './_shared';

const SHIELD_POP = /* @__PURE__ */ scaleSeq([1, 1.08, 1]);

export const shieldQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" },
    { tag: 'path', d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" },
    { tag: 'path', d: "M12 17h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** Protegido: el escudo primero, la palomita después. */
export const shieldCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 500, { origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 260 }) },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

export const shieldBanIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldBanShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 260 }) },
    },
  });

/** Igual criterio que `server-cog`/`user-round-cog`: el engrane gira, el escudo se queda quieto. */
export const shieldCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldCogShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        7: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        8: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        9: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
      },
    },
  });

export const shieldHalfIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldHalfShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 260 }) },
    },
  });

export const shieldKeyholeIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldKeyholeShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 460 }),
      },
    },
  });

export const shieldLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldLockShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 460 }),
      },
    },
  });

export const shieldMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }) },
    },
  });

export const shieldPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });

/** Escudo con persona: el escudo late, la cabeza aparece de golpe y los hombros se dibujan. */
export const shieldUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldUserShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 460 }),
      },
    },
  });

export const shieldXIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldXShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
  });

export const shieldIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldShapes, {
  default: {
    root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.1, 1]), 480, {
      easing: SPRING_OUT,
      origin: 'center',
    }),
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});

/** Escudo con alerta: late y el signo aparece. */
export const shieldAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldAlertShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 4, 0]), 550, { origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 300 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  });

/** Protección apagada: el tajo cae al final. */
export const shieldOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldOffShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 220 }) } },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });
