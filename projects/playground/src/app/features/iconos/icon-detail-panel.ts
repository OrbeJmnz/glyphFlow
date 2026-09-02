import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Signal,
  ViewChild,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { AnimatedIconDef, GfIconComponent, checkIcon, copyIcon } from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { analizarIcono } from './motion-inspector';
import { nombreDeConst } from './icon-name';
import { IconScrubber } from './icon-scrubber';
import { Boton } from '../../shared/ui/boton';
import { Chip } from '../../shared/ui/chip';
import { Grupo } from '../../shared/ui/grupo';
import { CarrilActivo } from '../../shared/ui/carril-activo';
import { Tooltip } from '../../shared/ui/tooltip';
import { URL_REPO } from '../../core/github';
import { iconoPlano } from '../../core/morph-icon-plano';
import { Rutas } from '../../core/rutas.service';

/** Las tres pestañas del drawer — una sola cosa visible a la vez, el resto es scroll perdido. */
type TabDetalle = 'preview' | 'codigo' | 'inspector';

/**
 * Panel de detalle por icono: nombre, selector de variante (mapea a `animation=`), preview en
 * vivo, snippet de Angular único, export/import JSON de la coreografía, y el Motion Inspector
 * (solo lectura) sobre CADA variante — no solo la que está en preview.
 *
 * Drawer fijo a la derecha, NO modal: la cuadrícula sigue visible y navegable detrás. Por eso no
 * hay backdrop ni bloqueo de scroll — cerrar es opcional, no obligatorio.
 *
 * Se abre con click en una tarjeta del grid. `[iconDef]`, nunca `name=`: es la misma ruta
 * tree-shakeable que ya usa el resto del playground.
 */
