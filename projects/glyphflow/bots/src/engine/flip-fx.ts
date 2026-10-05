import type { BotContext } from './context';
import { later } from './timing';

/**
 * Efectos de acompañamiento del front flip, los de la referencia: flechas de despegue (hacia
 * arriba) y de caída (hacia abajo), líneas de velocidad y los rayos y destellos del impacto.
 *
 *  - Las flechas y las líneas de velocidad viven en `.fx`, DENTRO de `.hop`: suben y bajan con el
 *    bot (y se aplastan con él) sin girar.
 *  - Los rayos del impacto viven en `.world`, FUERA de `.hop`: se quedan en el suelo donde cae.
 *
 * Todo son trazos y rellenos de color plano animados con `opacity` y `transform` (nada de filtros ni
 * blur): barato, y a tamaño chico el CSS oculta `.fx` y `.world` enteros (`data-lod="sm"`).
 * Cada pieza nace invisible y entra con su propio `delay` dentro de la duración del gesto, así que no
 * hacen falta temporizadores; el grupo se retira solo al terminar.
 */

const NS = 'http://www.w3.org/2000/svg';
const MARCA = 'flipfx';

const CIAN = '#47E4FF';
const ROSA = '#FF5FA8';
const LAVANDA = '#B38CFF';
const AMARILLO = '#FFD24A';

/** Quita los efectos de un flip anterior (que sigan ahí no tiene sentido si empieza otro, o se corta). */
export function clearFlipFx(ctx: BotContext): void {
  ctx.svg.querySelectorAll(`.${MARCA}`).forEach((n) => n.remove());
}

function el(tag: string, attrs: Record<string, string | number>, parent: Element): SVGElement {
  const n = parent.ownerDocument.createElementNS(NS, tag) as SVGElement;
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  parent.appendChild(n);
  return n;
}

/** Entra con un fundido, hace un recorrido y sale: dentro de [`desde`, `hasta`] de la duración `ms`. */
function pulso(
  n: SVGElement,
  ms: number,
  desde: number,
  hasta: number,
  mover: (u: number) => string,
  pico = 1,
): void {
  const dur = (hasta - desde) * ms;
  n.animate(
    [
      { opacity: 0, transform: mover(0) },
      { opacity: pico, transform: mover(0.35), offset: 0.25 },
      { opacity: pico, transform: mover(0.65), offset: 0.6 },
      { opacity: 0, transform: mover(1) },
    ],
    { duration: dur, delay: desde * ms, easing: 'ease-out', fill: 'both' },
  );
}

/** Un destello de cuatro puntas (el mismo dibujo que las chispas del motor). */
const estrella = (x: number, y: number, r: number): string =>
  `M${x} ${y - r} Q${x + r * 0.2} ${y - r * 0.2} ${x + r} ${y} Q${x + r * 0.2} ${y + r * 0.2} ${x} ${y + r} Q${x - r * 0.2} ${y + r * 0.2} ${x - r} ${y} Q${x - r * 0.2} ${y - r * 0.2} ${x} ${y - r} Z`;

