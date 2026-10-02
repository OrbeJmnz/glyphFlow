import { mixHex } from './color';

/**
 * Paletas de color de las formas (`[luz, medio, sombra]`), su luz de contorno y los materiales
 * (plástico, metal, cromo, oro) que re-mapean los seis canales del degradado del cuerpo.
 */

export const PALETTES = {
  lavender:  ['#D6CBFF','#7C5CFF','#33228F'],
  coral:    ['#FFC0A8','#F2542D','#8C220C'],
  sky:    ['#C4E4FF','#3E8BFF','#13398F'],
  mint:    ['#B8F7DD','#1FBF8F','#08594A'],
  steel:    ['#FBFAFF','#D9D5E8','#8C86A6'],   // gris lavanda muy claro: silicona, no metal
  caramel: ['#F8CF98','#D9784A','#8A3A22'],   // caramelo claro → terracota → marrón rojizo
  aqua:     ['#C2FBFF','#1FC3E6','#0A557A'],
  mist:   ['#FFFFFF','#DAD7EC','#8581A6'],
  tangerine:['#FFD9AD','#FF8A3D','#9C3A07'],
  amber:    ['#FFE3A3','#F5A524','#8A4F00']
} as const satisfies Record<string, readonly [string, string, string]>;

export type GfBotPaletteId = keyof typeof PALETTES;

/** Luz de contorno (rim) de cada paleta: el color del bot, muy sutil, por detrás. */
export const RIM: Readonly<Record<GfBotPaletteId, string>> = { lavender:'#B79CFF', caramel:'#FFB36B', steel:'#7FE9FF', coral:'#FFB199', sky:'#8CC4FF', mint:'#8CF2C8', aqua:'#8FF3FF', mist:'#E6E2FF', tangerine:'#FFC089', amber:'#FFD27A' };

/** Seis canales del degradado del cuerpo; `null` = el de la paleta tal cual. */
export type GfBotMaterialStops = readonly [string, string, string, string, string, string];

/** Metal = el reflejo del entorno: cielo claro arriba, un horizonte oscuro y nítido, el piso abajo. */
export const MATERIALS: Readonly<Record<"plastic" | "metal" | "chrome" | "gold", ((p: readonly [string, string, string]) => GfBotMaterialStops) | null>> = {
  plastic: null,
  metal: ([c1, c2, c3]): GfBotMaterialStops => [c1, mixHex(c1, '#ffffff', .75), c2, mixHex(c3, '#000000', .25), mixHex(c2, c3, .45), mixHex(c1, c2, .3)],
  chrome: () => ['#DDE3EC', '#FFFFFF', '#8E97A6', '#262A34', '#6E7684', '#C9D0DC'],
  gold:   () => ['#FFE59A', '#FFFBEA', '#D59A1A', '#5A3600', '#A66E14', '#FFD46A']
};
