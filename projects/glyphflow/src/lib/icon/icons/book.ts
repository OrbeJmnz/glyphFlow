// Familia `book` del catálogo curado (23 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, strokeDraw, icon } from '../choreography';
import { bookOpenShapes } from '../animated-icons.shapes';
import { BADGE_BOUNCE_DRAW, X_SNAP_DRAW, HEART_QUAD_PULSE } from './_shared';

/**
 * El meneo con el que abre TODA la familia: el libro se ladea a un lado y al otro y se asienta.
 * Estaba escrito a mano en cada icono; aquí solo se nombra donde hacía falta colgarle algo más.
 */
const BOOK_WIGGLE = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 },
  { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 },
  { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 },
  { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 },
  { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 },
];

/** Lo que pasa "al final" arranca cuando el meneo ya terminó. El mismo número que usa `reveal`. */
const BOOK_AFTER = 620;

/** El desfase entre dos piezas de la MISMA insignia. El mismo que usa `reveal` (620 → 750). */
const BOOK_STAGGER = 130;

/**
 * Las tres barras de `book-audio` bailan como un ecualizador. Comparten centro (y = 9.5), así que
 * lo único que las separa es el desfase — que es justo lo que las hace ver vivas y no un bloque.
 */
const BOOK_EQ = /* @__PURE__ */ [
  { transform: 'scaleY(1)' },
  { transform: 'scaleY(0.45)' },
  { transform: 'scaleY(1.35)' },
  { transform: 'scaleY(0.7)' },
  { transform: 'scaleY(1)' },
];

/**
 * El listón de `book-marked` se estira hacia abajo y se recoge, como si acabaran de meterlo entre
 * las hojas. Pivota en y=2 —el borde de arriba, que es por donde el listón está cosido al libro—
 * porque desde el centro parecería que flota.
 */
const BOOK_RIBBON_TUCK = /* @__PURE__ */ [
  { transform: 'scaleY(1)' },
  { transform: 'scaleY(1.22)' },
  { transform: 'scaleY(0.92)' },
  { transform: 'scaleY(1)' },
];

/** La flecha baja y vuelve. Asta y punta comparten track: si solo bajara una, se partirían. */
const BOOK_ARROW_DIP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(3px)', offset: 0.5 },
  { transform: 'translateY(0)', offset: 1 },
];

/** La misma flecha, para arriba. */
const BOOK_ARROW_HOP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-3px)', offset: 0.5 },
  { transform: 'translateY(0)', offset: 1 },
];

/**
 * `book-up-2` · las dos flechas se agachan, suben juntas, y ahí la de arriba sigue sola.
 *
 * Sube 1 y no más porque no cabe: su vértice ya está en y=2 y con `stroke-width: 2` el trazo
 * llega a y=1. Lo que le da recorrido al gesto es la agachada previa — 2.5 en total, sin salirse.
 */
const BOOK_UP2_TOGETHER = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.5px)', offset: 0.22 },
  { transform: 'translateY(0)', offset: 0.5 },
  { transform: 'translateY(0)', offset: 1 },
];

/** La de más arriba: lo mismo, y después sube el tramo que la separa de la otra. */
const BOOK_UP2_LEAD = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.5px)', offset: 0.22 },
  { transform: 'translateY(0)', offset: 0.5 },
  { transform: 'translateY(-1px)', offset: 0.72 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Los auriculares se menean puestos. Las tres piezas giran sobre el MISMO punto o se desarman. */
const BOOK_HEADPHONE_SWAY = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-7deg)', offset: 0.3 },
  { transform: 'rotate(7deg)', offset: 0.65 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** El objetivo se abre y vuelve — el círculo de `book-image` es el lente, no un adorno. */
const BOOK_LENS_POP = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1.45)', offset: 0.45 },
  { transform: 'scale(1)', offset: 1 },
];

/** La llave gira y vuelve. El giro va sobre la anilla, que es lo que se queda quieto. */
const BOOK_KEY_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(25deg)', offset: 0.5 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** El arco del candado se levanta y encaja. El cuerpo se queda donde está. */
const BOOK_SHACKLE_LIFT = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.5px)', offset: 0.45 },
  { transform: 'translateY(0)', offset: 1 },
];

