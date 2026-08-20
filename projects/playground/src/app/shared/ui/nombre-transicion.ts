import { DestroyRef, Directive, ElementRef, effect, inject, input } from '@angular/core';

/**
 * Pone `view-transition-name` en un elemento SOLO mientras está cerca de la pantalla.
 *
 * No es una micro-optimización: es lo que hace viable la transición. Medido en la cuadrícula de 180
 * iconos con todas las tarjetas nombradas, filtrar dejaba el peor cuadro en **238–253 ms** y solo 11
 * cuadros pintados en medio segundo — un congelón, no una animación. El navegador tiene que tomar,
 * componer y animar una foto por cada nombre, y 180 fotos no salen gratis.
 *
 * Limitarlo a lo visible no cambia NADA de lo que se ve: una tarjeta que viaja fuera del viewport no
 * la mira nadie. El margen extra cubre lo que está a punto de entrar al hacer scroll.
 *
 * Un solo `IntersectionObserver` compartido entre todas las instancias: 180 observadores costarían
 * más que el problema que vienen a resolver.
 */
const MARGEN = '240px';

let observador: IntersectionObserver | null = null;
const registro = new WeakMap<Element, (visible: boolean) => void>();

function compartido(): IntersectionObserver {
  observador ??= new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) registro.get(e.target)?.(e.isIntersecting);
    },
    { rootMargin: MARGEN },
  );
  return observador;
}

@Directive({ selector: '[appNombreTransicion]' })
export class NombreTransicion {
  readonly nombre = input.required<string>({ alias: 'appNombreTransicion' });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private visible = false;

  constructor() {
    if (typeof IntersectionObserver !== 'undefined') {
      registro.set(this.el, (v) => {
        this.visible = v;
        this.aplicar();
      });
      compartido().observe(this.el);
    } else {
      // Sin observador se nombra siempre: peor rendimiento, pero la transición sigue siendo correcta.
      this.visible = true;
    }

    // El nombre puede cambiar si el elemento se reutiliza para otro icono (`track` por nombre lo
    // evita hoy, pero la directiva no debería depender de eso).
    effect(() => {
      this.nombre();
      this.aplicar();
    });

    inject(DestroyRef).onDestroy(() => {
      registro.delete(this.el);
      observador?.unobserve(this.el);
    });
  }

  private aplicar(): void {
    this.el.style.viewTransitionName = this.visible ? this.nombre() : '';
  }
}
