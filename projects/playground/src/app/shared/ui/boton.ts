import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';

export type VarianteBoton = 'normal' | 'primario' | 'fantasma';

/**
 * El botón de acción, para lo que no es una píldora: copiar, enviar, coreografiar, repetir.
 *
 * Mismo criterio que `Chip` — selector de atributo, el host es el `<button>` o el `<a>`. Y las
 * variantes son un `@Input`, no tres clases sueltas que cada plantilla combina a mano: así el
 * conjunto de estilos posibles es cerrado y se ve en un solo archivo.
 */
@Component({
  selector: 'button[app-boton], a[app-boton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  host: {
    class: 'ui-boton',
    '[class.es-primario]': "variante === 'primario'",
    '[class.es-fantasma]': "variante === 'fantasma'",
    '[class.es-compacto]': 'compacto',
  },
})
export class Boton {
  /**
   * `primario` invierte el contraste (fondo claro sobre tema oscuro) y se reserva para UNA acción
   * por pantalla. `fantasma` no tiene borde: para acciones secundarias dentro de una tarjeta.
   */
  @Input() variante: VarianteBoton = 'normal';
  /** Para botones dentro de tarjetas o listas, donde la altura normal se come el espacio. */
  @Input({ transform: booleanAttribute }) compacto = false;
}
