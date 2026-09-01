// Familia `key` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { rotateSeq, track, icon } from '../choreography';
import { keyRoundShapes, keyShapes } from '../animated-icons.shapes';

export const keySquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" },
    { tag: 'path', d: "m14 7 3 3" },
    { tag: 'path', d: "m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg) scale(1)', offset: 0 }, { transform: 'rotate(15deg) scale(1.05)', offset: 0.3 }, { transform: 'rotate(-15deg) scale(1)', offset: 0.7 }, { transform: 'rotate(0deg) scale(1)', offset: 1 }], 600, { origin: 'center' }),
    },
  },
);

/** Llave girando sobre su anillo, no sobre el centro del lienzo. */
export const keyIcon: AnimatedIconDef = /* @__PURE__ */ icon(keyShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -20, 0]), 700, { origin: '7.5px 15.5px' }),
    },
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-28deg)' }], 600, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  });

/**
   * Llave redonda girando sobre su anillo. Ojo: el anillo de ésta está ARRIBA A LA DERECHA, no
   * abajo a la izquierda como en `key` — con el pivote de la otra, la llave gira desde la punta.
   */
export const keyRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(keyRoundShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -20, 0]), 700, { origin: '16.5px 7.5px' }) },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0', offset: 1 }], 900, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0', offset: 1 }], 900, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ track([{ transform: 'translateY(0) rotate(0deg)', offset: 0 }, { transform: 'translateY(-3px) rotate(3deg)', offset: 0.2 }, { transform: 'translateY(0) rotate(-3deg)', offset: 0.4 }, { transform: 'translateY(-2px) rotate(0deg)', offset: 0.6 }, { transform: 'translateY(0) rotate(0deg)', offset: 1 }], 900, { easing: 'ease' }),
    },
  });
