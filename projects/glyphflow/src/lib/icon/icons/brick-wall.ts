// Familia `brick-wall` del catálogo curado (3 iconos).
//
// El muro se LEVANTA: las hiladas aparecen de abajo arriba y las juntas verticales detrás de cada
// una, que es el orden en que se pone un ladrillo. Los tres comparten ese arranque y después cada
// variante anima lo suyo, porque es lo que los distingue: en `-fire` prende la llama y en
// `-shield` se planta el escudo. El muro de los dos NO se mueve mientras eso pasa — un muro que
// tiembla mientras arde deja de ser un muro.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, track, strokeDraw, icon } from '../choreography';

/** Se levanta de abajo arriba: hilada, juntas, hilada. */
export const brickWallIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M12 9v6" },
    { tag: 'path', d: "M16 15v6" },
    { tag: 'path', d: "M16 3v6" },
    { tag: 'path', d: "M3 15h18" },
    { tag: 'path', d: "M3 9h18" },
    { tag: 'path', d: "M8 15v6" },
    { tag: 'path', d: "M8 3v6" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 220 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 300 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 440 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 660 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 740 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 820 }),
      },
    },
    // Sostenido: el muro asentado. Las juntas se marcan y las hiladas se aprietan.
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 15px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se levanta y prende: la llama sube y late; el muro se queda quieto. */
export const brickWallFireIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 3v2.107" },
    {
      tag: 'path',
      d: "M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9",
    },
    {
      tag: 'path',
      d: "M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938",
    },
    { tag: 'path', d: "M3 15h5.253" },
    { tag: 'path', d: "M3 9h8.228" },
    { tag: 'path', d: "M8 15v6" },
    { tag: 'path', d: "M8 3v6" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 180 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 320 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 500 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.1, 1]), 560, { easing: EASE, delay: 620, origin: '17px 21px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.14)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se levanta y se protege: el escudo se planta encima, y ahí sí manda él. */
export const brickWallShieldIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 9v1.258" },
    { tag: 'path', d: "M16 3v5.46" },
    {
      tag: 'path',
      d: "M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75",
    },
    {
      tag: 'path',
      d: "M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z",
    },
    { tag: 'path', d: "M3 15h7" },
    { tag: 'path', d: "M3 9h12.142" },
    { tag: 'path', d: "M8 15v6" },
    { tag: 'path', d: "M8 3v6" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 180 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 320 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 500 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 520, { easing: EASE, delay: 620, origin: '18px 17px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.16)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 17px' }),
      },
      reverseOnLeave: true,
    },
  },
);
