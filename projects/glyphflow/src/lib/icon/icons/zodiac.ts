// Familia `zodiac` del catálogo curado (13 iconos).
//
// Un glifo no tiene partes que se muevan: no hay tapa, ni rueda, ni cola. Lo único que tiene es un
// ORDEN, el de la mano que lo escribe — y ese orden es exactamente lo que la variante `draw`
// automática NO puede saber: ella mide las figuras y dibuja de la más larga a la más corta, que en
// un símbolo casi nunca es como se traza.
//
// Por eso estos trece se curan aunque `draw` ya los dibujara: lo que se cura no es el movimiento,
// es la SECUENCIA. `pisces` traza sus dos peces y solo entonces la barra que los une; `cancer`
// cierra un 6 entero antes de empezar el 9; `taurus` pone la cabeza y después los cuernos.
// Escribirlo al revés se ve mal aunque el dibujo final sea idéntico.
//
// El `hold` es el mismo para todos a propósito: un símbolo sostenido no hace nada más que
// afirmarse un poco. Darle a cada uno una pose distinta sería inventarle una mecánica que no tiene.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, strokeDraw, icon } from '../choreography';

/** Un símbolo sostenido solo se afirma. */
const AFIRMA = /* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }];

/** El trazo, con el orden y la duración de cada uno decididos a mano. */
const trazo = (ms: number, delay = 0) =>
  /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), ms, { easing: 'ease-out', ...(delay ? { delay } : {}) });

/** El cuerno izquierdo baja hasta el asta y el derecho se cierra después. */
export const zodiacAriesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7.5a4.5 4.5 0 1 1 5 4.5" },
    { tag: 'path', d: "M7 12a4.5 4.5 0 1 1 5-4.5V21" },
  ],
  {
    default: { shapes: { 1: /* @__PURE__ */ trazo(420), 0: /* @__PURE__ */ trazo(380, 300) } },
    hold: { shapes: { 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }), 0: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }) }, reverseOnLeave: true },
  },
);

/** Primero la cabeza, después los cuernos: al revés no es un toro, es un paréntesis con bola. */
export const zodiacTaurusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 15, r: 6 },
    { tag: 'path', d: "M18 3A6 6 0 0 1 6 3" },
  ],
  {
    default: { shapes: { 0: /* @__PURE__ */ trazo(520), 1: /* @__PURE__ */ trazo(360, 400) } },
    hold: { shapes: { 0: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }), 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }) }, reverseOnLeave: true },
  },
);

/** Las dos columnas y luego las dos vigas: es un edificio, se levanta antes de techarse. */
export const zodiacGeminiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 4.525v14.948" },
    { tag: 'path', d: "M20 3A17 17 0 0 1 4 3" },
    { tag: 'path', d: "M4 21a17 17 0 0 1 16 0" },
    { tag: 'path', d: "M8 4.525v14.948" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ trazo(340),
        0: /* @__PURE__ */ trazo(340, 140),
        1: /* @__PURE__ */ trazo(320, 340),
        2: /* @__PURE__ */ trazo(320, 480),
      },
    },
    hold: { shapes: { 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }), 2: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }) }, reverseOnLeave: true },
  },
);

/** Un 6 completo —arco y bola— y solo entonces el 9. Alternarlos rompe la lectura. */
export const zodiacCancerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 14.5A9 6.5 0 0 1 5.5 19" },
    { tag: 'path', d: "M3 9.5A9 6.5 0 0 1 18.5 5" },
    { tag: 'circle', cx: 17.5, cy: 14.5, r: 3.5 },
    { tag: 'circle', cx: 6.5, cy: 9.5, r: 3.5 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ trazo(420),
        3: /* @__PURE__ */ trazo(300, 340),
        0: /* @__PURE__ */ trazo(420, 560),
        2: /* @__PURE__ */ trazo(300, 900),
      },
    },
    hold: { shapes: { 3: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '6.5px 9.5px' }), 2: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17.5px 14.5px' }) }, reverseOnLeave: true },
  },
);

/** La bola es la cabeza y va primero; la melena sale de ella. */
export const zodiacLeoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0" },
    { tag: 'circle', cx: 7, cy: 16, r: 3 },
  ],
  {
    default: { shapes: { 1: /* @__PURE__ */ trazo(320), 0: /* @__PURE__ */ trazo(560, 260) } },
    hold: { shapes: { 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '7px 16px' }), 0: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }) }, reverseOnLeave: true },
  },
);

