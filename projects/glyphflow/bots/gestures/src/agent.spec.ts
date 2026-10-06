import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { agentReactions } from './agent';

/** Un bot y un contexto de mentira: el manejador solo les pide `gesture`, `reduce`, `paused` y un sitio donde agendar timers. */
function mundo(ms = 900) {
  const gesture = vi.fn((id: string): number | boolean => (id === 'noExiste' ? false : ms));
  const ctx = { reduce: false, paused: false, subTimers: [] as ReturnType<typeof setTimeout>[], hooks: { act: vi.fn() } };
  return { bot: { gesture } as never, ctx: ctx as never, gesture, raw: ctx };
}

describe('agentReactions (modo IA)', () => {
  let t = 0;
  beforeEach(() => {
    t = 1; // Date.now() nunca es 0: 0 significaría «no hay tarea en curso»
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());
  const opciones = { now: () => t, random: () => 0.1 };

  it('cada evento dispara su gesto por defecto', () => {
    const { bot, ctx, gesture } = mundo();
    const h = agentReactions({ ...opciones, cooldownMs: 0 });
    h('prompt', bot, ctx);
    h('thinking', bot, ctx);
    h('tool', bot, ctx);
    expect(gesture.mock.calls.map((c) => c[0])).toEqual(['jellyWobble', 'stretchSnap', 'sideDodge']);
  });

  it('writing no hace nada (ya tiene su hoja con el cursor)', () => {
    const { bot, ctx, gesture } = mundo();
    expect(agentReactions(opciones)('writing', bot, ctx)).toBe(0);
    expect(gesture).not.toHaveBeenCalled();
  });

  it('loading solo se «derrite» si la espera se alarga', () => {
    const { bot, ctx, gesture } = mundo();
    const h = agentReactions({ ...opciones, waitMs: 6000 });
    h('loading', bot, ctx);
    vi.advanceTimersByTime(5900);
    expect(gesture).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(gesture).toHaveBeenCalledWith('puddleMorph');
  });

  it('idle se asoma solo tras un rato quieto', () => {
    const { bot, ctx, gesture } = mundo();
    agentReactions({ ...opciones, idleAfterMs: 45_000 })('idle', bot, ctx);
    vi.advanceTimersByTime(44_000);
    expect(gesture).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2000);
    expect(gesture).toHaveBeenCalledWith('peekPop');
  });

  it('done: flip normal en una tarea corta; el especial solo en una larga y a veces', () => {
    const corta = mundo();
    const h1 = agentReactions({ ...opciones, random: () => 0.1 });
    h1('prompt', corta.bot, corta.ctx);
    t = 3000;
    expect(h1('done', corta.bot, corta.ctx)).toBe(900);
    expect(corta.gesture).toHaveBeenLastCalledWith('frontFlip');

    const larga = mundo();
    const h2 = agentReactions({ ...opciones, random: () => 0.1, rareChance: 0.4 });
    t = 1;
    h2('prompt', larga.bot, larga.ctx);
    t = 30_000;
    h2('done', larga.bot, larga.ctx);
    expect(larga.gesture).toHaveBeenLastCalledWith('doubleFlip');

    // tarea larga pero sin suerte: el flip de siempre
    const sinSuerte = mundo();
    const h3 = agentReactions({ ...opciones, random: () => 0.9, rareChance: 0.4 });
    t = 1;
    h3('prompt', sinSuerte.bot, sinSuerte.ctx);
    t = 30_000;
    h3('done', sinSuerte.bot, sinSuerte.ctx);
    expect(sinSuerte.gesture).toHaveBeenLastCalledWith('frontFlip');
  });

  it('done devuelve la duración del gesto (el motor la usa) y 0 si no hubo', () => {
    const { bot, ctx } = mundo(1100);
    expect(agentReactions(opciones)('done', bot, ctx)).toBe(1100);
    const sin = mundo();
    sin.raw.reduce = true;
    expect(agentReactions(opciones)('done', sin.bot, sin.ctx)).toBe(0);
  });

  it('error elige entre jellyDrop y scaredRecoil', () => {
    const a = mundo();
    agentReactions({ ...opciones, random: () => 0.1 })('error', a.bot, a.ctx);
    expect(a.gesture).toHaveBeenLastCalledWith('jellyDrop');
    const b = mundo();
    agentReactions({ ...opciones, random: () => 0.9 })('error', b.bot, b.ctx);
    expect(b.gesture).toHaveBeenLastCalledWith('scaredRecoil');
  });

  it('enfriamiento: el mismo gesto no se repite pegado', () => {
    const { bot, ctx, gesture } = mundo();
    const h = agentReactions({ ...opciones, cooldownMs: 2500 });
    h('thinking', bot, ctx);
    t = 1000;
    h('thinking', bot, ctx);
    expect(gesture).toHaveBeenCalledTimes(1);
    t = 3000;
    h('thinking', bot, ctx);
    expect(gesture).toHaveBeenCalledTimes(2);
  });

  it('no hace nada con movimiento reducido ni en pausa', () => {
    const r = mundo();
    r.raw.reduce = true;
    agentReactions(opciones)('thinking', r.bot, r.ctx);
    const p = mundo();
    p.raw.paused = true;
    agentReactions(opciones)('thinking', p.bot, p.ctx);
    expect(r.gesture).not.toHaveBeenCalled();
    expect(p.gesture).not.toHaveBeenCalled();
  });

  it('el mapa se puede cambiar y apagar por evento; un gesto que no está registrado no corre', () => {
    const { bot, ctx, gesture } = mundo();
    const h = agentReactions({ ...opciones, cooldownMs: 0, map: { thinking: 'ballMorph', tool: false, prompt: 'noExiste' } });
    h('thinking', bot, ctx);
    h('tool', bot, ctx);
    expect(h('prompt', bot, ctx)).toBe(0);
    expect(gesture.mock.calls.map((c) => c[0])).toEqual(['ballMorph', 'noExiste']);
  });
});
