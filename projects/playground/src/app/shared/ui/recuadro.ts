import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  GfIconComponent,
  infoIcon,
  rulerIcon,
  triangleAlertIcon,
  type AnimatedIconDef,
} from 'glyphflow';

/** Los tres significados que antes compartían un solo recuadro gris. */
export type TipoRecuadro = 'caso' | 'nota' | 'regla';

/**
 * El recuadro al margen de un patrón, tipado.
 *
 * Hasta T22 los nueve usaban el MISMO estilo —gris con borde izquierdo— para tres cosas que no se
 * parecen: qué pasa cuando algo falla, una aclaración de alcance, y un criterio de diseño. Medido
 * en el sitio publicado: los nueve devolvían el mismo color de borde y el mismo fondo, así que
 * distinguirlos exigía leerlos enteros.
 *
 * El icono viene de la propia librería y va `trigger="manual"`: es una señal de tipo, no un adorno
 * que se mueva. Un recuadro que se anima al pasar el ratón compite con el demo de al lado, que sí
 * es lo que hay que tocar.
 */
@Component({
  selector: 'app-recuadro',
  imports: [GfIconComponent, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recuadro.html',
  styleUrl: './recuadro.css',
})
export class Recuadro {
  readonly tipo = input.required<TipoRecuadro>();

  /** Ya traducido: el llamador resuelve la clave, porque cada patrón tiene la suya. */
  readonly texto = input.required<string>();

  private readonly ICONOS: Record<TipoRecuadro, AnimatedIconDef> = {
    caso: triangleAlertIcon,
    nota: infoIcon,
    regla: rulerIcon,
  };

  protected readonly icono = computed(() => this.ICONOS[this.tipo()]);
}
