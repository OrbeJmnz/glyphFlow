import { f2 } from '../data/color';
import type { BotContext } from './context';
import { projectPose, type GfBotPose } from './pose';
import { syncOutlineTransform } from './outlines';
import { curSh } from './shape-view';
import { loop, play } from './timing';

/** Pone la pose YA (con el resorte de la transición CSS de cada capa) y mueve el color pintado de Gel/App. */
export function setPose(ctx: BotContext, next: GfBotPose): void {
  const { yaw = ctx.pose.yaw, pitch = ctx.pose.pitch, roll = ctx.pose.roll } = next;
  ctx.pose = { yaw, pitch, roll };
  projectPose(curSh(ctx), ctx.pose, ctx.feats).forEach((st, i) => {
    const node = ctx.poseEls[i];
    node.style.transform = st.transform;
    if (st.opacity !== undefined) node.style.opacity = String(st.opacity);
    // el trazo de la piel es una copia de la silueta: hay que moverlo a mano (ver `outlines.ts`)
    if (node === ctx.el.clip) syncOutlineTransform(ctx, st.transform);
  });
  // Gel/App/Etéreo/Pastel: el color está PINTADO en la figura: se va con ella al girar, saltar y ladearse
  if (ctx.hatEls) ctx.hats?.sync(ctx);
  const { mflow } = ctx.fe;
  if (mflow) {
    mflow.style.translate = `${f2(ctx.pose.yaw * 30)}px ${f2(ctx.pose.pitch * 22)}px`;
    mflow.style.rotate = `${f2(ctx.pose.roll)}deg`;
  }
}

export interface GfBotAnimatePoseOptions {
  /** En bucle: llega a la pose inicial con resorte y luego arranca el ciclo. */
  repeat?: boolean;
  easing?: string;
}

/**
 * Anima la pose muestreando `fn(u)` → `{yaw, pitch, roll}` para `u` de 0 a 1. Lo que `fn` no diga se
 * queda como está. Una animación por capa del cuerpo; devuelve todas por si el gesto las cancela.
 */
export function animatePose(
  ctx: BotContext,
  fn: (u: number) => GfBotPose,
  duration: number,
  { repeat = false, easing = 'linear' }: GfBotAnimatePoseOptions = {},
): Animation[] {
  const sh = curSh(ctx);
  const N = Math.max(24, Math.round(duration / 18));
  const frames: Keyframe[][] = ctx.poseEls.map(() => []);
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    projectPose(sh, { ...ctx.pose, ...fn(u) }, ctx.feats).forEach((st, k) => frames[k].push({ offset: u, ...st }));
  }
  if (repeat) {
    setPose(ctx, fn(0));
    return ctx.poseEls.map((n, k) =>
      loop(ctx, n, frames[k], { duration, easing, delay: ctx.reduce ? 0 : ctx.spring.duration * 0.6 }),
    );
  }
  return ctx.poseEls.map((n, k) => play(ctx, n, frames[k], { duration, easing }));
}
