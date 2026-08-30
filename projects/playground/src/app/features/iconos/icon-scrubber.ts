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
  untracked,
} from '@angular/core';
import { AnimatedIconDef, GfIconComponent, IconShape, MotionTrack, playIcon, pauseIcon, skipBackIcon } from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { Deslizador } from '../../shared/ui/deslizador';
import { velocidadGlobal } from '../../core/duration-scale';
import { hayMovimiento } from '../../core/movimiento';

/**
 * Scrubber manual (t = 0 → 1) + transporte (play/pause/restart) sobre la coreografía de una
 * variante. NO es una capacidad nueva del motor — plan.md es explícito: "otra vista de lo que ya
 * vive en MotionTrack/IconChoreography".
 *
 * Por eso construye sus propias `Animation` con `el.animate(track.keyframes, track.options)`,
 * pausadas, y las mueve con `currentTime`. Es exactamente lo que hace `GfIconComponent.play()`
 * puertas adentro (mismo manejo de `origin`/`transformBox`), pero aquí bajo control del usuario en
 * vez de disparado por hover. No se reutiliza `<gf-icon>`: no expone sus `Animation` internas (ni
 * debería — no es parte de su contrato de inputs/outputs), así que este componente pinta su PROPIO
 * svg con las mismas figuras. Mismo patrón que ya usa `morph-bench.ts`.
 */
