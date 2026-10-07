
import { setPose } from './pose-motion';
import { baseFor } from './base-pose';
import { ROUTINES } from '../data/routines';
import { RUN, fidget } from './routines';
import { AGENT_WORK, type GfBotAgentRoutine } from './agent-routines';
import { later, play } from './timing';
import { clearLook, eyeSeq, setOpen, swapEyes } from './eyes';
import { baseMouth, defaultMouth } from './mouth';
import { S } from './math';
import { breathe, miniHop, squint } from './actions';
import { alinearMirada } from './follow';
import type { GfBotState } from '../bot-state';
import type { GfBotSleepRoutine, GfBotWorkRoutine } from '../data/routines';
import { type BotContext } from './context';
import { clearGestureFx } from './gesture-fx';
import { interruptRun } from './lifecycle';



  /**
   * Corta lo que un gesto, una emoción o una rutina dejó animando en la CARA: los ojos felices, los
   * entrecerrados y los apretados, las cejas, las lágrimas, el sudor, los cachetes, los ojos ocultos por
   * un cambio de forma y los vahos (`faceFx`). Cada pieza se muestra con una animación de `opacity`; si
   * no se corta, la del gesto anterior sigue corriendo debajo del siguiente y las dos caras se
   * MEZCLAN (cejas de enojo con ojos de felicidad, el sudor de un malestar en plena fiesta…).
   */
  export function clearFace(ctx: BotContext) {
    // Sin Web Animations (jsdom, navegadores muy viejos) no hay animaciones que cortar: no es motivo para tronar.
    const cortar = (n: Element | null | undefined, soloOpacity = false) => n?.getAnimations?.().forEach(a => {
      if (!soloOpacity || (a.effect as KeyframeEffect | null)?.getKeyframes().some(k => 'opacity' in k)) a.cancel();
    });
    ctx.fe.faceFx?.replaceChildren();
    [ctx.fe.eyes, ...(ctx.fe.cheeks || [])].forEach(n => cortar(n));
    [...ctx.fe.happy, ...ctx.fe.closed, ...ctx.fe.squeeze, ...ctx.fe.browA, ...ctx.fe.browS, ...ctx.fe.tears, ctx.fe.sweat].forEach(n => cortar(n));
    ctx.fe.eyeList.forEach(n => cortar(n, true));   // ojos ocultos por un cambio de forma (no los parpadeos: esos animan transform)
  }

  export function clearRoutine(ctx: BotContext) {
    ctx.subAnims.forEach(a => a.cancel()); ctx.subAnims = [];
    ctx.subTimers.forEach(clearTimeout); ctx.subTimers = [];
    clearInterval(ctx.zTimer ?? undefined); ctx.zTimer = null; ctx.el.z.replaceChildren(); ctx.el.world.replaceChildren();
    clearFace(ctx); clearGestureFx(ctx);
    [ctx.el.dots, ctx.el.thought, ctx.el.spinner, ctx.fe.bubble].forEach(n => n.setAttribute('opacity', '0'));
    (['sheen', 'rl', 'rr', 'rt', 'rb'] as const).forEach(k => ctx.el.L[k].getAnimations().forEach(a => a.cancel()));
  }


  export function setRoutine(ctx: BotContext, name: 'auto' | GfBotWorkRoutine | GfBotSleepRoutine, forState: 'working' | 'sleeping' = 'working') {   // 'auto' = rotar; otro nombre = quedarse en esa rutina
    ctx.fixedRoutine[forState] = (name === 'auto' ? null : name) as never;
    if (ctx.state !== forState) { setState(ctx, forState); ctx.opts.onStateChange?.(forState); } else nextRoutine(ctx);
  }

  /** El respaldo del motor para `working` y `sleeping` cuando no se pidieron las rutinas: una respiración, según el estado. */
  function sinRutinas(ctx: BotContext, st: 'working' | 'sleeping') {
    if (st === 'working') { breathe(ctx, [{ transform:S(1) }, { transform:S(1.012,.988) }], 900); squint(ctx, .8); }
    else breathe(ctx, [{ transform:S(1) }, { transform:S(1.03,.97) }], 2600);
  }

  export function nextRoutine(ctx: BotContext) {
    // un gesto pausó la rutina mientras el agente cierra su escena: ya no hay rutina a la que volver
    if (ctx.closing) return;
    clearRoutine(ctx); setPose(ctx, baseFor(ctx, ctx.state));
    // nextRoutine solo corre trabajando o dormido: en reposo no hay rutina que turnar
    const st = ctx.state as 'working' | 'sleeping';
    const list: readonly (GfBotWorkRoutine | GfBotSleepRoutine)[] = ROUTINES[st];
    const name = ctx.fixedRoutine[st] || list[ctx.routineIdx++ % list.length];
    // Las tres de las escenas del modo IA van en el motor (con sus variantes); el resto, en `extras.routines`. Sin ellas no hay rutinas
    // que turnar: solo respira (y trabajando, entrecierra los ojos), sin `onRoutine` ni rotación.
    const vs = st === 'working' ? AGENT_WORK[name as GfBotAgentRoutine] : undefined;
    let label: string;
    if (vs) {   // la siguiente variación de esa rutina
      const i = ctx.variantIdx[name] = ((ctx.variantIdx[name] ?? -1) + 1) % vs.length;
      vs[i][1](ctx); label = `${name} · ${vs[i][0]}`;
    } else if (ctx.routines) label = ctx.routines.play(ctx, st, name);
    else { sinRutinas(ctx, st); return; }
    ctx.opts.onRoutine?.(ctx.state, label);
    later(ctx, () => nextRoutine(ctx), name === 'bubble' ? 4000 : 4700);
  }


  export function setState(ctx: BotContext, s: GfBotState, quiet = false) {   // quiet: reanudar sin gestos de transición (al volver a verse en pantalla)
    const prev = ctx.state; ctx.state = s; ctx.closing = false; ctx.routineIdx = 0; clearTimeout(ctx.sleepTimer ?? undefined); clearTimeout(ctx.closeT ?? undefined); ctx.closeT = null; interruptRun(ctx);
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
  export function act(ctx: BotContext, ms: number, keepKawaii = false) {
    // Un gesto nuevo parte de una cara limpia. En reposo no se llama a `clearRoutine` (hay rutinas que
    // dejar vivas), así que sin esto la cara del gesto anterior seguía corriendo debajo de la nueva.
    interruptRun(ctx); // lo que toma el cuerpo corta el gesto en curso; el gesto que se está armando no se corta a sí mismo
    alinearMirada(ctx, ms); // los gestos son de frente: se endereza la cabeza y luego vuelve a seguir el cursor
    wake(ctx); clearLook(ctx); clearFace(ctx); clearGestureFx(ctx);
    if (!keepKawaii) ctx.hooks.kawaiiRelease();
    if (ctx.state !== 'idle') { clearRoutine(ctx); setPose(ctx, baseFor(ctx, ctx.state)); later(ctx, () => nextRoutine(ctx), ms + 300, ctx.subTimers); }
    else { ctx.subTimers.forEach(clearTimeout); ctx.subTimers = []; if (ctx.opts.wander) later(ctx, () => fidget(ctx), ms + 4000, ctx.subTimers); }
  }

  /** Conecta la máquina de estados a un bot: los gestos avisan con `ctx.hooks.act(ms)` y esto despierta al bot y pausa su rutina. */
  export function installStateHooks(ctx: BotContext): void {
    ctx.hooks.act = (ms, keepKawaii) => act(ctx, ms, keepKawaii);
  }
