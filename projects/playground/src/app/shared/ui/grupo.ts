import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * El contenedor de un grupo de controles relacionados donde normalmente uno está activo: la
 * velocidad del header, los filtros del catálogo, los modos y resoluciones del bench, las variantes
 * del panel de detalle. Ese patrón aparecía en 6 plantillas, cada una re-declarando el mismo fondo
 * redondeado y el mismo espaciado.
 *
 * Aporta algo que las copias sueltas se saltaban: el `role="group"` con su etiqueta. Sin eso, un
 * lector de pantalla lee seis botones sin decir de qué grupo son ni para qué sirven juntos.
 */
@Component({
  selector: 'app-grupo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (titulo) {
      <span class="grupo-tit">{{ titulo }}</span>
    }
    <ng-content />
  `,
  host: {
    class: 'ui-grupo',
    '[attr.role]': 'rol',
    '[attr.aria-label]': 'etiqueta || titulo || null',
  },
})
export class Grupo {
  /** Rótulo visible a la izquierda del grupo («velocidad», «solo»…). */
  @Input() titulo?: string;
  /** Nombre accesible cuando no hay título visible, o cuando debe decir algo más completo. */
  @Input() etiqueta?: string;
  /**
   * `radiogroup` cuando el grupo es una elección EXCLUYENTE y sus botones son `role="radio"`.
   *
   * No es cosmético: con `radiogroup`, el lector anuncia "1 de 4" y el teclado espera que las
   * flechas muevan la selección. Prometerlo sin implementar las flechas sería peor que dejarlo en
   * `group` — por eso solo lo pide quien las implementa.
   */
  @Input() rol: 'group' | 'radiogroup' = 'group';
}
