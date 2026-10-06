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
      m.wobble(0.06, 0.78, 'roll', [5.5, -4.2, 2.8, -1.5, 0.7]),
      m.settle(1),
    ),
    field: [
      m.shear(
        kit.track([[0, 0], [0.06, 0], [0.15, 36], [0.27, -26], [0.39, 16], [0.51, -9.5], [0.63, 4.8], [0.75, -1.9], [0.9, 0], [1, 0]]),
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
      m.wave(kit.track([[0, 0], [0.08, 0], [0.2, 0.22], [0.32, -0.07], [0.44, 0], [1, 0]]), 0.5, 1),
      // El rebote: una onda más débil que vuelve por el otro lado.
      m.wave(kit.track([[0, 0], [0.5, 0], [0.6, 0.09], [0.7, -0.035], [0.8, 0], [1, 0]]), 0.3, -1),
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

// ── 05 · PUDDLE MORPH ─────────────────────────────────────────────────────────────────────────

export const PUDDLE_MS = 1800;
let puddleDef: GestureDef | undefined;

/**
 * Se derrite hasta un charco de gel (adorable, no grotesco) y se levanta. No es un `scaleY`: la cabeza colapsa
 * primero y el colapso baja (arriba → medio → abajo); el charco queda muy ancho y muy bajo con bordes suaves, y al
 * volver, el centro sube antes que los bordes (charco → montículo → blob → fantasma) y se pasa un poco de alto.
 */
export function puddleMorphDef(): GestureDef {
  const m = kit.motion;
  return (puddleDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.08, { sx: 1.01, sy: 0.975 }), // empieza a bajar
      m.key(0.42, { sx: 1.15, sy: 0.6 }), // el charco: la cara baja con él
      m.key(0.62, { sx: 1.15, sy: 0.6 }),
      m.key(0.82, { sx: 1.02, sy: 0.97 }),
      m.overshoot(0.88, { sx: 0.97, sy: 1.06 }), // demasiado alto un instante
      m.key(0.94, { sx: 1.005, sy: 0.995 }),
      m.settle(1),
    ),
    faceK: 0.55,
    field: [
      m.melt(kit.track([[0, 0], [0.1, 0], [0.24, 0.45], [0.42, 1], [0.62, 1], [0.74, 0.5], [0.86, -0.07], [0.93, 0.02], [1, 0]])),
    ],
  });
}

export function puddleMorph(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'puddle-morph', PUDDLE_MS, 800, 5000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const at = kit.motion.runGesture(ctx, puddleMorphDef(), ms);
  kit.motion.shadowByHeight(ctx, at, ms, 40, 0.3);
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.04, 0.8), offset: 0.2 }, // los ojos bajan despacio, adormilados
    { transform: kit.S(1.08, 0.9), offset: 0.42 },
    { transform: kit.S(1.08, 0.9), offset: 0.48 },
    { transform: kit.S(1.08, 0.06), offset: 0.52 }, // parpadeo en el charco
    { transform: kit.S(1.08, 0.9), offset: 0.57 },
    { transform: kit.S(1.04, 0.95), offset: 0.68 },
    { transform: kit.S(1, 1.12), offset: 0.86 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.1, 'flat', 0.5);
  boca(ctx, ms, 0.7, 'o', 0.14);
  boca(ctx, ms, 0.86, 'smile', 0.14);
  return ms;
}

// ── 02 · JELLY DROP ───────────────────────────────────────────────────────────────────────────

export const DROP_MS = 1500;
export const DROP_FROM = -130;
let dropDef: GestureDef | undefined;

/**
 * Aparece cayendo desde arriba: se estira cada vez más, golpea el suelo y por unos 60 ms es casi una masa horizontal
 * de gel (no un líquido realista). Se reconstruye desde el centro (charco → domo → estirón → normal), se pasa un
 * poco de alto (1.05 / 0.97) y asienta. Ideal para spawn, appear, drop o un error divertido.
 */
export function jellyDropDef(): GestureDef {
  const m = kit.motion;
  return (dropDef ??= {
    score: m.score(
      // Arranca arriba, ya alargado y estrecho.
      m.key(0, { y: DROP_FROM, sx: 0.9, sy: 1.12 }),
      m.key(0.12, { y: -118, sx: 0.89, sy: 1.14, drag: -2 }),
      m.key(0.22, { y: -92, sx: 0.88, sy: 1.17, drag: -4 }), // la velocidad sube: la falda se queda atrás
      m.key(0.32, { y: -52, sx: 0.87, sy: 1.2, drag: -6 }),
      // Justo antes de tocar: lo más estirado.
      m.key(0.4, { y: -8, sx: 0.86, sy: 1.22, drag: -7 }),
      // El golpe: la base se abre y se mantiene unos 60 ms.
      m.impact(0.43, { y: 0, sx: 1.15, sy: 0.85, spread: 0.32, drag: 0 }),
      m.key(0.47, { sx: 1.16, sy: 0.84, spread: 0.34 }),
      // Reconstruye: el centro sube primero, los lados llegan con retraso.
      m.key(0.6, { sx: 1.07, sy: 0.93, spread: 0.12 }),
      m.key(0.74, { sx: 0.99, sy: 1.04, spread: 0.02 }),
      m.overshoot(0.86, { sx: 0.97, sy: 1.05, spread: 0 }),
      m.key(0.94, { sx: 1.005, sy: 0.995 }),
      // El gel tiembla un poco al aplastarse.
      m.key(0.43, { gel: 0 }),
      m.key(0.52, { gel: 5 }),
      m.key(0.66, { gel: 3 }),
      m.key(0.8, { gel: 0 }),
      m.settle(1),
    ),
    grounded: (t) => kit.smoothstep(0.34, 0.43, t),
    gelPhase: (t) => 14 * t,
    field: [
      m.melt(
        kit.track([[0, 0], [0.38, 0], [0.43, 1], [0.5, 1], [0.62, 0.55], [0.74, 0.16], [0.84, -0.06], [0.92, 0.015], [1, 0]]),
        { lag: 0.03, lagX: 0.08, h: 0.7, w: 1.2 },
      ),
    ],
  });
}

export function jellyDrop(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'jelly-drop', DROP_MS, 700, 4000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const at = kit.motion.runGesture(ctx, jellyDropDef(), ms);
  kit.motion.shadowByHeight(ctx, at, ms, -DROP_FROM);
  // Aparece: no estaba, y entra con un fundido corto mientras cae.
  ctx.el.hop.animate?.([{ opacity: 0 }, { opacity: 1, offset: 0.07 }, { opacity: 1 }], { duration: ms, easing: 'linear' });
  gestureEffects(ctx, ms, { speedDown: [0.12, 0.4], impacts: [{ at: 0.43, big: true }] });
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.1, 1.25), offset: 0.06 }, // ojos de susto mientras cae
    { transform: kit.S(1.12, 1.3), offset: 0.4 },
    { transform: kit.S(1, 0.08), offset: 0.43 }, // el golpe: los cierra
    { transform: kit.S(1, 0.08), offset: 0.5 },
    { transform: kit.S(1, 1.12), offset: 0.62 },
    { transform: kit.S(1, 1), offset: 0.8 },
  ], ms);
  boca(ctx, ms, 0.04, 'o', 0.38);
  boca(ctx, ms, 0.45, 'wide', 0.12);
  boca(ctx, ms, 0.62, 'smile', 0.2);
  return ms;
}
