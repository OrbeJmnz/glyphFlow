import { catShape, ghostShape, mochiShape, octopusShape, robotShape, tofuShape, type GfBotShape } from 'glyphflow/bots';
import type { FormaId } from './bots-datos';

/**
 * Las formas de la librería por id. Aparte de `bots-datos.ts` a propósito: aquel archivo son tablas sin motor (así se prueba sin
 * arrastrarlo) y este sí importa las formas.
 */
export const SHAPES: Record<FormaId, GfBotShape> = {
  ghost: ghostShape,
  cat: catShape,
  octopus: octopusShape,
  tofu: tofuShape,
  mochi: mochiShape,
  robot: robotShape,
};
