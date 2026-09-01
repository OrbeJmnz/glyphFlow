// Familia `git` del catálogo curado (17 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { gitForkShapes } from '../animated-icons.shapes';

/* ── Variante `reveal` ──────────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE): el icono se ensambla — los nodos
 * entran de golpe, los trazos se dibujan y cada pieza lleva su propio retraso.
 *
 * Los tres easings vienen con nombre del original; se copian tal cual porque redondearlos a
 * los de CSS cambia el rebote (`overshoot` pasa de 1 a propósito, es un sobrepaso).
 *
 * Los `git-commit-*` animan en el original los ATRIBUTOS `x1`/`x2`/`y1`/`y2` de la línea.
 * Como propiedades CSS eso tiene soporte irregular, así que aquí la línea crece con un
 * `scaleX`/`scaleY` anclado por `origin` al extremo que toca el nodo: mismo movimiento,
 * sin depender de que el navegador anime geometría SVG.
 */
const REVEAL_EASE = 'cubic-bezier(0.25, 1, 0.5, 1)';
const REVEAL_OVERSHOOT = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const REVEAL_DECEL = 'cubic-bezier(0.16, 1, 0.3, 1)';


export const gitBranchMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 6a9 9 0 0 0-9 9V3" },
    { tag: 'path', d: "M21 18h-6" },
    { tag: 'circle', cx: 18, cy: 6, r: 3 },
    { tag: 'circle', cx: 6, cy: 18, r: 3 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 560 }),
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(-15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 820, fill: 'both', origin: '21px 18px' },
        ),
      },
    },
  },
);

export const gitPullRequestArrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 5, cy: 6, r: 3 },
    { tag: 'path', d: "M5 9v12" },
    { tag: 'circle', cx: 19, cy: 18, r: 3 },
    { tag: 'path', d: "m15 9-3-3 3-3" },
    { tag: 'path', d: "M12 6h5a2 2 0 0 1 2 2v7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 480 }),
        3: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(-15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 740, fill: 'both', origin: '19px 15px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(-15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 740, fill: 'both', origin: '19px 15px' },
        ),
      },
    },
  },
);

export const gitPullRequestCreateArrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 5, cy: 6, r: 3 },
    { tag: 'path', d: "M5 9v12" },
    { tag: 'path', d: "m15 9-3-3 3-3" },
    { tag: 'path', d: "M12 6h5a2 2 0 0 1 2 2v3" },
    { tag: 'path', d: "M19 15v6" },
    { tag: 'path', d: "M22 18h-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 260 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { easing: 'ease-out', delay: 480 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { easing: 'ease-out', delay: 480 }),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(-15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 680, fill: 'both', origin: '19px 11px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(-15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 680, fill: 'both', origin: '19px 11px' },
        ),
      },
    },
  },
);

export const gitPullRequestDraftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'path', d: "M18 6V5" },
    { tag: 'path', d: "M18 11v-1" },
    { tag: 'line', x1: 6, x2: 6, y1: 9, y2: 21 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
      },
    },
  },
);

/** Fork: del nodo de abajo brotan las dos ramas. */
export const gitForkIcon: AnimatedIconDef = /* @__PURE__ */ icon(gitForkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 400, { origin: '12px 18px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 200 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 280 }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.7)', opacity: '0' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 300, { easing: REVEAL_EASE, origin: '12px 18px' }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 450, { easing: REVEAL_EASE, delay: 150, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 400, { easing: REVEAL_EASE, delay: 400, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scale(0.7)', opacity: '0' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 250, { easing: REVEAL_EASE, delay: 650, fill: 'backwards', origin: '6px 6px' }),
        2: /* @__PURE__ */ track([{ transform: 'scale(0.7)', opacity: '0' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 250, { easing: REVEAL_EASE, delay: 650, fill: 'backwards', origin: '18px 6px' }),
      },
    },
  });

export const gitBranchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'path', d: "M15 6a9 9 0 0 0-9 9V3" },
    { tag: 'circle', cx: 18, cy: 6, r: 3 },
    { tag: 'circle', cx: 6, cy: 18, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { easing: 'ease-out', delay: 130 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 290 }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `git-merge`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const gitBranchPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'path', d: "M6 3v12" },
    { tag: 'path', d: "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
    { tag: 'path', d: "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
    { tag: 'path', d: "M15 6a9 9 0 0 0-9 9" },
    { tag: 'path', d: "M18 15v6" },
    { tag: 'path', d: "M21 18h-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 240 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 350 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 110 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 460 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 460 }),
      },
    },
  },
);

