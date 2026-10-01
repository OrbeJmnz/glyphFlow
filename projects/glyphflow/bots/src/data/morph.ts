/**
 * Deformación de siluetas: mueve cada punto (y control) de un `d` con una función, conservando la
 * estructura de comandos — así dos siluetas del mismo origen se pueden interpolar o animar con `d`.
 */

const r2 = (v: number): number => +v.toFixed(2);

/** Aplica `fn` a cada par de coordenadas del trazo `d`. */
export const morphPath = (
  d: string,
  fn: (x: number, y: number) => readonly [number, number],
): string =>
  d.replace(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g, (_, x: string, y: string) => {
    const [a, b] = fn(+x, +y);
    return `${r2(a)} ${r2(b)}`;
  });

/**
 * Interpola entre siluetas con la MISMA estructura (`u` de 0 a 1 recorre `keys`). Es para
 * navegadores que no animan `d` con CSS (Safari).
 */
export function pathLerp(keys: readonly string[], u: number): string {
  const n = keys.length - 1;
  const t = Math.min(n - 1e-6, Math.max(0, u * n));
  const i = Math.floor(t);
  const k = t - i;
  const A = (keys[i].match(/-?\d*\.?\d+/g) ?? []).map(Number);
  const B = (keys[i + 1].match(/-?\d*\.?\d+/g) ?? []).map(Number);
  let j = 0;
  return keys[i].replace(/-?\d*\.?\d+/g, () => {
    const v = A[j] + (B[j] - A[j]) * k;
    j++;
    return String(r2(v));
  });
}
