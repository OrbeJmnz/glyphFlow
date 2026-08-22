// Familia `circle` del catálogo curado (31 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { circleAlertShapes, circleCheckShapes, circlePlusShapes, circleQuestionMarkShapes, circleShapes, circleXShapes } from '../animated-icons.shapes';

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
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '12px 8px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
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
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '16px 12px' }),
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
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
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
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
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
        0: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
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
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
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
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '8px 12px' }),
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
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '12px 16px' }),
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
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
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
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
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
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
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
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
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
