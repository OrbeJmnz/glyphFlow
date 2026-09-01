// Familia `chevrons` del catálogo curado (8 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, moveYSeq, track, icon } from '../choreography';
import { chevronsUpDownShapes } from '../animated-icons.shapes';
/* ── Variante `nudge` ─────────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). El easing va POR KEYFRAME y `times`
 * se traduce a `offset`; el porqué de ambas cosas está en el bloque de `pulse` de
 * icons/battery.ts. Las variantes que la familia ya tenía no se tocan.
 */
const EIO = 'ease-in-out';


/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** Parpadea. Para puntos suspensivos y avisos: dice "esto sigue pasando". */
const E1_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/**
 * Se desplaza y vuelve, con anticipación. La anticipación no es adorno: casi todo lo que se mueve
 * hacia un borde en este catálogo tiene 1 de margen, y un recorrido de 1 se ve como un temblor.
 * Retrocediendo antes, el recorrido visible se dobla sin salirse del lienzo.
 */
const E1_PUSH_RIGHT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1px)', offset: 0.28 },
  { transform: 'translateX(1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

const E1_PUSH_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.28 },
  { transform: 'translateX(-1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

export const chevronsDownUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 20 5-5 5 5" },
    { tag: 'path', d: "m7 4 5 5 5-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chevronsDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 6 5 5 5-5" },
    { tag: 'path', d: "m7 13 5 5 5-5" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m7 6 5 5 5-5", opacity: '0' },
    { tag: 'path', d: "m7 13 5 5 5-5", opacity: '0' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
  },
);

export const chevronsLeftRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 7-5 5 5 5" },
    { tag: 'path', d: "m15 7 5 5-5 5" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m9 7-5 5 5 5", opacity: '0' },
    { tag: 'path', d: "m15 7 5 5-5 5", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 800, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 800, { easing: 'linear', delay: 260, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '1', easing: EIO }, { transform: 'translateX(-4px)', opacity: '0.6', easing: EIO }, { transform: 'translate(0px, 0px)', opacity: '1' }], 800, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '1', easing: EIO }, { transform: 'translateX(4px)', opacity: '0.6', easing: EIO }, { transform: 'translate(0px, 0px)', opacity: '1' }], 800, { easing: 'linear', delay: 200 }),
      },
    },
  },
);

export const chevronsLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 17-5-5 5-5" },
    { tag: 'path', d: "m18 17-5-5 5-5" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m11 17-5-5 5-5", opacity: '0' },
    { tag: 'path', d: "m18 17-5-5 5-5", opacity: '0' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
  },
);

export const chevronsRightLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20 17-5-5 5-5" },
    { tag: 'path', d: "m4 17 5-5-5-5" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m20 17-5-5 5-5", opacity: '0' },
    { tag: 'path', d: "m4 17 5-5-5-5", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 900, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 900, { easing: 'linear', delay: 360, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '1', easing: EIO }, { transform: 'translateX(-4px)', opacity: '0.6', easing: EIO }, { transform: 'translate(0px, 0px)', opacity: '1' }], 900, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '1', easing: EIO }, { transform: 'translateX(4px)', opacity: '0.6', easing: EIO }, { transform: 'translate(0px, 0px)', opacity: '1' }], 900, { easing: 'linear', delay: 300 }),
      },
    },
  },
);

export const chevronsRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m6 17 5-5-5-5" },
    { tag: 'path', d: "m13 17 5-5-5-5" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m6 17 5-5-5-5", opacity: '0' },
    { tag: 'path', d: "m13 17 5-5-5-5", opacity: '0' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
  },
);

export const chevronsUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 11-5-5-5 5" },
    { tag: 'path', d: "m17 18-5-5-5 5" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m17 11-5-5-5 5", opacity: '0' },
    { tag: 'path', d: "m17 18-5-5-5 5", opacity: '0' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
  },
);

/** Ordenar: las dos flechas se separan — el gesto de "esto se puede mover". */
export const chevronsUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronsUpDownShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 500),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Los chevrons se apartan y los puntos parpadean en medio: algo está pasando ahí. */
export const chevronsLeftRightEllipsisIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12h.01" },
    { tag: 'path', d: "M16 12h.01" },
    { tag: 'path', d: "m17 7 5 5-5 5" },
    { tag: 'path', d: "m7 7-5 5 5 5" },
    { tag: 'path', d: "M8 12h.01" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m17 7 5 5-5 5", opacity: '0' },
    { tag: 'path', d: "m7 7-5 5 5 5", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_BLINK, 800, { easing: EASE, delay: 250, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_BLINK, 800, { easing: EASE, delay: 350, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_PUSH_RIGHT, 600, { easing: EASE }),
        3: /* @__PURE__ */ track(E1_PUSH_LEFT, 600, { easing: EASE }),
        4: /* @__PURE__ */ track(E1_BLINK, 800, { easing: EASE, delay: 150, fill: 'backwards' }),
      },
    },
    nudge: {
      shapes: {
        5: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 260, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '1', easing: EIO }, { transform: 'translateX(-4px)', opacity: '0.5', easing: EIO }, { transform: 'translate(0px, 0px)', opacity: '1' }], 1000, { easing: 'linear' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '1', easing: EIO }, { transform: 'translateX(4px)', opacity: '0.5', easing: EIO }, { transform: 'translate(0px, 0px)', opacity: '1' }], 1000, { easing: 'linear', delay: 200 }),
        4: /* @__PURE__ */ track([{ opacity: '1', easing: EIO }, { opacity: '0.35', easing: EIO }, { opacity: '1' }], 1000, { easing: 'linear' }),
        0: /* @__PURE__ */ track([{ opacity: '1', easing: EIO }, { opacity: '0.35', easing: EIO }, { opacity: '1' }], 1000, { easing: 'linear', delay: 300 }),
        1: /* @__PURE__ */ track([{ opacity: '1', easing: EIO }, { opacity: '0.35', easing: EIO }, { opacity: '1' }], 1000, { easing: 'linear', delay: 600 }),
      },
    },
  },
);
