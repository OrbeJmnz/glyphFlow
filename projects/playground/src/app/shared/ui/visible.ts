import { DestroyRef, Directive, ElementRef, afterNextRender, inject, output } from '@angular/core';

/**
 * Avisa cuando el elemento entra al viewport. Nada más — no oculta, no carga, no anima.
 *
 * Nació para el final de la rejilla de iconos, que monta un tramo y crece al llegar abajo. Se
 * queda en `shared/` porque el patrón «centinela al final de una lista» no tiene nada de esa
 * página, y la alternativa era el tercer `IntersectionObserver` escrito a mano del sitio.
 *
 * `rootMargin` generoso a propósito: avisa ANTES de que el centinela se vea, así lo siguiente ya
 * está montado cuando el visitante llega. Con margen 0 se ve el hueco y luego el relleno.
 */
@Directive({
  selector: '[appVisible]',
})
export class Visible {
  /** Se emite CADA vez que entra, no solo la primera: quien solo quiera una, que desuscriba. */
  readonly visible = output<void>();

  private readonly host = inject(ElementRef<HTMLElement>);
  // Se resuelven AQUÍ y no dentro del callback: `afterNextRender` corre fuera del contexto de
  // inyección, así que un `inject()` ahí adentro truena en tiempo de ejecución.
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // `afterNextRender` porque en el prerender no hay `IntersectionObserver`, y este sitio se
    // prerenderiza entero. Ahí el centinela no avisa nunca — que es lo correcto: el HTML estático
    // no tiene a nadie haciendo scroll.
    afterNextRender(() => {
      if (typeof IntersectionObserver !== 'function') return;
      const observador = new IntersectionObserver(
        (entradas) => {
          for (const e of entradas) if (e.isIntersecting) this.visible.emit();
        },
        { rootMargin: '600px 0px' },
      );
      observador.observe(this.host.nativeElement as HTMLElement);
      this.destroyRef.onDestroy(() => observador.disconnect());
    });
  }
}
