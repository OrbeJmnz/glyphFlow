import { InjectionToken, Provider } from '@angular/core';

/**
 * Config global opcional. Sin `provideGfIcons(...)` en ningún injector, el valor por defecto
 * (`durationScale: 1`) deja el comportamiento intacto — es aditivo, nunca obligatorio.
 */
export interface GfIconsConfig {
  /** Escala toda duración calculada (tracks manuales y auto-draw). 1 = sin cambio, <1 = más rápido. */
  durationScale?: number;
}

/**
 * La descripción del token sigue diciendo `MAX_ICONS_CONFIG` a propósito: es el texto que Angular
 * imprime en un `NullInjectorError`, y cambiarlo ahora dejaría a quien busque ese error con código
 * de la v1 sin un solo resultado. Se actualiza cuando caiga la deprecación.
 */
export const GF_ICONS_CONFIG = new InjectionToken<GfIconsConfig>('MAX_ICONS_CONFIG');

export function provideGfIcons(config: GfIconsConfig): Provider {
  return { provide: GF_ICONS_CONFIG, useValue: config };
}

/*
 * ── Alias de la v1 ──────────────────────────────────────────────────────────────────────────
 *
 * Vivos una minor. `MAX_ICONS_CONFIG` es **el mismo objeto**, no un token nuevo con el mismo
 * nombre: dos `InjectionToken` distintos no se ven entre sí, así que un `provideMaxIcons()` del
 * consumidor no llegaría nunca al componente y el fallo sería silencioso — `durationScale`
 * simplemente se ignoraría, sin un error que lo delate. Es la misma trampa que documenta la regla
 * de los entry points secundarios.
 */

/** @deprecated Renombrado a {@link GF_ICONS_CONFIG}. Sale en la próxima major. */
export const MAX_ICONS_CONFIG = GF_ICONS_CONFIG;

/** @deprecated Renombrada a {@link GfIconsConfig}. Sale en la próxima major. */
export type MaxIconsConfig = GfIconsConfig;

/** @deprecated Renombrada a {@link provideGfIcons}. Sale en la próxima major. */
export const provideMaxIcons = provideGfIcons;