export function flipEffects(ctx: BotContext, ms: number): void {
  clearFlipFx(ctx);
  const sh = ctx.shape;
  const cy = sh.cy;
  const top = sh.top ?? cy - 55;
  const ancho = (sh.R ?? sh.half ?? 56) + 8;

  // ── Dentro de `.hop`: viajan con el bot ──
  const aire = el('g', { class: MARCA, 'pointer-events': 'none' }, ctx.el.fx);

  // Flechas: tres chevrones sobre la cabeza. Hacia arriba al despegar (cian), hacia abajo al caer (rosa).
  const flechas = (cuerpo: string, color: string, desde: number, hasta: number, dir: 1 | -1) => {
    [-17, 0, 17].forEach((dx, i) => {
      const g = el('g', { opacity: 0, style: 'transform-box:fill-box' }, aire);
      el('path', {
        d: cuerpo,
        transform: `translate(${100 + dx} ${top - 14 + (i === 1 ? -4 : 3)})`,
        fill: 'none',
        stroke: color,
        'stroke-width': 3,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }, g);
      pulso(g, ms, desde + i * 0.012, hasta + i * 0.012, (u) => `translateY(${dir * (-9 + 18 * u) * -1}px)`);
    });
  };
  flechas('M-5.5 4 L0 -3 L5.5 4', CIAN, 0.15, 0.33, 1);
  flechas('M-5.5 -3 L0 4 L5.5 -3', ROSA, 0.7, 0.88, -1);

  // Líneas de velocidad: dos por lado. Al subir se estiran por debajo; al caer, por encima.
  const velocidad = (desde: number, hasta: number, alta: boolean) => {
    for (const lado of [-1, 1]) {
      [0, 1].forEach((i) => {
        const x = 100 + lado * (ancho + 4 + i * 7);
        const y0 = alta ? cy - 44 - i * 6 : cy + 8 + i * 6;
        const l = el('line', {
          x1: x, y1: y0, x2: x, y2: y0 + 30,
          stroke: i ? LAVANDA : '#FFFFFF',
          'stroke-width': 2.8,
          'stroke-linecap': 'round',
          opacity: 0,
        }, aire);
        pulso(l, ms, desde + i * 0.02, hasta + i * 0.02, (u) => `translateY(${(alta ? 1 : -1) * 8 * u}px)`, 0.85);
      });
    }
  };
  velocidad(0.2, 0.38, false);
  velocidad(0.64, 0.8, true);

  // ── Fuera de `.hop`: en el suelo, donde cae ──
  const suelo = el('g', { class: MARCA, 'pointer-events': 'none' }, ctx.el.world);
  const cx = 100;
  const cs = 174;
  // Rayos radiales sobre el semicírculo de ARRIBA, alrededor de la cabeza aplastada: nacen fuera del
  // cuerpo y salen despedidos. Centro a media altura del cuerpo, elipse un poco más alta que ancha.
  const cyR = cs - 26;
  const rx = ancho + 12;
  const ry = Math.max(70, cs - top - 8);
  for (let i = 0; i < 9; i++) {
    const ang = (-172 + i * 22) * (Math.PI / 180);
    const largo = i % 2 ? 15 : 21;
    const x1 = cx + Math.cos(ang) * rx;
    const y1 = cyR + Math.sin(ang) * ry;
    const l = el('line', {
      x1, y1, x2: x1 + Math.cos(ang) * largo, y2: y1 + Math.sin(ang) * largo,
      stroke: i % 2 ? LAVANDA : ROSA, 'stroke-width': 3.6, 'stroke-linecap': 'round', opacity: 0,
    }, suelo);
    pulso(l, ms, 0.895, 1, (u) => `translate(${(Math.cos(ang) * 16 * u).toFixed(2)}px,${(Math.sin(ang) * 16 * u).toFixed(2)}px)`);
  }
  // Destellos a los lados y arriba, que se abren y se apagan.
  [[-1, 0, 0], [1, 0.015, 0], [-1, 0.03, 1], [1, 0.045, 1], [0, 0.02, 2]].forEach(([lado, retraso, fila], i) => {
    const x = cx + lado * (rx + 8 - fila * 6);
    const y = fila === 2 ? cs - ry - 22 : cs - 30 - fila * 34;
    const s = el('path', { d: estrella(x, y, fila === 2 ? 9 : 7.5), fill: i % 2 ? AMARILLO : '#FFFFFF', stroke: i % 2 ? 'none' : LAVANDA, 'stroke-width': 1.2, opacity: 0 }, suelo);
    s.style.transformBox = 'fill-box';
    s.style.transformOrigin = 'center';
    pulso(s, ms, 0.9 + retraso, 1, (u) => `scale(${(0.3 + 1.2 * u).toFixed(2)}) rotate(${(u * 40).toFixed(0)}deg)`);
  });

  // Se retiran solos al terminar; si otro gesto o la pausa los corta, los recoge `clearFlipFx` (desde `act` y `clearRoutine`).
  later(ctx, () => clearFlipFx(ctx), ms + 250);
}
