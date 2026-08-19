import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Boton } from './boton';
import { CampoBusqueda } from './campo-busqueda';
import { Chip } from './chip';
import { Deslizador } from './deslizador';
import { Grupo } from './grupo';

/**
 * Lo que se prueba aquí NO es el CSS — eso se juzga mirando. Es el contrato que un consumidor puede
 * romper sin darse cuenta: que el host siga siendo el <button> (no un envoltorio), que el enlace de
 * dos sentidos escriba de vuelta, y que la semántica accesible salga sola en vez de depender de que
 * cada página se acuerde de ponerla.
 */
@Component({
  imports: [Boton, CampoBusqueda, Chip, Deslizador, Grupo],
  template: `
    <button type="button" app-chip [activo]="activo()">píldora</button>
    <a app-chip variante="contorno" href="#">enlace</a>
    <button type="button" app-boton variante="primario" compacto>acción</button>
    <app-grupo titulo="velocidad"><button type="button" app-chip>1×</button></app-grupo>
    <app-campo-busqueda [(texto)]="filtro" marcador="buscar…" />
    <app-deslizador [(valor)]="pos" [max]="10" etiqueta="posición" textoValor="42%" />
  `,
})
class Anfitrion {
  // Señal, no campo plano: la app corre zoneless, así que mutar un campo no marca nada sucio.
  readonly activo = signal(false);
  filtro = '';
  pos = 3;
}

describe('primitivas de shared/ui', () => {
  function montar() {
    const fixture = TestBed.createComponent(Anfitrion);
    fixture.detectChanges();
    return { fixture, html: fixture.nativeElement as HTMLElement };
  }

  it('el chip ES el botón, sin envoltorio de por medio', () => {
    const { html } = montar();
    const pildora = html.querySelector('button[app-chip]')!;
    // Si el selector fuera de elemento, aquí habría un <app-chip> alrededor y el foco caería mal.
    expect(pildora.tagName).toBe('BUTTON');
    expect(pildora.classList.contains('chip')).toBe(true);
    expect(pildora.querySelector('*')).toBeNull();
    expect(html.querySelector('app-chip')).toBeNull();
  });

  it('el chip funciona igual sobre un <a> — es lo que usa la navegación', () => {
    const { html } = montar();
    const enlace = html.querySelector('a[app-chip]')!;
    expect(enlace.tagName).toBe('A');
    expect(enlace.classList.contains('es-contorno')).toBe(true);
  });

  it('`activo` se refleja cuando el consumidor lo cambia', () => {
    const { fixture, html } = montar();
    expect(html.querySelector('button[app-chip]')!.classList.contains('activo')).toBe(false);
    fixture.componentInstance.activo.set(true);
    fixture.detectChanges();
    expect(html.querySelector('button[app-chip]')!.classList.contains('activo')).toBe(true);
  });

  it('las variantes del botón son clases cerradas, no combinaciones a mano', () => {
    const { html } = montar();
    const boton = html.querySelector('button[app-boton]')!;
    expect(boton.classList.contains('ui-boton')).toBe(true);
    expect(boton.classList.contains('es-primario')).toBe(true);
    // `compacto` es un atributo sin valor: sin booleanAttribute llegaría como '' y sería falso.
    expect(boton.classList.contains('es-compacto')).toBe(true);
    expect(boton.classList.contains('es-fantasma')).toBe(false);
  });

  it('el grupo aporta la semántica que las copias sueltas se saltaban', () => {
    const { html } = montar();
    const grupo = html.querySelector('app-grupo')!;
    expect(grupo.getAttribute('role')).toBe('group');
    // Sin etiqueta explícita cae al título visible, para no obligar a repetirlo.
    expect(grupo.getAttribute('aria-label')).toBe('velocidad');
  });

  it('el campo de búsqueda escribe de vuelta en el consumidor', () => {
    const { fixture, html } = montar();
    const input = html.querySelector<HTMLInputElement>('app-campo-busqueda input')!;
    expect(input.type).toBe('search');
    expect(input.getAttribute('aria-label')).toBe('buscar…');
    input.value = 'bell';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.filtro).toBe('bell');
  });

  it('el deslizador emite número, no la cadena cruda del input', () => {
    const { fixture, html } = montar();
    const input = html.querySelector<HTMLInputElement>('app-deslizador input')!;
    expect(input.type).toBe('range');
    expect(input.value).toBe('3');
    expect(input.getAttribute('aria-valuetext')).toBe('42%');
    input.value = '7';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // El `+` del componente: sin él llegaría '7' y cualquier suma aguas abajo concatenaría.
    expect(fixture.componentInstance.pos).toBe(7);
  });
});
