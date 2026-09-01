// Familia `volume` del catálogo curado (5 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, burst, strokeDraw, icon } from '../choreography';
import { volume1Shapes, volume2Shapes, volumeOffShapes, volumeShapes, volumeXShapes } from '../animated-icons.shapes';

/** Volumen: las ondas salen del cono, de la chica a la grande. */
export const volume2Icon: AnimatedIconDef = /* @__PURE__ */ icon(volume2Shapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }),
      },
    },
    spark: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'scale(0.4)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(1.5px)', opacity: '0.9', offset: 0.4, easing: 'ease-out' }, { transform: 'translateX(1.5px)', opacity: '0', offset: 1 }], 620, { easing: 'linear', origin: '12px 12px', delay: 120, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }),
      },
    },
  });

/** El altavoz solo, sin ondas — late tantito al aparecer. */
export const volumeIcon: AnimatedIconDef = /* @__PURE__ */ icon(volumeShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380) } },
  });

/** Volumen bajo: el altavoz + una sola onda. */
export const volume1Icon: AnimatedIconDef = /* @__PURE__ */ icon(volume1Shapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 80 }) } },
  });

/** Silenciado: el sonido intenta salir (ondas parciales) y la diagonal lo corta. */
export const volumeOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(volumeOffShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 100 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 140 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 380 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 32 }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 64 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 136 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 136 }),
      },
    },
  });

/** Volumen nulo: el altavoz + la equis se dibuja en dos trazos. */
export const volumeXIcon: AnimatedIconDef = /* @__PURE__ */ icon(volumeXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
      },
    },
  });
