import { ChangeDetectionStrategy, Component, DOCUMENT, DestroyRef, OnDestroy, afterNextRender, inject, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { GfIconComponent, checkIcon, copyIcon, refreshCwIcon, sendIcon, squareIcon, userIcon } from 'glyphflow';
import { GfBotComponent } from 'glyphflow/bots';
import { physicalGestures } from 'glyphflow/bots/gestures';
import { Copiador } from '../../shared/ui/copiar';
import { BotsEstado } from './bots-estado';
import { esperaVida, gestoSuelto } from './bots-datos';
import { ChatIa } from './chat-ia';

/**
 * La tarjeta del chat: qué SDK y qué tipo de salida se simula, la conversación (con el bot como avatar del asistente, que es el que
 * reacciona de verdad) y la caja para escribir. El riel y la traza del stream viven en `BotsAgente`, debajo, y leen el mismo `ChatIa`.
 */
@Component({
  selector: 'app-bots-chat',
  imports: [GfBotComponent, GfIconComponent, ReactiveFormsModule, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bots-chat.html',
  styleUrl: './bots-chat.css',
})
export class BotsChat implements OnDestroy {
  protected readonly c = inject(ChatIa);
  protected readonly e = inject(BotsEstado);
  private readonly doc = inject(DOCUMENT);
  protected readonly mensaje = new FormControl('', { nonNullable: true });
  protected readonly gestos = physicalGestures;
  protected readonly copiador = new Copiador();

  protected readonly iconoUsuario = userIcon;
  protected readonly iconoEnviar = sendIcon;
  protected readonly iconoParar = squareIcon;
  protected readonly iconoCopiar = copyIcon;
  protected readonly iconoCopiado = checkIcon;
  protected readonly iconoRepetir = refreshCwIcon;

  private readonly chatBot = viewChild<GfBotComponent>('chatBot');
  private vida: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.c.registrar(() => this.chatBot()?.api);
    inject(DestroyRef).onDestroy(() => this.copiador.destruir());
    afterNextRender(() => this.vivir());
  }

  /**
   * El avatar del chat no se queda parado entre mensajes: cada 6–11 s hace un gesto ligero, salvo que el agente esté en plena
   * corrida, la pestaña esté oculta o el movimiento esté apagado. Las caras kawaii y los pequeños gestos de reposo los pone el propio
   * motor (`[wander]`); esto añade un gesto de verdad de vez en cuando, con `policy: 'ignore'`: si justo hay uno corriendo (el del
   * agente, o el de quien toca al bot) no lo pisa.
   */
  private vivir(): void {
    this.vida = setTimeout(() => {
      const api = this.chatBot()?.api;
      if (api && !this.c.ejecutando() && this.c.movimiento() && !this.doc.hidden) api.gesture(gestoSuelto(Math.random()), { policy: 'ignore' });
      this.vivir();
    }, esperaVida(Math.random()));
  }

  protected valor(ev: Event): string {
    return (ev.target as HTMLSelectElement).value;
  }

  protected enviar(): void {
    this.c.enviar(this.mensaje.value);
  }

  protected copiar(texto: string): void {
    void this.copiador.copiar(texto);
  }

  /** Acerca el riel del agente (que está debajo de las galerías) y le da el foco. */
  protected verDentro(): void {
    const t = this.doc.getElementById('bt-t-agente');
    t?.scrollIntoView({ behavior: this.e.movimiento() ? 'smooth' : 'auto', block: 'start' });
    t?.focus({ preventScroll: true });
  }

  ngOnDestroy(): void {
    if (this.vida) clearTimeout(this.vida);
  }
}
