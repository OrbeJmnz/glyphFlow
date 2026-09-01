// Familia `door` del catálogo curado (3 iconos).
//
// Una puerta gira sobre sus BISAGRAS, y en un dibujo plano eso se ve como que se estrecha: la
// hoja escala en X desde el canto donde está colgada. El picaporte va en la misma pista y con el
// mismo pivote, porque va montado en la hoja — si se quedara quieto, se despegaría de ella.
//
// `door-closed-locked` hace lo contrario a propósito: el cerrojo baja y la hoja apenas se mueve.
// Está cerrada con llave; que lo intente y no pueda ES el icono.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveYSeq, track, icon } from '../choreography';

const ABRE = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.86)', offset: 0.5 },
  { transform: 'scaleX(1)', offset: 1 },
];

/** La hoja gira sobre su canto izquierdo y el picaporte va con ella. */
export const doorClosedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12h.01" },
    { tag: 'path', d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" },
    { tag: 'path', d: "M2 20h20" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ABRE, 560, { easing: EASE, origin: '6px 12px' }),
        0: /* @__PURE__ */ track(ABRE, 560, { easing: EASE, origin: '6px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.86)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '6px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.86)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '6px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Ya abierta: se abre un poco más, desde el mismo canto. */
export const doorOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 20H2" },
    {
      tag: 'path',
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
    },
    { tag: 'path', d: "M11 4H8a2 2 0 0 0-2 2v14" },
    { tag: 'path', d: "M14 12h.01" },
    { tag: 'path', d: "M22 20h-3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ABRE, 560, { easing: EASE, origin: '11px 12px' }),
        3: /* @__PURE__ */ track(ABRE, 560, { easing: EASE, origin: '11px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.86)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.86)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cerrojo baja y la hoja apenas cede: está cerrada con llave. */
export const doorClosedLockedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12h.01" },
    { tag: 'path', d: "M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" },
    { tag: 'path', d: "M2 20h8" },
    { tag: 'path', d: "M20 17v-2a2 2 0 1 0-4 0v2" },
    { tag: 'rect', x: 14, y: 17, width: 8, height: 5, rx: 1 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.6, 0]), 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.98)' }, { transform: 'scaleX(1)' }], 480, { easing: EASE, delay: 120, origin: '6px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.98)' }, { transform: 'scaleX(1)' }], 480, { easing: EASE, delay: 120, origin: '6px 12px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(2.2002px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
