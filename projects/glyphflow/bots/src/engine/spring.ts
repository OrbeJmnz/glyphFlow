/**
 * El resorte de los saltos, giros y poses: k = 300, c = 14, duración natural 925 ms, sobrepaso 1.2435.
 *
 * Es una COPIA del `SPRING_BOUNCY` del primario, a propósito: importarlo del paquete `'glyphflow'`
 * arrastraba el componente de iconos entero a quien solo quiere bots (medido: +21 KB min / 5.5 KB
 * gzip), porque esbuild no separa una constante del componente que vive en el mismo FESM. Son 230
 * caracteres; `motion.spec.ts` comprueba que sigue siendo idéntica a la del primario, así que si
 * alguien cambia uno y olvida el otro, falla un test.
 *
 * El prototipo lo integraba al CARGAR el módulo y llamaba a `CSS.supports`, que rompe en servidor;
 * aquí es un literal y la comprobación se hace al crear cada bot.
 */
const SPRING_BOUNCY =
  'linear(0, 0.1939, 0.6113, 0.9587, 1.1744, 1.2435, 1.1964, 1.1053, 1.0182, 0.9616, 0.9407, 0.9501, 0.9717, 0.9935, 1.0093, 1.0143, 1.0126, 1.0075, 1.0016, 0.998, 0.9965, 0.9968, 0.9982, 0.9995, 1)';

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
