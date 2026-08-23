import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Pone `title` en el host **solo si** su etiqueta `[data-nombre]` viene cortada con elipsis.
 *
 * Por qué no siempre: un `title` en las 911 tarjetas repite en un tooltip nativo lo que ya se lee
 * en la tarjeta. Estorba —tapa la vecina, tarda en salir— y no aporta nada cuando el nombre cabe
 * entero. Solo vale la pena cuando hay algo que el ojo NO puede leer.
 *
 * Se mide al entrar el ratón y no al pintar: `scrollWidth > clientWidth` obliga al navegador a
 * calcular layout, y hacerlo 911 veces en el primer render es justo el tipo de trabajo que se nota
 * al cargar. Al hover es una medición, y llega de sobra antes de que el tooltip nativo aparezca.
 *
 * El lector de pantalla no depende de esto: la tarjeta ya lleva su `aria-label` con el nombre
 * completo. Esto es una ayuda para el ratón, no la fuente accesible.
 */
@Directive({
  selector: '[appTituloSiTruncado]',
})
export class TituloSiTruncado {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  @HostListener('mouseenter')
  protected alEntrar(): void {
    const el = this.host.nativeElement;
    const etiqueta = el.querySelector<HTMLElement>('[data-nombre]');
    if (!etiqueta) return;

    if (etiqueta.scrollWidth > etiqueta.clientWidth) {
      el.title = etiqueta.textContent?.trim() ?? '';
    } else {
      el.removeAttribute('title');
    }
  }
}
