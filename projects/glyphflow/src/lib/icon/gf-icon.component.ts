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
import { GF_ICONS_CONFIG } from './gf-icons.config';
import { GF_ICON_CATALOG } from './icon-catalog.provider';
import { conRelevo, easingSeguro } from './motion-runtime';

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
 * <gf-icon name="bell" trigger="hover" class="size-5 text-brand-500" />
 * <gf-icon name="settings" animation="rotate" trigger="auto" [loop]="true" />
 * <gf-icon name="search" label="Buscar" />
 */
@Component({
  /*
   * Dos selectores durante la deprecacion, y el viejo no es cortesia.
   *
   * Un renombrado de selector no se comporta como uno de simbolo. Quitando `max-icon` y corriendo
   * los tests: con el componente en `imports:` Angular SI avisa (NG8001, 'max-icon' is not a
   * known element) — comprobado. Pero ese aviso depende del modo: con `CUSTOM_ELEMENTS_SCHEMA`
   * puesto, o en una plantilla que no declare el import, el mismo `<max-icon>` se degrada a
   * elemento desconocido y simplemente NO PINTA. Ahi el fallo llega a produccion como iconos
   * invisibles, sin un error que lo delate.
   *
   * `max-icon` se envia deprecado en la v2 y sale en la v3.
   */
  selector: 'gf-icon, max-icon',
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
              [attr.fill]="shape.fill ?? null" [attr.opacity]="shape.opacity ?? null"
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
              [attr.fill]="shape.fill ?? null" [attr.opacity]="shape.opacity ?? null"
              pathLength="1"
            />
          }
          @case ('line') {
            <line
              [attr.x1]="shape.x1"
              [attr.y1]="shape.y1"
              [attr.x2]="shape.x2"
              [attr.y2]="shape.y2"
              [attr.fill]="shape.fill ?? null" [attr.opacity]="shape.opacity ?? null"
              pathLength="1"
            />
          }
          @case ('ellipse') {
            <ellipse
              [attr.cx]="shape.cx"
              [attr.cy]="shape.cy"
              [attr.rx]="shape.rx"
              [attr.ry]="shape.ry"
              [attr.fill]="shape.fill ?? null" [attr.opacity]="shape.opacity ?? null"
              pathLength="1"
            />
          }
          @case ('polyline') {
            <polyline [attr.points]="shape.points" [attr.fill]="shape.fill ?? null" [attr.opacity]="shape.opacity ?? null" pathLength="1" />
          }
          @case ('polygon') {
            <polygon [attr.points]="shape.points" [attr.fill]="shape.fill ?? null" [attr.opacity]="shape.opacity ?? null" pathLength="1" />
          }
          @default {
            <path [attr.d]="shape.d" [attr.fill]="shape.fill ?? null" [attr.opacity]="shape.opacity ?? null" pathLength="1" />
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
export class GfIconComponent implements AfterViewInit, OnChanges {
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
  private readonly config = inject(GF_ICONS_CONFIG, { optional: true });
  private readonly catalog = inject(GF_ICON_CATALOG, { optional: true });
  /**
   * Tracks de `root`/`shapes`: UNA animación viva por elemento, así que no crece. Antes era un
   * array `running` compartido con el trazo, que nunca se podaba: las animaciones de `autoDraw` se
   * autocancelaban al terminar pero seguían dentro, y `cancel()`/`reverse()` recorrían objetos
   * muertos con sus clausuras `onfinish` todavía retenidas.
   *
   * Las terminadas SÍ se conservan a propósito: `held()` deja su pose con `fill: 'forwards'` y
   * `reverse()` necesita esa animación para regresarla al salir el puntero.
   */
  private readonly vivasTrack = new Map<SVGElement, Animation>();
  /**
   * Trazo automático, en canal aparte. Dos razones: se poda al terminar (es desechable, nadie lo
   * reversa) y `autoDraw` puede convivir con `root`/`shapes` sobre la MISMA figura — el modelo lo
   * documenta como válido. Con un solo mapa por elemento, el trazo le pisaría el track en silencio.
   */
  private vivasDraw: Animation[] = [];
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

  /**
   * Getter y no un campo: la config puede exponer `animationsEnabled` como getter sobre una señal,
   * y leerlo una sola vez al construir congelaría el interruptor en el valor del arranque.
   */
  private get animationsEnabled(): boolean {
    return this.config?.animationsEnabled ?? true;
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
    // El interruptor global va PRIMERO y no mira `respectReducedMotion`: ese input decide si se
    // sigue al sistema, y esto es una orden directa del consumidor. Un icono con
    // `respectReducedMotion="false"` ignora al sistema, no a la aplicación que lo hospeda.
    if (!this.animationsEnabled) return;
    if (this.respectReducedMotion && this.prefersReducedMotion) return;
    const chor = this.def?.animations[variant ?? this.animation];
    if (!chor) return;

    const root = this.svgRoot?.nativeElement;
    if (!root?.animate) return; // SSR / navegador sin WAAPI: se queda estático, no truena.

    const children = Array.from(root.children) as SVGElement[];

    // El trazo anterior no se releva, se tira: arranca invisible, no hay pose que entregar.
    this.detenerDraw();

    // Las figuras que animaba la variante anterior y esta ya NO toca se cortan en seco a propósito
    // — no hay animación nueva a la que entregarles la pose, y su lugar es la base. El relevo suave
    // aplica solo donde de verdad hay relevo, figura por figura (ver `run`).
    const alcance = new Set<SVGElement>();
    if (chor.root) alcance.add(root);
    for (const index of Object.keys(chor.shapes ?? {})) {
      const el = children[Number(index)];
      if (el) alcance.add(el);
    }
    for (const el of [...this.vivasTrack.keys()]) if (!alcance.has(el)) this.detenerTrack(el);

    if (chor.root) this.run(root, chor.root, true);
    for (const [index, track] of Object.entries(chor.shapes ?? {})) {
      const el = children[Number(index)];
      if (el) this.run(el, track, false);
    }

    if (chor.autoDraw) this.vivasDraw = this.runAutoDraw(children, chor.autoDraw);
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

    // Una figura que el icono NO enseña en reposo no forma parte de su trazo. `archive` lleva una
    // arista invisible que solo existe para cerrar el cajón mientras se abre; dibujarla aquí la
    // haría aparecer y desaparecer sin que el icono la tenga.
    const visibles = children.filter((el) => el.getAttribute('opacity') !== '0');

    const measured = visibles.map((el) => ({ el, len: this.totalLength(el) }));
    const medible = measured.every((m) => m.len > 0);
    const ordenadas = medible ? [...measured].sort((a, b) => b.len - a.len) : measured;

    const anims: Animation[] = [];
    let start = 0;
    for (const { el, len } of ordenadas) {
      const base = medible ? Math.min(max, Math.max(min, (len / speed) * 1000)) : 500;
      const duration = base * this.durationScale;
      const anim = el.animate(GfIconComponent.DRAW_KEYFRAMES, {
        duration,
        delay: start + Number(this.delay || 0),
        easing: easingSeguro(easing),
        fill: 'backwards',
        ...(this.loop ? { iterations: Infinity } : {}),
      });
      // Cicatriz: `fill: 'backwards'` solo debería retener el primer keyframe (opacity:0) DURANTE
      // el delay, nunca después de terminar — pero en algunos casos el navegador lo deja pegado
      // ahí con `playState: 'finished'`, y el ícono se dibuja y desaparece solo. Cancelar al
      // terminar libera el efecto por completo y el elemento cae a su estilo base (visible,
      // sin dasharray), que en el caso normal es IDÉNTICO al último keyframe — cero flicker.
      if (!this.loop) {
        anim.onfinish = () => {
          anim.onfinish = null;
          anim.cancel();
          // Podar aquí es la mitad del arreglo: antes se autocancelaba pero seguía en la lista, y
          // el siguiente hover recorría animaciones muertas con sus clausuras aún colgando.
          this.vivasDraw = this.vivasDraw.filter((a) => a !== anim);
        };
      }
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

  /**
   * Regresa a la pose inicial animando, no de golpe (animaciones de estado).
   *
   * Solo los tracks. El trazo se quedaba fuera antes por accidente y ahora por diseño: reversar un
   * `autoDraw` lo DESdibuja, que no es lo que nadie pidió al sacar el puntero.
   */
  reverse(): void {
    for (const anim of this.vivasTrack.values()) {
      // `idle` = un track de un tiro que YA terminó y se canceló solo en su `onfinish`. `reverse()`
      // sobre eso no invierte nada: lo REVIVE desde el final, y la figura se mueve hacia atrás al
      // salir el puntero — justo cuando ya estaba quieta. Peor con `fill: 'backwards'`: como su
      // `onfinish` ya se soltó, nadie la vuelve a cancelar y se queda congelada en el PRIMER
      // keyframe (una línea a `scaleX(0.12)`) en vez de volver a su forma.
      //
      // Salir a media animación no pasa por aquí: ahí sigue `running`, se invierte de verdad y su
      // `onfinish` intacto la cancela y limpia el inline al llegar al principio.
      if (anim.playState === 'idle') continue;
      anim.reverse();
    }
  }

  /** Corta y devuelve las figuras a su pose original. */
  cancel(): void {
    for (const el of [...this.vivasTrack.keys()]) this.detenerTrack(el);
    this.detenerDraw();
  }

  private detenerTrack(el: SVGElement): void {
    const anim = this.vivasTrack.get(el);
    if (!anim) return;
    anim.onfinish = null;
    anim.cancel();
    this.vivasTrack.delete(el);
    this.limpiarInline(el);
  }

  private detenerDraw(): void {
    for (const anim of this.vivasDraw) {
      anim.onfinish = null;
      anim.cancel();
    }
    this.vivasDraw = [];
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

  /**
   * Corre un track sobre una figura, RELEVANDO la animación que ya traía en vez de cortarla.
   *
   * El problema que resuelve: `Animation.cancel()` retira el efecto de golpe, así que la figura
   * salta a su pose base en un solo frame. Con hover repetido eso es un teletransporte por cada
   * entrada del puntero. (No es layout thrashing — el `transform` vive en el compositor y no toca
   * layout — es discontinuidad visual, y se siente peor justo porque es instantánea.)
   *
   * El relevo, en tres pasos:
   *   1. `commitStyles()` escribe en el style inline la pose EXACTA del frame actual;
   *   2. `cancel()` ya no salta, porque el inline sostiene esa pose;
   *   3. los keyframes nuevos entran sin el offset 0 (`conRelevo`), así que WAAPI toma ese inline
   *      como keyframe implícito y la figura CONTINÚA desde donde iba.
   *
   * Solo aplica a tracks de un tiro (`fill: 'none'`). Los de estado (`held()`, `fill: 'forwards'`)
   * se quedan como estaban: sostienen una pose, un re-disparo va al mismo destino y no hay salto
   * que evitar — y ahí el inline sí estorbaría, porque `reverse()` los devuelve después.
   */
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
      easing: easingSeguro(track.options.easing),
      ...(this.loop ? { iterations: Infinity } : {}),
      ...(this.delay ? { delay: (track.options.delay ?? 0) + Number(this.delay) } : {}),
    };

    const sostiene = options.fill === 'forwards' || options.fill === 'both';
    const previa = this.vivasTrack.get(el);
    let keyframes = track.keyframes;

    if (previa && !sostiene && previa.playState === 'running') {
      const relevo = conRelevo(keyframes);
      // El orden importa: congelar ANTES de cancelar, o no queda pose que congelar.
      if (relevo && this.congelar(previa)) keyframes = relevo;
    }
    if (previa) {
      previa.onfinish = null; // suelta la clausura ANTES de cancelar
      previa.cancel();
    }

    const anim = el.animate(keyframes, options);
    // Un track de un tiro deja de aplicar al terminar, así que el inline que dejó `commitStyles`
    // quedaría como pose final y la figura se estacionaría a media coreografía. Se limpia al
    // cerrar. Los de estado NO: ahí la pose retenida es el punto.
    if (!sostiene && !this.loop) {
      anim.onfinish = () => {
        anim.onfinish = null;
        anim.cancel();
        this.limpiarInline(el);
      };
    }
    this.vivasTrack.set(el, anim);
    return anim;
  }

  /**
   * Escribe la pose del frame actual en el style inline. `commitStyles()` lanza si el elemento ya
   * no está renderizado (destrucción a media animación — pasa al navegar con el icono animándose),
   * así que un fallo aquí solo significa "sin relevo": se corta en seco, como antes.
   */
  private congelar(anim: Animation): boolean {
    try {
      anim.commitStyles();
      return true;
    } catch {
      return false;
    }
  }

  /** Limpia lo que pudo escribir `commitStyles`. `transformOrigin`/`transformBox` NO se tocan. */
  private limpiarInline(el: SVGElement): void {
    el.style.transform = '';
    el.style.opacity = '';
    el.style.strokeDasharray = '';
    el.style.strokeDashoffset = '';
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
