import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef } from 'glyphflow/bots';

const kit = gfBotKit;
type GestureDef = GfBotGestureDef;

const smoothstep = (a: number, b: number, x: number): number => {
  const u = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return u * u * (3 - 2 * u);
};

/**
 * GESTOS FÍSICOS compuestos con las primitivas de `motion.ts`: cada uno es una partitura (qué hace
 * cada canal en cada instante) más su cara y su sombra. Las partituras se arman al primer uso, no a
 * nivel de módulo (sin llamadas sueltas: no pesan para quien no las usa).
 *
 * Como el front flip, duran lo que diga `--gf-bot-<id>-duration` (o `--<id>-duration`).
 */

/** «En el suelo» entre `a`..`b` de despegue y `c`..`d` de caída: 1 apoyado, 0 en el aire. */
const aire = (a: number, b: number, c: number, d: number) => (t: number) =>
  t < (b + c) / 2 ? 1 - smoothstep(a, b, t) : smoothstep(c, d, t);

const boca = (ctx: BotContext, ms: number, at: number, name: string, span: number) =>
  kit.later(ctx, () => kit.setMouth(ctx, name, span * ms), at * ms);

// ── 01 · SUPER BOUNCE ─────────────────────────────────────────────────────────────────────────

export const BOUNCE_MS = 1500;
const BOUNCE_H = 120;
let bounceDef: GestureDef | undefined;

/** BOING: se carga contra el suelo, sale disparado, aterriza con un squash enorme y rebota dos veces perdiendo ~60 % cada vez. */
export function superBounceDef(): GestureDef {
  return (bounceDef ??= {
    score: kit.motion.score(
      kit.motion.settle(0),
      kit.motion.anticipate(0.15, { y: 8, sx: 1.16, sy: 0.8, spread: 0.2, drag: -2 }),
      // Despegue: la falda se queda un instante atrás.
      kit.motion.launch(0.26, { y: -34, sx: 0.89, sy: 1.2, spread: -0.06, drag: 7 }),
      kit.motion.key(0.4, { y: -88, sx: 0.96, sy: 1.05, spread: 0, drag: 3 }),
      // Cima: ingravidez.
      kit.motion.key(0.55, { y: -BOUNCE_H, sx: 1.02, sy: 0.98, drag: 0 }),
      // Caída: se estira antes del golpe.
      kit.motion.key(0.67, { y: -60, sx: 0.92, sy: 1.1, drag: -4 }),
      kit.motion.impact(0.77, { y: 0, sx: 1.18, sy: 0.8, spread: 0.26, drag: -2 }),
      // Rebotes: grande → pequeño → asienta.
      kit.motion.bounce(0.77, 0.98, 32, 2, 0.4),
      kit.motion.overshoot(0.9, { spread: 0.08 }),
      kit.motion.settle(1),
    ),
    grounded: aire(0.18, 0.3, 0.7, 0.78),
  });
}

export function superBounce(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'super-bounce', BOUNCE_MS, 600, 4000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const at = kit.motion.runGesture(ctx, superBounceDef(), ms);
  kit.motion.shadowByHeight(ctx, at, ms, BOUNCE_H);
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.04, 0.5), offset: 0.15 }, // aprieta
    { transform: kit.S(1.14, 1.3), offset: 0.3 }, // abre al despegar
    { transform: kit.S(1.12, 1.2), offset: 0.6 },
    { transform: kit.S(1, 0.1), offset: 0.76 }, // impacto: cierra
    { transform: kit.S(1, 1.08), offset: 0.86 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.12, 'smile', 0.12);
  boca(ctx, ms, 0.26, 'open', 0.4);
  boca(ctx, ms, 0.77, 'wide', 0.18);
  return ms;
}

// ── 06 · STRETCH & SNAP ───────────────────────────────────────────────────────────────────────

export const STRETCH_MS = 700;
let stretchDef: GestureDef | undefined;

