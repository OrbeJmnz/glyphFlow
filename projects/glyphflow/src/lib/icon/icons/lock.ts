// Familia `lock` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, moveYSeq, track, icon } from '../choreography';
import { lockOpenShapes, lockShapes } from '../animated-icons.shapes';

/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** Aparece de golpe con un rebote corto. Para lo macizo, que un trazo no le luce. */
const E1_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

const E1_PUSH_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1px)', offset: 0.28 },
  { transform: 'translateY(-1.5px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

export const lockKeyholeOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 16, r: 1 },
    { tag: 'rect', width: 18, height: 12, x: 3, y: 10, rx: 2 },
    { tag: 'path', d: 'M7 10V7a5 5 0 0 1 9.33-2.5' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 500, { delay: 120 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 500),
      },
    },
  },
);

/**
 * Cerrar: el gesto inverso de `lock`. El cuerpo da EXACTAMENTE el mismo tirón (mismos 500 ms, mismo
 * retraso de 120) para que al alternar el par no se sienta que cambió el icono, sino el estado.
 *
 * El arco no sube: gira sobre su bisagra —el punto donde toca el cuerpo, 7,11— porque en este icono
 * ya está abierto e inclinado. Levantarlo diría "se abre más"; bajarlo dice "se va a cerrar".
 */
export const lockOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(lockOpenShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 500, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 10, 0]), 500, { origin: '7px 11px' }),
      },
    },
  });

/** Abrir: el arco se levanta y el cuerpo da un tirón. */
export const lockIcon: AnimatedIconDef = /* @__PURE__ */ icon(lockShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 500, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 500),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** El arco se levanta y encaja, y el ojo de la cerradura responde. */
export const lockKeyholeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 16, r: 1 },
    { tag: 'rect', x: 3, y: 10, width: 18, height: 12, rx: 2 },
    { tag: 'path', d: "M7 10V7a5 5 0 0 1 10 0v3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_POP, 360, { easing: EASE, origin: '12px 16px', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_PUSH_UP, 600, { easing: EASE }),
      },
    },
  },
);