/** Se escribe como la eme que es: rabito, palo, palo, y el bucle al final. */
export const zodiacVirgoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5" },
    { tag: 'path', d: "M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5" },
    { tag: 'path', d: "M6 19V6a3 3 0 0 0-3-3h0" },
    { tag: 'path', d: "M6 5.5a1 1 0 0 1 5 0V19" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ trazo(320),
        3: /* @__PURE__ */ trazo(340, 240),
        0: /* @__PURE__ */ trazo(380, 460),
        1: /* @__PURE__ */ trazo(380, 700),
      },
    },
    hold: { shapes: { 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 16px' }) }, reverseOnLeave: true },
  },
);

/** La balanza se apoya en su base: primero el suelo, después el fiel. */
export const zodiacLibraIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21",
    },
    { tag: 'path', d: "M3 20h18" },
  ],
  {
    default: { shapes: { 1: /* @__PURE__ */ trazo(320), 0: /* @__PURE__ */ trazo(620, 240) } },
    hold: { shapes: { 0: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }) }, reverseOnLeave: true },
  },
);

/** El cuerpo entero antes que el aguijón: la punta es lo último que se pone. */
export const zodiacScorpioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3" },
    { tag: 'path', d: "m22 19-3 3" },
    { tag: 'path', d: "M5 19V5.5a1 1 0 0 1 5 0" },
    { tag: 'path', d: "M5 5.5A2.5 2.5 0 0 0 2.5 3" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ trazo(280),
        2: /* @__PURE__ */ trazo(360, 200),
        0: /* @__PURE__ */ trazo(520, 440),
        1: /* @__PURE__ */ trazo(260, 880),
      },
    },
    hold: { shapes: { 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '20.5px 20.5px' }) }, reverseOnLeave: true },
  },
);

/** La flecha se lanza y el travesaño la cruza al final, que es como se firma. */
export const zodiacSagittariusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 3h6v6" },
    { tag: 'path', d: "M21 3 3 21" },
    { tag: 'path', d: "m9 9 6 6" },
  ],
  {
    default: {
      shapes: { 1: /* @__PURE__ */ trazo(520), 0: /* @__PURE__ */ trazo(300, 420), 2: /* @__PURE__ */ trazo(280, 640) },
    },
    hold: { shapes: { 0: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 6px' }) }, reverseOnLeave: true },
  },
);

/** Cuerno, lomo y cola: la bola del final es la cola, y va sola. */
export const zodiacCapricornIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0" },
    { tag: 'path', d: "M7 19V6a3 3 0 0 0-3-3h0" },
    { tag: 'circle', cx: 17, cy: 17, r: 3 },
  ],
  {
    default: {
      shapes: { 1: /* @__PURE__ */ trazo(340), 0: /* @__PURE__ */ trazo(460, 260), 2: /* @__PURE__ */ trazo(300, 620) },
    },
    hold: { shapes: { 2: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 17px' }) }, reverseOnLeave: true },
  },
);

/** Dos ondas, y la de abajo repite a la de arriba: es agua, va en cascada. */
export const zodiacAquariusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10",
    },
    {
      tag: 'path',
      d: "m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002",
    },
  ],
  {
    default: { shapes: { 0: /* @__PURE__ */ trazo(560), 1: /* @__PURE__ */ trazo(560, 300) } },
    hold: { shapes: { 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 16px' }) }, reverseOnLeave: true },
  },
);

/** Los dos peces primero y la cuerda que los ata al final: sin peces no hay nada que atar. */
export const zodiacPiscesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 21a15 15 0 0 1 0-18" },
    { tag: 'path', d: "M20 12H4" },
    { tag: 'path', d: "M5 3a15 15 0 0 1 0 18" },
  ],
  {
    default: {
      shapes: { 2: /* @__PURE__ */ trazo(420), 0: /* @__PURE__ */ trazo(420, 300), 1: /* @__PURE__ */ trazo(320, 620) },
    },
    hold: { shapes: { 1: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }) }, reverseOnLeave: true },
  },
);

/** La copa antes que la serpiente: la serpiente se enrosca SOBRE algo. */
export const zodiacOphiuchusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10" },
    { tag: 'path', d: "M6 3v12a6 6 0 0 0 12 0V3" },
  ],
  {
    default: { shapes: { 1: /* @__PURE__ */ trazo(520), 0: /* @__PURE__ */ trazo(420, 400) } },
    hold: { shapes: { 0: /* @__PURE__ */ track(AFIRMA, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }) }, reverseOnLeave: true },
  },
);
