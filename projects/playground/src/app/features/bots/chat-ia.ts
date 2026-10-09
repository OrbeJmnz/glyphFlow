import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { TranslocoService, translateSignal } from '@jsverse/transloco';
import type { GfBotAgentEvent, GfBotApi, GfBotGestureContext, GfGestureHandle, GfGestureOptions, GfKawaiiId } from 'glyphflow/bots';
import { anthropic, bindAgent, vercelAi, type GfAgentAdapter, type GfAgentRun } from 'glyphflow/bots/ai';
import { agentReactions } from 'glyphflow/bots/gestures';
import { hayMovimiento } from '../../core/movimiento';
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
import { planDe, type LineaTraza } from './plan-ia';

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

export interface Mensaje {
  rol: 'usuario' | 'asistente';
  texto: string;
  /** Cómo terminó la corrida de este mensaje, si no fue bien: el texto que ya llegó se conserva y se marca. */
  fin?: 'error' | 'cortado';
}

/**
 * El chat simulado de `/bots`: qué tipo de salida de IA se simula, con la forma de qué SDK, y la corrida en curso (mensajes, pasos
 * que vio el bot, lo que mandó el SDK). Lo leen dos regiones de la página —la tarjeta del chat y el riel de abajo— y por eso vive
 * en un servicio y no en un componente.
 *
 * La tubería es la de verdad: stream del SDK → adaptador → `bindAgent` → bot. Lo único falso es de dónde sale el stream.
 */
@Injectable()
export class ChatIa implements OnDestroy {
  private readonly transloco = inject(TranslocoService);
  readonly movimiento = hayMovimiento;
  readonly escenarios = ESCENARIOS;
  readonly proveedores = PROVEEDORES;

  /** Qué tipo de salida de IA simula el chat y con la forma de qué SDK. */
  readonly salida = signal<EscenarioId>('herramienta');
  readonly proveedor = signal<Proveedor>('vercel');
  readonly ejecutando = signal(false);
  readonly mensajes = signal<Mensaje[]>([]);
  /** Los pasos que vio el bot, en orden (ya sin repeticiones seguidas: lo hace `bindAgent`). */
  readonly pasos = signal<GfBotAgentEvent[]>([]);
  /** Cómo terminó la última corrida: `done`, `error` o `idle` (la cortaron). */
  readonly resultado = signal<'done' | 'error' | 'idle' | null>(null);
  /** Lo que mandó el SDK y a qué paso lo tradujo el adaptador. */
  readonly traza = signal<LineaTraza[]>([]);
  /** Qué gesto hizo el bot en cada paso, por POSICIÓN en `pasos` (un mismo paso puede repetirse y mover distinto). */
  readonly juega = signal<Record<number, string>>({});

  /** La respuesta del chat, ya partida: de su largo sale cuántos `text-delta` manda el stream. Reactiva al idioma. */
  private readonly respuesta = translateSignal('bots.chat.respuesta');
  private readonly palabras = computed(() => String(this.respuesta()).split(' '));

  /** Lo que VA a pasar con el tipo de salida y el SDK elegidos: pasos y traza, calculados con los adaptadores de verdad (ver `plan-ia.ts`). */
  private readonly plan = computed(() => planDe(this.salida(), this.proveedor(), this.palabras()));

  /**
   * El riel muestra el plan COMPLETO desde el principio: lo que ya ocurrió, encendido; lo que falta, apagado. Así en reposo enseña
   * qué va a pasar (en vez de un hueco) y mientras corre no crece. Si lo real se desvía del plan, manda lo real y no se inventan
   * pasos pendientes.
   */
  readonly riel = computed(() => {
    const real = this.pasos();
    const plan = this.plan().pasos;
    const fin = this.resultado();
    const coincide = real.every((p, i) => plan[i] === p);
    const pendientes = !fin && coincide ? plan.slice(real.length) : [];
    const lista = [...real, ...pendientes];
    return lista.map((paso, i) => ({
      paso,
      // El «esperando» que viene DESPUÉS de una herramienta es otra espera (el resultado, o a una persona): se nombra distinto.
      clave: paso === 'loading' && lista.slice(0, i).includes('tool') ? 'loadingTrasTool' : paso,
      estado: (i >= real.length ? 'pendiente' : i === real.length - 1 ? (fin ? 'fin' : 'activo') : 'hecho') as 'pendiente' | 'activo' | 'hecho' | 'fin',
    }));
  });

