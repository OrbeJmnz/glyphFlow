import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';
import { flipEffects } from './flip-fx';
import { aire, boca, nodos, perform } from './shared';

const kit = gfBotKit;
const TAU = Math.PI * 2;

/**
 * ACROBACIAS: las que se arman solo con partitura (trayectoria, giro, deformación) y cara. Cada una tiene
 * otra anticipación y otra física que el front flip: no son el mismo gesto con otro signo.
 */

const eyes = (ctx: BotContext, ms: number, kf: [number, number, number][]): void =>
  kit.eyeSeq(ctx, kf.map(([offset, x, y]) => ({ transform: kit.S(x, y), offset })), ms);

// ── 08 · SPIN + SQUASH ────────────────────────────────────────────────────────────────────────

let spinDef: GestureDef | undefined;

/** Giro sobre su eje vertical con volumen: la silueta se estrecha, la cara se comprime y reaparece; termina con un jelly wobble. */
export function spinSquashDef(): GestureDef {
  const m = kit.motion;
  return (spinDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.1, { yaw: -0.35, sx: 1.03, sy: 0.97 }), // torsión hacia el lado contrario
      m.key(0.3, { yaw: 1.2 }),
      m.key(0.55, { yaw: 5 }), // velocidad máxima
      m.key(0.8, { yaw: TAU }),
      m.key(0.88, { yaw: TAU + 0.16, sx: 1.06, sy: 0.98 }), // se pasa y se ensancha
      m.key(0.94, { yaw: TAU - 0.04, sx: 0.985, sy: 1.01 }),
      m.settle(1, { yaw: TAU }),
    ),
    field: [m.shear(kit.track([[0, 0], [0.84, 0], [0.9, 5], [0.96, -2.5], [1, 0]]), 0.04)],
  });
}

export function spinSquash(ctx: BotContext): number {
  return perform(ctx, 'spin-squash', spinSquashDef, {
    ms: 1000,
    min: 500,
    extras: (c, ms) => {
      eyes(c, ms, [[0, 1, 1], [0.12, 1.04, 0.9], [0.55, 1.1, 1.1], [0.88, 1.05, 0.9], [1, 1, 1]]);
      boca(c, ms, 0.12, 'o', 0.6);
    },
  });
}

// ── 07 · SIDE DODGE ───────────────────────────────────────────────────────────────────────────

let dodgeDef: GestureDef | undefined;

/** Esquiva lateral: se inclina al contrario, sale disparado estirándose en horizontal, se pasa, tiembla al revés y vuelve. */
export function sideDodgeDef(): GestureDef {
  const m = kit.motion;
  return (dodgeDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.12, { x: -5, roll: -8, sx: 1.04, sy: 0.96 }),
      m.launch(0.28, { x: 38, roll: 6, sx: 1.16, sy: 0.94, spread: 0.1 }),
      m.key(0.38, { x: 46, roll: 3, sx: 1.04, sy: 0.99, spread: 0 }), // se pasa de la marca
      m.key(0.48, { x: 40, roll: -3, sx: 0.97, sy: 1.02 }), // contra-oscilación
      m.key(0.58, { x: 40, roll: 1, sx: 1.01, sy: 0.995 }),
      m.key(0.72, { x: 22, roll: 2.5, sx: 1.05, sy: 0.97 }), // vuelve
      m.key(0.88, { x: 3, roll: -1.5, sx: 0.99, sy: 1.01 }),
      m.settle(1),
    ),
    // La falda se queda atrás: la cabeza va delante, la base llega después.
    field: [m.shear(kit.track([[0, 0], [0.12, 0], [0.28, 15], [0.4, -7], [0.52, 3], [0.7, -4], [0.84, 1.5], [1, 0]]), 0.1)],
  });
}

export function sideDodge(ctx: BotContext): number {
  return perform(ctx, 'side-dodge', sideDodgeDef, {
    ms: 800,
    min: 400,
    alto: 40,
    extras: (c, ms) => {
      // La mirada se adelanta 2 px hacia donde va.
      eyes(c, ms, [[0, 1, 1], [0.04, 1, 1], [0.1, 1, 1], [0.35, 1.04, 0.85], [0.6, 1, 1], [1, 1, 1]]);
      boca(c, ms, 0.26, 'o', 0.3);
    },
  });
}

// ── 18 · BACKFLIP ─────────────────────────────────────────────────────────────────────────────

let backDef: GestureDef | undefined;

