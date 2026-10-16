import { mochiShape } from '../shapes/mochi';
import { AGENT_WORK } from './agent-routines';
import { agent } from './agent';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { installKawaiiHooks } from './kawaii';
import { setShape } from './setters';
import { act, installStateHooks, setState } from './state';

vi.setConfig({ testTimeout: 30_000 });
const proto = Element.prototype as unknown as Record<string, unknown>;

function bot(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, ...opts });
  installStateHooks(ctx);
  installKawaiiHooks(ctx);
  setShape(ctx, ctx.shape);
  setState(ctx, 'idle');
  ctx.ready = true;
  return ctx;
}

describe('glyphflow/bots · el agente avisa a quien reacciona con gestos', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    proto['animate'] = function (this: Element, frames: Keyframe[]) {
      return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames } };
    };
    proto['getAnimations'] = () => [];
  });
  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    document.body.innerHTML = '';
  });

  it('cada paso llega al gancho, y prompt no cambia nada del bot', () => {
    const ctx = bot();
    const visto: string[] = [];
    ctx.hooks.agentReact = (ev) => {
      visto.push(ev);
      return 0;
    };
    agent(ctx, 'prompt');
    expect(ctx.state).toBe('idle');
    for (const ev of ['thinking', 'tool', 'loading', 'writing', 'idle'] as const) agent(ctx, ev);
    expect(visto).toEqual(['prompt', 'thinking', 'tool', 'loading', 'writing', 'idle']);
  });

  it('cada paso entra con SU variante: sin gesto la rutina arranca ya y cada paso nuevo avanza una', () => {
    const labels: string[] = [];
    const ctx = bot({ onRoutine: (_s, l) => l && labels.push(l) });
    agent(ctx, 'thinking');
    expect(labels).toEqual([`thinking · ${AGENT_WORK.thinking[0][0]}`]);
    agent(ctx, 'tool');
    agent(ctx, 'thinking');
    expect(labels.at(-1)).toBe(`thinking · ${AGENT_WORK.thinking[1][0]}`);
  });

  it('con un gesto en el gancho el gesto va primero y la rutina entra al terminar, con la variante que tocaba (no la siguiente)', () => {
    const labels: string[] = [];
    const ctx = bot({ onRoutine: (_s, l) => l && labels.push(l) });
    ctx.hooks.agentReact = (ev) => {
      if (ev === 'prompt') return 0;
      act(ctx, 700); // lo que hace un gesto de verdad: pausa la rutina y la reanuda solo
      return 700;
    };
    agent(ctx, 'thinking');
    expect(labels).toEqual([]);
    vi.advanceTimersByTime(849);
    expect(labels).toEqual([]);
    vi.advanceTimersByTime(1);
    expect(labels).toEqual([`thinking · ${AGENT_WORK.thinking[0][0]}`]);
  });

  it('un gesto en marcha que no devuelve su duración tampoco deja entrar la rutina encima', () => {
    const labels: string[] = [];
    const ctx = bot({ onRoutine: (_s, l) => l && labels.push(l) });
    ctx.hooks.agentReact = () => {
      ctx.run = { id: 'g', timers: [], intensity: 1, arming: false, over: false, settle: () => undefined };
      return 0;
    };
    agent(ctx, 'tool');
    expect(labels).toEqual([]);
    ctx.run = null;
  });

  it('sin gancho (o sin gesto) todo es como siempre: done vuelve a reposo a los 1.5 s y error a los 1.9 s', () => {
    const ctx = bot();
    const cambios = vi.fn();
    ctx.opts.onStateChange = cambios;
    agent(ctx, 'thinking');
    agent(ctx, 'done');
    vi.advanceTimersByTime(1400);
    expect(cambios).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(cambios).toHaveBeenCalledWith('idle');

    const c2 = bot();
    const cam2 = vi.fn();
    c2.opts.onStateChange = cam2;
    agent(c2, 'thinking');
    agent(c2, 'error');
    vi.advanceTimersByTime(1800);
    expect(cam2).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(cam2).toHaveBeenCalledWith('idle');
  });

  it('si un gesto del gancho dura más que la escena, el bot no vuelve a reposo hasta que termine', () => {
    const ctx = bot();
    const cambios = vi.fn();
    ctx.opts.onStateChange = cambios;
    ctx.hooks.agentReact = (ev) => (ev === 'done' ? 2000 : 0);
    agent(ctx, 'thinking');
    agent(ctx, 'done');
    vi.advanceTimersByTime(2100);
    expect(cambios).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(cambios).toHaveBeenCalledWith('idle');
  });

  it('con un gesto en marcha, done no mete su propio brinco (anima .hop menos veces)', () => {
    const brincos = (g: number): number => {
      const c = bot();
      let n = 0;
      const orig = c.el.hop.animate.bind(c.el.hop);
      c.el.hop.animate = ((...a: Parameters<typeof orig>) => {
        n++;
        return orig(...a);
      }) as typeof c.el.hop.animate;
      c.hooks.agentReact = () => g;
      agent(c, 'thinking');
      agent(c, 'done');
      vi.advanceTimersByTime(1000);
      return n;
    };
    expect(brincos(0)).toBeGreaterThan(brincos(900));
  });

  it('un gesto que PAUSA la rutina (act) no impide volver a reposo ni la reanuda durante el cierre', () => {
    const ctx = bot();
    const cambios = vi.fn();
    ctx.opts.onStateChange = cambios;
    const rutinas = vi.fn();
    ctx.opts.onRoutine = rutinas;
    ctx.hooks.agentReact = (ev) => {
      if (ev !== 'done') return 0;
      ctx.hooks.act(900); // lo que hace cualquier gesto al arrancar
      return 900;
    };
    agent(ctx, 'thinking');
    agent(ctx, 'done');
    const antes = rutinas.mock.calls.length;
    vi.advanceTimersByTime(900); // termina el gesto
    ctx.hooks.act(240); // y lo que hace un cambio de cara al aterrizar
    vi.advanceTimersByTime(5000);
    expect(cambios).toHaveBeenCalledTimes(1);
    expect(cambios).toHaveBeenCalledWith('idle');
    expect(ctx.state).toBe('idle');
    // ninguna rutina de trabajo nueva arrancó mientras se cerraba la escena
    expect(rutinas.mock.calls.slice(antes).filter((c) => c[0] === 'working' && c[1] !== 'done').length).toBe(0);
  });

  it('un juguete que se limpia durante el cierre no borra el regreso a reposo', () => {
    const ctx = bot();
    const cambios = vi.fn();
    ctx.opts.onStateChange = cambios;
    agent(ctx, 'thinking');
    agent(ctx, 'done');
    ctx.toyTimers.forEach(clearTimeout); // lo que hace `toyClear`; antes compartía bolsa de timers con el regreso a reposo y lo mataba
    vi.advanceTimersByTime(5000);
    expect(cambios).toHaveBeenCalledWith('idle');
    expect(ctx.state).toBe('idle');
  });
});
