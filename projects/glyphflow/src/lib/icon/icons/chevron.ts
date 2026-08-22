// Familia `chevron` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { moveXSeq, moveYSeq, track, icon, held } from '../choreography';
import { chevronDownShapes, chevronLeftShapes, chevronRightShapes, chevronUpShapes } from '../animated-icons.shapes';

/** Empujoncito hacia donde lleva. Sostenido mientras dure el hover. */
export const chevronRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronRightShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const chevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronDownShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const chevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronLeftShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const chevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronUpShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });
