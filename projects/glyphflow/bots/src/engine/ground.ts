import type { BotContext } from './context';
import { later } from './timing';

/**
 * RECORTE DE SUELO — para los gestos en que el bot se esconde BAJO el suelo (asomarse, sumergirse): todo lo que quede
 * por debajo de `GROUND_Y` deja de verse, como si el suelo fuera una superficie por la que se hunde. La línea está sobre
 * la elipse de la sombra, así que el cuerpo en reposo (que termina más arriba) nunca se toca.
 *
 * `.hop` es lo que se desplaza y se deforma: recortar `.hop` mismo movería el recorte con él. Por eso se envuelve en un
 * `<g class="gf-ground">` sin transformar, que es el que lleva el `clip-path`. El recorte se quita al terminar el gesto.
 */
export const GROUND_Y = 192;

const NS = 'http://www.w3.org/2000/svg';

export function groundClip(ctx: BotContext, ms: number): void {
  const svg = ctx.svg;
  const hop = ctx.el.hop;
  let g: Element | null = hop.parentElement;
  if (!g || !g.classList.contains('gf-ground')) {
    g = svg.ownerDocument.createElementNS(NS, 'g');
    g.setAttribute('class', 'gf-ground');
    hop.parentNode?.insertBefore(g, hop);
    g.appendChild(hop);
  }
  const grupo: Element = g;
  const id = `${ctx.id}-ground`;
  if (!svg.querySelector(`[id="${id}"]`)) {
    const cp = svg.ownerDocument.createElementNS(NS, 'clipPath');
    cp.setAttribute('id', id);
    const r = svg.ownerDocument.createElementNS(NS, 'rect');
    r.setAttribute('x', '-400');
    r.setAttribute('y', '-800');
    r.setAttribute('width', '1000');
    r.setAttribute('height', String(GROUND_Y + 800));
    cp.appendChild(r);
    (svg.querySelector('defs') ?? svg).appendChild(cp);
  }
  grupo.setAttribute('clip-path', `url(#${id})`);
  later(ctx, () => grupo.removeAttribute('clip-path'), ms + 80);
}
