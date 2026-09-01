// Familia `train` del catálogo curado (3 iconos).
//
// Los dos de frente hunden el morro y encienden; `train-track` no tiene tren, así que anima lo
// único que hay — las traviesas, que pasan una tras otra. Es la vía moviéndose bajo el tren que
// no se dibuja.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

const SUSPENSION = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(0.7px)', offset: 0.45 },
  { transform: 'translateY(0)', offset: 1 },
];
const DESTELLA = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.25', offset: 0.4 },
  { opacity: '1', offset: 1 },
];
/** Una traviesa que pasa: se desplaza por su propia diagonal y vuelve. */
const TRAVIESA = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0.9px, -0.9px)', offset: 0.5 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Los faros encienden y el morro se hunde. */
export const trainFrontIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 3.1V7a4 4 0 0 0 8 0V3.1" },
    { tag: 'path', d: "m9 15-1-1" },
    { tag: 'path', d: "m15 15 1-1" },
    { tag: 'path', d: "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" },
    { tag: 'path', d: "m8 19-2 3" },
    { tag: 'path', d: "m16 19 2 3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(DESTELLA, 420),
        2: /* @__PURE__ */ track(DESTELLA, 420, { delay: 90 }),
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
        3: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(2.2001px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(2.2001px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual, y el túnel se queda donde está: no viaja con el tren. */
export const trainFrontTunnelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 22V12a10 10 0 1 1 20 0v10" },
    { tag: 'path', d: "M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8" },
    { tag: 'path', d: "M10 15h.01" },
    { tag: 'path', d: "M14 15h.01" },
    { tag: 'path', d: "M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z" },
    { tag: 'path', d: "m9 19-2 3" },
    { tag: 'path', d: "m15 19 2 3" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(DESTELLA, 420),
        3: /* @__PURE__ */ track(DESTELLA, 420, { delay: 90 }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
        4: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(2.2001px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(2.2001px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las traviesas pasan una tras otra: es la vía moviéndose bajo el tren que no se dibuja. */
export const trainTrackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 17 17 2" },
    { tag: 'path', d: "m2 14 8 8" },
    { tag: 'path', d: "m5 11 8 8" },
    { tag: 'path', d: "m8 8 8 8" },
    { tag: 'path', d: "m11 5 8 8" },
    { tag: 'path', d: "m14 2 8 8" },
    { tag: 'path', d: "M7 22 22 7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(TRAVIESA, 480, { easing: EASE }),
        2: /* @__PURE__ */ track(TRAVIESA, 480, { easing: EASE, delay: 70 }),
        3: /* @__PURE__ */ track(TRAVIESA, 480, { easing: EASE, delay: 140 }),
        4: /* @__PURE__ */ track(TRAVIESA, 480, { easing: EASE, delay: 210 }),
        5: /* @__PURE__ */ track(TRAVIESA, 480, { easing: EASE, delay: 280 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'both', delay: 55 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'both', delay: 110 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'both', delay: 165 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'both', delay: 220 }),
      },
      reverseOnLeave: true,
    },
  },
);
