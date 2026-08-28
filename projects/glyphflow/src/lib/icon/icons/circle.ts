// Familia `circle` del catálogo curado (47 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { puntaCompas, astaCompas } from './_shared';
import { circleAlertShapes, circleCheckShapes, circlePlusShapes, circleQuestionMarkShapes, circleShapes, circleXShapes } from '../animated-icons.shapes';

/**
 * `circle-arrow-*` · el asta mide 8 unidades y la punta sale 2. Antes esto era la variante `hold`
 * haciendo de `default`: un desplazamiento con `fill: 'forwards'`, o sea un estado y no un gesto.
 * El estado sigue existiendo — se mudó a `hold`.
 */
const ARROW_BEAT_MS = 520;
const ARROW_SHAFT_LEN = 8;

/**
 * `circle-chevron-*`: el mismo compás que las flechas, sin asta que seguir. Lo que lo hace suyo es
 * que el aro RESPONDE — un latido chico y desfasado. Con las dos figuras moviéndose a la vez sería
 * un bloque; el desfase es lo que se siente vivo.
 */
const chevronAdvance = (eje: 'X' | 'Y', dir: 1 | -1): Keyframe[] => [
  { transform: `translate${eje}(0px)`, offset: 0 },
  { transform: `translate${eje}(${-1 * dir}px)`, offset: 0.22 },
  { transform: `translate${eje}(${3 * dir}px)`, offset: 0.6 },
  { transform: `translate${eje}(${0.6 * dir}px)`, offset: 0.82 },
  { transform: `translate${eje}(0px)`, offset: 1 },
];

/** El aro a 1.06 con r=10 llega a 23.6 con su trazo: cabe en la caja, pero por poco. */
const RING_TAP = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1)', offset: 0.2 },
  { transform: 'scale(1.06)', offset: 0.45 },
  { transform: 'scale(1)', offset: 1 },
];

const CHEVRON_BEAT_MS = 560;

/**
 * `circle-arrow-out-*`: la diagonal NO se traslada —se separaría del aro, que la sujeta en
 * (12,12)— sino que se estira desde ahí. Mide 14.142 (10²+10² bajo raíz) y crece 1.414 en
 * diagonal, que es exactamente 1 en cada eje: (14.142+1.414)/14.142 = 1.1.
 *
 * Y sale 1, no 2: el vértice ya está en la esquina del viewBox y con `stroke-width: 2` su trazo
 * llega al borde. Con 2 se recortaba.
 */
const OUT_DIAGONAL = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.1)' },
  { transform: 'scale(1)' },
];
const OUT_DIAGONAL_HOLD = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }];

/**
 * Los seis círculos CAEN a su sitio, de abajo hacia arriba: primero la fila que apoya en el piso,
 * después la de en medio y hasta el final la cima. Aparecer todos desde el centro (el `burst` que
 * traía) no contaba esa historia — una pila se apila.
 */
const PILE_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-10px)', opacity: '0', offset: 0 },
  { transform: 'translateY(-6px)', opacity: '1', offset: 0.25 },
  { transform: 'translateY(0)', opacity: '1', offset: 0.68 },
  { transform: 'translateY(-1.5px)', opacity: '1', offset: 0.84 },
  { transform: 'translateY(0)', opacity: '1', offset: 1 },
];

export const circleDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT }),
      },
    },
  },
);

export const circleEuroIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 9.4a4 4 0 1 0 0 5.2" },
    { tag: 'path', d: "M7 12h5" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const circleMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const circleParkingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M9 17V7h4a3 3 0 0 1 0 6H9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const circlePlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const circlePoundSterlingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M10 16V9.5a1 1 0 0 1 5 0" },
    { tag: 'path', d: "M8 12h4" },
    { tag: 'path', d: "M8 16h7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const circleSlash2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M22 2 2 22' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-7%)', offset: 0.1667 },
          { transform: 'translateX(7%)', offset: 0.3333 },
          { transform: 'translateX(-7%)', offset: 0.5 },
          { transform: 'translateX(7%)', offset: 0.6667 },
          { transform: 'translateX(0)', offset: 1 },
        ],
        600,
        { easing: EASE },
      ),
    },
  },
);

export const circleSlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'line', x1: 9, x2: 15, y1: 15, y2: 9 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const circleStarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const circleStopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'rect', x: 9, y: 9, width: 6, height: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT }),
      },
    },
  },
);

