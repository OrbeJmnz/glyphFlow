/**
 * Mezcla de colores y formato numérico que comparten las pieles. Funciones puras sobre strings
 * `#RRGGBB`: sin DOM, sin estado.
 */

/** Mezcla `a` y `b` (`#RRGGBB`) en proporción `t` (0 = a, 1 = b). */
export const mixHex = (a: string, b: string, t: number): string =>
  '#' +
  [0, 2, 4]
    .map((i) =>
      Math.round(
        parseInt(a.slice(1 + i, 3 + i), 16) * (1 - t) + parseInt(b.slice(1 + i, 3 + i), 16) * t,
      )
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

/**
 * Misma mezcla, con el algoritmo del segundo helper del prototipo (`substr`). Da el mismo
 * resultado que `mixHex` para colores de 6 dígitos; se conserva con su nombre para que las pieles
 * que lo usan se lean igual que el original.
 */
export const hexMix = (a: string, b: string, t: number): string => mixHex(a, b, t);

/** Número con 2 y 3 decimales, como texto — para transformaciones y trazos SVG. */
export const f2 = (n: number): string => (+n).toFixed(2);
export const f3 = (n: number): string => (+n).toFixed(3);
