import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Rutas } from '../../core/rutas.service';
import { Chip } from '../../shared/ui/chip';
import { BotMiniatura } from './bot-miniatura';
import { BotsEstado } from './bots-estado';
import { FORMAS } from './bots-datos';

/**
 * La columna de la izquierda: los seis bots como una lista de tarjetas. Es el `h1` de la página: el título de la sección y el de
 * la página son el mismo, así no hay una cabecera suelta encima de las tres columnas.
 *
 * El salto «Probar en un chat» solo existe en pantallas angostas, donde el chat queda al final de todo.
 */
@Component({
  selector: 'app-bots-lista',
  imports: [BotMiniatura, Chip, RouterLink, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bots-lista.html',
  styleUrl: './bots-lista.css',
})
export class BotsLista {
  protected readonly e = inject(BotsEstado);
  protected readonly rutas = inject(Rutas);
  private readonly doc = inject(DOCUMENT);
  protected readonly formas = FORMAS;

  /** En pantallas angostas el chat queda debajo de todo: este salto lo acerca (y le da el foco). */
  protected irAlChat(): void {
    const t = this.doc.getElementById('bt-t-chat');
    t?.scrollIntoView({ behavior: this.e.movimiento() ? 'smooth' : 'auto', block: 'start' });
    t?.focus({ preventScroll: true });
  }
}