export const circleArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "m8 12 4 4 4-4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1), ARROW_BEAT_MS),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', ARROW_SHAFT_LEN), ARROW_BEAT_MS, { origin: '12px 8px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.1875)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '12px 8px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m12 8-4 4 4 4" },
    { tag: 'path', d: "M16 12H8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1), ARROW_BEAT_MS),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', ARROW_SHAFT_LEN), ARROW_BEAT_MS, { origin: '16px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.1875)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '16px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowOutDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 12a10 10 0 1 1 10 10" },
    { tag: 'path', d: "m2 22 10-10" },
    { tag: 'path', d: "M8 22H2v-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL, 500, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-1px, 1px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL_HOLD, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-1px, 1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowOutDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 22a10 10 0 1 1 10-10" },
    { tag: 'path', d: "M22 22 12 12" },
    { tag: 'path', d: "M22 16v6h-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL, 500, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(1px, 1px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL_HOLD, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(1px, 1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowOutUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 8V2h6" },
    { tag: 'path', d: "m2 2 10 10" },
    { tag: 'path', d: "M12 2A10 10 0 1 1 2 12" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL, 500, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-1px, -1px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL_HOLD, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        0: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-1px, -1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowOutUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 12A10 10 0 1 1 12 2" },
    { tag: 'path', d: "M22 2 12 12" },
    { tag: 'path', d: "M16 2h6v6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL, 500, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(1px, -1px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(OUT_DIAGONAL_HOLD, 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(1px, -1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m12 16 4-4-4-4" },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1), ARROW_BEAT_MS),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', ARROW_SHAFT_LEN), ARROW_BEAT_MS, { origin: '8px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.1875)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '8px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m16 12-4-4-4 4" },
    { tag: 'path', d: "M12 16V8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1), ARROW_BEAT_MS),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', ARROW_SHAFT_LEN), ARROW_BEAT_MS, { origin: '12px 16px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.1875)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleCheckBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21.801 10A10 10 0 1 1 17 3.335" },
    { tag: 'path', d: "m9 11 3 3L22 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const circleChevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m16 10-4 4-4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ chevronAdvance('Y', 1), CHEVRON_BEAT_MS),
        0: /* @__PURE__ */ track(RING_TAP, CHEVRON_BEAT_MS),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleChevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m14 16-4-4 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ chevronAdvance('X', -1), CHEVRON_BEAT_MS),
        0: /* @__PURE__ */ track(RING_TAP, CHEVRON_BEAT_MS),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleChevronRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m10 8 4 4-4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ chevronAdvance('X', 1), CHEVRON_BEAT_MS),
        0: /* @__PURE__ */ track(RING_TAP, CHEVRON_BEAT_MS),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleChevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m8 14 4-4 4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ chevronAdvance('Y', -1), CHEVRON_BEAT_MS),
        0: /* @__PURE__ */ track(RING_TAP, CHEVRON_BEAT_MS),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" },
    { tag: 'path', d: "M19.08 19.08A10 10 0 1 1 4.92 4.92" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const circleParkingOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.656 7H13a3 3 0 0 1 2.984 3.307" },
    { tag: 'path', d: "M13 13H9" },
    { tag: 'path', d: "M19.071 19.071A1 1 0 0 1 4.93 4.93" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.357 2.687a10 10 0 0 1 12.956 12.956" },
    { tag: 'path', d: "M9 17V9" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** Toast de error/advertencia: el círculo se dibuja y el signo aparece después. */
export const circleAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleAlertShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 5, -3, 0]), 600),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 340 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  });

/** Toast de éxito: primero el círculo, luego la palomita. Nunca al mismo tiempo. */
export const circleCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 280 }),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Toast de error: el círculo se dibuja y la equis se tacha en dos tiempos. */
export const circleXIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 420 }),
      },
    },
  });

/** Agregar: el círculo se traza y la cruz aparece dentro. */
export const circlePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(circlePlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 320 }),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });

/** Ayuda: el signo de interrogación llega al final, que es lo que se mira. */
export const circleQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleQuestionMarkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 380 }),
      },
    },
    alert: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
      },
    },
  });

export const circleIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 450, { origin: 'center' }) },
  });

/** Un solo aro y nada dentro: late, como el `circle` de la familia. */
export const circleSmallIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 6 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
      },
    },
  },
);

/** El aro se traza y las dos rayas se escriben de arriba abajo. */
export const circleEqualIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M7 10h10" },
    { tag: 'path', d: "M7 14h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 350, fill: 'backwards' }),
      },
    },
  },
);

/** La raya del medio primero, y los dos puntos después: así se lee el signo. */
export const circleDivideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'line', x1: 8, y1: 12, x2: 16, y2: 12 },
    { tag: 'line', x1: 12, y1: 16, x2: 12, y2: 16 },
    { tag: 'line', x1: 12, y1: 8, x2: 12, y2: 8 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 350, fill: 'backwards' }),
      },
    },
  },
);

/** Los tres puntos aparecen de izquierda a derecha, como quien sigue escribiendo. */
export const circleEllipsisIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M17 12h.01" },
    { tag: 'path', d: "M12 12h.01" },
    { tag: 'path', d: "M7 12h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** La ese se traza y la barra la atraviesa después. */
export const circleDollarSignIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" },
    { tag: 'path', d: "M12 18V6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
      },
    },
  },
);

/** La diagonal parte el círculo y los dos ceros caen a sus lados. */
export const circlePercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m15 9-6 6" },
    { tag: 'path', d: "M9 9h.01" },
    { tag: 'path', d: "M15 15h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 450, fill: 'backwards' }),
      },
    },
  },
);

/** Las dos barras entran a la vez que se separan: primero la izquierda. */
export const circlePauseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'line', x1: 10, y1: 15, x2: 10, y2: 9 },
    { tag: 'line', x1: 14, y1: 15, x2: 14, y2: 9 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
      },
    },
  },
);

