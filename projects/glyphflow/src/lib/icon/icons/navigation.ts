// Familia `navigation` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';
import { navigationShapes } from '../animated-icons.shapes';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const navigation2OffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9.31 9.31 5 21l7-4 7 4-1.17-3.17" },
    { tag: 'path', d: "M14.53 8.88 12 2l-1.17 3.17" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const navigationOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43" },
    { tag: 'path', d: "M17.39 11.73 22 2l-9.73 4.61" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** Navegación: se lanza hacia adelante. */
export const navigationIcon: AnimatedIconDef = /* @__PURE__ */ icon(navigationShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(2px, -2px)' },
          { transform: 'translate(0, 0)' },
        ],
        550,
        { easing: SPRING_OUT },
      ),
    },
  });
