// Familia `map` del catálogo curado (13 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef, IconChoreography } from '../animated-icon.model';
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
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 35 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 42 }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 92 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 103 }),
      },
    },
  },
);

/** Pin que cae y se clava. */
const MAP_PIN_PULSE: IconChoreography = /* @__PURE__ */ {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.35, 1, 1.3, 1]), 700, {
          origin: '12px 10px',
        }),
      },
    };

export const mapPinIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -12, 8, -5, 3, 0]), 650, {
        origin: '12px 21.8px',
      }),
    },
    /** Ubicando: el punto adentro late, el pin no se mueve. */
    pulse: MAP_PIN_PULSE,
    /** @deprecated Se llamaba `locate`. El alias sale en la v3. */
    locate: MAP_PIN_PULSE,
  });

/** Ubicación confirmada: el pin se rebotea y la palomita se dibuja de insignia. */
const MAP_PIN_CHECK_SHAKE: IconChoreography = /* @__PURE__ */ {
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
    };

export const mapPinCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }) },
    },
    /** Celebración: la palomita se dibuja y pega un rebote elástico, no solo se traza. */
    shake: MAP_PIN_CHECK_SHAKE,
    mark: {
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
    mark: {
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
const MAP_PIN_SEARCH_NUDGE: IconChoreography = /* @__PURE__ */ {
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
    };

export const mapPinSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinSearchShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260, origin: '18px 18px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 480 }),
      },
    },
    /** Rastreando: la lupa barre de un lado a otro, buscando. */
    nudge: MAP_PIN_SEARCH_NUDGE,
    /** @deprecated Se llamaba `scan`. El alias sale en la v3. */
    scan: MAP_PIN_SEARCH_NUDGE,
  });

/** Ubicación inválida: el pin se rebotea y la equis se dibuja de insignia. */
const MAP_PIN_X_SHAKE: IconChoreography = /* @__PURE__ */ {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -15, 12, -10, 8, -4, 0]), 450, {
        origin: '12px 21.8px',
      }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 210 }),
      },
    };

export const mapPinXIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinXShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    /** Rechazo: sacudida más brusca y rápida en vez del rebote suave — un "no" tajante. */
    shake: MAP_PIN_X_SHAKE,
    /** @deprecated Se llamaba `deny`. El alias sale en la v3. */
    deny: MAP_PIN_X_SHAKE,
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
      // Se despliega de verdad: 0.72 → 1.05 → 1. El 0.88 de antes es un 12% de recorrido y en un
      // icono de 18 de ancho eso son dos unidades — no se ve. El tope de salida es 1.05: el mapa
      // llega a x=21 y con su trazo a 22, así que 12 + 9·1.05 = 21.45 es lo último que cabe.
      root: /* @__PURE__ */ track(
        [
          { transform: 'scaleX(0.72)', offset: 0 },
          { transform: 'scaleX(1.05)', offset: 0.62 },
          { transform: 'scaleX(0.98)', offset: 0.82 },
          { transform: 'scaleX(1)', offset: 1 },
        ],
        620,
        { easing: EASE, origin: 'center' },
      ),
    },
  });

/** El mapa se despliega y el menos se pone de canto. */
/** El mapa se despliega. El gesto de `map`. */
const MAP_UNFOLD = /* @__PURE__ */ [{ transform: 'scaleX(0.88)' }, { transform: 'scaleX(1)' }];

/** El pin se balancea sobre su punta, que es lo único que no se mueve al clavarlo. */
const MAP_PIN_SWING = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-12deg)', offset: 0.22 },
  { transform: 'rotate(8deg)', offset: 0.45 },
  { transform: 'rotate(-5deg)', offset: 0.68 },
  { transform: 'rotate(3deg)', offset: 0.85 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** Lo que marca el mapa se agranda y vuelve. */
const MAP_MARK_POP = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.25)' },
  { transform: 'scale(1)' },
];

/** Un cuarto de vuelta y de regreso, para los signos. */
const LAYER_TURN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }, { transform: 'rotate(0deg)' }];

export const mapMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14",
    },
    { tag: 'path', d: "M15 5.764V14" },
    { tag: 'path', d: "M21 18h-6" },
    { tag: 'path', d: "M9 3.236v15" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAP_UNFOLD, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '18px 18px', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** El pin se balancea sobre su punta y la pluma firma encima. */
export const mapPinPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468" },
    {
      tag: 'path',
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
    },
    { tag: 'circle', cx: 10, cy: 10, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(MAP_PIN_SWING, 650, { easing: EASE, origin: '10px 20px' }),
        1: /* @__PURE__ */ track(MAP_MARK_POP, 520, { easing: EASE, origin: '18px 17px', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(MAP_PIN_SWING, 650, { easing: EASE, origin: '10px 20px' }),
      },
    },
  },
);

/** El pin se balancea y el punto que marca se agranda. */
export const mapPinnedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
    },
    { tag: 'circle', cx: 12, cy: 8, r: 2 },
    {
      tag: 'path',
      d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(MAP_PIN_SWING, 650, { easing: EASE, origin: '12px 17px' }),
        1: /* @__PURE__ */ track(MAP_MARK_POP, 520, { easing: EASE, origin: '12px 8px', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

export const mapPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12",
    },
    { tag: 'path', d: "M15 5.764V12" },
    { tag: 'path', d: "M18 15v6" },
    { tag: 'path', d: "M21 18h-6" },
    { tag: 'path', d: "M9 3.236v15" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAP_UNFOLD, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '18px 18px', delay: 260, fill: 'backwards' }),
        3: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '18px 18px', delay: 260, fill: 'backwards' }),
      },
    },
  },
);
