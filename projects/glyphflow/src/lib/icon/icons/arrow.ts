// Familia `arrow` del catálogo curado (42 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveXSeq, moveYSeq, track, icon, held } from '../choreography';
import { arrowDownLeftShapes, arrowDownRightShapes, arrowDownShapes, arrowLeftShapes, arrowRightShapes, arrowUpLeftShapes, arrowUpRightShapes, arrowUpShapes } from '../animated-icons.shapes';

/* ── Variantes `nudge` y `assemble` ─────────────────────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). Los `default`/`active` que ya tenía la
 * familia NO se tocan: aquellos empujan la flecha y la SOSTIENEN (`held`, `reverseOnLeave`);
 * estos amagan en contra, salen disparados y vuelven solos al reposo. Son gestos distintos.
 *
 * Dos cosas medidas con el banco de cotejo, iguales que en `battery`:
 *
 * 1. El easing va POR KEYFRAME, no en `options`. Framer aplica su curva entre cada par de
 *    keyframes; metida en `options`, WAAPI la aplica a la iteración COMPLETA y corre los
 *    keyframes intermedios de lugar.
 * 2. `times` se traduce a `offset`. Cuesta el relevo de pose (`conRelevo` corta con offsets),
 *    igual que en el original.
 *
 * Traducción de los easings de Framer, que coinciden exactos con los de CSS:
 *   easeInOut = cubic-bezier(.42,0,.58,1) = `ease-in-out`;  easeOut = cubic-bezier(0,0,.58,1).
 */
const EIO = 'ease-in-out';
const EOUT = 'ease-out';

/**
 * El amague: la flecha retrocede un poco antes de salir en su dirección, y vuelve. Va en el
 * `<svg>` entero porque el original no engancha `variants` a ninguna figura suelta.
 */
const nudgeRoot = (de: string, contra: string, ida: string) =>
  /* @__PURE__ */ track(
    [
      { transform: de, offset: 0, easing: EIO },
      { transform: contra, offset: 0.2, easing: EIO },
      { transform: ida, offset: 0.6, easing: EIO },
      { transform: de, offset: 1 },
    ],
    600,
    { easing: 'linear' },
  );

/** Media flecha de un icono bidireccional: se aparta y vuelve. */
const nudgeMitad = (medio: string) =>
  /* @__PURE__ */ track(
    [
      { transform: 'translate(0px, 0px)', offset: 0, easing: EIO },
      { transform: medio, offset: 0.5, easing: EIO },
      { transform: 'translate(0px, 0px)', offset: 1 },
    ],
    600,
    { easing: 'linear' },
  );

/** El asta de un icono de orden: entra desde abajo, pasándose de largo. */
const assembleAsta = () =>
  /* @__PURE__ */ track(
    [
      { transform: 'translateY(6px)', opacity: '0', easing: EOUT },
      { transform: 'translateY(-2px)', opacity: '1', easing: EOUT },
      { transform: 'translateY(0px)', opacity: '1' },
    ],
    600,
    { easing: 'linear' },
  );

/** La línea vertical se dibuja. El componente pone `pathLength="1"`, así que el dash va en 0-1. */
const assembleLinea = () =>
  /* @__PURE__ */ track(
    [
      { strokeDasharray: '0 1' },
      { strokeDasharray: '1 1' },
    ],
    700,
    { easing: EIO, delay: 100 },
  );

/** Una letra o cifra que entra deslizándose. */
const assembleGlifo = (desde: string, delay: number, duration = 500) =>
  /* @__PURE__ */ track(
    [
      { transform: desde, opacity: '0', easing: EOUT },
      { transform: 'translate(0px, 0px)', opacity: '1' },
    ],
    duration,
    { easing: 'linear', delay },
  );

/** La caja del `0`: no se desliza, se infla. */
const assembleCaja = (delay: number) =>
  /* @__PURE__ */ track(
    [
      { transform: 'scale(0.8)', opacity: '0.7', easing: EOUT },
      { transform: 'scale(1.1)', opacity: '1', easing: EOUT },
      { transform: 'scale(1)', opacity: '1' },
    ],
    600,
    { easing: 'linear', delay, origin: '17px 7px' },
  );

/** El icono entero acusa el golpe mientras se rearma. */
const assembleRoot = (pico: number, giro: number, duration: number) =>
  /* @__PURE__ */ track(
    [
      { transform: 'scale(1) rotate(0deg)', easing: EIO },
      { transform: `scale(${pico}) rotate(${-giro}deg)`, easing: EIO },
      { transform: `scale(${pico === 1.1 ? 0.95 : 0.96}) rotate(${giro * 0.6}deg)`, easing: EIO },
      { transform: 'scale(1) rotate(0deg)' },
    ],
    duration,
    { easing: 'linear' },
  );

const ARROW_UP_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, -3px)' }];

