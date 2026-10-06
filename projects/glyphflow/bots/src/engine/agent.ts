import { FACES, type GfBotFaceStyle } from '../data/faces';
import { f2 } from '../data/color';
import type { GfBotWorkRoutine } from '../data/routines';
import { S, TAU } from './math';
import { breathe, headTop, holdEyes, isRobot, miniHop, mk, mood, nod, popIn, showFor, squint, tremble } from './actions';
import { type BotContext } from './context';
import { swapEyes } from './eyes';
import { faceOf } from './face';
import { flash, lit, tint } from './light';
import { animatePose, setPose } from './pose-motion';
import { later, loop, play } from './timing';
import { expr } from './kawaii';
import { clearRoutine, nextRoutine, setState } from './state';

/**
 * Conectado a un agente. El dueño avisa en qué paso va (`agent(ctx, 'thinking')`…) y manda cada
 * token de texto con `token(ctx, texto)`; el bot lo vive: piensa, usa una herramienta, carga, y al
 * escribir abre una hoja donde cada token es un golpecito y el cursor avanza.
 */

/**
 * Los pasos que entiende `agent`. `prompt` es que el usuario acaba de mandar un mensaje (el motor no hace nada con él, pero
 * avisa a `onAgentEvent`); `idle` suelta al bot; `done` y `error` cierran con su escena.
 */
export type GfBotAgentEvent = 'prompt' | 'thinking' | 'tool' | 'loading' | 'writing' | 'done' | 'error' | 'idle';

/** Qué rutina de trabajo hace el bot mientras el agente está en cada paso que no es escribir. */
const AGENT_ROUTINE: Partial<Record<GfBotAgentEvent, GfBotWorkRoutine>> = {
  thinking: 'thinking',
  tool: 'analyzing',
  loading: 'loading',
};

export function agent(ctx: BotContext, ev: GfBotAgentEvent): void {
  if (ev === 'prompt') {
    ctx.hooks.agentReact(ev);
    return;
  }
  if (ev === 'idle') {
    ctx.stream = null;
    ctx.fixedRoutine.working = null;
    setState(ctx, 'idle');
    ctx.hooks.agentReact(ev);
    return;
  }
  const routine = AGENT_ROUTINE[ev];
  if (routine) {
    ctx.stream = null;
    ctx.fixedRoutine.working = routine;
    if (ctx.state !== 'working') setState(ctx, 'working');
    else nextRoutine(ctx);
    ctx.hooks.agentReact(ev);
    return;
  }
  if (ev === 'writing') {
    if (ctx.state !== 'working') setState(ctx, 'working');
    clearRoutine(ctx);
    ctx.fixedRoutine.working = null;
    breathe(ctx, [{ transform: S(1) }, { transform: S(1.012, 0.988) }], 900);
    setPose(ctx, { yaw: 0.34, pitch: 0.06 });
    squint(ctx, 0.8);
    openStream(ctx);
    ctx.opts.onRoutine?.('working', 'typing · live');
    ctx.hooks.agentReact(ev);
    return;
  }
  if (ev === 'done') return finish(ctx);
  if (ev === 'error') return oops(ctx);
}

function openStream(ctx: BotContext): void {
  const x0 = 164;
  const y0 = 30;
  const doc = mk(ctx, 'g', { class: 'plan' });
  doc.innerHTML = `<rect class="plan-card" x="${x0}" y="${y0}" width="46" height="54" rx="7"/><rect class="doc-title" x="${x0 + 7}" y="${y0 + 8}" width="20" height="4" rx="2"/><g class="lines"></g><rect class="caret" x="${x0 + 7}" y="${y0 + 18}" width="1.6" height="7" rx=".8"/>`;
  popIn(ctx, doc, x0 + 23, y0 + 54);
  const caret = doc.querySelector<SVGElement>('.caret');
  const box = doc.querySelector<SVGElement>('.lines');
  if (!caret || !box) return;
  loop(ctx, caret, [{ opacity: 1 }, { opacity: 0 }], { duration: 520, easing: 'steps(1, end)' });
  ctx.stream = { doc, x0, y0, caret, lines: [], x: 0, box };
  newLine(ctx);
}

