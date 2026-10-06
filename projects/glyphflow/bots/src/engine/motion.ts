import { f2, f3 } from '../data/color';
import { shadowFor } from './actions';
import { morphPath } from '../data/morph';
import { flexD, flexHem, gelBody, idleDAt, pathExtent } from './body-fx';
import type { BotContext } from './context';
import { animateShape } from './outlines';
import { S } from './math';
import { animatePose } from './pose-motion';
import type { GfBotPose } from './pose';
import { shapeD } from './shape-view';
import { later, play } from './timing';
import { track, type GfTrackNode } from './track';

/**
 * PRIMITIVAS DE MOVIMIENTO.
 *
 * Un gesto físico no es `translate + rotate + scale`: son varios canales con su propia curva
 * (trayectoria, giro, deformación del cuerpo, falda, gel) más la cara y la sombra, que van aparte.
 * Aquí vive lo que comparten TODOS los gestos:
 *
 *  - la PARTITURA (`Score`): nodos `[t, valor]` por canal, que se arman con las primitivas de abajo
 *    (`anticipate`, `launch`, `impact`, `bounce`, `wobble`…) y `score()` junta y cierra en reposo;
 *  - el EJECUTOR (`runGesture`): reparte la partitura entre el contenedor `.hop` (trayectoria y squash
 *    en el suelo, anclado a la base), la pose (giro y squash en el aire, a lo largo del eje del cuerpo)
 *    y la silueta (falda + gel). La cara, la sombra y los efectos los pone cada gesto con `after`.
 *
 * Todas las primitivas aceptan `intensity` (1 = como está escrito, 0 = reposo): la misma física sirve
 * para un bot grande o uno tímido, y la «personalidad» de cada forma es solo otra intensidad.
 */

/** Canales de la partitura. `y` negativo = arriba; `roll` en grados; `sx`/`sy` multiplican; el resto, unidades del viewBox. */
export type Channel = 'x' | 'y' | 'roll' | 'yaw' | 'sx' | 'sy' | 'spread' | 'drag' | 'gel';
export type Score = Partial<Record<Channel, GfTrackNode[]>>;
export type Keys = Partial<Record<Channel, number>>;

const REST: Record<Channel, number> = { x: 0, y: 0, roll: 0, yaw: 0, sx: 1, sy: 1, spread: 0, drag: 0, gel: 0 };
const CHANNELS = Object.keys(REST) as Channel[];

// ── Primitivas: cada una devuelve un trozo de partitura ───────────────────────────────────────

/**
 * Un instante clave: fija los canales indicados en `t`. Las desviaciones del reposo se escalan con
 * `intensity` (los giros `roll` y `yaw` no: una vuelta es una vuelta). Las demás primitivas son este mismo gesto
 * con nombre.
 */
export function key(t: number, v: Keys, intensity = 1): Score {
  const out: Score = {};
  for (const c of CHANNELS) {
    const val = v[c];
    if (val === undefined) continue;
    out[c] = [[t, c === 'roll' || c === 'yaw' ? val : REST[c] + (val - REST[c]) * intensity]];
  }
  return out;
}

/** Vuelve al reposo (todos los canales, salvo los que se indiquen) en `t`. */
export const settle = (t: number, keep: Keys = {}): Score => key(t, { ...REST, ...keep });
/** Acumula energía antes de salir: el cuerpo baja y se ensancha. */
export const anticipate = key;
/** Aplasta el cuerpo (impacto, tomar carrerilla). */
export const squash = key;
/** Estira el cuerpo (despegue, caída antes del golpe). */
export const stretch = key;
/** Se pasa un poco del reposo antes de asentar. */
export const overshoot = key;
/** Despegue: la energía se libera. */
export const launch = key;
/** El golpe contra el suelo. */
export const impact = key;

