// Familia `refresh` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef, IconChoreography } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, track, icon, held } from '../choreography';
import { refreshCwShapes } from '../animated-icons.shapes';

/** El motor no fija transform-box en el track raíz; girar cada figura con origen explícito para pivotar en el círculo central. */
const REFRESH_CCW_DOT_SPIN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }];

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const refreshCcwDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' },
    { tag: 'path', d: 'M3 3v5h5' },
    { tag: 'path', d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' },
    { tag: 'path', d: 'M16 16h5v5' },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(REFRESH_CCW_DOT_SPIN, 400, {
          easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        1: /* @__PURE__ */ track(REFRESH_CCW_DOT_SPIN, 400, {
          easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        2: /* @__PURE__ */ track(REFRESH_CCW_DOT_SPIN, 400, {
          easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        3: /* @__PURE__ */ track(REFRESH_CCW_DOT_SPIN, 400, {
          easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        4: /* @__PURE__ */ track(REFRESH_CCW_DOT_SPIN, 400, {
          easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
      },
      reverseOnLeave: true,
    },
  },
);

export const refreshCcwIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" },
    { tag: 'path', d: "M3 3v5h5" },
    { tag: 'path', d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" },
    { tag: 'path', d: "M16 16h5v5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const refreshCwOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" },
    { tag: 'path', d: "M8 16H3v5" },
    { tag: 'path', d: "M3 12C3 9.51 4 7.26 5.64 5.64" },
    { tag: 'path', d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" },
    { tag: 'path', d: "M21 12c0 1-.16 1.97-.47 2.87" },
    { tag: 'path', d: "M21 3v5h-5" },
    { tag: 'path', d: "M22 22 2 2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es su proyección sobre el eje del corte, no un número a ojo.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        6: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 30 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 70 }),
        5: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 70 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 110 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 140 }),
      },
    },
  },
);

/** `default` es de ESTADO: gira 45° y se queda; al salir el puntero regresa (portado). */
const REFRESH_CW_SPIN: IconChoreography = /* @__PURE__ */ {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 700, { easing: SPRING_OUT, origin: 'center' }),
    };

export const refreshCwIcon: AnimatedIconDef = /* @__PURE__ */ icon(refreshCwShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ rotateSeq([0, 45]), 450, { origin: 'center' }),
    spin: REFRESH_CW_SPIN,
    /** @deprecated Se llamaba `rotate`. El alias sale en la v3. */
    rotate: REFRESH_CW_SPIN,
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  });
