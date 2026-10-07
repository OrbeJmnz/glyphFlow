import { mochiShape } from '../../src/shapes/mochi';
import { tofuShape } from '../../src/shapes/tofu';
import { buildShape } from '../../src/engine/build';
import { createBotContext, type BotContext, type GfBotOptions } from '../../src/engine/context';
import { hatsExtra } from './hats';
import { hatBind, hatKick, hatStep } from './hat-physics';

function built(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, extras: { hats: hatsExtra }, ...opts });
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

describe('glyphflow/bots · física del sombrero', () => {
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

  describe('hatBind', () => {
    it('sin sombrero deja el accesorio extra (o nada) en data-hat y no monta física', () => {
      stubFrames();
      const ctx = built({ hat: 'halo' });
      hatBind(ctx);
      expect(ctx.svg.dataset['hat']).toBe('halo');
      expect(ctx.hatEls).toBeNull();
      expect(ctx.el.hatShadow.innerHTML).toBe('');
      expect(ctx.el.fx.style.translate).toBe('');
      expect(ctx.hatRaf).toBe(0);
    });

    it('con sombrero mide su ancla, sube los efectos y arranca el cuadro a cuadro', () => {
      const { callbacks } = stubFrames();
      const ctx = built({ hat: 'topHat' });
      hatBind(ctx);
      expect(ctx.svg.dataset['hat']).toBe('topHat');
      expect(ctx.hatEls?.anchor).toBeInstanceOf(SVGElement);
      expect(ctx.hatEls?.dyn.length).toBeGreaterThan(0);
      expect(ctx.hatEls?.ax).toBe(100 + (mochiShape.hatX ?? 0));
      expect(ctx.hatEls?.ay).toBe(mochiShape.cy + (mochiShape.hatAt ?? 0) + 0);
      expect(ctx.el.fx.style.translate).toMatch(/^0px -?[\d.]+px$/);
      expect(callbacks.length).toBe(2); // la sombra de contacto y el primer cuadro de la física
    });

    it('un sombrero que se ajusta al cuerpo (audífonos) se ancla en el centro del cuerpo', () => {
      stubFrames();
      const ctx = built({ hat: 'headphones', shape: tofuShape });
      hatBind(ctx);
      expect(ctx.hatEls?.ax).toBe(100);
      expect(ctx.hatEls?.ay).toBe(tofuShape.bodyFit?.y);
    });

    it('con movimiento reducido no hay cuadro a cuadro', () => {
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const { callbacks } = stubFrames();
      const ctx = built({ hat: 'topHat' });
      hatBind(ctx);
      expect(ctx.hatRaf).toBe(0);
      expect(callbacks.length).toBe(1); // solo la sombra
    });

    it('al reanclar reinicia la física y cancela el cuadro pendiente', () => {
      const { cancelled } = stubFrames();
      const ctx = built({ hat: 'topHat' });
      ctx.hatRaf = 77;
      Object.assign(ctx.hatPhys, { th: 9, vth: 2, oy: 1, voy: 1, px: 4, t: 5 });
      hatBind(ctx);
      expect(cancelled).toContain(77);
      expect(ctx.hatPhys).toMatchObject({ th: 0, vth: 0, oy: 0, voy: 0, px: null, t: 0 });
    });

    it('una forma sin `hatAt` no lleva sombrero aunque se pida', () => {
      stubFrames();
      const ctx = built({ hat: 'topHat', shape: { ...mochiShape, hatAt: undefined } });
      hatBind(ctx);
      expect(ctx.hatEls).toBeNull();
      expect(ctx.svg.dataset['hat']).toBe('');
    });
  });

  describe('hatKick / hatStep', () => {
    it('hatKick empuja el resorte hacia arriba y hacia un lado', () => {
      const ctx = built({ hat: 'topHat' });
      hatKick(ctx, 3, 2);
      expect(ctx.hatPhys.voy).toBe(-3);
      expect(ctx.hatPhys.vth).toBe(2);
    });

    it('sin CTM (jsdom no mide) el cuadro se re-agenda y no toca nada', () => {
      const { callbacks } = stubFrames();
      const ctx = built({ hat: 'topHat' });
      hatBind(ctx);
      callbacks.length = 0;
      hatStep(ctx, 16);
      expect(callbacks.length).toBe(1); // se re-agenda
      expect(ctx.hatPhys.px).toBeNull(); // pero no midió
    });

    it('en pausa o sin sombrero el cuadro no hace nada', () => {
      const { callbacks } = stubFrames();
      const ctx = built({ hat: 'topHat' });
      hatBind(ctx);
      ctx.paused = true;
      expect(() => hatStep(ctx, 16)).not.toThrow();
      ctx.paused = false;
      ctx.hatKey = null;
      expect(() => hatStep(ctx, 32)).not.toThrow();
      expect(callbacks.length).toBeGreaterThan(0);
    });
  });
});
