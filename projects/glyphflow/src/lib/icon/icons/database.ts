// Familia `database` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, moveYSeq, track, icon } from '../choreography';
import { databaseShapes } from '../animated-icons.shapes';

/*
 * Vocabulario de los dos mini iconos que faltaban. Va aquí arriba y no junto a `DB_TURN`, más
 * abajo, porque `databaseCheckIcon` es el PRIMER export del archivo: una constante declarada
 * después de él se lee en zona muerta temporal y truena al cargar el módulo, no al lintar.
 */

/**
 * El visto se SELLA: crece y vuelve, encadenado al asentamiento de la pila como el resto de la
 * familia. No gira —un visto de lado no significa nada— y no se dibuja, que es justo lo que la
 * variante `draw` ya hace.
 */
const DB_STAMP = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1)', offset: 0.35 },
  { transform: 'scale(1.3)', offset: 0.72 },
  { transform: 'scale(1)', offset: 1 },
];

/**
 * El menos se RECOGE sobre su eje. Encoge en X en vez de girar: a 90° la barra queda vertical, y
 * en `hold` esa pose se congela ahí —una raya de pie dentro de un cilindro no se lee como «menos»,
 * se lee como otro icono.
 */
const DB_SHRINK = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(1)', offset: 0.35 },
  { transform: 'scaleX(0.4)', offset: 0.72 },
  { transform: 'scaleX(1)', offset: 1 },
];

/** Las poses que cada uno SOSTIENE: el mismo gesto sin el regreso. */
const DB_HOLD_STAMP = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }];
const DB_HOLD_SHRINK = /* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.4)' }];

export const databaseCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'm16 19 2 2 4-4' },
    { tag: 'path', d: 'M21 13.127V5' },
    { tag: 'path', d: 'M3 12A9 3 0 0 0 21 12' },
    { tag: 'path', d: 'M3 5V19A9 3 0 0 0 13.318 21.968' },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DB_STAMP, 900, { easing: EASE, origin: '19px 19px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(DB_HOLD_STAMP, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
    },
  },
);

export const databaseMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M21 15V5' },
    { tag: 'path', d: 'M22 19h-6' },
    { tag: 'path', d: 'M3 12A9 3 0 0 0 21 12' },
    { tag: 'path', d: 'M3 5V19A9 3 0 0 0 13.318 21.968' },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(DB_SHRINK, 900, { easing: EASE, origin: '19px 19px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(DB_HOLD_SHRINK, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
    },
  },
);

/** Base de datos: los discos se asientan de arriba hacia abajo. */
export const databaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(databaseShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { delay: 90, easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { delay: 180, easing: SPRING_OUT }),
      },
    },
  });

/** La flecha baja: punta y asta juntas, o se parte. */
/**
 * Los gestos de la insignia de `database`, encadenados a la caída de los aros. Van y VUELVEN.
 *
 * Las flechas llevan una anticipación: su punta ya toca y=22, así que un desplazamiento limpio de
 * 2 se saldría del lienzo. Retrocediendo 1 primero, el recorrido se lee igual y el punto más
 * extremo se queda en +1, que es justo lo que cabe.
 */
const DB_PUSH_DOWN = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(0)', offset: 0.35 },
  { transform: 'translateY(-1px)', offset: 0.5 },
  { transform: 'translateY(1px)', offset: 0.78 },
  { transform: 'translateY(0)', offset: 1 },
];

const DB_PUSH_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(0)', offset: 0.35 },
  { transform: 'translateY(1px)', offset: 0.5 },
  { transform: 'translateY(-1px)', offset: 0.78 },
  { transform: 'translateY(0)', offset: 1 },
];

const DB_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(0deg)', offset: 0.35 },
  { transform: 'rotate(90deg)', offset: 0.72 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/**
 * El ciclo de respaldo gira EN CONTRA de las manecillas: es la dirección que la propia punta
 * del arco señala, y girando al otro lado la flecha va contra su propio dibujo.
 *
 * Y da la vuelta entera, no media: parado a mitad de camino el símbolo queda del revés.
 */
const DB_CYCLE = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(0deg)', offset: 0.3 },
  { transform: 'rotate(-360deg)', offset: 1 },
];

/** El rayo destella: dos golpes y se queda. */
const DB_FLASH = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 1, offset: 0.35 },
  { opacity: 0.15, offset: 0.48 },
  { opacity: 1, offset: 0.6 },
  { opacity: 0.15, offset: 0.74 },
  { opacity: 1, offset: 0.88 },
];

