// Familia `globe` del catálogo curado (5 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef, IconChoreography } from '../animated-icon.model';
import { SPRING_OUT, rotateSeq, moveYSeq, track, burst, strokeDraw, icon } from '../choreography';
import { globeCheckShapes, globeLockShapes, globeOffShapes, globeShapes, globeXShapes } from '../animated-icons.shapes';

// Con estas variantes el meridiano y el ecuador van todos soldados en un solo trazo (no hay
// figura separada que "girar" como en globe), así que el cuerpo late tantito en vez de girar, y
// la insignia se dibuja después.
const GLOBE_PULSE = /* @__PURE__ */ [
  { transform: 'scaleX(1)' },
  { transform: 'scaleX(0.94)' },
  { transform: 'scaleX(1)' },
];

/** Globo girando: achicar el meridiano en X lee como rotación sin deformar nada. */
export const globeIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }],
          1100,
          { origin: '12px 12px' },
        ),
      },
    },
  });

/** Verificado en línea: el globo late y la palomita se dibuja de insignia. */
export const globeCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }),
      },
    },
    /** Confirmación con más carácter: sacudida corta en vez del pulso tranquilo. */
    shake: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 500) },
  });

/** Acceso restringido: el globo late y el candado cierra encima. */
export const globeLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeLockShapes, {
    default: {
      shapes: {
        // El globo son DOS figuras (el arco 0 y el resto del ecuador 1) — laten juntas, si no
        // el ecuador se queda quieto mientras el arco pulsa.
        0: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '10px 12px' }),
        1: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '10px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 300, { delay: 300, easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 380 }),
      },
    },
    /** Acceso con problemas: sacudida corta en vez del pulso tranquilo. */
    shake: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 500),
    },
  });

/** Fuera de línea: el globo se fragmenta y la diagonal lo cruza al final. */
const GLOBE_OFF_FLASH: IconChoreography = /* @__PURE__ */ {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200),
        1: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 90 }),
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 180 }),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 270 }),
        4: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 360 }),
        5: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 450 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 560 }),
      },
    };

export const globeOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 180 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 240 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 300 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 420 }),
      },
    },
    /** Señal intermitente: los fragmentos titilan antes de que la diagonal corte. */
    flash: GLOBE_OFF_FLASH,
    /** @deprecated Se llamaba `flicker`. El alias sale en la v3. */
    flicker: GLOBE_OFF_FLASH,
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        6: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 19 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 41 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 53 }),
        5: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 65 }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 81 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 167 }),
      },
    },
  });

/** No disponible: el globo late y la equis se dibuja de insignia. */
export const globeXIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    /** Rechazo con más carácter: sacudida corta en vez del pulso tranquilo. */
    shake: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 500) },
  });
