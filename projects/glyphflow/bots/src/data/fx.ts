import { f2 } from './color';

/**
 * Efectos y accesorios extra que valen para TODAS las formas.
 *
 * - Efectos (`glow`, `pixel`, `glitch`, `bug`): capas SVG que se montan dentro, detrás y encima de
 *   la silueta. Se encienden por atributo (`data-fx`) desde el CSS.
 * - Accesorios extra (`halo`, `glasses`, `heart`, `earphones`): se acomodan midiendo la silueta
 *   de cada forma (dónde está la coronilla y qué tan ancha es a la altura de la cara).
 *
 * Todo es texto puro. La MEDICIÓN de la silueta necesita el DOM y vive aparte
 * (`engine/silhouette.ts`); aquí `accXMarkup` la recibe ya hecha.
 */

/** Lo mínimo que estos efectos necesitan saber de una forma. */
export interface GfBotFxShape {
  /** Centro vertical de la silueta. */
  cy: number;
}

/** Forma con su silueta, para colocar accesorios. */
export interface GfBotAccShape extends GfBotFxShape {
  /** Contorno de la silueta (`d` de SVG). */
  d: string;
  /** Altura de los ojos. */
  faceY: number;
  /** Desplazamiento horizontal de lo que va sobre la cabeza. */
  hatX?: number;
}

/** Medidas de la silueta: coronilla (`top`, `topX`) y ancho a la altura de la cara (`l`, `r`). */
export interface GfSilMetrics {
  top: number;
  topX: number;
  l: number;
  r: number;
}

// ---------- Efectos (sección Colores, para TODAS las formas) ----------
export const FX_VARS = { glow:'Contorno glow', pixel:'Pixel', glitch:'Glitch', bug:'Bug' } as const;
export type GfBotFxId = keyof typeof FX_VARS;
export const fxInMarkup = (p: string, sh: GfBotFxShape): string => `<g class="xfx xfx-glow">
    <radialGradient id="${p}-ngd" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#3B2F9C"/><stop offset=".6" stop-color="#22196A"/><stop offset="1" stop-color="#140F47"/></radialGradient>
    <linearGradient id="${p}-ngr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF7AD9"/><stop offset=".45" stop-color="#9B7BFF"/><stop offset="1" stop-color="#4FA8FF"/></linearGradient>
    <rect x="-20" y="10" width="240" height="210" fill="url(#${p}-ngd)"/>
    <use href="#${p}-cs" fill="none" stroke="url(#${p}-ngr)" stroke-width="12" opacity=".75" filter="url(#${p}-mblur2)"/>
    <use href="#${p}-cs" fill="none" stroke="url(#${p}-ngr)" stroke-width="3.2"/>
    <ellipse cx="80" cy="${f2(sh.cy - 22)}" rx="20" ry="7" fill="#fff" opacity=".12" filter="url(#${p}-mblur2)"/></g>
  <g class="xfx xfx-bug">
    <pattern id="${p}-chk" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#FF19E6"/><rect width="4" height="4" fill="#141018"/><rect x="4" y="4" width="4" height="4" fill="#141018"/></pattern>
    ${[[-34, -20, 24, 16, 0], [14, 6, 28, 12, -1.7], [-12, 30, 18, 10, -3.1], [26, -34, 14, 10, -4.4]].map(([dx, dy, w, h, del]) =>
      `<rect class="xchk" x="${100 + dx}" y="${f2(sh.cy + dy)}" width="${w}" height="${h}" fill="url(#${p}-chk)" style="animation-delay:${del}s"/>`).join('')}</g>`;
