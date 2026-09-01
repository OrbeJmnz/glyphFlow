// Familia `cloud` del catálogo curado (19 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { puntaCompas, astaCompas, REFRESH_SPIN } from './_shared';
import { EASE, rotateSeq, track, burst, strokeDraw, icon } from '../choreography';
import { cloudUploadShapes } from '../animated-icons.shapes';
import { SHIELD_GEAR_SPIN } from './_shared';

/**
 * La nube a secas: flota. Es exactamente el mismo desplazamiento lento que `cloud-moon` le da a su
 * cuerpo de nube —1.2 px en diagonal, 1400 ms, ease-in-out— porque es el mismo cuerpo haciendo lo
 * mismo, y dos nubes de la misma familia moviéndose distinto se nota al ponerlas juntas.
 *
 * Lento a propósito. Una nube que se mueve rápido no es una nube, es un parpadeo.
 */
/**
 * El flote de la nube. Es el mismo desplazamiento que ya traían `cloud` y `cloud-moon-rain`
 * escrito a mano; aquí se nombra porque lo comparten los doce.
 */
const CLOUD_DRIFT = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(-1.2px, -1.2px)' },
  { transform: 'translate(1.2px, 1.2px)' },
  { transform: 'translate(0, 0)' },
];

/** Una gota cae. Arranca 4 arriba —dentro de la nube— para que se vea de dónde sale. */
const CLOUD_FALL = /* @__PURE__ */ [
  { transform: 'translateY(-4px)', opacity: 0, offset: 0 },
  { transform: 'translateY(0)', opacity: 1, offset: 0.55 },
  { transform: 'translateY(0)', opacity: 1, offset: 1 },
];

/** Lo mismo, ladeado: con viento la gota entra también desde la izquierda. */
const CLOUD_FALL_WIND = /* @__PURE__ */ [
  { transform: 'translate(2px, -4px)', opacity: 0, offset: 0 },
  { transform: 'translate(0, 0)', opacity: 1, offset: 0.55 },
  { transform: 'translate(0, 0)', opacity: 1, offset: 1 },
];

/** El destello del rayo: dos golpes y se queda encendido. */
const CLOUD_FLASH = /* @__PURE__ */ [
  { opacity: 0, offset: 0 },
  { opacity: 1, offset: 0.12 },
  { opacity: 0.15, offset: 0.3 },
  { opacity: 1, offset: 0.45 },
  { opacity: 1, offset: 1 },
];

/** El aviso parpadea. Más lento que el rayo: esto se lee, no deslumbra. */
const CLOUD_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.3 },
  { opacity: 1, offset: 0.6 },
  { opacity: 0.15, offset: 0.8 },
  { opacity: 1, offset: 1 },
];

/** La niebla se desplaza de lado y vuelve. Larga a propósito: es lo único lento del icono. */
const CLOUD_FOG_DRIFT = /* @__PURE__ */ [
  { transform: 'translateX(0)' },
  { transform: 'translateX(2px)' },
  { transform: 'translateX(-2px)' },
  { transform: 'translateX(0)' },
];

export const cloudIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [{ tag: 'path', d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' }],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
      },
    },
  },
);

export const cloudCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'm10.852 19.772-.383.924' },
    { tag: 'path', d: 'm13.148 14.228.383-.923' },
    { tag: 'path', d: 'M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923' },
    { tag: 'path', d: 'm13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544' },
    { tag: 'path', d: 'm14.772 15.852.923-.383' },
    { tag: 'path', d: 'm14.772 18.148.923.383' },
    {
      tag: 'path',
      d: 'M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2',
    },
    { tag: 'path', d: 'm9.228 15.852-.923-.383' },
    { tag: 'path', d: 'm9.228 18.148-.923.383' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
        1: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
        2: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
        3: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
        4: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
        5: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
        7: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
        8: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 17px' }),
      },
    },
  },
);

