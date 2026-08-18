/**
 * Superficie pública de `glyphflow/morph` — entry point secundario, su propio chunk: quien no lo
 * importe no paga nada.
 *
 * Importa del entry point primario por NOMBRE DE PAQUETE (`from 'glyphflow'`), nunca por ruta
 * relativa: una relativa hace que ng-packagr duplique ese código aquí, y con `MAX_ICONS_CONFIG`
 * eso significa OTRO `InjectionToken` — el `provideMaxIcons` del consumidor no llegaría nunca, en
 * silencio. `pack-check` lo verifica instalando el tarball en un proyecto limpio.
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
export { MaxIconMorphComponent } from './max-icon-morph.component';
export type { MorphIcon } from './max-icon-morph.component';
export { SPRING_PRESETS } from './core/spring';
export type { SpringPreset } from './core/spring';
