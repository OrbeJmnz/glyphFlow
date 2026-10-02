import { mochiShape } from '../shapes/mochi';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { agent, token } from './agent';
import { installKawaiiHooks } from './kawaii';
import { setShape } from './setters';
import { installStateHooks, setState } from './state';

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

const sheet = (ctx: BotContext): Element | null => ctx.svg.querySelector('.plan');
const lines = (ctx: BotContext): Element[] => [...ctx.svg.querySelectorAll('.doc-line')];

describe('glyphflow/bots · agente', () => {
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

  it('pensar, usar una herramienta y cargar ponen al bot a trabajar con su rutina fija', () => {
    const ctx = bot();
    agent(ctx, 'thinking');
    expect(ctx.state).toBe('working');
    expect(ctx.fixedRoutine.working).toBe('thinking');
    agent(ctx, 'tool');
    expect(ctx.fixedRoutine.working).toBe('analyzing');
    agent(ctx, 'loading');
    expect(ctx.fixedRoutine.working).toBe('loading');
  });

  it('idle suelta la rutina fija y lo deja en reposo', () => {
    const ctx = bot();
    agent(ctx, 'thinking');
    agent(ctx, 'idle');
    expect(ctx.state).toBe('idle');
    expect(ctx.fixedRoutine.working).toBeNull();
    expect(ctx.stream).toBeNull();
  });

  it('escribir abre la hoja y avisa al dueño', () => {
    const onRoutine = vi.fn();
    const ctx = bot({ onRoutine });
    agent(ctx, 'writing');
    expect(ctx.state).toBe('working');
    expect(ctx.stream).not.toBeNull();
    expect(sheet(ctx)).not.toBeNull();
    expect(lines(ctx)).toHaveLength(1);
    expect(onRoutine).toHaveBeenLastCalledWith('working', 'typing · live');
  });

  it('cada token alarga el renglón y mueve el cursor', () => {
    const ctx = bot();
    agent(ctx, 'writing');
    const w0 = Number(lines(ctx)[0]?.getAttribute('width'));
    token(ctx, 'hola');
    const w1 = Number(lines(ctx)[0]?.getAttribute('width'));
    expect(w1).toBeGreaterThan(w0);
    expect(ctx.stream?.caret.getAttribute('x')).toBe(String(ctx.stream!.x0 + 7 + ctx.stream!.x));
  });

  it('un renglón lleno salta al siguiente y la hoja nunca pasa de tres', () => {
    const ctx = bot();
    agent(ctx, 'writing');
    for (let i = 0; i < 40; i++) token(ctx, 'palabra');
    expect(lines(ctx)).toHaveLength(3);
    // el cursor siempre queda en el último renglón
    expect(ctx.stream?.caret.getAttribute('y')).toBe(String(ctx.stream!.y0 + 18 + 2 * 9));
  });

  it('un token sin hoja abierta, o con la hoja desmontada, se ignora', () => {
    const ctx = bot();
    expect(() => token(ctx, 'x')).not.toThrow();
    agent(ctx, 'writing');
    sheet(ctx)?.remove();
    expect(() => token(ctx, 'x')).not.toThrow();
  });

  it('terminar pone la palomita, avisa y vuelve a reposo', () => {
    const onRoutine = vi.fn();
    const onStateChange = vi.fn();
    const ctx = bot({ onRoutine, onStateChange });
    agent(ctx, 'writing');
    token(ctx, 'hola');
    const doc = sheet(ctx);
    agent(ctx, 'done');
    expect(ctx.stream).toBeNull();
    expect(doc?.querySelector('.plan-mark')).not.toBeNull();
    expect((doc?.querySelector('.caret') as SVGElement).style.visibility).toBe('hidden');
    expect(onRoutine).toHaveBeenLastCalledWith('working', 'done');
    vi.advanceTimersByTime(1500);
    expect(ctx.state).toBe('idle');
    expect(onStateChange).toHaveBeenLastCalledWith('idle');
  });

  it('terminar con el bot dormido primero lo despierta', () => {
    const ctx = bot();
    setState(ctx, 'sleeping');
    agent(ctx, 'done');
    expect(ctx.state).toBe('idle');
  });

  it('fallar muestra el «!» y vuelve a reposo', () => {
    const onRoutine = vi.fn();
    const onStateChange = vi.fn();
    const ctx = bot({ onRoutine, onStateChange });
    agent(ctx, 'writing');
    agent(ctx, 'error');
    expect(ctx.stream).toBeNull();
    expect(ctx.svg.querySelector('.qmark-err')?.textContent).toBe('!');
    expect(onRoutine).toHaveBeenLastCalledWith('working', 'error');
    vi.advanceTimersByTime(1900);
    expect(ctx.state).toBe('idle');
    expect(onStateChange).toHaveBeenLastCalledWith('idle');
  });
});