/** El libro se abre: las páginas salen del lomo. Con 0.9 el gesto no se leía; con 0.15, sí. */
const BOOK_OPEN_SPREAD = /* @__PURE__ */ [{ transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }];

/**
 * El check se traza mientras el libro se abre y salta cuando ya está abierto. Va en UN track y no
 * en dos porque una figura solo admite uno: el trazo y el salto se reparten los offsets. Un
 * keyframe que no nombra `transform` no lo congela — WAAPI interpola cada propiedad por su cuenta.
 */
const BOOK_CHECK_HOP = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateY(0)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.3 },
  { strokeDashoffset: '0', opacity: 1, transform: 'translateY(0)', offset: 0.62 },
  { transform: 'translateY(-3px)', offset: 0.8 },
  { transform: 'translateY(0)', offset: 1 },
];

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Parpadea: un indicador encendido, un aviso. */
const E2_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/** La hoja de encima se despega de la pila. */
const E2_PEEL = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(-1.5px, 1.5px)' },
  { transform: 'translate(0, 0)' },
];

const E2_PUSH_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.28 },
  { transform: 'translateX(-1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

/** El meneo de la familia `book`, para los tres que llegan tarde a ella. */
const BOOK_WIGGLE_E2 = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 },
  { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 },
  { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 },
  { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 },
  { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 },
];

