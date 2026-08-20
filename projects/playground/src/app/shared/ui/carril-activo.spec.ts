import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CarrilActivo } from './carril-activo';

@Component({
  imports: [CarrilActivo],
  template: `
    <div appCarrilActivo class="carril">
      <button type="button" [class.activo]="cual() === 0">uno</button>
      <button type="button" [class.activo]="cual() === 1">dos</button>
    </div>
  `,
})
class Anfitrion {
  readonly cual = signal<number | null>(0);
}

/**
 * Lo que se prueba es el CABLEADO, no los píxeles: en el entorno de pruebas no hay layout, así que
 * `offsetLeft`/`offsetWidth` devuelven 0 para todo y medir aquí no probaría nada. Que el indicador
 * caiga en el lugar exacto se verificó en navegador real.
 *
 * Lo que sí puede romperse sin que nadie lo note es que los observadores dejen de estar conectados
 * — ahí el indicador se queda clavado en la primera posición para siempre, sin ningún error.
 */
describe('CarrilActivo', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<Anfitrion>>;
  let carril: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Anfitrion);
    fixture.detectChanges();
    await fixture.whenStable();
    // La directiva arranca en `afterNextRender`, que no ha corrido todavía al volver de
    // `whenStable()`. Sin esta espera se afirma contra un host que aún no ha medido nada.
    await esperarObservador();
    carril = fixture.nativeElement.querySelector('.carril');
  });

  it('publica las variables del hijo activo', () => {
    expect(carril.style.getPropertyValue('--ind-o')).toBe('1');
    expect(carril.style.getPropertyValue('--ind-x')).toMatch(/px$/);
    expect(carril.style.getPropertyValue('--ind-w')).toMatch(/px$/);
  });

  it('se apaga cuando no hay nadie activo, en vez de mentir sobre dónde estás', async () => {
    fixture.componentInstance.cual.set(null);
    fixture.detectChanges();
    await esperarObservador();

    expect(carril.style.getPropertyValue('--ind-o')).toBe('0');
  });

  it('vuelve a medir cuando la clase se mueve de un hijo a otro', async () => {
    fixture.componentInstance.cual.set(null);
    fixture.detectChanges();
    await esperarObservador();
    expect(carril.style.getPropertyValue('--ind-o')).toBe('0');

    // Si el MutationObserver no estuviera conectado, esto se quedaría en 0 y nadie se enteraría.
    fixture.componentInstance.cual.set(1);
    fixture.detectChanges();
    await esperarObservador();

    expect(carril.style.getPropertyValue('--ind-o')).toBe('1');
  });

  it('desconecta los observadores al destruirse', async () => {
    fixture.destroy();
    fixture.componentInstance.cual.set(null);
    await esperarObservador();

    // Sigue en 1: el observador ya no escucha, que es justo lo que evita fugas al navegar.
    expect(carril.style.getPropertyValue('--ind-o')).toBe('1');
  });
});

/** El `MutationObserver` entrega en microtarea; un `await` de macrotarea garantiza que ya corrió. */
function esperarObservador(): Promise<void> {
  return new Promise((r) => setTimeout(r, 0));
}
