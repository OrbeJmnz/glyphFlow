import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { AnimatedIconDef, MaxIconComponent, checkIcon, copyIcon } from 'glyphflow';
import { MaxIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
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
    MaxIconComponent,
    MaxIconMorphComponent,
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
export class IconDetailPanel {
  @ViewChild('previewGrande') private previewGrande?: MaxIconComponent;
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
  }

  protected readonly reporte = computed(() => analizarIcono(this.nombre(), this.def()));
  protected readonly constName = computed(() => nombreDeConst(this.nombre()));

  protected readonly snippet = computed(() => {
    const constName = nombreDeConst(this.nombre());
    const variante = this.varianteActiva();
    const attrVariante = variante === 'default' ? '' : ` animation="${variante}"`;
    return (
      `import { ${constName} } from 'glyphflow';\n\n` +
      `<max-icon [iconDef]="${constName}"${attrVariante} />`
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
