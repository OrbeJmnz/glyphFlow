import { fantasmaShape } from '../shapes/fantasma';
import { pulpoShape } from '../shapes/pulpo';
import { buildShape } from './build';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { parm, runPGest } from './pulpo-arms';

const proto = Element.prototype as unknown as Record<string, unknown>;

function built(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: pulpoShape, ...opts });
  buildShape(ctx);
  return ctx;
}

describe('glyphflow/bots · brazos del pulpo', () => {
  beforeEach(() => {
    vi.stubGlobal('CSS', { supports: () => true });
    proto['animate'] = function (this: Element, frames: Keyframe[]) {
      return { cancel: vi.fn(), onfinish: null, effect: { target: this, getTiming: () => ({}), getKeyframes: () => frames }, currentTime: 0 };
    };
    proto['getAnimations'] = () => [];
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    document.body.innerHTML = '';
  });

  it('solo el pulpo tiene brazos: en otra forma parm no hace nada', () => {
    const ctx = built({ shape: fantasmaShape });
    parm(ctx, 'L', [0, 20, 0], 1000);
    expect(ctx.pGest).toBeNull();
  });

  it('sin soporte de `d` animado o con movimiento reducido tampoco', () => {
    vi.stubGlobal('CSS', { supports: () => false });
    const ctx = built();
    parm(ctx, 'L', [0, 20, 0], 1000);
    expect(ctx.pGest).toBeNull();
  });

  it('los dos lados pedidos en el mismo tick se juntan en una sola animación del contorno', async () => {
    const ctx = built();
    parm(ctx, 'L', [0, 20, 0], 1000);
    parm(ctx, 'R', [0, -20, 0], 1300);
    expect(ctx.pGest).toMatchObject({ L: { ms: 1000 }, R: { ms: 1300 } });
    await Promise.resolve(); // queueMicrotask
    expect(ctx.pGest).toBeNull();
    expect(ctx.pAnim).not.toBeNull();
  });

  it('el ángulo se topa en ±52°: más y la punta se enrosca contra la cabeza', () => {
    const ctx = built();
    parm(ctx, 'R', [0, -90, 90], 800);
    expect(ctx.pGest?.R?.deg).toEqual([0, -52, 52]);
  });

  it('runPGest dibuja un cuadro cada ~45 ms (mínimo 13) y termina donde empezó la onda', () => {
    const ctx = built();
    const calls: { frames: Keyframe[]; options: KeyframeAnimationOptions }[] = [];
    (ctx.el.clip as unknown as { animate: unknown }).animate = (frames: Keyframe[], options: KeyframeAnimationOptions) => {
      calls.push({ frames, options });
      return { cancel: vi.fn() };
    };
    ctx.pGest = { L: { deg: [0, 30, 0], ms: 900 } };
    runPGest(ctx);
    expect(calls[0].frames).toHaveLength(Math.round(900 / 45) + 1);
    expect(calls[0].options).toEqual({ duration: 900, easing: 'linear' });
    expect(String(calls[0].frames[0]['d']).startsWith('path("M')).toBe(true);
    expect(ctx.shapeAnims).toContain(ctx.pAnim);
  });

  it('un gesto nuevo cancela el anterior', () => {
    const ctx = built();
    const cancel = vi.fn();
    ctx.pAnim = { cancel } as unknown as Animation;
    ctx.pGest = { R: { deg: [0, -20, 0], ms: 500 } };
    runPGest(ctx);
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it('si la forma cambió antes del microtask, no dibuja nada', () => {
    const ctx = built();
    ctx.pGest = { L: { deg: [0, 20, 0], ms: 500 } };
    ctx.shape = fantasmaShape;
    runPGest(ctx);
    expect(ctx.pAnim).toBeNull();
    expect(ctx.pGest).toBeNull();
  });
});
