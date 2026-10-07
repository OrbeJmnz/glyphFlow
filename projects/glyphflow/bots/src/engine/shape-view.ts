import type { GfBotShape } from '../data/shape';
import type { BotContext } from './context';

/**
 * La forma tal como se DIBUJA: la del bot más los accesorios que le pone el sombrero actual. El
 * sombrero no se guarda en la forma —la forma es un objeto compartido— sino que se calcula aquí y
 * se cachea por (forma, sombrero) para no rearmar los arreglos en cada cuadro de la física.
 */
export function withHat(ctx: BotContext, sh: GfBotShape): GfBotShape {
  const key = ctx.hatKey;
  if (!key || !ctx.hats || sh.hatAt === undefined) return sh;
  const cache = ctx.hatCache;
  if (cache?.sh === sh && cache.key === key) return cache.out;
  const out: GfBotShape = { ...sh, acc: [...(sh.acc ?? []).filter((a) => !a.tuft), ...ctx.hats.accs(key, sh)] };
  ctx.hatCache = { sh, key, out };
  return out;
}

/** La forma actual con su sombrero puesto. */
export const curSh = (ctx: BotContext): GfBotShape => withHat(ctx, ctx.shape);

/** El contorno de la forma. Todas las de serie lo traen; si una propia no, es un error de quien la define. */
export function shapeD(sh: GfBotShape): string {
  if (!sh.d) throw new Error(`glyphflow/bots: la forma «${sh.id}» no define su contorno \`d\``);
  return sh.d;
}
