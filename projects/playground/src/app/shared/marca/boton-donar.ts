import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GfIconComponent, coffeeIcon, heartIcon, type AnimatedIconDef } from 'glyphflow';
import { TranslocoPipe } from '@jsverse/transloco';

/**
 * «Donar»: mismo lenguaje que `BotonGithub` a propósito — son los dos botones de apoyo al
 * proyecto, uno al lado del otro en el hero, y uno pareciendo un primo lejano del otro se lee
 * como descuido. En reposo el café; al pasar el puntero sale hacia arriba mientras entra desde
 * abajo el corazón, con un destello que aparece girando un pelo después.
 *
 * Todo el movimiento es CSS — ver el comentario de `BotonGithub` para el porqué (una transición
 * interpola desde donde iba al sacar el puntero a media entrada; WAAPI arrancaría de cero).
 */
@Component({
  selector: 'app-boton-donar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GfIconComponent, TranslocoPipe],
  template: `
    <a
      class="dn"
      [href]="url"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="'marca.donar.aria' | transloco"
    >
      <span class="capas" aria-hidden="true">
        <span class="capa capa-cafe">
          <gf-icon [iconDef]="cafe" [size]="16" trigger="group" />
        </span>

        <span class="capa capa-corazon">
          <!-- El propio motor, igual que en BotonGithub: trigger=group se cuelga del hover de
               este <a>, así que el corazón SE DIBUJA justo mientras entra. -->
          <gf-icon [iconDef]="corazon" [size]="16" trigger="group" />
          <span class="destello">
            <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
              <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
            </svg>
          </span>
        </span>
      </span>

      <span class="texto">{{ 'marca.donar.texto' | transloco }}</span>
    </a>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    /* Mismo resorte que BotonGithub — ver ahí el porqué de copiarlo en vez de importarlo. */
    .dn {
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

    .dn:hover,
    .dn:focus-visible {
      background: var(--gf-velo-fuerte);
      transform: scale(1.02);
    }

    .dn:active {
      transform: scale(0.96);
    }

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
        opacity 0.16s ease;
    }

    .capa-corazon {
      color: var(--gf-rosa);
      transform: translateY(15px) scale(0.8);
      opacity: 0;
    }

    .dn:hover .capa-cafe,
    .dn:focus-visible .capa-cafe {
      transform: translateY(-15px) scale(0.8);
      opacity: 0;
    }

    .dn:hover .capa-corazon,
    .dn:focus-visible .capa-corazon {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

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

    .dn:hover .destello,
    .dn:focus-visible .destello {
      transform: translateY(0) rotate(0) scale(1);
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .dn,
      .capa,
      .destello {
        transition-property: opacity, background;
        transition-duration: 0.12s;
      }

      .dn:hover,
      .dn:focus-visible,
      .dn:active {
        transform: none;
      }
    }

    @media (max-width: 860px) {
      .texto {
        display: none;
      }

      .dn {
        padding: 0 14px;
      }
    }
  `,
})
export class BotonDonar {
  protected readonly url = 'https://buymeacoffee.com/orbejmnz';
  protected readonly cafe: AnimatedIconDef = coffeeIcon;
  protected readonly corazon: AnimatedIconDef = heartIcon;
}
