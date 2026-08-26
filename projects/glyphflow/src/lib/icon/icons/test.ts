// Familia `test` del catálogo curado (3 iconos).
//
// Heredan el lenguaje de `flask-conical`, que ya estaba curado y aprobado: el recipiente da su
// saltito y el líquido de dentro BAJA Y SUBE, como si se vaciara y se llenara. Mismos keyframes
// (`E3_LIQUID`, `E3_PULSE`), mismo desfase de 120 ms.
//
// Que se mueva el contenido y no el recipiente es la regla de la casa. Aquí el recipiente
// también se mueve, pero poco: el protagonista es lo que lleva dentro.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

const PULSO = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }];
const LIQUIDO = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(2.5px)', offset: 0.35 },
  { transform: 'translateY(-2px)', offset: 0.72 },
  { transform: 'translateY(0)', offset: 1 },
];

/** El tubo salta y el líquido baja y sube dentro. */
export const testTubeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" },
    { tag: 'path', d: "M8.5 2h7" },
    { tag: 'path', d: "M14.5 16h-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(LIQUIDO, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Dos tubos, dos niveles: el de la derecha va detrás del de la izquierda. */
export const testTubesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2" },
    { tag: 'path', d: "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2" },
    { tag: 'path', d: "M3 2h7" },
    { tag: 'path', d: "M14 2h7" },
    { tag: 'path', d: "M9 16H4" },
    { tag: 'path', d: "M20 16h-5" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(LIQUIDO, 700, { easing: EASE, fill: 'backwards' }),
        5: /* @__PURE__ */ track(LIQUIDO, 700, { easing: EASE, delay: 140, fill: 'backwards' }),
        0: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, origin: '6.5px 12px' }),
        2: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, origin: '6.5px 12px' }),
        1: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, delay: 140, origin: '17.5px 12px' }),
        3: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, delay: 140, origin: '17.5px 12px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** De lado, pero el líquido sigue buscando su nivel. */
export const testTubeDiagonalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" },
    { tag: 'path', d: "m16 2 6 6" },
    { tag: 'path', d: "M12 16H4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(PULSO, 460, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(LIQUIDO, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
