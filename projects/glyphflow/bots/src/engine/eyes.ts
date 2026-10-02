import type { BotContext, BotFaceElements } from './context';
import { S } from './math';
import { setPose } from './pose-motion';

/**
 * Ojos y mirada. Los ojos son `.eye` (el abierto) más una capa de párpados/formas alternas que se
 * cruzan en fundido (`happy` ^ ^, `squeeze` > <, `half`…); los gestos los pintan con `swapEyes`.
 */

/** Las formas alternas de ojo que `swapEyes` puede mostrar. */
export type GfBotEyeAlt = keyof Pick<
  BotFaceElements,
  'closed' | 'happy' | 'squeeze' | 'line' | 'half' | 'ring' | 'cross'
>;

/** Ojos de las caras kawaii (izquierdo = 0, derecho = 1). */
export const kEyes = (ctx: BotContext, which: readonly number[] = [0, 1]): SVGElement[] =>
  which.flatMap((i) => ctx.qa(i ? '.xkR .kE' : '.xkL .kE'));

/** Anima los ojos abiertos Y los kawaii a la vez: un gesto no tiene que saber cuál cara está puesta. */
export function eyeSeq(ctx: BotContext, frames: Keyframe[], duration: number): void {
  [...ctx.fe.eyeList, ...kEyes(ctx)].forEach((e) => e.animate(frames, { duration, easing: 'ease-in-out' }));
}

export const blink = (ctx: BotContext): void =>
  eyeSeq(ctx, [{ transform: S(1) }, { transform: S(1, 0.08), offset: 0.45 }, { transform: S(1) }], 170);

/** Cambia a otra forma de ojo (`happy`, `squeeze`…) durante `ms` y regresa. `which` = qué ojos. */
export function swapEyes(ctx: BotContext, alt: GfBotEyeAlt, ms: number, which: readonly number[] = [0, 1]): void {
  const fade = Math.min(0.12, 90 / ms);
  const hide: Keyframe[] = [{ opacity: 1 }, { opacity: 0, offset: fade }, { opacity: 0, offset: 1 - fade }, { opacity: 1 }];
  const show: Keyframe[] = [{ opacity: 0 }, { opacity: 1, offset: fade }, { opacity: 1, offset: 1 - fade }, { opacity: 0 }];
  which.forEach((i) => {
    ctx.fe.eyeList[i].animate(hide, { duration: ms });
    ctx.fe[alt][i].animate(show, { duration: ms });
  });
  ctx.hooks.cue({ eye: alt, which: [...which], ms });
}

/** Ojos abiertos o cerrados (dormido). */
export function setOpen(ctx: BotContext, open: boolean): void {
  ctx.fe.eyeList.forEach((e) => (e.style.opacity = open ? '1' : '0'));
  ctx.fe.closed.forEach((c) => c.setAttribute('opacity', open ? '0' : '1'));
}

/** Dormido: entreabre los ojos y los vuelve a cerrar. */
export function peek(ctx: BotContext): void {
  const f = { duration: 1100, easing: 'ease-in-out' };
  ctx.fe.closed.forEach((c) =>
    c.animate([{ opacity: 1 }, { opacity: 0, offset: 0.12 }, { opacity: 0, offset: 0.82 }, { opacity: 1 }], f),
  );
  ctx.fe.eyeList.forEach((e) =>
    e.animate([{ opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 1, offset: 0.82 }, { opacity: 0 }], f),
  );
  eyeSeq(
    ctx,
    [
      { transform: S(1, 0.1) },
      { transform: S(1, 0.45), offset: 0.3 },
      { transform: S(1, 0.5), offset: 0.55 },
      { transform: S(1, 0.2), offset: 0.7 },
      { transform: S(1, 0.45), offset: 0.78 },
      { transform: S(1, 0.1) },
    ],
    1100,
  );
}

/**
 * Parpadeo espontáneo: cada 2.2–5.8 s, y a veces uno doble. Dormido, asoma de vez en cuando.
 * Devuelve la función que lo detiene: el prototipo lo dejaba corriendo para siempre, pero un
 * componente de Angular se destruye y no puede dejar timers sueltos.
 */
export function startBlinkLoop(ctx: BotContext): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let second: ReturnType<typeof setTimeout> | null = null;
  let stopped = false;
  const tick = (): void => {
    timer = setTimeout(() => {
      if (stopped) return;
      if (!ctx.reduce && !ctx.paused) {
        if (ctx.state === 'sleeping') {
          if (Math.random() < 0.22) peek(ctx);
        } else {
          blink(ctx);
          if (Math.random() < 0.25) second = setTimeout(() => blink(ctx), 240);
        }
      }
      tick();
    }, 2200 + Math.random() * 3600);
  };
  tick();
  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
    if (second) clearTimeout(second);
    timer = second = null;
  };
}

/** Mirada = un giro de cabeza en 3D: `dx`/`dy` van de −1 a 1. */
export const lookTo = (ctx: BotContext, dx: number, dy = 0): void =>
  setPose(ctx, { yaw: dx * 0.6, pitch: dy * 0.32 });

export function clearLook(ctx: BotContext): void {
  ctx.lookTimers.forEach(clearTimeout);
  ctx.lookTimers = [];
}

/** Sigue un punto con la cabeza (el mouse); dormido no. */
export function gazeAt(ctx: BotContext, dx: number, dy: number): void {
  if (ctx.state !== 'sleeping') setPose(ctx, { yaw: dx * 0.5, pitch: dy * 0.35 });
}
