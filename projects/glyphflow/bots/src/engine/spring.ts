import { SPRING_BOUNCY } from 'glyphflow';

/**
 * El resorte de los saltos, giros y poses. Es el `SPRING_BOUNCY` del primario (k = 300, c = 14) y no
 * una copia: el prototipo lo integraba al CARGAR el módulo y llamaba a `CSS.supports`, que rompe en
 * servidor. Aquí se reusa el ya generado y la comprobación se hace al crear cada bot.
 *
 * Por NOMBRE DE PAQUETE (`'glyphflow'`), nunca ruta relativa: regla 6 de CLAUDE.md.
 */
export interface BotSpring {
  easing: string;
  duration: number;
}

/** Duración natural de `SPRING_BOUNCY` (ver su JSDoc en `spring-easings.ts`). */
export const SPRING_DURATION_MS = 925;

/** Respaldo cuando el navegador no parsea `linear()`: un cubic-bezier con rebote parecido. */
export const SPRING_FALLBACK = 'cubic-bezier(.3,1.4,.5,1)';

export function resolveSpring(): BotSpring {
  const ok =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('transition-timing-function', 'linear(0, 1)');
  return { easing: ok ? SPRING_BOUNCY : SPRING_FALLBACK, duration: SPRING_DURATION_MS };
}
