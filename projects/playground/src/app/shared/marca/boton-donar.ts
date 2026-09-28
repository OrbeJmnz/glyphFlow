import { ChangeDetectionStrategy, Component } from '@angular/core';
import { coffeeIcon, heartIcon, type AnimatedIconDef } from 'glyphflow';
import { RelevoIcono } from '../ui/relevo-icono';
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
  imports: [RelevoIcono, TranslocoPipe],
  template: `
    <a
      class="dn"
      [href]="url"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="'marca.donar.aria' | transloco"
    >
      <!-- El relevo de RelevoIcono, igual que en BotonGithub: café → corazón, con su destello. -->
      <app-relevo-icono class="relevo" [reposo]="cafe" [entrada]="corazon">
        <svg acento class="destello" viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
          <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
        </svg>
      </app-relevo-icono>

      <span class="texto">{{ 'marca.donar.texto' | transloco }}</span>
    </a>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .dn {
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

    /* El tono del corazón y la entrada girando del destello, igual que en BotonGithub. */
    .relevo {
      --relevo-tono: var(--gf-rosa);
      --relevo-acento-desde: translateY(10px) rotate(-45deg) scale(0.94);
      --relevo-acento-hasta: translateY(0) rotate(0) scale(1);
    }

    .destello {
      justify-self: end;
      align-self: start;
      margin-right: 1px;
      color: var(--gf-destello);
    }

    @media (prefers-reduced-motion: reduce) {
      .dn {
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
