import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GfIconComponent, type AnimatedIconDef } from 'glyphflow';

/**
 * El relevo de iconos del «Star on GitHub», para cualquier botón o enlace: en reposo un icono, y
 * al pasar el puntero sale hacia arriba mientras entra desde abajo el otro, dibujándose.
 *
 * El acento que llega un pelo después NO viene de fábrica: se proyecta con un `[acento]`, porque
 * tiene que decir algo de ESA acción. La estrella de GitHub es literal (ahí se dan estrellas); la
 * misma estrella en «Empezar» o en un filtro es adorno repetido. Sin `[acento]`, no hay ninguno.
 * El `<svg acento>` se dibuja sobre una caja de 28px con el icono en el centro (de 6 a 22), así
 * cada consumidor lo coloca en coordenadas del propio icono.
 *
 * Mismo reparto que `BotonGithub`: el movimiento es CSS (una transición interpola desde donde iba
 * cuando alguien saca el puntero a media entrada; WAAPI arrancaría de cero con un salto) y el
 * dibujo lo pone el propio motor. `trigger="group"` se cuelga del hover del control que contiene
 * al icono, así que no hace falta cablear nada desde fuera: se pone dentro del `<a>` o del
 * `<button>` y listo.
 *
 * El hover se lee con `:host-context(a:hover)` y no con un `:hover` propio: el que se pasa por
 * encima es el botón entero, no la caja de 16px del icono.
 *
 * Lo que varía entre consumidores se abre sin inputs nuevos, para que la API siga siendo dos:
 * - Un reposo que no está en el catálogo (la marca de GitHub) se proyecta con `[reposo]` en vez de
 *   pasar `reposo`.
 * - `--relevo-tono` en el host tiñe el icono que entra (la estrella amarilla, el corazón rosa).
 * - `--relevo-acento-desde` / `--relevo-acento-hasta` cambian cómo entra el acento; por defecto
 *   crece desde `scale(0.6)`, y la estrella de GitHub llega girando desde -45°.
 */
@Component({
  selector: 'app-relevo-icono',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GfIconComponent],
  host: { 'aria-hidden': 'true' },
  template: `
    <span class="capa capa-reposo">
      @if (reposo(); as icono) {
        <gf-icon [iconDef]="icono" [size]="16" trigger="manual" />
      }
      <ng-content select="[reposo]" />
    </span>
    <span class="capa capa-entrada">
      <gf-icon [iconDef]="entrada()" [size]="16" trigger="group" />
      <span class="acento"><ng-content select="[acento]" /></span>
    </span>
  `,
  styles: `
    /* Caja fija: las dos capas se apilan encima sin que el texto del botón se mueva al cambiar. */
    :host {
      position: relative;
      display: inline-block;
      flex: none;
      width: 16px;
      height: 16px;
    }

    .capa {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      transition:
        transform 0.34s var(--gf-resorte),
        /* La opacidad va aparte y con un easing normal: está limitada a [0,1] por spec, así que el
           sobrepaso del resorte se aplanaría solo y sin avisar. */
        opacity 0.16s ease;
    }

    .capa-entrada {
      color: var(--relevo-tono, inherit);
      transform: translateY(15px) scale(0.8);
      opacity: 0;
    }

    :host-context(a:focus-visible) .capa-reposo,
    :host-context(button:focus-visible) .capa-reposo {
      transform: translateY(-15px) scale(0.8);
      opacity: 0;
    }

    :host-context(a:focus-visible) .capa-entrada,
    :host-context(button:focus-visible) .capa-entrada {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    /* El acento entra 50 ms tarde: llegando junto con el icono se leen como una sola mancha. */
    .acento {
      position: absolute;
      inset: -6px;
      display: grid;
      pointer-events: none;
      transform: var(--relevo-acento-desde, scale(0.6));
      opacity: 0;
      transition:
        transform 0.34s 0.05s var(--gf-resorte),
        opacity 0.16s 0.05s ease;
    }

    :host-context(a:focus-visible) .acento,
    :host-context(button:focus-visible) .acento {
      transform: var(--relevo-acento-hasta, scale(1));
      opacity: 1;
    }

    /*
     * El hover, solo donde hay hover de verdad. En táctil, el navegador aplica :hover al TOCAR y
     * lo deja puesto hasta que se toca otra cosa: el relevo se quedaba a medias, con el icono de
     * entrada clavado. :focus-visible queda fuera de la media query a propósito: el teclado no
     * depende de si la pantalla tiene puntero.
     */
    @media (hover: hover) {
      :host-context(a:hover) .capa-reposo,
      :host-context(button:hover) .capa-reposo {
        transform: translateY(-15px) scale(0.8);
        opacity: 0;
      }

      :host-context(a:hover) .capa-entrada,
      :host-context(button:hover) .capa-entrada {
        transform: translateY(0) scale(1);
        opacity: 1;
      }

      :host-context(a:hover) .acento,
      :host-context(button:hover) .acento {
        transform: var(--relevo-acento-hasta, scale(1));
        opacity: 1;
      }
    }

    /* Se conserva el CAMBIO de icono —es información— y se quita el movimiento. */
    @media (prefers-reduced-motion: reduce) {
      .capa,
      .acento {
        transition-property: opacity;
        transition-duration: 0.12s;
      }
    }

    :host-context([data-motion='off']) .capa,
    :host-context([data-motion='off']) .acento {
      transition-property: opacity;
      transition-duration: 0.12s;
    }
  `,
})
export class RelevoIcono {
  /** Lo que se ve en reposo. No se anima: sale entero hacia arriba. Sin él, se proyecta `[reposo]`. */
  readonly reposo = input<AnimatedIconDef>();
  /** Lo que entra al pasar el puntero, dibujándose con su propia coreografía. */
  readonly entrada = input.required<AnimatedIconDef>();
}
