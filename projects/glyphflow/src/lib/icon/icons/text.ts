// Familia `text` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, track, strokeDraw, icon } from '../choreography';

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
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
const T5_DECEL = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const textAlignCenterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M17 12H7" },
    { tag: 'path', d: "M19 19H5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(3px)', offset: 0.2 }, { transform: 'translateX(-3px)', offset: 0.4 }, { transform: 'translateX(2px)', offset: 0.6 }, { transform: 'translateX(0)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textCursorInputIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" },
    { tag: 'path', d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" },
    { tag: 'path', d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" },
    { tag: 'path', d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" },
    { tag: 'path', d: "M9 6v12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textCursorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" },
    { tag: 'path', d: "M7 22h1a4 4 0 0 0 4-4" },
    { tag: 'path', d: "M7 2h1a4 4 0 0 1 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, { easing: 'linear' }),
    },
  },
);

export const textSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M10 12H3" },
    { tag: 'path', d: "M10 19H3" },
    { tag: 'circle', cx: 17, cy: 15, r: 3 },
    { tag: 'path', d: "m21 19-1.9-1.9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.25 }, { transform: 'scaleX(0.7)', offset: 0.5 }, { transform: 'scaleX(1)', offset: 1 }], 1000, { easing: EASE }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.3 }, { transform: 'scaleX(0.8)', offset: 0.5 }, { transform: 'scaleX(1)', offset: 1 }], 1000, { easing: EASE, delay: 50 }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
      },
    },
  },
);

/** Los renglones se despliegan desde el margen derecho, que es el que los alinea. */
/**
 * La línea LLEGA a su alineación desplegándose desde el margen que la sujeta.
 *
 * `text-align-center` lo hacía trasladando, y ese es el concepto que se conserva —el renglón
 * buscando su sitio—, pero no la técnica: sus líneas van de x=3 a x=21 y un desplazamiento de 3
 * las saca del lienzo por el lado al que viajan. Desplegándose desde el margen no se salen nunca,
 * porque ninguna pasa de su propio tamaño, y se ve de dónde las sujeta la alineación.
 */
const TEXT_SETTLE = /* @__PURE__ */ [{ transform: 'scaleX(0.3)' }, { transform: 'scaleX(1)' }];

/** La inicial es la protagonista: crece cuando el texto ya está puesto. */
const TEXT_INITIAL_POP = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.22)' },
  { transform: 'scale(1)' },
];

/** La barra de una cita baja en vez de estirarse a lo ancho. */
const TEXT_SETTLE_Y = /* @__PURE__ */ [{ transform: 'scaleY(0.2)' }, { transform: 'scaleY(1)' }];

export const textAlignEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M21 12H9" },
    { tag: 'path', d: "M21 19H7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '21px 5px' }),
        1: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '21px 12px', delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '21px 19px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

/** Justificado: los renglones se estiran desde el centro hasta tocar los dos márgenes. */
export const textAlignJustifyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5h18" },
    { tag: 'path', d: "M3 12h18" },
    { tag: 'path', d: "M3 19h18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '12px 5px' }),
        1: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '12px 12px', delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '12px 19px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

export const textAlignStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M15 12H3" },
    { tag: 'path', d: "M17 19H3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '3px 5px' }),
        1: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '3px 12px', delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '3px 19px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

/** El texto se pone y la inicial crece al final: es la que da nombre al icono. */
export const textInitialIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 5h6" },
    { tag: 'path', d: "M15 12h6" },
    { tag: 'path', d: "M3 19h18" },
    { tag: 'path', d: "m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12" },
    { tag: 'path', d: "M3.92 10h6.16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '21px 5px' }),
        1: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '21px 12px', delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '3px 19px', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(TEXT_INITIAL_POP, 460, { easing: EASE, origin: '7px 8px', delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track(TEXT_INITIAL_POP, 460, { easing: EASE, origin: '7px 8px', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

/** La barra de la cita baja primero y después entra lo citado, sangrado tras ella. */
export const textQuoteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 5H3" },
    { tag: 'path', d: "M21 12H8" },
    { tag: 'path', d: "M21 19H8" },
    { tag: 'path', d: "M3 12v7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '3px 5px', delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '8px 12px', delay: 250, fill: 'backwards' }),
        2: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '8px 19px', delay: 340, fill: 'backwards' }),
        3: /* @__PURE__ */ track(TEXT_SETTLE_Y, 380, { easing: SPRING_OUT, origin: '3px 12px' }),
      },
    },
  },
);

/** El renglón se traza hasta que no cabe, da la vuelta y la flecha remata el salto. */
export const textWrapIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 16-3 3 3 3" },
    { tag: 'path', d: "M3 12h14.5a1 1 0 0 1 0 7H13" },
    { tag: 'path', d: "M3 19h6" },
    { tag: 'path', d: "M3 5h18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        2: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '3px 19px', delay: 620, fill: 'backwards' }),
        3: /* @__PURE__ */ track(TEXT_SETTLE, 460, { easing: SPRING_OUT, origin: '3px 5px' }),
      },
    },
    reveal: {
      shapes: {
        3: /* @__PURE__ */ track([{ opacity: '0', strokeDasharray: '0 1' }, { opacity: '1', strokeDasharray: '1 1' }], 450, { easing: T5_DECEL, delay: 50, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: '0', strokeDasharray: '0 1' }, { opacity: '1', strokeDasharray: '1 1' }], 450, { easing: T5_DECEL, delay: 170, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: '0', strokeDasharray: '0 1' }, { opacity: '1', strokeDasharray: '1 1' }], 450, { easing: T5_DECEL, delay: 290, fill: 'backwards' }),
        0: /* @__PURE__ */ track([{ opacity: '0', strokeDasharray: '0 1' }, { opacity: '1', strokeDasharray: '1 1' }], 450, { easing: T5_DECEL, delay: 410, fill: 'backwards' }),
      },
    },
  },
);
