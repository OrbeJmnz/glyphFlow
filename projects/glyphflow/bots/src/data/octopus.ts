import { f2 } from './color';
import type { GfBotSkinLayers } from './skin';

/**
 * El pulpo: UNA SOLA MASA (silueta de la referencia de Orbelin, oct 2026). No es «cabeza +
 * extremidades»: el círculo de la cabeza se abre abajo en 4 lóbulos con rizo (2 de flanco, 2 bajos)
 * y entre ellos no hay línea de unión. En reposo todos los lóbulos son base; en un gesto, un lóbulo
 * de flanco se dobla hacia arriba DENTRO de la misma silueta (se anima `d`): es una mano solo
 * mientras dura.
 */

type PulpoLobe = 0 | 'U' | 'B';
/**
 * Un punto de la silueta: `[x, y, lóbulo, peso]`. U = flanco (el peso crece hacia la punta, así se
 * curva en vez de girar rígido), B = lóbulo bajo (se aplasta), 0 = fijo.
 */
type PulpoPt = readonly [number, number, PulpoLobe, number];
type OctopusSeg = readonly [PulpoPt, PulpoPt, PulpoPt];

/**
 * Pose del pulpo en grados: `aL`/`aR` doblan el lóbulo de flanco (L + = arriba, R − = arriba),
 * `kL`/`kR` aplastan los lóbulos bajos y `bL`/`bR` los enroscan (+ = punta arriba).
 */
export interface GfOctopusStance {
  aL?: number;
  aR?: number;
  kL?: number;
  kR?: number;
  bL?: number;
  bR?: number;
}

