import { FACES, MOCHI_VARS, type GfBotFaceId } from '../data/faces';
import { ACCX, FX_VARS, type GfBotAccXId, type GfBotFxId } from '../data/fx';
import { GHOST_VARS } from '../data/ghost';
import { CAT_VARS } from '../data/cat';
import type { GfBotHatId } from '../data/hat-ids';
import { OCTOPUS_VARS } from '../data/octopus';
import type { GfBotShape } from '../data/shape';
import { applyFx, buildShape } from './build';
import type { BotContext, GfBotMouthKind } from './context';
import { baseMouth, defaultMouth } from './mouth';
import { cloudBind, hatUnbind } from './physics';
import { setPalette } from './paint';
import { setPose } from './pose-motion';
import { setState } from './state';

/**
 * Cambiar lo que define CÓMO se ve el bot: forma, piel, cara, sombrero, efecto. Todos terminan en
 * `setShape`, que reconstruye el SVG y reinicia la rutina con los rasgos nuevos. Los valores
 * inválidos no truenan: caen al valor por defecto, igual que el prototipo (pero con `hasOwn`: las
 * claves heredadas de `Object` —`constructor`, `toString`— ya no pasan por válidas).
 */

/** Cambia de forma. Se pasa el OBJETO (`mochiShape`…), no una clave: así el bundler quita las que no se usan. */
export function setShape(ctx: BotContext, shape: GfBotShape): void {
  ctx.shape = shape;
  ctx.running.forEach((a) => a.cancel());
  ctx.running.clear();
  buildShape(ctx);
  setPose(ctx, {});
  if (ctx.hats) ctx.hats.bind(ctx);
  else hatUnbind(ctx);
  cloudBind(ctx);
  if (ctx.ready) setPalette(ctx, ctx.paletteKey);
  if (ctx.ready && !ctx.paused) setState(ctx, ctx.state, true); // reinicia la rutina con los rasgos nuevos
  else baseMouth(ctx, defaultMouth(ctx, ctx.state));
}

/** Efecto de contorno encima de cualquier piel y forma (`glow`, `pixel`, `glitch`, `bug`); otro valor lo quita. */
export function setFx(ctx: BotContext, v: string | null): void {
  ctx.fxVar = v && Object.hasOwn(FX_VARS, v) ? (v as GfBotFxId) : null;
  applyFx(ctx);
}

/** Piel (`neu`, `gel`, `g1`, `f4`, `o2`, `n3`…); una desconocida vuelve a `neu`. */
export function setMochi(ctx: BotContext, v: string): void {
  const known = [MOCHI_VARS, CAT_VARS, GHOST_VARS, OCTOPUS_VARS].some((t) => Object.hasOwn(t, v));
  ctx.mochiVar = known ? v : 'neu';
  setShape(ctx, ctx.shape);
}

/** Sombrero o accesorio extra (`halo`, `glasses`…); `null` o desconocido, ninguno. */
export function setHat(ctx: BotContext, k: string | null): void {
  ctx.hatKey = k && ctx.hats?.has(k) ? (k as GfBotHatId) : null;
  ctx.accX = k && Object.hasOwn(ACCX, k) ? (k as GfBotAccXId) : null;
  setShape(ctx, ctx.shape);
}

/** Boca de reposo elegida a mano (`pill` o `w`); otra, la de la forma. */
export function setMouthKind(ctx: BotContext, k: string | null): void {
  ctx.mouthPref = k === 'pill' || k === 'w' ? (k as GfBotMouthKind) : null;
  if (ctx.state === 'idle') baseMouth(ctx, defaultMouth(ctx, ctx.state));
}

/** Estilo de cara; `null` o desconocido, la propia de la forma. */
export function setFace(ctx: BotContext, style: string | null): void {
  ctx.faceStyle = style && Object.hasOwn(FACES, style) ? (style as GfBotFaceId) : null;
  setShape(ctx, ctx.shape);
}
