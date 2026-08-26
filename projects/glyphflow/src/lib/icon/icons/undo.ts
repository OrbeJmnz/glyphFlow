// Familia `undo` del catálogo curado (3 iconos).
//
// Espejo EXACTO de `redo`, `redo-2` y `redo-dot`, que ya estaban curados en curated-icons.ts:
// mismos keyframes, mismos tiempos, mismo easing. Deshacer y rehacer son el mismo gesto en
// sentidos opuestos, y Lucide ya escribió cada arco en el suyo — el trazo se invierte solo.
//
// Si algún día se ajusta el timing de `redo`, este archivo se ajusta con él. Están separados
// porque el catálogo agrupa por familia, no porque sean decisiones independientes.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, track, strokeDraw, icon } from '../choreography';

/** El arco se traza de vuelta y la punta se dibuja al llegar. */
export const undoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 7v6h6" },
    { tag: 'path', d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo con el arco cerrado. */
export const undo2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 14 4 9l5-5" },
    { tag: 'path', d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

/**
 * Solo el punto se mueve, igual que en `redo-dot` — y sin `origin`, también igual: escala
 * respecto al centro del lienzo, así que además de crecer BAJA hasta su sitio. Es el gesto que ya
 * se publicó, no un descuido.
 *
 * OJO con el índice: en `redo-dot` el punto es la figura 0 y aquí es la 2. Copiar el número en
 * vez de la intención anima el arco y deja el punto quieto.
 */
export const undoDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 17a9 9 0 0 0-15-6.7L3 13" },
    { tag: 'path', d: "M3 7v6h6" },
    { tag: 'circle', cx: 12, cy: 17, r: 1 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT }),
      },
    },
  },
);
