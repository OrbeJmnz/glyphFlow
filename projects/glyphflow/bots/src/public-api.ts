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

export { GfBotComponent } from './component/gf-bot.component';
export type { GfBotRoutineEvent } from './component/gf-bot.component';
export { createBot } from './engine/create-bot';
export type { GfBotActionId, GfBotApi, GfBotControls, GfBotPackApi } from './engine/create-bot';
// Para escribir gestos propios (y para `glyphflow/bots/gestures`): las primitivas de movimiento y la cara.
export * as gfBotKit from './engine/toolkit';
export type { GestureDef as GfBotGestureDef, MotionFrame as GfBotMotionFrame, Score as GfBotScore } from './engine/motion';
export type { GfBotAgentEvent } from './engine/agent';
export type { GfGestureEnd, GfGestureHandle, GfGestureOptions, GfGesturePolicy } from './engine/lifecycle';
export type { GfBotExtras, GfBotHatsExtra, GfBotRoutinesExtra, GfBotToysExtra, GfBotGesture, GfBotGestureContext, GfBotGesturePack, GfBotMaterialId, GfBotMouthKind, GfBotOptions } from './engine/context';
export { GF_BOT_VIEWS, isGfBotView } from './data/views';
export type { GfBotView } from './data/views';
export type { GfBotShape, GfBotHeadMetrics } from './data/shape';
export type { GfBotAccXId, GfBotFxId } from './data/fx';
export type { GfBotFaceId } from './data/faces';
export type { GfBotHatId } from './data/hat-ids';
export type { GfKawaiiId } from './data/kawaii';
export type { GfBotPaletteId } from './data/palettes';
export type { GfBotSleepRoutine, GfBotWorkRoutine } from './data/routines';

// Formas. Cada una es un objeto suelto (como los iconos del primario): quien usa `catShape` no carga
// el pulpo. Se pasan a `createBot({ shape })` o a `bot.setShape(shape)`. Las retiradas (huevo, caramelo,
// cubo, píldora, gota) no salen: solo existen de cuerpo base del robot.
export { mochiShape } from './shapes/mochi';
export { tofuShape } from './shapes/tofu';
export { ghostShape } from './shapes/ghost';
export { catShape } from './shapes/cat';
export { octopusShape } from './shapes/octopus';
export { robotShape } from './shapes/robot';
// Las nocturnas (pensadas para fondo oscuro): el `id` interno conserva la `n` (`nCloud`…) porque es el
// contrato con el CSS; el nombre público dice qué son.
export {
  nNeonShape as nightNeonShape,
  nAuroraShape as nightAuroraShape,
  nCobaltShape as nightCobaltShape,
  nPearlShape as nightPearlShape,
  nVibrantShape as nightVibrantShape,
  nMaskShape as nightMaskShape,
  nCrystalShape as nightCrystalShape,
  nJellyShape as nightJellyShape,
  nCloudShape as nightCloudShape,
  nPrismShape as nightPrismShape,
} from './shapes/night';
