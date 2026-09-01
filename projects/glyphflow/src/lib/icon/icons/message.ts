// Familia `message` del catálogo curado (29 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, burst, strokeDraw, icon } from '../choreography';

/**
 * El meneo con el que llega una burbuja. Es el mismo que las doce hermanas ya traían escrito a
 * mano; aquí se nombra una vez porque diecisiete copias más no aportaban nada.
 */
const MESSAGE_WIGGLE = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)', offset: 0 },
  { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
  { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
  { transform: 'scale(1) rotate(0deg)', offset: 1 },
];

/**
 * El trazo de una insignia con su gesto propio encadenado. Turno A entra de inmediato; turno B,
 * un poco después — pero los dos se mueven en el MISMO tramo final (0.55 → 1), porque si el
 * desfase se hiciera con `delay` las dos mitades de una equis girarían desacompasadas.
 *
 * `strokeDasharray` aparece en el primer keyframe y en el último a propósito: WAAPI interpola cada
 * propiedad por su cuenta, así que declararla solo al principio la dejaría derivando.
 */
const SPIN_A = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.34 },
  { transform: 'rotate(0deg)', offset: 0.55 },
  { transform: 'rotate(180deg)', offset: 0.8 },
  { strokeDasharray: '1', transform: 'rotate(0deg)', offset: 1 },
];

const SPIN_B = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.16 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.5 },
  { transform: 'rotate(0deg)', offset: 0.55 },
  { transform: 'rotate(180deg)', offset: 0.8 },
  { strokeDasharray: '1', transform: 'rotate(0deg)', offset: 1 },
];

/** Los dos chevrons se apartan entre sí y vuelven. Cada uno hacia su lado. */
const PART_LEFT = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateX(0)', offset: 0 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.34 },
  { transform: 'translateX(0)', offset: 0.55 },
  { transform: 'translateX(-1.8px)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'translateX(0)', offset: 1 },
];

const PART_RIGHT = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateX(0)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.16 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.5 },
  { transform: 'translateX(0)', offset: 0.55 },
  { transform: 'translateX(1.8px)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'translateX(0)', offset: 1 },
];

/** Se escribe y después crece y vuelve. El pivote va en las opciones: es del icono, no del gesto. */
const GROW_A = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'scale(1)', offset: 0 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.34 },
  { transform: 'scale(1)', offset: 0.55 },
  { transform: 'scale(1.35)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'scale(1)', offset: 1 },
];

const GROW_B = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'scale(1)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.16 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.5 },
  { transform: 'scale(1)', offset: 0.55 },
  { transform: 'scale(1.35)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'scale(1)', offset: 1 },
];

/** El inverso, para lo que tiene que MENGUAR mientras su pareja crece (el menos de un diff). */
const SHRINK_B = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'scale(1)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.16 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.5 },
  { transform: 'scale(1)', offset: 0.55 },
  { transform: 'scale(0.7)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'scale(1)', offset: 1 },
];

/**
 * La flecha se estira hacia donde apunta: la PUNTA viaja y el ASTA se alarga tras ella, los dos
 * en el mismo tramo. Separarlos parte la flecha — la trampa de siempre en esta familia.
 *
 * El asta de `reply` mide 10 y la punta viaja 1.5, así que crece a 11.5/10 = 1.15 desde el
 * extremo que no se mueve (su `origin`, en las opciones).
 */
const REACH_TIP = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateX(0)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.16 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.5 },
  { transform: 'translateX(0)', offset: 0.55 },
  { transform: 'translateX(-1.5px)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'translateX(0)', offset: 1 },
];

const REACH_SHAFT = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'scaleX(1)', offset: 0 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.34 },
  { transform: 'scaleX(1)', offset: 0.55 },
  { transform: 'scaleX(1.15)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'scaleX(1)', offset: 1 },
];

/** Igual, en diagonal: `share` apunta a la esquina de arriba a la derecha. */
const REACH_DIAG_TIP = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translate(0, 0)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.16 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.5 },
  { transform: 'translate(0, 0)', offset: 0.55 },
  { transform: 'translate(0.7px, -0.7px)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'translate(0, 0)', offset: 1 },
];

const REACH_DIAG_SHAFT = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'scale(1)', offset: 0 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.34 },
  { transform: 'scale(1)', offset: 0.55 },
  { transform: 'scale(1.12)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'scale(1)', offset: 1 },
];

