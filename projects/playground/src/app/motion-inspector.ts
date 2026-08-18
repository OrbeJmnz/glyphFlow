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
  propiedadesAnimadas: string[];
  /** `d` es la señal de costo caro (redibuja el path). `transform`/`opacity` son baratas: el
   *  compositor las anima sin repintar. Ver el resto de `propiedadesAnimadas` para el detalle. */
  animaD: boolean;
  autoDraw: boolean;
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
  for (const [, track] of tracks) {
    for (const p of propiedadesDe(track.keyframes)) propiedades.add(p);
    const r = rotacionMaximaDe(track.keyframes);
    if (r > rotacionMaxima) rotacionMaxima = r;
  }

  const solapados: TrackOverlap[] = [];
  for (let i = 0; i < tracks.length; i++) {
    for (let j = i + 1; j < tracks.length; j++) {
      if (seSolapan(intervaloDe(tracks[i][1]), intervaloDe(tracks[j][1]))) {
        solapados.push({ a: tracks[i][0], b: tracks[j][0] });
      }
    }
  }

  const esSoloAutoDraw = !!chor.autoDraw && tracks.length === 0;
  const duracionMs = esSoloAutoDraw
    ? null
    : tracks.reduce((max, [, t]) => Math.max(max, intervaloDe(t)[1]), 0);

  return {
    variante,
    duracionMs,
    tracksSolapados: solapados,
    rotacionMaximaDeg: Math.round(rotacionMaxima),
    propiedadesAnimadas: [...propiedades].sort(),
    animaD: propiedades.has('d'),
    autoDraw: !!chor.autoDraw,
    reverseOnLeave: !!chor.reverseOnLeave,
  };
}

export function analizarIcono(nombre: string, def: AnimatedIconDef): MotionReport {
  return {
    icono: nombre,
    variantes: Object.entries(def.animations).map(([variante, chor]) => analizarVariante(variante, chor)),
  };
}