function newLine(ctx: BotContext): void {
  const s = ctx.stream;
  if (!s) return;
  if (s.lines.length === 3) {
    // la hoja «hace scroll»: el renglón de arriba se va y los demás suben
    s.lines.shift()?.remove();
    s.lines.forEach((ln, i) => {
      ln.setAttribute('y', String(s.y0 + 20 + i * 9));
      ln.animate([{ transform: 'translateY(9px)' }, { transform: 'translateY(0)' }], { duration: 160, easing: 'ease-out' });
    });
  }
  s.lines.push(mk(ctx, 'rect', { class: 'doc-line', x: s.x0 + 7, y: s.y0 + 20 + s.lines.length * 9, width: 0.1, height: 3, rx: 1.5 }, s.box));
  s.x = 0;
  placeCaret(ctx);
  // retorno de carro
  ctx.fe.eyes.animate([{ transform: getComputedStyle(ctx.fe.eyes).transform }, { transform: 'translateX(-3px)' }], { duration: 150, easing: 'ease-in', fill: 'forwards' });
}

function placeCaret(ctx: BotContext): void {
  const s = ctx.stream;
  if (!s) return;
  s.caret.setAttribute('x', String(s.x0 + 7 + s.x));
  s.caret.setAttribute('y', String(s.y0 + 18 + (s.lines.length - 1) * 9));
}

/** Un token del agente: el renglón crece, el cursor avanza y el bot da un golpecito. */
export function token(ctx: BotContext, text = ''): void {
  const s = ctx.stream;
  if (!s || !s.doc.isConnected) return;
  const w = Math.min(6, 1.2 + String(text).length * 0.55);
  if (s.x + w > 32) newLine(ctx);
  s.x += w;
  s.lines[s.lines.length - 1]?.setAttribute('width', String(s.x));
  placeCaret(ctx);
  if (ctx.reduce) return;
  ctx.el.breath.animate([{ transform: S(1) }, { transform: S(1.022, 0.974) }, { transform: S(1) }], { duration: 130 }); // cada token, un golpecito
  ctx.fe.eyes.animate([{ transform: getComputedStyle(ctx.fe.eyes).transform }, { transform: `translateX(${f2(-3 + (7 * s.x) / 32)}px)` }], { duration: 110, fill: 'forwards' });
  tint(ctx, { rb: '#86E9FF' });
  lit(ctx, 'rb', [{ opacity: 0.52 }, { opacity: 0.3 }], 150);
}

/** Terminó: palomita en la hoja, destello verde, brinquito y a reposo. */
function finish(ctx: BotContext): void {
  const s = ctx.stream;
  ctx.stream = null;
  ctx.fixedRoutine.working = null;
  if (ctx.state === 'sleeping') setState(ctx, 'idle');
  ctx.subTimers.forEach(clearTimeout);
  ctx.subTimers = [];
  ctx.subAnims.forEach((a) => {
    if ((a.effect as KeyframeEffect | null)?.target !== ctx.el.breath) a.cancel();
  });
  ctx.fe.eyes.getAnimations().forEach((a) => a.cancel());
  if (s?.doc.isConnected) {
    s.caret.style.visibility = 'hidden';
    const m = mk(ctx, 'path', { d: `M${s.x0 + 32} ${s.y0 + 10} L${s.x0 + 35} ${s.y0 + 13} L${s.x0 + 40.5} ${s.y0 + 6.5}`, class: 'plan-mark', 'stroke-dasharray': 14, 'stroke-dashoffset': 14 }, s.doc);
    m.animate([{ strokeDashoffset: 14 }, { strokeDashoffset: 0 }], { duration: 300, fill: 'forwards' });
    s.doc.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 350, delay: 800, fill: 'forwards' });
  }
  ctx.opts.onRoutine?.(ctx.state, 'done');
  setPose(ctx, { yaw: 0, pitch: 0 });
  // Un gesto de `onAgentEvent` (un flip, por ejemplo) ya hace el festejo: sin su propio brinco ni cara feliz encima.
  ctx.closing = true;
  const g = ctx.hooks.agentReact('done');
  if (!g) nod(ctx, 0.18);
  later(ctx, () => {
    flash(ctx, 0.28, 800, '#9CFFB8');
    if (!g) {
      miniHop(ctx, 24);
      swapEyes(ctx, 'happy', 900);
    }
  }, 250);
  // Va en `toyTimers` y no en los de la rutina: un gesto encadenado (`act()`) borra estos, y entonces nunca volvería a reposo.
  later(
    ctx,
    () => {
      setState(ctx, 'idle');
      ctx.opts.onStateChange?.('idle');
    },
    Math.max(1500, g + 200),
    ctx.toyTimers,
  );
}

