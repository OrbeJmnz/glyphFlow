// Familia `badge` del catálogo curado (17 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { badgeShapes, badgeAlertShapes, badgeCentShapes, badgeCheckShapes, badgeDollarSignShapes, badgeEuroShapes, badgeIndianRupeeShapes, badgeInfoShapes, badgeJapaneseYenShapes, badgeMinusShapes, badgePercentShapes, badgePlusShapes, badgePoundSterlingShapes, badgeQuestionMarkShapes, badgeRussianRubleShapes, badgeSwissFrancShapes, badgeTurkishLiraShapes, badgeXShapes } from '../animated-icons.shapes';

/** Verificado: la insignia late y la palomita entra después. */
// La insignia cae con gravedad y rebota al aterrizar; el símbolo aparece TODO junto después,
// como una sola pieza — no trazo por trazo como en el default.
const BADGE_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-14px)', opacity: '0' },
  { transform: 'translateY(3px)', opacity: '1' },
  { transform: 'translateY(0)' },
];

const BADGE_POP = /* @__PURE__ */ scaleSeq([1, 1.08, 1]);

/**
 * La insignia sin símbolo dentro. Late con el mismo gesto que sus 17 variantes le dan al cuerpo, y
 * conserva la variante `drop` porque toda la familia la tiene: quien alterne entre `badge` y
 * `badge-check` espera la misma entrada en las dos.
 */
export const badgeIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeShapes, {
    default: {
      shapes: { 0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }) },
    },
    drop: {
      shapes: { 0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }) },
    },
  });

export const badgeCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 220 }),
      },
    },
    /** `drop`: la insignia cae con gravedad y rebota; la palomita aparece de un solo golpe. */
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 1200, { easing: EASE }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 1200, { easing: EASE }),
      },
    },
  });

export const badgeAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeAlertShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  });

export const badgeCentIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeCentShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeDollarSignIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeDollarSignShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 380 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeEuroIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeEuroShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeIndianRupeeIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeIndianRupeeShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 320 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 420 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeInfoIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeInfoShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeJapaneseYenIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeJapaneseYenShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 460 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 540 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeMinusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgePercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgePercentShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 200, { delay: 460 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 200, { delay: 540 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgePlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgePoundSterlingIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgePoundSterlingShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 400 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeQuestionMarkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
    alert: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
      },
    },
  });

export const badgeRussianRubleIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeRussianRubleShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 440 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeSwissFrancIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeSwissFrancShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 380 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

/** El cuerpo de la insignia está en el índice 2 (única de la familia con el orden invertido). */
export const badgeTurkishLiraIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeTurkishLiraShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 380 }),
      },
    },
    drop: {
      shapes: {
        2: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeXIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: EASE, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });
