
import { S, TAU, clamp01 } from './math';
import { lit, tint } from './light';
import { f2, f3 } from '../data/color';
import { loop, play } from './timing';
import { animatePose, setPose } from './pose-motion';
import { kEyes } from './eyes';
import { type BotContext } from './context';



  export function spawnZ(ctx: BotContext) {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', '132'); t.setAttribute('y', '62'); t.setAttribute('class', 'zz');
    t.setAttribute('font-size', String(14 + Math.random() * 6)); t.textContent = 'z';
    t.style.transformOrigin = '136px 58px';
    ctx.el.z.appendChild(t);
    const drift = 10 + Math.random() * 14;
    t.animate([
      { transform:'translate(0,0) scale(.6)', opacity:0 },
      { transform:`translate(${drift * .4}px,-14px) scale(.9)`, opacity:1, offset:.25 },
      { transform:`translate(${drift}px,-46px) scale(1.25)`, opacity:0 }
    ], { duration:2300, easing:'ease-out' }).onfinish = () => t.remove();
  }

  export const SPARK_COLORS = ['#FF5FA8', '#47E4FF', '#FFD24A', '#7CFF8A', '#B38CFF'];

  export function spark(ctx: BotContext, top: number, burst?: boolean, cols?: string[], cx?: number) {   // chispa de 4 puntas que sale de la cabeza (cols/cx: colores y centro propios, p. ej. la estrella)
    const C = cols || SPARK_COLORS, col = C[Math.floor(Math.random() * C.length)];
    const x = (cx ?? 100) + (Math.random() - .5) * 34, y = top + 6, r = 3.5 + Math.random() * 3;
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    s.setAttribute('d', `M${x} ${y - r} L${x + r * .28} ${y - r * .28} L${x + r} ${y} L${x + r * .28} ${y + r * .28} L${x} ${y + r} L${x - r * .28} ${y + r * .28} L${x - r} ${y} L${x - r * .28} ${y - r * .28} Z`);
    s.setAttribute('fill', col); s.style.transformOrigin = `${x}px ${y}px`;
    ctx.el.z.appendChild(s);
    const ang = (burst ? Math.random() * TAU : -Math.PI / 2 + (Math.random() - .5) * 1.6), dist = burst ? 40 + Math.random() * 30 : 26 + Math.random() * 22;
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
    s.animate([{ transform:'translate(0,0) scale(.2) rotate(0deg)', opacity:0 }, { transform:`translate(${dx * .35}px,${dy * .35}px) scale(1.1) rotate(60deg)`, opacity:1, offset:.3 },
      { transform:`translate(${dx}px,${dy}px) scale(.5) rotate(160deg)`, opacity:0 }], { duration:burst ? 900 : 1100, easing:'ease-out' }).onfinish = () => s.remove();
    if (!burst) { tint(ctx, { rt:col }); lit(ctx, 'rt', [{ opacity:.12 }, { opacity:.42, offset:.3 }, { opacity:.12 }], 420); }   // la chispa tiñe la luz
  }

  // nube de pensamiento/sueño: burbujitas que salen en orden y luego la nube
  export function cloudBubble(ctx: BotContext, top: number, cx: number, cy: number) {
    const cloud = mk(ctx, 'g', { class:'dream' }, ctx.el.z, `<circle cx="124" cy="${top + 5}" r="2.8"/><circle cx="134" cy="${top - 6}" r="4.2"/>
      <g class="cl"><circle cx="${cx - 12}" cy="${cy + 2}" r="11"/><circle cx="${cx + 2}" cy="${cy - 5}" r="14"/><circle cx="${cx + 15}" cy="${cy + 3}" r="10"/><rect x="${cx - 18}" y="${cy + 1}" width="38" height="11" rx="5.5"/></g>`);
    ([...cloud.children] as SVGElement[]).forEach((c, i) => {
      c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'center';
      c.animate([{ transform:S(0), opacity:0 }, { transform:S(1), opacity:1 }], { duration:ctx.spring.duration, easing:ctx.spring.easing, delay:i * 150, fill:'backwards' });
    });
    return cloud;
  }

  export const gearPath = (cx: number, cy: number, r: number, n: number) => {
    let d = '';
    for (let k = 0; k < n; k++) {
      const a = k / n * TAU, s = TAU / n;
      [[a, r], [a + s * .18, r * 1.45], [a + s * .5, r * 1.45], [a + s * .68, r]].forEach(([t, rr], j) => { d += (k === 0 && j === 0 ? 'M' : 'L') + f2(cx + Math.cos(t) * rr) + ' ' + f2(cy + Math.sin(t) * rr) + ' '; });
    }
    return d + 'Z';
  };

  // dormido: abre los ojos de golpe (susto) y se le vuelven a cerrar pesados
  export function startle(ctx: BotContext, ms: number, k = 1.2) {
    ctx.fe.closed.forEach(c => c.animate([{ opacity:1 }, { opacity:0, offset:.06 }, { opacity:0, offset:.85 }, { opacity:1 }], { duration:ms }));
    ctx.fe.eyeList.forEach(e => e.animate([{ opacity:0, transform:S(1) }, { opacity:1, transform:S(k, k * 1.04), offset:.06 }, { opacity:1, transform:S(1.05,.95), offset:.45 },
      { opacity:1, transform:S(1,.5), offset:.62 }, { opacity:1, transform:S(1,.7), offset:.7 }, { opacity:1, transform:S(1,.3), offset:.8 }, { opacity:0, transform:S(1,.1), offset:.86 }, { opacity:0, transform:S(1,.1) }], { duration:ms }));
  }

  export function planCard(ctx: BotContext) {   // tarjeta con 3 pendientes, flotando arriba a la derecha
    const NS = 'http://www.w3.org/2000/svg', g = document.createElementNS(NS, 'g');
    const x0 = 166, y0 = 26;
    g.setAttribute('class', 'plan'); g.style.transformOrigin = `${x0}px ${y0 + 60}px`;
    let html = `<rect class="plan-card" x="${x0}" y="${y0}" width="46" height="56" rx="8"/>`;
    [0, 1, 2].forEach(i => {
      const y = y0 + 11 + i * 15;
      html += `<g class="plan-row"><rect class="plan-box" x="${x0 + 7}" y="${y}" width="9" height="9" rx="2.5"/><rect class="plan-line" x="${x0 + 20}" y="${y + 3}" width="${18 - i * 4}" height="3" rx="1.5"/></g>`;
      html += `<path class="plan-mark" d="M${x0 + 8.5} ${y + 4.5} L${x0 + 11} ${y + 7} L${x0 + 15.5} ${y + 1.5}" stroke-dasharray="14" stroke-dashoffset="14"/>`;
    });
    g.innerHTML = html; ctx.el.z.appendChild(g);
    g.animate([{ opacity:0, transform:'translateY(8px) scale(.7)' }, { opacity:1, transform:'translateY(0) scale(1)' }], { duration: ctx.spring.duration, easing: ctx.spring.easing });
    return { g, marks:[...g.querySelectorAll('.plan-mark')], rows:[...g.querySelectorAll('.plan-row')] };
  }

  export const breathe = (ctx: BotContext, frames: Keyframe[], duration: number) => loop(ctx, ctx.el.breath, frames, { duration, direction:'alternate', easing:'ease-in-out' });

  export const squint = (ctx: BotContext, k: number) => ctx.fe.eyeList.forEach(e => loop(ctx, e, [{ transform:S(1, k) }, { transform:S(1, k) }], { duration:1000 }));


  /* ---------- Variaciones de las rutinas de trabajo ----------
     Cada rutina trae 3 versiones; cada vez que toca, sale la siguiente. */
  export const NS = 'http://www.w3.org/2000/svg';

  export function mk(ctx: BotContext, tag: string, attrs: Record<string, string | number>, parent: Element = ctx.el.z, html?: string): SVGElement {
    const n = document.createElementNS(NS, tag) as SVGElement;
    for (const k in attrs) n.setAttribute(k, String(attrs[k]));
    if (html) n.innerHTML = html;
    parent.appendChild(n); return n;
  }

  export const headTop = (ctx: BotContext) => {
    const sh = ctx.shape, extra = { pildora:40, gota:36, fantasma:48, gato:48 }[ctx.shape.id];
    return (extra ?? sh.top ?? sh.cy - 62) - (sh.skin === 'robot' ? 26 : 0);
  };

  export const nod = (ctx: BotContext, amt = .2, d = 380) => { const base = { ...ctx.pose }; animatePose(ctx, u => ({ ...base, pitch: base.pitch + amt * Math.sin(Math.PI * u) }), d); };

  export const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

  export function typing(ctx: BotContext, speed = 1) {   // base compartida de "escribiendo"
    breathe(ctx, [{ transform:S(1) }, { transform:S(1.018,.982) }], 420 / speed);
    ctx.el.dots.setAttribute('opacity', '1');
    ctx.el.dotList.forEach((d, i) => loop(ctx, d,
      [{ transform:'translateY(0)' }, { transform:'translateY(-8px)', offset:.3 }, { transform:'translateY(0)', offset:.6 }, { transform:'translateY(0)' }],
      { duration:900 / speed, delay:i * 130 / speed, easing:'ease-in-out' }));
    setPose(ctx, { pitch:.12 });
    loop(ctx, ctx.fe.eyes, [
      { transform:'translateX(0)' }, { transform:'translateX(-5px)', offset:.15 }, { transform:'translateX(-5px)', offset:.45 },
      { transform:'translateX(5px)', offset:.6 }, { transform:'translateX(5px)', offset:.9 }, { transform:'translateX(0)' }
    ], { duration:1500 / speed, easing:'ease-in-out' });
    squint(ctx, .72);
    tint(ctx, { rb:'#86E9FF' });
    loop(ctx, ctx.el.L.rb, [{ opacity:.42 }, { opacity:.55, offset:.2 }, { opacity:.36, offset:.45 }, { opacity:.6, offset:.7 }, { opacity:.42 }], { duration:900 / speed, easing:'steps(1, end)' });
  }

  export const stopLoops = (ctx: BotContext) => ctx.subAnims.forEach(a => { if ((a.effect as KeyframeEffect | null)?.target !== ctx.el.breath) a.cancel(); });

  /* ---------- Más variaciones de trabajo ---------- */
  export const starPath = (x: number, y: number, r: number) => `M${x} ${y - r} L${x + r * .28} ${y - r * .28} L${x + r} ${y} L${x + r * .28} ${y + r * .28} L${x} ${y + r} L${x - r * .28} ${y + r * .28} L${x - r} ${y} L${x - r * .28} ${y - r * .28} Z`;

  export const popIn = (ctx: BotContext, n: SVGElement, ox: number, oy: number) => { n.style.transformOrigin = `${ox}px ${oy}px`; n.animate([{ transform:S(.4), opacity:0 }, { transform:S(1), opacity:1 }], { duration:ctx.spring.duration, easing:ctx.spring.easing }); };


  /* ---------- Más rutinas de sueño ---------- */
  export function sleepyZ(ctx: BotContext, big?: boolean) {
    const t = mk(ctx, 'text', { x:130, y:70, class:'zz', 'font-size': big ? 30 : 16 });
    t.textContent = big ? 'Z' : 'z'; t.style.transformOrigin = '134px 60px';
    t.animate([{ transform:'translate(0,0) scale(.3)', opacity:0 }, { transform:'translate(8px,-10px) scale(1.15)', opacity:1, offset:.2 }, { transform:'translate(26px,-42px) scale(1.5) rotate(12deg)', opacity:0 }],
      { duration:1600, easing:'ease-out' }).onfinish = () => t.remove();
  }

  /** Los saltos duran más con movimiento reducido (en vez de quitarlos). */
  export const slow = (ctx: BotContext): number => (ctx.reduce ? 1.8 : 1);

  export function shadowFor(ctx: BotContext, frames: Keyframe[], duration: number) {
    ctx.el.shadow.animate(frames, { duration });
    // De la escala de la sombra sale la altura: arriba se ilumina más; al aplastarse, el reflejo se aplasta.
    const LF: Keyframe[] = [], KF: Keyframe[] = [], GF: Keyframe[] = [];
    frames.forEach((f, i) => {
      const m = /scale\(([\d.]+)/.exec(String(f['transform'] ?? '')), s = m ? +m[1] : 1, up = clamp01(1 - s), squash = Math.max(0, s - 1);
      const o = f.offset ?? (i / (frames.length - 1));
      LF.push({ offset:o, opacity:+f3(up * .32) });
      KF.push({ offset:o, transform:`translateY(${f2(up * 16)}px)` });
      GF.push({ offset:o, transform:S(f3(1 + up * .35 + squash * 1.6), f3(1 + up * .2 - squash * 1.4)), opacity:+f3(Math.min(1, .85 + up * .6)) });
    });
    lit(ctx, 'lift', LF, duration, { easing:'linear' }); lit(ctx, 'key', KF, duration, { easing:'linear' }); lit(ctx, 'gloss', GF, duration, { easing:'linear' });
  }

  export function airArc(ctx: BotContext, h: number, d: number) {
    play(ctx, ctx.el.hop, [
      { easing:'ease-out' }, { transform:`translateY(0px) ${S(1.08,.9)}`, offset:.1, easing:'ease-out' },
      { transform:`translateY(-${h}px) ${S(1)}`, offset:.5, easing:'ease-in' },
      { transform:`translateY(0px) ${S(1.1,.9)}`, offset:.9 }, { transform:S(1) }
    ], { duration:d });
    shadowFor(ctx, [{ transform:S(1) }, { transform:S(1 - h / 110), opacity:1 - h / 90, offset:.5 }, { transform:S(1) }], d);
  }

  export function miniHop(ctx: BotContext, h: number) {
    play(ctx, ctx.el.hop, [
      { easing:'ease-out' }, { transform:`translateY(0px) ${S(1.1,.88)}`, offset:.18, easing:'cubic-bezier(.2,.7,.3,1)' },
      { transform:`translateY(-${h}px) ${S(.95,1.06)}`, offset:.5, easing:'cubic-bezier(.6,0,.9,.5)' },
      { transform:`translateY(0px) ${S(1.1,.9)}`, offset:.78 }, { transform:S(1) }
    ], { duration:520 * slow(ctx) });
    shadowFor(ctx, [{ transform:S(1) }, { transform:S(.7), opacity:.55, offset:.5 }, { transform:S(1) }], 520 * slow(ctx));
  }

  /* ---------- Malestar ---------- */
  // muestra piezas (cejas, lágrimas…) durante ms con entrada y salida suaves
  export function showFor(ctx: BotContext, list: Element[], ms: number, peak = 1) {
    const f = Math.min(.15, 140 / ms);
    list.forEach(n => n.animate([{ opacity:0 }, { opacity:peak, offset:f }, { opacity:peak, offset:1 - f }, { opacity:0 }], { duration:ms }));
    ctx.hooks.cue({ show:true, ms });
  }

  export function holdEyes(ctx: BotContext, t: string, ms: number, which = [0, 1]) {   // sostiene una forma de ojo con entrada y salida
    const fr = [{ transform:S(1) }, { transform:t, offset:.1 }, { transform:t, offset:.88 }, { transform:S(1) }];
    which.forEach(i => ctx.fe.eyeList[i].animate(fr, { duration:ms, easing:'ease-in-out' }));
    kEyes(ctx, which).forEach(e => e.animate(fr, { duration:ms, easing:'ease-in-out' }));
    const m = /scale\(([\d.]+)(?:,\s*([\d.]+))?\)/.exec(t), sy = m ? +(m[2] ?? m[1]) : 1;
    ctx.hooks.cue({ eye: sy > 1.1 ? 'wide' : sy < .8 ? 'narrow' : null, ms });
  }

  export function mood(ctx: BotContext, color: string, frames: Keyframe[], ms: number) {
    tint(ctx, { mood:color }); lit(ctx, 'mood', frames, ms);
    // gato: con cualquier emoción la cola se agita (se suma al vaivén de siempre)
    if (!ctx.reduce) ctx.svg.querySelectorAll('.gtw').forEach(t => t.animate(
      [{ rotate:'0deg' }, { rotate:'-9deg', offset:.15 }, { rotate:'8deg', offset:.35 }, { rotate:'-6deg', offset:.55 }, { rotate:'4deg', offset:.75 }, { rotate:'0deg' }],
      { duration: Math.min(ms, 1300), easing:'ease-in-out', composite:'add' }));
    // Gel/App: la emoción TIÑE el color interno y lo revuelve más rápido mientras dura
    ctx.fe.mflow?.querySelectorAll('.mb').forEach((b, i) => b.animate(
      [{ translate:'0 0' }, { translate:`${(i % 2 ? 5 : -5)}px ${(i % 3 ? -3 : 3)}px`, offset:.25 }, { translate:`${(i % 2 ? -4 : 4)}px 2px`, offset:.6 }, { translate:'0 0' }],
      { duration: Math.min(ms, 1400), iterations: Math.max(1, Math.round(ms / 1400)), easing:'ease-in-out', composite:'add' }));
  }

  export function tremble(ctx: BotContext, ms: number, amp: number, every = 45) {   // temblor: sacudidas pequeñas y rápidas
    const n = Math.max(4, Math.round(ms / every)), F = [];
    for (let i = 0; i <= n; i++) { const u = i / n, e = Math.sin(Math.PI * u); F.push({ offset:u, transform:`translate(${f2((i % 2 ? 1 : -1) * amp * e * (.6 + Math.random() * .4))}px,${f2((Math.random() - .5) * amp * .4 * e)}px)` }); }
    F[F.length - 1].transform = 'translate(0px,0px)';
    play(ctx, ctx.el.hop, F, { duration:ms, easing:'linear' });
  }

  export function puff(ctx: BotContext, x: number, y: number) {   // vapor de enojo
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', String(x)); c.setAttribute('cy', String(y)); c.setAttribute('r', String(5 + Math.random() * 3)); c.setAttribute('class', 'puff');
    c.style.transformOrigin = `${x}px ${y}px`;
    ctx.el.z.appendChild(c);
    const dx = (x < 100 ? -1 : 1) * (8 + Math.random() * 8);
    c.animate([{ transform:'translate(0,0) scale(.4)', opacity:0 }, { transform:`translate(${dx * .4}px,-10px) scale(1)`, opacity:.9, offset:.25 }, { transform:`translate(${dx}px,-34px) scale(1.7)`, opacity:0 }],
      { duration:900, easing:'ease-out' }).onfinish = () => c.remove();
  }

  // antena del robot: flexible, se mueve con la emoción
  export const antenna = (ctx: BotContext, frames: Keyframe[], ms: number, o = {}) => ctx.fe.ants.forEach(a => a.animate(frames, { duration:ms, easing:'ease-in-out', ...o }));

  export const antWiggle = (ctx: BotContext, ms: number, amp = 14, period = 260) => antenna(ctx, Array.from({ length:25 }, (_, i) => { const u = i / 24; return { offset:u, transform:`rotate(${f2(amp * Math.sin(TAU * u * ms / period) * (1 - u))}deg)` }; }), ms, { easing:'linear' });

  export const antTip = (ctx: BotContext, ms: number, k = 1.6) => ctx.fe.antTips.forEach(t => t.animate([{ transform:S(1), opacity:1 }, { transform:S(k), opacity:1, offset:.3 }, { transform:S(1), opacity:1 }], { duration:ms }));

  export const flushCheeks = (ctx: BotContext, ms: number) => ctx.fe.cheeks.forEach(c => c.animate([{ transform:S(1), opacity:1 }, { transform:S(1.22), opacity:1, offset:.2 }, { transform:S(1.22), opacity:1, offset:.8 }, { transform:S(1), opacity:1 }], { duration:ms }));

  export const isRobot = (ctx: BotContext) => ctx.shape.skin === 'robot';

  // las emociones buenas también tiñen el cuerpo (dorado, rosa, cian…), no solo las malas
  export const glow = (ctx: BotContext, c: string, peak: number, ms: number) => mood(ctx, c, [{ opacity:0 }, { opacity:peak, offset:.2 }, { opacity:peak * .8, offset:.75 }, { opacity:0 }], ms);
