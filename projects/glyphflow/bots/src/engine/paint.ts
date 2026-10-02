import { MATERIALS, PALETTES, RIM, type GfBotPaletteId } from '../data/palettes';
import type { BotContext, GfBotMaterialId } from './context';

/**
 * Color y material del cuerpo. La paleta fija tres tonos del degradado (`--c1..3`) y el color del
 * borde; el material (metal, cromo, oro) los reemplaza por seis paradas de un degradado metálico.
 */

const paletteOf = (ctx: BotContext): readonly [string, string, string] =>
  PALETTES[ctx.paletteKey === 'auto' ? (ctx.shape.palette as GfBotPaletteId) : ctx.paletteKey];

export function setPalette(ctx: BotContext, key: GfBotPaletteId | 'auto'): void {
  ctx.paletteKey = key;
  const pk = key === 'auto' ? (ctx.shape.palette as GfBotPaletteId) : key;
  const [a, b, c] = PALETTES[pk];
  ctx.svg.style.setProperty('--c1', a);
  ctx.svg.style.setProperty('--c2', b);
  ctx.svg.style.setProperty('--c3', c);
  ctx.svg.style.setProperty('--rim', RIM[pk] || a);
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
