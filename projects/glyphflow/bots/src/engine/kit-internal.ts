/**
 * El kit INTERNO (`gfBotKit.internal`): las piezas del motor que usan los extras de `glyphflow/bots/extras` (sombreros, juguetes, rutinas). **No es estable**:
 * cambia con el motor sin aviso. Si escribes un gesto propio no lo necesitas: usa el kit estable. El contexto que piden es `GfBotInternalContext`.
 */
export * as body from './body-fx';
export { applyField, fieldOffset } from './motion';
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
export { flash, lit, sweep, tint } from './light';
export { SPARK_COLORS, breathe, cloudBubble, gearPath, holdEyes, nod, pick, popIn, showFor, sleepyZ, spawnZ, squint, starPath, startle, stopLoops, typing } from './actions';
export { blink, peek } from './eyes';
export { loop } from './timing';
export { clamp01, easeInOut } from './math';
export { nodYes } from './gestures';
