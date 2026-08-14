/*
 * Public API Surface of glyphflow
 */

export * from './lib/icon/max-icon.component';
export * from './lib/icon/max-icons.config';
export * from './lib/icon/icon-catalog.provider';
export * from './lib/icon/animated-icon.model';
// ANIMATED_ICONS/ANIMATED_ICON_NAMES/ICON_ALIASES/resolveIconName — la ruta de conveniencia por
// `name`, que sí arrastra el registro completo.
export * from './lib/icon/animated-icons.registry';
// Los 184 `export const xIcon` curados a mano (ruta tree-shakeable vía `[iconDef]="bellIcon"`).
export * from './lib/icon/curated-icons';
// Vacío hasta que exista el generador — se exporta ya para no romper la API pública otra vez
// cuando el generador empiece a llenarlo.
export * from './lib/icon/generated-icons';
