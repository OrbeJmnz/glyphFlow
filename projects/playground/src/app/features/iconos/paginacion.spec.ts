import { describe, expect, it } from 'vitest';
import { rangoPaginas } from './paginacion';

describe('rangoPaginas', () => {
  it('con una sola página, no hay nada que recorrer', () => {
    expect(rangoPaginas(1, 1)).toEqual([1]);
  });

  it('sin páginas, no hay nada que mostrar', () => {
    expect(rangoPaginas(1, 0)).toEqual([]);
  });

  it('el ejemplo del ticket: 5 de 9, un vecino a cada lado', () => {
    expect(rangoPaginas(5, 9)).toEqual([1, 'salto', 4, 5, 6, 'salto', 9]);
  });

  it('en la primera página no hay salto a la izquierda', () => {
    expect(rangoPaginas(1, 9)).toEqual([1, 2, 'salto', 9]);
  });

  it('en la última página no hay salto a la derecha', () => {
    expect(rangoPaginas(9, 9)).toEqual([1, 'salto', 8, 9]);
  });

  it('con pocas páginas, todas caben sin ningún salto', () => {
    expect(rangoPaginas(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('cerca del borde no duplica el mismo número', () => {
    expect(rangoPaginas(2, 9)).toEqual([1, 2, 3, 'salto', 9]);
  });
});
