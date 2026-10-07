import { gfBotKit as kit, type GfBotInternalContext as BotContext } from 'glyphflow/bots';
import type { GfBotWorkRoutine } from 'glyphflow/bots';
import { RUN } from './routines-run';





  /** Cada rutina de trabajo trae varias versiones: `[etiqueta, correr]`; cada vez que toca sale la siguiente. */
  export const WORK: Partial<Record<GfBotWorkRoutine, [string, (ctx: BotContext) => void][]>> = {
    typing: [
      ['tapping', (ctx: BotContext) => RUN.typing(ctx)],
      ['rushing', (ctx: BotContext) => {   // teclea rapidísimo a ráfagas y remata con un "enter"
        kit.internal.typing(ctx, 2.2);
        kit.internal.play(ctx, ctx.el.breath, [{}, ...Array.from({ length:12 }, (_, i) => ({ offset:(i + 1) / 13, transform: i % 2 ? kit.S(1.03,.96) : kit.S(1) })), { transform:kit.S(1) }], { duration:1600 });
        kit.later(ctx, () => kit.internal.play(ctx, ctx.el.breath, [{}, ...Array.from({ length:12 }, (_, i) => ({ offset:(i + 1) / 13, transform: i % 2 ? kit.S(1.03,.96) : kit.S(1) })), { transform:kit.S(1) }], { duration:1500 }), 1800);
        kit.later(ctx, () => { kit.internal.stopLoops(ctx); ctx.el.dots.setAttribute('opacity', '0'); kit.internal.setPose(ctx, { pitch:0 }); kit.internal.miniHop(ctx, 16); kit.internal.blink(ctx); kit.internal.flash(ctx, .18, 500, '#86E9FF'); }, 3400);
      }],
      ['fixing', (ctx: BotContext) => {   // escribe, se detiene, frunce el ceño, borra y vuelve a escribir
        kit.internal.typing(ctx, 1);
        kit.later(ctx, () => {
          kit.internal.stopLoops(ctx);
          ctx.el.dotList.slice().reverse().forEach((d, i) => d.animate([{ opacity:1, transform:kit.S(1) }, { opacity:0, transform:kit.S(.2) }], { duration:180, delay:i * 160, fill:'forwards' }));
          kit.internal.showFor(ctx, ctx.fe.browA, 1300); kit.internal.holdEyes(ctx, kit.S(1,.6), 1300);
          kit.internal.animatePose(ctx, u => ({ pitch:.08, yaw: .25 * Math.sin(kit.internal.TAU * 2 * u) * (1 - u) }), 800);
        }, 1400);
        kit.later(ctx, () => { ctx.el.dotList.forEach(d => d.getAnimations().forEach(a => a.cancel())); kit.internal.typing(ctx, 1.3); }, 2800);
        kit.later(ctx, () => kit.internal.blink(ctx), 3900);
      }],
      ['sending', (ctx: BotContext) => {   // escribe y lanza un avioncito de papel
    kit.internal.typing(ctx, 1.4);
    kit.later(ctx, () => {
      kit.internal.stopLoops(ctx); ctx.el.dots.setAttribute('opacity', '0');
      const top = kit.internal.headTop(ctx);
      const plane = kit.internal.mk(ctx, 'g', { class:'plane' }, ctx.el.z, `<path d="M-11 0 L12 -7 L-2 8 Z"/><path d="M-2 8 L0 1 L12 -7" class="plane-fold"/>`);
      plane.animate(Array.from({ length:25 }, (_, i) => { const u = i / 24; return { offset:u,
        transform:`translate(${kit.internal.f2(108 + 120 * u)}px,${kit.internal.f2(top + 8 - 46 * Math.sin(Math.PI * u * .8) - 14 * u)}px) rotate(${kit.internal.f2(-20 + 24 * u)}deg) scale(${kit.internal.f3(1 - .45 * u)})`,
        opacity: u > .85 ? +kit.internal.f3((1 - u) / .15) : 1 }; }), { duration:1300, easing:'ease-in', fill:'forwards' });
      kit.internal.animatePose(ctx, u => ({ yaw: .15 + .4 * u, pitch: -.1 - .22 * u }), 1300);
      kit.internal.miniHop(ctx, 12);
    }, 1900);
    kit.later(ctx, () => { kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.swapEyes(ctx, 'happy', 800); kit.internal.miniHop(ctx, 18); kit.internal.flash(ctx, .16, 500); }, 3400);
  }]
    ],
    creating: [
      ['sparks', (ctx: BotContext) => RUN.creating(ctx)],
      ['painting', (ctx: BotContext) => {   // pinceladas de colores alrededor de la cabeza; luces arcoíris lo bañan por los lados
        kit.internal.breathe(ctx, [{ transform:kit.S(1) }, { transform:kit.S(1.025,.975) }], 500);
        kit.internal.animatePose(ctx, u => ({ yaw: .3 * Math.sin(kit.internal.TAU * u), roll: 6 * Math.sin(kit.internal.TAU * u), pitch: -.15 }), 2000, { repeat:true });
        ctx.fe.eyeList.forEach(e => kit.internal.loop(ctx, e, [{ transform:kit.S(1.08,1.12) }, { transform:kit.S(1.14,1.2) }], { duration:500, direction:'alternate' }));
        const top = kit.internal.headTop(ctx);
        let k = 0;
        const stroke = () => {
          const c = kit.internal.SPARK_COLORS[k++ % kit.internal.SPARK_COLORS.length], x = 50 + Math.random() * 100, y = top - 6 + Math.random() * 16, w = 18 + Math.random() * 16, up = (Math.random() < .5 ? -1 : 1) * (6 + Math.random() * 6);
          const s = kit.internal.mk(ctx, 'path', { d:`M${x - w / 2} ${y} Q${x} ${y + up} ${x + w / 2} ${y}`, stroke:c, 'stroke-width':4.5, 'stroke-linecap':'round', fill:'none', 'stroke-dasharray':w * 1.3, 'stroke-dashoffset':w * 1.3 });
          s.animate([{ strokeDashoffset:w * 1.3, opacity:1 }, { strokeDashoffset:0, opacity:1, offset:.45 }, { strokeDashoffset:0, opacity:0 }], { duration:1300, easing:'ease-out' }).onfinish = () => s.remove();
          kit.internal.tint(ctx, k % 2 ? { rl:c } : { rr:c }); kit.internal.lit(ctx, k % 2 ? 'rl' : 'rr', [{ opacity:0 }, { opacity:.55, offset:.3 }, { opacity:0 }], 700);
        };
        stroke(); ctx.zTimer = setInterval(stroke, 380);
        kit.later(ctx, () => {
          clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null; kit.internal.stopLoops(ctx); kit.internal.setPose(ctx, { yaw:0, roll:0, pitch:0 });
          for (let i = 0; i < 9; i++) kit.internal.spark(ctx, top, true);
          kit.internal.flash(ctx, .3, 800, kit.internal.pick(kit.internal.SPARK_COLORS)); kit.internal.miniHop(ctx, 30); kit.internal.swapEyes(ctx, 'happy', 900);
        }, 3500);
      }],
      ['building', (ctx: BotContext) => {   // bloques de colores caen y se apilan a su lado; asiente con cada uno
        kit.internal.breathe(ctx, [{ transform:kit.S(1) }, { transform:kit.S(1.012,.988) }], 800);
        kit.internal.setPose(ctx, { yaw:.45, pitch:.16 }); kit.internal.squint(ctx, .85);
        [0, 1, 2].forEach(i => kit.later(ctx, () => {
          const x = 176 + (i === 1 ? 3 : 0), y = 176 - i * 17;
          const blk = kit.internal.mk(ctx, 'rect', { x, y, width:16, height:16, rx:4, fill:kit.internal.SPARK_COLORS[i + 1], class:'block' }, ctx.el.world);
          blk.style.transformOrigin = `${x + 8}px ${y + 16}px`;
          blk.animate([{ transform:'translateY(-90px)', opacity:0 }, { transform:'translateY(-90px)', opacity:1, offset:.05 }, { transform:'translateY(0)', offset:.6, easing:'ease-out' }, { transform:'translateY(0) scale(1.18,.8)', offset:.72 }, { transform:'translateY(-4px) scale(.95,1.05)', offset:.85 }, { transform:'none' }],
            { duration:650, easing:'cubic-bezier(.5,0,.9,.5)' });
          kit.later(ctx, () => { kit.internal.nod(ctx, .18, 300); kit.internal.play(ctx, ctx.el.breath, [{}, { transform:kit.S(1.04,.96), offset:.4 }, { transform:kit.S(1) }], { duration:300 }); kit.internal.blink(ctx); }, 400);
        }, 500 + i * 850));
        kit.later(ctx, () => {
          kit.internal.stopLoops(ctx); kit.internal.setPose(ctx, { yaw:0, pitch:0 });
          [...ctx.el.world.querySelectorAll<SVGElement>('.block')].forEach((blk, i) => blk.animate([{ transform:'rotate(0deg)' }, { transform:`rotate(${i % 2 ? 6 : -6}deg)` }, { transform:'rotate(0deg)' }], { duration:400, delay:i * 60 }));
          kit.internal.flash(ctx, .24, 700, '#FFD24A'); kit.internal.miniHop(ctx, 26); kit.internal.swapEyes(ctx, 'happy', 800);
        }, 3200);
      }],
      ['composing', (ctx: BotContext) => {   // notas musicales; rebota al ritmo y la luz late con cada nota
    kit.internal.loop(ctx, ctx.el.hop, [{ transform:'translateY(0px)' }, { transform:'translateY(-6px)', offset:.5, easing:'ease-out' }, { transform:'translateY(0px)' }], { duration:500, easing:'ease-in' });
    kit.internal.breathe(ctx, [{ transform:kit.S(1.03,.97) }, { transform:kit.S(1) }], 250);
    kit.internal.animatePose(ctx, u => ({ yaw: .25 * Math.sin(kit.internal.TAU * u), roll: 7 * Math.sin(kit.internal.TAU * u) }), 1000, { repeat:true });
    kit.internal.swapEyes(ctx, 'happy', 3300);   // lo está disfrutando
    const top = kit.internal.headTop(ctx); let k = 0;
    const note = () => {
      const c = kit.internal.SPARK_COLORS[k++ % kit.internal.SPARK_COLORS.length], x = 70 + Math.random() * 60, dx = (Math.random() - .5) * 44;
      const t = kit.internal.mk(ctx, 'text', { x, y:top, class:'note-t', 'text-anchor':'middle', 'font-size':17 + Math.random() * 7, fill:c });
      t.textContent = k % 2 ? '♪' : '♫'; t.style.transformOrigin = `${x}px ${top}px`;
      t.animate([{ transform:'translate(0,0)', opacity:0 }, { transform:`translate(${dx * .3}px,-12px)`, opacity:1, offset:.25 }, { transform:`translate(${dx}px,-48px) rotate(${dx / 2}deg)`, opacity:0 }], { duration:1400, easing:'ease-out' }).onfinish = () => t.remove();
      kit.internal.tint(ctx, { rt:c }); kit.internal.lit(ctx, 'rt', [{ opacity:.1 }, { opacity:.45, offset:.2 }, { opacity:.1 }], 480);
    };
    note(); ctx.zTimer = setInterval(note, 500);
    kit.later(ctx, () => {
      clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null; kit.internal.stopLoops(ctx); kit.internal.setPose(ctx, { yaw:0, roll:0 });
      for (let i = 0; i < 7; i++) kit.internal.spark(ctx, top, true);
      kit.internal.flash(ctx, .28, 800, kit.internal.pick(kit.internal.SPARK_COLORS)); kit.internal.miniHop(ctx, 28);
    }, 3500);
  }]
    ],
    planning: [
      ['list', (ctx: BotContext) => RUN.planning(ctx)],
      ['notes', (ctx: BotContext) => {   // pega tres notas sobre su cabeza, las revisa una por una y las reordena
        kit.internal.breathe(ctx, [{ transform:kit.S(1) }, { transform:kit.S(1.012,.988) }], 900);
        const top = kit.internal.headTop(ctx) - 26, xs = [62, 100, 138], cols = ['#FFE27A', '#FF9EC7', '#8FF3FF'];
        const notes = xs.map((x, i) => {
          const n = kit.internal.mk(ctx, 'rect', { x:x - 9, y:top - 9, width:18, height:18, rx:3, fill:cols[i], class:'note' });
          n.style.transformOrigin = `${x}px ${top}px`; n.style.opacity = '0';
          return n;
        });
        notes.forEach((n, i) => kit.later(ctx, () => {
          n.style.opacity = '1';
          n.animate([{ transform:'scale(0) rotate(-20deg)' }, { transform:`scale(1) rotate(${(i - 1) * 6}deg)` }], { duration:ctx.spring.duration, easing:ctx.spring.easing, fill:'forwards' });
          kit.internal.setPose(ctx, { yaw:(i - 1) * .38, pitch:-.3 }); kit.internal.blink(ctx);
        }, 400 + i * 650));
        kit.later(ctx, () => {   // las reordena: la de la derecha pasa a la izquierda
          kit.internal.setPose(ctx, { yaw:0, pitch:-.3 });
          const dx = xs[0] - xs[2];
          notes[2].animate([{ transform:'rotate(6deg)' }, { transform:`translate(${dx / 2}px,-18px) rotate(-10deg)`, offset:.5 }, { transform:`translate(${dx}px,0) rotate(-6deg)` }], { duration:700, easing:'ease-in-out', fill:'forwards' });
          notes[0].animate([{ transform:'rotate(-6deg)' }, { transform:`translate(${-dx / 2}px,10px) rotate(0deg)`, offset:.5 }, { transform:`translate(${-dx}px,0) rotate(6deg)` }], { duration:700, easing:'ease-in-out', fill:'forwards' });
          kit.internal.animatePose(ctx, u => ({ yaw: -.38 * Math.sin(Math.PI * u) * (u < .5 ? -1 : 1), pitch:-.3 }), 700);
        }, 2500);
        kit.later(ctx, () => { kit.internal.setPose(ctx, { pitch:0 }); kit.internal.nod(ctx, .2); kit.internal.flash(ctx, .2, 600, '#FFE27A'); kit.internal.swapEyes(ctx, 'happy', 700); kit.later(ctx, () => kit.internal.miniHop(ctx, 20), 200); }, 3400);
      }],
      ['route', (ctx: BotContext) => {   // traza una ruta de puntos de izquierda a derecha y planta una bandera al final
        kit.internal.breathe(ctx, [{ transform:kit.S(1) }, { transform:kit.S(1.012,.988) }], 900);
        const top = kit.internal.headTop(ctx) - 14, pts = Array.from({ length:8 }, (_, i) => { const u = i / 7; return [42 + u * 116, top - 14 * Math.sin(Math.PI * u) + 6 * Math.sin(kit.internal.TAU * u)]; });
        pts.forEach(([x, y], i) => kit.later(ctx, () => {
          const d = kit.internal.mk(ctx, 'circle', { cx:x, cy:y, r:2.8, class:'route-dot' });
          d.style.transformOrigin = `${x}px ${y}px`;
          d.animate([{ transform:kit.S(0) }, { transform:kit.S(1.5), offset:.6 }, { transform:kit.S(1) }], { duration:260 });
        }, 300 + i * 260));
        kit.internal.animatePose(ctx, u => ({ yaw: -.45 + .9 * kit.internal.clamp01((u * 3300 - 300) / (7 * 260)), pitch:-.28 }), 3300);
        kit.later(ctx, () => {
          const [x, y] = pts[7];
          const flag = kit.internal.mk(ctx, 'g', { class:'flag' }, ctx.el.z, `<path d="M${x} ${y} V${y - 18}" class="flag-pole"/><path d="M${x} ${y - 18} L${x + 12} ${y - 14} L${x} ${y - 10} Z" class="flag-cloth"/>`);
          flag.style.transformOrigin = `${x}px ${y}px`;
          flag.animate([{ transform:kit.S(0) }, { transform:kit.S(1.2), offset:.6 }, { transform:kit.S(1) }], { duration:400 });
          kit.internal.loop(ctx, flag.lastChild as SVGElement, [{ transform:'skewY(0deg)' }, { transform:'skewY(-8deg)' }], { duration:300, direction:'alternate', easing:'ease-in-out' });
        }, 300 + 8 * 260);
        kit.later(ctx, () => { kit.internal.stopLoops(ctx); kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.nod(ctx, .2); kit.internal.flash(ctx, .22, 600, '#FF9EC7'); kit.internal.swapEyes(ctx, 'happy', 700); kit.later(ctx, () => kit.internal.miniHop(ctx, 22), 200); }, 3400);
      }],
      ['calendar', (ctx: BotContext) => {   // un calendario se va llenando de colores y encierra el día clave
    kit.internal.breathe(ctx, [{ transform:kit.S(1) }, { transform:kit.S(1.012,.988) }], 900);
    const x0 = 166, y0 = 24, g = kit.internal.mk(ctx, 'g', { class:'plan' });
    let html = `<rect class="plan-card" x="${x0}" y="${y0}" width="46" height="52" rx="7"/><path class="cal-head" d="M${x0} ${y0 + 11} V${y0 + 7} Q${x0} ${y0} ${x0 + 7} ${y0} H${x0 + 39} Q${x0 + 46} ${y0} ${x0 + 46} ${y0 + 7} V${y0 + 11} Z"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) html += `<rect class="cal-cell" x="${x0 + 6 + c * 12.5}" y="${y0 + 16 + r * 11.5}" width="9.5" height="8.5" rx="2"/>`;
    g.innerHTML = html; kit.internal.popIn(ctx, g, x0, y0 + 50);
    const cells = [...g.querySelectorAll<SVGElement>('.cal-cell')];
    kit.internal.setPose(ctx, { yaw:.42, pitch:-.12 }); kit.internal.squint(ctx, .85);
    cells.forEach((cell, i) => kit.later(ctx, () => {
      cell.style.fill = kit.internal.SPARK_COLORS[i % kit.internal.SPARK_COLORS.length];
      cell.animate([{ transform:kit.S(.4) }, { transform:kit.S(1) }], { duration:260, easing:ctx.spring.easing });
      cell.style.transformOrigin = `${Number(cell.getAttribute('x')) + 4.75}px ${Number(cell.getAttribute('y')) + 4.25}px`;
      if (i % 3 === 2) kit.internal.nod(ctx, .12, 260);
    }, 400 + i * 230));
    kit.later(ctx, () => {
      const c = cells[4], x = Number(c.getAttribute('x')) + 4.75, y = Number(c.getAttribute('y')) + 4.25;
      const ring = kit.internal.mk(ctx, 'circle', { cx:x, cy:y, r:8, class:'cal-ring', 'stroke-dasharray':51, 'stroke-dashoffset':51 }, g);
      ring.animate([{ strokeDashoffset:51 }, { strokeDashoffset:0 }], { duration:420, fill:'forwards' });
      kit.internal.flash(ctx, .2, 600, '#FF9EC7');
    }, 2700);
    kit.later(ctx, () => { kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.swapEyes(ctx, 'happy', 700); kit.internal.miniHop(ctx, 20); }, 3400);
  }]
    ],
  };
