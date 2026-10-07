import type { GfBotAgentEvent } from 'glyphflow/bots';
import type { GfAgentAdapter } from './bind';

/** Un trozo del stream del AI SDK. Solo hace falta `type`: el adaptador no lee más, así que sirve con los tipos reales del SDK sin importarlos. */
export interface GfVercelPart {
  readonly type: string;
}

/**
 * Adaptador para el **Vercel AI SDK 5+**. Entiende las dos formas del stream: `result.fullStream` de `streamText` y los chunks del
 * stream de mensajes de UI (lo que llega a `useChat`); comparten casi todos los nombres.
 *
 * | Parte del SDK | Paso del bot |
 * | --- | --- |
 * | `start`, `start-step` | `loading` (esperando al modelo) |
 * | `reasoning-start`, `reasoning-delta` | `thinking` |
 * | `tool-input-start`, `tool-call`, `tool-input-available` | `tool` |
 * | `tool-approval-request` | `loading` (espera a una persona) |
 * | `text-start`, `text-delta` | `writing` |
 * | `finish` | `done` (`finish-step` se ignora: un paso no es el final) |
 * | `error` | `error` (`tool-error` y `tool-output-error` NO cuentan: la herramienta falló pero el agente sigue) |
 * | `abort` | `idle` |
 *
 * `tool-result` no cambia nada: el bot sigue en `tool` hasta que el siguiente paso (`start-step`) lo pasa a `loading`.
 */
export const vercelAi: GfAgentAdapter<GfVercelPart> = () => (part): GfBotAgentEvent | null => {
  switch (part.type) {
    case 'start':
    case 'start-step':
    case 'tool-approval-request':
      return 'loading';
    case 'reasoning-start':
    case 'reasoning-delta':
      return 'thinking';
    case 'tool-input-start':
    case 'tool-call':
    case 'tool-input-available':
      return 'tool';
    case 'text-start':
    case 'text-delta':
      return 'writing';
    case 'finish':
      return 'done';
    case 'error':
      return 'error';
    case 'abort':
      return 'idle';
    default:
      return null;
  }
};
