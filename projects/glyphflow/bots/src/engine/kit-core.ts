/**
 * El resto del kit ESTABLE: lo que no es movimiento puro (ojos, boca, temporizadores, sombra, suelo), con firmas estrechas. Ver `kit-motion.ts`.
 */
import type { BotContext, GfBotGestureContext } from './context';
import { eyeSeq as _eyeSeq } from './eyes';
import { setMouth as _setMouth } from './mouth';
import { later as _later } from './timing';
import { shadowFor as _shadowFor } from './actions';
import { groundClip as _groundClip } from './ground';
import { clearGestureFx as _clearGestureFx } from './gesture-fx';

type Narrow<F> = F extends (ctx: BotContext, ...a: infer A) => infer R ? (ctx: GfBotGestureContext, ...a: A) => R : never;

export { S } from './math';
export { smoothstep, track } from './track';
export { GROUND_Y } from './ground';
export { GESTURE_FX_MARK } from './gesture-fx';

export const eyeSeq = _eyeSeq as Narrow<typeof _eyeSeq>;
export const setMouth = _setMouth as Narrow<typeof _setMouth>;
export const shadowFor = _shadowFor as Narrow<typeof _shadowFor>;
export const groundClip = _groundClip as Narrow<typeof _groundClip>;
export const clearGestureFx = _clearGestureFx as Narrow<typeof _clearGestureFx>;
/** Programa `fn` en la bolsa del gesto en curso: se apaga con `cancel()` o una interrupción. */
export const later = _later as (ctx: GfBotGestureContext, fn: () => void, ms: number, bag?: ReturnType<typeof setTimeout>[]) => ReturnType<typeof setTimeout>;
