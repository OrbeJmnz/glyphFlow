import { MATERIALS, resolvePalette, type GfBotPaletteId, type GfBotPaletteInput } from '../data/palettes';
import type { BotContext, GfBotMaterialId } from './context';

/**
 * Color y material del cuerpo. La paleta fija tres tonos del degradado (`--c1..3`) y el color del
 * borde; el material (metal, cromo, oro) los reemplaza por seis paradas de un degradado metálico.
 */

const paletteOf = (ctx: BotContext): readonly [string, string, string] => resolvePalette(ctx.paletteKey, ctx.shape.palette as GfBotPaletteId).colors;

export function setPalette(ctx: BotContext, key: GfBotPaletteInput): void {
  const { colors: [a, b, c], rim } = resolvePalette(key, ctx.shape.palette as GfBotPaletteId);
  ctx.paletteKey = key;
  ctx.svg.style.setProperty('--c1', a);
  ctx.svg.style.setProperty('--c2', b);
  ctx.svg.style.setProperty('--c3', c);
  ctx.svg.style.setProperty('--rim', rim);
  applyMaterial(ctx);
}

export function setMaterial(ctx: BotContext, key: GfBotMaterialId | 'auto'): void {
  ctx.materialKey = key;
  applyMaterial(ctx);
}

export function applyMaterial(ctx: BotContext): void {
  const k: GfBotMaterialId = ctx.materialKey === 'auto' ? (ctx.shape.material ?? 'plastic') : ctx.materialKey;
  const metal = MATERIALS[k];
  const p = ctx.id;
  ctx.svg.dataset['material'] = k;
  if (metal) metal(paletteOf(ctx)).forEach((c, i) => ctx.svg.style.setProperty('--m' + (i + 1), c));
  ctx.qa('[data-paint]').forEach((n) => n.setAttribute('fill', `url(#${p}-${metal ? 'metal' : 'body'})`));
  ctx.q('.vig')?.setAttribute('opacity', metal ? '1' : '0');
  ctx.q('.glossE')?.setAttribute('fill', `url(#${p}-${metal ? 'glossHard' : 'gloss'})`);
}
