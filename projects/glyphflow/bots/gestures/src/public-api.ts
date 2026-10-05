/**
 * `glyphflow/bots/gestures` — gestos físicos para `<gf-bot>`, en su propio chunk: quien no lo importe
 * no paga nada, y quien lo importe paga SOLO los gestos que use (cada uno es un objeto suelto).
 *
 *   import { frontFlip, superBounce } from 'glyphflow/bots/gestures';
 *   <gf-bot [shape]="catShape" [gestures]="{ frontFlip, superBounce }" />
 *   bot.frontFlip();              // o bot.gesture('frontFlip')
 *
 * Se arman con las primitivas de movimiento del motor (`gfBotKit`), que se importan por NOMBRE DE
 * PAQUETE (`from 'glyphflow/bots'`): una ruta relativa duplicaría el motor aquí (regla 6 de CLAUDE.md).
 */
export { frontFlip } from './flip';
export { superBounce, stretchSnap, scaredRecoil } from './physical';

import { frontFlip } from './flip';
import { scaredRecoil, stretchSnap, superBounce } from './physical';

/** Todos los gestos físicos juntos: `[gestures]="physicalGestures"`. Pagas todos; si quieres pocos, pásalos sueltos. */
export const physicalGestures = { frontFlip, superBounce, stretchSnap, scaredRecoil } as const;
