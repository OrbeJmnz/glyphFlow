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
import { anthropic, bindAgent, vercelAi, type GfAgentAdapter, type GfAgentRun } from 'glyphflow/bots/ai';
import { routinesExtra } from 'glyphflow/bots/extras';
import { agentReactions, physicalGestures } from 'glyphflow/bots/gestures';
import botsEn from '../../../i18n/bots/en.json';
import { hayMovimiento } from '../../core/movimiento';
import { tema } from '../../core/tema';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { Chip } from '../../shared/ui/chip';
import { Grupo } from '../../shared/ui/grupo';
import { codigoBot } from './bots-codigo';
import {
  ESCENARIOS,
  PROVEEDORES,
  corteDe,
  crearReloj,
  flujo,
  partes,
  type EscenarioId,
  type EventoCrudo,
  type Parte,
  type Proveedor,
  type Reloj,
} from './escenarios-ia';
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

/** Los adaptadores de verdad: ambos leen solo `type` (y el bloque/delta en Anthropic), así que comparten la forma. */
const ADAPTADORES: Record<Proveedor, GfAgentAdapter<EventoCrudo>> = { vercel: vercelAi, anthropic };

/** Una línea de la traza: lo que mandó el SDK (repetido seguido = un renglón con ×n) y a qué paso lo tradujo el adaptador. */
interface LineaTraza {
  crudo: string;
  paso: GfBotAgentEvent | null;
  n: number;
}

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
 * movimiento solo por su forma); a la derecha un chat alimentado con streams SIMULADOS de cada SDK, que pasan por los adaptadores reales, cuyo riel de pasos se
 * ilumina cuando el bot reacciona. Debajo, el código que reproduce lo que se ve y lo que pesa.
 *
 * Es una página pública: está en el nav y en el sitemap. El sitio compila los bots desde la fuente local y
 * no desde npm (ver `tsconfig.paths.json`), pero es el mismo código que lleva la 3.2.0 publicada.
 */
