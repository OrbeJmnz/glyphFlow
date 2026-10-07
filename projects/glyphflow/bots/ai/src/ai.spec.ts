import { describe, expect, it, vi } from 'vitest';
import type { GfBotAgentEvent } from 'glyphflow/bots';
import { anthropic, bindAgent, vercelAi, type GfAnthropicEvent } from './public-api';

/**
 * Los streams de abajo están ESCRITOS a mano siguiendo el orden que documenta cada SDK (Vercel AI SDK 5: `fullStream`; Anthropic:
 * `RawMessageStreamEvent`), no grabados de la red. Prueban el mapeo; que un SDK cambie sus nombres lo detecta quien los vuelva a grabar.
 */

async function* de<E>(...eventos: E[]): AsyncGenerator<E> {
  for (const e of eventos) yield e;
}

/** Un bot de mentira que anota los pasos que recibe. */
function bot(): { agent: (e: GfBotAgentEvent) => void; vistos: GfBotAgentEvent[] } {
  const vistos: GfBotAgentEvent[] = [];
  return { agent: (e) => void vistos.push(e), vistos };
}

const deltas = <T>(n: number, ev: T): T[] => Array.from({ length: n }, () => ev);

describe('glyphflow/bots/ai · bindAgent', () => {
  it('avisa prompt al arrancar, colapsa lo repetido y cierra con done si el stream acaba sin un final', async () => {
    const b = bot();
    const run = bindAgent(b, de(...deltas(200, { type: 'text-delta' })), vercelAi);
    expect(await run.done).toBe('finished');
    expect(b.vistos).toEqual(['prompt', 'writing', 'done']);
  });

  it('prompt:false no lo avisa', async () => {
    const b = bot();
    await bindAgent(b, de({ type: 'text-delta' }, { type: 'finish' }), vercelAi, { prompt: false }).done;
    expect(b.vistos).toEqual(['writing', 'done']);
  });

  it('si el stream lanza, el bot ve error y la corrida termina en error sin rechazar', async () => {
    const b = bot();
    async function* roto(): AsyncGenerator<{ type: string }> {
      yield { type: 'text-delta' };
      throw new Error('red caída');
    }
    expect(await bindAgent(b, roto(), vercelAi).done).toBe('error');
    expect(b.vistos).toEqual(['prompt', 'writing', 'error']);
  });

  it('un evento de error del SDK termina en error y no suma un done', async () => {
    const b = bot();
    const run = bindAgent(b, de({ type: 'text-delta' }, { type: 'error' }), vercelAi);
    expect(await run.done).toBe('error');
    expect(b.vistos).toEqual(['prompt', 'writing', 'error']);
  });

  it('stop() corta el stream, suelta al bot en idle y resuelve stopped', async () => {
    const b = bot();
    let cerrado = false;
    async function* lento(): AsyncGenerator<{ type: string }> {
      try {
        yield { type: 'start' };
        await new Promise((r) => setTimeout(r, 50));
        yield { type: 'text-delta' };
        yield { type: 'finish' };
      } finally {
        cerrado = true;
      }
    }
    const run = bindAgent(b, lento(), vercelAi);
    await new Promise((r) => setTimeout(r, 10));
    run.stop();
    expect(await run.done).toBe('stopped');
    expect(b.vistos).toEqual(['prompt', 'loading', 'idle']);
    await new Promise((r) => setTimeout(r, 80));
    expect(cerrado).toBe(true);
    expect(b.vistos).not.toContain('done');
  });

  it('cada corrida pide su propio adaptador (el estado no se comparte entre corridas)', async () => {
    const fabrica = vi.fn(anthropic);
    await bindAgent(bot(), de({ type: 'message_start' }), fabrica).done;
    await bindAgent(bot(), de({ type: 'message_start' }), fabrica).done;
    expect(fabrica).toHaveBeenCalledTimes(2);
  });
});

