// Familia `lens` del catálogo curado (2 iconos).
//
// Son el par perfecto de este bloque: la misma pieza con la curvatura invertida, y por eso el
// gesto es literalmente opuesto. La convexa se ABOMBA —engorda por el centro— y la cóncava se
// ESTRECHA. Cada una crece hacia donde su nombre dice.
//
// Las dos son una sola figura, así que no hay coreografía entre piezas: lo que cambia es la única
// medida que una lente tiene, su potencia.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

/** Se estrecha por el centro: eso es más cóncava. */
export const lensConcaveIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.86)' }, { transform: 'scaleX(1)' }], 620, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.72)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se abomba por el centro: eso es más convexa. El signo contrario del anterior. */
export const lensConvexIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.5)' }, { transform: 'scaleX(1)' }], 620, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.9)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);
