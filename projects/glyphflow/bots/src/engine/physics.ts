
import { f2, f3 } from '../data/color';
import { type BotContext } from './context';



  /**
   * Lo que queda de `hatBind` cuando no hay sombreros (`extras.hats` ausente): apaga la física y deja el atributo `data-hat` con el
   * accesorio extra (`glasses`…), que el CSS lee. Con sombreros lo hace `hatsExtra.bind`.
   */
  export function hatUnbind(ctx: BotContext): void {
    cancelAnimationFrame(ctx.hatRaf); ctx.hatRaf = 0;
    ctx.svg.dataset['hat'] = ctx.accX || '';
    ctx.el.fx.style.translate = '';
    ctx.el.hatShadow.innerHTML = '';
    ctx.hatEls = null;
  }

  export function cloudBind(ctx: BotContext) {
    cancelAnimationFrame(ctx.cloudRaf); ctx.cloudRaf = 0; ctx.el.breath.style.rotate = ''; ctx.el.breath.style.scale = ''; ctx.cloudPhys.px = null;
    if (ctx.shape.cloudPhys && !ctx.reduce) ctx.cloudRaf = requestAnimationFrame(() => cloudStep(ctx));
  }

  export function cloudStep(ctx: BotContext) {
    ctx.cloudRaf = requestAnimationFrame(() => cloudStep(ctx));
    if (ctx.paused) return;
    const r = ctx.svg.getScreenCTM(), m0 = ctx.el.breath.getScreenCTM(); if (!r || !m0 || !r.a) return;
    // se mide el punto de apoyo (100,172): nuestra propia inclinación/escala giran alrededor de él, así que no se retroalimenta
    const m = r.inverse().multiply(m0), x = m.a * 100 + m.c * 172 + m.e, y = m.b * 100 + m.d * 172 + m.f;
    const mh = ctx.el.hop.getScreenCTM(), ang = mh ? Math.atan2(mh.b, mh.a) * 180 / Math.PI : 0;   // giros del cuerpo (baile, rueda…)
    if (ctx.cloudPhys.px === null) { ctx.cloudPhys.px = x; ctx.cloudPhys.py = y; ctx.cloudPhys.pa = ang; return; }
    let da = ang - ctx.cloudPhys.pa; da = ((da + 540) % 360) - 180; ctx.cloudPhys.pa = ang; ctx.cloudPhys.va = (ctx.cloudPhys.va || 0) + (da - (ctx.cloudPhys.va || 0)) * .3;
    ctx.cloudPhys.vx += (x - ctx.cloudPhys.px - ctx.cloudPhys.vx) * .3; ctx.cloudPhys.vy += (y - ctx.cloudPhys.py - ctx.cloudPhys.vy) * .3; ctx.cloudPhys.px = x; ctx.cloudPhys.py = y;
    const tl = Math.max(-7, Math.min(7, -ctx.cloudPhys.vx * 1.8 - ctx.cloudPhys.va * 1.2)), ts = Math.max(-.06, Math.min(.06, -ctx.cloudPhys.vy * .014));
    ctx.cloudPhys.lean += (tl - ctx.cloudPhys.lean) * .16; ctx.cloudPhys.st += (ts - ctx.cloudPhys.st) * .16;
    ctx.el.breath.style.rotate = `${f2(ctx.cloudPhys.lean)}deg`; ctx.el.breath.style.scale = `${f3(1 - ctx.cloudPhys.st * .6)} ${f3(1 + ctx.cloudPhys.st)}`;
  }
