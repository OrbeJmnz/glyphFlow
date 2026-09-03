// Familia `square` del catálogo curado (71 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, scaleSeq, track, strokeDraw, icon } from '../choreography';
import { puntaCompas, astaCompas } from './_shared';
import { squareCenterlineDashedHorizontalShapes, squareCenterlineDashedVerticalShapes, squarePenShapes, squareShapes } from '../animated-icons.shapes';


/** Las cuatro flechas enmarcadas miden lo mismo: de 8 a 16 en su eje. */
const ARROW_SHAFT_LEN = 8;
export const squareActivityIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M17 12h-2l-2 5-2-10-2 5H7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareArrowDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15H9l6-6" },
    { tag: 'path', d: "M9 15V9" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15 9 9" },
    { tag: 'path', d: "M9 15h6V9" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "m8 12 4 4 4-4" },
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m8 12 4 4 4-4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 2, 1), 520),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', ARROW_SHAFT_LEN, 2, 1), 520, { origin: '12px 8px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '12px 8px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * Sale disparada y regresa, dejando rastro. Contra el compás del `default`: llega a 3
     * unidades en vez de 2 y en 440 ms en vez de 520 — más lejos y más seco, no lo mismo con estela.
     */
    dart: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', 1, 3, 1.3), 440),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', ARROW_SHAFT_LEN, 3, 1.3), 440, { origin: '12px 8px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(4.2px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translateY(4.2px)', opacity: '0', offset: 1 }], 440, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m12 8-4 4 4 4" },
    { tag: 'path', d: "M16 12H8" },
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m12 8-4 4 4 4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1, 2, 1), 520),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', ARROW_SHAFT_LEN, 2, 1), 520, { origin: '16px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '16px 12px' }),
      },
      reverseOnLeave: true,
    },
    /**
     * Sale disparada y regresa, dejando rastro. Contra el compás del `default`: llega a 3
     * unidades en vez de 2 y en 440 ms en vez de 520 — más lejos y más seco, no lo mismo con estela.
     */
    dart: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', -1, 3, 1.3), 440),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', ARROW_SHAFT_LEN, 3, 1.3), 440, { origin: '16px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(-4.2px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translateX(-4.2px)', opacity: '0', offset: 1 }], 440, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowRightEnterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 16 4-4-4-4" },
    { tag: 'path', d: "M3 12h11" },
    { tag: 'path', d: "M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowRightExitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12h11" },
    { tag: 'path', d: "m17 16 4-4-4-4" },
    { tag: 'path', d: "M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "m12 16 4-4-4-4" },
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m12 16 4-4-4-4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 2, 1), 520),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', ARROW_SHAFT_LEN, 2, 1), 520, { origin: '8px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '8px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    /**
     * Sale disparada y regresa, dejando rastro. Contra el compás del `default`: llega a 3
     * unidades en vez de 2 y en 440 ms en vez de 520 — más lejos y más seco, no lo mismo con estela.
     */
    dart: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 3, 1.3), 440),
        1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', ARROW_SHAFT_LEN, 3, 1.3), 440, { origin: '8px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateX(4.2px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translateX(4.2px)', opacity: '0', offset: 1 }], 440, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15 9 9" },
    { tag: 'path', d: "M9 15V9h6" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15V9H9" },
    { tag: 'path', d: "m9 15 6-6" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m16 12-4-4-4 4" },
    { tag: 'path', d: "M12 16V8" },
    // La estela del `dart`: copia de la punta que sale disparada y se apaga.
    { tag: 'path', d: "m16 12-4-4-4 4", opacity: '0' },
  ],
  {
    /**
     * El compás de la familia: se agacha, sale y regresa. Antes aquí vivía un ESTADO —el que
     * ahora es `hold`—, o sea un desplazamiento con `fill: 'forwards'` que se queda puesto.
     * Misma migración que `circle-arrow-*` ya tuvo.
     */
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2, 1), 520),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', ARROW_SHAFT_LEN, 2, 1), 520, { origin: '12px 16px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
    /**
     * Sale disparada y regresa, dejando rastro. Contra el compás del `default`: llega a 3
     * unidades en vez de 2 y en 440 ms en vez de 520 — más lejos y más seco, no lo mismo con estela.
     */
    dart: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 3, 1.3), 440),
        2: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', ARROW_SHAFT_LEN, 3, 1.3), 440, { origin: '12px 16px' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translateY(-4.2px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translateY(-4.2px)', opacity: '0', offset: 1 }], 440, { easing: 'linear', delay: 60, fill: 'backwards' }),
      },
    },
  },
);

export const squareAsteriskIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "m8.5 14 7-4" },
    { tag: 'path', d: "m8.5 10 7 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareBottomDashedScissorsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "m17 17-2.18-2.18" },
    { tag: 'path', d: "M5 21a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M9.56 14.44 17 7" },
    { tag: 'path', d: "M9.56 9.56 12 12" },
    { tag: 'circle', cx: 8.5, cy: 15.5, r: 1.5 },
    { tag: 'circle', cx: 8.5, cy: 8.5, r: 1.5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 138, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 275, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 412, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 550, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 688, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 825, fill: 'backwards' }),
      },
    },
  },
);

