import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';
import { gestureEffects } from './flip-fx';
import { aire, boca } from './shared';

const kit = gfBotKit;

/**
 * GESTOS QUE SE ESCONDEN BAJO EL SUELO: el cuerpo se desplaza hacia abajo y lo que queda por debajo de la línea del suelo
 * se recorta (`groundClip`): la base desaparece primero y la cabeza al final, como si se hundiera.
 */

/** Cuánto hay que bajar para que no asome ni la punta del copete o las orejas (unidades). */
export const HIDE_DY = 170;

/** Cuánto bajar para dejar a la vista solo los ojos y la parte de arriba de la cabeza. */
export function peekDy(ctx: BotContext): number {
  const ojos = ctx.shape.faceY ?? ctx.shape.cy - 6;
  return Math.round(kit.GROUND_Y - ojos - 14);
}

/** La sombra se encoge al esconderse el cuerpo (no hay nada que la tape) y puede crecer (`extra`: al emerger). */
function sombraHundida(ctx: BotContext, at: (t: number) => { y: number; hopX: number; x: number }, ms: number, extra?: (t: number) => number): void {
  const N = 60;
  const kf = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const f = at(t);
    const hundido = Math.max(0, Math.min(1, f.y / HIDE_DY));
    const borde = Math.min(1, t / 0.05, (1 - t) / 0.05);
    const e = extra ? extra(t) : 0;
    const ancho = 1.04 * (1 + 0.7 * (f.hopX - 1)) * (1 + 0.35 * e);
    return {
      offset: t,
      transform: `translateX(${f.x.toFixed(1)}px) ${kit.S(+ancho.toFixed(3))}`,
      opacity: +(0.54 * (1 - 0.8 * hundido + 0.5 * e) * borde).toFixed(3),
    };
  });
  kit.shadowFor(ctx, kf, ms);
  kit.motion.shadowFlag(ctx, ms);
}

// ── 11 · PEEK / POP-UP ────────────────────────────────────────────────────────────────────────

export const PEEK_MS = 2400;
const peekCache = new Map<number, GestureDef>();

/**
 * Se esconde, asoma solo los ojos y la parte de arriba de la cabeza para mirar a los lados, se vuelve a esconder (unos
 * 100 ms) y aparece de golpe con un estirón vertical de 1.12, aterriza con un squash chico y asienta.
 */
export function peekPopDef(dyPeek: number): GestureDef {
  const m = kit.motion;
  const H = HIDE_DY;
  let d = peekCache.get(dyPeek);
  if (!d) {
    d = {
      score: m.score(
        m.settle(0),
        m.anticipate(0.06, { y: 2, sx: 1.04, sy: 0.96 }), // se agacha para esconderse
        // HIDE: se hunde (la base desaparece primero).
        m.key(0.18, { y: H * 0.5, sx: 0.98, sy: 1.02 }),
        m.key(0.28, { y: H, sx: 1, sy: 1 }),
        m.key(0.34, { y: H }),
        // PEEK: asoma solo los ojos y la parte de arriba, y mira alrededor.
        m.key(0.42, { y: dyPeek }),
        m.key(0.46, { y: dyPeek, yaw: -0.45 }),
        m.key(0.54, { y: dyPeek, yaw: 0.45 }),
        m.key(0.62, { y: dyPeek, yaw: -0.15 }),
        m.key(0.66, { y: dyPeek, yaw: 0 }),
        // HIDE AGAIN: ~100 ms escondido del todo.
        m.key(0.7, { y: H }),
        m.key(0.745, { y: H }),
        // POP: aparece de golpe, estirado.
        m.launch(0.8, { y: -22, sx: 0.94, sy: 1.12 }),
        // LAND: squash chico, y asienta.
        m.impact(0.87, { y: 0, sx: 1.1, sy: 0.88 }),
        m.key(0.93, { sx: 0.99, sy: 1.015 }),
        m.settle(1),
      ),
      grounded: aire(0.74, 0.78, 0.82, 0.87),
    };
    peekCache.set(dyPeek, d);
  }
  return d;
}

