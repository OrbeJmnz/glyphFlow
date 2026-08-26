// Familia `gamepad` del catálogo curado (3 iconos).
//
// La cruceta se APRIETA y los botones se encienden después. El orden importa: primero la mano
// izquierda, luego la derecha, que es como se juega.
//
// `gamepad-directional` es solo cruceta, así que ahí se prueban las cuatro direcciones en
// círculo — cada brazo se hunde hacia el centro por turnos.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

/** Apretar es hundirse, no encogerse: por eso el pivote va en el centro de la cruceta. */
const APRIETA = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(0.82)' }, { transform: 'scale(1)' }];
/** Y un botón se enciende de golpe. */
const BOTON = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }];

/** Cruceta apretada, botones después. */
export const gamepadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 6, y1: 12, x2: 10, y2: 12 },
    { tag: 'line', x1: 8, y1: 10, x2: 8, y2: 14 },
    { tag: 'line', x1: 15, y1: 13, x2: 15.01, y2: 13 },
    { tag: 'line', x1: 18, y1: 11, x2: 18.01, y2: 11 },
    { tag: 'rect', x: 2, y: 6, width: 20, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(APRIETA, 420, { easing: EASE, origin: '8px 12px' }),
        1: /* @__PURE__ */ track(APRIETA, 420, { easing: EASE, origin: '8px 12px' }),
        2: /* @__PURE__ */ track(BOTON, 380, { easing: SPRING_OUT, delay: 180, origin: '15px 13px' }),
        3: /* @__PURE__ */ track(BOTON, 380, { easing: SPRING_OUT, delay: 280, origin: '18px 11px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo en el mando de dos asas. */
export const gamepad2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 6, y1: 11, x2: 10, y2: 11 },
    { tag: 'line', x1: 8, y1: 9, x2: 8, y2: 13 },
    { tag: 'line', x1: 15, y1: 12, x2: 15.01, y2: 12 },
    { tag: 'line', x1: 18, y1: 10, x2: 18.01, y2: 10 },
    {
      tag: 'path',
      d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(APRIETA, 420, { easing: EASE, origin: '8px 11px' }),
        1: /* @__PURE__ */ track(APRIETA, 420, { easing: EASE, origin: '8px 11px' }),
        2: /* @__PURE__ */ track(BOTON, 380, { easing: SPRING_OUT, delay: 180, origin: '15px 12px' }),
        3: /* @__PURE__ */ track(BOTON, 380, { easing: SPRING_OUT, delay: 280, origin: '18px 10px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 11px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las cuatro direcciones, por turnos y en círculo: arriba, derecha, abajo, izquierda. */
export const gamepadDirectionalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z",
    },
    {
      tag: 'path',
      d: "M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z",
    },
    {
      tag: 'path',
      d: "M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z",
    },
    {
      tag: 'path',
      d: "M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, 0.9px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 400, { easing: EASE }),
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-0.9px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 400, { easing: EASE, delay: 110 }),
        0: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -0.9px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 400, { easing: EASE, delay: 220 }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0.9px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 400, { easing: EASE, delay: 330 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