export const cloudMoonRainIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M11 20v2' },
    {
      tag: 'path',
      d: 'M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36',
    },
    { tag: 'path', d: 'M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24' },
    { tag: 'path', d: 'M7 19v2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        0: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
      },
    },
  },
);

export const cloudSunRainIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M12 2v2' },
    { tag: 'path', d: 'm4.93 4.93 1.41 1.41' },
    { tag: 'path', d: 'M20 12h2' },
    { tag: 'path', d: 'm19.07 4.93-1.41 1.41' },
    { tag: 'path', d: 'M15.947 12.65a4 4 0 0 0-5.925-4.128' },
    { tag: 'path', d: 'M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24' },
    { tag: 'path', d: 'M11 20v2' },
    { tag: 'path', d: 'M7 19v2' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        1: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out', delay: 60, fill: 'backwards' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out', delay: 120, fill: 'backwards' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out', delay: 180, fill: 'backwards' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out', delay: 240, fill: 'backwards' },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        6: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        7: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
      },
    },
  },
);

export const cloudDownloadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13v8l-4-4" },
    { tag: 'path', d: "m12 21 4-4" },
    { tag: 'path', d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const cloudMoonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z" },
    { tag: 'path', d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-1.2px, -1.2px)' }, { transform: 'translate(1.2px, 1.2px)' }, { transform: 'translate(0, 0)' }], 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(1.2px, 1.2px)' }, { transform: 'translate(-1.2px, -1.2px)' }, { transform: 'translate(0, 0)' }], 1400, { easing: 'ease-in-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const cloudOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057" },
    { tag: 'path', d: "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** Subir a la nube: la flecha se va para arriba. */
export const cloudUploadIcon: AnimatedIconDef = /* @__PURE__ */ icon(cloudUploadShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('Y', -1, 2, 1), 560),
        0: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('Y', 8, 2, 1), 560, { origin: '12px 21px' }),
      },
    },
    active: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        0: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.25)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards', origin: '12px 21px' }),
      },
      reverseOnLeave: true,
    },
  });

/** La nube flota y el visto se traza encima. */
export const cloudCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 15-5.5 5.5L9 18" },
    { tag: 'path', d: "M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        1: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
      },
    },
  },
);

/** La nube flota y el aviso parpadea debajo: barra y punto a la vez, que es como avisa. */
export const cloudAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12v4" },
    { tag: 'path', d: "M12 20h.01" },
    { tag: 'path', d: "M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_BLINK, 900, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        1: /* @__PURE__ */ track(CLOUD_BLINK, 900, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
      },
    },
  },
);

/** El rayo destella — dos golpes rápidos y se queda. */
export const cloudLightningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" },
    { tag: 'path', d: "m13 12-3 5h4l-3 5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(CLOUD_FLASH, 800, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
      },
    },
  },
);

/** Las tres líneas caen desde dentro de la nube, desfasadas. */
export const cloudRainIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" },
    { tag: 'path', d: "M16 14v6" },
    { tag: 'path', d: "M8 14v6" },
    { tag: 'path', d: "M12 16v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 440, fill: 'backwards' }),
        2: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

/** Seis gotas cortas, de arriba abajo y de izquierda a derecha: llovizna, no chaparrón. */
export const cloudDrizzleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" },
    { tag: 'path', d: "M8 19v1" },
    { tag: 'path', d: "M8 14v1" },
    { tag: 'path', d: "M16 19v1" },
    { tag: 'path', d: "M16 14v1" },
    { tag: 'path', d: "M12 21v1" },
    { tag: 'path', d: "M12 16v1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 470, fill: 'backwards' }),
        2: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 560, fill: 'backwards' }),
        4: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 290, fill: 'backwards' }),
        5: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 650, fill: 'backwards' }),
        6: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
      },
    },
  },
);

