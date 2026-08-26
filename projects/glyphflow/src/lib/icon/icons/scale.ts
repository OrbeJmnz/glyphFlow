// Familia `scale` del catálogo curado (2 iconos).
//
// Las dos son «escala», pero de dos cosas distintas y por eso no se mueven igual. La balanza mide
// PESO: su gesto es desequilibrarse, y ahí el brazo manda —los dos platillos cuelgan de él, así
// que suben y bajan lo que el brazo diga, no por su cuenta—. `scale-3d` mide TAMAÑO: su gesto es
// que el punto se aleje del origen arrastrando la diagonal.
//
// Sostenido, cada una se queda en lo suyo: la balanza inclinada y la medida estirada.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, moveYSeq, scaleSeq, track, icon } from '../choreography';

/** Se desequilibra: el brazo bascula y los platillos lo acompañan. */
export const scaleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3v18" },
    { tag: 'path', d: "m19 8 3 8a5 5 0 0 1-6 0zV7" },
    { tag: 'path', d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" },
    { tag: 'path', d: "m5 8 3 8a5 5 0 0 1-6 0zV7" },
    { tag: 'path', d: "M7 21h10" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2.5, 0]), 820, { easing: EASE, origin: '12px 6px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.9, 0]), 820, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.9, 0]), 820, { easing: EASE }),
      },
    },
    // Sostenido: se queda inclinada. Una balanza parada en el fiel no está midiendo nada.
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 6px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Mide tamaño: el punto se aleja del origen y la diagonal se estira con él. */
export const scale3dIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 7v11a1 1 0 0 0 1 1h11" },
    { tag: 'path', d: "M5.293 18.707 11 13" },
    { tag: 'circle', cx: 19, cy: 19, r: 2 },
    { tag: 'circle', cx: 5, cy: 5, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scale(0.7)' }, { transform: 'scale(1)' }], 520, { easing: SPRING_OUT, origin: '5.293px 18.707px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 480, { easing: EASE, delay: 200, origin: '19px 19px' }),
      },
    },
    // Sostenido: la medida tomada. El punto se va a su esquina y la diagonal llega hasta él.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '5.293px 18.707px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.35)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '19px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);
