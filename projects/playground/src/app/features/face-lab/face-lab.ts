import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import faceLabEn from '../../../i18n/face-lab/en.json';
import { Rutas } from '../../core/rutas.service';
import { tema } from '../../core/tema';
import { Chip } from '../../shared/ui/chip';
import { Grupo } from '../../shared/ui/grupo';
import { PALETTES, SHAPE_ORDER, type PaletteId, type ShapeId } from './bot-shapes';
import { FaceBot } from './face-bot';
import {
  EXPRESSION_ORDER,
  FACE_BY_ID,
  FACE_STYLES,
  type ExpressionId,
  type FaceStyleId,
  type FaceTheme,
} from './face-system';
import { measureShapes } from './shape-metrics';

export type FaceLabMode = 'variants' | 'shapes' | 'sizes';

/**
 * Face Lab: el banco para ELEGIR un sistema facial mirando las 12 hipótesis juntas.
 *
 * La regla del banco es la de toda comparación honesta: en el modo «12 variantes» todas las
 * tarjetas comparten forma, tamaño, color y expresión, así que lo único que cambia es la cara.
 * «Compare shapes» fija la cara y recorre las 8 siluetas; «Tamaños» la baja de 256 a 24 px sobre
 * UI clara y oscura a la vez.
 *
 * Como el resto del Lab: NO es producto. No toca el sistema de bots ni la librería.
 */
@Component({
  selector: 'app-face-lab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaceBot, Chip, Grupo, RouterLink, TranslocoPipe],
  // El scope va en el componente y no en la ruta, igual que el Lab: así el idioma por defecto
  // viaja DENTRO de este chunk. Ver `lab.ts`.
  providers: [
    provideTranslocoScope({
      scope: 'faceLab',
      loader: {
        en: () => Promise.resolve(faceLabEn),
        es: () => import('../../../i18n/face-lab/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './face-lab.html',
  styleUrl: './face-lab.css',
})
export class FaceLab {
  protected readonly rutas = inject(Rutas);

  protected readonly faces = FACE_STYLES;
  protected readonly faceById = FACE_BY_ID;
  protected readonly shapes = SHAPE_ORDER;
  protected readonly expressions = EXPRESSION_ORDER;
  protected readonly palettes: readonly (PaletteId | 'auto')[] = [
    'auto',
    ...(Object.keys(PALETTES) as PaletteId[]),
  ];
  /** Los tamaños chicos que lleva cada tarjeta, y la escalera completa del modo «Tamaños». */
  protected readonly smallSizes = [24, 32, 48] as const;
  protected readonly ladder = [24, 32, 48, 64, 96, 160, 256] as const;
  protected readonly uiThemes: readonly FaceTheme[] = ['light', 'dark'];

  readonly shape = signal<ShapeId>('huevo');
  readonly expr = signal<ExpressionId>('neutral');
  readonly palette = signal<PaletteId | 'auto'>('auto');
  /** Arranca en el tema del sitio, pero es independiente: el lab tiene que poder probar los dos. */
  readonly theme = signal<FaceTheme>(tema() === 'claro' ? 'light' : 'dark');
  readonly animate = signal(true);
  readonly mode = signal<FaceLabMode>('variants');
  readonly face = signal<FaceStyleId>('system');
  /** Expresión propia de una tarjeta. Se limpia al cambiar la expresión global. */
  readonly perCard = signal<Partial<Record<FaceStyleId, ExpressionId>>>({});

  protected readonly faceName = computed(() => FACE_BY_ID[this.face()].name);

  constructor() {
    const doc = inject(DOCUMENT);
    afterNextRender(() => measureShapes(doc));
  }

  exprFor(id: FaceStyleId): ExpressionId {
    return this.perCard()[id] ?? this.expr();
  }

  setGlobalExpr(e: ExpressionId): void {
    this.expr.set(e);
    this.perCard.set({});
  }

  setCardExpr(id: FaceStyleId, value: string): void {
    this.perCard.update((p) => {
      const siguiente = { ...p };
      if (value) siguiente[id] = value as ExpressionId;
      else delete siguiente[id];
      return siguiente;
    });
  }

  compareShapes(id: FaceStyleId): void {
    this.face.set(id);
    this.mode.set('shapes');
  }

  // Los `<select>` nativos entregan string: estos adaptadores son el único punto donde se castea.
  protected onShape(v: string) {
    this.shape.set(v as ShapeId);
  }
  protected onPalette(v: string) {
    this.palette.set(v as PaletteId | 'auto');
  }
  protected onFace(v: string) {
    this.face.set(v as FaceStyleId);
  }
  protected valor(e: Event): string {
    return (e.target as HTMLSelectElement).value;
  }
}
