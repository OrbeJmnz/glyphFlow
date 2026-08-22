// Familia `git` del catálogo curado (17 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { gitForkShapes } from '../animated-icons.shapes';

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
