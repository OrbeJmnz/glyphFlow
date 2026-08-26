// Familia `squares` del catálogo curado (4 iconos).
//
// Son operaciones booleanas entre dos cuadros, y cada una anima justo lo que la operación HACE:
// lo que queda es lo sólido y lo que se descarta es lo punteado. Por eso el punteado parpadea y
// lo sólido no — animar los dos igual borraría la única diferencia que el icono tiene que contar.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

/** Lo descartado se apaga y vuelve, en cadena. */
const PARPADEO = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.25', offset: 0.4 },
  { opacity: '1', offset: 1 },
];

/** Ya son uno: late una vez, como una sola pieza. */
export const squaresUniteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(1.06)', offset: 0.45 }, { transform: 'scale(0.99)', offset: 0.75 }, { transform: 'scale(1)', offset: 1 }], 520, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Lo compartido late; el contorno punteado de lo que sobra se apaga en cadena. */
export const squaresIntersectIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 22a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M14 2a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M16 22h-2" },
    { tag: 'path', d: "M2 10V8" },
    { tag: 'path', d: "M2 4a2 2 0 0 1 2-2" },
    { tag: 'path', d: "M20 8a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M22 14v2" },
    { tag: 'path', d: "M22 20a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M4 16a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z" },
    { tag: 'path', d: "M8 2h2" },
  ],
  {
    default: {
      shapes: {
        9: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], 480, { easing: SPRING_OUT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(PARPADEO, 480, { delay: 120 }),
        5: /* @__PURE__ */ track(PARPADEO, 480, { delay: 165 }),
        6: /* @__PURE__ */ track(PARPADEO, 480, { delay: 210 }),
        7: /* @__PURE__ */ track(PARPADEO, 480, { delay: 255 }),
        0: /* @__PURE__ */ track(PARPADEO, 480, { delay: 300 }),
        2: /* @__PURE__ */ track(PARPADEO, 480, { delay: 345 }),
        8: /* @__PURE__ */ track(PARPADEO, 480, { delay: 390 }),
        4: /* @__PURE__ */ track(PARPADEO, 480, { delay: 435 }),
        3: /* @__PURE__ */ track(PARPADEO, 480, { delay: 480 }),
        10: /* @__PURE__ */ track(PARPADEO, 480, { delay: 525 }),
      },
    },
  },
);

/** Lo que se resta parpadea y lo que queda ni se inmuta. */
export const squaresSubtractIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 22a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M16 22h-2" },
    {
      tag: 'path',
      d: "M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z",
    },
    { tag: 'path', d: "M20 8a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M22 14v2" },
    { tag: 'path', d: "M22 20a2 2 0 0 1-2 2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(PARPADEO, 480, { delay: 60 }),
        4: /* @__PURE__ */ track(PARPADEO, 480, { delay: 105 }),
        5: /* @__PURE__ */ track(PARPADEO, 480, { delay: 150 }),
        1: /* @__PURE__ */ track(PARPADEO, 480, { delay: 195 }),
        0: /* @__PURE__ */ track(PARPADEO, 480, { delay: 240 }),
      },
    },
  },
);

/** Lo excluido es justo lo que comparten: los dos se apartan para enseñar que no se tocan. */
export const squaresExcludeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0",
    },
    {
      tag: 'path',
      d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.8px, -0.8px)' }, { transform: 'translate(0, 0)' }], 500, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.8px, 0.8px)' }, { transform: 'translate(0, 0)' }], 500, { easing: EASE, delay: 70 }),
      },
    },
  },
);
