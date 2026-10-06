import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';
import { gestureEffects } from './flip-fx';
import { boca } from './shared';

const kit = gfBotKit;

/**
 * 14 · SQUISH TELEPORT — se comprime hasta casi una línea, desaparece y reaparece en otra posición (línea horizontal →
 * charco → squash → normal), mágico y gráfico. Para que el gesto siga terminando en el sitio donde empezó, es de ida y
 * vuelta: se va, se queda un instante en el destino y vuelve igual.
 */

export const TELEPORT_MS = 2000;
export const TELEPORT_DX = 52;
let tpDef: GestureDef | undefined;

/** 1 = se ve, 0 = no. Solo baja al final de la compresión y vuelve con la línea ya en el destino (nada de fundidos largos). */
export function teleportVisibility(t: number): number {
  const ventana = (v0: number, a0: number): number => {
    if (t <= v0) return 1;
    if (t < v0 + 0.02) return 1 - (t - v0) / 0.02;
    if (t < a0) return 0;
    if (t < a0 + 0.02) return (t - a0) / 0.02;
    return 1;
  };
  return Math.min(ventana(0.19, 0.245), ventana(0.73, 0.775));
}

export function squishTeleportDef(): GestureDef {
  const m = kit.motion;
  const D = TELEPORT_DX;
  return (tpDef ??= {
    score: m.score(
      m.settle(0),
      // ── Se va ──
      m.anticipate(0.04, { sx: 0.98, sy: 1.04 }), // un respingo hacia arriba antes de aplastarse
      m.key(0.1, { sx: 1.1, sy: 0.6 }),
      m.key(0.15, { sx: 1.2, sy: 0.2 }),
      m.key(0.19, { x: 0, sx: 1.25, sy: 0.05, spread: 0.25 }), // casi una línea
      // ── Reaparece en el destino: línea → charco → squash → normal ──
      m.key(0.25, { x: D, sx: 1.25, sy: 0.05, spread: 0.25 }),
      m.key(0.3, { sx: 1.3, sy: 0.3, spread: 0.2 }),
      m.key(0.36, { sx: 1.12, sy: 0.78, spread: 0.1 }),
      m.overshoot(0.42, { sx: 0.97, sy: 1.05, spread: 0 }),
      m.key(0.5, { sx: 1.005, sy: 0.995 }),
      m.key(0.54, { sx: 1, sy: 1 }),
      // ── Y vuelve igual ──
      m.key(0.6, { sx: 0.98, sy: 1.04 }),
      m.key(0.66, { sx: 1.1, sy: 0.6 }),
      m.key(0.7, { sx: 1.2, sy: 0.2 }),
      m.key(0.73, { x: D, sx: 1.25, sy: 0.05, spread: 0.25 }),
      m.key(0.78, { x: 0, sx: 1.25, sy: 0.05, spread: 0.25 }),
      m.key(0.83, { sx: 1.3, sy: 0.3, spread: 0.2 }),
      m.key(0.89, { sx: 1.12, sy: 0.78, spread: 0.1 }),
      m.overshoot(0.94, { sx: 0.97, sy: 1.05, spread: 0 }),
      m.settle(1),
    ),
    // La cara se aplasta igual que el cuerpo: si no, los ojos sobresaldrían de la línea.
    faceK: 1,
  });
}

export function squishTeleport(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'squish-teleport', TELEPORT_MS, 900, 5000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const def = squishTeleportDef();
  const at = kit.motion.runGesture(ctx, def, ms);

  // El fundido: el bot (y su sombra) solo desaparece un instante, justo cuando es una línea y cambia de sitio.
  const N = 80;
  const vis = Array.from({ length: N + 1 }, (_, i) => ({ offset: i / N, opacity: +teleportVisibility(i / N).toFixed(3) }));
  ctx.el.hop.animate?.(vis, { duration: ms, easing: 'linear' });
  const sombra = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const f = at(t);
    const borde = Math.min(1, t / 0.06, (1 - t) / 0.06);
    return {
      offset: t,
      transform: `translateX(${f.x.toFixed(1)}px) ${kit.S(+(1.04 * (1 + 0.7 * (f.hopX - 1))).toFixed(3))}`,
      opacity: +(0.54 * borde * teleportVisibility(t)).toFixed(3),
    };
  });
  kit.shadowFor(ctx, sombra, ms);
  kit.motion.shadowFlag(ctx, ms);

  // Destellos donde reaparece (y donde vuelve).
  gestureEffects(ctx, ms, { impacts: [{ at: 0.34, x: TELEPORT_DX }, { at: 0.87 }] });
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.1, 1.2), offset: 0.05 },
    { transform: kit.S(1, 0.15), offset: 0.15 }, // los cierra al aplastarse
    { transform: kit.S(1, 0.15), offset: 0.3 },
    { transform: kit.S(1.06, 1.12), offset: 0.38 }, // los abre al reaparecer
    { transform: kit.S(1, 1), offset: 0.5 },
    { transform: kit.S(1.1, 1.2), offset: 0.6 },
    { transform: kit.S(1, 0.15), offset: 0.7 },
    { transform: kit.S(1, 0.15), offset: 0.83 },
    { transform: kit.S(1.06, 1.12), offset: 0.91 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.04, 'o', 0.15);
  boca(ctx, ms, 0.34, 'wide', 0.14);
  boca(ctx, ms, 0.6, 'o', 0.15);
  boca(ctx, ms, 0.87, 'smile', 0.12);
  return ms;
}