const ARROW_UP_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, -3px)' }];

const ARROW_DOWN_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, 3px)' }];

const ARROW_DOWN_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, 3px)' }];

export const arrowDownFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 3H5" },
    { tag: 'path', d: "M12 21V7" },
    { tag: 'path', d: "m6 15 6 6 6-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownToDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v14" },
    { tag: 'path', d: "m19 9-7 7-7-7" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17V3" },
    { tag: 'path', d: "m6 11 6 6 6-6" },
    { tag: 'path', d: "M19 21H5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowLeftFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 6-6 6 6 6" },
    { tag: 'path', d: "M3 12h14" },
    { tag: 'path', d: "M21 19V5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowLeftToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 19V5" },
    { tag: 'path', d: "m13 6-6 6 6 6" },
    { tag: 'path', d: "M7 12h14" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowRightFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5v14" },
    { tag: 'path', d: "M21 12H7" },
    { tag: 'path', d: "m15 18 6-6-6-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowRightToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 12H3" },
    { tag: 'path', d: "m11 18 6-6-6-6" },
    { tag: 'path', d: "M21 5v14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpFromDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m5 9 7-7 7 7" },
    { tag: 'path', d: "M12 16V2" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 9-6-6-6 6" },
    { tag: 'path', d: "M12 3v14" },
    { tag: 'path', d: "M5 21h14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3h14" },
    { tag: 'path', d: "m18 13-6-6-6 6" },
    { tag: 'path', d: "M12 7v14" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "m21 8-4-4-4 4" },
    { tag: 'path', d: "M17 4v16" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m3 16 4 4 4-4", opacity: '0' },
    { tag: 'path', d: "M7 20V4", opacity: '0' },
    { tag: 'path', d: "m21 8-4-4-4 4", opacity: '0' },
    { tag: 'path', d: "M17 4v16", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.04)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        0: /* @__PURE__ */ nudgeMitad('translateY(3px)'),
        1: /* @__PURE__ */ nudgeMitad('translateY(3px)'),
        2: /* @__PURE__ */ nudgeMitad('translateY(-3px)'),
        3: /* @__PURE__ */ nudgeMitad('translateY(-3px)'),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-up-down`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const arrowUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m21 16-4 4-4-4" },
    { tag: 'path', d: "M17 20V4" },
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "m21 16-4 4-4-4", opacity: '0' },
    { tag: 'path', d: "M17 20V4", opacity: '0' },
    { tag: 'path', d: "m3 8 4-4 4 4", opacity: '0' },
    { tag: 'path', d: "M7 4v16", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        0: /* @__PURE__ */ nudgeMitad('translateY(3px)'),
        1: /* @__PURE__ */ nudgeMitad('translateY(3px)'),
        2: /* @__PURE__ */ nudgeMitad('translateY(-3px)'),
        3: /* @__PURE__ */ nudgeMitad('translateY(-3px)'),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-down-up`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const arrowDownNarrowWideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M11 4h4" },
    { tag: 'path', d: "M11 8h7" },
    { tag: 'path', d: "M11 12h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
      },
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-up-wide-narrow`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const arrowUpNarrowWideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M11 12h4" },
    { tag: 'path', d: "M11 16h7" },
    { tag: 'path', d: "M11 20h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
      },
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-down-wide-narrow`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const arrowDownWideNarrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M11 4h10" },
    { tag: 'path', d: "M11 8h7" },
    { tag: 'path', d: "M11 12h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
      },
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-up-narrow-wide`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const arrowUpWideNarrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M11 12h10" },
    { tag: 'path', d: "M11 16h7" },
    { tag: 'path', d: "M11 20h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
      },
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-down-narrow-wide`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M9 4h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" },
    { tag: 'path', d: "M20 9v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M4 9v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z" },
    { tag: 'path', d: "M9 20h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const arrowDown01Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'rect', x: 15, y: 4, width: 4, height: 6, ry: 2 },
    { tag: 'path', d: "M17 20v-6h-2" },
    { tag: 'path', d: "M15 20h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDown10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M17 10V4h-2" },
    { tag: 'path', d: "M15 10h4" },
    { tag: 'rect', x: 15, y: 14, width: 4, height: 6, ry: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownAZIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M20 8h-5" },
    { tag: 'path', d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" },
    { tag: 'path', d: "M15 14h5l-5 6h5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowDownZAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M15 4h5l-5 6h5" },
    { tag: 'path', d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" },
    { tag: 'path', d: "M20 18h-5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowLeftRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 3 4 7l4 4" },
    { tag: 'path', d: "M4 7h16" },
    { tag: 'path', d: "m16 21 4-4-4-4" },
    { tag: 'path', d: "M20 17H4" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "M8 3 4 7l4 4", opacity: '0' },
    { tag: 'path', d: "M4 7h16", opacity: '0' },
    { tag: 'path', d: "m16 21 4-4-4-4", opacity: '0' },
    { tag: 'path', d: "M20 17H4", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
      },
    },
    nudge: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-4.5px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-4.5px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-4.5px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-4.5px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        0: /* @__PURE__ */ nudgeMitad('translateX(-3px)'),
        1: /* @__PURE__ */ nudgeMitad('translateX(-3px)'),
        2: /* @__PURE__ */ nudgeMitad('translateX(3px)'),
        3: /* @__PURE__ */ nudgeMitad('translateX(3px)'),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-right-left`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowRightLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 3 4 4-4 4" },
    { tag: 'path', d: "M20 7H4" },
    { tag: 'path', d: "m8 21-4-4 4-4" },
    { tag: 'path', d: "M4 17h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `arrow-left-right`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  },
);

export const arrowUp01Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'rect', x: 15, y: 4, width: 4, height: 6, ry: 2 },
    { tag: 'path', d: "M17 20v-6h-2" },
    { tag: 'path', d: "M15 20h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    assemble: {
      root: /* @__PURE__ */ assembleRoot(1.08, 4, 800),
      shapes: {
        0: /* @__PURE__ */ assembleAsta(),
        1: /* @__PURE__ */ assembleLinea(),
        2: /* @__PURE__ */ assembleCaja(200),
        3: /* @__PURE__ */ assembleGlifo('translateX(-6px)', 300),
        4: /* @__PURE__ */ assembleGlifo('translateX(-6px)', 300),
      },
    },
  },
);

export const arrowUp10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M17 10V4h-2" },
    { tag: 'path', d: "M15 10h4" },
    { tag: 'rect', x: 15, y: 14, width: 4, height: 6, ry: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    assemble: {
      root: /* @__PURE__ */ assembleRoot(1.08, 4, 800),
      shapes: {
        0: /* @__PURE__ */ assembleAsta(),
        1: /* @__PURE__ */ assembleLinea(),
        2: /* @__PURE__ */ assembleGlifo('translateX(-6px)', 200),
        3: /* @__PURE__ */ assembleGlifo('translateX(-6px)', 200),
        4: /* @__PURE__ */ assembleCaja(300),
      },
    },
  },
);

export const arrowUpAZIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M20 8h-5" },
    { tag: 'path', d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" },
    { tag: 'path', d: "M15 14h5l-5 6h5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    assemble: {
      root: /* @__PURE__ */ assembleRoot(1.1, 5, 900),
      shapes: {
        0: /* @__PURE__ */ assembleAsta(),
        1: /* @__PURE__ */ assembleLinea(),
        2: /* @__PURE__ */ assembleGlifo('translateY(-4px)', 200),
        3: /* @__PURE__ */ assembleGlifo('translateY(-4px)', 200),
        4: /* @__PURE__ */ assembleGlifo('translateX(6px)', 300, 600),
      },
    },
  },
);

export const arrowUpZAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M15 4h5l-5 6h5" },
    { tag: 'path', d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" },
    { tag: 'path', d: "M20 18h-5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    assemble: {
      root: /* @__PURE__ */ assembleRoot(1.1, 5, 900),
      shapes: {
        0: /* @__PURE__ */ assembleAsta(),
        1: /* @__PURE__ */ assembleLinea(),
        2: /* @__PURE__ */ assembleGlifo('translateX(6px)', 200, 600),
        3: /* @__PURE__ */ assembleGlifo('translateY(6px)', 300, 600),
        4: /* @__PURE__ */ assembleGlifo('translateY(6px)', 300, 600),
      },
    },
  },
);

/** Igual que el chevron pero de regreso: la flecha de "volver". */
export const arrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowLeftShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-6px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translateX(2px)', 'translateX(-4px)'),
    },
  });

export const arrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowRightShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(6px, 0px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translateX(-2px)', 'translateX(4px)'),
    },
  });

/** Igual que `arrow-left`/`arrow-right`: nudge que se sostiene en hover y regresa al salir. */
export const arrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translateY(2px)', 'translateY(-4px)'),
    },
  });

export const arrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translateY(-2px)', 'translateY(4px)'),
    },
  });

export const arrowUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_LEFT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-4.5px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-4.5px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-4.5px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-4.5px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translate(1.5px, 1.5px)', 'translate(-3px, -3px)'),
    },
  });

export const arrowUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpRightShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_RIGHT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, -4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, -4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translate(-1.5px, 1.5px)', 'translate(3px, -3px)'),
    },
  });

export const arrowDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_LEFT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-4.5px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-4.5px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-4.5px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-4.5px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translate(1.5px, -1.5px)', 'translate(-3px, 3px)'),
    },
  });

export const arrowDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownRightShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_RIGHT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translate(-1.5px, -1.5px)', 'translate(3px, 3px)'),
    },
  });
