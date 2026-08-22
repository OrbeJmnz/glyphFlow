// Familia `mouse` del catálogo curado (9 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, moveYSeq, track, burst, strokeDraw, icon } from '../choreography';
import { mouseLeftShapes, mouseOffShapes, mousePointer2OffShapes, mousePointer2Shapes, mousePointerBanShapes, mousePointerClickShapes, mousePointerShapes, mouseRightShapes, mouseShapes } from '../animated-icons.shapes';

const CURSOR_PRESS = /* @__PURE__ */ scaleSeq([1, 0.85, 1]);

// Deriva orgánica del cursor tras el hundimiento, con dos "clics" — rebotes de escala cortos y
// visibles pero rápidos — mientras se mueve. offsets absolutos sobre una duración larga (3400ms):
// simula el gesto de alguien que suelta el mouse y sigue clicando sin querer mientras piensa.
const CURSOR_WANDER_CLICK = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(0.85)', offset: 0.06 },
  { transform: 'scale(1) translate(0, 0)', offset: 0.12 },
  { transform: 'translate(-2px, 1.5px) scale(1)', offset: 0.3 },
  { transform: 'translate(-2px, 1.5px) scale(1)', offset: 0.42 },
  { transform: 'translate(-2px, 1.5px) scale(0.8)', offset: 0.445 },
  { transform: 'translate(-2px, 1.5px) scale(1)', offset: 0.47 },
  { transform: 'translate(1.5px, 3px) scale(1)', offset: 0.6 },
  { transform: 'translate(3px, -1px) scale(1)', offset: 0.75 },
  { transform: 'translate(3px, -1px) scale(1)', offset: 0.8 },
  { transform: 'translate(3px, -1px) scale(0.8)', offset: 0.825 },
  { transform: 'translate(3px, -1px) scale(1)', offset: 0.85 },
  { transform: 'translate(-1px, -2px) scale(1)', offset: 0.92 },
  { transform: 'translate(0, 0) scale(1)', offset: 1 },
];

// Misma ruta que CURSOR_WANDER_CLICK, solo posición — para piezas que deben seguir al cursor
// pegadas (la colita, la insignia de "prohibido") sin clicar ellas mismas.
const CURSOR_WANDER_TRACK = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 0)', offset: 0.12 },
  { transform: 'translate(-2px, 1.5px)', offset: 0.3 },
  { transform: 'translate(-2px, 1.5px)', offset: 0.47 },
  { transform: 'translate(1.5px, 3px)', offset: 0.6 },
  { transform: 'translate(3px, -1px)', offset: 0.8 },
  { transform: 'translate(3px, -1px)', offset: 0.85 },
  { transform: 'translate(-1px, -2px)', offset: 0.92 },
  { transform: 'translate(0, 0)', offset: 1 },
];

const MOUSE_PRESS = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 420, { easing: SPRING_OUT });

// Después del hundimiento, el mouse deriva solo — fluido y lento, como reposando sobre el escritorio.
// `ease-in-out` a propósito, no un resorte: un rebote aquí se vería mecánico, no orgánico.
const MOUSE_WANDER = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 1.5px)', offset: 0.06 },
  { transform: 'translate(0, 0)', offset: 0.13 },
  { transform: 'translate(-2px, 1.5px)', offset: 0.35 },
  { transform: 'translate(1.5px, 3px)', offset: 0.58 },
  { transform: 'translate(3px, -1px)', offset: 0.78 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Clic: el cursor se hunde y las chispas salen DESPUÉS del golpe. Si salen juntas, no es clic. */
export const mousePointerClickIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointerClickShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.85, 1]), 400, { origin: '10px 10px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 240 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 280 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 320 }),
      },
    },
  });

/** Mismo hundimiento del cursor en `mouse-pointer-click`; la colita se dibuja después. */
export const mousePointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointerShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CURSOR_PRESS, 400, { origin: '10px 10px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
    /** Igual que el default; al terminar, el cursor deriva y "clica" dos veces al pasar. */
    wander: {
      shapes: {
        1: /* @__PURE__ */ track(CURSOR_WANDER_CLICK, 3400, { origin: '10px 10px' }),
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0.088 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0, 0)', offset: 0.153 },
            ...CURSOR_WANDER_TRACK.filter((k) => k.offset >= 0.3),
          ],
          3400,
        ),
      },
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(0, -4px)', offset: 0.25 }, { transform: 'translate(-3px, 0)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  });

/** Una sola figura: el cursor se hunde igual que en `mouse-pointer-click`, sin chispas. */
export const mousePointer2Icon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointer2Shapes, {
    default: {
      shapes: { 0: /* @__PURE__ */ track(CURSOR_PRESS, 400, { origin: '10px 10px' }) },
    },
    wander: {
      shapes: { 0: /* @__PURE__ */ track(CURSOR_WANDER_CLICK, 3400, { origin: '10px 10px' }) },
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(0, -4px)', offset: 0.25 }, { transform: 'translate(-3px, 0)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  });

/** Apagado: se fragmenta y la diagonal cruza al final — sin hundimiento. */
export const mousePointer2OffIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointer2OffShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 160 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
  });

export const mousePointerBanIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointerBanShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CURSOR_PRESS, 400, { origin: '5px 5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 460 }),
      },
    },
    /** Igual que el default; al terminar, el cursor "prohibido" deriva completo — insignia pegada. */
    wander: {
      shapes: {
        0: /* @__PURE__ */ track(CURSOR_WANDER_CLICK, 3400, { origin: '5px 5px' }),
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3) translate(0, 0)', opacity: '0', offset: 0 },
            { transform: 'scale(0.3) translate(0, 0)', opacity: '0', offset: 0.076 },
            { transform: 'scale(1.12) translate(0, 0)', opacity: '1', offset: 0.11 },
            { transform: 'scale(1) translate(0, 0)', opacity: '1', offset: 0.135 },
            ...CURSOR_WANDER_TRACK.filter((k) => k.offset >= 0.3),
          ],
          3400,
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0.135 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0, 0)', offset: 0.2 },
            ...CURSOR_WANDER_TRACK.filter((k) => k.offset >= 0.3),
          ],
          3400,
        ),
      },
    },
  });

export const mouseIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 420, { easing: SPRING_OUT }) },
  });

/** Clic izquierdo: mismo hundimiento de `mouse`; el punto activo late del lado izquierdo. */
export const mouseLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseLeftShapes, {
    default: {
      root: MOUSE_PRESS,
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
    /** Igual que el default; al asentarse, el mouse deriva solo por el escritorio. */
    wander: {
      root: /* @__PURE__ */ track(MOUSE_WANDER, 3200, { easing: 'ease-in-out' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
  });

/** Apagado: se fragmenta y la diagonal cruza al final — sin hundimiento. */
export const mouseOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

export const mouseRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseRightShapes, {
    default: {
      root: MOUSE_PRESS,
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
    wander: {
      root: /* @__PURE__ */ track(MOUSE_WANDER, 3200, { easing: 'ease-in-out' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
  });
