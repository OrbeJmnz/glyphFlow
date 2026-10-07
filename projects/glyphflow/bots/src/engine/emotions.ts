
import { defaultMouth, setMouth } from './mouth';
import { animatePose, setPose } from './pose-motion';
import { baseFor, baseRoll } from './base-pose';
import { blink, swapEyes } from './eyes';
import { expr } from './kawaii';
import { SPARK_COLORS, airArc, antTip, antWiggle, antenna, flushCheeks, glow, headTop, holdEyes, isRobot, miniHop, pick, slow, spark } from './actions';
import { S, TAU, clamp01 } from './math';
import { later, play } from './timing';
import { flash } from './light';
import { type BotContext } from './context';




  export function neutral(ctx: BotContext) {   // neutral / atento
    ctx.hooks.act(900); setMouth(ctx, defaultMouth(ctx, 'idle')); setPose(ctx, baseFor(ctx, ctx.state)); blink(ctx);
    antenna(ctx, [{ transform:'rotate(0deg)' }, { transform:'rotate(-5deg)', offset:.4 }, { transform:'rotate(0deg)' }], 600);
  }

  export function happy(ctx: BotContext) {
    ctx.hooks.act(1300); glow(ctx, '#FFC94D', .2, 1300); swapEyes(ctx, 'happy', 1200); setMouth(ctx, 'wide', 1200); flushCheeks(ctx, 1200);
    animatePose(ctx, u => ({ roll: baseRoll(ctx) + 5 * Math.sin(TAU * u) * (1 - u), pitch: -.1 * Math.sin(Math.PI * u) }), 1200);
    play(ctx, ctx.el.breath, [{}, { transform:S(1.05,.95), offset:.3 }, { transform:S(.98,1.02), offset:.6 }, { transform:S(1) }], { duration:800 });
    antWiggle(ctx, 1200, 12);
  }

  export function excited(ctx: BotContext) {
    ctx.hooks.act(1500); glow(ctx, '#FF7FD0', .24, 1500); holdEyes(ctx, S(1.18,1.22), 1400); setMouth(ctx, 'open', 1400); flushCheeks(ctx, 1400);
    miniHop(ctx, 18); later(ctx, () => miniHop(ctx, 14), 420, ctx.lookTimers); later(ctx, () => miniHop(ctx, 10), 820, ctx.lookTimers);
    antWiggle(ctx, 1400, 20, 160); antTip(ctx, 500); flash(ctx, .18, 700);
  }

  export function curious(ctx: BotContext) {   // ladea la cabeza, un ojo más abierto que el otro, boquita en "o"
    ctx.hooks.act(1700); glow(ctx, '#7FE0FF', .16, 1700); holdEyes(ctx, S(1.12,1.14), 1600, [0]);
    if (isRobot(ctx)) swapEyes(ctx, 'half', 1600, [1]); else holdEyes(ctx, S(1,.78), 1600, [1]);
    setMouth(ctx, 'o', 1600);
    animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .9)); return { roll: baseRoll(ctx) + 11 * e, yaw: .28 * e, pitch: -.08 * e }; }, 1700);
    antenna(ctx, [{ transform:'rotate(0deg)' }, { transform:'rotate(22deg)', offset:.25 }, { transform:'rotate(22deg)', offset:.8 }, { transform:'rotate(0deg)' }], 1700);
  }

  export function thinking(ctx: BotContext) {
    ctx.hooks.act(2000); glow(ctx, '#9D8CFF', .16, 2000);
    ctx.fe.eyes.animate([{ transform:'translate(0,0)' }, { transform:'translate(-3px,-4px)', offset:.15 }, { transform:'translate(-3px,-4px)', offset:.85 }, { transform:'translate(0,0)' }], { duration:1900 });
    holdEyes(ctx, S(1,.86), 1900); setMouth(ctx, 'flat', 1900);
    animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .92)); return { roll: baseRoll(ctx) - 7 * e, pitch: -.2 * e, yaw: -.2 * e }; }, 1900);
    antenna(ctx, [{ transform:'rotate(0deg)' }, { transform:'rotate(-14deg)', offset:.25 }, { transform:'rotate(-14deg)', offset:.85 }, { transform:'rotate(0deg)' }], 1900);
    [300, 900, 1500].forEach(t => later(ctx, () => antTip(ctx, 420, 1.4), t, ctx.lookTimers));
    later(ctx, () => blink(ctx), 1000, ctx.lookTimers);
  }

  export function surprised(ctx: BotContext) {
    ctx.hooks.act(1300); ctx.hats?.kick(ctx, 3.4); glow(ctx, '#FFE38A', .22, 1100);
    if (isRobot(ctx)) swapEyes(ctx, 'ring', 1200); else holdEyes(ctx, S(1.28,1.34), 1200);
    setMouth(ctx, 'o', 1200);
    play(ctx, ctx.el.breath, [{}, { transform:S(.9,1.14), offset:.15 }, { transform:S(1.03,.97), offset:.4 }, { transform:S(1) }], { duration:900, easing:'ease-out' });
    animatePose(ctx, u => ({ pitch: -.16 * Math.sin(Math.PI * u) }), 1100);
    antenna(ctx, [{ transform:'rotate(0deg)' }, { transform:'rotate(-4deg) scaleY(1.12)', offset:.15 }, { transform:'rotate(0deg)' }], 900); antTip(ctx, 600, 1.9);
    flash(ctx, .2, 500);
  }


  export function celebrate(ctx: BotContext) {
    ctx.hats?.pulse(ctx); glow(ctx, pick(['#FF8AD8', '#FFD35A', '#8CE8FF']), .26, 1800);
    ctx.hooks.act(1900); swapEyes(ctx, 'happy', 1800); setMouth(ctx, 'open', 1800); flushCheeks(ctx, 1800);
    airArc(ctx, 42, 900); later(ctx, () => miniHop(ctx, 16), 950, ctx.lookTimers);
    const top = headTop(ctx); for (let i = 0; i < 10; i++) later(ctx, () => spark(ctx, top, true), 260 + i * 20, ctx.lookTimers);
    flash(ctx, .3, 900, pick(SPARK_COLORS));
    animatePose(ctx, u => ({ roll: baseRoll(ctx) + 8 * Math.sin(TAU * 2 * u) * (1 - u) }), 1800);
    antWiggle(ctx, 1800, 22, 180); antTip(ctx, 700, 1.8);
  }


  export function cheer(ctx: BotContext) {   // contento: se infla, ojos ^ ^ y rebota dos veces
    ctx.hooks.act(1300); glow(ctx, '#FFD27A', .22, 1300);
    swapEyes(ctx, 'happy', 1300);
    flash(ctx, .22, 1100, '#FFD27A');   // se pone "radiante"
    play(ctx, ctx.el.breath, [{}, { transform:S(1.08,.92), offset:.2 }, { transform:S(.95,1.06), offset:.4 }, { transform:S(1.05,.95), offset:.6 }, { transform:S(1) }],
      { duration:900 * slow(ctx), easing:'ease-in-out' });
    animatePose(ctx, u => ({ roll: 7 * Math.sin(TAU * 1.5 * u) * (1 - u), pitch: -.15 * Math.sin(Math.PI * u) }), 1300);
    later(ctx, () => miniHop(ctx, 18), 320, ctx.lookTimers);
    later(ctx, () => miniHop(ctx, 12), 820, ctx.lookTimers);
  }

  export function wave(ctx: BotContext) { ctx.hooks.act(1500); expr(ctx, 'happy', 1500); animatePose(ctx, u => ({ roll: baseRoll(ctx) + 7 * Math.sin(TAU * 1.5 * u) * (1 - u) }), 1400); if (ctx.shape.id !== 'octopus') miniHop(ctx, 8); }