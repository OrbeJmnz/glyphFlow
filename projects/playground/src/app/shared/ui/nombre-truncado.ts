import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Marca el host con `.nombre-truncado` **solo si** su etiqueta `[data-name]` viene cortada con
 * elipsis. Quien consuma la clase decide qué hacer con ella — hoy, mostrar un tooltip propio.
 *
 * Antes ponía el `title` nativo del navegador. Se cambió porque el nativo nunca respondía al foco
 * de teclado —solo al `mouseenter`—, y quien navega el catálogo sin ratón se quedaba sin la
 * información. Con una clase + CSS, la misma burbuja sirve para los dos casos.
 *
 * Se mide al entrar el ratón o el foco y no al pintar: `scrollWidth > clientWidth` obliga al
 * navegador a calcular layout, y hacerlo cientos de veces en el primer render es justo el tipo de
 * trabajo que se nota al cargar. Al hover/foco es una medición, y llega de sobra antes de que la
 * burbuja tenga que aparecer.
 *
 * El lector de pantalla no depende de esto: la tarjeta ya lleva su `aria-label` con el nombre
 * completo. Esto es una ayuda visual, no la fuente accesible.
 */
@Directive({
  selector: '[appNombreTruncado]',
})
export class NombreTruncado {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  @HostListener('mouseenter')
  @HostListener('focusin')
  protected alEntrarOEnfocar(): void {
    const el = this.host.nativeElement;
    const etiqueta = el.querySelector<HTMLElement>('[data-name]');
    const cortado = !!etiqueta && etiqueta.scrollWidth > etiqueta.clientWidth;
    el.classList.toggle('nombre-truncado', cortado);
  }
}
