import { gfBotKit, type GfBotGestureContext as BotContext, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';
import { gestureEffects } from './flip-fx';
import { aire, boca } from './shared';

const kit = gfBotKit;

/**
 * 03 · BALL MORPH — el personaje recoge la falda y se vuelve una bolita blanda, rebota una vez girando un poco, aterriza
 * con un squash de pelota y se despliega (primero el centro, luego los lados). Es EL MISMO personaje plegándose: cada
 * punto de su contorno se acerca a un círculo (`ball` del campo), no se carga otra forma.
 */

export const BALL_MS = 2000;
let ballDef: GestureDef | undefined;

export function ballMorphDef(): GestureDef {
  const m = kit.motion;
  return (ballDef ??= {
    score: m.score(
      m.settle(0),
      m.anticipate(0.06, { sx: 1.02, sy: 0.97 }), // empieza a recoger
      // Bola: se queda un poco más baja y redondita.
      m.key(0.3, { sx: 0.99, sy: 1 }),
      // Un salto, con un girito de pelota.
      m.launch(0.42, { y: -4, roll: 6, sx: 0.96, sy: 1.06 }),
      m.key(0.51, { y: -48, roll: 30, sx: 1, sy: 1 }),
      m.key(0.6, { y: 0, roll: 8, sx: 1.14, sy: 0.86 }), // aterriza: squash de pelota
      m.overshoot(0.66, { y: -3, roll: -4, sx: 0.98, sy: 1.03 }),
      m.key(0.7, { y: 0, roll: 0, sx: 1.01, sy: 0.99 }),
      // Al desplegarse, la silueta vuelve primero por el centro; el wobble final es del campo.
      m.settle(1),
    ),
    grounded: aire(0.38, 0.44, 0.56, 0.61),
    field: [
      m.ball(
        kit.track([[0, 0], [0.08, 0], [0.19, 0.55], [0.3, 1], [0.62, 1], [0.72, 0.62], [0.84, 0.12], [0.9, -0.02], [1, 0]]),
        { lag: 0.05, lagX: 0.04, r: 0.4 },
      ),
      // El wobble pequeño al asentar.
      m.shear(kit.track([[0, 0], [0.84, 0], [0.9, 4], [0.95, -2], [1, 0]]), 0.04),
    ],
  });
}

export function ballMorph(ctx: BotContext): number {
  const ms = kit.motion.gestureDuration(ctx, 'ball-morph', BALL_MS, 900, 5000);
  if (ctx.reduce) return kit.motion.reducedHop(ctx, ms);
  ctx.hooks.act(ms);
  const at = kit.motion.runGesture(ctx, ballMorphDef(), ms);
  kit.motion.shadowByHeight(ctx, at, ms, 60);
  gestureEffects(ctx, ms, { impacts: [{ at: 0.6 }] });
  // La cara se queda a la vista todo el rato: solo se achica un poco al plegarse y se abre al desplegar.
  kit.eyeSeq(ctx, [
    { transform: kit.S(1, 1), offset: 0 },
    { transform: kit.S(0.96, 1.04), offset: 0.2 },
    { transform: kit.S(0.96, 1.04), offset: 0.4 },
    { transform: kit.S(1.06, 1.14), offset: 0.5 }, // en el aire
    { transform: kit.S(1, 0.2), offset: 0.6 }, // aterriza: los aprieta
    { transform: kit.S(1, 1), offset: 0.7 },
    { transform: kit.S(1.04, 1.08), offset: 0.85 },
    { transform: kit.S(1, 1), offset: 1 },
  ], ms);
  boca(ctx, ms, 0.06, 'o', 0.24);
  boca(ctx, ms, 0.4, 'smile', 0.2);
  boca(ctx, ms, 0.6, 'wide', 0.12);
  return ms;
}
