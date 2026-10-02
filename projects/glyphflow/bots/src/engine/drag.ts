
import { f2, f3 } from '../data/color';
import { clearRoutine, wake } from './state';
import { clearLook, swapEyes } from './eyes';
import { expr, kHold } from './kawaii';
import { S, TAU } from './math';
import { lit } from './light';
import { animatePose, setPose } from './pose-motion';
import { poke, spinFx } from './reactions';
import { later } from './timing';
import { RUN } from './routines';
import type { GfKawaiiId } from '../data/kawaii';
import { type BotContext, type GfBotGoo, type GfBotGooShape } from './context';



  export const soft = (ctx: BotContext, x: number, lim: number, k: number) => lim * Math.tanh(x / k);
   // resistencia de liga: cede mucho al inicio y cada vez menos
  // una sola receta de transformación para todo el arrastre: así los fotogramas siempre interpolan bien (giros de 360° incluidos)
  export const hcOf = (ctx: BotContext) => 172 - ctx.shape.cy;
           // de los pies al centro del cuerpo
  export const T = (ctx: BotContext, { x = 0, y = 0, rot = 0, lean = 0, sk = 0, sx = 1, sy = 1 } = {}, hc = hcOf(ctx)) =>
    `translate(${f2(x)}px,${f2(y)}px) translateY(${f2(-hc)}px) rotate(${f2(rot)}deg) translateY(${f2(hc)}px) rotate(${f2(lean)}deg) skewX(${f2(sk)}deg) scale(${f3(sx)},${f3(sy)})`;

  export function gooShape(ctx: BotContext, g: GfBotGoo, sag = 0): GfBotGooShape {
    const sy = (1 + soft(ctx, -g.y - g.vy * 2.2, .52, 120)) * (1 - sag);        // arriba = se estira, abajo = se aplasta; sag = se derrite
    const shear = soft(ctx, g.x + g.vx * 3.2, 40, 105);                          // la punta se va hacia donde jalas
    const lean = soft(ctx, g.x, 9, 150), tx = soft(ctx, g.x, 13, 90);
    const bulge = soft(ctx, Math.hypot(g.vx, g.vy), .08, 14) + sag * .9;        // rápido = se hincha; derretido = se desparrama
    return { sy, shear, lean, tx, sx: 1 / Math.sqrt(sy) + bulge };
  }

  export const gooP = (ctx: BotContext, d: GfBotGooShape, v = 1) => ({ x:d.tx * v, lean:d.lean * v, sk:-d.shear * v, sx:1 + (d.sx - 1) * v, sy:1 + (d.sy - 1) * v });

  export const gooT = (ctx: BotContext, d: GfBotGooShape, v = 1) => T(ctx, gooP(ctx, d, v));

  export function beginDrag(ctx: BotContext) {
    wake(ctx); clearRoutine(ctx); clearLook(ctx); ctx.dragging = true;
    ctx.running.get(ctx.el.hop)?.cancel(); ctx.running.delete(ctx.el.hop);
    ctx.el.hop.getAnimations().forEach(a => a.cancel()); ctx.el.shadow.getAnimations().forEach(a => a.cancel());
    ctx.kLockUntil = 0; kHold(ctx, 'amazed');   // ¡lo levantaste!
    ctx.drag = { eyes: ctx.fe.eyeList.map(e => e.animate([{ transform:S(1) }, { transform:S(1.25,1.3) }], { duration:200, fill:'forwards' })),
             g:{ x:0, y:0, vx:0, vy:0 }, tgt:{ x:0, y:0 }, prev:{ x:0, y:0 }, t0:performance.now(), raf:0, peak:0,
             flips:0, lastSx:0, turn:0, lastAng:null, held:0, dizzy:false, maxUp:0, path:0 };
    ctx.svg.classList.add('grabbing');
    lit(ctx, 'lift', [{ opacity:0 }, { opacity:.1 }], 200, { fill:'forwards' });
    let last = performance.now();
    const step = (now: number) => {
      if (!ctx.drag) return;
      const dt = Math.min(50, now - last) / 16.7; last = now;
      const g = ctx.drag.g, t = (now - ctx.drag.t0) / 1000;
      const K = .04 + .12 * Math.min(1, t / .3), C = .78;                  // al inicio se «pega» al piso y luego suelta
      g.vx = (g.vx + (ctx.drag.tgt.x - g.x) * K * dt) * C; g.vy = (g.vy + (ctx.drag.tgt.y - g.y) * K * dt) * C;
      g.x += g.vx * dt; g.y += g.vy * dt;
      // lo que el dedo hace: vueltas (círculos), cambios de sentido (sacudidas) y cuánto tiempo lo tienes estirado
      const px = ctx.drag.tgt.x - ctx.drag.prev.x, py = ctx.drag.tgt.y - ctx.drag.prev.y, sp = Math.hypot(px, py);
      ctx.drag.prev = { ...ctx.drag.tgt }; ctx.drag.path += sp;
      ctx.drag.pvx = (ctx.drag.pvx || 0) * .6 + px / dt * .4;   // velocidad del dedo (el cuerpo va con retraso)
      if (sp > 1.5) {
        const ang = Math.atan2(py, px);
        if (ctx.drag.lastAng !== null) { let da = ang - ctx.drag.lastAng; da = Math.atan2(Math.sin(da), Math.cos(da)); if (Math.abs(da) < 1.4) ctx.drag.turn += da; }
        ctx.drag.lastAng = ang;
        const sx = Math.sign(px); if (Math.abs(px) > 2 && sx && sx !== ctx.drag.lastSx) { if (ctx.drag.lastSx) ctx.drag.flips++; ctx.drag.lastSx = sx; }
      }
      const stretched = Math.hypot(ctx.drag.tgt.x, ctx.drag.tgt.y) > 45;
      ctx.drag.held = stretched ? ctx.drag.held + dt * 16.7 / 1000 : Math.max(0, ctx.drag.held - dt * .05);
      const still = sp < 1.2 ? Math.min(1, t / 1.5) : 0;
      ctx.drag.sag = Math.min(.14, (ctx.drag.sag || 0) * .995 + (still && ctx.drag.tgt.y > -30 ? .0012 * dt : -.004 * dt)); ctx.drag.sag = Math.max(0, ctx.drag.sag);
      const alive = .9 * Math.sin(t * 7.3) + .5 * Math.sin(t * 11.1) + (ctx.drag.flips >= 3 ? 2.2 * Math.sin(t * 31) : 0);   // tiembla aunque no lo muevas
      const d = gooShape(ctx, { x:g.x + alive, y:g.y + alive * .6, vx:g.vx, vy:g.vy }, ctx.drag.sag);
      ctx.drag.d = d; ctx.drag.peak = Math.max(ctx.drag.peak, Math.abs(d.sy - 1), Math.abs(d.shear) / 60); ctx.drag.maxUp = Math.max(ctx.drag.maxUp, d.sy);
      ctx.el.hop.style.transform = gooT(ctx, d);
      ctx.el.shadow.style.transform = `translateX(${f2(d.tx + d.lean * .6)}px) scale(${f3(d.sx * (1 + Math.abs(d.shear) / 120))},1)`;
      if (ctx.el.face) ctx.el.face.style.translate = `${f2(Math.max(-5, Math.min(5, -g.vx * .9)))}px ${f2(Math.max(-4, Math.min(4, -g.vy * .9 + ctx.drag.sag * 20)))}px`;   // la cara se queda atrás (y se escurre si se derrite)
      if (ctx.drag.flips >= 4 && !ctx.drag.dizzy) { ctx.drag.dizzy = true; swapEyes(ctx, 'squeeze', 900); }   // lo sacudes: se marea desde ya
      // cara mientras lo tienes: sorpresa al agarrarlo, se divierte si lo mueves, se preocupa si lo estiras mucho rato,
      // se marea si lo sacudes o le das vueltas, y se resigna si lo dejas derretirse
      kHold(ctx, ctx.drag.dizzy || Math.abs(ctx.drag.turn) > 4 ? 'dizzy' : ctx.drag.sag > .08 ? 'resigned' : ctx.drag.held > 1.1 ? 'worried' : stretched ? 'uneasy' : t < .45 ? 'amazed' : sp > 3 ? 'playful' : 'hopeful');
      ctx.drag.raf = requestAnimationFrame(step);
    };
    ctx.drag.raf = requestAnimationFrame(step);
  }

  export function dragTo(ctx: BotContext, vx: number, vy: number) {   // vx, vy: desplazamiento en unidades del viewBox
    ctx.drag!.tgt = { x:vx, y:vy };
    setPose(ctx, { yaw: Math.max(-1, Math.min(1, vx / 70)) * .6, pitch: Math.max(-1, Math.min(1, vy / 70)) * .32 });
  }

  export function endDrag(ctx: BotContext) {
    if (!ctx.drag) return;
    cancelAnimationFrame(ctx.drag.raf);
    const D = ctx.drag, { eyes, g, peak } = D, d = D.d || gooShape(ctx, g); ctx.drag = null; ctx.dragging = false; ctx.lastDragEnd = performance.now();
    const dur0 = (ctx.lastDragEnd - D.t0) / 1000;
    ctx.svg.classList.remove('grabbing');
    ctx.el.hop.style.transform = ''; ctx.el.shadow.style.transform = '';
    if (ctx.el.face) { ctx.el.face.style.translate = ''; ctx.el.face.animate([{ translate:`${f2(-g.vx)}px ${f2(-g.vy)}px` }, { translate:`${f2(g.vx * .6)}px ${f2(g.vy * .6)}px`, offset:.3 }, { translate:'0px 0px' }], { duration:500, easing:'ease-out' }); }
    eyes.forEach(a => a.cancel());
    const rnd = (a: number, b: number) => a + Math.random() * (b - a), hc = hcOf(ctx);
    const F: Keyframe[] = [], SF: Keyframe[] = [], push = (u: number, p: Parameters<typeof T>[1], sh = 1, sx0 = 0) => { F.push({ offset:+u.toFixed(4), transform:T(ctx, p, hc) }); SF.push({ offset:+u.toFixed(4), transform:`translateX(${f2(sx0)}px) scale(${f3(sh)},1)` }); };
    const P0 = gooP(ctx, d), dirX = Math.sign(d.shear || g.vx || D.tgt.x || 1) || 1;
    const settle = (u0: number, fr: number, amp: number, dec = 5.5, n = 16) => {   // tembleque final, siempre desde el reposo
      for (let i = 1; i <= n; i++) { const k = i / n, w = Math.exp(-dec * k) * Math.cos(TAU * fr * k * .9 + Math.PI);
        push(u0 + (1 - u0) * k, { sk:w * 6 * dirX, sx:1 - amp * w, sy:1 + amp * 1.05 * w }, 1 - .6 * amp * w); }
    };
    const up = d.sy > 1.26, down = d.sy < .8, side = Math.abs(d.shear) > 20 || Math.abs(g.vx) > 5;
    const N = 48;
    let kind: string, dur: number;
    // ¿qué hizo el dedo? (en orden de prioridad)
    if (Math.abs(D.turn) > 5.2)                             kind = 'spin';    // dibujaste un círculo
    else if (D.flips >= 4)                                  kind = 'shake';   // lo sacudiste de lado a lado
    else if (down && (D.sag || 0) > .07)                    kind = 'splat';   // aplastado y derretido
    else if (D.held > 1.2 && peak > .18)                    kind = 'taffy';   // lo tuviste estirado un buen rato
    else if (up && (Math.abs(D.pvx || 0) > 3 || Math.abs(D.tgt.x) > 38)) kind = 'flip';  // arriba y de lado
    else if (up)                                            kind = 'sling';
    else if (down)                                          kind = 'boing';
    else if (side)                                          kind = 'whip';
    else if (dur0 < .35 && D.path < 90)                     kind = 'flick';   // jaloncito rápido
    else kind = Math.random() < .5 ? 'jelly' : 'wobble';
    push(0, P0, d.sx, d.tx + d.lean * .6);
    switch (kind) {
      case 'spin': {   // TROMPO: sale girando sobre su centro, va frenando y se tambalea
        dur = 1500; const turns = Math.min(3, Math.round(Math.abs(D.turn) / TAU) + 1), dir = Math.sign(D.turn), tot = 360 * turns * dir;
        for (let i = 1; i <= 40; i++) { const u = i / 40 * .7, k = i / 40, e = 1 - Math.pow(1 - k, 3), wob = Math.sin(TAU * 3 * k) * (1 - k);
          push(u, { rot:tot * e, y:-8 * Math.sin(Math.PI * k), sx:1 + .14 * wob, sy:1 - .14 * wob }, .8 + .2 * k); }
        settle(.7, 3, .16); break;
      }
      case 'shake': {  // SACUDIDA: queda vibrando como gelatina recién servida, bien rápido
        dur = 1300; const fr = rnd(8, 10);
        for (let i = 1; i <= 60; i++) { const u = i / 60, e = Math.exp(-3.4 * u), w = Math.sin(TAU * fr * u) * e, w2 = Math.cos(TAU * fr * .5 * u) * e;
          push(u, { x:5 * w, sk:9 * w2, sx:1 + .09 * w, sy:1 - .1 * w }, 1 + .05 * w, 5 * w); }
        break;
      }
      case 'taffy': {  // CHICLE: regresa lento, lento… y al final se destensa de golpe
        dur = 1600; const bk = rnd(.5, .6);
        for (let i = 1; i <= 20; i++) { const k = i / 20, v = 1 - .5 * Math.pow(k, 1.6);   // arrastre lento: solo recupera la mitad
          push(bk * k, gooP(ctx, d, v), 1 + (d.sx - 1) * v); }
        push(bk + .06, { sk:d.shear * .35, sx:1.18, sy:.8 }, 1.15);                          // ¡snap!
        settle(bk + .06, rnd(2.8, 3.4), .2, 5); break;
      }
      case 'flip': {   // VOLTERETA: sale de lado, da una marometa en el aire y cae aplastado
        dur = 1450; const h = 34 + (d.sy - 1) * 60, dir = Math.sign(D.pvx || D.tgt.x || 1), tx = dir * 18;
        push(.08, { sx:1.18, sy:.78 }, 1.2);
        for (let i = 1; i <= 16; i++) { const k = i / 16, ar = Math.sin(Math.PI * k);
          push(.08 + .44 * k, { x:tx * Math.sin(Math.PI * k * .5) * (1 - k * .5), y:-h * ar, rot:360 * dir * (k * k * (3 - 2 * k)), sx:1 - .12 * ar, sy:1 + .14 * ar }, 1 - .45 * ar); }
        push(.6, { x:tx * .5, sx:1.32, sy:.66 }, 1.32);
        for (let i = 1; i <= 12; i++) { const k = i / 12, w = Math.exp(-5 * k) * Math.cos(TAU * 2.6 * k + Math.PI);
          push(.6 + .4 * k, { x:tx * .5 * (1 - k), sk:6 * w * dir, sx:1 - .3 * w, sy:1 + .32 * w }, 1 - .2 * w); }
        break;
      }
      case 'sling': {  // RESORTERA: se encoge, sale disparado, cae como plasta y tiembla
        dur = 1350; const h = 26 + (d.sy - 1) * 70;
        push(.08, { sx:1.18, sy:.78 }, 1.2);
        push(.26, { y:-h, sx:.84, sy:1.2 }, .6);
        push(.4, { y:-h * .85, sx:1.04, sy:.97 }, .66);
        push(.54, { sx:1.3, sy:.68 }, 1.3);
        settle(.54, rnd(2.6, 3.4), .3); break;
      }
      case 'splat': {  // PLASTA: se desparrama en el piso, se queda un momento y luego se levanta como gelatina
        dur = 1500;
        push(.14, { sx:1.42, sy:.58 }, 1.42);
        push(.4, { sx:1.36, sy:.62 }, 1.36);
        push(.56, { y:-6, sx:.9, sy:1.16 }, .9);
        settle(.56, 2.8, .18); break;
      }
      case 'boing': {  // BOING: se dispara hacia arriba con un rebote exagerado
        dur = 1100; const fr = rnd(3, 3.8), dec = rnd(4.2, 5.2), amp = (1 - d.sy) * 1.7;
        for (let i = 1; i <= N; i++) { const u = i / N, w = Math.exp(-dec * u) * Math.sin(TAU * fr * u), hop = u < .3 ? 14 * Math.sin(Math.PI * u / .3) : 0;
          const sy = 1 + amp * w; push(u, { y:-hop, sx:1 / Math.sqrt(sy), sy }, (1 / Math.sqrt(sy)) * (1 - hop / 40)); }
        break;
      }
      case 'whip': {   // LATIGAZO: la punta chicotea de un lado a otro
        dur = 1400; const fr = rnd(3.2, 4.2), dec = rnd(3.2, 4), s0 = d.shear || dirX * 22;
        for (let i = 1; i <= N; i++) { const u = i / N, w = Math.exp(-dec * u) * Math.cos(TAU * fr * u), w2 = Math.exp(-dec * u) * Math.sin(TAU * fr * u), sy = 1 + .12 * Math.abs(w2);
          push(u, { x:d.tx * w, lean:d.lean * w, sk:-(Math.abs(s0) + 8) * Math.sign(s0) * w, sx:1 / Math.sqrt(sy), sy }, 1 + Math.abs(s0) * Math.abs(w) / 140, (d.tx + d.lean * .6) * w); }
        animatePose(ctx, u => ({ roll: dirX * 10 * Math.sin(TAU * 1.6 * u) * (1 - u) }), 1100);
        break;
      }
      case 'flick': {  // TOQUECITO: vibra rapidito y chiquito, como resorte de puerta
        dur = 650; const fr = rnd(9, 12);
        for (let i = 1; i <= 36; i++) { const u = i / 36, w = Math.exp(-4.5 * u) * Math.cos(TAU * fr * u);
          push(u, { sk:-(d.shear || dirX * 10) * w, sx:1 + (d.sx - 1 || .05) * w, sy:1 + (d.sy - 1 || -.06) * w }, 1); }
        break;
      }
      case 'wobble': { // BAMBOLEO: se mece sobre los pies como muñeco porfiado, lento y pesado
        dur = 1600; const fr = rnd(1.6, 2.1), a0 = 14 * dirX;
        for (let i = 1; i <= N; i++) { const u = i / N, e = Math.exp(-3.2 * u), w = Math.cos(TAU * fr * u) * e, w2 = Math.sin(TAU * fr * 2 * u) * e;
          push(u, { lean:a0 * w, sk:-a0 * .5 * w, sx:1 + .05 * w2, sy:1 - .06 * w2 }, 1 + .05 * Math.abs(w), a0 * .5 * w); }
        break;
      }
      default: {       // GELATINA: tiembla en dos ejes a ritmos distintos (nunca igual)
        dur = 1050; const f1 = rnd(2.3, 3.1), f2x = f1 * rnd(1.3, 1.6), dec = rnd(4.2, 5.4);
        for (let i = 1; i <= N; i++) { const u = i / N, e = Math.exp(-dec * u), v = e * Math.cos(TAU * f1 * u), vs = e * Math.cos(TAU * f2x * u + .8);
          const sy = 1 + ((d.sy - 1) || .12) * v, sh = (d.shear + 7 * dirX) * vs;
          push(u, { x:d.tx * v, lean:d.lean * v, sk:-sh, sx:1 / Math.sqrt(sy), sy }, 1 / Math.sqrt(sy), (d.tx + d.lean * .6) * v); }
      }
    }
    F[F.length - 1]['transform'] = T(ctx, {}, hc); SF[SF.length - 1]['transform'] = 'translateX(0px) scale(1,1)';
    ctx.running.get(ctx.el.hop)?.cancel();
    const a = ctx.el.hop.animate(F, { duration:dur, easing:'linear' }); ctx.running.set(ctx.el.hop, a);
    a.onfinish = () => { if (ctx.running.get(ctx.el.hop) === a) ctx.running.delete(ctx.el.hop); };
    ctx.el.shadow.animate(SF, { duration:dur });
    ctx.svg.dataset['goo'] = kind;   // para pruebas: qué reacción eligió
    ctx.kHeldKey = null;
    // cara al soltarlo, según la reacción (primero la sorpresa/el golpe y luego se alegra)
    const KF: [GfKawaiiId, number][] = ({ spin:[['dizzy', 1500], ['embarrassed', 900]], shake:[['dizzy', 1400], ['resigned', 800]], flip:[['amazed', dur * .5], ['happy', 900]],
      sling:[['tantrum', dur * .5], ['hopeful', 900]], splat:[['tantrum', dur * .45], ['resigned', 900]], taffy:[['awkward', dur * .45], ['satisfied', 800]],
      whip:[['amazed', 520], ['cheeky', 800]], flick:[['wink', 700]], boing:[['happy', 900], ['content', 600]] } as Record<string, [GfKawaiiId, number][]>)[kind] || [['content', 900]];
    let extra = 0;
    if (kind === 'spin') {   // girarlo: una de 5 reacciones (si le diste muchas vueltas, más mareado)
      const many = Math.abs(D.turn) / TAU >= 1.8, vs = many ? ['fall', 'stars', 'stagger', 'fall'] : ['top', 'pirouette', 'stars', 'stagger', 'fall'];
      const v = ctx.force.spin || vs[Math.floor(Math.random() * vs.length)]; ctx.svg.dataset['spin'] = v;
      extra = spinFx(ctx, v, dur, Math.sign(D.turn) || 1);
    } else { expr(ctx, KF[0][0], KF[0][1]); if (KF[1]) setTimeout(() => { if (!ctx.dragging) expr(ctx, KF[1][0], KF[1][1]); }, KF[0][1] - 60); }
    lit(ctx, 'lift', [{ opacity:.1 }, { opacity:0 }], 400);
    setPose(ctx, { yaw:0, pitch:0 });
    // la cara reacciona según lo que le hiciste
    if (kind === 'spin' || kind === 'shake') { swapEyes(ctx, 'squeeze', 1100); animatePose(ctx, u => ({ roll: 9 * Math.sin(TAU * 2.5 * u) * (1 - u), yaw: .25 * Math.sin(TAU * 1.5 * u) * (1 - u) }), 1300); }
    else if (kind === 'flip' || kind === 'sling') { later(ctx, () => swapEyes(ctx, 'squeeze', 500), dur * .5); animatePose(ctx, u => ({ roll: 8 * Math.sin(TAU * 2 * u) * (1 - u) }), 900); }
    else if (kind === 'splat' || kind === 'taffy') later(ctx, () => swapEyes(ctx, 'squeeze', 450), dur * .45);
    else if (kind === 'whip') swapEyes(ctx, 'squeeze', 520);
    else if (peak > .28) swapEyes(ctx, 'squeeze', 520);
    else later(ctx, () => swapEyes(ctx, 'happy', 600), 150);
    if (kind === 'flip' || kind === 'spin') later(ctx, () => swapEyes(ctx, 'happy', 600), dur * .85);
    ctx.hooks.act(dur + extra);
    if (ctx.state === 'idle') later(ctx, () => { clearRoutine(ctx); RUN.idle(ctx); }, dur + extra);   // vuelve a respirar
  }

  /**
   * Engancha los punteros al SVG: tocar = `poke`, arrastrar = gelatina. Devuelve la función que los quita
   * (el prototipo no lo hacía: un componente que se destruye no puede dejar listeners sueltos).
   */
  export function enableTouch(ctx: BotContext): () => void {
    let start: { x: number; y: number } | null = null;
    const svg = ctx.svg;
    const k = (): number => 200 / svg.getBoundingClientRect().width;
    const down = (e: PointerEvent): void => {
      if (ctx.paused || !(e.target as Element | null)?.closest('.breath')) return;
      start = { x:e.clientX, y:e.clientY }; svg.setPointerCapture(e.pointerId); ctx.lastTouchAt = performance.now();
    };
    const move = (e: PointerEvent): void => {
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!ctx.dragging && Math.hypot(dx, dy) > 6) beginDrag(ctx);
      if (ctx.dragging) dragTo(ctx, dx * k(), dy * k());
    };
    const up = (e: PointerEvent): void => {
      if (!start) return;
      if (ctx.dragging) endDrag(ctx);
      else if (e.type === 'pointerup') { const r = svg.getBoundingClientRect(); poke(ctx, (e.clientX - r.left) * k(), (e.clientY - r.top) * k()); }
      start = null;
    };
    svg.addEventListener('pointerdown', down);
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', up);
    return () => {
      svg.removeEventListener('pointerdown', down);
      svg.removeEventListener('pointermove', move);
      svg.removeEventListener('pointerup', up);
      svg.removeEventListener('pointercancel', up);
    };
  }
