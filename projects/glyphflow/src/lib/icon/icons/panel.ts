// Familia `panel` del catálogo curado (18 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, moveYSeq, track, icon } from '../choreography';
import { panelBottomCloseShapes, panelBottomDashedShapes, panelBottomOpenShapes, panelBottomShapes, panelLeftCloseShapes, panelLeftDashedShapes, panelLeftOpenShapes, panelLeftRightDashedShapes, panelLeftShapes, panelRightCloseShapes, panelRightDashedShapes, panelRightOpenShapes, panelRightShapes, panelTopBottomDashedShapes, panelTopCloseShapes, panelTopDashedShapes, panelTopOpenShapes, panelTopShapes } from '../animated-icons.shapes';

/** Panel: el divisor se desliza a la izquierda — "left" es el nombre, no solo la etiqueta. */
// Se mueve a la izquierda y se sostiene ahí la mayor parte del tiempo, en vez de un vaivén
// parejo que se lee ambiguo. panel-left-close usa el mismo divisor: su flecha "<" ya apunta
// y empuja hacia la izquierda, así que ambos van en la MISMA dirección.
const PANEL_DIVIDER_LEFT: Keyframe[] = [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-2px)', offset: 0.35 },
  { transform: 'translateX(-2px)', offset: 0.75 },
  { transform: 'translateX(0)', offset: 1 },
];

// Mismo criterio que panel-left, en cada orientación: el divisor se mueve HACIA donde apunta el
// nombre y se sostiene ahí, con regreso rápido al final — nunca un vaivén parejo y ambiguo.
const PANEL_DIVIDER_RIGHT: Keyframe[] = [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(2px)', offset: 0.35 },
  { transform: 'translateX(2px)', offset: 0.75 },
  { transform: 'translateX(0)', offset: 1 },
];

const PANEL_DIVIDER_UP: Keyframe[] = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-2px)', offset: 0.35 },
  { transform: 'translateY(-2px)', offset: 0.75 },
  { transform: 'translateY(0)', offset: 1 },
];

const PANEL_DIVIDER_DOWN: Keyframe[] = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(2px)', offset: 0.35 },
  { transform: 'translateY(2px)', offset: 0.75 },
  { transform: 'translateY(0)', offset: 1 },
];

export const panelLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550) } },
  });

/** Cerrar panel: la flecha empuja hacia la izquierda y se sostiene. */
export const panelLeftCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftCloseShapes, {
    // `reverseOnLeave` aplica a TODA la coreografía, no solo al root: por eso basta con el track
    // de la flecha, sin un root vacío de relleno.
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Abrir panel: la flecha ">" empuja hacia la derecha (adentro) y se sostiene. */
export const panelLeftOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const panelRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550) } },
  });

/** Cerrar panel: la flecha "&gt;" empuja hacia la derecha (afuera) y se sostiene. */
export const panelRightCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightCloseShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Abrir panel: la flecha "&lt;" empuja hacia la izquierda (adentro) y se sostiene. */
export const panelRightOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const panelTopIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550) } },
  });

/** Cerrar panel: la flecha "^" empuja hacia arriba (afuera) y se sostiene. */
export const panelTopCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopCloseShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Abrir panel: la flecha "v" empuja hacia abajo (adentro) y se sostiene. */
export const panelTopOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: EASE, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: EASE, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const panelBottomIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550) } },
  });

/** Cerrar panel: la flecha "v" empuja hacia abajo (afuera) y se sostiene. */
export const panelBottomCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomCloseShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Abrir panel: la flecha "^" empuja hacia arriba (adentro) y se sostiene. */
export const panelBottomOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: EASE, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: EASE, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Marca de resize a la izquierda: las 4 rayas invitan a jalar hacia la izquierda. */
export const panelLeftDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
      },
    },
  });

/** Marca de resize a la derecha: las 4 rayas invitan a jalar hacia la derecha. */
export const panelRightDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
      },
    },
  });

/** Marca de resize arriba: las 4 rayas invitan a jalar hacia arriba. */
export const panelTopDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
      },
    },
  });

/** Marca de resize abajo: las 4 rayas invitan a jalar hacia abajo. */
export const panelBottomDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
      },
    },
  });

/** Marca de resize arriba y abajo: cada par se separa hacia afuera. */
export const panelTopBottomDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopBottomDashedShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 70 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 140 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 210 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: los 8 se separan juntos, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: EASE }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: EASE }),
      },
    },
  });

/** Marca de resize izquierda y derecha: cada par se separa hacia afuera. */
export const panelLeftRightDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftRightDashedShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 70 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 70 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 210 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: los 8 se separan juntos, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: EASE }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: EASE }),
      },
    },
  });
