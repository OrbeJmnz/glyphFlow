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

export { createBot } from './engine/create-bot';
export type { GfBotActionId, GfBotApi, GfBotControls } from './engine/create-bot';
export type { GfBotAgentEvent } from './engine/agent';
export type { GfBotMaterialId, GfBotMouthKind, GfBotOptions } from './engine/context';
export type { GfBotShape } from './data/shape';
export type { GfBotAccXId, GfBotFxId } from './data/fx';
export type { GfBotFaceId } from './data/faces';
export type { GfBotHatId } from './data/hats';
export type { GfKawaiiId } from './data/kawaii';
export type { GfBotPaletteId } from './data/palettes';
export type { GfBotSleepRoutine, GfBotWorkRoutine } from './data/routines';
export type { GfBotToyId } from './data/toys';
