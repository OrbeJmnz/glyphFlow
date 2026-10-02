
import { pulpoD, pulpoIdleSt } from '../data/pulpo';
import { pulpoShape } from '../shapes/pulpo';
import { TAU } from './math';
import { supportsAnimatedD } from './shape-fx';
import { type BotContext } from './context';



  export function parm(ctx: BotContext, side: 'L' | 'R', deg: number[], ms: number) {
    if (ctx.shape.id !== 'pulpo' || ctx.reduce || !supportsAnimatedD()) return;
    if (!ctx.pGest) { ctx.pGest = {}; queueMicrotask(() => runPGest(ctx)); }
    ctx.pGest[side] = { deg:deg.map(a => Math.max(-52, Math.min(52, a))), ms };   // más de ~52° y la punta se enrosca contra la cabeza
  }

  export function runPGest(ctx: BotContext) {
    const g = ctx.pGest!; ctx.pGest = null; if (ctx.shape.id !== 'pulpo') return;
    const T = Math.max(g.L?.ms || 0, g.R?.ms || 0), N = Math.max(12, Math.round(T / 45));
    const at = (q: { deg: number[]; ms: number } | undefined, t: number) => { if (!q) return 0; const u = t * T / q.ms; if (u >= 1) return 0;
      const f = u * (q.deg.length - 1), i = Math.floor(f), e = (1 - Math.cos(Math.PI * (f - i))) / 2; return q.deg[i] + (q.deg[i + 1] - q.deg[i]) * e; };
    ctx.pAnim?.cancel();
    // la onda de reposo sigue corriendo debajo: el gesto arranca y termina justo donde va la onda, sin saltos
    const dd = pulpoShape.dDur!, idle = ctx.shapeAnims.find(a => a !== ctx.pAnim && a.effect?.getTiming().duration === dd), t0 = idle ? Number(idle.currentTime) || 0 : 0;
    ctx.pAnim = ctx.el.clip.animate(Array.from({ length:N + 1 }, (_, n) => { const st = pulpoIdleSt(TAU * ((t0 + n / N * T) % dd) / dd);
      st.aL = (st.aL ?? 0) + at(g.L, n / N); st.aR = (st.aR ?? 0) + at(g.R, n / N); return { d:`path("${pulpoD(st)}")` }; }), { duration:T, easing:'linear' });
    ctx.shapeAnims.push(ctx.pAnim);
  }
