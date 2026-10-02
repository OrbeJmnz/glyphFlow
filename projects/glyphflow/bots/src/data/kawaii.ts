import { f2 } from './color';

/**
 * Caras kawaii: 30 expresiones (hoja de referencia) + 3 para despertar. Cada una = ojo izquierdo
 * + ojo derecho + boca (+ cachetes). Se dibujan en una capa aparte sobre la cara —siguen el giro de
 * la cabeza— y la cara base se esconde mientras duran. La tinta es el color de ojos de la piel
 * actual.
 *
 * Las claves están en inglés (el prototipo las traía en español: `picaro` → `cheeky`, `mareado` →
 * `dizzy`…). Las pruebas de paridad contra el prototipo traducen con un mapa.
 */

/** Forma del ojo. */
export type GfKawaiiEyeType =
  | 'dot'
  | 'swirl'
  | 'heart'
  | 'arcUp'
  | 'arcDown'
  | 'x'
  | 'gt'
  | 'lt';

/** Un ojo y sus adornos. */
export interface GfKawaiiEye {
  t: GfKawaiiEyeType;
  brow?: 'raise' | 'in' | 'flat' | 'up' | 'bar';
  /** Pestañas, del lado de afuera. */
  lash?: 1;
  tears?: 'drops' | 'stream';
  /** Párpado: 1 = caído, 2 = pesado (medio dormido). */
  lid?: 1 | 2;
  /** Hacia dónde mira: -1 izquierda, 1 derecha. */
  look?: -1 | 1;
}

export type GfKawaiiMouth =
  | 'flat'
  | 'smile'
  | 'cup'
  | 'smirk'
  | 'wavy'
  | 'D'
  | 'Dfill'
  | 'omega'
  | 'w'
  | 'tri'
  | 'frown'
  | 'hump'
  | 'three'
  | 'awk'
  | 'teeth'
  | 'yawn'
  | 'tongue';

/** Una expresión: `R` se omite cuando el ojo derecho es espejo del izquierdo. */
export interface GfKawaiiExpression {
  L: GfKawaiiEye;
  R?: GfKawaiiEye;
  M: GfKawaiiMouth;
}

export const KAWAII = {
  cheeky:      { L:{ t:'dot', brow:'raise' }, R:{ t:'dot' }, M:'smirk' },            // 01
  naughty:     { L:{ t:'dot', brow:'in' }, M:'cup' },                                // 02
  shy:         { L:{ t:'dot', lash:1 }, M:'wavy' },                                  // 03
  satisfied:   { L:{ t:'dot', brow:'flat' }, M:'smile' },                            // 04
  hopeful:     { L:{ t:'dot', brow:'up' }, M:'D' },                                  // 05
  dizzy:       { L:{ t:'swirl' }, M:'flat' },                                        // 06
  smug:        { L:{ t:'dot', brow:'flat' }, M:'omega' },                            // 07
  inLove:      { L:{ t:'heart' }, M:'smile' },                                       // 08
  playful:     { L:{ t:'dot', brow:'in' }, M:'w' },                                  // 09
  amazed:      { L:{ t:'dot' }, M:'tri' },                                           // 10
  annoyed:     { L:{ t:'dot', brow:'bar' }, M:'frown' },                             // 11
  kiss:        { L:{ t:'dot', lash:1 }, M:'three' },                                 // 12
  touched:     { L:{ t:'dot', brow:'up', tears:'drops' }, M:'smile' },               // 13
  awkward:     { L:{ t:'dot' }, M:'awk' },                                           // 14
  uneasy:      { L:{ t:'dot', brow:'up' }, M:'flat' },                               // 15
  bothered:    { L:{ t:'dot', lid:1, look:-1 }, M:'frown' },                         // 16
  tender:      { L:{ t:'dot', lash:1 }, M:'smile' },                                 // 17
  angry:       { L:{ t:'dot', brow:'in' }, M:'hump' },                               // 18
  nervous:     { L:{ t:'dot' }, M:'teeth' },                                         // 19
  wink:        { L:{ t:'arcUp' }, R:{ t:'dot' }, M:'Dfill' },                        // 20
  resigned:    { L:{ t:'arcDown' }, M:'hump' },                                      // 21
  content:     { L:{ t:'arcUp' }, M:'omega' },                                       // 22
  tongue:      { L:{ t:'arcDown' }, M:'tongue' },                                    // 23
  tantrum:     { L:{ t:'gt' }, R:{ t:'lt' }, M:'hump' },                             // 24
  embarrassed: { L:{ t:'dot', brow:'up' }, M:'wavy' },                               // 25
  whistling:   { L:{ t:'dot' }, M:'three' },                                         // 26
  happy:       { L:{ t:'dot' }, M:'Dfill' },                                         // 27
  serious:     { L:{ t:'dot' }, M:'flat' },                                          // 28
  crying:      { L:{ t:'arcDown', tears:'stream' }, M:'hump' },                      // 29
  worried:     { L:{ t:'dot', brow:'up' }, M:'hump' },                               // 30
  // para despertar
  yawn:        { L:{ t:'arcDown', tears:'drops' }, R:{ t:'arcDown' }, M:'yawn' },
  drowsy:      { L:{ t:'dot', lid:2 }, M:'flat' },
  error:       { L:{ t:'x' }, M:'flat' }            // falló: ojos en X
} as const satisfies Record<string, GfKawaiiExpression>;