/** Altura (`h` > 0 hacia arriba) en `t`. */
export const jump = (t: number, h: number, intensity = 1): Score => key(t, { y: -h }, intensity);
/** Giro acumulado en grados en `t` (en el plano). */
export const rotate = (t: number, deg: number): Score => key(t, { roll: deg });
/** Giro sobre el eje vertical, en radianes, en `t`: da la sensación de girar el volumen y no la imagen. */
export const spin = (t: number, rad: number): Score => key(t, { yaw: rad });
/** Falda: ensanchamiento (fracción) y arrastre (unidades, en el eje del cuerpo). */
export const drag = (t: number, spread: number, pull: number, intensity = 1): Score => key(t, { spread, drag: pull }, intensity);

/**
 * Rebotes que pierden energía: `n` saltos, cada uno `decay` veces el anterior, el primero de altura
 * `h`, repartidos entre `t0` y `t1`. Devuelve alturas y un squash suave en cada contacto: grande →
 * pequeño → asienta. Cada rebote dura menos que el anterior (así suena a pelota y no a un reloj).
 */
export function bounce(t0: number, t1: number, h: number, n: number, decay = 0.42, intensity = 1): Score {
  const w = Array.from({ length: n }, (_, i) => Math.pow(Math.sqrt(decay), i));
  const sum = w.reduce((a, b) => a + b, 0);
  const parts: Score[] = [];
  let t = t0;
  w.forEach((wi, i) => {
    const dur = ((t1 - t0) * wi) / sum;
    const alt = h * Math.pow(decay, i);
    parts.push(jump(t + dur / 2, alt, intensity));
    parts.push(key(t + dur / 2, { sx: 1 - 0.04 * (alt / h), sy: 1 + 0.06 * (alt / h) }, intensity));
    t += dur;
    parts.push(key(t, { y: 0, sx: 1 + 0.1 * (alt / h), sy: 1 - 0.12 * (alt / h) }, intensity));
  });
  return score(...parts);
}

/**
 * Oscilación que se apaga: `amps` son las amplitudes sucesivas (alternando signo) del canal `ch`,
 * una cada `span / amps.length` a partir de `t0`, y termina en reposo. `+8, -6, +4, -2, +1, 0` →
 * `wobble(0.8, 0.2, 'roll', [8, -6, 4, -2, 1])`. Con `lag` se retrasa (otra región del cuerpo).
 */
export function wobble(t0: number, span: number, ch: Channel, amps: number[], intensity = 1, lag = 0): Score {
  const step = span / amps.length;
  const nodes: GfTrackNode[] = amps.map((a, i) => [t0 + lag + step * (i + 1), REST[ch] + a * intensity]);
  return { [ch]: [[t0 + lag, REST[ch]], ...nodes, [t0 + lag + span + step, REST[ch]]] } as Score;
}

/** Arrastre secundario de una región del cuerpo: el mismo `wobble` en `drag`, retrasado. */
export const secondaryMotion = (t0: number, span: number, amps: number[], intensity = 1, lag = 0.03): Score =>
  wobble(t0, span, 'drag', amps, intensity, lag);

/**
 * Junta trozos de partitura: concatena los nodos de cada canal, los ordena por tiempo (si dos caen en
 * el mismo `t`, gana el último) y cierra en reposo en 0 y 1 los canales que no los traigan.
 */
export function score(...parts: Score[]): Score {
  const out: Score = {};
  for (const p of parts) for (const c of CHANNELS) if (p[c]) (out[c] ??= []).push(...p[c]!);
  for (const c of CHANNELS) {
    const nodes = out[c];
    if (!nodes) continue;
    const byT = new Map<number, number>();
    for (const [t, v] of nodes) byT.set(t, v);
    if (!byT.has(0)) byT.set(0, REST[c]);
    if (!byT.has(1)) byT.set(1, REST[c]);
    out[c] = [...byT.entries()].sort((a, b) => a[0] - b[0]);
  }
  return out;
}

// ── Campo de deformación por región ───────────────────────────────────────────────────────────

/**
 * Un término del campo: cuánto se desplaza cada región de la silueta, con su propio retraso. `amp(t)` es
 * la historia de UN punto (una pista, con sus overshoots) y `lag` cuánto tarda la perturbación en
 * cruzar el cuerpo (fracción del gesto): lo que viaja es la deformación, no el cuerpo entero.
 */
