// Familia `package` del catálogo curado (7 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, moveYSeq, track, strokeDraw, icon } from '../choreography';
import { packageCheckShapes, packageMinusShapes, packageOpenShapes, packagePlusShapes, packageSearchShapes, packageShapes, packageXShapes } from '../animated-icons.shapes';

const PACKAGE_BOUNCE = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2.5, 0]), 550, {
  easing: SPRING_OUT,
});

const PACKAGE_DROP = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -6, 1, 0]), 480, {
  easing: EASE,
});

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
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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
    wide: {
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
    },
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