/** El renglón corto se alarga, como si se siguiera escribiendo. */
const STRETCH_B = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'scaleX(1)', offset: 0 },
  { strokeDashoffset: '1', opacity: 0, offset: 0.16 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.5 },
  { transform: 'scaleX(1)', offset: 0.55 },
  { transform: 'scaleX(1.25)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'scaleX(1)', offset: 1 },
];

/** El aviso tirita al terminar de escribirse. */
const SHAKE_A = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'rotate(0deg)', offset: 0 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.34 },
  { transform: 'rotate(0deg)', offset: 0.55 },
  { transform: 'rotate(-8deg)', offset: 0.7 },
  { transform: 'rotate(8deg)', offset: 0.85 },
  { strokeDasharray: '1', transform: 'rotate(0deg)', offset: 1 },
];

/** El arco del candado se levanta y encaja. */
const LIFT_A = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, transform: 'translateY(0)', offset: 0 },
  { strokeDashoffset: '0', opacity: 1, offset: 0.34 },
  { transform: 'translateY(0)', offset: 0.55 },
  { transform: 'translateY(-1.6px)', offset: 0.78 },
  { strokeDasharray: '1', transform: 'translateY(0)', offset: 1 },
];

/** Lo macizo aparece de golpe —un trazo no se le vería— y después crece. */
const POP_GROW = /* @__PURE__ */ [
  { transform: 'scale(0.3)', opacity: 0, offset: 0 },
  { transform: 'scale(1.12)', opacity: 1, offset: 0.28 },
  { transform: 'scale(1)', offset: 0.45 },
  { transform: 'scale(1.4)', offset: 0.75 },
  { transform: 'scale(1)', offset: 1 },
];

/**
 * La variante `hold`: la burbuja se levanta y se queda mientras dure el puntero, como un mensaje
 * que se selecciona. Va en el root, así que sirve igual para las veintinueve.
 */
const MESSAGE_LIFT = /* @__PURE__ */ [
  { transform: 'scale(1) translateY(0)' },
  { transform: 'scale(1.08) translateY(-1.5px)' },
];

/**
 * Las poses que la insignia SOSTIENE en `hold`. Son el gesto de la `default` sin el regreso: allí
 * va y vuelve dentro del mismo track; aquí llega, se queda, y `reverseOnLeave` la devuelve.
 */
const HOLD_SPIN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }];
const HOLD_PART_LEFT = /* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(-1.8px)' }];
const HOLD_PART_RIGHT = /* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(1.8px)' }];
const HOLD_GROW = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }];
const HOLD_SHRINK = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(0.75)' }];
const HOLD_TILT = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(8deg)' }];
const HOLD_LIFT = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(-1.6px)' }];
const HOLD_STRETCH = /* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.25)' }];

/** La flecha estirada: punta y asta sostienen la MISMA pose, o se parte por la mitad. */
const HOLD_REACH_TIP = /* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(-1.5px)' }];
const HOLD_REACH_SHAFT = /* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.15)' }];
const HOLD_REACH_DIAG_TIP = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0.7px, -0.7px)' },
];
const HOLD_REACH_DIAG_SHAFT = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }];

export const messageCircleCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(GROW_A, 820, { easing: 'ease-out', origin: '12px 13px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 13px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const messageCircleHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    {
      tag: 'path',
      d: 'M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z',
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(GROW_A, 820, { easing: 'ease-out', origin: '12px 12px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const messageSquareCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: 'm9 11 2 2 4-4' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(GROW_A, 820, { easing: 'ease-out', origin: '12px 11px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const messageSquareHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    {
      tag: 'path',
      d: 'M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5',
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(GROW_A, 820, { easing: 'ease-out', origin: '12px 11px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleMoreIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: 'M8 12h.01' },
    { tag: 'path', d: 'M12 12h.01' },
    { tag: 'path', d: 'M16 12h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ], 324,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ], 971,
        ),
        2: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ], 971,
          { delay: 65 },
        ),
        3: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ], 971,
          { delay: 129 },
        ),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '8px 12px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '16px 12px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989" },
    { tag: 'path', d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        0: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 19 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 41 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' },
    { tag: 'path', d: 'M12 17h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ],
        500,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg)', offset: 0 },
            { transform: 'rotate(-10deg)', offset: 0.2 },
            { transform: 'rotate(10deg)', offset: 0.4 },
            { transform: 'rotate(-10deg)', offset: 0.6 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          500,
          { easing: EASE, origin: 'center' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg)', offset: 0 },
            { transform: 'rotate(-10deg)', offset: 0.2 },
            { transform: 'rotate(10deg)', offset: 0.4 },
            { transform: 'rotate(-10deg)', offset: 0.6 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          500,
          { easing: EASE, origin: 'center' },
        ),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '12px 13px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '12px 13px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
    { tag: 'path', d: "M12 8v4" },
    { tag: 'path', d: "M12 16h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 16px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 }, { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareMoreIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: 'M12 11h.01' },
    { tag: 'path', d: 'M16 11h.01' },
    { tag: 'path', d: 'M8 11h.01' },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)', offset: 0 },
          { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 },
          { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 },
          { transform: 'scale(1) rotate(0deg)', offset: 1 },
        ], 324,
        { easing: EASE },
      ),
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ], 971,
        ),
        2: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ], 971,
          { delay: 65 },
        ),
        3: /* @__PURE__ */ track(
          [
            { opacity: 1, offset: 0 },
            { opacity: 0, offset: 0.1 },
            { opacity: 0, offset: 0.2 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.5 },
            { opacity: 0, offset: 0.6 },
            { opacity: 0, offset: 0.7 },
            { opacity: 1, offset: 0.8 },
            { opacity: 1, offset: 0.9 },
            { opacity: 1, offset: 1 },
          ], 971,
          { delay: 129 },
        ),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '16px 11px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '8px 11px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.656 3H20a2 2 0 0 1 2 2v11.344" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 8 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 50 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 }, { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