export interface FieldTerm {
  kind: 'shear' | 'wave' | 'taper' | 'bulge' | 'melt';
  amp: (t: number) => number;
  lag: number;
  /** Solo `melt`: retraso extra por distancia al centro (los bordes llegan después que el medio). */
  lagX?: number;
  /** Solo `melt`: proporción de alto y de ancho a la que llega con `amp` = 1 (0.55 = el 55 % del alto). */
  h?: number;
  w?: number;
  /** Un gesto que cambia la silueta a propósito (un charco) no se modera con `GfBotShape.flex`. */
  fixed?: boolean;
  /** Solo `wave`: de qué lado entra (1 = izquierda → derecha, -1 = al revés). */
  dir?: 1 | -1;
}

/**
 * Cizalla que baja por el cuerpo: la cabeza se va hacia un lado (`amp` unidades) y la base responde
 * `lag` después, anclada al suelo. Jelly wobble, golpe lateral, esquiva.
 */
export const shear = (amp: (t: number) => number, lag = 0.05): FieldTerm => ({ kind: 'shear', amp, lag });
/**
 * Onda que cruza el cuerpo de lado a lado: donde pasa, la parte de arriba baja `amp` (fracción de la
 * altura) y vuelve. El centro del bot no se mueve, lo que cambia es la geometría.
 */
export const wave = (amp: (t: number) => number, lag = 0.5, dir: 1 | -1 = 1): FieldTerm => ({ kind: 'wave', amp, lag, dir });
/**
 * Estrechamiento por altura: `amp` > 0 ensancha la cabeza y estrecha la base (el giro del tornado);
 * `amp` < 0 al revés. `lag` retrasa la base respecto a la cabeza.
 */
export const taper = (amp: (t: number) => number, lag = 0.04): FieldTerm => ({ kind: 'taper', amp, lag });

/** Dónde queda el punto `(x, y)` de la silueta con el campo aplicado en `t`. `k` escala la amplitud (ver `GfBotShape.flex`). */
function fieldPoint(
  field: readonly FieldTerm[],
  t: number,
  x: number,
  y: number,
  top: number,
  alto: number,
  kBase: number,
): [number, number] {
  let k = kBase;
  const v = Math.min(1, Math.max(0, (y - top) / alto));
  const u = Math.min(1, Math.max(-1, (x - 100) / 60));
  let X = x;
  let Y = y;
  for (const f of field) {
    const k0 = k;
    k = f.fixed ? 1 : k0;
    if (f.kind === 'shear') {
      // la base se queda: el peso crece hacia arriba, y la perturbación llega más tarde cuanto más abajo
      X += f.amp(t - f.lag * v) * (1 - 0.85 * v) * k;
    } else if (f.kind === 'wave') {
      const llegada = f.dir === -1 ? (1 - u) / 2 : (u + 1) / 2;
      const h = f.amp(t - f.lag * llegada) * Math.pow(1 - v, 0.9) * k;
      Y += h * alto; // la parte de arriba baja donde pasa la onda
      X += h * alto * 0.25 * u; // y abulta un poco hacia los lados
    } else if (f.kind === 'melt') {
      const p = f.amp(t - f.lag * v - (f.lagX ?? 0) * Math.abs(u)) * k;
      const bottom = top + alto;
      Y = bottom - (bottom - Y) * (1 - p * (1 - (f.h ?? 0.55)));
      X = 100 + (X - 100) * (1 + p * ((f.w ?? 1.17) - 1) * (0.7 + 0.3 * v)); // el borde de abajo se abre más
    } else if (f.kind === 'bulge') {
      const a = f.amp(t - f.lag * v) * k;
      X = 100 + (X - 100) * (1 + a * (1 - 0.45 * v)); // más ancho arriba que abajo
      const bottom = top + alto;
      Y = bottom - (bottom - Y) * (1 + a * 0.9); // y más alto, con la base en el suelo
    } else {
      const a = f.amp(t - f.lag * v) * k;
      X = 100 + (X - 100) * (1 + a * (0.5 - v));
    }
    k = k0;
  }
  return [X, Y];
}

/**
 * Hinchazón: el cuerpo crece (`amp` = fracción, 0.1 = +10 %) con la base anclada al suelo. La cabeza crece más que la
 * base, como un globo que se llena desde arriba; con `amp` < 0 se desinfla. `lag` retrasa la base respecto a la cabeza.
 */
