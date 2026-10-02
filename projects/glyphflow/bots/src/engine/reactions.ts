
import { expr, floaty } from './kawaii';
import { headTop, holdEyes, miniHop, mk, mood, showFor, slow, spark, tremble } from './actions';
import { f2, f3 } from '../data/color';
import { S, TAU, clamp01, easeInOut } from './math';
import { play } from './timing';
import { animatePose } from './pose-motion';
import { baseRoll } from './base-pose';
import { wake } from './state';
import { hatKick } from './physics';
import { angry } from './gestures';
import { lit } from './light';
import type { GfKawaiiId } from '../data/kawaii';
import { type BotContext } from './context';




  // secuencia de caras kawaii una tras otra: [[cara, ms], …] → devuelve cuánto dura
  export function kSeq(ctx: BotContext, list: [GfKawaiiId, number][], t0 = 0) {
    let t = t0; const id = ++ctx.kSeqId;
    list.forEach(([k, ms], i) => { const go = () => { if (!ctx.dragging && id === ctx.kSeqId) expr(ctx, k, ms + (i < list.length - 1 ? 80 : 0), false, true); }; if (t) setTimeout(go, t); else go(); t += ms; });
    return t;
  }

  // estrellitas que le dan vueltas a la cabeza (golpe en la cabeza / mareo)
  // algo que pasa más tarde dentro de una reacción: se cancela si llega otra reacción antes
  export function kAt(ctx: BotContext, fn: () => void, t: number) { const id = ctx.kSeqId; setTimeout(() => { if (!ctx.dragging && id === ctx.kSeqId) fn(); }, t); }

  export function kStars(ctx: BotContext, ms = 1500, n = 3) {
    if (ctx.reduce) return;
    const top = headTop(ctx) - 2, g = mk(ctx, 'g', { class:'kstars' }, ctx.el.z);
    for (let i = 0; i < n; i++) {
      const t = mk(ctx, 'text', { x:100, y:top, 'font-size':11, 'text-anchor':'middle', fill:'#FFD25A', stroke:'#D19A2A', 'stroke-width':.7 }, g, '★');
      t.style.transformOrigin = `100px ${f2(top - 4)}px`;
      const fr = [];
      for (let j = 0; j <= 40; j++) { const a = TAU * (j / 40 * 2.2 + i / n), u = j / 40;
        fr.push({ offset:u, opacity: u < .08 ? u / .08 : u > .9 ? (1 - u) / .1 : 1, transform:`translate(${f2(32 * Math.cos(a))}px,${f2(7 * Math.sin(a))}px) scale(${f3(.7 + .3 * Math.sin(a))})` }); }
      t.animate(fr, { duration:ms, easing:'linear' });
    }
    setTimeout(() => g.remove(), ms + 60);
  }

  export function pokePick(ctx: BotContext, dx: number, dy: number) {
    const now = performance.now(), quick = now - ctx.lastPokeAt < 320; ctx.lastPokeAt = now;
    if (quick && ctx.pokes >= 2) return 'spin';
    if (dy < -.45 && Math.random() < .75) return 'bonk';
    if (dy > .5) return 'jump';
    if (Math.abs(dx) > .55 && Math.random() < .65) return 'shove';
    const pool = ['tickle', 'boop', 'ball', 'shrink', 'ouch', 'tickle'].filter(v => v !== ctx.lastPokeV);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  export function pokeFx(ctx: BotContext, v: string, dx: number, dy: number, lean: number) {   // devuelve cuánto dura
    const side = dx < 0 ? -1 : 1, squash = () => play(ctx, ctx.el.hop, [{}, { transform:`rotate(${f2(lean)}deg) ${S(f3(1.06 + .08 * Math.abs(dx)), .86)}`, offset:.14 },
      { transform:`rotate(${f2(-lean * .5)}deg) ${S(.95,1.07)}`, offset:.4 }, { transform:`rotate(${f2(lean * .2)}deg) ${S(1.02,.98)}`, offset:.66 }, { transform:S(1) }], { duration:620, easing:'ease-out' });
    switch (v) {
      case 'tickle':   // ojos muy abiertos y luego carcajada
        squash(); animatePose(ctx, u => ({ yaw: -dx * .35 * Math.sin(Math.PI * u), pitch: -.15 * Math.sin(Math.PI * u) }), 700);
        { const T1 = kSeq(ctx, [['amazed', 380], ['happy', 900]]); kAt(ctx, () => kLaugh(ctx), 360); return T1; }
      case 'bonk':   // ¡coscorrón! se aplasta, le salen estrellitas y se tambalea
        play(ctx, ctx.el.hop, [{}, { transform:S(1.24,.68), offset:.12 }, { transform:S(.92,1.1), offset:.38 }, { transform:S(1.06,.95), offset:.6 }, { transform:S(.99,1.01), offset:.8 }, { transform:S(1) }], { duration:760, easing:'ease-out' });
        kStars(ctx, 1400); animatePose(ctx, u => ({ roll: baseRoll(ctx) + 7 * Math.sin(TAU * 2 * u) * (1 - u) }), 1300);
        return kSeq(ctx, [['tantrum', 260], ['dizzy', 1000], ['embarrassed', 700]]);
      case 'shove': {   // lo empujas de lado: se va como tentetieso y regresa meciéndose
        const fr = [{}]; for (let i = 1; i <= 30; i++) { const u = i / 30, e = Math.exp(-2.4 * u) * Math.sin(TAU * 1.5 * u);
          fr.push({ offset:u, transform:`translateX(${f2(-side * 12 * e)}px) rotate(${f2(-side * 26 * e)}deg) ${S(f3(1 + .04 * Math.abs(e)), f3(1 - .04 * Math.abs(e)))}` }); }
        fr[fr.length - 1] = { offset:1, transform:'none' };
        play(ctx, ctx.el.hop, fr, { duration:1150 });
        return kSeq(ctx, [['amazed', 450], ['playful', 800]]);
      }
      case 'jump':   // le tocaste los pies: brinca del susto y suda
        miniHop(ctx, 28); showFor(ctx, [ctx.fe.sweat], 1100);
        return kSeq(ctx, [['amazed', 520], ['awkward', 800]]);
      case 'boop':   // «boop» en la nariz: se echa para atrás, parpadea y le sale un corazón
        squash(); animatePose(ctx, u => ({ pitch: -.22 * Math.sin(Math.PI * u) }), 700);
        { const T2 = kSeq(ctx, [['amazed', 300], ['tender', 1000]]); kAt(ctx, () => floaty(ctx, '♥', 1, '#FF6FAE', 13), 300); return T2; }
      case 'ball': {   // rebota como pelota, cada bote más chico
        const fr = [{}], H = [22, 11, 5]; let o = 0;
        H.forEach((h, i) => { const w = .3 - i * .05;
          fr.push({ offset:+(o + w * .12).toFixed(3), transform:S(1.14 - i * .03, .86 + i * .03) }, { offset:+(o + w * .5).toFixed(3), transform:`translateY(-${h}px) ${S(.95,1.06)}` }); o += w; fr.push({ offset:+o.toFixed(3), transform:S(1.1 - i * .03, .9 + i * .03) }); });
        fr.push({ offset:1, transform:'none' });
        play(ctx, ctx.el.hop, fr, { duration:1150 });
        return kSeq(ctx, [['happy', 1150]]);
      }
      case 'shrink':   // se hace chiquito de pena y vuelve
        play(ctx, ctx.el.breath, [{}, { transform:S(.88,.8), offset:.22 }, { transform:S(.88,.8), offset:.7 }, { transform:S(1.05,1.05), offset:.86 }, { transform:S(1) }], { duration:1150, easing:'ease-in-out' });
        animatePose(ctx, u => ({ pitch: .16 * Math.sin(Math.PI * u), roll: baseRoll(ctx) - side * 7 * Math.sin(Math.PI * u) }), 1150);
        return kSeq(ctx, [['shy', 1150]]);
      case 'ouch':   // ¡auch! aprieta los ojos, se pone rojito y casi llora
        squash(); tremble(ctx, 320, 2.2, 40);   // (sin rojo: le dolió, no está enojado)
        return kSeq(ctx, [['tantrum', 520], ['touched', 900]]);
      case 'spin':   // dos toques rapiditos: da una vuelta completa jugando
        miniHop(ctx, 14); animatePose(ctx, u => ({ yaw: TAU * easeInOut(u) }), 900);
        return kSeq(ctx, [['playful', 1000]]);
    }
    return 700;
  }

  /* ---------- Al soltarlo después de hacerlo girar: 5 reacciones ---------- */
  export function spinFx(ctx: BotContext, v: string, dur: number, side: number) {   // devuelve cuánto tiempo EXTRA ocupa después del giro
    const at = (fn: () => void, t: number) => setTimeout(() => { if (!ctx.dragging) fn(); }, t);
    switch (v) {
      case 'top':   // se tambalea y se apena
        kSeq(ctx, [['dizzy', dur], ['embarrassed', 900]]); return 0;
      case 'fall': {  // se marea tanto que se cae de lado, se queda tirado… y se levanta de un brinco
        const R = (a: number) => `translateX(${f2(-side * 78 * a / 72)}px) translateX(${side * 46}px) rotate(${side * a}deg) translateX(${-side * 46}px)`;   // gira sobre la orilla de abajo
        at(() => play(ctx, ctx.el.breath, [{}, { transform:R(16), offset:.15 }, { transform:R(72), offset:.32, easing:'cubic-bezier(.5,0,.8,.4)' },
          { transform:R(62), offset:.4 }, { transform:R(72), offset:.46 }, { transform:R(70), offset:.74 },
          { transform:`translateY(-14px) ${S(.95,1.06)}`, offset:.88 }, { transform:S(1.06,.94), offset:.95 }, { transform:'none' }], { duration:2200, easing:'ease-in-out' }), dur * .6);
        kSeq(ctx, [['dizzy', dur * .6 + 1450], ['resigned', 350], ['amazed', 320], ['happy', 800]]);
        return 1700;
      }
      case 'stars':   // estrellitas en la cabeza y vaivén de borracho
        kStars(ctx, 2000, 4);
        animatePose(ctx, u => ({ roll: 9 * Math.sin(TAU * 2.2 * u) * (1 - u * .6), yaw: .3 * Math.sin(TAU * 1.1 * u) * (1 - u) }), dur + 900);
        kSeq(ctx, [['dizzy', dur + 700], ['embarrassed', 700]]);
        return 900;
      case 'stagger':   // camina chueco de un lado a otro hasta que se compone
        at(() => play(ctx, ctx.el.breath, [{}, { transform:`translateX(${-side * 12}px) rotate(${-side * 9}deg)`, offset:.25 }, { transform:`translateX(${side * 10}px) rotate(${side * 8}deg)`, offset:.5 },
          { transform:`translateX(${-side * 5}px) rotate(${-side * 4}deg)`, offset:.75 }, { transform:'none' }], { duration:1500, easing:'ease-in-out' }), dur * .55);
        at(() => showFor(ctx, [ctx.fe.sweat], 1100), dur * .7);
        kSeq(ctx, [['dizzy', dur * .55 + 900], ['awkward', 800]]);
        return 1100;
      case 'pirouette':   // ¡le encantó! remata con un brinco y chispas
        at(() => { miniHop(ctx, 18); const top = headTop(ctx); for (let i = 0; i < 4; i++) setTimeout(() => spark(ctx, top), i * 150); }, dur * .7);
        kSeq(ctx, [['hopeful', dur * .7], ['content', 1000]]);
        return 700;
    }
    return 0;
  }

  // risa: sacudidas cortitas del cuerpo, como carcajada
  export function kLaugh(ctx: BotContext) { if (ctx.reduce) return; play(ctx, ctx.el.breath, [{}, { transform:S(1.04,.96), offset:.15 }, { transform:S(.99,1.02), offset:.3 }, { transform:S(1.04,.96), offset:.45 }, { transform:S(.99,1.02), offset:.6 }, { transform:S(1.02,.98), offset:.78 }, { transform:S(1) }], { duration:720 }); }

  export function poke(ctx: BotContext, vx: number, vy: number) {
    if (ctx.state === 'sleeping') { ctx.kWakeForce = 'startled'; wake(ctx); hatKick(ctx, 1.6, 0); return; }   // lo despertaste: se sobresalta
    wake(ctx); hatKick(ctx, 1.6, (vx < 100 ? 1 : -1) * 2);
    ctx.pokes++; clearTimeout(ctx.pokeT ?? undefined); ctx.pokeT = setTimeout(() => { ctx.pokes = 0; }, 1800);
    if (ctx.pokes >= 5) { ctx.pokes = 0; angry(ctx); expr(ctx, 'angry', 2700 * slow(ctx)); return; }   // la cara de enojo dura todo lo que dura el rojo
    const dx = Math.max(-1, Math.min(1, (vx - 100) / 60)), dy = (vy - ctx.shape.cy) / 60, lean = -dx * 12;
    // onda en el punto tocado
    const r = mk(ctx, 'circle', { cx:vx, cy:vy, r:6, class:'poke-ring' });
    r.style.transformOrigin = `${vx}px ${vy}px`;
    r.animate([{ transform:S(.4), opacity:.9 }, { transform:S(2.4), opacity:0 }], { duration:420, easing:'ease-out' }).onfinish = () => r.remove();
    lit(ctx, 'lift', [{ opacity:0 }, { opacity:.12, offset:.15 }, { opacity:0 }], 400);
    if (ctx.pokes <= 2) {   // juega: una de 9 reacciones según dónde le diste
      const v = ctx.force.poke || pokePick(ctx, dx, dy); ctx.lastPokeV = v; ctx.svg.dataset['poke'] = v;
      ctx.hooks.act(1900); pokeFx(ctx, v, dx, dy, lean);
      return;
    }
    ctx.hooks.act(800);
    play(ctx, ctx.el.hop, [{}, { transform:`rotate(${f2(lean)}deg) ${S(f3(1.06 + .08 * Math.abs(dx)), .86)}`, offset:.14 }, { transform:`rotate(${f2(-lean * .5)}deg) ${S(.95,1.07)}`, offset:.4 }, { transform:S(1) }], { duration:620, easing:'ease-out' });
    mood(ctx, '#FF4D4D', [{ opacity:0 }, { opacity:.12 + ctx.pokes * .04, offset:.2 }, { opacity:0 }], 800);
    // ya le está molestando: el 3º molesto, el 4º enojado (con variantes de movimiento, pero SIEMPRE cara de enojo)
    const alt = Math.random() < .5, face = ctx.pokes === 3 ? 'annoyed' : 'angry'; ctx.svg.dataset['poke'] = face + (alt ? '+' : '');
    expr(ctx, face, 1300);
    if (ctx.pokes === 3 && alt) {   // te da la espalda haciendo puchero
      animatePose(ctx, u => { const e = Math.sin(Math.PI * clamp01(u / .85)); return { yaw: (dx < 0 ? 1 : -1) * .85 * e, roll: baseRoll(ctx) + 6 * e }; }, 1300);
    } else if (ctx.pokes === 4 && alt) {   // pataleta: zapatea dos veces
      miniHop(ctx, 7); kAt(ctx, () => miniHop(ctx, 7), 300); tremble(ctx, 500, 1.8);
    } else {
      showFor(ctx, ctx.fe.browA, 1000); holdEyes(ctx, S(1,.6), 1000);
      animatePose(ctx, u => ({ yaw: .3 * Math.sin(TAU * 1.5 * u) * (1 - u) }), 800);
    }
  }
