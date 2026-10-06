import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';

const kit = gfBotKit;

/** «En el suelo» entre `a`..`b` de despegue y `c`..`d` de caída: 1 apoyado, 0 en el aire. */
export const aire = (a: number, b: number, c: number, d: number) => (t: number) =>
  t < (b + c) / 2 ? 1 - kit.smoothstep(a, b, t) : kit.smoothstep(c, d, t);

/** Una boca que dura `span` (fracción del gesto) y empieza en `at`. */
export const boca = (ctx: BotContext, ms: number, at: number, name: string, span: number): void => {
  kit.later(ctx, () => kit.setMouth(ctx, name, span * ms), at * ms);
};

/** Muestrea `f(t)` en `n + 1` instantes: nodos `[t, valor]` para armar una partitura a partir de una fórmula. */
export const nodos = (n: number, f: (t: number) => number): [number, number][] =>
  Array.from({ length: n + 1 }, (_, i) => [i / n, f(i / n)] as [number, number]);

export interface PerformOpts {
  /** Duración por defecto y límites (ms). */
  ms: number;
  min?: number;
  max?: number;
  /** Cuánto se separa del suelo (unidades): la sombra se encoge con la altura. 0 = no dibuja sombra. */
  alto?: number;
  /** Cara, efectos… después de lanzar la partitura. */
  extras?: (ctx: BotContext, ms: number) => void;
}

/**
 * El esqueleto de un gesto con partitura: lee la duración (`--gf-bot-<id>-duration`), respeta el movimiento
 * reducido, lanza la partitura, la sombra y lo que añada `extras`. Devuelve la duración (para encadenar).
 */
export function perform(ctx: BotContext, id: string, def: () => GestureDef, o: PerformOpts): number {
  const ms = kit.motion.gestureDuration(ctx, id, o.ms, o.min ?? 400, o.max ?? 4000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const at = kit.motion.runGesture(ctx, def(), ms);
  if (o.alto) kit.motion.shadowByHeight(ctx, at, ms, o.alto);
  o.extras?.(ctx, ms);
  return ms;
}
