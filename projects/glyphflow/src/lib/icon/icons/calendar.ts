// Familia `calendar` del catálogo curado (21 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, SPRING_BOUNCY, rotateSeq, scaleSeq, moveYSeq, track, burst, strokeDraw, icon } from '../choreography';
import { calendar1Shapes, calendarArrowDownShapes, calendarArrowUpShapes, calendarCheck2Shapes, calendarCheckShapes, calendarClockShapes, calendarCogShapes, calendarDaysShapes, calendarFoldShapes, calendarHeartShapes, calendarMinus2Shapes, calendarMinusShapes, calendarOffShapes, calendarPlus2Shapes, calendarPlusShapes, calendarRangeShapes, calendarSearchShapes, calendarShapes, calendarSyncShapes, calendarX2Shapes, calendarXShapes } from '../animated-icons.shapes';
import { HEART_QUAD_PULSE, FOLD_CHIDA, BADGE_BOUNCE_DRAW, X_SNAP_DRAW, REFRESH_SPIN, SHIELD_GEAR_SPIN } from './_shared';

// Mismo combo dashoffset+scale que trae `check` de fábrica.
const CHECK_BOUNCE_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(1)' },
  { strokeDasharray: '1', strokeDashoffset: '0.5', opacity: '0.5', transform: 'scale(1.1)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];

const SEARCH_TILT = /* @__PURE__ */ rotateSeq([0, 17, -10, 5, -1, 0]);

const CALENDAR_PIN = /* @__PURE__ */ moveYSeq([0, -1.5, 0]);

/** El asta baja primero, la punta llega al final — como si la fecha aterrizara. */
const ARROW_DOWN_NUDGE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0, 3px)' },
  { transform: 'translate(0, 0)' },
];

const ARROW_UP_NUDGE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0, -3px)' },
  { transform: 'translate(0, 0)' },
];

/** Mismo criterio que `server-cog`/`shield-cog`: el engrane gira, el calendario se queda quieto. */
const CALENDAR_COG_TRIPLE_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.2) rotate(540deg)' },
  { transform: 'scale(1) rotate(1080deg)' },
];

/** Calendario: las dos anillas rebotan escalonadas, el cuerpo quieto. */
export const calendarIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarShapes, {
  default: {
    shapes: {
      0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
      1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
    },
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
});

/** Fecha confirmada: las anillas rebotan y la palomita se dibuja. */
export const calendarCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 260 }),
      },
    },
    reveal: {
      shapes: {
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Fecha con hora: el reloj late después de las anillas. */
/**
 * Calendario con reloj. Los dos pines brincan como en el resto de la familia, y ADEMÁS las
 * manecillas dan un tic — girando desde el centro del reloj, no brincando como los pines: el gesto
 * de cada figura corresponde a lo que la figura es. Es el único de los cuatro calendarios que
 * marca tiempo, y la animación lo dice.
 *
 * Ojo con los índices: aquí los pines son 1 y 4, NO 0 y 1 como en sus hermanos — el 0 son las
 * manecillas. La coreografía vieja animaba 0 y 1, así que movía las manecillas hacia arriba (se
 * salían del reloj) y dejaba el pin izquierdo quieto.
 *
 * Las dos manecillas son UN solo `<path>` con un único subtrazo (`M16 14v2.2l1.6 1`), unidas en el
 * vértice (16, 16.2): giran como cuerpo rígido por estructura, no hace falta coordinar dos tracks.
 */
export const calendarClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarClockShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 30, 0]), 620, { delay: 260, origin: '16px 16px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 220, origin: '16px 16px' }),
      },
    },
  });

/** Los días se van llenando, renglón por renglón. */
export const calendarDaysIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarDaysShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 60 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 110 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 160 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 240 }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 290 }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 340 }),
      },
    },
  });

/** El "1" se dibuja como insignia, igual que el resto de la familia. */
export const calendar1Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendar1Shapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 260 }),
      },
    },
    quick: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { delay: 130 }),
      },
    },
  });

/** `nudge`: la flecha empuja hacia abajo — mismo gesto de `arrow-down`. */
export const calendarArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarArrowDownShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 420 }),
      },
    },
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(ARROW_DOWN_NUDGE, 400, { delay: 480, easing: SPRING_BOUNCY }),
      },
    },
  });

