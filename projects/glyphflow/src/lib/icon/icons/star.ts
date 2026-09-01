// Familia `star` del catálogo curado (7 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, track, strokeDraw, icon } from '../choreography';
import { starCheckShapes, starHalfShapes, starMinusShapes, starOffShapes, starPlusShapes, starShapes, starXShapes } from '../animated-icons.shapes';

const STAR_SPIN = /* @__PURE__ */ [
  { transform: 'rotate(0deg) scale(1)' },
  { transform: 'rotate(360deg) scale(1.25)' },
  { transform: 'rotate(360deg) scale(1)' },
];

const STAR_TWINKLE = /* @__PURE__ */ scaleSeq([1, 1.35, 0.88, 1.12, 1]);

/** Favorito: gira y crece de un golpe. */
export const starIcon: AnimatedIconDef = /* @__PURE__ */ icon(starShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(360deg) scale(1.25)' },
          { transform: 'rotate(360deg) scale(1)' },
        ],
        1050,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
    /** Chispazo: pulso doble sin girar, como un "me encanta" rápido. */
    twinkle: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)' },
          { transform: 'scale(1.3) rotate(-8deg)' },
          { transform: 'scale(0.95) rotate(4deg)' },
          { transform: 'scale(1.15) rotate(-2deg)' },
          { transform: 'scale(1) rotate(0deg)' },
        ],
        550,
        { origin: 'center' },
      ),
    },
    pulse: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(0.9)', offset: 0.33 }, { transform: 'scale(1.2)', offset: 0.66 }, { transform: 'scale(1)', offset: 1 }], 600, { easing: EASE, origin: 'center' }),
    },
  });

/** Favorito confirmado: el mismo giro de star y la palomita se dibuja de insignia. */
export const starCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(starCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 850 }) },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: EASE, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 450 }) },
    },
  });

/** Media estrella: mismo giro que star, sin insignia. */
export const starHalfIcon: AnimatedIconDef = /* @__PURE__ */ icon(starHalfShapes, {
    default: { root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }) },
    twinkle: { root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: EASE, origin: 'center' }) },
  });

/** Quitar de favoritos: gira y el "-" se dibuja de insignia. */
export const starMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(starMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }) },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: EASE, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }) },
    },
  });

/** Ya no es favorito: se fragmenta y la diagonal la cruza al final. */
export const starOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(starOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 200 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 460 }),
      },
    },
    quick: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 110 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 250, easing: SPRING_OUT }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es su proyección sobre el eje del corte, no un número a ojo.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 140 }),
      },
    },
  });

/** Agregar a favoritos: gira y el "+" se dibuja de insignia, en dos trazos. */
export const starPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(starPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
      },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }),
      },
    },
  });

/** Cancelar favorito: gira y la equis se dibuja de insignia. */
export const starXIcon: AnimatedIconDef = /* @__PURE__ */ icon(starXShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 930 }),
      },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: EASE, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 530 }),
      },
    },
  });
