import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';

/**
 * El logotipo de glyphflow, con su archivo resuelto por tema.
 *
 * Existe como componente por ENCAPSULACIÓN, no por reuso: hoy solo lo usa el header. Lo que
 * encapsula es qué archivo va con qué tema, la proporción del arte y el texto accesible — cosas
 * que en línea ensucian el shell y que se olvidan a la mitad al copiarlas.
 *
 * El archivo lo elige CSS con `data-theme`, no un `src` calculado en TypeScript: el sitio se
 * prerenderiza, y el HTML estático se horneaba con la variante oscura; en claro se veía el logo
 * equivocado hasta que Angular hidrataba. `data-theme` lo pone el script del `<head>` antes de
 * pintar, así que el primer cuadro ya sale bien. Un fondo con `role="img"` y no dos `<img>`
 * ocultos por CSS: lo segundo baja los dos archivos (43 KB cada uno) para mostrar uno.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="logo" role="img" aria-label="glyphflow" [style.width.px]="ancho()"></span>`,
  // La altura va en el HOST: con `height: %` sobre un host de altura automática la referencia es
  // circular. Con el host dimensionado, el 100% del span sí significa algo.
  host: { '[style.height.px]': 'alto' },
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }

    .logo {
      display: block;
      height: 100%;
      background: url('/images/glyphflow-logo.svg') center / contain no-repeat;
    }

    :host-context([data-theme='light']) .logo {
      background-image: url('/images/glyphflow-logo-light.svg');
    }
  `,
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

  /** 390 × 132 es el viewBox real de los cuatro SVG. */
  protected readonly ancho = computed(() => Math.round((this._alto() * 390) / 132));
}
