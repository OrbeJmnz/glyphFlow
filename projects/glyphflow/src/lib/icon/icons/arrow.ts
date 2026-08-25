// Familia `arrow` del catálogo curado (42 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveXSeq, moveYSeq, track, icon, held } from '../choreography';
import { arrowDownLeftShapes, arrowDownRightShapes, arrowDownShapes, arrowLeftShapes, arrowRightShapes, arrowUpLeftShapes, arrowUpRightShapes, arrowUpShapes } from '../animated-icons.shapes';

const ARROW_UP_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, -3px)' }];

const ARROW_UP_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, -3px)' }];

const ARROW_DOWN_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, 3px)' }];

const ARROW_DOWN_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, 3px)' }];

export const arrowDownFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 3H5" },
    { tag: 'path', d: "M12 21V7" },
    { tag: 'path', d: "m6 15 6 6 6-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownToDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v14" },
    { tag: 'path', d: "m19 9-7 7-7-7" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17V3" },
    { tag: 'path', d: "m6 11 6 6 6-6" },
    { tag: 'path', d: "M19 21H5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowLeftFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 6-6 6 6 6" },
    { tag: 'path', d: "M3 12h14" },
    { tag: 'path', d: "M21 19V5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowLeftToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 19V5" },
    { tag: 'path', d: "m13 6-6 6 6 6" },
    { tag: 'path', d: "M7 12h14" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowRightFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5v14" },
    { tag: 'path', d: "M21 12H7" },
    { tag: 'path', d: "m15 18 6-6-6-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowRightToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 12H3" },
    { tag: 'path', d: "m11 18 6-6-6-6" },
    { tag: 'path', d: "M21 5v14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpFromDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m5 9 7-7 7 7" },
    { tag: 'path', d: "M12 16V2" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 9-6-6-6 6" },
    { tag: 'path', d: "M12 3v14" },
    { tag: 'path', d: "M5 21h14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3h14" },
    { tag: 'path', d: "m18 13-6-6-6 6" },
    { tag: 'path', d: "M12 7v14" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "m21 8-4-4-4 4" },
    { tag: 'path', d: "M17 4v16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m21 16-4 4-4-4" },
    { tag: 'path', d: "M17 20V4" },
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownNarrowWideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M11 4h4" },
    { tag: 'path', d: "M11 8h7" },
    { tag: 'path', d: "M11 12h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpNarrowWideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M11 12h4" },
    { tag: 'path', d: "M11 16h7" },
    { tag: 'path', d: "M11 20h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownWideNarrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M11 4h10" },
    { tag: 'path', d: "M11 8h7" },
    { tag: 'path', d: "M11 12h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpWideNarrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M11 12h10" },
    { tag: 'path', d: "M11 16h7" },
    { tag: 'path', d: "M11 20h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M9 4h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" },
    { tag: 'path', d: "M20 9v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M4 9v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z" },
    { tag: 'path', d: "M9 20h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const arrowDown01Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'rect', x: 15, y: 4, width: 4, height: 6, ry: 2 },
    { tag: 'path', d: "M17 20v-6h-2" },
    { tag: 'path', d: "M15 20h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDown10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M17 10V4h-2" },
    { tag: 'path', d: "M15 10h4" },
    { tag: 'rect', x: 15, y: 14, width: 4, height: 6, ry: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownAZIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M20 8h-5" },
    { tag: 'path', d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" },
    { tag: 'path', d: "M15 14h5l-5 6h5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowDownZAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M15 4h5l-5 6h5" },
    { tag: 'path', d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" },
    { tag: 'path', d: "M20 18h-5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowLeftRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 3 4 7l4 4" },
    { tag: 'path', d: "M4 7h16" },
    { tag: 'path', d: "m16 21 4-4-4-4" },
    { tag: 'path', d: "M20 17H4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowRightLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 3 4 4-4 4" },
    { tag: 'path', d: "M20 7H4" },
    { tag: 'path', d: "m8 21-4-4 4-4" },
    { tag: 'path', d: "M4 17h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
      },
    },
  },
);

export const arrowUp01Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'rect', x: 15, y: 4, width: 4, height: 6, ry: 2 },
    { tag: 'path', d: "M17 20v-6h-2" },
    { tag: 'path', d: "M15 20h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUp10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M17 10V4h-2" },
    { tag: 'path', d: "M15 10h4" },
    { tag: 'rect', x: 15, y: 14, width: 4, height: 6, ry: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpAZIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M20 8h-5" },
    { tag: 'path', d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" },
    { tag: 'path', d: "M15 14h5l-5 6h5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpZAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M15 4h5l-5 6h5" },
    { tag: 'path', d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" },
    { tag: 'path', d: "M20 18h-5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual que el chevron pero de regreso: la flecha de "volver". */
export const arrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowLeftShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const arrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowRightShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Igual que `arrow-left`/`arrow-right`: nudge que se sostiene en hover y regresa al salir. */
export const arrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const arrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const arrowUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_LEFT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const arrowUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpRightShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_RIGHT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const arrowDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_LEFT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const arrowDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownRightShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_RIGHT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });
