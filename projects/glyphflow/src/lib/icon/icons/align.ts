// Familia `align` del catálogo curado (22 iconos).
//
// UN solo lenguaje para toda la familia: cada pieza se despliega desde el punto por el que se
// alinea. Es lo que significa alinear —el ojo ve dónde está el anclaje— y además es lo único que
// cabe: media familia tiene cajas que ya tocan el borde del viewBox (`align-horizontal-justify-
// start` llega a x=22), así que arrancar desplazado las sacaba del lienzo en el primer fotograma.
// Creciendo, en cambio, la pieza nunca pasa de su tamaño real.
//
// Los dos `space-around` son la excepción y venían de antes: ahí las guías APRIETAN el contenido
// y la pose se sostiene mientras dure el puntero. No se tocaron.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, strokeDraw, icon } from '../choreography';

/** Cuánto tarda una pieza en encajar. */
const ALIGN_MS = 460;

/**
 * La pieza abre desde su anclaje. El 0.4 es lo bastante corto para que se lea como "llegó" y lo
 * bastante largo para que no parezca que aparece de la nada.
 */
const ALIGN_SNAP_X = /* @__PURE__ */ [{ transform: 'scaleX(0.4)' }, { transform: 'scaleX(1)' }];
const ALIGN_SNAP_Y = /* @__PURE__ */ [{ transform: 'scaleY(0.4)' }, { transform: 'scaleY(1)' }];

/** Las dos cajas cuelgan del borde de arriba, que es por donde se alinean. */
export const alignStartHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 6, width: 6, height: 16, rx: 2 },
    { tag: 'rect', x: 14, y: 6, width: 6, height: 9, rx: 2 },
    { tag: 'path', d: "M22 2H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '7px 6px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '17px 6px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Igual, pero creciendo hacia arriba desde el borde de abajo. */
export const alignEndHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 2, width: 6, height: 16, rx: 2 },
    { tag: 'rect', x: 14, y: 9, width: 6, height: 9, rx: 2 },
    { tag: 'path', d: "M22 22H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '7px 18px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '17px 18px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Las cajas se despliegan hacia la derecha desde el borde izquierdo. */
export const alignStartVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 6, y: 14, width: 9, height: 6, rx: 2 },
    { tag: 'rect', x: 6, y: 4, width: 16, height: 6, rx: 2 },
    { tag: 'path', d: "M2 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '6px 17px', delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '6px 7px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Y hacia la izquierda desde el derecho. */
export const alignEndVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 16, height: 6, rx: 2 },
    { tag: 'rect', x: 9, y: 14, width: 9, height: 6, rx: 2 },
    { tag: 'path', d: "M22 22V2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '18px 7px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '18px 17px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Las cuatro asas abren desde la línea del centro: primero las de la izquierda. */
export const alignCenterHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 12h20" },
    { tag: 'path', d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" },
    { tag: 'path', d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" },
    { tag: 'path', d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1" },
    { tag: 'path', d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 140 }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 210 }),
      },
    },
  },
);

/** Lo mismo sobre el otro eje: primero las de arriba. */
export const alignCenterVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v20" },
    { tag: 'path', d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4" },
    { tag: 'path', d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4" },
    { tag: 'path', d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1" },
    { tag: 'path', d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 140 }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 210 }),
      },
    },
  },
);

