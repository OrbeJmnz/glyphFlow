import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { alternarTema, conectarTema, tema } from './tema';

@Component({ template: '' })
class Anfitrion {
  constructor() {
    conectarTema();
  }
}

describe('tema', () => {
  beforeEach(() => {
    localStorage.removeItem('gf:theme');
    localStorage.removeItem('gf:tema');
    tema.set('oscuro');
    delete document.documentElement.dataset['theme'];
    document.querySelector('meta[name="theme-color"]')?.remove();
  });

  function montar() {
    const fixture = TestBed.createComponent(Anfitrion);
    fixture.detectChanges();
    return fixture;
  }

  it('alterna en los dos sentidos', () => {
    // Sin origen no hay transición que animar: cambia y ya. Es también el camino de los navegadores
    // sin View Transitions y el de quien pidió movimiento reducido.
    alternarTema();
    expect(tema()).toBe('claro');
    alternarTema();
    expect(tema()).toBe('oscuro');
  });

  it('escribe data-theme en <html> y persiste la elección', () => {
    const fixture = montar();
    expect(document.documentElement.dataset['theme']).toBe('dark');

    alternarTema();
    fixture.detectChanges();

    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('gf:theme')).toBe('light');
  });

  it('hereda la elección guardada con la clave vieja de antes de T19', async () => {
    // `gf:tema` fue la clave hasta que T19 puso en inglés todo lo que se ve desde fuera. Sin este
    // rescate, cada visitante que ya había elegido tema volvería al default en su próxima visita —
    // y el síntoma sería «el sitio se me olvidó el tema», imposible de atribuir a un renombrado.
    localStorage.setItem('gf:tema', 'claro');
    // La semilla se lee al EVALUAR el módulo, no dentro de una función que se pueda volver a
    // llamar: la única forma de probarla es volver a cargarlo.
    vi.resetModules();
    const recargado = await import('./tema');
    expect(recargado.tema()).toBe('claro');
  });

  it('deja el DOM listo DENTRO del cambio, sin esperar al efecto', () => {
    montar();
    // Es lo que hace posible la transición: el callback de `startViewTransition` tiene que retornar
    // con el DOM ya cambiado, y con Angular sin zonas el efecto todavía no corrió. Si esto se
    // rompiera, la foto «nueva» saldría idéntica a la vieja y no se vería ninguna transición.
    alternarTema();
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('mueve el theme-color, que es la barra del navegador en Android', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', '#121212');
    document.head.appendChild(meta);

    montar();
    alternarTema();

    expect(meta.getAttribute('content')).toBe('#ffffff');
    alternarTema();
    expect(meta.getAttribute('content')).toBe('#121212');
    meta.remove();
  });

  it('sobrevive sin localStorage en vez de tirar la app', () => {
    montar();
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new DOMException('bloqueado');
    };
    try {
      // Modo privado o cookies bloqueadas: la elección dura lo que la pestaña, pero funciona.
      expect(() => alternarTema()).not.toThrow();
      expect(document.documentElement.dataset['theme']).toBe('light');
    } finally {
      Storage.prototype.setItem = original;
    }
  });
});
