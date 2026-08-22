// Familia `pen` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { penLineShapes, penShapes } from '../animated-icons.shapes';

export const penOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" },
    { tag: 'path', d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const penIcon: AnimatedIconDef = /* @__PURE__ */ icon(penShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(1.5px, -1.5px)' },
          { transform: 'translate(-1px, 1px)' },
          { transform: 'translate(0, 0)' },
        ],
        700,
      ),
    },
    /** Escribiendo: gira desde la punta, fija, simulando el trazo de la mano. */
    write: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 6, -8, 5, -6, 3, 0]), 950, {
        origin: '2.3px 21.5px',
      }),
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(-15deg)', offset: 0.25 }, { transform: 'rotate(15deg)', offset: 0.75 }], 400, { easing: EASE }),
    },
  });

/** La pluma escribe y el renglón aparece detrás de ella. */
export const penLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(penLineShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(0, 0)' },
          ],
          600,
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 200 }),
      },
    },
    /** Escribiendo: la pluma (1) gira desde su punta; el renglón (0) se dibuja al parejo. */
    write: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 6, -8, 5, -6, 3, 0]), 950, {
          origin: '2.3px 21.5px',
        }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 700, { delay: 150 }),
      },
    },
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });
