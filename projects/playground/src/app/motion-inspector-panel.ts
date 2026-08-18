import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AnimatedIconDef, MaxIconComponent } from 'glyphflow';
import { analizarIcono, VariantReport } from './motion-inspector';

/**
 * Panel del Motion Inspector: muestra el reporte de `analizarIcono()` para el icono seleccionado
 * en el grid. Solo lectura — no cambia nada de la coreografía, solo la describe.
 */
@Component({
  selector: 'app-motion-inspector-panel',
  imports: [MaxIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './motion-inspector-panel.html',
  styleUrl: './motion-inspector-panel.css',
})
export class MotionInspectorPanel {
  readonly nombre = input.required<string>();
  readonly def = input.required<AnimatedIconDef>();
  readonly cerrar = output<void>();

  protected readonly reporte = computed(() => analizarIcono(this.nombre(), this.def()));

  protected duracion(v: VariantReport): string {
    return v.duracionMs === null ? 'en vivo (autoDraw)' : `${v.duracionMs} ms`;
  }
}
