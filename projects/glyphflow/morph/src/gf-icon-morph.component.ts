import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
// Por NOMBRE DE PAQUETE, no por ruta relativa: `glyphflow/morph` es un entry point secundario, y
// una ruta relativa hacia el primario haría que ng-packagr duplique ese código en este bundle. Con
// `MAX_ICONS_CONFIG` eso no sería solo peso: `InjectionToken` es identidad de objeto, así que una
// copia duplicada es OTRO token, y el `provideMaxIcons` del consumidor no llegaría nunca.
/*
 * ⚠️ `MAX_ICONS_CONFIG` y no `GF_ICONS_CONFIG`, a propósito y temporalmente.
 *
 * Este import dice `from 'glyphflow'` (regla de los entry points secundarios: nunca por ruta
 * relativa). Pero ese nombre no resuelve al mismo sitio en los dos builds del repo:
 *
 * - Al construir la librería resuelve a `dist/glyphflow`, recién generado, que ya trae los dos
 *   nombres.
 * - Al construir el PLAYGROUND resuelve al paquete PUBLICADO —`glyphflow-published`, hoy 1.3.0—
 *   porque el sitio consume del registro, no de `dist/`. Y 1.3.0 no conoce `GF_ICONS_CONFIG`:
 *   se publicó antes de que existiera.
 *
 * Con el nombre nuevo aquí, `ng build playground` truena con TS2724. Comprobado, no supuesto.
 *
 * Así que este import se queda en el alias hasta que la major esté PUBLICADA y el lockfile del
 * playground apunte a ella. Entonces —y solo entonces— pasa a `GF_ICONS_CONFIG`. Es el mismo
 * token de todos modos, así que no hay diferencia de comportamiento: solo de qué versión del
 * paquete sabe pronunciar el nombre.
 */
import { IconShape, MAX_ICONS_CONFIG } from 'glyphflow';
import { canonicalD, runMorph } from './morph-keyframes';
import type { SpringConfig, SpringPreset } from './morph-keyframes';
import type { IconInput } from './core/types';

/**
 * Geometría de un icono, y NADA más.
 *
 * A propósito NO es `AnimatedIconDef`: morph solo usa `shapes`. La coreografía
 * (`animations`/`MotionTrack`) no tiene ningún papel aquí — otra cosa mueve estas figuras. Como el
 * tipado de TypeScript es estructural, `bellIcon` y cualquier `AnimatedIconDef` encajan sin
 * convertir nada; lo que este tipo evita es prometer que la coreografía se va a respetar.
 */
export interface MorphIcon {
  viewBox?: string;
  shapes: IconShape[];
}

/** `shapes` → data estilo Lucide (`[tag, attrs][]`), que es lo que come el core. */
function aIconInput(icono: MorphIcon): IconInput {
  return icono.shapes.map((s: IconShape) => {
    const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
    const limpio: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined) limpio[k] = v as string | number;
    }
    return [tag, limpio] as const;
  }) as IconInput;
}

/**
 * Morph entre dos iconos, dirigido por VALOR: cuando `icon` cambia, la figura transiciona desde la
 * anterior. No hay `from`/`to` ni `trigger` — el binding ES el estado:
 *
 * ```html
 * <max-icon-morph [icon]="abierto() ? equisIcon : menuIcon" label="Menú" />
 * <max-icon-morph [icon]="hover() ? bellRingIcon : bellIcon" />
 * ```
 *
 * Todo el ciclo (construcción de keyframes, interrupción, aterrizaje exacto) vive en `runMorph()`.
 * Este componente es el envoltorio: no reimplementa nada de eso.
 *
 * Pinta UN solo `<path>`, no las N figuras del icono, porque WAAPI únicamente interpola entre `d`
 * con la misma estructura de comandos. Por eso no es un input de `<gf-icon>` sino su propio
 * componente, y por eso vive en `glyphflow/morph`: quien no morphea no paga el core matemático.
 */
