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
import { track, icon } from '../choreography';

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
  },
);