/** Se estira como chicle con la base casi fija y vuelve de golpe; la falda reacciona un poco después que el cuerpo. */
export function stretchSnapDef(): GestureDef {
  return (stretchDef ??= {
    score: kit.motion.score(
      kit.motion.settle(0),
      kit.motion.anticipate(0.1, { sx: 1.03, sy: 0.96, spread: 0.03 }),
      // Estira (la cabeza sube, la base se queda) y se sostiene.
      kit.motion.key(0.38, { sx: 0.88, sy: 1.26, spread: -0.06 }),
      kit.motion.key(0.5, { sx: 0.88, sy: 1.27, spread: -0.06 }),
      // Snap: la parte de arriba baja primero; la falda llega después.
      kit.motion.overshoot(0.6, { sx: 1.06, sy: 0.93, spread: 0.02 }),
      kit.motion.key(0.68, { spread: 0.14 }),
      kit.motion.key(0.78, { sx: 0.98, sy: 1.03, spread: -0.03 }),
      kit.motion.key(0.89, { sx: 1.005, sy: 0.99, spread: 0.01 }),
      kit.motion.settle(1),
    ),
    grounded: () => 1, // la base no se despega: la deformación va entera en `.hop`
  });
}

export function stretchSnap(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'stretch-snap', STRETCH_MS, 300, 3000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const at = kit.motion.runGesture(ctx, stretchSnapDef(), ms);
  kit.motion.shadowByHeight(ctx, at, ms, 40, 0.3);
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.02, 0.7), offset: 0.1 },
    { transform: kit.S(1.1, 1.22), offset: 0.38 },
    { transform: kit.S(1.1, 1.22), offset: 0.5 },
    { transform: kit.S(1, 0.25), offset: 0.62 }, // snap: los cierra
    { transform: kit.S(1, 1.06), offset: 0.76 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.3, 'o', 0.3);
  boca(ctx, ms, 0.62, 'wide', 0.14);
  return ms;
}

// ── 17 · SCARED RECOIL ────────────────────────────────────────────────────────────────────────

export const RECOIL_MS = 900;
let recoilDef: GestureDef | undefined;

/** Susto: sube, se estira y se estrecha, aguanta un instante, cae y tiembla como gel (no como una vibración). */
export function scaredRecoilDef(): GestureDef {
  return (recoilDef ??= {
    score: kit.motion.score(
      kit.motion.settle(0),
      // El cuerpo arranca un poco DESPUÉS que los ojos (los ojos van en `eyeSeq`, desde el 0).
      kit.motion.settle(0.05),
      kit.motion.launch(0.15, { y: -22, sx: 0.91, sy: 1.16, spread: -0.04, drag: 4 }),
      // Aguanta un instante arriba.
      kit.motion.key(0.26, { y: -23, sx: 0.92, sy: 1.14, drag: 3 }),
      // Cae.
      kit.motion.impact(0.38, { y: 0, sx: 1.1, sy: 0.9, spread: 0.14, drag: -2 }),
      kit.motion.overshoot(0.46, { sx: 0.98, sy: 1.03, spread: 0 }),
      // Tiembla: izquierda, derecha… con la falda un poco detrás.
      kit.motion.wobble(0.42, 0.46, 'roll', [5, -4.2, 3, -2.2, 1.2]),
      kit.motion.wobble(0.42, 0.46, 'x', [1.8, -1.5, 1.1, -0.7, 0.3]),
      kit.motion.wobble(0.42, 0.42, 'drag', [-2.4, 2, -1.4, 0.8, -0.3], 1, 0.04),
      kit.motion.settle(1),
    ),
    grounded: aire(0.1, 0.2, 0.3, 0.38),
    faceK: 0.5,
  });
}

export function scaredRecoil(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'scared-recoil', RECOIL_MS, 400, 3000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const at = kit.motion.runGesture(ctx, scaredRecoilDef(), ms);
  kit.motion.shadowByHeight(ctx, at, ms, 40);
  // Los ojos reaccionan primero: ya están abiertos de golpe cuando el cuerpo todavía no se mueve.
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.28, 1.45), offset: 0.03 },
    { transform: kit.S(1.28, 1.45), offset: 0.3 },
    { transform: kit.S(1.14, 1.25), offset: 0.55 },
    { transform: kit.S(1.04, 1.08), offset: 0.8 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.02, 'o', 0.7);
  return ms;
}
