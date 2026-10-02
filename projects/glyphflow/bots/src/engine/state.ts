
import { setPose } from './pose-motion';
import { baseFor } from './base-pose';
import { ROUTINES } from '../data/routines';
import { WORK } from './work-variants';
import { RUN, fidget } from './routines';
import { later, play } from './timing';
import { clearLook, eyeSeq, setOpen, swapEyes } from './eyes';
import { baseMouth, defaultMouth } from './mouth';
import { S } from './math';
import { miniHop } from './actions';
import type { GfBotState } from '../bot-state';
import type { GfBotSleepRoutine, GfBotWorkRoutine } from '../data/routines';
import { type BotContext } from './context';



  export function clearRoutine(ctx: BotContext) {
    ctx.subAnims.forEach(a => a.cancel()); ctx.subAnims = [];
    ctx.subTimers.forEach(clearTimeout); ctx.subTimers = [];
    clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null; ctx.el.z.replaceChildren(); ctx.el.world.replaceChildren(); ctx.fe.faceFx?.replaceChildren();
    [ctx.fe.eyes, ...(ctx.fe.cheeks || [])].forEach(n => n?.getAnimations().forEach(a => a.cancel()));
    [ctx.el.dots, ctx.el.thought, ctx.el.spinner, ctx.fe.bubble].forEach(n => n.setAttribute('opacity', '0'));
    (['sheen', 'rl', 'rr', 'rt', 'rb'] as const).forEach(k => ctx.el.L[k].getAnimations().forEach(a => a.cancel()));
    // piezas de la cara que una rutina dejó animando (ojos felices, cejas, lágrimas…): se cortan al cambiar
    [...ctx.fe.happy, ...ctx.fe.closed, ...ctx.fe.squeeze, ...ctx.fe.browA, ...ctx.fe.browS, ...ctx.fe.tears, ctx.fe.sweat].forEach(n => n.getAnimations().forEach(a => a.cancel()));
    ctx.fe.eyeList.forEach(n => n.getAnimations().forEach(a => { if ((a.effect as KeyframeEffect | null)?.getKeyframes().some(k => 'opacity' in k)) a.cancel(); }));   // ojos ocultos por un cambio de forma
  }

  export const ROUTINE_LABEL: Partial<Record<GfBotSleepRoutine, string>> = { counting:'counting sheep', sleepwalking:'sleepwalking', nearFall:'almost falling', night:'starry night' };

  export function setRoutine(ctx: BotContext, name: 'auto' | GfBotWorkRoutine | GfBotSleepRoutine, forState: 'working' | 'sleeping' = 'working') {   // 'auto' = rotar; otro nombre = quedarse en esa rutina
    ctx.fixedRoutine[forState] = (name === 'auto' ? null : name) as never;
    if (ctx.state !== forState) { setState(ctx, forState); ctx.opts.onStateChange?.(forState); } else nextRoutine(ctx);
  }

  export function nextRoutine(ctx: BotContext) {
    clearRoutine(ctx); setPose(ctx, baseFor(ctx, ctx.state));
    // nextRoutine solo corre trabajando o dormido: en reposo no hay rutina que turnar
    const st = ctx.state as 'working' | 'sleeping';
    const list: readonly (GfBotWorkRoutine | GfBotSleepRoutine)[] = ROUTINES[st];
    const name = ctx.fixedRoutine[st] || list[ctx.routineIdx++ % list.length];
    let label: string;
    const vs = st === 'working' ? WORK[name as GfBotWorkRoutine] : undefined;
    if (vs) {   // la siguiente variación de esa rutina
      const i = ctx.variantIdx[name] = ((ctx.variantIdx[name] ?? -1) + 1) % vs.length;
      vs[i][1](ctx); label = `${name} · ${vs[i][0]}`;
    } else { RUN[name](ctx); label = ROUTINE_LABEL[name as GfBotSleepRoutine] || name; }
    ctx.opts.onRoutine?.(ctx.state, label);
    later(ctx, () => nextRoutine(ctx), name === 'bubble' ? 4000 : 4700);
  }


  export function setState(ctx: BotContext, s: GfBotState, quiet = false) {   // quiet: reanudar sin gestos de transición (al volver a verse en pantalla)
    const prev = ctx.state; ctx.state = s; ctx.routineIdx = 0; clearTimeout(ctx.sleepTimer ?? undefined);
    clearRoutine(ctx); clearLook(ctx);
    if (ctx.kIdleT) clearTimeout(ctx.kIdleT);
    ctx.kIdleT = setTimeout(() => ctx.hooks.kawaiiIdleTick(), 0);   // reposo → caras kawaii; otro estado → cara normal
    [...ctx.fe.closed, ...ctx.fe.eyeList].forEach(n => n.getAnimations().forEach(a => a.cancel()));
    setPose(ctx, baseFor(ctx, s));
    baseMouth(ctx, defaultMouth(ctx, s));
    // de noche: se baja la luz y el reflejo pierde fuerza
    ctx.el.L.dim.style.opacity = s === 'sleeping' ? '.36' : '0';
    ctx.svg.dataset['mstate'] = s;   // Gel/App: el flujo de color va lento dormido y rápido trabajando (CSS)
    ctx.el.L.gloss.style.opacity = s === 'sleeping' ? '.5' : '1';
    if (quiet) setOpen(ctx, s !== 'sleeping');
    else if (s === 'sleeping') {
      // se va quedando dormido: los ojos pesan, casi abren, y se cierran
      setOpen(ctx, true);
      eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1,.4), offset:.35 }, { transform:S(1,.6), offset:.5 }, { transform:S(1,.25), offset:.7 }, { transform:S(1,.35), offset:.8 }, { transform:S(1,.08) }], 1400);
      ctx.sleepTimer = setTimeout(() => setOpen(ctx, false), 1380);
    } else {
      setOpen(ctx, true);
      if (prev === 'sleeping') eyeSeq(ctx, [{ transform:S(1,.08) }, { transform:S(1.2,1.3), offset:.45 }, { transform:S(1,1), offset:.7 }, { transform:S(1,.08), offset:.8 }, { transform:S(1) }], 700);
      else if (s === 'working') eyeSeq(ctx, [{ transform:S(1) }, { transform:S(1.15,1.2), offset:.4 }, { transform:S(1) }], 400);
    }
    if (ctx.reduce) return;
    // transiciones: cada cambio de estado tiene su gesto
    if (ctx.ready && prev !== s && !quiet) {
      if (prev === 'sleeping' && s === 'idle') ctx.hooks.kawaiiWake();
      if (prev === 'sleeping') play(ctx, ctx.el.breath, [{}, { transform:S(.93,1.12), offset:.35 }, { transform:S(.93,1.12), offset:.55 }, { transform:S(1.05,.95), offset:.8 }, { transform:S(1) }], { duration:1100, easing:'ease-in-out' });   // se estira al despertar
      else if (s === 'sleeping') play(ctx, ctx.el.breath, [{}, { transform:S(.95,1.08), offset:.35 }, { transform:S(1.06,.93), offset:.75 }, { transform:S(1) }], { duration:1300, easing:'ease-in-out' });   // bostezo
      else if (prev === 'working' && s === 'idle') { play(ctx, ctx.el.breath, [{}, { transform:S(1.05,.94), offset:.4 }, { transform:S(1) }], { duration:700 }); swapEyes(ctx, 'happy', 600); }   // "terminé"
      else if (s === 'working') miniHop(ctx, 10);   // manos a la obra
    }
    if (s === 'idle') RUN.idle(ctx); else nextRoutine(ctx);
  }

  export function wake(ctx: BotContext) { if (ctx.state === 'sleeping') { setState(ctx, 'idle'); ctx.opts.onWake?.(); } }

  // Las acciones interrumpen la rutina en curso y la retoman al terminar.
  export function act(ctx: BotContext, ms: number) {
    wake(ctx); clearLook(ctx);
    if (ctx.state !== 'idle') { clearRoutine(ctx); setPose(ctx, baseFor(ctx, ctx.state)); later(ctx, () => nextRoutine(ctx), ms + 300); }
    else { ctx.subTimers.forEach(clearTimeout); ctx.subTimers = []; if (ctx.opts.wander) later(ctx, () => fidget(ctx), ms + 4000); }
  }

  /** Conecta la máquina de estados a un bot: los gestos avisan con `ctx.hooks.act(ms)` y esto despierta al bot y pausa su rutina. */
  export function installStateHooks(ctx: BotContext): void {
    ctx.hooks.act = (ms) => act(ctx, ms);
  }
