// Familia `pilcrow` del catálogo curado (3 iconos).
//
// El calderón solo se asienta; los que llevan flecha animan la DIRECCIÓN del texto, que es lo
// que esos dos añaden.
//
// La flecha cruza el lienzo entero — su punta toca 2 y la cola 22 — así que está encajonada por
// los dos lados y no admite ni el impulso al revés de la casa: retroceder solo mueve el recorte
// al otro borde. Se queda en 0.85, y quien pone el recorrido legible es el calderón, que tiene
// 7 de margen y viaja 1.5 un pelo después.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, track, icon } from '../choreography';

/** Lo que la flecha aguanta sin cortarse: 0.85 hacia cada lado. */
const FLECHA_IZQ = [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.85px)', offset: 0.3 },
          { transform: 'translateX(-0.85px)', offset: 0.7 },
          { transform: 'translateX(0)', offset: 1 },
        ];
const FLECHA_DER = [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.85px)', offset: 0.3 },
          { transform: 'translateX(0.85px)', offset: 0.7 },
          { transform: 'translateX(0)', offset: 1 },
        ];

/** El calderón cae y se asienta. */
export const pilcrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 4v16" },
    { tag: 'path', d: "M17 4v16" },
    { tag: 'path', d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translateY(-2px)' }, { transform: 'translateY(0)' }], 480, { easing: SPRING_OUT }),
    },
  },
);

/** El texto va a la izquierda: la flecha lo dice y el calderón lo hace. */
export const pilcrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 3v11" },
    { tag: 'path', d: "M14 9h-3a3 3 0 0 1 0-6h9" },
    { tag: 'path', d: "M18 3v11" },
    { tag: 'path', d: "M22 18H2l4-4" },
    { tag: 'path', d: "m6 22-4-4" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(FLECHA_IZQ, 520, { easing: EASE }),
        4: /* @__PURE__ */ track(FLECHA_IZQ, 520, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 0]), 480, { easing: SPRING_OUT, delay: 80 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 0]), 480, { easing: SPRING_OUT, delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 0]), 480, { easing: SPRING_OUT, delay: 80 }),
      },
    },
  },
);

/** Y aquí a la derecha. */
export const pilcrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 3v11" },
    { tag: 'path', d: "M10 9H7a1 1 0 0 1 0-6h8" },
    { tag: 'path', d: "M14 3v11" },
    { tag: 'path', d: "m18 14 4 4H2" },
    { tag: 'path', d: "m22 18-4 4" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(FLECHA_DER, 520, { easing: EASE }),
        4: /* @__PURE__ */ track(FLECHA_DER, 520, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 480, { easing: SPRING_OUT, delay: 80 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 480, { easing: SPRING_OUT, delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 480, { easing: SPRING_OUT, delay: 80 }),
      },
    },
  },
);
