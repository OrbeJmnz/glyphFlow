/**
 * `glyphflow/bots/extras` — lo opcional de `<gf-bot>`, en su propio chunk: quien no lo importe no paga nada.
 *
 *   import { toysExtra } from 'glyphflow/bots/extras';
 *   <gf-bot [shape]="catShape" [extras]="{ toys: toysExtra, hats: hatsExtra, routines: routinesExtra }" />
 *   bot.toy('ball', 120, 150);
 *
 * Se arman con las piezas del motor (`gfBotKit`), que se importan por NOMBRE DE PAQUETE (`from 'glyphflow/bots'`):
 * una ruta relativa duplicaría el motor aquí (regla 6 de CLAUDE.md).
 */
export { createHatsExtra, defineHat, hatsExtra } from './hats';
export type { GfBotHatInput } from './hats';
export { routinesExtra } from './routines';
export { HATS, hatWizard, hatParty, hatSanta, hatCap, hatBeanie, hatTopHat, hatBeret, hatCrown, hatBirthday, hatChef, hatCowboy, hatPirate, hatHeadphones, hatVisor, hatAstronaut, hatAntenna } from './hats-data';
export type { GfBotHat, GfBotHatId, GfBotHeadMetrics } from './hats-data';
export { createToysExtra, defineToy, toysExtra } from './toys-api';
export type { GfBotToyInput } from './toys-api';
export { TOYS, toyBall, toyCookie, toyStar } from './toys-data';
export type { GfBotToy, GfBotToyBehavior, GfBotToyId } from './toys-data';
