import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import botsEn from '../../../i18n/bots/en.json';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { BotsAgente } from './bots-agente';
import { BotsChat } from './bots-chat';
import { codigoBot } from './bots-codigo';
import { PESOS } from './bots-datos';
import { BotsEscenario } from './bots-escenario';
import { BotsEstado } from './bots-estado';
import { BotsExpresiones } from './bots-expresiones';
import { BotsGaleria } from './bots-galeria';
import { BotsLista } from './bots-lista';
import { ChatIa } from './chat-ia';

/**
 * `/bots`: un playground de personajes. Tres columnas —los bots, el escenario donde se juega con uno, y un chat alimentado con
 * streams SIMULADOS de cada SDK— y debajo la galería de gestos y las expresiones. Más abajo, lo que el agente ve por dentro, el código
 * que reproduce lo que se ve y lo que pesa.
 *
 * Aquí solo vive la composición: el estado compartido está en `BotsEstado` y el del chat en `ChatIa`, y cada región es su componente.
 *
 * Es una página pública: está en el nav y en el sitemap. El sitio compila los bots desde la fuente local y no desde npm (ver
 * `tsconfig.paths.json`), pero es el mismo código que lleva la 3.2.0 publicada.
 */
@Component({
  selector: 'app-bots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BotsLista, BotsEscenario, BotsChat, BotsGaleria, BotsExpresiones, BotsAgente, BloqueCodigo, TranslocoPipe],
  // El scope va en el componente y no en la ruta, igual que el Lab: así el idioma por defecto viaja
  // DENTRO de este chunk. Ver `lab.ts`.
  providers: [
    BotsEstado,
    ChatIa,
    provideTranslocoScope({
      scope: 'bots',
      loader: {
        en: () => Promise.resolve(botsEn),
        es: () => import('../../../i18n/bots/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './bots.html',
  styleUrl: './bots.css',
  host: { '[style]': 'e.duraciones()' },
})
export class Bots {
  protected readonly e = inject(BotsEstado);
  private readonly chat = inject(ChatIa);
  protected readonly pesos = PESOS;

  // ── El código ──
  protected readonly conAgente = signal(true);
  protected readonly codigo = computed(() =>
    codigoBot({
      forma: this.e.forma(),
      piel: this.e.piel(),
      gesto: this.e.ultimoGesto(),
      intensidad: this.e.intensidad(),
      sigue: this.e.sigue(),
      toca: this.e.toca(),
      agente: this.conAgente(),
      proveedor: this.chat.proveedor(),
      estado: this.e.estado(),
    }),
  );
}
