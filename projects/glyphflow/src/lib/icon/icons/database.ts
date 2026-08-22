// Familia `database` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveYSeq, track, strokeDraw, icon } from '../choreography';
import { databaseShapes } from '../animated-icons.shapes';

export const databaseCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'm16 19 2 2 4-4' },
    { tag: 'path', d: 'M21 13.127V5' },
    { tag: 'path', d: 'M3 12A9 3 0 0 0 21 12' },
    { tag: 'path', d: 'M3 5V19A9 3 0 0 0 13.318 21.968' },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
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
    },
  },
);

export const databaseMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M21 15V5' },
    { tag: 'path', d: 'M22 19h-6' },
    { tag: 'path', d: 'M3 12A9 3 0 0 0 21 12' },
    { tag: 'path', d: 'M3 5V19A9 3 0 0 0 13.318 21.968' },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
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
    },
  },
);

/** Base de datos: los discos se asientan de arriba hacia abajo. */
export const databaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(databaseShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { delay: 90, easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { delay: 180, easing: SPRING_OUT }),
      },
    },
  });
