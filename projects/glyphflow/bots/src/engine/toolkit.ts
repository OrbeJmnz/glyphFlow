/**
 * Las herramientas para ESCRIBIR gestos: lo que usa el propio motor (el front flip) y lo que usa el
 * entry point `glyphflow/bots/gestures`. Sale como `gfBotKit` en la API pública.
 *
 *  - Primitivas de movimiento (`motion`): partitura por canales, `anticipate`, `launch`, `impact`,
 *    `bounce`, `wobble`, `secondaryMotion`… con `intensity`, y el ejecutor `runGesture`.
 *  - La cara: `eyeSeq` (los ojos), `setMouth` (la boca) y `later` (un temporizador que el bot corta si
 *    lo pausan o le piden otro gesto).
 *  - `S`: `scale(x, y)` para keyframes.
 */
export * as motion from './motion';
export { eyeSeq } from './eyes';
export { setMouth } from './mouth';
export { later } from './timing';
export { S } from './math';
export { shadowFor } from './actions';
export * as body from './body-fx';
export { clearGestureFx, GESTURE_FX_MARK } from './gesture-fx';
export { smoothstep, track } from './track';
