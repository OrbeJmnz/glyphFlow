import { morphPath, pathLerp } from '../data/morph';
import { f2, f3 } from '../data/color';
import { shadowFor } from './actions';
import type { BotContext } from './context';
import { eyeSeq } from './eyes';
import { S } from './math';
import { setMouth } from './mouth';
import { animateShape } from './outlines';
import { animatePose } from './pose-motion';
import { shapeD } from './shape-view';
import { later, play } from './timing';
import { smoothstep, track } from './track';

/**
 * FRONT FLIP — salto mortal frontal.
 *
 * No es un `translateY` + `rotate(360deg)` (eso es un sprite girando). Participan a la vez, cada uno
 * con su propia curva:
 *
 *  - TRAYECTORIA (`.hop`): anticipación → despegue → parábola → caída → impacto → rebote.
 *  - GIRO: una vuelta completa en el plano, lento al principio, rápido en el centro, frenando al caer.
 *  - DEFORMACIÓN (squash y stretch): en el suelo se aplica en el contenedor `.hop`, anclado a la BASE;
 *    en el aire, en la pose y A LO LARGO DEL EJE DEL CUERPO (boca abajo sigue estirándose de la
 *    cabeza a la falda). Las dos partes se multiplican y dan exactamente la deformación pedida.
 *  - CARA: se deforma menos que el cuerpo, para que los ojos no se vuelvan una mancha.
 *  - FALDA (movimiento secundario): la parte baja de la silueta reacciona a la velocidad y la
 *    aceleración, no al ángulo — se arrastra al subir, se recupera en el ápice, se estira al caer y
 *    se ensancha al impactar. Se anima el `d` de la silueta (y con él su contorno).
 *  - SOMBRA: no rota; se queda en el suelo y comunica la altura con su tamaño y opacidad.
 *
 * Termina EXACTAMENTE donde empezó: todos los canales valen reposo en t = 0 y en t = 1, y la falda
 * arranca y acaba en la onda de reposo de ese instante.
 */

export const FLIP_DEFAULT_MS = 1000;
export const FLIP_MIN_MS = 300;
export const FLIP_MAX_MS = 4000;

/** Factor sobre las opacidades de la referencia. La sombra base llega a ~.56 en su centro, así que el
 * .30 de la referencia equivale a ~.54 sobre el elemento (1.8 ×). */
const SOMBRA_OP = 1.8;

/** Cuánto de la deformación del cuerpo recibe la cara (cuerpo 0.84 → cara ~0.94). */
export const FLIP_FACE_K = 0.4;

// ── Pistas por canal. t = fracción del gesto (0 – 1). Las unidades de altura son las del viewBox. ──
const TRACKS = {
  /** Altura: negativo = arriba. Anticipa +7, despega a -34, cima -88, cae y rebota -3 antes de asentar. */
  y: /* @__PURE__ */ track([[0, 0], [0.1, 7], [0.2, -34], [0.35, -72], [0.5, -88], [0.65, -72], [0.8, -10], [0.9, 4], [0.95, -3], [1, 0]]),
  /** Deriva horizontal MUY pequeña (≈ 3–4 % del ancho): sube un poco hacia un lado y vuelve. */
  x: /* @__PURE__ */ track([[0, 0], [0.1, -1.5], [0.2, 0], [0.5, 4], [0.8, 1.5], [0.9, 0], [1, 0]]),
  /** Giro en grados. Casi nada hasta el despegue, rápido en el centro, frena antes de aterrizar. */
  roll: /* @__PURE__ */ track([[0, 0], [0.1, 0], [0.15, 3], [0.2, 15], [0.35, 90], [0.5, 180], [0.65, 270], [0.8, 350], [0.9, 360], [1, 360]]),
  /** Deformación del cuerpo (ancho y alto): acumula energía, estira al despegar, aplasta al impactar. */
  sx: /* @__PURE__ */ track([[0, 1], [0.1, 1.08], [0.2, 0.9], [0.35, 0.95], [0.5, 1], [0.65, 0.96], [0.8, 0.92], [0.9, 1.13], [0.95, 0.97], [1, 1]]),
  sy: /* @__PURE__ */ track([[0, 1], [0.1, 0.88], [0.2, 1.15], [0.35, 1.05], [0.5, 0.94], [0.65, 1.06], [0.8, 1.1], [0.9, 0.84], [0.95, 1.04], [1, 1]]),
  /** Falda: cuánto se ensancha (fracción) y cuánto la arrastra la inercia (unidades, en el eje del cuerpo). */
  spread: /* @__PURE__ */ track([[0, 0], [0.1, 0.14], [0.2, -0.05], [0.35, 0], [0.5, 0], [0.65, 0], [0.8, -0.04], [0.9, 0.28], [0.95, 0.06], [1, 0]]),
  drag: /* @__PURE__ */ track([[0, 0], [0.1, -2], [0.2, 6], [0.35, 4.5], [0.5, 1], [0.65, -3], [0.8, -5.5], [0.9, -3], [0.95, 1.5], [1, 0]]),
};

