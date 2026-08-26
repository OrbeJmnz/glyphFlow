// Familia `weight` del catálogo curado (2 iconos).
//
// Una pesa no se mueve: PESA. Así que el gesto es lo que el peso le hace a lo que está debajo —el
// cuerpo se asienta y se ensancha un poco, la anilla se hunde contra él— y no un balanceo, que es
// lo que haría algo ligero colgando.
//
// `weight-tilde` añade la tilde de aproximación, y esa sí es lo contrario: no pesa, oscila.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveYSeq, track, icon } from '../choreography';

/** Se asienta: el cuerpo cede a lo ancho y la anilla se hunde contra él. */
export const weightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 5, r: 3 },
    {
      tag: 'path',
      d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          /* @__PURE__ */ [
            { transform: 'scale(1)' },
            { transform: 'scale(1.03, 0.97)' },
            { transform: 'scale(1)' },
          ],
          560,
          { easing: EASE, origin: '12px 21px' },
        ),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 560, { easing: EASE }),
      },
    },
    // Sostenido: el peso puesto. Se queda achatado, que es lo que hace algo pesado apoyado.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05, 0.94)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 21px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo, pero la tilde no pesa: oscila. Y por eso llega después y se mueve al revés. */
export const weightTildeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z",
    },
    { tag: 'path', d: "M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0" },
    { tag: 'circle', cx: 12, cy: 5, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          /* @__PURE__ */ [
            { transform: 'scale(1)' },
            { transform: 'scale(1.03, 0.97)' },
            { transform: 'scale(1)' },
          ],
          560,
          { easing: EASE, origin: '12px 21px' },
        ),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 560, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(0.8px)' }, { transform: 'translateX(0)' }], 720, { easing: EASE, delay: 140 }),
      },
    },
    // Sostenido: la pesa achatada y la tilde corrida, cada una en lo suyo.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05, 0.94)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 21px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
      },
      reverseOnLeave: true,
    },
  },
);
