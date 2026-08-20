import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Envuelve un trigger y muestra `texto` en una burbuja al hover/focus. Sin posicionamiento
 * dinámico a propósito: pensado para triggers de tamaño fijo en una grilla regular, donde "siempre
 * centrada arriba" es una posición válida en todos los casos y no hace falta calcularla.
 *
 * `abajo` y `derecha` son los únicos escapes: centrada/arriba se corta cuando el trigger vive
 * pegado al borde de un contenedor con scroll (`overflow` recorta lo que se sale de SU caja, no
 * del viewport) — los botones de copiar del drawer están pegados tanto arriba como a la derecha.
 */
@Component({
  selector: 'app-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    <span class="burbuja" role="tooltip">{{ texto() }}</span>
  `,
  host: {
    class: 'ui-tooltip',
    '[class.abajo]': 'abajo()',
    '[class.derecha]': 'derecha()',
  },
})
export class Tooltip {
  readonly texto = input.required<string>();
  readonly abajo = input(false);
  readonly derecha = input(false);
}
