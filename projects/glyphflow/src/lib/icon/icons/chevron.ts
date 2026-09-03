// Familia `chevron` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, EASE, moveXSeq, moveYSeq, track, icon, held } from '../choreography';
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
    dart: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(9px)', opacity: '0.45', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(9px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 80, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(-1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateX(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevron-left`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  });

export const chevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronDownShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    dart: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(9px)', opacity: '0.45', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(9px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 80, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(-1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateY(4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevron-up`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  });

export const chevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronLeftShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    dart: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-9px)', opacity: '0.45', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(-9px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 80, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateX(1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateX(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevron-right`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  });

export const chevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronUpShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    dart: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-9px)', opacity: '0.45', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-9px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 80, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', offset: 0, easing: EIO }, { transform: 'translateY(1.5px)', offset: 0.2, easing: EIO }, { transform: 'translateY(-4px)', offset: 0.55, easing: EIO }, { transform: 'translate(0px, 0px)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevron-down`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
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
    // Estela(s) del `dart`: copia de lo que viaja, invisible en reposo.
    { tag: 'path', d: "m17 18-6-6 6-6", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_LEFT, 600, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PULSE, 400, { easing: EASE, origin: '7px 12px', delay: 220, fill: 'backwards' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevron-last`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
    /** El disparo con estela. Ver el bloque de esta tanda para el porqué de cada sub-grupo. */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)', offset: 0 }, { transform: 'translateX(1.6px)', offset: 0.22 }, { transform: 'translateX(-2.2px)', offset: 0.6 }, { transform: 'translateX(-0.44000000000000006px)', offset: 0.82 }, { transform: 'translateX(0px)', offset: 1 }], 520, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-3.2px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(-3.2px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 100, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.3 }, { transform: 'scaleY(0.84)', offset: 0.5 }, { transform: 'scaleY(1.05)', offset: 0.75 }, { transform: 'scaleY(1)', offset: 1 }], 520, { easing: 'ease-out', origin: '7px 12px' }),
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
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 680, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(7px, 0px)', opacity: '0' }, { transform: 'translate(-1.75px, 0.00px)', opacity: '1' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 220, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo contra el tope de la derecha. */
export const chevronLastIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 18 6-6-6-6" },
    { tag: 'path', d: "M17 6v12" },
    // Estela(s) del `dart`: copia de lo que viaja, invisible en reposo.
    { tag: 'path', d: "m7 18 6-6-6-6", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_RIGHT, 600, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PULSE, 400, { easing: EASE, origin: '17px 12px', delay: 220, fill: 'backwards' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chevron-first`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
    /** El disparo con estela. Ver el bloque de esta tanda para el porqué de cada sub-grupo. */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)', offset: 0 }, { transform: 'translateX(-1.6px)', offset: 0.22 }, { transform: 'translateX(2.2px)', offset: 0.6 }, { transform: 'translateX(0.44000000000000006px)', offset: 0.82 }, { transform: 'translateX(0px)', offset: 1 }], 520, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(3.2px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(3.2px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 100, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.3 }, { transform: 'scaleY(0.84)', offset: 0.5 }, { transform: 'scaleY(1.05)', offset: 0.75 }, { transform: 'scaleY(1)', offset: 1 }], 520, { easing: 'ease-out', origin: '17px 12px' }),
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
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 680, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(-7px, 0px)', opacity: '0' }, { transform: 'translate(1.75px, 0.00px)', opacity: '1' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 220, fill: 'backwards' }),
      },
    },
  },
);
