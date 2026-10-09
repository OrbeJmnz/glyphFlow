import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef as GestureDef, type GfBotMotionFrame as MotionFrame } from 'glyphflow/bots';
import { flipEffects } from './flip-fx';

const kit = gfBotKit;

/**
 * FRONT FLIP — salto mortal frontal, compuesto con las primitivas de `motion.ts`.
 *
 * No es un `translateY` + `rotate(360deg)` (eso es un sprite girando). Participan a la vez, cada uno
 * con su propia curva:
 *
 *  - TRAYECTORIA (`.hop`): anticipación → despegue → parábola → caída → impacto → rebote.
 *  - GIRO: una vuelta completa EN 3D sobre el eje horizontal (`pitch`): la cabeza pasa hacia DELANTE, la cara se oculta al quedar de
 *    espaldas y el cuerpo se ve boca abajo en la cima. Lento al principio, rápido en el centro, frenando al caer.
 *  - PROFUNDIDAD (`z`): en el aire se acerca a quien mira (más grande) y vuelve a alejarse al caer.
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
    score: kit.motion.score(
      kit.motion.settle(0),
      // Anticipación: baja, se ensancha un poco y se echa hacia atrás para tomar impulso.
      kit.motion.anticipate(0.1, { y: 7, pitch: -0.2, sx: 1.06, sy: 0.9, spread: 0.1, drag: -1.5 }),
      // Despegue: se estira apenas y la cabeza empieza a pasar hacia delante.
      kit.motion.launch(0.2, { y: -34, pitch: 0.6, z: 0.04, sx: 0.95, sy: 1.08, spread: -0.03, drag: 3 }),
      // En el aire el cuerpo es RÍGIDO: gira entero, sin gel ni aplastarse. Un mortal de verdad cambia de orientación, no de forma.
      kit.motion.key(0.3, { sx: 1, sy: 1, spread: 0, drag: 0, gel: 0 }),
      kit.motion.key(0.35, { y: -72, pitch: Math.PI / 2, z: 0.12 }),
      // Cima, boca abajo y de espaldas a quien mira: el punto más cercano a la cámara.
      kit.motion.key(0.5, { y: -88, pitch: Math.PI, z: 0.2 }),
      kit.motion.key(0.65, { y: -72, pitch: 1.5 * Math.PI, z: 0.14 }),
      kit.motion.key(0.7, { sx: 1, sy: 1, spread: 0, drag: 0 }),
      // Caída: se alarga un poco antes del golpe y se aleja de la cámara hacia el suelo.
      kit.motion.key(0.8, { y: -10, pitch: 1.9 * Math.PI, z: 0.05, sx: 0.97, sy: 1.04, spread: -0.02, drag: -2 }),
      // Impacto: squash, la falda se abre.
      kit.motion.impact(0.9, { y: 4, pitch: 2 * Math.PI, z: 0, sx: 1.1, sy: 0.88, spread: 0.18, drag: -2 }),
      kit.motion.overshoot(0.95, { y: -3, sx: 0.98, sy: 1.03, spread: 0.05, drag: 1 }),
      kit.motion.settle(1),
      kit.motion.tumble(1, 2 * Math.PI),
    ),
    // «Estoy en el suelo»: 1 antes del despegue y tras el aterrizaje, 0 en el aire.
    grounded: (t) => (t < 0.5 ? 1 - kit.smoothstep(0.16, 0.3, t) : kit.smoothstep(0.7, 0.84, t)),
    faceK: FLIP_FACE_K,
    gelPhase,
  });
}
let flipDefCache: GestureDef | undefined;
let flipTracks: ReturnType<typeof kit.motion.tracksOf> | undefined;

/** Todos los canales del flip en el instante `t` (0 – 1). Pura: es lo que prueban los specs. */
export function flipFrame(t: number, faceK: number = FLIP_FACE_K): FlipFrame {
  const def = faceK === FLIP_FACE_K ? flipDef() : { ...flipDef(), faceK };
  return kit.motion.frameAt(def, (flipTracks ??= kit.motion.tracksOf(flipDef().score)), t);
}

/** Duración del flip: `--gf-bot-flip-duration` (o `--flip-duration`), 1000 ms por defecto (ver `gestureDuration`). */
export const flipDuration = (ctx: BotContext): number => kit.motion.gestureDuration(ctx, 'flip', FLIP_DEFAULT_MS, FLIP_MIN_MS, FLIP_MAX_MS);

export function frontFlip(ctx: BotContext): number {
  const ms = flipDuration(ctx);
  if (ctx.reduce) {
    return kit.motion.reducedHop(ctx, ms);
  }
  ctx.hooks.act(ms);
  kit.motion.runGesture(ctx, flipDef(), ms);

  // Flechas, líneas de velocidad y rayos del impacto (ver flip-fx.ts).
  flipEffects(ctx, ms);

  // SOMBRA: se queda en el suelo; su tamaño y opacidad cuentan la altura. Las pieles Mochi la ocultan
  // (flotan), así que durante el flip se enciende con `data-flip` y se apaga cuando termina o se corta.
  // Opacidades = las de la referencia (idle .30, anticipación .35, despegue .20, ápice .10, impacto .40)
  // escaladas por `SOMBRA_OP` (ver arriba). Entra y sale con un fundido, porque en reposo estas formas no
  // tienen sombra.
  const op = (v: number) => +(v * SOMBRA_OP).toFixed(3);
  kit.shadowFor(ctx, [
    { transform: kit.S(1), opacity: 0, offset: 0, easing: 'ease-out' },
    { transform: kit.S(1.04), opacity: op(0.3), offset: 0.05, easing: 'ease-in-out' },
    { transform: kit.S(1.1), opacity: op(0.35), offset: 0.1, easing: 'ease-out' },
    { transform: kit.S(0.7), opacity: op(0.2), offset: 0.2, easing: 'ease-out' },
    { transform: kit.S(0.45), opacity: op(0.1), offset: 0.5, easing: 'ease-in' },
    { transform: kit.S(0.7), opacity: op(0.2), offset: 0.8, easing: 'ease-in' },
    { transform: kit.S(1.2), opacity: op(0.4), offset: 0.9, easing: 'ease-out' },
    { transform: kit.S(1.04), opacity: op(0.3), offset: 0.96, easing: 'ease-in' },
    { transform: kit.S(1), opacity: 0, offset: 1 },
  ], ms);
  kit.motion.shadowFlag(ctx, ms);

  // EXPRESIÓN: transiciones cortas cerca de los instantes clave.
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(1.03, 1.08), offset: 0.2 },
    { transform: kit.S(1.1, 1.24), offset: 0.38 },
    { transform: kit.S(1.1, 1.24), offset: 0.62 },
    { transform: kit.S(1.05, 1.1), offset: 0.8 },
    { transform: kit.S(1, 1), offset: 0.87 },
    { transform: kit.S(1, 0.08), offset: 0.9 }, // impacto: ojos cerrados
    { transform: kit.S(1, 0.08), offset: 0.94 },
    { transform: kit.S(1, 1.05), offset: 0.97 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  const boca = (at: number, name: string, span: number) => kit.later(ctx, () => kit.setMouth(ctx, name, span * ms), at * ms);
  boca(0.08, 'smile', 0.12);
  boca(0.2, 'open', 0.15);
  boca(0.35, 'o', 0.3);
  boca(0.65, 'flat', 0.15);
  boca(0.82, 'o', 0.08);
  boca(0.9, 'wide', 0.1);
  return ms;
}
