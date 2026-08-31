// Familia `battery` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
/** Sin carga: tres parpadeos. El cuerpo y el borne van al unísono, así late la batería entera. */
const BATTERY_BLINK = /* @__PURE__ */ [
  { opacity: 1 },
  { opacity: 0 },
  { opacity: 1 },
  { opacity: 0 },
  { opacity: 1 },
  { opacity: 0 },
  { opacity: 1 },
];

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Un cuarto de vuelta y de regreso. */
const E2_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(90deg)' },
  { transform: 'rotate(0deg)' },
];

/** Parpadea: un indicador encendido, un aviso. */
const E2_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/* ── Variante `pulse` ─────────────────────────────────────────────────────────────────────
 *
 * Port del gesto de AnimateIcons (Avijit Dey, MIT — ver NOTICE). El original existe
 * solo para `battery-full`; el resto de la familia es adaptación, no port.
 *
 * Tres cosas que NO son cosméticas y que ya se midieron con el banco de cotejo:
 *
 * 1. El easing va POR KEYFRAME, no en `options`. Framer aplica su curva entre cada par de
 *    keyframes; metida en `options`, WAAPI la aplica a la iteración COMPLETA y corre los
 *    keyframes intermedios de lugar — medido: hasta 0.6 unidades de viewBox de desvío.
 * 2. `origin` explícito en cada figura. El motor fija `transform-box: view-box`, así que sin
 *    esto pivotarían todas sobre el centro del viewBox en vez de sobre sí mismas.
 * 3. El cuarto keyframe cierra el ciclo. El original deja las barras en `0.8` sostenido hasta
 *    que sale el puntero, y glyphflow no tiene esa transición de salida (`reverseOnLeave`
 *    vuelve al PRIMER keyframe, que aquí es `0.4` — dejaría el icono apagado). Los offsets
 *    van a mano para que los primeros 1000ms sigan siendo el gesto original clavado y el
 *    retorno viva en los 150 extra. Cuesta el relevo de pose (`conRelevo` corta con offsets),
 *    igual que en el original.
 */

/** Barra de carga que late y se estira sobre su propio centro. */
const PULSE_BAR = (delay: number, origin: string) =>
  /* @__PURE__ */ track(
    [
      { opacity: '0.4', transform: 'scaleY(0.6)', offset: 0, easing: EASE },
      { opacity: '1', transform: 'scaleY(1)', offset: 0.4348, easing: EASE },
      { opacity: '0.8', transform: 'scaleY(0.8)', offset: 0.8696, easing: EASE },
      { opacity: '1', transform: 'scaleY(1)', offset: 1 },
    ],
    1150,
    { easing: 'linear', delay, origin },
  );

/**
 * Símbolo de estado — el rayo, el signo, la cruz. Late completo en vez de estirarse: `scaleY`
 * sobre un trazo horizontal (`M7 12h6`) no se ve, y al 60% un símbolo se rompe en vez de latir.
 */
const PULSE_MARK = (origin: string) =>
  /* @__PURE__ */ track(
    [
      { opacity: '0.4', transform: 'scale(0.85)', offset: 0, easing: EASE },
      { opacity: '1', transform: 'scale(1.06)', offset: 0.4348, easing: EASE },
      { opacity: '0.8', transform: 'scale(0.95)', offset: 0.8696, easing: EASE },
      { opacity: '1', transform: 'scale(1)', offset: 1 },
    ],
    1150,
    { easing: 'linear', origin },
  );

/** Carcasa y borne: respiran sin moverse. Ya cierra en 1, no necesita keyframe extra. */
const PULSE_SHELL = () =>
  /* @__PURE__ */ track(
    [
      { opacity: '0.6', easing: EASE },
      { opacity: '1', easing: EASE },
      { opacity: '0.7', easing: EASE },
      { opacity: '1' },
    ],
    1200,
    { easing: 'linear' },
  );

/**
 * El cuerpo entero se menea. Va en el `<svg>`, donde el motor NO toca `transform-box`, así que
 * pivota sobre el centro de la caja igual que en el original.
 */
const PULSE_ROOT = () =>
  /* @__PURE__ */ track(
    [
      { transform: 'rotate(0deg) scale(1)', easing: EASE },
      { transform: 'rotate(-2deg) scale(1.05)', easing: EASE },
      { transform: 'rotate(2deg) scale(0.95)', easing: EASE },
      { transform: 'rotate(0deg) scale(1)' },
    ],
    1500,
    { easing: 'linear' },
  );

