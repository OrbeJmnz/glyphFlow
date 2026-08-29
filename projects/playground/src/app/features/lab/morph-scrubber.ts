import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AnimatedIconDef } from 'glyphflow';
import { morphAt, morphKeyframes, type SpringConfig } from 'glyphflow/morph';
import { aIconNode } from './icon-node';
import { Deslizador } from '../../shared/ui/deslizador';

/**
 * Mismo amortiguamiento crítico que `smooth` con la rigidez a un cuarto (el doble de lento, mismo
 * carácter) — compartido con `MorphPicker`, que reproduce la cadena completa con este resorte.
 */
export const RESORTE_LENTO: SpringConfig = { k: 42, c: 13 };

/**
 * Scrubber manual (t = 0 → 1) sobre el morph de UN par de iconos.
 *
 * Pinta la pose EXACTA en cada `t` con `morphAt()` — sin animación, sin `Animation` de WAAPI de
 * por medio. Antes arrastraba `currentTime` sobre una animación pausada con ~20 poses
 * precalculadas, que interpolaba linealmente entre ellas (el mismo problema de "corta esquinas"
 * diagnosticado en `docs/superpowers/specs/2026-08-28-morph-live-render-design.md`); `morphAt`
 * calcula la posición matemáticamente correcta en cualquier punto, así que ya no hay nada que
 * aproximar.
 *
 * El contador en milisegundos es solo INFORMATIVO: usa `morphKeyframes(...).duration` para decir
 * cuánto tardaría `resorteLento` si se reprodujera solo — no es lo que se está pintando.
 */
@Component({
  selector: 'app-morph-scrubber',
  imports: [Deslizador, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './morph-scrubber.html',
  styleUrl: './morph-scrubber.css',
})
export class MorphScrubber {
  @ViewChild('figura', { static: true }) private figura!: ElementRef<SVGPathElement>;

  readonly origen = input.required<AnimatedIconDef>();
  readonly destino = input.required<AnimatedIconDef>();

  protected readonly progreso = signal(0);

  protected readonly duracionMs = computed(() =>
    Math.round(
      morphKeyframes(aIconNode(this.origen()), aIconNode(this.destino()), {
        spring: RESORTE_LENTO,
      }).duration,
    ),
  );
  protected readonly tiempoActualMs = computed(() =>
    Math.round(this.progreso() * this.duracionMs()),
  );

  constructor() {
    effect(() => {
      this.origen();
      this.destino();
      queueMicrotask(() => {
        this.progreso.set(0);
        this.pintar(0);
      });
    });
  }

  protected mover(valor: number): void {
    const t = valor / 1000;
    this.progreso.set(t);
    this.pintar(t);
  }

  private pintar(t: number): void {
    this.figura.nativeElement.setAttribute(
      'd',
      morphAt(aIconNode(this.origen()), aIconNode(this.destino()), t),
    );
  }
}
