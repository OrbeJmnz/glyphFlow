import { FACES, type GfBotFaceId, type GfBotFaceStyle } from '../data/faces';
import { f2 } from '../data/color';
import type { GfBotShape } from '../data/shape';
import type { BotContext } from './context';

/**
 * Marcado de la cara y de los accesorios fijos de una forma. Texto puro: `buildShape` lo asigna con
 * `innerHTML` y después busca los rasgos por clase (`.eye`, `.closed`, `.mouths [data-m]`…), así que
 * esas clases son el contrato con los gestos — renombrar una rompe en silencio.
 *
 * Divergencia deliberada: el prototipo traía cuatro estilos de ojo más (`anime`, `monopill`, `drop`,
 * `capsule`) que ninguna cara de `FACES` usa. Son código muerto y no se portan, igual que `tuftPath`.
 */

/** La cara propia de una forma: la neumórfica de ojos rectos, o la `neu` por defecto. */
export const ownFace = (sh: GfBotShape): GfBotFaceId =>
  sh.faceStyle && FACES[sh.faceStyle].eye === 'nrect' ? sh.faceStyle : 'neu';

/** La cara que dibuja una forma: la elegida a mano manda; si no, la propia de la forma. */
export const faceOf = (ctx: BotContext, sh: GfBotShape): GfBotFaceId =>
  !ctx.faceStyle || ctx.faceStyle === 'neu' ? ownFace(sh) : ctx.faceStyle;

/** Un rasgo que sigue el giro de la cabeza: va en su propio `.yaw` con su punto de anclaje. */
const yaw = (x: number, y: number, inner: string): string =>
  `<g class="yaw" data-x="${x}" data-y="${y}" style="transform-origin:${x}px ${y}px">${inner}</g>`;

