// Familia `map` del catálogo curado (13 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, track, burst, strokeDraw, icon } from '../choreography';
import { mapPinCheckInsideShapes, mapPinCheckShapes, mapPinHouseShapes, mapPinMinusInsideShapes, mapPinMinusShapes, mapPinPlusInsideShapes, mapPinPlusShapes, mapPinSearchShapes, mapPinShapes, mapPinXInsideShapes, mapPinXShapes, mapShapes } from '../animated-icons.shapes';

// El mismo rebote izquierda-derecha de map-pin, anclado en la punta de abajo — TODAS las
// variantes de map-pin lo comparten.
const MAP_PIN_ROCK = /* @__PURE__ */ rotateSeq([0, -12, 8, -5, 3, 0]);

export const mapPinOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.75 7.09a3 3 0 0 1 2.16 2.16" },
    { tag: 'path', d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533" },
    { tag: 'path', d: "M9.13 9.13a3 3 0 0 0 3.74 3.74" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** Pin que cae y se clava. */
export const mapPinIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -12, 8, -5, 3, 0]), 650, {
        origin: '12px 21.8px',
      }),
    },
    /** Ubicando: el punto adentro late, el pin no se mueve. */
    locate: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.35, 1, 1.3, 1]), 700, {
          origin: '12px 10px',
        }),
      },
    },
  });

/** Ubicación confirmada: el pin se rebotea y la palomita se dibuja de insignia. */
export const mapPinCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }) },
    },
    /** Celebración: la palomita se dibuja y pega un rebote elástico, no solo se traza. */
    confirm: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(0.5)' },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1.3)' },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
          ],
          380,
          { delay: 280, easing: EASE, origin: '19px 20px' },
        ),
      },
    },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Igual, pero la palomita reemplaza el punto adentro del pin. */
export const mapPinCheckInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinCheckInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 150 }) },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Es un domicilio: el pin se rebotea y la casita se dibuja de insignia. */
export const mapPinHouseIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinHouseShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '10px 21.8px' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 480 }),
      },
    },
  });

/** Ubicación quitada: el pin se rebotea y el signo "-" se dibuja de insignia. */
export const mapPinMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }) },
    },
  });

/** Igual, pero el "-" reemplaza el punto adentro del pin. */
export const mapPinMinusInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinMinusInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }) },
    },
  });

/** Ubicación agregada: el pin se rebotea y el signo "+" se dibuja de insignia, en dos trazos. */
export const mapPinPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
  });

/** Igual, pero el "+" reemplaza el punto adentro del pin. */
export const mapPinPlusInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinPlusInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
      },
    },
  });

/** Buscando ubicación: el pin se rebotea y la lupa aparece de insignia. */
export const mapPinSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinSearchShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260, origin: '18px 18px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 480 }),
      },
    },
    /** Rastreando: la lupa barre de un lado a otro, buscando. */
    scan: {
      shapes: {
        3: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-2px, 0)' },
            { transform: 'translate(2px, 0)' },
            { transform: 'translate(0, 0)' },
          ],
          700,
          { origin: '18px 18px' },
        ),
      },
    },
  });

/** Ubicación inválida: el pin se rebotea y la equis se dibuja de insignia. */
export const mapPinXIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinXShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    /** Rechazo: sacudida más brusca y rápida en vez del rebote suave — un "no" tajante. */
    deny: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -15, 12, -10, 8, -4, 0]), 450, {
        origin: '12px 21.8px',
      }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 210 }),
      },
    },
  });

/** Igual, pero la equis reemplaza el punto adentro del pin. */
export const mapPinXInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinXInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
    },
  });

/** Mapa desdoblándose. */
export const mapIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapShapes, {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scaleX(0.88)' }, { transform: 'scaleX(1)' }], 500, {
        easing: SPRING_OUT,
        origin: 'center',
      }),
    },
  });
