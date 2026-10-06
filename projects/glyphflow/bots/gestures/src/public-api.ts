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
export { jellyWobble, waveThroughBody, tornadoSpin, inflateRelease, puddleMorph, jellyDrop } from './region';
export { spinSquash, sideDodge, backflip, doubleFlip, sideCartwheel, ghostSwoop } from './acrobatics';
export { landingPose, withLanding } from './landing';
export type { GfBotLandingPose } from './landing';

import { frontFlip } from './flip';
import { scaredRecoil, stretchSnap, superBounce } from './physical';
import { backflip, doubleFlip, ghostSwoop, sideCartwheel, sideDodge, spinSquash } from './acrobatics';
import { inflateRelease, jellyDrop, jellyWobble, puddleMorph, tornadoSpin, waveThroughBody } from './region';

/** Todos los gestos físicos juntos: `[gestures]="physicalGestures"`. Pagas todos; si quieres pocos, pásalos sueltos. */
export const physicalGestures = { frontFlip, superBounce, stretchSnap, scaredRecoil, jellyWobble, waveThroughBody, tornadoSpin, spinSquash, sideDodge, backflip, doubleFlip, sideCartwheel, ghostSwoop, inflateRelease, puddleMorph, jellyDrop } as const;
