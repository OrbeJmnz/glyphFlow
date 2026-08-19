import { ChangeDetectionStrategy, Component, Input, model } from '@angular/core';

/**
 * El deslizador. Hoy lo usa el scrubber para recorrer una animación con la mano.
 *
 * Es un `<input type="range">` de verdad, no un div con arrastre: eso trae gratis el teclado
 * (flechas, Inicio/Fin), el soporte táctil y la semántica que el lector de pantalla ya entiende.
 * Reimplementarlo con `pointermove` — que es lo que suele hacerse — significa reponer las tres
 * cosas a mano y olvidarse de al menos una.
 */
@Component({
  selector: 'app-deslizador',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      type="range"
      class="ui-deslizador"
      [min]="min"
      [max]="max"
      [step]="paso"
      [value]="valor()"
      [attr.aria-label]="etiqueta"
      [attr.aria-valuetext]="textoValor"
      (input)="valor.set(+$any($event.target).value)"
    />
  `,
  host: { class: 'ui-deslizador-envoltorio' },
})
export class Deslizador {
  readonly valor = model(0);
  @Input() min = 0;
  @Input() max = 100;
  @Input() paso: number | 'any' = 1;
  @Input() etiqueta?: string;
  /**
   * Qué LEE el lector de pantalla en vez del número crudo. Un `0.42` no dice nada; «42% de la
   * animación» sí. Es la diferencia entre cumplir la etiqueta y ser usable.
   */
  @Input() textoValor?: string;
}
