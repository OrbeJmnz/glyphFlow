// AUTO-GENERADO por scripts/gen-spring-easings.ts desde los presets de
// morph/src/core/spring.ts (morphicons v1.7.0, MIT).
// NO EDITAR A MANO — un PR aquí se pierde en el siguiente `npm run gen:springs`. Los valores
// salen de integrar el resorte, no de afinar dígitos: para cambiar la sensación se cambian los
// { k, c } del preset, no esta cadena.
//
// LOS VALORES > 1 NO SON UN ERROR DE REDONDEO. Son el sobrepaso, y son la razón de ser del
// preset: `linear()` de CSS admite puntos de control fuera de [0,1] y WAAPI extrapola el keyframe
// de destino cuando el easing los rebasa. Ahí vive el rebote que un `cubic-bezier` no puede dar.
//
// DOS CUIDADOS AL APLICARLOS:
//
// 1. `opacity` está sujeta a [0,1] por spec — un easing con sobrepaso sobre opacity se aplana
//    solo, SIN AVISAR. El sobrepaso solo se ve en `transform` y en propiedades numéricas sin
//    rango (`stroke-dashoffset`, `stroke-width`).
// 2. Un preset con sobrepaso encima de keyframes que YA oscilan a mano (la campana:
//    `rotateSeq([0, 20, -10, 10, -5, 3, 0])`) oscila doble y se ve mal. Ahí los keyframes ya SON
//    el resorte y lo correcto sigue siendo `EASE`. Estos presets son para ir de A a B.
//
// La duración natural de cada preset es informativa: aplicar el easing con otra duración estira o
// encoge el reloj sin deformar la curva, así que el CARÁCTER (la ζ) se conserva. Es justo la
// ventaja de resolver el resorte en el dominio del tiempo y no en el del valor.

/**
 * ζ = 1.00 — crítico, sin rebote. El reemplazo directo de un expo-out.
 *
 * k = 170, c = 26 · duración natural 737 ms · sin sobrepaso
 */
export const SPRING_SMOOTH =
  'linear(0, 0.0661, 0.2127, 0.3532, 0.5006, 0.6098, 0.6993, 0.7795, 0.8334, 0.8748, 0.9102, 0.9332, 0.9525, 0.9648, 0.974, 0.9816, 0.9865, 0.9901, 0.993, 0.9949, 0.9964, 0.9974, 0.9981, 0.9986, 1)';

/**
 * ζ = 0.73 — rápido, sobrepaso sutil. El default de la casa.
 *
 * k = 420, c = 30 · duración natural 417 ms · sobrepaso 1.0265
 */
export const SPRING_SNAPPY =
  'linear(0, 0.0636, 0.1905, 0.3809, 0.5302, 0.6626, 0.7725, 0.8587, 0.9227, 0.9763, 1.0024, 1.0175, 1.0247, 1.0265, 1.0251, 1.0208, 1.0168, 1.0128, 1.0092, 1.0063, 1.0039, 1.0018, 1.0007, 1, 1)';

/**
 * ζ = 0.40 — juguetón, sobrepaso franco. Solo para lo que celebra algo.
 *
 * k = 300, c = 14 · duración natural 925 ms · sobrepaso 1.2435
 */
export const SPRING_BOUNCY =
  'linear(0, 0.1939, 0.6113, 0.9587, 1.1744, 1.2435, 1.1964, 1.1053, 1.0182, 0.9616, 0.9407, 0.9501, 0.9717, 0.9935, 1.0093, 1.0143, 1.0126, 1.0075, 1.0016, 0.998, 0.9965, 0.9968, 0.9982, 0.9995, 1)';
