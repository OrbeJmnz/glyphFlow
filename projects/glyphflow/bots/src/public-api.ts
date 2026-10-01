/**
 * Superficie pública de `glyphflow/bots` — entry point secundario, su propio chunk: quien solo
 * use iconos y no lo importe no paga nada.
 *
 * F0 (andamio): solo los estados. El motor y `<gf-bot>` llegan en F1–F2 — ver el plan
 * «Plan · glyphflow/bots».
 *
 * Cuando haga falta algo del primario (resortes, la estrella de Lucide), se importa por NOMBRE DE
 * PAQUETE (`from 'glyphflow'`), nunca por ruta relativa: una relativa hace que ng-packagr duplique
 * ese código aquí, y con un `InjectionToken` eso es OTRO token (regla 6 de CLAUDE.md).
 */
export { GF_BOT_STATES, isGfBotState } from './bot-state';
export type { GfBotState } from './bot-state';
