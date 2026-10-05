/**
 * Pistas de animación: una curva suave que pasa por unos nodos `[t, valor]` (t de 0 a 1).
 *
 * Es una cúbica de Hermite MONÓTONA (Fritsch–Carlson): entre dos nodos nunca se pasa de ninguno de
 * los dos valores —sin rebotes que nadie pidió—, y en un máximo o un mínimo local la pendiente es
 * cero (la cima del salto es plana, el impacto también). Los extremos arrancan y terminan con
 * velocidad cero, que es lo que pide un gesto que sale del reposo y vuelve a él.
 *
 * Sirve para dar a CADA propiedad su propia curva —altura, giro, squash, falda— en vez de un único
 * easing global: se pone el valor en cada instante clave y la pista interpola el resto. Los
 * overshoots son nodos explícitos, no un efecto de la interpolación.
 */

export type GfTrackNode = readonly [t: number, value: number];

export function track(nodes: readonly GfTrackNode[]): (t: number) => number {
  const n = nodes.length;
  if (n === 0) return () => 0;
  if (n === 1) return () => nodes[0][1];
  const T = nodes.map((p) => p[0]);
  const V = nodes.map((p) => p[1]);
  const h = Array.from({ length: n - 1 }, (_, i) => T[i + 1] - T[i]);
  const d = Array.from({ length: n - 1 }, (_, i) => (V[i + 1] - V[i]) / h[i]);
  // Pendiente en cada nodo. Extremos: 0. Interior: media armónica ponderada, o 0 si cambia el signo.
  const m = Array.from({ length: n }, (_, i) => {
    if (i === 0 || i === n - 1) return 0;
    if (d[i - 1] * d[i] <= 0) return 0;
    const w1 = 2 * h[i] + h[i - 1];
    const w2 = h[i] + 2 * h[i - 1];
    return (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
  });

  return (t: number): number => {
    if (t <= T[0]) return V[0];
    if (t >= T[n - 1]) return V[n - 1];
    let i = 0;
    while (t > T[i + 1]) i++;
    const s = (t - T[i]) / h[i];
    const s2 = s * s;
    const s3 = s2 * s;
    return (
      (2 * s3 - 3 * s2 + 1) * V[i] +
      (s3 - 2 * s2 + s) * h[i] * m[i] +
      (-2 * s3 + 3 * s2) * V[i + 1] +
      (s3 - s2) * h[i] * m[i + 1]
    );
  };
}

/** Suavizado 0→1 entre `a` y `b` (con velocidad cero en los dos extremos). */
export const smoothstep = (a: number, b: number, x: number): number => {
  const u = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return u * u * (3 - 2 * u);
};
