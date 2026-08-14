import { AnimatedIconDef, IconChoreography, IconShape, MotionTrack } from './animated-icon.model';

/**
 * Vocabulario de movimiento compartido — lo usan tanto `curated-icons.ts` (184 coreografías a
 * mano) como `generated-icons.ts` (el generador offline, que solo usa `icon()` con la variante
 * `draw` automática). Vive separado de ambos para que ninguno tenga que importar del otro. Data
 * pura, sin figuras: por eso no importa nada de `animated-icons.shapes.ts`.
 *
 * Regla que ordena el vocabulario: si dos figuras se mueven igual y al mismo tiempo, no hay
 * coreografía, hay un bloque. El desfase es lo que se siente vivo.
 */

export const EASE = 'ease-in-out';
/** Spring sobreamortiguado (ζ≈1): sin rebote, un expo-out es fiel y WAAPI no tiene springs. */
export const SPRING_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

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

/** Arma la definición y le cuelga la variante `draw` (a menos que se escriba una a mano). */
export const icon = (shapes: IconShape[], animations: Record<string, IconChoreography>): AnimatedIconDef => ({
  shapes,
  animations: { draw: DRAW, ...animations },
});

/** Estado que se sostiene mientras dure el hover y se devuelve al salir (no un tic de ida y vuelta). */
export const held = (keyframes: Keyframe[], duration: number, o: TrackOpts = {}): IconChoreography => ({
  root: /* @__PURE__ */ track(keyframes, duration, { easing: SPRING_OUT, fill: 'forwards', ...o }),
  reverseOnLeave: true,
});