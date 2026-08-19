import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { alternarTema, conectarTema, tema } from './tema';

@Component({ template: '' })
class Anfitrion {
  constructor() {
    conectarTema();
  }
}

describe('tema', () => {
  beforeEach(() => {
    localStorage.removeItem('gf:tema');
    tema.set('oscuro');
    delete document.documentElement.dataset['tema'];
  });

  it('arranca en oscuro mientras no exista la paleta clara', () => {
    // Deliberado: si sembrara desde `prefers-color-scheme`, a quien tiene el sistema en claro le
    // saldría el sitio oscuro con el icono de sol encendido — el control diciendo una cosa y la
    // pantalla otra. El `matchMedia` entra junto con la paleta, no antes.
    expect(tema()).toBe('oscuro');
  });

  it('alterna en los dos sentidos', () => {
    alternarTema();
    expect(tema()).toBe('claro');
    alternarTema();
    expect(tema()).toBe('oscuro');
  });

  it('escribe data-tema en <html> y persiste la elección', () => {
    const fixture = TestBed.createComponent(Anfitrion);
    fixture.detectChanges();
    expect(document.documentElement.dataset['tema']).toBe('oscuro');

    alternarTema();
    fixture.detectChanges();

    expect(document.documentElement.dataset['tema']).toBe('claro');
    expect(localStorage.getItem('gf:tema')).toBe('claro');
  });
});
