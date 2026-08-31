import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  model,
  viewChild,
} from '@angular/core';
import { GfIconComponent, xIcon } from 'glyphflow';

/**
 * El campo de búsqueda: filtrar los curados en el editor, elegir iconos en el picker del lab y
 * buscar en el catálogo.
 *
 * Usa `model()` en vez de un `@Input` + `@Output` a mano, así que el consumidor escribe
 * `[(texto)]="filtro"` y se acabó. Es `type="search"` de verdad — no un `text` disfrazado — para
 * que el teclado móvil muestre la lupa y el campo se anuncie como lo que es.
 *
 * El botón de limpiar es PROPIO y no el del navegador. El nativo
 * (`::-webkit-search-cancel-button`) no se puede animar ni recibir un cursor, y en un sitio cuyo
 * producto son iconos animados, la única aspa a la vista siendo la del sistema se nota. Con el
 * suyo, el aspa es un icono del catálogo moviéndose con el mismo motor que se vende.
 */
@Component({
  selector: 'app-campo-busqueda',
  imports: [GfIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      #entrada
      type="search"
      class="ui-campo"
      [value]="texto()"
      [attr.placeholder]="marcador"
      [attr.aria-label]="etiqueta || marcador"
      (input)="texto.set($any($event.target).value)"
    />
    @if (texto()) {
      <button
        type="button"
        class="ui-campo-limpiar"
        [attr.aria-label]="limpiarEtiqueta"
        (click)="limpiar()"
      >
        <gf-icon [iconDef]="aspa" [size]="14" trigger="group" />
      </button>
    }
  `,
  styles: `
    :host {
      position: relative;
      display: block;
    }

    /* Fuera el aspa del sistema: la nuestra ocupa su sitio, y las dos juntas serían dos aspas. */
    input::-webkit-search-cancel-button {
      appearance: none;
    }

    /* Sitio para el botón, sólo cuando lo hay: sin texto no hay aspa, y reservarlo siempre dejaría
       un hueco muerto a la derecha del marcador. */
    input:not(:placeholder-shown) {
      padding-right: 2rem;
    }

    .ui-campo-limpiar {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      display: grid;
      place-items: center;
      padding: 4px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--gf-texto-tenue);
      /* Lo que pedía el ticket y lo que la nativa no da: se ve que se puede pulsar. */
      cursor: pointer;
      translate: 0 -50%;
      transition:
        color 0.15s ease,
        background 0.15s ease;
    }

    .ui-campo-limpiar:hover {
      color: var(--gf-texto);
      background: var(--gf-velo-activo);
    }

    .ui-campo-limpiar:focus-visible {
      outline: 2px solid var(--gf-marca-2);
      outline-offset: 1px;
    }
  `,
  host: { class: 'ui-campo-envoltorio' },
})
export class CampoBusqueda {
  /** Enlazable en dos sentidos: `[(texto)]="filtro"`. */
  readonly texto = model('');
  @Input() marcador = '';
  /** Nombre accesible cuando el marcador no alcanza para explicarlo. */
  @Input() etiqueta?: string;
  /**
   * El nombre accesible del botón de limpiar. Lo pone el consumidor, traducido — y NO se envuelve
   * en un `computed`: un `@Input` plano leído desde un computed no lo invalida nunca, así que se
   * quedaría con el primer valor y el botón se anunciaría en el idioma del arranque para siempre.
   */
  @Input() limpiarEtiqueta = 'Clear';

  protected readonly aspa = xIcon;
  private readonly entrada = viewChild<ElementRef<HTMLInputElement>>('entrada');

  protected limpiar(): void {
    this.texto.set('');
    /*
     * El botón desaparece del DOM en cuanto `texto` queda vacío (el `@if` de arriba) -- perder el
     * elemento con foco tira el foco a `<body>`, así que sin este `focus()` quien acaba de limpiar
     * no puede seguir escribiendo sin un click extra al campo.
     */
    this.focus();
  }

  /**
   * Para consumidores que abren este campo dentro de un diálogo y quieren el foco de una.
   * No `viewChild.required`: un consumidor típico llama a esto desde su propio `effect()`
   * reaccionando al mismo signal que recién insertó este componente, y conviene no reventar si
   * llega a llamarse en un instante donde el query todavía no se resolvió.
   */
  focus(): void {
    this.entrada()?.nativeElement.focus();
  }
}
