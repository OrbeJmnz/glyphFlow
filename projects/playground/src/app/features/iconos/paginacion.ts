/**
 * Los números y elipsis del pie de paginación del catálogo. Módulo puro: sin Angular, sin
 * señales — así se prueba con una tabla de casos en vez de montando un componente.
 *
 * Vive junto a `iconos.ts` y no en `core/`: es lógica del catálogo, igual que `buscador.ts`.
 */

export type ItemPaginacion = number | 'salto';

/**
 * Siempre incluye la primera y la última página, más `vecinos` alrededor de la actual, con un
 * `'salto'` donde el hueco entre dos números incluidos sea mayor a uno.
 *
 * `rangoPaginas(5, 9)` → `[1, 'salto', 4, 5, 6, 'salto', 9]`.
 */
export function rangoPaginas(actual: number, total: number, vecinos = 1): ItemPaginacion[] {
  if (total <= 0) return [];
  if (total === 1) return [1];

  const incluidas = new Set<number>([1, total]);
  for (let p = actual - vecinos; p <= actual + vecinos; p++) {
    if (p >= 1 && p <= total) incluidas.add(p);
  }

  const ordenadas = [...incluidas].sort((a, b) => a - b);
  const salida: ItemPaginacion[] = [];
  for (let i = 0; i < ordenadas.length; i++) {
    if (i > 0 && ordenadas[i] - ordenadas[i - 1] > 1) salida.push('salto');
    salida.push(ordenadas[i]);
  }
  return salida;
}