/** Colores de una piel del pulpo. `dark` y `glass` activan variantes de luz. */
export interface GfOctopusPalette {
  head: readonly [string, string, string];
  armL: string; armR: string; flowL: string; flowR: string; lobeL: string; lobeR: string;
  mid: string; suckL: string; suckR: string; crease: string; hi: number; rim: string;
  halo: readonly [string, number]; shade: string; eye: string;
  dark?: boolean; glass?: boolean;
}
// y entre ellos no hay ninguna línea de unión. En reposo todos los lóbulos son base; ninguno se levanta.
// En un gesto, un lóbulo de flanco se dobla hacia arriba DENTRO de la misma silueta (se anima «d»): es una mano solo mientras dura.
export const OCTOPUS_VARS = { o1:'Classic', o2:'Pastel', o3:'Glowing', o4:'Night', o5:'Crystalline', o6:'Rainbow' } as const;
export type GfOctopusVariant = keyof typeof OCTOPUS_VARS;
export const isOctopus = (v: string): v is GfOctopusVariant => /^o\d+$/.test(v);
// mitad izquierda en las coordenadas del trazo (474×539); cada punto: [x, y, lóbulo, peso]
// U = lóbulo de flanco (se dobla: el peso crece hacia la punta, así se curva en vez de girar rígido) · B = lóbulo bajo (se aplasta) · 0 = fijo
export const OCTOPUS_HALF: readonly OctopusSeg[] = /* @__PURE__ */ (() => {
  const cx = 244, cy = 200, r = 147, a0 = -Math.PI / 2, a1 = -Math.PI - .6807, n = 2, segs: OctopusSeg[] = [];   // arco de la cabeza: de la coronilla al cusp del flanco
  for (let i = 0; i < n; i++) { const p = a0 + (a1 - a0) * i / n, q = a0 + (a1 - a0) * (i + 1) / n, k = 4 / 3 * Math.tan((q - p) / 4);
    segs.push([[cx + r * (Math.cos(p) - k * Math.sin(p)), cy + r * (Math.sin(p) + k * Math.cos(p)), 0, 0],
      [cx + r * (Math.cos(q) + k * Math.sin(q)), cy + r * (Math.sin(q) - k * Math.cos(q)), 0, 0], [cx + r * Math.cos(q), cy + r * Math.sin(q), 0, 0]]); }
  return segs.concat([
    [[122, 304, 'U', .04], [114, 312, 'U', .12], [107, 315, 'U', .22]],      // la V entre cabeza y flanco
    [[98, 312, 'U', .55], [88, 304, 'U', .8], [81, 297, 'U', 1]],           // borde de arriba → punta con rizo
    [[78, 296, 'U', 1], [78, 300, 'U', 1], [79, 306, 'U', 1]],
    [[79, 330, 'U', .85], [88, 352, 'U', .6], [112, 362, 'U', .35]],        // borde de afuera, baja hacia la muesca
    [[128, 367, 'U', .15], [145, 366, 'U', .05], [152, 362, 0, 0]],
    [[156, 360, 'B', .2], [159, 362, 'B', .3], [158, 365, 'B', .4]],         // muesca entre flanco y lóbulo bajo
    [[150, 372, 'B', .8], [132, 380, 'B', 1], [124, 385, 'B', 1]],          // lóbulo bajo: punta con rizo
    [[121, 387, 'B', 1], [123, 393, 'B', 1], [128, 396, 'B', 1]],
    [[145, 418, 'B', 1], [185, 430, 'B', 1], [210, 412, 'B', .8]],          // panza del lóbulo bajo
    [[228, 400, 'B', .5], [240, 380, 'B', .2], [244, 366, 0, 0]]]);         // cusp del centro
})();
// pivote del flanco: el cusp de arriba (así el lóbulo sube hacia afuera, no se dobla contra la cabeza)
const PULPO_PIV = { U:[130, 296], B:[184, 412], B2:[196, 366] } as const;   // B2: raíz del lóbulo bajo (de ahí se enrosca)
// st = { aL, aR: grados del lóbulo de flanco (L + = arriba, R − = arriba), kL, kR: aplaste de los lóbulos bajos, bL, bR: enrosque de los bajos (+ = punta arriba) }
export function octopusD(st: GfOctopusStance = {}): string {
  const rd = (v: number) => Math.round(v * 100) / 100, T = (x: number, y: number) => `${rd(100 + (x - 244) * .4)} ${rd(38 + (y - 53) * .4)}`;
  const P = ([x, y, t, w]: PulpoPt, side: number): string => {   // side −1 = izquierda (tal cual), +1 = derecha (espejo)
    const m = side > 0, X = m ? 488 - x : x;
    if (t === 'U' && w) { const a = (m ? st.aR || 0 : st.aL || 0) * w * Math.PI / 180, px = m ? 488 - PULPO_PIV.U[0] : PULPO_PIV.U[0], py = PULPO_PIV.U[1], dx = X - px, dy = y - py;
      return T(px + dx * Math.cos(a) - dy * Math.sin(a), py + dx * Math.sin(a) + dy * Math.cos(a)); }
    if (t === 'B' && w) {   // lóbulo bajo: se aplasta/estira (k) y su punta se enrosca (b, grados) desde la raíz
      const k = (m ? st.kR || 0 : st.kL || 0) * w, px = m ? 488 - PULPO_PIV.B[0] : PULPO_PIV.B[0], py = PULPO_PIV.B[1];
      const a = (m ? -(st.bR || 0) : st.bL || 0) * w * Math.PI / 180, rx = m ? 488 - PULPO_PIV.B2[0] : PULPO_PIV.B2[0], ry = PULPO_PIV.B2[1];
      const sx = px + (X - px) * (1 + k), sy = py + (y - py) * (1 - k), dx = sx - rx, dy = sy - ry;
      return T(rx + dx * Math.cos(a) - dy * Math.sin(a), ry + dx * Math.sin(a) + dy * Math.cos(a)); }
    return T(X, y); };
  let d = `M${T(244, 53)}`;
  const pts: PulpoPt[] = [[244, 53, 0, 0]];
  for (const sg of OCTOPUS_HALF) { d += ` C${sg.map(q => P(q, -1)).join(' ')}`; pts.push(sg[2]); }
  for (let i = OCTOPUS_HALF.length - 1; i >= 0; i--) { const sg = OCTOPUS_HALF[i]; d += ` C${[sg[1], sg[0], pts[i]].map(q => P(q, 1)).join(' ')}`; }
  return d + ' Z';
}
// reposo: la onda que recorre los tentáculos (ph = 0…2π, un ciclo de O.dDur ms). Los gestos se SUMAN encima de esto.
export const octopusIdleSt = (ph: number): GfOctopusStance => ({ aL:9 * Math.sin(ph), bL:10 * Math.sin(ph - 1.2), bR:10 * Math.sin(ph - 2.4), aR:-9 * Math.sin(ph - 3.6),
  kL:.03 * Math.sin(ph - .6), kR:.03 * Math.sin(ph - 1.8) });
