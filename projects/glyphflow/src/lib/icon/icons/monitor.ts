// Familia `monitor` del catálogo curado (14 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, icon, rotateSeq, strokeDraw, track } from '../choreography';
import { monitorShapes } from '../animated-icons.shapes';

export const monitorCloudIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z" },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'circle', cx: 19, cy: 6, r: 3 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '19px 6px' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorPlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '13px 12px' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorStopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
    { tag: 'rect', x: 9, y: 7, width: 6, height: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '12px 10px' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorSmartphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" },
    { tag: 'path', d: "M10 19v-3.96 3.15" },
    { tag: 'path', d: "M7 19h5" },
    { tag: 'rect', width: 6, height: 10, x: 16, y: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '19px 17px' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorPauseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 13V7" },
    { tag: 'path', d: "M14 13V7" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 10px' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 10px', delay: 90, fill: 'backwards' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14.5 12.5-5-5" },
    { tag: 'path', d: "m9.5 12.5 5-5" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 110, fill: 'backwards' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorSpeakerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5.5 20H8" },
    { tag: 'path', d: "M17 9h.01" },
    { tag: 'rect', width: 10, height: 16, x: 12, y: 4, rx: 2 },
    { tag: 'path', d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" },
    { tag: 'circle', cx: 17, cy: 15, r: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '17px 9px', delay: 120, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '17px 15px' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 10 2 2 4-4" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const monitorCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "m14.305 7.53.923-.382" },
    { tag: 'path', d: "m15.228 4.852-.923-.383" },
    { tag: 'path', d: "m16.852 3.228-.383-.924" },
    { tag: 'path', d: "m16.852 8.772-.383.923" },
    { tag: 'path', d: "m19.148 3.228.383-.924" },
    { tag: 'path', d: "m19.53 9.696-.382-.924" },
    { tag: 'path', d: "m20.772 4.852.924-.383" },
    { tag: 'path', d: "m20.772 7.148.924.383" },
    { tag: 'path', d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'circle', cx: 18, cy: 6, r: 3 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        11: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
      },
      reverseOnLeave: true,
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "m15 10-3 3-3-3" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const monitorOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'path', d: "M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042" },
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
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 8 }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 50 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 162 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 162 }),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

export const monitorUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 10 3-3 3 3" },
    { tag: 'path', d: "M12 13V7" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  },
);

/** Monitor encendiéndose: el parpadeo del tubo, no un fundido parejo. */
export const monitorIcon: AnimatedIconDef = /* @__PURE__ */ icon(monitorShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { opacity: '1' },
            { opacity: '0.35' },
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
          ],
          600,
        ),
      },
    },
    // `nudge`: la pantalla bascula sobre su bisagra (12, 17) como cuando le das un
    // toque al monitor; el pie se queda, que esta apoyado. Las figuras de la pantalla
    // giran todas igual y a la vez a proposito: son UNA pieza rigida, y un marco que
    // se inclina a destiempo de su contenido esta roto, no vivo.
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -1.6, 0.6, 0]), 640, { origin: '12px 17px' }),
      },
    },
  });
