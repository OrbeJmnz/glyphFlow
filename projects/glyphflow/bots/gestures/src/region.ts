import { gestureEffects } from './flip-fx';
import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';

const kit = gfBotKit;

/**
 * GESTOS POR REGIÓN: la deformación viaja por el cuerpo en vez de moverlo entero. Se apoyan en el campo
 * de `motion` (`shear`, `wave`, `taper`): cada región de la silueta tiene su propio retraso.
 */

const boca = (ctx: BotContext, ms: number, at: number, name: string, span: number) =>
  kit.later(ctx, () => kit.setMouth(ctx, name, span * ms), at * ms);

// ── 09 · JELLY WOBBLE ─────────────────────────────────────────────────────────────────────────

export const JELLY_MS = 1000;
let jellyDef: GestureDef | undefined;

/** Un golpe lateral y una onda de gel que baja del cuerpo: la cabeza va primero, la base 20–50 ms después. */
export function jellyWobbleDef(): GestureDef {
  const m = kit.motion;
  return (jellyDef ??= {
    score: m.score(
      m.settle(0),
      // El golpe aplasta un poco el lado y se recupera con un sobrepaso.
      m.impact(0.06, { sx: 0.94, sy: 1.03 }),
      m.overshoot(0.18, { sx: 1.035, sy: 0.985 }),
      m.key(0.34, { sx: 0.99, sy: 1.005 }),
      // El cuerpo entero se inclina apenas, siguiendo a la cabeza.
      m.wobble(0.06, 0.78, 'roll', [3.2, -2.5, 1.7, -0.9, 0.4]),
      m.settle(1),
    ),
    field: [
      m.shear(
        kit.track([[0, 0], [0.06, 0], [0.15, 22], [0.27, -16], [0.39, 10], [0.51, -6], [0.63, 3], [0.75, -1.2], [0.9, 0], [1, 0]]),
        0.05,
      ),
    ],
  });
}

export function jellyWobble(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'jelly-wobble', JELLY_MS, 400, 3000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  kit.motion.runGesture(ctx, jellyWobbleDef(), ms);
  gestureEffects(ctx, ms, { impacts: [{ at: 0.06 }] }); // el golpe
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.05, 0.35), offset: 0.08 }, // el golpe: los cierra
    { transform: kit.S(1.04, 1.1), offset: 0.2 },
    { transform: kit.S(1, 0.9), offset: 0.4 },
    { transform: kit.S(1, 1), offset: 0.7 },
  ], ms);
  boca(ctx, ms, 0.06, 'o', 0.25);
  boca(ctx, ms, 0.4, 'smile', 0.2);
  return ms;
}

// ── 10 · WAVE THROUGH BODY ────────────────────────────────────────────────────────────────────

export const WAVE_MS = 1100;
let waveDef: GestureDef | undefined;

/** Una onda cruza la silueta de izquierda a derecha y rebota un poco: el centro no se mueve, cambia la geometría. */
export function waveThroughBodyDef(): GestureDef {
  const m = kit.motion;
  return (waveDef ??= {
    score: m.score(
      m.settle(0),
      // La cara y el cuerpo acompañan el paso de la onda con una inclinación mínima.
      m.key(0.2, { roll: -1.2 }),
      m.key(0.48, { roll: 1 }),
      m.key(0.74, { roll: -0.5 }),
      m.settle(1),
    ),
    field: [
      m.wave(kit.track([[0, 0], [0.08, 0], [0.2, 0.13], [0.32, -0.04], [0.44, 0], [1, 0]]), 0.5, 1),
      // El rebote: una onda más débil que vuelve por el otro lado.
      m.wave(kit.track([[0, 0], [0.5, 0], [0.6, 0.05], [0.7, -0.02], [0.8, 0], [1, 0]]), 0.3, -1),
    ],
  });
}

export function waveThroughBody(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'wave-through-body', WAVE_MS, 500, 3500);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  kit.motion.runGesture(ctx, waveThroughBodyDef(), ms);
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.04, 0.85), offset: 0.4 }, // la onda pasa por la cara
    { transform: kit.S(1, 1), offset: 0.62 },
  ], ms);
  boca(ctx, ms, 0.3, 'wavy', 0.35);
  return ms;
}

// ── 15 · TORNADO SPIN ─────────────────────────────────────────────────────────────────────────

export const TORNADO_MS = 1300;
let tornadoDef: GestureDef | undefined;

