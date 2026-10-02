import type { GfBotState } from '../bot-state';
import type { GfBotFaceId } from '../data/faces';
import type { GfBotAccXId, GfBotFxId } from '../data/fx';
import type { GfBotHatId } from '../data/hats';
import type { GfKawaiiId } from '../data/kawaii';
import type { GfBotPaletteId } from '../data/palettes';
import type { GfBotSleepRoutine, GfBotWorkRoutine } from '../data/routines';
import type { GfBotShape } from '../data/shape';
import type { GfBotToyId } from '../data/toys';
import { agent, token, type GfBotAgentEvent } from './agent';
import { createBotContext, type BotContext, type GfBotMaterialId, type GfBotMouthKind, type GfBotOptions } from './context';
import { enableTouch, endDrag } from './drag';
import { celebrate, cheer, curious, excited, happy, neutral, surprised, thinking, wave } from './emotions';
import { clearLook, gazeAt, setOpen, startBlinkLoop } from './eyes';
import { angry, bored, cartwheel, dance, disgust, dizzy, doubleHop, fear, hop, lookAround, nodYes, pop, sad, shakeNo, sick, sideHop, somersault, surprise, turn, wink } from './gestures';
import { K, expr, installKawaiiHooks } from './kawaii';
import { S } from './math';
import { setMouth } from './mouth';
import { parm } from './octopus-arms';
import { setMaterial, setPalette } from './paint';
import { setFace, setFx, setHat, setMochi, setMouthKind, setShape } from './setters';
import { startShapeFx } from './shape-fx';
import { clearRoutine, installStateHooks, setRoutine, setState } from './state';
import { play } from './timing';
import { toy } from './toys';

/**
 * El bot ensamblado. `createBot` une el contexto con las funciones sueltas del motor y devuelve el
 * objeto que el dueño (el componente `<gf-bot>`, o una página) maneja. En el prototipo esto era el
 * final del closure `createBot`: el objeto `api` y sus envoltorios, uno encima de otro:
 *
 *   gesto → + boca que dura lo que el gesto → + brazos del pulpo → + guarda de pausa
 *
 * Aquí se arma en ese mismo orden, porque el orden de las llamadas importa (la boca se pone antes
 * que los brazos, y la pausa los descarta a los dos).
 */

/**
 * Gestos y emociones que no piden argumentos: `bot.hop()`, `bot.happy()`, `bot.shy()`…
 *
 * Es una FUNCIÓN y no una constante a propósito: el spread de `K` cuenta como efecto de módulo y el
 * bundler dejaría vivo todo el motor aunque nadie llame a `createBot` (medido: 1 KB → 19 KB gzip
 * para quien solo importa los estados).
 */
const actionTable = () => ({
  hop, doubleHop, somersault, cartwheel, sideHop, turn, lookAround, shakeNo, nodYes, wink, surprise, dance, dizzy,
  cheer, angry, sad, sick, disgust, fear, bored,
  neutral, happy, excited, curious, thinking, surprised, celebrate, wave,
  ...K,
});

export type GfBotActionId = keyof ReturnType<typeof actionTable>;

/** Lo que dura la boca que acompaña a cada gesto que ya existía (tipo de boca, ms). */
const GESTURE_MOUTH: Partial<Record<GfBotActionId, [string, number]>> = {
  cheer: ['open', 1300], surprise: ['o', 1100], angry: ['frown', 2300], sad: ['frown', 2800], sick: ['wavy', 2800],
  disgust: ['wavy', 2100], fear: ['o', 2400], bored: ['flat', 2800], dizzy: ['wavy', 2100], shakeNo: ['flat', 1300],
  nodYes: ['wide', 1200], dance: ['open', 2400], hop: ['open', 720], doubleHop: ['open', 1300],
  somersault: ['o', 1250], cartwheel: ['o', 1150], sideHop: ['w', 1200], turn: ['smile', 1150], lookAround: ['o', 1400],
};