export const bookAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m8 13 4-7 4 7" },
    { tag: 'path', d: "M9.1 11h5.7" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 9.5px', delay: BOOK_AFTER, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 11px', delay: BOOK_AFTER + BOOK_STAGGER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookAudioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v7" },
    { tag: 'path', d: "M16 8v3" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 8v3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        3: /* @__PURE__ */ track(BOOK_EQ, 640, { easing: EASE, origin: '8px 9.5px', delay: BOOK_AFTER, fill: 'backwards' }),
        0: /* @__PURE__ */ track(BOOK_EQ, 640, { easing: EASE, origin: '12px 9.5px', delay: BOOK_AFTER + 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(BOOK_EQ, 640, { easing: EASE, origin: '16px 9.5px', delay: BOOK_AFTER + 180, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 9.5 2 2 4-4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 340, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17h1.5" },
    { tag: 'path', d: "M12 22h1.5" },
    { tag: 'path', d: "M12 2h1.5" },
    { tag: 'path', d: "M17.5 22H19a1 1 0 0 0 1-1" },
    { tag: 'path', d: "M17.5 2H19a1 1 0 0 1 1 1v1.5" },
    { tag: 'path', d: "M20 14v3h-2.5" },
    { tag: 'path', d: "M20 8.5V10" },
    { tag: 'path', d: "M4 10V8.5" },
    { tag: 'path', d: "M4 19.5V14" },
    { tag: 'path', d: "M4 4.5A2.5 2.5 0 0 1 6.5 2H8" },
    { tag: 'path', d: "M8 22H6.5a1 1 0 0 1 0-5H8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const bookDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 10 3 3 3-3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(BOOK_ARROW_DIP, 420, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BOOK_ARROW_DIP, 420, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookHeadphonesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 12v-2a4 4 0 0 1 8 0v2" },
    { tag: 'circle', cx: 15, cy: 12, r: 1 },
    { tag: 'circle', cx: 9, cy: 12, r: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(BOOK_HEADPHONE_SWAY, 420, { easing: EASE, origin: '12px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BOOK_HEADPHONE_SWAY, 420, { easing: EASE, origin: '12px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
        3: /* @__PURE__ */ track(BOOK_HEADPHONE_SWAY, 420, { easing: EASE, origin: '12px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(HEART_QUAD_PULSE, 900, { easing: EASE, origin: '12px 9.4px', delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookImageIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 10, cy: 8, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        2: /* @__PURE__ */ track(BOOK_LENS_POP, 420, { easing: EASE, origin: '10px 8px', delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15" },
    { tag: 'path', d: "M17 2v6" },
    { tag: 'path', d: "M17 4h2" },
    { tag: 'path', d: "M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 17, cy: 10, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(BOOK_KEY_TURN, 480, { easing: EASE, origin: '17px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BOOK_KEY_TURN, 480, { easing: EASE, origin: '17px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
        4: /* @__PURE__ */ track(BOOK_KEY_TURN, 480, { easing: EASE, origin: '17px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 6V4a2 2 0 1 0-4 0v2" },
    { tag: 'path', d: "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" },
    { tag: 'rect', x: 12, y: 6, width: 8, height: 5, rx: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(BOOK_SHACKLE_LIFT, 420, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookMarkedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v8l3-3 3 3V2" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(BOOK_RIBBON_TUCK, 520, { easing: EASE, origin: '13px 2px', delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M9 10h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookOpenCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5v16" },
    { tag: 'path', d: "m16 12 2 2 4-4" },
    { tag: 'path', d: "M22 6V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2h4.001A2 2 0 0022 17v-1.344" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(BOOK_OPEN_SPREAD, 560, { easing: SPRING_OUT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(BOOK_CHECK_HOP, 900, { easing: EASE }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);
// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookOpenTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5v16" },
    { tag: 'path', d: "M16 13h2" },
    { tag: 'path', d: "M16 9h2" },
    { tag: 'path', d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" },
    { tag: 'path', d: "M6 13h2" },
    { tag: 'path', d: "M6 9h2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 400, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 500, fill: 'backwards' }),
      },
    },
  },
);
export const bookPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v6" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M9 10h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 10px', delay: BOOK_AFTER, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 10px', delay: BOOK_AFTER + BOOK_STAGGER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 11h8" },
    { tag: 'path', d: "M8 7h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookTypeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 13h4" },
    { tag: 'path', d: "M12 6v7" },
    { tag: 'path', d: "M16 8V6H8v2" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 7px', delay: BOOK_AFTER, fill: 'backwards' }),
        1: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 9.5px', delay: BOOK_AFTER + 90, fill: 'backwards' }),
        0: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 13px', delay: BOOK_AFTER + 180, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookUp2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" },
    { tag: 'path', d: "m9 10 3-3 3 3" },
    { tag: 'path', d: "m9 5 3-3 3 3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(BOOK_UP2_TOGETHER, 700, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
        3: /* @__PURE__ */ track(BOOK_UP2_TOGETHER, 700, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
        4: /* @__PURE__ */ track(BOOK_UP2_LEAD, 700, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 10 3-3 3 3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE, 600, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(BOOK_ARROW_HOP, 420, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BOOK_ARROW_HOP, 420, { easing: EASE, delay: BOOK_AFTER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 13a3 3 0 1 0-6 0" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 12, cy: 8, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 8px', delay: BOOK_AFTER, fill: 'backwards' }),
        0: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 420, { easing: EASE, origin: '12px 12px', delay: BOOK_AFTER + BOOK_STAGGER, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14.5 7-5 5" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9.5 7 5 5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { easing: EASE, origin: '12px 9.5px', delay: BOOK_AFTER, fill: 'backwards' }),
        2: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { easing: EASE, origin: '12px 9.5px', delay: BOOK_AFTER + 90, fill: 'backwards' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** Libro que se abre. */
export const bookOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(BOOK_OPEN_SPREAD, 560, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Se menea el libro ENTERO, como toda su familia, y el aviso tirita cuando se asienta. */
export const bookAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13h.01" },
    { tag: 'path', d: "M12 6v3" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE_E2, 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(E2_BLINK, 700, { easing: EASE, delay: 620, fill: 'backwards' }),
        0: /* @__PURE__ */ track(E2_BLINK, 700, { easing: EASE, delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookCopyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 7a2 2 0 0 0-2 2v11" },
    { tag: 'path', d: "M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21" },
    {
      tag: 'path',
      d: "M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(E2_PEEL, 640, { easing: EASE }),
      },
    },
  },
);

/** El libro entero se menea y después la lupa busca: la lente y su asta son una sola cosa. */
export const bookSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 22H5.5a1 1 0 0 1 0-5h4.501" },
    { tag: 'path', d: "m21 22-1.879-1.878" },
    { tag: 'path', d: "M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" },
    { tag: 'circle', cx: 17, cy: 18, r: 3 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(BOOK_WIGGLE_E2, 600, { easing: EASE }),
      shapes: {
        3: /* @__PURE__ */ track(E2_PUSH_LEFT, 620, { easing: EASE, delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PUSH_LEFT, 620, { easing: EASE, delay: 620, fill: 'backwards' }),
      },
    },
  },
);
