// Familia `line` del catálogo curado (3 iconos).
//
// Las tres son la misma cosa —una línea— en tres estados distintos, y por eso cada una anima algo
// que las otras no pueden. `line-style` tiene VARIOS trazos y su gesto es el catálogo: se dibujan
// en cadena, del más troceado al continuo. `line-squiggle` es UN trazo largo y su gesto es
// recorrerlo entero. `line-dot-right-horizontal` tiene un destino, así que la línea crece hacia
// él y el punto lo recibe.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, track, strokeDraw, icon } from '../choreography';

/** El catálogo de trazos: del más troceado al continuo, que es como se leen. */
export const lineStyleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 5h2" },
    { tag: 'path', d: "M15 12h6" },
    { tag: 'path', d: "M19 5h2" },
    { tag: 'path', d: "M3 12h6" },
    { tag: 'path', d: "M3 19h18" },
    { tag: 'path', d: "M3 5h2" },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 300 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 420 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 560 }),
      },
    },
    // Sostenido: se elige el trazo continuo. Los troceados se apagan y él se queda.
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 400, { easing: SPRING_OUT, fill: 'both', delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 400, { easing: SPRING_OUT, fill: 'both', delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 400, { easing: SPRING_OUT, fill: 'both', delay: 150 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 400, { easing: SPRING_OUT, fill: 'both', delay: 50 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Un solo trazo largo: se recorre entero, que es lo único que puede hacer un garabato. */
export const lineSquiggleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2",
    },
  ],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 1100, { easing: 'ease-out' }) },
    },
    // Sostenido: el garabato se aprieta sobre sí mismo, como cuando repasas un tachón.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.87)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La línea crece HACIA el punto, y el punto la recibe: hay un destino, no un tramo suelto. */
export const lineDotRightHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M 3 12 L 15 12" },
    { tag: 'circle', cx: 18, cy: 12, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.05)' }, { transform: 'scaleX(1)' }], 480, { easing: SPRING_OUT, origin: '3px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 480, { easing: EASE, delay: 380, origin: '18px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.35)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.85)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '3px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);
