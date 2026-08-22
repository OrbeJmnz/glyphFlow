// Familia `book` del catálogo curado (23 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';
import { bookOpenShapes } from '../animated-icons.shapes';

export const bookAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m8 13 4-7 4 7" },
    { tag: 'path', d: "M9.1 11h5.7" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookAudioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v7" },
    { tag: 'path', d: "M16 8v3" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 8v3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 9.5 2 2 4-4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 340, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17h1.5" },
    { tag: 'path', d: "M12 22h1.5" },
    { tag: 'path', d: "M12 2h1.5" },
    { tag: 'path', d: "M17.5 22H19a1 1 0 0 0 1-1" },
    { tag: 'path', d: "M17.5 2H19a1 1 0 0 1 1 1v1.5" },
    { tag: 'path', d: "M20 14v3h-2.5" },
    { tag: 'path', d: "M20 8.5V10" },
    { tag: 'path', d: "M4 10V8.5" },
    { tag: 'path', d: "M4 19.5V14" },
    { tag: 'path', d: "M4 4.5A2.5 2.5 0 0 1 6.5 2H8" },
    { tag: 'path', d: "M8 22H6.5a1 1 0 0 1 0-5H8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const bookDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 10 3 3 3-3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookHeadphonesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 12v-2a4 4 0 0 1 8 0v2" },
    { tag: 'circle', cx: 15, cy: 12, r: 1 },
    { tag: 'circle', cx: 9, cy: 12, r: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookImageIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 10, cy: 8, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15" },
    { tag: 'path', d: "M17 2v6" },
    { tag: 'path', d: "M17 4h2" },
    { tag: 'path', d: "M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 17, cy: 10, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 6V4a2 2 0 1 0-4 0v2" },
    { tag: 'path', d: "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" },
    { tag: 'rect', x: 12, y: 6, width: 8, height: 5, rx: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookMarkedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v8l3-3 3 3V2" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M9 10h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookOpenCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5v16" },
    { tag: 'path', d: "m16 12 2 2 4-4" },
    { tag: 'path', d: "M22 6V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2h4.001A2 2 0 0022 17v-1.344" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookOpenTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5v16" },
    { tag: 'path', d: "M16 13h2" },
    { tag: 'path', d: "M16 9h2" },
    { tag: 'path', d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" },
    { tag: 'path', d: "M6 13h2" },
    { tag: 'path', d: "M6 9h2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(1.05)', offset: 0.2 }, { transform: 'scale(1)', offset: 1 }], 800, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        5: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
      },
    },
  },
);

export const bookPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v6" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M9 10h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 11h8" },
    { tag: 'path', d: "M8 7h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookTypeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 13h4" },
    { tag: 'path', d: "M12 6v7" },
    { tag: 'path', d: "M16 8V6H8v2" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookUp2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" },
    { tag: 'path', d: "m9 10 3-3 3 3" },
    { tag: 'path', d: "m9 5 3-3 3 3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 10 3-3 3 3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 13a3 3 0 1 0-6 0" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 12, cy: 8, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14.5 7-5 5" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9.5 7 5 5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** Libro que se abre. */
export const bookOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(0.9)' }, { transform: 'scaleX(1)' }], 500, {
          origin: '12px 12px',
        }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  });