/** Gira cada vez más rápido y la base se estrecha y se rezaga; al parar, la base sigue unos grados por inercia. */
export function tornadoSpinDef(): GestureDef {
  const m = kit.motion;
  return (tornadoDef ??= {
    score: m.score(
      m.settle(0),
      // Anticipación: una pequeña torsión hacia el lado contrario.
      m.anticipate(0.1, { yaw: -0.5, sx: 1.03, sy: 0.97 }),
      m.key(0.3, { yaw: 3 }),
      m.key(0.5, { yaw: 12.5 }),
      m.key(0.65, { yaw: 22.5 }),
      // Frena: la cabeza para primero (y se pasa un pelín).
      m.key(0.78, { yaw: 25.13 }),
      m.key(0.84, { yaw: 25.55, sx: 1.03, sy: 0.98 }),
      m.key(0.92, { yaw: 25.0 }),
      // Dos vueltas completas: al final vuelve a la vista de reposo.
      m.spin(1, 8 * Math.PI),
      m.settle(1, { yaw: 8 * Math.PI }),
    ),
    field: [
      // Cabeza ancha y base estrecha a máxima velocidad; se relaja al parar.
      m.taper(kit.track([[0, 0], [0.2, 0], [0.45, 0.5], [0.7, 0.58], [0.78, 0.25], [0.86, -0.12], [0.94, 0.03], [1, 0]]), 0.05),
      // La base sigue girando por inercia un instante después de que la cabeza se haya parado.
      m.shear(kit.track([[0, 0], [0.78, 0], [0.86, -7], [0.95, 3], [1, 0]]), 0.06),
    ],
  });
}

export function tornadoSpin(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'tornado-spin', TORNADO_MS, 600, 4000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  kit.motion.runGesture(ctx, tornadoSpinDef(), ms);
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.05, 0.9), offset: 0.12 },
    { transform: kit.S(1.1, 1.15), offset: 0.5 },
    { transform: kit.S(1.04, 0.5), offset: 0.82 }, // mareo al frenar
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.1, 'o', 0.65);
  boca(ctx, ms, 0.84, 'wavy', 0.14);
  return ms;
}

// ── 12 · INFLATE & RELEASE ────────────────────────────────────────────────────────────────────

export const INFLATE_MS = 1200;
let inflateDef: GestureDef | undefined;

/** Toma aire y se infla como un globito de gel (más arriba que abajo), aguanta un instante y lo suelta de golpe, sin explotar. */
export function inflateReleaseDef(): GestureDef {
  const m = kit.motion;
  return (inflateDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.05, { sx: 1.015, sy: 0.97 }), // la toma de aire
      // Al soltar sale una bocanada hacia arriba: se estira y se estrecha un instante.
      m.launch(0.5, { sx: 0.955, sy: 1.055 }),
      m.overshoot(0.6, { sx: 1.02, sy: 0.985 }),
      m.key(0.74, { sx: 0.995, sy: 1.005 }),
      m.wobble(0.52, 0.34, 'roll', [2, -1.5, 0.9, -0.4]),
      m.settle(1),
    ),
    field: [
      // Se llena (300–500 ms), aguanta, y se desinfla pasándose un poco por debajo.
      m.bulge(kit.track([[0, 0], [0.06, 0], [0.2, 0.06], [0.38, 0.11], [0.46, 0.11], [0.52, -0.025], [0.6, 0.015], [0.7, -0.006], [0.82, 0.002], [1, 0]]), 0.02),
      // El gel tiembla un poco después de soltarlo.
      m.shear(kit.track([[0, 0], [0.52, 0], [0.58, 6], [0.66, -4], [0.76, 2], [0.88, -0.8], [1, 0]]), 0.05),
    ],
  });
}

export function inflateRelease(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'inflate-release', INFLATE_MS, 600, 3500);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  kit.motion.runGesture(ctx, inflateReleaseDef(), ms);
  gestureEffects(ctx, ms, { impacts: [{ at: 0.5 }] }); // la bocanada al soltar
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.04, 0.8), offset: 0.06 }, // el esfuerzo de tomar aire
    { transform: kit.S(1.08, 1.12), offset: 0.38 },
    { transform: kit.S(1.08, 1.12), offset: 0.46 },
    { transform: kit.S(1, 0.2), offset: 0.52 }, // suelta: los cierra
    { transform: kit.S(1, 1.05), offset: 0.64 },
    { transform: kit.S(1, 1), offset: 0.8 },
  ], ms);
  boca(ctx, ms, 0.04, 'o', 0.44); // los mofletes llenos
  boca(ctx, ms, 0.5, 'open', 0.12);
  boca(ctx, ms, 0.64, 'smile', 0.2);
  return ms;
}