export const OCTOPUS_D = /* @__PURE__ */ octopusD();
export const OCTOPUS_PAL: Readonly<Record<GfOctopusVariant, GfOctopusPalette>> = {
  o1:{ head:['#FFFFFF', '#F7F6FF', '#E8E2FF'], armL:'#F28CDA', armR:'#7CD2FF', flowL:'#FFC6EF', flowR:'#B6ECFF', lobeL:'#E7AEF1', lobeR:'#A9CCFF', mid:'#D8CCFF', suckL:'#FFE3F7', suckR:'#E3F8FF', crease:'#A99BEA', hi:.8, rim:'#FFFFFF', halo:['#C8B6FF', .3], shade:'#B5A6F0', eye:'#29266F' },
  o2:{ head:['#FFFFFF', '#FFF3FA', '#FBDDF0'], armL:'#FF8CC0', armR:'#FFA394', flowL:'#FFC8E3', flowR:'#FFD2C8', lobeL:'#F6A6DA', lobeR:'#E2AEF5', mid:'#F4CDEE', suckL:'#FFE6F2', suckR:'#FFEDE6', crease:'#E39AC9', hi:.75, rim:'#FFFFFF', halo:['#FFC6E6', .3], shade:'#E7A9D6', eye:'#3B1E5E' },
  o3:{ head:['#FFFFFF', '#F3FCFF', '#E0F3FF'], armL:'#FF9FE6', armR:'#6FE6F5', flowL:'#FFD0F4', flowR:'#A6F2FF', lobeL:'#C9D4FF', lobeR:'#84E8DC', mid:'#CDEBFF', suckL:'#FFE8FA', suckR:'#E0FFFC', crease:'#8FC9F0', hi:.9, rim:'#FFFFFF', halo:['#7FE3FF', .55], shade:'#9BCBF2', eye:'#16306E' },
  o4:{ head:['#3A2E9A', '#251C70', '#150F45'], armL:'#C04FE6', armR:'#3F8CF5', flowL:'#8E3FCF', flowR:'#2D63D8', lobeL:'#6A44D6', lobeR:'#4A55DE', mid:'#3A2C9A', suckL:'#E2A8FF', suckR:'#A8C8FF', crease:'#0C0A33', hi:.22, rim:'#8C6CFF', halo:['#6A4DFF', .45], shade:'#0B0930', eye:'#DCE6FF', dark:true },
  o5:{ head:['#FFFFFF', '#F4F7FF', '#E6ECFF'], armL:'#EDCBFF', armR:'#BFE4FF', flowL:'#F3DCFF', flowR:'#D6EEFF', lobeL:'#E0D2FF', lobeR:'#CCE0FF', mid:'#E2E6FF', suckL:'#FFFFFF', suckR:'#FFFFFF', crease:'#A9B9EE', hi:.95, rim:'#FFFFFF', halo:['#BFD6FF', .3], shade:'#B9C7F2', eye:'#1C2470', glass:true },
  o6:{ head:['#FFFFFF', '#F8F4FF', '#EAE2FF'], armL:'#FF86C6', armR:'#6FBBFF', flowL:'#FFD08A', flowR:'#8FF0C4', lobeL:'#FFC266', lobeR:'#7FE8B4', mid:'#C9A2FF', suckL:'#FFF0D6', suckR:'#E0FFF0', crease:'#A99BEA', hi:.8, rim:'#FFFFFF', halo:['#FFC8EE', .35], shade:'#B5A6F0', eye:'#241A6E' }
};
// color: rosa a la izquierda y cyan a la derecha que FLUYEN hacia el cuerpo; el centro queda perla/lavanda
export function octopusSkin(v: string, p: string): GfBotSkinLayers {
  const P = OCTOPUS_PAL[v as GfOctopusVariant] ?? OCTOPUS_PAL.o1, cs = `#${p}-cs`, U = (a: string) => `<use href="${cs}" ${a}/>`;
  const head = `<linearGradient id="${p}-pug" gradientUnits="userSpaceOnUse" x1="0" y1="38" x2="0" y2="184"><stop offset="0" stop-color="${P.head[0]}"/><stop offset=".55" stop-color="${P.head[1]}"/><stop offset="1" stop-color="${P.head[2]}"/></linearGradient>` +
    `<rect width="200" height="212" fill="url(#${p}-pug)"/>`;
  // el color sube desde los lóbulos de cada lado hacia el cuerpo (difuso, se mueve lento como el Mochi); arriba y al centro queda perla
  const flow = `<g class="mflow"><g class="mb mb1"><ellipse cx="44" cy="160" rx="30" ry="26" fill="${P.flowL}" opacity="${P.dark ? .6 : .75}" filter="url(#${p}-mblob)"/></g>` +
    `<g class="mb mb2"><ellipse cx="156" cy="160" rx="30" ry="26" fill="${P.flowR}" opacity="${P.dark ? .6 : .75}" filter="url(#${p}-mblob)"/></g>` +
    `<g class="mb mb3"><ellipse cx="100" cy="176" rx="40" ry="12" fill="${P.mid}" opacity=".55" filter="url(#${p}-mblob)"/></g></g>`;
  // volumen de cada lóbulo: sombra suave debajo de cada uno (sin contorno ni línea de corte)
  const lobes = `<g fill="${P.shade}" opacity="${P.dark ? .5 : .32}" filter="url(#${p}-mblur2)">` +
    `<ellipse cx="80" cy="181" rx="18" ry="5"/><ellipse cx="120" cy="181" rx="18" ry="5"/><ellipse cx="44" cy="158" rx="9" ry="4"/><ellipse cx="156" cy="158" rx="9" ry="4"/></g>`;
  // pliegues: cortos y suaves, solo subiendo desde las muescas entre lóbulos
  const crease = `<g fill="none" stroke="${P.crease}" stroke-width="2.4" stroke-linecap="round" opacity="${P.dark ? .8 : .4}" filter="url(#${p}-mblur1)"><path d="M100 164 Q100 159 100 154"/><path d="M66 163 Q68 159 71 155"/><path d="M134 163 Q132 159 129 155"/></g>`;
  const hi = `<ellipse cx="76" cy="62" rx="28" ry="13" transform="rotate(-24 76 62)" fill="#fff" opacity="${P.hi}" filter="url(#${p}-mblur2)"/>` +
    `<ellipse cx="68" cy="57" rx="10" ry="4.6" transform="rotate(-26 68 57)" fill="#fff" opacity="${f2(Math.min(1, P.hi * .7))}" filter="url(#${p}-mblur1)"/>`;
  const rim = U(`fill="none" stroke="${P.rim}" stroke-width="${P.glass ? 9 : 6}" opacity="${P.dark ? .45 : .75}" filter="url(#${p}-mblur2)"`);
  const halo = `<g class="mhalo">` + U(`fill="${P.halo[0]}" opacity="${P.halo[1]}" filter="url(#${p}-mblob)"`) + `</g>`;
  // lóbulos 5–10 % más translúcidos que la cabeza (máscara suave abajo; sin línea de corte)
  const mask = `<linearGradient id="${p}-pumg" gradientUnits="userSpaceOnUse" x1="0" y1="140" x2="0" y2="184"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${P.glass ? '#c4c4c4' : '#e6e6e6'}"/></linearGradient>` +
    `<mask id="${p}-pum" maskUnits="userSpaceOnUse" x="-20" y="-20" width="240" height="252"><rect x="-20" y="-20" width="240" height="252" fill="url(#${p}-pumg)"/></mask>`;
  return { back: halo + (P.dark ? U(`fill="none" stroke="#7E5CFF" stroke-width="5" opacity=".7" filter="url(#${p}-mblur2)"`) : ''),
    paint: mask + `<g mask="url(#${p}-pum)"${P.glass ? ' opacity=".88"' : ''}>` + head + flow + lobes + crease + hi + `</g>` + rim +
      U(`fill="none" stroke="${P.rim}" stroke-width="2.2" opacity="${P.dark ? .4 : .65}" filter="url(#${p}-mblur1)"`), over:'' };
}

