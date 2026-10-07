/**
 * Las herramientas para ESCRIBIR gestos. Sale como `gfBotKit` en la API pública y es la superficie ESTABLE: lo que usan los 20 gestos del catálogo.
 *
 *  - `motion`: partitura por canales, `anticipate`, `launch`, `impact`, `bounce`, `wobble`, `secondaryMotion`… con `intensity`, y el ejecutor `runGesture`.
 *  - La cara y el cuerpo: `eyeSeq` (los ojos), `setMouth` (la boca), `shadowFor`, `groundClip`, `clearGestureFx`.
 *  - `later`: un temporizador que el bot corta si lo pausan, lo cancelan o le piden otro gesto.
 *  - `S`: `scale(x, y)` para keyframes; `smoothstep` y `track`: curvas.
 *
 * Todo lo que pide el bot lo pide como `GfBotGestureContext`, el contrato estrecho. Lo demás vive en `gfBotKit.internal`, que NO es estable.
 */
export * as motion from './kit-motion';
export { GESTURE_FX_MARK, GROUND_Y, S, clearGestureFx, eyeSeq, groundClip, later, setMouth, shadowFor, smoothstep, track } from './kit-core';
/** Piezas internas para los extras de primera mano. Sin garantía de versión. */
export * as internal from './kit-internal';
