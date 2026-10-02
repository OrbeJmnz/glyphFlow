
import { type BotContext } from './context';
import type { GfBotState } from '../bot-state';



  /* ---------- Estados y rutinas ---------- */
  export const BASE = { idle:{ yaw:0, pitch:0, roll:0 }, working:{ yaw:0, pitch:0, roll:0 }, sleeping:{ yaw:0, pitch:0, roll:-5 } };

  // cada forma tiene su inclinación natural (3–6°): así nunca se ve completamente estática
  export const baseFor = (ctx: BotContext, s: GfBotState) => ({ ...BASE[s], roll: BASE[s].roll + (s === 'sleeping' ? 0 : ctx.shape.tilt || 0) });
   // la boca neumórfica en todas las formas; el gato conserva su «w»
  export const baseRoll = (ctx: BotContext) => baseFor(ctx, ctx.state).roll;
