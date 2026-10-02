import { ghostWave } from '../data/geometry';
import type { BotContext } from './context';

/**
 * Animación propia de la silueta: el fantasma ondula el borde de su sábana todo el tiempo, el pulpo
 * mueve los tentáculos. Se anima el `d` del `clipPath` (la silueta recorta el cuerpo, así que mover
 * el contorno mueve todo lo pintado dentro).
 */

const supportsAnimatedD = (): boolean =>
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('d', 'path("M0 0")');

export function startShapeFx(ctx: BotContext): void {
  ctx.shapeAnims.forEach((a) => a.cancel());
  ctx.shapeAnims = [];
  if (ctx.shapeTimer) clearInterval(ctx.shapeTimer);
  ctx.shapeTimer = null;
  const sh = ctx.shape;
  if (!(sh.d2 || sh.dKeys) || ctx.reduce) return;
  const dur = sh.dDur || 900;
  const keys = sh.dKeys ?? [sh.d ?? '', sh.d2 ?? ''];
  const { clip } = ctx.el;
  if (supportsAnimatedD()) {
    ctx.shapeAnims.push(
      clip.animate(
        keys.map((d) => ({ d: `path("${d}")` })),
        sh.dKeys
          ? { duration: dur, iterations: Infinity, easing: sh.dEase || 'ease-in-out' }
          : { duration: dur, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' },
      ),
    );
    return;
  }
  // Safari no anima "d": se recalcula la onda unas 25 veces por segundo
  const t0 = performance.now();
  ctx.shapeTimer = setInterval(() => {
    const t = performance.now() - t0;
    clip.setAttribute(
      'd',
      sh.dKeys && sh.dAt
        ? sh.dAt((t % dur) / dur)
        : sh.dAt
          ? sh.dAt((1 - Math.cos((t / 900) * Math.PI)) / 2)
          : ghostWave(9 * Math.cos((t / 900) * Math.PI)),
    );
  }, 40);
}