export function faceMarkup(ctx: BotContext, sh: GfBotShape): string {
  const p = ctx.id;
  const fy = sh.faceY;
  const robot = sh.skin === 'robot';
  const dx = sh.eyeDx ?? 20;
  const cs = sh.cheek ?? 1;
  const F: GfBotFaceStyle = FACES[faceOf(ctx, sh)];
  const screen = F.screen && !robot;
  const xl = 100 - dx;
  const xr = 100 + dx;
  const ch = fy + 14;
  const my = fy + (sh.mouthDy ?? (robot ? 13 : 15));

  // cada estilo dibuja el ojo abierto a su manera; párpados, cejas y lágrimas se comparten
  const EYE: Record<GfBotFaceStyle['eye'], (x: number) => string> = {
    oval: (x) => `<ellipse class="eyeball" cx="${x}" cy="${fy}" rx="9" ry="11.5" fill="url(#${p}-eyeG)"/><ellipse class="eye-amb" cx="${x - .5}" cy="${fy + 7.6}" rx="4.2" ry="1.5"/>
                      <ellipse cx="${x + 3}" cy="${fy - 4.6}" rx="3.2" ry="3.7" fill="#fff"/><circle cx="${x - 3.2}" cy="${fy + 3.8}" r="1.4" fill="#fff" opacity=".75"/>`,
    pill: (x) => `<rect class="eyeball tint" x="${x - 3.8}" y="${fy - 7.5}" width="7.6" height="15" rx="3.8"/>`,
    line: (x) => `<path class="eyeball stk" d="M${x} ${fy - 6.5} V${fy + 6.5}"/>`,
    pixel: (x) => `<rect class="eyeball tint" x="${x - 3.6}" y="${fy - 5.5}" width="7.2" height="11" rx="1.2"/>`,
    nrect: (x) => {
      const w = sh.eyeW ?? 9.6;
      const e = sh.eyeH ?? 16;
      return `<rect class="eyeball nrect" x="${x - w / 2}" y="${fy - e / 2}" width="${w}" height="${e}" rx="${f2(w * (sh.eyeR ?? .42))}"/><circle class="mspec" cx="${f2(x + w * .12)}" cy="${f2(fy - e * .22)}" r="${f2(w * .2)}"/>`;
    },
  };

  const eye = (x: number, tilt: number, dy: number): string => {
    const ball = robot
      ? `<ellipse class="eyeball" cx="${x}" cy="${fy}" rx="6.4" ry="7.2"/><circle cx="${x + 2}" cy="${fy - 3}" r="1.6" fill="#fff" opacity=".8"/>`
      : EYE[F.eye](x);
    const w = robot ? 7 : F.eye === 'oval' ? 9.5 : 7.5;
    return yaw(x, fy, `<g transform="rotate(${tilt} ${x} ${fy}) translate(0 ${dy})">
        <g class="eye" style="transform-origin:${x}px ${fy}px">${ball}</g>
        <path class="lid closed" opacity="0" d="M${x - w} ${fy + 1} Q${x} ${fy + 8} ${x + w} ${fy + 1}"/>
        <path class="lid happy" opacity="0" stroke-width="3.4" d="M${x - w} ${fy + 3} Q${x} ${fy - 8} ${x + w} ${fy + 3}"/>
        <path class="lid squeeze" opacity="0" d="${x < 100 ? `M${x - 8} ${fy - 6} L${x + 7} ${fy} L${x - 8} ${fy + 6}` : `M${x + 8} ${fy - 6} L${x - 7} ${fy} L${x + 8} ${fy + 6}`}"/>
        <path class="lid line" opacity="0" d="M${x - w + 1} ${fy + 1} H${x + w - 1}"/>
        <path class="lid cross" opacity="0" d="M${x - 5} ${fy - 5} L${x + 5} ${fy + 5} M${x + 5} ${fy - 5} L${x - 5} ${fy + 5}"/>
        <path class="altfill half" opacity="0" d="${robot ? `M${x - 6.4} ${fy - .5} A6.4 7.2 0 0 0 ${x + 6.4} ${fy - .5} Z` : `M${x - 9} ${fy - 1} A9 11.5 0 0 0 ${x + 9} ${fy - 1} Z`}"/>
        <g class="ring" opacity="0">${robot ? `<circle cx="${x}" cy="${fy}" r="6.8" class="ring-o"/>` : `<ellipse cx="${x}" cy="${fy}" rx="9.5" ry="12" class="ring-o"/><circle cx="${x}" cy="${fy + 1}" r="2.6" class="altfill-in"/>`}</g>
        <path class="lid brow browA" opacity="0" d="${x < 100 ? `M${x - 11} ${fy - 21} L${x + 8} ${fy - 14}` : `M${x + 11} ${fy - 21} L${x - 8} ${fy - 14}`}"/>
        <path class="lid brow browS" opacity="0" d="${x < 100 ? `M${x - 11} ${fy - 15} L${x + 8} ${fy - 21}` : `M${x + 11} ${fy - 15} L${x - 8} ${fy - 21}`}"/>
        <path class="tear" opacity="0" fill="#8FD8FF" d="M${x - 3.2} ${fy + 16} Q${x - 3.2} ${fy + 20.5} ${x} ${fy + 21} Q${x + 3.2} ${fy + 20.5} ${x + 3.2} ${fy + 16} L${x} ${fy + 10} Z"/>
      </g>`);
  };

  let s = '';
  if (robot)
    s += yaw(100, fy, `<rect x="50.5" y="${fy - 27.5}" width="99" height="55" rx="27" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/>
      <rect x="52" y="${fy - 26}" width="96" height="52" rx="25" fill="url(#${p}-visorBase)"/><rect x="52" y="${fy - 26}" width="96" height="52" rx="25" fill="url(#${p}-visorShade)"/>
      <ellipse cx="76" cy="${fy - 16}" rx="20" ry="4.5" transform="rotate(-9 76 ${fy - 16})" fill="#fff" opacity=".1"/>`);
  // pantalla digital en cualquier forma: un panel oscuro donde viven los ojos
  if (screen)
    s += yaw(100, fy, `<rect x="56" y="${fy - 22}" width="88" height="46" rx="20" fill="url(#${p}-visorBase)"/><rect x="56" y="${fy - 22}" width="88" height="46" rx="20" fill="url(#${p}-visorShade)"/>
      <ellipse cx="78" cy="${fy - 13}" rx="17" ry="3.6" transform="rotate(-8 78 ${fy - 13})" fill="#fff" opacity=".1"/>`);
  // ojos: un poco asimétricos a propósito (el izquierdo más alto e inclinado): da personalidad
  const asym = !robot && F.eye === 'oval'; // la asimetría sutil solo en los estilos orgánicos
  s += `<g class="eyes">${eye(xl, asym ? -4 : 0, asym ? -.8 : 0)}${eye(xr, asym ? 3 : 0, 0)}</g>`;
  if (!robot && F.cheeks) {
    const wh = (side: number): string =>
      sh.skin !== 'cat'
        ? ''
        : side < 0
          ? `<path class="whisk" d="M${xl - 16} ${ch - 4} L${xl - 32} ${ch - 7} M${xl - 16} ${ch + 1} L${xl - 33} ${ch + 2}"/>`
          : `<path class="whisk" d="M${xr + 16} ${ch - 4} L${xr + 32} ${ch - 7} M${xr + 16} ${ch + 1} L${xr + 33} ${ch + 2}"/>`;
    // mejillas: un degradado suave (no un círculo pegado) que se funde con el material
    s += yaw(xl - 13, ch, `<ellipse class="cheek" cx="${xl - 13}" cy="${ch}" rx="${11 * cs}" ry="${7 * cs}" fill="url(#${p}-cheekG)"/>${wh(-1)}`);
    s += yaw(xr + 13, ch, `<ellipse class="cheek" cx="${xr + 13}" cy="${ch}" rx="${11 * cs}" ry="${7 * cs}" fill="url(#${p}-cheekG)"/>${wh(1)}`);
  }
  if (sh.family === 'ghost') {
    // mejillas redondas afuera y abajo de cada ojo (medidas de la hoja)
    const cyk = fy + 11.9;
    s += yaw(xl - 10.3, cyk, `<circle class="fcheek" cx="${xl - 10.3}" cy="${cyk}" r="6.2"/>`);
    s += yaw(xr + 10.3, cyk, `<circle class="fcheek" cx="${xr + 10.3}" cy="${cyk}" r="6.2"/>`);
  }
  if (sh.family === 'cat') {
    const cyk = fy + 13.5;
    const wy = fy + 12;
    s += yaw(xl - 9, cyk, `<ellipse class="gcheek" cx="${xl - 9}" cy="${cyk}" rx="5.8" ry="4.6"/><path class="gwhisk" d="M${xl - 17} ${wy - 1.5} L${xl - 30} ${wy - 4.5} M${xl - 17} ${wy + 3} L${xl - 30} ${wy + 4}"/>`);
    s += yaw(xr + 9, cyk, `<ellipse class="gcheek" cx="${xr + 9}" cy="${cyk}" rx="5.8" ry="4.6"/><path class="gwhisk" d="M${xr + 17} ${wy - 1.5} L${xr + 30} ${wy - 4.5} M${xr + 17} ${wy + 3} L${xr + 30} ${wy + 4}"/>`);
  }
  if (sh.skin === 'mochi') s = yaw(100, fy + 3, `<rect class="mvisor" x="${100 - dx - 16}" y="${fy - 15}" width="${(dx + 16) * 2}" height="36" rx="16"/>`) + s;
  if (sh.skin === 'mochi') s += yaw(xr + 7, fy + 11, `<ellipse class="mcheek2" cx="${xr + 7}" cy="${fy + 11}" rx="5.5" ry="3.6"/>`);
  if (sh.skin === 'mochi') s += yaw(xl - 7, fy + 11, `<ellipse class="mcheek" cx="${xl - 7}" cy="${fy + 11}" rx="8.5" ry="6.8"/>`);
  if (!robot) {
    // gafas redondas (accesorio «Gafas»; se muestran con data-hat="glasses" y siguen el giro de la cabeza)
    const r = (sh.eyeH ?? 16) * .78;
    s += yaw(100, fy, `<g class="ngafas"><circle cx="${xl}" cy="${fy}" r="${f2(r)}" fill="#fff" fill-opacity=".22" stroke="#2A2690" stroke-width="2.8"/><circle cx="${xr}" cy="${fy}" r="${f2(r)}" fill="#fff" fill-opacity=".22" stroke="#2A2690" stroke-width="2.8"/>
        <path d="M${f2(xl + r)} ${fy - 1} Q100 ${fy - 4.5} ${f2(xr - r)} ${fy - 1}" fill="none" stroke="#2A2690" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M${f2(xl - r * .55)} ${f2(fy - r * .45)} Q${f2(xl - r * .2)} ${f2(fy - r * .8)} ${f2(xl + r * .2)} ${f2(fy - r * .75)} M${f2(xr - r * .55)} ${f2(fy - r * .45)} Q${f2(xr - r * .2)} ${f2(fy - r * .8)} ${f2(xr + r * .2)} ${f2(fy - r * .75)}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/></g>`);
  }
  if (sh.skin === 'cat') s += yaw(100, fy + 9, `<path class="nose" d="M96 ${fy + 7.5} Q100 ${fy + 5.5} 104 ${fy + 7.5} L100 ${fy + 11} Z" fill="#FF7FA0"/>`);
  // bocas: mucho más chicas que los ojos; se muestra una a la vez
  const mY = sh.skin === 'cat' ? my + 1 : my;
  // la boca neumórfica (pastilla) es la de todas las formas; cada forma puede ajustar su tamaño con pillW/pillH
  const pw = sh.pillW ?? (sh.mouth === 'pill' ? sh.mouthW : null) ?? 12.2;
  const ph = sh.pillH ?? (sh.mouth === 'pill' ? sh.mouthH : null) ?? 6.2;
  s += yaw(100, mY, `<g class="mouths"${F.mouth ? '' : ' style="display:none"'}>
      <path class="mouth" data-m="smile" d="M95 ${mY} Q100 ${mY + 4.6} 105 ${mY}"/>
      <ellipse class="mouth mfill" data-m="oval" cx="100" cy="${mY + 1.5}" rx="7" ry="4.2"/>
      <g class="mouth-g" data-m="cat"><path class="mfill" d="M${100 - 5.2} ${mY - .6} Q${100 - 2.6} ${mY - 2.4} ${100} ${mY - .4} Q${100 + 2.6} ${mY - 2.4} ${100 + 5.2} ${mY - .6} Q${100 + 4.4} ${mY + 4.6} ${100} ${mY + 4.8} Q${100 - 4.4} ${mY + 4.6} ${100 - 5.2} ${mY - .6} Z"/><ellipse class="gtongue" cx="100" cy="${mY + 3.2}" rx="2.6" ry="1.5"/></g>
      <path class="mouth mfill" data-m="half" d="M${f2(100 - (sh.halfW ?? 13) / 2)} ${f2(mY - (sh.halfH ?? 5.7) / 2)} H${f2(100 + (sh.halfW ?? 13) / 2)} Q${f2(100 + (sh.halfW ?? 13) / 2)} ${f2(mY + (sh.halfH ?? 5.7) / 2)} 100 ${f2(mY + (sh.halfH ?? 5.7) / 2)} Q${f2(100 - (sh.halfW ?? 13) / 2)} ${f2(mY + (sh.halfH ?? 5.7) / 2)} ${f2(100 - (sh.halfW ?? 13) / 2)} ${f2(mY - (sh.halfH ?? 5.7) / 2)} Z"/>
      <rect class="mouth mfill" data-m="pill" x="${f2(100 - pw / 2)}" y="${f2(mY + 1.9 - ph / 2)}" width="${pw}" height="${ph}" rx="${f2(ph / 2)}"/>
      <path class="mouth" data-m="wide" d="M92.5 ${mY - .6} Q100 ${mY + 5.4} 107.5 ${mY - .6}"/>
      <g class="mouth-g" data-m="open"><path class="mfill" d="M94.5 ${mY - 1} Q100 ${mY - 1.6} 105.5 ${mY - 1} Q105 ${mY + 7} 100 ${mY + 7} Q95 ${mY + 7} 94.5 ${mY - 1} Z"/><ellipse class="tongue" cx="100" cy="${mY + 4.6}" rx="3" ry="1.6"/></g>
      <path class="mouth" data-m="w" d="M93.5 ${mY} Q96.5 ${mY + 3.8} 100 ${mY + .4} Q103.5 ${mY + 3.8} 106.5 ${mY}"/>
      <ellipse class="mouth mfill" data-m="o" cx="100" cy="${mY + 1.5}" rx="${f2((sh.mouthW ?? 5.2) / 2)}" ry="${f2((sh.mouthH ?? 6.4) / 2)}"/>
      <ellipse class="mouth mfill" data-m="sleep" cx="100" cy="${mY + 1.5}" rx="1.8" ry="1.4"/>
      <path class="mouth" data-m="flat" d="M96.5 ${mY + 1.2} Q100 ${mY + .6} 103.5 ${mY + 1.4}"/>
      <path class="mouth" data-m="frown" d="M95 ${mY + 3.2} Q100 ${mY - 1.4} 105 ${mY + 3.2}"/>
      <path class="mouth" data-m="wavy" d="M93.5 ${mY + 1.4} q1.6 -2 3.2 0 t3.2 0 t3.2 0 t3.2 0"/>
    </g>`);
  // capa de caras kawaii (vacía hasta que se usa; cada pieza sigue el giro de la cabeza)
  if (!robot) s += yaw(xl, fy, '<g class="xk xkL"></g>') + yaw(xr, fy, '<g class="xk xkR"></g>') + yaw(100, mY + 1.9, '<g class="xk xkM"></g>');
  s += `<circle class="bubble" cx="132" cy="${ch + 2}" r="8" opacity="0" style="transform-origin:124px ${ch + 2}px"/>`;
  s += `<g class="faceFx"></g>`;
  s += `<path class="sweat" opacity="0" fill="#9BE3FF" d="M138 ${fy - 32} Q133 ${fy - 23} 138 ${fy - 20} Q143 ${fy - 23} 138 ${fy - 32} Z"/>`;
  return s;
}

/** Los accesorios fijos de la forma, una copia por capa: el motor las pinta detrás y delante del cuerpo. */
export function accMarkup(ctx: BotContext, sh: GfBotShape): string {
  return (sh.acc ?? [])
    .map((a) => {
      const x = 100 + a.p[0];
      const y = sh.cy + a.p[1];
      return `<g class="acc${a.hat ? ' hatAcc' : ''}" style="transform-origin:${x}px ${y}px">${a.draw(x, y, ctx.id, ctx.mochiVar)}</g>`;
    })
    .join('');
}
