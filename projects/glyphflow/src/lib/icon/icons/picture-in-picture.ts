// Familia `picture-in-picture` del catálogo curado (2 iconos).
//
// El gesto es el que da nombre al icono: la ventana pequeña SE METE en su esquina. Va sola —la
// grande no se mueve, porque lo que hace un picture-in-picture es justamente no tocar el vídeo
// principal— y entra en diagonal, que es la dirección de la esquina a la que va.
//
// Sostenido, la ventanita crece: es la que tiene el foco.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

/** Entra en diagonal a su esquina. La flecha de salida marca el hueco que deja. */
export const pictureInPictureIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 10h6V4" },
    { tag: 'path', d: "m2 4 6 6" },
    { tag: 'path', d: "M21 10V7a2 2 0 0 0-2-2h-7" },
    { tag: 'path', d: "M3 14v2a2 2 0 0 0 2 2h3" },
    { tag: 'rect', x: 12, y: 14, width: 10, height: 7, rx: 1 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(
          /* @__PURE__ */ [
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          520,
          { easing: SPRING_OUT },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 160 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 160 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.14)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo sin flecha: aquí solo se ve entrar la ventana, y por eso entra más despacio. */
export const pictureInPicture2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4",
    },
    { tag: 'rect', width: 10, height: 7, x: 12, y: 13, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          /* @__PURE__ */ [
            { transform: 'translate(-1.4px, -1.4px)' },
            { transform: 'translate(0, 0)' },
          ],
          620,
          { easing: SPRING_OUT },
        ),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.16)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 20px' }),
      },
      reverseOnLeave: true,
    },
  },
);
