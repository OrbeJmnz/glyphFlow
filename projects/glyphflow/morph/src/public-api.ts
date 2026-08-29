/**
 * Superficie pública de `glyphflow/morph` — entry point secundario, su propio chunk: quien no lo
 * importe no paga nada.
 *
 * Importa del entry point primario por NOMBRE DE PAQUETE (`from 'glyphflow'`), nunca por ruta
 * relativa: una relativa hace que ng-packagr duplique ese código aquí, y con `GF_ICONS_CONFIG`
 * eso significa OTRO `InjectionToken` — el `provideGfIcons` del consumidor no llegaría nunca, en
 * silencio. `pack-check` lo verifica instalando el tarball en un proyecto limpio.
 */
export {
  morphKeyframes,
  runMorph,
  canonicalD,
  morphAt,
  STEPS_DEFAULT,
  RESOLUTION_DEFAULT,
  SPRING_TAIL_DEFAULT,
  // Los nombres de la v1, vivos una minor. Ver el bloque «Alias de la v1» en morph-keyframes.ts.
  PASOS_DEFAULT,
  RESOLUCION_DEFAULT,
  COLA_DEFAULT,
} from './morph-keyframes';
export type {
  MorphKeyframes,
  MorphKeyframesOpts,
  RunMorphOpts,
  SpringPreset,
  SpringConfig,
  SpringTail,
  SpringTailLegacy,
} from './morph-keyframes';
export { GfIconMorphComponent } from './gf-icon-morph.component';
export { createLiveMorph } from './live-morph';
export type { LiveMorph, LiveMorphOpts } from './live-morph';

/**
 * @deprecated Renombrado a `GfIconMorphComponent`. Sale en la proxima major.
 *
 * La MISMA clase: en los `imports:` de un standalone funciona igual. El selector viejo
 * `<max-icon-morph>` tambien sigue vivo.
 */
export { GfIconMorphComponent as MaxIconMorphComponent } from './gf-icon-morph.component';
export type { MorphIcon } from './gf-icon-morph.component';
// `SPRING_PRESETS` se reexporta desde nuestra capa, no desde el core vendorizado: si algún día
// vuelve a haber un preset de upstream que aquí no cumpla, se acota en un solo lugar.
export { SPRING_PRESETS } from './morph-keyframes';
