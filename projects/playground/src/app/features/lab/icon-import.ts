import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AnimatedIconDef, MaxIconComponent, bellIcon } from 'glyphflow';
import { Taller } from '../../core/taller';
import { Boton } from '../../shared/ui/boton';

/**
 * El otro lado del "Exportar JSON" del panel de detalle: pega el JSON de vuelta y se previsualiza
 * con el MISMO mecanismo que usa el resto del playground, `[iconDef]`. No hay una ruta de import
 * "especial" — si esto renderiza, es la prueba de que la API pública alcanza para round-trip.
 */
@Component({
  selector: 'app-icon-import',
  imports: [MaxIconComponent, Boton, TranslocoPipe],
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

  /**
   * Los mensajes de error viajan como CLAVE, no como texto: `resultado()` no sabe en qué idioma
   * está el usuario, y llamar a `TranslocoService.translate()` aquí sería imperativo y síncrono —
   * el patrón del proyecto es dejar que el template resuelva la clave con el pipe.
   */
  protected readonly resultado = computed<
    { def: AnimatedIconDef; nombre: string | null } | { errorKey: string } | null
  >(() => {
    const texto = this.entrada().trim();
    if (!texto) return null;
    let json: unknown;
    try {
      json = JSON.parse(texto);
    } catch {
      return { errorKey: 'lab.iconImport.errores.jsonInvalido' };
    }
    if (typeof json !== 'object' || json === null) {
      return { errorKey: 'lab.iconImport.errores.noEsObjeto' };
    }
    const obj = json as Record<string, unknown>;
    if (!Array.isArray(obj['shapes'])) {
      return { errorKey: 'lab.iconImport.errores.faltaShapes' };
    }
    if (typeof obj['animations'] !== 'object' || obj['animations'] === null) {
      return { errorKey: 'lab.iconImport.errores.faltaAnimations' };
    }
    return {
      // `null` en vez de un literal '(sin nombre)': el nombre real del usuario nunca debe pasar
      // por el pipe de traducción (podría casualmente ser una clave), así que el fallback se
      // resuelve en el template con `??`, no aquí.
      nombre: typeof obj['icono'] === 'string' ? obj['icono'] : null,
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