/** Aquí las líneas caen inclinadas y arrancan también desplazadas de lado: es el viento. */
export const cloudRainWindIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" },
    { tag: 'path', d: "m9.2 22 3-7" },
    { tag: 'path', d: "m9 13-3 7" },
    { tag: 'path', d: "m17 13-3 7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(CLOUD_FALL_WIND, 700, { easing: 'ease-out', delay: 330, fill: 'backwards' }),
        2: /* @__PURE__ */ track(CLOUD_FALL_WIND, 700, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(CLOUD_FALL_WIND, 700, { easing: 'ease-out', delay: 460, fill: 'backwards' }),
      },
    },
  },
);

/** La raya cae y el granizo rebota debajo: por eso una usa caída y el otro estallido. */
export const cloudHailIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" },
    { tag: 'path', d: "M16 14v2" },
    { tag: 'path', d: "M8 14v2" },
    { tag: 'path', d: "M16 20h.01" },
    { tag: 'path', d: "M8 20h.01" },
    { tag: 'path', d: "M12 16v2" },
    { tag: 'path', d: "M12 22h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 440, fill: 'backwards' }),
        2: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: 'ease-out', delay: 660, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        5: /* @__PURE__ */ track(CLOUD_FALL, 700, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: 'ease-out', delay: 540, fill: 'backwards' }),
      },
    },
  },
);

/** Los copos asoman en diagonal, no en fila: la nieve no cae en columnas. */
export const cloudSnowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" },
    { tag: 'path', d: "M8 15h.01" },
    { tag: 'path', d: "M8 19h.01" },
    { tag: 'path', d: "M12 17h.01" },
    { tag: 'path', d: "M12 21h.01" },
    { tag: 'path', d: "M16 15h.01" },
    { tag: 'path', d: "M16 19h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: 'ease-out', delay: 500, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: 'ease-out', delay: 400, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: 'ease-out', delay: 700, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: 'ease-out', delay: 600, fill: 'backwards' }),
      },
    },
  },
);

/** La niebla no cae: se desplaza de lado, y las dos bandas a distinto ritmo. */
export const cloudFogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" },
    { tag: 'path', d: "M16 17H7" },
    { tag: 'path', d: "M17 21H9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(CLOUD_FOG_DRIFT, 2000, { easing: 'ease-in-out' }),
        2: /* @__PURE__ */ track(CLOUD_FOG_DRIFT, 2000, { easing: 'ease-in-out', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** El sol se abre en rayos por detrás y la nube flota delante. */
export const cloudSunIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "m4.93 4.93 1.41 1.41" },
    { tag: 'path', d: "M20 12h2" },
    { tag: 'path', d: "m19.07 4.93-1.41 1.41" },
    { tag: 'path', d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" },
    { tag: 'path', d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 430, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 250, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
      },
    },
  },
);

/** Las dos flechas del ciclo: cada arco primero y su punta después, o la punta se despega. */
/** `cloud-sync` son dos flechas que ya forman un círculo: caja x 7–17, y 10–22 → pivote (12, 16). */
const CLOUD_SYNC_PIVOT = '12px 16px';

/**
 * `hold`: mientras el puntero se queda encima, el lazo NO se detiene tras una vuelta — sigue
 * girando a la MISMA velocidad angular que el lap único de `default` (360° en 1200ms = 300°/s)
 * hasta que el puntero se va. WAAPI no tiene un `iterations` por figura (`track()`/`TrackOpts` solo
 * exponen `delay`/`easing`/`origin`/`fill` — "sin fin" real es del componente entero, vía el
 * input `loop`, no de una variante suelta). Se resuelve con muchas vueltas de sobra —20, unos
 * 24s— y `fill: 'forwards'` + `reverseOnLeave`: al salir el puntero, `reverse()` frena y devuelve
 * la vuelta actual hasta 0° en vez de cortarla en seco a mitad de giro.
 */
