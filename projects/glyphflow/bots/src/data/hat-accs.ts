import { f2 } from './color';
import { HATS, type GfBotHat, type GfBotHatId, type GfBotHeadMetrics } from './hats';
import type { GfBotShape, GfBotShapeAccessory } from './shape';

/**
 * Puente entre un sombrero y una forma: devuelve los accesorios que se le pegan a la forma para
 * que el sombrero siga la pose (gire, se ladee, salte). Audífonos, visera y casco se ajustan al
 * CUERPO, no a la coronilla.
 */
export function hatAccs(key: GfBotHatId, sh: GfBotShape): GfBotShapeAccessory[] {
  // Divergencia deliberada del prototipo: una forma sin `hatAt` ni `bodyFit` (el cubo retirado)
  // daba `NaN` en la posición del sombrero. Aquí cae a 0 en vez de propagar `NaN` al transform.
  const H: GfBotHat = HATS[key], fit = H.bodyFit && sh.bodyFit;   // audífonos, visera y casco se ajustan al CUERPO, no a la coronilla
  const at = (fit ? sh.bodyFit!.y - sh.cy : sh.hatAt) ?? 0, k = fit ? sh.bodyFit!.k : (sh.hatK ?? 1), hx = fit ? 0 : (sh.hatX ?? 0);   // hatK: tamaño según el ancho de la cabeza
  const wrap = (inner: string) => (x: number, y: number) => `<g transform="translate(${f2(x)} ${f2(y)})${k !== 1 ? ` scale(${k})` : ''}"><g class="hatDyn">${inner}</g></g>`;
  const hd: GfBotHeadMetrics = sh.head || { w:94, ry:9 };
  const body = (p: string) => H.layered ? `<g class="hback">${H.back ? H.back(p, hd) : ""}</g><g class="hfront">${H.front?.(p, hd) ?? ""}</g>` : `<g class="hfront">${H.draw?.(p) ?? ""}</g>`;
  const list: GfBotShapeAccessory[] = [{ p:[hx, at + (H.oy || 0) * k, 0], up:[0, -1, 0], frontOnly:!H.layered, layered:!!H.layered, hat:true, draw:(x: number, y: number, p: string) => wrap(body(p))(x, y) }];
  if (H.deco) list.push({ p:[hx, at + (H.oy || 0) * k, (H.frontZ ?? 30) * k], up:[0, -1, 0], frontOnly:true, faceOnly:true, n:[0, 0, 1], minW:H.minW ?? .25, draw:(x: number, y: number, p: string) => wrap(H.deco!(p))(x, y) });
  return list;
}

