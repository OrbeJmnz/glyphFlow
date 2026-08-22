// Familia `cloud` del catálogo curado (7 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, moveYSeq, track, icon } from '../choreography';
import { cloudUploadShapes } from '../animated-icons.shapes';
import { SHIELD_GEAR_SPIN } from './_shared';

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
          { easing: 'ease-in-out' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.2px, 1.2px)' },
            { transform: 'translate(-1.2px, -1.2px)' },
            { transform: 'translate(0, 0)' },
          ],
          1400,
          { easing: 'ease-in-out' },
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
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 550) } },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });
