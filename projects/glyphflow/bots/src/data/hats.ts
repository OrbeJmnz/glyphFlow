import { f2 } from './color';

/**
 * Sombreros y accesorios de cabeza. Cada uno se dibuja en un marco local: (0,0) es la coronilla del
 * mochi (100,58) y hacia arriba es `y` negativo. Viven como accesorios (siguen la pose: giran, se
 * ladean, saltan) y además tienen FÍSICA propia: se quedan atrás cuando el cuerpo acelera, brincan
 * al caer, y las puntas y pompones se mecen más que el resto.
 *
 * El color sale 70–80 % de los tokens `--bot-*` del bot (cambian con cada piel) y 20–30 % son
 * acentos propios del sombrero (oro del mago, confeti de fiesta, blanco perla de Navidad).
 */

/** Medidas de la cabeza donde se asienta el sombrero (unidades del viewBox). */
export interface GfBotHeadMetrics {
  /** Ancho de la cabeza a la altura de la coronilla. */
  w: number;
  /** Radio vertical de la elipse de la base. */
  ry: number;
}

/** Un sombrero: sus tres capas y los parámetros del resorte con que se mueve. */
export interface GfBotHat {
  label: string;
  /** Se ajusta al CUERPO (audífonos, visera, casco) en vez de a la coronilla. */
  bodyFit?: boolean;
  /** Se dibuja en dos capas: detrás y delante del cuerpo. */
  layered?: boolean;
  /** Desplazamiento vertical del marco local. */
  oy?: number;
  /** Cuánto suben los efectos de encima (puntos, burbujas, Z) para no taparse. */
  up: number;
  /** Rigidez del resorte. */
  k: number;
  /** Cuánto se mece de lado. */
  sway: number;
  /** Cuánto se levanta al caer. */
  lift: number;
  /** Cuánto exagera la punta. */
  tip: number;
  /** `skew` deforma la punta en vez de rotarla. */
  tipMode?: 'skew';
  /** Tope de la inclinación del sombrero (grados). */
  maxTh?: number;
  /** Tope del vaivén de la punta. */
  maxTip?: number;
  /** Cuánto se ladea dormido (grados). */
  sleep?: number;
  /** Profundidad (Z) a partir de la cual la copia de adelante empieza a verse. */
  frontZ?: number;
  /** Ancho mínimo al verlo de canto (0–1), como en los accesorios. */
  minW?: number;
  /** Dibujo único, para un sombrero que no va en capas. */
  draw?: (p: string) => string;
  /** Capa detrás del cuerpo. */
  back?: (p: string, hd: GfBotHeadMetrics) => string;
  /** Capa delante del cuerpo. */
  front?: (p: string, hd: GfBotHeadMetrics) => string;
  /** Detalle suelto que se pinta sobre el sombrero (botones, confeti, chapas). */
  deco?: (p: string) => string;
  /** Sombra de contacto sobre el cuerpo (recortada por su silueta). */
  shadow?: (p: string, hd: GfBotHeadMetrics) => string;
}

/** Una mancha interna del material: `[x, y, rx, ry, token, opacidad]`. */
export type GfHatBlob = readonly [number, number, number, number, string, number];

/** Opciones del material de un sombrero. */
export interface GfHatMatOptions {
  /** Caja del degradado `[x1, y1, x2, y2]`. */
  g: readonly [number, number, number, number];
  blobs: readonly GfHatBlob[];
  extra?: string;
  shade?: string;
  hi?: string;
}