export const bulge = (amp: (t: number) => number, lag = 0.02): FieldTerm => ({ kind: 'bulge', amp, lag });

/**
 * Derretirse: el cuerpo se aplana (`h`) y se ensancha (`w`) hasta un charco cuando `amp` llega a 1, con la base en el
 * suelo. La cabeza colapsa primero y la perturbación baja (`lag` por altura); al volver a subir el centro llega antes que
 * los bordes (`lagX`). Con `amp` < 0 se pasa de alto (un estirón). No lo modera `flex`: es el punto del gesto.
 */
export const melt = (amp: (t: number) => number, o: { lag?: number; lagX?: number; h?: number; w?: number } = {}): FieldTerm => ({
  kind: 'melt', amp, lag: o.lag ?? 0.06, lagX: o.lagX ?? 0.05, h: o.h ?? 0.55, w: o.w ?? 1.2, fixed: true,
});

/** Aplica el campo en el instante `t` a una silueta (`top`/`bottom` = sus límites verticales; `k` escala la amplitud). */
export function applyField(d: string, field: readonly FieldTerm[], t: number, top: number, bottom: number, k = 1): string {
  const alto = bottom - top || 1;
  let suma = 0;
  for (const f of field) {
    suma += Math.abs(f.amp(t)) + Math.abs(f.amp(t - f.lag * 0.5)) + Math.abs(f.amp(t - f.lag));
    if (f.lagX) suma += Math.abs(f.amp(t - f.lagX)) + Math.abs(f.amp(t - f.lagX - f.lag));
  }
  if (suma * (field.some((f) => f.fixed) ? 1 : k) < 1e-4) return d;
  return morphPath(d, (x, y) => fieldPoint(field, t, x, y, top, alto, k));
}

/**
 * Cuánto se desplaza una parte del cuerpo que NO es parte del trazo (la cara, el copete) cuando el campo mueve la
 * silueta: `v` = a qué altura vive (0 = arriba del todo, 1 = la base). Sirve para que viaje con ella.
 */
export function fieldOffset(field: readonly FieldTerm[], t: number, v: number, top: number, bottom: number, k = 1): [number, number] {
  const alto = bottom - top || 1;
  const y = top + v * alto;
  const [X, Y] = fieldPoint(field, t, 100, y, top, alto, k);
  return [X - 100, Y - y];
}

// ── Gesto ─────────────────────────────────────────────────────────────────────────────────────

export interface MotionFrame {
  /** Trayectoria del contenedor `.hop` (unidades del viewBox). */
  x: number;
  y: number;
  /** Giro en el plano (grados). */
  roll: number;
  /** Giro sobre el eje vertical (radianes), sumado a la vista de reposo. */
  yaw: number;
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
  /** Bultos de gel (unidades). */
  gel: number;
  /** 1 = en el suelo (la deformación va en `.hop`), 0 = en el aire (va en la pose). */
  grounded: number;
}

export interface GestureDef {
  score: Score;
  /** Peso de «estoy en el suelo» en `t`: 1 apoyado, 0 en el aire. Por defecto, siempre apoyado. */
  grounded?: (t: number) => number;
  /** Cuánto de la deformación del cuerpo recibe la cara (por defecto 0.4: los ojos no se vuelven mancha). */
  faceK?: number;
  /** Fase de los bultos de gel en `t` (por defecto, no viajan). */
  gelPhase?: (t: number) => number;
  /** Campo de deformación por región (ver `shear`, `wave`, `taper`): la silueta se mueve distinto arriba que abajo, a izquierda que a derecha. */
  field?: FieldTerm[];
  /** Dónde empieza la falda, como fracción de la altura de la silueta contada desde abajo (por defecto 0.38). */
  hemFrom?: number;
}

/** Las pistas de una partitura como funciones de `t`. Se construyen por gesto, no a nivel de módulo. */
export function tracksOf(s: Score): Record<Channel, (t: number) => number> {
  const out = {} as Record<Channel, (t: number) => number>;
  for (const c of CHANNELS) out[c] = s[c] ? track(s[c]!) : () => REST[c];
  return out;
}

