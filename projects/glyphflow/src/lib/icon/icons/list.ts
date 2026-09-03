// Familia `list` del catálogo curado (23 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, burst, strokeDraw, icon } from '../choreography';
import { REBOTE_ELASTICO } from './_shared';
import { listChecksShapes, listShapes } from '../animated-icons.shapes';

/**
 * El renglón cede el paso a la flecha. Cuál cede lo dice DÓNDE TERMINA la punta al girar, no
 * dónde arranca el gancho: la de `list-end` acaba abajo, así que se aparta el último renglón; la
 * de `list-start` acaba arriba, y se aparta el primero.
 */
const LIST_ROW_YIELD = /* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(-1.5px)' }];

/** El chevron avanza hacia donde apunta y se queda ahí mientras dure el puntero. */
const CHEVRON_PUSH_DOWN = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }];
const CHEVRON_PUSH_UP = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(-2px)' }];
const CHEVRON_PUSH_RIGHT = /* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(2px)' }];

/** Lo que el chevron empuja se corre menos que él: cede, no huye. */
const LIST_NUDGE_RIGHT = /* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(0.8px)' }];

/**
 * La flecha gira sobre su codo en vez de trasladarse. El pivote va en las opciones porque cambia
 * con cada icono; el signo, aquí: positivo lleva la punta a la izquierda cuando el codo está
 * arriba, y al revés cuando está abajo.
 */
const LIST_ARROW_SWING = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(8deg)' }];
const LIST_ARROW_SWING_BACK = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-8deg)' }];

/* ── Variantes de la tanda 5 ──────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). Easing por keyframe y `times` como
 * `offset`, igual que en las tandas anteriores.
 *
 * Tres adaptaciones declaradas, no descuidos: `layout-grid` va sin el destello que barre el
 * icono (una figura extra que se desplaza 26 unidades fuera del viewBox), y `repeat` y
 * `shuffle` portan UN ciclo de lo que allá repite infinito — en glyphflow el bucle es un input
 * del componente, no una propiedad de la variante.
 */
const T5_EASE = 'ease-in-out';

export const listFilterPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5H2" },
    { tag: 'path', d: "M6 12h12" },
    { tag: 'path', d: "M9 19h6" },
    { tag: 'path', d: "M16 5h6" },
    { tag: 'path', d: "M19 8V2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

export const listTreeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 5h13" },
    { tag: 'path', d: "M13 12h8" },
    { tag: 'path', d: "M13 19h8" },
    { tag: 'path', d: "M3 10a2 2 0 0 0 2 2h3" },
    { tag: 'path', d: "M3 5v12a2 2 0 0 0 2 2h3" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const listCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M16 12H3" },
    { tag: 'path', d: "M11 19H3" },
    { tag: 'path', d: "m15 18 2 2 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const listTodoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M13 5h8' },
    { tag: 'path', d: 'M13 12h8' },
    { tag: 'path', d: 'M13 19h8' },
    { tag: 'path', d: 'm3 17 2 2 4-4' },
    { tag: 'rect', x: 3, y: 4, width: 6, height: 6, rx: 1 },
  ],
  {
    /** Las 3 líneas se dibujan de arriba a abajo; el cuadro y el check aparecen de un salto. */
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, {}),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 180, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, {
          delay: 150,
          fill: 'backwards',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, {
          delay: 300,
          fill: 'backwards',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480, fill: 'backwards' }),
      },
    },
  },
);

/** Lista: las viñetas caen en orden. */
export const listIcon: AnimatedIconDef = /* @__PURE__ */ icon(listShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 90 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }),
      },
    },
  });

