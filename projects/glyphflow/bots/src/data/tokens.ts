import { hexMix } from './color';
import { CAT_PAL, type GfCatVariant } from './cat';
import { OCTOPUS_PAL, type GfOctopusVariant } from './octopus';

/**
 * Paleta del bot (tokens `--bot-*`) para las pieles que NO están en el CSS: fantasma, noche y,
 * derivadas de su paleta, gato y pulpo. Los sombreros y los objetos la heredan.
 */

/** Los canales de color que heredan sombreros y juguetes. `stroke` es el contorno (solo "Línea"). */
export interface GfBotTokens {
  base: string;
  primary: string;
  secondary: string;
  tertiary: string;
  highlight: string;
  shadow: string;
  edge: string;
  glow: string;
  stroke?: string;
}

// Fantasma (f1…f12) y noche (n1, n2, n10).
export const BOT_TOKENS: Readonly<Record<string, GfBotTokens>> = {
  f1:{ base:'#EEE8FF', primary:'#D7CCFB', secondary:'#CDE4FF', tertiary:'#FBD9F2', highlight:'#FFFFFF', shadow:'#C3B6F2', edge:'#FFFFFF', glow:'#F4D8FF' },
  f2:{ base:'#F1EEFD', primary:'#F1EEFD', secondary:'#F1EEFD', tertiary:'#F1EEFD', highlight:'#F1EEFD', shadow:'#E1DCF6', edge:'#F1EEFD', glow:'#F1EEFD' },
  f3:{ base:'#FFFFFF', primary:'#FFFFFF', secondary:'#F4F3FD', tertiary:'#F7F2FD', highlight:'#FFFFFF', shadow:'#E6E4F6', edge:'#FFFFFF', glow:'#FFFFFF', stroke:'#2A22A6' },
  f4:{ base:'#E2D4FC', primary:'#D9C8FC', secondary:'#9EE4FD', tertiary:'#FDC8DA', highlight:'#FFFFFF', shadow:'#A8ADFC', edge:'#FFFFFF', glow:'#FABCFC' },
  f5:{ base:'#E4E0FC', primary:'#DCD7FC', secondary:'#C8C3FB', tertiary:'#EEEBFD', highlight:'#FFFFFF', shadow:'#B4AEF3', edge:'#FFFFFF', glow:'#EEEBFD' },
  f6:{ base:'#F6F3FA', primary:'#F3F0FA', secondary:'#E6E2F5', tertiary:'#F7F4FB', highlight:'#FFFFFF', shadow:'#D6D1EE', edge:'#FFFFFF', glow:'#FCFAFE' },
  f7:{ base:'#9A8CFD', primary:'#B8B3FD', secondary:'#6FEAFC', tertiary:'#FD7FE0', highlight:'#E6E2FF', shadow:'#5BA2FD', edge:'#FFFFFF', glow:'#FC87F9' },
  f8:{ base:'#E9E6FC', primary:'#E9E6FC', secondary:'#D9D5F7', tertiary:'#F4F2FD', highlight:'#FFFFFF', shadow:'#C9C5F0', edge:'#FFFFFF', glow:'#F4F2FD' },
  f9:{ base:'#E9E6FD', primary:'#9FBAFC', secondary:'#B7DEFB', tertiary:'#FBE0F6', highlight:'#FFFFFF', shadow:'#A4B8F2', edge:'#FFFFFF', glow:'#D9C4FF' },
  f10:{ base:'#F7F1FB', primary:'#D4C4FC', secondary:'#D2F3F4', tertiary:'#FDE4D6', highlight:'#FFFFFF', shadow:'#CFC4EE', edge:'#FFFFFF', glow:'#EEF0FF' },
  f11:{ base:'#161B52', primary:'#3B3084', secondary:'#2F48BA', tertiary:'#7B5CFF', highlight:'#6B64C8', shadow:'#0D1345', edge:'#9C8CFF', glow:'#5B3FD0' },
  f12:{ base:'#EBE2FF', primary:'#E6DEFF', secondary:'#D7D1FF', tertiary:'#F3EEFF', highlight:'#FFFFFF', shadow:'#C4C0FB', edge:'#FFFFFF', glow:'#FAF8FF' },
  n1:{ base:'#8E62F7', primary:'#A679FA', secondary:'#5540E6', tertiary:'#C193FC', highlight:'#E7DAFF', shadow:'#4A33C4', edge:'#E7DAFF', glow:'#8B5CF6' },
  n2:{ base:'#F5F4FE', primary:'#E4E0FC', secondary:'#C7D8FB', tertiary:'#F0D2F3', highlight:'#FFFFFF', shadow:'#CBCDF3', edge:'#FFFFFF', glow:'#DCD8FF' },
  n10:{ base:'#E8E4FD', primary:'#C6F3E6', secondary:'#B7C2FC', tertiary:'#F8C6EC', highlight:'#FFFFFF', shadow:'#B4B2EE', edge:'#FFFFFF', glow:'#DDEBFF' }
};

/** Los tokens de la piel `v`, o `null` si no es de ninguna familia con paleta propia. */
export function botTokens(v: string): GfBotTokens | null {
  const T = BOT_TOKENS[v];
  if (T) return T;
  const PP = OCTOPUS_PAL[v as GfOctopusVariant];
  if (PP) { const P = PP; return { base:P.head[1], primary:P.head[2], secondary:P.armR, tertiary:P.armL, highlight:P.dark ? '#5B4BC8' : '#FFFFFF', shadow:P.shade, edge:P.dark ? '#8C6CFF' : '#FFFFFF', glow:P.mid }; }
  const P = CAT_PAL[v as GfCatVariant]; if (!P) return null;
  const dark = v === 'g11';
  return { base:P.mid, primary:P.top, secondary:P.bot, tertiary:P.inner, highlight: dark ? hexMix(P.top, '#FFFFFF', .25) : hexMix(P.top, '#FFFFFF', .6),
    shadow: hexMix(P.bot, '#2A1440', dark ? .3 : .22), edge: dark ? '#8C6CFF' : '#FFFFFF', glow: hexMix(P.top, '#FFFFFF', .3), stroke: v === 'g3' ? '#D85B3F' : 'none' };
}
