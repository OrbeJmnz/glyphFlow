import type { GfBotSkinLayers } from './skin';

/**
 * Piel propia: un id con prefijo `x-` (`x-sunset`). El prefijo es lo que la distingue de un typo
 * de una piel de serie —una desconocida sin prefijo sigue cayendo a `neu`— y no choca nunca con
 * los ids de serie, que no empiezan con `x-`.
 *
 * El motor NO sabe pintarla: monta unas capas mínimas que leen variables CSS, y el usuario las
 * define donde quiera (el host, un ancestro, o `[data-mvar="x-sunset"]`). Ese es el único
 * contrato público de la piel: las variables `--gf-skin-*` y los `--bot-*` de abajo; la
 * estructura interna del SVG y los `data-mvar` de serie siguen siendo internos.
 */
const CUSTOM_SKIN = /^x-[a-z0-9][a-z0-9-]*$/i;

export const isCustomSkin = (v: string): boolean => CUSTOM_SKIN.test(v);

/** `style` y no atributos de presentación: `fill="var(--x)"` no resuelve variables CSS. */
export function customSkin(p: string): GfBotSkinLayers {
  const cs = `#${p}-cs`;
  return {
    back: '',
    paint:
      `<rect x="0" y="0" width="200" height="212" style="fill:var(--gf-skin-fill,#5E61FC)"/>` +
      `<ellipse cx="90" cy="76" rx="52" ry="20" opacity=".8" filter="url(#${p}-mblob)" style="fill:var(--gf-skin-gloss,transparent)"/>`,
    over: `<use href="${cs}" style="fill:none;stroke:var(--gf-skin-edge,transparent);stroke-width:var(--gf-skin-edge-width,4);stroke-linejoin:round"/>`,
  };
}