export function peekPop(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'peek-pop', PEEK_MS, 900, 5000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  kit.groundClip(ctx, ms);
  const at = kit.motion.runGesture(ctx, peekPopDef(peekDy(ctx)), ms);
  sombraHundida(ctx, at, ms);
  gestureEffects(ctx, ms, { up: [0.78, 0.9], impacts: [{ at: 0.87 }] });
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.1, 1.2), offset: 0.42 }, // al asomar: bien abiertos
    { transform: kit.S(1.1, 1.2), offset: 0.64 },
    { transform: kit.S(1, 0.2), offset: 0.7 }, // se esconde
    { transform: kit.S(1.15, 1.3), offset: 0.8 }, // ¡sorpresa!
    { transform: kit.S(1, 0.1), offset: 0.87 },
    { transform: kit.S(1, 1), offset: 0.95 },
  ], ms);
  boca(ctx, ms, 0.78, 'o', 0.1);
  boca(ctx, ms, 0.88, 'smile', 0.14);
  return ms;
}

// ── 16 · DIVE & EMERGE ────────────────────────────────────────────────────────────────────────

export const DIVE_MS = 2600;
let diveDef: GestureDef | undefined;

/**
 * Se zambulle en el suelo de la interfaz (una superficie imaginaria): anticipación, estirón hacia abajo, contacto con
 * squash, se sumerge (la base, luego el medio, la cabeza y al final la cara) dejando ondas y una sombra; emerge primero
 * la cabeza, sale con estirón, da un saltito y aterriza con squash.
 */
export function diveEmergeDef(): GestureDef {
  const m = kit.motion;
  const H = HIDE_DY;
  return (diveDef ??= {
    score: m.score(
      m.settle(0),
      // DIVE: un respingo hacia arriba y un estirón hacia abajo.
      m.anticipate(0.1, { y: -8, sx: 0.94, sy: 1.12 }),
      m.key(0.18, { y: -2, sx: 0.9, sy: 1.2 }),
      // CONTACT: se aplasta contra el suelo.
      m.impact(0.22, { y: 4, sx: 1.14, sy: 0.84, spread: 0.2 }),
      // SUBMERGE: la base se va primero; al final desaparece la cara.
      m.key(0.32, { y: 40, sx: 1.05, sy: 0.95, spread: 0.05 }),
      m.key(0.42, { y: 100, sx: 1, sy: 1, spread: 0 }),
      m.key(0.5, { y: H }),
      m.key(0.62, { y: H }),
      // EMERGE: primero asoma lo de arriba de la cabeza, luego el cuerpo sale estirado.
      m.key(0.7, { y: 105 }),
      m.launch(0.78, { y: -6, sx: 0.92, sy: 1.22 }),
      // POP: un saltito.
      m.key(0.86, { y: -30, sx: 0.9, sy: 1.18 }),
      // LAND: squash.
      m.impact(0.93, { y: 0, sx: 1.15, sy: 0.85, spread: 0.18 }),
      m.overshoot(0.97, { sx: 0.98, sy: 1.03, spread: 0 }),
      m.settle(1),
    ),
    grounded: aire(0.08, 0.16, 0.78, 0.93),
  });
}

export function diveEmerge(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'dive-emerge', DIVE_MS, 1000, 6000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  kit.groundClip(ctx, ms);
  const at = kit.motion.runGesture(ctx, diveEmergeDef(), ms);
  // La sombra se encoge al hundirse y se ensancha un momento antes de emerger.
  sombraHundida(ctx, at, ms, (t) => Math.max(0, 1 - Math.abs(t - 0.64) / 0.07));
  gestureEffects(ctx, ms, { ripples: [{ at: 0.4 }, { at: 0.64 }], impacts: [{ at: 0.93 }] });
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.12, 1.25), offset: 0.14 }, // mirando hacia abajo
    { transform: kit.S(1, 0.1), offset: 0.24 }, // contacto
    { transform: kit.S(1, 0.1), offset: 0.6 },
    { transform: kit.S(1.12, 1.25), offset: 0.74 }, // al salir
    { transform: kit.S(1, 0.1), offset: 0.93 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.1, 'o', 0.16);
  boca(ctx, ms, 0.78, 'open', 0.14);
  boca(ctx, ms, 0.93, 'smile', 0.1);
  return ms;
}
