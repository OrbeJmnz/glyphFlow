// Familia `move` del catálogo curado (12 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_SNAPPY, track, strokeDraw, icon } from '../choreography';
import { moveShapes, moveRightShapes } from '../animated-icons.shapes';

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

const E2_PUSH_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1px)', offset: 0.28 },
  { transform: 'translateY(-1.5px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

const E2_PUSH_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.28 },
  { transform: 'translateX(-1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

export const moveDiagonal2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 13v6h-6" },
    { tag: 'path', d: "M5 11V5h6" },
    { tag: 'path', d: "m5 5 14 14" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(-3px, -3px)', offset: 0.25 }, { transform: 'translate(0, 0)', offset: 0.45 }, { transform: 'translate(0, 0)', offset: 0.55 }, { transform: 'translate(3px, 3px)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000),
    },
  },
);

export const moveDiagonalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 19H5v-6" },
    { tag: 'path', d: "M13 5h6v6" },
    { tag: 'path', d: "M19 5 5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(3px, -3px)', offset: 0.25 }, { transform: 'translate(0, 0)', offset: 0.45 }, { transform: 'translate(0, 0)', offset: 0.55 }, { transform: 'translate(-3px, 3px)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 19H5V13" },
    { tag: 'path', d: "M19 5L5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, 3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 13V19H13" },
    { tag: 'path', d: "M5 5L19 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, 3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

export const moveDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 18L12 22L16 18" },
    { tag: 'path', d: "M12 2V22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(3px)' }, { transform: 'translateY(0)' }], 500),
    },
  },
);

export const moveHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 8 4 4-4 4" },
    { tag: 'path', d: "M2 12h20" },
    { tag: 'path', d: "m6 8-4 4 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-3px)', offset: 0.25 }, { transform: 'translateX(0)', offset: 0.45 }, { transform: 'translateX(0)', offset: 0.55 }, { transform: 'translateX(3px)', offset: 0.75 }, { transform: 'translateX(0)', offset: 1 }], 1000),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 8L2 12L6 16" },
    { tag: 'path', d: "M2 12H22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
    },
  },
);

/**
 * Mover a la derecha: la punta se recoge y sale disparada. El asta NO se mueve, y no es pereza —
 * a diferencia de `arrow-right` (que va de 5 a 19 y tiene aire para deslizarse entero), esta flecha
 * cruza el viewBox de borde a borde (x 2→22). El `<svg>` raíz recorta por defecto, así que
 * cualquier traslación del conjunto se comería la punta o el nacimiento del asta. El gesto se va a
 * la única figura que sí tiene margen.
 */
/*
 * ── `move`, el icono sin dirección propia ────────────────────────────────────────────────────
 *
 * El asta mide 20 (de 2 a 22) y la punta viaja 2.5 hacia dentro, así que el asta tiene que
 * acortarse 2.5 por cada extremo: 15/20 = 0.75. Si no, la punta se despega de su línea y se ve
 * como dos piezas sueltas en vez de una flecha.
 *
 * Escalar desde el centro del viewBox deja la intersección de 90° CLAVADA, que es lo que hace que
 * la cruz siga siendo una cruz mientras se comprime.
 */
const MOVE_CENTRO = '12px 12px';

/*
 * Los factores van ESCRITOS (0.75 encoge, 1.25 crece) y no salen de una constante interpolada.
 * Un literal de plantilla obliga a un `ToString` del valor y esbuild no puede darlo por inocuo:
 * con la constante interpolada dentro de los keyframes, `bundle-check` medía 5.24 KB en el caso
 * de UN icono —por encima del presupuesto de 5— y 4.99 en el core contra 4.60. Misma familia de
 * problema que el helper que ya se quitó de aquí: una expresion que el empaquetador no puede
 * demostrar limpia ancla el módulo entero.
 */

/**
 * Las cuatro direcciones, por parejas de eje.
 *
 * Primero el eje vertical entero —sus dos puntas Y su asta— y después el horizontal. Antes iban
 * las cuatro puntas escalonadas en reloj y las astas quietas: se veía bien de a una, pero las
 * puntas se despegaban de sus líneas. Por eje, cada punta viaja pegada a lo suyo.
 *
 * El desfase entre los dos ejes es lo que lo mantiene coreografía: los cuatro a la vez serían un
 * bloque, que es justo lo que el catálogo evita.
 */