export const gitCommitHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'line', x1: 3, x2: 9, y1: 12, y2: 12 },
    { tag: 'line', x1: 15, x2: 21, y1: 12, y2: 12 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 130 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 130 }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 1000, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.2)', opacity: '0' }, { transform: 'scale(1.24)', opacity: '1' }, { transform: 'scale(0.92)', opacity: '1' }], 520, { easing: REVEAL_OVERSHOOT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleX(0)', opacity: '0' }, { transform: 'scaleX(1)', opacity: '1' }], 420, { easing: REVEAL_DECEL, delay: 420, fill: 'backwards', origin: '9px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0)', opacity: '0' }, { transform: 'scaleX(1)', opacity: '1' }], 420, { easing: REVEAL_DECEL, delay: 420, fill: 'backwards', origin: '15px 12px' }),
      },
    },
  },
);

export const gitCommitVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'path', d: "M12 3v6" },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'path', d: "M12 15v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 130 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 130 }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 1000, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.2)', opacity: '0' }, { transform: 'scale(1.24)', opacity: '1' }, { transform: 'scale(0.92)', opacity: '1' }], 520, { easing: REVEAL_OVERSHOOT, origin: '12px 12px' }),
        0: /* @__PURE__ */ track([{ transform: 'scaleY(0)', opacity: '0' }, { transform: 'scaleY(1)', opacity: '1' }], 420, { easing: REVEAL_DECEL, delay: 420, fill: 'backwards', origin: '12px 9px' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(0)', opacity: '0' }, { transform: 'scaleY(1)', opacity: '1' }], 420, { easing: REVEAL_DECEL, delay: 420, fill: 'backwards', origin: '12px 15px' }),
      },
    },
  },
);

export const gitCompareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'path', d: "M13 6h3a2 2 0 0 1 2 2v7" },
    { tag: 'path', d: "M11 18H8a2 2 0 0 1-2-2V9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 300 }),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.7)', opacity: '0' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 300, { easing: REVEAL_EASE, origin: '6px 6px' }),
        0: /* @__PURE__ */ track([{ transform: 'scale(0.7)', opacity: '0' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 300, { easing: REVEAL_EASE, delay: 150, fill: 'backwards', origin: '18px 18px' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 500, { easing: REVEAL_EASE, delay: 300, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 500, { easing: REVEAL_EASE, delay: 300, fill: 'backwards' }),
      },
    },
  },
);

export const gitCompareArrowsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 5, cy: 6, r: 3 },
    { tag: 'path', d: "M12 6h5a2 2 0 0 1 2 2v7" },
    { tag: 'path', d: "m15 9-3-3 3-3" },
    { tag: 'circle', cx: 19, cy: 18, r: 3 },
    { tag: 'path', d: "M12 18H7a2 2 0 0 1-2-2V9" },
    { tag: 'path', d: "m9 15 3 3-3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(-15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 150, fill: 'both', origin: '19px 8px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(-15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 150, fill: 'both', origin: '19px 8px' },
        ),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        4: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 150, fill: 'both', origin: '5px 15px' },
        ),
        5: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(15deg)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'rotate(0deg)', offset: 1 },
          ],
          650,
          { easing: 'ease-out', delay: 150, fill: 'both', origin: '5px 15px' },
        ),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.7)', opacity: '0' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 300, { easing: REVEAL_EASE, origin: '5px 6px' }),
        3: /* @__PURE__ */ track([{ transform: 'scale(0.7)', opacity: '0' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 300, { easing: REVEAL_EASE, delay: 300, fill: 'backwards', origin: '19px 18px' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 500, { easing: REVEAL_EASE, delay: 150, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 500, { easing: REVEAL_EASE, delay: 450, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(-4px)', opacity: '0' }, { transform: 'translateX(0px)', opacity: '1' }], 350, { easing: REVEAL_EASE, delay: 300, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translateX(4px)', opacity: '0' }, { transform: 'translateX(0px)', opacity: '1' }], 350, { easing: REVEAL_EASE, delay: 600, fill: 'backwards' }),
      },
    },
  },
);

