// Familia `file` del catálogo curado (55 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, moveYSeq, track, burst, strokeDraw, icon } from '../choreography';
import { fileBadgeShapes, fileCheckCornerShapes, fileCheckShapes, fileExclamationPointShapes, fileShapes, fileSpreadsheetShapes, fileTextShapes, fileXShapes } from '../animated-icons.shapes';

/**
 * El tirón de gelatina del papel. Estaba escrito a mano en las 37 primeras; aquí se nombra
 * porque las 18 nuevas lo comparten y treinta y tres copias más no aportaban nada.
 */
const FILE_JELLY = /* @__PURE__ */ [
  { transform: 'scale(1, 1)' },
  { transform: 'scale(0.9, 1.3)' },
  { transform: 'scale(1.1, 0.9)' },
  { transform: 'scale(0.95, 1.05)' },
  { transform: 'scale(1, 1)' },
];

/** El contenido del archivo crece un punto y se queda ahí mientras dure el hover. */
const FILE_INNER_HOLD = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }];

export const fileAxis3dIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm8 18 4-4' },
    { tag: 'path', d: 'M8 10v8h8' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 14px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 14px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileBracesCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1' },
    { tag: 'path', d: 'M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileBracesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1' },
    { tag: 'path', d: 'M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileCodeCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm5 16-3 3 3 3' },
    { tag: 'path', d: 'm9 22 3-3-3-3' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 19px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M10 12.5 8 15l2 2.5' },
    { tag: 'path', d: 'm14 12.5 2 2.5-2 2.5' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z',
    },
    { tag: 'path', d: 'M20 8v12a2 2 0 0 1-2 2h-4.182' },
    { tag: 'path', d: 'm3.305 19.53.923-.382' },
    { tag: 'path', d: 'M4 10.592V4a2 2 0 0 1 2-2h8' },
    { tag: 'path', d: 'm4.228 16.852-.924-.383' },
    { tag: 'path', d: 'm5.852 15.228-.383-.923' },
    { tag: 'path', d: 'm5.852 20.772-.383.924' },
    { tag: 'path', d: 'm8.148 15.228.383-.923' },
    { tag: 'path', d: 'm8.53 21.696-.382-.924' },
    { tag: 'path', d: 'm9.773 16.852.922-.383' },
    { tag: 'path', d: 'm9.773 19.148.922.383' },
    { tag: 'circle', cx: 7, cy: 18, r: 3 },
  ],
  {
    default: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 450,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        5: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        6: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        7: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        8: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        9: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        10: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        11: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileImageIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'circle', cx: 10, cy: 12, r: 2 },
    { tag: 'path', d: 'm20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          380,
          { easing: SPRING_OUT },
        ),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '14px 16px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '14px 16px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileInputIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M2 15h10' },
    { tag: 'path', d: 'm9 18 3-3-3-3' },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileMinusCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M14 18h6' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const filePlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    {
      tag: 'path',
      d: 'M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z',
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12.5px 14px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const filePlusCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M14 19h6' },
    { tag: 'path', d: 'M17 16v6' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17px 19px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileSearchCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm21 22-2.88-2.88' },
    { tag: 'circle', cx: 16, cy: 17, r: 3 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17px 18px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'circle', cx: 11.5, cy: 14.5, r: 2.5 },
    { tag: 'path', d: 'M13.3 16.3 15 18' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          380,
          { easing: SPRING_OUT },
        ),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileSignalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M8 15h.01' },
    { tag: 'path', d: 'M11.5 13.5a2.5 2.5 0 0 1 0 3' },
    { tag: 'path', d: 'M15 12a5 5 0 0 1 0 6' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '11.5px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '11.5px 15px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '11.5px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileTypeCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16' },
    { tag: 'path', d: 'M6 22h2' },
    { tag: 'path', d: 'M7 14v8' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileTypeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M11 18h2' },
    { tag: 'path', d: 'M12 12v6' },
    { tag: 'path', d: 'M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M16 22a4 4 0 0 0-8 0' },
    { tag: 'circle', cx: 12, cy: 15, r: 3 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          380,
          { easing: SPRING_OUT, delay: 120, fill: 'backwards' },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 17px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 17px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileXCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm15 17 5 5' },
    { tag: 'path', d: 'm20 17-5 5' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17.5px 19.5px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17.5px 19.5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileChartColumnIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M8 18v-2' },
    { tag: 'path', d: 'M12 18v-4' },
    { tag: 'path', d: 'M16 18v-6' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease' },
        ),
        3: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease', delay: 100 },
        ),
        4: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease', delay: 200 },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileChartColumnIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M8 18v-1' },
    { tag: 'path', d: 'M12 18v-6' },
    { tag: 'path', d: 'M16 18v-3' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease' },
        ),
        3: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease', delay: 100 },
        ),
        4: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease', delay: 200 },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileChartLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm16 13-3.5 3.5-2-2L8 17' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
          ],
          700,
          { easing: 'ease-in-out' },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M12 18v-6' },
    { tag: 'path', d: 'm9 15 3 3 3-3' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M9 15h6' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 },
            { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 },
            { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 },
          ],
          500,
          { easing: 'ease-out' },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const filePenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    {
      tag: 'path',
      d: 'M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z',
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 },
            { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 },
            { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 },
            { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 },
          ],
          500,
          { easing: EASE },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8.7px 17.3px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const filePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M9 15h6' },
    { tag: 'path', d: 'M12 18v-6' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 },
            { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 },
            { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 },
          ],
          300,
          { easing: 'ease-out' },
        ),
        3: /* @__PURE__ */ track(
          [
            { opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 },
            { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 },
            { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 },
          ],
          300,
          { easing: 'ease-out', delay: 250 },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M12 17h.01' },
    { tag: 'path', d: 'M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg)', offset: 0 },
            { transform: 'rotate(-10deg)', offset: 0.2 },
            { transform: 'rotate(10deg)', offset: 0.4 },
            { transform: 'rotate(-10deg)', offset: 0.6 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          500,
          { easing: EASE, origin: 'center' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg)', offset: 0 },
            { transform: 'rotate(-10deg)', offset: 0.2 },
            { transform: 'rotate(10deg)', offset: 0.4 },
            { transform: 'rotate(-10deg)', offset: 0.6 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          500,
          { easing: EASE, origin: 'center' },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        1: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 13px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 13px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const fileSlidersIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M8 12h8' },
    { tag: 'path', d: 'M10 11v2' },
    { tag: 'path', d: 'M8 17h8' },
    { tag: 'path', d: 'M14 16v2' },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(
          [{ transform: 'translateX(0px)' }, { transform: 'translateX(4px)' }],
          400,
          { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' },
        ),
        5: /* @__PURE__ */ track(
          [{ transform: 'translateX(0px)' }, { transform: 'translateX(-4px)' }],
          400,
          { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 14.5px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 14.5px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 14.5px', fill: 'forwards' }),
        5: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 14.5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileTerminalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm8 16 2-2-2-2' },
    { tag: 'path', d: 'M12 18h4' },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, {
          easing: 'linear',
        }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M12 12v6' },
    { tag: 'path', d: 'm15 15-3-3-3 3' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }],
          300,
          { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// ── 2ª tanda: lo que más se usa en la app ──────────────────────────────────
/** Documento: las líneas de texto se escriben una tras otra. */
export const fileTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileTextShapes, {
  default: {
    shapes: {
      2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
      3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 90 }),
      4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 180 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 13px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 13px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 13px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
});

/** Archivo validado. */
export const fileCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileCheckShapes, {
  default: {
    shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 180 }) },
  },
  reveal: {
    shapes: {
      2: /* @__PURE__ */ track(
        [
          { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 },
          { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 },
          { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 },
        ],
        500,
        { easing: 'ease-out' },
      ),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
});

/** Archivo rechazado: la equis se tacha en dos tiempos. */
export const fileXIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileXShapes, {
  default: {
    shapes: {
      2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 180 }),
      3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
});

export const fileIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileShapes, {
  default: {
    root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 480, { easing: SPRING_OUT }),
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});

export const fileCheckCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileCheckCornerShapes, {
  default: {
    shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 180 }) },
  },
  reveal: {
    shapes: {
      2: /* @__PURE__ */ track(
        [
          { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 },
          { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 },
          { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 },
        ],
        500,
        { easing: 'ease-out' },
      ),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '17px 20px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
});

