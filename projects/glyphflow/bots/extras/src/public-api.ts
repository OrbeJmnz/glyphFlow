/**
 * `glyphflow/bots/extras` — lo opcional de `<gf-bot>`, en su propio chunk: quien no lo importe no paga nada.
 *
 *   import { toysExtra } from 'glyphflow/bots/extras';
 *   <gf-bot [shape]="catShape" [extras]="{ toys: toysExtra }" />
 *   bot.toy('ball', 120, 150);
 *
 * Se arman con las piezas del motor (`gfBotKit`), que se importan por NOMBRE DE PAQUETE (`from 'glyphflow/bots'`):
 * una ruta relativa duplicaría el motor aquí (regla 6 de CLAUDE.md).
 */
import type { GfBotToysExtra } from 'glyphflow/bots';
export { hatsExtra } from './hats';
export { HATS } from './hats-data';
export type { GfBotHat, GfBotHatId, GfBotHeadMetrics } from './hats-data';
import { toy } from './toys';

export type { GfBotToy, GfBotToyId } from './toys-data';
export { TOYS } from './toys-data';

/** Los juguetes: `star`, `ball`, `cookie`. */
export const toysExtra: GfBotToysExtra = { play: toy };
