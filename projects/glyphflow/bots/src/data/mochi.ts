import { fantSkin, isFant } from './fantasma';
import { gatoSkin, isGato } from './gato';
import { isPulpo, pulpoSkin } from './pulpo';
import type { GfBotSkinLayers } from './skin';

/**
 * Pieles del Mochi: la MISMA forma y la misma cara, varios tratamientos de color y luz. Cada una
 * se arma con capas: detrás (sombra/halo), dentro de la silueta (color fijo) y encima
 * (trazo/brillo). Las del gato, el fantasma y el pulpo se delegan a su familia.
 *
 * Cada mancha de color es un grupo `.mb` que fluye por su cuenta (ver el CSS de las pieles).
 */

/** Pinta la piel `v` de cualquier familia sobre el bot de prefijo `p`. */
export function mochiSkin(v: string, p: string): GfBotSkinLayers {
  if (isGato(v)) return gatoSkin(v, p);
  if (isFant(v)) return fantSkin(v, p);
  if (isPulpo(v)) return pulpoSkin(v, p);
  const cs = `#${p}-cs`, U = (attrs: string) => `<use href="${cs}" ${attrs}/>`;
  let nb = 0;   // cada mancha de color es un grupo que fluye por su cuenta (ver .mb en el CSS)
  const blob = (x: number, y: number, rx: number, ry: number, c: string, o: number, f = 'mblob') => `<g class="mb mb${++nb}"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" opacity="${o}" filter="url(#${p}-${f})"/></g>`;
  const flow = (inner: string) => `<g class="mflow">${inner}</g>`;
  if (v === 'line') return {
    back: '',
    paint: `<rect x="0" y="0" width="200" height="212" fill="#F5F6FE"/>`,
    over: U('fill="none" stroke="#2E2896" stroke-width="7" stroke-linejoin="round"') };
  if (v === 'gel') return {
    back: `<g class="mhalo">` + U(`fill="#5A6BFF" opacity=".55" filter="url(#${p}-mblob)"`) + `</g>` + U(`fill="none" stroke="#7AA2FF" stroke-width="4" opacity=".75" filter="url(#${p}-mblur2)"`),
    paint: `<rect x="0" y="0" width="200" height="212" fill="#272D70"/>` +
      flow(blob(100, 72, 52, 22, '#3D5BD6', .75) + blob(58, 128, 34, 30, '#9B5CF0', .9) + blob(38, 160, 20, 20, '#7C4DE0', .7) +
      blob(142, 150, 34, 22, '#45D6D0', .85) + blob(100, 168, 52, 14, '#4FA1FB', .9) + blob(106, 110, 38, 26, '#2A2E78', .55)) +
      U(`fill="none" stroke="#DDE3FF" stroke-width="4.4" opacity=".85" filter="url(#${p}-mblur)"`) +
      `<path d="M47 94 Q58 72 84 65" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3.6" stroke-linecap="round" filter="url(#${p}-mblur)"/>`,
    over: '' };
  if (v === 'app') return {
    back: `<g class="mhalo">` + U(`fill="#D4D3FB" opacity=".75" filter="url(#${p}-mblob)"`) + `</g>` + U(`fill="#C3C6F6" opacity=".6" filter="url(#${p}-mblur2)" transform="translate(2 4)"`),
    paint: `<rect x="0" y="0" width="200" height="212" fill="url(#${p}-mapp)"/>` +
      flow(blob(90, 76, 52, 20, '#FFFFFF', .8) + blob(100, 120, 50, 16, '#D6D0FD', .6) + blob(155, 118, 14, 24, '#B8E4FD', .6) +
      blob(118, 150, 44, 22, '#F77EFA', .85) + blob(95, 163, 40, 12, '#FF9ADF', .7) + blob(55, 158, 24, 18, '#FDB38A', .85)) +
      U(`fill="none" stroke="#FFFFFF" stroke-width="6" opacity=".7" filter="url(#${p}-mblur2)"`),
    over: '' };
  if (v === 'ether') return {   // 01 · vidrio blanco con un iridiscente pastel que se escapa por los bordes
    back: `<g class="mhalo">` + U(`fill="#A8DDFA" opacity=".85" filter="url(#${p}-mblob)" transform="translate(-6 0)"`) + U(`fill="#F4B6EE" opacity=".7" filter="url(#${p}-mblob)" transform="translate(8 6)"`) + U(`fill="#EFE3A0" opacity=".45" filter="url(#${p}-mblob)" transform="translate(-4 -8)"`) + `</g>`,
    paint: `<rect x="0" y="0" width="200" height="212" fill="#F4F6FE"/>` +
      flow(blob(42, 122, 22, 36, '#86B6FD', 1) + blob(66, 80, 28, 14, '#F3E08E', .75) + blob(158, 112, 16, 32, '#8FD4F8', .85) +
        blob(140, 156, 36, 20, '#F6A6EE', 1) + blob(84, 164, 36, 12, '#E2B0FB', .85) + blob(128, 70, 26, 10, '#B7F0D6', .6) + blob(104, 106, 40, 30, '#FFFFFF', .9)) +
      U(`fill="none" stroke="#FFFFFF" stroke-width="7" opacity=".85" filter="url(#${p}-mblur2)"`),
    over: '' };
  if (v === 'pastel') return {   // 04 · lavanda con rosa, cian y lila suaves
    back: `<g class="mhalo">` + U(`fill="#D9CCFB" opacity=".7" filter="url(#${p}-mblob)"`) + `</g>` + U(`fill="#C3C0F4" opacity=".5" filter="url(#${p}-mblur2)" transform="translate(2 4)"`),
    paint: `<rect x="0" y="0" width="200" height="212" fill="#E9E6FC"/>` +
      flow(blob(56, 100, 30, 24, '#A5DDF8', .85) + blob(150, 116, 22, 30, '#C9B7FC', .8) + blob(104, 152, 50, 20, '#FAA8F0', .9) +
        blob(64, 158, 22, 14, '#FDB5E5', .8) + blob(150, 160, 20, 12, '#9AAFFC', .7) + blob(100, 88, 40, 18, '#FFFFFF', .7)) +
      U(`fill="none" stroke="#FFFFFF" stroke-width="6" opacity=".6" filter="url(#${p}-mblur2)"`),
    over: '' };
  if (v === 'flat') return {   // 02 · un solo color, sin luz ni sombra
    back: '', paint: `<rect x="0" y="0" width="200" height="212" fill="#5E61FC"/>`, over: '' };
  if (v === 'solid') return {   // 05 · blanco sólido, sombra mínima, y UN acento: la burbuja violeta
    back: U(`fill="#000" opacity=".35" filter="url(#${p}-mblur2)" transform="translate(0 5)"`),
    paint: `<rect x="0" y="0" width="200" height="212" fill="#F7F7FD"/><ellipse cx="100" cy="166" rx="66" ry="14" fill="#DCDDF2" opacity=".8" filter="url(#${p}-mblur2)"/>`,
    over: `<circle class="maccent" cx="152" cy="152" r="15" fill="#8C8EF8" opacity=".88"/>` };
  // ---------- Noche (n1…n10): el mismo Mochi para interfaces oscuras ----------
  const gloss = (o = .55) => `<ellipse cx="68" cy="80" rx="22" ry="10" transform="rotate(-28 68 80)" fill="#fff" opacity="${o}" filter="url(#${p}-mblur)"/><ellipse cx="62" cy="76" rx="7" ry="3.2" transform="rotate(-30 62 76)" fill="#fff" opacity="${o + .3}"/>`;
  const halo = (c: string, o = .6) => `<g class="mhalo">` + U(`fill="${c}" opacity="${o}" filter="url(#${p}-mblob)"`) + `</g>`;
  const rim = (c: string, w = 5, o = .8) => U(`fill="none" stroke="${c}" stroke-width="${w}" opacity="${o}" filter="url(#${p}-mblur)"`);
  if (v === 'n1') return {   // 01 · jalea violeta brillante
    back: halo('#8B5CF6', .6),
    paint: `<rect width="200" height="212" fill="#8E62F7"/>` + flow(blob(70, 90, 40, 26, '#C193FC', .9) + blob(120, 150, 50, 22, '#5540E6', .9) + blob(150, 110, 20, 30, '#A679FA', .8)) +
      rim('#E7DAFF', 5, .75) + gloss(.55), over: '' };
  if (v === 'n2') return {   // 02 · nube: blanco perla con lavanda/azul/rosa tenues por dentro (sobre todo abajo) y bordes de vapor
    back: halo('#DCD8FF', .45) + U(`fill="none" stroke="#EEF0FF" stroke-width="6" opacity=".35" filter="url(#${p}-mblur2)"`),
    paint: `<rect width="200" height="212" fill="#F5F4FE"/>` +
      flow(blob(62, 156, 34, 16, '#D5CCFA', .75) + blob(140, 158, 34, 14, '#C7D8FB', .75) + blob(100, 166, 40, 10, '#F0D2F3', .55) + blob(96, 90, 36, 18, '#FFFFFF', .95) + blob(48, 132, 14, 14, '#E4E0FC', .6)) +
      rim('#FFFFFF', 8, .75) + U(`fill="none" stroke="#C9CFF6" stroke-width="3" opacity=".45" filter="url(#${p}-mblur2)"`) +
      `<ellipse cx="86" cy="80" rx="22" ry="7" transform="rotate(-12 86 80)" fill="#fff" opacity=".7" filter="url(#${p}-mblur2)"/>`, over: '' };
  if (v === 'n3') return {   // 03 · neón: cuerpo noche y contorno de luz
    back: U(`fill="none" stroke="#6F9BFF" stroke-width="7" opacity=".55" filter="url(#${p}-mblur2)"`),
    paint: `<rect width="200" height="212" fill="#121634"/>` + blob(70, 80, 30, 14, '#2A3370', .8),
    over: U('fill="none" stroke="#9CC0FF" stroke-width="2.6"') };
  if (v === 'n4') return {   // 04 · aurora: rosa, lila y cian
    back: halo('#9C8CF6', .5),
    paint: `<rect width="200" height="212" fill="#C9C3FA"/>` + flow(blob(44, 128, 26, 36, '#F4A6E8', .95) + blob(156, 122, 24, 38, '#6FD6F5', .95) + blob(100, 80, 44, 20, '#E9E3FF', .85) + blob(110, 160, 40, 14, '#9C7CF5', .8)) +
      rim('#FFFFFF', 6, .6) + gloss(.35), over: '' };
  if (v === 'n5') return {   // 05 · cobalto sólido con un acento naranja
    back: halo('#4F7BF3', .45),
    paint: `<rect width="200" height="212" fill="#4F7BF3"/><ellipse cx="100" cy="160" rx="64" ry="16" fill="#2F56D6" opacity=".8" filter="url(#${p}-mblur2)"/>` +
      `<rect x="44" y="112" width="4.5" height="14" rx="2.2" fill="#fff" opacity=".85"/><rect x="152" y="110" width="4" height="12" rx="2" fill="#fff" opacity=".6"/>` + gloss(.4),
    over: `<rect class="maccent" x="136" y="52" width="16" height="9" rx="4.5" transform="rotate(20 144 56)" fill="#FF9B4A"/>` };
  if (v === 'n6') return {   // 06 · perla: el neumórfico sobre noche
    back: halo('#DCDDF8', .3),
    paint: `<rect width="200" height="212" fill="url(#${p}-mb)"/>` + U(`fill="none" stroke="#FFFFFF" stroke-width="11.5" opacity=".85" filter="url(#${p}-mblur2)" mask="url(#${p}-mrm)"`) +
      `<ellipse cx="100" cy="148" rx="62" ry="15" fill="#BFC4EF" opacity=".6" filter="url(#${p}-mblur2)"/>`, over: '' };
  if (v === 'n7') return {   // 07 · degradado vibrante
    back: halo('#8A63FA', .6),
    paint: `<rect width="200" height="212" fill="#6E65FC"/>` + flow(blob(40, 124, 28, 40, '#DB86FC', 1) + blob(160, 140, 24, 30, '#49C4FB', 1) + blob(100, 82, 46, 18, '#D4ADFB', .8) + blob(96, 160, 44, 14, '#5F62F9', .9)) +
      rim('#F3E6FF', 5, .6), over: '' };
  if (v === 'n8') return {   // 08 · máscara: cuerpo blanco y visor oscuro
    back: halo('#C8CEF8', .3),
    paint: `<rect width="200" height="212" fill="#E6E7FD"/><ellipse cx="100" cy="160" rx="64" ry="14" fill="#C9CCF1" opacity=".85" filter="url(#${p}-mblur2)"/>` + rim('#FFFFFF', 6, .7), over: '' };
  if (v === 'n9') return {   // 09 · cristal: burbuja oscura con luz adentro
    back: halo('#3F63E8', .55) + U(`fill="none" stroke="#7FB0FF" stroke-width="3.4" opacity=".7" filter="url(#${p}-mblur)"`),
    paint: `<rect width="200" height="212" fill="#132C62"/>` + flow(blob(62, 150, 30, 20, '#4943EB', .95) + blob(44, 124, 14, 12, '#B07CF5', .9) + blob(130, 160, 40, 12, '#2A8BE8', .8) + blob(150, 96, 18, 26, '#1F3788', .8)) +
      rim('#B8D8F8', 3.4, .9) + `<path d="M52 92 Q62 70 86 64" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round" filter="url(#${p}-mblur)"/>`, over: '' };
  if (v === 'n10') return {   // 10 · prisma: menta arriba, lila y rosa abajo
    back: halo('#A9B8FC', .5),
    paint: `<rect width="200" height="212" fill="#DCD6FC"/>` + flow(blob(100, 70, 44, 22, '#B7E9EC', .95) + blob(64, 110, 24, 20, '#A6F0D2', .6) + blob(140, 140, 30, 22, '#A483FC', .8) + blob(70, 156, 34, 14, '#F2B6F4', .9) + blob(120, 110, 30, 20, '#EAE6FF', .8)) +
      rim('#FFFFFF', 6, .6), over: '' };
  return {   // neu: la referencia 06
    back: U(`fill="#B6BDF2" opacity=".9" filter="url(#${p}-mblur2)" transform="translate(5.8 3.8)"`) + U(`fill="none" stroke="#CDD2F8" stroke-width="3.2" opacity=".8" filter="url(#${p}-mblur)"`),
    paint: `<rect x="0" y="0" width="200" height="212" fill="url(#${p}-mb)"/><rect x="0" y="0" width="200" height="212" fill="url(#${p}-mside)"/>` +
      U(`fill="none" stroke="#F6F7FF" stroke-width="11.5" opacity=".8" filter="url(#${p}-mblur2)" mask="url(#${p}-mrm)"`) +
      `<ellipse cx="100" cy="169" rx="59" ry="6.4" fill="#EEF0FE" opacity=".55" filter="url(#${p}-mblur2)"/><ellipse cx="100" cy="145" rx="61" ry="14" fill="#C9D0FA" opacity=".55" filter="url(#${p}-mblur2)"/>`,
    over: '' };
}
// El copete en cada piel: mismo contorno, otro relleno.

