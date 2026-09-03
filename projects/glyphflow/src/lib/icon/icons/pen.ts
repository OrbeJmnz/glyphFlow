// Familia `pen` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { penLineShapes, penShapes } from '../animated-icons.shapes';

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Late una vez. */
const E2_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Aparece de golpe con un rebote corto. */
const E2_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

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
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 52 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 70 }),
      },
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
    dart: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-1.5px, 2.25px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-1.5px, 2.25px)', opacity: '0', offset: 1 }], 500, { easing: 'linear', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** La línea se traza y el nodo aparece en su extremo. */
export const penToolIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
    },
    {
      tag: 'path',
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
    },
    { tag: 'path', d: "m2.3 2.3 7.286 7.286" },
    { tag: 'circle', cx: 11, cy: 11, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: '14px 20px', delay: 280, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: '12px 12px', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(E2_POP, 340, { easing: EASE, origin: '11px 11px', delay: 400, fill: 'backwards' }),
      },
    },
  },
);
