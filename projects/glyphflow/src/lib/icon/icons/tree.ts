// Familia `tree` del catálogo curado (3 iconos).
//
// Se mece la COPA, no el árbol: el tronco está clavado en el suelo. Por eso el pivote va donde
// la copa se apoya en el tronco y no en el centro de la figura — un árbol que gira sobre su
// centro se lee como si lo estuvieran arrancando.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

const MECE = [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(3deg)', offset: 0.3 },
          { transform: 'rotate(-2.2deg)', offset: 0.62 },
          { transform: 'rotate(0deg)', offset: 1 },
        ];

/** La copa se mece sobre el tronco. */
export const treeDeciduousIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z",
    },
    { tag: 'path', d: "M12 19v3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(MECE, 720, { easing: EASE, origin: '12px 19px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual, con el pino. */
export const treePineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
    },
    { tag: 'path', d: "M12 22v-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(MECE, 720, { easing: EASE, origin: '12px 19px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las palmas se mecen desde donde salen del tronco; el tronco aguanta. */
export const treePalmIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" },
    { tag: 'path', d: "M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" },
    {
      tag: 'path',
      d: "M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35",
    },
    { tag: 'path', d: "M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(MECE, 720, { easing: EASE, origin: '11px 9px' }),
        1: /* @__PURE__ */ track(MECE, 720, { easing: EASE, delay: 90, origin: '11px 9px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 9px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);
