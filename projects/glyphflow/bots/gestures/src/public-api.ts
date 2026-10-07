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
export { squishTeleport } from './teleport';
export { ballMorph } from './ball';
export { peekPop, diveEmerge } from './ground';
export { landingPose, withLanding } from './landing';
/** Para escribir un gesto propio: el esqueleto que usan los 20 del catálogo (duración por CSS, movimiento reducido, partitura, sombra). Ver `bots/README.md`. */
export { aire, boca, nodos, perform } from './shared';
export type { PerformOpts } from './shared';
export { agentReactions } from './agent';
export type { GfBotAgentReactionMap, GfBotAgentReactionsOptions } from './agent';
export type { GfBotLandingPose } from './landing';

import { frontFlip } from './flip';
import { scaredRecoil, stretchSnap, superBounce } from './physical';
import { backflip, doubleFlip, ghostSwoop, sideCartwheel, sideDodge, spinSquash } from './acrobatics';
import { squishTeleport } from './teleport';
import { ballMorph } from './ball';
import { diveEmerge, peekPop } from './ground';
import { inflateRelease, jellyDrop, jellyWobble, puddleMorph, tornadoSpin, waveThroughBody } from './region';

/** Todos los gestos físicos juntos: `[gestures]="physicalGestures"`. Pagas todos; si quieres pocos, pásalos sueltos. */
export const physicalGestures = { frontFlip, superBounce, stretchSnap, scaredRecoil, jellyWobble, waveThroughBody, tornadoSpin, spinSquash, sideDodge, backflip, doubleFlip, sideCartwheel, ghostSwoop, inflateRelease, puddleMorph, jellyDrop, squishTeleport, ballMorph, peekPop, diveEmerge } as const;
