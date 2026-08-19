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
import { AnimatedIconDef, MaxIconComponent } from 'glyphflow';
import { analizarIcono, VariantReport } from './motion-inspector';
import { nombreDeConst } from './icon-name';
import { IconScrubber } from './icon-scrubber';
import { Boton } from '../../shared/ui/boton';

/**
 * Panel de detalle por icono: nombre, selector de variante (mapea a `animation=`), preview en
 * vivo, snippet de Angular único, export/import JSON de la coreografía, y el Motion Inspector
 * (solo lectura) sobre CADA variante — no solo la que está en preview.
 *
 * Se abre con click en una tarjeta del grid. `[iconDef]`, nunca `name=`: es la misma ruta
 * tree-shakeable que ya usa el resto del playground.
 */
@Component({
  selector: 'app-icon-detail-panel',
  imports: [MaxIconComponent, IconScrubber, Boton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-detail-panel.html',
  styleUrl: './icon-detail-panel.css',
})
export class IconDetailPanel {
  @ViewChild('preview') private preview?: MaxIconComponent;
  @ViewChild('cajaJson') private cajaJson?: ElementRef<HTMLTextAreaElement>;

  readonly nombre = input.required<string>();
  readonly def = input.required<AnimatedIconDef>();
  readonly cerrar = output<void>();

  protected readonly variantes: Signal<string[]> = computed(() =>
    Object.keys(this.def().animations),
  );
  protected readonly varianteActiva = signal('default');
  protected readonly copiado = signal<'snippet' | 'json' | null>(null);

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

  protected duracion(v: VariantReport): string {
    return v.duracionMs === null ? 'en vivo (autoDraw)' : `${v.duracionMs} ms`;
  }

  protected elegirVariante(v: string): void {
    this.varianteActiva.set(v);
  }

  protected reproducir(): void {
    this.preview?.play();
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
