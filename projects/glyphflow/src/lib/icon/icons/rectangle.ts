// Familia `rectangle` del catálogo curado (5 iconos).
//
// Los dos primeros dicen su ORIENTACIÓN al moverse: el horizontal se estira a lo ancho y el
// vertical a lo alto. Es lo único que los distingue en reposo, así que es lo que tiene que
// distinguirlos en movimiento.
//
// El 1.06 no es al ojo: al rectángulo le queda 1 de margen hacia su lado largo, y a 1.1 el trazo
// se corta contra el borde. Por eso encoge primero — 0.92 y luego 1.06 dan el doble de recorrido
// visible sin salirse.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

const ANCHO = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.92)', offset: 0.32 },
  { transform: 'scaleX(1.06)', offset: 0.7 },
  { transform: 'scaleX(1)', offset: 1 },
];
const ALTO = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.92)', offset: 0.32 },
  { transform: 'scaleY(1.06)', offset: 0.7 },
  { transform: 'scaleY(1)', offset: 1 },
];
/** Los tres puntos rebotan de izquierda a derecha, como algo que sigue cargando. */
const REBOTE = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.6px)', offset: 0.45 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Se estira a lo ancho: su orientación es el gesto. */
export const rectangleHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 6, width: 20, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ANCHO, 520, { origin: '12px 12px' }),
      },
    },
  },
);

/** Y este a lo alto. */
export const rectangleVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 6, y: 2, width: 12, height: 20, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALTO, 520, { origin: '12px 12px' }),
      },
    },
  },
);

/** El marco se queda; lo que se mueve son los puntos, de izquierda a derecha. */
export const rectangleEllipsisIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 6, width: 20, height: 12, rx: 2 },
    { tag: 'path', d: "M12 12h.01" },
    { tag: 'path', d: "M17 12h.01" },
    { tag: 'path', d: "M7 12h.01" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(REBOTE, 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(REBOTE, 420, { easing: SPRING_OUT, delay: 90 }),
        2: /* @__PURE__ */ track(REBOTE, 420, { easing: SPRING_OUT, delay: 180 }),
      },
    },
  },
);

/** Dos figuras que se enciman: se separan lo justo para verse como dos, y vuelven. */
export const rectangleCircleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" },
    { tag: 'circle', cx: 14, cy: 12, r: 8 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(-0.8px)' }, { transform: 'translateX(0)' }], 460, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(0.8px)' }, { transform: 'translateX(0)' }], 460, { easing: EASE, delay: 60 }),
      },
    },
  },
);

/** Una pieza sola: se asienta en la cara con un rebote corto. */
export const rectangleGogglesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translateY(-1.6px) scale(0.96)' }, { transform: 'translateY(0) scale(1)' }], 480, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);