@Component({
  /* Los dos selectores durante la deprecacion — misma razon que en `gf-icon`: una plantilla no
     truena al perder su componente, solo deja de pintar. `max-icon-morph` sale en la major. */
  selector: 'gf-icon-morph, max-icon-morph',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="icon?.viewBox ?? '0 0 24 24'"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="ariaHidden"
      [attr.aria-label]="label ?? null"
      style="display: block"
    >
      <!--
        El atributo "d" se escribe imperativamente, NUNCA con [attr.d]: la animación y el
        aterrizaje también lo escriben, y dos dueños del mismo atributo terminan peleándose — un
        ciclo de detección de cambios pisaría el valor animado a media transición.
      -->
      <path #figura />
    </svg>
  `,
  styles: [
    // Mismo contrato de tamaño que <gf-icon>: por contención, no por override (ver ahí el porqué
    // con utilidades en capas).
    ':host { display: inline-flex; align-items: center; justify-content: center; flex: none; line-height: 0; }',
    'svg { width: var(--ai-size); height: var(--ai-size); max-width: 100%; max-height: 100%; }',
  ],
  host: {
    '[style.--ai-size.px]': 'size',
  },
})
export class GfIconMorphComponent implements OnChanges {
  @ViewChild('figura', { static: true }) private figura!: ElementRef<SVGPathElement>;

  /**
   * El icono a mostrar. Cambiarlo dispara el morph desde el valor anterior; el primer valor se
   * pinta estático (no hay desde dónde transicionar).
   */
  @Input() icon?: MorphIcon;
  @Input() size: number | string = 24;
  @Input() strokeWidth: number | string = 2;
  /**
   * Mismo contrato de accesibilidad que `<gf-icon>`, una sola regla: `decorative=true` sin `label`
   * → `aria-hidden="true"`. Con `label` → icono semántico.
   */
  @Input() decorative = true;
  @Input() label?: string;
  /**
   * Con `prefers-reduced-motion`, salta directo al icono nuevo sin animar la transición.
   *
   * **Decisión deliberada, NO herencia de `<gf-icon>`**: allá "respetar" significa quedarse
   * quieto, porque la coreografía es un adorno sobre un icono que ya es el correcto. Aquí quedarse
   * quieto dejaría al usuario mirando el icono EQUIVOCADO — el destino es información, no adorno.
   * Se respeta el movimiento reducido quitando el movimiento, no el cambio de estado.
   */
  @Input() respectReducedMotion = true;
  /**
   * Con qué resorte transiciona. Un preset por nombre (`'smooth'`, `'snappy'`, `'bouncy'`) o un
   * `{ k, c }` propio. El resorte NO toca la geometría: decide la duración y cómo se reparten los
   * keyframes en el tiempo.
   *
   * Los subamortiguados rebotan de verdad — el componente deja el sobrepaso prendido, que es el
   * default del motor. Si `bouncy` no dibujara el rebote, el nombre estaría mintiendo.
   */
  @Input() spring?: SpringPreset | SpringConfig;

  /** El mismo `provideMaxIcons({ durationScale })` que escala las coreografías de `<gf-icon>`. */
  private readonly config = inject(MAX_ICONS_CONFIG, { optional: true });

  private anterior?: MorphIcon;

  protected get ariaHidden(): 'true' | 'false' {
    return this.decorative && !this.label ? 'true' : 'false';
  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (!cambios['icon']) return;

    const nuevo = this.icon;
    const anterior = this.anterior;
    this.anterior = nuevo;

    if (!nuevo) {
      this.figura.nativeElement.removeAttribute('d');
      return;
    }

    // Primer valor, sin nada previo: se pinta y ya. Morphear "desde nada" no existe.
    // También cae aquí el SSR y cualquier navegador sin WAAPI: se ve el icono, no se anima.
    const puedeAnimar = typeof this.figura.nativeElement.animate === 'function';
    if (!anterior || !puedeAnimar || (this.respectReducedMotion && this.movimientoReducido)) {
      this.figura.nativeElement.setAttribute('d', canonicalD(aIconInput(nuevo)));
      return;
    }

    runMorph(this.figura.nativeElement, aIconInput(anterior), aIconInput(nuevo), {
      durationScale: this.config?.durationScale ?? 1,
      ...(this.spring ? { spring: this.spring } : {}),
    });
  }

  private get movimientoReducido(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
  }
}
