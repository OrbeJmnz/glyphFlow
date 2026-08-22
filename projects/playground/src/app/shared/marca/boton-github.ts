import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MaxIconComponent, starIcon, type AnimatedIconDef } from 'glyphflow';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { estrellas, formatearEstrellas, URL_REPO } from '../../core/github';

/**
 * «Star on GitHub»: en reposo la marca de GitHub, y al pasar el puntero sale hacia arriba mientras
 * entra desde abajo la estrella, con un destello que aparece girando un pelo después.
 *
 * **Todo el movimiento es CSS, sin una línea de JavaScript.** Con `element.animate()` habría que
 * cablear `mouseenter`/`mouseleave`/`focus`/`blur` y, sobre todo, resolver a mano qué pasa cuando
 * alguien saca el puntero A MEDIA entrada: una transición de CSS interpola desde donde iba, y una
 * animación de WAAPI arrancaría de cero dando un salto. El caso de sacar el ratón rápido es el
 * normal, no el raro.
 *
 * `:focus-visible` acompaña a `:hover` en cada regla: con teclado el botón se ve igual de vivo.
 */
@Component({
  selector: 'app-boton-github',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MaxIconComponent, TranslocoPipe],
  template: `
    <a
      class="gh"
      [href]="url"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="etiqueta()"
    >
      <span class="capas" aria-hidden="true">
        <span class="capa capa-marca">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </span>

        <span class="capa capa-estrella">
          <!-- El propio motor. Con trigger=group se cuelga del hover de este enlace, así que la
               estrella SE DIBUJA justo mientras entra. -->
          <max-icon [iconDef]="estrella" [size]="16" trigger="group" />
          <span class="destello">
            <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
              <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
            </svg>
          </span>
        </span>
      </span>

      <span class="texto">{{ 'marca.github.texto' | transloco }}</span>

      <!--
        Único dato async de todo el playground (ver core/github.ts). Mientras no llega no se pinta
        NADA en vez de un hueco reservado: el conteo entra al final de una fila que ya está puesta,
        así que aparecer no recorre nada de lo que hay a su izquierda.
      -->
      @if (conteo() !== null) {
        <span class="conteo">{{ conteo() }}</span>
      }
    </a>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    /*
     * El resorte de la casa: ζ = 0.73, sobrepaso 1.0265. Es la MISMA curva que usa <max-icon-morph>
     * con spring="snappy".
     *
     * Está copiada y no importada porque "SPRING_SNAPPY" vive en la librería pero NO sale en su
     * "public-api", así que un consumidor —y el playground lo es, consume desde npm— no la puede
     * pedir. Exportarla es una mejora pendiente del paquete; mientras tanto, esto es una cadena de
     * CSS, no código duplicado.
     */
    .gh {
      --resorte: linear(
        0,
        0.0636,
        0.1905,
        0.3809,
        0.5302,
        0.6626,
        0.7725,
        0.8587,
        0.9227,
        0.9763,
        1.0024,
        1.0175,
        1.0247,
        1.0265,
        1.0251,
        1.0208,
        1.0168,
        1.0128,
        1.0092,
        1.0063,
        1.0039,
        1.0018,
        1.0007,
        1,
        1
      );

      display: inline-flex;
      align-items: center;
      gap: 10px;
      height: 36px;
      padding: 0 18px;
      border: 1px solid var(--gf-borde);
      border-radius: 40px;
      background: var(--gf-velo);
      color: var(--gf-texto);
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -0.01em;
      text-decoration: none;
      cursor: pointer;
      transition:
        background 0.15s ease,
        transform 0.15s ease;
    }

    .gh:hover,
    .gh:focus-visible {
      background: var(--gf-velo-fuerte);
      transform: scale(1.02);
    }

    /* El hundido al presionar gana al crecido del hover: en un clic los dos están activos. */
    .gh:active {
      transform: scale(0.96);
    }

    /* Caja fija de 16px: las dos capas se apilan encima sin que el texto se mueva al cambiar. */
    .capas {
      position: relative;
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
        transform 0.34s var(--resorte),
        /* La opacidad va aparte y con un easing normal: está limitada a [0,1] por spec, así que el
           sobrepaso del resorte se aplanaría solo y sin avisar. Solo "transform" lo aprovecha. */
        opacity 0.16s ease;
    }

    .capa-estrella {
      color: var(--gf-estrella);
      transform: translateY(15px) scale(0.8);
      opacity: 0;
    }

    .gh:hover .capa-marca,
    .gh:focus-visible .capa-marca {
      transform: translateY(-15px) scale(0.8);
      opacity: 0;
    }

    .gh:hover .capa-estrella,
    .gh:focus-visible .capa-estrella {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    /* El destello entra 50 ms tarde: llegando junto con la estrella se leen como una sola mancha. */
    .destello {
      position: absolute;
      top: -6px;
      right: -5px;
      display: grid;
      color: var(--gf-destello);
      transform: translateY(10px) rotate(-45deg) scale(0);
      opacity: 0;
      transition:
        transform 0.34s 0.05s var(--resorte),
        opacity 0.16s 0.05s ease;
    }

    .gh:hover .destello,
    .gh:focus-visible .destello {
      transform: translateY(0) rotate(0) scale(1);
      opacity: 1;
    }

    .conteo {
      padding-left: 10px;
      border-left: 1px solid var(--gf-borde);
      color: var(--gf-texto-medio);
      /* Tabular: el ancho no baila cuando el conteo pasa de 99 a 100. */
      font-variant-numeric: tabular-nums;
    }

    /*
     * El sitio documenta que la librería respeta "prefers-reduced-motion"; el chrome no puede ser la
     * excepción. Se conserva el CAMBIO de icono —que es información— y se quita el movimiento.
     */
    @media (prefers-reduced-motion: reduce) {
      .gh,
      .capa,
      .destello {
        transition-property: opacity, background;
        transition-duration: 0.12s;
      }

      .gh:hover,
      .gh:focus-visible,
      .gh:active {
        transform: none;
      }
    }

    @media (max-width: 860px) {
      /* Primero cae el rótulo, que es lo prescindible: el icono y el número siguen diciendo todo. */
      .texto {
        display: none;
      }

      .gh {
        padding: 0 14px;
      }
    }
  `,
})
export class BotonGithub {
  protected readonly url = URL_REPO;
  protected readonly estrella: AnimatedIconDef = starIcon;

  protected readonly conteo = computed(() => {
    const n = estrellas();
    return n === null ? null : formatearEstrellas(n);
  });

  /**
   * El conteo se pinta abreviado («1.2k») para que el header no crezca, pero eso no se puede leer en
   * voz alta. La etiqueta lleva el número entero, y el destino cuando todavía no se sabe.
   *
   * La rama elige la CLAVE, no el texto — `translateSignal` resuelve la interpolación de `{{n}}`
   * solo en las dos claves que la llevan; en la de "sin conteo" el param simplemente no se usa.
   */
  private readonly claveEtiqueta = computed(() => {
    const n = estrellas();
    if (n === null) return 'marca.github.ariaSinConteo';
    return n === 1 ? 'marca.github.ariaConUna' : 'marca.github.ariaConVarias';
  });
  protected readonly etiqueta = translateSignal(
    this.claveEtiqueta,
    computed(() => ({ n: estrellas() })),
  );
}
