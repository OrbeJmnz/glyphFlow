// Familia `ruler` del catálogo curado (2 iconos).
//
// Las dos miden, pero no miden lo mismo: la regla lleva las marcas ENCIMA y una cota las lleva
// DEBAJO de una línea que va de tope a tope. Por eso la regla traza sus marcas en fila —de la
// punta al mango, en el orden en que las leerías— y la cota estira su línea entre los dos topes
// antes de que aparezca ninguna marca: primero se mide, después se anota.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, burst, strokeDraw, icon } from '../choreography';

/** Las marcas se trazan en fila, de la punta al mango. */
export const rulerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" },
    { tag: 'path', d: "m14.5 12.5 2-2" },
    { tag: 'path', d: "m11.5 9.5 2-2" },
    { tag: 'path', d: "m8.5 6.5 2-2" },
    { tag: 'path', d: "m17.5 15.5 2-2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 110 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 220 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 330 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.13)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Primero se mide —la línea crece entre los topes— y después se anotan las marcas. */
export const rulerDimensionLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 15v-3" },
    { tag: 'path', d: "M14 15v-3" },
    { tag: 'path', d: "M18 15v-3" },
    { tag: 'path', d: "M2 8V4" },
    { tag: 'path', d: "M22 6H2" },
    { tag: 'path', d: "M22 8V4" },
    { tag: 'path', d: "M6 15v-3" },
    { tag: 'rect', x: 2, y: 12, width: 20, height: 8, rx: 2 },
  ],
  {
    default: {
      shapes: {
        // La cota crece desde su tope izquierdo, que es por donde se empieza a medir.
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.05)' }, { transform: 'scaleX(1)' }], 480, { easing: SPRING_OUT, origin: '2px 6px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 380, origin: '22px 6px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 460 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 520 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 580 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 640 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.87)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '2px 6px' }),
      },
      reverseOnLeave: true,
    },
  },
);
