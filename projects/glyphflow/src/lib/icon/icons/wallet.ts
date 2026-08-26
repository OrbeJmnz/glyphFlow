// Familia `wallet` del catálogo curado (3 iconos).
//
// Lo que se mueve es el CIERRE, no la cartera: el broche se aprieta, la tarjeta asoma. Mover la
// cartera entera diría "esto es una cartera", que ya lo dice estando quieta.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

/** El broche se mete y sale: es lo único que se abre en una cartera. */
export const walletIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
    },
    { tag: 'path', d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-1.2px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 480, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-1.2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La tarjeta de dentro asoma por su hueco y se vuelve a guardar. */
export const walletCardsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21",
    },
    { tag: 'path', d: "M3 7h18" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'translateY(0)', offset: 0 },
          { transform: 'translateY(1.4px)', offset: 0.5 },
          { transform: 'translateY(0)', offset: 1 },
        ], 480, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([
          { transform: 'translateY(0)', offset: 0 },
          { transform: 'translateY(-0.6px)', offset: 0.5 },
          { transform: 'translateY(0)', offset: 1 },
        ], 480, { easing: SPRING_OUT, delay: 60 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Aquí el broche es un punto: late y la cartera acusa el cierre. */
export const walletMinimalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 14h.01" },
    { tag: 'path', d: "M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], 440, { easing: SPRING_OUT, origin: '17px 14px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(0.98)' }, { transform: 'scale(1)' }], 440, { easing: EASE, delay: 80, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);
