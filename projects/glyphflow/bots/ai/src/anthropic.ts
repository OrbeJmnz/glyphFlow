import type { GfBotAgentEvent } from 'glyphflow/bots';
import type { GfAgentAdapter } from './bind';

/** Un evento del stream de la API de Mensajes de Anthropic (`RawMessageStreamEvent`). Solo hace falta `type`: el resto se lee con cuidado. */
export interface GfAnthropicEvent {
  readonly type: string;
}

/** Lo que el adaptador lee de un evento, todo opcional: si el SDK cambia un campo, el evento simplemente no cambia nada. */
interface Leido {
  content_block?: { type?: string };
  delta?: { type?: string; stop_reason?: string | null };
}

/**
 * Adaptador para el stream de la **API de Mensajes de Anthropic** (`client.messages.stream(...)` o `create({ stream: true })`).
 *
 * | Evento | Paso del bot |
 * | --- | --- |
 * | `message_start` | `thinking` |
 * | `content_block_start` de `thinking` / `redacted_thinking` | `thinking` |
 * | `content_block_start` de `tool_use` / `server_tool_use` / `mcp_tool_use` | `tool` |
 * | `content_block_start` de `text` | `writing` |
 * | `content_block_delta`: `text_delta`, `thinking_delta`, `input_json_delta` | `writing`, `thinking`, `tool` |
 * | `message_stop` | `done`, **salvo** que el `stop_reason` fuera `tool_use` o `pause_turn`: ahí el agente sigue (corre la herramienta y pide otro mensaje) |
 * | `error` | `error` |
 *
 * En un bucle con herramientas de tu lado hay varias peticiones por turno, y un `message_stop` con `stop_reason: 'tool_use'` no cierra nada.
 * Encadena los streams de cada petición en UN solo `AsyncIterable` (un `async function*` que haga `yield*` de cada uno) y pásalo a
 * `bindAgent`: así el bot ve un solo turno y `done` llega con el último mensaje. Con un stream suelto que termina en `tool_use`,
 * `bindAgent` lo da por terminado al agotarse y cierra con `done`.
 */
export const anthropic: GfAgentAdapter<GfAnthropicEvent> = () => {
  let parada: string | null | undefined;
  return (e): GfBotAgentEvent | null => {
    const { content_block: bloque, delta } = e as GfAnthropicEvent & Leido;
    switch (e.type) {
      case 'message_start':
        parada = undefined;
        return 'thinking';
      case 'content_block_start':
        switch (bloque?.type) {
          case 'thinking':
          case 'redacted_thinking':
            return 'thinking';
          case 'tool_use':
          case 'server_tool_use':
          case 'mcp_tool_use':
            return 'tool';
          case 'text':
            return 'writing';
          default:
            return null;
        }
      case 'content_block_delta':
        switch (delta?.type) {
          case 'text_delta':
            return 'writing';
          case 'thinking_delta':
            return 'thinking';
          case 'input_json_delta':
            return 'tool';
          default:
            return null;
        }
      case 'message_delta':
        parada = delta?.stop_reason;
        return null;
      case 'message_stop':
        return parada === 'tool_use' || parada === 'pause_turn' ? null : 'done';
      case 'error':
        return 'error';
      default:
        return null;
    }
  };
};
