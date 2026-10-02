import type { GfBotState } from '../bot-state';
import type { BotContext } from './context';

/**
 * La boca es mucho más chica que los ojos y cambia con el estado y con cada gesto. Hay una por
 * `data-m` (`smile`, `oval`, `cat`, `half`, `pill`, `wide`, `open`, `w`, `o`, `sleep`, `flat`,
 * `frown`, `wavy`) y se muestra una a la vez.
 */

/** Muestra la boca `name`; con `ms` vuelve sola a la de reposo (`ctx.mouthBase`) y avisa a las caras kawaii. */
export function setMouth(ctx: BotContext, name: string, ms?: number): void {
  if (ctx.mouthT) clearTimeout(ctx.mouthT);
  ctx.fe.mouths.forEach((m) => (m.style.opacity = m.dataset['m'] === name ? '1' : '0'));
  if (ms) {
    ctx.mouthT = setTimeout(() => setMouth(ctx, ctx.mouthBase), ms);
    ctx.hooks.cue({ mouth: name, ms });
  }
}

/** Cambia la boca de reposo: a la que vuelve tras cada gesto. */
export function baseMouth(ctx: BotContext, name: string): void {
  ctx.mouthBase = name;
  setMouth(ctx, name);
}

/**
 * La boca de reposo de un estado: dormido `sleep`, trabajando `flat`, y en reposo la elegida a mano
 * o la de la forma (pastilla en todas; el gato conserva su «w»).
 */
export const defaultMouth = (ctx: BotContext, state: GfBotState): string =>
  state === 'sleeping' ? 'sleep' : state === 'working' ? 'flat' : ctx.mouthPref || ctx.shape.baseMouth || 'pill';
