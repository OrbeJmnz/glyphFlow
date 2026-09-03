// Familia `ticket` del catálogo curado (7 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { SPRING_OUT, rotateSeq, track, burst, strokeDraw, icon } from '../choreography';
import { ticketCheckShapes, ticketMinusShapes, ticketPercentShapes, ticketPlusShapes, ticketShapes, ticketSlashShapes, ticketXShapes } from '../animated-icons.shapes';

// El boleto "sale" con un golpe de escala, como al entregarlo; el perforado/símbolo se dibuja
// después.
const TICKET_POP = /* @__PURE__ */ [
  { transform: 'scale(0.85)' },
  { transform: 'scale(1.05)' },
  { transform: 'scale(1)' },
];

/** El boleto sale y el perforado se dibuja. */
// Se sacude tantito por el perforado, como si se fuera a rasgar.
const TICKET_TEAR = /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 2, -1, 0]), 400);

export const ticketIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 380 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 440 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Boleto validado: sale y la palomita se dibuja de insignia. */
export const ticketCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
    mark: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Quitar: sale y el "-" se dibuja de insignia. */
export const ticketMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketMinusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Descuento: sale y el símbolo "%" se dibuja en tres trazos. */
export const ticketPercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketPercentShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 560 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Agregar: sale y el "+" se dibuja de insignia, en dos trazos. */
export const ticketPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketPlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Anulado: sale y una sola diagonal lo tacha. */
export const ticketSlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketSlashShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Cancelado: sale y la equis se dibuja de insignia. */
export const ticketXIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });
