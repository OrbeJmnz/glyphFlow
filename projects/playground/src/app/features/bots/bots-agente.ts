import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ChatIa } from './chat-ia';

/**
 * Lo que pasa por dentro del chat, a la vista: el riel de pasos que ve el bot (con el gesto que responde a cada uno) y la traza de lo
 * que mandó el SDK y a qué paso lo tradujo el adaptador. Es la tesis de la página —el bot lo mueve un agente—, así que se enseña
 * completo y apagado desde el principio, y se va encendiendo con la corrida.
 */
@Component({
  selector: 'app-bots-agente',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bots-agente.html',
  styleUrl: './bots-agente.css',
})
export class BotsAgente {
  protected readonly c = inject(ChatIa);
}
