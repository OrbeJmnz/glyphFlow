// Familia `radio` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, strokeDraw, icon } from '../choreography';

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Late una vez. */
const E2_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Aparece de golpe con un rebote corto. */
const E2_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

/** Parpadea: un indicador encendido, un aviso. */
const E2_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/* ── Variantes de la tanda 6 ──────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). Easing por keyframe, `times` como
 * `offset`, y un solo ciclo donde el original repite infinito — en glyphflow el bucle es un
 * input del componente, no una propiedad de la variante.
 *
 * Donde el trazo se dibuja de cero y dejaría el icono incompleto va una GUÍA: una figura anexa
 * con `opacity: '0'` que se enciende tenue mientras dura el gesto. Mismo mecanismo que las
 * monedas y que la arista de `archive`.
 */
const T6_EASE = 'ease-in-out';

export const radioOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.414 13.414a2 2 0 1 1-2.828-2.828" },
    { tag: 'path', d: "M16.247 7.761a6 6 0 0 1 1.744 4.572" },
    { tag: 'path', d: "M19.075 4.933a10 10 0 0 1 2.234 10.72" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M4.925 19.067a10 10 0 0 1 0-14.134" },
    { tag: 'path', d: "M7.753 16.239a6 6 0 0 1 0-8.478" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const radioTowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" },
    { tag: 'path', d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" },
    { tag: 'circle', cx: 12, cy: 9, r: 2 },
    { tag: 'path', d: "M16.2 4.8c2 2 2.26 5.11.8 7.47" },
    { tag: 'path', d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" },
    { tag: 'path', d: "M9.5 18h5" },
    { tag: 'path', d: "m8 22 4-11 4 11" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 150 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const radioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16.247 7.761a6 6 0 0 1 0 8.478" },
    { tag: 'path', d: "M19.075 4.933a10 10 0 0 1 0 14.134" },
    { tag: 'path', d: "M4.925 19.067a10 10 0 0 1 0-14.134" },
    { tag: 'path', d: "M7.753 16.239a6 6 0 0 1 0-8.478" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 150 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
      },
    },
    pulse: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.92)', opacity: '0.2', easing: T6_EASE }, { transform: 'scale(1.06)', opacity: '1', easing: T6_EASE }, { transform: 'scale(0.92)', opacity: '0.2' }], 1200, { easing: 'linear', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'scale(0.92)', opacity: '0.2', easing: T6_EASE }, { transform: 'scale(1.06)', opacity: '1', easing: T6_EASE }, { transform: 'scale(0.92)', opacity: '0.2' }], 1200, { easing: 'linear', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'scale(0.92)', opacity: '0.2', easing: T6_EASE }, { transform: 'scale(1.06)', opacity: '1', easing: T6_EASE }, { transform: 'scale(0.92)', opacity: '0.2' }], 1200, { easing: 'linear', origin: '12px 12px', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scale(0.92)', opacity: '0.2', easing: T6_EASE }, { transform: 'scale(1.06)', opacity: '1', easing: T6_EASE }, { transform: 'scale(0.92)', opacity: '0.2' }], 1200, { easing: 'linear', origin: '12px 12px', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** El indicador parpadea: está sintonizando. */
export const radioReceiverIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 16v2" },
    { tag: 'path', d: "M19 16v2" },
    { tag: 'rect', x: 2, y: 8, width: 20, height: 8, rx: 2 },
    { tag: 'path', d: "M18 12h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '5px 17px', delay: 260, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '19px 17px', delay: 320, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: 'center' }),
        3: /* @__PURE__ */ track(E2_BLINK, 700, { easing: EASE, delay: 160, fill: 'backwards' }),
      },
    },
  },
);
