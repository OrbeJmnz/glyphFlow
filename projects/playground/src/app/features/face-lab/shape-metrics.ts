import { signal } from '@angular/core';
import { BOT_SHAPES, SHAPE_ORDER, type ShapeId } from './bot-shapes';
import { metricsFromRows, type ShapeMetrics } from './face-system';

/**
 * Las métricas de cada silueta, medidas UNA vez en el navegador con `isPointInFill`: el ancho real
 * de la forma cada 2 unidades de alto, de dónde sale su centro de masa y su banda más ancha.
 *
 * Se miden y no se escriben a mano por una razón: 10 Adaptive tiene que reaccionar a la silueta
 * SIN que nadie le diga «el huevo lleva la cara así». Si mañana entra una forma nueva, la mide
 * igual y la cara se acomoda sola.
 *
 * El prerender no tiene geometría (el DOM del servidor no implementa `isPointInFill`), así que ahí
 * la señal queda vacía y Adaptive se pinta con el layout fijo hasta que hidrata y mide.
 */
export const shapeMetrics = signal<Partial<Record<ShapeId, ShapeMetrics>>>({});

const NS = 'http://www.w3.org/2000/svg';

export function measureShapes(doc: Document): void {
  if (Object.keys(shapeMetrics()).length) return;
  const svg = doc.createElementNS(NS, 'svg') as SVGSVGElement;
  svg.setAttribute('width', '200');
  svg.setAttribute('height', '200');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden';
  const path = doc.createElementNS(NS, 'path') as SVGPathElement;
  svg.appendChild(path);
  doc.body.appendChild(svg);
  if (typeof path.isPointInFill !== 'function') {
    svg.remove();
    return;
  }
  const punto = svg.createSVGPoint();
  const dentro = (x: number, y: number) => {
    punto.x = x;
    punto.y = y;
    return path.isPointInFill(punto);
  };
  const medidas: Partial<Record<ShapeId, ShapeMetrics>> = {};
  for (const id of SHAPE_ORDER) {
    path.setAttribute('d', BOT_SHAPES[id].d);
    const bb = path.getBBox();
    const rows: [number, number][] = [];
    for (let y = Math.ceil(bb.y); y <= bb.y + bb.height; y += 2) {
      let r = 0;
      while (r < 100 && dentro(100 + r + 1, y)) r++;
      let l = 0;
      while (l < 100 && dentro(100 - l - 1, y)) l++;
      rows.push([y, l + r]);
    }
    medidas[id] = metricsFromRows(rows, { x: bb.x, y: bb.y, w: bb.width, h: bb.height });
  }
  svg.remove();
  shapeMetrics.set(medidas);
}
