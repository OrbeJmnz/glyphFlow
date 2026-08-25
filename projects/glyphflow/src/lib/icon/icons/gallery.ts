// Familia `gallery` del catálogo curado (4 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';

/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** Aparece de golpe con un rebote corto. Para lo macizo, que un trazo no le luce. */
const E1_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

export const galleryHorizontalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 7v10" },
    { tag: 'path', d: "M6 5v14" },
    { tag: 'rect', width: 12, height: 18, x: 10, y: 3, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(3px)', offset: 0 }, { opacity: 0, transform: 'translateX(3px)', offset: 0.6 }, { opacity: 1, transform: 'translateX(0)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 600),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(3px)', offset: 0 }, { opacity: 0, transform: 'translateX(3px)', offset: 0.4 }, { opacity: 1, transform: 'translateX(0)', offset: 0.6 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 600),
      },
    },
  },
);

export const galleryHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 3v18" },
    { tag: 'rect', width: 12, height: 18, x: 6, y: 3, rx: 2 },
    { tag: 'path', d: "M22 3v18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateX(4px)' }, { opacity: 1, transform: 'scale(1) translateX(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateX(-4px)' }, { opacity: 1, transform: 'scale(1) translateX(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
      },
    },
  },
);

export const galleryVerticalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 2h10" },
    { tag: 'path', d: "M5 6h14" },
    { tag: 'rect', width: 18, height: 12, x: 3, y: 10, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(3px)', offset: 0 }, { opacity: 0, transform: 'translateY(3px)', offset: 0.6 }, { opacity: 1, transform: 'translateY(0)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 600),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(3px)', offset: 0 }, { opacity: 0, transform: 'translateY(3px)', offset: 0.4 }, { opacity: 1, transform: 'translateY(0)', offset: 0.6 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 600),
      },
    },
  },
);

export const galleryVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 2h18" },
    { tag: 'rect', width: 18, height: 12, x: 3, y: 6, rx: 2 },
    { tag: 'path', d: "M3 22h18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateY(4px)' }, { opacity: 1, transform: 'scale(1) translateY(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateY(-4px)' }, { opacity: 1, transform: 'scale(1) translateY(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
      },
    },
  },
);

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Las miniaturas se encienden de izquierda a derecha, como quien pasa la galería. */
export const galleryThumbnailsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 14, rx: 2 },
    { tag: 'path', d: "M4 21h1" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M19 21h1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '4.5px 21px' }),
        2: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '9.5px 21px', delay: 80, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '14.5px 21px', delay: 160, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '19.5px 21px', delay: 240, fill: 'backwards' }),
      },
    },
  },
);