/**
 * El copete en cada piel: mismo contorno (`d`), otro relleno. \`foot\` es el pie del Mochi, que
 * comparte contorno con el copete.
 */
export function mochiTuft(v: string, p: string, d: string, foot?: boolean): string {
  if (v === 'line' && foot) return `<path d="${d}" fill="#E7E8F8"/>`;   // el pie: el trazo ya lo pone el contorno del cuerpo
  if (v === 'line') return `<path d="${d}" fill="#E7E8F8" stroke="#2E2896" stroke-width="7" stroke-linejoin="round"/>`;
  if (v === 'gel') return `<linearGradient id="${p}-mtg" gradientUnits="userSpaceOnUse" x1="0" y1="35" x2="0" y2="63"><stop offset="0" stop-color="#8ADCFF"/><stop offset="1" stop-color="#2F6FE6"/></linearGradient>` +
    `<path d="${d}" fill="#4FA1FB" opacity=".75" filter="url(#${p}-mblur2)"/><path d="${d}" fill="url(#${p}-mtg)"/>`;
  if (v === 'app') return `<linearGradient id="${p}-mta" gradientUnits="userSpaceOnUse" x1="78" y1="0" x2="124" y2="0"><stop offset="0" stop-color="#E3A6F4"/><stop offset=".55" stop-color="#8FB4F8"/><stop offset="1" stop-color="#5AAAF6"/></linearGradient>` +
    `<path d="${d}" fill="#B9C8FA" opacity=".6" filter="url(#${p}-mblur2)"/><path d="${d}" fill="url(#${p}-mta)"/>`;
  const solidT = (c: string) => `<path d="${d}" fill="${c}"/>`;
  const gradT = (a: string, b: string, glow: string | null) => `<linearGradient id="${p}-mtn${v}" gradientUnits="userSpaceOnUse" x1="0" y1="30" x2="0" y2="62"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>` + (glow ? `<path d="${d}" fill="${glow}" opacity=".6" filter="url(#${p}-mblur2)"/>` : '') + `<path d="${d}" fill="url(#${p}-mtn${v})"/>`;
  if (v === 'n1') return gradT('#C9A6FF', '#8E62F7', '#8B5CF6');
  if (v === 'n2') return solidT(foot ? '#D6D4F6' : '#8B6CF2');
  if (v === 'n3') return `<path d="${d}" fill="#121634" stroke="#9CC0FF" stroke-width="2.6" stroke-linejoin="round"/>`;
  if (v === 'n4') return gradT('#9FD2FF', '#7CA8F7', '#7CB6F7');
  if (v === 'n5') return solidT('#3E68E6');
  if (v === 'n6') return solidT('#D2D5F7');
  if (v === 'n7') return gradT('#EE8CF6', '#9B63F0', '#D46BF0');
  if (v === 'n8') return gradT('#7CC4FF', '#4F8DF0', '#5AA8F5');
  if (v === 'n9') return gradT('#9CC6FF', '#3F63E8', '#3F63E8');
  if (v === 'n10') return gradT('#C6F3E6', '#B7C2FC', null);
  if (v === 'ether') return `<linearGradient id="${p}-mte" gradientUnits="userSpaceOnUse" x1="80" y1="0" x2="122" y2="0"><stop offset="0" stop-color="#F6E07A"/><stop offset="1" stop-color="#8EDFC2"/></linearGradient><path d="${d}" fill="#DDEFB0" opacity=".6" filter="url(#${p}-mblur2)"/><path d="${d}" fill="url(#${p}-mte)" opacity=".92"/>`;
  if (v === 'pastel') return `<linearGradient id="${p}-mtp" gradientUnits="userSpaceOnUse" x1="80" y1="0" x2="122" y2="0"><stop offset="0" stop-color="#C9B2F6"/><stop offset="1" stop-color="#8EB6F8"/></linearGradient><path d="${d}" fill="url(#${p}-mtp)"/>`;
  if (v === 'flat') return `<path d="${d}" fill="#9497FA"/>`;
  if (v === 'solid') return `<path d="${d}" fill="#8C68FD"/>`;
  return `<linearGradient id="${p}-mt" gradientUnits="userSpaceOnUse" x1="0" y1="35" x2="0" y2="63"><stop offset="0" stop-color="#E6E9FD"/><stop offset=".45" stop-color="#D6DAFC"/><stop offset=".78" stop-color="#C6CBF9"/><stop offset="1" stop-color="#BCC1F7"/></linearGradient><path d="${d}" fill="none" stroke="#CDD2F8" stroke-width="2.6" opacity=".8" filter="url(#${p}-mblur)"/><path d="${d}" fill="url(#${p}-mt)"/><path d="M83.5 50 Q86 42 90.5 42.7" fill="none" stroke="#F4F5FF" stroke-opacity=".8" stroke-width="2.6" stroke-linecap="round" filter="url(#${p}-mblur)"/>`;
}
