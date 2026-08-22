// Familia `link` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, moveXSeq, track, icon } from '../choreography';
import { link2Shapes, linkShapes } from '../animated-icons.shapes';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const link2OffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 17H7A5 5 0 0 1 7 7" },
    { tag: 'path', d: "M15 7h2a5 5 0 0 1 4 8" },
    { tag: 'line', x1: 8, x2: 12, y1: 12, y2: 12 },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** Los dos eslabones se juntan. */
export const linkIcon: AnimatedIconDef = /* @__PURE__ */ icon(linkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.2, 0]), 500),
      },
    },
  });

export const link2Icon: AnimatedIconDef = /* @__PURE__ */ icon(link2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.2, 0]), 500),
      },
    },
  });
