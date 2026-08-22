// Familia `rotate` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, rotateSeq, track, icon } from '../choreography';
import { rotateCcwClockShapes, rotateCcwShapes, rotateCwShapes } from '../animated-icons.shapes';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
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
  });

export const rotateCwIcon: AnimatedIconDef = /* @__PURE__ */ icon(rotateCwShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 800, { easing: SPRING_OUT, origin: 'center' }) },
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  });