@Component({
  selector: 'app-icon-detail-panel',
  imports: [
    GfIconComponent,
    GfIconMorphComponent,
    IconScrubber,
    Boton,
    Chip,
    Grupo,
    CarrilActivo,
    Tooltip,
    RouterLink,
    TranslocoPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-detail-panel.html',
  styleUrl: './icon-detail-panel.css',
})
export class IconDetailPanel {
  /** Los enlaces se piden por ID: el slug cambia con el idioma. Ver `core/rutas.ts`. */
  protected readonly rutas = inject(Rutas);

  /** Solo hay un panel abierto a la vez, así que un id fijo alcanza y se lee en el DOM. */
  protected readonly ID_TITULO = 'detalle-titulo';

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);



/**
   * `Escape` cierra. `Tab` NO se atrapa: había una trampa de foco que ciclaba dentro del panel,
   * y tenía sentido mientras esto se comportaba como un modal — pero la página de detrás no está
   * tapada por nada, así que atrapar el tabulador dejaba fuera del teclado una rejilla que el
   * ratón sí alcanza.
   */
  @HostListener('keydown', ['$event'])
  protected alTeclado(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      this.cerrar.emit();
      return;
    }
  }

  private enfocables(): HTMLElement[] {
    return Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
  }

  @ViewChild('previewGrande') private previewGrande?: GfIconComponent;
  @ViewChild('cajaJson') private cajaJson?: ElementRef<HTMLTextAreaElement>;

  readonly nombre = input.required<string>();
  readonly def = input.required<AnimatedIconDef>();
  readonly cerrar = output<void>();

  protected readonly tabActiva = signal<TabDetalle>('preview');

  /** Se calcula del `def` que ya llega: pasarlo como input sería un segundo sitio del que dudar. */
  protected readonly tieneHold = computed(() => !!this.def().animations['hold']);

  protected readonly variantes: Signal<string[]> = computed(() =>
    Object.keys(this.def().animations),
  );
  protected readonly varianteActiva = signal('default');
  protected readonly copiado = signal<'snippet' | 'json' | null>(null);

  /**
   * Mismo patrón que "Copiar al portapapeles" en /patrones: copy → check vía morph real.
   * `copyIcon` aplanado (ver `iconoPlano`): son 2 figuras contra la 1 de `checkIcon`, y sin
   * aplanar el plan las reparte con asignación surjectiva — ambas convergen al MISMO destino y
   * a media transición se cruzan antes de fundirse recién en t=1.
   */
  private readonly copyIconPlano = iconoPlano(copyIcon);
  protected readonly iconoCopiarSnippet = computed<MorphIcon>(() =>
    this.copiado() === 'snippet' ? checkIcon : this.copyIconPlano,
  );
  protected readonly iconoCopiarJson = computed<MorphIcon>(() =>
    this.copiado() === 'json' ? checkIcon : this.copyIconPlano,
  );

  /**
   * Tooltip y aria-label de cada botón de copiar, uno por botón porque cada uno vigila SU PROPIO
   * estado (`copiado() === 'snippet'` vs. `=== 'json'`) — mismo patrón que «Copiar al
   * portapapeles» en /patrones: la rama elige la CLAVE, no el texto.
   */
  private readonly claveTooltipSnippet = computed(() =>
    this.copiado() === 'snippet' ? 'iconos.detalle.codigo.copiado' : 'iconos.detalle.codigo.copiar',
  );
  protected readonly tooltipSnippet = translateSignal(this.claveTooltipSnippet);
  private readonly claveAriaSnippet = computed(() =>
    this.copiado() === 'snippet'
      ? 'iconos.detalle.codigo.copiado'
      : 'iconos.detalle.codigo.copiarSnippetAria',
  );
  protected readonly ariaSnippet = translateSignal(this.claveAriaSnippet);

  private readonly claveTooltipJson = computed(() =>
    this.copiado() === 'json' ? 'iconos.detalle.codigo.copiado' : 'iconos.detalle.codigo.copiar',
  );
  protected readonly tooltipJson = translateSignal(this.claveTooltipJson);
  private readonly claveAriaJson = computed(() =>
    this.copiado() === 'json'
      ? 'iconos.detalle.codigo.copiado'
      : 'iconos.detalle.codigo.copiarJsonAria',
  );
  protected readonly ariaJson = translateSignal(this.claveAriaJson);

  constructor() {
    // Si cambia el icono seleccionado, la variante activa vuelve a `default` (o a la primera que
    // haya) — quedarse en una variante de OTRO icono sería mostrar un snippet que no corresponde.
    effect(() => {
      const vs = this.variantes();
      this.varianteActiva.set(vs.includes('default') ? 'default' : (vs[0] ?? 'default'));
    });

    /*
     * NO se bloquea el scroll del `<body>`, y eso es el punto: esto es un drawer, no un modal.
     *
     * Lo bloqueaba —con su padding para compensar la barra— y el CSS de al lado lleva desde
     * entonces diciendo lo contrario en su primera línea: «Drawer fijo, NO modal: sin backdrop y
     * sin bloquear el scroll del body». Ganó el TypeScript, y el resultado era que con el panel
     * abierto no se podía ni bajar por la rejilla ni pulsar otro icono: había que cerrarlo para
     * cada uno. Tampoco existe el «scrim» que este comentario mencionaba — la rejilla se ve y se
     * usa entera.
     *
     * El foco SÍ entra al panel, que es distinto: sirve a quien usa lector de pantalla y no le
     * quita nada a quien usa ratón.
     */
    afterNextRender(() => this.enfocables()[0]?.focus());
  }

  protected readonly reporte = computed(() => analizarIcono(this.nombre(), this.def()));
  protected readonly constName = computed(() => nombreDeConst(this.nombre()));

  protected readonly snippet = computed(() => {
    const constName = nombreDeConst(this.nombre());
    const variante = this.varianteActiva();
    const attrVariante = variante === 'default' ? '' : ` animation="${variante}"`;
    return (
      `import { ${constName} } from 'glyphflow';\n\n` +
      `<gf-icon [iconDef]="${constName}"${attrVariante} />`
    );
  });

  /** Prellenado del issue: quién lo abre no debería escribir de cero qué icono es. */
  private readonly issueTitulo = translateSignal(
    'iconos.detalle.issue.titulo',
    computed(() => ({ nombre: this.nombre() })),
  );
  private readonly issueCuerpo = translateSignal(
    'iconos.detalle.issue.cuerpo',
    computed(() => ({ constName: this.constName(), variante: this.varianteActiva() })),
  );
  protected readonly urlReportar = computed(() => {
    const params = new URLSearchParams({
      title: this.issueTitulo(),
      body: this.issueCuerpo(),
    });
    return `${URL_REPO}/issues/new?${params.toString()}`;
  });

  protected readonly exportJson = computed(() =>
    JSON.stringify(
      {
        icono: this.nombre(),
        viewBox: this.def().viewBox,
        shapes: this.def().shapes,
        animations: this.def().animations,
      },
      null,
      2,
    ),
  );

  /**
   * Elegir una variante la REPRODUCE, no sólo la selecciona.
   *
   * Antes había que elegirla y luego ir a picar el icono grande, y eso hacía invisible justo lo
   * que la lista sirve para comparar: cómo se mueve cada una. El `setTimeout` de un tick espera a
   * que Angular pinte con la variante nueva — disparar antes reproduce la anterior.
   */
  protected elegirVariante(v: string): void {
    if (v === this.varianteActiva()) {
      this.reproducir();
      return;
    }
    this.varianteActiva.set(v);
    setTimeout(() => this.reproducir());
  }

  /**
   * Flechas dentro del `radiogroup` de variantes. Calcado de `teclaVelocidad()` (`app.ts`, que
   * dejó de necesitarlo al pasar la velocidad a un botón cíclico) — es el mismo contrato de
   * `role="radio"`: sin flechas, anunciar "1 de N" y que no respondan es peor que no anunciarlo.
   */
  protected teclaVariante(ev: KeyboardEvent): void {
    const pasos: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const paso = pasos[ev.key];
    if (paso === undefined) return;
    ev.preventDefault();

    const vs = this.variantes();
    const i = vs.indexOf(this.varianteActiva());
    const siguiente = (i + paso + vs.length) % vs.length;
    this.elegirVariante(vs[siguiente]);

    const boton = ev.currentTarget as HTMLElement;
    boton.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]')[siguiente]?.focus();
  }

  protected elegirTab(t: TabDetalle): void {
    this.tabActiva.set(t);
  }

  /** No-op si la tab "Vista previa" no está montada — el ícono grande solo vive ahí. */
  protected reproducir(): void {
    this.previewGrande?.play();
  }

  /**
   * Un toque en táctil sintetiza `pointerenter` Y `click`, así que sin este guard el gesto se
   * disparaba DOS veces por toque y se reiniciaba encima de sí mismo. El motor ya blinda sus dos
   * caminos igual (`gf-icon.component.ts`, `pointerType === 'touch'`); esto es el mismo criterio
   * para el disparo manual del panel, que no pasa por ahí.
   *
   * Va por `pointerenter` y no `mouseenter` precisamente porque el evento de puntero SÍ dice de
   * qué tipo de entrada viene; el de ratón no lo distingue.
   */
  protected reproducirSiApunta(e: PointerEvent): void {
    if (e.pointerType === 'touch') return;
    this.reproducir();
  }

  protected async copiarSnippet(): Promise<void> {
    await this.copiar(this.snippet(), 'snippet');
  }

  protected async copiarJson(): Promise<void> {
    await this.copiar(this.exportJson(), 'json');
  }

  protected seleccionarJson(): void {
    this.cajaJson?.nativeElement.select();
  }

  private async copiar(texto: string, cual: 'snippet' | 'json'): Promise<void> {
    try {
      await navigator.clipboard.writeText(texto);
      this.copiado.set(cual);
      setTimeout(() => this.copiado.update((c) => (c === cual ? null : c)), 1500);
    } catch {
      // Clipboard API pide contexto seguro (https) o permiso; sin eso, la caja de texto
      // seleccionable (`seleccionarJson`) es el respaldo — copiar a mano con Ctrl+C sigue andando.
    }
  }
}
