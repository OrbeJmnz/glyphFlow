import { ChangeDetectionStrategy, Component, computed, input, OnDestroy } from '@angular/core';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { checkIcon, copyIcon } from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { Copiador } from './copiar';

/**
 * Un bloque de código con botón de copiar. **El único del sitio**: antes había dos reglas de `pre`
 * casi idénticas (patrones y docs, distintas solo en el `margin` y el fondo) y cuatro
 * implementaciones sueltas de copiar. Los 16 bloques del sitio pasan por aquí.
 *
 * El acuse usa `<gf-icon-morph>` con el par `copy → check` de la propia librería. No es capricho:
 * es el mejor escaparate posible —la página que enseña el patrón lo USA— y de paso significa que
 * si el morph se rompe, se rompe en la portada, no en un rincón.
 *
 * El botón aparece al pasar el ratón, pero **siempre** al recibir foco de teclado: un control que
 * solo existe con hover es un control que no existe para quien navega con Tab. En pantallas sin
 * hover se queda visible, porque ahí no hay forma de descubrirlo.
 */
@Component({
  selector: 'app-bloque-codigo',
  imports: [GfIconMorphComponent, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bloque">
      <pre><code>{{ codigo() }}</code></pre>
      <button
        type="button"
        class="copiar"
        [class.hecho]="copiador.copiado()"
        [class.fallo]="copiador.fallo()"
        [attr.aria-label]="etiqueta()"
        (click)="copiar()"
      >
        <gf-icon-morph [icon]="icono()" [size]="15" spring="bouncy" />
      </button>

      <!--
        El acuse para lectores de pantalla. La región viva va sobre un nodo que YA existe en el
        DOM y solo cambia de texto: si el elemento entero apareciera y desapareciera, muchos
        lectores no anuncian nada, porque la región nace con el contenido ya puesto.
        (Sin comillas invertidas aquí dentro: cierran el template literal a media clase.)
      -->
      <p class="visualmente-oculto" aria-live="polite">{{ anuncio() }}</p>

      @if (copiador.fallo()) {
        <p class="aviso-fallo">{{ 'codigo.fallo' | transloco }}</p>
      }
    </div>
  `,
  styleUrl: './bloque-codigo.css',
})
export class BloqueCodigo implements OnDestroy {
  /** El código, en texto plano. Sin escapar nada: no pasa por el parser de HTML. */
  readonly codigo = input.required<string>();

  protected readonly copiador = new Copiador();

  /** El icono dice en qué estado ESTÁ, no a dónde va — al revés que el botón de tema. */
  protected readonly icono = computed<MorphIcon>(() =>
    this.copiador.copiado() ? checkIcon : copyIcon,
  );

  /* Una sola lectura del estado alimenta el `aria-label` y el acuse: con lecturas sueltas es
     cuestión de tiempo que el botón diga una cosa y el lector de pantalla otra. */
  private readonly clave = computed(() =>
    this.copiador.copiado() ? 'codigo.copiado' : 'codigo.copiar',
  );
  protected readonly etiqueta = translateSignal(this.clave);

  /* Vacío mientras no ha pasado nada: una región viva que arranca con texto lo anunciaría al
     montar la página, y el sitio tiene hasta cinco bloques por página. */
  private readonly claveAnuncio = computed(() => (this.copiador.copiado() ? 'codigo.copiado' : ''));
  protected readonly anuncio = translateSignal(this.claveAnuncio);

  protected copiar(): void {
    void this.copiador.copiar(this.codigo());
  }

  ngOnDestroy(): void {
    this.copiador.destruir();
  }
}
