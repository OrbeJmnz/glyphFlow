// Familia `chevrons` del catálogo curado (8 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, EASE, moveYSeq, track, icon } from '../choreography';
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
    // Estela(s) del `dart`: copia de lo que viaja, invisible en reposo.
    { tag: 'path', d: "m7 20 5-5 5 5", opacity: '0' },
    { tag: 'path', d: "m7 4 5 5 5-5", opacity: '0' },
  ],
  {
    /** La mitad del `dart`: mismo gesto, la mitad del recorrido y sin estela. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0.00px)', offset: 0 }, { transform: 'translateY(0.70px)', offset: 0.22 }, { transform: 'translateY(-1.00px)', offset: 0.6 }, { transform: 'translateY(-0.20px)', offset: 0.82 }, { transform: 'translateY(0.00px)', offset: 1 }], 460, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0.00px)', offset: 0 }, { transform: 'translateY(-0.70px)', offset: 0.22 }, { transform: 'translateY(1.00px)', offset: 0.6 }, { transform: 'translateY(0.20px)', offset: 0.82 }, { transform: 'translateY(0.00px)', offset: 1 }], 460, { easing: 'ease-out' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /** El disparo con estela. Ver el bloque de esta tanda para el porqué de cada sub-grupo. */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)', offset: 0 }, { transform: 'translateY(1.4px)', offset: 0.22 }, { transform: 'translateY(-2px)', offset: 0.6 }, { transform: 'translateY(-0.4px)', offset: 0.82 }, { transform: 'translateY(0px)', offset: 1 }], 520, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)', offset: 0 }, { transform: 'translateY(-1.4px)', offset: 0.22 }, { transform: 'translateY(2px)', offset: 0.6 }, { transform: 'translateY(0.4px)', offset: 0.82 }, { transform: 'translateY(0px)', offset: 1 }], 520, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(3px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(3px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 100, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-3px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-3px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 100, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA: el ancla se traza y lo que viaja entra desde fuera, escalonado.
     *
     * Qué figura es el ancla NO sale de la firma de tags: en `circle-arrow-out-up-left` la
     * escuadra está en el índice 0 y el aro en el 2, al revés que en sus tres hermanos. Va
     * icono por icono a propósito.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.08) rotate(-4deg)' }, { transform: 'scale(0.96) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 880, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 7px)', opacity: '0' }, { transform: 'translate(0.00px, -1.75px)', opacity: '1' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, -7px)', opacity: '0' }, { transform: 'translate(0.00px, 1.75px)', opacity: '1' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
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
    dart: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevrons-up`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
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
    dart: {
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
    dart: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevrons-right`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
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
    dart: {
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
    dart: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(-1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateX(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevrons-left`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
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
    dart: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 180, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(1.5px)', offset: 0.18, easing: EIO }, { transform: 'translateY(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear', delay: 120 }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevrons-down`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

/** Ordenar: las dos flechas se separan — el gesto de "esto se puede mover". */
export const chevronsUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon([...chevronsUpDownShapes, { tag: 'path', d: "m7 15 5 5 5-5", opacity: '0' }, { tag: 'path', d: "m7 9 5-5 5 5", opacity: '0' }], {
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
    /** El disparo con estela. Ver el bloque de esta tanda para el porqué de cada sub-grupo. */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)', offset: 0 }, { transform: 'translateY(-1.4px)', offset: 0.22 }, { transform: 'translateY(2px)', offset: 0.6 }, { transform: 'translateY(0.4px)', offset: 0.82 }, { transform: 'translateY(0px)', offset: 1 }], 520, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)', offset: 0 }, { transform: 'translateY(1.4px)', offset: 0.22 }, { transform: 'translateY(-2px)', offset: 0.6 }, { transform: 'translateY(-0.4px)', offset: 0.82 }, { transform: 'translateY(0px)', offset: 1 }], 520, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-3px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-3px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 100, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(3px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(3px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 100, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA: el ancla se traza y lo que viaja entra desde fuera, escalonado.
     *
     * Qué figura es el ancla NO sale de la firma de tags: en `circle-arrow-out-up-left` la
     * escuadra está en el índice 0 y el aro en el 2, al revés que en sus tres hermanos. Va
     * icono por icono a propósito.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.08) rotate(-4deg)' }, { transform: 'scale(0.96) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 880, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 7px)', opacity: '0' }, { transform: 'translate(0.00px, -1.75px)', opacity: '1' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, -7px)', opacity: '0' }, { transform: 'translate(0.00px, 1.75px)', opacity: '1' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
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
    dart: {
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
