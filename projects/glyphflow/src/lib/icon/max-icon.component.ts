import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { resolveIconName } from './animated-icons.registry';
import {
  AnimatedIconDef,
  AnimatedIconTrigger,
  AutoDraw,
  IconShape,
  MotionTrack,
} from './animated-icon.model';
import { MAX_ICONS_CONFIG } from './max-icons.config';
import { MAX_ICON_CATALOG } from './icon-catalog.provider';

/**
 * Icono animado con coreografía por figura.
 *
 * Dibuja su propio SVG (en vez de delegar en `lucide-angular`) porque animar path-por-path exige
 * controlar cada `<path>`: el badajo de la campana no puede moverse si no lo puedes agarrar. Ese
 * es justo el techo que tiene animar los iconos "desde afuera" con CSS.
 *
 * Motor: Web Animations API. Ni `motion`, ni `@angular/animations`, ni un CSS global que copiar —
 * los keyframes viajan con el data.
 *
 * Template inline a propósito (menos archivos que copiar), única desviación del estilo de la casa.
 *
 * @example
 * <max-icon name="bell" trigger="hover" class="size-5 text-brand-500" />
 * <max-icon name="settings" animation="rotate" trigger="auto" [loop]="true" />
 * <max-icon name="search" label="Buscar" />
 */
