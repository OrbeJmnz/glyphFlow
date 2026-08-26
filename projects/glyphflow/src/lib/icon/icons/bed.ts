// Familia `bed` del catálogo curado (3 iconos).
//
// Un colchón se HUNDE: escala hacia abajo desde el suelo, que es lo que no cede. El cabecero no
// se mueve — está atornillado al armazón, no al colchón.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

/** Se hunde y vuelve. Solo encoge, así que nunca se sale del lienzo. */
const HUNDE = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.93)', offset: 0.45 },
  { transform: 'scaleY(1)', offset: 1 },
];

/** El colchón cede bajo el peso; el cabecero aguanta. */
export const bedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 4v16" },
    { tag: 'path', d: "M2 8h18a2 2 0 0 1 2 2v10" },
    { tag: 'path', d: "M2 17h20" },
    { tag: 'path', d: "M6 8v9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(HUNDE, 520, { easing: EASE, origin: '12px 17px' }),
        3: /* @__PURE__ */ track(HUNDE, 520, { easing: EASE, origin: '12px 17px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 17px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual, en cama doble. */
export const bedDoubleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" },
    { tag: 'path', d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" },
    { tag: 'path', d: "M12 4v6" },
    { tag: 'path', d: "M2 18h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(HUNDE, 520, { easing: EASE, origin: '12px 18px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 18px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Y en individual. */
export const bedSingleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" },
    { tag: 'path', d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" },
    { tag: 'path', d: "M3 18h18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(HUNDE, 520, { easing: EASE, origin: '12px 18px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 18px' }),
      },
      reverseOnLeave: true,
    },
  },
);
