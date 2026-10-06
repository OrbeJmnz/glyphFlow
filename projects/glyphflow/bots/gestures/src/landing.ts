import { gfBotKit, type GfBotGesture, type GfBotGestureContext as BotContext } from 'glyphflow/bots';

const kit = gfBotKit;

/** Con qué cara se queda el bot al aterrizar. */
export type GfBotLandingPose = 'happy' | 'proud' | 'dizzy' | 'surprised';

/**
 * 20 · LANDING POSE — un modificador, no un gesto: la cara con la que se queda un instante tras una
 * acrobacia (150–300 ms) y después vuelve al reposo. `ms` es lo que dura el gesto al que se encadena.
 */
export function landingPose(ctx: BotContext, ms: number, pose: GfBotLandingPose, hold = 240): void {
  const S = kit.S;
  const d = Math.min(300, Math.max(150, hold));
  kit.later(ctx, () => {
    ctx.hooks.act(d);
    if (pose === 'happy') {
      kit.eyeSeq(ctx, [{ transform: S(1, 1), offset: 0 }, { transform: S(1.06, 0.4), offset: 0.2 }, { transform: S(1.06, 0.4), offset: 0.75 }, { transform: S(1, 1), offset: 1 }], d);
      kit.setMouth(ctx, 'wide', d);
    } else if (pose === 'proud') {
      kit.eyeSeq(ctx, [{ transform: S(1, 1), offset: 0 }, { transform: S(1, 0.55), offset: 0.2 }, { transform: S(1, 0.55), offset: 0.8 }, { transform: S(1, 1), offset: 1 }], d);
      kit.setMouth(ctx, 'smile', d);
    } else if (pose === 'dizzy') {
      kit.eyeSeq(ctx, [
        { transform: S(1, 1), offset: 0 }, { transform: S(1.1, 0.5), offset: 0.2 }, { transform: S(1, 1.2), offset: 0.4 },
        { transform: S(1.1, 0.5), offset: 0.6 }, { transform: S(1, 1.15), offset: 0.8 }, { transform: S(1, 1), offset: 1 },
      ], d);
      kit.setMouth(ctx, 'wavy', d);
    } else {
      kit.eyeSeq(ctx, [{ transform: S(1, 1), offset: 0 }, { transform: S(1.3, 1.45), offset: 0.15 }, { transform: S(1.3, 1.45), offset: 0.75 }, { transform: S(1, 1), offset: 1 }], d);
      kit.setMouth(ctx, 'o', d);
    }
  }, ms);
}

/**
 * Encadena una pose de aterrizaje a un gesto que devuelva su duración (los de `glyphflow/bots/gestures`):
 * `gestures: { proudFlip: withLanding(frontFlip, 'proud') }`.
 */
export const withLanding = (gesture: GfBotGesture, pose: GfBotLandingPose, hold?: number): GfBotGesture => (ctx) => {
  const ms = gesture(ctx);
  if (typeof ms === 'number') landingPose(ctx, ms, pose, hold);
  return ms;
};
