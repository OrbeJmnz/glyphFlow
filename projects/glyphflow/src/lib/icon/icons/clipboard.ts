// Familia `clipboard` del catálogo curado (12 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { clipboardCheckShapes, clipboardClockShapes, clipboardCopyShapes, clipboardListShapes, clipboardMinusShapes, clipboardPasteShapes, clipboardPenLineShapes, clipboardPenShapes, clipboardPlusShapes, clipboardTypeShapes, clipboardXShapes } from '../animated-icons.shapes';
import { COPY_PEEL, BADGE_BOUNCE_DRAW, X_SNAP_DRAW, REFRESH_SPIN } from './_shared';

// Igual que el `translate` de reposo de pencil/pen/square-pen.
const PEN_WRITE_SQUIGGLE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(1.5px, -1.5px)' },
  { transform: 'translate(-1px, 1px)' },
  { transform: 'translate(0, 0)' },
];

const PASTE_NUDGE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(3px, 0)' },
  { transform: 'translate(0, 0)' },
];

export const clipboardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 8, height: 4, x: 8, y: 2, rx: 1, ry: 1 },
    { tag: 'path', d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  },
);

export const clipboardCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardCheckShapes, {
    default: { shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }), 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 150 }) } },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** El reloj respira y la manecilla da un tic — mismo criterio que `calendar-clock`. */
/** `spin`: la manecilla da la vuelta completa en vez del tic — mismo giro de `refresh-cw:rotate`. */
export const clipboardClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardClockShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 150, origin: '16px 16px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 30, 0]), 620, { delay: 190, origin: '16px 16px' }),
      },
    },
    spin: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 150, origin: '16px 16px' }),
        0: /* @__PURE__ */ track(REFRESH_SPIN, 700, { delay: 190, easing: SPRING_OUT, origin: '16px 16px' }),
      },
    },
  });

/** `peel`: la flecha "despega" con la misma separación de `copy-*:peel`. */
export const clipboardCopyIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardCopyShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
    },
    peel: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        4: /* @__PURE__ */ track(COPY_PEEL, 500, { delay: 150, easing: EASE }),
      },
    },
  });

/** El check-list se llena renglón por renglón: la marca y luego la línea, fila tras fila. */
export const clipboardListIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardListShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 150 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 230 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 230 }),
      },
    },
    quick: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 80 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 130 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 130 }),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** `bounce`: mismo rebote de `minus` (scale 1→1.25→1) combinado con el trazo. */
export const clipboardMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardMinusShapes, {
    default: { shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }), 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }) } },
    bounce: { shapes: { 2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 150, origin: '12px 14px' }) } },
  });

export const clipboardPasteIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPasteShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
    },
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(PASTE_NUDGE, 400, { delay: 150, easing: EASE }),
        2: /* @__PURE__ */ track(PASTE_NUDGE, 400, { delay: 190, easing: EASE }),
      },
    },
  });

/** La pluma escribe primero; la marca de la lista aparece de golpe al terminar. */
/** `write`: la pluma tiembla como en `pencil`/`pen`/`square-pen`, en vez de solo dibujarse. */
export const clipboardPenLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPenLineShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 470 }),
      },
    },
    write: {
      shapes: {
        4: /* @__PURE__ */ track(PEN_WRITE_SQUIGGLE, 700, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 850 }),
      },
    },
    alert: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)' }, { transform: 'rotate(-0.3deg) translate(-0.5px, 1px)' }, { transform: 'rotate(0.2deg) translate(1px, -0.5px)' }, { transform: 'rotate(-0.4deg) translate(0px, 0px)' }, { transform: 'rotate(0deg) translate(0px, 0px)' }], 500, { easing: EASE }),
      },
    },
  });

export const clipboardPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPenShapes, {
    default: { shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }), 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 150 }) } },
    write: { shapes: { 1: /* @__PURE__ */ track(PEN_WRITE_SQUIGGLE, 700, { delay: 150 }) } },
    nudge: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });

/** `bounce`: mismo rebote de `plus` (scale 1→1.25→1) combinado con el trazo. */
export const clipboardPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
      },
    },
    bounce: {
      shapes: {
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 150, origin: '12px 14px' }),
        3: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 150, origin: '12px 14px' }),
      },
    },
  });

/** La "T" se escribe en orden natural: la barra de arriba, el tallo y por último la base. */
export const clipboardTypeIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardTypeShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 230 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 380 }),
      },
    },
    quick: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 80 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { delay: 130 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 80, { delay: 220 }),
      },
    },
  });

/** `snap`: mismo combo dashoffset+scale de `check`, aplicado a las dos diagonales. */
export const clipboardXIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
    },
    snap: {
      shapes: {
        2: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 150, origin: '12px 14px' }),
        3: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 230, origin: '12px 14px' }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });
