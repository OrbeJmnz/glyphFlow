// Familia `search` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { searchCheckShapes, searchShapes, searchSlashShapes, searchXShapes } from '../animated-icons.shapes';

/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** Parpadea. Para puntos suspensivos y avisos: dice "esto sigue pasando". */
const E1_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/**
 * Se desplaza y vuelve, con anticipación. La anticipación no es adorno: casi todo lo que se mueve
 * hacia un borde en este catálogo tiene 1 de margen, y un recorrido de 1 se ve como un temblor.
 * Retrocediendo antes, el recorrido visible se dobla sin salirse del lienzo.
 */
const E1_PUSH_RIGHT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1px)', offset: 0.28 },
  { transform: 'translateX(1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

const E1_PUSH_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.28 },
  { transform: 'translateX(-1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

/** Sale hacia la esquina de arriba a la derecha. */
const E1_OUT_CORNER = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0.8px, -0.8px)' },
  { transform: 'translate(0, 0)' },
];

/** Sacudida desde el mango; `find` la pasea como si buscara (ambas portadas). */
export const searchIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 17, -10, 5, -1, 0]), 800, { origin: 'bottom right' }),
    },
    find: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
      ),
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.8px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.8px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.8px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.8px)', opacity: '0', offset: 1 }], 1000, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
    },
  });

/** Encontrado: primero la lupa, luego la palomita. El orden cuenta la historia. */
export const searchCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 700, {
        delay: 380,
        origin: 'bottom right',
      }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 380 }),
      },
    },
    /** Traza + el mismo "busca alrededor" que hace `search:find`. */
    assemble: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
        { delay: 760 },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 380 }),
      },
    },
  });

/** Búsqueda desactivada: la diagonal cae al final. */
export const searchSlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchSlashShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 700, {
        delay: 380,
        origin: 'bottom right',
      }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
    /** Traza + el mismo "busca alrededor" que hace `search:find`. */
    assemble: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
        { delay: 700 },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
  });

/** Sin resultados: la lupa se dibuja, la equis se tacha y el conjunto se sacude. */
export const searchXIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchXShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 700, { delay: 380, origin: 'bottom right' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 380 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 480 }),
      },
    },
    /** Traza + el mismo "busca alrededor" que hace `search:find` (en vez del shake de default). */
    assemble: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
        { delay: 740 },
      ),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 380 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 480 }),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** El asta busca y el aviso parpadea dentro de la lente. */
export const searchAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: "m21 21-4.3-4.3" },
    { tag: 'path', d: "M11 7v4" },
    { tag: 'path', d: "M11 15h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E1_OUT_CORNER, 620, { easing: EASE }),
        2: /* @__PURE__ */ track(E1_BLINK, 700, { easing: EASE, delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_BLINK, 700, { easing: EASE, delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** Los chevrons se apartan dentro de la lente mientras el asta busca. */
export const searchCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m13 13.5 2-2.5-2-2.5" },
    { tag: 'path', d: "m21 21-4.3-4.3" },
    { tag: 'path', d: "M9 8.5 7 11l2 2.5" },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_RIGHT, 600, { easing: EASE, delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_OUT_CORNER, 620, { easing: EASE }),
        2: /* @__PURE__ */ track(E1_PUSH_LEFT, 600, { easing: EASE, delay: 160, fill: 'backwards' }),
      },
    },
  },
);