/** Todos los canales del gesto en el instante `t`. Pura: es lo que prueban los specs. */
export function frameAt(def: GestureDef, tr: Record<Channel, (t: number) => number>, t: number): MotionFrame {
  const sx = tr.sx(t);
  const sy = tr.sy(t);
  const grounded = def.grounded ? def.grounded(t) : 1;
  const hopX = Math.pow(sx, grounded);
  const hopY = Math.pow(sy, grounded);
  const k = def.faceK ?? 0.4;
  return {
    x: tr.x(t),
    y: tr.y(t),
    roll: tr.roll(t),
    yaw: tr.yaw(t),
    hopX,
    hopY,
    poseX: Math.pow(sx, 1 - grounded),
    poseY: Math.pow(sy, 1 - grounded),
    faceX: (1 + (sx - 1) * k) / hopX,
    faceY: (1 + (sy - 1) * k) / hopY,
    spread: tr.spread(t),
    drag: tr.drag(t),
    gel: tr.gel(t),
    grounded,
  };
}

/** Fotogramas que se muestrean de una pista de `ms`: uno cada ~18 ms, que es lo que usa `animatePose`. */
export const samples = (ms: number): number => Math.max(24, Math.round(ms / 18));

/**
 * Reproduce un gesto: trayectoria + deformación en el suelo (`.hop`), giro + deformación en el aire +
 * cara (pose) y silueta (falda y gel). Devuelve la función de fotogramas por si el gesto la necesita
 * para el resto de sus canales (sombra, ojos, boca, efectos).
 */
export function runGesture(ctx: BotContext, def: GestureDef, ms: number): (t: number) => MotionFrame {
  const tr = tracksOf(def.score);
  const at = (t: number) => frameAt(def, tr, t);
  const N = samples(ms);
  const frames = Array.from({ length: N + 1 }, (_, i) => at(i / N));

  // 1) TRAYECTORIA + deformación en el suelo, en `.hop` (anclado a la base).
  play(
    ctx,
    ctx.el.hop,
    frames.map((f, i) => ({
      offset: i / N,
      transform: `translate(${f2(f.x)}px,${f2(f.y)}px) scale(${f3(f.hopX)},${f3(f.hopY)})`,
    })),
    { duration: ms, easing: 'linear' },
  );

  // 2) GIRO + deformación en el aire + cara, en la pose. El giro se SUMA a la inclinación de reposo de
  // la forma (el robot descansa a -3°): así el último fotograma coincide con el reposo, sin saltito.
  const reposo = ctx.pose.roll;
  const conGiro = !!def.score.yaw;
  const flex = ctx.shape.flex ?? 1;
  const base = flexD(shapeD(ctx.shape));
  const ext = base ? pathExtent(base) : null;
  const campo = def.field?.length && ext ? def.field : null;
  animatePose(
    ctx,
    (u) => {
      const f = at(u);
      const pose: GfBotPose = { roll: reposo + f.roll, sx: f.poseX, sy: f.poseY, fx: f.faceX, fy: f.faceY };
      if (campo && ext) {
        // La cara y el copete viven en el cuerpo: van con la región donde están (cara a media altura, copete arriba).
        const vc = Math.min(1, Math.max(0, (ctx.shape.cy - ext.top) / (ext.bottom - ext.top)));
        const [ox, oy] = fieldOffset(campo, u, vc, ext.top, ext.bottom, flex);
        const [ax, ay] = fieldOffset(campo, u, 0, ext.top, ext.bottom, flex);
        Object.assign(pose, { ox, oy, ax, ay });
      }
      return conGiro ? { ...pose, yaw: ctx.view + f.yaw } : pose;
    },
    ms,
  );

  // 3) SILUETA: la falda reacciona a la inercia y el cuerpo se vuelve gel. Solo si el trazo se deja
  // deformar (absoluto, sin arcos); los demás se quedan con la deformación de cuerpo entero.
  const usaSilueta = !!(def.score.spread || def.score.drag || def.score.gel || def.field?.length);
  if (usaSilueta && base) {
    const { top, bottom } = pathExtent(base);
    const y0 = bottom - (def.hemFrom ?? 0.38) * (bottom - top);
    const M = 48;
    const escala = (ctx.shape.R ?? 60) / 60; // los bultos crecen con el cuerpo
    const fase = def.gelPhase ?? (() => 0);
    const hem = Array.from({ length: M + 1 }, (_, i) => {
      const t = i / M;
      const f = at(t);
      const falda = flexHem(flexD(idleDAt(ctx, t * ms)) ?? base, y0, bottom, f.spread * flex, f.drag * flex);
      const cuerpo = gelBody(falda, 100, ctx.shape.cy, f.gel * escala * flex, fase(t));
      const d = def.field?.length ? applyField(cuerpo, def.field, t, top, bottom, flex) : cuerpo;
      return { offset: t, d: `path("${d}")` };
    });
    const anim = animateShape(ctx, hem, { duration: ms, easing: 'linear' });
    ctx.shapeAnims.push(anim);
    anim.addEventListener?.('finish', () => (ctx.shapeAnims = ctx.shapeAnims.filter((a) => a !== anim)), { once: true });
  }
  return at;
}

