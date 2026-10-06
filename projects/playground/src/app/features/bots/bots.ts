import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { provideTranslocoScope, TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  GfBotComponent,
  catShape,
  ghostShape,
  mochiShape,
  octopusShape,
  robotShape,
  tofuShape,
  type GfBotAgentEvent,
  type GfBotApi,
  type GfBotGestureContext,
  type GfBotShape,
  type GfGestureHandle,
  type GfGestureOptions,
  type GfKawaiiId,
} from 'glyphflow/bots';
import { agentReactions, physicalGestures } from 'glyphflow/bots/gestures';
import botsEn from '../../../i18n/bots/en.json';
import { hayMovimiento } from '../../core/movimiento';
import { tema } from '../../core/tema';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { Chip } from '../../shared/ui/chip';
import { Grupo } from '../../shared/ui/grupo';
import { Recuadro } from '../../shared/ui/recuadro';
import { correrGuion, type PasoAgente } from './agente-simulado';
import { codigoBot } from './bots-codigo';
import { ESTADOS, FORMAS, GESTOS, GRUPOS, PESOS, PIELES, esperaVida, gestoSuelto, type EstadoBot, type FormaId } from './bots-datos';

type Vista = 'color' | 'silueta';

/** Una cara kawaii por paso del agente (con su probabilidad): no en todos, para que sorprenda y no se vuelva tic. */
const CARAS: Partial<Record<GfBotAgentEvent, { id: GfKawaiiId; prob: number }>> = {
  prompt: { id: 'amazed', prob: 0.6 },
  thinking: { id: 'hopeful', prob: 0.5 },
  tool: { id: 'playful', prob: 0.4 },
  writing: { id: 'content', prob: 0.5 },
  done: { id: 'happy', prob: 0.9 },
  error: { id: 'worried', prob: 0.9 },
};

/** Los pasos que se pintan en el riel, en orden. El último es `done` o `error` según cómo termine la corrida. */
const PASOS_RIEL: readonly PasoAgente[] = ['prompt', 'thinking', 'tool', 'loading', 'writing'];

const SHAPES: Record<FormaId, GfBotShape> = {
  ghost: ghostShape,
  cat: catShape,
  octopus: octopusShape,
  tofu: tofuShape,
  mochi: mochiShape,
  robot: robotShape,
};

interface Mensaje {
  rol: 'usuario' | 'asistente';
  texto: string;
}

/**
 * `/bots`: dos vistas de lo mismo. A la izquierda un escenario donde se juega con un bot (forma, piel,
 * los 20 gestos, seguir el puntero, tocar y arrastrar, y un interruptor Color | Silueta para juzgar el
 * movimiento solo por su forma); a la derecha un chat con un agente SIMULADO cuyo riel de pasos se
 * ilumina cuando el bot reacciona. Debajo, el código que reproduce lo que se ve y lo que pesa.
 *
 * La página existe pero está OCULTA: sin entrada en el nav, fuera del sitemap y con `noindex`, hasta
 * que `glyphflow/bots` se publique. Mientras tanto el sitio lee los bots de la fuente local (ver
 * `tsconfig.paths.json`) y lo dice con un aviso, para que nadie crea que ya se puede instalar.
 */
