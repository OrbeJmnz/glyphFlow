// Familia `message` del catálogo curado (12 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, strokeDraw, icon } from '../choreography';

export const messageCircleCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const messageCircleHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    {
      tag: 'path',
      d: 'M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z',
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const messageSquareCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: 'm9 11 2 2 4-4' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const messageSquareHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    {
      tag: 'path',
      d: 'M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5',
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleMoreIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: 'M8 12h.01' },
    { tag: 'path', d: 'M12 12h.01' },
    { tag: 'path', d: 'M16 12h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ],
          1500,
        ),
        2: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ],
          1500,
          { delay: 100 },
        ),
        3: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ],
          1500,
          { delay: 200 },
        ),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989" },
    { tag: 'path', d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' },
    { tag: 'path', d: 'M12 17h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
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
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
    { tag: 'path', d: "M12 8v4" },
    { tag: 'path', d: "M12 16h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 }, { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareMoreIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: 'M12 11h.01' },
    { tag: 'path', d: 'M16 11h.01' },
    { tag: 'path', d: 'M8 11h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ],
          1500,
        ),
        2: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ],
          1500,
          { delay: 100 },
        ),
        3: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ],
          1500,
          { delay: 200 },
        ),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.656 3H20a2 2 0 0 1 2 2v11.344" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 }, { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  },
);
