import { InjectionToken, Provider } from '@angular/core';
import { AnimatedIconDef } from './animated-icon.model';

/**
 * Registro consultado por `name="bell"`. A propósito NO se importa `ANIMATED_ICONS` (los ~1767
 * iconos) de forma estática en `GfIconComponent` — eso arrastraría el catálogo completo a
 * CUALQUIER app que use el componente, incluso una que solo consuma `[iconDef]="bellIcon"` con
 * imports individuales. Medido en la práctica: sin este desacople, el bundle no bajaba nada aunque
 * cada icono ya fuera un export tree-shakeable — el catálogo seguía siendo alcanzable desde el
 * propio componente.
 *
 * Sin `provideIconCatalog(...)` en ningún injector, `name="bell"` se pinta vacío en silencio (mismo
 * contrato que un nombre desconocido) — el catálogo es opt-in, no un fallback oculto.
 */
export const GF_ICON_CATALOG = new InjectionToken<Record<string, AnimatedIconDef>>(
  // El texto se queda como estaba: es lo que Angular imprime en un NullInjectorError, y cambiarlo
  // dejaria sin resultados a quien busque ese error con codigo de la v1.
  'MAX_ICON_CATALOG',
);

/**
 * @deprecated Renombrado a {@link GF_ICON_CATALOG}. Sale en la proxima major.
 *
 * El MISMO token, no uno nuevo: dos InjectionToken distintos no se ven entre si y un
 * `provideIconCatalog()` de la v1 dejaria de alimentar al componente en silencio.
 */
export const MAX_ICON_CATALOG = GF_ICON_CATALOG;

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
  return { provide: GF_ICON_CATALOG, useValue: registry };
}
