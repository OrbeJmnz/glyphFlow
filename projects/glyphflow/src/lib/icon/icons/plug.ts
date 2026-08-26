// Familia `plug` del catálogo curado (3 iconos).
//
// Un enchufe SE METE: las clavijas suben al zócalo y el cable de abajo se estira exactamente lo
// que ellas suben, así que no puede despegarse. El factor sale del largo real del cable, que
// mide 5 — la misma soldadura que usan los sliders y los headings.
//
// Hacia arriba solo hay 1 de margen (las clavijas tocan y=2), así que el recorrido es 0.9.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveYSeq, scaleSeq, track, icon } from '../choreography';

/** El cable se estira lo que sube el enchufe: (5+0.9)/5. */
const CABLE = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(1.18)', offset: 0.5 },
  { transform: 'scaleY(1)', offset: 1 },
];
const ENCHUFA = /* @__PURE__ */ moveYSeq([0, -0.9, 0]);

/** Sube al zócalo y el cable se estira con él. */
export const plugIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 22v-5" },
    { tag: 'path', d: "M15 8V2" },
    { tag: 'path', d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M9 8V2" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(ENCHUFA, 480, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(ENCHUFA, 480, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(ENCHUFA, 480, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(CABLE, 480, { easing: SPRING_OUT, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El de dos clavijas, igual. */
export const plug2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 2v6" },
    { tag: 'path', d: "M15 2v6" },
    { tag: 'path', d: "M12 17v5" },
    { tag: 'path', d: "M5 8h14" },
    { tag: 'path', d: "M6 11V8h12v3a6 6 0 1 1-12 0Z" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(ENCHUFA, 480, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(ENCHUFA, 480, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(ENCHUFA, 480, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(ENCHUFA, 480, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(CABLE, 480, { easing: SPRING_OUT, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Aquí lo que manda es el rayo: destella y el enchufe da el respingo. */
export const plugZapIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" },
    { tag: 'path', d: "m2 22 3-3" },
    { tag: 'path', d: "M7.5 13.5 10 11" },
    { tag: 'path', d: "M10.5 16.5 13 14" },
    { tag: 'path', d: "m18 3-4 4h6l-4 4" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 420, { easing: SPRING_OUT, origin: '18px 7px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 460, { easing: SPRING_OUT, delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 460, { easing: SPRING_OUT, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 7px' }),
      },
      reverseOnLeave: true,
    },
  },
);
