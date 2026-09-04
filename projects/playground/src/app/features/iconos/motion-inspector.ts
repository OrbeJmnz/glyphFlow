import { AnimatedIconDef, IconChoreography, MotionTrack } from 'glyphflow';

/**
 * Motion Inspector: análisis puro sobre datos que ya existen en `MotionTrack`/`IconChoreography`.
 * Cero capacidad nueva del motor — un linter determinista de la coreografía, no una animación que
 * corre y se juzga a ojo. Por eso vive aquí como funciones sin Angular: se puede probar como
 * cualquier función pura, sin `TestBed` ni DOM.
 */

export interface TrackOverlap {
  a: string;
  b: string;
}

export interface VariantReport {
  variante: string;
  /** `null` cuando la variante es `autoDraw`: la duración la calcula el componente en vivo según
   *  la longitud de trazo (`getTotalLength()`), no existe un número fijo que reportar aquí. */
  duracionMs: number | null;
  tracksSolapados: TrackOverlap[];
  rotacionMaximaDeg: number;
  /**
   * Cuanto se aleja del reposo la POSE FINAL, en unidades del viewBox de 24. Es la medida que le
   * falta a un `hold`: como va con `fill: 'forwards'`, su ultimo keyframe es lo que queda en
   * pantalla, y si esa pose casi no se distingue del reposo la variante existe pero no se ve.
   * Para las variantes que vuelven al origen el numero es ~0 y no significa nada -- solo tiene
   * sentido leerlo en las que retienen.
   */
  poseFinalUnidades: number;
  propiedadesAnimadas: string[];
  /** `d` es la señal de costo caro (redibuja el path). `transform`/`opacity` son baratas: el
   *  compositor las anima sin repintar. Ver el resto de `propiedadesAnimadas` para el detalle. */
  animaD: boolean;
  autoDraw: boolean;
  /** La materialización GENÉRICA, la que `icon()` le cuelga a los 1767. Distinguirla del `reveal`
   *  curado a mano es lo que deja a los filtros seguir acotando: si `reveal` contara para todos,
   *  el filtro casaría con el catálogo entero y dejaría de servir. */
  autoReveal: boolean;
  /** Mismo criterio que `autoReveal`, para el `flicker` GENÉRICO que `icon()` cuelga en los 1767. */
  autoFlicker: boolean;
  reverseOnLeave: boolean;
}

export interface MotionReport {
  icono: string;
  variantes: VariantReport[];
}

const CLAVES_NO_CSS = new Set(['offset', 'easing', 'composite']);

function propiedadesDe(keyframes: Keyframe[]): Set<string> {
  const props = new Set<string>();
  for (const kf of keyframes) {
    for (const clave of Object.keys(kf)) {
      if (!CLAVES_NO_CSS.has(clave)) props.add(clave);
    }
  }
  return props;
}

function rotacionMaximaDe(keyframes: Keyframe[]): number {
  let max = 0;
  for (const kf of keyframes) {
    const t = kf['transform'];
    if (typeof t !== 'string') continue;
    for (const m of t.matchAll(/rotate\(\s*(-?[\d.]+)deg\s*\)/g)) {
      const v = Math.abs(Number(m[1]));
      if (v > max) max = v;
    }
  }
  return max;
}

/*
 * Un transform, convertido a "cuanto se movio el pixel que mas se movio", en unidades del
 * viewBox. Sirve para comparar peras con manzanas: 3 grados de giro, un scale de 1.04 y medio
 * pixel de desplazamiento son magnitudes distintas que se PERCIBEN parecido -- es decir, nada.
 * El radio caracteristico de 8 sale de la geometria real de Lucide: casi todo el dibujo vive
 * entre 2 y 22, o sea a unas 8-10 unidades del centro.
 */
const RADIO_CARACTERISTICO = 8;

function desviacionDe(transform: unknown): number {
  if (typeof transform !== 'string' || transform === 'none') return 0;
  let total = 0;
  for (const m of transform.matchAll(/(\w+)\(([^)]*)\)/g)) {
    const nombre = m[1];
    const n = (m[2].match(/-?\d*\.?\d+/g) ?? []).map(Number);
    if (!n.length) continue;
    if (nombre === 'translate') total += Math.hypot(n[0], n[1] ?? 0);
    else if (nombre === 'translateX' || nombre === 'translateY') total += Math.abs(n[0]);
    else if (nombre === 'scale') {
      total += Math.max(...n.map((v) => Math.abs(v - 1))) * RADIO_CARACTERISTICO;
    } else if (nombre === 'scaleX' || nombre === 'scaleY') {
      total += Math.abs(n[0] - 1) * RADIO_CARACTERISTICO;
    } else if (nombre === 'rotate' || nombre.startsWith('skew')) {
      total += ((Math.abs(n[0]) * Math.PI) / 180) * RADIO_CARACTERISTICO;
    }
  }
  return total;
}