export const fxBackMarkup = (p: string): string => `<g class="xfx xfx-glow"><use href="#${p}-cs" fill="none" stroke="url(#${p}-ngr)" stroke-width="7" opacity=".9" filter="url(#${p}-nglowf)"/></g>`;
export const fxOutMarkup = (p: string, sh: GfBotFxShape): string => `<g class="xfx xfx-glitch">${([[-6, 3, '#38F2FF', 0], [22, 2.4, '#FF3BD4', -.7], [-30, 1.8, '#FFFFFF', -1.3], [38, 3.4, '#38F2FF', -1.9]] as [number, number, string, number][]).map(([dy, h, c, del], i) =>
      `<rect class="xbar" x="${28 + i * 6}" y="${f2(sh.cy + dy)}" width="${132 - i * 10}" height="${h}" fill="${c}" style="animation-delay:${del}s"/>`).join('')}</g>
  <g class="xfx xfx-bug"><g class="xbeetle"><animateMotion dur="12s" repeatCount="indefinite" rotate="auto"><mpath href="#${p}-cs"/></animateMotion>
    <g transform="translate(0 -3.2)"><path d="M-4 -3.4 L-6.4 -5.6 M0 -3.8 L0 -6.4 M4 -3.4 L6.4 -5.6 M-4 3.4 L-6.4 5.6 M0 3.8 L0 6.4 M4 3.4 L6.4 5.6" stroke="#2A1730" stroke-width="1.1" stroke-linecap="round"/>
    <ellipse cx="0" cy="0" rx="6" ry="4.4" fill="#F0384F"/><path d="M-6 0 H6" stroke="#2A1730" stroke-width=".9"/><circle cx="6.2" cy="0" r="2.4" fill="#2A1730"/>
    <circle cx="-2.6" cy="-1.9" r="1" fill="#2A1730"/><circle cx="2" cy="-2" r=".9" fill="#2A1730"/><circle cx="-1.5" cy="2" r="1" fill="#2A1730"/><circle cx="2.6" cy="1.8" r=".8" fill="#2A1730"/>
    <ellipse cx="-2" cy="-2.4" rx="1.6" ry=".8" fill="#fff" opacity=".6"/></g></g></g>`;

// ---------- Accesorios extra (sección Sombreros, para TODAS las formas) ----------

/** Accesorios extra. `glasses` no está aquí: va en la cara para que gire con ella. */
export const ACCX = { halo:'Halo', glasses:'Gafas', heart:'Corazón', earphones:'Auriculares' } as const;
export type GfBotAccXId = keyof typeof ACCX;

/** Marcado del accesorio `k` colocado según las medidas `m` de la silueta de `sh`. */
export function accXMarkup(k: string, sh: GfBotAccShape, p: string, m: GfSilMetrics): string {
  const cx = 100 + (sh.hatX ?? 0), at = `translate(${f2(cx - 104)} ${f2(m.top - 64)})`;
  if (k === 'halo') return `<g class="xacc"><g transform="${at}"><g class="nhalo"><ellipse cx="104" cy="49" rx="25" ry="6.4" fill="none" stroke="#FFE07A" stroke-width="7" opacity=".45" filter="url(#${p}-mblur2)"/>
    <linearGradient id="${p}-nhg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F5B83C"/><stop offset=".5" stop-color="#FFE68A"/><stop offset="1" stop-color="#E9A62B"/></linearGradient>
    <ellipse cx="104" cy="49" rx="25" ry="6.4" fill="none" stroke="url(#${p}-nhg)" stroke-width="3.6"/><path d="M86 45.6 Q98 42.4 112 43" fill="none" stroke="#FFF8D6" stroke-width="1.3" stroke-linecap="round" opacity=".9"/></g></g></g>`;
  if (k === 'heart') return `<g class="xacc"><g transform="${at}"><g class="nhearts"><path class="nh1" d="M150 66 C138 57 142 47 150 53 C158 47 162 57 150 66 Z" fill="#FF7FB4"/>
    <path class="nh2" d="M167 50 C160 45 162 39 167 42 C172 39 174 45 167 50 Z" fill="#FF9AC6"/><circle cx="146.5" cy="54.5" r="1.8" fill="#fff" opacity=".7"/></g></g></g>`;
  if (k === 'earphones') {
    const fy = sh.faceY, xl = m.l + 4, xr = m.r - 4, cy0 = fy - 2, ty = m.top - (fy - m.top) * .32;
    const cup = (x: number) => `<rect x="${f2(x - 11)}" y="${f2(cy0 - 17)}" width="22" height="34" rx="10" fill="url(#${p}-nag)"/><rect x="${f2(x - 7)}" y="${f2(cy0 - 13)}" width="7" height="18" rx="3.5" fill="#fff" opacity=".45"/>`;
    const band = `M${f2(xl)} ${f2(cy0 - 12)} C${f2(xl - 2)} ${f2(ty)} ${f2(xr + 2)} ${f2(ty)} ${f2(xr)} ${f2(cy0 - 12)}`;
    return `<g class="xacc"><linearGradient id="${p}-nag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B3A2FF"/><stop offset=".55" stop-color="#7E69EC"/><stop offset="1" stop-color="#5A45C9"/></linearGradient>
      <path d="${band}" fill="none" stroke="#5A45C9" stroke-width="8.5" stroke-linecap="round"/><path d="${band}" fill="none" stroke="url(#${p}-nag)" stroke-width="6" stroke-linecap="round"/>${cup(xl)}${cup(xr)}</g>`;
  }
  return '';   // gafas: van en la cara (faceMarkup), para que giren con ella
}
// Paleta del bot (tokens --bot-*) para las pieles que no están en el CSS: gato (se deriva de GATO_PAL), fantasma y noche.
