// Familia `corner` del catálogo curado (8 iconos).
//
// El icono TRAZA SU PROPIA L: avanza por donde entra el trazo, dobla, sale por donde apunta la
// punta, y regresa. Nada aparece y nada se dibuja — la flecha entera está desde el cuadro 0.
//
// Los dos tramos salen del `d` de cada icono, no de una tabla de direcciones: el primero es por
// donde arranca el path y el segundo hacia donde mira la punta. Por eso los ocho recorridos son
// distintos aunque el gesto sea el mismo, y por eso se lee como un DOBLEZ y no como un temblor:
// el primer tramo hace de anticipación, pero además significa algo.
//
// Va en el track raíz a propósito. Moviendo el icono entero, punta y asta quedan soldadas por
// construcción: no hay dos pistas que sincronizar ni offsets que se puedan desfasar.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, moveXSeq, moveYSeq, track, icon } from '../choreography';
/* ── Variante `assemble` ─────────────────────────────────────────────
 *
 * Port de AnimateIcons (Avijit Dey, MIT — ver NOTICE). El easing va POR KEYFRAME y `times`
 * se traduce a `offset`; el porqué de ambas cosas está en el bloque de `pulse` de
 * icons/battery.ts. Las variantes que la familia ya tenía no se tocan.
 *
 * Nuestro orden de figuras está INVERTIDO respecto al suyo en seis de los ocho, así que
 * el índice va icono por icono — mapear por posición aquí anima la figura equivocada.
 */
const EIO = 'ease-in-out';


/** Entra 1.8 y sale 2.6: el tramo de salida manda, porque es hacia donde el icono apunta. */
const DOBLEZ = 620;

/** Baja y dobla a la izquierda. */
export const cornerDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 4v7a4 4 0 0 1-4 4H4" },
    { tag: 'path', d: "m9 10-5 5 5 5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(0, 1.8px)', offset: 0.3 },
        { transform: 'translate(-2.6px, 1.8px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Baja y dobla a la derecha. */
export const cornerDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 10 5 5-5 5" },
    { tag: 'path', d: "M4 4v7a4 4 0 0 0 4 4h12" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(0, 1.8px)', offset: 0.3 },
        { transform: 'translate(2.6px, 1.8px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        0: /* @__PURE__ */ track([{ transform: 'translateX(-3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Va a la izquierda y cae. */
export const cornerLeftDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 15-5 5-5-5" },
    { tag: 'path', d: "M20 4h-7a4 4 0 0 0-4 4v12" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(-1.8px, 0)', offset: 0.3 },
        { transform: 'translate(-1.8px, 2.6px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(-3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Va a la izquierda y sube. */
export const cornerLeftUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 9 9 4 4 9" },
    { tag: 'path', d: "M20 20h-7a4 4 0 0 1-4-4V4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(-1.8px, 0)', offset: 0.3 },
        { transform: 'translate(-1.8px, -2.6px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Va a la derecha y cae. */
export const cornerRightDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 15 5 5 5-5" },
    { tag: 'path', d: "M4 4h7a4 4 0 0 1 4 4v12" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(1.8px, 0)', offset: 0.3 },
        { transform: 'translate(1.8px, 2.6px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(-3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Va a la derecha y sube. */
export const cornerRightUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 9 5-5 5 5" },
    { tag: 'path', d: "M4 20h7a4 4 0 0 0 4-4V4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(1.8px, 0)', offset: 0.3 },
        { transform: 'translate(1.8px, -2.6px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        0: /* @__PURE__ */ track([{ transform: 'translateY(3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Sube y dobla a la izquierda. */
export const cornerUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 20v-7a4 4 0 0 0-4-4H4" },
    { tag: 'path', d: "M9 14 4 9l5-5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(0, -1.8px)', offset: 0.3 },
        { transform: 'translate(-2.6px, -1.8px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Sube y dobla a la derecha. */
export const cornerUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 14 5-5-5-5" },
    { tag: 'path', d: "M4 20v-7a4 4 0 0 1 4-4h12" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([
        { transform: 'translate(0, 0)', offset: 0 },
        { transform: 'translate(0, -1.8px)', offset: 0.3 },
        { transform: 'translate(2.6px, -1.8px)', offset: 0.64 },
        { transform: 'translate(0, 0)', offset: 1 },
      ], DOBLEZ),
    },
    assemble: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', easing: EIO }, { transform: 'scale(1.03)', easing: EIO }, { transform: 'scale(1)' }], 800, { easing: 'linear' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '0 1' }, { strokeDasharray: '1 1' }], 900, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }),
        0: /* @__PURE__ */ track([{ transform: 'translateX(-3px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(3px)', opacity: '1', offset: 0.6, easing: 'ease-out' }, { transform: 'translate(0px, 0px)', opacity: '1', offset: 1 }], 800, { easing: 'linear', delay: 500 }),
      },
    },
    /** La punta toca hacia donde apunta y regresa. Sale del `assemble`: mismo eje y mismo
     *  sentido que su entrada, pero sin dibujar la L y con dos tercios del recorrido. */
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  },
);
