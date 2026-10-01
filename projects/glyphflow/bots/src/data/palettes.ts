import { mixHex } from './color';

/**
 * Paletas de color de las formas (`[luz, medio, sombra]`), su luz de contorno y los materiales
 * (plástico, metal, cromo, oro) que re-mapean los seis canales del degradado del cuerpo.
 */

export const PALETTES = {
  lavanda:  ['#D6CBFF','#7C5CFF','#33228F'],
  coral:    ['#FFC0A8','#F2542D','#8C220C'],
  cielo:    ['#C4E4FF','#3E8BFF','#13398F'],
  menta:    ['#B8F7DD','#1FBF8F','#08594A'],
  acero:    ['#FBFAFF','#D9D5E8','#8C86A6'],   // gris lavanda muy claro: silicona, no metal
  caramelo: ['#F8CF98','#D9784A','#8A3A22'],   // caramelo claro → terracota → marrón rojizo
  agua:     ['#C2FBFF','#1FC3E6','#0A557A'],
  niebla:   ['#FFFFFF','#DAD7EC','#8581A6'],
  mandarina:['#FFD9AD','#FF8A3D','#9C3A07'],
  ambar:    ['#FFE3A3','#F5A524','#8A4F00']
} as const satisfies Record<string, readonly [string, string, string]>;

export type GfBotPaletteId = keyof typeof PALETTES;

/** Luz de contorno (rim) de cada paleta: el color del bot, muy sutil, por detrás. */
export const RIM: Readonly<Record<GfBotPaletteId, string>> = { lavanda:'#B79CFF', caramelo:'#FFB36B', acero:'#7FE9FF', coral:'#FFB199', cielo:'#8CC4FF', menta:'#8CF2C8', agua:'#8FF3FF', niebla:'#E6E2FF', mandarina:'#FFC089', ambar:'#FFD27A' };

/** Seis canales del degradado del cuerpo; `null` = el de la paleta tal cual. */
export type GfBotMaterialStops = readonly [string, string, string, string, string, string];

/** Metal = el reflejo del entorno: cielo claro arriba, un horizonte oscuro y nítido, el piso abajo. */
export const MATERIALS: Readonly<Record<"plastico" | "metal" | "cromo" | "oro", ((p: readonly [string, string, string]) => GfBotMaterialStops) | null>> = {
  plastico: null,
  metal: ([c1, c2, c3]): GfBotMaterialStops => [c1, mixHex(c1, '#ffffff', .75), c2, mixHex(c3, '#000000', .25), mixHex(c2, c3, .45), mixHex(c1, c2, .3)],
  cromo: () => ['#DDE3EC', '#FFFFFF', '#8E97A6', '#262A34', '#6E7684', '#C9D0DC'],
  oro:   () => ['#FFE59A', '#FFFBEA', '#D59A1A', '#5A3600', '#A66E14', '#FFD46A']
};
