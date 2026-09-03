// Familia `wifi` del catálogo curado (6 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, track, icon } from '../choreography';
import { wifiHighShapes, wifiLowShapes, wifiShapes, wifiZeroShapes } from '../animated-icons.shapes';

/** Wifi conectando: del punto hacia afuera, arco por arco. */
// Cada arco SUBE desde abajo (translateY + fade), no truena en su lugar como `burst()` — así se
// lee la dirección sin ambigüedad. Del punto hacia afuera: punto, arco interior, medio, exterior.
const WIFI_RISE = /* @__PURE__ */ [
  { transform: 'translateY(3px)', opacity: '0' },
  { transform: 'translateY(0)', opacity: '1' },
];

/** Lo que sale del centro hacia fuera: el sonido de un disco, una onda. */
const RIPPLE_OUT = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1.12)', offset: 0.45 },
  { transform: 'scale(1)', offset: 1 },
];

/** Una vuelta entera: rota todo y termina donde empezó. */
const FULL_TURN_CW = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }];

export const wifiOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20h.01" },
    { tag: 'path', d: "M8.5 16.429a5 5 0 0 1 7 0" },
    { tag: 'path', d: "M5 12.859a10 10 0 0 1 5.17-2.69" },
    { tag: 'path', d: "M19 12.859a10 10 0 0 0-2.007-1.523" },
    { tag: 'path', d: "M2 8.82a15 15 0 0 1 4.177-2.643" },
    { tag: 'path', d: "M22 8.82a15 15 0 0 0-11.288-3.764" },
    { tag: 'path', d: "m2 2 20 20" },
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
        6: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }], 260, { easing: 'ease-out' }),
        4: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 27 }),
        2: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 73 }),
        5: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 76 }),
        1: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 127 }),
        3: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 158 }),
        0: /* @__PURE__ */ track([{ opacity: '1', transform: 'none' }, { opacity: '0.42', transform: 'scale(0.96)' }, { opacity: '1', transform: 'none' }], 340, { origin: '12px 12px', delay: 182 }),
      },
    },
  },
);

export const wifiPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 8.82a15 15 0 0 1 20 0" },
    { tag: 'path', d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" },
    { tag: 'path', d: "M5 12.859a10 10 0 0 1 10.5-2.222" },
    { tag: 'path', d: "M8.5 16.429a5 5 0 0 1 3-1.406" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  },
);

export const wifiIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(WIFI_RISE, 320),
        3: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 130 }),
        2: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 260 }),
        1: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 390 }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  });

/** Señal fuerte: como wifi, sin el arco más exterior. */
export const wifiHighIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiHighShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(WIFI_RISE, 320),
        2: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 130 }),
        1: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 260 }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  });

/** Señal débil: solo el arco interior. */
export const wifiLowIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiLowShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(WIFI_RISE, 320),
        1: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 130 }),
      },
    },
    cascade: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  });

/** Sin señal: solo el punto. */
export const wifiZeroIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiZeroShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(WIFI_RISE, 320) } },
    cascade: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 1200),
      },
    },
  });

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Las ondas salen y el engrane gira sobre su eje, no sobre el del icono. */
export const wifiCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14.305 19.53.923-.382" },
    { tag: 'path', d: "m15.228 16.852-.923-.383" },
    { tag: 'path', d: "m16.852 15.228-.383-.923" },
    { tag: 'path', d: "m16.852 20.772-.383.924" },
    { tag: 'path', d: "m19.148 15.228.383-.923" },
    { tag: 'path', d: "m19.53 21.696-.382-.924" },
    { tag: 'path', d: "M2 7.82a15 15 0 0 1 20 0" },
    { tag: 'path', d: "m20.772 16.852.924-.383" },
    { tag: 'path', d: "m20.772 19.148.924.383" },
    { tag: 'path', d: "M5 11.858a10 10 0 0 1 11.5-1.785" },
    { tag: 'path', d: "M8.5 15.429a5 5 0 0 1 2.413-1.31" },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        1: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        2: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        3: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        5: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        6: /* @__PURE__ */ track(RIPPLE_OUT, 600, { easing: EASE, origin: '12px 7.8px', delay: 240, fill: 'backwards' }),
        7: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        8: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
        9: /* @__PURE__ */ track(RIPPLE_OUT, 600, { easing: EASE, origin: '10.7px 10.9px', delay: 120, fill: 'backwards' }),
        10: /* @__PURE__ */ track(RIPPLE_OUT, 600, { easing: EASE, origin: '9.7px 14.8px' }),
        11: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

export const wifiSyncIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5" },
    { tag: 'path', d: "M11.965 14.105h4" },
    { tag: 'path', d: "M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5" },
    { tag: 'path', d: "M2 8.82a15 15 0 0 1 20 0" },
    { tag: 'path', d: "M21.965 22.105v-4" },
    { tag: 'path', d: "M5 12.86a10 10 0 0 1 3-2.032" },
    { tag: 'path', d: "M8.5 16.429h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '17px 16px', delay: 300, fill: 'backwards' }),
        1: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '17px 16px', delay: 300, fill: 'backwards' }),
        2: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '17px 16px', delay: 300, fill: 'backwards' }),
        3: /* @__PURE__ */ track(RIPPLE_OUT, 600, { easing: EASE, origin: '12px 8.8px', delay: 240, fill: 'backwards' }),
        4: /* @__PURE__ */ track(FULL_TURN_CW, 900, { easing: EASE, origin: '17px 16px', delay: 300, fill: 'backwards' }),
        5: /* @__PURE__ */ track(RIPPLE_OUT, 600, { easing: EASE, origin: '6.5px 11.8px', delay: 120, fill: 'backwards' }),
        6: /* @__PURE__ */ track(RIPPLE_OUT, 600, { easing: EASE, origin: '8.5px 16.4px' }),
      },
    },
  },
);
