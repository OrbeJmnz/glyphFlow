import type { GfBotGestureContext as BotContext, GfBotHatsExtra } from 'glyphflow/bots';
import { hatAccs } from './hat-accs';
import { hatShadowSync } from './hat-shadow';
import { hatBind, hatKick } from './hat-physics';
import { HATS, type GfBotHatId } from './hats-data';

/** Un destello al celebrar: el material del sombrero sube de brillo un instante. */
function hatPulse(ctx: BotContext) { if (!ctx.hatKey || ctx.reduce) return; ctx.qa('.hmat').forEach(n => n.animate([{ filter:'brightness(1) saturate(1)' }, { filter:'brightness(1.12) saturate(1.2)', offset:.3 }, { filter:'brightness(1) saturate(1)' }], { duration:900, easing:'ease-out' })); }

/** Los 16 sombreros y accesorios de cabeza, con su física. */
export const hatsExtra: GfBotHatsExtra = {
  has: (key) => Object.hasOwn(HATS, key),
  accs: (key, sh) => hatAccs(key as GfBotHatId, sh),
  bind: hatBind,
  kick: hatKick,
  pulse: hatPulse,
  sync: hatShadowSync,
};
