import { S } from './math';
import type { BotContext, BotLights } from './context';

/**
 * Iluminación del bot. `key` es la luz principal (se mueve el degradado); `lift`/`dim` son la
 * exposición; `rl`/`rr`/`rt`/`rb` son luces de borde de color; `sheen` es el destello que barre la
 * superficie y `gloss` el reflejo especular. Cada una es un `<rect>` recortado por la silueta: el
 * cuerpo es luz FIJA y la silueta gira, no al revés.
 */

/** Anima UNA luz por nombre. Devuelve la animación por si el gesto necesita cancelarla. */
export const lit = (
  ctx: BotContext,
  name: keyof BotLights,
  frames: Keyframe[],
  duration: number,
  options: KeyframeAnimationOptions = {},
): Animation => ctx.el.L[name].animate(frames, { duration, easing: 'ease-in-out', ...options });

/** Fija variables CSS del bot (`--rt`, `--sh`, `--mood`…): el color de las luces vive en ellas. */
export const tint = (ctx: BotContext, vars: Record<string, string>): void =>
  Object.entries(vars).forEach(([k, v]) => ctx.svg.style.setProperty('--' + k, v));

/** Destello de luz: una idea, un susto, un ¡listo! `amount` es la opacidad del pico; `color` enciende el borde de arriba. */
export function flash(ctx: BotContext, amount: number, duration: number, color?: string): void {
  const { mflow, mhalo } = ctx.fe;
  if (mflow) {
    // Gel/App: el color interno se enciende y se expande con el destello
    mflow.animate(
      [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.14)', opacity: 1, offset: 0.18 }, { transform: 'scale(1)' }],
      { duration: duration * 1.3, easing: 'ease-out' },
    );
    mhalo?.animate([{ opacity: 1 }, { opacity: 1.6, offset: 0.18 }, { opacity: 1 }], {
      duration: duration * 1.3,
      easing: 'ease-out',
    });
  }
  if (color) {
    tint(ctx, { rt: color });
    lit(ctx, 'rt', [{ opacity: 0 }, { opacity: 0.7, offset: 0.18 }, { opacity: 0 }], duration * 1.2);
  }
  lit(ctx, 'lift', [{ opacity: 0 }, { opacity: amount, offset: 0.15 }, { opacity: 0 }], duration);
  lit(
    ctx,
    'gloss',
    [{ transform: S(1), opacity: 1 }, { transform: S(1.3, 1.25), opacity: 1, offset: 0.15 }, { transform: S(1) }],
    duration,
  );
}

export interface GfBotSweepOptions {
  color?: string;
  from?: number;
  to?: number;
  peak?: number;
  delay?: number;
}

/** Un brillo cruza el cuerpo de `from` a `to` (en unidades del viewBox). */
export function sweep(
  ctx: BotContext,
  duration: number,
  { color = '#fff', from = 20, to = 180, peak = 0.5, delay = 0 }: GfBotSweepOptions = {},
): void {
  tint(ctx, { sh: color });
  lit(
    ctx,
    'sheen',
    [
      { transform: `translateX(${from}px) skewX(-14deg)`, opacity: 0 },
      { opacity: peak, offset: 0.5 },
      { transform: `translateX(${to}px) skewX(-14deg)`, opacity: 0 },
    ],
    duration,
    { delay },
  );
}
