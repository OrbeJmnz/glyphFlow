// Familia `waves` del catálogo curado (5 iconos).
//
// Una onda no se mueve entera: PASA. Y como todas las de esta familia empiezan y acaban en el
// borde del lienzo, el recorrido es corto a propósito —0.6— porque lo que se lee no es cuánto
// viaja, sino que las tres no viajan a la vez. El desfase entre ellas es la corriente.
//
// EL `hold` NO ES LA ÚLTIMA POSE DEL `default`. El default es el gesto; el hold es el ESTADO al
// que ese gesto lleva, y por eso se nota: aquí el agua no «pasa más», sube de nivel o se encrespa.
// Sostener la misma pose del gesto no dice nada nuevo y encima casi no se ve.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, moveYSeq, track, icon } from '../choreography';

/** Una onda que pasa. Corta: las ondas ya tocan los dos bordes. */
const CORRE = /* @__PURE__ */ moveXSeq([0, 0.6, 0]);
const CORRE_Y = /* @__PURE__ */ moveYSeq([0, 0.6, 0]);

/** Marejada: la onda crece sobre su propia línea. Es el estado, no el paso. */
const ENCRESPA = /* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.6)' }];
const ENCRESPA_X = /* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.6)' }];

/** Tres ondas que pasan de arriba abajo. Sostenido: se encrespan, cada una sobre su línea. */
export const wavesHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 12q2.5 2 5 0t5 0 5 0 5 0" },
    { tag: 'path', d: "M2 19q2.5 2 5 0t5 0 5 0 5 0" },
    { tag: 'path', d: "M2 5q2.5 2 5 0t5 0 5 0 5 0" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(CORRE, 760, { easing: EASE }),
        0: /* @__PURE__ */ track(CORRE, 760, { easing: EASE, delay: 130 }),
        1: /* @__PURE__ */ track(CORRE, 760, { easing: EASE, delay: 260 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(ENCRESPA, 380, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 5px' }),
        0: /* @__PURE__ */ track(ENCRESPA, 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(ENCRESPA, 380, { easing: SPRING_OUT, fill: 'forwards', delay: 120, origin: '12px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo girado. Sostenido: se encrespan hacia los lados. */
export const wavesVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2q2 2.5 0 5t0 5 0 5 0 5" },
    { tag: 'path', d: "M19 2q2 2.5 0 5t0 5 0 5 0 5" },
    { tag: 'path', d: "M5 2q2 2.5 0 5t0 5 0 5 0 5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(CORRE_Y, 760, { easing: EASE }),
        0: /* @__PURE__ */ track(CORRE_Y, 760, { easing: EASE, delay: 130 }),
        1: /* @__PURE__ */ track(CORRE_Y, 760, { easing: EASE, delay: 260 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(ENCRESPA_X, 380, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 12px' }),
        0: /* @__PURE__ */ track(ENCRESPA_X, 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(ENCRESPA_X, 380, { easing: SPRING_OUT, fill: 'forwards', delay: 120, origin: '19px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El nivel sube: la flecha primero. Sostenido: el agua SE QUEDA arriba, que es a lo que apunta. */
export const wavesArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v8" },
    {
      tag: 'path',
      d: "M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    },
    {
      tag: 'path',
      d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    },
    { tag: 'path', d: "m8 6 4-4 4 4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 620, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 620, { easing: EASE }),
        1: /* @__PURE__ */ track(CORRE, 760, { easing: EASE, delay: 140 }),
        2: /* @__PURE__ */ track(CORRE, 760, { easing: EASE, delay: 270 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.6px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.6px)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 70 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El nivel baja. Sostenido: el agua se queda abajo. Es el par exacto del anterior. */
export const wavesArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 10L12 2" },
    { tag: 'path', d: "M16 6L12 10L8 6" },
    {
      tag: 'path',
      d: "M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15",
    },
    {
      tag: 'path',
      d: "M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 620, { easing: EASE }),
        2: /* @__PURE__ */ track(CORRE, 760, { easing: EASE, delay: 140 }),
        3: /* @__PURE__ */ track(CORRE, 760, { easing: EASE, delay: 270 }),
      },
    },
    hold: {
      shapes: {
        // Solo 1: la onda de abajo ya está en y=21 y el trazo la lleva a 22.
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1px)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 70 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El agua pasa por debajo. Sostenido: sube hasta el peldaño, que es lo que mide una escalera. */
export const wavesLadderIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 5a2 2 0 0 0-2 2v11" },
    {
      tag: 'path',
      d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    },
    { tag: 'path', d: "M7 13h10" },
    { tag: 'path', d: "M7 9h10" },
    { tag: 'path', d: "M9 5a2 2 0 0 0-2 2v11" },
  ],
  {
    default: {
      shapes: { 1: /* @__PURE__ */ track(CORRE, 860, { easing: EASE }) },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-2px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
