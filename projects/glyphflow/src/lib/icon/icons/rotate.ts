// Familia `rotate` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, track, strokeDraw, icon } from '../choreography';
import { rotateCcwClockShapes, rotateCcwShapes, rotateCwShapes } from '../animated-icons.shapes';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.

/** Una elipse se aplasta y vuelve: puesta contra su pareja, se lee como un giro en perspectiva. */
const FLATTEN_X = /* @__PURE__ */ [
  { transform: 'scaleX(1)' },
  { transform: 'scaleX(0.35)' },
  { transform: 'scaleX(1)' },
];

const FLATTEN_Y = /* @__PURE__ */ [
  { transform: 'scaleY(1)' },
  { transform: 'scaleY(0.35)' },
  { transform: 'scaleY(1)' },
];

/** Una vuelta entera: rota todo y termina donde empezó. */
const FULL_TURN_CW = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }];
const FULL_TURN_CCW = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }];

export const rotateCcwKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v6" },
    { tag: 'path', d: "M12 9h2" },
    { tag: 'path', d: "M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" },
    { tag: 'path', d: "M3 3v5h5" },
    { tag: 'circle', cx: 12, cy: 15, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-40deg)' }], 450, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-40deg)' }], 450, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Historial: todo gira en REVERSA — es el gesto de rebobinar.
 *
 * Se llamaba `history` hasta que Lucide lo renombró a `rotate-ccw-clock`. Es un renombre puro:
 * la geometría es byte por byte la misma (verificado contra lucide-static@1.31.0), y Lucide sigue
 * publicando `history.svg` como alias deprecado. El nombre viejo vive en ICON_ALIASES, así que
 * `name="history"` sigue funcionando para quien ya lo escribía así.
 */
export const rotateCcwClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(rotateCcwClockShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -22, 0]), 700, { origin: 'center' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -70, 0]), 800, { origin: '12px 12px' }) },
    },
  });

/** Deshacer: gira al revés que `refresh-cw`. */
export const rotateCcwIcon: AnimatedIconDef = /* @__PURE__ */ icon(rotateCcwShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -360]), 800, { easing: SPRING_OUT, origin: 'center' }),
    },
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `rotate-cw`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  });

export const rotateCwIcon: AnimatedIconDef = /* @__PURE__ */ icon(rotateCwShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 800, { easing: SPRING_OUT, origin: 'center' }) },
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `rotate-ccw`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

const TURN_CW_FULL = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }];

/** Las dos elipses se aplastan alternadas: así se lee un giro en perspectiva, que es lo que el icono nombra. */
export const rotate3dIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15.194 13.707 3.814 1.86-1.86 3.814" },
    { tag: 'path', d: "M16.47214 7.52786 A 5 10 0 1 0 13 21.79796" },
    { tag: 'path', d: "M21.79796 11 A 10 5 0 1 0 19 15.57071" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        1: /* @__PURE__ */ track(FLATTEN_X, 800, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(FLATTEN_Y, 800, { easing: EASE, origin: '12px 12px', delay: 200, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo hacia el otro lado. */
export const rotateCcwSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 9V7a2 2 0 0 0-2-2h-6" },
    { tag: 'path', d: "m15 2-3 3 3 3" },
    { tag: 'path', d: "M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(FULL_TURN_CCW, 800, { easing: SPRING_OUT, origin: 'center' }),
    },
  },
);

export const rotateCwFadingClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3a9.75 9.75 0 0 1 6.74 2.74" },
    { tag: 'path', d: "M18.74 5.74 21 8" },
    { tag: 'path', d: "M21 8V3" },
    { tag: 'path', d: "M7.5 19.794c-6-3.464-6-12.124 0-15.588" },
    { tag: 'path', d: "M7.5 4.206A9 9 0 0 1 12 3" },
    { tag: 'path', d: "M12 7v5l4 2" },
    { tag: 'path', d: "M14 20.775A9 9 0 0 1 12 21" },
    { tag: 'path', d: "M19 17.656a9 9 0 0 1-1.5 1.456" },
    { tag: 'path', d: "M21 12a9 9 0 0 1-.228 2" },
    { tag: 'path', d: "M21 8h-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 450, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 720, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 560, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track(TURN_CW_FULL, 1000, { easing: EASE, origin: '12px 12px', delay: 200, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 270, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 640, fill: 'backwards' }),
      },
    },
  },
);

/** Gira entero una vuelta completa y termina donde empezó. */
export const rotateCwSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5H6a2 2 0 0 0-2 2v3" },
    { tag: 'path', d: "m9 8 3-3-3-3" },
    { tag: 'path', d: "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(FULL_TURN_CW, 800, { easing: SPRING_OUT, origin: 'center' }),
    },
  },
);
