import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AnimatedIconDef } from 'glyphflow';
import { morphKeyframes, type SpringConfig } from 'glyphflow/morph';
import { aIconNode } from './icon-node';
import { Deslizador } from '../../shared/ui/deslizador';

/**
 * Mismo amortiguamiento crítico que `smooth` (ζ ≈ 1, sin rebote) con la rigidez a un cuarto —
 * el tiempo de asentamiento de un resorte crítico escala con 1/√k, así que k/4 ≈ el doble de
 * lento, mismo carácter. La comparte `MorphScrubber` y `MorphPicker`: si divergiera, arrastrar el
 * deslizador se sentiría a otra velocidad que reproducir la cadena del mismo par.
 */
export const RESORTE_LENTO: SpringConfig = { k: 42, c: 13 };

/**
 * Scrubber manual (t = 0 → 1) sobre el morph de UN par de iconos.
 *
 * `<gf-icon-morph>` no sirve aquí: anima sola y no expone control de tiempo. Este componente pinta
 * su PROPIO `<path>` con `morphKeyframes()` y controla el `Animation` en pausa, moviendo
 * `currentTime` a mano — mismo patrón que ya usa `IconScrubber` para la coreografía de `<gf-icon>`.
 */
@Component({
  selector: 'app-morph-scrubber',
  imports: [Deslizador, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './morph-scrubber.html',
  styleUrl: './morph-scrubber.css',
})
export class MorphScrubber implements OnDestroy {
  @ViewChild('figura', { static: true }) private figura!: ElementRef<SVGPathElement>;

  readonly origen = input.required<AnimatedIconDef>();
  readonly destino = input.required<AnimatedIconDef>();

  protected readonly progreso = signal(0);

  private readonly medidas = computed(() =>
    morphKeyframes(aIconNode(this.origen()), aIconNode(this.destino()), {
      spring: RESORTE_LENTO,
    }),
  );
  protected readonly duracionMs = computed(() => Math.round(this.medidas().duration));
  protected readonly tiempoActualMs = computed(() =>
    Math.round(this.progreso() * this.duracionMs()),
  );

  private animacion?: Animation;

  constructor() {
    // Se leen aquí (no dentro del microtask) para que el effect SÍ dependa de ellas — mismo
    // motivo que `IconScrubber`.
    effect(() => {
      this.origen();
      this.destino();
      queueMicrotask(() => this.reconstruir());
    });
  }

  protected mover(valor: number): void {
    const t = valor / 1000;
    this.progreso.set(t);
    if (this.animacion) this.animacion.currentTime = t * this.duracionMs();
  }

  private reconstruir(): void {
    this.animacion?.cancel();
    this.animacion = undefined;
    this.progreso.set(0);

    const el = this.figura.nativeElement;
    if (typeof el.animate !== 'function') return;

    const { keyframes, duration } = this.medidas();
    this.animacion = el.animate(keyframes, { duration, easing: 'linear', fill: 'forwards' });
    this.animacion.pause();
  }

  ngOnDestroy(): void {
    this.animacion?.cancel();
  }
}
