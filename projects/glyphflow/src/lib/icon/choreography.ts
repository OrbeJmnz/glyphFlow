import { AnimatedIconDef, IconChoreography, IconShape, MotionTrack } from './animated-icon.model';
import { SPRING_BOUNCY, SPRING_SMOOTH, SPRING_SNAPPY } from './spring-easings';

// Se re-exportan para que `curated-icons.ts` siga teniendo UN solo lugar de donde importar
// vocabulario de movimiento. Que los valores vengan de un archivo generado es detalle de cocina.
export { SPRING_BOUNCY, SPRING_SMOOTH, SPRING_SNAPPY };

/**
 * Vocabulario de movimiento compartido — lo usan tanto `curated-icons.ts` (410 coreografías a
 * mano) como `generated-icons.ts` (el generador offline, que solo usa `icon()` con la variante
 * `draw` automática). Vive separado de ambos para que ninguno tenga que importar del otro. Data
 * pura, sin figuras: por eso no importa nada de `animated-icons.shapes.ts`.
 *
 * Regla que ordena el vocabulario: si dos figuras se mueven igual y al mismo tiempo, no hay
 * coreografía, hay un bloque. El desfase es lo que se siente vivo.
 */

/**
 * Para keyframes que YA oscilan a mano (la campana: `rotateSeq([0, 20, -10, 10, -5, 3, 0])`).
 * Ahí los keyframes son el resorte, y encimarles un easing con sobrepaso oscila doble y se ve mal.
 * Este default NO se cambia por un preset: no es que le falte física, es que ya la trae.
 */
export const EASE = 'ease-in-out';

/**
 * El resorte de la casa para ir de A a B. Ahora sí es un resorte.
 *
 * Antes era `cubic-bezier(0.16, 1, 0.3, 1)` — un expo-out honesto, pero críticamente amortiguado
 * por definición: NO rebotaba. La premisa que lo justificaba ("WAAPI no tiene springs") dejó de
 * ser cierta con `linear()`, que admite puntos de control fuera de [0,1]. Ver spring-easings.ts.
 *
 * Se conserva el NOMBRE en vez de renombrar los ~40 call sites de `curated-icons.ts` porque el
 * nombre nunca fue el problema: cada uno de esos sitios ya era una decisión correcta de "aquí va
 * un resorte", tomada icono por icono. Lo único que estaba mal era el valor.
 */
export const SPRING_OUT = SPRING_SNAPPY;

export const rotateSeq = (deg: number[]): Keyframe[] => deg.map((d) => ({ transform: `rotate(${d}deg)` }));
export const scaleSeq = (s: number[]): Keyframe[] => s.map((v) => ({ transform: `scale(${v})` }));
export const moveXSeq = (x: number[]): Keyframe[] => x.map((v) => ({ transform: `translateX(${v}px)` }));
export const moveYSeq = (y: number[]): Keyframe[] => y.map((v) => ({ transform: `translateY(${v}px)` }));

export interface TrackOpts {
  delay?: number;
  easing?: string;
  origin?: string;
  fill?: FillMode;
}

/**
 * Un track con `delay` SIEMPRE lleva `fill: 'backwards'`: sin él, la figura se ve en su estado
 * final durante la espera y salta a su estado inicial cuando por fin le toca. Ese parpadeo es el
 * error clásico de las animaciones escalonadas y aquí se cierra de fábrica, no icono por icono.
 */
export const track = (keyframes: Keyframe[], duration: number, o: TrackOpts = {}): MotionTrack => ({
  keyframes,
  options: {
    duration,
    easing: o.easing ?? EASE,
    ...(o.delay ? { delay: o.delay, fill: o.fill ?? 'backwards' } : o.fill ? { fill: o.fill } : {}),
  },
  ...(o.origin ? { origin: o.origin } : {}),
});

/** Aparecer desde nada — ondas, chispas, destellos. */
export const burst = (): Keyframe[] => [
  { transform: 'scale(0.3)', opacity: '0' },
  { transform: 'scale(1.12)', opacity: '1' },
  { transform: 'scale(1)', opacity: '1' },
];

/** Trazo que se dibuja. El componente pone `pathLength="1"`, por eso el dash va en 0-1. */
export const strokeDraw = (): Keyframe[] => [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
];

/**
 * Variante `draw` universal. NO se escribe a mano: el componente mide cada figura y dibuja de la
 * más larga a la más corta, con velocidad de pluma constante (ver `AutoDraw`). Escrita a mano, el
 * contorno del reloj y la manecilla tardaban lo mismo — y eso se ve a saltos.
 */
const DRAW: IconChoreography = { autoDraw: {} };

/**
 * Variante `reveal` universal. Misma idea que `DRAW`: una constante COMPARTIDA por los 1767, no
 * keyframes por icono. Lo que cuesta bytes vive en el componente (presupuesto `core`, con aire);
 * aquí solo puede haber una referencia, porque este archivo entra ENTERO al bundle de quien
 * importa un solo icono aunque no lo use.
 */
const REVEAL: IconChoreography = { autoReveal: {} };

/** Ver `AutoFlicker` en animated-icon.model.ts. */
const FLICKER: IconChoreography = { autoFlicker: {} };

/**
 * Arma la definición y le cuelga `draw`, `reveal` y `flicker` (a menos que se escriban a mano).
 *
 * `reveal`/`flicker` van DESPUÉS del spread y por eso se escriben como re-asignación: si el icono
 * trae uno curado, la clave ya existe y conserva la posición que le dio su autor; si no, se agrega
 * al final. Ponerlo antes del spread parecía equivalente y no lo es — la clave saltaba al frente y
 * el reveal curado le robaba el hover al gesto propio del icono. Medido: `eye-off` perdía su
 * `alert`, y `signpost` y `wind` su `hold`.
 *
 * Que el genérico traiga `autoReveal`/`autoFlicker` es lo que deja a `varianteDeHover`
 * distinguirlo del curado.
 */
export const icon = (shapes: IconShape[], animations: Record<string, IconChoreography>): AnimatedIconDef => ({
  shapes,
  animations: {
    draw: DRAW,
    ...animations,
    reveal: animations['reveal'] ?? REVEAL,
    flicker: animations['flicker'] ?? FLICKER,
  },
});

/**
 * Estado que se sostiene mientras dure el hover y se devuelve al salir (no un tic de ida y vuelta).
 *
 * `SPRING_SNAPPY` explícito, no `SPRING_OUT`, y no es cosmético: al salir el puntero esto se
 * reproduce en REVERSA (`reverseOnLeave`), y reversa significa recorrer la curva del easing hacia
 * atrás — el sobrepaso aparece a media vuelta, cuando la figura ya va de regreso. Con `snappy`
 * (pico 1.0265) eso es un 2.6% y no se ve. Con `bouncy` (1.2435) la figura se abomba de salida y
 * se ve al revés de como debería. Por eso el preset queda fijo aquí y no se hereda de un default.
 */
export const held = (keyframes: Keyframe[], duration: number, o: TrackOpts = {}): IconChoreography => ({
  root: /* @__PURE__ */ track(keyframes, duration, { easing: SPRING_SNAPPY, fill: 'forwards', ...o }),
  reverseOnLeave: true,
});