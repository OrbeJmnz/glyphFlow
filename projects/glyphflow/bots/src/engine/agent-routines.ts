import { f2, f3 } from '../data/color';
import { breathe, cloudBubble, gearPath, headTop, miniHop, mk, nod, popIn, showFor, squint, stopLoops } from './actions';
import { blink, eyeSeq, swapEyes } from './eyes';
import { nodYes } from './gestures';
import { flash, lit, tint } from './light';
import { S, TAU } from './math';
import { animatePose, setPose } from './pose-motion';
import { later, loop, play } from './timing';
import type { GfBotWorkRoutine } from '../data/routines';
import { type BotContext } from './context';

/**
 * Las tres rutinas de trabajo que usan las escenas del modo IA (`bot.agent('thinking' | 'tool' | 'loading')`) y sus variantes. Viven en el
 * motor a propósito: el modo IA tiene que verse bien sin pedir nada más. El resto de las rutinas está en `glyphflow/bots/extras`.
 */
export type GfBotAgentRoutine = Extract<GfBotWorkRoutine, 'thinking' | 'analyzing' | 'loading'>;

export const AGENT_RUN: Record<GfBotAgentRoutine, (ctx: BotContext) => void> = {
    thinking(ctx: BotContext) {   // piensa con engranes dentro de una nube; al final los engranes se vuelven un foco que se enciende
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 1800);
      animatePose(ctx, u => ({ yaw: .3 * Math.sin(TAU * u), pitch: -.3, roll: 4 * Math.sin(TAU * u) }), 3000, { repeat:true });
      squint(ctx, .86);
      const top = headTop(ctx), cx = 152, cy = top - 28;
      const cloud = cloudBubble(ctx, top, cx, cy);
      const g1 = mk(ctx, 'path', { d:gearPath(cx - 2, cy + 1, 5.2, 8), class:'gear' }, cloud), g2 = mk(ctx, 'path', { d:gearPath(cx + 9, cy - 5, 3.5, 6), class:'gear gear2' }, cloud);
      [g1, g2].forEach(g => { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; g.style.opacity = '0'; g.animate([{ opacity:0 }, { opacity:1 }], { duration:300, delay:500, fill:'forwards' }); });
      loop(ctx, g1, [{ transform:'rotate(0deg)' }, { transform:'rotate(360deg)' }], { duration:1800, easing:'linear' });
      loop(ctx, g2, [{ transform:'rotate(0deg)' }, { transform:'rotate(-360deg)' }], { duration:1200, easing:'linear' });
      later(ctx, () => blink(ctx), 1500);
      later(ctx, () => {   // los engranes se aceleran justo antes de la idea
        loop(ctx, g1, [{ transform:'rotate(0deg)' }, { transform:'rotate(360deg)' }], { duration:500, easing:'linear' });
        loop(ctx, g2, [{ transform:'rotate(0deg)' }, { transform:'rotate(-360deg)' }], { duration:340, easing:'linear' });
      }, 2500);
      later(ctx, () => {   // ¡idea!
        stopLoops(ctx); setPose(ctx, { yaw:0, pitch:-.24, roll:0 });
        [g1, g2].forEach(g => g.animate([{ opacity:1, transform:S(1) }, { opacity:0, transform:S(.2) }], { duration:200, fill:'forwards' }));
        const bulb = mk(ctx, 'g', {}, cloud, `<g class="rays">${Array.from({ length:8 }, (_, k) => { const a = k / 8 * TAU; return `<path d="M${f2(cx + 1 + Math.cos(a) * 10)} ${f2(cy - 1 + Math.sin(a) * 10)} L${f2(cx + 1 + Math.cos(a) * 14)} ${f2(cy - 1 + Math.sin(a) * 14)}"/>`; }).join('')}</g>
          <circle cx="${cx + 1}" cy="${cy - 2}" r="6.5" class="bulb-glass"/><rect x="${cx - 2}" y="${cy + 4}" width="6" height="4" rx="1.2" class="bulb-base"/>`);
        popIn(ctx, bulb, cx + 1, cy);
        const rays = bulb.querySelector<SVGElement>('.rays')!; rays.style.transformOrigin = `${cx + 1}px ${cy - 1}px`;
        rays.animate([{ transform:S(.5), opacity:0 }, { transform:S(1.15), opacity:1, offset:.4 }, { transform:S(1), opacity:.9 }], { duration:500, fill:'forwards' });
        eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.28,1.32), offset:.3 }, { transform:S(1.28,1.32), offset:.8 }, { transform:S(1) }], 520);
        flash(ctx, .4, 950, '#FFE27A');   // la luz del foco lo baña desde arriba
        later(ctx, () => { setPose(ctx, { pitch:0 }); miniHop(ctx, 26); swapEyes(ctx, 'happy', 800); }, 360);
        cloud.animate([{ opacity:1 }, { opacity:0, transform:'translateY(-8px)' }], { duration:350, delay:900, fill:'forwards' });
      }, 3150);
    },
    analyzing(ctx: BotContext) {   // barre la escena de lado a lado, con los ojos muy abiertos
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 700);
      animatePose(ctx, u => ({ yaw: .75 * Math.sin(TAU * u), pitch: -.06 + .06 * Math.cos(TAU * 2 * u) }), 2600, { repeat:true, easing:'linear' });
      ctx.fe.eyeList.forEach(e => loop(ctx, e, [{ transform:S(1.08,1.12) }, { transform:S(1.08,1.12) }], { duration:1000 }));
      // un haz de escaneo cruza el cuerpo al ritmo de la cabeza
      tint(ctx, { sh:'#8FF3FF' });
      loop(ctx, ctx.el.L.sheen, Array.from({ length:25 }, (_, i) => { const u = i / 24; return { offset:u, transform:`translateX(${f2(100 + 60 * Math.sin(TAU * u))}px) skewX(-8deg)`, opacity:+f3(.28 + .12 * Math.abs(Math.cos(TAU * u))) }; }),
        { duration:2600, easing:'linear', delay:ctx.spring.duration * .6 });
      later(ctx, () => {   // lo encontró: asiente
        ctx.subAnims.forEach(a => { if ((a.effect as KeyframeEffect | null)?.target !== ctx.el.breath) a.cancel(); });
        setPose(ctx, { yaw:0, pitch:0 });
        later(ctx, () => { nodYes(ctx); }, 250);
      }, 3700);
    },
    loading(ctx: BotContext) {
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 600);
      ctx.el.spinner.setAttribute('opacity', '1');
      loop(ctx, ctx.el.spinner, [{ transform:'rotate(0deg)' }, { transform:'rotate(360deg)' }], { duration:1200, easing:'linear' });
      // la cabeza sigue al spinner en círculo
      animatePose(ctx, u => ({ yaw: .3 * Math.sin(TAU * u), pitch: -.22 - .12 * Math.cos(TAU * u) }), 1200, { repeat:true });
      // el spinner ilumina la coronilla con el color del bot, latiendo con cada vuelta
      tint(ctx, { rt: getComputedStyle(ctx.svg).getPropertyValue('--c1').trim() || '#fff' });
      loop(ctx, ctx.el.L.rt, [{ opacity:.25 }, { opacity:.55 }], { duration:600, direction:'alternate', easing:'ease-in-out' });
      later(ctx, () => {   // ¡listo!
        ctx.subAnims.forEach(a => { if ((a.effect as KeyframeEffect | null)?.target !== ctx.el.breath) a.cancel(); });
        ctx.el.spinner.setAttribute('opacity', '0'); setPose(ctx, { yaw:0, pitch:0 });
        flash(ctx, .3, 700, '#B6FFCF');
        eyeSeq(ctx, [{ transform:S(1,.1) }, { transform:S(1.2,1.25), offset:.35 }, { transform:S(1) }], 420);
        later(ctx, () => { miniHop(ctx, 34); swapEyes(ctx, 'happy', 800); }, 300);
      }, 3600);
    },
};

/** Cada una trae varias versiones: `[etiqueta, correr]`; cada vez que toca sale la siguiente. */
export const AGENT_WORK: Record<GfBotAgentRoutine, [string, (ctx: BotContext) => void][]> = {
    thinking: [
      ['idea', (ctx: BotContext) => AGENT_RUN.thinking(ctx)],
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
      ['scanning', (ctx: BotContext) => AGENT_RUN.analyzing(ctx)],
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
    loading: [
      ['spinning', (ctx: BotContext) => AGENT_RUN.loading(ctx)],
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
    ],
};
