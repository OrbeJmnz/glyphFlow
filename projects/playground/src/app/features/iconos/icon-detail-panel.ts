import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
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
import { Tooltip } from '../../shared/ui/tooltip';
import { URL_REPO } from '../../core/github';
import { iconoPlano } from '../../core/morph-icon-plano';

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
    Tooltip,
    RouterLink,
    TranslocoPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-detail-panel.html',
  styleUrl: './icon-detail-panel.css',
})
export class IconDetailPanel implements OnDestroy {
  /** Solo hay un panel abierto a la vez, así que un id fijo alcanza y se lee en el DOM. */
  protected readonly ID_TITULO = 'detalle-titulo';

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  /* Lo que el `<body>` tenía antes de bloquearlo. Se restaura tal cual: escribir `''` daría por
     hecho que nadie más lo había tocado. */
  private readonly overflowPrevio = document.body.style.overflow;
  private readonly paddingPrevio = document.body.style.paddingRight;

  ngOnDestroy(): void {
    document.body.style.overflow = this.overflowPrevio;
    document.body.style.paddingRight = this.paddingPrevio;
  }

  /**
   * Trampa de foco. `Tab` cicla dentro del panel en vez de salirse a una página que, para quien
   * usa ratón, está tapada por el scrim. Se recalcula en cada pulsación a propósito: las tabs
   * cambian qué controles existen, así que una lista cacheada en el constructor apuntaría a
   * botones que ya no están en el DOM.
   */
  @HostListener('keydown', ['$event'])
  protected alTeclado(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      this.cerrar.emit();
      return;
    }
    if (ev.key !== 'Tab') return;

    const focos = this.enfocables();
    if (focos.length === 0) return;

    const primero = focos[0];
    const ultimo = focos[focos.length - 1];
    const activo = document.activeElement;

    if (ev.shiftKey && (activo === primero || !this.host.nativeElement.contains(activo))) {
      ev.preventDefault();
      ultimo.focus();
    } else if (!ev.shiftKey && activo === ultimo) {
      ev.preventDefault();
      primero.focus();
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
     * Bloquear el scroll del `<body>` esconde la barra, y eso ENSANCHA el viewport: la rejilla
     * centrada se correría unos píxeles justo al abrir el panel — exactamente lo que este ticket
     * venía a impedir. El padding compensa el ancho que la barra deja libre, así que nada se mueve.
     */
    const anchoBarra = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (anchoBarra > 0) {
      document.body.style.paddingRight = `${anchoBarra}px`;
    }

    // El foco entra al panel: si se queda en la tarjeta, el primer `Tab` se va al resto de la
    // rejilla, que está detrás del scrim y es inalcanzable con ratón.
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

  protected elegirVariante(v: string): void {
    this.varianteActiva.set(v);
  }

  protected elegirTab(t: TabDetalle): void {
    this.tabActiva.set(t);
  }

  /** No-op si la tab "Vista previa" no está montada — el ícono grande solo vive ahí. */
  protected reproducir(): void {
    this.previewGrande?.play();
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
