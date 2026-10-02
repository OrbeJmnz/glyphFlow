
import { blink, eyeSeq, lookTo, peek, swapEyes } from './eyes';
import { later, loop, play } from './timing';
import { S, TAU, easeInOut } from './math';
import { animatePose, setPose } from './pose-motion';
import { nodYes, wink } from './gestures';
import { SPARK_COLORS, breathe, cloudBubble, flushCheeks, gearPath, headTop, miniHop, mk, nod, popIn, showFor, sleepyZ, spark, spawnZ, squint, starPath, startle, stopLoops, tremble } from './actions';
import { flash, lit, sweep, tint } from './light';
import { f2, f3 } from '../data/color';
import type { GfBotSleepRoutine, GfBotWorkRoutine } from '../data/routines';
import { type BotContext } from './context';




  export const FIDGETS: Record<string, (ctx: BotContext) => void> = {
    lookSide(ctx: BotContext) { const d = Math.random() < .5 ? -1 : 1; lookTo(ctx, d * .9); later(ctx, () => lookTo(ctx, 0), 1500); },
    lookUp(ctx: BotContext) { lookTo(ctx, .25, -1); later(ctx, () => { lookTo(ctx, 0); blink(ctx); }, 1300); },
    stretch(ctx: BotContext) {
      play(ctx, ctx.el.breath, [{}, { transform:S(.93,1.11), offset:.35 }, { transform:S(.93,1.11), offset:.62 }, { transform:S(1.05,.95), offset:.8 }, { transform:S(1) }], { duration:1500, easing:'ease-in-out' });
      later(ctx, () => swapEyes(ctx, 'squeeze', 700), 350);
    },
    sway(ctx: BotContext) { animatePose(ctx, u => ({ roll: 6 * Math.sin(TAU * 2 * u) * (1 - u) }), 1500); },
    wink(ctx: BotContext) { wink(ctx); }
  };

  export function fidget(ctx: BotContext) {
    if (ctx.state !== 'idle') return;
    const keys = Object.keys(FIDGETS);
    FIDGETS[keys[Math.floor(Math.random() * keys.length)]](ctx);
    later(ctx, () => fidget(ctx), 4500 + Math.random() * 3500);
  }


  /** Una rutina por clave: la de reposo, las seis de trabajo y las nueve de sueño. */
  export const RUN: Record<'idle' | GfBotWorkRoutine | GfBotSleepRoutine, (ctx: BotContext) => void> = {
    idle(ctx: BotContext) {
      if (ctx.shape.float) { const fa = ctx.shape.floatAmp ?? 7; breathe(ctx, [{ transform:'translateY(0px)' }, { transform:`translateY(-${fa}px) scale(1.01,.99)` }], ctx.shape.floatDur ?? 1500); }   // el fantasma flota (el pulpo, muy poquito)
      else breathe(ctx, [{ transform:S(1) }, { transform:S(1.025,.975) }], 1600);
      ctx.fe.ants.forEach(a => loop(ctx, a, [{ transform:'rotate(-5deg)' }, { transform:'rotate(4deg)' }], { duration:2300, direction:'alternate', easing:'ease-in-out' }));
      if (ctx.opts.wander) later(ctx, () => fidget(ctx), 3000 + Math.random() * 2500);
    },
    typing(ctx: BotContext) {   // escribe en una hoja flotante: las líneas avanzan tecla por tecla, los ojos leen y hacen "retorno de carro"
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 900);
      setPose(ctx, { yaw:.34, pitch:.06 }); squint(ctx, .8);
      const x0 = 164, y0 = 30, W = [32, 27, 18];
      const doc = mk(ctx, 'g', { class:'plan' });
      doc.innerHTML = `<rect class="plan-card" x="${x0}" y="${y0}" width="46" height="54" rx="7"/><rect class="doc-title" x="${x0 + 7}" y="${y0 + 8}" width="20" height="4" rx="2"/>` +
        W.map((w, i) => `<rect class="doc-line" x="${x0 + 7}" y="${y0 + 20 + i * 9}" width="${w}" height="3" rx="1.5" style="transform-origin:${x0 + 7}px ${y0 + 21.5 + i * 9}px;transform:scaleX(0)"/>`).join('') +
        `<rect class="caret" x="${x0 + 7}" y="${y0 + 18}" width="1.6" height="7" rx=".8"/>`;
      popIn(ctx, doc, x0 + 23, y0 + 54);
      const lines = [...doc.querySelectorAll<SVGElement>('.doc-line')], caret = doc.querySelector<SVGElement>('.caret')!;
      loop(ctx, caret, [{ opacity:1 }, { opacity:0 }], { duration:520, easing:'steps(1, end)' });
      const L = 850, GAP = 170, T0 = 380;
      lines.forEach((ln, i) => {
        const w = W[i], keys = Math.round(w / 3), t0 = T0 + i * (L + GAP);
        later(ctx, () => {
          ln.animate([{ transform:'scaleX(0)' }, { transform:'scaleX(1)' }], { duration:L, easing:`steps(${keys}, end)`, fill:'forwards' });
          caret.animate([{ transform:`translate(0px,${i * 9}px)` }, { transform:`translate(${w}px,${i * 9}px)` }], { duration:L, easing:`steps(${keys}, end)`, fill:'forwards' });
          ctx.fe.eyes.animate([{ transform:'translateX(-3px)' }, { transform:'translateX(4px)' }], { duration:L, fill:'forwards' });   // lee mientras escribe
          // cada tecla: un golpecito del cuerpo y un parpadeo de la luz de la pantalla
          play(ctx, ctx.el.breath, [{}, ...Array.from({ length:keys * 2 }, (_, k) => ({ offset:(k + 1) / (keys * 2 + 1), transform: k % 2 ? S(1) : S(1.022,.974) })), { transform:S(1) }], { duration:L });
          tint(ctx, { rb:'#86E9FF' });
          lit(ctx, 'rb', Array.from({ length:keys + 1 }, (_, k) => ({ offset:k / keys, opacity: k % 2 ? .52 : .32 })), L, { easing:'steps(1, end)' });
        }, t0);
        // retorno de carro: los ojos regresan de golpe al inicio del renglón
        later(ctx, () => ctx.fe.eyes.animate([{ transform:'translateX(4px)' }, { transform:'translateX(-3px)' }], { duration:150, easing:'ease-in', fill:'forwards' }), t0 + L + 20);
      });
      later(ctx, () => {   // guardado: palomita en la hoja
        stopLoops(ctx); caret.style.visibility = 'hidden';
        ctx.fe.eyes.getAnimations().forEach(a => a.cancel());
        const mark = mk(ctx, 'path', { d:`M${x0 + 32} ${y0 + 10} L${x0 + 35} ${y0 + 13} L${x0 + 40.5} ${y0 + 6.5}`, class:'plan-mark', 'stroke-dasharray':14, 'stroke-dashoffset':14 }, doc);
        mark.animate([{ strokeDashoffset:14 }, { strokeDashoffset:0 }], { duration:300, fill:'forwards' });
        setPose(ctx, { yaw:0, pitch:0 }); nod(ctx, .18); swapEyes(ctx, 'happy', 700); flash(ctx, .14, 500, '#86E9FF');
        doc.animate([{ opacity:1 }, { opacity:0, transform:'translateY(-8px)' }], { duration:350, delay:650, fill:'forwards' });
      }, T0 + 3 * (L + GAP) + 80);
    },
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
    creating(ctx: BotContext) {   // brotan chispas de colores de su cabeza; cada una tiñe la luz; remata con un ¡ta-da!
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.03,.97) }], 300);
      animatePose(ctx, u => ({ yaw: .22 * Math.sin(TAU * u), pitch: -.18, roll: 4 * Math.sin(TAU * 2 * u) }), 1600, { repeat:true });
      ctx.fe.eyeList.forEach(e => loop(ctx, e, [{ transform:S(1.1,1.16) }, { transform:S(1.18,1.24) }], { duration:320, direction:'alternate', easing:'ease-in-out' }));
      const top = ctx.shape.cy - 62;
      spark(ctx, top); ctx.zTimer = setInterval(() => spark(ctx, top), 240);
      later(ctx, () => {   // ¡ta-da!
        clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null;
        ctx.subAnims.forEach(a => { if ((a.effect as KeyframeEffect | null)?.target !== ctx.el.breath) a.cancel(); });
        setPose(ctx, { yaw:0, pitch:0, roll:0 });
        for (let i = 0; i < 9; i++) spark(ctx, top, true);
        flash(ctx, .3, 800, SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]);
        miniHop(ctx, 30); swapEyes(ctx, 'happy', 900);
      }, 3500);
    },
    planning(ctx: BotContext) {   // escribe su lista, la palomea renglón por renglón (tachando cada uno) y le pone un sello de "listo"
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.015,.985) }], 900);
      const x0 = 164, y0 = 22, LW = [20, 16, 12];
      const card = mk(ctx, 'g', { class:'plan' });
      card.innerHTML = `<rect class="plan-card" x="${x0}" y="${y0}" width="48" height="62" rx="8"/><rect class="doc-title" x="${x0 + 8}" y="${y0 + 8}" width="22" height="4" rx="2"/>` +
        LW.map((w, i) => { const y = y0 + 19 + i * 13;
          return `<rect class="plan-box" x="${x0 + 8}" y="${y}" width="9" height="9" rx="2.5" style="transform-box:fill-box;transform-origin:center"/>
            <rect class="doc-line" x="${x0 + 21}" y="${y + 3}" width="${w}" height="3" rx="1.5" style="transform-origin:${x0 + 21}px ${y + 4.5}px;transform:scaleX(0)"/>
            <rect class="strike" x="${x0 + 19.5}" y="${y + 3.9}" width="${w + 3}" height="1.3" style="transform-origin:${x0 + 19.5}px ${y + 4.5}px;transform:scaleX(0)"/>
            <path class="plan-mark" d="M${x0 + 9.5} ${y + 4.5} L${x0 + 12} ${y + 7} L${x0 + 16.5} ${y + 1.5}" stroke-dasharray="14" stroke-dashoffset="14"/>`; }).join('');
      card.style.transformOrigin = `${x0}px ${y0 + 62}px`;
      card.animate([{ opacity:0, transform:'translateY(10px) rotate(8deg) scale(.7)' }, { opacity:1, transform:'rotate(-3deg)' }], { duration:ctx.spring.duration, easing:ctx.spring.easing, fill:'forwards' });
      const q = (s: string) => [...card.querySelectorAll<SVGElement>(s)], lines = q('.doc-line'), strikes = q('.strike'), marks = q('.plan-mark'), boxes = q('.plan-box');
      setPose(ctx, { yaw:.42, pitch:-.24 }); squint(ctx, .88);
      lines.forEach((ln, i) => later(ctx, () => {   // primero anota los pendientes
        ln.animate([{ transform:'scaleX(0)' }, { transform:'scaleX(1)' }], { duration:300, easing:'steps(5, end)', fill:'forwards' });
        setPose(ctx, { yaw:.42, pitch:-.24 + i * .1 });
        play(ctx, ctx.el.breath, [{}, { transform:S(1.02,.975), offset:.3 }, { transform:S(1) }], { duration:300 });
      }, 380 + i * 320));
      let lift = 0;
      [1500, 2180, 2860].forEach((t, i) => later(ctx, () => {
        setPose(ctx, { yaw:.42, pitch:-.24 + i * .12 });   // baja la mirada renglón por renglón
        boxes[i].animate([{ transform:S(1) }, { transform:S(1.35) }, { transform:S(1) }], { duration:300 });
        marks[i].animate([{ strokeDashoffset:14 }, { strokeDashoffset:0 }], { duration:240, easing:'ease-out', fill:'forwards' });
        strikes[i].animate([{ transform:'scaleX(0)' }, { transform:'scaleX(1)' }], { duration:220, delay:170, fill:'forwards' });
        lines[i].animate([{ opacity:1 }, { opacity:.4 }], { duration:300, delay:200, fill:'forwards' });
        ctx.subAnims.push(ctx.el.L.lift.animate([{ opacity:lift }, { opacity:lift + .06 }], { duration:320, fill:'forwards' })); lift += .06;
        nod(ctx, .16, 300); blink(ctx);
      }, t));
      later(ctx, () => {   // ¡sello!
        const st = mk(ctx, 'g', { class:'stamp' }, card, `<circle cx="${x0 + 40}" cy="${y0 + 55}" r="9"/><path d="M${x0 + 36} ${y0 + 55} L${x0 + 39} ${y0 + 58} L${x0 + 44.5} ${y0 + 51.5}"/>`);
        st.style.transformOrigin = `${x0 + 40}px ${y0 + 55}px`;
        st.animate([{ transform:'scale(2.2) rotate(-25deg)', opacity:0 }, { transform:'scale(.9) rotate(-8deg)', opacity:1, offset:.7 }, { transform:'scale(1) rotate(-10deg)', opacity:1 }], { duration:380, easing:'ease-in', fill:'forwards' });
        later(ctx, () => card.animate([{ transform:'rotate(-3deg)' }, { transform:'rotate(-3deg) translateY(2px)' }, { transform:'rotate(-3deg)' }], { duration:200 }), 280);
      }, 3300);
      later(ctx, () => {
        stopLoops(ctx); setPose(ctx, { yaw:0, pitch:0 });
        card.animate([{ opacity:1, transform:'rotate(-3deg)' }, { opacity:0, transform:'translateY(-10px) rotate(-3deg)' }], { duration:400, delay:420, fill:'forwards' });
        flash(ctx, .26, 800, '#9CFFB8'); miniHop(ctx, 24); swapEyes(ctx, 'happy', 800);
      }, 3760);
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
    deep(ctx: BotContext) {
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.045,.955) }], 2400);
      loop(ctx, ctx.el.shadow, [{ transform:S(1) }, { transform:S(1.06) }], { duration:2400, direction:'alternate', easing:'ease-in-out' });
      loop(ctx, ctx.el.L.dim, [{ opacity:.36 }, { opacity:.26 }], { duration:2400, direction:'alternate', easing:'ease-in-out' });   // al inhalar se aclara un poco
      spawnZ(ctx); ctx.zTimer = setInterval(() => spawnZ(ctx), 1150);
    },
    nodding(ctx: BotContext) {
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.03,.97) }], 2000);
      // la cabeza cae hacia adelante despacio y se endereza de golpe, entreabriendo los ojos
      const nod = (u: number) => u < .72 ? .5 * Math.pow(u / .72, 2) : u < .8 ? .5 - .58 * ((u - .72) / .08) : -.08 * (1 - (u - .8) / .2);
      animatePose(ctx, u => ({ pitch: nod(u), roll: -5 }), 2600, { repeat:true });
      later(ctx, () => peek(ctx), 2600 * .76 + ctx.spring.duration * .6); later(ctx, () => peek(ctx), 2600 * 1.76 + ctx.spring.duration * .6);
      later(ctx, () => spawnZ(ctx), 400);
    },
    bubble(ctx: BotContext) {   // una burbuja tornasol crece al exhalar y se achica al inhalar, cada vez más grande… hasta que revienta
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.04,.96) }], 2000);
      const fy = ctx.shape.faceY, bx = 106, by = fy + 16, D = 3500;
      const g = mk(ctx, 'g', { class:'bub' }, ctx.fe.faceFx, `<circle cx="${bx + 7}" cy="${by}" r="8" class="bub-film" fill="url(#${ctx.id}-irid)"/>
        <circle cx="${bx + 7}" cy="${by}" r="8" class="bub-rim" stroke="url(#${ctx.id}-irid)"/><ellipse cx="${bx + 4.3}" cy="${by - 3.2}" rx="2.3" ry="1.4" class="bub-hi"/>`);
      g.style.transformOrigin = `${bx}px ${by}px`;
      g.animate([{ transform:S(.05) }, { transform:S(.6), offset:.28 }, { transform:S(.38), offset:.56 }, { transform:S(1.1), offset:.84 }, { transform:S(1.3) }], { duration:D, easing:'ease-in-out', fill:'forwards' });
      const film = g.firstElementChild as SVGElement; film.style.transformBox = 'fill-box'; film.style.transformOrigin = 'center';
      loop(ctx, film, [{ transform:S(1.05,.95) }, { transform:S(.95,1.05) }], { duration:380, direction:'alternate', easing:'ease-in-out' });   // la película tiembla
      later(ctx, () => {   // ¡pop!
        g.remove();
        const cx = bx + 7 * 1.3, cy = by;
        const ring = mk(ctx, 'circle', { cx, cy, r:10, class:'bub-rim', stroke:`url(#${ctx.id}-irid)` }, ctx.fe.faceFx);
        ring.style.transformOrigin = `${cx}px ${cy}px`;
        ring.animate([{ transform:S(1), opacity:1 }, { transform:S(1.8), opacity:0 }], { duration:240, easing:'ease-out', fill:'forwards' });
        for (let i = 0; i < 6; i++) {
          const a = -Math.PI * .9 + i * Math.PI * .36, d = 12 + Math.random() * 8;
          const dr = mk(ctx, 'circle', { cx, cy, r:1.6, class:'drop' }, ctx.fe.faceFx);
          dr.animate([{ transform:'translate(0,0)', opacity:1 }, { transform:`translate(${f2(Math.cos(a) * d)}px,${f2(Math.sin(a) * d)}px)`, opacity:1, offset:.5 }, { transform:`translate(${f2(Math.cos(a) * d * 1.3)}px,${f2(Math.sin(a) * d + 16)}px)`, opacity:0 }],
            { duration:520, easing:'cubic-bezier(.2,.7,.6,1)', fill:'forwards' });
        }
        // se medio despierta del susto y vuelve a dormirse
        startle(ctx, 700, .9); tremble(ctx, 240, 1, 30); lit(ctx, 'lift', [{ opacity:0 }, { opacity:.1, offset:.2 }, { opacity:0 }], 400);
      }, D);
      later(ctx, () => spawnZ(ctx), D + 800);
    },

    snoring(ctx: BotContext) {   // inhala (el aire entra por la nariz), exhala de golpe con una Z; el segundo ronquido es más fuerte
      const D = 2300, fy = ctx.shape.faceY;
      loop(ctx, ctx.el.breath, [{ transform:S(1) }, { transform:S(.97,1.07), offset:.6, easing:'ease-in-out' }, { transform:S(1.08,.92), offset:.72 }, { transform:S(1.02,.98), offset:.8 }, { transform:S(1.05,.95), offset:.86 }, { transform:S(1) }], { duration:D });
      loop(ctx, ctx.el.shadow, [{ transform:S(1) }, { transform:S(.95), offset:.6 }, { transform:S(1.09), offset:.72 }, { transform:S(1) }], { duration:D });
      loop(ctx, ctx.el.L.dim, [{ opacity:.36 }, { opacity:.24, offset:.6 }, { opacity:.42, offset:.74 }, { opacity:.36 }], { duration:D });
      const wisp = (t0: number) => later(ctx, () => {   // aire que entra: dos "~" se acercan a la cara y desaparecen
        [0, 1].forEach(k => {
          const x = 158 + k * 12, y = fy + 8 + k * 6, w = mk(ctx, 'text', { x, y, class:'wisp', 'font-size':14 });
          w.textContent = '~';
          w.animate([{ transform:'translate(0,0)', opacity:0 }, { opacity:.8, offset:.3 }, { transform:'translate(-34px,2px)', opacity:0 }], { duration:1000, delay:k * 180, easing:'ease-in', fill:'forwards' });
        });
      }, t0);
      const snore = (t0: number, big?: boolean) => later(ctx, () => {
        sleepyZ(ctx, big); tremble(ctx, big ? 460 : 260, big ? 1.9 : 1, 34);
        ctx.fe.closed.forEach(c => c.animate(Array.from({ length:9 }, (_, k) => ({ offset:k / 8, transform: k % 2 ? 'translateY(.9px)' : 'translateY(0)' })), { duration:420 }));   // los párpados vibran
        lit(ctx, 'gloss', [{ transform:S(1) }, { transform:S(1.16,.84), offset:.3 }, { transform:S(1) }], 420);
        for (let k = 0; k < (big ? 3 : 2); k++) {   // líneas de aire que salen
          const y = fy + 8 + (k - 1) * 7, l = mk(ctx, 'path', { d:`M140 ${y} q8 -3 16 0`, class:'air', 'stroke-dasharray':18, 'stroke-dashoffset':18 });
          l.animate([{ strokeDashoffset:18, opacity:1, transform:'translateX(0)' }, { strokeDashoffset:0, opacity:1, offset:.5 }, { strokeDashoffset:0, opacity:0, transform:'translateX(12px)' }], { duration:600, delay:k * 50, fill:'forwards' });
        }
      }, t0);
      wisp(D * .15); snore(D * .72, false); wisp(D * 1.15); snore(D * 1.72, true);
    },
    dreaming(ctx: BotContext) {   // sonríe dormido y se sonroja; en la nube de sueño pasan una estrella, un corazón y un pez, cada uno con su gesto
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.04,.96) }], 2200);
      const D = 4400;
      ctx.fe.closed.forEach(c => c.animate([{ opacity:1 }, { opacity:0, offset:.08 }, { opacity:0, offset:.92 }, { opacity:1 }], { duration:D }));
      showFor(ctx, ctx.fe.happy, D);
      flushCheeks(ctx, D);
      const top = headTop(ctx), cx = 154, cy = top - 30;
      const cloud = cloudBubble(ctx, top, cx, cy);
      loop(ctx, cloud, [{ transform:'translateY(0px)' }, { transform:'translateY(-3px)' }], { duration:1100, direction:'alternate', easing:'ease-in-out', delay:600 });
      tint(ctx, { rt:'#FFC6E0' }); loop(ctx, ctx.el.L.rt, [{ opacity:.08 }, { opacity:.26 }], { duration:1300, direction:'alternate', easing:'ease-in-out' });
      const ICONS = [
        { svg:`<path d="${starPath(cx + 1, cy, 8)}" fill="#FFD24A"/>`, move: (ic: SVGElement) => ic.animate([{ transform:'rotate(0deg) scale(1)' }, { transform:'rotate(25deg) scale(1.15)' }], { duration:320, direction:'alternate', iterations:4, easing:'ease-in-out' }) },
        { svg:`<path d="M${cx + 1} ${cy + 7} C${cx - 11} ${cy - 1} ${cx - 5} ${cy - 11} ${cx + 1} ${cy - 4} C${cx + 7} ${cy - 11} ${cx + 13} ${cy - 1} ${cx + 1} ${cy + 7} Z" fill="#FF5FA8"/>`,
          move: (ic: SVGElement) => { ic.animate([{ transform:S(1) }, { transform:S(1.22), offset:.15 }, { transform:S(1), offset:.3 }, { transform:S(1.22), offset:.45 }, { transform:S(1), offset:.6 }, { transform:S(1) }], { duration:900 });
            animatePose(ctx, u => ({ roll: -5 + 5 * Math.sin(TAU * 2 * u) * Math.sin(Math.PI * u) }), 900);   // se acurruca de gusto
            lit(ctx, 'rt', [{ opacity:.2 }, { opacity:.45, offset:.3 }, { opacity:.2 }], 900); } },
        { svg:`<path d="M${cx - 9} ${cy} Q${cx} ${cy - 9} ${cx + 8} ${cy} Q${cx} ${cy + 9} ${cx - 9} ${cy} Z M${cx + 8} ${cy} L${cx + 13} ${cy - 5} L${cx + 13} ${cy + 5} Z" fill="#47E4FF"/>`,
          move: (ic: SVGElement) => ic.animate([{ transform:'translateX(-3px) rotate(-6deg)' }, { transform:'translateX(3px) rotate(6deg)' }], { duration:300, direction:'alternate', iterations:4, easing:'ease-in-out' }) }
      ];
      ICONS.forEach((it, i) => later(ctx, () => {
        const wrap = mk(ctx, 'g', {}, cloud), ic = mk(ctx, 'g', {}, wrap, it.svg);
        wrap.style.transformOrigin = ic.style.transformOrigin = `${cx}px ${cy}px`;
        wrap.animate([{ transform:'scale(0) rotate(-30deg)', opacity:0 }, { transform:'scale(1) rotate(0deg)', opacity:1, offset:.22 }, { transform:S(1), opacity:1, offset:.82 }, { transform:S(.3), opacity:0 }], { duration:1300, easing:'ease-out' }).onfinish = () => wrap.remove();
        later(ctx, () => it.move(ic), 260);
        later(ctx, () => {   // destellito al irse
          const s = mk(ctx, 'path', { d:starPath(cx + 14, cy - 12, 3), class:'star' }, cloud);
          s.style.transformOrigin = `${cx + 14}px ${cy - 12}px`;
          s.animate([{ transform:S(0), opacity:0 }, { transform:S(1.2), opacity:1, offset:.4 }, { transform:S(0), opacity:0 }], { duration:450, fill:'forwards' });
        }, 1050);
      }, 450 + i * 1300));
    },
    counting(ctx: BotContext) {   // ovejitas corren, saltan la cerca y aterrizan levantando polvo; él las va contando en su nube
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.04,.96) }], 2400);
      setPose(ctx, { yaw:.28, roll:-5 });
      const W = ctx.el.world, top = headTop(ctx);
      mk(ctx, 'g', { class:'fence' }, W, `<path d="M188 193 V170 l2 -3 l2 3 V193 Z"/><path d="M201 193 V170 l2 -3 l2 3 V193 Z"/><rect x="184" y="174" width="25" height="3" rx="1.5"/><rect x="184" y="183" width="25" height="3" rx="1.5"/>`);
      mk(ctx, 'path', { class:'grass', d:'M160 194 q2 -5 3 0 q2 -6 3 0 M214 194 q2 -5 3 0 q2 -6 3 0 M226 194 q2 -4 3 0' }, W);
      // su nube con el conteo
      const cb = mk(ctx, 'g', { class:'dream' }, ctx.el.z, `<circle cx="126" cy="${top + 4}" r="2.4"/><circle cx="134" cy="${top - 5}" r="3.4"/><circle cx="148" cy="${top - 18}" r="11"/>`);
      popIn(ctx, cb, 130, top);
      const count = mk(ctx, 'text', { x:148, y:top - 13.5, class:'count', 'text-anchor':'middle', 'font-size':13 }, cb);
      count.style.transformOrigin = `148px ${top - 18}px`;
      let n = 0;
      const RUNX = (u: number) => 240 - 96 * u, J0 = .26, J1 = .66;
      const sheep = () => {
        const g = mk(ctx, 'g', { class:'sheep' }, W, `<g class="legs"><rect x="-6" y="-5" width="2.2" height="6" rx="1"/><rect x="-2" y="-5" width="2.2" height="6" rx="1"/><rect x="6" y="-5" width="2.2" height="6" rx="1"/><rect x="10" y="-5" width="2.2" height="6" rx="1"/></g>
          <circle cx="-5" cy="-10" r="5"/><circle cx="1" cy="-13" r="6"/><circle cx="8" cy="-12.5" r="6"/><circle cx="12" cy="-9" r="5"/><circle cx="3" cy="-7" r="6"/>
          <ellipse class="sheep-head" cx="-10" cy="-11" rx="4" ry="3.4"/><ellipse class="sheep-head" cx="-9" cy="-15" rx="1.6" ry="2.6" transform="rotate(-35 -9 -15)"/><circle cx="-11.2" cy="-11.6" r=".8" fill="#fff"/>`);
        [...g.querySelectorAll<SVGElement>('.legs rect')].forEach((leg, i) => {   // patitas corriendo
          leg.style.transformBox = 'fill-box'; leg.style.transformOrigin = 'center top';
          leg.animate([{ transform:'rotate(28deg)' }, { transform:'rotate(-28deg)' }], { duration:170, direction:'alternate', iterations:Infinity, delay:(i % 2) * 85 });
        });
        const F = Array.from({ length:41 }, (_, i) => {
          const u = i / 40, x = RUNX(u), inJ = u > J0 && u < J1, t = (u - J0) / (J1 - J0);
          const y = inJ ? 32 * Math.sin(Math.PI * t) : Math.abs(Math.sin(u * 40)) * 1.2;
          const rot = inJ ? -14 + 26 * t : 0;
          const land = u >= J1 && u < J1 + .07 ? Math.sin(Math.PI * (u - J1) / .07) : 0;
          return { offset:u, transform:`translate(${f2(x)}px,${f2(193 - y)}px) rotate(${f2(rot)}deg) scale(${f3(1 + .14 * land)},${f3(1 - .14 * land)})`,
            opacity: u < .06 ? +f3(u / .06) : u > .9 ? +f3((1 - u) / .1) : 1 };
        });
        const D = 1600;
        g.animate(F, { duration:D, easing:'linear' }).onfinish = () => g.remove();
        later(ctx, () => {   // aterriza: polvo, cuenta y asiente
          for (let k = 0; k < 3; k++) {
            const d = mk(ctx, 'circle', { cx:RUNX(J1) - 2 + k * 5, cy:192, r:2.4, class:'dust' }, W);
            d.style.transformOrigin = `${RUNX(J1) - 2 + k * 5}px 192px`;
            d.animate([{ transform:'translate(0,0) scale(.4)', opacity:.8 }, { transform:`translate(${(k - 1) * 6}px,-5px) scale(1.4)`, opacity:0 }], { duration:500, fill:'forwards' });
          }
          n++; count.textContent = String(n);
          count.animate([{ transform:S(1.6), opacity:.3 }, { transform:S(1), opacity:1 }], { duration:320, easing:ctx.spring.easing });
          nod(ctx, .1, 420);
          if (n === 3) lit(ctx, 'dim', [{ opacity:.36 }, { opacity:.46 }], 800, { fill:'forwards' });   // a la tercera se duerme más profundo
        }, D * J1);
      };
      sheep(); ctx.zTimer = setInterval(sheep, 1450);
    },
    sleepwalking(ctx: BotContext) {   // camina dormido: pasitos de un lado a otro, mirando hacia donde va
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.03,.97) }], 2000);
      const D = 4400, F = [], SH = [];
      for (let i = 0; i <= 64; i++) {
        const u = i / 64, x = 32 * Math.sin(TAU * u), step = Math.abs(Math.sin(TAU * 4 * u));
        F.push({ offset:u, transform:`translate(${f2(x)}px,${f2(-4 * step)}px) ${S(f3(1 + .03 * (1 - step)), f3(1 - .03 * (1 - step)))}` });
        SH.push({ offset:u, transform:`translateX(${f2(x)}px) scale(${f3(1 - .06 * step)})` });
      }
      loop(ctx, ctx.el.hop, F, { duration:D, easing:'linear' }); loop(ctx, ctx.el.shadow, SH, { duration:D, easing:'linear' });
      animatePose(ctx, u => ({ yaw: .32 * Math.cos(TAU * u), roll: -5 + 4 * Math.sin(TAU * 4 * u) }), D, { repeat:true });
      sleepyZ(ctx); ctx.zTimer = setInterval(() => sleepyZ(ctx), 1600);
    },
    nearFall(ctx: BotContext) {   // se mece cada vez más… se va de lado… ¡se endereza de un brinco!, mira alrededor, suspira y se vuelve a dormir
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.03,.97) }], 2000);
      const D = 4600;
      const roll = (u: number) => {
        if (u < .45) { const k = u / .45; return -5 - 6 * k + (2 + 7 * k) * Math.sin(TAU * 2 * k); }
        if (u < .62) { const k = (u - .45) / .17; return -11 - 22 * k * k; }
        if (u < .72) { const k = (u - .62) / .1; return -33 + 41 * (1 - Math.pow(1 - k, 3)); }
        if (u < .8) { const k = (u - .72) / .08; return 8 * (1 - k) - 3 * Math.sin(Math.PI * k); }
        return -5 * easeInOut((u - .8) / .2);
      };
      const yaw = (u: number) => u > .66 && u < .82 ? .42 * Math.sin(TAU * (u - .66) / .16) : 0;
      const pitch = (u: number) => u < .62 ? .18 * Math.min(1, u / .45) : 0;
      animatePose(ctx, u => ({ roll:roll(u), yaw:yaw(u), pitch:pitch(u) }), D);
      ctx.el.shadow.animate(Array.from({ length:47 }, (_, i) => { const u = i / 46; return { offset:u, transform:`translateX(${f2(roll(u) * .7)}px) scale(${f3(1 + Math.abs(roll(u)) / 120)},1)` }; }), { duration:D });
      later(ctx, () => {   // "!" y susto
        const t = mk(ctx, 'text', { x:100, y:headTop(ctx) - 8, class:'qmark', 'text-anchor':'middle', 'font-size':28 });
        t.textContent = '!'; t.style.transformOrigin = `100px ${headTop(ctx) - 16}px`;
        t.animate([{ transform:S(0), opacity:0 }, { transform:S(1.3), opacity:1, offset:.2 }, { transform:S(1), opacity:1, offset:.7 }, { transform:S(1), opacity:0 }], { duration:900, fill:'forwards' });
        startle(ctx, D * .3, 1.3); miniHop(ctx, 12); tremble(ctx, 260, 1.6, 30);
        ctx.fe.sweat.animate([{ transform:'translateY(-4px)', opacity:0 }, { transform:'translateY(0)', opacity:1, offset:.2 }, { transform:'translateY(12px)', opacity:0 }], { duration:1000 });
        lit(ctx, 'dim', [{ opacity:.36 }, { opacity:.1, offset:.12 }, { opacity:.1, offset:.6 }, { opacity:.36 }], D * .38);
      }, D * .62);
      later(ctx, () => play(ctx, ctx.el.breath, [{}, { transform:S(1.02,1.03), offset:.3 }, { transform:S(1.06,.93), offset:.7 }, { transform:S(1) }], { duration:900, easing:'ease-in-out' }), D * .82);   // suspiro de alivio
    },
    night(ctx: BotContext) {   // aparece la luna (su luz le pega por la izquierda), titilan estrellas y cruza una estrella fugaz
      breathe(ctx, [{ transform:S(1) }, { transform:S(1.04,.96) }], 2400);
      const top = headTop(ctx);
      const moon = mk(ctx, 'path', { d:`M40 ${top - 34} A14 14 0 1 0 40 ${top - 6} A10.5 10.5 0 1 1 40 ${top - 34} Z`, class:'moon' }, ctx.el.world);
      popIn(ctx, moon, 36, top - 20);
      [[70, top - 40, 3], [128, top - 46, 4], [160, top - 20, 3], [22, top + 8, 2.5], [176, top + 18, 2.5], [100, top - 58, 3]].forEach(([x, y, r], i) => {
        const s = mk(ctx, 'path', { d:starPath(x, y, r), class:'star' }, ctx.el.world);
        s.style.transformOrigin = `${x}px ${y}px`;
        loop(ctx, s, [{ opacity:.2, transform:S(.7) }, { opacity:1, transform:S(1.15) }], { duration:700 + i * 130, direction:'alternate', easing:'ease-in-out', delay:i * 180 });
      });
      tint(ctx, { rl:'#FFE9A8', mood:'#5B6BFF' });
      lit(ctx, 'rl', [{ opacity:0 }, { opacity:.3 }], 1200, { fill:'forwards' });
      loop(ctx, ctx.el.L.mood, [{ opacity:.1 }, { opacity:.2 }], { duration:2400, direction:'alternate', easing:'ease-in-out' });
      later(ctx, () => {   // estrella fugaz
        const sh = mk(ctx, 'path', { d:'M0 0 L-26 -6', class:'shoot' }, ctx.el.world);
        sh.animate([{ transform:`translate(10px,${top - 60}px)`, opacity:0 }, { opacity:1, offset:.2 }, { transform:`translate(210px,${top - 20}px)`, opacity:0 }], { duration:900, easing:'ease-in' });
        sweep(ctx, 900, { color:'#FFE9A8', from:10, to:190, peak:.3 });
      }, 2600);
      sleepyZ(ctx); ctx.zTimer = setInterval(() => sleepyZ(ctx), 1700);
    }
  };