const CLOUD_HOLD_SPIN_MS = 24000;
// `20 * 360` resuelto aquí y no dentro de `rotateSeq([0, 20 * 360])`: una expresión aritmética
// como argumento de una llamada ya anotada /* @__PURE__ */ rompe el tree-shaking de Rollup al
// empaquetar el FESM — mismo mecanismo que `BOOK_AFTER_STAGGER` en `book.ts`.
const CLOUD_HOLD_TURNS_DEG = 20 * 360;
const CLOUD_HOLD_TURNS_DEG_NEG = -CLOUD_HOLD_TURNS_DEG; // mismo motivo: nada de `-X` inline en el argumento.
const CLOUD_HOLD_SPIN_CW = /* @__PURE__ */ rotateSeq([0, CLOUD_HOLD_TURNS_DEG]);
const CLOUD_HOLD_SPIN_CCW = /* @__PURE__ */ rotateSeq([0, CLOUD_HOLD_TURNS_DEG_NEG]);

export const cloudSyncIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 18-1.535 1.605a5 5 0 0 1-8-1.5" },
    { tag: 'path', d: "M17 22v-4h-4" },
    { tag: 'path', d: "M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607" },
    { tag: 'path', d: "M7 10v4h4" },
    { tag: 'path', d: "m7 14 1.535-1.605a5 5 0 0 1 8 1.5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        0: /* @__PURE__ */ track(REFRESH_SPIN, 1200, { origin: CLOUD_SYNC_PIVOT }),
        1: /* @__PURE__ */ track(REFRESH_SPIN, 1200, { origin: CLOUD_SYNC_PIVOT }),
        3: /* @__PURE__ */ track(REFRESH_SPIN, 1200, { origin: CLOUD_SYNC_PIVOT }),
        4: /* @__PURE__ */ track(REFRESH_SPIN, 1200, { origin: CLOUD_SYNC_PIVOT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_HOLD_SPIN_CW, CLOUD_HOLD_SPIN_MS, { easing: 'linear', fill: 'forwards', origin: CLOUD_SYNC_PIVOT }),
        1: /* @__PURE__ */ track(CLOUD_HOLD_SPIN_CW, CLOUD_HOLD_SPIN_MS, { easing: 'linear', fill: 'forwards', origin: CLOUD_SYNC_PIVOT }),
        3: /* @__PURE__ */ track(CLOUD_HOLD_SPIN_CW, CLOUD_HOLD_SPIN_MS, { easing: 'linear', fill: 'forwards', origin: CLOUD_SYNC_PIVOT }),
        4: /* @__PURE__ */ track(CLOUD_HOLD_SPIN_CW, CLOUD_HOLD_SPIN_MS, { easing: 'linear', fill: 'forwards', origin: CLOUD_SYNC_PIVOT }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * El lazo de `cloud-backup` (arco + punta) da UNA vuelta completa sobre su propio centro. Su caja
 * real es x 7–17, y 11.5–19 → pivote (12.2, 15.4). Gira en CONTRARREL0J porque es el sentido en el
 * que su propia punta apunta: al revés se lee como si rebobinara al derecho.
 */
const CLOUD_SPIN_CCW = /* @__PURE__ */ rotateSeq([0, -360]);
const CLOUD_BACKUP_PIVOT = '12.2px 15.4px';

/** El arco da la vuelta y la punta lo cierra. */
export const cloudBackupIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607" },
    { tag: 'path', d: "M7 11v4h4" },
    { tag: 'path', d: "M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CLOUD_DRIFT, 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track(CLOUD_SPIN_CCW, 1200, { origin: CLOUD_BACKUP_PIVOT }),
        2: /* @__PURE__ */ track(CLOUD_SPIN_CCW, 1200, { origin: CLOUD_BACKUP_PIVOT }),
      },
    },
    /** Mismo criterio de "sin fin hasta soltar" que `cloud-sync:hold`, en contrarreloj. */
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(CLOUD_HOLD_SPIN_CCW, CLOUD_HOLD_SPIN_MS, { easing: 'linear', fill: 'forwards', origin: CLOUD_BACKUP_PIVOT }),
        2: /* @__PURE__ */ track(CLOUD_HOLD_SPIN_CCW, CLOUD_HOLD_SPIN_MS, { easing: 'linear', fill: 'forwards', origin: CLOUD_BACKUP_PIVOT }),
      },
      reverseOnLeave: true,
    },
  },
);
