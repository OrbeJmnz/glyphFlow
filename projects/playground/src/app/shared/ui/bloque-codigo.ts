import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  OnDestroy,
} from '@angular/core';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { checkIcon, copyIcon } from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { Copiador } from './copiar';

/** Las dos vistas del mismo código. Tipo aparte: `typeof this.X` no es válido en posición de tipo. */
type Vista = 'fragmento' | 'completo';

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
  templateUrl: './bloque-codigo.html',
  styleUrl: './bloque-codigo.css',
})
export class BloqueCodigo implements OnDestroy {
  /** El código, en texto plano. Sin escapar nada: no pasa por el parser de HTML. */
  readonly codigo = input.required<string>();

  /**
   * La versión pegable: imports, componente y todo. Opcional — sin ella no aparece el conmutador,
   * porque no todo bloque tiene una (`npm i glyphflow` no necesita un componente alrededor).
   *
   * El fragmento se queda de vista por defecto: es el que ENSEÑA, sin el ruido de los imports. El
   * completo es el que se USA, y por eso es el que copia el botón cuando está puesto.
   */
  readonly completo = input<string>();

  /**
   * La carpeta de `examples/` que corresponde a este bloque, si tiene una. Opcional: no todo
   * snippet es un proyecto (`npm i glyphflow` no se abre en StackBlitz).
   *
   * Se enlaza a GitHub y NO se manda el código por POST. La diferencia no es de comodidad: lo que
   * está en `examples/` es un proyecto real que el CI compila contra el paquete PUBLICADO, así que
   * el botón no puede ofrecer algo que no funciona. Un payload armado en el cliente solo se puede
   * validar abriendo StackBlitz a mano, y el día que deje de arrancar no se entera nadie.
   */
  readonly ejemplo = input<string>();

  protected readonly urlEjemplo = computed(() => {
    const dir = this.ejemplo();
    return dir
      ? `https://stackblitz.com/github/OrbeJmnz/glyphFlow/tree/main/examples/${dir}`
      : null;
  });

  protected readonly VISTAS: readonly Vista[] = ['fragmento', 'completo'];
  protected readonly vista = signal<Vista>('fragmento');

  /** Lo que se ve Y lo que se copia: una sola fuente, para que nunca copies algo distinto de lo que lees. */
  protected readonly mostrado = computed(() =>
    this.vista() === 'completo' ? (this.completo() ?? this.codigo()) : this.codigo(),
  );

  /** Flechas dentro del radiogroup — es lo que el rol PROMETE. Mismo trato que la velocidad del shell. */
  protected teclaVista(ev: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault();
    const siguiente: Vista = this.vista() === 'fragmento' ? 'completo' : 'fragmento';
    this.vista.set(siguiente);
    const boton = ev.currentTarget as HTMLElement;
    const hermanos = boton.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]');
    hermanos?.[this.VISTAS.indexOf(siguiente)]?.focus();
  }

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
    void this.copiador.copiar(this.mostrado());
  }

  ngOnDestroy(): void {
    this.copiador.destruir();
  }
}
