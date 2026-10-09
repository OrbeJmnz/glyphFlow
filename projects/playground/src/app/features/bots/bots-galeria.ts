import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChildren } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { GfIconComponent, playIcon, searchIcon } from 'glyphflow';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';
import { BotMiniatura } from './bot-miniatura';
import { BotsEstado } from './bots-estado';
import { GESTOS, GRUPOS, type GestoInfo, type GrupoGestos } from './bots-datos';

type Filtro = 'todos' | GrupoGestos;

/** Sin acentos y en minúsculas: «Estiron» encuentra «Estirón». */
const plano = (t: string): string => t.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/**
 * La galería: una tarjeta por gesto, con el bot de verdad en su recuadro. Elegir una tarjeta la corre en el escenario; pasar el
 * puntero (o el foco) por una la corre en su propio recuadro, para ver qué hace antes de elegirla.
 *
 * Cada tarjeta es UN botón (`aria-pressed`): el círculo de play es solo la pista visual de que pulsar la reproduce.
 */
@Component({
  selector: 'app-bots-galeria',
  imports: [BotMiniatura, CampoBusqueda, GfIconComponent, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bots-galeria.html',
  styleUrl: './bots-galeria.css',
})
export class BotsGaleria {
  protected readonly e = inject(BotsEstado);
  private readonly transloco = inject(TranslocoService);
  protected readonly iconoPlay = playIcon;
  protected readonly iconoLupa = searchIcon;
  protected readonly grupos = GRUPOS;

  protected readonly filtro = signal<Filtro>('todos');
  protected readonly texto = signal('');
  private readonly minis = viewChildren(BotMiniatura);
  /** Recalcula los nombres (que se buscan ya traducidos) cuando cambia el idioma. */
  private readonly idioma = toSignal(this.transloco.langChanges$);

  protected readonly visibles = computed<GestoInfo[]>(() => {
    this.idioma();
    const f = this.filtro();
    const q = plano(this.texto().trim());
    return GESTOS.filter((g) => {
      if (f !== 'todos' && g.grupo !== f) return false;
      if (!q) return true;
      return plano(`${this.transloco.translate('bots.gestos.' + g.id)} ${this.transloco.translate('bots.grupos.' + g.grupo)} ${g.id}`).includes(q);
    });
  });

  /** «Idle» va primero y solo cuando no se filtra ni se busca: es el reposo, no un gesto. */
  protected readonly mostrarIdle = computed(() => this.filtro() === 'todos' && !this.texto().trim());

  /** Lo que dura el gesto a la velocidad elegida, en segundos (el motor lo acota entre 0,3 y 4). */
  protected segundos(g: GestoInfo): string {
    return (Math.min(4000, Math.max(300, g.ms / this.e.velocidad())) / 1000).toFixed(1);
  }

  /** Corre el gesto en el recuadro de SU tarjeta (no en el escenario). */
  protected vistaPrevia(id: string): void {
    this.minis()
      .find((m) => m.clave() === id)
      ?.jugar(id);
  }

  protected elegir(g: GestoInfo): void {
    this.vistaPrevia(g.id);
    this.e.jugar(g.id);
  }
}
