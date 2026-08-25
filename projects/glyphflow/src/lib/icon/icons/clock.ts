// Familia `clock` del catálogo curado (13 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, rotateSeq, track, burst, strokeDraw, icon } from '../choreography';
import { clockShapes } from '../animated-icons.shapes';

export const clock1Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l2-4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-4-2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock11Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-2-4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock12Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l4-2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6h4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock5Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l2 4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock6Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v10' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock7Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-2 4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock8Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-4 2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock9Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6H8' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

/** La flecha entra desde la izquierda y se asienta. Asta y punta comparten el track: si una se
 *  moviera sin la otra, la punta se despegaría — la trampa clásica de esta familia. */
const CLOCK_ARROW_ADVANCE = /* @__PURE__ */ [{ transform: 'translateX(-3px)' }, { transform: 'translateX(0px)' }];

export const clockArrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M12 6v6l2 1' },
    { tag: 'path', d: 'M13.5 21.885A10 10 0 1 1 22 12' },
    { tag: 'path', d: 'M14 18h8' },
    { tag: 'path', d: 'm18 22 4-4-4-4' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
        2: /* @__PURE__ */ track(CLOCK_ARROW_ADVANCE, 420, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(CLOCK_ARROW_ADVANCE, 420, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
      },
    },
  },
);
/** Manecillas dando la vuelta; la carátula quieta. */
export const clockIcon: AnimatedIconDef = /* @__PURE__ */ icon(clockShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }) },
    },
  });

export const clock4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M12 6v6l4 2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
      },
    },
  },
);

export const clockAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l4 2" },
    { tag: 'path', d: "M20 12v5" },
    { tag: 'path', d: "M20 21h.01" },
    { tag: 'path', d: "M21.25 8.2A10 10 0 1 0 16 21.16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 340, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

export const clockArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l2 1" },
    { tag: 'path', d: "M12.337 21.994a10 10 0 1 1 9.588-8.767" },
    { tag: 'path', d: "m14 18 4 4 4-4" },
    { tag: 'path', d: "M18 14v8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
      },
    },
  },
);

export const clockArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l1.5.8" },
    { tag: 'path', d: "M12.338 21.994a10 10 0 1 1 9.587-8.767" },
    { tag: 'path', d: "M14 18h8" },
    { tag: 'path', d: "m18 22-4-4 4-4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

export const clockArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l1.56.78" },
    { tag: 'path', d: "M13.227 21.925a10 10 0 1 1 8.767-9.588" },
    { tag: 'path', d: "m14 18 4-4 4 4" },
    { tag: 'path', d: "M18 22v-8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
      },
    },
  },
);

export const clockCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l4 2" },
    { tag: 'path', d: "M22 12a10 10 0 1 0-11 9.95" },
    { tag: 'path', d: "m22 16-5.5 5.5L14 19" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
      },
    },
  },
);

export const clockFadingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2a10 10 0 0 1 7.38 16.75" },
    { tag: 'path', d: "M12 6v6l4 2" },
    { tag: 'path', d: "M2.5 8.875a10 10 0 0 0-.5 3" },
    { tag: 'path', d: "M2.83 16a10 10 0 0 0 2.43 3.4" },
    { tag: 'path', d: "M4.636 5.235a10 10 0 0 1 .891-.857" },
    { tag: 'path', d: "M8.644 21.42a10 10 0 0 0 7.631-.38" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 590, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 700, fill: 'backwards' }),
      },
    },
  },
);

export const clockPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l3.644 1.822" },
    { tag: 'path', d: "M16 19h6" },
    { tag: 'path', d: "M19 16v6" },
    { tag: 'path', d: "M21.92 13.267a10 10 0 1 0-8.653 8.653" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);
