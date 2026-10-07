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
export { groundClip, GROUND_Y } from './ground';

/*
 * Lo que necesitan los extras de `glyphflow/bots/extras` (juguetes, sombreros): las mismas piezas que usa el motor,
 * expuestas con su nombre para que el entry las llame como `kit.mk(...)` sin duplicar el motor.
 */
export { animatePose, setPose } from './pose-motion';
export { wake } from './state';
export { flushCheeks, headTop, miniHop, mk, mood, spark, tremble } from './actions';
export { f2, f3 } from '../data/color';
export { play } from './timing';
export { TAU } from './math';
export { parm } from './octopus-arms';
export { kSeq, kStars } from './reactions';
export { expr, floaty } from './kawaii';
export { baseRoll } from './base-pose';
export { swapEyes } from './eyes';
export { flash } from './light';
