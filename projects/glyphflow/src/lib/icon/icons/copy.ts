// Familia `copy` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';
import { copyCheckShapes, copyMinusShapes, copyPlusShapes, copyShapes, copySlashShapes, copyXShapes } from '../animated-icons.shapes';

/** Copiar: la hoja de enfrente se desliza y vuelve — el gesto de sacar una copia. */
const COPY_HANDSHAKE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(1.5px, -1.5px)' },
  { transform: 'translate(0, 0)' },
];

/**
 * LA INSIGNIA VA MONTADA EN LA HOJA.
 *
 * La palomita de `copy-check`, el "+" de `copy-plus` y sus hermanos están dibujados DENTRO del
 * rectángulo de enfrente. Hasta ahora la hoja se deslizaba y la insignia se quedaba clavada en su
 * sitio: la marca se despegaba del papel. Ahora las dos figuras llevan el MISMO desplazamiento.
 *
 * Van en dos listas y no en una porque `shapes` admite un track por figura. Lo que las mantiene
 * pegadas es que comparten duración, easing y los offsets del desplazamiento — WAAPI aplica el
 * easing de `options` al progreso de la iteración, no a cada tramo, así que dos listas con los
 * mismos offsets interpolan idéntico. Meterle un keyframe extra a una sola es inofensivo MIENTRAS
 * su transform no cambie (por eso el trazo de la insignia cabe antes sin desincronizar nada).
 *
 * El trazo ya no va con `delay`: primero se dibuja la insignia, y ENTONCES la hoja se desliza con
 * ella encima. Es el orden que cuenta la historia — se marca el papel y luego se saca la copia.
 */
const COPY_BEAT_MS = 950;
const COPY_SALE = 0.368;

const COPY_SHEET = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 0)', offset: COPY_SALE },
  { transform: 'translate(1.5px, -1.5px)', offset: 0.684 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** `finTrazo` = en qué punto termina de dibujarse esta pieza. Siempre antes de `COPY_SALE`. */
const copyBadge = (finTrazo: number): Keyframe[] => [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0 },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0, 0)', offset: finTrazo },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0, 0)', offset: COPY_SALE },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(1.5px, -1.5px)', offset: 0.684 },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0, 0)', offset: 1 },
];

/**
 * `peel` YA NO es una versión más brusca de `default` (mismo gesto, más lejos): es la animación
 * `active` de la hoja base (`copyIcon`) — las dos hojas se SEPARAN de verdad, en diagonales
 * opuestas, y se QUEDAN separadas mientras dura el hover — más el dibujo de la insignia MONTADA en
 * la hoja de enfrente. Comparten offsets con la hoja de enfrente (mismo criterio que
 * `COPY_SHEET`/`copyBadge` arriba): si la insignia se moviera con otro offset, se despegaría del
 * papel a medio camino.
 */
const PEEL_ACTIVE_MS = 500;
const PEEL_ACTIVE_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'; // el mismo easing de `copyIcon.active`.
const PEEL_ACTIVE_SALE = 0.4; // la insignia termina de dibujarse y ENTONCES las hojas se separan.

const PEEL_FRONT = /* @__PURE__ */ [
  { transform: 'translate(0px, 0px)', offset: 0 },
  { transform: 'translate(0px, 0px)', offset: PEEL_ACTIVE_SALE },
  { transform: 'translate(-3px, -3px)', offset: 1 },
];
const PEEL_BACK = /* @__PURE__ */ [
  { transform: 'translate(0px, 0px)', offset: 0 },
  { transform: 'translate(0px, 0px)', offset: PEEL_ACTIVE_SALE },
  { transform: 'translate(3px, 3px)', offset: 1 },
];

/** `finTrazo` = en qué punto termina de dibujarse la insignia. Siempre antes de `PEEL_ACTIVE_SALE`. */
const peelBadge = (finTrazo: number): Keyframe[] => [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0px, 0px)', offset: 0 },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0px, 0px)', offset: finTrazo },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0px, 0px)', offset: PEEL_ACTIVE_SALE },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(-3px, -3px)', offset: 1 },
];

export const copyIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(COPY_HANDSHAKE, 600) } },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const copyCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_SHEET, COPY_BEAT_MS, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ copyBadge(0.295), COPY_BEAT_MS, { easing: EASE }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(PEEL_FRONT, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        2: /* @__PURE__ */ track(PEEL_BACK, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ peelBadge(0.32), PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Quitar copia: se separa y el "-" se dibuja de insignia. */
export const copyMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_SHEET, COPY_BEAT_MS, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ copyBadge(0.232), COPY_BEAT_MS, { easing: EASE }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(PEEL_FRONT, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        2: /* @__PURE__ */ track(PEEL_BACK, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ peelBadge(0.24), PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Agregar copia: se separa y el "+" se dibuja de insignia, en dos trazos. */
export const copyPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyPlusShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_SHEET, COPY_BEAT_MS, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ copyBadge(0.232), COPY_BEAT_MS, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ copyBadge(0.32), COPY_BEAT_MS, { easing: EASE }),
      },
    },
    peel: {
      shapes: {
        2: /* @__PURE__ */ track(PEEL_FRONT, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        3: /* @__PURE__ */ track(PEEL_BACK, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ peelBadge(0.24), PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ peelBadge(0.34), PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Copia inválida: se separa y una sola diagonal la tacha. */
export const copySlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(copySlashShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_SHEET, COPY_BEAT_MS, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ copyBadge(0.253), COPY_BEAT_MS, { easing: EASE }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(PEEL_FRONT, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        2: /* @__PURE__ */ track(PEEL_BACK, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ peelBadge(0.26), PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Cancelar copia: se separa y la equis se dibuja de insignia. */
export const copyXIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyXShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_SHEET, COPY_BEAT_MS, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ copyBadge(0.232), COPY_BEAT_MS, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ copyBadge(0.35), COPY_BEAT_MS, { easing: EASE }),
      },
    },
    peel: {
      shapes: {
        2: /* @__PURE__ */ track(PEEL_FRONT, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        3: /* @__PURE__ */ track(PEEL_BACK, PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ peelBadge(0.24), PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ peelBadge(0.36), PEEL_ACTIVE_MS, { easing: PEEL_ACTIVE_EASE, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });
