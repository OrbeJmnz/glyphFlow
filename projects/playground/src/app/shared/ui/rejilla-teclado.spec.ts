import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { RejillaTeclado, siguienteIndice } from './rejilla-teclado';

/**
 * Diez celdas en cuatro columnas, o sea filas `0-3`, `4-7` y `8-9`. La última viene INCOMPLETA a
 * propósito: es donde se rompen las cuentas ingenuas, y es el caso normal en un catálogo que
 * filtra.
 */
const COLUMNAS = 4;
const TOTAL = 10;

function mover(actual: number, tecla: string, conControl = false): number | null {
  return siguienteIndice(actual, { tecla, conControl }, COLUMNAS, TOTAL);
}

describe('siguienteIndice', () => {
  it('avanza y retrocede de una en una', () => {
    expect(mover(0, 'ArrowRight')).toBe(1);
    expect(mover(5, 'ArrowLeft')).toBe(4);
  });

  it('no se sale por los bordes: en el extremo no mueve', () => {
    expect(mover(TOTAL - 1, 'ArrowRight')).toBeNull();
    expect(mover(0, 'ArrowLeft')).toBeNull();
    expect(mover(2, 'ArrowUp')).toBeNull();
    expect(mover(8, 'ArrowDown')).toBeNull();
  });

  it('baja y sube una fila entera', () => {
    expect(mover(1, 'ArrowDown')).toBe(5);
    expect(mover(5, 'ArrowUp')).toBe(1);
  });

  it('bajar a una fila incompleta cae en el último, no al vacío', () => {
    // Sin el tope esto daba 11, fuera de la lista, y los dos últimos solo se alcanzaban con flecha
    // derecha.
    expect(mover(7, 'ArrowDown')).toBe(9);
  });

  it('Home y End trabajan sobre la fila', () => {
    expect(mover(6, 'Home')).toBe(4);
    expect(mover(4, 'End')).toBe(7);
    // Fila incompleta: `End` es el último que existe, no el hueco de la cuarta columna.
    expect(mover(8, 'End')).toBe(9);
  });

  it('con Control, Home y End trabajan sobre la rejilla entera', () => {
    expect(mover(6, 'Home', true)).toBe(0);
    expect(mover(1, 'End', true)).toBe(TOTAL - 1);
  });

  it('cualquier otra tecla no mueve nada', () => {
    expect(mover(3, 'a')).toBeNull();
    expect(mover(3, 'PageDown')).toBeNull();
    expect(mover(3, 'Tab')).toBeNull();
  });

  it('aguanta una rejilla vacía', () => {
    expect(siguienteIndice(0, { tecla: 'ArrowRight', conControl: false }, 4, 0)).toBeNull();
  });
});

@Component({
  imports: [RejillaTeclado],
  template: `
    <div appRejillaTeclado class="rejilla" style="grid-template-columns: 1fr 1fr 1fr 1fr">
      @for (n of celdas(); track n) {
        <article data-celda>{{ n }}</article>
      }
    </div>
  `,
})
class Anfitrion {
  readonly celdas = signal([0, 1, 2, 3, 4, 5]);
}

/**
 * Lo que se prueba aquí es el CABLEADO — quién es tabulable y quién recibe el foco —, no la
 * aritmética, que ya la cubre la tabla de arriba contra la función pura.
 *
 * Lo que puede romperse sin que nadie lo note es el reparto tras filtrar: si el observador se
 * desconecta, la rejilla se queda sin ninguna celda tabulable y deja de ser alcanzable con `Tab`.
 * No hay error, no hay aviso — simplemente ya no se puede llegar.
 */
describe('RejillaTeclado', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<Anfitrion>>;
  let celdas: () => HTMLElement[];

  beforeEach(async () => {
    fixture = TestBed.createComponent(Anfitrion);
    fixture.detectChanges();
    await fixture.whenStable();
    // La directiva reparte en `afterNextRender`, que no ha corrido al volver de `whenStable()`.
    await esperarObservador();
    celdas = () => Array.from(fixture.nativeElement.querySelectorAll('[data-celda]'));
  });

  it('deja UNA sola parada de tabulación', () => {
    expect(celdas().map((c) => c.tabIndex)).toEqual([0, -1, -1, -1, -1, -1]);
  });

  it('la flecha mueve el foco y el tabindex se va con él', () => {
    celdas()[0].focus();
    celdas()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(celdas().map((c) => c.tabIndex)).toEqual([-1, 0, -1, -1, -1, -1]);
    expect(document.activeElement).toBe(celdas()[1]);
  });

  it('sigue habiendo una parada después de filtrar', async () => {
    // `Ctrl+End` y no `End` a secas: con cuatro columnas, `End` se queda en el final de la PRIMERA
    // fila. Lo que hace falta aquí es llevar el `tabindex` a la última celda de todas.
    celdas()[0].focus();
    celdas()[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', ctrlKey: true, bubbles: true }),
    );
    expect(celdas()[5].tabIndex).toBe(0);

    // El filtro deja fuera a la celda que llevaba el `tabindex`.
    fixture.componentInstance.celdas.set([0, 1]);
    fixture.detectChanges();
    await esperarObservador();

    expect(celdas().map((c) => c.tabIndex)).toEqual([0, -1]);
  });

  it('no cancela las teclas que no son suyas', () => {
    celdas()[0].focus();
    const ajena = new KeyboardEvent('keydown', {
      key: 'PageDown',
      bubbles: true,
      cancelable: true,
    });
    celdas()[0].dispatchEvent(ajena);

    // Si esto se cancelara, el usuario perdería el desplazamiento de página con el teclado.
    expect(ajena.defaultPrevented).toBe(false);
  });
});

/** El `MutationObserver` entrega en microtarea; un `await` de macrotarea garantiza que ya corrió. */
function esperarObservador(): Promise<void> {
  return new Promise((r) => setTimeout(r, 0));
}
