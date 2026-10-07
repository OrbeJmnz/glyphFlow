/**
 * La parte de movimiento del kit ESTABLE (`gfBotKit.motion`). Re-exporta lo que usan los gestos con las firmas ESTRECHAS: donde el motor pide el
 * contexto completo, aquí se pide `GfBotGestureContext`. Son alias (`export const x = f as ...`) y no un objeto: así el bundler sigue pudiendo
 * quitar lo que no se importa.
 */
import type { BotContext, GfBotGestureContext } from './context';
import { gestureDuration as _gestureDuration, reducedHop as _reducedHop, runGesture as _runGesture, shadowByHeight as _shadowByHeight, shadowFlag as _shadowFlag } from './motion';

type Narrow<F> = F extends (ctx: BotContext, ...a: infer A) => infer R ? (ctx: GfBotGestureContext, ...a: A) => R : never;

export {
  anticipate, ball, bounce, bulge, drag, frameAt, impact, jump, key, launch, melt, overshoot, rotate, score, secondaryMotion, settle, shear, spin,
  squash, stretch, taper, tracksOf, wave, wobble,
} from './motion';
export type { Channel, FieldTerm, GestureDef, Keys, MotionFrame, Score } from './motion';

export const runGesture = _runGesture as Narrow<typeof _runGesture>;
export const gestureDuration = _gestureDuration as Narrow<typeof _gestureDuration>;
export const reducedHop = _reducedHop as Narrow<typeof _reducedHop>;
export const shadowFlag = _shadowFlag as Narrow<typeof _shadowFlag>;
export const shadowByHeight = _shadowByHeight as Narrow<typeof _shadowByHeight>;