/** Gestos que el pulpo acompaña doblando un lóbulo de flanco (ver `parm`). */
const OCTOPUS_ARMS: Partial<Record<GfBotActionId, (ctx: BotContext) => void>> = {
  happy: (c) => { parm(c, 'L', [0, 9, 7, 9, 0], 1300); parm(c, 'R', [0, -9, -7, -9, 0], 1300); }, // los dos suben 6–10°
  wave: (c) => parm(c, 'R', [0, -44, -28, -48, -30, -44, -36, 0], 1500), // sale → se enrosca → pasadita → reposo
  thinking: (c) => parm(c, 'L', [0, 46, 43, 46, 44, 46, 0], 2100), // se acerca al lado de la cabeza
  cheer: (c) => { parm(c, 'L', [0, 40, 32, 42, 0], 1300); parm(c, 'R', [0, -40, -32, -42, 0], 1300); },
  celebrate: (c) => { parm(c, 'L', [0, 42, 34, 44, 36, 42, 0], 1900); parm(c, 'R', [0, -42, -34, -44, -36, -42, 0], 1900); },
  excited: (c) => { parm(c, 'L', [0, 30, 18, 32, 0], 1300); parm(c, 'R', [0, -30, -18, -32, 0], 1300); },
  sad: (c) => {
    parm(c, 'L', [0, -10, -10, -10, 0], 2800); parm(c, 'R', [0, 10, 10, 10, 0], 2800);
    if (c.shape.id === 'octopus') play(c, c.el.breath, [{}, { transform: S(1.014, 0.984), offset: 0.18 }, { transform: S(1.014, 0.984), offset: 0.85 }, { transform: S(1) }], { duration: 2800, easing: 'ease-in-out' });
  },
  wink: (c) => parm(c, 'R', [0, -14, -9, 0], 800),
};

/** Las acciones de las que la pausa se olvida (un bot fuera de pantalla no hace gestos). */
type Action = () => void;

/** Lo que el bot ofrece además de sus gestos. */
export interface GfBotControls {
  /** El `<svg>` del bot. */
  readonly svg: SVGSVGElement;
  /** El estado actual (en pausa, el último que se pidió ya aplicado). */
  readonly state: GfBotState;
  /** `true` mientras está congelado: fuera de pantalla, pestaña oculta o (en `hoverOnly`) sin el cursor encima. */
  readonly paused: boolean;
  /** Lo acaban de soltar tras arrastrarlo (<400 ms): sirve para ignorar el `click` que viene detrás. */
  readonly justDragged: boolean;
  /** Lo acaban de tocar (<1.5 s): para no rechazar un gesto por un toque sin querer. */
  readonly justTouched: boolean;
  setShape(shape: GfBotShape): void;
  setPalette(key: GfBotPaletteId | 'auto'): void;
  setMaterial(key: GfBotMaterialId | 'auto'): void;
  setFace(style: GfBotFaceId | null): void;
  setMochi(skin: string): void;
  setMouthKind(kind: GfBotMouthKind | 'auto' | null): void;
  setHat(hat: GfBotHatId | GfBotAccXId | null): void;
  setFx(fx: GfBotFxId | null): void;
  setState(state: GfBotState): void;
  /** Fija la rutina de un estado; `auto` = que el bot elija por turnos. */
  setRoutine(name: 'auto' | GfBotWorkRoutine | GfBotSleepRoutine, forState?: 'working' | 'sleeping'): void;
  /** Una cara kawaii suelta durante `ms` (por defecto 1500). */
  expr(key: GfKawaiiId, ms?: number | null): void;
  /** Deja caer un juguete en (x, y) del viewBox; el bot va por él. */
  toy(kind: GfBotToyId, x: number, y: number): void;
  /** Paso del agente (`thinking`, `tool`, `loading`, `writing`, `done`, `error`, `idle`). */
  agent(event: GfBotAgentEvent): void;
  /** Un token del agente mientras escribe. */
  token(text?: string): void;
  /** Mira hacia (dx, dy) en -1…1, salvo que lo estén arrastrando. */
  gazeAt(dx: number, dy: number): void;
  pop(): void;
  /** Activa tocar y arrastrar. Devuelve el que lo desactiva; llamarlo dos veces no duplica los listeners. */
  enableTouch(): () => void;
  /** Para los `hoverOnly`: `true` descongela, `false` congela. */
  hover(on: boolean): void;
  /** Suelta todo (observadores, listeners, temporizadores, cuadros de animación). Después el bot no responde. */
  destroy(): void;
}

export type GfBotApi = Readonly<Record<GfBotActionId, Action>> & GfBotControls;

type Loose = (...args: never[]) => unknown;