/** Los dos chevrons se escriben uno tras otro. */
export const messageCircleCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 9-3 3 3 3" },
    { tag: 'path', d: "m14 15 3-3-3-3" },
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(PART_LEFT, 820, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(PART_RIGHT, 820, { easing: 'ease-out' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        0: /* @__PURE__ */ track(HOLD_PART_LEFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_PART_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cruz se traza en dos trazos. */
export const messageCirclePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "M12 8v8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(GROW_A, 820, { easing: 'ease-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(GROW_B, 820, { easing: 'ease-out', origin: '12px 12px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos diagonales, una tras otra. */
export const messageCircleXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: "m15 9-6 6" },
    { tag: 'path', d: "m9 9 6 6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(SPIN_A, 820, { easing: 'ease-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(SPIN_B, 820, { easing: 'ease-out', origin: '12px 12px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_SPIN, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_SPIN, 320, { easing: SPRING_OUT, origin: '12px 12px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El asta se traza de derecha a izquierda y la punta llega al final del recorrido. */
export const messageCircleReplyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
    { tag: 'path', d: "m10 15-3-3 3-3" },
    { tag: 'path', d: "M7 12h8a2 2 0 0 1 2 2v1" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(REACH_TIP, 820, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(REACH_SHAFT, 820, { easing: 'ease-out', origin: '17px 12px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        2: /* @__PURE__ */ track(HOLD_REACH_SHAFT, 320, { easing: SPRING_OUT, origin: '17px 12px', fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_REACH_TIP, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los ocho tramos se trazan dando la vuelta al reloj, y la colita al final. */
export const messageCircleDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.1 2.182a10 10 0 0 1 3.8 0" },
    { tag: 'path', d: "M13.9 21.818a10 10 0 0 1-3.8 0" },
    { tag: 'path', d: "M17.609 3.72a10 10 0 0 1 2.69 2.7" },
    { tag: 'path', d: "M2.182 13.9a10 10 0 0 1 0-3.8" },
    { tag: 'path', d: "M20.28 17.61a10 10 0 0 1-2.7 2.69" },
    { tag: 'path', d: "M21.818 10.1a10 10 0 0 1 0 3.8" },
    { tag: 'path', d: "M3.721 6.391a10 10 0 0 1 2.7-2.69" },
    { tag: 'path', d: "m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 70, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 210, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 490, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 350, fill: 'backwards' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

/** Igual que su hermana redonda. */
export const messageSquareCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "m10 8-3 3 3 3" },
    { tag: 'path', d: "m14 14 3-3-3-3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(PART_LEFT, 820, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(PART_RIGHT, 820, { easing: 'ease-out' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_PART_LEFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_PART_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cruz, en dos trazos. */
export const messageSquarePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "M12 8v6" },
    { tag: 'path', d: "M9 11h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(GROW_A, 820, { easing: 'ease-out', origin: '12px 11px' }),
        2: /* @__PURE__ */ track(GROW_B, 820, { easing: 'ease-out', origin: '12px 11px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos diagonales. */
export const messageSquareXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "m14.5 8.5-5 5" },
    { tag: 'path', d: "m9.5 8.5 5 5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(SPIN_A, 820, { easing: 'ease-out', origin: '12px 11px' }),
        2: /* @__PURE__ */ track(SPIN_B, 820, { easing: 'ease-out', origin: '12px 11px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_SPIN, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_SPIN, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El asta primero; la punta cierra el recorrido. */
export const messageSquareReplyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "m10 8-3 3 3 3" },
    { tag: 'path', d: "M17 14v-1a2 2 0 0 0-2-2H7" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(REACH_TIP, 820, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(REACH_SHAFT, 820, { easing: 'ease-out', origin: '17px 11px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        2: /* @__PURE__ */ track(HOLD_REACH_SHAFT, 320, { easing: SPRING_OUT, origin: '17px 11px', fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_REACH_TIP, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las comillas, de izquierda a derecha. */
export const messageSquareQuoteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 14a2 2 0 0 0 2-2V8h-2" },
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "M8 14a2 2 0 0 0 2-2V8H8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(PART_RIGHT, 820, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(PART_LEFT, 820, { easing: 'ease-out' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        2: /* @__PURE__ */ track(HOLD_PART_LEFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(HOLD_PART_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los renglones aparecen en orden de lectura, de arriba abajo. */
export const messageSquareTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "M7 11h10" },
    { tag: 'path', d: "M7 15h6" },
    { tag: 'path', d: "M7 7h8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track(STRETCH_B, 820, { easing: 'ease-out', origin: '7px 15px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        2: /* @__PURE__ */ track(HOLD_STRETCH, 320, { easing: SPRING_OUT, origin: '7px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Primero el más y después el menos: el orden en que se lee un diff. */
export const messageSquareDiffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "M10 15h4" },
    { tag: 'path', d: "M10 9h4" },
    { tag: 'path', d: "M12 7v4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(SHRINK_B, 820, { easing: 'ease-out', origin: '12px 15px' }),
        2: /* @__PURE__ */ track(GROW_A, 820, { easing: 'ease-out', origin: '12px 9px' }),
        3: /* @__PURE__ */ track(GROW_B, 820, { easing: 'ease-out', origin: '12px 9px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 9px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 9px', fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_SHRINK, 320, { easing: SPRING_OUT, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La diagonal sale y la escuadra la remata. */
export const messageSquareShareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4',
    },
    { tag: 'path', d: "M16 3h6v6" },
    { tag: 'path', d: "m16 9 6-6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(REACH_DIAG_TIP, 820, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(REACH_DIAG_SHAFT, 820, { easing: 'ease-out', origin: '16px 9px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        2: /* @__PURE__ */ track(HOLD_REACH_DIAG_SHAFT, 320, { easing: SPRING_OUT, origin: '16px 9px', fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_REACH_DIAG_TIP, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La barra se traza y el punto aparece de golpe debajo. */
export const messageSquareWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
    },
    { tag: 'path', d: "M12 15h.01" },
    { tag: 'path', d: "M12 7v4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(SHAKE_A, 820, { easing: 'ease-out', origin: '12px 11px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        2: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '12px 11px', fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '12px 15px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El aviso aparece de golpe: un punto es demasiado chico para trazarse. */
export const messageSquareDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7',
    },
    { tag: 'circle', cx: 19, cy: 6, r: 3 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(POP_GROW, 820, { easing: 'ease-out', origin: '19px 6px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '19px 6px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cuerpo del candado aparece y el arco se cierra encima. */
export const messageSquareLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10',
    },
    { tag: 'path', d: "M20 15v-2a2 2 0 0 0-4 0v2" },
    { tag: 'rect', x: 14, y: 15, width: 8, height: 5, rx: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MESSAGE_WIGGLE, 500, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(LIFT_A, 820, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        1: /* @__PURE__ */ track(HOLD_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los diez tramos se trazan dando la vuelta, empezando arriba a la izquierda. */
export const messageSquareDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 3h2" },
    { tag: 'path', d: "M16 19h-2" },
    { tag: 'path', d: "M2 12v-2" },
    { tag: 'path', d: "M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149" },
    { tag: 'path', d: "M20 19a2 2 0 0 0 2-2v-1" },
    { tag: 'path', d: "M22 10v2" },
    { tag: 'path', d: "M22 6V5a2 2 0 0 0-2-2" },
    { tag: 'path', d: "M4 3a2 2 0 0 0-2 2v1" },
    { tag: 'path', d: "M8 19h2" },
    { tag: 'path', d: "M8 3h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 240, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 540, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(MESSAGE_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);
