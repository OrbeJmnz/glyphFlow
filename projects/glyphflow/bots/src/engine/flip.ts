import { shadowFor } from './actions';
import type { BotContext } from './context';
import { eyeSeq } from './eyes';
import { flipEffects } from './flip-fx';
import { S } from './math';
import {
  anticipate,
  frameAt,
  impact,
  key,
  launch,
  overshoot,
  rotate,
  runGesture,
  score,
  settle,
  tracksOf,
  type GestureDef,
  type MotionFrame,
} from './motion';
import { setMouth } from './mouth';
import { play, later } from './timing';
import { smoothstep } from './track';

export { canFlexHem, flexHem, gelBody, idleDAt, pathExtent } from './body-fx';

/**
 * FRONT FLIP — salto mortal frontal, compuesto con las primitivas de `motion.ts`.
 *
 * No es un `translateY` + `rotate(360deg)` (eso es un sprite girando). Participan a la vez, cada uno
 * con su propia curva:
 *
 *  - TRAYECTORIA (`.hop`): anticipación → despegue → parábola → caída → impacto → rebote.
 *  - GIRO: una vuelta completa en el plano, lento al principio, rápido en el centro, frenando al caer.
 *  - DEFORMACIÓN (squash y stretch): en el suelo se aplica en el contenedor `.hop`, anclado a la BASE;
 *    en el aire, en la pose y A LO LARGO DEL EJE DEL CUERPO. Las dos partes se multiplican.
 *  - CARA: se deforma menos que el cuerpo, para que los ojos no se vuelvan una mancha.
 *  - FALDA + GEL (movimiento secundario): la parte baja reacciona a la velocidad y la aceleración, y
 *    en el aire el contorno se vuelve una masa blanda con bultos.
 *  - SOMBRA: no rota; se queda en el suelo y comunica la altura con su tamaño y opacidad.
 *
 * Termina EXACTAMENTE donde empezó: todos los canales valen reposo en t = 0 y en t = 1.
 */

export const FLIP_DEFAULT_MS = 1000;
export const FLIP_MIN_MS = 300;
export const FLIP_MAX_MS = 4000;

/** Factor sobre las opacidades de la referencia. La sombra base llega a ~.56 en su centro, así que el
 * .30 de la referencia equivale a ~.54 sobre el elemento (1.8 ×). */
const SOMBRA_OP = 1.8;

/** Cuánto de la deformación del cuerpo recibe la cara (cuerpo 0.84 → cara ~0.94). */
export const FLIP_FACE_K = 0.4;

/** Fase de los bultos de gel: viajan por el contorno mientras el cuerpo gira (≈ 1.75 vueltas en todo el gesto). */
export const gelPhase = (t: number): number => 11 * t;

export type FlipFrame = MotionFrame;

/** La partitura del flip. Se arma al primer uso (sin llamadas a nivel de módulo: no pesa en el bundle). */
function flipDef(): GestureDef {
  return (flipDefCache ??= {
    score: score(
      settle(0),
      // Anticipación: baja, se ensancha, la falda se rezaga.
      anticipate(0.1, { y: 7, x: -1.5, roll: 0, sx: 1.08, sy: 0.88, spread: 0.14, drag: -2 }),
      key(0.15, { roll: 3 }),
      // Despegue: se estira, la falda se queda atrás y los bultos de gel empiezan a salir.
      launch(0.2, { y: -34, x: 0, roll: 15, sx: 0.9, sy: 1.15, spread: -0.05, drag: 6 }),
      key(0.3, { gel: 7 }),
      key(0.35, { y: -72, roll: 90, sx: 0.95, sy: 1.05, spread: 0, drag: 4.5 }),
      // Cima, boca abajo: ingravidez.
      key(0.5, { y: -88, x: 4, roll: 180, sx: 1, sy: 0.94, spread: 0, drag: 1, gel: 11 }),
      key(0.65, { y: -72, roll: 270, sx: 0.96, sy: 1.06, spread: 0, drag: -3 }),
      key(0.7, { gel: 8 }),
      // Caída: se estira antes del golpe.
      key(0.8, { y: -10, x: 1.5, roll: 350, sx: 0.92, sy: 1.1, spread: -0.04, drag: -5.5 }),
      key(0.84, { gel: 3 }),
      // Impacto: squash fuerte, la falda se abre.
      impact(0.9, { y: 4, x: 0, roll: 360, sx: 1.13, sy: 0.84, spread: 0.28, drag: -3 }),
      overshoot(0.95, { y: -3, sx: 0.97, sy: 1.04, spread: 0.06, drag: 1.5 }),
      key(0.18, { gel: 0 }),
      key(0.92, { gel: 0 }),
      settle(1),
      rotate(1, 360),
    ),
    // «Estoy en el suelo»: 1 antes del despegue y tras el aterrizaje, 0 en el aire.
    grounded: (t) => (t < 0.5 ? 1 - smoothstep(0.16, 0.3, t) : smoothstep(0.7, 0.84, t)),
    faceK: FLIP_FACE_K,
    gelPhase,
  });
}
let flipDefCache: GestureDef | undefined;
let flipTracks: ReturnType<typeof tracksOf> | undefined;

/** Todos los canales del flip en el instante `t` (0 – 1). Pura: es lo que prueban los specs. */
export function flipFrame(t: number, faceK: number = FLIP_FACE_K): FlipFrame {
  const def = faceK === FLIP_FACE_K ? flipDef() : { ...flipDef(), faceK };
  return frameAt(def, (flipTracks ??= tracksOf(flipDef().score)), t);
}

