// Familia `clock` del catálogo curado (13 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { puntaTrazoYCompas, astaTrazoYCompas } from './_shared';
import { SPRING_OUT, rotateSeq, track, burst, strokeDraw, icon } from '../choreography';
import { clockShapes } from '../animated-icons.shapes';

export const clock1Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l2-4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-4-2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock11Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-2-4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock12Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l4-2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6h4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock5Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l2 4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock6Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v10' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock7Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-2 4' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock8Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l-4 2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

export const clock9Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6H8' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
      },
    },
  },
);

/**
 * La flecha se dibuja y DESPUÉS viaja hacia donde apunta su nombre. Las cuatro son iguales salvo
 * el eje, el sentido y el extremo fijo del asta (que siempre es el contrario a la punta).
 *
 * Antes `clock-arrow-right` ENTRABA desde la izquierda: se hizo así porque su punta ya está en
 * x=22 y con `stroke-width: 2` el trazo llega a 23, o sea que hacia afuera queda 1 unidad. Pero
 * entrar por el lado contrario al que dice el nombre se lee al revés. La salida correcta es la
 * misma de `book-up-2`: **agacharse primero hacia adentro** para que ese 1 hacia afuera se note.
 * Las otras tres ni siquiera se movían — solo se dibujaban.
 */
const CLOCK_ARROW_MS = 1000;
const CLOCK_ARROW_ESPERA = 200;
const CLOCK_SHAFT_LEN = 8;

export const clockArrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M12 6v6l2 1' },
    { tag: 'path', d: 'M13.5 21.885A10 10 0 1 1 22 12' },
    { tag: 'path', d: 'M14 18h8' },
    { tag: 'path', d: 'm18 22 4-4-4-4' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, {
          origin: '12px 12px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaTrazoYCompas('X', CLOCK_SHAFT_LEN, 1, 1.5), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards', origin: '14px 18px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ puntaTrazoYCompas('X', 1, 1, 1.5), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.125)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 18px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);
/** Manecillas dando la vuelta; la carátula quieta. */
export const clockIcon: AnimatedIconDef = /* @__PURE__ */ icon(clockShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }) },
    },
  });

export const clock4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M12 6v6l4 2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
      },
    },
  },
);

export const clockAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l4 2" },
    { tag: 'path', d: "M20 12v5" },
    { tag: 'path', d: "M20 21h.01" },
    { tag: 'path', d: "M21.25 8.2A10 10 0 1 0 16 21.16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 340, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

export const clockArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l2 1" },
    { tag: 'path', d: "M12.337 21.994a10 10 0 1 1 9.588-8.767" },
    { tag: 'path', d: "m14 18 4 4 4-4" },
    { tag: 'path', d: "M18 14v8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaTrazoYCompas('Y', 1, 1, 1.5), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ astaTrazoYCompas('Y', CLOCK_SHAFT_LEN, 1, 1.5), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards', origin: '18px 14px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.125)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const clockArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l1.5.8" },
    { tag: 'path', d: "M12.338 21.994a10 10 0 1 1 9.587-8.767" },
    { tag: 'path', d: "M14 18h8" },
    { tag: 'path', d: "m18 22-4-4 4-4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaTrazoYCompas('X', CLOCK_SHAFT_LEN, 1.5, 1), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards', origin: '22px 18px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ puntaTrazoYCompas('X', -1, 1.5, 1), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.1875)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 18px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-1.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const clockArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l1.56.78" },
    { tag: 'path', d: "M13.227 21.925a10 10 0 1 1 8.767-9.588" },
    { tag: 'path', d: "m14 18 4-4 4 4" },
    { tag: 'path', d: "M18 22v-8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaTrazoYCompas('Y', -1, 1.5, 1), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ astaTrazoYCompas('Y', CLOCK_SHAFT_LEN, 1.5, 1), CLOCK_ARROW_MS, { easing: 'ease-out', delay: CLOCK_ARROW_ESPERA, fill: 'backwards', origin: '18px 22px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(-1.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.1875)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 22px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const clockCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l4 2" },
    { tag: 'path', d: "M22 12a10 10 0 1 0-11 9.95" },
    { tag: 'path', d: "m22 16-5.5 5.5L14 19" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
      },
    },
  },
);

export const clockFadingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2a10 10 0 0 1 7.38 16.75" },
    { tag: 'path', d: "M12 6v6l4 2" },
    { tag: 'path', d: "M2.5 8.875a10 10 0 0 0-.5 3" },
    { tag: 'path', d: "M2.83 16a10 10 0 0 0 2.43 3.4" },
    { tag: 'path', d: "M4.636 5.235a10 10 0 0 1 .891-.857" },
    { tag: 'path', d: "M8.644 21.42a10 10 0 0 0 7.631-.38" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 590, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 700, fill: 'backwards' }),
      },
    },
  },
);

export const clockPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v6l3.644 1.822" },
    { tag: 'path', d: "M16 19h6" },
    { tag: 'path', d: "M19 16v6" },
    { tag: 'path', d: "M21.92 13.267a10 10 0 1 0-8.653 8.653" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 370, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);
