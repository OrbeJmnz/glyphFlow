import { ghostShape } from '../shapes/ghost';
import { mochiShape } from '../shapes/mochi';
import { nCloudShape } from '../shapes/night';
import { buildShape } from './build';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { cloudBind } from './physics';

function built(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, ...opts });
  buildShape(ctx);
  return ctx;
}

/** Un `requestAnimationFrame` que solo anota: la física se prueba cuadro a cuadro, a mano. */
function stubFrames(): { callbacks: FrameRequestCallback[]; cancelled: number[] } {
  const callbacks: FrameRequestCallback[] = [];
  const cancelled: number[] = [];
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => callbacks.push(cb));
  vi.stubGlobal('cancelAnimationFrame', (id: number) => cancelled.push(id));
  return { callbacks, cancelled };
}

const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;

describe('glyphflow/bots · física de la nube', () => {
  beforeEach(() => {
    // jsdom no mide el SVG: sin CTM el cuadro no hace nada, y un círculo fijo basta para colocar el halo
    svgProto['getScreenCTM'] = () => null;
    svgProto['getTotalLength'] = () => 300;
    svgProto['getPointAtLength'] = (l: number) => ({ x: 100 + 60 * Math.cos((2 * Math.PI * l) / 300), y: 110 + 58 * Math.sin((2 * Math.PI * l) / 300) });
  });
  afterEach(() => {
    for (const k of ['getScreenCTM', 'getTotalLength', 'getPointAtLength']) Reflect.deleteProperty(svgProto, k);
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  describe('cloudBind', () => {
    it('la nube arranca su cuadro a cuadro y las demás formas no', () => {
      const { callbacks } = stubFrames();
      const nube = built({ shape: nCloudShape });
      cloudBind(nube);
      expect(callbacks.length).toBe(1);
      callbacks.length = 0;
      cloudBind(built({ shape: ghostShape }));
      expect(callbacks.length).toBe(0);
    });

    it('limpia la inclinación anterior al reanclar', () => {
      stubFrames();
      const ctx = built({ shape: nCloudShape });
      ctx.el.breath.style.rotate = '5deg';
      ctx.el.breath.style.scale = '1.1 0.9';
      ctx.cloudPhys.px = 3;
      cloudBind(ctx);
      expect(ctx.el.breath.style.rotate).toBe('');
      expect(ctx.el.breath.style.scale).toBe('');
      expect(ctx.cloudPhys.px).toBeNull();
    });
  });
});
