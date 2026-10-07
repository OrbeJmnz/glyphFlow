import { gfBotKit as kit, type GfBotInternalContext as BotContext } from 'glyphflow/bots';
import type { GfBotHat } from './hats-data';
import { hatShadowSync } from './hat-shadow';

  export function hatKick(ctx: BotContext, up = 2.6, side = (Math.random() < .5 ? -1 : 1) * 2.4) { ctx.hatPhys.voy -= up; ctx.hatPhys.vth += side; }

/**
 * La física y el montaje de los sombreros de un catálogo. Va en una fábrica porque el catálogo es un dato que pasa el usuario (`createHatsExtra`):
 * `hatBind` y `hatStep` lo leen por clausura en vez de importar uno fijo.
 */
  export function createHatPhysics(hats: Readonly<Record<string, GfBotHat>>): { hatBind: (ctx: BotContext) => void; hatStep: (ctx: BotContext, now: number) => void } {
  function hatBind(ctx: BotContext): void {
    cancelAnimationFrame(ctx.hatRaf); ctx.hatRaf = 0;
    const sk = ctx.shape;
    const key = ctx.hatKey && sk.hatAt !== undefined ? ctx.hatKey : null;   // sin `hatAt` la forma no lleva sombrero
    const H0: GfBotHat | null = key ? hats[key] : null;
    ctx.svg.dataset['hat'] = key ?? (ctx.accX || '');
    ctx.el.fx.style.translate = H0?.up ? `0px ${kit.internal.f2(-H0.up * (sk.hatK ?? 1))}px` : '';
    ctx.el.hatShadow.innerHTML = H0?.shadow ? H0.shadow(ctx.id, sk.head || { w:94, ry:9 }) : '';
    if (H0 && sk.hatAt !== undefined) {
      const fit = H0.bodyFit && sk.bodyFit;
      ctx.hatEls = {
        anchor: ctx.el.accFront.querySelector<SVGGraphicsElement>('.hatAcc'), sdyn: ctx.el.accFront.querySelector<SVGGraphicsElement>('.hatAcc .hatDyn'),
        dyn: ctx.qa('.hatDyn'), tips: ctx.qa('.hatTip'),
        ax: 100 + (fit ? 0 : sk.hatX ?? 0), ay: fit ? fit.y : sk.cy + sk.hatAt + (H0.oy || 0) * (sk.hatK ?? 1),
      };
    } else ctx.hatEls = null;
    requestAnimationFrame(() => hatShadowSync(ctx));
    Object.assign(ctx.hatPhys, { th:0, vth:0, oy:0, voy:0, px:null, t:0 });
    if (ctx.hatEls?.anchor && !ctx.reduce) ctx.hatRaf = requestAnimationFrame((now) => hatStep(ctx, now));
  }

  function hatStep(ctx: BotContext, now: number): void {
    ctx.hatRaf = requestAnimationFrame((t) => hatStep(ctx, t));
    const anchor = ctx.hatEls?.anchor;
    const key = ctx.hatKey;
    if (ctx.paused || !ctx.hatEls || !anchor || !anchor.isConnected || !key) return;
    const root = ctx.svg.getScreenCTM(), m0 = anchor.getScreenCTM();
    if (!root || !m0 || !root.a) return;
    const m = root.inverse().multiply(m0), { ax, ay } = ctx.hatEls;
    const x = m.a * ax + m.c * ay + m.e, y = m.b * ax + m.d * ay + m.f, ang = Math.atan2(m.b, m.a) * 180 / Math.PI;
    const dt = ctx.hatPhys.t ? Math.min(3, Math.max(.3, (now - ctx.hatPhys.t) / 16.7)) : 1; ctx.hatPhys.t = now;
    if (ctx.hatPhys.px === null) Object.assign(ctx.hatPhys, { px:x, py:y, pa:ang, pvx:0, pvy:0, pva:0 });
    const px = ctx.hatPhys.px ?? x;
    let da = ang - ctx.hatPhys.pa; da = ((da + 540) % 360) - 180;
    const vx = (x - px) / dt, vy = (y - ctx.hatPhys.py) / dt, va = da / dt;
    const acx = Math.max(-6, Math.min(6, (vx - ctx.hatPhys.pvx) / dt)), acy = Math.max(-6, Math.min(6, (vy - ctx.hatPhys.pvy) / dt)), aca = Math.max(-40, Math.min(40, (va - ctx.hatPhys.pva) / dt));
    Object.assign(ctx.hatPhys, { px:x, py:y, pa:ang, pvx:vx, pvy:vy, pva:va });
    const H: GfBotHat = hats[key], k = H.k ?? .1, c = Math.pow(.8, dt), target = ctx.state === 'sleeping' ? (H.sleep ?? 7) : 0;
    ctx.hatPhys.vth = (ctx.hatPhys.vth + (-(ctx.hatPhys.th - target) * k - acx * 3.4 * (H.sway ?? 1) - aca * .3 * (H.sway ?? 1) + acy * .5 * (H.sway ?? 1) * ctx.hatPhys.side) * dt) * c;   // al caer se ladea hacia un lado
    ctx.hatPhys.th = Math.max(-60, Math.min(60, ctx.hatPhys.th + ctx.hatPhys.vth * dt));
    const mT = H.maxTh ?? 24, thD = mT * Math.tanh(ctx.hatPhys.th / mT);   // tope suave: se ladea mucho pero nunca «voltea» de golpe
    ctx.hatPhys.voy = (ctx.hatPhys.voy + (-ctx.hatPhys.oy * k * 1.4 - acy * 1.5 * (H.lift ?? 1)) * dt) * c;
    if (acy < -2.5) ctx.hatPhys.side = Math.random() < .5 ? -1 : 1;   // cada brinco elige de qué lado se ladea
    ctx.hatPhys.oy = ctx.hatPhys.oy + ctx.hatPhys.voy * dt; if (ctx.hatPhys.oy > 2.2) { ctx.hatPhys.oy = 2.2; ctx.hatPhys.voy *= -.3; } if (ctx.hatPhys.oy < -12) { ctx.hatPhys.oy = -12; ctx.hatPhys.voy = 0; }
    const sq = Math.max(0, Math.min(1, ctx.hatPhys.oy / 2.2)), st = Math.max(0, Math.min(1, -ctx.hatPhys.oy / 8));   // al apretarse contra la cabeza se aplasta; al levantarse se estira tantito
    const tr = `translate(0px, ${kit.internal.f2(ctx.hatPhys.oy)}px) rotate(${kit.internal.f2(thD)}deg) scale(${kit.internal.f3(1 + .02 * sq - .01 * st)}, ${kit.internal.f3(1 - .03 * sq + .015 * st)})`;
    ctx.hatEls.dyn.forEach(g => g.style.transform = tr);
    const mP = H.maxTip ?? 34, tv = mP * Math.tanh((thD * ((H.tip ?? 1) - 1) + ctx.hatPhys.vth * 2.2 * (H.tip ?? 1)) / mP);
    const tip = H.tipMode === 'skew' ? `skewX(${kit.internal.f2(-tv)}deg)` : `rotate(${kit.internal.f2(tv)}deg)`;   // skew: la copa se dobla desde la banda, sin costuras
    ctx.hatEls.tips.forEach(g => g.style.transform = tip);
    hatShadowSync(ctx);
  }
    return { hatBind, hatStep };
  }
