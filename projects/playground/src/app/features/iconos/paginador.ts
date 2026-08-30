import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { GfIconComponent, chevronLeftIcon, chevronRightIcon } from 'glyphflow';
import { rangoPaginas } from './paginacion';

/**
 * Números + elipsis de `rangoPaginas()`. No sabe nada de iconos ni de tamaño de página — el texto
 * «Mostrando X–Y de Z» vive en quien lo consume, porque ESE contenido sí es del catálogo.
 *
 * Vive junto a `Iconos` y no en `shared/ui/`: hoy es su único consumidor, y la regla del propio
 * `shared/ui/README.md` es clara — «una primitiva con un solo uso no es una primitiva, es
 * indirección». Si el día de mañana otra lista larga necesita paginar, es candidata a subir.
 */
@Component({
  selector: 'app-paginador',
  imports: [GfIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="paginador-flecha"
      [disabled]="pagina() <= 1"
      [attr.aria-label]="etiquetaAnterior()"
      (click)="cambiar.emit(pagina() - 1)"
    >
      <gf-icon [iconDef]="flechaIzq" [size]="16" trigger="manual" />
    </button>
    @for (item of items(); track $index) {
      @if (item === 'salto') {
        <span class="paginador-salto" aria-hidden="true">&hellip;</span>
      } @else {
        <button
          type="button"
          class="paginador-num"
          [class.activo]="item === pagina()"
          [attr.aria-current]="item === pagina() ? 'page' : null"
          [attr.aria-label]="etiquetaPagina() + ' ' + item"
          (click)="cambiar.emit(item)"
        >
          {{ item }}
        </button>
      }
    }
    <button
      type="button"
      class="paginador-flecha"
      [disabled]="pagina() >= totalPaginas()"
      [attr.aria-label]="etiquetaSiguiente()"
      (click)="cambiar.emit(pagina() + 1)"
    >
      <gf-icon [iconDef]="flechaDer" [size]="16" trigger="manual" />
    </button>
  `,
  host: {
    class: 'ui-paginador',
    role: 'navigation',
    '[attr.aria-label]': 'etiqueta()',
  },
})
export class Paginador {
  readonly pagina = input.required<number>();
  readonly totalPaginas = input.required<number>();
  readonly etiqueta = input('Pagination');
  readonly etiquetaAnterior = input('Previous page');
  readonly etiquetaSiguiente = input('Next page');
  readonly etiquetaPagina = input('Page');
  readonly cambiar = output<number>();

  protected readonly flechaIzq = chevronLeftIcon;
  protected readonly flechaDer = chevronRightIcon;
  protected readonly items = computed(() => rangoPaginas(this.pagina(), this.totalPaginas()));
}