describe('glyphflow/bots/ai · vercelAi', () => {
  it('una respuesta con razonamiento, una herramienta y texto sigue los pasos del agente', async () => {
    const b = bot();
    const stream = de(
      { type: 'start' },
      { type: 'start-step' },
      { type: 'reasoning-start' },
      ...deltas(5, { type: 'reasoning-delta' }),
      { type: 'reasoning-end' },
      { type: 'tool-input-start' },
      ...deltas(4, { type: 'tool-input-delta' }),
      { type: 'tool-input-end' },
      { type: 'tool-call' },
      { type: 'tool-result' },
      { type: 'finish-step' },
      { type: 'start-step' },
      { type: 'text-start' },
      ...deltas(30, { type: 'text-delta' }),
      { type: 'text-end' },
      { type: 'finish-step' },
      { type: 'finish' },
    );
    expect(await bindAgent(b, stream, vercelAi).done).toBe('finished');
    expect(b.vistos).toEqual(['prompt', 'loading', 'thinking', 'tool', 'loading', 'writing', 'done']);
  });

  it('entiende los chunks del stream de UI (useChat): tool-input-available y tool-output-available', async () => {
    const b = bot();
    await bindAgent(b, de({ type: 'start' }, { type: 'tool-input-available' }, { type: 'tool-output-available' }, { type: 'text-delta' }, { type: 'finish' }), vercelAi).done;
    expect(b.vistos).toEqual(['prompt', 'loading', 'tool', 'writing', 'done']);
  });

  it('un error de herramienta NO es un error del agente: el bot sigue y termina bien', async () => {
    const b = bot();
    await bindAgent(b, de({ type: 'tool-call' }, { type: 'tool-error' }, { type: 'start-step' }, { type: 'text-delta' }, { type: 'finish' }), vercelAi).done;
    expect(b.vistos).toEqual(['prompt', 'tool', 'loading', 'writing', 'done']);
  });

  it('esperar una aprobación humana se ve como loading y abort suelta al bot', async () => {
    const b = bot();
    await bindAgent(b, de({ type: 'tool-approval-request' }, { type: 'abort' }), vercelAi).done;
    expect(b.vistos).toEqual(['prompt', 'loading', 'idle']);
  });

  it('ignora lo que no conoce (source, file, raw, finish-step…)', async () => {
    const b = bot();
    await bindAgent(b, de({ type: 'source' }, { type: 'file' }, { type: 'raw' }, { type: 'finish-step' }, { type: 'inventado' }), vercelAi).done;
    expect(b.vistos).toEqual(['prompt', 'done']);
  });
});

describe('glyphflow/bots/ai · anthropic', () => {
  type A = GfAnthropicEvent & Record<string, unknown>;
  const inicio: A = { type: 'message_start' };
  const fin = (stop_reason: string): A[] => [{ type: 'message_delta', delta: { stop_reason } }, { type: 'message_stop' }];

  it('un mensaje con thinking y texto: thinking → writing → done', async () => {
    const b = bot();
    const stream = de<A>(
      inicio,
      { type: 'content_block_start', content_block: { type: 'thinking' } },
      ...deltas(6, { type: 'content_block_delta', delta: { type: 'thinking_delta' } }),
      { type: 'content_block_delta', delta: { type: 'signature_delta' } },
      { type: 'content_block_stop' },
      { type: 'content_block_start', content_block: { type: 'text' } },
      ...deltas(40, { type: 'content_block_delta', delta: { type: 'text_delta' } }),
      { type: 'content_block_stop' },
      ...fin('end_turn'),
    );
    expect(await bindAgent(b, stream, anthropic).done).toBe('finished');
    expect(b.vistos).toEqual(['prompt', 'thinking', 'writing', 'done']);
  });

  it('un tool_use pasa a tool, y su message_stop con stop_reason tool_use NO cierra (el agente sigue)', async () => {
    const b = bot();
    const stream = de<A>(
      inicio,
      { type: 'content_block_start', content_block: { type: 'tool_use' } },
      ...deltas(5, { type: 'content_block_delta', delta: { type: 'input_json_delta' } }),
      { type: 'content_block_stop' },
      ...fin('tool_use'),
      // la herramienta corrió y llega el siguiente mensaje del MISMO turno (streams encadenados)
      inicio,
      { type: 'content_block_start', content_block: { type: 'text' } },
      { type: 'content_block_delta', delta: { type: 'text_delta' } },
      ...fin('end_turn'),
    );
    await bindAgent(b, stream, anthropic).done;
    expect(b.vistos).toEqual(['prompt', 'thinking', 'tool', 'thinking', 'writing', 'done']);
  });

  it('server_tool_use y mcp_tool_use también son tool; pause_turn tampoco cierra', async () => {
    const b = bot();
    await bindAgent(b, de<A>(inicio, { type: 'content_block_start', content_block: { type: 'server_tool_use' } }, ...fin('pause_turn'), inicio, { type: 'content_block_start', content_block: { type: 'mcp_tool_use' } }, ...fin('end_turn')), anthropic).done;
    expect(b.vistos).toEqual(['prompt', 'thinking', 'tool', 'thinking', 'tool', 'done']);
  });

  it('un evento error del stream termina en error', async () => {
    const b = bot();
    expect(await bindAgent(b, de<A>(inicio, { type: 'error' }), anthropic).done).toBe('error');
    expect(b.vistos).toEqual(['prompt', 'thinking', 'error']);
  });

  it('un stream sin stop_reason conocido igual cierra con done en message_stop', async () => {
    const b = bot();
    await bindAgent(b, de<A>(inicio, { type: 'message_stop' }), anthropic).done;
    expect(b.vistos).toEqual(['prompt', 'thinking', 'done']);
  });

  it('ignora bloques y deltas que no conoce sin romperse (campos ausentes incluidos)', async () => {
    const b = bot();
    await bindAgent(b, de<A>(inicio, { type: 'content_block_start' }, { type: 'content_block_start', content_block: { type: 'web_search_tool_result' } }, { type: 'content_block_delta' }, { type: 'ping' }, { type: 'message_stop' }), anthropic).done;
    expect(b.vistos).toEqual(['prompt', 'thinking', 'done']);
  });
});
