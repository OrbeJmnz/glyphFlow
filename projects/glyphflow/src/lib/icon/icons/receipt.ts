// Familia `receipt` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveYSeq, track, strokeDraw, icon } from '../choreography';
import { receiptShapes } from '../animated-icons.shapes';

export const receiptJapaneseYenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'm12 10 3-3' },
    {
      tag: 'path',
      d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
    },
    { tag: 'path', d: 'M9 11h6' },
    { tag: 'path', d: 'M9 15h6' },
    { tag: 'path', d: 'm9 7 3 3v7' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
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

export const receiptPoundSterlingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M10 17V9.5a1 1 0 0 1 5 0' },
    {
      tag: 'path',
      d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
    },
    { tag: 'path', d: 'M8 13h5' },
    { tag: 'path', d: 'M8 17h7' },
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

export const receiptTurkishLiraIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M10 7v10a5 5 0 0 0 5-5' },
    { tag: 'path', d: 'm14 8-6 3' },
    {
      tag: 'path',
      d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
    },
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

/** Ticket que sale de la impresora. */
export const receiptIcon: AnimatedIconDef = /* @__PURE__ */ icon(receiptShapes, {
  default: {
    root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }),
    shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 180 }) },
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
