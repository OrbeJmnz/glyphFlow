import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { hayMovimiento } from '../../core/movimiento';
import type { PaletteId, ShapeId } from './bot-shapes';
import { renderBot, type ExpressionId, type FaceStyleId, type FaceTheme } from './face-system';
import { shapeMetrics } from './shape-metrics';

let seq = 0;

/** A partir de este tamaño la cara pasa a su versión simplificada (`lod = 'sm'`). */
export const SMALL_FACE_PX = 48;

/**
 * Un bot del Face Lab: pinta Shape + FaceStyle + Expression con el dibujador puro de
 * `face-system.ts`.
 *
 * El SVG entra como `innerHTML` con `bypassSecurityTrustHtml`, y es seguro: el string sale ENTERO
 * de datos tipados de este mismo módulo (recetas, siluetas, expresiones); ningún texto del usuario
 * llega ahí. La alternativa —12 recetas en plantilla Angular— era justo el «12 componentes con
 * código duplicado» que el laboratorio prohíbe.
 *
 * `ViewEncapsulation.None` por lo mismo: el SVG no lo crea la plantilla, así que los estilos
 * emulados no lo alcanzarían. Todas sus clases van con prefijo `fl-` para no chocar con nada.
 *
 * En el prerender no se pinta: la página es una herramienta, y hornear ~70 SVG en el HTML
 * estático solo inflaría la ruta. Aparecen al hidratar.
 */
@Component({
  selector: 'app-face-bot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '',
  styleUrl: './face-bot.css',
  host: {
    class: 'fl-bot',
    '[innerHTML]': 'html()',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[attr.data-lod]': 'lod()',
    '(pointerenter)': 'entrar()',
    '(pointermove)': 'mover($event)',
    '(pointerleave)': 'salir()',
  },
})
export class FaceBot {
  readonly shape = input.required<ShapeId>();
  readonly face = input.required<FaceStyleId>();
  readonly expr = input<ExpressionId>('neutral');
  readonly palette = input<PaletteId | 'auto'>('auto');
  readonly theme = input<FaceTheme>('light');
  /** Tamaño fijo en px. Sin él, el bot llena su contenedor. */
  readonly size = input<number | undefined>(undefined);
  /** Sigue al puntero y parpadea al entrar. */
  readonly interactive = input(false, { transform: booleanAttribute });
  /** Parpadeo espontáneo cada 2.5–6 s. */
  readonly blinks = input(false, { transform: booleanAttribute });
  /** El «Animate» del lab. Se suma a la preferencia de movimiento del sitio, no la reemplaza. */
  readonly animate = input(true, { transform: booleanAttribute });

  readonly lod = computed(() => {
    const s = this.size();
    return s !== undefined && s <= SMALL_FACE_PX ? 'sm' : 'lg';
  });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly enNavegador = signal(false);
  private readonly uid = `fl${++seq}`;
  private timer: ReturnType<typeof setTimeout> | undefined;

  readonly html = computed(() => {
    if (!this.enNavegador()) return '';
    const svg = renderBot(
      {
        shape: this.shape(),
        face: this.face(),
        expr: this.expr(),
        palette: this.palette(),
        theme: this.theme(),
        lod: this.lod(),
        uid: this.uid,
      },
      shapeMetrics()[this.shape()],
    );
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  });

  private readonly puedeAnimar = () => this.animate() && hayMovimiento();

  constructor() {
    // `afterNextRender` no corre en el servidor: ahí el bot se queda vacío a propósito.
    afterNextRender(() => {
      this.enNavegador.set(true);
      if (this.blinks()) this.programar();
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** Parpadeo geométrico: abierto → aplastado → cerrado → abierto, 150 ms. Nunca `opacity`. */
  blink(): void {
    if (!this.puedeAnimar()) return;
    for (const g of this.host.nativeElement.querySelectorAll<SVGGElement>(
      '.fl-eye[data-open] .fl-blink',
    ))
      g.animate(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(1.08, 0.5)', offset: 0.3 },
          { transform: 'scale(1.12, 0.08)', offset: 0.5 },
          { transform: 'scale(1, 1)' },
        ],
        { duration: 150, easing: 'ease-in-out' },
      );
  }

  private programar(): void {
    this.timer = setTimeout(
      () => {
        // Fuera de pantalla o con la pestaña oculta no se gasta nada.
        const el = this.host.nativeElement;
        if (!document.hidden && el.isConnected && el.getClientRects().length) this.blink();
        this.programar();
      },
      2500 + Math.random() * 3500,
    );
  }

  entrar(): void {
    if (this.interactive()) this.blink();
  }

  /** La cara sigue al puntero, como mucho 3.2 × 2.2 unidades del viewBox (≈3 px a 200 px). */
  mover(e: PointerEvent): void {
    if (!this.interactive() || !this.puedeAnimar()) return;
    const el = this.host.nativeElement;
    const r = el.getBoundingClientRect();
    const dx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    const dy = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    el.style.setProperty('--lx', (dx * 3.2).toFixed(2));
    el.style.setProperty('--ly', (dy * 2.2).toFixed(2));
  }

  salir(): void {
    const el = this.host.nativeElement;
    el.style.setProperty('--lx', '0');
    el.style.setProperty('--ly', '0');
  }
}
