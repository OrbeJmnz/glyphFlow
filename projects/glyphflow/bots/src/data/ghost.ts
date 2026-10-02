import type { GfBotSkinLayers } from './skin';

/**
 * El fantasma: silueta medida de «Silueta del Fantasma» (84 puntos en coordenadas del motor,
 * ancho 123.5, base en y=174) y 12 pieles (`f1`…`f12`) con los colores muestreados de cada tarjeta.
 */
export const GHOST_PTS: readonly (readonly [number, number])[] = [[98.5,60.1],[103.1,60.2],[107.8,60.8],[112.3,61.8],[116.7,63.3],[120.9,65.4],[124.9,67.9],[128.6,70.8],[131.9,74.1],[134.8,77.8],[137.4,81.7],[139.6,85.8],[141.4,90.2],[142.9,94.6],[144.2,99.1],[145.3,103.6],[146.2,108.2],[147.0,112.8],[147.8,117.4],[148.9,121.9],[150.3,126.4],[152.0,130.8],[154.0,135.1],[156.4,139.1],[158.8,143.1],[161.0,147.2],[161.9,151.6],[161.3,155.9],[158.8,159.5],[155.1,161.8],[150.6,162.6],[146.0,162.7],[141.3,162.6],[137.1,163.6],[133.4,166.0],[130.1,169.3],[126.4,172.0],[122.2,173.7],[117.7,173.7],[113.4,172.2],[109.5,169.8],[105.6,167.3],[101.4,165.7],[97.1,166.0],[93.0,167.8],[89.2,170.5],[85.2,172.7],[80.8,173.8],[76.4,173.3],[72.3,171.2],[68.8,168.3],[65.3,165.1],[61.5,163.1],[57.1,162.5],[52.4,162.7],[47.8,162.5],[43.5,161.2],[40.2,158.3],[38.4,154.4],[38.4,150.0],[39.9,145.7],[42.1,141.6],[44.7,137.7],[47.0,133.6],[48.9,129.3],[50.4,124.9],[51.6,120.4],[52.6,115.8],[53.5,111.2],[54.4,106.6],[55.4,102.1],[56.6,97.6],[57.9,93.1],[59.5,88.7],[61.4,84.4],[63.7,80.3],[66.4,76.5],[69.4,72.9],[72.7,69.6],[76.5,66.9],[80.6,64.5],[84.9,62.8],[89.4,61.4],[93.9,60.5]];
// El borde de la sábana ondula: los puntos de abajo se mueven con una onda que viaja (u = 0…1 entre dos fases).
export function ghostSheetPath(u = 0): string {
  const y0 = 131, y1 = 173.8, ph = u * Math.PI / 2;
  const P = GHOST_PTS.map(([x, y]) => { const w = Math.pow(Math.max(0, Math.min(1, (y - y0) / (y1 - y0))), 1.5);
    return [x + 1.8 * w * (u * 2 - 1), y + 3.2 * w * Math.sin(x / 9.5 + ph)]; });
  const n = P.length, G = (k: number) => P[(k + n) % n], r = (v: number) => +v.toFixed(2);
  let d = `M${r(P[0][0])} ${r(P[0][1])}`;
  for (let i = 0; i < n; i++) { const [p0, p1, p2, p3] = [G(i - 1), G(i), G(i + 1), G(i + 2)];
    d += ` C${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)} ${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)} ${r(p2[0])} ${r(p2[1])}`; }
  return d + ' Z';
}
// Las 12 pieles del fantasma (nombres de la hoja). Colores muestreados de cada tarjeta.
export const GHOST_VARS = { f1:'Etérea', f2:'Plana', f3:'Línea', f4:'Pastel', f5:'Sólida', f6:'Neumórfica', f7:'Vibrante', f8:'Máscara', f9:'Translúcida', f10:'Adaptativa', f11:'Oscura', f12:'Sistema' } as const;
export type GfGhostVariant = keyof typeof GHOST_VARS;
export const isGhost = (v: string): v is GfGhostVariant => /^f\d+$/.test(v);
export function ghostSkin(v: string, p: string): GfBotSkinLayers {
  const cs = `#${p}-cs`, U = (a: string) => `<use href="${cs}" ${a}/>`;
  let nb = 0;
  const blob = (x: number, y: number, rx: number, ry: number, c: string, o: number, f = 'mblob') => `<g class="mb mb${++nb}"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" opacity="${o}" filter="url(#${p}-${f})"/></g>`;
  const flow = (s: string) => `<g class="mflow">${s}</g>`;
  const grad = (a: string, b: string, c: string) => `<linearGradient id="${p}-fg" gradientUnits="userSpaceOnUse" x1="0" y1="60" x2="0" y2="174"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient><rect width="200" height="212" fill="url(#${p}-fg)"/>`;
  const flat = (c: string) => `<rect width="200" height="212" fill="${c}"/>`;
  const hi = (o = .5) => `<ellipse cx="72" cy="80" rx="22" ry="11" transform="rotate(-28 72 80)" fill="#fff" opacity="${o}" filter="url(#${p}-mblur2)"/><ellipse cx="66" cy="77" rx="6.5" ry="3.2" transform="rotate(-30 66 77)" fill="#fff" opacity="${Math.min(1, o + .3)}"/>`;
  const rim = (c: string, w: number, o: number) => U(`fill="none" stroke="${c}" stroke-width="${w}" opacity="${o}" filter="url(#${p}-mblur2)"`);
  const shade = (c: string, o: number) => `<ellipse cx="100" cy="166" rx="64" ry="16" fill="${c}" opacity="${o}" filter="url(#${p}-mblur2)"/>`;
  const halo = (c: string, o: number) => `<g class="mhalo">` + U(`fill="${c}" opacity="${o}" filter="url(#${p}-mblob)"`) + `</g>`;
  switch (v) {
    case 'f1': return { back: halo('#CDBDFF', .35), paint: grad('#F6F8FF', '#ECE6FF', '#E4DAFF') + flow(blob(64, 78, 30, 20, '#CDE4FF', .95) + blob(46, 126, 22, 28, '#FBD9F2', .9) + blob(102, 132, 34, 24, '#C7B9FB', .75) + blob(150, 140, 24, 24, '#C6D8FC', .9) + blob(104, 166, 48, 10, '#F4D8FF', .85)) + rim('#FFFFFF', 7, .85) + hi(.6), over:'' };
    case 'f2': return { back:'', paint: flat('#F1EEFD'), over:'' };
    case 'f3': return { back:'', paint: flat('#FFFFFF'), over: U('fill="none" stroke="#2A22A6" stroke-width="4.4" stroke-linejoin="round"') };
    case 'f4': return { back:'', paint: flat('#D9C8FC') + flow(blob(70, 76, 40, 24, '#FDD6F2', 1) + blob(48, 118, 26, 30, '#FDC8DA', 1) + blob(152, 112, 28, 34, '#9EE4FD', 1) + blob(104, 138, 34, 26, '#A8ADFC', .9) + blob(56, 160, 26, 14, '#FABCFC', 1) + blob(148, 160, 26, 14, '#ACE2FD', 1)) + rim('#FFFFFF', 5, .5) + hi(.35), over:'' };
    case 'f5': return { back:'', paint: grad('#EEEBFD', '#DCD7FC', '#C8C3FB') + shade('#B4AEF3', .4) + hi(.6), over:'' };
    case 'f6': return { back: U(`fill="#D3CEEC" opacity=".6" filter="url(#${p}-mblur2)" transform="translate(2 4)"`), paint: grad('#FCFAFE', '#F3F0FA', '#E6E2F5') + U(`fill="none" stroke="#FFFFFF" stroke-width="11" opacity=".9" filter="url(#${p}-mblur2)" mask="url(#${p}-mrm)"`) + shade('#D6D1EE', .6), over:'' };
    case 'f7': return { back:'', paint: flat('#9A8CFD') + flow(blob(56, 110, 34, 46, '#FD7FE0', 1) + blob(152, 110, 32, 46, '#6FEAFC', 1) + blob(102, 84, 30, 22, '#B8B3FD', .9) + blob(104, 140, 30, 28, '#5BA2FD', .9) + blob(52, 162, 26, 14, '#FC87F9', 1) + blob(150, 160, 26, 14, '#7ED6FC', 1)) + hi(.3), over:'' };
    case 'f8': return { back:'', paint: grad('#F4F2FD', '#E9E6FC', '#D9D5F7') + shade('#C9C5F0', .5) + hi(.45), over:'' };
    case 'f9': return { back: halo('#BCD6FF', .4), paint: flat('#E9E6FD') + flow(blob(62, 74, 26, 18, '#B7DEFB', .9) + blob(44, 122, 20, 30, '#FBE0F6', .9) + blob(156, 122, 20, 30, '#FDE0FA', .9) + blob(100, 130, 30, 26, '#9FBAFC', .85) + blob(58, 160, 24, 14, '#A4E5FD', .95) + blob(146, 160, 24, 14, '#D9C4FF', .9)) + rim('#9FE3FF', 5, .55) + rim('#FFFFFF', 7, .9) + hi(.75), over:'' };
    case 'f10': return { back:'', paint: flat('#F7F1FB') + flow(blob(62, 90, 32, 30, '#FDE4D6', 1) + blob(50, 158, 30, 22, '#D2F3F4', 1) + blob(150, 156, 32, 24, '#D4C4FC', 1) + blob(140, 86, 26, 20, '#EEF0FF', .8)) + hi(.4), over:'' };
    case 'f11': return { back: halo('#5B3FD0', .35), paint: grad('#3B3084', '#161B52', '#0D1345') + shade('#2F48BA', .75) + rim('#7B5CFF', 4, .7) + hi(.16), over:'' };
    default: return { back:'', paint: grad('#FAF8FF', '#EBE2FF', '#D7D1FF') + shade('#C4C0FB', .5) + hi(.5), over:'' };
  }
}