export const calendarArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarArrowUpShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 420 }),
      },
    },
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(ARROW_UP_NUDGE, 400, { delay: 480, easing: SPRING_BOUNCY }),
      },
    },
  });

/** Trazo alterno del cuerpo (bosquejado a mano, 6 piezas) — mismos pines e insignia que `calendar-check`. */
export const calendarCheck2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarCheck2Shapes, {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        10: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 260 }),
      },
    },
    pop: {
      shapes: {
        7: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        10: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        6: /* @__PURE__ */ track(CHECK_BOUNCE_DRAW, 500, { delay: 260, origin: '17px 20px' }),
      },
    },
  });

/** Mismo criterio que `server-cog`/`shield-cog`: el engrane gira, el calendario se queda quieto. */
export const calendarCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarCogShapes, {
  default: {
    shapes: {
      2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
      11: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      0: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      1: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      3: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      4: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      5: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      6: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      7: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      8: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      12: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
    },
  },
  spin: {
    shapes: {
      2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
      11: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      0: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      1: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      3: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      4: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      5: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      6: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      7: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      8: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
      12: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: EASE, origin: '18px 18px' }),
    },
  },
});

/** La esquina doblada ya está en la geometría — solo brincan los pines, sin insignia aparte. */
/** `flip`: el mismo ceder de papel de `sticky-note` (chida), aplicado al calendario entero. */
export const calendarFoldIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarFoldShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      },
    },
    flip: {
      root: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      },
    },
  });

/** `beat`: el mismo palpitar de 4 pulsaciones de `heart-*:pulse`, aplicado a la insignia. */
export const calendarHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarHeartShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 260 }),
      },
    },
    beat: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1200, { delay: 260, easing: SPRING_OUT, origin: '18.5px 17px' }),
      },
    },
  });

export const calendarMinus2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarMinus2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '12px 15px' }),
      },
    },
  });

export const calendarMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '19px 18px' }),
      },
    },
  });

/** Apagado: se fragmenta y la diagonal cruza al final — sin brinco de pines. */
export const calendarOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 180 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 460 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

export const calendarPlus2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarPlus2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '12px 15px' }),
        5: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '12px 15px' }),
      },
    },
  });

export const calendarPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarPlusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '19px 18px' }),
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '19px 18px' }),
      },
    },
  });

/** Selección de rango: las dos líneas se dibujan y los dos extremos aparecen, fila tras fila. */
export const calendarRangeIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarRangeShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 260 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 380 }),
      },
    },
    quick: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 130 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 130 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 190 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 190 }),
      },
    },
  });

/** Mismo criterio que `search-check`/`user-round-search`: la lupa aparece y el mango se dibuja. */
/** `shake`: la lupa se ladea igual que `search`, en vez de solo aparecer quieta. */
export const calendarSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarSearchShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 460 }),
      },
    },
    shake: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        5: /* @__PURE__ */ track(SEARCH_TILT, 800, { delay: 260, origin: '18px 17px' }),
        2: /* @__PURE__ */ track(SEARCH_TILT, 800, { delay: 260, origin: '18px 17px' }),
      },
    },
  });

/** `spin`: los dos brazos giran de una pieza — mismo giro completo de `refresh-cw:rotate`. */
export const calendarSyncIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarSyncShapes, {
  default: {
    shapes: {
      2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
      7: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 260 }),
      1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 420 }),
    },
  },
  spin: {
    shapes: {
      2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
      7: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      0: /* @__PURE__ */ track(REFRESH_SPIN, 700, {
        delay: 260,
        easing: SPRING_OUT,
        origin: '16px 16px',
      }),
      1: /* @__PURE__ */ track(REFRESH_SPIN, 700, {
        delay: 260,
        easing: SPRING_OUT,
        origin: '16px 16px',
      }),
      3: /* @__PURE__ */ track(REFRESH_SPIN, 700, {
        delay: 260,
        easing: SPRING_OUT,
        origin: '16px 16px',
      }),
      4: /* @__PURE__ */ track(REFRESH_SPIN, 700, {
        delay: 260,
        easing: SPRING_OUT,
        origin: '16px 16px',
      }),
    },
  },
});

export const calendarX2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarX2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    snap: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 260, origin: '19px 18px' }),
        2: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 340, origin: '19px 18px' }),
      },
    },
  });

export const calendarXIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    snap: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 260, origin: '12px 15px' }),
        5: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 340, origin: '12px 15px' }),
      },
    },
  });
