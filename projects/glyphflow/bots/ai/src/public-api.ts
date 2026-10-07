/**
 * `glyphflow/bots/ai` — conecta el stream de un SDK de IA con el bot: el bot reacciona a lo que el agente va haciendo
 * (pensar, usar una herramienta, escribir, terminar, fallar) sin que escribas el mapeo a mano. No depende de ningún SDK:
 * lee los eventos de forma estructural, así que no añade nada a tu `package.json`.
 *
 *   import { bindAgent, vercelAi } from 'glyphflow/bots/ai';
 *   const result = streamText({ model, prompt });
 *   const run = bindAgent(bot.api, result.fullStream, vercelAi);   // bot = <gf-bot> o createBot(...)
 *   await run.done;                                                // 'finished' | 'error' | 'stopped'
 *
 *   import { anthropic } from 'glyphflow/bots/ai';
 *   bindAgent(bot.api, await client.messages.stream({ ... }), anthropic);
 *
 * Para que el bot además haga un gesto en cada paso (un flip al terminar…), ver `agentReactions` en `glyphflow/bots/gestures`.
 */
export { bindAgent } from './bind';
export type { GfAgentAdapter, GfAgentEnd, GfAgentRun, GfBindAgentOptions } from './bind';
export { vercelAi } from './vercel';
export type { GfVercelPart } from './vercel';
export { anthropic } from './anthropic';
export type { GfAnthropicEvent } from './anthropic';
