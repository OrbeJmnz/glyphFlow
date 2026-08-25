// Familia `clock` del catálogo curado (13 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, rotateSeq, track, icon } from '../choreography';
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
