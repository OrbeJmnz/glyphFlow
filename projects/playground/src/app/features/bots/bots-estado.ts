import { Injectable, OnDestroy, computed, signal } from '@angular/core';
import type { GfBotApi } from 'glyphflow/bots';
import { elegirVelocidad, velocidadGlobal } from '../../core/duration-scale';
import { hayMovimiento } from '../../core/movimiento';
import { PIELES, duracionesA, type EstadoBot, type ExpresionId, type FormaId } from './bots-datos';
import { SHAPES } from './bots-formas';

export type Vista = 'color' | 'silueta';

/** El gesto con que arranca el botón de reproducir cuando todavía no se ha elegido ninguno (el que ya hace el escenario al llegar). */
const GESTO_INICIAL = 'jellyDrop';

/** Cuánto se queda marcada una expresión que es un gesto de un momento (la cara vuelve sola a Normal). */
const EXPRESION_MS = 1800;

/**
 * Lo que comparten las regiones de `/bots`: qué bot, qué piel, qué gesto, a qué velocidad. Se provee en `Bots` (no `root`), así cada
 * visita a la página nace limpia y los componentes hijos hablan entre sí sin pasarse inputs en cadena.
 *
 * El escenario se REGISTRA aquí (`registrar`): el servicio no conoce el DOM, solo pide «el api del bot grande» cuando va a jugar un
 * gesto, y quien lo llama desde la galería o desde la franja de expresiones no necesita una referencia al componente del escenario.
 */
@Injectable()
export class BotsEstado implements OnDestroy {
  readonly movimiento = hayMovimiento;
  readonly forma = signal<FormaId>('ghost');
  readonly piel = signal<string>(PIELES.ghost[0]);
  readonly estado = signal<EstadoBot>('idle');
  readonly vista = signal<Vista>('color');
  readonly sigue = signal(true);
  readonly toca = signal(true);
  /** Cuánto se mueven los gestos (0 = reposo, 1 = como están escritos, 2 = el doble). */
  readonly intensidad = signal(1);
  /** La velocidad es la GLOBAL del sitio (el botón de la cabecera): el reproductor y la cabecera hablan del mismo valor. */
  readonly velocidad = velocidadGlobal;
  /** El gesto elegido en la galería, o `null` = «Idle» (el bot en reposo). */
  readonly gesto = signal<string | null>(null);
  /** El último gesto que se corrió: es el que escribe el código de ejemplo, aunque ahora esté elegido Idle. */
  readonly ultimoGesto = signal<string | null>(null);
  readonly expresion = signal<ExpresionId>('normal');

  /** Cuánto dura el gesto en curso (ms, del handle: ya acotado por el motor y con la velocidad aplicada) y cuánto lleva. */
  readonly duracion = signal(0);
  readonly avance = signal(0);
  readonly corriendo = signal(false);

  readonly shape = computed(() => SHAPES[this.forma()]);
  readonly pieles = computed(() => PIELES[this.forma()]);
  /** Las variables `--gf-bot-<id>-duration` de la velocidad elegida, para el contenedor de toda la página. */
  readonly duraciones = computed(() => duracionesA(this.velocidad()));

  private api: () => GfBotApi | null | undefined = () => undefined;
  private marco: number | null = null;
  private corrida = 0;
  private expresionT: ReturnType<typeof setTimeout> | null = null;

  /** El escenario dice cómo alcanzar el api de su bot. */
  registrar(api: () => GfBotApi | null | undefined): void {
    this.api = api;
  }

  elegirForma(f: FormaId): void {
    this.forma.set(f);
    this.piel.set(PIELES[f][0] ?? '');
  }

  elegirVelocidad(v: number): void {
    elegirVelocidad(v);
  }

  /** Elige un gesto y lo corre en el escenario. */
  jugar(id: string): void {
    this.gesto.set(id);
    this.correr(id);
  }

  /** «Idle»: corta lo que corría y deja el bot en reposo y con la cara normal. */
  reposo(): void {
    this.gesto.set(null);
    this.parar();
    this.expresar('normal');
  }

  /** El botón de reproducir: repite el gesto elegido (o el de bienvenida si lo que hay elegido es Idle). */
  reproducir(): void {
    this.jugar(this.gesto() ?? this.ultimoGesto() ?? GESTO_INICIAL);
  }

  /**
   * Corre el gesto en el bot grande y sigue su avance con el reloj real. La duración sale del `handle.ms` del motor: no se inventa una
   * duración. Un gesto que el motor ignora (bot en pausa, otro gesto con `ignore`) devuelve `ms = 0` y no mueve el reproductor.
   */
  private correr(id: string): void {
    const api = this.api();
    if (!api || !this.movimiento()) return;
    const corrida = ++this.corrida;
    this.parar();
    const h = api.gesture(id, { intensity: this.intensidad() });
    this.ultimoGesto.set(id);
    if (!h.ms) return;
    this.duracion.set(h.ms);
    this.avance.set(0);
    this.corriendo.set(true);
    const inicio = performance.now();
    const paso = (): void => {
      if (corrida !== this.corrida) return;
      this.avance.set(Math.min(1, (performance.now() - inicio) / h.ms));
      this.marco = requestAnimationFrame(paso);
    };
    this.marco = requestAnimationFrame(paso);
    void h.finished.then(() => {
      if (corrida !== this.corrida) return;
      this.parar();
    });
  }

  /** Detiene el seguimiento del avance (no el gesto: eso lo hace el motor). */
  private parar(): void {
    if (this.marco !== null) cancelAnimationFrame(this.marco);
    this.marco = null;
    this.corriendo.set(false);
    this.avance.set(0);
  }

  /**
   * Pone una expresión en el bot grande con las acciones del propio bot (`happy()`, `sad()`…). Casi todas son un gesto de un momento: la
   * cara vuelve sola a la normal y la marca también. `sleeping` sí es un ESTADO: se queda hasta que se elija otra.
   */
  expresar(id: ExpresionId): void {
    if (this.expresionT) clearTimeout(this.expresionT);
    this.expresionT = null;
    this.expresion.set(id);
    const api = this.api();
    if (id === 'sleeping') {
      this.estado.set('sleeping');
      return;
    }
    // Salir de dormido: cualquier otra expresión lo despierta.
    if (this.estado() === 'sleeping') this.estado.set('idle');
    if (api && this.movimiento()) {
      switch (id) {
        case 'normal':
          api.neutral();
          break;
        case 'happy':
          api.happy();
          break;
        case 'surprised':
          api.surprised();
          break;
        case 'thinking':
          api.thinking();
          break;
        case 'wink':
          api.wink();
          break;
        case 'sad':
          api.sad();
          break;
        case 'success':
          api.celebrate();
          break;
        case 'error':
          api.agent('error');
          break;
      }
    }
    if (id !== 'normal') {
      this.expresionT = setTimeout(() => {
        // El paso `error` del agente deja al bot «fallado» hasta que se le suelta: aquí es solo una cara.
        if (id === 'error') this.api()?.agent('idle');
        this.expresion.set('normal');
      }, EXPRESION_MS);
    }
  }

  ngOnDestroy(): void {
    this.corrida++;
    this.parar();
    if (this.expresionT) clearTimeout(this.expresionT);
  }
}
