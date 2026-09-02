/*
 * Public API Surface of glyphflow
 */

export * from './lib/icon/gf-icon.component';
// Los alias `Max*` de la v1 salen de aquí junto a los nombres nuevos — ver el bloque «Alias de la
// v1» del archivo. Se borran de un tajo cuando caiga la deprecación.
export * from './lib/icon/gf-icons.config';
export * from './lib/icon/icon-catalog.provider';
export * from './lib/icon/animated-icon.model';
// Los resortes de la casa (SPRING_SMOOTH/SNAPPY/BOUNCY), para que un consumidor pueda usar la MISMA
// curva que el motor en su propio CSS o en un `element.animate()` suyo. Va este módulo SOLO y no
// `choreography`: ese trae además el vocabulario de autoría —icon(), track(), rotateSeq()…— que
// nadie necesita para reusar un easing y que sí pesaría en el bundle de quien solo quiere la curva.
// Sin esto, el consumidor únicamente podía copiar la cadena a mano y desincronizarse en silencio
// la próxima vez que los resortes se regeneraran: es lo que llevaba pasando en el playground.
export * from './lib/icon/spring-easings';
// ANIMATED_ICONS/ANIMATED_ICON_NAMES/ICON_ALIASES/resolveIconName — la ruta de conveniencia por
// `name`, que sí arrastra el registro completo.
export * from './lib/icon/animated-icons.registry';
// ICON_TAGS aparte del registro A PROPÓSITO: son los sinónimos de los 1767 SIN su geometría, así
// que un buscador puede indexarlos sin bajar el catálogo. Colgados solo de `IconMeta`, buscar
// obligaría a importar `ICON_META`, que se construye sobre `ANIMATED_ICON_NAMES` y arrastra todo.
export * from './lib/icon/icon-tags';
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