/** Pendientes que se van palomeando. */
export const listChecksIcon: AnimatedIconDef = /* @__PURE__ */ icon(listChecksShapes, {
    default: {
      // El rebote de cierre separa este `default` de su `mark`: los dos dibujan la misma
      // insignia, y sin algo que los distinga la variante extra no aporta nada.
      root: /* @__PURE__ */ track(REBOTE_ELASTICO, 460, { easing: SPRING_OUT, delay: 460, fill: 'backwards', origin: '12px 21px' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 160 }),
      },
    },
    mark: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Los dos chevrons cierran el gesto de plegar. */
export const listChevronsDownUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5h8" },
    { tag: 'path', d: "M3 12h8" },
    { tag: 'path', d: "M3 19h8" },
    { tag: 'path', d: "m15 5 3 3 3-3" },
    { tag: 'path', d: "m15 19 3-3 3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(CHEVRON_PUSH_DOWN, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(CHEVRON_PUSH_UP, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Y aquí el de desplegar. */
export const listChevronsUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5h8" },
    { tag: 'path', d: "M3 12h8" },
    { tag: 'path', d: "M3 19h8" },
    { tag: 'path', d: "m15 8 3-3 3 3" },
    { tag: 'path', d: "m15 16 3 3 3-3" },
    // Estela del `nudge`: copias que se alejan desvaneciéndose. Nacen invisibles, así que
    // el icono quieto no cambia y `runAutoDraw` las salta.
    { tag: 'path', d: "M3 5h8", opacity: '0' },
    { tag: 'path', d: "M3 12h8", opacity: '0' },
    { tag: 'path', d: "M3 19h8", opacity: '0' },
    { tag: 'path', d: "m15 8 3-3 3 3", opacity: '0' },
    { tag: 'path', d: "m15 16 3 3 3-3", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(CHEVRON_PUSH_UP, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(CHEVRON_PUSH_DOWN, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    dart: {
      shapes: {
        5: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-3px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-3px, 0px)', opacity: '0', offset: 1 }], 750, { easing: 'linear', delay: 60, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-3px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-3px, 0px)', opacity: '0', offset: 1 }], 750, { easing: 'linear', delay: 120, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-3px, 0px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-3px, 0px)', opacity: '0', offset: 1 }], 750, { easing: 'linear', delay: 180, fill: 'backwards' }),
        8: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, -6px)', opacity: '0', offset: 1 }], 900, { easing: 'linear', delay: 60, fill: 'backwards' }),
        9: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(0px, 6px)', opacity: '0', offset: 1 }], 900, { easing: 'linear', delay: 140, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '1', offset: 0, easing: T5_EASE }, { transform: 'translateX(-2px)', opacity: '0.9', offset: 0.33, easing: T5_EASE }, { transform: 'translateX(2px)', opacity: '0.9', offset: 0.66, easing: T5_EASE }, { transform: 'translateX(0px)', opacity: '1', offset: 1 }], 750, { easing: T5_EASE }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '1', offset: 0, easing: T5_EASE }, { transform: 'translateX(-2px)', opacity: '0.9', offset: 0.33, easing: T5_EASE }, { transform: 'translateX(2px)', opacity: '0.9', offset: 0.66, easing: T5_EASE }, { transform: 'translateX(0px)', opacity: '1', offset: 1 }], 750, { easing: T5_EASE, delay: 60, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '1', offset: 0, easing: T5_EASE }, { transform: 'translateX(-2px)', opacity: '0.9', offset: 0.33, easing: T5_EASE }, { transform: 'translateX(2px)', opacity: '0.9', offset: 0.66, easing: T5_EASE }, { transform: 'translateX(0px)', opacity: '1', offset: 1 }], 750, { easing: T5_EASE, delay: 120, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px) rotate(0deg)', opacity: '1', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4px) rotate(-4deg)', opacity: '0.9', offset: 0.34, easing: 'ease-out' }, { transform: 'translateY(-2px) rotate(-2deg)', opacity: '0.95', offset: 0.67, easing: 'ease-out' }, { transform: 'translateY(0px) rotate(0deg)', opacity: '1', offset: 1 }], 900, { easing: T5_EASE }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px) rotate(0deg)', opacity: '1', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4px) rotate(4deg)', opacity: '0.9', offset: 0.34, easing: 'ease-out' }, { transform: 'translateY(2px) rotate(2deg)', opacity: '0.95', offset: 0.67, easing: 'ease-out' }, { transform: 'translateY(0px) rotate(0deg)', opacity: '1', offset: 1 }], 900, { easing: T5_EASE, delay: 80, fill: 'backwards' }),
      },
    },
  },
);

