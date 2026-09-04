import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
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
import type { MorphIntent } from './intents';
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

/**
 * Los cuatro momentos de una operación asíncrona, en el orden en que ocurren.
 *
 * No hay un quinto: `idle` es tanto el antes como el después de un `autoReset`. Un estado
 * "cancelado" o "vacío" se modela desde fuera volviendo a `idle`.
 */
export type GfAsyncState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Lo que tarda una vuelta del spinner de `asyncState="loading"`.
 *
 * Un segundo es el consenso de facto: por debajo lee como nervioso, por encima como colgado. Se
 * escala con el mismo `provideGfIcons({ durationScale })` que el resto del motor.
 */
const VUELTA_MS = 1000;

/**
 * Lo que tarda el spinner en ASENTARSE cuando llega la respuesta.
 *
 * Corto a propósito y fijo, no proporcional a lo que falte de vuelta: cuando la respuesta ya está
 * en pantalla, el giro dejó de ser información y es solo ruido encima de ella.
 */
const ASENTAR_MS = 240;

/**
 * `shapes` → data estilo Lucide (`[tag, attrs][]`), que es lo que come el core.
 *
 * Las figuras que el icono NO enseña en reposo quedan fuera, igual que las salta `runAutoDraw`:
 * no forman parte de su FORMA, solo existen mientras dura una variante — la guía de las monedas,
 * la estela del `nudge`, lo que emite `spark`. Meterlas aquí desparejaba el morph entero: `bell`
 * pasaba de 2 figuras a 4 y el core acababa emparejando el domo con un arco de sonido.
 */