/**
 * Duración del flip. Se lee de la variable CSS `--gf-bot-flip-duration` (o `--flip-duration`) del
 * bot o de cualquier ancestro: `1000ms`, `1.2s`. Sin variable, 1000 ms.
 */
export function flipDuration(ctx: BotContext): number {
  const cs = getComputedStyle(ctx.svg);
  const raw = (cs.getPropertyValue('--gf-bot-flip-duration') || cs.getPropertyValue('--flip-duration')).trim();
  const m = /^([\d.]+)\s*(ms|s)$/.exec(raw);
  const ms = m ? parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1) : FLIP_DEFAULT_MS;
  return Math.min(FLIP_MAX_MS, Math.max(FLIP_MIN_MS, ms));
}

// ── Gesto ─────────────────────────────────────────────────────────────────────────────────────

/** Movimiento reducido: sin vuelta. Un saltito con squash, stretch y un rebote, en 300–450 ms. */
function reducedFlip(ctx: BotContext, ms: number): void {
  const d = Math.min(450, Math.max(300, ms * 0.4));
  ctx.hooks.act(d);
  play(ctx, ctx.el.hop, [
    { easing: 'ease-out' },
    { transform: `translateY(0px) ${S(1.07, 0.9)}`, offset: 0.2, easing: 'cubic-bezier(.2,.7,.3,1)' },
    { transform: `translateY(-16px) ${S(0.96, 1.06)}`, offset: 0.5, easing: 'cubic-bezier(.6,0,.9,.5)' },
    { transform: `translateY(0px) ${S(1.1, 0.88)}`, offset: 0.75, easing: 'ease-out' },
    { transform: `translateY(-2px) ${S(0.98, 1.02)}`, offset: 0.88 },
    { transform: S(1) },
  ], { duration: d });
  shadowFor(ctx, [
    { transform: S(1) }, { transform: S(1.08), offset: 0.2 }, { transform: S(0.75), opacity: 0.6, offset: 0.5 },
    { transform: S(1.12), offset: 0.75 }, { transform: S(1) },
  ], d);
}

export function frontFlip(ctx: BotContext): void {
  const ms = flipDuration(ctx);
  if (ctx.reduce) {
    reducedFlip(ctx, ms);
    return;
  }
  ctx.hooks.act(ms);
  runGesture(ctx, flipDef(), ms);

  // Flechas, líneas de velocidad y rayos del impacto (ver flip-fx.ts).
  flipEffects(ctx, ms);

  // SOMBRA: se queda en el suelo; su tamaño y opacidad cuentan la altura. Las pieles Mochi la ocultan
  // (flotan), así que durante el flip se enciende con `data-flip` y se apaga cuando termina o se corta.
  ctx.svg.dataset['flip'] = '';
  // Opacidades = las de la referencia (idle .30, anticipación .35, despegue .20, ápice .10, impacto .40)
  // escaladas por `SOMBRA_OP` (ver arriba). Entra y sale con un fundido, porque en reposo estas formas no
  // tienen sombra.
  const op = (v: number) => +(v * SOMBRA_OP).toFixed(3);
  shadowFor(ctx, [
    { transform: S(1), opacity: 0, offset: 0, easing: 'ease-out' },
    { transform: S(1.04), opacity: op(0.3), offset: 0.05, easing: 'ease-in-out' },
    { transform: S(1.1), opacity: op(0.35), offset: 0.1, easing: 'ease-out' },
    { transform: S(0.7), opacity: op(0.2), offset: 0.2, easing: 'ease-out' },
    { transform: S(0.45), opacity: op(0.1), offset: 0.5, easing: 'ease-in' },
    { transform: S(0.7), opacity: op(0.2), offset: 0.8, easing: 'ease-in' },
    { transform: S(1.2), opacity: op(0.4), offset: 0.9, easing: 'ease-out' },
    { transform: S(1.04), opacity: op(0.3), offset: 0.96, easing: 'ease-in' },
    { transform: S(1), opacity: 0, offset: 1 },
  ], ms);
  const apagarSombra = () => delete ctx.svg.dataset['flip'];
  // (jsdom no trae getAnimations: sin él la bandera se apaga sola al terminar el gesto, vía `later`)
  const animSombra = typeof ctx.el.shadow.getAnimations === 'function' ? ctx.el.shadow.getAnimations() : [];
  for (const a of animSombra) a.finished.then(apagarSombra, apagarSombra);
  if (!animSombra.length) later(ctx, apagarSombra, ms + 50);

  // EXPRESIÓN: transiciones cortas cerca de los instantes clave.
  eyeSeq(ctx, [
    { transform: S(1, 1), offset: 0 },
    { transform: S(1.03, 1.08), offset: 0.2 },
    { transform: S(1.1, 1.24), offset: 0.38 },
    { transform: S(1.1, 1.24), offset: 0.62 },
    { transform: S(1.05, 1.1), offset: 0.8 },
    { transform: S(1, 1), offset: 0.87 },
    { transform: S(1, 0.08), offset: 0.9 }, // impacto: ojos cerrados
    { transform: S(1, 0.08), offset: 0.94 },
    { transform: S(1, 1.05), offset: 0.97 },
    { transform: S(1, 1), offset: 1 },
  ], ms);
  const boca = (at: number, name: string, span: number) => later(ctx, () => setMouth(ctx, name, span * ms), at * ms);
  boca(0.08, 'smile', 0.12);
  boca(0.2, 'open', 0.15);
  boca(0.35, 'o', 0.3);
  boca(0.65, 'flat', 0.15);
  boca(0.82, 'o', 0.08);
  boca(0.9, 'wide', 0.1);
}