/** Los renglones asoman y los dos chevrons apuntan a lo que se pliega. */
export const listCollapseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 5h11" },
    { tag: 'path', d: "M10 12h11" },
    { tag: 'path', d: "M10 19h11" },
    { tag: 'path', d: "m3 10 3-3-3-3" },
    { tag: 'path', d: "m3 20 3-3-3-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(CHEVRON_PUSH_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(CHEVRON_PUSH_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(LIST_NUDGE_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(LIST_NUDGE_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(LIST_NUDGE_RIGHT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La flecha de sangría entra al final. */
export const listIndentDecreaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H11" },
    { tag: 'path', d: "M21 12H11" },
    { tag: 'path', d: "M21 19H11" },
    { tag: 'path', d: "m7 8-4 4 4 4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** Igual, hacia el otro lado. */
export const listIndentIncreaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H11" },
    { tag: 'path', d: "M21 12H11" },
    { tag: 'path', d: "M21 19H11" },
    { tag: 'path', d: "m3 8 4 4-4 4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** El menos se traza cuando la lista ya está. */
export const listMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M11 12H3" },
    { tag: 'path', d: "M16 19H3" },
    { tag: 'path', d: "M21 12h-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** El más, en sus dos trazos. */
export const listPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M11 12H3" },
    { tag: 'path', d: "M16 19H3" },
    { tag: 'path', d: "M18 9v6" },
    { tag: 'path', d: "M21 12h-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
      },
    },
  },
);

/** Las dos diagonales cierran. */
export const listXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M11 12H3" },
    { tag: 'path', d: "M16 19H3" },
    { tag: 'path', d: "m15.5 9.5 5 5" },
    { tag: 'path', d: "m20.5 9.5-5 5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
      },
    },
  },
);

/** El gancho baja y la punta llega al final del recorrido — nunca al revés, o la flecha se parte. */
export const listEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M16 12H3" },
    { tag: 'path', d: "M9 19H3" },
    { tag: 'path', d: "m16 16-3 3 3 3" },
    { tag: 'path', d: "M21 5v12a2 2 0 0 1-2 2h-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 400, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(LIST_ROW_YIELD, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(LIST_ARROW_SWING, 320, { easing: SPRING_OUT, origin: '21px 5px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(LIST_ARROW_SWING, 320, { easing: SPRING_OUT, origin: '21px 5px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `list-start`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

/** El mismo recorrido, subiendo. */
export const listStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5h6" },
    { tag: 'path', d: "M3 12h13" },
    { tag: 'path', d: "M3 19h13" },
    { tag: 'path', d: "m16 8-3-3 3-3" },
    { tag: 'path', d: "M21 19V7a2 2 0 0 0-2-2h-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 400, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(LIST_ROW_YIELD, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(LIST_ARROW_SWING_BACK, 320, { easing: SPRING_OUT, origin: '21px 19px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(LIST_ARROW_SWING_BACK, 320, { easing: SPRING_OUT, origin: '21px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `list-end`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

/** El arco da la vuelta y la punta lo remata. */
export const listRestartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M7 12H3" },
    { tag: 'path', d: "M7 19H3" },
    {
      tag: 'path',
      d: "M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14",
    },
    { tag: 'path', d: "M11 10v4h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
      },
    },
  },
);

/** El asta de la nota se traza y la cabeza aparece de golpe: un círculo macizo no se dibuja bien. */
export const listMusicIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M11 12H3" },
    { tag: 'path', d: "M11 19H3" },
    { tag: 'path', d: "M21 16V5" },
    { tag: 'circle', cx: 18, cy: 16, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 400, fill: 'backwards' }),
      },
    },
  },
);

/** El triángulo de reproducir aparece de golpe, por lo mismo. */
export const listVideoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M10 12H3" },
    { tag: 'path', d: "M10 19H3" },
    {
      tag: 'path',
      d: "M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
      },
    },
  },
);

/** Los renglones asoman y después se escriben el uno y el dos, en ese orden. */
export const listOrderedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 5h10" },
    { tag: 'path', d: "M11 12h10" },
    { tag: 'path', d: "M11 19h10" },
    { tag: 'path', d: "M4 4h1v5" },
    { tag: 'path', d: "M4 9h2" },
    { tag: 'path', d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 440, fill: 'backwards' }),
      },
    },
  },
);

/** Las tres barras del embudo asoman de la más ancha a la más angosta: el filtro cerrándose. */
export const listFilterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 5h20" },
    { tag: 'path', d: "M6 12h12" },
    { tag: 'path', d: "M9 19h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** Asoman de la más corta a la más larga, que es lo que el icono nombra. */
export const listSortAscendingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 19h18" },
    { tag: 'path', d: "M15 12H3" },
    { tag: 'path', d: "M9 5H3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `list-sort-descending`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);

/** Y aquí de la más larga a la más corta. */
export const listSortDescendingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 12H3" },
    { tag: 'path', d: "M3 5h18" },
    { tag: 'path', d: "M9 19H3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 80, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `list-sort-ascending`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(-1)' }, { transform: 'none' }], 900),
    },
  },
);
