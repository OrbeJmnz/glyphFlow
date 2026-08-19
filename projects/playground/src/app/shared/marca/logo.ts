import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';

export type VarianteLogo = 'claro' | 'oscuro';

/**
 * El logotipo de glyphflow, con su archivo resuelto por tema.
 *
 * Existe como componente por ENCAPSULACIÓN, no por reuso: hoy solo lo usa el header. Lo que
 * encapsula es qué archivo va con qué tema, la proporción del arte y el texto accesible — cosas
 * que en línea ensucian el shell y que se olvidan a la mitad al copiarlas.
 *
 * Un solo `<img>` con el `src` calculado, no dos ocultos por CSS: lo segundo baja los dos archivos
 * (43 KB cada uno) para mostrar uno. Y sin `srcset` de respaldo a PNG: `srcset` no es un fallback
 * — si el navegador lo entiende, GANA sobre `src`, así que habría servido el PNG siempre. El SVG no
 * necesita respaldo; los PNG existen para `og:image` y el README, donde el scraper no renderiza SVG.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [attr.src]="fuente()"
      [attr.width]="ancho()"
      [attr.height]="alto"
      alt="glyphflow"
      decoding="async"
    />
  `,
  // La altura va en el HOST, no solo en el `<img>`. Con `height: %` sobre un host de altura
  // automática la referencia es circular y el navegador cae al tamaño intrínseco del archivo: el
  // logo salía a 66 px en vez de los 28 pedidos. Con el host dimensionado, el 100% sí significa algo.
  host: { '[style.height.px]': 'alto' },
  styles: [
    ':host { display: inline-flex; line-height: 0; }',
    'img { display: block; height: 100%; width: auto; }',
  ],
})
export class Logo {
  /** Alto en píxeles. El ancho se deduce de la proporción real del arte, 390×132. */
  @Input({ required: true })
  set alto(v: number) {
    this._alto.set(v);
  }
  get alto(): number {
    return this._alto();
  }
  private readonly _alto = signal(28);

  /**
   * Qué versión pintar. Por ahora el shell la deja en `oscuro` porque el sitio no tiene otro tema;
   * cuando exista el toggle se ata a la señal del tema y este componente no cambia.
   */
  @Input()
  set variante(v: VarianteLogo) {
    this._variante.set(v);
  }
  private readonly _variante = signal<VarianteLogo>('oscuro');

  /** 390 × 132 es el viewBox real de los cuatro SVG. */
  protected readonly ancho = computed(() => Math.round((this._alto() * 390) / 132));

  protected readonly fuente = computed(() =>
    this._variante() === 'claro'
      ? '/images/glyphflow-logo-light.svg'
      : '/images/glyphflow-logo.svg',
  );
}
