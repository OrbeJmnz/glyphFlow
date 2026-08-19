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
import { AnimatedIconDef, IconShape, MotionTrack } from 'glyphflow';
import { Deslizador } from '../../shared/ui/deslizador';

/**
 * Scrubber manual (t = 0 → 1) sobre la coreografía de una variante. NO es una capacidad nueva del
 * motor — plan.md es explícito: "otra vista de lo que ya vive en MotionTrack/IconChoreography".
 *
 * Por eso construye sus propias `Animation` con `el.animate(track.keyframes, track.options)`,
 * pausadas, y las mueve con `currentTime`. Es exactamente lo que hace `MaxIconComponent.play()`
 * puertas adentro (mismo manejo de `origin`/`transformBox`), pero aquí en pausa y bajo control del
 * usuario en vez de disparado por hover. No se reutiliza `<max-icon>`: no expone sus `Animation`
 * internas (ni debería — no es parte de su contrato de inputs/outputs), así que este componente
 * pinta su PROPIO svg con las mismas figuras. Mismo patrón que ya usa `morph-bench.ts`.
 */
@Component({
  selector: 'app-icon-scrubber',
  imports: [Deslizador],
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

  private animaciones: Animation[] = [];

  constructor() {
    effect(() => {
      // Se leen aquí (no dentro del microtask) para que el effect SÍ dependa de ellas.
      this.def();
      this.variante();
      queueMicrotask(() => this.reconstruir());
    });
  }

  protected mover(valor: number): void {
    // El deslizador emite número; antes llegaba la cadena cruda del `<input>` y había que convertir.
    const t = valor / 1000;
    this.progreso.set(t);
    const dur = this.duracionMs();
    if (dur === null) return;
    for (const anim of this.animaciones) anim.currentTime = t * dur;
  }

  private reconstruir(): void {
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
    this.cancelarTodo();
  }
}
