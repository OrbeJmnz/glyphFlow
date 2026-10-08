import { anthropic, vercelAi, type GfAgentAdapter } from 'glyphflow/bots/ai';
import type { GfBotAgentEvent } from 'glyphflow/bots';

/**
 * La tabla «qué paso ve el bot por cada evento del SDK» de `/docs/bots`, CALCULADA con los adaptadores de verdad y no escrita a mano:
 * una tabla copiada ya contradijo una vez al código (el sitio decía «+1.7 KB por gesto» y el CI medía otra cosa). Aquí lo único escrito
 * a mano es qué eventos mostrar; el paso al que se traduce sale de correr el adaptador.
 *
 * Es lógica pura, sin Angular, para probarla suelta.
 */

type Evento = { readonly type: string } & Record<string, unknown>;

export type Sdk = 'vercel' | 'anthropic';

export interface FilaTraduccion {
  sdk: Sdk;
  /** Cómo se llama el evento en el SDK; puede llevar un matiz entre paréntesis (`stop_reason`…). */
  crudo: string;
  /** El paso que ve el bot, o `null` si el evento no cambia nada. */
  paso: GfBotAgentEvent | null;
}

const ev = (type: string, extra: Record<string, unknown> = {}): Evento => ({ type, ...extra });

/**
 * Un renglón: los eventos que hay que darle al adaptador, EN ORDEN, y el último es el que se muestra. Casi siempre es uno solo; los de
 * Anthropic que dependen de un `stop_reason` anterior llevan el `message_delta` que lo fija delante.
 */
interface Muestra {
  sdk: Sdk;
  crudo: string;
  eventos: Evento[];
}

const MUESTRAS: readonly Muestra[] = [
  { sdk: 'vercel', crudo: 'start-step', eventos: [ev('start-step')] },
  { sdk: 'vercel', crudo: 'reasoning-delta', eventos: [ev('reasoning-delta')] },
  { sdk: 'vercel', crudo: 'tool-call', eventos: [ev('tool-call')] },
  { sdk: 'vercel', crudo: 'tool-result', eventos: [ev('tool-result')] },
  { sdk: 'vercel', crudo: 'tool-approval-request', eventos: [ev('tool-approval-request')] },
  { sdk: 'vercel', crudo: 'tool-error', eventos: [ev('tool-error')] },
  { sdk: 'vercel', crudo: 'text-delta', eventos: [ev('text-delta')] },
  { sdk: 'vercel', crudo: 'finish', eventos: [ev('finish')] },
  { sdk: 'vercel', crudo: 'error', eventos: [ev('error')] },
  { sdk: 'vercel', crudo: 'abort', eventos: [ev('abort')] },
  { sdk: 'anthropic', crudo: 'message_start', eventos: [ev('message_start')] },
  { sdk: 'anthropic', crudo: 'content_block_start (thinking)', eventos: [ev('content_block_start', { content_block: { type: 'thinking' } })] },
  { sdk: 'anthropic', crudo: 'content_block_start (tool_use)', eventos: [ev('content_block_start', { content_block: { type: 'tool_use' } })] },
  { sdk: 'anthropic', crudo: 'content_block_start (text)', eventos: [ev('content_block_start', { content_block: { type: 'text' } })] },
  {
    sdk: 'anthropic',
    crudo: 'message_stop (stop_reason: end_turn)',
    eventos: [ev('message_delta', { delta: { stop_reason: 'end_turn' } }), ev('message_stop')],
  },
  {
    sdk: 'anthropic',
    crudo: 'message_stop (stop_reason: tool_use)',
    eventos: [ev('message_delta', { delta: { stop_reason: 'tool_use' } }), ev('message_stop')],
  },
  { sdk: 'anthropic', crudo: 'error', eventos: [ev('error')] },
];

const ADAPTADORES: Record<Sdk, GfAgentAdapter<Evento>> = { vercel: vercelAi, anthropic };

/** Corre el adaptador (uno nuevo por muestra: algunos recuerdan cosas entre eventos) y devuelve lo que dijo del ÚLTIMO evento. */
function traducir(sdk: Sdk, eventos: readonly Evento[]): GfBotAgentEvent | null {
  const leer = ADAPTADORES[sdk]();
  let ultimo: GfBotAgentEvent | null = null;
  for (const e of eventos) ultimo = leer(e) ?? null;
  return ultimo;
}

export const FILAS_TRADUCCION: readonly FilaTraduccion[] = MUESTRAS.map((m) => ({
  sdk: m.sdk,
  crudo: m.crudo,
  paso: traducir(m.sdk, m.eventos),
}));