export const batteryChargingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 7-3 5h4l-3 5" },
    { tag: 'path', d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.1 }, { opacity: 1 }], 500),
      },
    },
    // Sin barras: el rayo es lo que indica energía, así que late él.
    pulse: {
      root: /* @__PURE__ */ PULSE_ROOT(),
      shapes: {
        0: /* @__PURE__ */ PULSE_MARK('10px 12px'),
        1: /* @__PURE__ */ PULSE_SHELL(),
        2: /* @__PURE__ */ PULSE_SHELL(),
        3: /* @__PURE__ */ PULSE_SHELL(),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryFullIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10v4" },
    { tag: 'path', d: "M14 10v4" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 10v4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 520, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
    // El escalonado del original va por orden de DOM, que no es el orden visual: arranca por la
    // barra del medio (M10), sigue por la derecha (M14) y cierra por la izquierda (M6). Se
    // respeta tal cual — "arreglarlo" sería otro gesto.
    pulse: {
      root: /* @__PURE__ */ PULSE_ROOT(),
      shapes: {
        0: /* @__PURE__ */ PULSE_BAR(0, '10px 12px'),
        1: /* @__PURE__ */ PULSE_BAR(250, '14px 12px'),
        3: /* @__PURE__ */ PULSE_BAR(500, '6px 12px'),
        2: /* @__PURE__ */ PULSE_SHELL(),
        4: /* @__PURE__ */ PULSE_SHELL(),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryLowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 14v-4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
    // Una sola barra: no hay cascada que escalonar.
    pulse: {
      root: /* @__PURE__ */ PULSE_ROOT(),
      shapes: {
        1: /* @__PURE__ */ PULSE_BAR(0, '6px 12px'),
        0: /* @__PURE__ */ PULSE_SHELL(),
        2: /* @__PURE__ */ PULSE_SHELL(),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryMediumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 14v-4" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 14v-4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
    // Dos barras: se conserva el paso de 250ms del original, arrancando por la del medio.
    pulse: {
      root: /* @__PURE__ */ PULSE_ROOT(),
      shapes: {
        0: /* @__PURE__ */ PULSE_BAR(0, '10px 12px'),
        2: /* @__PURE__ */ PULSE_BAR(250, '6px 12px'),
        1: /* @__PURE__ */ PULSE_SHELL(),
        3: /* @__PURE__ */ PULSE_SHELL(),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 17h.01" },
    { tag: 'path', d: "M10 7v6" },
    { tag: 'path', d: "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 500),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 500),
      },
    },
    // El signo late completo — palo y punto al unísono, sin desfase: son un solo símbolo, y
    // escalonarlos lo partiría en dos cosas que se mueven aparte.
    pulse: {
      root: /* @__PURE__ */ PULSE_ROOT(),
      shapes: {
        1: /* @__PURE__ */ PULSE_MARK('10px 10px'),
        0: /* @__PURE__ */ PULSE_MARK('10px 17px'),
        2: /* @__PURE__ */ PULSE_SHELL(),
        3: /* @__PURE__ */ PULSE_SHELL(),
        4: /* @__PURE__ */ PULSE_SHELL(),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M 22 14 L 22 10" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BATTERY_BLINK, 900, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(BATTERY_BLINK, 900, { easing: 'ease-in-out' }),
      },
    },
    // Vacía: no hay carga que mostrar, así que queda el meneo y el respiro de la carcasa. Es el
    // mismo gesto sin cascada, no un gesto distinto.
    pulse: {
      root: /* @__PURE__ */ PULSE_ROOT(),
      shapes: {
        0: /* @__PURE__ */ PULSE_SHELL(),
        1: /* @__PURE__ */ PULSE_SHELL(),
      },
    },
  },
);

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** La cruz gira y el borne parpadea: está cargando. */
export const batteryPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 9v6" },
    { tag: 'path', d: "M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M7 12h6" },
    { tag: 'path', d: "M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_TURN, 600, { easing: EASE, origin: '10px 12px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_BLINK, 700, { easing: EASE }),
        3: /* @__PURE__ */ track(E2_TURN, 600, { easing: EASE, origin: '10px 12px', delay: 120, fill: 'backwards' }),
      },
    },
    // La cruz late entera. Los dos trazos comparten pivote (10,12), que es su cruce.
    pulse: {
      root: /* @__PURE__ */ PULSE_ROOT(),
      shapes: {
        0: /* @__PURE__ */ PULSE_MARK('10px 12px'),
        3: /* @__PURE__ */ PULSE_MARK('10px 12px'),
        1: /* @__PURE__ */ PULSE_SHELL(),
        2: /* @__PURE__ */ PULSE_SHELL(),
        4: /* @__PURE__ */ PULSE_SHELL(),
      },
    },
  },
);
