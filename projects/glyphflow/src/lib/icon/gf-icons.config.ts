import { InjectionToken, Provider } from '@angular/core';

/**
 * Config global opcional. Sin `provideGfIcons(...)` en ningún injector, el valor por defecto
 * (`durationScale: 1`) deja el comportamiento intacto — es aditivo, nunca obligatorio.
 */
export interface GfIconsConfig {
  /** Escala toda duración calculada (tracks manuales y auto-draw). 1 = sin cambio, <1 = más rápido. */
  durationScale?: number;
  /**
   * Interruptor global de movimiento. Default `true`. En `false` ningún icono anima: se quedan en
   * su pose base, que es el icono tal cual se dibuja.
   *
   * **No sustituye a `prefers-reduced-motion`**, que se sigue respetando por su cuenta (ver el
   * input `respectReducedMotion` de cada icono). Existe para lo que la media query NO puede
   * cubrir: una app con su propio ajuste de accesibilidad, donde el usuario apaga el movimiento
   * DENTRO del producto sin tocar la configuración del sistema operativo. Sin esto, la única
   * salida era poner `respectReducedMotion` icono por icono, y aun así solo permitía seguir al
   * sistema, nunca contradecirlo.
   *
   * Igual que `durationScale`, se lee EN EL MOMENTO DE ANIMAR: un getter sobre una señal lo
   * convierte en un interruptor vivo sin re-bootstrapear la aplicación.
   */
  animationsEnabled?: boolean;
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
