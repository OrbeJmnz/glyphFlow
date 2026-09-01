// Familia `car` del catálogo curado (3 iconos).
//
// Las ruedas de Lucide son `circle`, y un círculo girando es INVISIBLE — así que aquí no rueda
// nada. Lo que se mueve es la carrocería sobre su suspensión, y las ruedas se quedan pegadas al
// suelo.
//
// Que además es lo fiel: cuando un coche arranca, lo que se mueve respecto al suelo es la
// carrocería; el punto donde la rueda toca el asfalto se queda donde está.
//
// Los dos de frente animan sus faros, porque de frente es lo único que se ve encenderse. Y el
// taxi enciende ANTES su cartel: por eso es un taxi y no un coche.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, icon } from '../choreography';
import { SHOOT_OFF_KEYFRAMES } from './_shared';

/** La carrocería se hunde sobre los amortiguadores y vuelve. */
const SUSPENSION = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(0.7px)', offset: 0.45 },
  { transform: 'translateY(0)', offset: 1 },
];
/** Un faro que enciende. */
const DESTELLA = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.25', offset: 0.4 },
  { opacity: '1', offset: 1 },
];

/** La carrocería se hunde; las ruedas no se despegan del suelo. */
/* ── Variantes de la tanda 6 ──────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). Easing por keyframe, `times` como
 * `offset`, y un solo ciclo donde el original repite infinito — en glyphflow el bucle es un
 * input del componente, no una propiedad de la variante.
 *
 * Donde el trazo se dibuja de cero y dejaría el icono incompleto va una GUÍA: una figura anexa
 * con `opacity: '0'` que se enciende tenue mientras dura el gesto. Mismo mecanismo que las
 * monedas y que la arista de `archive`.
 */
const T6_EASE = 'ease-in-out';

export const carIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
    },
    { tag: 'circle', cx: 7, cy: 17, r: 2 },
    { tag: 'path', d: "M9 17h6" },
    { tag: 'circle', cx: 17, cy: 17, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 778, { delay: 322 }),
      shapes: {
        0: /* @__PURE__ */ track(SUSPENSION, 270, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(SUSPENSION, 270, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    idle: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px) rotate(0deg)', easing: T6_EASE }, { transform: 'translateY(-0.28px) rotate(-1.05deg)', easing: T6_EASE }, { transform: 'translateY(0.09px) rotate(0.68deg)', easing: T6_EASE }, { transform: 'translateY(-0.05px) rotate(-0.2deg)', easing: T6_EASE }, { transform: 'translateY(-0.21px) rotate(-0.76deg)', easing: T6_EASE }, { transform: 'translateY(0.06px) rotate(0.24deg)', easing: T6_EASE }, { transform: 'translateY(-0.12px) rotate(-0.42deg)', easing: T6_EASE }, { transform: 'translateY(0.03px) rotate(0.1deg)', easing: T6_EASE }, { transform: 'translateY(0px) rotate(0deg)' }], 1600, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)', easing: T6_EASE }, { transform: 'translateY(-0.4px)', easing: T6_EASE }, { transform: 'translateY(0px)' }], 1600, { easing: T6_EASE, delay: 80, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', easing: T6_EASE }, { transform: 'translateY(-0.4px)', easing: T6_EASE }, { transform: 'translateY(0px)' }], 1600, { easing: T6_EASE }),
      },
    },
  },
);

/** De frente: los faros encienden y el morro se hunde. */
export const carFrontIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" },
    { tag: 'path', d: "M7 14h.01" },
    { tag: 'path', d: "M17 14h.01" },
    { tag: 'rect', x: 3, y: 10, width: 18, height: 8, rx: 2 },
    { tag: 'path', d: "M5 18v2" },
    { tag: 'path', d: "M19 18v2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(DESTELLA, 420),
        2: /* @__PURE__ */ track(DESTELLA, 420, { delay: 90 }),
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
        3: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Enciende ANTES el cartel, que es lo que lo hace taxi, y después los faros. */
export const carTaxiFrontIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2h4" },
    { tag: 'path', d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" },
    { tag: 'path', d: "M7 14h.01" },
    { tag: 'path', d: "M17 14h.01" },
    { tag: 'rect', x: 3, y: 10, width: 18, height: 8, rx: 2 },
    { tag: 'path', d: "M5 18v2" },
    { tag: 'path', d: "M19 18v2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DESTELLA, 420),
        2: /* @__PURE__ */ track(DESTELLA, 420, { delay: 140 }),
        3: /* @__PURE__ */ track(DESTELLA, 420, { delay: 200 }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 180 }),
        4: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 180 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 2px' }),
      },
      reverseOnLeave: true,
    },
  },
);
