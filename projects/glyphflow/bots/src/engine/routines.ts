
import { blink, lookTo, swapEyes } from './eyes';
import { later, loop, play } from './timing';
import { S, TAU } from './math';
import { animatePose } from './pose-motion';
import { wink } from './gestures';
import { breathe } from './actions';
import { type BotContext } from './context';




  export const FIDGETS: Record<string, (ctx: BotContext) => void> = {
    lookSide(ctx: BotContext) { const d = Math.random() < .5 ? -1 : 1; lookTo(ctx, d * .9); later(ctx, () => lookTo(ctx, 0), 1500); },
    lookUp(ctx: BotContext) { lookTo(ctx, .25, -1); later(ctx, () => { lookTo(ctx, 0); blink(ctx); }, 1300); },
    stretch(ctx: BotContext) {
      play(ctx, ctx.el.breath, [{}, { transform:S(.93,1.11), offset:.35 }, { transform:S(.93,1.11), offset:.62 }, { transform:S(1.05,.95), offset:.8 }, { transform:S(1) }], { duration:1500, easing:'ease-in-out' });
      later(ctx, () => swapEyes(ctx, 'squeeze', 700), 350);
    },
    sway(ctx: BotContext) { animatePose(ctx, u => ({ roll: 6 * Math.sin(TAU * 2 * u) * (1 - u) }), 1500); },
    wink(ctx: BotContext) { wink(ctx); }
  };

  export function fidget(ctx: BotContext) {
    if (ctx.state !== 'idle') return;
    const keys = Object.keys(FIDGETS);
    FIDGETS[keys[Math.floor(Math.random() * keys.length)]](ctx);
    later(ctx, () => fidget(ctx), 4500 + Math.random() * 3500);
  }


  /** La rutina de reposo. Las seis de trabajo y las nueve de sueño viven en `glyphflow/bots/extras` (`routinesExtra`). */
  export const RUN: Record<'idle', (ctx: BotContext) => void> = {
    idle(ctx: BotContext) {
      if (ctx.shape.float) { const fa = ctx.shape.floatAmp ?? 7; breathe(ctx, [{ transform:'translateY(0px)' }, { transform:`translateY(-${fa}px) scale(1.01,.99)` }], ctx.shape.floatDur ?? 1500); }   // el fantasma flota (el pulpo, muy poquito)
      else breathe(ctx, [{ transform:S(1) }, { transform:S(1.025,.975) }], 1600);
      ctx.fe.ants.forEach(a => loop(ctx, a, [{ transform:'rotate(-5deg)' }, { transform:'rotate(4deg)' }], { duration:2300, direction:'alternate', easing:'ease-in-out' }));
      if (ctx.opts.wander) later(ctx, () => fidget(ctx), 3000 + Math.random() * 2500);
    }
  };