@Component({
  selector: 'app-bots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GfBotComponent, Chip, Grupo, Recuadro, BloqueCodigo, ReactiveFormsModule, TranslocoPipe],
  // El scope va en el componente y no en la ruta, igual que el Lab: así el idioma por defecto viaja
  // DENTRO de este chunk. Ver `lab.ts`.
  providers: [
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
})
export class Bots {
  private readonly transloco = inject(TranslocoService);
  private readonly doc = inject(DOCUMENT);

  protected readonly formas = FORMAS;
  protected readonly estados = ESTADOS;
  protected readonly pesos = PESOS;
  protected readonly gestos = physicalGestures;
  protected readonly movimiento = hayMovimiento;
  protected readonly tema = tema;

  /** Los gestos por grupo, ya agrupados para la plantilla. */
  protected readonly porGrupo = GRUPOS.map((g) => ({ grupo: g, gestos: GESTOS.filter((x) => x.grupo === g) }));

  // ── El escenario ──
  protected readonly forma = signal<FormaId>('cat');
  protected readonly piel = signal<string>('g1');
  protected readonly estado = signal<EstadoBot>('idle');
  protected readonly vista = signal<Vista>('color');
  protected readonly sigue = signal(true);
  protected readonly toca = signal(true);
  protected readonly jugando = signal<string | null>(null);
  protected readonly ultimoGesto = signal<string | null>(null);

  protected readonly shape = computed(() => SHAPES[this.forma()]);
  protected readonly pieles = computed(() => PIELES[this.forma()]);
  private readonly escenario = viewChild<GfBotComponent>('escenario');

  // ── El código ──
  protected readonly conAgente = signal(true);
  protected readonly codigo = computed(() =>
    codigoBot({
      forma: this.forma(),
      piel: this.piel(),
      gesto: this.ultimoGesto(),
      sigue: this.sigue(),
      toca: this.toca(),
      agente: this.conAgente(),
    }),
  );

  // ── El chat ──
  protected readonly mensaje = new FormControl('', { nonNullable: true });
  protected readonly conError = signal(false);
  protected readonly ejecutando = signal(false);
  protected readonly paso = signal<PasoAgente | null>(null);
  protected readonly mensajes = signal<Mensaje[]>([]);
  protected readonly resultado = signal<'done' | 'error' | null>(null);
  /** Qué gesto hizo el bot en cada paso (lo anota el manejador de `onAgentEvent`). */
  protected readonly juega = signal<Partial<Record<GfBotAgentEvent, string>>>({});
  /** Si la corrida en curso (o la última) se pidió con error: cambia el último paso del riel. */
  private readonly corridaConError = signal(false);

  protected readonly riel = computed(() => {
    const actual = this.paso();
    const fin = this.resultado();
    const ultimo: PasoAgente = this.corridaConError() ? 'error' : 'done';
    const lista: readonly PasoAgente[] = this.corridaConError() ? ['prompt', 'thinking', 'tool', ultimo] : [...PASOS_RIEL, ultimo];
    const i = actual ? lista.indexOf(actual) : -1;
    return lista.map((p, k) => ({
      paso: p,
      estado: (fin && p === fin ? 'fin' : i < 0 ? 'pendiente' : k < i ? 'hecho' : k === i ? 'activo' : 'pendiente') as
        | 'pendiente'
        | 'activo'
        | 'hecho'
        | 'fin',
    }));
  });

  /** Hasta dónde llega el relleno del riel: del primer punto (0 %) al paso en que va (100 % = el último). */
  protected readonly avance = computed(() => {
    const r = this.riel();
    const i = r.findIndex((x) => x.estado === 'activo' || x.estado === 'fin');
    return i < 0 ? '0%' : `${(i / Math.max(1, r.length - 1)) * 100}%`;
  });

  private readonly chatBot = viewChild<GfBotComponent>('chatBot');
  private readonly agente = agentReactions({ cooldownMs: 0, waitMs: 4000 });
  private corte: (() => void) | null = null;
  private vida: ReturnType<typeof setTimeout> | null = null;

  /**
   * El manejador que le pasamos al bot del chat: el del preset (`agentReactions`) con un espía en
   * `gesture`, para pintar en el riel QUÉ gesto hizo el bot en cada paso. El bot no sabe de esto.
   */
  protected readonly reacciones = (ev: GfBotAgentEvent, bot: GfBotApi, ctx: GfBotGestureContext): number => {
    const espia = {
      ...bot,
      gesture: (id: string, o?: GfGestureOptions): GfGestureHandle => {
        this.juega.update((m) => ({ ...m, [ev]: id }));
        return bot.gesture(id, o);
      },
    } as GfBotApi;
    const ms = this.agente(ev, espia, ctx);
    // Una cara kawaii a juego en algunos pasos: el bot no solo se mueve, también se le nota lo que "siente".
    const cara = CARAS[ev];
    if (cara && this.movimiento() && Math.random() < cara.prob) bot.expr(cara.id, 1800);
    return ms;
  };

  constructor() {
    // Hasta que se publiquen los bots esta página no se debe indexar (ni aunque alguien enlace la URL).
    const meta = inject(Meta);
    meta.updateTag({ name: 'robots', content: 'noindex' });
    inject(DestroyRef).onDestroy(() => {
      meta.removeTag(`name='robots'`);
      this.detener();
      if (this.vida) clearTimeout(this.vida);
    });

    afterNextRender(() => {
      this.saludar();
      this.vivir();
    });
  }

  // ── Escenario ──

  /** En pantallas angostas el chat queda debajo de todos los controles: este salto lo acerca (y le da el foco). */
  protected irAlChat(): void {
    const t = this.doc.getElementById('bt-t-chat');
    t?.scrollIntoView({ behavior: this.movimiento() ? 'smooth' : 'auto', block: 'start' });
    t?.focus({ preventScroll: true });
  }

  protected elegirForma(f: FormaId): void {
    this.forma.set(f);
    this.piel.set(PIELES[f][0] ?? '');
  }

  protected valor(e: Event): string {
    return (e.target as HTMLSelectElement).value;
  }

  protected jugar(id: string, ms: number): void {
    const api = this.escenario()?.api;
    if (!api || !this.movimiento()) return;
    api.gesture(id);
    this.ultimoGesto.set(id);
    this.jugando.set(id);
    setTimeout(() => this.jugando() === id && this.jugando.set(null), ms);
  }

  /** Lo único que se mueve solo al llegar: el bot cae, como se presenta. Una vez, y solo si hay movimiento. */
  private saludar(intentos = 0): void {
    const api = this.escenario()?.api;
    if (!api) {
      if (intentos < 20) setTimeout(() => this.saludar(intentos + 1), 60);
      return;
    }
    if (this.movimiento()) api.gesture('jellyDrop');
  }

  // ── Chat ──

  /**
   * El avatar del chat no se queda parado entre mensajes: cada 6–11 s hace un gesto ligero, salvo que el agente esté
   * en plena corrida, la pestaña esté oculta o el movimiento esté apagado. Las caras kawaii y los pequeños gestos de
   * reposo los pone el propio motor (`[wander]`); esto añade un gesto de verdad de vez en cuando, con `policy: 'ignore'`:
   * si justo hay uno corriendo (el del agente, o el de quien toca al bot) no lo pisa.
   */
  private vivir(): void {
    this.vida = setTimeout(() => {
      const api = this.chatBot()?.api;
      if (api && !this.ejecutando() && this.movimiento() && !this.doc.hidden) api.gesture(gestoSuelto(Math.random()), { policy: 'ignore' });
      this.vivir();
    }, esperaVida(Math.random()));
  }

  protected enviar(): void {
    const bot = this.chatBot()?.api;
    // Sin escribir nada se manda la pregunta de ejemplo: así basta con pulsar «Enviar».
    const texto = this.mensaje.value.trim() || this.transloco.translate('bots.chat.mensajePorDefecto');
    if (!bot || !texto || this.ejecutando() || !this.movimiento()) return;
    this.detener();
    this.juega.set({});
    this.resultado.set(null);
    this.corridaConError.set(this.conError());
    this.ejecutando.set(true);
    this.mensajes.set([
      { rol: 'usuario', texto },
      { rol: 'asistente', texto: '' },
    ]);
    const palabras = this.transloco.translate('bots.chat.respuesta').split(' ');
    this.corte = correrGuion(this.conError(), palabras, {
      evento: (e) => {
        this.paso.set(e);
        bot.agent(e);
      },
      palabra: (p) => {
        bot.token(p);
        this.mensajes.update((m) => this.conTexto(m, (t) => (t ? `${t} ${p}` : p)));
      },
      fin: (r) => {
        this.resultado.set(r);
        this.ejecutando.set(false);
        if (r === 'error') this.mensajes.update((m) => this.conTexto(m, () => this.transloco.translate('bots.chat.error')));
      },
    });
  }

  protected detener(): void {
    this.corte?.();
    this.corte = null;
    if (this.ejecutando()) {
      this.ejecutando.set(false);
      this.chatBot()?.api?.agent('idle');
    }
  }

  private conTexto(ms: Mensaje[], f: (t: string) => string): Mensaje[] {
    return ms.map((m, i) => (i === ms.length - 1 && m.rol === 'asistente' ? { ...m, texto: f(m.texto) } : m));
  }
}
