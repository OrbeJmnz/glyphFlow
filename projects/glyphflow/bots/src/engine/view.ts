import { viewYaw, type GfBotView } from '../data/views';
import type { BotContext } from './context';
import { setPose } from './pose-motion';

/** Cambia la vista de reposo: el bot gira hasta ella con el resorte de siempre (ver `data/views.ts`). */
export function setView(ctx: BotContext, view: GfBotView | number | null): void {
  ctx.view = viewYaw(view);
  setPose(ctx, { yaw: ctx.view });
}
