import { mochiShape } from '../shapes/mochi';
import { octopusShape } from '../shapes/octopus';
import type { GfBotOptions } from './context';
import { assembleBot, createBot, type GfBotApi } from './create-bot';

const proto = Element.prototype as unknown as Record<string, unknown>;
/** Cuántas veces se pidió animar algo: se cuenta en el propio stub (un spy sobre el prototipo se re-instala solo y se filtra a otros specs). */
let animated = 0;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;

/** Las observaciones que el bot pide al navegador, capturadas para poder dispararlas a mano. */
const observers: { io?: (e: Partial<IntersectionObserverEntry>[]) => void; ro?: (e: unknown[]) => void; disconnected: string[] } = {
  disconnected: [],
};

function make(opts: Partial<GfBotOptions> = {}, shape = mochiShape) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  return assembleBot(host, { shape, ...opts });
}

const mouthOn = (api: GfBotApi): string | undefined =>
  [...api.svg.querySelectorAll<SVGElement>('[data-m]')].find((m) => m.style.opacity === '1')?.dataset['m'];

describe('glyphflow/bots · createBot', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    observers.disconnected = [];
    observers.io = undefined;
    observers.ro = undefined;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: (e: Partial<IntersectionObserverEntry>[]) => void) {
          observers.io = cb;
        }
        observe = vi.fn();
        disconnect(): void {
          observers.disconnected.push('io');
        }
      },
    );
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: (e: unknown[]) => void) {
          observers.ro = cb;
        }
        observe = vi.fn();
        disconnect(): void {
          observers.disconnected.push('ro');
        }
      },
    );
    svgProto['getScreenCTM'] = () => null;
    animated = 0;
    proto['animate'] = function (this: Element, frames: Keyframe[]) {
      animated++;
      return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames, getTiming: () => ({}) } };
    };
    proto['getAnimations'] = () => [];
      });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    Reflect.deleteProperty(svgProto, 'getScreenCTM');
    document.body.innerHTML = '';
  });

  it('createBot monta el SVG, arranca en reposo y expone gestos, emociones y controles', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const api = createBot(host, { shape: mochiShape });
    expect(host.querySelector('svg')).toBe(api.svg);
    expect(api.state).toBe('idle');
    expect(api.paused).toBe(false);
    for (const k of ['hop', 'doubleHop', 'wink', 'dance', 'neutral', 'happy', 'celebrate', 'wave', 'shy', 'inLove', 'tongue']) {
      expect(typeof (api as unknown as Record<string, unknown>)[k]).toBe('function');
    }
    for (const k of ['setState', 'setRoutine', 'agent', 'token', 'toy', 'expr', 'pop', 'gazeAt', 'enableTouch', 'hover', 'destroy']) {
      expect(typeof (api as unknown as Record<string, unknown>)[k]).toBe('function');
    }
  });

  it('cada gesto que ya existía también mueve la boca', () => {
    const { api } = make();
    api.surprise();
    expect(mouthOn(api)).toBe('o');
    api.angry();
    expect(mouthOn(api)).toBe('frown');
  });

  it('el pulpo dobla un lóbulo al saludar; el resto de formas, no', () => {
    vi.stubGlobal('CSS', { supports: () => true });
    const octo = make({}, octopusShape);
    octo.api.wave();
    expect(octo.ctx.pGest).not.toBeNull();
    expect(octo.ctx.pGest?.R?.ms).toBe(1500);
    const mochi = make();
    mochi.api.wave();
    expect(mochi.ctx.pGest).toBeNull();
  });

  it('los setters cambian el estado del bot', () => {
    const { api, ctx } = make();
    api.setPalette('mint');
    expect(ctx.paletteKey).toBe('mint');
    api.setMaterial('gold');
    expect(ctx.materialKey).toBe('gold');
    api.setState('working');
    expect(api.state).toBe('working');
    api.setRoutine('typing');
    expect(ctx.fixedRoutine.working).toBe('typing');
  });

  describe('pausa', () => {
    it('sin el cursor encima, un bot hoverOnly nace congelado y las acciones se ignoran', () => {
      const { api, ctx } = make({ hoverOnly: true });
      expect(api.paused).toBe(true);
      const before = animated;
      api.hop();
      api.happy();
      api.shy();
      api.expr('shy');
      api.token('x');
      api.pop();
      expect(animated).toBe(before);
      expect(ctx.state).toBe('idle');
    });

    it('un cambio de estado pedido en pausa se guarda y se aplica al volver', () => {
      const { api } = make({ hoverOnly: true });
      api.setState('working');
      expect(api.state).toBe('idle');
      api.hover(true);
      expect(api.paused).toBe(false);
      expect(api.state).toBe('working');
    });

    it('un «terminé» que pasó mientras no se veía solo deja el bot en reposo, sin festejar', () => {
      const onStateChange = vi.fn();
      const { api, ctx } = make({ hoverOnly: true, onStateChange });
      api.hover(true);
      api.agent('writing');
      api.hover(false);
      expect(api.paused).toBe(true);
      api.agent('done');
      api.hover(true);
      expect(ctx.state).toBe('idle');
      expect(ctx.stream).toBeNull();
      expect(onStateChange).toHaveBeenLastCalledWith('idle');
    });

    it('sale de pantalla → se congela; vuelve → se reanuda', () => {
      const { api } = make();
      observers.io?.([{ isIntersecting: false }]);
      expect(api.paused).toBe(true);
      observers.io?.([{ isIntersecting: true }]);
      expect(api.paused).toBe(false);
    });

    it('con la pestaña oculta se congela', () => {
      const { api } = make();
      vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
      document.dispatchEvent(new Event('visibilitychange'));
      expect(api.paused).toBe(true);
      vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
      document.dispatchEvent(new Event('visibilitychange'));
      expect(api.paused).toBe(false);
    });
  });

  it('en tamaño chico (<56 px) pasa a nivel de detalle `sm`', () => {
    const { api } = make();
    observers.ro?.([{ contentRect: { width: 40 } }]);
    expect(api.svg.dataset['lod']).toBe('sm');
    observers.ro?.([{ contentRect: { width: 120 } }]);
    expect(api.svg.dataset['lod']).toBe('');
  });

  it('enableTouch es idempotente: llamarlo dos veces no duplica listeners', () => {
    const { api } = make();
    const add = vi.spyOn(api.svg, 'addEventListener');
    const off = api.enableTouch();
    const n = add.mock.calls.length;
    expect(n).toBeGreaterThan(0);
    expect(api.enableTouch()).toBe(off);
    expect(add.mock.calls.length).toBe(n);
  });

  it('enableTouch se puede apagar y volver a encender', () => {
    const { api } = make();
    const add = vi.spyOn(api.svg, 'addEventListener');
    const off = api.enableTouch();
    const n = add.mock.calls.length;
    off();
    const again = api.enableTouch();
    expect(again).not.toBe(off);
    expect(add.mock.calls.length).toBe(2 * n);
  });

  it('gazeAt mira, salvo que lo estén arrastrando', () => {
    const { api, ctx } = make();
    api.gazeAt(1, 0);
    expect(ctx.pose.yaw).not.toBe(0);
    const { api: b, ctx: c2 } = make();
    c2.dragging = true;
    b.gazeAt(1, 0);
    expect(c2.pose.yaw).toBe(0);
  });

  it('destroy suelta observadores y listeners, y el bot deja de responder', () => {
    const { api, ctx } = make();
    const remove = vi.spyOn(document, 'removeEventListener');
    api.enableTouch();
    const off = vi.spyOn(api.svg, 'removeEventListener');
    api.destroy();
    expect(observers.disconnected.sort()).toEqual(['io', 'ro']);
    expect(remove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(off).toHaveBeenCalled();
    expect(ctx.paused).toBe(true);
    // ya no se reanuda aunque vuelva a verse
    observers.io?.([{ isIntersecting: true }]);
    expect(api.paused).toBe(true);
    api.hop();
    expect(() => api.destroy()).not.toThrow();
  });
});
