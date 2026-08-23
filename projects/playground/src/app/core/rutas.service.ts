import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { esIdioma, type Idioma } from './idioma';
import { ruta, slug, type RutaId } from './rutas';

/**
 * El adaptador reactivo de `rutas.ts`: las mismas funciones, pero atadas al idioma activo — que es
 * lo que necesita una plantilla. Vive aparte porque `rutas.ts` tiene que poder importarse desde
 * Node crudo (`scripts/gen-sitemap.ts`), y un `@Injectable` ahí lo impedía. Se lee por señal (`langChanges$`), así que cambiar de idioma repinta los `routerLink`
 * sin que nadie los toque.
 */
@Injectable({ providedIn: 'root' })
export class Rutas {
  private readonly transloco = inject(TranslocoService);

  private readonly activo = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  readonly idioma = computed<Idioma>(() => {
    const v = this.activo();
    return esIdioma(v) ? v : 'en';
  });

  /** Ruta absoluta: `rutas.a('docs', 'api')`. */
  a(...ids: RutaId[]): string {
    return ruta(this.idioma(), ...ids);
  }

  /** Slug suelto, para los `routerLink` RELATIVOS (el índice de las docs). */
  slug(id: RutaId): string {
    return slug(id, this.idioma());
  }
}
