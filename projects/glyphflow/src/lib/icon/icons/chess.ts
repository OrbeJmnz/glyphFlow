// Familia `chess` del catálogo curado (6 iconos).
//
// Cada pieza se mueve COMO SE MUEVE en el tablero: el caballo traza su L, la torre va en línea
// recta, el alfil en diagonal, la dama lejos, el rey una casilla y el peón una y solo hacia
// adelante. No hubo que inventar seis gestos — las reglas ya estaban escritas.
//
// La peana (figura 0) no se mueve en ninguna: es la casilla, no la pieza. Lo que viaja es el
// cuerpo, igual que cuando levantas la pieza del tablero. Y las que en el ajedrez se levantan
// para moverse lo hacen aquí también; la torre y el peón, que se deslizan, no.
//
// El recorrido vertical se queda corto a propósito: estas figuras tocan y=2 y y=22, así que
// hacia arriba y abajo solo hay 1 de margen. El horizontal, con 2 de margen, es el que carga.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, icon } from '../choreography';

/**
 * La dama es la única que no puede enseñar su alcance moviéndose: sus tres puntas de corona
 * tocan x=2 y x=22, o sea los dos bordes del lienzo. Así que enseña lo otro que solo ella
 * tiene — la corona, que se abre punta por punta — y el recorrido se queda en lo que cabe.
 */
const SUBE = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(0.6px)', offset: 0.3 },
  { transform: 'translateY(-0.8px)', offset: 0.68 },
  { transform: 'translateY(0)', offset: 1 },
];
const CORONA = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }, { transform: 'scale(1)' }];

/** Un paso, y a donde quiera: se levanta y se mueve una casilla. */
export const chessKingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" },
    {
      tag: 'path',
      d: "m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1",
    },
    { tag: 'path', d: "M10 4h4" },
    { tag: 'path', d: "M12 2v6.818" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -0.8px)', offset: 0.3 },
          { transform: 'translate(1.4px, -0.8px)', offset: 0.62 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 640, { easing: EASE }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -0.8px)', offset: 0.3 },
          { transform: 'translate(1.4px, -0.8px)', offset: 0.62 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 640, { easing: EASE }),
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -0.8px)', offset: 0.3 },
          { transform: 'translate(1.4px, -0.8px)', offset: 0.62 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 640, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La que más alcance tiene: mismo levantar, mucho más recorrido. */
export const chessQueenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" },
    { tag: 'path', d: "m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402" },
    { tag: 'path', d: "m20 9-3 9" },
    { tag: 'path', d: "m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34" },
    { tag: 'path', d: "M7 18 4 9" },
    { tag: 'circle', cx: 12, cy: 4, r: 2 },
    { tag: 'circle', cx: 20, cy: 7, r: 2 },
    { tag: 'circle', cx: 4, cy: 7, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(SUBE, 600, { easing: EASE }),
        2: /* @__PURE__ */ track(SUBE, 600, { easing: EASE }),
        3: /* @__PURE__ */ track(SUBE, 600, { easing: EASE }),
        4: /* @__PURE__ */ track(SUBE, 600, { easing: EASE }),
        5: /* @__PURE__ */ track(CORONA, 460, { easing: SPRING_OUT, delay: 120, origin: '12px 4px' }),
        7: /* @__PURE__ */ track(CORONA, 460, { easing: SPRING_OUT, delay: 200, origin: '4px 7px' }),
        6: /* @__PURE__ */ track(CORONA, 460, { easing: SPRING_OUT, delay: 280, origin: '20px 7px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 4px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '4px 7px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '20px 7px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** En línea recta y sin levantarse: la torre no salta. */
export const chessRookIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" },
    { tag: 'path', d: "M10 2v2" },
    { tag: 'path', d: "M14 2v2" },
    { tag: 'path', d: "m17 18-1-9" },
    { tag: 'path', d: "M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2" },
    { tag: 'path', d: "M6 4h12" },
    { tag: 'path', d: "m7 18 1-9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-2.4px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-2.4px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-2.4px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-2.4px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        5: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-2.4px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        6: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-2.4px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Siempre en diagonal. */
export const chessBishopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" },
    {
      tag: 'path',
      d: "M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18",
    },
    { tag: 'path', d: "m16 7-2.5 2.5" },
    { tag: 'path', d: "M9 2h6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-1.8px, -0.9px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 600, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-1.8px, -0.9px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 600, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-1.8px, -0.9px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 600, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Su L, que es lo único que hace distinto a todos los demás — y la única que salta. */
export const chessKnightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" },
    {
      tag: 'path',
      d: "M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456",
    },
    { tag: 'path', d: "m15 5 1.425-1.425" },
    { tag: 'path', d: "m17 8 1.53-1.53" },
    { tag: 'path', d: "M9.713 12.185 7 18" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.28 },
          { transform: 'translate(1.8px, -1px)', offset: 0.6 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 680, { easing: EASE }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.28 },
          { transform: 'translate(1.8px, -1px)', offset: 0.6 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 680, { easing: EASE }),
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.28 },
          { transform: 'translate(1.8px, -1px)', offset: 0.6 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 680, { easing: EASE }),
        4: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.28 },
          { transform: 'translate(1.8px, -1px)', offset: 0.6 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 680, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Una casilla, y solo hacia adelante. */
export const chessPawnIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" },
    { tag: 'path', d: "m14.5 10 1.5 8" },
    { tag: 'path', d: "M7 10h10" },
    { tag: 'path', d: "m8 18 1.5-8" },
    { tag: 'circle', cx: 12, cy: 6, r: 4 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -1px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
