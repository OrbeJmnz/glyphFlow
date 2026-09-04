// Familia `panel` del catálogo curado (18 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveXSeq, moveYSeq, track, icon } from '../choreography';
import { PANEL_DIVIDER_DOWN, PANEL_DIVIDER_LEFT, PANEL_DIVIDER_RIGHT, PANEL_DIVIDER_UP } from './_shared';
import { panelBottomCloseShapes, panelBottomDashedShapes, panelBottomOpenShapes, panelBottomShapes, panelLeftCloseShapes, panelLeftDashedShapes, panelLeftOpenShapes, panelLeftRightDashedShapes, panelLeftShapes, panelRightCloseShapes, panelRightDashedShapes, panelRightOpenShapes, panelRightShapes, panelTopBottomDashedShapes, panelTopCloseShapes, panelTopDashedShapes, panelTopOpenShapes, panelTopShapes } from '../animated-icons.shapes';

export const panelLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550) } },
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
      },
    },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
      },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
      },
    },
  });

export const panelRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550) } },
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
      },
    },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
      },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
      },
    },
  });

export const panelTopIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550) } },
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
      },
    },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
      },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
      },
    },
  });

export const panelBottomIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550) } },
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
      },
    },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
      },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
      },
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }, { transform: 'translateY(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
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
    /**
     * El divisor se empuja perpendicular a sí mismo, hacia el lado que ABRE el panel que le da
     * nombre. El marco no se mueve: es el contenedor, no el contenido.
     */
    nudge: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 60, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }, { transform: 'translateX(0px)' }], 420, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
      },
    },
  });