@Component({
  selector: 'app-icon-scrubber',
  imports: [Deslizador, TranslocoPipe, GfIconComponent, GfIconMorphComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-scrubber.html',
  styleUrl: './icon-scrubber.css',
})
export class IconScrubber implements OnDestroy {
  @ViewChild('svgRoot') private svgRoot?: ElementRef<SVGSVGElement>;

  readonly def = input.required<AnimatedIconDef>();
  readonly variante = input.required<string>();

  protected readonly shapes = computed<IconShape[]>(() => this.def().shapes);
  protected readonly progreso = signal(0);
  protected readonly duracionMs = signal<number | null>(null);
  protected readonly tiempoActualMs = computed(() => {
    const dur = this.duracionMs();
    return dur === null ? 0 : Math.round(this.progreso() * dur);
  });

  protected readonly reproduciendo = signal(false);
  protected readonly skipBackIcon = skipBackIcon;
  protected readonly iconoTransporte = computed<MorphIcon>(() =>
    this.reproduciendo() ? pauseIcon : playIcon,
  );
  private readonly claveTransporte = computed(() =>
    this.reproduciendo() ? 'iconos.scrubber.pausar' : 'iconos.scrubber.reproducir',
  );
  protected readonly etiquetaTransporte = translateSignal(this.claveTransporte);

  private animaciones: Animation[] = [];
  private frame?: number;

  constructor() {
    effect(() => {
      // Se leen aquí (no dentro del microtask) para que el effect SÍ dependa de ellas.
      this.def();
      this.variante();
      queueMicrotask(() => {
        this.reconstruir();
        // `untracked`: la decisión de autoreproducir usa el valor DE AHORA, pero no debe hacer que
        // este efecto se repita cada vez que alguien apaga/prende el movimiento global — eso no
        // tiene nada que ver con reconstruir keyframes, y perdería el progreso del scrubbing manual.
        if (untracked(hayMovimiento)) this.reproducir();
      });
    });
  }

  protected mover(valor: number): void {
    // Arrastrar el slider a mano gana sobre cualquier reproducción automática en curso.
    this.pausar();
    const t = valor / 1000;
    this.progreso.set(t);
    const dur = this.duracionMs();
    if (dur === null) return;
    for (const anim of this.animaciones) anim.currentTime = t * dur;
  }

  protected alternarTransporte(): void {
    if (this.reproduciendo()) this.pausar();
    else this.reproducir();
  }

  /**
   * `playbackRate`, no reescribir la duración de los keyframes: la velocidad global es una
   * preferencia de REPRODUCCIÓN, no cambia lo que la coreografía dice que dura — el tiempo que
   * muestra este mismo scrubber sigue siendo el AUTORADO, igual que el resto del Motion Inspector.
   *
   * El gate de `hayMovimiento()` es el MISMO que ya usa `GfIconComponent.play()` en el motor real
   * (bloquea incluso `trigger="manual"`) — este botón de Play no debe ser una puerta trasera que
   * arranque algo cuando el interruptor global de movimiento está apagado.
   */
  protected reproducir(): void {
    if (!hayMovimiento() || !this.animaciones.length) return;
    const tasa = velocidadGlobal();
    for (const anim of this.animaciones) {
      anim.playbackRate = tasa;
      anim.play();
    }
    this.reproduciendo.set(true);
    this.tick();
  }

  protected pausar(): void {
    for (const anim of this.animaciones) anim.pause();
    this.reproduciendo.set(false);
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
  }

  protected reiniciar(): void {
    this.pausar();
    for (const anim of this.animaciones) anim.currentTime = 0;
    this.progreso.set(0);
  }

  /**
   * El freeze/resume de `core/movimiento.ts` ya pausa estas `Animation` en cuanto alguien apaga el
   * movimiento global (barre `document.getAnimations()`) — no hay que reimplementar ESE mecanismo
   * aquí. Lo que sí hace falta es que el rAF deje de girar y el botón deje de decir "Pausar" cuando
   * eso pasa, o el loop seguiría vivo para siempre sobre animaciones que ya no avanzan.
   */
  private tick(): void {
    if (!hayMovimiento()) {
      this.reproduciendo.set(false);
      return;
    }
    const dur = this.duracionMs();
    if (dur === null || !this.animaciones.length) return;
    const actual = Number(this.animaciones[0].currentTime ?? 0);
    this.progreso.set(Math.min(1, actual / dur));
    if (this.animaciones.every((a) => a.playState === 'finished')) {
      this.reproduciendo.set(false);
      return;
    }
    this.frame = requestAnimationFrame(() => this.tick());
  }

  private reconstruir(): void {
    // Cancela el rAF de la variante anterior antes de tirar sus `Animation`: sin esto, un `tick()`
    // ya en vuelo seguiría leyendo `this.animaciones` a medio reconstruir.
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    this.reproduciendo.set(false);
    this.cancelarTodo();
    const chor = this.def().animations[this.variante()];
    const svg = this.svgRoot?.nativeElement;
    const puedeAnimar = !!svg && typeof svg.animate === 'function';

    if (!chor || !puedeAnimar || (!chor.root && !chor.shapes)) {
      // Sin tracks que scrubbear — el caso típico es autoDraw puro: su duración la calcula el
      // componente en vivo con getTotalLength(), no hay keyframes estáticos que mostrar aquí.
      // Mismo criterio de honestidad que Motion Inspector: null, no un cero que finja saber algo.
      this.duracionMs.set(null);
      this.progreso.set(0);
      return;
    }

    const hijos = [...svg.children] as SVGElement[];
    let finMaximo = 0;

    const armar = (el: SVGElement, track: MotionTrack): void => {
      if (track.origin) {
        el.style.transformOrigin = track.origin;
        if (el !== svg) el.style.transformBox = 'view-box';
      }
      const anim = el.animate(track.keyframes, track.options);
      anim.pause();
      this.animaciones.push(anim);
      const delay = Number(track.options.delay ?? 0) || 0;
      const duracion = Number(track.options.duration ?? 0) || 0;
      finMaximo = Math.max(finMaximo, delay + duracion);
    };

    if (chor.root) armar(svg, chor.root);
    for (const [indice, track] of Object.entries(chor.shapes ?? {})) {
      const el = hijos[Number(indice)];
      if (el) armar(el, track);
    }

    this.duracionMs.set(finMaximo || null);
    this.progreso.set(0);
  }

  private cancelarTodo(): void {
    for (const anim of this.animaciones) anim.cancel();
    this.animaciones = [];
  }

  ngOnDestroy(): void {
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    this.cancelarTodo();
  }
}
