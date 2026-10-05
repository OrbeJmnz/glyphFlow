import type { BotContext } from './context';

/** Marca de los grupos de efectos que dibuja un gesto (flechas, rayos…): el motor los retira al cortarlo. */
export const GESTURE_FX_MARK = 'flipfx';

/** Quita los efectos de un gesto anterior: que sigan ahí no tiene sentido si empieza otro, o se corta. */
export function clearGestureFx(ctx: BotContext): void {
  ctx.svg.querySelectorAll(`.${GESTURE_FX_MARK}`).forEach((n) => n.remove());
}