@Component({
  selector: 'max-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--
      El SVG mide 100% del host, NO "size" en píxeles. Es lo que permite que una clase de tamaño
      de Tailwind (u otro sistema de utilidades) en el host mande.
    -->
    <svg
      #svgRoot
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="def?.viewBox ?? '0 0 24 24'"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="ariaHidden"
      [attr.aria-label]="label ?? null"
      style="display: block"
    >
      @for (shape of shapes; track $index) {
        @switch (shape.tag) {
          @case ('circle') {
            <circle
              [attr.cx]="shape.cx"
              [attr.cy]="shape.cy"
              [attr.r]="shape.r"
              [attr.fill]="shape.fill ?? null"
              pathLength="1"
            />
          }
          @case ('rect') {
            <rect
              [attr.x]="shape.x"
              [attr.y]="shape.y"
              [attr.width]="shape.width"
              [attr.height]="shape.height"
              [attr.rx]="shape.rx"
              [attr.ry]="shape.ry"
              [attr.fill]="shape.fill ?? null"
              pathLength="1"
            />
          }
          @case ('line') {
            <line
              [attr.x1]="shape.x1"
              [attr.y1]="shape.y1"
              [attr.x2]="shape.x2"
              [attr.y2]="shape.y2"
              [attr.fill]="shape.fill ?? null"
              pathLength="1"
            />
          }
          @case ('ellipse') {
            <ellipse
              [attr.cx]="shape.cx"
              [attr.cy]="shape.cy"
              [attr.rx]="shape.rx"
              [attr.ry]="shape.ry"
              [attr.fill]="shape.fill ?? null"
              pathLength="1"
            />
          }
          @case ('polyline') {
            <polyline [attr.points]="shape.points" [attr.fill]="shape.fill ?? null" pathLength="1" />
          }
          @case ('polygon') {
            <polygon [attr.points]="shape.points" [attr.fill]="shape.fill ?? null" pathLength="1" />
          }
          @default {
            <path [attr.d]="shape.d" [attr.fill]="shape.fill ?? null" pathLength="1" />
          }
        }
      }
    </svg>
  `,
  styles: [
    /*
     * Tamaño por CONTENCIÓN, no por override. Poner width/height en :host parece lo natural, pero
     * si el consumidor trae utilidades CSS en capas (ej. Tailwind `@layer utilities`), una capa
     * PIERDE contra CSS sin capa y el host ganaría siempre. Por eso el host no fija tamaño: si
     * trae clase de utilidad, esa manda y el svg se recorta con max-*; si no trae ninguna, el host
     * se encoge al svg y vale el input `size`.
     */
    ':host { display: inline-flex; align-items: center; justify-content: center; flex: none; line-height: 0; }',
    'svg { width: var(--ai-size); height: var(--ai-size); max-width: 100%; max-height: 100%; }',
  ],
  host: {
    '[style.--ai-size.px]': 'size',
  },
})
export class MaxIconComponent implements AfterViewInit, OnChanges {
  /** Clave del catálogo (`bell`, `trash-2`, `check`…). Desconocida = no pinta nada, no truena. */
  @Input() name = '';
  /**
   * Definición al vuelo, sin pasar por el catálogo — la vía genérica para iconos propios
   * (`AnimatedIconDef` construido a mano o exportado desde el playground). Gana sobre `name`.
   */
  @Input() iconDef?: AnimatedIconDef;
  /**
   * Variante de la coreografía. En modo `group` solo manda si la fijas explícitamente distinta de
   * `default`; si no, la variante de hover se elige sola (ver `hoverVariant`).
   */
  @Input() animation = 'default';
  @Input() trigger: AnimatedIconTrigger = 'group';
  @Input() size: number | string = 24;
  @Input() strokeWidth: number | string = 2;
  /** Repite indefinidamente. Ojo: con easings de un solo tiro se nota el corte entre vueltas. */
  @Input() loop = false;
  /** Retraso extra (ms) ADICIONAL al que traiga cada track. */
  @Input() delay = 0;
  /** Solo con `trigger="view"`: si se anima una vez o cada que reentra al viewport. */
  @Input() viewOnce = true;
  /**
   * Contrato de accesibilidad: una sola regla, no una interacción `aria-hidden`/`aria-label` que
   * combinar. `decorative=true` sin `label` → `aria-hidden="true"`. Con `label` → icono semántico
   * (`aria-hidden="false"`, `aria-label=label`).
   */
  @Input() decorative = true;
  @Input() label?: string;
  /**
   * Default `true`: el icono respeta `prefers-reduced-motion` y se queda estático. Override
   * explícito a `false` si el consumidor necesita ignorar la preferencia del sistema.
   */
  @Input() respectReducedMotion = true;

  @ViewChild('svgRoot', { static: true }) private svgRoot!: ElementRef<SVGSVGElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly el = inject(ElementRef);
  private readonly config = inject(MAX_ICONS_CONFIG, { optional: true });
  private readonly catalog = inject(MAX_ICON_CATALOG, { optional: true });
  private running: Animation[] = [];
  private observer?: IntersectionObserver;
  private unwireGroup?: () => void;

  /** Trazo en 0-1 porque el componente pone `pathLength="1"` en todas las figuras. */
  private static readonly DRAW_KEYFRAMES: Keyframe[] = [
    { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' },
    { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
  ];

  /**
   * `catalog` es opcional (`provideIconCatalog(...)`, ver icon-catalog.provider.ts): sin él,
   * `name="bell"` se pinta vacío en silencio — mismo contrato que un nombre desconocido. El
   * catálogo NUNCA se importa aquí de forma estática a propósito: eso volvería a arrastrar los
   * ~1767 iconos a cualquier consumidor, incluso uno que solo use `[iconDef]`.
   */
  get def(): AnimatedIconDef | undefined {
    return this.iconDef ?? this.catalog?.[resolveIconName(this.name)];
  }

  get shapes(): IconShape[] {
    return this.def?.shapes ?? [];
  }

  protected get ariaHidden(): 'true' | 'false' {
    return this.decorative && !this.label ? 'true' : 'false';
  }

  private get durationScale(): number {
    return this.config?.durationScale ?? 1;
  }

  ngAfterViewInit(): void {
    if (this.trigger === 'auto') this.play();
    if (this.trigger === 'view') this.observeViewport();
    if (this.trigger === 'group') this.wireGroup();
    this.destroyRef.onDestroy(() => {
      this.cancel();
      this.observer?.disconnect();
      this.unwireGroup?.();
    });
  }

  /**
   * Modo `group`: dibuja al montarse y deja el hover colgado del contenedor `.group` más cercano
   * (el mismo que gobierna `group-hover:` de Tailwind, si el consumidor lo usa). Si no hay ninguno,
   * escucha al propio icono — así el modo sirve igual dentro de un botón que suelto en una tarjeta.
   */
  private wireGroup(): void {
    this.play('draw');

    const host = this.el.nativeElement as HTMLElement;
    // Prioridad: el control que lo contiene > el `.group` de Tailwind > el icono mismo.
    // El botón GANA a propósito: en una fila `<tr class="group">` con tres botones de acción,
    // colgarse del grupo animaba los tres a la vez con solo pasar por la fila. Cada botón
    // enciende SU icono, y el `.group` queda para los iconos que no viven en un control.
    const target =
      (host.closest('button, a, [role="button"]') as HTMLElement | null) ??
      (host.closest('.group') as HTMLElement | null) ??
      host;

    // Un tap táctil sintetiza `pointerenter` antes del click (cicatriz conocida): sin el guard,
    // en móvil el icono se animaría en cada toque y se comería la sensación del tap.
    const enter = (event: Event) => {
      if ((event as PointerEvent).pointerType === 'touch') return;
      this.play(this.hoverVariant);
    };
    const leave = () => {
      if (this.def?.animations[this.hoverVariant]?.reverseOnLeave) this.reverse();
    };

    target.addEventListener('pointerenter', enter);
    target.addEventListener('pointerleave', leave);
    this.unwireGroup = () => {
      target.removeEventListener('pointerenter', enter);
      target.removeEventListener('pointerleave', leave);
    };
  }

  /**
   * Qué variante toca en hover. Con 3 o más, la TERCERA — el orden del catálogo es
   * `draw`, `default`, y luego la especial del icono (`rotate`, `find`, `turn`…), que siempre es
   * la más expresiva. Si el consumidor fijó `animation` a mano, esa manda.
   */
  private get hoverVariant(): string {
    if (this.animation && this.animation !== 'default') return this.animation;
    const variantes = Object.keys(this.def?.animations ?? {});
    return variantes.length >= 3 ? variantes[2] : 'default';
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cambiar de icono o de variante a media animación deja figuras en poses viejas.
    const cambioIcono = changes['name'] || changes['animation'] || changes['iconDef'];
    if (cambioIcono && !cambioIcono.isFirstChange()) {
      this.cancel();
      if (this.trigger === 'auto') this.play();
    }
  }

  // ── Disparadores ───────────────────────────────────────────────────────────
  // Cicatriz conocida: un tap táctil TAMBIÉN sintetiza `pointerenter` antes del click. Sin el
  // guard de `pointerType`, en móvil el hover se comería al tap.
  @HostListener('pointerenter', ['$event'])
  protected onPointerEnter(event: PointerEvent): void {
    if (this.trigger !== 'hover' || event.pointerType === 'touch') return;
    this.play();
  }

  @HostListener('pointerleave')
  protected onPointerLeave(): void {
    if (this.trigger !== 'hover') return;
    if (this.choreography?.reverseOnLeave) this.reverse();
  }

  @HostListener('click')
  protected onClick(): void {
    if (this.trigger === 'tap') this.play();
  }

  // ── API pública (útil con trigger="manual") ────────────────────────────────
  /** Reproduce una variante; sin argumento, la del input `animation`. */
  play(variant?: string): void {
    if (this.respectReducedMotion && this.prefersReducedMotion) return;
    const chor = this.def?.animations[variant ?? this.animation];
    if (!chor) return;

    this.cancel();
    const root = this.svgRoot?.nativeElement;
    if (!root?.animate) return; // SSR / navegador sin WAAPI: se queda estático, no truena.

    if (chor.root) this.running.push(this.run(root, chor.root, true));

    const children = Array.from(root.children) as SVGElement[];
    for (const [index, track] of Object.entries(chor.shapes ?? {})) {
      const el = children[Number(index)];
      if (el) this.running.push(this.run(el, track, false));
    }

    if (chor.autoDraw) this.running.push(...this.runAutoDraw(children, chor.autoDraw));
  }

  /**
   * Trazo automático: mide, ordena de la figura más larga a la más corta y le da a cada una la
   * duración que le corresponde a velocidad de pluma constante.
   *
   * `fill: 'backwards'` NO es opcional: sin él, una figura con `delay` se ve completa durante su
   * espera y desaparece de golpe al arrancar su turno. Ese parpadeo era lo que rompía la fluidez.
   *
   * Si no se puede medir (SSR, jsdom, navegador sin `getTotalLength`) cae al orden del array con
   * duración fija: se ve peor, pero se ve.
   */
  private runAutoDraw(children: SVGElement[], cfg: AutoDraw): Animation[] {
    const { speed = 70, overlap = 0.55, min = 160, max = 700, easing = 'ease-in-out' } = cfg;

    const measured = children.map((el) => ({ el, len: this.totalLength(el) }));
    const medible = measured.every((m) => m.len > 0);
    const ordenadas = medible ? [...measured].sort((a, b) => b.len - a.len) : measured;

    const anims: Animation[] = [];
    let start = 0;
    for (const { el, len } of ordenadas) {
      const base = medible ? Math.min(max, Math.max(min, (len / speed) * 1000)) : 500;
      const duration = base * this.durationScale;
      const anim = el.animate(MaxIconComponent.DRAW_KEYFRAMES, {
        duration,
        delay: start + Number(this.delay || 0),
        easing,
        fill: 'backwards',
        ...(this.loop ? { iterations: Infinity } : {}),
      });
      // Cicatriz: `fill: 'backwards'` solo debería retener el primer keyframe (opacity:0) DURANTE
      // el delay, nunca después de terminar — pero en algunos casos el navegador lo deja pegado
      // ahí con `playState: 'finished'`, y el ícono se dibuja y desaparece solo. Cancelar al
      // terminar libera el efecto por completo y el elemento cae a su estilo base (visible,
      // sin dasharray), que en el caso normal es IDÉNTICO al último keyframe — cero flicker.
      if (!this.loop) anim.onfinish = () => anim.cancel();
      anims.push(anim);
      start += duration * (1 - overlap);
    }
    return anims;
  }

  private totalLength(el: SVGElement): number {
    const geo = el as SVGGeometryElement;
    if (typeof geo.getTotalLength !== 'function') return 0;
    try {
      return geo.getTotalLength();
    } catch {
      return 0; // figuras degeneradas (un `line` de longitud cero, p. ej.)
    }
  }

  /** Regresa a la pose inicial animando, no de golpe (animaciones de estado). */
  reverse(): void {
    for (const anim of this.running) anim.reverse();
  }

  /** Corta y devuelve las figuras a su pose original. */
  cancel(): void {
    for (const anim of this.running) anim.cancel();
    this.running = [];
  }

  private get choreography() {
    return this.def?.animations[this.animation];
  }

  private get prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
  }

  private run(el: SVGElement, track: MotionTrack, isRoot: boolean): Animation {
    if (track.origin) {
      el.style.transformOrigin = track.origin;
      // En figuras hijas el origen va en unidades del viewBox; explícito para no depender del
      // default del navegador.
      if (!isRoot) el.style.transformBox = 'view-box';
    }
    const scaledDuration =
      typeof track.options.duration === 'number'
        ? track.options.duration * this.durationScale
        : track.options.duration;
    const options: KeyframeAnimationOptions = {
      fill: 'none',
      ...track.options,
      duration: scaledDuration,
      ...(this.loop ? { iterations: Infinity } : {}),
      ...(this.delay ? { delay: (track.options.delay ?? 0) + Number(this.delay) } : {}),
    };
    return el.animate(track.keyframes, options);
  }

  private observeViewport(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.play();
          if (this.viewOnce) this.observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.svgRoot.nativeElement);
  }
}
