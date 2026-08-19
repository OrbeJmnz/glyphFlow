import { describe, it, expect } from 'vitest';
import { crearHistorial } from './historial';

describe('crearHistorial', () => {
  it('arranca vacío: no hay nada que deshacer ni rehacer', () => {
    const h = crearHistorial<string>();
    expect(h.puedeDeshacer()).toBe(false);
    expect(h.puedeRehacer()).toBe(false);
    expect(h.deshacer('a')).toBeNull();
    expect(h.rehacer('a')).toBeNull();
  });

  it('funde un gesto entero en UNA entrada', () => {
    // El punto del diseño: un arrastre produce un estado por píxel. Si cada uno entrara a la pila,
    // deshacer una vez retrocedería un píxel.
    const h = crearHistorial<string>();
    h.abrir('inicio');
    // …aquí el arrastre pasaría por 'p1', 'p2', 'p3' sin tocar el historial…
    h.cerrar('final');
    expect(h.deshacer('final')).toBe('inicio');
    expect(h.puedeDeshacer()).toBe(false);
  });

  it('un gesto que no cambió nada no ensucia la pila', () => {
    const h = crearHistorial<string>();
    h.abrir('igual');
    h.cerrar('igual');
    expect(h.puedeDeshacer()).toBe(false);
  });

  it('deshacer y rehacer se recorren en los dos sentidos', () => {
    const h = crearHistorial<string>();
    h.registrar('a');
    h.registrar('b');
    expect(h.deshacer('c')).toBe('b');
    expect(h.deshacer('b')).toBe('a');
    expect(h.puedeDeshacer()).toBe(false);
    expect(h.rehacer('a')).toBe('b');
    expect(h.rehacer('b')).toBe('c');
    expect(h.puedeRehacer()).toBe(false);
  });

  it('tomar un camino nuevo borra el futuro', () => {
    const h = crearHistorial<string>();
    h.registrar('a');
    h.deshacer('b');
    expect(h.puedeRehacer()).toBe(true);
    h.registrar('a');
    expect(h.puedeRehacer()).toBe(false);
  });

  it('el tope acota la memoria tirando lo más viejo', () => {
    const h = crearHistorial<number>(3);
    for (let i = 0; i < 10; i++) h.registrar(i);
    const vistos: number[] = [];
    let actual = 10;
    while (h.puedeDeshacer()) {
      actual = h.deshacer(actual)!;
      vistos.push(actual);
    }
    // Solo sobreviven los 3 últimos: 9, 8, 7.
    expect(vistos).toEqual([9, 8, 7]);
  });

  it('`limpiar` tira las dos pilas y el gesto abierto', () => {
    const h = crearHistorial<string>();
    h.registrar('a');
    h.abrir('b');
    h.limpiar();
    h.cerrar('c');
    expect(h.puedeDeshacer()).toBe(false);
    expect(h.puedeRehacer()).toBe(false);
  });

  it('acepta un comparador propio: sirve para modelos que no son la misma referencia', () => {
    const h = crearHistorial<{ v: number }>(50, (a, b) => a.v === b.v);
    h.abrir({ v: 1 });
    h.cerrar({ v: 1 });
    expect(h.puedeDeshacer()).toBe(false);
    h.abrir({ v: 1 });
    h.cerrar({ v: 2 });
    expect(h.puedeDeshacer()).toBe(true);
  });
});
