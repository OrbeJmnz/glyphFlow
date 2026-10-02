
import { RUN } from './routines';
import { SPARK_COLORS, breathe, headTop, holdEyes, miniHop, mk, nod, pick, popIn, showFor, spark, squint, stopLoops, typing } from './actions';
import { later, loop, play } from './timing';
import { S, TAU, clamp01 } from './math';
import { animatePose, setPose } from './pose-motion';
import { blink, eyeSeq, swapEyes } from './eyes';
import { flash, lit, tint } from './light';
import { f2, f3 } from '../data/color';
import type { GfBotWorkRoutine } from '../data/routines';
import { type BotContext } from './context';




  /** Cada rutina de trabajo trae varias versiones: `[etiqueta, correr]`; cada vez que toca sale la siguiente. */
  export const WORK: Record<GfBotWorkRoutine, [string, (ctx: BotContext) => void][]> = {
    typing: [
      ['tapping', (ctx: BotContext) => RUN.typing(ctx)],
      ['rushing', (ctx: BotContext) => {   // teclea rapidísimo a ráfagas y remata con un "enter"
        typing(ctx, 2.2);
        play(ctx, ctx.el.breath, [{}, ...Array.from({ length:12 }, (_, i) => ({ offset:(i + 1) / 13, transform: i % 2 ? S(1.03,.96) : S(1) })), { transform:S(1) }], { duration:1600 });
        later(ctx, () => play(ctx, ctx.el.breath, [{}, ...Array.from({ length:12 }, (_, i) => ({ offset:(i + 1) / 13, transform: i % 2 ? S(1.03,.96) : S(1) })), { transform:S(1) }], { duration:1500 }), 1800);
        later(ctx, () => { stopLoops(ctx); ctx.el.dots.setAttribute('opacity', '0'); setPose(ctx, { pitch:0 }); miniHop(ctx, 16); blink(ctx); flash(ctx, .18, 500, '#86E9FF'); }, 3400);
      }],
      ['fixing', (ctx: BotContext) => {   // escribe, se detiene, frunce el ceño, borra y vuelve a escribir
        typing(ctx, 1);
        later(ctx, () => {
          stopLoops(ctx);
          ctx.el.dotList.slice().reverse().forEach((d, i) => d.animate([{ opacity:1, transform:S(1) }, { opacity:0, transform:S(.2) }], { duration:180, delay:i * 160, fill:'forwards' }));
          showFor(ctx, ctx.fe.browA, 1300); holdEyes(ctx, S(1,.6), 1300);
          animatePose(ctx, u => ({ pitch:.08, yaw: .25 * Math.sin(TAU * 2 * u) * (1 - u) }), 800);
        }, 1400);
        later(ctx, () => { ctx.el.dotList.forEach(d => d.getAnimations().forEach(a => a.cancel())); typing(ctx, 1.3); }, 2800);
        later(ctx, () => blink(ctx), 3900);
      }],
      ['sending', (ctx: BotContext) => {   // escribe y lanza un avioncito de papel
    typing(ctx, 1.4);
    later(ctx, () => {
      stopLoops(ctx); ctx.el.dots.setAttribute('opacity', '0');
      const top = headTop(ctx);
      const plane = mk(ctx, 'g', { class:'plane' }, ctx.el.z, `<path d="M-11 0 L12 -7 L-2 8 Z"/><path d="M-2 8 L0 1 L12 -7" class="plane-fold"/>`);
      plane.animate(Array.from({ length:25 }, (_, i) => { const u = i / 24; return { offset:u,
        transform:`translate(${f2(108 + 120 * u)}px,${f2(top + 8 - 46 * Math.sin(Math.PI * u * .8) - 14 * u)}px) rotate(${f2(-20 + 24 * u)}deg) scale(${f3(1 - .45 * u)})`,
        opacity: u > .85 ? +f3((1 - u) / .15) : 1 }; }), { duration:1300, easing:'ease-in', fill:'forwards' });
      animatePose(ctx, u => ({ yaw: .15 + .4 * u, pitch: -.1 - .22 * u }), 1300);
      miniHop(ctx, 12);
    }, 1900);
    later(ctx, () => { setPose(ctx, { yaw:0, pitch:0 }); swapEyes(ctx, 'happy', 800); miniHop(ctx, 18); flash(ctx, .16, 500); }, 3400);
  }]
    ],
    thinking: [
      ['idea', (ctx: BotContext) => RUN.thinking(ctx)],
      ['doubting', (ctx: BotContext) => {   // un "?" sobre la cabeza, ladea la cabeza de un lado al otro y se encoge de hombros
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.01,.99) }], 1600);
        const q = mk(ctx, 'text', { x:100, y:headTop(ctx) - 10, class:'qmark', 'text-anchor':'middle', 'font-size':26 });
        q.textContent = '?'; q.style.transformOrigin = `100px ${headTop(ctx) - 18}px`;
        q.animate([{ transform:S(0), opacity:0 }, { transform:S(1.15), opacity:1, offset:.6 }, { transform:S(1), opacity:1 }], { duration:420, easing:'ease-out' });
        loop(ctx, q, [{ transform:'rotate(-10deg)' }, { transform:'rotate(10deg)' }], { duration:800, direction:'alternate', easing:'ease-in-out', delay:420 });
        const side = (u: number) => Math.tanh(3 * Math.sin(TAU * u)) / Math.tanh(3);
        animatePose(ctx, u => ({ yaw: .3 * side(u), roll: 9 * side(u), pitch: -.22 }), 2400, { repeat:true });
        showFor(ctx, [ctx.fe.browS[0], ctx.fe.browA[1]], 3300);
        later(ctx, () => {   // se encoge de hombros
          stopLoops(ctx); setPose(ctx, { yaw:0, roll:0, pitch:0 });
          q.animate([{ opacity:1 }, { opacity:0, transform:'translateY(-8px)' }], { duration:300, fill:'forwards' });
          play(ctx, ctx.el.breath, [{}, { transform:S(.95,1.09), offset:.3 }, { transform:S(.95,1.09), offset:.55 }, { transform:S(1.04,.96), offset:.8 }, { transform:S(1) }], { duration:800, easing:'ease-in-out' });
          later(ctx, () => blink(ctx), 500);
        }, 3400);
      }],
      ['meditating', (ctx: BotContext) => {   // ojos cerrados, flota y respira hondo; la luz late suave; al final abre los ojos con una idea
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.035,.965) }], 2000);
        swapEyes(ctx, 'closed', 3200);
        loop(ctx, ctx.el.hop, [{ transform:'translateY(0px)' }, { transform:'translateY(-6px)' }], { duration:2000, direction:'alternate', easing:'ease-in-out' });
        loop(ctx, ctx.el.L.lift, [{ opacity:0 }, { opacity:.12 }], { duration:2000, direction:'alternate', easing:'ease-in-out' });
        tint(ctx, { rt:'#CDB8FF' }); loop(ctx, ctx.el.L.rt, [{ opacity:.1 }, { opacity:.35 }], { duration:2000, direction:'alternate', easing:'ease-in-out' });
        animatePose(ctx, u => ({ roll: 3 * Math.sin(TAU * u), pitch: -.08 }), 4000, { repeat:true });
        later(ctx, () => {
          stopLoops(ctx); setPose(ctx, { roll:0, pitch:0 });
          eyeSeq(ctx, [{ transform:S(1,.1) }, { transform:S(1.25,1.3), offset:.4 }, { transform:S(1) }], 500);
          flash(ctx, .34, 900, '#FFE27A'); later(ctx, () => { miniHop(ctx, 22); swapEyes(ctx, 'happy', 700); }, 300);
        }, 3250);
      }],
      ['brainstorm', (ctx: BotContext) => {   // focos que se prenden alrededor; cada uno lo ilumina desde su lado
    breathe(ctx, [{ transform:S(1) }, { transform:S(1.015,.985) }], 1200);
    animatePose(ctx, u => ({ yaw: .3 * Math.sin(TAU * u), pitch: -.25 }), 2400, { repeat:true });
    const top = headTop(ctx);
    const bulb = (big?: boolean) => {
      const x = big ? 100 : 55 + Math.random() * 90, y = big ? top - 24 : top - 4 - Math.random() * 26, r = big ? 9 : 5.5;
      const g = mk(ctx, 'g', {}, ctx.el.z, `<circle cx="${x}" cy="${y}" r="${r}" class="bulb-glass"/><rect x="${x - r * .45}" y="${y + r * .85}" width="${r * .9}" height="${r * .45}" rx="1" class="bulb-base"/>`);
      g.style.transformOrigin = `${x}px ${y}px`;
      g.animate([{ transform:S(0), opacity:0 }, { transform:S(1.2), opacity:1, offset:.3 }, { transform:S(1), opacity:1, offset:.7 }, { transform:S(.8), opacity:0 }], { duration:big ? 1400 : 900, easing:'ease-out' }).onfinish = () => g.remove();
      const side = x < 85 ? 'rl' : x > 115 ? 'rr' : 'rt';
      tint(ctx, { [side]:'#FFE27A' }); lit(ctx, side, [{ opacity:0 }, { opacity:big ? .65 : .42, offset:.3 }, { opacity:0 }], 650);
    };
    bulb(); ctx.zTimer = setInterval(bulb, 400);
    later(ctx, () => {
      clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null; stopLoops(ctx); setPose(ctx, { yaw:0, pitch:-.25 });
      bulb(true); flash(ctx, .36, 900, '#FFE27A');
      later(ctx, () => { setPose(ctx, { pitch:0 }); miniHop(ctx, 26); swapEyes(ctx, 'happy', 800); }, 380);
    }, 3300);
  }]
    ],
    analyzing: [
      ['scanning', (ctx: BotContext) => RUN.analyzing(ctx)],
      ['magnifier', (ctx: BotContext) => {   // una lupa recorre el frente del bot; la cabeza y los ojos la siguen
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 800);
        const lens = mk(ctx, 'g', { class:'lens' }, ctx.el.z, `<circle cx="0" cy="0" r="12" class="lens-glass"/><circle cx="0" cy="0" r="12" class="lens-ring"/><path d="M8.5 8.5 L18 18" class="lens-handle"/>`);
        const path = (u: number) => [100 + 44 * Math.sin(TAU * u), 118 + 24 * Math.sin(TAU * 2 * u)];
        loop(ctx, lens, Array.from({ length:41 }, (_, i) => { const u = i / 40, [x, y] = path(u); return { offset:u, transform:`translate(${f2(x)}px,${f2(y)}px)` }; }), { duration:2600, easing:'linear' });
        animatePose(ctx, u => ({ yaw: .38 * Math.sin(TAU * u), pitch: .16 * Math.sin(TAU * 2 * u) }), 2600, { repeat:true });
        ctx.fe.eyeList.forEach(e => loop(ctx, e, [{ transform:S(1.08,1.12) }, { transform:S(1.08,1.12) }], { duration:1000 }));
        later(ctx, () => {   // ¡lo encontró!
          stopLoops(ctx); setPose(ctx, { yaw:0, pitch:0 });
          lens.animate([{ transform:'translate(100px,118px) scale(1)', opacity:1 }, { transform:'translate(100px,118px) scale(1.5)', opacity:0 }], { duration:500, fill:'forwards' });
          eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.28,1.32), offset:.35 }, { transform:S(1) }], 500);
          flash(ctx, .22, 600, '#8FF3FF'); later(ctx, () => nod(ctx, .24), 350);
        }, 3500);
      }],
      ['data', (ctx: BotContext) => {   // una mini gráfica de barras sube y baja a su lado; la estudia y asiente
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 900);
        const x0 = 166, y0 = 30, card = mk(ctx, 'g', { class:'plan' });
        card.style.transformOrigin = `${x0}px ${y0 + 50}px`;
        card.innerHTML = `<rect class="plan-card" x="${x0}" y="${y0}" width="46" height="50" rx="8"/>` +
          [0, 1, 2].map(i => `<rect class="bar" x="${x0 + 9 + i * 11}" y="${y0 + 12}" width="7" height="30" rx="2" style="transform-origin:${x0 + 12 + i * 11}px ${y0 + 42}px"/>`).join('');
        card.animate([{ opacity:0, transform:'translateY(8px) scale(.7)' }, { opacity:1, transform:'none' }], { duration:ctx.spring.duration, easing:ctx.spring.easing });
        const bars = [...card.querySelectorAll<SVGElement>('.bar')];
        bars.forEach((bar, i) => loop(ctx, bar, [.3, .8, .5, .95, .4, .7].map((h, k) => ({ offset:k / 5, transform:`scaleY(${[h, 1 - h * .6, (h + .4) % 1 + .1][i]})` })), { duration:1800, easing:'ease-in-out', direction:'alternate' }));
        setPose(ctx, { yaw:.42, pitch:-.1 }); squint(ctx, .82);
        loop(ctx, ctx.fe.eyes, [{ transform:'translateX(-3px)' }, { transform:'translateX(-3px)', offset:.3 }, { transform:'translateX(0)', offset:.36 }, { transform:'translateX(0)', offset:.63 }, { transform:'translateX(3px)', offset:.7 }, { transform:'translateX(3px)' }], { duration:1500, direction:'alternate' });
        later(ctx, () => {
          stopLoops(ctx);
          bars.forEach((bar, i) => bar.animate([{ transform:getComputedStyle(bar).transform }, { transform:`scaleY(${[.4, .65, 1][i]})` }], { duration:500, easing:ctx.spring.easing, fill:'forwards' }));
          bars[2].classList.add('bar-top');
          later(ctx, () => { nod(ctx, .2); blink(ctx); }, 300); later(ctx, () => { setPose(ctx, { yaw:0, pitch:0 }); flash(ctx, .2, 600, '#9CFFB8'); swapEyes(ctx, 'happy', 700); }, 900);
          card.animate([{ opacity:1 }, { opacity:0 }], { duration:400, delay:1000, fill:'forwards' });
        }, 3200);
      }],
      ['comparing', (ctx: BotContext) => {   // dos opciones, A y B: voltea de una a otra y elige
    breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 900);
    const top = headTop(ctx) - 30;
    const card = (x: number, t: string) => {
      const g = mk(ctx, 'g', {}, ctx.el.z, `<rect class="plan-card" x="${x - 14}" y="${top - 16}" width="28" height="32" rx="6"/><text x="${x}" y="${top + 6}" text-anchor="middle" class="cmp-t">${t}</text>`);
      popIn(ctx, g, x, top); return g;
    };
    const A = card(44, 'A'), B = card(156, 'B');
    squint(ctx, .8);
    [0, 1, 2, 3].forEach(i => later(ctx, () => { setPose(ctx, { yaw: i % 2 ? .42 : -.42, pitch:-.3 }); if (i === 2) blink(ctx); }, 250 + i * 650));
    later(ctx, () => {
      setPose(ctx, { yaw:.42, pitch:-.3 });
      B.querySelector<SVGElement>('rect')!.classList.add('cmp-win');
      A.animate([{ opacity:1 }, { opacity:.3 }], { duration:300, fill:'forwards' });
      B.animate([{ transform:S(1) }, { transform:S(1.15) }, { transform:S(1) }], { duration:420 });
      nod(ctx, .2); flash(ctx, .2, 600, '#9CFFB8');
    }, 2950);
    later(ctx, () => { setPose(ctx, { yaw:0, pitch:0 }); swapEyes(ctx, 'happy', 700); }, 3650);
  }]
    ],
    creating: [
      ['sparks', (ctx: BotContext) => RUN.creating(ctx)],
      ['painting', (ctx: BotContext) => {   // pinceladas de colores alrededor de la cabeza; luces arcoíris lo bañan por los lados
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.025,.975) }], 500);
        animatePose(ctx, u => ({ yaw: .3 * Math.sin(TAU * u), roll: 6 * Math.sin(TAU * u), pitch: -.15 }), 2000, { repeat:true });
        ctx.fe.eyeList.forEach(e => loop(ctx, e, [{ transform:S(1.08,1.12) }, { transform:S(1.14,1.2) }], { duration:500, direction:'alternate' }));
        const top = headTop(ctx);
        let k = 0;
        const stroke = () => {
          const c = SPARK_COLORS[k++ % SPARK_COLORS.length], x = 50 + Math.random() * 100, y = top - 6 + Math.random() * 16, w = 18 + Math.random() * 16, up = (Math.random() < .5 ? -1 : 1) * (6 + Math.random() * 6);
          const s = mk(ctx, 'path', { d:`M${x - w / 2} ${y} Q${x} ${y + up} ${x + w / 2} ${y}`, stroke:c, 'stroke-width':4.5, 'stroke-linecap':'round', fill:'none', 'stroke-dasharray':w * 1.3, 'stroke-dashoffset':w * 1.3 });
          s.animate([{ strokeDashoffset:w * 1.3, opacity:1 }, { strokeDashoffset:0, opacity:1, offset:.45 }, { strokeDashoffset:0, opacity:0 }], { duration:1300, easing:'ease-out' }).onfinish = () => s.remove();
          tint(ctx, k % 2 ? { rl:c } : { rr:c }); lit(ctx, k % 2 ? 'rl' : 'rr', [{ opacity:0 }, { opacity:.55, offset:.3 }, { opacity:0 }], 700);
        };
        stroke(); ctx.zTimer = setInterval(stroke, 380);
        later(ctx, () => {
          clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null; stopLoops(ctx); setPose(ctx, { yaw:0, roll:0, pitch:0 });
          for (let i = 0; i < 9; i++) spark(ctx, top, true);
          flash(ctx, .3, 800, pick(SPARK_COLORS)); miniHop(ctx, 30); swapEyes(ctx, 'happy', 900);
        }, 3500);
      }],
      ['building', (ctx: BotContext) => {   // bloques de colores caen y se apilan a su lado; asiente con cada uno
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 800);
        setPose(ctx, { yaw:.45, pitch:.16 }); squint(ctx, .85);
        [0, 1, 2].forEach(i => later(ctx, () => {
          const x = 176 + (i === 1 ? 3 : 0), y = 176 - i * 17;
          const blk = mk(ctx, 'rect', { x, y, width:16, height:16, rx:4, fill:SPARK_COLORS[i + 1], class:'block' }, ctx.el.world);
          blk.style.transformOrigin = `${x + 8}px ${y + 16}px`;
          blk.animate([{ transform:'translateY(-90px)', opacity:0 }, { transform:'translateY(-90px)', opacity:1, offset:.05 }, { transform:'translateY(0)', offset:.6, easing:'ease-out' }, { transform:'translateY(0) scale(1.18,.8)', offset:.72 }, { transform:'translateY(-4px) scale(.95,1.05)', offset:.85 }, { transform:'none' }],
            { duration:650, easing:'cubic-bezier(.5,0,.9,.5)' });
          later(ctx, () => { nod(ctx, .18, 300); play(ctx, ctx.el.breath, [{}, { transform:S(1.04,.96), offset:.4 }, { transform:S(1) }], { duration:300 }); blink(ctx); }, 400);
        }, 500 + i * 850));
        later(ctx, () => {
          stopLoops(ctx); setPose(ctx, { yaw:0, pitch:0 });
          [...ctx.el.world.querySelectorAll<SVGElement>('.block')].forEach((blk, i) => blk.animate([{ transform:'rotate(0deg)' }, { transform:`rotate(${i % 2 ? 6 : -6}deg)` }, { transform:'rotate(0deg)' }], { duration:400, delay:i * 60 }));
          flash(ctx, .24, 700, '#FFD24A'); miniHop(ctx, 26); swapEyes(ctx, 'happy', 800);
        }, 3200);
      }],
      ['composing', (ctx: BotContext) => {   // notas musicales; rebota al ritmo y la luz late con cada nota
    loop(ctx, ctx.el.hop, [{ transform:'translateY(0px)' }, { transform:'translateY(-6px)', offset:.5, easing:'ease-out' }, { transform:'translateY(0px)' }], { duration:500, easing:'ease-in' });
    breathe(ctx, [{ transform:S(1.03,.97) }, { transform:S(1) }], 250);
    animatePose(ctx, u => ({ yaw: .25 * Math.sin(TAU * u), roll: 7 * Math.sin(TAU * u) }), 1000, { repeat:true });
    swapEyes(ctx, 'happy', 3300);   // lo está disfrutando
    const top = headTop(ctx); let k = 0;
    const note = () => {
      const c = SPARK_COLORS[k++ % SPARK_COLORS.length], x = 70 + Math.random() * 60, dx = (Math.random() - .5) * 44;
      const t = mk(ctx, 'text', { x, y:top, class:'note-t', 'text-anchor':'middle', 'font-size':17 + Math.random() * 7, fill:c });
      t.textContent = k % 2 ? '♪' : '♫'; t.style.transformOrigin = `${x}px ${top}px`;
      t.animate([{ transform:'translate(0,0)', opacity:0 }, { transform:`translate(${dx * .3}px,-12px)`, opacity:1, offset:.25 }, { transform:`translate(${dx}px,-48px) rotate(${dx / 2}deg)`, opacity:0 }], { duration:1400, easing:'ease-out' }).onfinish = () => t.remove();
      tint(ctx, { rt:c }); lit(ctx, 'rt', [{ opacity:.1 }, { opacity:.45, offset:.2 }, { opacity:.1 }], 480);
    };
    note(); ctx.zTimer = setInterval(note, 500);
    later(ctx, () => {
      clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null; stopLoops(ctx); setPose(ctx, { yaw:0, roll:0 });
      for (let i = 0; i < 7; i++) spark(ctx, top, true);
      flash(ctx, .28, 800, pick(SPARK_COLORS)); miniHop(ctx, 28);
    }, 3500);
  }]
    ],
    planning: [
      ['list', (ctx: BotContext) => RUN.planning(ctx)],
      ['notes', (ctx: BotContext) => {   // pega tres notas sobre su cabeza, las revisa una por una y las reordena
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 900);
        const top = headTop(ctx) - 26, xs = [62, 100, 138], cols = ['#FFE27A', '#FF9EC7', '#8FF3FF'];
        const notes = xs.map((x, i) => {
          const n = mk(ctx, 'rect', { x:x - 9, y:top - 9, width:18, height:18, rx:3, fill:cols[i], class:'note' });
          n.style.transformOrigin = `${x}px ${top}px`; n.style.opacity = '0';
          return n;
        });
        notes.forEach((n, i) => later(ctx, () => {
          n.style.opacity = '1';
          n.animate([{ transform:'scale(0) rotate(-20deg)' }, { transform:`scale(1) rotate(${(i - 1) * 6}deg)` }], { duration:ctx.spring.duration, easing:ctx.spring.easing, fill:'forwards' });
          setPose(ctx, { yaw:(i - 1) * .38, pitch:-.3 }); blink(ctx);
        }, 400 + i * 650));
        later(ctx, () => {   // las reordena: la de la derecha pasa a la izquierda
          setPose(ctx, { yaw:0, pitch:-.3 });
          const dx = xs[0] - xs[2];
          notes[2].animate([{ transform:'rotate(6deg)' }, { transform:`translate(${dx / 2}px,-18px) rotate(-10deg)`, offset:.5 }, { transform:`translate(${dx}px,0) rotate(-6deg)` }], { duration:700, easing:'ease-in-out', fill:'forwards' });
          notes[0].animate([{ transform:'rotate(-6deg)' }, { transform:`translate(${-dx / 2}px,10px) rotate(0deg)`, offset:.5 }, { transform:`translate(${-dx}px,0) rotate(6deg)` }], { duration:700, easing:'ease-in-out', fill:'forwards' });
          animatePose(ctx, u => ({ yaw: -.38 * Math.sin(Math.PI * u) * (u < .5 ? -1 : 1), pitch:-.3 }), 700);
        }, 2500);
        later(ctx, () => { setPose(ctx, { pitch:0 }); nod(ctx, .2); flash(ctx, .2, 600, '#FFE27A'); swapEyes(ctx, 'happy', 700); later(ctx, () => miniHop(ctx, 20), 200); }, 3400);
      }],
      ['route', (ctx: BotContext) => {   // traza una ruta de puntos de izquierda a derecha y planta una bandera al final
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 900);
        const top = headTop(ctx) - 14, pts = Array.from({ length:8 }, (_, i) => { const u = i / 7; return [42 + u * 116, top - 14 * Math.sin(Math.PI * u) + 6 * Math.sin(TAU * u)]; });
        pts.forEach(([x, y], i) => later(ctx, () => {
          const d = mk(ctx, 'circle', { cx:x, cy:y, r:2.8, class:'route-dot' });
          d.style.transformOrigin = `${x}px ${y}px`;
          d.animate([{ transform:S(0) }, { transform:S(1.5), offset:.6 }, { transform:S(1) }], { duration:260 });
        }, 300 + i * 260));
        animatePose(ctx, u => ({ yaw: -.45 + .9 * clamp01((u * 3300 - 300) / (7 * 260)), pitch:-.28 }), 3300);
        later(ctx, () => {
          const [x, y] = pts[7];
          const flag = mk(ctx, 'g', { class:'flag' }, ctx.el.z, `<path d="M${x} ${y} V${y - 18}" class="flag-pole"/><path d="M${x} ${y - 18} L${x + 12} ${y - 14} L${x} ${y - 10} Z" class="flag-cloth"/>`);
          flag.style.transformOrigin = `${x}px ${y}px`;
          flag.animate([{ transform:S(0) }, { transform:S(1.2), offset:.6 }, { transform:S(1) }], { duration:400 });
          loop(ctx, flag.lastChild as SVGElement, [{ transform:'skewY(0deg)' }, { transform:'skewY(-8deg)' }], { duration:300, direction:'alternate', easing:'ease-in-out' });
        }, 300 + 8 * 260);
        later(ctx, () => { stopLoops(ctx); setPose(ctx, { yaw:0, pitch:0 }); nod(ctx, .2); flash(ctx, .22, 600, '#FF9EC7'); swapEyes(ctx, 'happy', 700); later(ctx, () => miniHop(ctx, 22), 200); }, 3400);
      }],
      ['calendar', (ctx: BotContext) => {   // un calendario se va llenando de colores y encierra el día clave
    breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 900);
    const x0 = 166, y0 = 24, g = mk(ctx, 'g', { class:'plan' });
    let html = `<rect class="plan-card" x="${x0}" y="${y0}" width="46" height="52" rx="7"/><path class="cal-head" d="M${x0} ${y0 + 11} V${y0 + 7} Q${x0} ${y0} ${x0 + 7} ${y0} H${x0 + 39} Q${x0 + 46} ${y0} ${x0 + 46} ${y0 + 7} V${y0 + 11} Z"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) html += `<rect class="cal-cell" x="${x0 + 6 + c * 12.5}" y="${y0 + 16 + r * 11.5}" width="9.5" height="8.5" rx="2"/>`;
    g.innerHTML = html; popIn(ctx, g, x0, y0 + 50);
    const cells = [...g.querySelectorAll<SVGElement>('.cal-cell')];
    setPose(ctx, { yaw:.42, pitch:-.12 }); squint(ctx, .85);
    cells.forEach((cell, i) => later(ctx, () => {
      cell.style.fill = SPARK_COLORS[i % SPARK_COLORS.length];
      cell.animate([{ transform:S(.4) }, { transform:S(1) }], { duration:260, easing:ctx.spring.easing });
      cell.style.transformOrigin = `${Number(cell.getAttribute('x')) + 4.75}px ${Number(cell.getAttribute('y')) + 4.25}px`;
      if (i % 3 === 2) nod(ctx, .12, 260);
    }, 400 + i * 230));
    later(ctx, () => {
      const c = cells[4], x = Number(c.getAttribute('x')) + 4.75, y = Number(c.getAttribute('y')) + 4.25;
      const ring = mk(ctx, 'circle', { cx:x, cy:y, r:8, class:'cal-ring', 'stroke-dasharray':51, 'stroke-dashoffset':51 }, g);
      ring.animate([{ strokeDashoffset:51 }, { strokeDashoffset:0 }], { duration:420, fill:'forwards' });
      flash(ctx, .2, 600, '#FF9EC7');
    }, 2700);
    later(ctx, () => { setPose(ctx, { yaw:0, pitch:0 }); swapEyes(ctx, 'happy', 700); miniHop(ctx, 20); }, 3400);
  }]
    ],
    loading: [
      ['spinning', (ctx: BotContext) => RUN.loading(ctx)],
      ['bar', (ctx: BotContext) => {   // una barra de progreso se llena a tirones; los ojos siguen la punta; la luz sube con el avance
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 700);
        const top = headTop(ctx) - 20;
        mk(ctx, 'rect', { x:66, y:top - 4, width:68, height:8, rx:4, class:'bar-track' });
        const fill = mk(ctx, 'rect', { x:66, y:top - 4, width:68, height:8, rx:4, class:'bar-fill' });
        fill.style.transformOrigin = `66px ${top}px`;
        const prog = [[0, 0], [.18, .32], [.3, .36], [.42, .38], [.6, .74], [.72, .76], [.84, .95], [.9, 1], [1, 1]];
        const at = (u: number) => { for (let i = 1; i < prog.length; i++) if (u <= prog[i][0]) { const [a, pa] = prog[i - 1], [b, pb] = prog[i]; return pa + (pb - pa) * (u - a) / (b - a); } return 1; };
        const D = 3200;
        fill.animate(prog.map(([o, v]) => ({ offset:o, transform:`scaleX(${Math.max(v, .02)})` })), { duration:D, fill:'forwards' });
        animatePose(ctx, u => ({ yaw: -.35 + .7 * at(u), pitch:-.3 }), D);
        tint(ctx, { rt: getComputedStyle(ctx.svg).getPropertyValue('--c1').trim() || '#fff' });
        lit(ctx, 'rt', prog.map(([o, v]) => ({ offset:o, opacity:+f3(.1 + v * .45) })), D, { easing:'linear', fill:'forwards' });
        later(ctx, () => {
          fill.classList.add('bar-done');
          fill.animate([{ opacity:1 }, { opacity:.5 }, { opacity:1 }], { duration:300, iterations:2 });
          setPose(ctx, { yaw:0, pitch:0 }); flash(ctx, .3, 700, '#B6FFCF'); miniHop(ctx, 30); swapEyes(ctx, 'happy', 800);
        }, D + 100);
      }],
      ['orbit', (ctx: BotContext) => {   // tres puntos orbitan alrededor de él; por detrás se ven más chicos y tenues
        breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 700);
        const cy = ctx.shape.cy - 6, dots = [0, 1, 2].map(() => mk(ctx, 'circle', { cx:0, cy:0, r:5, class:'orbit-dot' }));
        const D = 1400;
        dots.forEach((d, i) => loop(ctx, d, Array.from({ length:33 }, (_, k) => {
          const u = k / 32, a = TAU * u + i * TAU / 3, z = Math.sin(a);
          return { offset:u, transform:`translate(${f2(100 + 82 * Math.cos(a))}px,${f2(cy + 22 * z - 10 * Math.cos(a))}px) scale(${f3(.65 + .35 * (z + 1) / 2)})`, opacity:+f3(.3 + .7 * (z + 1) / 2) };
        }), { duration:D, easing:'linear' }));
        animatePose(ctx, u => ({ yaw: .32 * Math.cos(TAU * u), pitch: .08 * Math.sin(TAU * u) }), D, { repeat:true });
        later(ctx, () => {   // los puntos se meten en él: ¡listo!
          stopLoops(ctx); setPose(ctx, { yaw:0, pitch:0 });
          dots.forEach(d => d.animate([{ transform:getComputedStyle(d).transform, opacity:1 }, { transform:`translate(100px,${cy}px) scale(.2)`, opacity:0 }], { duration:350, easing:'ease-in', fill:'forwards' }));
          later(ctx, () => { flash(ctx, .32, 700, '#B6FFCF'); miniHop(ctx, 30); swapEyes(ctx, 'happy', 800); }, 300);
        }, 3400);
      }],
      ['hourglass', (ctx: BotContext) => {   // la arena cae, lo voltea a la mitad y termina
    breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 700);
    const top = headTop(ctx) - 26, cx = 100;
    const g = mk(ctx, 'g', {}, ctx.el.z, `<path class="hg-frame" d="M${cx - 10} ${top - 14} H${cx + 10} L${cx + 2} ${top} L${cx + 10} ${top + 14} H${cx - 10} L${cx - 2} ${top} Z"/>
      <path class="hg-sand hgt" d="M${cx - 8} ${top - 12} H${cx + 8} L${cx} ${top - 1} Z"/><path class="hg-sand hgb" d="M${cx - 8} ${top + 12} H${cx + 8} L${cx} ${top + 2} Z"/>
      <rect class="hg-sand" x="${cx - .8}" y="${top - 1}" width="1.6" height="13"/>`);
    g.style.transformOrigin = `${cx}px ${top}px`;
    const tS = g.querySelector<SVGElement>('.hgt')!, bS = g.querySelector<SVGElement>('.hgb')!;
    tS.style.transformOrigin = `${cx}px ${top - 1}px`; bS.style.transformOrigin = `${cx}px ${top + 12}px`;
    const run = (a: SVGElement, b: SVGElement) => { a.animate([{ transform:S(1) }, { transform:S(.05) }], { duration:1400, fill:'forwards' }); b.animate([{ transform:S(.05) }, { transform:S(1) }], { duration:1400, fill:'forwards' }); };
    run(tS, bS);
    animatePose(ctx, u => ({ pitch: -.3 + .06 * Math.sin(TAU * u) }), 1600, { repeat:true });
    later(ctx, () => {   // lo voltea: lo que quedó abajo ahora está arriba y vuelve a caer
      g.animate([{ transform:'rotate(0deg)' }, { transform:'rotate(180deg)' }], { duration:480, easing:ctx.spring.easing, fill:'forwards' });
      animatePose(ctx, u => ({ pitch:-.3, roll: 10 * Math.sin(Math.PI * u) }), 480);
      later(ctx, () => run(bS, tS), 480);
    }, 1650);
    later(ctx, () => {
      stopLoops(ctx); setPose(ctx, { pitch:0 });
      g.animate([{ opacity:1, transform:'rotate(180deg) scale(1)' }, { opacity:0, transform:'rotate(180deg) scale(1.4)' }], { duration:400, fill:'forwards' });
      flash(ctx, .3, 700, '#B6FFCF'); miniHop(ctx, 28); swapEyes(ctx, 'happy', 800);
    }, 3700);
  }]
    ]
  };