/** Otra acrobacia, no el flip al revés: se inclina hacia DELANTE para cargar, sale hacia atrás y gira -360°. */
export function backflipDef(): GestureDef {
  const m = kit.motion;
  return (backDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.12, { y: 6, roll: 7, sx: 1.1, sy: 0.88, spread: 0.12, drag: -2 }),
      m.launch(0.24, { y: -40, x: -3, roll: -25, sx: 0.92, sy: 1.14, spread: -0.05, drag: 6 }),
      m.key(0.4, { y: -78, x: -7, roll: -120, sx: 0.96, sy: 1.04, spread: 0, drag: 3 }),
      m.key(0.52, { y: -88, x: -9, roll: -210, sx: 1, sy: 0.96, drag: 0.5 }),
      m.key(0.66, { y: -60, x: -6, roll: -300, sx: 0.97, sy: 1.05, drag: -3 }),
      m.key(0.78, { y: -10, x: -2, roll: -352, sx: 0.93, sy: 1.1, spread: -0.04, drag: -5.5 }),
      m.impact(0.88, { y: 4, x: 0, roll: -360, sx: 1.12, sy: 0.85, spread: 0.26, drag: -3 }),
      m.overshoot(0.94, { y: -2.5, sx: 0.97, sy: 1.04, spread: 0.05, drag: 1.2 }),
      m.key(0.18, { gel: 0 }),
      m.key(0.3, { gel: 6 }),
      m.key(0.52, { gel: 9 }),
      m.key(0.7, { gel: 6 }),
      m.key(0.84, { gel: 2 }),
      m.key(0.92, { gel: 0 }),
      m.settle(1),
      m.rotate(1, -360),
    ),
    grounded: aire(0.16, 0.3, 0.7, 0.84),
    gelPhase: (t) => -9 * t,
  });
}

export function backflip(ctx: BotContext): number {
  return perform(ctx, 'backflip', backflipDef, {
    ms: 1100,
    min: 500,
    alto: 90,
    extras: (c, ms) => {
      eyes(c, ms, [[0, 1, 1], [0.12, 1.04, 0.7], [0.3, 1.1, 1.22], [0.66, 1.08, 1.2], [0.86, 1, 1], [0.9, 1, 0.1], [0.94, 1, 0.1], [0.97, 1, 1.05], [1, 1, 1]]);
      boca(c, ms, 0.1, 'smile', 0.12);
      boca(c, ms, 0.24, 'o', 0.5);
      boca(c, ms, 0.88, 'wide', 0.1);
    },
  });
}

// ── 19 · DOUBLE FLIP ──────────────────────────────────────────────────────────────────────────

let doubleDef: GestureDef | undefined;

/** Especial y raro: más anticipación, mucho más alto, 720° y un impacto mayor con rebote de alegría. */
export function doubleFlipDef(): GestureDef {
  const m = kit.motion;
  return (doubleDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.14, { y: 9, roll: 8, sx: 1.14, sy: 0.82, spread: 0.16, drag: -3 }),
      m.key(0.2, { y: 9, roll: 8, sx: 1.15, sy: 0.8, spread: 0.18 }), // aguanta la carga
      m.launch(0.3, { y: -60, roll: 40, sx: 0.88, sy: 1.2, spread: -0.06, drag: 8 }),
      m.key(0.45, { y: -120, roll: 230, sx: 0.95, sy: 1.04, spread: 0, drag: 4 }),
      m.key(0.55, { y: -145, roll: 360, sx: 1, sy: 0.95, drag: 1 }),
      m.key(0.68, { y: -110, roll: 520, sx: 0.96, sy: 1.05, drag: -3 }),
      m.key(0.78, { y: -50, roll: 680, sx: 0.93, sy: 1.1, spread: -0.04, drag: -5 }),
      m.key(0.84, { y: -8, roll: 715, sx: 0.9, sy: 1.14, drag: -6 }),
      m.impact(0.89, { y: 5, roll: 720, sx: 1.16, sy: 0.8, spread: 0.3, drag: -3.5 }),
      m.overshoot(0.93, { y: -4, sx: 0.96, sy: 1.05, spread: 0.05, drag: 1.5 }),
      m.key(0.96, { y: 1.5, sx: 1.02, sy: 0.98 }), // rebotito de alegría
      m.key(0.2, { gel: 0 }),
      m.key(0.34, { gel: 7 }),
      m.key(0.55, { gel: 11 }),
      m.key(0.78, { gel: 6 }),
      m.key(0.9, { gel: 0 }),
      m.settle(1),
      m.rotate(1, 720),
    ),
    grounded: aire(0.2, 0.32, 0.8, 0.88),
    gelPhase: (t) => 17 * t,
  });
}

export function doubleFlip(ctx: BotContext): number {
  return perform(ctx, 'double-flip', doubleFlipDef, {
    ms: 1400,
    min: 800,
    alto: 150,
    extras: (c, ms) => {
      flipEffects(c, ms); // los rayos del impacto: es el gesto especial
      eyes(c, ms, [[0, 1, 1], [0.14, 1.05, 0.55], [0.3, 1.12, 1.26], [0.78, 1.1, 1.22], [0.88, 1, 1], [0.9, 1, 0.08], [0.95, 1, 0.08], [0.98, 1, 1.08], [1, 1, 1]]);
      boca(c, ms, 0.08, 'smile', 0.1);
      boca(c, ms, 0.3, 'o', 0.5);
      boca(c, ms, 0.9, 'wide', 0.1);
    },
  });
}

