import { AnimatedIconDef, IconShape } from './animated-icon.model';

/**
 * Herramientas de verificación de los curados — las comparten el barrido
 * (`curated-icons.spec.ts`) y el generador del lock (`npm run curated:lock`), para que el test y
 * el comando que lo apaga nunca opinen distinto sobre la misma geometría.
 *
 * **No se exporta en `public-api.ts`**: es tooling interno, el consumidor jamás lo necesita.
 */

/** FNV-1a de 32 bits. Se corre dos veces con semillas distintas para llegar a 64 bits sin deps. */
function fnv1a(input: string, seed: number): string {
  let h = seed >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/**
 * Normaliza igual que `scripts/lucide-diff-report.mjs`: los números se comparan como números
 * (`.5` y `0.5` son el mismo punto) y los strings con el espaciado colapsado. Así el lock solo se
 * mueve cuando cambia el DIBUJO, no cuando cambia cómo está escrito.
 */
function normalizeValue(v: unknown): string {
  const s = String(v);
  const n = Number(s);
  return Number.isNaN(n) ? s.replace(/\s+/g, ' ').trim() : String(n);
}

/** `path:1a2b3c4d5e6f` — el tag va al frente para que el lock se lea de un vistazo en el PR. */
export function shapeFingerprint(tag: string, attrs: Record<string, unknown>): string {
  const payload = Object.entries(attrs)
    .filter(([k, v]) => k !== 'tag' && v !== undefined)
    .map(([k, v]) => `${k}=${normalizeValue(v)}`)
    .sort()
    .join(';');
  return `${tag}:${(fnv1a(payload, 0x811c9dc5) + fnv1a(payload, 0x9e3779b9)).slice(0, 12)}`;
}

export function shapesFingerprint(shapes: IconShape[]): string[] {
  return shapes.map((shape) => shapeFingerprint(shape.tag, shape as unknown as Record<string, unknown>));
}

/**
 * Forma canónica de cualquier valor: claves ordenadas en profundidad y números normalizados.
 *
 * El orden de las claves NO se conserva a propósito. Ni el orden de las variantes ni el de los
 * índices dentro de `shapes` cambian lo que se ve — el motor las lee por nombre, no por posición —
 * así que reordenarlas no debe mover la huella. Lo que sí la mueve es el VALOR: otro keyframe, otra
 * duración, otro `origin`, u otro índice de figura.
 */
function canonical(v: unknown): string {
  if (v === null || v === undefined) return String(v);
  if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`;
  if (typeof v === 'object') {
    return `{${Object.entries(v as Record<string, unknown>)
      .filter(([, val]) => val !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([k, val]) => `${k}:${canonical(val)}`)
      .join(',')}}`;
  }
  return normalizeValue(v);
}

/**
 * Huella del MOVIMIENTO, una por variante — la contraparte de `shapesFingerprint`, que solo huella
 * el dibujo.
 *
 * Existe porque el lock de geometría deja un hueco: mover una coreografía al icono equivocado,
 * perder una variante en un corte, o duplicar un helper compartido y editar solo una copia pasa
 * verde por typecheck, lint, el barrido, `curated:lock:check`, `bundle-check` y `pack-check`. Con
 * 911 curados y miles de tracks eso no se revisa a ojo. Anclar la coreografía convierte cualquier
 * refactor masivo del catálogo (partir el archivo, mover figuras a otro módulo) en una operación
 * verificable: si la huella no se movió, el movimiento no se movió.
 *
 * Va por variante y no un hash por icono para que el diff diga QUÉ variante cambió, no solo cuál
 * icono — mismo criterio que la huella de geometría, que va figura por figura.
 */
export function choreographyFingerprint(def: AnimatedIconDef): Record<string, string> {
  const out: Record<string, string> = {};
  for (const variante of Object.keys(def.animations).sort()) {
    const payload = canonical(def.animations[variante]);
    out[variante] = (fnv1a(payload, 0x811c9dc5) + fnv1a(payload, 0x9e3779b9)).slice(0, 12);
  }
  return out;
}

/**
 * Índice de figura → variantes que la animan. Vacío = esa figura no la mueve nadie.
 *
 * Es lo que convierte "esta figura cambió" en "esta figura cambió Y hay una coreografía apoyada
 * en ella": la diferencia entre un dato y una alarma.
 */
export function variantesPorFigura(def: AnimatedIconDef): Map<number, string[]> {
  const mapa = new Map<number, string[]>();
  for (const [variante, chor] of Object.entries(def.animations)) {
    for (const index of Object.keys(chor.shapes ?? {})) {
      const i = Number(index);
      mapa.set(i, [...(mapa.get(i) ?? []), variante]);
    }
  }
  return mapa;
}
