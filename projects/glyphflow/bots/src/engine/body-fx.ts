import { morphPath, pathLerp } from '../data/morph';
import type { BotContext } from './context';
import { shapeD } from './shape-view';

/**
 * Deformaciones del CUERPO que comparten los gestos de movimiento (flip, rebotes, giros…): la silueta
 * de reposo en un instante futuro, la falda que se arrastra y los bultos de gel.
 */

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
 * Es lo que permite que la falda del gesto arranque y termine exactamente donde está la onda de
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
 * El trazo en una forma que `morphPath` sabe deformar: absoluto y de pares. Convierte `H`/`V` (Tofu) en
 * `L` sin cambiar cómo se dibuja; con arcos o relativos devuelve `undefined` (esa silueta no se deforma).
 */
export function flexD(d: string | undefined): string | undefined {
  if (!d) return undefined;
  if (!/[HVAhvaslqtc]/.test(d)) return d;
  if (/[^MLHVCZ\d\s.,-]/.test(d)) return undefined; // relativos, arcos, cuadráticas: fuera
  const tok = d.match(/[MLHVCZ]|-?\d*\.?\d+/g) ?? [];
  let out = '';
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < tok.length; ) {
    const c = tok[i++];
    if (c === 'Z') out += 'Z';
    else if (c === 'H') {
      cx = +tok[i++];
      out += `L${cx} ${cy}`;
    } else if (c === 'V') {
      cy = +tok[i++];
      out += `L${cx} ${cy}`;
    } else if (c === 'M' || c === 'L') {
      cx = +tok[i++];
      cy = +tok[i++];
      out += `${c}${cx} ${cy}`;
    } else if (c === 'C') {
      const n = [+tok[i], +tok[i + 1], +tok[i + 2], +tok[i + 3], +tok[i + 4], +tok[i + 5]];
      i += 6;
      cx = n[4];
      cy = n[5];
      out += `C${n.join(' ')}`;
    }
  }
  return out;
}

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

/**
 * Bultos de gel: desplaza cada punto del contorno en radial desde el centro `(cx, cy)`, con tres y
 * cinco lóbulos que viajan en sentidos contrarios. Con `amp = 0` devuelve el trazo igual. Conserva la
 * estructura del `d` (se puede interpolar y animar) y, como los puntos de control se mueven junto
 * con los de ancla, la silueta sigue lisa: bultos suaves, no picos.
 */
export function gelBody(d: string, cx: number, cy: number, amp: number, phase: number): string {
  if (amp === 0) return d;
  return morphPath(d, (x, y) => {
    const dx = x - cx;
    const dy = y - cy;
    const r = Math.hypot(dx, dy) || 1;
    const th = Math.atan2(dy, dx);
    const k = amp * (0.62 * Math.sin(3 * th + phase) + 0.38 * Math.sin(5 * th - 1.3 * phase + 1));
    return [x + (k * dx) / r, y + (k * dy) / r];
  });
}

/** Límites verticales de un trazo, para saber dónde está la falda. */
export function pathExtent(d: string): { top: number; bottom: number } {
  const ys = [...d.matchAll(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g)].map((m) => Number(m[2]));
  return { top: Math.min(...ys), bottom: Math.max(...ys) };
}