const DB_PROBE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 0)', offset: 0.35 },
  { transform: 'translate(0.8px, 0.8px)', offset: 0.72 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Las poses sostenidas de `hold`. */
const DB_HOLD_DOWN = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(1px)' }];
const DB_HOLD_UP = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(-1px)' }];
const DB_HOLD_TURN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }];
const DB_HOLD_CYCLE = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-180deg)' }];
const DB_HOLD_GROW = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }];
const DB_HOLD_PROBE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.8px, 0.8px)' }];

export const databaseArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 19 3 3 3-3" },
    { tag: 'path', d: "M19 16v6" },
    { tag: 'path', d: "M21 12.536V5" },
    { tag: 'path', d: "M3 12A9 3 0 0 0 15.182 14.806" },
    { tag: 'path', d: "M3 5V19A9 3 0 0 0 13.318 21.968" },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DB_PUSH_DOWN, 900, { easing: EASE }),
        1: /* @__PURE__ */ track(DB_PUSH_DOWN, 900, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(DB_HOLD_DOWN, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(DB_HOLD_DOWN, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La misma flecha, hacia arriba. */
export const databaseArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 22v-6" },
    { tag: 'path', d: "M21 12.536V5" },
    { tag: 'path', d: "m22 19-3-3-3 3" },
    { tag: 'path', d: "M3 12A9 3 0 0 0 14.457 14.886" },
    { tag: 'path', d: "M3 5V19A9 3 0 0 0 13.318 21.968" },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DB_PUSH_UP, 900, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(DB_PUSH_UP, 900, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(DB_HOLD_UP, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(DB_HOLD_UP, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El ciclo de respaldo da la vuelta entera. */
export const databaseBackupIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
    { tag: 'path', d: "M3 12a9 3 0 0 0 5 2.69" },
    { tag: 'path', d: "M21 9.3V5" },
    { tag: 'path', d: "M3 5v14a9 3 0 0 0 6.47 2.88" },
    { tag: 'path', d: "M12 12v4h4" },
    {
      tag: 'path',
      d: "M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        4: /* @__PURE__ */ track(DB_CYCLE, 900, { easing: EASE, origin: '17px 17px' }),
        5: /* @__PURE__ */ track(DB_CYCLE, 900, { easing: EASE, origin: '17px 17px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(DB_HOLD_CYCLE, 320, { easing: SPRING_OUT, origin: '17px 17px', fill: 'forwards' }),
        5: /* @__PURE__ */ track(DB_HOLD_CYCLE, 320, { easing: SPRING_OUT, origin: '17px 17px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const databasePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 16v6" },
    { tag: 'path', d: "M21 12.536V5" },
    { tag: 'path', d: "M22 19h-6" },
    { tag: 'path', d: "M3 12A9 3 0 0 0 15.1824 14.8061" },
    { tag: 'path', d: "M3 5V19A9 3 0 0 0 13.318 21.968" },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DB_TURN, 900, { easing: EASE, origin: '19px 19px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(DB_TURN, 900, { easing: EASE, origin: '19px 19px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(DB_HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(DB_HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El asta de la lupa sale; la lente se queda. */
export const databaseSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 11.693V5" },
    { tag: 'path', d: "m22 22-1.875-1.875" },
    { tag: 'path', d: "M3 12a9 3 0 0 0 8.697 2.998" },
    { tag: 'path', d: "M3 5v14a9 3 0 0 0 9.28 2.999" },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        1: /* @__PURE__ */ track(DB_PROBE, 900, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(DB_HOLD_PROBE, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(DB_HOLD_GROW, 320, { easing: SPRING_OUT, origin: '18px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const databaseXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 17 5 5" },
    { tag: 'path', d: "M19.323 13.744A9 3 0 0 0 21 12" },
    { tag: 'path', d: "M21 13.127V5" },
    { tag: 'path', d: "m22 17-5 5" },
    { tag: 'path', d: "M3 12A9 3 0 0 0 13.563 14.954" },
    { tag: 'path', d: "M3 5V19A9 3 0 0 0 13 21.981" },
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DB_TURN, 900, { easing: EASE, origin: '19.5px 19.5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(DB_TURN, 900, { easing: EASE, origin: '19.5px 19.5px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 360, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(DB_HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19.5px 19.5px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(DB_HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19.5px 19.5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El rayo destella. */
export const databaseZapIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
    { tag: 'path', d: "M3 5V19A9 3 0 0 0 15 21.84" },
    { tag: 'path', d: "M21 5V8" },
    { tag: 'path', d: "M21 12L18 17H22L19 22" },
    { tag: 'path', d: "M3 12A9 3 0 0 0 14.59 14.87" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(DB_FLASH, 900, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT, delay: 270, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(DB_HOLD_GROW, 320, { easing: SPRING_OUT, origin: '20px 17px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
