import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Publica dónde está el hijo `.activo` como variables CSS del host: `--ind-x`, `--ind-w` y
 * `--ind-o`. Con eso el contenedor puede dibujar UN indicador que se desliza entre opciones en vez
 * de que cada una encienda y apague su propio fondo.
 *
 * Existe porque el carril de velocidad NO necesita esto: sus cuatro píldoras miden lo mismo, así
 * que ahí el desplazamiento es aritmética pura (índice × paso) y no hace falta tocar el DOM. En la
 * navegación los cinco enlaces miden distinto, y no hay forma de saber cuánto sin medir.
 *
 * Se entera por OBSERVADORES, no por el router:
 *
 * - `MutationObserver` sobre la clase — `routerLinkActive` mueve `.activo` de un enlace a otro, y
 *   escuchar la clase funciona igual con el router, con un `@if` o con lo que sea que la ponga.
 * - `ResizeObserver` — el ancho cambia al redimensionar la ventana y al traducir los rótulos.
 * - `document.fonts.ready` — la causa clásica de un indicador descuadrado: se mide con la tipografía
 *   de respaldo, llega Outfit, todo cambia de ancho y nadie vuelve a medir.
 */
@Directive({ selector: '[appCarrilActivo]' })
export class CarrilActivo {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observadorClase?: MutationObserver;
  private observadorTamano?: ResizeObserver;

  constructor() {
    // `afterNextRender` y no el constructor: en el constructor los hijos todavía no existen, así que
    // no habría nada que medir.
    afterNextRender(() => this.arrancar());
    inject(DestroyRef).onDestroy(() => {
      this.observadorClase?.disconnect();
      this.observadorTamano?.disconnect();
    });
  }

  /**
   * Mide PRIMERO y conecta después, y cada observador va detrás de su propia comprobación.
   *
   * No es paranoia de compatibilidad: el entorno de pruebas no trae `ResizeObserver`, y con el
   * `new` al principio la excepción se llevaba por delante la medición inicial — el indicador se
   * quedaba invisible y el error no aparecía por ningún lado. Sin uno de los observadores esto
   * sigue funcionando, solo deja de reaccionar a ESA causa.
   */
  private arrancar(): void {
    const el = this.host.nativeElement;
    this.medir();

    if (typeof MutationObserver !== 'undefined') {
      this.observadorClase = new MutationObserver(() => this.medir());
      // Solo `class`: escribir las variables de estilo aquí mismo no vuelve a dispararlo, así que
      // no hay bucle.
      this.observadorClase.observe(el, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    if (typeof ResizeObserver !== 'undefined') {
      this.observadorTamano = new ResizeObserver(() => this.medir());
      this.observadorTamano.observe(el);
    }

    void el.ownerDocument.fonts?.ready.then(() => this.medir());
  }

  private medir(): void {
    const el = this.host.nativeElement;
    const activo = el.querySelector<HTMLElement>('.activo');

    // Sin nadie activo el indicador se apaga en vez de quedarse en la última posición: mentiría
    // sobre dónde estás.
    if (!activo) {
      el.style.setProperty('--ind-o', '0');
      return;
    }

    // `offsetLeft` es relativo al ancestro posicionado, y el contenedor lo es (lo necesita igual
    // para colocar el indicador). Por eso no hace falta restar rectángulos.
    el.style.setProperty('--ind-x', `${activo.offsetLeft}px`);
    el.style.setProperty('--ind-w', `${activo.offsetWidth}px`);
    el.style.setProperty('--ind-o', '1');
  }
}
