/*
 * Public API Surface of glyphflow
 */

export * from './lib/icon/gf-icon.component';
// Los alias `Max*` de la v1 salen de aquí junto a los nombres nuevos — ver el bloque «Alias de la
// v1» del archivo. Se borran de un tajo cuando caiga la deprecación.
export * from './lib/icon/gf-icons.config';
export * from './lib/icon/icon-catalog.provider';
export * from './lib/icon/animated-icon.model';
// ANIMATED_ICONS/ANIMATED_ICON_NAMES/ICON_ALIASES/resolveIconName — la ruta de conveniencia por
// `name`, que sí arrastra el registro completo.
export * from './lib/icon/animated-icons.registry';
// Los curados a mano, uno por familia bajo `icons/` más los que aún no tienen módulo propio: la
// ruta tree-shakeable vía `[iconDef]="bellIcon"`.
export * from './lib/icon/curated-icons';
export * from './lib/icon/generated-icons';

/**
 * @deprecated Renombrado a `GfIconComponent`. Sale en la próxima major.
 *
 * Es la MISMA clase, así que ponerlo en los `imports:` de un standalone sigue funcionando igual.
 * Y el selector viejo `<max-icon>` también sigue vivo, declarado en el propio componente.
 */
export { GfIconComponent as MaxIconComponent } from './lib/icon/gf-icon.component';