/** La opacidad tambien retiene: se pesa a 4 unidades por punto para que entre en la misma escala. */
function poseFinalDe(keyframes: Keyframe[]): number {
  const kf = keyframes.at(-1);
  if (!kf) return 0;
  const opacidad = kf['opacity'];
  const porOpacidad = opacidad === undefined ? 0 : Math.abs(1 - Number(opacidad)) * 4;
  return Math.max(desviacionDe(kf['transform']), Number.isFinite(porOpacidad) ? porOpacidad : 0);
}

/** Intervalo activo de un track en el reloj de la variante: [delay, delay + duration]. */
function intervaloDe(track: MotionTrack): [number, number] {
  const delay = Number(track.options.delay ?? 0) || 0;
  const duracion = Number(track.options.duration ?? 0) || 0;
  return [delay, delay + duracion];
}

function seSolapan([a0, a1]: [number, number], [b0, b1]: [number, number]): boolean {
  return a0 < b1 && b0 < a1;
}

/** Todos los tracks con nombre de una coreografía: `root` y cada `shapes[i]`, en ese orden. */
function tracksCon(chor: IconChoreography): [string, MotionTrack][] {
  const out: [string, MotionTrack][] = [];
  if (chor.root) out.push(['root', chor.root]);
  for (const [indice, track] of Object.entries(chor.shapes ?? {})) {
    out.push([`shapes[${indice}]`, track]);
  }
  return out;
}

function analizarVariante(variante: string, chor: IconChoreography): VariantReport {
  const tracks = tracksCon(chor);
  const propiedades = new Set<string>();
  let rotacionMaxima = 0;
  let poseFinal = 0;
  for (const [, track] of tracks) {
    for (const p of propiedadesDe(track.keyframes)) propiedades.add(p);
    const r = rotacionMaximaDe(track.keyframes);
    if (r > rotacionMaxima) rotacionMaxima = r;
    const p = poseFinalDe(track.keyframes);
    if (p > poseFinal) poseFinal = p;
  }

  const solapados: TrackOverlap[] = [];
  for (let i = 0; i < tracks.length; i++) {
    for (let j = i + 1; j < tracks.length; j++) {
      if (seSolapan(intervaloDe(tracks[i][1]), intervaloDe(tracks[j][1]))) {
        solapados.push({ a: tracks[i][0], b: tracks[j][0] });
      }
    }
  }

  // El `reveal` GENÉRICO, el que `icon()` le cuelga a los 1767. Es el único que se llama así y no
  // trae nada propio: ni `root`, ni figuras, ni trazo. Uno curado a mano siempre trae algo — lo
  // exige el spec «toda variante mueve algo» —, así que la ausencia lo identifica sin ambigüedad.
  //
  // Se DEDUCE en vez de leer `chor.autoReveal`, y no por gusto: este archivo lo typechequea el
  // playground contra el glyphflow PUBLICADO, no contra el del workspace. Leer un campo que aún no
  // existe en el paquete publicado deja el typecheck en rojo hasta la siguiente release, y esa
  // frontera es a propósito (regla 4: el sitio consume del registro, no de `dist/`).
  const autoReveal = variante === 'reveal' && tracks.length === 0 && !chor.autoDraw;
  // Mismo criterio, para `flicker`.
  const autoFlicker = variante === 'flicker' && tracks.length === 0 && !chor.autoDraw;

  // Sin tracks propios no hay reloj que leer: la duración la calcula el componente en vivo, midiendo
  // las figuras (`draw`) o con su propio compás (`reveal`/`flicker`). Devolver 0 sería mentir con precisión.
  const esSoloAutomatica = (!!chor.autoDraw || autoReveal || autoFlicker) && tracks.length === 0;
  const duracionMs = esSoloAutomatica
    ? null
    : tracks.reduce((max, [, t]) => Math.max(max, intervaloDe(t)[1]), 0);

  return {
    variante,
    duracionMs,
    tracksSolapados: solapados,
    rotacionMaximaDeg: Math.round(rotacionMaxima),
    poseFinalUnidades: Math.round(poseFinal * 100) / 100,
    propiedadesAnimadas: [...propiedades].sort(),
    animaD: propiedades.has('d'),
    autoDraw: !!chor.autoDraw,
    autoReveal,
    autoFlicker,
    reverseOnLeave: !!chor.reverseOnLeave,
  };
}

export function analizarIcono(nombre: string, def: AnimatedIconDef): MotionReport {
  return {
    icono: nombre,
    variantes: Object.entries(def.animations).map(([variante, chor]) =>
      analizarVariante(variante, chor),
    ),
  };
}
