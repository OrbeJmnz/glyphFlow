import { gfBotKit, type GfBotAgentEvent, type GfBotApi, type GfBotGestureContext } from 'glyphflow/bots';
import { landingPose } from './landing';

const kit = gfBotKit;

/**
 * MODO IA — qué hace el bot con sus gestos físicos mientras un agente trabaja. Es un manejador para `onAgentEvent`:
 *
 *   createBot(host, { shape, gestures: physicalGestures, onAgentEvent: agentReactions() });
 *   <gf-bot [gestures]="physicalGestures" [onAgentEvent]="reacciones" />
 *
 * Por defecto (todo se puede cambiar con `map`):
 *   prompt   → jellyWobble        (le llegó un mensaje)
 *   thinking → stretchSnap        (se pone a pensar)
 *   tool     → sideDodge          (va a usar una herramienta)
 *   loading  → puddleMorph        (SOLO si la espera se alarga: `waitMs`)
 *   done     → frontFlip          (o doubleFlip, raro, si la tarea fue larga), con una pose de aterrizaje
 *   error    → jellyDrop o scaredRecoil
 *   idle     → peekPop            (SOLO tras un rato quieto: `idleAfterMs`)
 *   writing  → nada               (ya tiene su hoja con el cursor)
 *
 * Criterio, para que no cansen: enfriamiento por gesto, el especial solo a veces y solo tras una tarea larga, y nada con
 * movimiento reducido ni en pausa. Cada gesto se pide por nombre al paquete que se registró (`gestures`): el que no esté, no corre.
 */

export type GfBotAgentReactionMap = Partial<Record<GfBotAgentEvent, string | readonly string[] | false>>;

export interface GfBotAgentReactionsOptions {
  /** Qué gesto (o gestos, a elegir uno al azar) por evento; `false` apaga ese evento. Lo que no se nombre usa lo de arriba. */
  map?: GfBotAgentReactionMap;
  /** Mínimo entre dos veces el mismo gesto (ms). Por defecto 2500. */
  cooldownMs?: number;
  /** Desde cuántos ms de tarea el `done` puede ser el especial. Por defecto 20 000. */
  longTaskMs?: number;
  /** Probabilidad (0–1) de que una tarea larga acabe con el especial. Por defecto 0.4. */
  rareChance?: number;
  /** Cuánto debe durar un `loading` para que se «derrita» de esperar (ms). Por defecto 6000. */
  waitMs?: number;
  /** Cuánto debe llevar quieto para asomarse (ms). Por defecto 45 000. */
  idleAfterMs?: number;
  /** Azar y reloj, inyectables para probar. */
  random?: () => number;
  now?: () => number;
}

const DEFAULTS: Required<Pick<GfBotAgentReactionMap, 'prompt' | 'thinking' | 'tool' | 'loading' | 'done' | 'error' | 'idle'>> = {
  prompt: 'jellyWobble',
  thinking: 'stretchSnap',
  tool: 'sideDodge',
  loading: 'puddleMorph',
  done: 'frontFlip',
  error: ['jellyDrop', 'scaredRecoil'],
  idle: 'peekPop',
};

/** El manejador para `onAgentEvent`. Cada bot necesita el suyo (guarda cuándo empezó la tarea y qué gestos hizo hace poco). */
export function agentReactions(o: GfBotAgentReactionsOptions = {}): (ev: GfBotAgentEvent, bot: GfBotApi, ctx: GfBotGestureContext) => number {
  const cooldown = o.cooldownMs ?? 2500;
  const longTask = o.longTaskMs ?? 20_000;
  const rare = o.rareChance ?? 0.4;
  const waitMs = o.waitMs ?? 6000;
  const idleAfter = o.idleAfterMs ?? 45_000;
  const random = o.random ?? Math.random;
  const now = o.now ?? Date.now;
  const map: GfBotAgentReactionMap = { ...DEFAULTS, ...o.map };

  let tareaDesde = 0;
  const hizo = new Map<string, number>();

  const elige = (v: string | readonly string[] | false | undefined): string | undefined => {
    if (!v) return undefined;
    return typeof v === 'string' ? v : v[Math.floor(random() * v.length)];
  };

  /** Pide el gesto al paquete. Devuelve lo que dura (ms), o 0 si no corrió (enfriamiento, movimiento reducido, pausa, no registrado). */
  const juega = (bot: GfBotApi, ctx: GfBotGestureContext, id: string | undefined): number => {
    if (!id || ctx.reduce || ctx.paused) return 0;
    const t = now();
    if (t - (hizo.get(id) ?? -Infinity) < cooldown) return 0;
    const g = bot.gesture(id);
    if (!g.ms) return 0;
    hizo.set(id, t);
    return g.ms;
  };

  return (ev, bot, ctx) => {
    const t = now();
    if (ev === 'prompt') tareaDesde = t;
    else if (ev === 'thinking' && !tareaDesde) tareaDesde = t;

    if (ev === 'loading') {
      // Solo si de verdad se alarga: el timer lo corta cualquier otro paso (el motor limpia los temporizadores del bot).
      const id = elige(map.loading);
      if (id) kit.later(ctx, () => void juega(bot, ctx, id), waitMs);
      return 0;
    }
    if (ev === 'idle') {
      tareaDesde = 0;
      const id = elige(map.idle);
      if (id) kit.later(ctx, () => void juega(bot, ctx, id), idleAfter);
      return 0;
    }
    if (ev === 'done') {
      const larga = tareaDesde > 0 && t - tareaDesde >= longTask;
      tareaDesde = 0;
      const id = larga && random() < rare ? 'doubleFlip' : elige(map.done);
      const ms = juega(bot, ctx, id);
      // El festejo termina con una pose: orgulloso tras una tarea larga, contento si no.
      if (ms) landingPose(ctx, ms, larga ? 'proud' : 'happy');
      return ms;
    }
    if (ev === 'error') {
      tareaDesde = 0;
      return juega(bot, ctx, elige(map.error));
    }
    return juega(bot, ctx, elige(map[ev]));
  };
}
