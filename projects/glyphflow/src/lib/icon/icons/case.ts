// Familia `case` del catálogo curado (3 iconos).
//
// Mayúscula y minúscula son una diferencia de TAMAÑO, así que eso es lo que se anima: `case-upper`
// crece, `case-lower` encoge, y `case-sensitive` — que enseña una de cada — hace las dos cosas a
// la vez. Ahí está el chiste: el icono dice que distinguir mayúsculas importa, y el movimiento lo
// enseña separando los tamaños en vez de moverlos igual.
//
// El pivote de cada letra es su BASE, no su centro: una letra que crece desde el centro se hunde
// bajo su propia línea de escritura.
//
// El 1.06 de `case-upper` está topado por el lienzo: a 1.1 la A se sale por la izquierda.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';

const CRECE = [
          { transform: 'scale(1)', offset: 0 },
          { transform: 'scale(1.06)', offset: 0.5 },
          { transform: 'scale(1)', offset: 1 },
        ];
const ENCOGE = [
          { transform: 'scale(1)', offset: 0 },
          { transform: 'scale(0.87)', offset: 0.5 },
          { transform: 'scale(1)', offset: 1 },
        ];

/** Las dos crecen, una tras otra. */
export const caseUpperIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5",
    },
    { tag: 'path', d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" },
    { tag: 'path', d: "M3.304 13h6.392" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CRECE, 520, { easing: EASE, origin: '6.5px 16px' }),
        2: /* @__PURE__ */ track(CRECE, 520, { easing: EASE, origin: '6.5px 16px' }),
        0: /* @__PURE__ */ track(CRECE, 520, { easing: EASE, delay: 90, origin: '15px 16px' }),
      },
    },
  },
);

/** Y aquí encogen. */
export const caseLowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 9v7" },
    { tag: 'path', d: "M14 6v10" },
    { tag: 'circle', cx: 17.5, cy: 12.5, r: 3.5 },
    { tag: 'circle', cx: 6.5, cy: 12.5, r: 3.5 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(ENCOGE, 520, { easing: EASE, origin: '6.5px 16px' }),
        0: /* @__PURE__ */ track(ENCOGE, 520, { easing: EASE, origin: '6.5px 16px' }),
        2: /* @__PURE__ */ track(ENCOGE, 520, { easing: EASE, delay: 90, origin: '17.5px 16px' }),
        1: /* @__PURE__ */ track(ENCOGE, 520, { easing: EASE, delay: 90, origin: '17.5px 16px' }),
      },
    },
  },
);

/** Una crece y la otra encoge AL MISMO TIEMPO: eso es distinguir mayúsculas. */
export const caseSensitiveIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" },
    { tag: 'path', d: "M22 9v7" },
    { tag: 'path', d: "M3.304 13h6.392" },
    { tag: 'circle', cx: 18.5, cy: 12.5, r: 3.5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CRECE, 520, { easing: EASE, origin: '6.5px 16px' }),
        2: /* @__PURE__ */ track(CRECE, 520, { easing: EASE, origin: '6.5px 16px' }),
        3: /* @__PURE__ */ track(ENCOGE, 520, { easing: EASE, origin: '18.5px 16px' }),
        1: /* @__PURE__ */ track(ENCOGE, 520, { easing: EASE, origin: '18.5px 16px' }),
      },
    },
  },
);