// ── 04 · CARTWHEEL ────────────────────────────────────────────────────────────────────────────

let wheelDef: GestureDef | undefined;

/** Rueda lateral, más juguetona que el flip: sale al lado, gira 360° en un arco y aterriza primero de un lado, con wobble lateral. */
export function sideCartwheelDef(): GestureDef {
  const m = kit.motion;
  return (wheelDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.12, { x: 2, y: 3, roll: -10, sx: 1.05, sy: 0.93 }),
      m.launch(0.24, { x: 10, y: -18, roll: 25, sx: 1.12, sy: 0.93, drag: 3 }),
      m.key(0.4, { x: 20, y: -38, roll: 100, sx: 0.96, sy: 1.02 }),
      m.key(0.52, { x: 30, y: -46, roll: 180, sx: 1, sy: 1, drag: 0 }), // invertido: pequeña suspensión
      m.key(0.64, { x: 26, y: -36, roll: 270, sx: 0.95, sy: 1.03, drag: -2 }),
      m.key(0.78, { x: 12, y: -12, roll: 335, sx: 0.97, sy: 1.08, drag: -3 }),
      // Aterriza primero de un lado (sigue inclinado), después el resto del cuerpo.
      m.impact(0.86, { x: 3, y: 3, roll: 352, sx: 1.1, sy: 0.9, spread: 0.18, drag: -2 }),
      m.key(0.9, { x: 0.5, y: 0, roll: 364 }),
      m.key(0.94, { roll: 357, sx: 1, sy: 1, spread: 0.03 }),
      m.key(0.97, { roll: 361.5 }),
      m.settle(1),
      m.rotate(1, 360),
    ),
    grounded: aire(0.16, 0.26, 0.78, 0.86),
  });
}

export function sideCartwheel(ctx: BotContext): number {
  return perform(ctx, 'side-cartwheel', sideCartwheelDef, {
    ms: 1200,
    min: 600,
    alto: 60,
    extras: (c, ms) => {
      eyes(c, ms, [[0, 1, 1], [0.12, 1.04, 0.75], [0.3, 1.1, 1.2], [0.7, 1.08, 1.15], [0.86, 1, 0.15], [0.9, 1, 0.15], [0.95, 1, 1.05], [1, 1, 1]]);
      boca(c, ms, 0.1, 'smile', 0.12);
      boca(c, ms, 0.24, 'open', 0.55);
      boca(c, ms, 0.88, 'wide', 0.1);
    },
  });
}

// ── 13 · GHOST SWOOP ──────────────────────────────────────────────────────────────────────────

let swoopDef: GestureDef | undefined;

/**
 * Recorre una S flotando: siempre se inclina hacia donde va, la cabeza cambia de dirección primero y la
 * falda llega después, como una cola de gel (nada de tela real). Sale y vuelve al mismo sitio.
 */
export function ghostSwoopDef(): GestureDef {
  const m = kit.motion;
  const N = 24;
  // Se entra y se sale de la curva con un fundido, para que arranque y termine en reposo.
  const env = (t: number) => kit.smoothstep(0, 0.14, t) * kit.smoothstep(1, 0.86, t);
  const X = (t: number) => 56 * Math.sin(TAU * t) * env(t);
  const dX = (t: number) => (X(Math.min(1, t + 0.002)) - X(Math.max(0, t - 0.002))) / 0.004;
  return (swoopDef ??= {
    score: {
      x: nodos(N, X),
      y: nodos(N, (t) => -26 * Math.sin(Math.PI * t) - 12 * Math.sin(TAU * 2 * t) * env(t)),
      roll: nodos(N, (t) => Math.max(-18, Math.min(18, dX(t) * 0.045)) * env(t)),
      drag: nodos(N, (t) => -dX(t) * 0.012 * env(t)),
      spread: nodos(N, (t) => Math.abs(dX(t)) * 0.0004 * env(t)),
    },
    field: [m.shear(kit.track(nodos(N, (t) => dX(t) * 0.035 * env(t))), 0.07)],
  });
}

export function ghostSwoop(ctx: BotContext): number {
  return perform(ctx, 'ghost-swoop', ghostSwoopDef, {
    ms: 1600,
    min: 800,
    alto: 50,
    extras: (c, ms) => {
      eyes(c, ms, [[0, 1, 1], [0.3, 1.05, 0.9], [0.5, 1, 1], [0.8, 1.05, 0.9], [1, 1, 1]]);
      boca(c, ms, 0.08, 'smile', 0.8);
    },
  });
}
