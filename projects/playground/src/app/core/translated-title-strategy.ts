import { computed, effect, inject, Injectable, Injector, runInInjectionContext, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { translateSignal } from '@jsverse/transloco';

/**
 * `route.title` ya no es el texto de la pestaña — es una CLAVE de traducción (`routes.iconos.title`,
 * ver `app.routes.ts` + `i18n/{en,es}.json`).
 *
 * Primera versión de esto usaba `TranslocoService.translate()` a mano dentro de un `effect()`
 * enganchado a `langChanges$` — Y SE ROMPÍA: `translate()` es SÍNCRONO, así que al cambiar de
 * idioma devolvía la CLAVE cruda como pestaña (la traducción del scope todavía no había cargado,
 * es un `import()` dinámico) y nunca se volvía a pintar cuando el `import()` sí resolvía, porque
 * nada estaba escuchando ESE momento. `translateSignal` no tiene ese hueco: es la misma señal
 * reactiva que ya usa `iconos.ts` para su título con conteo, y SÍ se re-evalúa cuando la
 * traducción termina de cargar, no solo cuando cambia el idioma.
 */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly injector = inject(Injector);
  private readonly snapshotActual = signal<RouterStateSnapshot | null>(null);
  private readonly claveActual = computed(() => {
    const snap = this.snapshotActual();
    return snap ? (this.buildTitle(snap) ?? '') : '';
  });
  private readonly tituloTraducido = translateSignal(this.claveActual);
  private conectado = false;

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.snapshotActual.set(snapshot);
    this.conectar();
  }

  /** Un solo `effect()` para toda la vida de la app — no uno por navegación. */
  private conectar(): void {
    if (this.conectado) return;
    this.conectado = true;
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const texto = this.tituloTraducido();
        if (texto) this.title.setTitle(texto);
      });
    });
  }
}