export interface FlipFrame {
  /** Trayectoria del contenedor `.hop` (unidades del viewBox). */
  x: number;
  y: number;
  /** Giro en el plano (grados). */
  roll: number;
  /** Parte de la deformación que aplica el contenedor `.hop` (en el suelo, anclada a la base). */
  hopX: number;
  hopY: number;
  /** Parte que aplica la pose, a lo largo del eje del cuerpo (en el aire). `hop · pose` = deformación total. */
  poseX: number;
  poseY: number;
  /** Deformación de la cara, ya descontada la que le pone el contenedor `.hop`. */
  faceX: number;
  faceY: number;
  /** Falda: ensanchamiento (fracción) y arrastre vertical (unidades). */
  spread: number;
  drag: number;
  /** 1 = en el suelo (la deformación va en `.hop`), 0 = en el aire (va en la pose). */
  grounded: number;
}

/** Todos los canales del flip en el instante `t` (0 – 1). Pura: es lo que prueban los specs. */
export function flipFrame(t: number, faceK: number = FLIP_FACE_K): FlipFrame {
  const sx = TRACKS.sx(t);
  const sy = TRACKS.sy(t);
  // Peso de «estoy en el suelo»: 1 antes del despegue y tras el aterrizaje, 0 en el aire.
  const grounded = t < 0.5 ? 1 - smoothstep(0.16, 0.3, t) : smoothstep(0.7, 0.84, t);
  const hopX = Math.pow(sx, grounded);
  const hopY = Math.pow(sy, grounded);
  return {
    x: TRACKS.x(t),
    y: TRACKS.y(t),
    roll: TRACKS.roll(t),
    hopX,
    hopY,
    poseX: Math.pow(sx, 1 - grounded),
    poseY: Math.pow(sy, 1 - grounded),
    faceX: (1 + (sx - 1) * faceK) / hopX,
    faceY: (1 + (sy - 1) * faceK) / hopY,
    spread: TRACKS.spread(t),
    drag: TRACKS.drag(t),
    grounded,
  };
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

// ── Falda ─────────────────────────────────────────────────────────────────────────────────────

/** Easing de CSS por nombre → función. Solo los que usa la onda de reposo de las formas. */
function easingFn(name: string): (x: number) => number {
  const bez = (x1: number, y1: number, x2: number, y2: number) => (x: number) => {
    if (x <= 0 || x >= 1) return x;
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = ((ax * t + bx) * t + cx) * t - x;
      const d = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(e) < 1e-5 || Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    t = Math.min(1, Math.max(0, t));
    return ((ay * t + by) * t + cy) * t;
  };
  if (name === 'ease-in-out') return bez(0.42, 0, 0.58, 1);
  if (name === 'ease') return bez(0.25, 0.1, 0.25, 1);
  if (name === 'ease-in') return bez(0.42, 0, 1, 1);
  if (name === 'ease-out') return bez(0, 0, 0.58, 1);
  return (x) => x;
}

/**
 * La silueta de reposo `ms` milisegundos DESPUÉS de ahora. Si la forma tiene onda propia (la sábana
 * del fantasma, los tentáculos), se calcula en qué punto de su ciclo estará; si no, es su `d` fijo.
 * Es lo que permite que la falda del flip arranque y termine exactamente donde está la onda de
 * reposo, sin saltos ni parar la onda.
 */
export function idleDAt(ctx: BotContext, ms: number): string {
  const sh = ctx.shape;
  const base = shapeD(sh);
  const idle = ctx.shapeAnims.find((a) => a.effect?.getTiming().iterations === Infinity);
  if (!idle || !idle.effect) return base;
  const timing = idle.effect.getTiming();
  const dur = Number(timing.duration) || 1;
  const T = (Number(idle.currentTime) || 0) + ms;
  const iter = Math.floor(T / dur);
  const local = T / dur - iter;
  const directed = timing.direction === 'alternate' && iter % 2 === 1 ? 1 - local : local;
  const u = easingFn(String(timing.easing ?? 'linear'))(directed);
  if (sh.dKeys) return pathLerp(sh.dKeys, u);
  if (sh.d2) return pathLerp([base, sh.d2], u);
  return base;
}

/** ¿La silueta se puede deformar con `morphPath`? Solo trazos absolutos de pares (sin H/V/A). */
export const canFlexHem = (d: string | undefined): d is string => !!d && !/[HVAhvaslqtc]/.test(d);

/**
 * Deforma la parte baja de una silueta: la ensancha (`spread`) y la arrastra en vertical (`drag`),
 * con un peso que crece hacia el borde de abajo (la cabeza casi no se mueve). `y0` es dónde empieza
 * la falda y `bottom` su punto más bajo.
 */
export function flexHem(d: string, y0: number, bottom: number, spread: number, drag: number): string {
  if (spread === 0 && drag === 0) return d;
  return morphPath(d, (x, y) => {
    const w = Math.pow(Math.max(0, Math.min(1, (y - y0) / (bottom - y0))), 1.5);
    return [100 + (x - 100) * (1 + spread * w), y + drag * w];
  });
}

/** Límites verticales de un trazo, para saber dónde está la falda. */
export function pathExtent(d: string): { top: number; bottom: number } {
  const ys = [...d.matchAll(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g)].map((m) => Number(m[2]));
  return { top: Math.min(...ys), bottom: Math.max(...ys) };
}

// ── Gesto ─────────────────────────────────────────────────────────────────────────────────────

/** Fotogramas muestreados de una pista de `frames`: uno cada ~18 ms, que es lo que usa `animatePose`. */
const samples = (ms: number): number => Math.max(24, Math.round(ms / 18));

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
  const N = samples(ms);
  const frames = Array.from({ length: N + 1 }, (_, i) => flipFrame(i / N));

  // 1) TRAYECTORIA + deformación en el suelo, en el contenedor `.hop` (anclado a la base).
  play(
    ctx,
    ctx.el.hop,
    frames.map((f, i) => ({
      offset: i / N,
      transform: `translate(${f2(f.x)}px,${f2(f.y)}px) scale(${f3(f.hopX)},${f3(f.hopY)})`,
    })),
    { duration: ms, easing: 'linear' },
  );

  // 2) GIRO + deformación en el aire + cara, en la pose (cada capa del cuerpo). El giro se SUMA a la
  // inclinación de reposo de la forma (el robot descansa a -3°): así el último fotograma (una vuelta
  // completa más tarde) coincide con el reposo y no hay un saltito al terminar.
  const reposo = ctx.pose.roll;
  animatePose(
    ctx,
    (u) => {
      const f = flipFrame(u);
      return { roll: reposo + f.roll, sx: f.poseX, sy: f.poseY, fx: f.faceX, fy: f.faceY };
    },
    ms,
  );

  // 3) FALDA: la parte baja de la silueta reacciona a la inercia (movimiento secundario).
  const base = shapeD(ctx.shape);
  if (canFlexHem(base)) {
    const { top, bottom } = pathExtent(base);
    const y0 = bottom - 0.38 * (bottom - top);
    const M = 36;
    const hem = Array.from({ length: M + 1 }, (_, i) => {
      const f = flipFrame(i / M);
      return { offset: i / M, d: `path("${flexHem(idleDAt(ctx, (i / M) * ms), y0, bottom, f.spread, f.drag)}")` };
    });
    const anim = animateShape(ctx, hem, { duration: ms, easing: 'linear' });
    ctx.shapeAnims.push(anim);
    anim.addEventListener?.('finish', () => (ctx.shapeAnims = ctx.shapeAnims.filter((a) => a !== anim)), { once: true });
  }

  // 4) SOMBRA: se queda en el suelo; su tamaño y opacidad cuentan la altura. Las pieles Mochi la ocultan
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

  // 5) EXPRESIÓN: transiciones cortas cerca de los instantes clave.
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
