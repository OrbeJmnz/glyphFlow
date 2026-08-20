import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { conTransicion, conectarTransiciones } from './transicion';

@Component({ template: '' })
class Anfitrion {
  constructor() {
    conectarTransiciones();
  }
}

/**
 * El entorno de pruebas no define `matchMedia`, así que no hay nada que espiar: se define.
 * `conTransicion` lo lee de `document.defaultView`, que aquí es este mismo `window`.
 */
function fijarMovimientoReducido(reducido: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: () => ({ matches: reducido }) as MediaQueryList,
  });
}

/** Doble mínimo de `ViewTransition` con lo que el coordinador usa. */
function transicionFalsa() {
  let resolverLista!: () => void;
  const t = {
    ready: new Promise<void>((r) => (resolverLista = r)),
    finished: Promise.resolve(),
    updateCallbackDone: Promise.resolve(),
    skipTransition: vi.fn(),
    resolverLista: () => resolverLista(),
  };
  return t;
}

describe('coordinador de transiciones', () => {
  beforeEach(() => {
    TestBed.createComponent(Anfitrion).detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(document, 'startViewTransition');
    Reflect.deleteProperty(window, 'matchMedia');
  });

  it('sin soporte del navegador, aplica el cambio igual', () => {
    // El entorno de pruebas no trae la API, que es justo el caso a cubrir: la degradación no puede
    // significar que el filtro deje de filtrar.
    const cambio = vi.fn();
    conTransicion(cambio);
    expect(cambio).toHaveBeenCalledOnce();
  });

  it('con movimiento reducido no abre transición, pero el cambio SÍ ocurre', () => {
    const empezar = vi.fn();
    Object.defineProperty(document, 'startViewTransition', { value: empezar, configurable: true });
    fijarMovimientoReducido(true);

    const cambio = vi.fn();
    conTransicion(cambio);

    expect(cambio).toHaveBeenCalledOnce();
    expect(empezar).not.toHaveBeenCalled();
  });

  it('el cambio va DENTRO del callback, no antes', () => {
    const orden: string[] = [];
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: (cb: () => void) => {
        orden.push('transicion abierta');
        cb();
        return transicionFalsa();
      },
    });
    fijarMovimientoReducido(false);

    conTransicion(() => orden.push('cambio aplicado'));

    // Al revés, la foto «vieja» saldría con el estado nuevo y no se vería ninguna transición.
    expect(orden).toEqual(['transicion abierta', 'cambio aplicado']);
  });

  it('interrumpe la transición anterior en vez de encimar dos', () => {
    const abiertas: ReturnType<typeof transicionFalsa>[] = [];
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: (cb: () => void) => {
        cb();
        const t = transicionFalsa();
        abiertas.push(t);
        return t;
      },
    });
    fijarMovimientoReducido(false);

    const aplicados: number[] = [];
    conTransicion(() => aplicados.push(1));
    conTransicion(() => aplicados.push(2));

    // Es LA razón de que este archivo exista: dos `startViewTransition` a la vez se cancelan entre
    // sí, y sin coordinar, cambiar de tema mientras se filtra dejaba una a medias sin ningún error.
    // Las dos aplican su cambio: interrumpir la ANIMACIÓN no puede significar perder el estado.
    expect(aplicados).toEqual([1, 2]);
    expect(abiertas).toHaveLength(2);
    expect(abiertas[0].skipTransition).toHaveBeenCalledOnce();
    expect(abiertas[1].skipTransition).not.toHaveBeenCalled();
  });
});
