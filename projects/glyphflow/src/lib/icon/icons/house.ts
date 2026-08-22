// Familia `house` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveYSeq, track, strokeDraw, icon } from '../choreography';
import { houseShapes } from '../animated-icons.shapes';

export const houseHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" },
    { tag: 'path', d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const houseWifiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9.5 13.866a4 4 0 0 1 5 .01" },
    { tag: 'path', d: "M12 17h.01" },
    { tag: 'path', d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { tag: 'path', d: "M7 10.754a8 8 0 0 1 10 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
      },
    },
  },
);

export const houseIcon: AnimatedIconDef = /* @__PURE__ */ icon(houseShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }) },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease-out' }),
      },
    },
  });