export const HAT_STAR = (x: number, y: number, r: number, c: string): string => `<path d="M${x} ${y - r} Q${x + r * .2} ${y - r * .2} ${x + r} ${y} Q${x + r * .2} ${y + r * .2} ${x} ${y + r} Q${x - r * .2} ${y + r * .2} ${x - r} ${y} Q${x - r * .2} ${y - r * .2} ${x} ${y - r} Z" fill="${c}"/>`;
export const HAT_LG = (id: string, a: string, b: string, y1: number, y2: number): string => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
export const HAT_FUZZ = (cx: number, cy: number, r: number, c = '#F7F8FF', e = '#DCE2F6'): string => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/><circle cx="${cx}" cy="${cy}" r="${r - .8}" fill="none" stroke="${e}" stroke-width="2.4" stroke-dasharray="1.6 2.2"/><circle cx="${cx - r * .35}" cy="${cy - r * .38}" r="${r * .28}" fill="#fff" opacity=".9"/>`;
// Material del bot para accesorios: base con los tokens --bot-* (ver CSS) orientada según la pieza + manchas internas
// borrosas de su paleta (recortadas a la silueta, con deriva muy lenta) + brillo arriba-izquierda + borde de luz + sombra.
export const HAT_BLOB = (p: string, [x, y, rx, ry, tok, o]: GfHatBlob): string => `<ellipse cx="${f2(x)}" cy="${f2(y)}" rx="${f2(rx)}" ry="${f2(ry)}" style="fill:var(--bot-${tok})" opacity="${o}" filter="url(#${p}-hblob)"/>`;
export function HAT_MAT(p: string, id: string, d: string, o: GfHatMatOptions): string {
  const [x1, y1, x2, y2] = o.g;
  return `<linearGradient id="${p}-${id}G" gradientUnits="userSpaceOnUse" x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}">` +
      `<stop offset="0" style="stop-color:var(--bot-highlight)"/><stop offset=".32" style="stop-color:var(--bot-base)"/><stop offset=".7" style="stop-color:var(--bot-primary)"/><stop offset="1" style="stop-color:var(--bot-shadow)"/></linearGradient>` +
    `<clipPath id="${p}-${id}K"><path d="${d}"/></clipPath>` +
    `<g class="hmat"><path d="${d}" fill="url(#${p}-${id}G)"/><g clip-path="url(#${p}-${id}K)">` +
      `<g class="hmb">${o.blobs.map(b => `<g>${HAT_BLOB(p, b)}</g>`).join('')}</g>` + (o.extra || '') +
      (o.shade ? `<path d="${o.shade}" style="stroke:var(--bot-shadow)" stroke-width="10" opacity=".55" fill="none" stroke-linecap="round" filter="url(#${p}-mblur2)"/>` : '') +
      (o.hi ? `<path d="${o.hi}" style="stroke:var(--bot-highlight)" stroke-width="8" opacity=".6" fill="none" stroke-linecap="round" filter="url(#${p}-mblur2)"/>` : '') +
      `<path d="${d}" fill="none" style="stroke:var(--bot-edge)" stroke-width="3.2" opacity=".55" filter="url(#${p}-mblur)"/></g>` +
    `<path d="${d}" fill="none" style="stroke:var(--bot-stroke)" stroke-width="3.6" stroke-linejoin="round"/></g>`;
}
// Perla (banda y pompón navideños): blanco que recibe reflejos del bot, no blanco plano
export function HAT_PEARL(p: string, id: string, d: string, box: readonly [number, number, number, number], blobs: readonly GfHatBlob[]): string {
  const [x1, y1, x2, y2] = box;
  return `<linearGradient id="${p}-${id}G" gradientUnits="userSpaceOnUse" x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F8F7FE"/><stop offset="1" stop-color="#E6E4F6"/></linearGradient>` +
    `<clipPath id="${p}-${id}K"><path d="${d}"/></clipPath><g class="hmat"><path d="${d}" fill="url(#${p}-${id}G)"/>` +
    `<g clip-path="url(#${p}-${id}K)"><g class="hmb">${blobs.map(b => `<g>${HAT_BLOB(p, b)}</g>`).join('')}</g></g>` +
    `<path d="${d}" fill="none" style="stroke:var(--bot-stroke)" stroke-width="3" stroke-linejoin="round"/></g>`;
}
// Sombra de contacto lavanda/marino (no negra), muy localizada: un halo suave + un núcleo más oscuro pegado al borde
export const HAT_CONTACT = (p: string, cy: number, rx: number, ry: number): string => `<ellipse cy="${f2(cy)}" rx="${f2(rx)}" ry="${f2(ry)}" fill="rgb(55,48,120)" opacity=".15" filter="url(#${p}-hcs)"/><ellipse cy="${f2(cy + 1.4)}" rx="${f2(rx * .82)}" ry="3" fill="rgb(55,48,120)" opacity=".18" filter="url(#${p}-mblur)"/>`;
// Acentos propios (constantes en todas las pieles)
export const HAT_ACC = {
  gold: (p: string): string => `<linearGradient id="${p}-hgB" gradientUnits="userSpaceOnUse" x1="-30" y1="0" x2="30" y2="0"><stop offset="0" stop-color="#E3AE3C"/><stop offset=".45" stop-color="#FFD75A"/><stop offset=".6" stop-color="#FFE998"/><stop offset="1" stop-color="#DDA736"/></linearGradient>` +
    `<linearGradient id="${p}-hgS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE998"/><stop offset=".55" stop-color="#FFD75A"/><stop offset="1" stop-color="#FFC94D"/></linearGradient>`
};
export const tipG = (px: number, py: number, inner: string): string => `<g class="hatTip" style="transform-origin:${px}px ${py}px">${inner}</g>`;
export const HATS = {
  // ── Los tres sombreros «puestos» y hechos de la MISMA materia que el Mochi ──
  //    Capas: HAT_BACK (detrás del cuerpo) · HAT_FRONT (delante) · contactShadow (sobre el cuerpo, recortada por su silueta).
  //    Color: 70–80 % viene del bot (tokens --bot-*, ver CSS: cambian con cada piel del Mochi) y 20–30 % son acentos
  //    propios del sombrero (oro del mago, confeti de fiesta, blanco perla de Navidad). La paleta se reparte distinto
  //    en cada pieza (manchas internas según su geometría), no es el mismo degradado pegado.
  //    Marco local: (0,0) = headAccessoryAnchor; hd = medidas de la cabeza. Luz arriba-izquierda.
  wizard: { label:'Mago', layered:true, oy:10, up:48, k:.12, sway:.6, lift:.6, tip:1.3, tipMode:'skew', maxTh:9, maxTip:1.8, sleep:5,
    back: (p, hd) => { const rx = hd.w * .68, ry = hd.ry * 1.6;
      return `<g transform="rotate(5)"><path d="M${-rx + 1} 1 A${rx - 1} ${ry - 1} 0 0 1 ${rx - 1} 1" style="stroke:var(--bot-shadow)" stroke-width="3" fill="none"/></g>`; },
    front: (p, hd) => { const rx = hd.w * .68, ry = hd.ry * 1.6, th = 4.6;
      const crown = 'M-30 -1 C-29 -24 -19 -44 -9 -55 C-1 -65 10 -75 27 -79 C19 -71 14 -63 12.5 -52 C10.5 -39 21 -21 30 -1 Q0 7 -30 -1 Z';
      const brim = `M${-rx} 0 A${rx} ${ry} 0 1 0 ${rx} 0 A${rx} ${ry} 0 1 0 ${-rx} 0 Z`;
      return `<g transform="rotate(5)">` + HAT_ACC.gold(p) +
        // ala: grosor (sombra del bot → rebote de su color secundario abajo) + superficie con el material del bot
        `<linearGradient id="${p}-mgE" gradientUnits="userSpaceOnUse" x1="0" y1="${ry - 3}" x2="0" y2="${ry + th + 1}"><stop offset="0" style="stop-color:var(--bot-shadow)"/><stop offset="1" style="stop-color:var(--bot-secondary)"/></linearGradient>` +
        `<path d="M${-rx} 0 A${rx} ${ry} 0 0 0 ${rx} 0 L${rx} ${th} A${rx} ${ry} 0 0 1 ${-rx} ${th} Z" fill="url(#${p}-mgE)"/>` +
        HAT_MAT(p, 'mb', brim, { g:[-rx, -ry, rx, ry], blobs:[[-rx * .55, -ry * .25, rx * .38, ry * .7, 'tertiary', .55], [rx * .5, ry * .35, rx * .4, ry * .7, 'secondary', .6], [0, -ry * .5, rx * .45, ry * .5, 'highlight', .5]],
          extra:`<ellipse cx="3" cy="-1" rx="33" ry="${ry * .55}" style="fill:var(--bot-shadow)" opacity=".6" filter="url(#${p}-mblur2)"/><ellipse cx="2" cy="1" rx="36" ry="${ry * .6}" fill="#FFD75A" opacity=".1" filter="url(#${p}-mblur2)"/>` }) +
        `<path d="M${-rx + 3} 2.2 A${rx - 3} ${ry - 2.2} 0 0 0 ${rx * .1} ${ry - .4}" style="stroke:var(--bot-edge)" stroke-width="2" opacity=".75" fill="none" stroke-linecap="round"/>` +
        // copa: material del bot (lavanda dominante, rosa arriba-izquierda, cian abajo-derecha y en la punta) + acentos de oro
        tipG(0, -6, HAT_MAT(p, 'mc', crown, { g:[-30, -72, 30, 0], blobs:[[-14, -40, 13, 18, 'tertiary', .6], [18, -12, 15, 13, 'secondary', .75], [17, -68, 8, 8, 'secondary', .6], [-4, -20, 16, 12, 'primary', .5]],
            hi:'M-23 -6 C-22 -26 -13 -44 -3 -56', shade:'M25 -4 C17 -22 13 -38 13 -52' }) +
          HAT_STAR(-10, -33, 4.4, 'url(#' + p + '-hgS)') + HAT_STAR(8.6, -45, 2.5, 'url(#' + p + '-hgS)') +
          `<path d="M5.6 -32 a4.6 4.6 0 1 0 2.6 7 a3.5 3.5 0 1 1 -2.6 -7 Z" fill="url(#${p}-hgS)"/>` +
          HAT_STAR(27.5, -79, 5.6, `url(#${p}-hgS)`) + `<circle cx="26" cy="-80.6" r="1.2" fill="#FFF6C8"/>` +
          // banda dorada: rodea la copa (curva, más ancha al centro, se pierde hacia los lados) con su sombrita
          `<path d="M-29.4 -7 Q0 1.6 29.6 -7" style="stroke:var(--bot-shadow)" stroke-width="2.8" opacity=".6" fill="none" filter="url(#${p}-mblur)"/>` +
          `<path d="M-29.4 -9 Q0 .6 29.6 -9 L27.2 -18.6 Q0 -11.6 -27.2 -18.6 Z" fill="url(#${p}-hgB)"/>` +
          `<path d="M-21 -16.4 Q0 -10.2 21 -16.4" stroke="#FFF6C8" stroke-width="1.6" opacity=".85" fill="none" stroke-linecap="round"/>` +
          `<path d="M-27 -10.6 Q0 -2.4 27 -10.6" stroke="#E0AE3A" stroke-width="1.4" opacity=".7" fill="none"/>`) + `</g>`; },
    shadow: (p, hd) => { const rx = hd.w * .62, ry = hd.ry * 1.6;
      return `<g transform="rotate(5)">` + HAT_CONTACT(p, ry + 2, rx, 8.4) + `<ellipse cy="${ry + 3}" rx="16" ry="3" fill="#FFD75A" opacity=".08" filter="url(#${p}-mblur)"/></g>`; } },
  party: { label:'Fiesta', layered:true, oy:10, up:44, k:.12, sway:.6, lift:.6, tip:1.6, maxTh:9, maxTip:9,
    back: () => `<g transform="translate(13 -10) rotate(15) scale(1.28)"><path d="M-23 1 A23 8.5 0 0 1 23 1 L19.5 1 A19.5 5.5 0 0 0 -19.5 1 Z" style="fill:var(--bot-shadow)"/></g>`,
    front: p => { const cone = 'M-18.5 -1 C-13 -16 -6 -34 -1.2 -46.6 Q0 -49.4 1.2 -46.6 C6 -34 13 -16 18.5 -1 Q0 5 -18.5 -1 Z';
      return `<g transform="translate(13 -10) rotate(15) scale(1.28)">` +
      `<radialGradient id="${p}-ptT" cx=".36" cy=".32" r=".7"><stop offset="0" stop-color="#FF9CCB"/><stop offset=".55" stop-color="#FF4FA1"/><stop offset="1" stop-color="#DA3587"/></radialGradient>` +
      `<linearGradient id="${p}-ptB" gradientUnits="userSpaceOnUse" x1="0" y1="-3" x2="0" y2="10"><stop offset="0" style="stop-color:var(--bot-highlight)"/><stop offset=".6" style="stop-color:var(--bot-highlight)"/><stop offset="1" style="stop-color:var(--bot-glow)"/></linearGradient>` +
      // cono: material del bot (perla/lavanda dominante, rosa arriba, cian cerca de la base)
      HAT_MAT(p, 'pc', cone, { g:[-19, -44, 19, 2], blobs:[[1, -36, 7, 11, 'tertiary', .7], [-2, -20, 12, 10, 'primary', .6], [4, -3, 17, 6, 'secondary', .7]],
        hi:'M-12 -4 C-9 -18 -5 -31 -2 -42', shade:'M14 -2 C9.4 -16 5 -30 1.8 -42' }) +
      // confeti: acentos propios, chiquitos (se comprimen cerca de las orillas)
      `<ellipse cx="-9.4" cy="-9" rx="1.7" ry="2.3" fill="#FF65AE"/><ellipse cx="5.6" cy="-15.4" rx="2.3" ry="2.4" fill="#55DDF2"/><ellipse cx="-3" cy="-25.4" rx="2" ry="2.1" fill="#9273EE"/>` +
      `<ellipse cx="11.2" cy="-5" rx="1.5" ry="2.2" fill="#FFC94D"/><ellipse cx="2" cy="-35" rx="1.5" ry="1.6" fill="#FFC94D"/><ellipse cx="-11.6" cy="-19" rx="1.1" ry="1.7" fill="#55DDF2"/><ellipse cx="8.4" cy="-27" rx="1.4" ry="1.6" fill="#FF65AE"/>` +
      // base perla, un poco más opaca que el cono; envuelve la cabeza
      `<ellipse cy="2" rx="18" ry="3.4" style="fill:var(--bot-shadow)" opacity=".4" filter="url(#${p}-mblur)"/>` +
      `<path d="M-20 -2 A20 5.5 0 0 0 20 -2 Q23.6 -1 22.6 3 A22.6 7.5 0 0 1 -22.6 3 Q-23.6 -1 -20 -2 Z" fill="url(#${p}-ptB)" style="stroke:var(--bot-stroke)" stroke-width="2.4"/>` +
      `<path d="M-18 1.2 A19 5 0 0 0 -2 4.6" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".9"/>` +
      // topper rosa (identidad de fiesta) con la misma luz: brillo arriba-izquierda y sombrita donde toca el cono
      tipG(0, -47, `<ellipse cy="-47.4" rx="3.4" ry="1.4" style="fill:var(--bot-shadow)" opacity=".6" filter="url(#${p}-mblur)"/>` +
        `<g fill="url(#${p}-ptT)"><circle cy="-50.6" r="4.2"/><circle cx="-4.4" cy="-55" r="3.1"/><circle cy="-58" r="3.4"/><circle cx="4.4" cy="-55" r="3"/></g>` +
        `<ellipse cx="-1.4" cy="-58.8" rx="1.4" ry="1" fill="#fff" opacity=".75"/>`) + `</g>`; },
    shadow: p => `<g transform="translate(13 -10) rotate(15) scale(1.28)">` + HAT_CONTACT(p, 7, 22, 6.4) + `</g>` },
  santa: { label:'Santa', layered:true, oy:10, up:16, k:.11, sway:.7, lift:.6, tip:1.8, maxTh:9, maxTip:10, sleep:8,
    back: (p, hd) => { const rx = hd.w * .51, ry = hd.ry * 1.1;
      return `<path d="M${-rx} -2 A${rx} ${ry} 0 0 1 ${rx} -2 L${rx - 4} -2 A${rx - 4} ${ry - 3} 0 0 0 ${-rx + 4} -2 Z" fill="#ECEAF8"/>`; },
    front: (p, hd) => { const rx = hd.w * .51, ry = hd.ry * 1.1;
      const body = 'M-43 -3 C-44 -28 -22 -46 6 -49 C30 -51 50 -37 58 -14 C61 -3 62 8 59 16 C55 8 50 2 42 -2 A42 6.4 0 0 1 -43 -3 Z';
      const band = `M${-rx + 1} -4 A${rx - 1} ${ry - 1} 0 0 0 ${rx - 1} -4 Q${rx + 3} -2 ${rx + 1.5} 5 A${rx + 1.5} ${ry + 1} 0 0 1 ${-rx - 1.5} 5 Q${-rx - 3} -2 ${-rx + 1} -4 Z`;
      const pom = 'M60 7 C67 7 72 12 71.5 18.5 C71 25 66 29 60 28.6 C53.6 28.2 49 23.4 49.4 17.4 C49.8 11 54 7 60 7 Z';
      return `<ellipse cy="-3.6" rx="${rx - 1}" ry="${ry - 1.4}" fill="#FBFAFF"/>` +
        // lo que antes era rojo ahora es el cuerpo del bot: azul arriba-izquierda, rosa en la caída, lavanda abajo
        HAT_MAT(p, 'sr', body, { g:[-40, -50, 55, 12], blobs:[[-20, -34, 20, 14, 'secondary', .8], [38, -18, 18, 22, 'tertiary', .85], [8, -10, 40, 12, 'primary', .85], [-8, -42, 16, 7, 'highlight', .45]],
          hi:'M-32 -10 C-30 -30 -12 -43 8 -45', shade:'M22 -38 C38 -30 48 -16 53 2' }) +
        `<ellipse cx="0" cy="1.4" rx="${rx - 8}" ry="3.4" style="fill:var(--bot-shadow)" opacity=".45" filter="url(#${p}-mblur)"/>` +
        // banda blanca perla (identidad navideña) con reflejos del bot; acolchada, envuelve la cabeza
        HAT_PEARL(p, 'sb', band, [-rx, -6, rx, ry + 8], [[-rx * .5, 4, rx * .4, 6, 'primary', .3], [rx * .5, 6, rx * .35, 6, 'secondary', .25], [0, ry + 3, rx * .8, 4, 'tertiary', .2]]) +
        `<path d="M${-rx + 5} -1.4 A${rx - 5} ${ry - 3} 0 0 0 ${-rx * .15} ${ry - 3.6}" stroke="#fff" stroke-width="2.4" opacity=".95" fill="none" stroke-linecap="round"/>` +
        // pompón perla blandito, con reflejos lavanda/cian
        tipG(57, 12, `<ellipse cx="54.6" cy="11" rx="7" ry="4.2" style="fill:var(--bot-shadow)" opacity=".6" filter="url(#${p}-mblur)"/>` +
          HAT_PEARL(p, 'sp', pom, [49, 7, 72, 29], [[56, 13, 6, 5, 'highlight', .6], [65, 22, 7, 6, 'secondary', .3], [55, 24, 7, 5, 'primary', .3]]) +
          `<ellipse cx="56" cy="12.6" rx="3.4" ry="2.2" fill="#fff" opacity=".9" filter="url(#${p}-mblur)"/>`); },
    shadow: (p, hd) => { const rx = hd.w * .49, ry = hd.ry * 1.1; return HAT_CONTACT(p, ry + 6, rx, ry * .7 + 3); } },
  // ── El resto de sombreros con el MISMO sistema: material del bot + acentos propios + capas + sombra de contacto ──
  //    Marco local: (0,0) = la coronilla (100,58). Todo lo que no es acento usa los tokens --bot-*.
  cap: { label:'Gorra', layered:true, up:16, k:.12, sway:.8, lift:.8, tip:1, maxTh:12,
    back: () => `<path d="M-40 4 Q0 -8 40 4" style="stroke:var(--bot-shadow)" stroke-width="2.4" fill="none"/>`,
    front: p => HAT_MAT(p, 'gd', 'M-40 4 C-41 -24 -22 -37 0 -37 C22 -37 41 -24 40 4 Q0 -3 -40 4 Z', { g:[-40, -37, 40, 4],
        blobs:[[-18, -24, 16, 10, 'tertiary', .55], [20, -6, 18, 10, 'secondary', .6], [0, -31, 20, 6, 'highlight', .5]], hi:'M-30 -14 Q-27 -28 -12 -32', shade:'M33 -2 Q31 -18 18 -30' }) +
      `<path d="M0 -37 V-1 M-19 -33 Q-24 -16 -22 1 M19 -33 Q24 -16 22 1" style="stroke:var(--bot-shadow)" stroke-width="1.4" fill="none" opacity=".7"/>` +
      `<circle cy="-37" r="3.6" fill="#FF65AE"/><circle cx="-1" cy="-38.2" r="1.1" fill="#fff" opacity=".8"/>`,
    deco: p => HAT_MAT(p, 'gb', 'M-43 1 Q0 -7 43 1 Q46 10 30 14 Q0 19 -30 14 Q-46 10 -43 1 Z', { g:[-43, -4, 43, 18],
        blobs:[[-20, 8, 16, 5, 'secondary', .5], [18, 10, 16, 5, 'tertiary', .45]], shade:'M-30 13.4 Q0 18.4 30 13.4' }) +
      `<path d="M-37 2.6 Q0 -3.4 37 2.6" style="stroke:var(--bot-edge)" stroke-width="2" fill="none" opacity=".8" stroke-linecap="round"/>` +
      `<path d="M-9 -9 h18 v7 h-18 Z" transform="translate(0 -8)" fill="#FFC94D" opacity="0"/>`, frontZ:34,
    shadow: p => HAT_CONTACT(p, 17.5, 34, 4.4) },
  beanie: { label:'Gorro de lana', layered:true, up:33, k:.1, sway:.9, lift:.9, tip:1.8, maxTh:12,
    back: () => `<path d="M-42 -8 Q0 -20 42 -8" style="stroke:var(--bot-shadow)" stroke-width="3" fill="none"/>`,
    front: p => {
      let ribs = ''; for (let x = -36; x <= 36; x += 6) { const t = (x + 42) / 84, t2 = (x + 43) / 86; ribs += `M${x} ${f2(-8 - 16 * t * (1 - t) + .8)} L${x} ${f2(5 - 14 * t2 * (1 - t2) - .8)} `; }
      return HAT_MAT(p, 'lb', 'M-38 -4 C-40 -32 -20 -42 0 -42 C20 -42 40 -32 38 -4 Z', { g:[-38, -42, 38, -4],
          blobs:[[-16, -28, 14, 10, 'tertiary', .55], [18, -12, 16, 10, 'secondary', .6], [0, -36, 18, 5, 'highlight', .45]], hi:'M-26 -10 Q-26 -28 -12 -36', shade:'M30 -6 Q30 -26 16 -36' }) +
        `<path d="M-12 -8 Q-12 -30 -2 -40 M2 -8 Q4 -30 14 -38 M16 -8 Q20 -26 28 -30 M-26 -8 Q-24 -24 -18 -32" style="stroke:var(--bot-shadow)" stroke-width="1.3" fill="none" opacity=".6"/>` +
        HAT_MAT(p, 'lc', 'M-42 -8 Q0 -16 42 -8 L43 5 Q0 -2 -43 5 Z', { g:[0, -16, 0, 6], blobs:[[-22, -2, 16, 5, 'tertiary', .45], [22, 0, 16, 5, 'secondary', .5]] }) +
        `<path d="${ribs}" style="stroke:var(--bot-shadow)" stroke-width="1.7" stroke-linecap="round" opacity=".85"/>` +
        tipG(0, -40, HAT_PEARL(p, 'lp', 'M-10.5 -47 A10.5 10.5 0 1 0 10.5 -47 A10.5 10.5 0 1 0 -10.5 -47 Z', [-10, -57, 10, -37], [[3, -43, 7, 6, 'secondary', .3], [-4, -45, 7, 6, 'primary', .3]]) +
          `<circle cy="-47" r="9.7" fill="none" stroke="#E3E1F4" stroke-width="2.4" stroke-dasharray="1.6 2.2"/><circle cx="-3.6" cy="-51" r="2.8" fill="#fff" opacity=".9"/>`); },
    shadow: p => HAT_CONTACT(p, 7.4, 38, 4.2) },
  topHat: { label:'Copa', layered:true, up:34, k:.14, sway:.8, lift:.9, tip:1, maxTh:10,
    back: () => `<g transform="rotate(-5)"><path d="M-41 1 A41 6 0 0 1 41 1" style="stroke:var(--bot-shadow)" stroke-width="2.4" fill="none"/></g>`,
    front: p => `<g transform="rotate(-5)">` +
      `<linearGradient id="${p}-cpE" gradientUnits="userSpaceOnUse" x1="0" y1="4" x2="0" y2="10"><stop offset="0" style="stop-color:var(--bot-shadow)"/><stop offset="1" style="stop-color:var(--bot-secondary)"/></linearGradient>` +
      `<path d="M-42 0 A42 7 0 0 0 42 0 L42 3.2 A42 7 0 0 1 -42 3.2 Z" fill="url(#${p}-cpE)"/>` +
      HAT_MAT(p, 'cb', 'M-42 0 A42 7 0 1 0 42 0 A42 7 0 1 0 -42 0 Z', { g:[-42, -7, 42, 7], blobs:[[-24, -1, 14, 4, 'tertiary', .5], [24, 2, 14, 4, 'secondary', .55]] }) +
      `<ellipse cx="1" cy="-.4" rx="29" ry="4.4" style="fill:var(--bot-shadow)" opacity=".6" filter="url(#${p}-mblur)"/>` +
      HAT_MAT(p, 'cc', 'M-27 -2 L-30 -52 Q0 -57 30 -52 L27 -2 Q0 2 -27 -2 Z', { g:[-30, -56, 30, 0],
        blobs:[[-14, -38, 12, 16, 'tertiary', .55], [16, -14, 12, 14, 'secondary', .6], [0, -50, 20, 4, 'highlight', .5]], hi:'M-19 -47 L-17.5 -25', shade:'M22 -48 L20 -8' }) +
      HAT_MAT(p, 'ct', 'M-30 -52.6 A30 5 0 1 0 30 -52.6 A30 5 0 1 0 -30 -52.6 Z', { g:[-30, -58, 30, -48], blobs:[[-4, -53.6, 18, 3, 'highlight', .6]] }) +
      // acento: el listón (rosa de glyphFlow)
      `<linearGradient id="${p}-cpR" gradientUnits="userSpaceOnUse" x1="-28" y1="0" x2="28" y2="0"><stop offset="0" stop-color="#E24C92"/><stop offset=".45" stop-color="#FF65AE"/><stop offset="1" stop-color="#D9458A"/></linearGradient>` +
      `<path d="M-27.3 -8 L-28 -19 Q0 -15 28 -19 L27.3 -8 Q0 -4 -27.3 -8 Z" fill="url(#${p}-cpR)"/><path d="M-22 -17 Q0 -13.4 22 -17" stroke="#FFC2DD" stroke-width="1.3" fill="none" opacity=".8"/></g>`,
    shadow: p => `<g transform="rotate(-5)">` + HAT_CONTACT(p, 8.6, 36, 4) + `</g>` },
  beret: { label:'Boina', layered:true, up:12, k:.11, sway:.8, lift:.8, tip:2, maxTh:12,
    back: () => `<g transform="rotate(-9)"><path d="M-45 0 C-40 10 44 6 46 -3" style="stroke:var(--bot-shadow)" stroke-width="2.4" fill="none"/></g>`,
    front: p => `<g transform="rotate(-9)">` +
      HAT_MAT(p, 'bb', 'M-45 0 C-50 -16 -28 -28 2 -28 C32 -28 50 -18 46 -3 C44 6 -40 10 -45 0 Z', { g:[-45, -28, 46, 8],
        blobs:[[-24, -16, 16, 8, 'tertiary', .55], [24, -8, 18, 8, 'secondary', .6], [0, -23, 22, 4, 'highlight', .5]], hi:'M-32 -12 Q-22 -24 -4 -25', shade:'M40 -6 Q30 4 0 6' }) +
      `<path d="M-40 3 Q0 9 42 1" style="stroke:var(--bot-shadow)" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      tipG(4, -27, HAT_MAT(p, 'bs', 'M1.6 -27 L1.6 -32.5 Q4.1 -35.5 6.6 -32.5 L6.6 -27 Z', { g:[1.6, -35, 6.6, -27], blobs:[] })) +
      // acento: un pin dorado
      `<circle cx="-27" cy="-9" r="3.2" fill="url(#${p}-hgS)"/><circle cx="-28" cy="-10" r="1" fill="#fff" opacity=".8"/>` + HAT_ACC.gold(p) + `</g>`,
    shadow: p => `<g transform="rotate(-9)">` + HAT_CONTACT(p, 7, 38, 4) + `</g>` },
  crown: { label:'Corona', layered:true, up:10, k:.2, sway:.5, lift:1, tip:1, maxTh:8,
    back: () => `<path d="M-32 -2 Q0 -10 32 -2 L32 -9 Q0 -17 -32 -9 Z" style="fill:var(--bot-shadow)"/>`,
    front: p => HAT_ACC.gold(p) +
      HAT_MAT(p, 'kb', 'M-32 3 L-35 -24 L-19 -9 L-8 -30 L0 -13 L8 -30 L19 -9 L35 -24 L32 3 Q0 8 -32 3 Z', { g:[-35, -30, 35, 6],
        blobs:[[-18, -12, 12, 10, 'tertiary', .55], [18, -10, 12, 10, 'secondary', .6], [0, -4, 24, 5, 'highlight', .4]] }) +
      // acentos: filo dorado, perlas y destello
      `<path d="M-32 3 L-35 -24 L-19 -9 L-8 -30 L0 -13 L8 -30 L19 -9 L35 -24 L32 3" fill="none" stroke="url(#${p}-hgB)" stroke-width="1.6" stroke-linejoin="round"/>` +
      `<path d="M-32 -3 Q0 2 32 -3" stroke="url(#${p}-hgB)" stroke-width="2.6" fill="none"/><path d="M-32 3 Q0 8 32 3" stroke="url(#${p}-hgB)" stroke-width="2" fill="none"/>` +
      [[-35, -25], [-8, -31], [8, -31], [35, -25]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#FFF8E6"/><circle cx="${x - .8}" cy="${y - .8}" r=".8" fill="#fff"/>`).join('') +
      `<g class="hsparkle">${HAT_STAR(24, -30, 5, '#FFFFFF')}</g>`,
    deco: () => `<circle cy="-.4" r="3.3" fill="#FF65AE"/><circle cx="-17" cy="-1.8" r="2.6" fill="#55DDF2"/><circle cx="17" cy="-1.8" r="2.6" fill="#9273EE"/><circle cx="-1" cy="-1.4" r="1" fill="#fff" opacity=".8"/>`, frontZ:30,
    shadow: p => HAT_CONTACT(p, 7.2, 30, 3.6) },
  birthday: { label:'Cumpleaños', layered:true, up:32, k:.12, sway:.8, lift:1, tip:1.6, maxTh:10,
    back: () => `<path d="M-30 1 A30 5 0 0 1 30 1" style="stroke:var(--bot-shadow)" stroke-width="2" fill="none"/>`,
    front: p => HAT_PEARL(p, 'up', 'M-30 1 A30 5 0 1 0 30 1 A30 5 0 1 0 -30 1 Z', [-30, -4, 30, 6], [[0, 3, 22, 3, 'primary', .3]]) +
      HAT_MAT(p, 'uc', 'M-18 -22 H18 Q24 -22 24 -16 V-6 Q24 0 18 0 H-18 Q-24 0 -24 -6 V-16 Q-24 -22 -18 -22 Z', { g:[-24, -22, 24, 0],
        blobs:[[-12, -10, 12, 8, 'tertiary', .5], [14, -6, 12, 8, 'secondary', .55]], hi:'M-19 -4 V-15', shade:'M20 -3 V-15' }) +
      // acentos: glaseado rosa con gotas, chispitas de colores, vela y flama
      `<path d="M-25 -16 Q-25 -26 -16 -26 H16 Q25 -26 25 -16 L25 -13 Q21 -9 18 -13 Q14 -7 10 -13 Q4 -8 0 -13 Q-5 -7 -9 -13 Q-14 -8 -18 -13 Q-22 -9 -25 -13 Z" fill="#FF7FAE"/>` +
      `<path d="M-19 -23.4 Q-8 -25.6 6 -24.6" stroke="#FFD0E4" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
      ([[-15, -22, '#FFC94D', 20], [-6, -24, '#55DDF2', -30], [8, -22, '#9273EE', 40], [16, -24, '#FFFFFF', -10], [0, -21, '#FFFFFF', 60]] as [number, number, string, number][]).map(([x, y, c, r]) => `<rect x="${x - 2}" y="${y - .8}" width="4" height="1.6" rx=".8" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('') +
      tipG(0, -26, `<rect x="-2.6" y="-42" width="5.2" height="16" rx="2" fill="#8FD8FF"/><path d="M-2.6 -37 L2.6 -40 M-2.6 -31 L2.6 -34" stroke="#fff" stroke-width="1.6"/><path d="M0 -42 V-44.5" stroke="#4A4A5A" stroke-width="1.2"/>` +
        `<circle cx="0" cy="-49" r="7" fill="#FFD27A" opacity=".35" filter="url(#${p}-mblur2)"/><g class="hflame" style="transform-origin:0px -44px"><path d="M0 -55 C4.2 -50 4.2 -46 0 -44 C-4.2 -46 -4.2 -50 0 -55 Z" fill="#FFB23F"/><path d="M0 -51 C2 -48 2 -46.5 0 -45.5 C-2 -46.5 -2 -48 0 -51 Z" fill="#FFE68A"/></g>`),
    shadow: p => HAT_CONTACT(p, 5.4, 27, 3.4) },
  chef: { label:'Chef', layered:true, up:26, k:.11, sway:.8, lift:1, tip:1.2, maxTh:10,
    back: () => `<path d="M-25 2 Q0 -8 25 2" style="stroke:var(--bot-shadow)" stroke-width="2" fill="none"/>`,
    front: p => tipG(0, -16, HAT_MAT(p, 'hp', 'M-30 -25 A13 13 0 1 0 -4 -25 A13 13 0 1 0 -30 -25 Z M4 -25 A13 13 0 1 0 30 -25 A13 13 0 1 0 4 -25 Z M-16 -33 A16 16 0 1 0 16 -33 A16 16 0 1 0 -16 -33 Z', { g:[-30, -49, 30, -12],
        blobs:[[-17, -22, 12, 9, 'tertiary', .45], [17, -22, 12, 9, 'secondary', .5], [-5, -41, 10, 6, 'highlight', .7]], hi:'M-24 -30 Q-18 -38 -9 -40' }) +
        `<path d="M-26 -18 Q-17 -12 -6 -18 Q6 -12 17 -18 Q24 -14 28 -20" style="stroke:var(--bot-shadow)" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".7"/>`) +
      // acento: la banda plisada blanca perla
      HAT_PEARL(p, 'hb', 'M-25 2 L-25 -16 Q0 -12 25 -16 L25 2 Q0 6 -25 2 Z', [-25, -16, 25, 5], [[-12, -6, 10, 6, 'primary', .3], [12, -4, 10, 6, 'secondary', .25]]) +
      `<path d="M-15 -13.6 V3.4 M-5 -12.6 V4.4 M5 -12.6 V4.4 M15 -13.6 V3.4" stroke="#D9D8EE" stroke-width="1.4"/>`,
    shadow: p => HAT_CONTACT(p, 5.4, 25, 3.4) },
  cowboy: { label:'Vaquero', layered:true, up:18, k:.12, sway:.8, lift:.9, tip:1, maxTh:10,
    back: () => `<path d="M-58 -2 Q0 -14 58 -2" style="stroke:var(--bot-shadow)" stroke-width="2.4" fill="none"/>`,
    front: p => HAT_MAT(p, 'vb', 'M-60 -4 C-62 -14 -50 -14 -40 -7 Q0 3 40 -7 C50 -14 62 -14 60 -4 C56 9 22 12 0 12 C-22 12 -56 9 -60 -4 Z', { g:[-60, -14, 60, 12],
        blobs:[[-38, -2, 16, 6, 'tertiary', .5], [36, 2, 18, 6, 'secondary', .55], [0, 4, 28, 4, 'highlight', .35]], shade:'M-54 3 C-40 10 40 10 54 3' }) +
      HAT_MAT(p, 'vc', 'M-27 -4 C-29 -28 -22 -40 -10 -38 Q0 -30 10 -38 C22 -40 29 -28 27 -4 Q0 2 -27 -4 Z', { g:[-29, -40, 29, -2],
        blobs:[[-14, -26, 10, 10, 'tertiary', .5], [14, -14, 12, 10, 'secondary', .55], [-2, -34, 12, 4, 'highlight', .45]], hi:'M-20 -30 Q-16 -36 -9 -35', shade:'M22 -30 Q24 -18 22 -6' }) +
      // acento: la banda de cuero
      `<path d="M-27 -9 Q0 -3 27 -9 L27.3 -3.5 Q0 2.5 -27.3 -3.5 Z" fill="#6E4636"/><path d="M-24 -7.4 Q0 -2 24 -7.4" stroke="#9A6A55" stroke-width="1" fill="none"/>` + HAT_ACC.gold(p),
    deco: p => `<rect x="-3.6" y="-7.4" width="7.2" height="5.6" rx="1.4" fill="url(#${p}-hgS)" stroke="#D7A233" stroke-width="1"/>` + HAT_ACC.gold(p), frontZ:30,
    shadow: p => HAT_CONTACT(p, 12.4, 40, 4.4) },
  pirate: { label:'Pirata', layered:true, up:20, k:.12, sway:.8, lift:.9, tip:1, maxTh:10,
    back: () => `<path d="M-50 -8 Q0 -30 50 -8" style="stroke:var(--bot-shadow)" stroke-width="3" fill="none"/>`,
    front: p => HAT_ACC.gold(p) + HAT_MAT(p, 'rb', 'M-50 -8 Q-32 -6 -27 -30 Q0 -44 27 -30 Q32 -6 50 -8 Q30 9 0 11 Q-30 9 -50 -8 Z', { g:[-50, -40, 50, 10],
        blobs:[[-26, -16, 14, 8, 'tertiary', .5], [24, -10, 14, 8, 'secondary', .55], [0, -34, 18, 4, 'highlight', .45]], hi:'M-22 -30 Q-8 -38 6 -37', shade:'M40 -6 Q20 8 -10 8' }) +
      // acento: el filo dorado del ala
      `<path d="M-50 -8 Q-30 9 0 11 Q30 9 50 -8" stroke="url(#${p}-hgB)" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    deco: () => `<path d="M-10 -8 L10 -24 M10 -8 L-10 -24" stroke="#F7F5FC" stroke-width="2.6" stroke-linecap="round"/><circle cy="-18" r="6.4" fill="#F7F5FC"/><rect x="-3.4" y="-14" width="6.8" height="4.2" rx="1.4" fill="#F7F5FC"/>` +
      `<circle cx="-2.4" cy="-18.6" r="1.6" fill="#2A2350"/><circle cx="2.4" cy="-18.6" r="1.6" fill="#2A2350"/>`, frontZ:32,
    shadow: p => HAT_CONTACT(p, 10.6, 40, 4.4) },
  headphones: { bodyFit:true, label:'Audífonos', layered:true, up:0, k:.25, sway:.15, lift:.35, tip:1,
    back: () => '',
    front: p => HAT_MAT(p, 'ab', 'M-69.5 36 C-71.5 -1 -42 -11.5 0 -11.5 C42 -11.5 71.5 -1 69.5 36 L62.5 36 C64.5 3 38 -4.5 0 -4.5 C-38 -4.5 -64.5 3 -62.5 36 Z', { g:[-70, -12, 70, 36],
        blobs:[[-40, -6, 18, 5, 'tertiary', .5], [40, -6, 18, 5, 'secondary', .55], [0, -9, 24, 2.4, 'highlight', .6]] }) +
      [-1, 1].map(s => HAT_MAT(p, s < 0 ? 'al' : 'ar', s < 0 ? 'M-71 24 H-69 Q-61 24 -61 32 V50 Q-61 58 -69 58 H-71 Q-79 58 -79 50 V32 Q-79 24 -71 24 Z' : 'M69 24 H71 Q79 24 79 32 V50 Q79 58 71 58 H69 Q61 58 61 50 V32 Q61 24 69 24 Z',
          { g:[s * 61, 24, s * 79, 58], blobs:[[s * 70, 32, 6, 8, 'tertiary', .45], [s * 70, 50, 6, 8, 'secondary', .5]], hi:`M${s * 74} 29 V38` }) +
        `<rect x="${s < 0 ? -63.5 : 57.5}" y="28" width="6" height="26" rx="3" fill="#F2F0FB"/><circle class="hled" cx="${s * 70}" cy="46" r="2.4" fill="#55DDF2"/>`).join(''),
    shadow: p => HAT_CONTACT(p, -1.6, 30, 2.6) + `<ellipse cx="-58" cy="42" rx="4" ry="12" fill="rgb(55,48,120)" opacity=".16" filter="url(#${p}-mblur2)"/><ellipse cx="58" cy="42" rx="4" ry="12" fill="rgb(55,48,120)" opacity=".16" filter="url(#${p}-mblur2)"/>` },
  visor: { bodyFit:true, label:'Visera gamer', layered:true, up:0, k:.25, sway:.1, lift:.3, tip:1,
    back: () => '', front: () => '',
    deco: p => `<g transform="translate(0 3)">` + HAT_MAT(p, 'vs', 'M-54 22 C-42 4 42 4 54 22 L52 33 C40 17 -40 17 -52 33 Z', { g:[-54, 6, 54, 33],
        blobs:[[-30, 18, 14, 4, 'tertiary', .5], [30, 18, 14, 4, 'secondary', .55], [0, 11, 22, 2.4, 'highlight', .5]] }) +
      `<linearGradient id="${p}-hvg" gradientUnits="userSpaceOnUse" x1="-50" y1="0" x2="50" y2="0"><stop offset="0" stop-color="#FF65AE"/><stop offset=".5" stop-color="#9273EE"/><stop offset="1" stop-color="#55DDF2"/></linearGradient>` +
      `<path class="hled2" d="M-49 26.5 C-37 11.5 37 11.5 49 26.5" stroke="url(#${p}-hvg)" stroke-width="3.2" fill="none" stroke-linecap="round"/></g>`, frontZ:40, minW:.5,
    shadow: p => `<path d="M-52 38 C-40 22 40 22 52 38" stroke="rgb(55,48,120)" stroke-width="6" opacity=".14" fill="none" filter="url(#${p}-hcs)"/><path d="M-50 37.4 C-38 22.4 38 22.4 50 37.4" stroke="rgb(55,48,120)" stroke-width="2.4" opacity=".16" fill="none" filter="url(#${p}-mblur)"/>` },
  astronaut: { bodyFit:true, label:'Astronauta', layered:true, up:10, k:.3, sway:0, lift:.2, tip:1,
    // HAT_BACK: la mitad de atrás del casco (el vidrio del fondo, teñido del color del bot)
    back: () => `<circle cy="52" r="80" style="fill:var(--bot-secondary)" opacity=".1"/><circle cy="52" r="78" fill="none" style="stroke:var(--bot-shadow)" stroke-width="2" opacity=".35"/>`,
    front: p => `<radialGradient id="${p}-hag" cx=".38" cy=".3" r=".75"><stop offset="0" style="stop-color:var(--bot-highlight)" stop-opacity=".24"/><stop offset=".7" style="stop-color:var(--bot-primary)" stop-opacity=".05"/><stop offset="1" style="stop-color:var(--bot-secondary)" stop-opacity=".22"/></radialGradient>` +
      `<circle cy="52" r="81" fill="url(#${p}-hag)"/><circle cy="52" r="82" fill="none" style="stroke:var(--bot-secondary)" stroke-opacity=".45" stroke-width="4"/><circle cy="52" r="80" fill="none" style="stroke:var(--bot-edge)" stroke-opacity=".9" stroke-width="2.4"/>` +
      `<path d="M-60 16 A72 72 0 0 1 -22 -16" stroke="#fff" stroke-width="4.6" opacity=".75" fill="none" stroke-linecap="round"/><circle cx="-10" cy="-20" r="3" fill="#fff" opacity=".8"/>` +
      `<path d="M60 84 A70 70 0 0 1 44 108" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>` +
      HAT_MAT(p, 'xc', 'M-60 102 Q0 118 60 102 L62 116 Q0 134 -62 116 Z', { g:[-62, 100, 62, 128], blobs:[[-30, 112, 18, 5, 'tertiary', .5], [30, 114, 18, 5, 'secondary', .55], [0, 108, 30, 3, 'highlight', .6]] }) +
      `<circle class="hled" cx="38" cy="113" r="3" fill="#55DDF2"/><circle class="hled" cx="-38" cy="113" r="3" fill="#FF65AE"/>`,
    shadow: p => HAT_CONTACT(p, 99, 54, 4) },
  antenna: { label:'Antena', layered:true, up:11, k:.07, sway:1, lift:1.1, tip:2.4, maxTh:14,
    back: () => '',
    front: p => `<radialGradient id="${p}-han" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#E6FDFF"/><stop offset="1" stop-color="#4FD6F2"/></radialGradient>` +
      tipG(0, 1, `<path d="M0 0 Q-1.4 -12 0 -24" style="stroke:var(--bot-shadow)" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M-.6 -2 Q-1.8 -12 -.6 -22" style="stroke:var(--bot-highlight)" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".7"/>` +
        `<circle class="hled" cy="-29" r="6.2" fill="url(#${p}-han)" style="filter:drop-shadow(0 0 3px rgba(79,214,242,.8))"/><circle cx="-2" cy="-31" r="1.6" fill="#fff" opacity=".85"/>`) +
      HAT_MAT(p, 'nb', 'M-9 1.4 A9 3.6 0 1 0 9 1.4 A9 3.6 0 1 0 -9 1.4 Z', { g:[-9, -2, 9, 5], blobs:[[-3, 0, 5, 2, 'highlight', .6]] }),
    shadow: p => HAT_CONTACT(p, 4, 10, 2.4) }

} as const satisfies Record<string, GfBotHat>;
// ---------- Caras kawaii: 30 expresiones nuevas (hoja de referencia) ----------
// Cada una = ojo izquierdo + ojo derecho + boca (+ cachetes). Se dibujan en una capa aparte sobre la cara (siguen el giro
// de la cabeza) y la cara base se esconde mientras duran. Tinta = el color de ojos de la piel actual.

export type GfBotHatId = keyof typeof HATS;
