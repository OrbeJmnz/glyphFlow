// Familia `heading` del catálogo curado (7 iconos).
//
// La H se ABRE: los dos palos se separan y la barra de en medio crece exactamente lo que ellos
// se apartan, así que nunca se despega de ninguno. Es la misma soldadura de los sliders — el
// factor sale del ancho real de la barra, no de un valor bonito.
//
// La H es lo que estos siete tienen en común y el número lo que los distingue, así que la H hace
// de base y el número de insignia: cae desde arriba y se asienta, siempre después.
//
// `heading-4` lleva sus propios índices porque Lucide le cambió el orden de figuras: ahí la H es
// 3/4/0. Copiar 0/1/2 anima el número como si fuera un palo.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, icon } from '../choreography';

/** El número cae desde arriba y se asienta. */
const CAE = /* @__PURE__ */ [{ transform: 'translateY(-1.5px)' }, { transform: 'translateY(0)' }];

/** Los dos palos se abren y la barra crece con ellos, sin despegarse. */
export const headingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 12h12" },
    { tag: 'path', d: "M6 20V4" },
    { tag: 'path', d: "M18 20V4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.1333)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

/** La H se abre y el número aterriza. */
export const heading1Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 12h8" },
    { tag: 'path', d: "M4 18V6" },
    { tag: 'path', d: "M12 18V6" },
    { tag: 'path', d: "m17 12 3-2v8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.2)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '8px 12px' }),
        3: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** Igual, con su número. */
export const heading2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 12h8" },
    { tag: 'path', d: "M4 18V6" },
    { tag: 'path', d: "M12 18V6" },
    { tag: 'path', d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.2)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '8px 12px' }),
        3: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** Igual, con su número. */
export const heading3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 12h8" },
    { tag: 'path', d: "M4 18V6" },
    { tag: 'path', d: "M12 18V6" },
    { tag: 'path', d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.2)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '8px 12px' }),
        3: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
        4: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** Lucide numera este distinto: la H es 3/4/0, no 0/1/2. */
export const heading4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 18V6" },
    { tag: 'path', d: "M17 10v3a1 1 0 0 0 1 1h3" },
    { tag: 'path', d: "M21 10v8" },
    { tag: 'path', d: "M4 12h8" },
    { tag: 'path', d: "M4 18V6" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.2)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '8px 12px' }),
        1: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** Igual, con su número. */
export const heading5Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 12h8" },
    { tag: 'path', d: "M4 18V6" },
    { tag: 'path', d: "M12 18V6" },
    { tag: 'path', d: "M17 13v-3h4" },
    { tag: 'path', d: "M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.2)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '8px 12px' }),
        3: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
        4: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** Igual, con su número. */
export const heading6Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 12h8" },
    { tag: 'path', d: "M4 18V6" },
    { tag: 'path', d: "M12 18V6" },
    { tag: 'circle', cx: 19, cy: 16, r: 2 },
    { tag: 'path', d: "M20 10c-2 2-3 3.5-3 6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(0.8px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 500, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.2)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '8px 12px' }),
        3: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
        4: /* @__PURE__ */ track(CAE, 420, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
    },
  },
);
