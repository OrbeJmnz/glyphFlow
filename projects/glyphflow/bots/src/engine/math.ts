/**
 * Matemática pequeña que comparten motor, gestos y rutinas. Funciones puras.
 */

export const TAU = Math.PI * 2;

/** Cúbica de entrada y salida: arranca y termina suave. */
export const easeInOut = (u: number): number =>
  u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;

export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

/** `scale(x, y)` para keyframes; con un solo argumento escala parejo. */
export const S = (x: number | string, y: number | string = x): string => `scale(${x},${y})`;
