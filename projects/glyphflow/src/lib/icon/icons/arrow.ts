// Familia `arrow` del catálogo curado (42 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveXSeq, moveYSeq, track, icon, held } from '../choreography';
import { puntaCompas, astaCompas } from './_shared';
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
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m6 15 6 6 6-6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.2, 2.5), 520),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.2, 2.5), 520, { origin: '12px 7px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 6), 560),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.5, 6), 560, { origin: '12px 7px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.3 }, { transform: 'scaleX(0.86)', offset: 0.5 }, { transform: 'scaleX(1.04)', offset: 0.75 }, { transform: 'scaleX(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '12px 3px' }),
      },
    },
  },
);

export const arrowDownToDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v14" },
    { tag: 'path', d: "m19 9-7 7-7-7" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m19 9-7 7-7-7", opacity: '0' },
  ],
  {
    /** El compás de la familia. El estado que vivía aquí se mudó a `hold`. */
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 1.5), 480),
        0: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.5, 1.5), 480, { origin: '12px 2px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: doble recorrido que el `default` y con estela.
     * El punto ACUSA la llegada creciendo — es el destino de la flecha, no decoración.
     */
    dart: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2.5, 3), 540),
        0: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 2.5, 3), 540, { origin: '12px 2px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(1)', offset: 0.35 }, { transform: 'scale(1.7)', offset: 0.58 }, { transform: 'scale(1)', offset: 1 }], 540, { easing: 'ease-out', origin: '12px 21px' }),
      },
    },
    /**
     * El icono se ENSAMBLA, con el orden que cuenta su historia: en `to-dot` el punto aparece al
     * final porque es el destino, y en `from-dot` aparece primero porque es el origen. El mismo
     * gesto con el orden invertido dice cosas opuestas.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 0, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(-6px)', opacity: '0' }, { transform: 'translateY(2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 150, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scale(0)', opacity: '0' }, { transform: 'scale(1.6)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 420, { easing: SPRING_OUT, delay: 520, fill: 'backwards', origin: '12px 21px' }),
      },
    },
  },
);

export const arrowDownToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17V3" },
    { tag: 'path', d: "m6 11 6 6 6-6" },
    { tag: 'path', d: "M19 21H5" },
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m6 11 6 6 6-6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.2, 2.5), 520),
        0: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.2, 2.5), 520, { origin: '12px 3px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 6), 560),
        0: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.5, 6), 560, { origin: '12px 3px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.3 }, { transform: 'scaleX(0.86)', offset: 0.5 }, { transform: 'scaleX(1.04)', offset: 0.75 }, { transform: 'scaleX(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '12px 21px' }),
      },
    },
  },
);

export const arrowLeftFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 6-6 6 6 6" },
    { tag: 'path', d: "M3 12h14" },
    { tag: 'path', d: "M21 19V5" },
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m9 6-6 6 6 6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1, 1.2, 2.5), 520),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.2, 2.5), 520, { origin: '17px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1, 1.5, 6), 560),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.5, 6), 560, { origin: '17px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(-1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.3 }, { transform: 'scaleY(0.86)', offset: 0.5 }, { transform: 'scaleY(1.04)', offset: 0.75 }, { transform: 'scaleY(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '21px 12px' }),
      },
    },
  },
);

export const arrowLeftToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 19V5" },
    { tag: 'path', d: "m13 6-6 6 6 6" },
    { tag: 'path', d: "M7 12h14" },
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m13 6-6 6 6 6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1, 1.2, 2.5), 520),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.2, 2.5), 520, { origin: '21px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1, 1.5, 6), 560),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.5, 6), 560, { origin: '21px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(-1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.3 }, { transform: 'scaleY(0.86)', offset: 0.5 }, { transform: 'scaleY(1.04)', offset: 0.75 }, { transform: 'scaleY(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '3px 12px' }),
      },
    },
  },
);

export const arrowRightFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5v14" },
    { tag: 'path', d: "M21 12H7" },
    { tag: 'path', d: "m15 18 6-6-6-6" },
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m15 18 6-6-6-6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 1.2, 2.5), 520),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.2, 2.5), 520, { origin: '7px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 1.5, 6), 560),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.5, 6), 560, { origin: '7px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.3 }, { transform: 'scaleY(0.86)', offset: 0.5 }, { transform: 'scaleY(1.04)', offset: 0.75 }, { transform: 'scaleY(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '3px 12px' }),
      },
    },
  },
);

export const arrowRightToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 12H3" },
    { tag: 'path', d: "m11 18 6-6-6-6" },
    { tag: 'path', d: "M21 5v14" },
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m11 18 6-6-6-6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 1.2, 2.5), 520),
        0: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.2, 2.5), 520, { origin: '3px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 1.5, 6), 560),
        0: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 14, 1.5, 6), 560, { origin: '3px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.3 }, { transform: 'scaleY(0.86)', offset: 0.5 }, { transform: 'scaleY(1.04)', offset: 0.75 }, { transform: 'scaleY(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '21px 12px' }),
      },
    },
  },
);

export const arrowUpFromDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m5 9 7-7 7 7" },
    { tag: 'path', d: "M12 16V2" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m5 9 7-7 7 7", opacity: '0' },
  ],
  {
    /** El compás de la familia. El estado que vivía aquí se mudó a `hold`. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.5, 1.5), 480, { origin: '12px 16px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: doble recorrido que el `default` y con estela.
     * El punto ACUSA la llegada creciendo — es el destino de la flecha, no decoración.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 2.5, 3), 540, { origin: '12px 16px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(1)', offset: 0.35 }, { transform: 'scale(1.7)', offset: 0.58 }, { transform: 'scale(1)', offset: 1 }], 540, { easing: 'ease-out', origin: '12px 21px' }),
      },
    },
    /**
     * El icono se ENSAMBLA, con el orden que cuenta su historia: en `to-dot` el punto aparece al
     * final porque es el destino, y en `from-dot` aparece primero porque es el origen. El mismo
     * gesto con el orden invertido dice cosas opuestas.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'scale(0)', opacity: '0' }, { transform: 'scale(1.6)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 420, { easing: SPRING_OUT, delay: 0, fill: 'backwards', origin: '12px 21px' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(6px)', opacity: '0' }, { transform: 'translateY(-2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 300, fill: 'backwards' }),
      },
    },
  },
);

export const arrowUpFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 9-6-6-6 6" },
    { tag: 'path', d: "M12 3v14" },
    { tag: 'path', d: "M5 21h14" },
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m18 9-6-6-6 6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.2, 2.5), 520),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.2, 2.5), 520, { origin: '12px 17px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 6), 560),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.5, 6), 560, { origin: '12px 17px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.3 }, { transform: 'scaleX(0.86)', offset: 0.5 }, { transform: 'scaleX(1.04)', offset: 0.75 }, { transform: 'scaleX(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '12px 21px' }),
      },
    },
  },
);

export const arrowUpToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3h14" },
    { tag: 'path', d: "m18 13-6-6-6 6" },
    { tag: 'path', d: "M12 7v14" },
    // Estela(s) del `dart`: copia de la punta, invisible en reposo.
    { tag: 'path', d: "m18 13-6-6-6 6", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.2, 2.5), 520),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.2, 2.5), 520, { origin: '12px 21px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * La flecha se CARGA contra la línea y sale; la línea acusa el impulso.
     *
     * El agache manda (6 contra 1.5 de salida) y esta MEDIDO, no elegido a ojo: con 3.5
     * el pico quedaba en 3.5 y su propio `default` ya llega a 3.0 — un 17% mas, o sea nada. Los
     * `dart` que ya funcionan van a 2.1-3.0 veces su default; con 6 este queda en 2.0.
     *
     * Hacia afuera no hay lienzo (la punta ya termina en el borde), asi que el recorrido sale del
     * lado de la linea: ahi sobra sitio y ademas es lo que el icono significa. El achatamiento de
     * la linea completa el gesto, en su eje perpendicular y con el origen en su centro.
     */
    dart: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 6), 560),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 14, 1.5, 6), 560, { origin: '12px 21px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-1.8px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-1.8px)', opacity: '0', offset: 1 }], 560, { easing: 'linear', delay: 120, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.3 }, { transform: 'scaleX(0.86)', offset: 0.5 }, { transform: 'scaleX(1.04)', offset: 0.75 }, { transform: 'scaleX(1)', offset: 1 }], 560, { easing: 'ease-out', origin: '12px 3px' }),
      },
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
    dart: {
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
    dart: {
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 16 4 4 4-4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 4px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 4px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-6px)', opacity: '0' }, { transform: 'translateY(2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 280, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 360, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 8 4-4 4 4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 20px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 20px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(6px)', opacity: '0' }, { transform: 'translateY(-2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 280, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 360, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 16 4 4 4-4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 4px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 4px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-6px)', opacity: '0' }, { transform: 'translateY(2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 280, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 360, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 8 4-4 4 4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 20px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 20px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(6px)', opacity: '0' }, { transform: 'translateY(-2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 280, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 520, { easing: SPRING_OUT, delay: 360, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M9 4h6" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(-1px) scaleY(0.94)', offset: 0.24 }, { transform: 'translateY(1.2px) scaleY(1.024)', offset: 0.6 }, { transform: 'translateY(0.24px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 460, { origin: '12px 8px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * El guión acusa el impulso achatándose, que es lo que vuelve legible un recorrido corto.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(-2.2px) scaleY(0.86)', offset: 0.24 }, { transform: 'translateY(2.5px) scaleY(1.056)', offset: 0.6 }, { transform: 'translateY(0.5px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 520, { origin: '12px 8px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.28 }, { transform: 'scaleX(0.84)', offset: 0.48 }, { transform: 'scaleX(1.05)', offset: 0.74 }, { transform: 'scaleX(1)', offset: 1 }], 520, { easing: 'ease-out', origin: '12px 4px' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(-1px) scaleY(0.94)', offset: 0.24 }, { transform: 'translateY(1.2px) scaleY(1.024)', offset: 0.6 }, { transform: 'translateY(0.24px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 460, { origin: '12px 4px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * Sin guión que reaccione, todo el efecto vive en la compresión y el rastro.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(-2.2px) scaleY(0.86)', offset: 0.24 }, { transform: 'translateY(2.5px) scaleY(1.056)', offset: 0.6 }, { transform: 'translateY(0.5px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 520, { origin: '12px 4px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" },
    { tag: 'path', d: "M20 9v6" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(1px) scaleX(0.94)', offset: 0.24 }, { transform: 'translateX(-1.2px) scaleX(1.024)', offset: 0.6 }, { transform: 'translateX(-0.24px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 460, { origin: '16px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * El guión acusa el impulso achatándose, que es lo que vuelve legible un recorrido corto.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(2.2px) scaleX(0.86)', offset: 0.24 }, { transform: 'translateX(-2.5px) scaleX(1.056)', offset: 0.6 }, { transform: 'translateX(-0.5px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 520, { origin: '16px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(-4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.28 }, { transform: 'scaleY(0.84)', offset: 0.48 }, { transform: 'scaleY(1.05)', offset: 0.74 }, { transform: 'scaleY(1)', offset: 1 }], 520, { easing: 'ease-out', origin: '20px 12px' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(1px) scaleX(0.94)', offset: 0.24 }, { transform: 'translateX(-1.2px) scaleX(1.024)', offset: 0.6 }, { transform: 'translateX(-0.24px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 460, { origin: '20px 12px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * Sin guión que reaccione, todo el efecto vive en la compresión y el rastro.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(2.2px) scaleX(0.86)', offset: 0.24 }, { transform: 'translateX(-2.5px) scaleX(1.056)', offset: 0.6 }, { transform: 'translateX(-0.5px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 520, { origin: '20px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(-4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M4 9v6" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(-1px) scaleX(0.94)', offset: 0.24 }, { transform: 'translateX(1.2px) scaleX(1.024)', offset: 0.6 }, { transform: 'translateX(0.24px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 460, { origin: '8px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * El guión acusa el impulso achatándose, que es lo que vuelve legible un recorrido corto.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(-2.2px) scaleX(0.86)', offset: 0.24 }, { transform: 'translateX(2.5px) scaleX(1.056)', offset: 0.6 }, { transform: 'translateX(0.5px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 520, { origin: '8px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1)', offset: 0.28 }, { transform: 'scaleY(0.84)', offset: 0.48 }, { transform: 'scaleY(1.05)', offset: 0.74 }, { transform: 'scaleY(1)', offset: 1 }], 520, { easing: 'ease-out', origin: '4px 12px' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(-1px) scaleX(0.94)', offset: 0.24 }, { transform: 'translateX(1.2px) scaleX(1.024)', offset: 0.6 }, { transform: 'translateX(0.24px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 460, { origin: '4px 12px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * Sin guión que reaccione, todo el efecto vive en la compresión y el rastro.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px) scaleX(1)', offset: 0 }, { transform: 'translateX(-2.2px) scaleX(0.86)', offset: 0.24 }, { transform: 'translateX(2.5px) scaleX(1.056)', offset: 0.6 }, { transform: 'translateX(0.5px) scaleX(1)', offset: 0.82 }, { transform: 'translateX(0px) scaleX(1)', offset: 1 }], 520, { origin: '4px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z" },
    { tag: 'path', d: "M9 20h6" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(1px) scaleY(0.94)', offset: 0.24 }, { transform: 'translateY(-1.2px) scaleY(1.024)', offset: 0.6 }, { transform: 'translateY(-0.24px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 460, { origin: '12px 16px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * El guión acusa el impulso achatándose, que es lo que vuelve legible un recorrido corto.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(2.2px) scaleY(0.86)', offset: 0.24 }, { transform: 'translateY(-2.5px) scaleY(1.056)', offset: 0.6 }, { transform: 'translateY(-0.5px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 520, { origin: '12px 16px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.28 }, { transform: 'scaleX(0.84)', offset: 0.48 }, { transform: 'scaleX(1.05)', offset: 0.74 }, { transform: 'scaleX(1)', offset: 1 }], 520, { easing: 'ease-out', origin: '12px 20px' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" },
    // La estela del `dart`: copia de la flecha que sale disparada y se apaga.
    { tag: 'path', d: "M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia. Antes aquí vivía un ESTADO —el que ahora es `hold`—, o sea una
     * pose con `fill: 'forwards'` que se queda puesta. Misma migración que `circle-arrow-*`.
     *
     * La flecha se COMPRIME contra su cola en vez de solo trasladarse: es una figura maciza que
     * llena el lienzo, y dos unidades hacia afuera ya tocan el borde. El `origin` va en la cola.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(1px) scaleY(0.94)', offset: 0.24 }, { transform: 'translateY(-1.2px) scaleY(1.024)', offset: 0.6 }, { transform: 'translateY(-0.24px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 460, { origin: '12px 20px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    /**
     * El disparo: se comprime el doble que el `default` (2.2 contra 1) y sale con estela.
     * Sin guión que reaccione, todo el efecto vive en la compresión y el rastro.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px) scaleY(1)', offset: 0 }, { transform: 'translateY(2.2px) scaleY(0.86)', offset: 0.24 }, { transform: 'translateY(-2.5px) scaleY(1.056)', offset: 0.6 }, { transform: 'translateY(-0.5px) scaleY(1)', offset: 0.82 }, { transform: 'translateY(0px) scaleY(1)', offset: 1 }], 520, { origin: '12px 20px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 520, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 16 4 4 4-4", opacity: '0' },
  ],
  {
    /** El compás de la familia. El estado que vivía aquí se mudó a `hold`. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 4px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 800, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-6px)', opacity: '0' }, { transform: 'translateY(2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scale(0.8)', opacity: '0.7' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 600, { easing: SPRING_OUT ? 'ease-out' : 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(-6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 500, { easing: SPRING_OUT, delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(-6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 500, { easing: SPRING_OUT, delay: 300, fill: 'backwards' }),
      },
    },
    /**
     * El disparo: doble recorrido que el `default` y con estela.
     * Los dígitos anclan: son el criterio de orden, no parte de la flecha.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 4px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 16 4 4 4-4", opacity: '0' },
  ],
  {
    /** El compás de la familia. El estado que vivía aquí se mudó a `hold`. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 4px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 800, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-6px)', opacity: '0' }, { transform: 'translateY(2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(-6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 500, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(-6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 500, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scale(0.8)', opacity: '0.7' }, { transform: 'scale(1.1)', opacity: '1' }, { transform: 'scale(1)', opacity: '1' }], 600, { easing: SPRING_OUT ? 'ease-out' : 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
    /**
     * El disparo: doble recorrido que el `default` y con estela.
     * Los dígitos anclan: son el criterio de orden, no parte de la flecha.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 4px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 16 4 4 4-4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 4px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 4px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-6px)', opacity: '0' }, { transform: 'translateY(2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(-4px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 500, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(-4px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 500, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 300, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 16 4 4 4-4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 4px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 4px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA. Copiado del hermano que ya lo traía (`arrow-up-a-z` y `arrow-up-0-1`,
     * del port de AnimateIcons); sus gemelos hacia el otro lado se habían quedado sin él.
     * Lo único que cambia al reflejar es de dónde ENTRA la punta: la que apunta hacia abajo entra
     * desde arriba. Las letras conservan su propio sentido de entrada, que ya estaba decidido.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-6px)', opacity: '0' }, { transform: 'translateY(2px)', opacity: '1' }, { transform: 'translateY(0px)', opacity: '1' }], 600, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(6px)', opacity: '0' }, { transform: 'translate(0px, 0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 300, fill: 'backwards' }),
      },
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
    dart: {
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
    // Las dos estelas del `dart`: una por punta, invisibles en reposo.
    { tag: 'path', d: "m16 3 4 4-4 4", opacity: '0' },
    { tag: 'path', d: "m8 21-4-4 4-4", opacity: '0' },
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
    /**
     * Las dos flechas disparan a la vez, cada una hacia su lado. El desfase de 80 ms entre la de
     * arriba y la de abajo es lo que evita que se lea como un bloque que se estira.
     *
     * Cada asta se estira desde el extremo OPUESTO a su punta: la de arriba apunta a la derecha,
     * así que ancla en x=4; la de abajo apunta a la izquierda y ancla en x=20. Intercambiarlos
     * despega el asta de su punta y la flecha se parte por la mitad.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 16, 2.5, 3), 540, { origin: '4px 7px' }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1, 2.5, 3), 540, { delay: 80, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 16, 2.5, 3), 540, { origin: '20px 17px', delay: 80, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateX(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 190, fill: 'backwards' }),
      },
    },
    /**
     * El icono se ENSAMBLA, con el orden que cuenta su historia: en `to-dot` el punto aparece al
     * final porque es el destino, y en `from-dot` aparece primero porque es el origen. El mismo
     * gesto con el orden invertido dice cosas opuestas.
     */
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.1) rotate(-5deg)' }, { transform: 'scale(0.95) rotate(3deg)' }, { transform: 'scale(1) rotate(0deg)' }], 900, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 0, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translateX(-6px)', opacity: '0' }, { transform: 'translateX(2px)', opacity: '1' }, { transform: 'translateX(0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 700, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(6px)', opacity: '0' }, { transform: 'translateX(-2px)', opacity: '1' }, { transform: 'translateX(0px)', opacity: '1' }], 600, { easing: SPRING_OUT, delay: 320, fill: 'backwards' }),
      },
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 8 4-4 4 4", opacity: '0' },
  ],
  {
    /** El compás de la familia. El estado que vivía aquí se mudó a `hold`. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 20px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: doble recorrido que el `default` y con estela.
     * Los dígitos anclan: son el criterio de orden, no parte de la flecha.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 20px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 8 4-4 4 4", opacity: '0' },
  ],
  {
    /** El compás de la familia. El estado que vivía aquí se mudó a `hold`. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 20px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: doble recorrido que el `default` y con estela.
     * Los dígitos anclan: son el criterio de orden, no parte de la flecha.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 20px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 8 4-4 4 4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 20px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 20px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
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
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m3 8 4-4 4 4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia, SOLO sobre la flecha. Las letras y las barras anclan: son el
     * criterio de ordenamiento, no parte de la flecha, y moverlas convierte el gesto en "todo
     * el icono tiembla" — que es justo lo que hacía el estado que ahora vive en `hold`.
     */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 1.5, 1.5), 480),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 1.5, 1.5), 480, { origin: '7px 20px' }),
      },
    },
    hold: {
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
    /**
     * El disparo: el doble de recorrido que el `default` (3 contra 1.5) y con estela detrás.
     * Las letras siguen quietas — lo que se dispara es la flecha, no el criterio de orden.
     */
    dart: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2.5, 3), 540),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 16, 2.5, 3), 540, { origin: '7px 20px' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0.4', offset: 0.5, easing: 'ease-out' }, { transform: 'translateY(-4px)', opacity: '0', offset: 1 }], 540, { easing: 'linear', delay: 110, fill: 'backwards' }),
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
    dart: {
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
    dart: {
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
    dart: {
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
    dart: {
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
    dart: {
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
    dart: {
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
    dart: {
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
    dart: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(4.5px, 4.5px)', opacity: '0', offset: 1 }], 600, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
      root: /* @__PURE__ */ nudgeRoot('translate(0px, 0px)', 'translate(-1.5px, -1.5px)', 'translate(3px, 3px)'),
    },
  });
