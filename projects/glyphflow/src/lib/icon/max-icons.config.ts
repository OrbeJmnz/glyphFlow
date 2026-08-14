import { InjectionToken, Provider } from '@angular/core';

/**
 * Config global opcional. Sin `provideMaxIcons(...)` en ningún injector, el valor por defecto
 * (`durationScale: 1`) deja el comportamiento intacto — es aditivo, nunca obligatorio.
 */
export interface MaxIconsConfig {
  /** Escala toda duración calculada (tracks manuales y auto-draw). 1 = sin cambio, <1 = más rápido. */
  durationScale?: number;
}

export const MAX_ICONS_CONFIG = new InjectionToken<MaxIconsConfig>('MAX_ICONS_CONFIG');

export function provideMaxIcons(config: MaxIconsConfig): Provider {
  return { provide: MAX_ICONS_CONFIG, useValue: config };
}
