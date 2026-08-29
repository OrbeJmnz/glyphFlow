import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
// Por NOMBRE DE PAQUETE, no por ruta relativa: `glyphflow/morph` es un entry point secundario, y
// una ruta relativa hacia el primario haría que ng-packagr duplique ese código en este bundle. Con
// `GF_ICONS_CONFIG` eso no sería solo peso: `InjectionToken` es identidad de objeto, así que una
// copia duplicada es OTRO token, y el `provideGfIcons` del consumidor no llegaría nunca.
import { GF_ICONS_CONFIG, IconShape } from 'glyphflow';
import { canonicalD, runMorph } from './morph-keyframes';
import type { SpringConfig, SpringPreset } from './morph-keyframes';
import { createLiveMorph, type LiveMorph } from './live-morph';
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
 * <gf-icon-morph [icon]="abierto() ? equisIcon : menuIcon" label="Menú" />
 * <gf-icon-morph [icon]="hover() ? bellRingIcon : bellIcon" />
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
     truena al perder su componente, solo deja de pintar. `max-icon-morph` se envia
     deprecado en la v2 y sale en la v3. */
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
export class GfIconMorphComponent implements OnChanges, OnDestroy {
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

  /**
   * Motor de render: `false` (default) usa keyframes precalculados de WAAPI — barato, corre en el
   * compositor, pero aproxima con ~20 poses fijas (ver `STEPS_DEFAULT`). `true` usa el motor en
   * vivo (`createLiveMorph`): resorte real por `requestAnimationFrame`, exacto en cada frame, a
   * costa de trabajo en el hilo principal mientras el morph se mueve. Pensado para los pocos
   * morphs que son la vitrina (un hero, el Lab) — no para un grid con cientos de iconos con hover.
   *
   * **Fijo desde el primer uso**: se lee una vez; cambiarlo después no tiene efecto.
   */
  @Input() live = false;

  /** El mismo `provideGfIcons({ durationScale })` que escala las coreografías de `<gf-icon>`. */
  private readonly config = inject(GF_ICONS_CONFIG, { optional: true });
  private readonly zona = inject(NgZone);

  private anterior?: MorphIcon;
  private modoVivo: boolean | null = null;
  private motorVivo?: LiveMorph;

  protected get ariaHidden(): 'true' | 'false' {
    return this.decorative && !this.label ? 'true' : 'false';
  }

  ngOnChanges(cambios: SimpleChanges): void {
    if (!cambios['icon']) return;
    this.modoVivo ??= this.live;

    const nuevo = this.icon;
    const anterior = this.anterior;
    this.anterior = nuevo;

    if (!nuevo) {
      // Si quedara un morph en vuelo, el ticker del motor en vivo repintaría `d` en el SIGUIENTE
      // frame y el icono "reaparecería" a medio morph — se destruye ANTES de limpiar el atributo,
      // no después. `this.anterior` ya quedó en `undefined` arriba: el siguiente icono real entra
      // por la rama de "primer valor" y `motorVivo` se recrea desde ahí, sembrado correctamente.
      this.motorVivo?.destroy();
      this.motorVivo = undefined;
      this.figura.nativeElement.removeAttribute('d');
      return;
    }

    // Primer valor, sin nada previo: se pinta y ya. Morphear "desde nada" no existe.
    // También cae aquí el SSR y cualquier navegador sin WAAPI/rAF: se ve el icono, no se anima.
    const puedeAnimar = this.modoVivo
      ? typeof requestAnimationFrame === 'function'
      : typeof this.figura.nativeElement.animate === 'function';
    // `animationsEnabled` en `false` cae aquí a propósito: la figura nueva se PINTA, solo no se
    // interpola. Saltarse la escritura dejaría el icono anterior en pantalla, que es peor que no
    // animar — el valor habría cambiado y el usuario vería el de antes.
    /*
     * El ensanchado no es pereza: en ESTE workspace el morph se compila DOS veces contra primarios
     * DISTINTOS. Con `tsconfig.lib.json`, `glyphflow` resuelve a `dist/` — el código de hoy. Con el
     * del playground resuelve al paquete PUBLICADO (regla 4: el sitio consume npm, no dist), que es
     * una versión anterior y todavía no conoce este campo.
     *
     * Sin esto, agregar CUALQUIER campo nuevo a `GfIconsConfig` deja `npm run typecheck` en rojo
     * hasta que salga una release: la librería no podría crecer sin publicar primero. En runtime no
     * cambia nada — el campo se lee igual y cae a `true` cuando no está, que es justo lo que pasa
     * cuando el consumidor corre una versión vieja del primario.
     */
    const config = this.config as { animationsEnabled?: boolean } | null;
    const animacionesActivas = config?.animationsEnabled ?? true;
    if (
      !anterior ||
      !puedeAnimar ||
      !animacionesActivas ||
      (this.respectReducedMotion && this.movimientoReducido)
    ) {
      // Si `motorVivo` ya existe, escribir el atributo a mano lo desincroniza de su `objetivo`
      // interno: el PRÓXIMO `morphTo` replanea desde el último vuelo en vivo (p. ej. B), no desde
      // lo que está pintado ahora mismo (p. ej. C) — la figura saltaría hacia atrás al reanudar el
      // movimiento. `set()` ya escribe el `d` canónico Y actualiza `objetivo`/`reposo`: mismo
      // resultado en pantalla, motor sincronizado.
      if (this.motorVivo) {
        this.motorVivo.set(aIconInput(nuevo));
      } else {
        this.figura.nativeElement.setAttribute('d', canonicalD(aIconInput(nuevo)));
      }
      return;
    }

    const durationScale = this.config?.durationScale ?? 1;
    if (this.modoVivo) {
      // `runOutsideAngular`: el scheduler de `live-morph.ts` se registra con `requestAnimationFrame`
      // desde AQUÍ. Con zone.js cargado (la app de un consumidor real, no este workspace zoneless),
      // ese `requestAnimationFrame` queda parchado como macrotarea — sin este envoltorio, cada frame
      // del morph dispararía un ciclo de detección de cambios de TODA la app, no solo de este
      // componente. WAAPI nunca pagó este costo porque no agenda ninguna tarea de zona; el modo en
      // vivo sí, y es la propia librería quien la agenda desde su ciclo de vida — ningún consumidor
      // puede evitarlo por su cuenta si esto no lo hace.
      this.zona.runOutsideAngular(() => {
        this.motorVivo ??= createLiveMorph(this.figura.nativeElement, aIconInput(anterior));
        this.motorVivo.morphTo(aIconInput(nuevo), {
          durationScale,
          ...(this.spring ? { spring: this.spring } : {}),
        });
      });
      return;
    }

    runMorph(this.figura.nativeElement, aIconInput(anterior), aIconInput(nuevo), {
      durationScale,
      ...(this.spring ? { spring: this.spring } : {}),
    });
  }

  ngOnDestroy(): void {
    this.motorVivo?.destroy();
  }

  private get movimientoReducido(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
  }
}
