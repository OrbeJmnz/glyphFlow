// Familia `chevron` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, moveXSeq, moveYSeq, track, icon, held } from '../choreography';
import { chevronDownShapes, chevronLeftShapes, chevronRightShapes, chevronUpShapes } from '../animated-icons.shapes';
/* ── Variante `nudge` ─────────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). El easing va POR KEYFRAME y `times`
 * se traduce a `offset`; el porqué de ambas cosas está en el bloque de `pulse` de
 * icons/battery.ts. Las variantes que la familia ya tenía no se tocan.
 *
 * SIN estela: el original la hace DUPLICANDO la figura, y añadir una figura fantasma
 * cambiaría la geometría del icono y `draw` la dibujaría dos veces.
 */
const EIO = 'ease-in-out';


/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** Late una vez. */
const E1_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
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

/** Empujoncito hacia donde lleva. Sostenido mientras dure el hover. */
export const chevronRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronRightShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(-1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateX(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
  });

export const chevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronDownShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(-1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateY(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
  });

export const chevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronLeftShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateX(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
  });

export const chevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronUpShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateY(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** El chevron choca contra el tope y rebota: por eso hay un tope. */
export const chevronFirstIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 18-6-6 6-6" },
    { tag: 'path', d: "M7 6v12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_LEFT, 600, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PULSE, 400, { easing: EASE, origin: '7px 12px', delay: 220, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo contra el tope de la derecha. */
export const chevronLastIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 18 6-6-6-6" },
    { tag: 'path', d: "M17 6v12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_RIGHT, 600, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PULSE, 400, { easing: EASE, origin: '17px 12px', delay: 220, fill: 'backwards' }),
      },
    },
  },
);
