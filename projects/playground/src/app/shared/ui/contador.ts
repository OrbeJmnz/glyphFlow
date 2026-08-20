import { ChangeDetectionStrategy, Component, afterNextRender, input, signal } from '@angular/core';

/**
 * Cuenta de 0 al valor final al montarse — no con WAAPI (que anima propiedades CSS, no texto), sino
 * con `requestAnimationFrame` leyendo un `ease-out` cúbico a mano.
 *
 * Con movimiento reducido no cuenta: se pinta el valor final de una, igual que ya hace cada pieza
 * animada del sitio.
 */
@Component({
  selector: 'app-contador',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ texto() }}`,
})
export class Contador {
  readonly valor = input.required<number>();
  readonly decimales = input(0);
  /** Va pegado al número, así que trae su propio espacio cuando lo necesita (p. ej. " KB"). */
  readonly sufijo = input('');

  protected readonly texto = signal('');

  constructor() {
    afterNextRender(() => this.animar());
  }

  private animar(): void {
    const destino = this.valor();
    const decimales = this.decimales();
    const sufijo = this.sufijo();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.texto.set(formatear(destino, decimales, sufijo));
      return;
    }

    const duracion = 1800;
    const inicio = performance.now();
    const paso = (ahora: number) => {
      const avance = Math.min(1, (ahora - inicio) / duracion);
      const suavizado = 1 - Math.pow(1 - avance, 3);
      this.texto.set(formatear(destino * suavizado, decimales, sufijo));
      if (avance < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }
}

/** «1 767», con espacio como separador de miles — igual que las cifras escritas a mano del hero. */
function formatear(n: number, decimales: number, sufijo: string): string {
  const [entero, decimal] = n.toFixed(decimales).split('.');
  const agrupado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (decimal ? `${agrupado}.${decimal}` : agrupado) + sufijo;
}
