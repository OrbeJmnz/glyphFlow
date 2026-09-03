// Familia `package` del catálogo curado (7 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef, IconChoreography } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, moveYSeq, track, strokeDraw, icon } from '../choreography';
import { packageCheckShapes, packageMinusShapes, packageOpenShapes, packagePlusShapes, packageSearchShapes, packageShapes, packageXShapes } from '../animated-icons.shapes';

const PACKAGE_BOUNCE = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2.5, 0]), 550, {
  easing: SPRING_OUT,
});

/**
 * Cae DESDE ARRIBA y aterriza aplastándose un poco.
 *
 * Antes era `moveYSeq([0, -6, 1, 0])`: el mismo gesto que `PACKAGE_BOUNCE` con más amplitud —los
 * dos SUBÍAN desde el reposo— y a 24 píxeles la diferencia entre 2.5 y 6 no se lee como otra
 * animación, se lee como la misma mal calibrada. Un `drop` tiene que empezar fuera de su sitio.
 */
const PACKAGE_DROP = /* @__PURE__ */ track(
  [
    { transform: 'translateY(-9px) scaleY(1)', opacity: '0' },
    { transform: 'translateY(0px) scaleY(0.88)', opacity: '1' },
    { transform: 'translateY(0px) scaleY(1)', opacity: '1' },
  ],
  560,
  { easing: EASE, origin: '12px 21px' },
);

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Late una vez. */
const E2_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Se despliega desde su borde de arriba. */
const E2_UNFOLD_Y = /* @__PURE__ */ [{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }];

/** Y desde el borde izquierdo: un pergamino que se desenrolla, una cinta que se estira. */
const E2_UNFOLD_X = /* @__PURE__ */ [{ transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }];

/** Paquete que aterriza. */
export const packageIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2.5, 0]), 550, { easing: SPRING_OUT }),
    },
  });

/** Paquete confirmado: el mismo bounce de package y la palomita se dibuja de insignia. */
export const packageCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageCheckShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 400 }) },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 330 }) },
    },
    // La marca es la PALOMITA, figura 1. La 0 es la costura vertical de la caja — parte de la
    // base, no de la marca. Mismo fallo que traía `user-check`: índice válido, figura equivocada.
    mark: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Quitar paquete: bounce y el "-" se dibuja de insignia. */
export const packageMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageMinusShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }) },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }) },
    },
  });

/** Paquete abierto: las dos solapas se abren, el cuerpo se queda quieto. */
const PACKAGE_OPEN_BOUNCE: IconChoreography = /* @__PURE__ */ {
      root: PACKAGE_DROP,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.22, 1]), 480, {
          delay: 60,
          easing: EASE,
          origin: '12px 8px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.22, 1]), 480, {
          delay: 140,
          easing: EASE,
          origin: '12px 8px',
        }),
      },
    };

export const packageOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageOpenShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 450, {
          delay: 100,
          origin: '12px 8px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 450, {
          delay: 180,
          origin: '12px 8px',
        }),
      },
    },
    bounce: PACKAGE_OPEN_BOUNCE,
    /** @deprecated Se llamaba `wide`. El alias sale en la v3. */
    wide: PACKAGE_OPEN_BOUNCE,
  });

/** Agregar paquete: bounce y el "+" se dibuja de insignia, en dos trazos. */
export const packagePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(packagePlusShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }),
      },
    },
  });

/** Cancelar paquete: bounce y la equis se dibuja de insignia. */
export const packageXIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageXShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 480 }),
      },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 410 }),
      },
    },
  });

/** Buscar en paquetería: la lupa late sobre la caja. */
export const packageSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageSearchShapes, {
    default: { shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.2, 1]), 500, { origin: '18.5px 16.5px' }) } },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Las dos cintas se despliegan y cierran la caja. */
export const package2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3v6" },
    {
      tag: 'path',
      d: "M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z",
    },
    { tag: 'path', d: "M3.054 9.013h17.893" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_UNFOLD_Y, 460, { easing: SPRING_OUT, origin: '12px 3px', delay: 280, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E2_UNFOLD_X, 460, { easing: SPRING_OUT, origin: '3px 9px', delay: 160, fill: 'backwards' }),
      },
    },
  },
);
