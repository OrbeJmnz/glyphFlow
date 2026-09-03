// Familia `chart` del catálogo curado (23 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, strokeDraw, icon } from '../choreography';
import { chartColumnShapes } from '../animated-icons.shapes';

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

export const chartAreaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 700, { easing: 'ease-out' }),
      },
    },
  },
);

export const chartBarBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 7, y: 13, width: 9, height: 4, rx: 1 },
    { tag: 'rect', x: 7, y: 5, width: 12, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

export const chartBarStackedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 13v4" },
    { tag: 'path', d: "M15 5v4" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 7, y: 13, width: 9, height: 4, rx: 1 },
    { tag: 'rect', x: 7, y: 5, width: 12, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

export const chartColumnStackedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 13H7" },
    { tag: 'path', d: "M19 9h-4" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 15, y: 5, width: 4, height: 12, rx: 1 },
    { tag: 'rect', x: 7, y: 8, width: 4, height: 9, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px', delay: 110, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px' }),
      },
    },
  },
);

export const chartColumnBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 15, y: 5, width: 4, height: 12, rx: 1 },
    { tag: 'rect', x: 7, y: 8, width: 4, height: 9, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px', delay: 110, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px' }),
      },
    },
  },
);

export const chartCandlestickIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 5v4" },
    { tag: 'rect', width: 4, height: 6, x: 7, y: 9, rx: 1 },
    { tag: 'path', d: "M9 15v2" },
    { tag: 'path', d: "M17 3v2" },
    { tag: 'rect', width: 4, height: 8, x: 15, y: 5, rx: 1 },
    { tag: 'path', d: "M17 13v3" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 460, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 9px', delay: 110, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 460, fill: 'backwards' }),
      },
    },
  },
);

export const chartNetworkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m13.11 7.664 1.78 2.672" },
    { tag: 'path', d: "m14.162 12.788-3.324 1.424" },
    { tag: 'path', d: "m20 4-6.06 1.515" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'circle', cx: 12, cy: 6, r: 2 },
    { tag: 'circle', cx: 16, cy: 12, r: 2 },
    { tag: 'circle', cx: 9, cy: 15, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 460, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '12px 6px' }),
        5: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '16px 12px', delay: 90, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '9px 15px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

export const chartBarDecreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 11h8" },
    { tag: 'path', d: "M7 16h3" },
    { tag: 'path', d: "M7 6h12" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartBarIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 11h8" },
    { tag: 'path', d: "M7 16h12" },
    { tag: 'path', d: "M7 6h3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartBarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 16h8" },
    { tag: 'path', d: "M7 11h12" },
    { tag: 'path', d: "M7 6h3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartColumnDecreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 17V9" },
    { tag: 'path', d: "M18 17v-3" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M8 17V5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartColumnIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 17V9" },
    { tag: 'path', d: "M18 17V5" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M8 17v-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartGanttIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 6h8" },
    { tag: 'path', d: "M12 16h6" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M8 11h7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "m19 9-5 5-4-4-3 3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 700, { easing: 'ease-in-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesColumnDecreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21V3" },
    { tag: 'path', d: "M12 21V9" },
    { tag: 'path', d: "M19 21v-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chart-no-axes-column-increasing`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesColumnIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21v-6" },
    { tag: 'path', d: "M12 21V9" },
    { tag: 'path', d: "M19 21V3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
    // `flip`: ensena su opuesto y vuelve. El destino no es una pose inventada --
    // es `chart-no-axes-column-decreasing`, punto por punto: se midio muestreando ambas geometrias.
    // Por eso cabe en el lienzo por construccion, sin nada que comprobar.
    // Va en `root` y sin `origin`: el default 50% 50% ES (12, 12) en un viewBox
    // de 24, y en porcentaje sigue centrado a cualquier tamano de render.
    flip: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(-1)' }, { transform: 'none' }], 900),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesColumnIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21v-6" },
    { tag: 'path', d: "M12 21V3" },
    { tag: 'path', d: "M19 21V9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesCombinedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 16v5" },
    { tag: 'path', d: "M16 14.639V21" },
    { tag: 'path', d: "M20 10.656V21" },
    { tag: 'path', d: "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" },
    { tag: 'path', d: "M4 18.463V21" },
    { tag: 'path', d: "M8 14.656V21" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 300 }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 400 }),
        5: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 900, { easing: 'ease' }),
      },
    },
    mark: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', easing: T5_EASE }, { transform: 'scale(1.04) rotate(-1.5deg)', easing: T5_EASE }, { transform: 'scale(0.99) rotate(1deg)', easing: T5_EASE }, { transform: 'scale(1) rotate(0deg)' }], 800, { easing: 'linear' }),
      shapes: {
        3: /* @__PURE__ */ track([{ opacity: '0.6', strokeDasharray: '0 1' }, { opacity: '1', strokeDasharray: '1 1' }], 1000, { easing: T5_EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesGanttIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 5h12" },
    { tag: 'path', d: "M4 12h10" },
    { tag: 'path', d: "M12 19h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

export const chartPieIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" },
    { tag: 'path', d: "M21.21 15.89A10 10 0 1 1 8 2.83" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.1px, -1.1px)' }], 600, { easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.5)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chartScatterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 7.5, cy: 7.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 18.5, cy: 5.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 11.5, cy: 11.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 7.5, cy: 16.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 17.5, cy: 14.5, r: 0.5, fill: "currentColor" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  },
);

export const chartSplineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 700, { easing: 'ease-in-out' }),
      },
    },
  },
);

/** Gráfica: las barras crecen desde su base, de la más alta a la más baja. */
export const chartColumnIcon: AnimatedIconDef = /* @__PURE__ */ icon(chartColumnShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          delay: 90,
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          delay: 180,
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
  });
