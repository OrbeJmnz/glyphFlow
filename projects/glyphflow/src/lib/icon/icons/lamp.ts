// Familia `lamp` del catálogo curado (6 iconos).
//
// Cada una se mueve según CÓMO ESTÁ SUJETA, que aquí no es una decisión estética sino el dato
// que las distingue: la de techo cuelga de un cable y se columpia desde arriba; las de pared
// pivotan en su brazo y hacia el lado que su nombre dice; la de mesa y la de pie no se mueven
// de sitio — están apoyadas — así que lo único que hacen es encender.
//
// Por eso la pantalla es la que late en las apoyadas y la que gira en las colgadas: es la misma
// pieza haciendo dos cosas distintas porque está agarrada de otra forma.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, icon } from '../choreography';

/** De mesa: apoyada, así que solo enciende. La pantalla late desde su boca. */
export const lampIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12v6" },
    {
      tag: 'path',
      d: "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z",
    },
    { tag: 'path', d: "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.07, 1]), 480, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.13)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** De pie: igual, y el poste no se mueve. */
export const lampFloorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 10v12" },
    {
      tag: 'path',
      d: "M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z",
    },
    { tag: 'path', d: "M9 22h6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.07, 1]), 480, { easing: SPRING_OUT, origin: '12px 9px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.13)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** De techo: cuelga de su cable, así que se columpia desde donde está atada. */
export const lampCeilingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v5" },
    { tag: 'path', d: "M14.829 15.998a3 3 0 1 1-5.658 0" },
    {
      tag: 'path',
      d: "M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3.5, -2.5, 0]), 760, { easing: EASE, origin: '12px 2px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3.5, -2.5, 0]), 760, { easing: EASE, origin: '12px 2px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(11.0005deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 2px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(11.0005deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 2px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** De pared: pivota en su brazo y se inclina hacia donde alumbra. */
export const lampWallDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z",
    },
    { tag: 'path', d: "M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M8 6h4a2 2 0 0 1 2 2v5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, -2, 0]), 660, { easing: EASE, origin: '14px 13px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(11deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La misma, mirando arriba. */
export const lampWallUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z",
    },
    { tag: 'path', d: "M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M8 18h4a2 2 0 0 0 2-2v-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2, 0]), 660, { easing: EASE, origin: '14px 11px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-11deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Articulada: el cabezal flexiona sobre el codo del brazo. */
export const lampDeskIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z",
    },
    { tag: 'path', d: "m14.207 4.793-3.414 3.414" },
    { tag: 'path', d: "M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" },
    { tag: 'path', d: "m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 3, 0]), 660, { easing: EASE, origin: '5px 11px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 3, 0]), 660, { easing: EASE, origin: '5px 11px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 11px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);