  /** La traza, igual: lo que ya mandó el SDK y, apagado, lo que le falta por mandar. */
  readonly trazaVista = computed(() => {
    const real = this.traza();
    const resto = this.resultado() ? [] : this.plan().traza.slice(real.length);
    return [...real.map((l) => ({ ...l, pendiente: false })), ...resto.map((l) => ({ ...l, pendiente: true }))];
  });

  /** El paso en curso (o cómo terminó), para decirlo junto al avatar: es lo que le explica al visitante POR QUÉ se mueve el bot. */
  readonly estadoVivo = computed(() => this.riel().filter((r) => r.estado !== 'pendiente').at(-1)?.clave ?? null);

  private api: () => GfBotApi | null | undefined = () => undefined;
  private readonly agente = agentReactions({ cooldownMs: 0, waitMs: 4000 });
  private run: GfAgentRun | null = null;
  private reloj: Reloj | null = null;
  private corteAuto: ReturnType<typeof setTimeout> | null = null;
  /** El último texto que se mandó: «Repetir» vuelve a correr ese. */
  private ultimoTexto = '';

  /** El componente del chat dice cómo alcanzar el bot de su avatar. */
  registrar(api: () => GfBotApi | null | undefined): void {
    this.api = api;
  }

  /**
   * El manejador que le pasamos al bot del chat: el del preset (`agentReactions`) con un espía en `gesture`, para pintar en el riel
   * QUÉ gesto hizo el bot en cada paso. El bot no sabe de esto.
   */
  readonly reacciones = (ev: GfBotAgentEvent, bot: GfBotApi, ctx: GfBotGestureContext): number => {
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

  /** Cambiar el tipo de salida o el SDK deja el chat como nuevo: lo que quedó de la corrida anterior ya no describe lo elegido. */
  elegirSalida(id: EscenarioId): void {
    this.salida.set(id);
    this.reiniciar();
  }

  elegirProveedor(p: Proveedor): void {
    this.proveedor.set(p);
    this.reiniciar();
  }

  private reiniciar(): void {
    if (this.ejecutando()) return;
    this.pasos.set([]);
    this.traza.set([]);
    this.resultado.set(null);
    this.juega.set({});
    this.mensajes.set([]);
  }

  /** Vuelve a correr el último mensaje con el tipo de salida y el SDK actuales. */
  repetir(): void {
    this.enviar(this.ultimoTexto);
  }

  enviar(texto: string): void {
    const bot = this.api();
    // Sin escribir nada se manda la pregunta de ejemplo: así basta con pulsar «Enviar».
    texto = texto.trim() || this.transloco.translate('bots.chat.mensajePorDefecto');
    if (!bot || !texto || this.ejecutando() || !this.movimiento()) return;
    this.detener();
    this.ultimoTexto = texto;
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
    const palabras = this.palabras();
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
      this.marcarFin(fin === 'error' ? 'error' : fin === 'stopped' ? 'cortado' : null);
    });
  }

  /** Corta la corrida en curso: `bindAgent` suelta al bot (`idle`) y el reloj despierta al stream para que se acabe. */
  detener(): void {
    this.limpiarCorte();
    this.run?.stop();
    this.reloj?.cortar();
  }

  ngOnDestroy(): void {
    this.detener();
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

  /** Marca el mensaje del asistente como terminado mal, SIN borrar lo que ya llegó: ver el error junto a la respuesta a medias es lo que enseña. */
  private marcarFin(fin: 'error' | 'cortado' | null): void {
    if (!fin) return;
    this.mensajes.update((ms) => ms.map((m, i) => (i === ms.length - 1 && m.rol === 'asistente' ? { ...m, fin } : m)));
  }

  private conTexto(ms: Mensaje[], f: (t: string) => string): Mensaje[] {
    return ms.map((m, i) => (i === ms.length - 1 && m.rol === 'asistente' ? { ...m, texto: f(m.texto) } : m));
  }
}