export const moveIcon: AnimatedIconDef = /* @__PURE__ */ icon(moveShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(0.75)', offset: 0.6 },
            { transform: 'scaleY(1)' },
          ],
          440,
          { origin: MOVE_CENTRO },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(2.5px)', offset: 0.6 },
            { transform: 'translateY(0)' },
          ],
          440,
        ),
        1: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-2.5px)', offset: 0.6 },
            { transform: 'translateY(0)' },
          ],
          440,
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(0.75)', offset: 0.6 },
            { transform: 'scaleX(1)' },
          ],
          440,
          { origin: MOVE_CENTRO, delay: 150, fill: 'backwards' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-2.5px)', offset: 0.6 },
            { transform: 'translateX(0)' },
          ],
          440,
          { delay: 150, fill: 'backwards' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(2.5px)', offset: 0.6 },
            { transform: 'translateX(0)' },
          ],
          440,
          { delay: 150, fill: 'backwards' },
        ),
      },
    },

    /**
     * `expand`: las cuatro salen, con sus astas, y la cruz se estira sin moverse del centro.
     *
     * Es un ESTADO sostenido, no un tic: se queda mientras el puntero esté encima y se devuelve al
     * salir. Misma semántica que el helper `held`, escrita a mano porque `held` anima el root y
     * aquí hace falta figura por figura — de ahí `SPRING_SNAPPY`, `fill: 'forwards'` y
     * `reverseOnLeave`. El resorte es `snappy` y no `bouncy` a propósito: al salir esto se
     * reproduce en REVERSA, y un sobrepaso grande se vería al revés de como debe.
     */
    expand: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.25)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards', origin: MOVE_CENTRO },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.25)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards', origin: MOVE_CENTRO },
        ),
        5: /* @__PURE__ */ track(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
        4: /* @__PURE__ */ track(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },

    /**
     * `collapse`: las cuatro se recogen A LA VEZ, en los dos ejes, y ahí se quedan.
     *
     * Aquí el bloque es deliberado y no un descuido: no es un gesto, es una POSE. Cuatro figuras
     * llegando juntas a un estado que se sostiene se lee como una sola cosa encogiéndose, que es
     * exactamente lo que se pide. La regla de «a la vez es bloque» habla de gestos.
     */
    collapse: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.75)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards', origin: MOVE_CENTRO },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.75)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards', origin: MOVE_CENTRO },
        ),
        5: /* @__PURE__ */ track(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
        4: /* @__PURE__ */ track(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(2.5px)' }],
          320,
          { easing: SPRING_SNAPPY, fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  });

export const moveRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(moveRightShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translateX(0)' },
            // 0.6: recogerse tarda más que salir. Simétrico se siente un temblor, no un disparo.
            { transform: 'translateX(-2.5px)', offset: 0.6 },
            { transform: 'translateX(0)' },
          ],
          440,
        ),
      },
    },
  });

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 11V5H11" },
    { tag: 'path', d: "M5 5L19 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, -3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 5H19V11" },
    { tag: 'path', d: "M19 5L5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, -3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

export const moveUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 6L12 2L16 6" },
    { tag: 'path', d: "M12 2V22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)' }, { transform: 'translateY(0)' }], 500),
    },
  },
);

export const moveVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v20" },
    { tag: 'path', d: "m8 18 4 4 4-4" },
    { tag: 'path', d: "m8 6 4-4 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-3px)', offset: 0.25 }, { transform: 'translateY(0)', offset: 0.45 }, { transform: 'translateY(0)', offset: 0.55 }, { transform: 'translateY(3px)', offset: 0.75 }, { transform: 'translateY(0)', offset: 1 }], 1000),
    },
  },
);

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Los ejes se despliegan y las dos puntas llegan a sus extremos. */
export const move3dIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3v16h16" },
    { tag: 'path', d: "m5 19 6-6" },
    { tag: 'path', d: "m2 6 3-3 3 3" },
    { tag: 'path', d: "m18 16 3 3-3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 220, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_PUSH_UP, 560, { easing: EASE, delay: 400, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_PUSH_LEFT, 560, { easing: EASE, delay: 400, fill: 'backwards' }),
      },
    },
  },
);
