import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';

export type VarianteChip = 'pestana' | 'contorno';

/**
 * La píldora: el control más repetido del sitio — navegación, filtros, presets, modos del bench.
 * 14 usos en 4 archivos antes de existir como componente.
 *
 * El selector es de ATRIBUTO (`button[app-chip]`, `a[app-chip]`) y no de elemento. Eso importa:
 * el host ES el `<button>` o el `<a>`, así que no hay envoltorio extra, `routerLink` y
 * `routerLinkActive` siguen funcionando encima, y el foco cae donde debe sin ayuda. Un
 * `<app-chip>` que envolviera un botón habría roto las tres cosas.
 */
@Component({
  selector: 'button[app-chip], a[app-chip]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    class: 'chip',
    '[class.activo]': 'activo',
    '[class.es-contorno]': "variante === 'contorno'",
  },
})
export class Chip {
  /** Pintado como seleccionado. Aparte, quien lo use debe decir POR QUÉ con `aria-pressed`/`aria-current`. */
  @Input({ transform: booleanAttribute }) activo = false;
  /**
   * `pestana` (default) va sin borde hasta que se activa: para carriles donde el fondo del grupo
   * ya dice que van juntas. `contorno` siempre trae borde, para píldoras sueltas sobre la página,
   * donde sin él no se leen como control.
   */
  @Input() variante: VarianteChip = 'pestana';
}
