/**
 * Superficie de `glyphflow/morph`. Todavía NO se exporta desde `public-api.ts`: hasta que el
 * benchmark fije el número de pasos por default, esto no es API pública ni entra al paquete.
 */
export {
  morphKeyframes,
  runMorph,
  canonicalD,
  PASOS_DEFAULT,
  RESOLUCION_DEFAULT,
  COLA_DEFAULT,
} from './morph-keyframes';
export type { MorphKeyframes, MorphKeyframesOpts, RunMorphOpts } from './morph-keyframes';
export { SPRING_PRESETS } from './core/spring';
export type { SpringPreset } from './core/spring';