@Component({
  selector: 'app-bots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GfBotComponent, Chip, Grupo, BloqueCodigo, ReactiveFormsModule, TranslocoPipe],
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
  /** Las rutinas de `working` y `sleeping` (el escenario las enseña con el selector de estado); el chat usa las escenas del modo IA, que van en el motor. */
  protected readonly extras = { routines: routinesExtra };
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
  /** Cuánto se mueven los gestos (0 = reposo, 1 = como están escritos, 2 = el doble). */
  protected readonly intensidad = signal(1);

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
      intensidad: this.intensidad(),
      sigue: this.sigue(),
      toca: this.toca(),
      agente: this.conAgente(),
      proveedor: this.proveedor(),
      estado: this.estado(),
    }),
  );

  // ── El chat ──
  protected readonly mensaje = new FormControl('', { nonNullable: true });
  protected readonly escenarios = ESCENARIOS;
  protected readonly proveedores = PROVEEDORES;
  /** Qué tipo de salida de IA simula el chat y con la forma de qué SDK. */
  protected readonly salida = signal<EscenarioId>('herramienta');
  protected readonly proveedor = signal<Proveedor>('vercel');
  protected readonly ejecutando = signal(false);
  protected readonly mensajes = signal<Mensaje[]>([]);
  /** Los pasos que vio el bot, en orden (ya sin repeticiones seguidas: lo hace `bindAgent`). */
  protected readonly pasos = signal<GfBotAgentEvent[]>([]);
  /** Cómo terminó la última corrida: `done`, `error` o `idle` (la cortaron). */
  protected readonly resultado = signal<'done' | 'error' | 'idle' | null>(null);
  /** Lo que mandó el SDK y a qué paso lo tradujo el adaptador. */
  protected readonly traza = signal<LineaTraza[]>([]);
  /** Qué gesto hizo el bot en cada paso, por POSICIÓN en `pasos` (un mismo paso puede repetirse y mover distinto). */
  protected readonly juega = signal<Record<number, string>>({});

  protected readonly riel = computed(() => {
    const lista = this.pasos();
    const fin = this.resultado();
    return lista.map((paso, i) => ({
      paso,
      estado: (i === lista.length - 1 ? (fin ? 'fin' : 'activo') : 'hecho') as 'activo' | 'hecho' | 'fin',
    }));
  });

  /** El relleno del riel llega siempre hasta el último paso: solo se pintan los que ya pasaron. */
  protected readonly avance = computed(() => (this.pasos().length > 1 ? '100%' : '0%'));

  private readonly chatBot = viewChild<GfBotComponent>('chatBot');
  private readonly agente = agentReactions({ cooldownMs: 0, waitMs: 4000 });
  private run: GfAgentRun | null = null;
  private reloj: Reloj | null = null;
  private corteAuto: ReturnType<typeof setTimeout> | null = null;
  private vida: ReturnType<typeof setTimeout> | null = null;

  /**
   * El manejador que le pasamos al bot del chat: el del preset (`agentReactions`) con un espía en
   * `gesture`, para pintar en el riel QUÉ gesto hizo el bot en cada paso. El bot no sabe de esto.
   */
  protected readonly reacciones = (ev: GfBotAgentEvent, bot: GfBotApi, ctx: GfBotGestureContext): number => {
    const espia = {
      ...bot,
      gesture: (id: string, o?: GfGestureOptions): GfGestureHandle => {
        this.juega.update((m) => ({ ...m, [this.pasos().length - 1]: id }));
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
    inject(DestroyRef).onDestroy(() => {
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
    api.gesture(id, { intensity: this.intensidad() });
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
    this.pasos.set([]);
    this.traza.set([]);
    this.resultado.set(null);
    this.ejecutando.set(true);
    this.mensajes.set([
      { rol: 'usuario', texto },
      { rol: 'asistente', texto: '' },
    ]);

    const id = this.salida();
    const prov = this.proveedor();
    const palabras = this.transloco.translate('bots.chat.respuesta').split(' ');
    const reloj = crearReloj();
    // Otra instancia del mismo adaptador, solo para ANOTAR a qué paso traduce cada evento (el de `bindAgent` es el que mueve al bot).
    const lectura = ADAPTADORES[prov]();
    const alParte = (p: Parte): void => {
      this.anotar(p.evento.type, lectura(p.evento) ?? null);
      if (p.texto !== undefined) {
        bot.token(p.texto.trim());
        this.mensajes.update((m) => this.conTexto(m, (t) => t + (p.texto as string)));
      }
    };

    // La tubería de verdad: stream del SDK → adaptador → bindAgent → bot. Lo único falso es de dónde sale el stream.
    const run = bindAgent(
      {
        agent: (e) => {
          this.pasos.update((l) => [...l, e]);
          bot.agent(e);
        },
      },
      flujo(partes(id, prov, palabras), reloj, alParte),
      ADAPTADORES[prov],
    );
    this.run = run;
    this.reloj = reloj;
    const corte = corteDe(id);
    if (corte) this.corteAuto = setTimeout(() => this.detener(), corte);

    void run.done.then((fin) => {
      if (this.run !== run) return; // ya arrancó otra corrida encima
      this.run = null;
      this.reloj = null;
      this.limpiarCorte();
      this.ejecutando.set(false);
      this.resultado.set(fin === 'error' ? 'error' : fin === 'stopped' ? 'idle' : 'done');
      if (fin === 'error') this.mensajes.update((m) => this.conTexto(m, () => this.transloco.translate('bots.chat.error')));
    });
  }

  /** Corta la corrida en curso: `bindAgent` suelta al bot (`idle`) y el reloj despierta al stream para que se acabe. */
  protected detener(): void {
    this.limpiarCorte();
    this.run?.stop();
    this.reloj?.cortar();
  }

  private limpiarCorte(): void {
    if (this.corteAuto) clearTimeout(this.corteAuto);
    this.corteAuto = null;
  }

  private anotar(crudo: string, paso: GfBotAgentEvent | null): void {
    this.traza.update((l) => {
      const ultima = l[l.length - 1];
      return ultima && ultima.crudo === crudo ? [...l.slice(0, -1), { ...ultima, n: ultima.n + 1 }] : [...l, { crudo, paso, n: 1 }];
    });
  }

  private conTexto(ms: Mensaje[], f: (t: string) => string): Mensaje[] {
    return ms.map((m, i) => (i === ms.length - 1 && m.rol === 'asistente' ? { ...m, texto: f(m.texto) } : m));
  }
}