/** Hoja de cálculo: las celdas se llenan en cascada. */
export const fileSpreadsheetIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileSpreadsheetShapes, {
  default: {
    shapes: {
      3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 60 }),
      4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 140 }),
      5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 220 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
        5: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
});

export const fileBadgeIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileBadgeShapes, {
  default: { shapes: { 3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 150 }) } },
  /** Los renglones se hunden distinto y el sello se aprieta después: el papel cede, el sello sella. */
  chida: {
    shapes: {
      1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.95, 0]), 500),
      2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.45, 0]), 500),
      3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { delay: 150 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '6px 16.5px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '6px 16.5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
});

export const fileExclamationPointIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  fileExclamationPointShapes,
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 3, 0]), 550),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }) },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 },
          { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 },
          { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
      shapes: {
        1: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 13px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 13px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las tres muescas asoman de arriba abajo y el ojal aparece al final. */
export const fileArchiveIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M8 12v-1" },
    { tag: 'path', d: "M8 18v-2" },
    { tag: 'path', d: "M8 7V6" },
    { tag: 'circle', cx: 8, cy: 20, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 14px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 14px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 14px', fill: 'forwards' }),
        5: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 14px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La caja se arma: primero la tapa, después el cuerpo y el canto. */
export const fileBoxIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 2v5a1 1 0 001 1h5" },
    {
      tag: 'path',
      d: "M14.692 22H18a2 2 0 002-2V8a2.4 2.4 0 00-.706-1.706l-3.588-3.588A2.4 2.4 0 0014 2H6a2 2 0 00-2 2v3.804",
    },
    { tag: 'path', d: "M2.264 13.752 7 16.5l4.737-2.748" },
    {
      tag: 'path',
      d: "M2.995 13.014A2 2 0 002 14.744v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0012 18.26v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z",
    },
    { tag: 'path', d: "M7 16.5V22" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 240, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: 'NaNpx NaNpx', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: 'NaNpx NaNpx', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: 'NaNpx NaNpx', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El aro se traza y la porción entra después: es lo que la gráfica dice. */
export const fileChartPieIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M4.017 11.512a6 6 0 1 0 8.466 8.475" },
    {
      tag: 'path',
      d: "M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '9px 15px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '9px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La carátula se traza y las manecillas se ponen en hora. */
export const fileClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M8 14v2.2l1.6 1" },
    { tag: 'circle', cx: 8, cy: 16, r: 6 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 16px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 16px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Primero el más y después el menos, en el orden en que se lee un diff. */
export const fileDiffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
    },
    { tag: 'path', d: "M9 10h6" },
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M9 17h6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 240, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 12px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 12px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '12px 12px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El uno se escribe y la casilla aparece a su lado. */
export const fileDigitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M10 16h2v6" },
    { tag: 'path', d: "M10 22h4" },
    { tag: 'rect', x: 2, y: 16, width: 4, height: 6, rx: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: 'ease-out', delay: 220, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 19px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 19px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La diadema se traza de una: es una sola pieza. */
export const fileHeadphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    {
      tag: 'path',
      d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El corazón se dibuja de un trazo. */
export const fileHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    {
      tag: 'path',
      d: "M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18.7px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El vástago, el diente y la anilla: en ese orden se arma una llave. */
export const fileKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M4 12v6" },
    { tag: 'path', d: "M4 14h2" },
    {
      tag: 'path',
      d: "M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4",
    },
    { tag: 'circle', cx: 4, cy: 20, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: 'ease-out', delay: 240, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '4px 17px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '4px 17px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '4px 17px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cuerpo del candado aparece y el arco lo cierra encima. */
export const fileLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M9 17v-2a2 2 0 0 0-4 0v2" },
    { tag: 'rect', x: 3, y: 17, width: 8, height: 5, rx: 1 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18.5px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 18.5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El asta se traza y la cabeza de la nota aparece de golpe. */
export const fileMusicIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M8 20v-7l3 1.474" },
    { tag: 'circle', cx: 6, cy: 20, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7.5px 17.5px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7.5px 17.5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El asta sale del papel y la punta la remata — nunca al revés, o se parte. */
export const fileOutputIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "m5 11-3 3" },
    { tag: 'path', d: "m5 17-3-3h10" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 14px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7px 14px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El renglón se escribe y la pluma llega a firmarlo. */
export const filePenLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z",
    },
    { tag: 'path', d: "M14.487 7.858A1 1 0 0 1 14 7V2" },
    {
      tag: 'path',
      d: "M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516",
    },
    { tag: 'path', d: "M8 18h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '14.7px 13.8px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '14.7px 13.8px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las cuatro esquinas del marco se cierran en sentido del reloj. */
export const fileScanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M16 14a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M16 22a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M20 14a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M20 22a2 2 0 0 0 2-2" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 270, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 90, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '18px 18px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '18px 18px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '18px 18px', fill: 'forwards' }),
        5: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '18px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las tres hojas se apilan de atrás hacia adelante. */
export const fileStackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1" },
    { tag: 'path', d: "M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1" },
    {
      tag: 'path',
      d: "M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 130, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '9.5px 14.5px', fill: 'forwards' }),
        1: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '9.5px 14.5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El atajo apunta afuera, en un solo trazo. */
export const fileSymlinkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "m10 18 3-3-3-3" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '11.5px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cuerpo de la cámara aparece y el objetivo se traza al lado. */
export const fileVideoCameraIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    {
      tag: 'path',
      d: "m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157",
    },
    { tag: 'rect', x: 3, y: 16, width: 7, height: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8.5px 19px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '8.5px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La bocina aparece y la onda sale de ella. */
export const fileVolumeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M12 15a5 5 0 0 1 0 6" },
    {
      tag: 'path',
      d: "M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 220, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: 'ease-out' }),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(FILE_JELLY, 600, { easing: 'ease-out', origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7.5px 18px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(FILE_INNER_HOLD, 320, { easing: SPRING_OUT, delay: 560, origin: '7.5px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
