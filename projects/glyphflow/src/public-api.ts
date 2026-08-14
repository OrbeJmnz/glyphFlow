/*
 * Public API Surface of glyphflow
 */

export * from './lib/icon/max-icon.component';
export * from './lib/icon/max-icons.config';
export * from './lib/icon/icon-catalog.provider';
export * from './lib/icon/animated-icon.model';
// Los ~184 `export const xIcon` individuales van aquí también (ruta tree-shakeable vía
// `[iconDef]="bellIcon"`) — ANIMATED_ICONS/ICON_ALIASES/resolveIconName son la ruta de
// conveniencia por `name`, que sí arrastra el registro completo.
export * from './lib/icon/animated-icons.registry';