export const gitGraphIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 5, cy: 6, r: 3 },
    { tag: 'path', d: "M5 9v6" },
    { tag: 'circle', cx: 5, cy: 18, r: 3 },
    { tag: 'path', d: "M12 3v18" },
    { tag: 'circle', cx: 19, cy: 6, r: 3 },
    { tag: 'path', d: "M16 15.7A9 9 0 0 0 19 9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { easing: 'ease-out', delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { easing: 'ease-out', delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 270 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { easing: 'ease-out', delay: 380 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 460 }),
      },
    },
  },
);

export const gitMergeConflictIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'path', d: "M12 6h4a2 2 0 0 1 2 2v7" },
    { tag: 'path', d: "M6 12v9" },
    { tag: 'path', d: "M9 3 3 9" },
    { tag: 'path', d: "M9 9 3 3" },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateX(0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.55 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(2px)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.85 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 1 },
          ],
          600,
          { delay: 280, fill: 'both' },
        ),
        3: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateX(0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.55 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(2px)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.85 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 1 },
          ],
          600,
          { delay: 280, fill: 'both' },
        ),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { easing: 'ease-out', delay: 200 }),
      },
    },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0' }, { strokeDasharray: '1 1', opacity: '1' }], 300, { easing: REVEAL_EASE }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0' }, { strokeDasharray: '1 1', opacity: '1' }], 300, { easing: REVEAL_EASE, delay: 100, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 400, { easing: REVEAL_EASE, delay: 250, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ strokeDasharray: '0 1', opacity: '0.3' }, { strokeDasharray: '1 1', opacity: '1' }], 450, { easing: REVEAL_EASE, delay: 450, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scale(0.6)', opacity: '0' }, { transform: 'scale(1.15)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 350, { easing: REVEAL_EASE, delay: 750, fill: 'backwards', origin: '18px 18px' }),
      },
    },
  },
);

export const gitMergeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'path', d: "M6 21V9a9 9 0 0 0 9 9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'scale(1)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'scale(1)', offset: 0.5 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'scale(1.15)', offset: 0.75 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'scale(1)', offset: 1 },
          ],
          600,
          { easing: 'ease-out', delay: 220, fill: 'both', origin: '18px 18px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 100 }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `git-branch`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const gitPullRequestIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'path', d: "M13 6h3a2 2 0 0 1 2 2v7" },
    { tag: 'line', x1: 6, x2: 6, y1: 9, y2: 21 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 180 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { easing: 'ease-out', delay: 280 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { easing: 'ease-out', delay: 100 }),
      },
    },
  },
);

export const gitPullRequestClosedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'path', d: "M6 9v12" },
    { tag: 'path', d: "m21 3-6 6" },
    { tag: 'path', d: "m21 9-6-6" },
    { tag: 'path', d: "M18 11.5V15" },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateX(0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.55 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(2px)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.85 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 1 },
          ],
          600,
          { delay: 370, fill: 'both' },
        ),
        3: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateX(0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 0.4 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.55 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(2px)', offset: 0.7 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(-2px)', offset: 0.85 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, transform: 'translateX(0)', offset: 1 },
          ],
          600,
          { delay: 370, fill: 'both' },
        ),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 100, { easing: 'ease-out', delay: 300 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 200 }),
      },
    },
  },
);

export const gitPullRequestCreateIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  
  [
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'path', d: "M6 9v12" },
    { tag: 'path', d: "M13 6h3a2 2 0 0 1 2 2v3" },
    { tag: 'path', d: "M18 15v6" },
    { tag: 'path', d: "M21 18h-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 300 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { easing: 'ease-out', delay: 300 }),
      },
    },
  },
);