function aIconInput(icono: MorphIcon): IconInput {
  return icono.shapes.filter((s: IconShape) => s.opacity !== '0').map((s: IconShape) => {
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
      [attr.viewBox]="viewBoxActual"
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
        El giro del estado "loading" va en este g, NO en el path: el fallback de crossfade de
        runMorph anima el transform de la figura, y dos animaciones sobre la misma propiedad del
        mismo elemento se pisan (gana la última en empezar). Tampoco va en el svg: ahí el
        transform-origin se resuelve contra la caja de layout del host, que el consumidor controla
        con "size". Un g con transform-box view-box gira siempre sobre el centro del viewBox, pase
        lo que pase afuera.
      -->
      <g #giro>
        <!--
          El atributo "d" se escribe imperativamente, NUNCA con [attr.d]: la animación y el
          aterrizaje también lo escriben, y dos dueños del mismo atributo terminan peleándose — un
          ciclo de detección de cambios pisaría el valor animado a media transición.
        -->
        <path #figura />
      </g>
    </svg>
  `,
  styles: [
    // Mismo contrato de tamaño que <gf-icon>: por contención, no por override (ver ahí el porqué
    // con utilidades en capas).
    ':host { display: inline-flex; align-items: center; justify-content: center; flex: none; line-height: 0; }',
    'svg { width: var(--ai-size); height: var(--ai-size); max-width: 100%; max-height: 100%; }',
    // Sin esto, el `scale()` del fallback de crossfade (pares sin correspondencia razonable, ver
    // `correspondenceIsPoor`) derivaría desde la esquina del viewBox en vez del centro del propio
    // trazo — el icono se vería "arrastrarse" hacia una esquina en vez de encogerse en su sitio.
    'path { transform-box: fill-box; transform-origin: center; }',
    // EXPLÍCITO a propósito, no por confiar en el default del navegador: es la misma cicatriz que
    // ya obligó a fijar `transform-box` en las figuras hijas del motor de <gf-icon>. Con `view-box`
    // el pivote es el centro del viewBox (12,12 en un icono de Lucide), no el de la caja del trazo
    // — un spinner que gire sobre el bbox de su propia figura bambolea.
    'g { transform-box: view-box; transform-origin: center; }',
  ],
  host: {
    '[style.--ai-size.px]': 'size',
  },
})
export class GfIconMorphComponent implements OnChanges, OnDestroy {
  @ViewChild('figura', { static: true }) private figura!: ElementRef<SVGPathElement>;
  @ViewChild('giro', { static: true }) private grupo!: ElementRef<SVGGElement>;

  /**
   * El icono a mostrar. Cambiarlo dispara el morph desde el valor anterior; el primer valor se
   * pinta estático (no hay desde dónde transicionar).
   */
  @Input() icon?: MorphIcon;

  /**
   * Máquina de estados de una operación asíncrona. Mientras esté definido **manda sobre `icon`**:
   * son dos formas de decir lo mismo y tener dos dueños del mismo `<path>` acaba en un empate que
   * el consumidor no puede depurar.
   *
   * ```html
   * <gf-icon-morph [asyncState]="estado()" [autoReset]="2000"
   *   [idleIcon]="sparklesIcon" [loadingIcon]="loaderCircleIcon"
   *   [successIcon]="checkIcon"  [errorIcon]="triangleAlertIcon" />
   * ```
   */
  @Input() asyncState?: GfAsyncState;
  @Input() idleIcon?: MorphIcon;
  @Input() loadingIcon?: MorphIcon;
  @Input() successIcon?: MorphIcon;
  @Input() errorIcon?: MorphIcon;

  /**
   * Un gesto de dos estados ya curado: el par de figuras, su resorte y si el activo es transitorio.
   *
   * ```html
   * <gf-icon-morph [intent]="COPY_INTENT" [active]="copiado()" />
   * ```
   *
   * Manda sobre `icon` y cede ante `asyncState` — de más específico a menos, un solo dueño del
   * `<path>` en cada momento.
   */
  @Input() intent?: MorphIntent;
  /** Qué lado del `intent` se enseña. Sin `intent` no hace nada. */
  @Input() active = false;
  /**
   * Milisegundos tras los que un estado transitorio vuelve solo a reposo: `success`/`error` con
   * `asyncState`, el lado activo con `intent`.
   *
   * **Sin inicializador A PROPÓSITO.** `0` es un valor legítimo —"no vuelvas"— así que traerlo
   * como default lo volvería indistinguible de "el consumidor no lo fijó", y entonces el
   * `autoReset` que trae un intent (`COPY_INTENT` vuelve a los 2 s) no se podría apagar nunca desde
   * la plantilla. `undefined` es el único centinela que no colisiona. Es la misma trampa que ya
   * mordió con `animation="default"` en `<gf-icon>`.
   *
   * Vuelve el ICONO, no el input: `asyncState`/`active` siguen siendo del consumidor y esto no
   * puede escribirle su señal. La consecuencia práctica: para enseñar dos éxitos seguidos hay que
   * pasar otra vez por `loading`, igual que en la vida real.
   *
   * Se lee en el momento de la transición, no de forma continua.
   */
  @Input() autoReset?: number;

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
  /** Opcional a propósito: `pack-check` (y cualquier consumidor que arme el componente por fuera
   *  de una app de Angular completa, ej. en un test unitario con un injector a medida) no siempre
   *  tiene `NgZone` disponible. Sin ella, `runFueraDeLaZona` simplemente no envuelve nada — mismo
   *  comportamiento que antes de este cambio, no un error. */
  private readonly zona = inject(NgZone, { optional: true });

  private anterior?: MorphIcon;
  private modoVivo: boolean | null = null;
  private motorVivo?: LiveMorph;
  /** La vuelta va junto a su animación: `detenerGiro` necesita el periodo para rematar a la MISMA
   *  velocidad angular, y leerlo del `effect` obliga a que exista `getTiming()` en cada entorno. */
  private giro?: { animacion: Animation; vuelta: number };
  /** La vuelta de cierre. Se guarda solo para poder cancelarla si vuelve a cargar a media parada. */
  private remate?: Animation;
  /** El último valor VISTO del input, para distinguir un cambio real de un `ngOnChanges` de paso. */
  private ultimoEstado?: GfAsyncState;
  /** Lo que se está ENSEÑANDO. Tras un `autoReset` ya no coincide con el input: el input es del
   *  consumidor y este componente no puede escribirle su señal. */
  private mostrado?: GfAsyncState;
  /** El par `ultimo…`/`…Mostrado` de `intent`, por el mismo motivo que el de `asyncState`. */
  private ultimoActivo?: boolean;
  private activoMostrado = false;
  private regreso?: ReturnType<typeof setTimeout>;

  protected get ariaHidden(): 'true' | 'false' {
    return this.decorative && !this.label ? 'true' : 'false';
  }

  /** Del icono que se está enseñando, no del input `icon`: con `intent`/`asyncState` ese está vacío. */
  protected get viewBoxActual(): string {
    return this.iconoObjetivo?.viewBox ?? '0 0 24 24';
  }

  /** El input pisa al intent: fijar `spring` en la plantilla es decir "este gesto, con MI carácter". */
  private get resorte(): SpringPreset | SpringConfig | undefined {
    return this.spring ?? this.intent?.spring;
  }

  /**
   * Qué figura toca pintar. Precedencia de más específico a menos: `asyncState` → `intent` →
   * `icon`. Un solo dueño del `<path>` en cada momento; dos serían un empate imposible de depurar
   * desde fuera.
   */
  private get iconoObjetivo(): MorphIcon | undefined {
    switch (this.mostrado) {
      case undefined:
        if (this.intent) return this.activoMostrado ? this.intent.active : this.intent.idle;
        return this.icon;
      case 'idle':
        return this.idleIcon;
      case 'loading':
        return this.loadingIcon;
      case 'success':
        return this.successIcon;
      case 'error':
        return this.errorIcon;
    }
  }

  ngOnChanges(): void {
    // Solo un cambio REAL del input reengancha la máquina: `ngOnChanges` también corre por `size`,
    // `label` o `spring`, y reprogramar el `autoReset` en cada uno reiniciaría la cuenta atrás.
    const cambioEstado = this.asyncState !== this.ultimoEstado;
    const cambioActivo = this.active !== this.ultimoActivo;
    if (cambioEstado) {
      this.ultimoEstado = this.asyncState;
      this.mostrado = this.asyncState;
    }
    if (cambioActivo) {
      this.ultimoActivo = this.active;
      this.activoMostrado = this.active;
    }
    if (cambioEstado || cambioActivo) this.programarRegreso();
    this.aplicar();
  }

  /** Pinta lo que toca ahora mismo, venga de un input o del temporizador de `autoReset`. */
  private aplicar(): void {
    // ANTES del guard de identidad: el giro depende del ESTADO, no de la figura. Si `loadingIcon` y
    // `successIcon` fueran el mismo objeto, el guard cortaría aquí y el spinner seguiría girando
    // sobre un icono que ya dice "listo".
    this.sincronizarGiro();

    const nuevo = this.iconoObjetivo;
    // Identidad, no `cambios['icon']`: con `asyncState` el `<path>` tiene dos posibles dueños y el
    // que manda no siempre es el input que cambió. Comparar el RESULTADO cubre los dos y de paso
    // ignora los cambios de `size`/`spring`/`label`, que no mueven la figura.
    if (nuevo === this.anterior) return;
    this.modoVivo ??= this.live;

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
      this.runFueraDeLaZona(() => {
        this.motorVivo ??= createLiveMorph(this.figura.nativeElement, aIconInput(anterior));
        this.motorVivo.morphTo(aIconInput(nuevo), {
          durationScale,
          ...(this.resorte ? { spring: this.resorte } : {}),
        });
      });
      return;
    }

    runMorph(this.figura.nativeElement, aIconInput(anterior), aIconInput(nuevo), {
      durationScale,
      ...(this.resorte ? { spring: this.resorte } : {}),
    });
  }

  ngOnDestroy(): void {
    this.motorVivo?.destroy();
    // Cancelar a secas, sin rematar la vuelta: el elemento se va del DOM, así que la vuelta de
    // cierre no la vería nadie y quedaría corriendo sobre un nodo desmontado.
    this.giro?.animacion.cancel();
    this.remate?.cancel();
    this.giro = undefined;
    this.remate = undefined;
    // Sin esto, el regreso dispara sobre un componente desmontado y escribe en un nodo suelto.
    clearTimeout(this.regreso);
    this.regreso = undefined;
  }

  /**
   * Prende el giro del estado `loading`. Idempotente: mientras siga cargando, llamarlo de más no
   * reinicia la vuelta en curso.
   *
   * No se envuelve en `runOutsideAngular` como sí hace el motor en vivo: WAAPI no agenda ninguna
   * tarea de zona — corre en el compositor y no dispara detección de cambios por frame.
   */
  /**
   * Agenda —o cancela— el regreso a `idle` de un estado terminal.
   *
   * Se llama en CADA cambio real de estado, también al entrar en `loading`: así un `loading` que
   * llega mientras un "listo" anterior espera su regreso mata esa cuenta atrás, en vez de dejarla
   * disparar encima del ciclo nuevo.
   */
  private programarRegreso(): void {
    clearTimeout(this.regreso);
    this.regreso = undefined;

    // El input manda si se fijó, INCLUIDO `0`; si no, el que traiga el intent. Ver el comentario
    // del input `autoReset`: sin el centinela `undefined`, un intent con regreso propio no se
    // podría apagar desde la plantilla.
    const ms = this.autoReset ?? this.intent?.autoReset ?? 0;
    if (ms <= 0) return;

    const enEstadoTransitorio =
      this.mostrado === 'success' ||
      this.mostrado === 'error' ||
      (this.mostrado === undefined && !!this.intent && this.activoMostrado);
    if (!enEstadoTransitorio) return;

    this.regreso = setTimeout(() => {
      this.regreso = undefined;
      if (this.mostrado === undefined) this.activoMostrado = false;
      else this.mostrado = 'idle';
      // `aplicar()` escribe el `<path>` a mano, así que no necesita un ciclo de detección: el
      // componente es OnPush y ningún binding de la plantilla depende del estado.
      this.aplicar();
    }, ms);
  }

  private sincronizarGiro(): void {
    if (this.mostrado !== 'loading') {
      this.detenerGiro();
      return;
    }
    if (this.giro) return;
    // Mismo guard que el morph: sin WAAPI (SSR, navegador sin soporte) se ve el icono de carga
    // quieto, que es peor que girar pero mucho mejor que no pintar nada.
    const el = this.grupo.nativeElement;
    if (typeof el.animate !== 'function') return;
    // Movimiento reducido: el icono de carga SÍ se pinta (el estado es información), solo no gira.
    if (this.respectReducedMotion && this.movimientoReducido) return;

    // Si volvió a cargar mientras se remataba la vuelta anterior, esa cierra sobre el mismo
    // `transform`: sin cancelarla, las dos animaciones se pisan y gana la última en empezar.
    this.remate?.cancel();
    this.remate = undefined;

    // `Math.max`: con `durationScale` en 0 o negativo, una duración 0 con iteraciones infinitas
    // reinicia el ciclo en cada frame y el icono vibra en vez de girar.
    const vuelta = Math.max(1, VUELTA_MS * (this.config?.durationScale ?? 1));
    const animacion = el.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
      duration: vuelta,
      iterations: Infinity,
      // `linear` no es pereza: cualquier easing le mete un pulso a cada vuelta, y un spinner que
      // acelera y frena lee como si la operación fuera a trompicones.
      easing: 'linear',
    });
    this.giro = { animacion, vuelta };
  }

  /**
   * Apaga el giro ASENTÁNDOLO en el reposo más cercano, ni de golpe ni completando la vuelta.
   *
   * Cancelar y ya devuelve el `<g>` a 0° en un solo frame: con el spinner a media vuelta son 180°
   * de salto justo cuando el usuario está mirando, porque es cuando llega la respuesta.
   *
   * Pero completar la vuelta a velocidad constante —lo que hacía la primera versión de esto— es
   * PEOR: el `<path>` ya está morfeando hacia la palomita mientras el grupo sigue rodando, así que
   * la respuesta se pasa hasta un segundo entero dando vueltas. Un spinner que se resuelve frena;
   * no termina su lap. Por eso el destino es el múltiplo de 360° más cercano (nunca más de medio
   * giro de recorrido) y la duración es corta y fija.
   *
   * `ease-out` y no `SPRING_SMOOTH`, que sería la curva de la casa: este entry point se compila
   * TAMBIÉN contra el `glyphflow` PUBLICADO (hoy 2.4.0), que no exporta `spring-easings` todavía —
   * importarlo aquí dejaría `typecheck` en rojo hasta la próxima release. A 240 ms un ease-out y un
   * resorte crítico son indistinguibles.
   */
  private detenerGiro(): void {
    const giro = this.giro;
    if (!giro) return;
    this.giro = undefined;

    const transcurrido = Number(giro.animacion.currentTime ?? 0);
    giro.animacion.cancel();
    if (!Number.isFinite(transcurrido)) return;

    // Módulo defensivo: `currentTime` de una animación infinita crece sin techo.
    const recorrido = ((transcurrido % giro.vuelta) + giro.vuelta) % giro.vuelta;
    // Justo en 0°: ya está donde tiene que estar, animar sería peor que no hacer nada.
    if (recorrido === 0) return;

    const angulo = (recorrido / giro.vuelta) * 360;
    // Atrás si no pasó del medio giro, adelante si ya lo pasó: como mucho 180° de recorrido.
    const destino = angulo <= 180 ? 0 : 360;

    const el = this.grupo.nativeElement;
    if (typeof el.animate !== 'function') return;
    this.remate = el.animate(
      [{ transform: `rotate(${angulo}deg)` }, { transform: `rotate(${destino}deg)` }],
      {
        duration: Math.max(1, ASENTAR_MS * (this.config?.durationScale ?? 1)),
        easing: 'ease-out',
      },
    );
  }

  /** `NgZone.runOutsideAngular` si hay zona; si no (`inject` opcional sin proveedor), corre la
   *  función directo — mismo resultado que antes de este cambio, no un error. */
  private runFueraDeLaZona(fn: () => void): void {
    if (this.zona) this.zona.runOutsideAngular(fn);
    else fn();
  }

  private get movimientoReducido(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
  }
}