export const squareCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 9-3 3 3 3" },
    { tag: 'path', d: "m14 15 3-3-3-3" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedBottomCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 9.5 8 12l2 2.5" },
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "m14 9.5 2 2.5-2 2.5" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M9 21h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedBottomIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M14 21h1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedMousePointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z',
    },
    { tag: 'path', d: 'M5 3a2 2 0 0 0-2 2' },
    { tag: 'path', d: 'M19 3a2 2 0 0 1 2 2' },
    { tag: 'path', d: 'M5 21a2 2 0 0 1-2-2' },
    { tag: 'path', d: 'M9 3h1' },
    { tag: 'path', d: 'M9 21h2' },
    { tag: 'path', d: 'M14 3h1' },
    { tag: 'path', d: 'M3 9v1' },
    { tag: 'path', d: 'M21 9v2' },
    { tag: 'path', d: 'M3 14v1' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }],
          240,
          { easing: SPRING_OUT, fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareDashedTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M14 3h1" },
    { tag: 'path', d: "M19 3a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M21 14v1" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M3 9v1" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M5 3a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M7 12h10" },
    { tag: 'path', d: "M7 16h6" },
    { tag: 'path', d: "M7 8h8" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M9 3h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 79, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 157, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 236, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 314, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 393, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 471, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 550, fill: 'backwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 629, fill: 'backwards' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 707, fill: 'backwards' }),
        12: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 786, fill: 'backwards' }),
        13: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 864, fill: 'backwards' }),
        14: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 157, { easing: 'ease-out', delay: 943, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedTopSolidIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M21 14v1" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M3 9v1" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M9 21h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 138, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 275, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 412, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 550, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 688, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 275, { easing: 'ease-out', delay: 825, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M19 3a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M9 3h1" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M14 3h1" },
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M3 9v1" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M21 14v1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 55, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 110, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 165, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 220, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 275, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 330, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 385, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 440, fill: 'backwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 495, fill: 'backwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 550, fill: 'backwards' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 605, fill: 'backwards' }),
      },
    },
  },
);

export const squareDivideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'line', x1: 8, x2: 16, y1: 12, y2: 12 },
    { tag: 'line', x1: 12, x2: 12, y1: 16, y2: 16 },
    { tag: 'line', x1: 12, x2: 12, y1: 8, y2: 8 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareEqualIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 10h10" },
    { tag: 'path', d: "M7 14h10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareFunctionIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" },
    { tag: 'path', d: "M9 11.2h5.7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareLibraryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 7v10" },
    { tag: 'path', d: "M11 7v10" },
    { tag: 'path', d: "m15 7 2 10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareMIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareMenuIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 8h10" },
    { tag: 'path', d: "M7 12h10" },
    { tag: 'path', d: "M7 16h10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareMousePointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" },
    { tag: 'path', d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M20.4 20.4a2 2 0 01-1.4.6H5a2 2 0 01-2-2V5a2 2 0 01.59-1.41' },
    { tag: 'path', d: 'M21 15.3V5a2 2 0 00-2-2H8.7' },
    { tag: 'path', d: 'M22 22 2 2' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, {
          easing: 'ease-out',
          delay: 160,
          fill: 'backwards',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, {
          easing: 'ease-out',
          delay: 320,
          fill: 'backwards',
        }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-7%)', offset: 0.1667 },
          { transform: 'translateX(7%)', offset: 0.3333 },
          { transform: 'translateX(-7%)', offset: 0.5 },
          { transform: 'translateX(7%)', offset: 0.6667 },
          { transform: 'translateX(0)', offset: 1 },
        ],
        600,
        { easing: EASE },
      ),
    },
    // `strike`: la diagonal se traza y va apagando lo que cruza. El retraso de cada
    // figura es el instante REAL en que el corte la alcanza --su proyección sobre el
    // eje, medida desde el centro de su caja y escalada por lo que tarda el trazo--
    // así que el apagón viaja con el cuchillo en vez de correr por su cuenta.
    strike: {
      root: /* @__PURE__ */ track([{ transform: 'none' }, { transform: 'scale(0.93)' }, { transform: 'none' }], 460),
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 17 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 50 }),
      },
    },
  },
);