/** Cada caja abre desde su borde izquierdo, que es el que la guía justifica. */
export const alignHorizontalJustifyStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 6, y: 5, width: 6, height: 14, rx: 2 },
    { tag: 'rect', x: 16, y: 7, width: 6, height: 10, rx: 2 },
    { tag: 'path', d: "M2 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '6px 12px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '16px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Desde el borde derecho. */
export const alignHorizontalJustifyEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 5, width: 6, height: 14, rx: 2 },
    { tag: 'rect', x: 12, y: 7, width: 6, height: 10, rx: 2 },
    { tag: 'path', d: "M22 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '8px 12px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '18px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Desde el borde que mira a la guía del centro, así que las dos abren hacia afuera. */
export const alignHorizontalJustifyCenterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 5, width: 6, height: 14, rx: 2 },
    { tag: 'rect', x: 16, y: 7, width: 6, height: 10, rx: 2 },
    { tag: 'path', d: "M12 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '8px 12px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '16px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Cada caja abre hacia abajo desde su borde superior. */
export const alignVerticalJustifyStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 16, width: 14, height: 6, rx: 2 },
    { tag: 'rect', x: 7, y: 6, width: 10, height: 6, rx: 2 },
    { tag: 'path', d: "M2 2h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 16px', delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 6px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Hacia arriba desde el borde de abajo. */
export const alignVerticalJustifyEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 12, width: 14, height: 6, rx: 2 },
    { tag: 'rect', x: 7, y: 2, width: 10, height: 6, rx: 2 },
    { tag: 'path', d: "M2 22h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 18px', delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 8px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Desde el borde que mira a la guía del centro. */
export const alignVerticalJustifyCenterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 16, width: 14, height: 6, rx: 2 },
    { tag: 'rect', x: 7, y: 2, width: 10, height: 6, rx: 2 },
    { tag: 'path', d: "M2 12h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 16px', delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 8px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(-1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(1px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Las cajas abren desde el borde que cada guía marca. */
export const alignHorizontalDistributeStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 5, width: 6, height: 14, rx: 2 },
    { tag: 'rect', x: 14, y: 7, width: 6, height: 10, rx: 2 },
    { tag: 'path', d: "M4 2v20" },
    { tag: 'path', d: "M14 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '4px 12px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '14px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Igual, marcando el otro borde. */
export const alignHorizontalDistributeEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 5, width: 6, height: 14, rx: 2 },
    { tag: 'rect', x: 14, y: 7, width: 6, height: 10, rx: 2 },
    { tag: 'path', d: "M10 2v20" },
    { tag: 'path', d: "M20 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '10px 12px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '20px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Aquí lo repartido es el CENTRO de cada caja, así que abren desde ahí y las marcas se trazan después. */
export const alignHorizontalDistributeCenterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 5, width: 6, height: 14, rx: 2 },
    { tag: 'rect', x: 14, y: 7, width: 6, height: 10, rx: 2 },
    { tag: 'path', d: "M17 22v-5" },
    { tag: 'path', d: "M17 7V2" },
    { tag: 'path', d: "M7 22v-3" },
    { tag: 'path', d: "M7 5V2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '7px 12px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '17px 12px', delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 290, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 290, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Sobre el eje vertical, desde el borde de arriba de cada caja. */
export const alignVerticalDistributeStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 14, width: 14, height: 6, rx: 2 },
    { tag: 'rect', x: 7, y: 4, width: 10, height: 6, rx: 2 },
    { tag: 'path', d: "M2 14h20" },
    { tag: 'path', d: "M2 4h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 14px', delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 4px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Desde el de abajo. */
export const alignVerticalDistributeEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 14, width: 14, height: 6, rx: 2 },
    { tag: 'rect', x: 7, y: 4, width: 10, height: 6, rx: 2 },
    { tag: 'path', d: "M2 20h20" },
    { tag: 'path', d: "M2 10h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 20px', delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 10px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Desde el centro de cada caja; las cuatro marcas se trazan al final. */
export const alignVerticalDistributeCenterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 17h-3" },
    { tag: 'path', d: "M22 7h-5" },
    { tag: 'path', d: "M5 17H2" },
    { tag: 'path', d: "M7 7H2" },
    { tag: 'rect', x: 5, y: 14, width: 14, height: 6, rx: 2 },
    { tag: 'rect', x: 7, y: 4, width: 10, height: 6, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 290, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 290, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        4: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 17px', delay: 90, fill: 'backwards' }),
        5: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 7px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        5: /* @__PURE__ */ track([{ transform: 'translateY(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Cada caja abre desde el borde que toca su guía, así que se separan hacia afuera. */
export const alignHorizontalSpaceBetweenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 5, width: 6, height: 14, rx: 2 },
    { tag: 'rect', x: 15, y: 7, width: 6, height: 10, rx: 2 },
    { tag: 'path', d: "M3 2v20" },
    { tag: 'path', d: "M21 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '3px 12px' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_X, ALIGN_MS, { easing: SPRING_OUT, origin: '21px 12px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/** Lo mismo hacia arriba y hacia abajo. */
export const alignVerticalSpaceBetweenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 15, width: 14, height: 6, rx: 2 },
    { tag: 'rect', x: 7, y: 3, width: 10, height: 6, rx: 2 },
    { tag: 'path', d: "M2 21h20" },
    { tag: 'path', d: "M2 3h20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 21px', delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(ALIGN_SNAP_Y, ALIGN_MS, { easing: SPRING_OUT, origin: '12px 3px' }),
      },
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT, delay: 70 }),
      },
    },
  },
);

/**
 * Los dos `space-around` son el caso aparte de la familia y venían curados de antes: aquí las
 * guías APRIETAN el contenido y la pose se sostiene mientras dure el puntero, en vez de encajar
 * y terminar. Se movieron desde curated-icons.ts sin tocar una línea de su coreografía.
 */
export const alignHorizontalSpaceAroundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 6, height: 10, x: 9, y: 7, rx: 2 },
    { tag: 'path', d: "M4 22V2" },
    { tag: 'path', d: "M20 22V2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.78)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
      },
    },
  },
);

export const alignVerticalSpaceAroundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 10, height: 6, x: 7, y: 9, rx: 2 },
    { tag: 'path', d: "M22 20H2" },
    { tag: 'path', d: "M22 4H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.78)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `nudge`: la operacion que el boton promete. Las cajas arrancan desalineadas
    // -- alejandose de su linea mas cercana, que desalinear es irse de la guia -- y
    // encajan con resorte, escalonadas cada 70 ms. El desvio de cada una lo acota su
    // holgura real hasta el borde del lienzo. Las lineas no se mueven: son la
    // referencia, y una referencia que se mueve no es referencia.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-1.6px)' }, { transform: 'none' }], 520, { easing: SPRING_OUT }),
      },
    },
  },
);
