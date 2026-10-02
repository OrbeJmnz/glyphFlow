import { mochiShape } from '../shapes/mochi';
import { cuboShape } from '../shapes/retired';
import { robotShape } from '../shapes/robot';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { celebrate, cheer, curious, excited, hatPulse, happy, neutral, surprised, thinking, wave } from './emotions';
import { setHat, setShape } from './setters';
import { installStateHooks, setState } from './state';

const proto = Element.prototype as unknown as Record<string, unknown>;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;
interface Call {
  node: Element;
  frames: Keyframe[];
  options: KeyframeAnimationOptions;
}
function stubAnimations(): Call[] {
  const calls: Call[] = [];
  proto['animate'] = function (this: Element, frames: Keyframe[], options: KeyframeAnimationOptions) {
    calls.push({ node: this, frames, options });
    return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames } };
  };
  proto['getAnimations'] = () => [];
  return calls;
}

function bot(opts: Partial<GfBotOptions> = {}): { ctx: BotContext; acts: number[] } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, ...opts });
  installStateHooks(ctx);
  const acts: number[] = [];
  const act = ctx.hooks.act;
  ctx.hooks.act = (ms) => {
    acts.push(ms);
    act(ms);
  };
  setShape(ctx, ctx.shape);
  setState(ctx, 'idle');
  ctx.ready = true;
  return { ctx, acts };
}

const mouthOn = (ctx: BotContext) => ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m'];

describe('glyphflow/bots · emociones', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    svgProto['getScreenCTM'] = () => null;
    svgProto['getTotalLength'] = () => 300;
    svgProto['getPointAtLength'] = (l: number) => ({ x: 100 + 60 * Math.cos((2 * Math.PI * l) / 300), y: 110 + 58 * Math.sin((2 * Math.PI * l) / 300) });
    stubAnimations();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    for (const k of ['getScreenCTM', 'getTotalLength', 'getPointAtLength']) Reflect.deleteProperty(svgProto, k);
    document.body.innerHTML = '';
  });

  const DURACION: [string, (c: BotContext) => void, number][] = [
    ['neutral', neutral, 900], ['happy', happy, 1300], ['excited', excited, 1500], ['curious', curious, 1700],
    ['thinking', thinking, 2000], ['surprised', surprised, 1300], ['celebrate', celebrate, 1900], ['cheer', cheer, 1300],
    ['wave', wave, 1500],
  ];
  for (const [nombre, fn, ms] of DURACION) {
    it(`${nombre}: avisa por ${ms} ms y corre entera sin tronar`, () => {
      const { ctx, acts } = bot();
      fn(ctx);
      expect(acts).toEqual([ms]);
      vi.advanceTimersByTime(ms * 2);
    });
    it(`${nombre}: también corre en el robot (antena, ojos de anillo)`, () => {
      const { ctx } = bot({ shape: robotShape(cuboShape) });
      expect(() => fn(ctx)).not.toThrow();
      vi.advanceTimersByTime(ms * 2);
    });
  }

  it('happy cierra los ojos en ^ ^, sonríe ancho y vuelve a la boca de reposo', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    happy(ctx);
    expect(mouthOn(ctx)).toBe('wide');
    expect(calls.some((c) => c.node === ctx.fe.happy[0])).toBe(true);
    expect(ctx.svg.style.getPropertyValue('--mood')).toBe('#FFC94D');
    vi.advanceTimersByTime(1200);
    expect(mouthOn(ctx)).toBe('pill');
  });

  it('excited da tres saltos cada vez más cortos', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    excited(ctx);
    const saltos = () => calls.filter((c) => c.node === ctx.el.hop).length;
    expect(saltos()).toBe(1);
    vi.advanceTimersByTime(420);
    expect(saltos()).toBe(2);
    vi.advanceTimersByTime(400);
    expect(saltos()).toBe(3);
  });

  it('curious abre un ojo más que el otro (el robot, medio ojo)', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    curious(ctx);
    expect(mouthOn(ctx)).toBe('o');
    expect(calls.filter((c) => ctx.fe.eyeList.includes(c.node as SVGElement)).map((c) => c.frames[1]['transform'])).toEqual(['scale(1.12,1.14)', 'scale(1,0.78)']);
    const r = bot({ shape: robotShape(cuboShape) });
    const llamadas = stubAnimations();
    curious(r.ctx);
    expect(llamadas.some((c) => c.node === r.ctx.fe.half[1])).toBe(true);
  });

  it('thinking mira arriba a un lado, entrecierra y hace guiños de antena', () => {
    const { ctx } = bot();
    thinking(ctx);
    expect(mouthOn(ctx)).toBe('flat');
    expect(ctx.svg.style.getPropertyValue('--mood')).toBe('#9D8CFF');
  });

  it('surprised patea el sombrero y abre la boca en «o»', () => {
    const { ctx } = bot();
    setHat(ctx, 'copa');
    const antes = ctx.hatPhys.voy;
    surprised(ctx);
    expect(ctx.hatPhys.voy).toBeLessThan(antes);
    expect(mouthOn(ctx)).toBe('o');
  });

  it('celebrate lanza diez chispas, brilla el sombrero y se pone radiante', () => {
    const { ctx } = bot();
    setHat(ctx, 'copa');
    celebrate(ctx);
    vi.advanceTimersByTime(260 + 9 * 20);
    expect(ctx.el.z.querySelectorAll('path').length).toBe(10);
    expect(mouthOn(ctx)).toBe('open');
  });

  it('hatPulse solo brilla con sombrero y sin movimiento reducido', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    hatPulse(ctx);
    expect(calls).toHaveLength(0);
    setHat(ctx, 'copa');
    calls.length = 0;
    hatPulse(ctx);
    expect(calls.every((c) => c.frames[0]['filter'] === 'brightness(1) saturate(1)')).toBe(true);
  });

  it('cheer rebota dos veces', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    cheer(ctx);
    vi.advanceTimersByTime(900);
    expect(calls.filter((c) => c.node === ctx.el.hop && c.options.duration === 520).length).toBe(2);
  });
});
