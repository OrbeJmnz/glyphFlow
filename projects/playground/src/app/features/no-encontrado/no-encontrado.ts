import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import { GfIconComponent, arrowLeftIcon, houseIcon, searchXIcon } from 'glyphflow';
import noEncontradoEn from '../../../i18n/no-encontrado/en.json';
import { Rutas } from '../../core/rutas.service';
import { Boton } from '../../shared/ui/boton';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';

/**
 * Atiende cualquier URL desconocida DENTRO de un idioma (el comodín de migración de URLs viejas
 * sin prefijo sigue redirigiendo aparte en `app.routes.ts` — eso no cambia). El buscador es real:
 * al enviar, navega al inicio con `?q=`, el MISMO query param que ya lee `Iconos` al montar — no
 * es un campo decorativo como en la referencia de la que salió este diseño.
 */
@Component({
  selector: 'app-no-encontrado',
  imports: [GfIconComponent, Boton, CampoBusqueda, RouterLink, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './no-encontrado.html',
  styleUrl: './no-encontrado.css',
  providers: [
    provideTranslocoScope({
      scope: 'noEncontrado',
      loader: {
        en: () => Promise.resolve(noEncontradoEn),
        es: () => import('../../../i18n/no-encontrado/es.json').then((m) => m.default),
      },
    }),
  ],
})
export class NoEncontrado {
  private readonly router = inject(Router);
  private readonly rutas = inject(Rutas);

  protected readonly termino = signal('');
  protected readonly fondo = searchXIcon;
  protected readonly flechaAtras = arrowLeftIcon;
  protected readonly casa = houseIcon;
  /** Reactivo a propósito: si cambia el idioma activo mientras se ve esta página, el enlace debe
   *  seguirlo — mismo criterio que ya documenta `Rutas`. */
  protected readonly inicioHref = computed(() => this.rutas.a('iconos'));

  protected buscar(evento: SubmitEvent): void {
    evento.preventDefault();
    const valor = this.termino().trim();
    if (!valor) return;
    this.router.navigate([this.rutas.a('iconos')], { queryParams: { q: valor } });
  }

  protected volver(): void {
    history.back();
  }
}
