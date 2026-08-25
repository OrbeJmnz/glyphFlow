// Familia `scan` del catálogo curado (9 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, strokeDraw, icon } from '../choreography';

/**
 * El marco a secas: las cuatro esquinas se dibujan en el sentido del reloj, con el mismo trazo y la
 * misma cadencia que la familia usa en sus líneas interiores.
 *
 * Escalonadas y no a la vez: cuatro esquinas apareciendo juntas son un bloque; una tras otra se lee
 * como un marco cerrándose alrededor de algo, que es lo que un escáner hace.
 */
/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** Aparece de golpe con un rebote corto. Para lo macizo, que un trazo no le luce. */
const E1_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

export const scanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 110,
          fill: 'backwards',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 220,
          fill: 'backwards',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 330,
          fill: 'backwards',
        }),
      },
    },
  },
);

export const scanBarcodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'path', d: 'M8 7v10' },
    { tag: 'path', d: 'M12 7v10' },
    { tag: 'path', d: 'M17 7v10' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanEyeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    {
      tag: 'path',
      d: 'M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0',
    },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          380,
          { easing: SPRING_OUT },
        ),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanFaceIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'path', d: 'M8 14s1.5 2 4 2 4-2 4-2' },
    { tag: 'path', d: 'M9 9h.01' },
    { tag: 'path', d: 'M15 9h.01' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    {
      tag: 'path',
      d: 'M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z',
    },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'path', d: 'M7 12h10' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanQrCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M17 12v4a1 1 0 0 1-1 1h-4' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M17 8V7' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M7 17h.01' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'rect', x: 7, y: 7, width: 5, height: 5, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
        7: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          380,
          { easing: SPRING_OUT, delay: 360, fill: 'backwards' },
        ),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        6: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'path', d: 'm16 16-1.9-1.9' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          380,
          { easing: SPRING_OUT },
        ),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'rect', width: 8, height: 8, x: 8, y: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          380,
          { easing: SPRING_OUT },
        ),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const scanTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M3 7V5a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'M17 3h2a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M21 17v2a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M7 21H5a2 2 0 0 1-2-2v-2' },
    { tag: 'path', d: 'M7 8h8' },
    { tag: 'path', d: 'M7 12h10' },
    { tag: 'path', d: 'M7 16h6' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease' },
        ),
        5: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 },
          ],
          600,
          { easing: 'ease', delay: 100 },
        ),
        6: /* @__PURE__ */ track(
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
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }],
          300,
          { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Las cuatro esquinas se cierran en sentido del reloj y la caja aparece dentro. */
export const scanBoxIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12v5.5" },
    { tag: 'path', d: "M17 3h2a2 2 0 012 2v2" },
    { tag: 'path', d: "M21 17v2a2 2 0 01-2 2h-2" },
    { tag: 'path', d: "M3 7V5a2 2 0 012-2h2" },
    { tag: 'path', d: "M7 21H5a2 2 0 01-2-2v-2" },
    { tag: 'path', d: "M7.264 9.252 12 12l4.737-2.748" },
    {
      tag: 'path',
      d: "M7.995 8.514A2 2 0 007 10.244v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0017 13.76v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_POP, 380, { easing: EASE, origin: '12px 14.8px', delay: 480, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E1_POP, 380, { easing: EASE, origin: '12px 10.6px', delay: 420, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E1_POP, 380, { easing: EASE, origin: '12px 12px', delay: 360, fill: 'backwards' }),
      },
    },
  },
);
