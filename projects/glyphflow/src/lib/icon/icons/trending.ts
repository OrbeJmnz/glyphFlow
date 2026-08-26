// Familia `trending` del catálogo curado (3 iconos).
//
// La tendencia CRECE desde donde empieza. Nada se dibuja: la línea y su corchete escalan con el
// MISMO pivote y los mismos keyframes, o sea como un solo cuerpo estirándose hacia donde va la
// tendencia. Por eso el corchete no puede despegarse de la línea — no es que vaya sincronizado,
// es que es la misma transformación.
//
// El pivote es el punto donde arranca el trazo, leído de la geometría: (2,17) para el que sube,
// (2,7) para el que baja. Escalar desde el centro haría que la línea creciera hacia los DOS
// lados, y una tendencia que crece hacia atrás no dice nada.
//
// El sobrepaso se queda en 1.03 por el lienzo: a 1.05 el extremo del que sube se sale del cuadro.
import { AnimatedIconDef } from '../animated-icon.model';
import { track, icon } from '../choreography';

const CRECIMIENTO = 560;

/** Sube: crece desde la esquina de abajo a la izquierda, que es donde empieza. */
export const trendingUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 7h6v6" },
    { tag: 'path', d: "m22 7-8.5 8.5-5-5L2 17" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], CRECIMIENTO, { origin: '2px 17px' }),
        0: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], CRECIMIENTO, { origin: '2px 17px' }),
      },
    },
  },
);

/** Baja: crece desde arriba a la izquierda. */
export const trendingDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 17h6v-6" },
    { tag: 'path', d: "m22 17-8.5-8.5-5 5L2 7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], CRECIMIENTO, { origin: '2px 7px' }),
        0: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], CRECIMIENTO, { origin: '2px 7px' }),
      },
    },
  },
);

/**
 * Dos tendencias con su propio origen cada una: primero crece la que sube desde (2,14), y de la
 * bifurcación sale la que baja. El desfase ES el icono — sin él son dos líneas apareciendo.
 */
export const trendingUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14.828 14.828 21 21" },
    { tag: 'path', d: "M21 16v5h-5" },
    { tag: 'path', d: "m21 3-9 9-4-4-6 6" },
    { tag: 'path', d: "M21 8V3h-5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], 520, { origin: '2px 14px' }),
        3: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], 520, { origin: '2px 14px' }),
        0: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], 460, { origin: '14.828px 14.828px', delay: 260 }),
        1: /* @__PURE__ */ track([
          { transform: 'scale(0.8)', offset: 0 },
          { transform: 'scale(1.03)', offset: 0.72 },
          { transform: 'scale(1)', offset: 1 },
        ], 460, { origin: '14.828px 14.828px', delay: 260 }),
      },
    },
  },
);
