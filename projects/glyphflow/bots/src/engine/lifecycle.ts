import type { BotContext } from './context';
import { clampIntensity } from './motion';

/**
 * El ciclo de vida de un gesto: quién lo está corriendo, cuándo termina y qué pasa si llega otro.
 *
 * Antes un gesto no tenía identidad: dejaba animaciones y timers sueltos en el contexto (`subTimers`) y lo único
 * que se sabía de él era cuántos ms prometía. Quien quería «hacer algo cuando termine» armaba su propio
 * `setTimeout`, y cualquier `act()` posterior borraba los timers del gesto en curso sin avisar a nadie.
 * Ahora cada gesto es una **corrida** (`GestureRun`) con su propia bolsa de timers y una promesa de fin.
 */

/** Cómo terminó un gesto: `done` (llegó a su último cuadro), `interrupted` (otro lo pisó, lo cancelaron o el bot cambió de estado) o `ignored` (no corrió). */
export type GfGestureEnd = 'done' | 'interrupted' | 'ignored';

/**
 * Qué hacer si ya hay un gesto corriendo cuando llega otro:
 * - `replace` (por defecto): el nuevo corta al actual y descarta la cola. Es lo que siempre hizo el bot.
 * - `queue`: espera a que el actual termine solo (hasta {@link MAX_COLA} en espera; el resto se ignora). Si el actual
 *   se interrumpe, la cola se descarta: lo que llegó a interrumpirlo manda.
 * - `ignore`: el nuevo no corre. Para gestos sueltos que no deben pisar uno importante.
 */
export type GfGesturePolicy = 'replace' | 'queue' | 'ignore';

export interface GfGestureOptions {
  policy?: GfGesturePolicy;
  /**
   * Cuánto se mueve el gesto: 1 = como está escrito, 0 = apenas se separa del reposo, 2 = el doble (se acota a 0–2). Escala el recorrido, la
   * deformación, la falda y el gel; NO los giros (un mortal sigue siendo una vuelta) ni los términos de forma que son el punto del gesto (el charco,
   * la bola). Si no se pasa, vale la `intensity` del bot, y si tampoco, 1.
   */
  intensity?: number;
}

/** Lo que devuelve `bot.gesture(id)` y cada gesto como método (`bot.frontFlip()`). */
export interface GfGestureHandle {
  readonly id: string;
  /** Lo que dura (ms). 0 si no corrió o si todavía espera turno en la cola (se llena al arrancar). */
  readonly ms: number;
  /** Se resuelve una sola vez, y nunca rechaza: pregunta por el valor, no uses `catch`. */
  readonly finished: Promise<GfGestureEnd>;
  /** Corta el gesto si sigue vivo (o lo saca de la cola). No hace nada si ya terminó. */
  cancel(): void;
}

/** Cuántos gestos pueden esperar turno con `queue`. Pasado eso se ignoran: una cola larga es una coreografía vieja. */
export const MAX_COLA = 3;

/** La corrida en curso. Interna: el contexto guarda una sola (`ctx.run`). */
export interface GestureRun {
  readonly id: string;
  /** Los timers que el gesto programó con `later` mientras corre. Cancelar la corrida los apaga; terminar sola no. */
  readonly timers: ReturnType<typeof setTimeout>[];
  /** Con qué intensidad corre (ver `GfGestureOptions.intensity`). */
  readonly intensity: number;
  /** Verdadero mientras el gesto se está armando: su propio `hooks.act()` no cuenta como una interrupción. */
  arming: boolean;
  over: boolean;
  settle(how: GfGestureEnd): void;
}

/** Arma el handle: `ms` se llena después (al arrancar) por eso es un campo mutable. */
const handle = (id: string, finished: Promise<GfGestureEnd>, cancel: () => void): GfGestureHandle => ({ id, ms: 0, finished, cancel });
const poner = (h: GfGestureHandle, ms: number): void => void ((h as { ms: number }).ms = ms);

/** Un gesto que no corrió (pausa, nombre desconocido, política `ignore`, cola llena). */
export const ignorado = (id: string): GfGestureHandle => handle(id, Promise.resolve('ignored'), () => undefined);

/** Cierra la corrida. Al cancelarla apaga sus timers y descarta la cola; al terminar sola deja correr al siguiente. */
function cerrar(ctx: BotContext, run: GestureRun, how: GfGestureEnd): void {
  if (run.over) return;
  run.over = true;
  if (ctx.run === run) ctx.run = null;
  if (how === 'interrupted') {
    run.timers.forEach(clearTimeout);
    ctx.runQueue.length = 0;
  }
  run.settle(how);
  if (how === 'done') ctx.runQueue.shift()?.();
}

/** Corta el gesto en curso si lo hay. Lo llama todo lo que toma el cuerpo del bot (`act`, un cambio de estado, destruir). */
export function interruptRun(ctx: BotContext): void {
  const r = ctx.run;
  if (r && !r.arming) cerrar(ctx, r, 'interrupted');
}

/**
 * Corre `fn` (el gesto) como una corrida con vida propia. `fn` devuelve la duración en ms (o nada).
 * Un gesto que no informa duración se da por terminado de inmediato.
 */
export function playGesture(ctx: BotContext, id: string, fn: () => number | void, o: GfGestureOptions = {}): GfGestureHandle {
  const policy = o.policy ?? 'replace';
  const intensity = clampIntensity(o.intensity ?? ctx.opts.intensity);
  if (ctx.run) {
    if (policy === 'ignore') return ignorado(id);
    if (policy === 'queue') return encolar(ctx, id, fn, intensity);
  }
  if (policy === 'replace') ctx.runQueue.length = 0;
  return arrancar(ctx, id, fn, intensity);
}

function arrancar(ctx: BotContext, id: string, fn: () => number | void, intensity: number): GfGestureHandle {
  if (ctx.run) cerrar(ctx, ctx.run, 'interrupted');
  let settle!: (how: GfGestureEnd) => void;
  const run: GestureRun = { id, timers: [], intensity, arming: true, over: false, settle: (how) => settle(how) };
  const h = handle(id, new Promise((r) => (settle = r)), () => cerrar(ctx, run, 'interrupted'));
  ctx.run = run;
  let r: number | void;
  try {
    r = fn();
  } finally {
    run.arming = false;
  }
  const ms = typeof r === 'number' && r > 0 ? r : 0;
  poner(h, ms);
  if (ms && !run.over) run.timers.push(setTimeout(() => cerrar(ctx, run, 'done'), ms));
  else cerrar(ctx, run, 'done');
  return h;
}

function encolar(ctx: BotContext, id: string, fn: () => number | void, intensity: number): GfGestureHandle {
  if (ctx.runQueue.length >= MAX_COLA) return ignorado(id);
  let salir!: (h: GfGestureHandle) => void;
  const llegada = new Promise<GfGestureHandle>((r) => (salir = r));
  const paso = (): void => salir(arrancar(ctx, id, fn, intensity));
  ctx.runQueue.push(paso);
  const h = handle(id, llegada.then((x) => x.finished), () => {
    const i = ctx.runQueue.indexOf(paso);
    if (i >= 0) ctx.runQueue.splice(i, 1);
    salir(ignorado(id));
  });
  void llegada.then((x) => poner(h, x.ms));
  return h;
}