/** Falló: «!», ceño, ojos apretados, niega, se sacude y se pone rojo un instante. */
function oops(ctx: BotContext): void {
  ctx.stream = null;
  ctx.fixedRoutine.working = null;
  if (ctx.state === 'sleeping') setState(ctx, 'idle');
  clearRoutine(ctx);
  setPose(ctx, { yaw: 0, pitch: 0, roll: 0 });
  ctx.opts.onRoutine?.(ctx.state, 'error');
  // Con un gesto de `onAgentEvent` (jellyDrop, scaredRecoil…) el cuerpo ya reacciona: se queda el «!» y el rojo, sin temblor ni ojos en X.
  ctx.closing = true;
  const g = ctx.hooks.agentReact('error');
  const top = headTop(ctx);
  const t = mk(ctx, 'text', { x: 100, y: top - 8, class: 'qmark qmark-err', 'text-anchor': 'middle', 'font-size': 28 });
  t.textContent = '!';
  t.style.transformOrigin = `100px ${top - 16}px`;
  t.animate([{ transform: S(0), opacity: 0 }, { transform: S(1.3), opacity: 1, offset: 0.2 }, { transform: S(1), opacity: 1, offset: 0.75 }, { transform: S(1), opacity: 0 }], { duration: 1300, fill: 'forwards' });
  showFor(ctx, ctx.fe.browA, 1500);
  if (!g) {
    swapEyes(ctx, (FACES[faceOf(ctx, ctx.shape)] as GfBotFaceStyle).cross || isRobot(ctx) ? 'cross' : 'squeeze', 900);
    expr(ctx, 'error', 1300); // ojos en X (las formas con cara de pantalla ya los hacen con su propio ojo)
    later(ctx, () => holdEyes(ctx, S(1, 0.7), 800), 650);
    tremble(ctx, 460, 2.4, 34);
  }
  mood(ctx, '#FF3B3B', [{ opacity: 0 }, { opacity: 0.36, offset: 0.15 }, { opacity: 0.12, offset: 0.5 }, { opacity: 0 }], 1100);
  if (!g) {
    animatePose(ctx, (u) => ({ yaw: 0.38 * Math.sin(TAU * 2 * u) * (1 - u) }), 1000);
    later(ctx, () => play(ctx, ctx.el.breath, [{}, { transform: S(1.04, 0.94), offset: 0.4 }, { transform: S(1) }], { duration: 700 }), 1100); // suspiro de frustración
  }
  // Va en `toyTimers` y no en los de la rutina: un gesto encadenado (`act()`) borra estos, y entonces nunca volvería a reposo.
  later(
    ctx,
    () => {
      setState(ctx, 'idle');
      ctx.opts.onStateChange?.('idle');
    },
    Math.max(1900, g + 200),
    ctx.toyTimers,
  );
}
