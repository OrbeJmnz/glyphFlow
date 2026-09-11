import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  GfIconComponent,
  chevronDownIcon,
  chevronUpIcon,
  circleMinusIcon,
  circlePlusIcon,
  eyeIcon,
  eyeOffIcon,
  focusIcon,
  listIcon,
} from 'glyphflow';

/**
 * Un renglón del panel. Lo calcula el editor y llega ya resuelto: aquí no se deriva nada del
 * modelo, que es lo que mantiene a este componente fuera del camino caliente del arrastre.
 */
export interface CapaVista {
  indice: number;
  subtrazos: number;
  visible: boolean;
  activa: boolean;
  desplegada: boolean;
  aislada: boolean;
  figuras: number[];
  puedeSubir: boolean;
  puedeBajar: boolean;
}

/**
 * La columna de capas del editor: un renglón por `<path>` del icono.
 *
 * Vive aparte del editor por dos razones, y la segunda es la que forzó el corte:
 *
 * 1. Es presentacional puro. Recibe la lista ya computada y emite intenciones; no toca `modelos`,
 *    ni el historial, ni sabe qué es un `SubPath`. Todo el estado sigue en el editor, que es donde
 *    tiene que estar para que deshacer/rehacer sigan viendo un solo dueño.
 * 2. `editor.css` reventó el presupuesto de Angular para estilos de componente (14 kB): había
 *    llegado a 17.63 kB y el build de producción falla, no avisa. Sus estilos se vienen aquí, a su
 *    propio archivo con su propio presupuesto.
 */
@Component({
  selector: 'app-capas-panel',
  imports: [GfIconComponent, TranslocoPipe],
  templateUrl: './capas-panel.html',
  styleUrl: './capas-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapasPanel {
  readonly capas = input.required<readonly CapaVista[]>();
  /** Cuántas quedan a la vista: con una sola, ocultar y borrar se desactivan. */
  readonly visibles = input.required<number>();

  readonly elegida = output<number>();
  readonly alternadaVisible = output<number>();
  readonly aislada = output<number>();
  readonly desplegada = output<number>();
  readonly borrada = output<number>();
  readonly nueva = output<void>();
  /** El índice y hacia dónde: -1 arriba, +1 abajo. */
  readonly movida = output<{ indice: number; delta: number }>();

  protected readonly iconoVisible = eyeIcon;
  protected readonly iconoOculto = eyeOffIcon;
  protected readonly iconoSubir = chevronUpIcon;
  protected readonly iconoBajar = chevronDownIcon;
  protected readonly iconoAislar = focusIcon;
  protected readonly iconoDesplegar = listIcon;
  protected readonly iconoBorrar = circleMinusIcon;
  protected readonly iconoNueva = circlePlusIcon;
}
