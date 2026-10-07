import type { GfBotAgentEvent } from 'glyphflow/bots';

/** Cómo terminó una corrida: `finished` (el stream acabó bien), `error` (falló o el SDK avisó un error) o `stopped` (la cortaron con `stop()`). */
export type GfAgentEnd = 'finished' | 'error' | 'stopped';

/** Una corrida en curso: `done` se resuelve una vez y nunca rechaza; `stop()` la corta y suelta al bot. */
export interface GfAgentRun {
  readonly done: Promise<GfAgentEnd>;
  stop(): void;
}

/**
 * Un adaptador traduce los eventos de un SDK a los pasos del bot. Es una FÁBRICA: cada corrida pide el suyo, porque algunos
 * necesitan recordar (Anthropic: el `stop_reason` que llegó antes de `message_stop`). Devolver `null` es «este evento no cambia nada».
 */
export type GfAgentAdapter<E> = () => (ev: E) => GfBotAgentEvent | null | undefined;

export interface GfBindAgentOptions {
  /** Avisa `prompt` al arrancar (el usuario acaba de mandar el mensaje). Por defecto sí; ponlo en `false` si ya lo avisaste tú. */
  prompt?: boolean;
}

/** Los pasos que cierran una corrida: después de uno de ellos no hace falta un `done` extra. */
const TERMINAL: readonly GfBotAgentEvent[] = ['done', 'error', 'idle'];

/**
 * Conecta un stream de un SDK de IA con el bot: cada evento se traduce con el adaptador y se le pasa a `bot.agent(...)`.
 * Los pasos repetidos seguidos se colapsan (`text-delta` llega cientos de veces: el bot lo ve como un solo `writing`).
 *
 * - Si el stream termina sin un paso final, cierra con `done`.
 * - Si el stream lanza, el bot ve `error` y la corrida termina en `error` (no rechaza: pregunta por `done`).
 * - `stop()` corta el stream, suelta al bot (`idle`) y resuelve `stopped`.
 *
 * No depende de ningún SDK: lee los eventos de forma estructural.
 */
export function bindAgent<E>(
  bot: { agent(ev: GfBotAgentEvent): void },
  source: AsyncIterable<E>,
  adapter: GfAgentAdapter<E>,
  options: GfBindAgentOptions = {},
): GfAgentRun {
  const map = adapter();
  const it = source[Symbol.asyncIterator]();
  let stopped = false;
  let last: GfBotAgentEvent | null = null;
  const emit = (ev: GfBotAgentEvent): void => {
    if (ev === last) return;
    last = ev;
    bot.agent(ev);
  };
  const done = (async (): Promise<GfAgentEnd> => {
    if (options.prompt !== false) emit('prompt');
    try {
      for (;;) {
        const r = await it.next();
        if (stopped) return 'stopped';
        if (r.done) break;
        const ev = map(r.value);
        if (ev) emit(ev);
      }
    } catch {
      if (stopped) return 'stopped';
      emit('error');
      return 'error';
    }
    if (last && !TERMINAL.includes(last)) emit('done');
    return last === 'error' ? 'error' : 'finished';
  })();
  return {
    done,
    stop: () => {
      if (stopped) return;
      stopped = true;
      void it.return?.();
      emit('idle');
    },
  };
}
