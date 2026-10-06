import type { BotContext } from './context';
import { gazeAt } from './eyes';

/**
 * Seguir el puntero: la cabeza del bot mira hacia donde está el cursor (`gazeAt`).
 *
 * UN solo listener para todos los bots (no uno por bot): con cien bots en una galería sigue habiendo un único
 * `pointermove` en la ventana, y se trabaja una vez por cuadro (`requestAnimationFrame`), no una por evento. Solo
 * existe mientras haya algún bot siguiendo: al apagar el último se quitan los listeners.
 *
 * No sigue con movimiento reducido (es una animación continua), con el bot pausado (fuera de pantalla), dormido
 * (`gazeAt` ya lo ignora) ni mientras lo arrastran. El tacto tampoco: en un móvil no hay puntero que seguir y los
 * dedos tienen que seguir pudiendo desplazar la página. Al salir el cursor de la ventana, vuelve a mirar al frente.
 */

const siguiendo = new Set<BotContext>();
/** Lo último que miró cada bot, para no reescribir la pose por un movimiento imperceptible. */
const ultimo = new WeakMap<BotContext, readonly [number, number]>();
let pos: { x: number; y: number } | null = null;
let raf = 0;

function cuadro(): void {
  raf = 0;
  for (const ctx of siguiendo) {
    if (ctx.paused || ctx.reduce || ctx.dragging) continue;
    let dx = 0;
    let dy = 0;
    if (pos) {
      const r = ctx.svg.getBoundingClientRect();
      if (!r.width) continue;
      // Se normaliza por la distancia: a un tamaño de bot de distancia ya mira «del todo» hacia ahí.
      const alcance = Math.max(r.width * 1.6, 180);
      dx = Math.max(-1, Math.min(1, (pos.x - (r.left + r.width / 2)) / alcance));
      dy = Math.max(-1, Math.min(1, (pos.y - (r.top + r.height / 2)) / alcance));
    }
    const prev = ultimo.get(ctx);
    if (prev && Math.abs(prev[0] - dx) < 0.015 && Math.abs(prev[1] - dy) < 0.015) continue;
    ultimo.set(ctx, [dx, dy]);
    gazeAt(ctx, dx, dy);
  }
}

const pide = (): void => {
  if (!raf) raf = requestAnimationFrame(cuadro);
};

function alMover(e: PointerEvent): void {
  if (e.pointerType === 'touch') return;
  pos = { x: e.clientX, y: e.clientY };
  pide();
}

/** El cursor salió de la ventana: se deja de mirar hacia donde estuvo por última vez. */
function alSalir(e: MouseEvent): void {
  if (e.relatedTarget) return;
  pos = null;
  pide();
}

/** Empieza a seguir el puntero con `ctx`. Devuelve la función que lo deja de seguir (y vuelve a mirar al frente). */
export function followPointer(ctx: BotContext): () => void {
  if (typeof window === 'undefined') return () => undefined;
  if (siguiendo.has(ctx)) return () => stopFollowing(ctx);
  siguiendo.add(ctx);
  if (siguiendo.size === 1) {
    window.addEventListener('pointermove', alMover, { passive: true });
    document.addEventListener('mouseout', alSalir);
  }
  return () => stopFollowing(ctx);
}

function stopFollowing(ctx: BotContext): void {
  if (!siguiendo.delete(ctx)) return;
  ultimo.delete(ctx);
  if (!siguiendo.size) {
    window.removeEventListener('pointermove', alMover);
    document.removeEventListener('mouseout', alSalir);
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    pos = null;
  }
  if (!ctx.paused) gazeAt(ctx, 0, 0);
}