/** El arco de encendido se traza y la barra baja a cerrarlo. */
export const circlePowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M7.998 9.003a5 5 0 1 0 8-.005" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** El arco abierto se traza, el eje aparece y la aguja marca al final. */
export const circleGaugeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15.6 2.7a10 10 0 1 0 5.7 5.7" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'path', d: "M13.4 10.6 19 5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
      },
    },
  },
);

/** La cabeza asoma y los hombros se dibujan debajo. */
export const circleUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
      },
    },
  },
);

/** Aquí el aro es la figura 2; el orden de lectura es el mismo. */
export const circleUserRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17.925 20.056a6 6 0 0 0-11.851.001" },
    { tag: 'circle', cx: 12, cy: 11, r: 4 },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { easing: 'ease-out' }),
      },
    },
  },
);

/** Seis círculos que se apilan de abajo arriba: primero la base, luego el medio, luego la cima. */
export const circlePileIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 19, r: 2 },
    { tag: 'circle', cx: 12, cy: 5, r: 2 },
    { tag: 'circle', cx: 16, cy: 12, r: 2 },
    { tag: 'circle', cx: 20, cy: 19, r: 2 },
    { tag: 'circle', cx: 4, cy: 19, r: 2 },
    { tag: 'circle', cx: 8, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(PILE_DROP, 460, { fill: 'backwards' }),
        0: /* @__PURE__ */ track(PILE_DROP, 460, { delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track(PILE_DROP, 460, { delay: 120, fill: 'backwards' }),
        5: /* @__PURE__ */ track(PILE_DROP, 460, { delay: 220, fill: 'backwards' }),
        2: /* @__PURE__ */ track(PILE_DROP, 460, { delay: 280, fill: 'backwards' }),
        1: /* @__PURE__ */ track(PILE_DROP, 460, { delay: 380, fill: 'backwards' }),
      },
    },
  },
);

/** Aquí el aro ESTÁ partido, así que dar la vuelta es el gesto: ocho tramos en sentido del reloj. */
export const circleDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.1 2.182a10 10 0 0 1 3.8 0" },
    { tag: 'path', d: "M13.9 21.818a10 10 0 0 1-3.8 0" },
    { tag: 'path', d: "M17.609 3.721a10 10 0 0 1 2.69 2.7" },
    { tag: 'path', d: "M2.182 13.9a10 10 0 0 1 0-3.8" },
    { tag: 'path', d: "M20.279 17.609a10 10 0 0 1-2.7 2.69" },
    { tag: 'path', d: "M21.818 10.1a10 10 0 0 1 0 3.8" },
    { tag: 'path', d: "M3.721 6.391a10 10 0 0 1 2.7-2.69" },
    { tag: 'path', d: "M6.391 20.279a10 10 0 0 1-2.69-2.7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 70, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 210, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 490, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 350, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo, y el punto del centro aparece cuando la vuelta se cierra. */
export const circleDotDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.1 2.18a9.93 9.93 0 0 1 3.8 0" },
    { tag: 'path', d: "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" },
    { tag: 'path', d: "M21.82 10.1a9.93 9.93 0 0 1 0 3.8" },
    { tag: 'path', d: "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" },
    { tag: 'path', d: "M13.9 21.82a9.94 9.94 0 0 1-3.8 0" },
    { tag: 'path', d: "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" },
    { tag: 'path', d: "M2.18 13.9a9.93 9.93 0 0 1 0-3.8" },
    { tag: 'path', d: "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 70, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 210, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 350, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 490, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 600, fill: 'backwards' }),
      },
    },
  },
);

/** El aro se desvanece a tramos: se traza del entero al más tenue, y la cruz entra al final. */
export const circleFadingPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2a10 10 0 0 1 7.38 16.75" },
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "M16 12H8" },
    { tag: 'path', d: "M2.5 8.875a10 10 0 0 0-.5 3" },
    { tag: 'path', d: "M2.83 16a10 10 0 0 0 2.43 3.4" },
    { tag: 'path', d: "M4.636 5.235a10 10 0 0 1 .891-.857" },
    { tag: 'path', d: "M8.644 21.42a10 10 0 0 0 7.631-.38" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 520, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 610, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 230, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 410, fill: 'backwards' }),
      },
    },
  },
);

/** El mismo aro que se desvanece; el asta sube y la punta la remata, o la flecha se parte. */
export const circleFadingArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2a10 10 0 0 1 7.38 16.75" },
    { tag: 'path', d: "m16 12-4-4-4 4" },
    { tag: 'path', d: "M12 16V8" },
    { tag: 'path', d: "M2.5 8.875a10 10 0 0 0-.5 3" },
    { tag: 'path', d: "M2.83 16a10 10 0 0 0 2.43 3.4" },
    { tag: 'path', d: "M4.636 5.235a10 10 0 0 1 .891-.857" },
    { tag: 'path', d: "M8.644 21.42a10 10 0 0 0 7.631-.38" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 640, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 520, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 230, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 410, fill: 'backwards' }),
      },
    },
  },
);
