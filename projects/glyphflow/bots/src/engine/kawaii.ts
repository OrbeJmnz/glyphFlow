
import { KAWAII, kEye, kMouth } from '../data/kawaii';
import { glow, headTop, isRobot, miniHop, mk, mood, showFor, spark, tremble } from './actions';
import { animatePose, setPose } from './pose-motion';
import { later, play } from './timing';
import { S, TAU, clamp01 } from './math';
import { blink, eyeSeq } from './eyes';
import { parm } from './octopus-arms';
import { baseRoll } from './base-pose';
import { f2 } from '../data/color';
import type { GfKawaiiExpression, GfKawaiiId } from '../data/kawaii';
import { type BotContext, type GfBotCue } from './context';



  export const K_HIDE = '.eyes, .mouths, .cheek, .mcheek, .mcheek2, .gcheek, .fcheek';

  export function kDraw(ctx: BotContext, key: GfKawaiiId) {
    const E: GfKawaiiExpression = KAWAII[key], L = ctx.q('.xkL'), R = ctx.q('.xkR')!, M = ctx.q('.xkM')!;
    if (!E || !L) return null;
    const sh = ctx.shape, fy = sh.faceY, dx = sh.eyeDx ?? 20, h = sh.eyeH ?? 16, w = h * .6, my = fy + (sh.mouthDy ?? 15) + 1.9, k = h / 16.5;
    const ink = getComputedStyle(ctx.q('.eyeball') || ctx.svg).fill || '#282653';
    const fc = ctx.q('.fcheek'), cheek = ctx.svg.dataset['face'] === 'ghost' && fc && getComputedStyle(fc).display !== 'none' ? getComputedStyle(fc).fill : ctx.svg.dataset['mvar'] === 'f8' ? '' : '#F5AED6';
    L.innerHTML = kEye(E.L, 100 - dx, fy, w, h, .5, -1, ink, ctx.id, cheek);
    R.innerHTML = kEye(E.R || E.L, 100 + dx, fy, w, h, .5, 1, ink, ctx.id, cheek);
    M.innerHTML = kMouth(E.M, 100, my, k, ink);
    return [L, R, M];
  }

  export function kClear(ctx: BotContext) { ctx.exprAnims.forEach(a => a.cancel()); ctx.exprAnims = []; }

  // quitar la cara kawaii suave (vuelve la cara normal con un fundido corto)
  export function kRelease(ctx: BotContext) {
    clearTimeout(ctx.kTmpT ?? undefined); ctx.kHeldKey = null;
    if (!ctx.exprAnims.length) return;
    kClear(ctx);
    const parts = [...ctx.svg.querySelectorAll('.xk')], base = [...ctx.svg.querySelectorAll(K_HIDE)];
    parts.forEach(g => g.animate([{ opacity:1 }, { opacity:0 }], { duration:200, easing:'ease-out' }));
    base.forEach(g => g.animate([{ opacity:0 }, { opacity:1 }], { duration:220, easing:'ease-out' }));
  }

  export function expr(ctx: BotContext, key: GfKawaiiId, ms: number | null = 1500, auto = false, fromSeq = false) {
    if (isRobot(ctx)) return;
    if (!auto && !fromSeq) ctx.kSeqId++;   // una cara nueva pedida a propósito cancela lo que quedaba pendiente de la secuencia anterior
    if (!auto && ms) ctx.kLockUntil = Math.max(ctx.kLockUntil, performance.now() + ms - 150);   // una cara pedida a propósito no la pisa el puente
    if (ms != null) ctx.kHeldKey = null;
    clearTimeout(ctx.kTmpT ?? undefined);
    const was = ctx.exprAnims.length > 0; kClear(ctx);
    const parts = kDraw(ctx, key); if (!parts) return;
    ctx.svg.dataset['kface'] = key;   // para pruebas: qué cara kawaii está puesta
    const base = [...ctx.svg.querySelectorAll(K_HIDE)];
    if (ms == null) {   // cara fija de reposo: entra con un pop y se queda
      const inF = was ? [{ opacity:.2, transform:'scale(.9)' }, { opacity:1, transform:'scale(1.05)', offset:.6 }, { opacity:1, transform:'scale(1)' }] : [{ opacity:0, transform:'scale(.7)' }, { opacity:1, transform:'scale(1.08)', offset:.6 }, { opacity:1, transform:'scale(1)' }];
      parts.forEach(g => ctx.exprAnims.push(g.animate(inF, { duration:260, easing:'ease-out', fill:'forwards' })));
      base.forEach(g => ctx.exprAnims.push(g.animate([{ opacity: was ? 0 : 1 }, { opacity:0 }], { duration:160, fill:'forwards' })));
      return;
    }
    const f = Math.min(.14, 120 / ms), idleAfter = kIdleOn(ctx) && !!ctx.kIdleKey;
    const show = [{ opacity:0, transform:'scale(.7)' }, { opacity:1, transform:'scale(1.08)', offset:f }, { opacity:1, transform:'scale(1)', offset:f * 1.8 }, { opacity:1, transform:'scale(1)', offset:1 - f }, { opacity: idleAfter ? 1 : 0, transform:'scale(1)' }];
    const hide = [{ opacity: was ? 0 : 1 }, { opacity:0, offset:f * .8 }, { opacity:0, offset:1 - f }, { opacity: idleAfter ? 0 : 1 }];
    parts.forEach(g => ctx.exprAnims.push(g.animate(show, { duration:ms, easing:'ease-out', fill:'forwards' })));
    base.forEach(g => ctx.exprAnims.push(g.animate(hide, { duration:ms, fill:'forwards' })));
    ctx.kTmpT = setTimeout(() => { if (ctx.dragging) return; if (kIdleOn(ctx) && ctx.kIdleKey) { expr(ctx, ctx.kIdleKey, null, true); } else kClear(ctx); if (kIdleOn(ctx)) { clearTimeout(ctx.kIdleT ?? undefined); ctx.kIdleT = setTimeout(() => ctx.hooks.kawaiiIdleTick(), 2600 + Math.random() * 2400); } }, ms);
  }

  export const kIdleOn = (ctx: BotContext) => !!ctx.opts.wander && ctx.state === 'idle' && !isRobot(ctx);

  export function kWake(ctx: BotContext) {
    if (!ctx.opts.wander || isRobot(ctx) || ctx.reduce) return;
    const v: string = ctx.kWakeForce || ['stretch', 'rubEyes', 'nodding', 'stretch', 'startled'][Math.floor(Math.random() * 5)]; ctx.kWakeForce = null;
    const tilt = (a: number, ms: number) => animatePose(ctx, u => ({ roll: a * Math.sin(Math.PI * u) }), ms);
    type WakeStep = [GfKawaiiId, number, (() => void)?];
    const SEQ = ({
      stretch: [   // bostezo enorme estirándose, se queda medio dormido, parpadea y se alegra
        ['yawn', 1500, () => play(ctx, ctx.el.breath, [{}, { transform:S(.92,1.14), offset:.4 }, { transform:S(.92,1.14), offset:.7 }, { transform:S(1.05,.95), offset:.88 }, { transform:S(1) }], { duration:1500, easing:'ease-in-out' })],
        ['drowsy', 1100, () => { later(ctx, () => blink(ctx), 350, ctx.lookTimers); later(ctx, () => blink(ctx), 750, ctx.lookTimers); tilt(-5, 1100); }],
        ['happy', 900, () => miniHop(ctx, 10)] ],
      rubEyes: [  // se talla los ojos (> <) meneándose, parpadea lento y sonríe
        ['tantrum', 1000, () => { animatePose(ctx, u => ({ roll: 6 * Math.sin(TAU * 3 * u) * (1 - u * .5) }), 1000); tremble(ctx, 600, 1); }],
        ['drowsy', 1000, () => later(ctx, () => eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1,.1), offset:.5 }, { transform:S(1) }], 520), 300, ctx.lookTimers)],
        ['content', 900, () => tilt(7, 900)] ],
      nodding: [   // cabecea medio dormido… ¡se da cuenta! y se alegra
        ['drowsy', 1900, () => animatePose(ctx, u => ({ pitch: .2 * Math.max(0, Math.sin(TAU * 1.5 * u)) }), 1900)],
        ['amazed', 550, () => { miniHop(ctx, 14); setPose(ctx, { pitch:0 }); }],
        ['embarrassed', 800], ['happy', 800] ],
      startled: [   // lo despertaron de golpe: brinca asustado, suda y luego se apena
        ['amazed', 750, () => { miniHop(ctx, 24); showFor(ctx, [ctx.fe.sweat], 1200); }],
        ['awkward', 900, () => tilt(-6, 900)],
        ['tender', 900] ]
    } as Record<string, WakeStep[]>)[v]!;
    let t = 250;
    SEQ.forEach(([k, ms, fx]) => { later(ctx, () => { if (ctx.state !== 'idle' || ctx.dragging) return; expr(ctx, k, ms + 90); fx?.(); }, t, ctx.lookTimers); t += ms; });
    ctx.kLockUntil = performance.now() + t + 200; ctx.kIdleKey = null;
    ctx.svg.dataset['wake'] = v;   // para pruebas
  }

  export function kPick(ctx: BotContext) { if (!ctx.kBag.length) ctx.kBag = K_IDLE.slice().sort(() => Math.random() - .5); if (ctx.kBag[ctx.kBag.length - 1] === ctx.kIdleKey) ctx.kBag.unshift(ctx.kBag.pop()!); return ctx.kIdleKey = ctx.kBag.pop()!; }

  export function kIdleTick(ctx: BotContext) {
    clearTimeout(ctx.kIdleT ?? undefined);
    if (!kIdleOn(ctx)) { ctx.kIdleKey = null; kRelease(ctx); return; }
    let next = 3200 + Math.random() * 2600;
    if (!ctx.paused && !ctx.dragging && performance.now() > ctx.kLockUntil) {
      // no siempre kawaii: la cara normal es la «de fondo» y las kawaii van y vienen
      const toKawaii = ctx.kIdleKey ? Math.random() < .3 : Math.random() < .6;
      if (toKawaii) { const k = kPick(ctx); expr(ctx, k, null, true); kAccent(ctx, k); }
      else { ctx.kIdleKey = null; kRelease(ctx); next = 3500 + Math.random() * 3500; }
    }
    ctx.kIdleT = setTimeout(() => ctx.hooks.kawaiiIdleTick(), next);
  }

  export function kCue(ctx: BotContext, c: GfBotCue) {
    if (!kIdleOn(ctx) && !ctx.exprAnims.length) return;
    if (!ctx.kQ) { ctx.kQ = {}; setTimeout(() => kFlush(ctx), 0); }
    const q = ctx.kQ as Record<string, unknown>;
    for (const k in c) { const v = (c as Record<string, unknown>)[k]; if (v != null && v !== false) q[k] = k === 'ms' ? Math.max(ctx.kQ.ms || 0, c.ms ?? 0) : v; }
  }

  export function kFlush(ctx: BotContext) {
    const q = ctx.kQ; ctx.kQ = null;
    if (!q || performance.now() < ctx.kLockUntil || ctx.dragging) return;
    // el gesto trae su propia cara (ojos en X, guiño, cantar, cejas…): la kawaii se hace a un lado y se ve el gesto original
    ctx.kIdleKey = null; kRelease(ctx);
    if (kIdleOn(ctx)) { clearTimeout(ctx.kIdleT ?? undefined); ctx.kIdleT = setTimeout(() => ctx.hooks.kawaiiIdleTick(), (q.ms || 900) + 2500 + Math.random() * 2500); }
  }

  // cara fija mientras dure algo (arrastre): solo se redibuja si cambia
  export function kHold(ctx: BotContext, key: GfKawaiiId | null) { if (key === ctx.kHeldKey || isRobot(ctx)) return; ctx.kHeldKey = key; if (key) expr(ctx, key, null, true); }

  // en reposo solo caras tranquilas o alegres; las tristes/enojadas quedan para sus gestos
  export const K_IDLE: readonly GfKawaiiId[] = ['happy', 'content', 'satisfied', 'tender', 'cheeky', 'smug', 'shy', 'whistling', 'serious', 'uneasy', 'kiss', 'wink', 'tongue', 'hopeful', 'inLove', 'playful', 'embarrassed'];

  // cada cara de reposo a veces trae un detalle chiquito (para que se sienta vivo, sin volverse un show)
  export function kAccent(ctx: BotContext, key: string) {
    if (ctx.reduce || Math.random() > .45) return;
    if (ctx.shape.id === 'octopus' && ['happy', 'content', 'hopeful', 'wink'].includes(key)) return parm(ctx, 'R', [0, -36, -22, -38, -24, 0], 1300);   // el pulpo saluda
    const tilt = (a: number, ms = 1400) => animatePose(ctx, u => ({ roll: baseRoll(ctx) + a * Math.sin(Math.PI * u) }), ms);
    ({ inLove: () => floaty(ctx, '♥', 2, '#FF6FAE', 11), kiss: () => floaty(ctx, '♥', 1, '#FF6FAE', 12), whistling: () => floaty(ctx, '♪', 2, getComputedStyle(ctx.q('.eyeball') || ctx.svg).fill, 12),
       happy: () => miniHop(ctx, 7), hopeful: () => miniHop(ctx, 9), playful: () => { miniHop(ctx, 6); tilt(-7, 900); }, tender: () => tilt(9), shy: () => tilt(-8),
       cheeky: () => tilt(5, 1000), smug: () => play(ctx, ctx.el.breath, [{}, { transform:S(.97,1.04), offset:.35 }, { transform:S(1) }], { duration:900 }),
       tongue: () => tilt(-6, 900), wink: () => tilt(6, 700), embarrassed: () => tilt(4, 1200), uneasy: () => tilt(3, 800) }[key] || (() => undefined))();
  }

  export function floaty(ctx: BotContext, txt: string, n: number, color: string, size = 12) {   // corazoncitos o notas que suben desde la cabeza
    const top = headTop(ctx);
    for (let i = 0; i < n; i++) later(ctx, () => {
      const x = 76 + Math.random() * 48, t = mk(ctx, 'text', { x, y:top - 2, 'font-size':size, fill:color, 'text-anchor':'middle', 'font-weight':700 }, ctx.el.z, txt);
      t.animate([{ transform:'translate(0,0) scale(.4)', opacity:0 }, { transform:`translate(${f2((Math.random() - .5) * 12)}px,-10px) scale(1)`, opacity:1, offset:.2 }, { transform:`translate(${f2((Math.random() - .5) * 26)}px,-44px) scale(1.1)`, opacity:0 }], { duration:1400, easing:'ease-out' }).onfinish = () => t.remove();
    }, i * 260, ctx.lookTimers);
  }

  export const sway = (ctx: BotContext, amp: number, n: number, ms: number) => animatePose(ctx, u => ({ roll: baseRoll(ctx) + amp * Math.sin(TAU * n * u) * (1 - u * .6) }), ms);

  export const K = {
    naughty(ctx: BotContext) { ctx.hooks.act(1500, true); expr(ctx, 'naughty', 1500); animatePose(ctx, u => ({ yaw: .25 * Math.sin(TAU * 1.5 * u), roll: baseRoll(ctx) - 5 * Math.sin(TAU * 1.5 * u) }), 1300); later(ctx, () => miniHop(ctx, 8), 700, ctx.lookTimers); },
    shy(ctx: BotContext) { ctx.hooks.act(1900, true); expr(ctx, 'shy', 1900); animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .9)); return { pitch: .16 * e, yaw: -.28 * e, roll: baseRoll(ctx) - 7 * e }; }, 1900); },
    inLove(ctx: BotContext) { ctx.hooks.act(2000, true); expr(ctx, 'inLove', 2000); floaty(ctx, '♥', 4, '#FF6FAE', 13); later(ctx, () => miniHop(ctx, 10), 200, ctx.lookTimers); later(ctx, () => miniHop(ctx, 8), 800, ctx.lookTimers); sway(ctx, 6, 1.5, 1800); },
    playful(ctx: BotContext) { ctx.hooks.act(1700, true); expr(ctx, 'playful', 1700); sway(ctx, 9, 2, 1600); later(ctx, () => miniHop(ctx, 12), 400, ctx.lookTimers); },
    kiss(ctx: BotContext) { ctx.hooks.act(1500, true); expr(ctx, 'kiss', 1500); animatePose(ctx, u => ({ pitch: -.12 * Math.sin(Math.PI * u), roll: baseRoll(ctx) + 6 * Math.sin(Math.PI * u) }), 1400); later(ctx, () => floaty(ctx, '♥', 1, '#FF6FAE', 15), 500, ctx.lookTimers); },
    touched(ctx: BotContext) { ctx.hooks.act(2100, true); expr(ctx, 'touched', 2100); sway(ctx, 4, 1, 2000); play(ctx, ctx.el.breath, [{}, { transform:S(1.03,.97), offset:.3 }, { transform:S(.99,1.01), offset:.55 }, { transform:S(1.02,.98), offset:.75 }, { transform:S(1) }], { duration:1600 }); },
    awkward(ctx: BotContext) { ctx.hooks.act(1700, true); expr(ctx, 'awkward', 1700); showFor(ctx, [ctx.fe.sweat], 1600); animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .9)); return { yaw: .3 * e, roll: baseRoll(ctx) + 3 * e }; }, 1700); play(ctx, ctx.el.breath, [{}, { transform:S(.96,1.02), offset:.2 }, { transform:S(.96,1.02), offset:.8 }, { transform:S(1) }], { duration:1600 }); },
    tender(ctx: BotContext) { ctx.hooks.act(1600, true); expr(ctx, 'tender', 1600); animatePose(ctx, u => ({ roll: baseRoll(ctx) + 11 * Math.sin(Math.PI * clamp01(u / .9)) }), 1600); const top = headTop(ctx); for (let i = 0; i < 3; i++) later(ctx, () => spark(ctx, top), 200 + i * 220, ctx.lookTimers); },
    tongue(ctx: BotContext) { ctx.hooks.act(1500, true); expr(ctx, 'tongue', 1500); animatePose(ctx, u => ({ roll: baseRoll(ctx) - 9 * Math.sin(Math.PI * clamp01(u / .9)), yaw: -.15 * Math.sin(Math.PI * u) }), 1500); later(ctx, () => miniHop(ctx, 8), 300, ctx.lookTimers); },
    tantrum(ctx: BotContext) { ctx.hooks.act(1900, true); expr(ctx, 'tantrum', 1900); tremble(ctx, 900, 2.4); [0, 380, 760].forEach(t => later(ctx, () => miniHop(ctx, 6), t, ctx.lookTimers)); mood(ctx, '#FF5A5A', [{ opacity:0 }, { opacity:.18, offset:.2 }, { opacity:.1, offset:.8 }, { opacity:0 }], 1900); },
    whistling(ctx: BotContext) { ctx.hooks.act(2200, true); expr(ctx, 'whistling', 2200); floaty(ctx, '♪', 3, getComputedStyle(ctx.q('.eyeball') || ctx.svg).fill || '#433CBB', 13); animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .92)); return { yaw: .3 * e, pitch: -.12 * e, roll: baseRoll(ctx) + 4 * Math.sin(TAU * 2 * u) }; }, 2200); },
    worried(ctx: BotContext) { ctx.hooks.act(1800, true); expr(ctx, 'worried', 1800); showFor(ctx, [ctx.fe.sweat], 1700); tremble(ctx, 700, 1.2, 60); glow(ctx, '#8FA8FF', .14, 1800); },
    resigned(ctx: BotContext) { ctx.hooks.act(2100, true); expr(ctx, 'resigned', 2100); play(ctx, ctx.el.breath, [{}, { transform:S(1.04,.93), offset:.35 }, { transform:S(1.04,.93), offset:.8 }, { transform:S(1) }], { duration:2000, easing:'ease-in-out' }); animatePose(ctx, u => ({ pitch: .14 * Math.sin(Math.PI * clamp01(u / .9)) }), 2000); },
    serious(ctx: BotContext) { ctx.hooks.act(1500, true); expr(ctx, 'serious', 1500); setPose(ctx, { yaw:0, pitch:0, roll:0 }); play(ctx, ctx.el.breath, [{}, { transform:S(.98,1.03), offset:.25 }, { transform:S(1) }], { duration:600 }); },
    satisfied(ctx: BotContext) { ctx.hooks.act(1500, true); expr(ctx, 'satisfied', 1500); play(ctx, ctx.el.breath, [{}, { transform:S(1.05,.95), offset:.3 }, { transform:S(1) }], { duration:900 }); sway(ctx, 4, 1, 1400); },
    crying(ctx: BotContext) { ctx.hooks.act(2300, true); expr(ctx, 'crying', 2300); tremble(ctx, 1600, 1.1, 90); glow(ctx, '#6F9BFF', .18, 2300); }
  };

  /** Conecta las caras kawaii a un bot: ojos y boca avisan con `ctx.hooks.cue`, y la máquina de estados las despierta. */
  export function installKawaiiHooks(ctx: BotContext): void {
    ctx.hooks.cue = (c) => kCue(ctx, c);
    ctx.hooks.kawaiiIdleTick = () => kIdleTick(ctx);
    ctx.hooks.kawaiiWake = () => kWake(ctx);
    ctx.hooks.kawaiiRelease = () => kRelease(ctx);
  }