// ── Lo que comparten los gestos alrededor de la partitura ─────────────────────────────────────

/**
 * Duración del gesto `id`. Se lee de la variable CSS `--gf-bot-<id>-duration` (o `--<id>-duration`) del
 * bot o de cualquier ancestro: `1000ms`, `1.2s`. Sin variable, `def` ms. Siempre entre `min` y `max`.
 */
export function gestureDuration(ctx: BotContext, id: string, def: number, min = 300, max = 4000): number {
  const cs = getComputedStyle(ctx.svg);
  const raw = (cs.getPropertyValue(`--gf-bot-${id}-duration`) || cs.getPropertyValue(`--${id}-duration`)).trim();
  const m = /^([\d.]+)\s*(ms|s)$/.exec(raw);
  const ms = m ? parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1) : def;
  return Math.min(max, Math.max(min, ms));
}

/** Movimiento reducido: sin recorrido ni giro. Un saltito con squash, stretch y un rebote, en 300–450 ms. */
export function reducedHop(ctx: BotContext, ms: number): number {
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
  return d;
}

/**
 * Enciende la sombra durante el gesto: las pieles Mochi la ocultan (flotan), así que se muestra con
 * `data-flip` y se apaga cuando terminan sus animaciones (o, sin WAAPI, pasado el tiempo).
 */
export function shadowFlag(ctx: BotContext, ms: number): void {
  ctx.svg.dataset['flip'] = '';
  const apagar = () => delete ctx.svg.dataset['flip'];
  // (jsdom no trae getAnimations: sin él la bandera se apaga sola al terminar el gesto, vía `later`)
  const anims = typeof ctx.el.shadow.getAnimations === 'function' ? ctx.el.shadow.getAnimations() : [];
  for (const a of anims) a.finished.then(apagar, apagar);
  if (!anims.length) later(ctx, apagar, ms + 50);
}

/**
 * Sombra que sigue al gesto: más chica y más tenue cuanto más alto (`y` hasta `alto` unidades), más
 * ancha al aplastarse en el suelo. No rota: se calcula de la trayectoria, no del giro. La opacidad
 * sale y entra con un fundido (en reposo estas formas no tienen sombra) y escala ×1.8 sobre `base`.
 */
export function shadowByHeight(ctx: BotContext, at: (t: number) => MotionFrame, ms: number, alto: number, base = 0.3): void {
  const N = 40;
  const kf = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const f = at(t);
    const h = Math.max(0, Math.min(1, -f.y / alto));
    const borde = Math.min(1, t / 0.06, (1 - t) / 0.06);
    const ancho = (1.04 - 0.58 * h) * (1 + 0.7 * (f.hopX - 1));
    return { offset: t, transform: `translateX(${f.x.toFixed(1)}px) ${S(+ancho.toFixed(3))}`, opacity: +(1.8 * base * (1 - 0.7 * h) * borde).toFixed(3) };
  });
  shadowFor(ctx, kf, ms);
  shadowFlag(ctx, ms);
}
