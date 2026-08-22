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
    reveal: {
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
    reveal: {
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  });

/** Sin señal: solo el punto. */
export const wifiZeroIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiZeroShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(WIFI_RISE, 320) } },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 1200),
      },
    },
  });
