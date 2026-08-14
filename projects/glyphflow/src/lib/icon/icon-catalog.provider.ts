import { InjectionToken, Provider } from '@angular/core';
import { AnimatedIconDef } from './animated-icon.model';

/**
 * Registro consultado por `name="bell"`. A propósito NO se importa `ANIMATED_ICONS` (los 184
 * iconos) de forma estática en `MaxIconComponent` — eso arrastraría el catálogo completo a
 * CUALQUIER app que use el componente, incluso una que solo consuma `[iconDef]="bellIcon"` con
 * imports individuales. Medido en la práctica: sin este desacople, el bundle no bajaba nada aunque
 * cada icono ya fuera un export tree-shakeable — el catálogo seguía siendo alcanzable desde el
 * propio componente.
 *
 * Sin `provideIconCatalog(...)` en ningún injector, `name="bell"` se pinta vacío en silencio (mismo
 * contrato que un nombre desconocido) — el catálogo es opt-in, no un fallback oculto.
 */
export const MAX_ICON_CATALOG = new InjectionToken<Record<string, AnimatedIconDef>>(
  'MAX_ICON_CATALOG',
);

/**
 * Habilita `name="bell"` en toda la app. `registry` es OBLIGATORIO a propósito — sin default: un
 * default a `ANIMATED_ICONS` aquí mismo volvería a arrastrar el catálogo completo a cualquiera que
 * solo importe esta función, aunque nunca la llame con el default. Para el catálogo completo:
 *
 * `import { ANIMATED_ICONS, provideIconCatalog } from 'glyphflow'; provideIconCatalog(ANIMATED_ICONS)`
 *
 * Para un subconjunto tree-shakeable propio, arma el objeto con imports individuales:
 *
 * `provideIconCatalog({ bell: bellIcon, search: searchIcon })`
 */
export function provideIconCatalog(registry: Record<string, AnimatedIconDef>): Provider {
  return { provide: MAX_ICON_CATALOG, useValue: registry };
}
