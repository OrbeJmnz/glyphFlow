import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AnimatedIconDef, MaxIconComponent, bellIcon } from 'glyphflow';
import { Taller } from '../../core/taller';

/**
 * El otro lado del "Exportar JSON" del panel de detalle: pega el JSON de vuelta y se previsualiza
 * con el MISMO mecanismo que usa el resto del playground, `[iconDef]`. No hay una ruta de import
 * "especial" — si esto renderiza, es la prueba de que la API pública alcanza para round-trip.
 */
@Component({
  selector: 'app-icon-import',
  imports: [MaxIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-import.html',
  styleUrl: './icon-import.css',
})
export class IconImport {
  protected readonly entrada = signal('');
  protected readonly abierto = signal(false);
  /** De dónde vino lo que está cargado, cuando no lo pegó el usuario. */
  protected readonly desdeEditor = signal<string | null>(null);

  constructor() {
    // Si el editor de geometría mandó una forma, entra por ESTA misma puerta: se rellena el JSON y
    // se abre el panel. No hay una ruta privilegiada para el traspaso — si el importador público
    // no alcanzara para recibirlo, sería señal de que a la API le falta algo, no de que haga falta
    // un atajo interno.
    const pieza = inject(Taller).recoger();
    if (!pieza) return;
    this.desdeEditor.set(pieza.nombre);
    this.abierto.set(true);
    this.entrada.set(
      JSON.stringify(
        {
          icono: pieza.nombre,
          viewBox: pieza.def.viewBox,
          shapes: pieza.def.shapes,
          animations: pieza.def.animations,
        },
        null,
        2,
      ),
    );
  }

  protected readonly resultado = computed<
    { def: AnimatedIconDef; nombre: string } | { error: string } | null
  >(() => {
    const texto = this.entrada().trim();
    if (!texto) return null;
    let json: unknown;
    try {
      json = JSON.parse(texto);
    } catch {
      return { error: 'JSON inválido — revisa comas y llaves.' };
    }
    if (typeof json !== 'object' || json === null) return { error: 'Se esperaba un objeto.' };
    const obj = json as Record<string, unknown>;
    if (!Array.isArray(obj['shapes'])) return { error: 'Falta "shapes" (debe ser un arreglo).' };
    if (typeof obj['animations'] !== 'object' || obj['animations'] === null) {
      return { error: 'Falta "animations" (debe ser un objeto).' };
    }
    return {
      nombre: typeof obj['icono'] === 'string' ? obj['icono'] : '(sin nombre)',
      def: {
        viewBox: obj['viewBox'] as string | undefined,
        shapes: obj['shapes'],
        animations: obj['animations'],
      } as AnimatedIconDef,
    };
  });

  protected alternar(): void {
    this.abierto.update((v) => !v);
  }

  /** Ejemplo real, no inventado: el JSON que el panel de detalle exportaría para `bell`. */
  protected cargarEjemplo(): void {
    this.entrada.set(
      JSON.stringify(
        {
          icono: 'bell',
          viewBox: bellIcon.viewBox,
          shapes: bellIcon.shapes,
          animations: bellIcon.animations,
        },
        null,
        2,
      ),
    );
  }
}
