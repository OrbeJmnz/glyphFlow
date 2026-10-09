import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import type { GfBotMouthKind } from 'glyphflow/bots';
import { BotMiniatura } from './bot-miniatura';
import { BotsEstado } from './bots-estado';
import { EXPRESIONES } from './bots-datos';

/**
 * La franja de expresiones: cada miniatura es el bot de la forma elegida con esa cara puesta. Pulsarla se la pone al bot del
 * escenario. Casi todas son un gesto de un momento (la cara vuelve sola a «Normal» y la marca con ella); «Dormido» es un estado y
 * se queda hasta que se elija otra, y por eso también se marca cuando el estado se cambia desde los ajustes del escenario.
 */
@Component({
  selector: 'app-bots-expresiones',
  imports: [BotMiniatura, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bots-expresiones.html',
  styleUrl: './bots-expresiones.css',
})
export class BotsExpresiones {
  protected readonly e = inject(BotsEstado);
  protected readonly expresiones = EXPRESIONES;
  protected readonly activa = computed(() => (this.e.estado() === 'sleeping' ? 'sleeping' : this.e.expresion()));

  protected boca(b: string | null): GfBotMouthKind | null {
    return b as GfBotMouthKind | null;
  }
}
