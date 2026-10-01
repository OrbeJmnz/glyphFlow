import type { GfSilMetrics } from '../data/fx';

/**
 * Medición de la silueta de una forma: dónde está la coronilla y qué tan ancha es a la altura de
 * la cara. Los accesorios (halo, auriculares…) se acomodan con esto.
 *
 * Se parte en dos a propósito:
 *  - `sampleSilhouette` es PURA: recibe algo que sepa decir su largo y un punto a cierta distancia
 *    (un `SVGPathElement` o un doble de prueba) y no toca el DOM.
 *  - `measureSilhouette` es la cáscara con DOM: monta el `<path>` en un SVG oculto para medirlo.
 *
 * En el servidor no hay `document`: `measureSilhouette` devuelve una estimación (`estimate`) en vez
 * de romper. Al hidratar, el cliente mide de verdad.
 */

/** Lo único que el muestreo necesita de un trazo. */
export interface GfPathProbe {
  getTotalLength(): number;
  getPointAtLength(distance: number): { x: number; y: number };
}

const SAMPLES = 300;

/** Recorre el trazo en 300 pasos y devuelve coronilla y ancho a la altura `fy` (±6). */
export function sampleSilhouette(path: GfPathProbe, fy: number): GfSilMetrics {
  const L = path.getTotalLength();
  let top = 1e9;
  let topX = 100;
  let l = 1e9;
  let r = -1e9;
  for (let i = 0; i <= SAMPLES; i++) {
    const q = path.getPointAtLength((L * i) / SAMPLES);
    if (q.y < top) {
      top = q.y;
      topX = q.x;
    }
    if (Math.abs(q.y - fy) < 6) {
      l = Math.min(l, q.x);
      r = Math.max(r, q.x);
    }
  }
  return { top, topX, l: l < 1e9 ? l : 40, r: r > -1e9 ? r : 160 };
}

/** Estimación sin DOM: la coronilla ~48 unidades sobre los ojos y un ancho razonable. */
export const estimateSilhouette = (fy: number): GfSilMetrics => ({
  top: fy - 48,
  topX: 100,
  l: 40,
  r: 160,
});

const cache = new Map<string, GfSilMetrics>();
const SVG_NS = 'http://www.w3.org/2000/svg';
const PROBE_ID = 'gf-bot-silhouette-probe';

/** Mide la silueta `d` a la altura de ojos `fy`. Cachea por (d, fy). Sin DOM, estima. */
export function measureSilhouette(d: string, fy: number): GfSilMetrics {
  if (typeof document === 'undefined') return estimateSilhouette(fy);
  const key = d + '|' + fy;
  const hit = cache.get(key);
  if (hit) return hit;

  let host = document.getElementById(PROBE_ID) as Element | null as SVGSVGElement | null;
  if (!host) {
    host = document.createElementNS(SVG_NS, 'svg');
    host.id = PROBE_ID;
    host.setAttribute('width', '0');
    host.setAttribute('height', '0');
    host.setAttribute('aria-hidden', 'true');
    host.style.position = 'absolute';
    host.style.pointerEvents = 'none';
    document.body.appendChild(host);
  }
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d);
  host.appendChild(path);
  try {
    const m = sampleSilhouette(path, fy);
    cache.set(key, m);
    return m;
  } finally {
    path.remove();
  }
}