/**
 * Crea un bot dentro de `host` (un elemento vacío que ya está en el documento). Solo navegador.
 *
 * @param id Prefijo de ids del SVG; el componente lo fija para que servidor y cliente coincidan.
 */
export function createBot(host: HTMLElement, opts: GfBotOptions, id?: string): GfBotApi {
  return assembleBot(host, opts, id).api;
}

/**
 * Lo mismo que `createBot` pero devolviendo también el contexto. INTERNO (no sale en `public-api`):
 * las pruebas lo usan para forzar reacciones (`ctx.force`) y mirar el estado sin ensuciar la API.
 */
export function assembleBot(host: HTMLElement, opts: GfBotOptions, id?: string): { api: GfBotApi; ctx: BotContext } {
  const ctx = createBotContext(host, opts, id);
  const { svg } = ctx;

  installStateHooks(ctx);
  installKawaiiHooks(ctx);
  // el prototipo arranca el parpadeo ANTES de construir la forma: el mismo orden de azar
  const stopBlink = startBlinkLoop(ctx);

  // nivel de detalle: en tamaño chico (<56 px) se ocultan accesorios y efectos que no se alcanzan a leer
  const lod =
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(([e]) => {
          if (e) svg.dataset['lod'] = e.contentRect.width < 56 ? 'sm' : '';
        });
  lod?.observe(svg);

  setShape(ctx, ctx.shape);
  setPalette(ctx, opts.palette || 'auto');
  setState(ctx, 'idle');
  ctx.ready = true;

  // ---- Pausa: solo anima lo que se ve ----
  // Fuera de pantalla, con la pestaña oculta o (en los minis) sin el cursor encima, el bot se congela:
  // se cancelan sus animaciones y temporizadores. Lo que se le pida mientras tanto se guarda y se
  // aplica al volver.
  let touchOff: (() => void) | null = null;
  let destroyed = false;

  const pause = (): void => {
    ctx.paused = true;
    ctx.stream = null;
    clearRoutine(ctx);
    clearLook(ctx);
    if (ctx.sleepTimer) clearTimeout(ctx.sleepTimer);
    svg.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    ctx.running.clear();
    if (ctx.shapeTimer) clearInterval(ctx.shapeTimer);
    ctx.shapeTimer = null;
    endDrag(ctx);
    setOpen(ctx, ctx.state !== 'sleeping');
  };
  const resume = (): void => {
    ctx.paused = false;
    const job = ctx.pending;
    ctx.pending = null;
    startShapeFx(ctx);
    if (job) job();
    else if (!ctx.reduce) setState(ctx, ctx.state, true);
  };
  const updateRun = (): void => {
    if (destroyed) return;
    const run = ctx.inView && !document.hidden && !ctx.hoverHold;
    if (run && ctx.paused) resume();
    else if (!run && !ctx.paused) pause();
  };

  // ---- El objeto, armado en el orden del prototipo ----
  const table = actionTable();
  const act: Record<string, Loose> = {};
  for (const [k, f] of Object.entries(table)) act[k] = () => f(ctx);
  act['expr'] = (key: GfKawaiiId, ms?: number | null) => expr(ctx, key, ms);

  // cada gesto que ya existía también mueve la boca
  for (const [k, [m, ms]] of Object.entries(GESTURE_MOUTH) as [GfBotActionId, [string, number]][]) {
    const f = act[k] as Loose;
    act[k] = ((...a: never[]) => {
      const r = f(...a);
      setMouth(ctx, m, ms);
      return r;
    }) as Loose;
  }
  // en el pulpo, los gestos también doblan un lóbulo
  for (const [k, fn] of Object.entries(OCTOPUS_ARMS) as [GfBotActionId, (c: BotContext) => void][]) {
    const f = act[k];
    if (!f) continue;
    act[k] = ((...a: never[]) => {
      const r = f(...a);
      fn(ctx);
      return r;
    }) as Loose;
  }
  // mientras está en pausa las acciones se ignoran…
  const skipWhilePaused = (k: string): void => {
    const f = act[k] as Loose;
    act[k] = ((...a: never[]) => (ctx.paused ? undefined : f(...a))) as Loose;
  };
  Object.keys(table).forEach(skipWhilePaused);
  act['expr'] = ((key: GfKawaiiId, ms?: number | null) => (ctx.paused ? undefined : expr(ctx, key, ms))) as Loose;
  act['toy'] = ((kind: GfBotToyId, x: number, y: number) => (ctx.paused ? undefined : toy(ctx, kind, x, y))) as Loose;
  act['token'] = ((text?: string) => (ctx.paused ? undefined : token(ctx, text))) as Loose;
  act['pop'] = (() => (ctx.paused ? undefined : pop(ctx))) as Loose;
  act['gazeAt'] = ((dx: number, dy: number) => {
    if (!ctx.paused && !ctx.dragging) gazeAt(ctx, dx, dy);
  }) as Loose;
  // …y los cambios de estado se guardan para el regreso
  const deferWhilePaused = (k: string, f: (...a: never[]) => void): void => {
    act[k] = ((...a: never[]) => {
      if (ctx.paused) ctx.pending = () => f(...a);
      else f(...a);
    }) as Loose;
  };
  deferWhilePaused('setState', (s: GfBotState) => setState(ctx, s));
  deferWhilePaused('setRoutine', (n: Parameters<typeof setRoutine>[1], st?: 'working' | 'sleeping') => setRoutine(ctx, n, st));
  deferWhilePaused('agent', (ev: GfBotAgentEvent) => agent(ctx, ev));
  // un «terminé» o «falló» que pasó mientras no se veía ya es viejo: al volver solo queda en reposo, sin festejar
  {
    const f = act['agent'] as Loose;
    act['agent'] = ((ev: GfBotAgentEvent) => {
      if (ctx.paused && ['done', 'error', 'idle'].includes(ev)) {
        ctx.pending = () => {
          ctx.fixedRoutine.working = null;
          setState(ctx, 'idle', true);
          opts.onStateChange?.('idle');
        };
      } else f(ev as never);
    }) as Loose;
  }

  const controls: GfBotControls = {
    svg,
    get state() { return ctx.state; },
    get paused() { return ctx.paused; },
    get justDragged() { return performance.now() - ctx.lastDragEnd < 400; },
    get justTouched() { return performance.now() - ctx.lastTouchAt < 1500; },
    setShape: (shape) => setShape(ctx, shape),
    setPalette: (key) => setPalette(ctx, key),
    setMaterial: (key) => setMaterial(ctx, key),
    setFace: (style) => setFace(ctx, style),
    setMochi: (skin) => setMochi(ctx, skin),
    setMouthKind: (kind) => setMouthKind(ctx, kind),
    setHat: (hat) => setHat(ctx, hat),
    setFx: (fx) => setFx(ctx, fx),
    setState: act['setState'] as GfBotControls['setState'],
    setRoutine: act['setRoutine'] as GfBotControls['setRoutine'],
    expr: act['expr'] as GfBotControls['expr'],
    toy: act['toy'] as GfBotControls['toy'],
    agent: act['agent'] as GfBotControls['agent'],
    token: act['token'] as GfBotControls['token'],
    gazeAt: act['gazeAt'] as GfBotControls['gazeAt'],
    pop: act['pop'] as GfBotControls['pop'],
    enableTouch: () => (touchOff ??= enableTouch(ctx)),
    hover: (on) => {
      ctx.hoverHold = !on;
      updateRun();
    },
    destroy: () => {
      if (destroyed) return;
      pause();
      destroyed = true;
      stopBlink();
      lod?.disconnect();
      io?.disconnect();
      document.removeEventListener('visibilitychange', updateRun);
      touchOff?.();
      touchOff = null;
      cancelAnimationFrame(ctx.hatRaf);
      cancelAnimationFrame(ctx.cloudRaf);
      for (const t of [ctx.kIdleT, ctx.kTmpT, ctx.mouthT, ctx.pokeT]) if (t) clearTimeout(t);
      ctx.toyTimers.forEach(clearTimeout);
      ctx.kSeqId++;
      ctx.pending = null;
    },
  };

  const io =
    typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([e]) => {
          if (!e) return;
          ctx.inView = e.isIntersecting;
          updateRun();
        }, { rootMargin: '60px' });
  io?.observe(svg);
  document.addEventListener('visibilitychange', updateRun);
  updateRun();

  const api = Object.assign(controls, Object.fromEntries(Object.keys(table).map((k) => [k, act[k]]))) as unknown as GfBotApi;
  return { api, ctx };
}
