import { mochiShape } from '../shapes/mochi';
import { createBotContext, type BotContext, type GfBotCue } from './context';
import * as G from './gestures';
import { setShape } from './setters';
import { setState } from './state';

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

function bot(): { ctx: BotContext; acts: number[]; cues: GfBotCue[] } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape });
  const acts: number[] = [];
  const cues: GfBotCue[] = [];
  ctx.hooks.act = (ms) => acts.push(ms);
  ctx.hooks.cue = (c) => cues.push(c);
  setShape(ctx, ctx.shape);
  setState(ctx, 'idle');
  ctx.ready = true;
  return { ctx, acts, cues };
}

/** Lo que cada gesto le avisa a la máquina de estados que va a durar (ms) a velocidad normal. */
const DURACION: Record<string, number> = {
  hop: 720, doubleHop: 1300, somersault: 1250, cartwheel: 1150, sideHop: 1200, turn: 1150, shakeNo: 1300,
  nodYes: 1200, wink: 800, surprise: 1100, dance: 2400, dizzy: 2100, angry: 2300, sad: 2800, sick: 2800,
  disgust: 2100, fear: 2400, bored: 2800,
};
/** Los que no se alargan con movimiento reducido (el guiño dura lo mismo). */
const SIN_SLOW = new Set(['wink']);

describe('glyphflow/bots · gestos', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // jsdom no mide el SVG: sin CTM la física del sombrero y de la nube no hace nada
    svgProto['getScreenCTM'] = () => null;
    stubAnimations();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    Reflect.deleteProperty(svgProto, 'getScreenCTM');
    document.body.innerHTML = '';
  });

  for (const [name, ms] of Object.entries(DURACION)) {
    it(`${name}: avisa a la máquina de estados por ${ms} ms y anima el cuerpo`, () => {
      const { ctx, acts } = bot();
      const calls = stubAnimations();
      (G as unknown as Record<string, (c: BotContext) => void>)[name](ctx);
      expect(acts).toEqual([ms]);
      expect(calls.length).toBeGreaterThan(0);
      vi.advanceTimersByTime(ms * 2); // los timers que deja programados no truenan
    });

    it(`${name}: con movimiento reducido ${SIN_SLOW.has(name) ? 'dura lo mismo' : 'dura 1.8 veces más'}`, () => {
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const { ctx, acts } = bot();
      stubAnimations();
      (G as unknown as Record<string, (c: BotContext) => void>)[name](ctx);
      expect(acts[0]).toBeCloseTo(SIN_SLOW.has(name) ? ms : ms * 1.8);
    });
  }

  it('cubre los 18 gestos que traía el prototipo', () => {
    expect(Object.keys(DURACION)).toHaveLength(18);
    for (const name of Object.keys(DURACION)) expect(typeof (G as Record<string, unknown>)[name], name).toBe('function');
  });

  it('hop salta 54 unidades, aplasta al caer y mueve la sombra y la luz con la altura', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    G.hop(ctx);
    const body = calls.find((c) => c.node === ctx.el.hop);
    expect(body?.frames[2]['transform']).toContain('translateY(-54px)');
    expect(body?.options.duration).toBe(720);
    const luces = calls.filter((c) => [ctx.el.shadow, ctx.el.L.lift, ctx.el.L.key, ctx.el.L.gloss].includes(c.node as SVGElement));
    expect(luces.map((c) => c.node)).toEqual(expect.arrayContaining([ctx.el.shadow, ctx.el.L.lift, ctx.el.L.key, ctx.el.L.gloss]));
  });

  it('el guiño cierra solo el ojo derecho y el robot lo hace con una línea', () => {
    const { ctx, cues } = bot();
    const calls = stubAnimations();
    G.wink(ctx);
    expect(cues[0]).toMatchObject({ eye: 'happy', which: [1] });
    expect(calls.some((c) => c.node === ctx.fe.happy[1])).toBe(true);
    expect(calls.some((c) => c.node === ctx.fe.happy[0])).toBe(false);
  });

  it('el enojo muestra las cejas, tiñe de rojo y suelta vapor desde las dos mejillas', () => {
    const { ctx } = bot();
    stubAnimations();
    G.angry(ctx);
    expect(ctx.svg.style.getPropertyValue('--mood')).toBe('#FF2E2E');
    vi.advanceTimersByTime(2300 * 0.3);
    expect(ctx.el.z.querySelectorAll('.puff').length).toBeGreaterThan(0);
  });

  it('la tristeza deja caer tres lágrimas con retraso', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    G.sad(ctx);
    const lagrimas = calls.filter((c) => ctx.fe.tears.includes(c.node as SVGElement));
    expect(lagrimas.map((c) => c.options.delay)).toEqual([2800 * 0.3, 2800 * 0.5, 2800 * 0.66]);
  });

  it('el mareo gira la luz principal alrededor del cuerpo', () => {
    const { ctx } = bot();
    const calls = stubAnimations();
    G.dizzy(ctx);
    const luz = calls.find((c) => c.node === ctx.el.L.key);
    expect(luz?.frames).toHaveLength(49);
    expect(luz?.options.easing).toBe('linear');
  });

  it('el baile enciende rosa a la izquierda y cian a la derecha', () => {
    const { ctx } = bot();
    stubAnimations();
    G.dance(ctx);
    expect(ctx.svg.style.getPropertyValue('--rl')).toBe('#FF5FA8');
    expect(ctx.svg.style.getPropertyValue('--rr')).toBe('#47E4FF');
  });
});
