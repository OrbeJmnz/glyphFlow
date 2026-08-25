// Familia `notebook` del catálogo curado (3 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, strokeDraw, icon } from '../choreography';

/**
 * La libreta a secas: la tapa se abre y descubre el lomo que tenía debajo.
 *
 * El truco es puramente geométrico y no hace falta animar nada caro. El rectángulo va de x=4 a
 * x=20 (ancho 16) y el lomo está en x=16. Escalando el rectángulo a 12/16 = 0.75 desde su borde
 * IZQUIERDO, su lado derecho aterriza justo encima del lomo: al empezar se ve UNA sola línea
 * vertical. Al crecer a 1, el lado derecho se va hasta 20 y deja el lomo a la vista.
 *
 * Y se va «junto con las aristas que lo conectan» solo: escalar el `<rect>` mueve su lado derecho
 * y estira la tapa y el fondo con él, que es exactamente lo que hace una tapa al abrirse. Con dos
 * figuras separadas habría que sincronizarlas a mano.
 *
 * Las cuatro anillas se quedan como estaban — su cadencia de 150 ms ya funcionaba.
 */
export const notebookIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M2 6h4' },
    { tag: 'path', d: 'M2 10h4' },
    { tag: 'path', d: 'M2 14h4' },
    { tag: 'path', d: 'M2 18h4' },
    { tag: 'rect', width: 16, height: 20, x: 4, y: 2, rx: 2 },
    { tag: 'path', d: 'M16 2v20' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(
          [{ transform: 'scaleX(0.75)' }, { transform: 'scaleX(1)' }],
          420,
          // Origen en el borde izquierdo del rectángulo: es la bisagra de la tapa.
          { easing: 'ease-out', origin: '4px 12px', fill: 'backwards' },
        ),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 450,
          fill: 'backwards',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 600,
          fill: 'backwards',
        }),
      },
    },
  },
);

export const notebookTabsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M2 6h4' },
    { tag: 'path', d: 'M2 10h4' },
    { tag: 'path', d: 'M2 14h4' },
    { tag: 'path', d: 'M2 18h4' },
    { tag: 'rect', width: 16, height: 20, x: 4, y: 2, rx: 2 },
    { tag: 'path', d: 'M15 2v20' },
    { tag: 'path', d: 'M15 7h5' },
    { tag: 'path', d: 'M15 12h5' },
    { tag: 'path', d: 'M15 17h5' },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 450,
          fill: 'backwards',
        }),
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
  },
);

export const notebookTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M2 6h4' },
    { tag: 'path', d: 'M2 10h4' },
    { tag: 'path', d: 'M2 14h4' },
    { tag: 'path', d: 'M2 18h4' },
    { tag: 'rect', width: 16, height: 20, x: 4, y: 2, rx: 2 },
    { tag: 'path', d: 'M9.5 8h5' },
    { tag: 'path', d: 'M9.5 12H16' },
    { tag: 'path', d: 'M9.5 16H14' },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 300,
          fill: 'backwards',
        }),
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
  },
);

export const notebookPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4' },
    { tag: 'path', d: 'M2 6h4' },
    { tag: 'path', d: 'M2 10h4' },
    { tag: 'path', d: 'M2 14h4' },
    { tag: 'path', d: 'M2 18h4' },
    {
      tag: 'path',
      d: 'M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
    },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 },
            { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 },
            { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 },
            { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 },
          ],
          500,
          { easing: EASE },
        ),
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
  },
);