export type GfKawaiiId = keyof typeof KAWAII;
export function kEye(
  o: GfKawaiiEye,
  x: number,
  y: number,
  w: number,
  h: number,
  er: number,
  side: -1 | 1,
  ink: string,
  p: string,
  cheeks?: string | null,
): string {   // side: -1 izquierdo, 1 derecho (lo «de adentro» es hacia el centro)
  const s = h / 16, st = (d: string, sw = 2.8) => `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${f2(sw * s)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const X = (v: number) => f2(x + side * v), inX = (v: number) => f2(x - side * v);   // X: hacia afuera · inX: hacia adentro
  const cx = x + (o.look || 0) * w * .28;
  let e = '';
  // ojo del Fantasma: cápsula lisa, sin brillos
  const dot = () => `<g class="kE" style="transform-origin:${f2(cx)}px ${f2(y)}px"><rect x="${f2(cx - w / 2)}" y="${f2(y - h / 2)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(w * er)}" fill="${ink}"/></g>`;
  switch (o.t) {
    case 'dot':
      if (o.lid) { const ly = y + h * (o.lid === 2 ? .06 : -.22);   // lid 2 = párpado pesado (medio dormido)
        e += `<clipPath id="${p}-kl${side < 0 ? 'L' : 'R'}"><rect x="${f2(x - w * 2)}" y="${f2(ly)}" width="${f2(w * 4)}" height="${f2(h * 2)}"/></clipPath><g clip-path="url(#${p}-kl${side < 0 ? 'L' : 'R'})">${dot()}</g>` + st(`M${f2(x - w * .95)} ${f2(ly)} H${f2(x + w * .95)}`, 3); }
      else e += dot();
      break;
    case 'arcUp': e += st(`M${f2(x - w * .95)} ${f2(y + h * .14)} Q${f2(x)} ${f2(y - h * .55)} ${f2(x + w * .95)} ${f2(y + h * .14)}`); break;
    case 'arcDown': e += st(`M${f2(x - w * .95)} ${f2(y - h * .16)} Q${f2(x)} ${f2(y + h * .52)} ${f2(x + w * .95)} ${f2(y - h * .16)}`); break;
    case 'x': e += st(`M${f2(x - w * .7)} ${f2(y - h * .3)} L${f2(x + w * .7)} ${f2(y + h * .3)} M${f2(x + w * .7)} ${f2(y - h * .3)} L${f2(x - w * .7)} ${f2(y + h * .3)}`, 3); break;
    case 'gt': e += st(`M${f2(x - w * .8)} ${f2(y - h * .34)} L${f2(x + w * .7)} ${f2(y)} L${f2(x - w * .8)} ${f2(y + h * .34)}`, 3); break;
    case 'lt': e += st(`M${f2(x + w * .8)} ${f2(y - h * .34)} L${f2(x - w * .7)} ${f2(y)} L${f2(x + w * .8)} ${f2(y + h * .34)}`, 3); break;
    case 'swirl': { let d = ''; for (let i = 0; i <= 40; i++) { const t = i / 40 * Math.PI * 3.2, r = w * .06 + w * .62 * i / 40; d += (i ? ' L' : 'M') + f2(x + r * Math.cos(t * side)) + ' ' + f2(y + r * 1.15 * Math.sin(t * side)); }
      e += `<g class="kswirl" style="transform-origin:${f2(x)}px ${f2(y)}px">${st(d, 2.2)}</g>`; break; }
    case 'heart': e += `<g class="kheart" style="transform-origin:${f2(x)}px ${f2(y)}px"><path d="M${f2(x)} ${f2(y + h * .4)} C${f2(x - w * 1.45)} ${f2(y - h * .08)} ${f2(x - w * .62)} ${f2(y - h * .66)} ${f2(x)} ${f2(y - h * .22)} C${f2(x + w * .62)} ${f2(y - h * .66)} ${f2(x + w * 1.45)} ${f2(y - h * .08)} ${f2(x)} ${f2(y + h * .4)} Z" fill="${ink}"/></g>`; break;
  }
  // cejas
  if (o.brow === 'in') e += st(`M${X(w * .95)} ${f2(y - h * .66)} L${inX(w * .55)} ${f2(y - h * .44)}`, 2.6);
  if (o.brow === 'up') e += st(`M${X(w * .95)} ${f2(y - h * .46)} L${inX(w * .5)} ${f2(y - h * .7)}`, 2.4);
  if (o.brow === 'raise') e += st(`M${X(w * 1)} ${f2(y - h * .5)} Q${f2(x)} ${f2(y - h * 1)} ${inX(w * .85)} ${f2(y - h * .62)}`, 2.4);
  if (o.brow === 'flat') e += st(`M${f2(x - w * 1)} ${f2(y - h * .52)} H${f2(x + w * 1)}`, 3.2);
  if (o.brow === 'bar') e += st(`M${f2(x - w * 1.05)} ${f2(y - h * .78)} H${f2(x + w * 1.05)}`, 3.2);
  // pestañas (del lado de afuera)
  if (o.lash) e += st(`M${X(w * .42)} ${f2(y - h * .4)} L${X(w * 1.05)} ${f2(y - h * .62)} M${X(w * .5)} ${f2(y - h * .18)} L${X(w * 1.18)} ${f2(y - h * .22)}`, 2);
  // lágrimas
  if (o.tears === 'drops') e += [[-.45, .56, 1], [.35, .62, .8]].map(([ox, oy, k]) => `<path class="kdrop" d="M${f2(x + ox * w)} ${f2(y + oy * h - 3 * s * k)} Q${f2(x + ox * w + 2.2 * s * k)} ${f2(y + oy * h)} ${f2(x + ox * w)} ${f2(y + oy * h + 1.8 * s * k)} Q${f2(x + ox * w - 2.2 * s * k)} ${f2(y + oy * h)} ${f2(x + ox * w)} ${f2(y + oy * h - 3 * s * k)} Z" fill="#A8E4F5"/>`).join('');
  if (o.tears === 'stream') e += `<rect class="kstream" x="${f2(x - w * .26)}" y="${f2(y + h * .18)}" width="${f2(w * .52)}" height="${f2(h * 1.25)}" rx="${f2(w * .2)}" fill="#A8E4F5" opacity=".9" style="transform-origin:${f2(x)}px ${f2(y + h * .18)}px"/>`;
  // cachetes rosas (si la cara no trae los suyos)
  // mofletes del Fantasma: círculo rosa sólido afuera y abajo de cada ojo
  if (cheeks) e += `<circle class="kcheek" cx="${X(10.3 * s)}" cy="${f2(y + 11.9 * s)}" r="${f2(6.2 * s)}" fill="${cheeks}"/>`;
  return e;
}
export function kMouth(t: GfKawaiiMouth, x: number, y: number, s: number, ink: string): string {
  const m = 12 * s, st = (d: string, sw = 2.6) => `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${f2(sw * s)}" stroke-linecap="round" stroke-linejoin="round"/>`, P = (a: number, b: number) => `${f2(x + a * m)} ${f2(y + b * m)}`;
  switch (t) {
    case 'flat':  return st(`M${P(-.45, 0)} H${f2(x + .45 * m)}`, 2.8);
    case 'smile': return st(`M${P(-.5, -.12)} Q${P(0, .5)} ${P(.5, -.12)}`);
    case 'cup':   return st(`M${P(-.36, -.22)} Q${P(0, .62)} ${P(.36, -.22)}`);
    case 'smirk': return st(`M${P(-.45, .3)} Q${P(-.05, -.35)} ${P(.38, -.26)}`);
    case 'wavy':  return st(`M${P(-.6, 0)} q${f2(.15 * m)} ${f2(-.32 * m)} ${f2(.3 * m)} 0 t${f2(.3 * m)} 0 t${f2(.3 * m)} 0 t${f2(.3 * m)} 0`, 2.2);
    case 'D':     return `<path d="M${P(-.45, -.2)} H${f2(x + .45 * m)} Q${P(.45, .55)} ${P(0, .55)} Q${P(-.45, .55)} ${P(-.45, -.2)} Z" fill="#fff" stroke="${ink}" stroke-width="${f2(2.2 * s)}" stroke-linejoin="round"/>`;
    case 'Dfill': return `<path d="M${P(-.48, -.2)} H${f2(x + .48 * m)} Q${P(.48, .55)} ${P(0, .58)} Q${P(-.48, .55)} ${P(-.48, -.2)} Z" fill="${ink}" stroke="${ink}" stroke-width="${f2(1.4 * s)}" stroke-linejoin="round"/>`;
    case 'omega': return st(`M${P(-.55, -.1)} Q${P(-.28, .55)} ${P(0, .05)} Q${P(.28, .55)} ${P(.55, -.1)}`);
    case 'w':     return st(`M${P(-.5, -.15)} L${P(-.25, .25)} L${P(0, -.05)} L${P(.25, .25)} L${P(.5, -.15)}`, 2.3);
    case 'tri':   return `<path d="M${P(-.46, -.26)} Q${P(0, -.42)} ${P(.46, -.26)} Q${P(.2, .56)} ${P(0, .6)} Q${P(-.2, .56)} ${P(-.46, -.26)} Z" fill="${ink}"/>`;
    case 'frown': return st(`M${P(-.4, .26)} Q${P(0, -.36)} ${P(.4, .26)}`);
    case 'hump':  return `<path d="M${P(-.46, .26)} Q${P(0, -.56)} ${P(.46, .26)} Q${P(0, .12)} ${P(-.46, .26)} Z" fill="${ink}" stroke="${ink}" stroke-width="${f2(1.2 * s)}" stroke-linejoin="round"/>`;
    case 'three': return st(`M${P(-.12, -.46)} Q${P(.38, -.46)} ${P(.08, -.04)} Q${P(.42, .3)} ${P(-.12, .46)}`, 2.4);
    case 'awk':   return st(`M${P(-.62, -.24)} Q${P(-.52, .12)} ${P(-.34, .12)} H${f2(x + .34 * m)} Q${P(.52, .12)} ${P(.62, -.24)}`, 2.4);
    case 'teeth': return `<rect x="${f2(x - .6 * m)}" y="${f2(y - .34 * m)}" width="${f2(1.2 * m)}" height="${f2(.68 * m)}" rx="${f2(.3 * m)}" fill="#fff" stroke="${ink}" stroke-width="${f2(2 * s)}"/>` +
      `<path d="M${P(-.6, 0)} H${f2(x + .6 * m)} M${P(-.3, -.34)} V${f2(y + .34 * m)} M${P(0, -.34)} V${f2(y + .34 * m)} M${P(.3, -.34)} V${f2(y + .34 * m)}" stroke="${ink}" stroke-width="${f2(1.3 * s)}"/>`;
    case 'yawn':  return `<g class="kyawn" style="transform-origin:${f2(x)}px ${f2(y - .2 * m)}px"><ellipse cx="${f2(x)}" cy="${f2(y + .12 * m)}" rx="${f2(.42 * m)}" ry="${f2(.62 * m)}" fill="${ink}"/><ellipse cx="${f2(x)}" cy="${f2(y + .52 * m)}" rx="${f2(.26 * m)}" ry="${f2(.16 * m)}" fill="#FF8FB1"/></g>`;
    case 'tongue': return `<path d="M${P(-.4, .18)} Q${P(0, -.42)} ${P(.4, .18)} Q${P(0, .08)} ${P(-.4, .18)} Z" fill="${ink}" stroke="${ink}" stroke-width="${f2(1.2 * s)}" stroke-linejoin="round"/>` +
      `<path d="M${P(-.26, .16)} Q${P(-.28, .72)} ${P(0, .72)} Q${P(.28, .72)} ${P(.26, .16)} Z" fill="#FF8FB1" stroke="${ink}" stroke-width="${f2(1.3 * s)}" stroke-linejoin="round"/><path d="M${P(0, .2)} V${f2(y + .5 * m)}" stroke="#E0607F" stroke-width="${f2(1 * s)}"/>`;
  }
  return '';
}

// ---------- Nube: borde interno que simula volumen ----------
// Se dibuja con <use> de la silueta animada (#p-cs), así el borde sigue a los lóbulos cuando la nube «respira».
export const cloudIn = (p: string): string => `<g class="nvol">
    <use href="#${p}-cs" fill="none" stroke="#8F86E0" stroke-width="22" opacity=".55" transform="translate(0 -5)" filter="url(#${p}-mblur2)"/>
    <use href="#${p}-cs" fill="none" stroke="#B7AFF5" stroke-width="8" opacity=".7" transform="translate(0 -1.5)" filter="url(#${p}-mblur1)"/>
    <use href="#${p}-cs" fill="none" stroke="#FFFFFF" stroke-width="9" opacity=".85" transform="translate(0 4)" filter="url(#${p}-mblur2)"/>
  </g>`;
