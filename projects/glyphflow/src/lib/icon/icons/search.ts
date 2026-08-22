// Familia `search` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { searchCheckShapes, searchShapes, searchSlashShapes, searchXShapes } from '../animated-icons.shapes';

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
    reveal: {
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
    reveal: {
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
    reveal: {
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
