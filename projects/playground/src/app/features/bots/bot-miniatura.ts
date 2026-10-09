import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, input, untracked, viewChild } from '@angular/core';
import { GfBotComponent, type GfBotMouthKind, type GfKawaiiId } from 'glyphflow/bots';
import { physicalGestures } from 'glyphflow/bots/gestures';
import { hayMovimiento } from '../../core/movimiento';
import { PIELES, type FormaId } from './bots-datos';
import { SHAPES } from './bots-formas';

/**
 * Un bot pequeño de verdad (no una imagen): la lista lateral, las tarjetas de la galería y la franja de expresiones lo usan.
 *
 * Por defecto va con `hoverOnly`: el motor lo deja congelado hasta que el puntero lo toca, así treinta miniaturas no son treinta
 * bots respirando a la vez. Una miniatura que enseña una cara fija (`cara`) no puede ir así: con el bot en pausa el motor ignora
 * `expr()`, y la cara se vuelve a poner cada vez que el motor lo despierta (ver `ponerCara`).
 */
@Component({
  selector: 'app-bot-miniatura',
  imports: [GfBotComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <gf-bot
      [shape]="shape()"
      [skin]="pielEfectiva()"
      [size]="tamano()"
      [gestures]="gestos"
      [hoverOnly]="soloHover()"
      [followPointer]="false"
      [mouth]="boca() ?? 'auto'"
      [decorative]="true"
    />
  `,
  styles: `
    :host {
      display: grid;
      place-items: center;
    }
  `,
})
export class BotMiniatura {
  readonly forma = input.required<FormaId>();
  /** Sin piel se usa la primera de la forma (la que se ve al elegirla). */
  readonly piel = input<string | null>(null);
  readonly tamano = input(72);
  readonly soloHover = input(true);
  /** Una cara kawaii fija (ver `ExpresionInfo`). Con el robot no hace nada: ahí manda `boca`. */
  readonly cara = input<string | null>(null);
  readonly boca = input<GfBotMouthKind | null>(null);
  /** Para que quien tiene varias (la galería) encuentre la suya entre las demás. */
  readonly clave = input<string | null>(null);

  protected readonly gestos = physicalGestures;
  protected readonly shape = computed(() => SHAPES[this.forma()]);
  protected readonly pielEfectiva = computed(() => this.piel() ?? PIELES[this.forma()][0] ?? '');
  private readonly bot = viewChild(GfBotComponent);
  private temporizador: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.cancelar());
    // Cambiar de forma reconstruye el bot y se lleva la cara: hay que ponerla otra vez.
    effect(() => {
      const cara = this.cara();
      const forma = this.forma();
      this.pielEfectiva();
      untracked(() => this.ponerCara(cara, forma));
    });
  }

  /** Corre un gesto en la miniatura, sin pisar uno que ya esté corriendo (pasar el puntero muchas veces no lo reinicia). */
  jugar(id: string): void {
    if (!hayMovimiento()) return;
    this.bot()?.api?.gesture(id, { policy: 'ignore' });
  }

  /**
   * El motor congela al bot cuando sale de pantalla y, al congelarlo, cancela sus animaciones: la cara fija se va con ellas, y mientras
   * está congelado `expr()` no hace nada. Por eso no basta con ponerla una vez: se vigila el bot y se vuelve a poner cada vez que
   * pasa de congelado a vivo.
   */
  private ponerCara(cara: string | null, forma: FormaId): void {
    this.cancelar();
    if (!cara || forma === 'robot') return;
    let estabaCongelado = true;
    const vigilar = (): void => {
      const api = this.bot()?.api;
      if (api) {
        if (!api.paused && estabaCongelado) api.expr(cara as GfKawaiiId, null);
        estabaCongelado = api.paused;
      }
      this.temporizador = setTimeout(vigilar, 400);
    };
    this.temporizador = setTimeout(vigilar, 0);
  }

  private cancelar(): void {
    if (this.temporizador) clearTimeout(this.temporizador);
    this.temporizador = null;
  }
}
