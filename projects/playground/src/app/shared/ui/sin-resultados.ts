import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import type { AnimatedIconDef } from 'glyphflow';
import { GfIconComponent } from 'glyphflow';
import { Boton } from './boton';
import { Chip } from './chip';

/**
 * Cero resultados, dicho por alguien que lo siente.
 *
 * La cara la pone un icono DEL CATÁLOGO animado con el motor de la casa, no un emoji: la regla del
 * proyecto es que ningún emoji hace de icono, y además aquí sería la única forma torpe de fallar —
 * un sitio que vende iconos animados enseñando el muñeco de otra tipografía justo en el momento en
 * que pide disculpas.
 *
 * `trigger="auto"` con `loop`: es el único elemento de la pantalla, y una cara que respira sostiene
 * el momento mejor que una congelada. `respectReducedMotion` lo apaga solo para quien lo pidió.
 *
 * El componente NO sabe buscar ni filtrar: recibe lo que hay que decir y emite lo que el usuario
 * elige. Así sirve igual en el catálogo, en el editor o en el picker.
 */
@Component({
  selector: 'app-sin-resultados',
  imports: [GfIconComponent, Boton, Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cara">
      <gf-icon [iconDef]="icono" [size]="56" trigger="auto" [loop]="true" />
    </div>

    <p class="titulo">{{ titulo }}</p>
    @if (nota) {
      <p class="nota">{{ nota }}</p>
    }

    @if (sugerencias.length) {
      <p class="quizas">{{ etiquetaSugerencias }}</p>
      <div class="sugerencias">
        @for (s of sugerencias; track s) {
          <button type="button" app-chip (click)="elegir.emit(s)">{{ s }}</button>
        }
      </div>
    }

    <div class="acciones">
      @if (etiquetaLimpiar) {
        <button type="button" app-boton compacto (click)="limpiar.emit()">
          {{ etiquetaLimpiar }}
        </button>
      }
      @if (urlPedir) {
        <a [href]="urlPedir" target="_blank" rel="noopener" class="pedir">{{ etiquetaPedir }}</a>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 8px 16px 4px;
      text-align: center;
    }

    /* El disco existe para que la cara no flote sola en el vacío — y para que se lea como una
       ilustración y no como un icono más de la rejilla. */
    .cara {
      position: relative;
      display: grid;
      place-items: center;
      width: 96px;
      height: 96px;
      border-radius: 999px;
      background: var(--gf-panel);
      color: var(--gf-texto-tenue);
    }

    /*
     * El foco respira detrás de la cara: no gira ni cicla de color como la tarjeta seleccionada
     * del catálogo (ese gesto está guardado para "esto es lo elegido") — aquí el mensaje es otro,
     * alguien sigue mirando y no encontró nada, así que el gesto es más quieto: un pulso lento,
     * un solo tono, sin la energía de una selección.
     *
     * Pseudo-elemento y no un fondo en .cara: necesita crecer MÁS ALLÁ del disco al respirar
     * (inset negativo), y un fondo normal se recorta seco en el borde redondeado del contenedor.
     *
     * Sin z-index negativo (la regla del proyecto: sin stacking context propio en el padre, se
     * escapa hacia arriba y pinta detrás de contenido ajeno). En vez de eso, el icono de encima
     * sube con su propio z-index más abajo — el pseudo se queda sin declarar el suyo, que es el
     * patrón seguro.
     */
    .cara::before {
      content: '';
      position: absolute;
      inset: -10px;
      border-radius: inherit;
      background: radial-gradient(circle, var(--gf-marca-3), transparent 70%);
      opacity: 0.18;
      animation: gf-buscar-respira 3.6s ease-in-out infinite;
    }

    @keyframes gf-buscar-respira {
      0%,
      100% {
        opacity: 0.14;
        scale: 0.88;
      }
      50% {
        opacity: 0.42;
        scale: 1.12;
      }
    }

    /* Sube sobre el foco a propósito: sin esto, el z-index:auto de un elemento posicionado pinta
       encima de contenido normal SIN IMPORTAR el orden en el DOM, y la cara quedaba tapada. */
    .cara gf-icon {
      position: relative;
      z-index: 1;
    }

    /* Sigue presente, quieto: es adorno, no información, pero apagarlo del todo dejaría el disco
       más plano de lo que el resto del sitio ya decidió para este mismo halo. */
    @media (prefers-reduced-motion: reduce) {
      .cara::before {
        animation: none;
        opacity: 0.25;
      }
    }

    .titulo {
      margin: 0;
      color: var(--gf-texto);
      font-size: 1.05rem;
      font-weight: 500;
      text-wrap: balance;
    }

    .nota {
      margin: -4px 0 0;
      max-width: 46ch;
      color: var(--gf-texto-tenue);
      font-size: 0.875rem;
      line-height: 1.5;
      text-wrap: balance;
    }

    .quizas {
      margin: 4px 0 0;
      color: var(--gf-texto-tenue);
      font-size: 0.8rem;
    }

    .sugerencias {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }

    .acciones {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 8px 18px;
      margin-top: 4px;
    }

    .pedir {
      border-bottom: 1px solid var(--gf-borde-vivo);
      color: var(--gf-texto-medio);
      font-size: 0.85rem;
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .pedir:hover {
      color: var(--gf-texto);
    }
  `,
})
export class SinResultados {
  /** La cara. Va por `iconDef` y no por `name=`: el sitio no registra el catálogo. */
  @Input({ required: true }) icono!: AnimatedIconDef;
  @Input({ required: true }) titulo = '';
  /** La segunda línea, la que explica. Opcional: sin ella el bloque sigue teniendo sentido. */
  @Input() nota = '';
  @Input() sugerencias: readonly string[] = [];
  @Input() etiquetaSugerencias = '';
  /** Si viene vacío, el botón no se pinta — no hay filtro que limpiar. */
  @Input() etiquetaLimpiar = '';
  @Input() urlPedir = '';
  @Input() etiquetaPedir = '';

  /** Una sugerencia pulsada. El padre decide qué hacer: aquí no se sabe buscar. */
  readonly elegir = output<string>();
  readonly limpiar = output<void>();
}
