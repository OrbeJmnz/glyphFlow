
import { airArc, antenna, holdEyes, isRobot, miniHop, mood, puff, shadowFor, showFor, slow, tremble } from './actions';
import { later, play } from './timing';
import { S, TAU, clamp01, easeInOut } from './math';
import { animatePose } from './pose-motion';
import { blink, eyeSeq, lookTo, swapEyes } from './eyes';
import { flash, lit, sweep, tint } from './light';
import { setMouth } from './mouth';
import { f2, f3 } from '../data/color';
import { type BotContext } from './context';



  export function hop(ctx: BotContext) {
    const d = 720 * slow(ctx); ctx.hooks.act(d);
    play(ctx, ctx.el.hop, [
      { easing:'ease-in-out' },
      { transform:`translateY(0px) ${S(1.14,.84)}`, offset:.2, easing:'cubic-bezier(.2,.7,.3,1)' },
      { transform:`translateY(-54px) ${S(.92,1.1)}`, offset:.5, easing:'cubic-bezier(.6,0,.9,.5)' },
      { transform:`translateY(0px) ${S(1.18,.8)}`, offset:.74, easing:'ease-out' },
      { transform:`translateY(0px) ${S(.96,1.05)}`, offset:.88 },
      { transform:S(1) }
    ], { duration:d });
    shadowFor(ctx, [
      { transform:S(1), opacity:1 }, { transform:S(1.12), offset:.2 },
      { transform:S(.55), opacity:.4, offset:.5 }, { transform:S(1.16), opacity:1, offset:.74 }, { transform:S(1), opacity:1 }
    ], d);
    animatePose(ctx, u => ({ pitch: -.22 * Math.sin(Math.PI * clamp01((u - .2) / .54)) }), d);   // mira hacia arriba en el aire
    // impulso: entrecierra · aire: bien abiertos · caída: se aprietan · y abre
    eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.05,.5), offset:.2 }, { transform:S(1.14,1.24), offset:.48 },
      { transform:S(1.1,.1), offset:.76 }, { transform:S(1,1.08), offset:.9 }, { transform:S(1) }], d);
  }

  export function doubleHop(ctx: BotContext) {
    const d = 1300 * slow(ctx); ctx.hooks.act(d);
    play(ctx, ctx.el.hop, [
      { easing:'ease-in-out' },
      { transform:`translateY(0px) ${S(1.12,.86)}`, offset:.1, easing:'cubic-bezier(.2,.7,.3,1)' },
      { transform:`translateY(-32px) ${S(.95,1.07)}`, offset:.25, easing:'cubic-bezier(.6,0,.9,.5)' },
      { transform:`translateY(0px) ${S(1.16,.82)}`, offset:.4, easing:'cubic-bezier(.2,.7,.3,1)' },
      { transform:`translateY(-66px) ${S(.9,1.13)}`, offset:.6, easing:'cubic-bezier(.6,0,.9,.5)' },
      { transform:`translateY(0px) ${S(1.2,.78)}`, offset:.8, easing:'ease-out' },
      { transform:`translateY(0px) ${S(.95,1.06)}`, offset:.9 },
      { transform:S(1) }
    ], { duration:d });
    shadowFor(ctx, [
      { transform:S(1) }, { transform:S(.75), opacity:.6, offset:.25 }, { transform:S(1.12), opacity:1, offset:.4 },
      { transform:S(.5), opacity:.35, offset:.6 }, { transform:S(1.18), opacity:1, offset:.8 }, { transform:S(1) }
    ], d);
    animatePose(ctx, u => ({ yaw: .35 * Math.sin(TAU * u) * (1 - u), roll: -6 * Math.sin(TAU * u) * (1 - u) }), d);
    eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.05,.55), offset:.1 }, { transform:S(1.1,1.18), offset:.25 },
      { transform:S(1.1,.15), offset:.4 }, { transform:S(1.2,1.3), offset:.6 }, { transform:S(1.1,.1), offset:.8 }, { transform:S(1) }], d);
    later(ctx, () => swapEyes(ctx, 'happy', 800), d * .86, ctx.lookTimers);   // aterriza contento ^ ^
  }

  export function somersault(ctx: BotContext) {   // mortal hacia adelante: la cara se va por abajo y vuelve por arriba
    const d = 1250 * slow(ctx); ctx.hooks.act(d);
    play(ctx, ctx.el.hop, [
      { easing:'ease-in-out' },
      { transform:`translateY(0px) ${S(1.2,.78)}`, offset:.16, easing:'cubic-bezier(.2,.7,.3,1)' },
      { transform:`translateY(-84px) ${S(1)}`, offset:.46, easing:'cubic-bezier(.6,0,.9,.5)' },
      { transform:`translateY(0px) ${S(1.22,.78)}`, offset:.78, easing:'ease-out' },
      { transform:`translateY(0px) ${S(.95,1.06)}`, offset:.9 },
      { transform:S(1) }
    ], { duration:d });
    shadowFor(ctx, [
      { transform:S(1) }, { transform:S(1.15), offset:.16 }, { transform:S(.4), opacity:.3, offset:.46 },
      { transform:S(1.2), opacity:1, offset:.78 }, { transform:S(1) }
    ], d);
    animatePose(ctx, u => ({ pitch: TAU * easeInOut(clamp01((u - .18) / .58)) }), d);
    // al pasar boca abajo le pega la luz rebotada del piso
    tint(ctx, { rb:'#FFFFFF' }); lit(ctx, 'rb', [{ opacity:0 }, { opacity:0, offset:.3 }, { opacity:.35, offset:.47 }, { opacity:0, offset:.66 }, { opacity:0 }], d, { easing:'linear' });
    later(ctx, () => eyeSeq(ctx, [{ transform:S(1,.1) }, { transform:S(1.25,1.3), offset:.4 }, { transform:S(1,1), offset:.7 }, { transform:S(1,.08), offset:.82 }, { transform:S(1) }], 700), d * .72, ctx.lookTimers);
  }

  export function cartwheel(ctx: BotContext) {   // rueda: vuelta en el plano, ojos apretados > <
    const d = 1150 * slow(ctx); ctx.hooks.act(d);
    play(ctx, ctx.el.hop, [
      { easing:'ease-in-out' },
      { transform:`translateY(0px) ${S(1.2,.78)}`, offset:.16, easing:'cubic-bezier(.2,.7,.3,1)' },
      { transform:`translateY(-80px) ${S(.95,1.05)}`, offset:.46, easing:'cubic-bezier(.6,0,.9,.5)' },
      { transform:`translateY(0px) ${S(1.22,.78)}`, offset:.78, easing:'ease-out' },
      { transform:`translateY(0px) ${S(.95,1.06)}`, offset:.9 },
      { transform:S(1) }
    ], { duration:d });
    shadowFor(ctx, [
      { transform:S(1) }, { transform:S(1.15), offset:.16 }, { transform:S(.4), opacity:.3, offset:.46 },
      { transform:S(1.2), opacity:1, offset:.78 }, { transform:S(1) }
    ], d);
    animatePose(ctx, u => ({ roll: 360 * easeInOut(clamp01((u - .2) / .54)) }), d);   // 360° = 0°: termina sin salto
    sweep(ctx, d * .5, { from:20, to:180, peak:.4, delay:d * .2 });
    swapEyes(ctx, 'squeeze', d * .62);
    later(ctx, () => eyeSeq(ctx, [{ transform:S(1,.1) }, { transform:S(1.25,1.3), offset:.4 }, { transform:S(1,1), offset:.7 }, { transform:S(1,.08), offset:.82 }, { transform:S(1) }], 700), d * .6, ctx.lookTimers);
  }

  export function sideHop(ctx: BotContext) {   // brinco a la izquierda y de regreso, girando la cabeza hacia donde va
    const d = 1200 * slow(ctx); ctx.hooks.act(d);
    const H = [
      [0, 0, 0, 1, 1], [.08, 0, 0, 1.12, .86], [.25, -20, -32, .94, 1.08], [.42, -40, 0, 1.14, .84],
      [.52, -40, 0, 1, 1], [.6, -40, 0, 1.12, .86], [.77, -20, -32, .94, 1.08], [.92, 0, 0, 1.14, .84], [1, 0, 0, 1, 1]
    ];
    play(ctx, ctx.el.hop, H.map(([o, x, y, sx, sy]) => ({ offset:o, transform:`translate(${x}px,${y}px) ${S(sx, sy)}`, easing:'ease-in-out' })), { duration:d });
    shadowFor(ctx, H.map(([o, x, y]) => ({ offset:o, transform:`translateX(${x}px) scale(${1 + y / 80})`, opacity:1 + y / 60 })), d);
    animatePose(ctx, u => ({ yaw: -.7 * Math.sin(TAU * u), roll: -5 * Math.sin(TAU * u) }), d);
    eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.12,1.2), offset:.25 }, { transform:S(1.1,.2), offset:.42 }, { transform:S(1), offset:.52 },
      { transform:S(1.12,1.2), offset:.77 }, { transform:S(1.1,.2), offset:.92 }, { transform:S(1) }], d);
  }


  /* ---------- Gestos ---------- */
  export function turn(ctx: BotContext) {   // vuelta completa sobre su eje: la cara se va por un lado y vuelve por el otro
    const d = 1150 * slow(ctx); ctx.hooks.act(d);
    animatePose(ctx, u => ({ yaw: TAU * easeInOut(u) }), d);
    airArc(ctx, 26, d);
    sweep(ctx, d * .5, { from:30, to:175, peak:.35, delay:d * .12 }); sweep(ctx, d * .45, { from:30, to:175, peak:.3, delay:d * .52 });
    later(ctx, () => { eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.15,1.22), offset:.4 }, { transform:S(1) }], 360); later(ctx, () => blink(ctx), 420, ctx.lookTimers); }, d * .88, ctx.lookTimers);
  }

  export function shakeNo(ctx: BotContext) {
    const d = 1300 * slow(ctx); ctx.hooks.act(d);
    animatePose(ctx, u => ({ yaw: .6 * Math.sin(TAU * 3 * u) * (1 - u) }), d);
    eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1,.62), offset:.12 }, { transform:S(1,.62), offset:.85 }, { transform:S(1) }], d);
  }

  export function nodYes(ctx: BotContext) {
    const d = 1200 * slow(ctx); ctx.hooks.act(d);
    animatePose(ctx, u => ({ pitch: .38 * Math.sin(TAU * 2 * u) * (1 - .45 * u) }), d);
    play(ctx, ctx.el.breath, [{}, { transform:S(1.04,.96), offset:.25 }, { transform:S(1), offset:.5 }, { transform:S(1.04,.96), offset:.75 }, { transform:S(1) }], { duration:d, easing:'ease-in-out' });
    later(ctx, () => swapEyes(ctx, 'happy', 700), d * .8, ctx.lookTimers);
  }

  export function wink(ctx: BotContext) {
    ctx.hooks.act(800);
    swapEyes(ctx, isRobot(ctx) ? 'line' : 'happy', 720, [1]); setMouth(ctx, 'smile', 800);
    antenna(ctx, [{ transform:'rotate(0deg)' }, { transform:'rotate(12deg)', offset:.35 }, { transform:'rotate(0deg)' }], 800);
    later(ctx, () => lit(ctx, 'gloss', [{ transform:S(1), opacity:1 }, { transform:S(1.45,1.3), opacity:1, offset:.35 }, { transform:S(1) }], 420), 180, ctx.lookTimers);   // ¡ting!
    animatePose(ctx, u => ({ yaw: .22 * Math.sin(Math.PI * u), roll: -8 * Math.sin(Math.PI * u) }), 800);
    ctx.fe.eyeList[0].animate([{ transform:S(1) }, { transform:S(1.1,1.12), offset:.3 }, { transform:S(1.1,1.12), offset:.7 }, { transform:S(1) }], { duration:800 });
  }

  export function surprise(ctx: BotContext) {
    const d = 1100 * slow(ctx); ctx.hooks.act(d);
    play(ctx, ctx.el.breath, [{}, { transform:S(.86,1.18), offset:.12 }, { transform:S(1.06,.94), offset:.3 }, { transform:S(.98,1.02), offset:.45 }, { transform:S(1) }], { duration:d, easing:'ease-out' });
    animatePose(ctx, u => ({ pitch: -.3 * Math.sin(Math.PI * clamp01(u / .8)) }), d);
    eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.4,1.45), offset:.1 }, { transform:S(1.35,1.4), offset:.7 }, { transform:S(1,.1), offset:.8 }, { transform:S(1) }], d);
    later(ctx, () => miniHop(ctx, 14), 40, ctx.lookTimers);
    flash(ctx, .3, 600);
  }

  export function dance(ctx: BotContext) {
    const d = 2400 * slow(ctx); ctx.hooks.act(d);
    const N = 60, H = [], SH = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N, b = Math.abs(Math.sin(TAU * 2 * u)), k = Math.pow(1 - b, 6);
      H.push({ offset:u, transform:`translateY(${f2(-16 * b)}px) ${S(f3(1 + .1 * k), f3(1 - .1 * k))}` });
      SH.push({ offset:u, transform:S(f3(1 - .28 * b)), opacity:+f3(1 - .35 * b) });
    }
    play(ctx, ctx.el.hop, H, { duration:d }); shadowFor(ctx, SH, d);
    animatePose(ctx, u => ({ yaw: .5 * Math.sin(TAU * 2 * u), roll: 9 * Math.sin(TAU * 2 * u), pitch: -.08 * Math.abs(Math.sin(TAU * 2 * u)) }), d);
    // luces de discoteca: rosa por la izquierda y cian por la derecha, alternando con el ritmo
    tint(ctx, { rl:'#FF5FA8', rr:'#47E4FF' });
    const beat = (fn: (u: number) => number): Keyframe[] => Array.from({ length:61 }, (_, i) => { const u = i / 60; return { offset:u, opacity:+f3(fn(u)) }; });
    lit(ctx, 'rl', beat(u => .8 * Math.max(0, Math.sin(TAU * 2 * u)) * Math.min(1, u * 8, (1 - u) * 8)), d, { easing:'linear' });
    lit(ctx, 'rr', beat(u => .8 * Math.max(0, -Math.sin(TAU * 2 * u)) * Math.min(1, u * 8, (1 - u) * 8)), d, { easing:'linear' });
    swapEyes(ctx, 'happy', d);
  }

  export function dizzy(ctx: BotContext) {
    const d = 2100 * slow(ctx); ctx.hooks.act(d);
    animatePose(ctx, u => {
      const env = Math.sin(Math.PI * u);
      return { yaw: .45 * Math.sin(TAU * 2 * u) * env, pitch: .3 * Math.cos(TAU * 2 * u) * env, roll: 10 * Math.sin(TAU * 3 * u) * env };
    }, d);
    play(ctx, ctx.el.breath, [{}, { transform:S(1.06,.94), offset:.3 }, { transform:S(.96,1.04), offset:.6 }, { transform:S(1) }], { duration:d, easing:'ease-in-out' });
    swapEyes(ctx, 'squeeze', d * .6);
    // el mundo le da vueltas: la luz principal gira alrededor de él
    lit(ctx, 'key', Array.from({ length:49 }, (_, i) => { const u = i / 48, env = Math.sin(Math.PI * u); return { offset:u, transform:`translate(${f2(34 * Math.cos(TAU * 2 * u) * env)}px,${f2(26 * Math.sin(TAU * 2 * u) * env)}px)` }; }), d, { easing:'linear' });
    lit(ctx, 'gloss', Array.from({ length:49 }, (_, i) => { const u = i / 48, env = Math.sin(Math.PI * u); return { offset:u, opacity:+f3(1 - .6 * env) }; }), d, { easing:'linear' });
    later(ctx, () => eyeSeq(ctx, [{ transform:S(1,.2) }, { transform:S(1,.45), offset:.3 }, { transform:S(1,.3), offset:.55 }, { transform:S(1,.5), offset:.8 }, { transform:S(1) }], d * .45), d * .58, ctx.lookTimers);
  }

  export function angry(ctx: BotContext) {   // enojo: cejas hacia adentro, ojos entrecerrados, se pone rojo, tiembla y echa vapor
    const d = 2300 * slow(ctx); ctx.hooks.act(d);
    showFor(ctx, ctx.fe.browA, d); holdEyes(ctx, S(1.05,.58), d);
    animatePose(ctx, u => ({ pitch: .16 * Math.sin(Math.PI * clamp01(u / .9)) }), d);
    play(ctx, ctx.el.breath, [{}, { transform:S(1.07,.95), offset:.15 }, { transform:S(1.05,.96), offset:.5 }, { transform:S(1.08,.94), offset:.7 }, { transform:S(1) }], { duration:d, easing:'ease-in-out' });
    later(ctx, () => tremble(ctx, d * .55, 2.6), d * .15, ctx.lookTimers);
    // el rojo sube como un latido
    mood(ctx, '#FF2E2E', [{ opacity:0 }, { opacity:.32, offset:.15 }, { opacity:.22, offset:.3 }, { opacity:.42, offset:.45 }, { opacity:.26, offset:.6 }, { opacity:.46, offset:.75 }, { opacity:0 }], d);
    const top = ctx.shape.cy - 58;
    [.25, .4, .55, .7].forEach((t, i) => later(ctx, () => { puff(ctx, 62, top + 14); puff(ctx, 138, top + 14); }, d * t + i * 30, ctx.lookTimers));
  }

  export function sad(ctx: BotContext) {   // tristeza: cejas caídas, mira al piso, suspira y le salen lágrimas
    const d = 2800 * slow(ctx); ctx.hooks.act(d);
    showFor(ctx, ctx.fe.browS, d); holdEyes(ctx, S(1,.78), d);
    ctx.fe.eyes.animate([{ transform:'translateY(0)' }, { transform:'translateY(3px)', offset:.15 }, { transform:'translateY(3px)', offset:.85 }, { transform:'translateY(0)' }], { duration:d });
    animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .95)); return { pitch: .32 * e, roll: -5 * e }; }, d);
    play(ctx, ctx.el.breath, [{}, { transform:S(1.02,1.02), offset:.2 }, { transform:S(1.05,.93), offset:.45 }, { transform:S(1.05,.93), offset:.85 }, { transform:S(1) }], { duration:d, easing:'ease-in-out' });
    lit(ctx, 'dim', [{ opacity:0 }, { opacity:.26, offset:.2 }, { opacity:.26, offset:.85 }, { opacity:0 }], d);
    mood(ctx, '#4B7BFF', [{ opacity:0 }, { opacity:.18, offset:.2 }, { opacity:.18, offset:.85 }, { opacity:0 }], d);
    lit(ctx, 'gloss', [{ opacity:1 }, { opacity:.55, offset:.2 }, { opacity:.55, offset:.85 }, { opacity:1 }], d);
    const drop = (tear: Element, delay: number) => tear.animate([{ transform:'translateY(0) scale(.6)', opacity:0 }, { transform:'translateY(2px) scale(1)', opacity:1, offset:.25 }, { transform:'translateY(26px) scale(.9)', opacity:0 }],
      { duration:1000, delay, easing:'cubic-bezier(.5,0,.9,.6)' });
    drop(ctx.fe.tears[0], d * .3); drop(ctx.fe.tears[1], d * .5); drop(ctx.fe.tears[0], d * .66);
  }

  export function sick(ctx: BotContext) {   // malestar: se pone verde, se tambalea, ojos a medio cerrar y suda
    const d = 2800 * slow(ctx); ctx.hooks.act(d);
    holdEyes(ctx, S(1,.5), d);
    ctx.fe.eyes.animate(Array.from({ length:25 }, (_, i) => { const u = i / 24, e = Math.sin(Math.PI * u); return { offset:u, transform:`translate(${f2(3 * Math.sin(TAU * 1.5 * u) * e)}px,${f2(2 * Math.cos(TAU * 1.5 * u) * e)}px)` }; }), { duration:d });
    animatePose(ctx, u => { const e = Math.sin(Math.PI * u); return { roll: 7 * Math.sin(TAU * 1.5 * u) * e, yaw: .18 * Math.sin(TAU * .75 * u) * e, pitch: .12 * e }; }, d);
    play(ctx, ctx.el.breath, [{}, { transform:S(1.04,.95), offset:.2 }, { transform:S(1.1,.9), offset:.58 }, { transform:S(1.03,.96), offset:.66 }, { transform:S(1.1,.9), offset:.78 }, { transform:S(1.03,.96), offset:.86 }, { transform:S(1) }], { duration:d, easing:'ease-in-out' });   // dos "hic"
    mood(ctx, '#62D34E', [{ opacity:0 }, { opacity:.3, offset:.2 }, { opacity:.44, offset:.58 }, { opacity:.3, offset:.7 }, { opacity:.44, offset:.8 }, { opacity:0 }], d);
    lit(ctx, 'dim', [{ opacity:0 }, { opacity:.14, offset:.2 }, { opacity:.14, offset:.85 }, { opacity:0 }], d);
    ctx.fe.sweat.animate([{ transform:'translateY(-4px)', opacity:0 }, { transform:'translateY(0)', opacity:1, offset:.2 }, { transform:'translateY(6px)', opacity:1, offset:.75 }, { transform:'translateY(14px)', opacity:0 }], { duration:d * .7, delay:d * .15 });
  }

  export function disgust(ctx: BotContext) {   // asco: se echa para atrás y voltea la cara, un ojo muy apretado, escalofrío
    const d = 2100 * slow(ctx); ctx.hooks.act(d);
    holdEyes(ctx, S(1,.32), d, [0]); holdEyes(ctx, S(1,.72), d, [1]);
    showFor(ctx, [ctx.fe.browA[1]], d); showFor(ctx, [ctx.fe.browS[0]], d);
    animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .92)); return { yaw: .5 * e, pitch: -.22 * e, roll: 9 * e }; }, d);
    later(ctx, () => play(ctx, ctx.el.breath, Array.from({ length:15 }, (_, i) => ({ offset:i / 14, transform: i === 14 ? S(1) : S(f3(i % 2 ? .95 : 1.03), f3(i % 2 ? 1.04 : .97)) })), { duration:d * .35 }), d * .18, ctx.lookTimers);   // escalofrío
    mood(ctx, '#B5D24A', [{ opacity:0 }, { opacity:.26, offset:.2 }, { opacity:.26, offset:.8 }, { opacity:0 }], d);
    later(ctx, () => miniHop(ctx, 10), d * .1, ctx.lookTimers);
  }

  export function fear(ctx: BotContext) {   // miedo: ojos enormes, se encoge, tiembla y la luz se enfría
    const d = 2400 * slow(ctx); ctx.hooks.act(d);
    showFor(ctx, ctx.fe.browS, d); holdEyes(ctx, S(1.3,1.36), d);
    play(ctx, ctx.el.breath, [{}, { transform:S(.9,.9), offset:.12 }, { transform:S(.9,.9), offset:.85 }, { transform:S(1) }], { duration:d, easing:'ease-out' });
    animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .9)); return { yaw: -.4 * e, pitch: -.1 * e }; }, d);
    later(ctx, () => tremble(ctx, d * .7, 1.6, 34), d * .1, ctx.lookTimers);
    lit(ctx, 'dim', [{ opacity:0 }, { opacity:.22, offset:.12 }, { opacity:.22, offset:.85 }, { opacity:0 }], d);
    mood(ctx, '#5A86FF', [{ opacity:0 }, { opacity:.22, offset:.12 }, { opacity:.12, offset:.3 }, { opacity:.26, offset:.34 }, { opacity:.16, offset:.6 }, { opacity:.24, offset:.64 }, { opacity:0 }], d);
    ctx.fe.sweat.animate([{ transform:'translateY(-4px)', opacity:0 }, { transform:'translateY(0)', opacity:1, offset:.2 }, { transform:'translateY(12px)', opacity:0 }], { duration:d * .6, delay:d * .2 });
  }

  export function bored(ctx: BotContext) {   // aburrido: párpados a media asta, voltea a otro lado y suelta un gran suspiro
    const d = 2800 * slow(ctx); ctx.hooks.act(d);
    holdEyes(ctx, S(1,.42), d);
    animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .92)); return { yaw: .5 * e, pitch: .12 * e, roll: 3 * e }; }, d);
    play(ctx, ctx.el.breath, [{}, { transform:S(.98,1.05), offset:.3 }, { transform:S(1.07,.91), offset:.55 }, { transform:S(1.06,.92), offset:.85 }, { transform:S(1) }], { duration:d, easing:'ease-in-out' });
    later(ctx, () => eyeSeq(ctx, [{ transform:S(1,.42) }, { transform:S(1,.08), offset:.5 }, { transform:S(1,.42) }], 500), d * .6, ctx.lookTimers);   // parpadeo lento
    lit(ctx, 'dim', [{ opacity:0 }, { opacity:.14, offset:.25 }, { opacity:.14, offset:.85 }, { opacity:0 }], d);
    lit(ctx, 'gloss', [{ opacity:1 }, { opacity:.6, offset:.25 }, { opacity:.6, offset:.85 }, { opacity:1 }], d);
  }

  export function lookAround(ctx: BotContext) {
    ctx.hooks.act(1400); lookTo(ctx, -1);
    eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.12,1.18), offset:.2 }, { transform:S(1,1), offset:.45 }, { transform:S(1.12,1.18), offset:.7 }, { transform:S(1) }], 1400);
    later(ctx, () => lookTo(ctx, 1), 700, ctx.lookTimers); later(ctx, () => { lookTo(ctx, 0); blink(ctx); }, 1400, ctx.lookTimers);
  }
