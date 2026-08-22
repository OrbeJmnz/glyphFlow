import { ChangeDetectionStrategy, Component, Input, model } from '@angular/core';

/**
 * El campo de búsqueda: filtrar los curados en el editor, y elegir iconos en el picker del lab.
 *
 * Usa `model()` en vez de un `@Input` + `@Output` a mano, así que el consumidor escribe
 * `[(texto)]="filtro"` y se acabó. Es `type="search"` de verdad — no un `text` disfrazado — para
 * que el navegador ofrezca su botón de limpiar y el teclado móvil muestre la lupa.
 */
@Component({
  selector: 'app-campo-busqueda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      type="search"
      class="ui-campo"
      [value]="texto()"
      [attr.placeholder]="marcador"
      [attr.aria-label]="etiqueta || marcador"
      (input)="texto.set($any($event.target).value)"
    />
  `,
  host: { class: 'ui-campo-envoltorio' },
})
export class CampoBusqueda {
  /** Enlazable en dos sentidos: `[(texto)]="filtro"`. */
  readonly texto = model('');
  @Input() marcador = '';
  /** Nombre accesible cuando el marcador no alcanza para explicarlo. */
  @Input() etiqueta?: string;
}