export const squareParkingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M9 17V7h4a3 3 0 0 1 0 6H9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squarePauseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'line', x1: 10, x2: 10, y1: 15, y2: 9 },
    { tag: 'line', x1: 14, x2: 14, y1: 15, y2: 9 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squarePercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m15 9-6 6" },
    { tag: 'path', d: "M9 9h.01" },
    { tag: 'path', d: "M15 15h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squarePiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 7h10" },
    { tag: 'path', d: "M10 7v10" },
    { tag: 'path', d: "M16 17a2 2 0 0 1-2-2V7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squarePilcrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M12 12H9.5a2.5 2.5 0 0 1 0-5H17" },
    { tag: 'path', d: "M12 7v10" },
    { tag: 'path', d: "M16 7v10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squarePlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squarePowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M7.998 9.003a5 5 0 1 0 8-.005" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareRadicalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 12h2l2 5 2-10h4" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareRoundCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 11a8 8 0 0 0-8-8" },
    { tag: 'path', d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareSigmaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M16 8.9V7H8l4 5-4 5h8v-1.9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareSlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'line', x1: 9, x2: 15, y1: 15, y2: 9 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareSplitHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" },
    { tag: 'path', d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" },
    { tag: 'line', x1: 12, x2: 12, y1: 4, y2: 20 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareSplitVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" },
    { tag: 'path', d: "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" },
    { tag: 'line', x1: 4, x2: 20, y1: 12, y2: 12 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'rect', x: 8, y: 8, width: 8, height: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareStarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareStopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'rect', x: 9, y: 9, width: 6, height: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareUserRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 21a6 6 0 0 0-12 0" },
    { tag: 'circle', cx: 12, cy: 11, r: 4 },
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "m15 9-6 6" },
    { tag: 'path', d: "m9 9 6 6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowOutDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6" },
    { tag: 'path', d: "m3 21 9-9" },
    { tag: 'path', d: "M9 21H3v-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareArrowOutDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" },
    { tag: 'path', d: "m21 21-9-9" },
    { tag: 'path', d: "M21 15v6h-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareArrowOutUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" },
    { tag: 'path', d: "m3 3 9 9" },
    { tag: 'path', d: "M3 9V3h6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareArrowOutUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" },
    { tag: 'path', d: "m21 3-9 9" },
    { tag: 'path', d: "M15 3h6v6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareChartGanttIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M9 8h7" },
    { tag: 'path', d: "M8 12h6" },
    { tag: 'path', d: "M11 16h5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const squareCheckBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" },
    { tag: 'path', d: "m9 11 3 3L22 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m9 12 2 2 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareChevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m16 10-4 4-4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareChevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m14 16-4-4 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareChevronRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m10 8 4 4-4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareChevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m8 14 4-4 4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareDashedKanbanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 7v7" },
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M16 7v9" },
    { tag: 'path', d: "M5 3a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M9 3h1" },
    { tag: 'path', d: "M14 3h1" },
    { tag: 'path', d: "M19 3a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M21 14v1" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M3 9v1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

export const squareKanbanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 7v7" },
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M16 7v9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

export const squareParkingOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41" },
    { tag: 'path', d: "M3 8.7V19a2 2 0 0 0 2 2h10.3" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M13 13a3 3 0 1 0 0-6H9v2" },
    { tag: 'path', d: "M9 17v-2.3" },
  ],
  {
    default: {
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
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 17 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 50 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 78 }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 128 }),
      },
    },
  },
);

export const squarePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "M12 8v8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const squareScissorsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 17-2.18-2.18" },
    { tag: 'path', d: "M9.56 14.44 17 7" },
    { tag: 'path', d: "M9.56 9.56 12 12" },
    { tag: 'circle', cx: 8.5, cy: 15.5, r: 1.5 },
    { tag: 'circle', cx: 8.5, cy: 8.5, r: 1.5 },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
      },
    },
  },
);

export const squareStackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" },
    { tag: 'path', d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" },
    { tag: 'rect', width: 8, height: 8, x: 14, y: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 400, { easing: 'ease', delay: 300 }),
        1: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 400, { easing: 'ease', delay: 150 }),
        2: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 400, { easing: 'ease' }),
      },
    },
  },
);

export const squareTerminalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 11 2-2-2-2" },
    { tag: 'path', d: "M11 13h4" },
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, { easing: 'linear' }),
      },
    },
  },
);

/** Editar: la pluma recorre su trazo sobre la hoja. */
export const squarePenIcon: AnimatedIconDef = /* @__PURE__ */ icon(squarePenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(-1px, 1px)' },
            { transform: 'translate(0, 0)' },
          ],
          700,
        ),
      },
    },
    dart: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-1.5px, 2.25px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-1.5px, 2.25px)', opacity: '0', offset: 1 }], 500, { easing: 'linear', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });

/** Voltear horizontal: se voltea de verdad (scaleX negativo), no se sacude. */
export const squareCenterlineDashedHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(squareCenterlineDashedHorizontalShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [{ transform: 'scaleX(1)' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(1)' }],
        900,
        { origin: 'center' },
      ),
    },
  });

export const squareCenterlineDashedVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(squareCenterlineDashedVerticalShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(1)' }],
        900,
        { origin: 'center' },
      ),
    },
  });

export const squareIcon: AnimatedIconDef = /* @__PURE__ */ icon(squareShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 420, { easing: SPRING_OUT, origin: 'center' }) },
  });
