import { gfBotKit as kit, type GfBotInternalContext as BotContext } from 'glyphflow/bots';
import { TMIX, TOYS, type GfBotToy, type GfBotToyId } from './toys-data';




  export const toyAt = (ctx: BotContext, fn: () => void, ms: number) => ctx.toyTimers.push(setTimeout(() => { if (!ctx.paused && !ctx.dragging) fn(); }, ms));

  export function toyClear(ctx: BotContext) {
    ctx.toyTimers.forEach(clearTimeout); ctx.toyTimers = [];
    [...ctx.el.toys.children].forEach(n => n.animate([{ opacity:1 }, { opacity:0 }], { duration:180, fill:'forwards' }).onfinish = () => n.remove());
  }

  export const lookAtPt = (ctx: BotContext, px: number, py: number) => kit.internal.setPose(ctx, { yaw: Math.max(-1, Math.min(1, (px - 100) / 70)) * .55, pitch: Math.max(-1, Math.min(1, (py - ctx.shape.cy) / 70)) * .3 });

  export function toy(ctx: BotContext, kind: string, x: number, y: number) {
    const TY: GfBotToy | undefined = Object.hasOwn(TOYS, kind) ? TOYS[kind as GfBotToyId] : undefined; if (!TY || ctx.paused || ctx.dragging) return;
    toyClear(ctx); kit.internal.wake(ctx);
    const sh = ctx.shape, r = TY.r, yF = 188 - r, top = kit.internal.headTop(ctx), cs = getComputedStyle(ctx.svg), tok = (k: string) => cs.getPropertyValue('--bot-' + k).trim() || '#FFFFFF';
    const COLS = ['tertiary', 'secondary', 'primary', 'highlight', 'glow'].map(tok);   // chispas y luces con los colores del bot
    x = Math.max(-30, Math.min(230, x)); y = Math.min(y, yF);
    const pt = ctx.svg.createSVGPoint(); pt.x = x; pt.y = y;
    let onBody: boolean; try { onBody = (ctx.el.clip as SVGGeometryElement).isPointInFill(pt); } catch { onBody = false; }   // sin geometría que medir (SSR, jsdom): no cae encima
    if (!onBody && Math.abs(x - 100) < 60 && y < top) onBody = true;   // lo soltaste encima de su cabeza: le cae
    const id = `${ctx.id}-t${++ctx.toyN}`, g = kit.internal.mk(ctx, 'g', { class:'toy' }, ctx.el.toys, TY.draw(id));
    g.style.transformOrigin = '0px 0px';
    const P = (gx: number, gy: number, extra = '') => `translate(${kit.internal.f2(gx)}px,${kit.internal.f2(gy)}px)${extra ? ' ' + extra : ''}`;
    const go = (frames: Keyframe[], ms: number, easing = 'ease-in-out') => g.animate(frames, { duration:ms, easing, fill:'forwards' });
    const pos = { x, y };
    const to = (x1: number, y1: number, ms: number, extra = '', easing?: string) => { const a = go([{ transform:P(pos.x, pos.y) }, { transform:P(x1, y1, extra) }], ms, easing); pos.x = x1; pos.y = y1; return a; };
    const arc = (x1: number, y1: number, ms: number, h = 30, spin = 0, n = 20, sc = 1) => { const { x:x0, y:y0 } = pos; pos.x = x1; pos.y = y1;
      return go(Array.from({ length:n + 1 }, (_, i) => { const u = i / n; return { offset:u, transform:P(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u - h * Math.sin(Math.PI * u), `rotate(${kit.internal.f2(spin * u)}deg) scale(${kit.internal.f3(1 + (sc - 1) * u)})`) }; }), ms, 'linear'); };
    const fall = (x1: number, y1: number, ms: number) => { const { x:x0, y:y0 } = pos; pos.x = x1; pos.y = y1; const b = Math.min(14, Math.max(4, (y1 - y0) * .16));
      return go([{ transform:P(x0, y0), easing:'cubic-bezier(.5,0,.9,.6)' }, { transform:P(x1, y1, 'scale(1.18,.82)'), offset:.62, easing:'ease-out' },
        { transform:P(x1, y1 - b), offset:.82, easing:'ease-in' }, { transform:P(x1, y1, 'scale(1.06,.94)'), offset:.93 }, { transform:P(x1, y1) }], ms, 'linear'); };
    const roll = (x1: number, ms: number, easing = 'ease-out') => { const x0 = pos.x; pos.x = x1; return go([{ transform:P(x0, pos.y) }, { transform:P(x1, pos.y, `rotate(${kit.internal.f2((x1 - x0) / r * 57.3)}deg)`) }], ms, easing); };
    const fade = (ms = 300, extra = 'scale(.6)') => go([{ transform:P(pos.x, pos.y), opacity:1 }, { transform:P(pos.x, pos.y, extra), opacity:0 }], ms, 'ease-out');
    const chomp = () => kit.internal.play(ctx, ctx.el.breath, [{}, { transform:kit.S(1.06,.92), offset:.4 }, { transform:kit.S(1) }], { duration:240, easing:'ease-out' });
    const chew = () => ctx.svg.querySelector('.xkM')?.animate([{ transform:'scale(1,1)' }, { transform:'scale(1.25,.55)', offset:.35 }, { transform:'scale(.9,1.15)', offset:.7 }, { transform:'scale(1,1)' }], { duration:300, composite:'add' });
    const crumbs = (cx: number, cy: number, n = 3) => { for (let k = 0; k < n; k++) { const c = kit.internal.mk(ctx, 'circle', { cx:cx + (Math.random() - .5) * 10, cy, r:1.2 + Math.random(), style:'fill:#C48A4E;fill:color-mix(in srgb, #C48A4E 72%, var(--bot-shadow))' }, ctx.el.toys);
      c.animate([{ transform:'translate(0,0)', opacity:1 }, { transform:`translate(${kit.internal.f2((Math.random() - .5) * 16)}px,${kit.internal.f2(188 - cy - 2)}px)`, opacity:.9, offset:.85 }, { opacity:0, transform:`translate(0px,${kit.internal.f2(188 - cy - 2)}px)` }], { duration:700, easing:'cubic-bezier(.5,0,.9,.6)', fill:'forwards' }).onfinish = () => c.remove(); } };
    const bite = (bx: number, by: number, br: number) => kit.internal.mk(ctx, 'circle', { cx:bx, cy:by, r:br }, g.querySelector('.bites')!);
    // el bot se desplaza de lado a brinquitos (y regresa con hopTo(0))
    let botX = 0, shAnim: Animation | null = null;
    const hopTo = (x1: number, ms: number, hops = 2, hh = 10) => { const x0 = botX; botX = x1;
      const F = Array.from({ length:25 }, (_, i) => { const u = i / 24, h = Math.abs(Math.sin(Math.PI * hops * u)); return { offset:u, transform:`translate(${kit.internal.f2(x0 + (x1 - x0) * u)}px,${kit.internal.f2(-hh * h)}px) ${kit.S(kit.internal.f3(1 + .05 * (1 - h)), kit.internal.f3(1 - .05 * (1 - h)))}` }; });
      ctx.running.get(ctx.el.hop)?.cancel(); const a = ctx.el.hop.animate(F, { duration:ms, easing:'linear', fill: x1 ? 'forwards' : 'none' }); ctx.running.set(ctx.el.hop, a);
      shAnim?.cancel(); shAnim = ctx.el.shadow.animate([{ transform:`translateX(${kit.internal.f2(x0)}px)` }, { transform:`translateX(${kit.internal.f2(x1)}px)` }], { duration:ms, fill: x1 ? 'forwards' : 'none' }); };
    let sg = x < 100 ? -1 : 1, side: 'L' | 'R' = sg < 0 ? 'L' : 'R';
    const reach = (deg: number[], ms: number) => kit.internal.parm(ctx, side, deg.map(a => side === 'L' ? a : -a), ms);   // pulpo: el lóbulo de ese lado hace de mano
    const headY = top - r - 2, mx = 100 + sg * 3, my = sh.faceY + (sh.mouthDy ?? 15) + 7;
    const fallMs = Math.max(420, 260 + Math.sqrt(Math.max(0, yF - y)) * 34);
    let t = 0;
    ctx.hooks.act(6500);
    // ---- llegada: junto al bot cae al piso; encima de él le pega en la cabeza y rebota al piso a un lado ----
    if (!onBody) { fall(x, yF, fallMs); toyAt(ctx, () => { lookAtPt(ctx, x, yF); kit.internal.miniHop(ctx, 6); }, fallMs * .62); t = fallMs + 120; }
    else {
      const hx = 100 + (x - 100) * .3; sg = x < 100 ? -1 : 1; side = sg < 0 ? 'L' : 'R';
      const d1 = Math.max(300, fallMs * .6), xs = 100 + sg * 82;
      to(hx, headY, d1, '', 'cubic-bezier(.5,0,.9,.6)');
      toyAt(ctx, () => { kit.internal.play(ctx, ctx.el.hop, [{}, { transform:kit.S(1.2,.74), offset:.14 }, { transform:kit.S(.93,1.08), offset:.4 }, { transform:kit.S(1.04,.97), offset:.66 }, { transform:kit.S(1) }], { duration:700, easing:'ease-out' });
        ctx.hats?.kick(ctx, 3); kit.internal.kStars(ctx, 1200); kit.internal.kSeq(ctx, [['tantrum', 380], ['amazed', 520]]); arc(xs, yF, 620, 34, sg * 280); }, d1);
      toyAt(ctx, () => lookAtPt(ctx, xs, yF), d1 + 380);
      t = d1 + 760;
    }
    const restX = onBody ? 100 + sg * 82 : x;   // dónde queda el objeto al terminar la llegada (los callbacks corren después)
    const V = ({
      ball: [
        ['headbutts', () => {   // la sube a su cabeza, la cabecea dos veces y la avienta al otro lado
          toyAt(ctx, () => { kit.internal.expr(ctx, 'playful', 1400); reach([0, -10, 45, 52, 10, 0], 900); kit.internal.animatePose(ctx, u => ({ roll: kit.internal.baseRoll(ctx) + sg * 8 * Math.sin(Math.PI * u) }), 600); }, t);
          toyAt(ctx, () => arc(100, headY, 620, 46, -sg * 300), t + 380); t += 1000;
          [0, 1].forEach(k => { const h = k ? 16 : 30, d = k ? 380 : 480;
            toyAt(ctx, () => { chomp(); ctx.hats?.kick(ctx, 2.4); kit.internal.setPose(ctx, { pitch:-.28, yaw:0 }); if (!k) kit.internal.expr(ctx, 'hopeful', 900);   // UNA cara para los dos botes: cambiarla cada 300 ms la deja en blanco
              go([{ transform:P(pos.x, headY, 'scale(1.16,.84)') }, { transform:P(pos.x, headY - h), offset:.5, easing:'ease-in' }, { transform:P(pos.x, headY) }], d, 'ease-out'); }, t);
            t += d; });
          const x2 = 100 - sg * 92;
          toyAt(ctx, () => { chomp(); kit.internal.setPose(ctx, { pitch:0 }); arc(x2, yF, 700, 40, -sg * 360); kit.internal.expr(ctx, 'happy', 1400); }, t);
          toyAt(ctx, () => lookAtPt(ctx, x2, yF), t + 300);
          toyAt(ctx, () => { roll(x2 - sg * 40, 700); fade(700, `rotate(${-sg * 200}deg)`); kit.internal.miniHop(ctx, 12); kit.internal.swapEyes(ctx, 'happy', 700); }, t + 700); t += 1500;
        }],
        ['balance', () => {   // la pone en su cabeza y hace equilibrio… hasta que se le cae
          toyAt(ctx, () => { kit.internal.expr(ctx, 'hopeful', 700); reach([0, 30, 50, 20, 0], 900); arc(100, headY, 620, 40, -sg * 200); }, t); t += 640;
          const D = 2000;
          toyAt(ctx, () => { kit.internal.expr(ctx, 'serious', D);   // concentrado
            go(Array.from({ length:41 }, (_, i) => { const u = i / 40, w = Math.sin(kit.internal.TAU * 1.25 * u) * (1 + u); return { offset:u, transform:P(100 + 13 * w, headY + 1.5 * Math.abs(w), `rotate(${kit.internal.f2(70 * w)}deg)`) }; }), D, 'linear');
            kit.internal.animatePose(ctx, u => ({ roll: kit.internal.baseRoll(ctx) - 9 * Math.sin(kit.internal.TAU * 1.25 * u) * (1 + u * .5), pitch:-.18 }), D);
            kit.internal.parm(ctx, 'L', [0, 14, -8, 18, -6, 0], D); kit.internal.parm(ctx, 'R', [0, 8, -16, 6, -18, 0], D);   // pulpo: los dos lóbulos ayudan a equilibrar
            pos.x = 126; }, t); t += D;
          const x2 = 100 + 74;
          toyAt(ctx, () => { arc(x2, yF, 620, 18, 300); kit.internal.kSeq(ctx, [['amazed', 520], ['embarrassed', 900]]); kit.internal.tremble(ctx, 300, 1.4); kit.internal.setPose(ctx, { pitch:0 }); }, t);
          toyAt(ctx, () => { lookAtPt(ctx, x2, yF); roll(x2 + 30, 700); }, t + 620); toyAt(ctx, () => fade(400), t + 1300); t += 1700;
        }],
        ['return', () => {   // la patea por encima de él, rebota del otro lado y regresa rodando hasta sus pies
          const xo = 100 - sg * 112;
          toyAt(ctx, () => { kit.internal.expr(ctx, 'naughty', 900); reach([0, 50, 10, 0], 600); kit.internal.animatePose(ctx, u => ({ roll: kit.internal.baseRoll(ctx) + sg * 12 * Math.sin(Math.PI * u) }), 500); chomp(); }, t);
          toyAt(ctx, () => { arc(xo, yF, 900, 120, -sg * 540); kit.internal.setPose(ctx, { pitch:-.35 }); kit.internal.expr(ctx, 'amazed', 900); }, t + 200);
          toyAt(ctx, () => lookAtPt(ctx, 100, top - 40), t + 400); toyAt(ctx, () => lookAtPt(ctx, xo, yF), t + 800);
          t += 1100;
          toyAt(ctx, () => { go([{ transform:P(xo, yF) }, { transform:P(xo, yF - 22), offset:.5, easing:'ease-in' }, { transform:P(xo, yF) }], 420, 'ease-out'); }, t); t += 420;
          const xf = 100 - sg * 74;
          toyAt(ctx, () => { roll(xf, 1100, 'cubic-bezier(.3,.6,.4,1)'); kit.internal.expr(ctx, 'hopeful', 1100); }, t); t += 1100;
          toyAt(ctx, () => { kit.internal.play(ctx, ctx.el.breath, [{}, { transform:kit.S(1.05,.95), offset:.3 }, { transform:kit.S(1) }], { duration:400 }); kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.expr(ctx, 'happy', 1200); kit.internal.swapEyes(ctx, 'happy', 800); kit.internal.miniHop(ctx, 10); }, t);
          toyAt(ctx, () => fade(500), t + 700); t += 1200;
        }],
        ['hunt', () => {   // la pelota se le escapa rodando; la persigue a brinquitos y se le echa encima
          const xr = Math.max(-28, Math.min(228, restX + sg * 40));
          toyAt(ctx, () => { roll(xr, 1000, 'ease-in-out'); kit.internal.expr(ctx, 'naughty', 2000); lookAtPt(ctx, xr, yF); }, t);
          toyAt(ctx, () => hopTo(sg * 34, 800, 2), t + 300); t += 1100;
          toyAt(ctx, () => { hopTo(sg * 46, 420, 1, 24); reach([0, 40, 0], 500); }, t);   // ¡se le echa encima! (sin miniHop: cancelaría el desplazamiento)
          toyAt(ctx, () => { go([{ transform:P(pos.x, yF) }, { transform:P(pos.x, yF, 'scale(1.35,.62)') }, { transform:P(pos.x, yF) }], 300, 'ease-out'); chomp(); kit.internal.expr(ctx, 'happy', 1300); }, t + 300);
          toyAt(ctx, () => { arc(pos.x + sg * 30, yF - 70, 600, 20, sg * 300, 20, .6); fade(600); }, t + 600);
          toyAt(ctx, () => { hopTo(0, 800, 2); kit.internal.swapEyes(ctx, 'happy', 700); kit.internal.setPose(ctx, { yaw:0, pitch:0 }); }, t + 900); t += 1800;
        }]
      ],
      star: [
        ['orbit', () => {   // sube por fuera, le da una vuelta a la cabeza y estalla en chispas
          toyAt(ctx, () => { kit.internal.expr(ctx, 'hopeful', 1300); reach([0, 30, 48, 40, 0], 1100); }, t);
          toyAt(ctx, () => { const sx = pos.x + (pos.x > 100 ? 8 : -8); go([{ transform:P(pos.x, pos.y) }, { transform:P(sx, top + 6, 'scale(1.1)'), offset:.55 }, { transform:P(100, top - 22, 'scale(1.25)') }], 800); pos.x = 100; pos.y = top - 22; }, t + 300);
          toyAt(ctx, () => kit.internal.setPose(ctx, { pitch:-.3, yaw:0 }), t + 500); t += 1000;
          toyAt(ctx, () => { const N = 32, D = 1000, cy = top - 6;
            go(Array.from({ length:N + 1 }, (_, i) => { const a = -Math.PI / 2 + kit.internal.TAU * i / N; return { offset:i / N, transform:P(100 + 40 * Math.cos(a), cy + 14 * Math.sin(a) - 4, `scale(${kit.internal.f3(1.1 + .2 * Math.sin(a))})`) }; }), D, 'linear');
            kit.internal.animatePose(ctx, u => ({ yaw: .45 * Math.cos(-Math.PI / 2 + kit.internal.TAU * u), pitch: -.22 }), D); }, t); t += 1000;
          toyAt(ctx, () => { fade(260, 'scale(1.9) rotate(40deg)'); for (let i = 0; i < 9; i++) kit.internal.spark(ctx, top, true, COLS);
            kit.internal.flash(ctx, .3, 800, tok('tertiary')); kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.miniHop(ctx, 18); kit.internal.expr(ctx, 'inLove', 1500);
            kit.internal.parm(ctx, 'L', [0, 40, 34, 40, 0], 1200); kit.internal.parm(ctx, 'R', [0, -40, -34, -40, 0], 1200); }, t); t += 1500;
        }],
        ['wish', () => {   // la estrella sube muy alto; él cierra los ojos y pide un deseo… y sale disparada como estrella fugaz
          const sx = 100 + sg * 46, sy = top - 48;
          toyAt(ctx, () => { to(sx, sy, 1200, 'scale(1.4)'); kit.internal.expr(ctx, 'hopeful', 1000); kit.internal.setPose(ctx, { pitch:-.4, yaw: sg * .3 }); reach([0, 40, 52, 52, 30, 0], 2200); }, t); t += 1300;
          toyAt(ctx, () => { kit.internal.expr(ctx, 'content', 1500); kit.internal.flushCheeks(ctx, 1400); kit.internal.floaty(ctx, '♥', 2, tok('tertiary'), 11);   // ojos cerrados: pide un deseo
            go([{ transform:P(sx, sy, 'scale(1.4)') }, { transform:P(sx, sy - 4, 'scale(1.6)') }, { transform:P(sx, sy, 'scale(1.4)') }], 1400); }, t); t += 1500;
          const ex = 100 - sg * 150, ey = sy - 50;
          toyAt(ctx, () => {   // ¡fiuuu!
            const tr = kit.internal.mk(ctx, 'path', { d:`M${kit.internal.f2(sx)} ${kit.internal.f2(sy)} L${kit.internal.f2(ex)} ${kit.internal.f2(ey)}`, fill:'none', style:`stroke:${tok('highlight')}`, 'stroke-width':3, 'stroke-linecap':'round', 'stroke-dasharray':'40 400', 'stroke-dashoffset':40 }, ctx.el.toys);
            const L = Math.hypot(ex - sx, ey - sy); tr.animate([{ strokeDashoffset:40, opacity:.9 }, { strokeDashoffset:-L, opacity:.4 }], { duration:600, easing:'ease-in', fill:'forwards' }).onfinish = () => tr.remove();
            go([{ transform:P(sx, sy, 'scale(1.4)') }, { transform:P(ex, ey, 'scale(.4)'), opacity:.2 }], 600, 'ease-in'); kit.internal.setPose(ctx, { yaw: -sg * .4, pitch:-.4 }); kit.internal.expr(ctx, 'amazed', 600); }, t); t += 650;
          toyAt(ctx, () => { kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.flash(ctx, .28, 900, tok('glow')); kit.internal.expr(ctx, 'happy', 1300); kit.internal.miniHop(ctx, 16); kit.internal.swapEyes(ctx, 'happy', 800); }, t); t += 1300;
        }],
        ['crown', () => {   // se la pone en la cabeza como corona y presume
          toyAt(ctx, () => { kit.internal.expr(ctx, 'hopeful', 800); reach([0, 30, 50, 40, 0], 1100);
            const sx = pos.x + (pos.x > 100 ? 8 : -8); go([{ transform:P(pos.x, pos.y) }, { transform:P(sx, top + 4), offset:.5 }, { transform:P(100, top - 7, 'rotate(-8deg)') }], 900); pos.x = 100; pos.y = top - 7; }, t); t += 950;
          toyAt(ctx, () => { chomp(); ctx.hats?.kick(ctx, 2); kit.internal.expr(ctx, 'smug', 2200);
            kit.internal.animatePose(ctx, u => ({ roll: kit.internal.baseRoll(ctx) + 7 * Math.sin(kit.internal.TAU * u), pitch: -.12 * Math.sin(Math.PI * u) }), 2000);
            go(Array.from({ length:25 }, (_, i) => { const u = i / 24; return { offset:u, transform:P(100 + 4 * Math.sin(kit.internal.TAU * u), top - 7 - 1.5 * Math.abs(Math.sin(kit.internal.TAU * 2 * u)), `rotate(${kit.internal.f2(-8 + 14 * Math.sin(kit.internal.TAU * u))}deg) scale(${kit.internal.f3(1 + .12 * Math.max(0, Math.sin(kit.internal.TAU * 3 * u)))})`) }; }), 2000, 'linear');
            [300, 900, 1500].forEach(d => toyAt(ctx, () => kit.internal.spark(ctx, top - 10, false, COLS), t + d - t)); }, t); t += 2100;
          toyAt(ctx, () => { go([{ transform:P(100, top - 7), opacity:1 }, { transform:P(100, top - 40, 'scale(.5) rotate(90deg)'), opacity:0 }], 500, 'ease-in'); for (let i = 0; i < 5; i++) kit.internal.spark(ctx, top - 20, true, COLS); kit.internal.expr(ctx, 'happy', 1000); kit.internal.miniHop(ctx, 10); }, t); t += 1000;
        }],
        ['catch', () => {   // la estrella brinca de un lado a otro; la sigue con la mirada y la atrapa de un salto
          const ps = [[100 + sg * 66, top + 6], [100 - sg * 70, top + 24], [100 + sg * 30, top - 34]];
          toyAt(ctx, () => kit.internal.expr(ctx, 'playful', 1800), t);
          ps.forEach(([px, py], i) => { toyAt(ctx, () => { arc(px, py, 460, 26, sg * 120); toyAt(ctx, () => lookAtPt(ctx, px, py), 180); if (i === 1) reach([0, 30, 0], 400); }, t); t += 520; });
          toyAt(ctx, () => { kit.internal.miniHop(ctx, 28); to(100, top + 20, 300, 'scale(.25)', 'ease-in'); kit.internal.parm(ctx, 'L', [0, 46, 0], 500); kit.internal.parm(ctx, 'R', [0, -46, 0], 500); }, t);
          toyAt(ctx, () => { fade(150, 'scale(.1)'); kit.internal.flash(ctx, .36, 900, tok('tertiary')); kit.internal.mood(ctx, tok('tertiary'), [{ opacity:0 }, { opacity:.28, offset:.25 }, { opacity:0 }], 1100);   // se la «tragó»: brilla con su color
            for (let i = 0; i < 6; i++) kit.internal.spark(ctx, top, true, COLS); kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.expr(ctx, 'happy', 1300); kit.internal.swapEyes(ctx, 'happy', 800); }, t + 300); t += 1500;
        }]
      ],
      cookie: [
        ['bites', () => {   // se la lleva a la boca y se la come en 3 mordidas
          toyAt(ctx, () => { kit.internal.expr(ctx, 'hopeful', 1000); reach([0, 26, 34, 30, 12, 0], 1300); }, t);
          toyAt(ctx, () => { go([{ transform:P(pos.x, pos.y) }, { transform:P(pos.x + (mx + sg * 10 - pos.x) * .5, my - 22, 'rotate(-8deg)'), offset:.55 }, { transform:P(mx + sg * 10, my, 'scale(.82)') }], 700); pos.x = mx + sg * 10; pos.y = my; kit.internal.setPose(ctx, { yaw: sg * .12, pitch:.06 }); }, t + 300);
          t += 1050;
          const B: [number, number, number][] = [[-9 * sg, -5, 5.2], [-11 * sg, 3, 5.4], [0, 0, 14]];
          toyAt(ctx, () => kit.internal.expr(ctx, 'content', B.length * 470 + 120), t - 60);   // cara de «ñam» durante las 3 mordidas
          B.forEach((b, i) => toyAt(ctx, () => { bite(...b); chomp(); chew(); crumbs(pos.x, my + 4); if (i === B.length - 1) g.remove(); }, t + i * 470));
          t += B.length * 470;
          toyAt(ctx, () => { kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.expr(ctx, 'satisfied', 1600); kit.internal.flushCheeks(ctx, 1500); kit.internal.flash(ctx, .18, 800, tok('glow'));
            kit.internal.play(ctx, ctx.el.breath, [{}, { transform:kit.S(1.05,.95), offset:.4 }, { transform:kit.S(1) }], { duration:900, easing:'ease-in-out' }); kit.internal.floaty(ctx, '♥', 2, tok('tertiary'), 11); }, t); t += 1600;
        }],
        ['gulp', () => {   // ¡glup! se la mete entera y se le inflan los cachetes
          toyAt(ctx, () => { kit.internal.expr(ctx, 'naughty', 900); reach([0, 30, 40, 0], 900); to(mx + sg * 8, my, 650, 'scale(.85)'); kit.internal.setPose(ctx, { yaw: sg * .1 }); }, t); t += 700;
          toyAt(ctx, () => { to(100, my - 2, 200, 'scale(.15)', 'ease-in'); chomp(); }, t);
          toyAt(ctx, () => { g.style.opacity = '0'; kit.internal.expr(ctx, 'smug', 1500); kit.internal.flushCheeks(ctx, 1500);
            kit.internal.play(ctx, ctx.el.breath, [{}, { transform:kit.S(1.12,.93), offset:.12 }, { transform:kit.S(1.1,.94), offset:.35 }, { transform:kit.S(1.13,.92), offset:.55 }, { transform:kit.S(1.1,.94), offset:.8 }, { transform:kit.S(1) }], { duration:1500, easing:'ease-in-out' });
            [0, 300, 600, 900].forEach(d => toyAt(ctx, chew, t + 220 + d - (t + 220))); crumbs(100, my + 4, 2); }, t + 220); t += 1750;
          toyAt(ctx, () => { kit.internal.expr(ctx, 'happy', 1200); kit.internal.setPose(ctx, { yaw:0 }); kit.internal.miniHop(ctx, 14); kit.internal.swapEyes(ctx, 'happy', 800); kit.internal.flash(ctx, .2, 700, tok('glow')); }, t); t += 1200;
        }],
        ['dropped', () => {   // le da una mordida, se le resbala, se rompe en pedacitos… y se los come del piso
          toyAt(ctx, () => { kit.internal.expr(ctx, 'hopeful', 900); reach([0, 26, 34, 0], 1000); to(mx + sg * 10, my, 650, 'scale(.82)'); kit.internal.setPose(ctx, { yaw: sg * .12, pitch:.06 }); }, t); t += 750;
          toyAt(ctx, () => { bite(-9 * sg, -5, 5.2); chomp(); kit.internal.expr(ctx, 'content', 500); chew(); crumbs(pos.x, my + 4, 2); }, t); t += 520;
          const xf = 100 + sg * 70;
          toyAt(ctx, () => { fall(xf, yF, 520); kit.internal.kSeq(ctx, [['amazed', 520], ['embarrassed', 700]]); kit.internal.setPose(ctx, { pitch:.3, yaw: sg * .4 }); }, t); t += 540;
          const pcs = [[-13, 0], [0, 2], [13, 0]].map(([dx, dy]) => [xf + dx * 1.1, yF + 6 + dy]);
          const pieces: (SVGElement | undefined)[] = [];
          toyAt(ctx, () => { fade(120, 'scale(1.1)'); pcs.forEach(([px, py], i) => { const pc = pieces[i] = kit.internal.mk(ctx, 'g', { class:'tpiece' }, ctx.el.toys, `<path d="M-5 -3 L4 -5 L6 2 L-1 5 L-6 1 Z" transform="rotate(${i * 70})" style="${TMIX('#E5B27A', 'tertiary', 72)};stroke:color-mix(in srgb, #B47A43 70%, var(--bot-shadow))" stroke-width="1"/><circle cx="1" cy="0" r="1.3" style="${TMIX('#5B331E', 'shadow', 75)}"/>`);
              pc.style.transformOrigin = '0px 0px'; pc.animate([{ transform:P(xf, yF) }, { transform:P(px, py - 8), offset:.4 }, { transform:P(px, py) }], { duration:360, easing:'ease-out', fill:'forwards' }); }); }, t); t += 1000;
          toyAt(ctx, () => kit.internal.expr(ctx, 'content', 3 * 420 + 200), t);
          pcs.forEach(([px, py], i) => toyAt(ctx, () => { lookAtPt(ctx, px, py); kit.internal.setPose(ctx, { pitch:.32 }); chomp(); chew();
            const pc = pieces[i]; pc?.animate([{ opacity:1 }, { opacity:0, transform:`translate(${kit.internal.f2(px)}px,${kit.internal.f2(py - 14)}px) scale(.3)` }], { duration:240, fill:'forwards' }); setTimeout(() => pc?.remove(), 260); }, t + i * 420));
          t += 3 * 420 + 100;
          toyAt(ctx, () => { kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.expr(ctx, 'satisfied', 1500); kit.internal.flushCheeks(ctx, 1300); kit.internal.miniHop(ctx, 10); kit.internal.floaty(ctx, '♥', 1, tok('tertiary'), 12); }, t); t += 1500;
        }],
        ['aroma', () => {   // primero la huele (le llega el aroma), se derrite de gusto y luego se la come en 2 mordidas
          toyAt(ctx, () => { lookAtPt(ctx, pos.x, pos.y); kit.internal.setPose(ctx, { yaw: sg * .45, pitch:.2 }); kit.internal.expr(ctx, 'shy', 1600); }, t);
          for (let k = 0; k < 3; k++) toyAt(ctx, () => { const w = kit.internal.mk(ctx, 'path', { d:`M${kit.internal.f2(pos.x - 3)} ${kit.internal.f2(pos.y - 12)} q-3 -5 0 -9 q3 -5 0 -9`, fill:'none', style:`stroke:${tok('shadow')}`, 'stroke-width':1.8, 'stroke-linecap':'round', opacity:.7 }, ctx.el.toys);
            w.animate([{ transform:'translate(0,0)', opacity:0 }, { opacity:.7, offset:.3 }, { transform:`translate(${kit.internal.f2((100 - pos.x) * .5)}px,-20px)`, opacity:0 }], { duration:1100, easing:'ease-out', fill:'forwards' }).onfinish = () => w.remove(); }, t + 200 + k * 380);
          t += 1500;
          toyAt(ctx, () => { kit.internal.expr(ctx, 'inLove', 1100); kit.internal.flushCheeks(ctx, 1000); kit.internal.play(ctx, ctx.el.breath, [{}, { transform:kit.S(1.03,.98), offset:.3 }, { transform:kit.S(.98,1.03), offset:.6 }, { transform:kit.S(1) }], { duration:900 }); reach([0, 26, 34, 30, 0], 1200); }, t); t += 1000;
          toyAt(ctx, () => { to(mx + sg * 10, my, 600, 'scale(.82)'); kit.internal.setPose(ctx, { yaw: sg * .12, pitch:.06 }); }, t); t += 650;
          const B: [number, number, number][] = [[-9 * sg, -4, 6], [0, 0, 14]];
          toyAt(ctx, () => kit.internal.expr(ctx, 'content', B.length * 470 + 120), t - 60);
          B.forEach((b, i) => toyAt(ctx, () => { bite(...b); chomp(); chew(); crumbs(pos.x, my + 4); if (i === B.length - 1) g.remove(); }, t + i * 470));
          t += B.length * 470;
          toyAt(ctx, () => { kit.internal.setPose(ctx, { yaw:0, pitch:0 }); kit.internal.expr(ctx, 'satisfied', 1400); kit.internal.flash(ctx, .16, 700, tok('glow')); kit.internal.floaty(ctx, '♥', 2, tok('tertiary'), 11); }, t); t += 1400;
        }]
      ]
    } as Record<string, [string, () => void][]>)[kind];
    const i = ctx.toyIdx[kind] = ((ctx.toyIdx[kind] ?? -1) + 1) % V.length, [vname, run] = V[i];
    run();
    ctx.hooks.act(t + 400);
    toyAt(ctx, () => { g.remove(); if (botX) hopTo(0, 600, 1); kit.internal.setPose(ctx, { yaw:0, pitch:0 }); ctx.opts.onRoutine?.(ctx.state, null); }, t + 200);
    ctx.opts.onRoutine?.(ctx.state, `${TY.label.toLowerCase()} · ${vname}`);
    ctx.svg.dataset['toy'] = `${kind}·${vname}·${onBody ? 'onTop' : 'beside'}`;   // para pruebas
  }
