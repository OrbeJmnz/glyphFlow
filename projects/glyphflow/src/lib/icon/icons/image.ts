// Familia `image` del catálogo curado (8 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { puntaCompas } from './_shared';
import { EASE, SPRING_OUT, track, burst, strokeDraw, icon } from '../choreography';
import { imageDownShapes, imageMinusShapes, imageOffShapes, imagePlayShapes, imagePlusShapes, imageShapes, imageUpShapes, imageUpscaleShapes } from '../animated-icons.shapes';

const IMAGE_UPSCALE_FRAME = /* @__PURE__ */ [
  { transform: 'scale(0.8)', opacity: '0' },
  { transform: 'scale(1)', opacity: '1' },
];

/** Foto: sale el sol y luego el paisaje. */
export const imageIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { delay: 220 }),
      },
    },
  });

/** Sin imagen: el tajo cae al final. */
export const imageOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageOffShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 220 }) } },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

export const imageDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageDownShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1, 1.5), 560, { delay: 220, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 1, 1.5), 560, { delay: 220, fill: 'backwards' }),
      },
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const imageMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageMinusShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
  });

/** El triángulo de play aparece de golpe, como una insignia — no es una línea que se dibuje. */
export const imagePlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(imagePlayShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 380 }),
      },
    },
  });

export const imagePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(imagePlusShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { delay: 220 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
  });

export const imageUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageUpShapes, {
  default: {
    reverseOnLeave: true,
    shapes: {
      3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100, fill: 'both' }),
      2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220, fill: 'both' }),
      1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340, fill: 'both' }),
    },
  },
  active: {
    shapes: {
      0: /* @__PURE__ */ track(
        [{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }],
        300,
        { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
      ),
      1: /* @__PURE__ */ track(
        [{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }],
        300,
        { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
      ),
      2: /* @__PURE__ */ track(
        [{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }],
        300,
        { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' },
      ),
    },
    reverseOnLeave: true,
  },
});

/** El recorte se asienta y las 4 esquinas del marco se dibujan a la vez; luego, las flechas. */
export const imageUpscaleIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageUpscaleShapes, {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(IMAGE_UPSCALE_FRAME, 380, { easing: SPRING_OUT, origin: '8px 16px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
      },
    },
  });
