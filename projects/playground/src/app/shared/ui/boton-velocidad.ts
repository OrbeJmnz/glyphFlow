import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { translateSignal } from '@jsverse/transloco';
import { elegirVelocidad, PRESETS_VELOCIDAD, velocidadGlobal } from '../../core/duration-scale';
import { Tooltip } from './tooltip';

/**
 * El control de velocidad global, en UN botón que cicla — no un carril con las 4 opciones a la
 * vista. Vive aquí y no repetido en cada sitio donde hace falta: el header lo usaba DOS veces
 * (barra + panel móvil) con la MISMA lógica copiada, y esa duplicación ya causó un bug real —
 * cuando solo se actualizaba una copia, la otra se quedaba anunciando el valor viejo. Un
 * componente único, leyendo la misma señal global las dos veces, lo cierra de raíz.
 *
 * `<button>` nativo: Enter/Space ciclan gratis, sin `(keydown)` a mano.
 */
@Component({
  selector: 'app-boton-velocidad',
  imports: [Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-tooltip [texto]="tooltipTexto()">
      <button
        type="button"
        class="ui-boton-velocidad"
        [class.pulso]="pulso()"
        [attr.aria-label]="etiquetaAria()"
        (click)="ciclar()"
      >
        {{ actual().etiqueta }}
      </button>
    </app-tooltip>
  `,
})
export class BotonVelocidad {
  private readonly indice = computed(() =>
    Math.max(
      0,
      PRESETS_VELOCIDAD.findIndex((p) => p.valor === velocidadGlobal()),
    ),
  );
  protected readonly actual = computed(() => PRESETS_VELOCIDAD[this.indice()]);
  private readonly siguiente = computed(
    () => PRESETS_VELOCIDAD[(this.indice() + 1) % PRESETS_VELOCIDAD.length],
  );

  /** Feedback visual breve al ciclar — apagado bajo `prefers-reduced-motion` vía CSS. */
  protected readonly pulso = signal(false);

  protected readonly tooltipTexto = translateSignal(
    'shell.velocidad.botonTooltip',
    computed(() => ({ siguiente: this.siguiente().etiqueta })),
  );
  protected readonly etiquetaAria = translateSignal(
    'shell.velocidad.botonAria',
    computed(() => ({ actual: this.actual().etiqueta, siguiente: this.siguiente().etiqueta })),
  );

  protected ciclar(): void {
    elegirVelocidad(this.siguiente().valor);
    this.pulso.set(true);
    setTimeout(() => this.pulso.set(false), 220);
  }
}
