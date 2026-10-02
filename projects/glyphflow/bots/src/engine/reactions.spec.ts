import { mochiShape } from '../shapes/mochi';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { installKawaiiHooks } from './kawaii';
import { kAt, kLaugh, kSeq, kStars, poke, pokeFx, pokePick, spinFx } from './reactions';
import { setShape } from './setters';
import { installStateHooks, setState } from './state';

const proto = Element.prototype as unknown as Record<string, unknown>;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;

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

describe('glyphflow/bots · reacciones al tacto', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    svgProto['getScreenCTM'] = () => null;
    proto['animate'] = function (this: Element, frames: Keyframe[]) {
      return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames } };
    };
    proto['getAnimations'] = () => [];
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    Reflect.deleteProperty(svgProto, 'getScreenCTM');
    document.body.innerHTML = '';
  });

  describe('secuencias de caras', () => {
    it('kSeq encadena las caras y devuelve cuánto dura todo', () => {
      const ctx = bot({ wander: true });
      expect(kSeq(ctx, [['amazed', 400], ['happy', 900]])).toBe(1300);
      expect(ctx.svg.dataset['kface']).toBe('amazed');
      vi.advanceTimersByTime(400);
      expect(ctx.svg.dataset['kface']).toBe('happy');
    });

    it('una secuencia nueva cancela lo que quedaba de la anterior', () => {
      const ctx = bot({ wander: true });
      kSeq(ctx, [['amazed', 400], ['happy', 900]]);
      const id = ctx.kSeqId;
      kSeq(ctx, [['shy', 500]]);
      expect(ctx.kSeqId).toBe(id + 1);
      vi.advanceTimersByTime(400);
      expect(ctx.svg.dataset['kface']).toBe('shy');
    });

    it('kAt ejecuta más tarde salvo que llegue otra reacción o lo estén arrastrando', () => {
      const ctx = bot();
      const fn = vi.fn();
      kAt(ctx, fn, 300);
      vi.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);
      const cancelada = vi.fn();
      kAt(ctx, cancelada, 300);
      ctx.kSeqId++;
      vi.advanceTimersByTime(300);
      expect(cancelada).not.toHaveBeenCalled();
      const arrastrada = vi.fn();
      kAt(ctx, arrastrada, 300);
      ctx.dragging = true;
      vi.advanceTimersByTime(300);
      expect(arrastrada).not.toHaveBeenCalled();
    });

    it('kStars da n estrellitas vueltas a la cabeza y se limpia; con movimiento reducido, nada', () => {
      const ctx = bot();
      kStars(ctx, 1000, 4);
      expect(ctx.el.z.querySelectorAll('.kstars text')).toHaveLength(4);
      vi.advanceTimersByTime(1060);
      expect(ctx.el.z.querySelector('.kstars')).toBeNull();
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const r = bot();
      kStars(r);
      expect(r.el.z.querySelector('.kstars')).toBeNull();
    });
  });

  describe('qué reacción elige', () => {
    it('la cabeza da un coscorrón; los pies, un brinco; el costado, un empujón', () => {
      const ctx = bot();
      vi.spyOn(Math, 'random').mockReturnValue(0.1);
      expect(pokePick(ctx, 0, -0.8)).toBe('bonk');
      expect(pokePick(ctx, 0, 0.8)).toBe('jump');
      expect(pokePick(ctx, 0.9, 0)).toBe('shove');
    });

    it('dos toques rápidos tras otros dos hacen girar al bot', () => {
      const ctx = bot();
      ctx.pokes = 2;
      ctx.lastPokeAt = performance.now() - 100;
      expect(pokePick(ctx, 0, 0)).toBe('spin');
    });

    it('en el centro elige al azar de las seis y no repite la anterior', () => {
      const ctx = bot();
      ctx.lastPokeV = 'boop';
      const vistas = new Set<string>();
      for (let i = 0; i < 40; i++) {
        vi.spyOn(Math, 'random').mockReturnValue(i / 40);
        ctx.lastPokeAt = 0;
        const v = pokePick(ctx, 0, 0);
        expect(v).not.toBe('boop');
        vistas.add(v);
      }
      expect([...vistas].sort()).toEqual(['ball', 'ouch', 'shrink', 'tickle']);
    });
  });

  describe('efectos', () => {
    const DURACION: Record<string, number> = {
      tickle: 1280, bonk: 1960, shove: 1250, jump: 1320, boop: 1300, ball: 1150, shrink: 1150, ouch: 1420, spin: 1000,
    };
    for (const [v, ms] of Object.entries(DURACION)) {
      it(`${v}: devuelve ${ms} ms y corre sin tronar`, () => {
        const ctx = bot({ wander: true });
        expect(pokeFx(ctx, v, 0.3, 0.1, -4)).toBe(ms);
        vi.advanceTimersByTime(ms + 500);
      });
    }

    it('una reacción desconocida dura 700 ms', () => {
      expect(pokeFx(bot(), 'nada', 0, 0, 0)).toBe(700);
    });

    const EXTRA: Record<string, number> = { top: 0, fall: 1700, stars: 900, stagger: 1100, pirouette: 700, nada: 0 };
    for (const [v, extra] of Object.entries(EXTRA)) {
      it(`spinFx ${v}: ocupa ${extra} ms más después del giro`, () => {
        const ctx = bot({ wander: true });
        expect(spinFx(ctx, v, 1500, 1)).toBe(extra);
        vi.advanceTimersByTime(4000);
      });
    }

    it('kLaugh sacude el cuerpo y con movimiento reducido no', () => {
      const ctx = bot();
      expect(() => kLaugh(ctx)).not.toThrow();
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      expect(() => kLaugh(bot())).not.toThrow();
    });
  });

  describe('poke', () => {
    it('despertarlo dormido lo sobresalta: se despierta con la forma «startled»', () => {
      const onWake = vi.fn();
      const ctx = bot({ wander: true, onWake });
      setState(ctx, 'sleeping');
      poke(ctx, 100, 112);
      expect(ctx.state).toBe('idle');
      expect(onWake).toHaveBeenCalled();
      expect(ctx.svg.dataset['wake']).toBe('startled');
    });

    it('dibuja una onda en el punto tocado y la quita al terminar', () => {
      const ctx = bot();
      poke(ctx, 70, 90);
      const r = ctx.el.world.parentElement?.querySelector('.poke-ring') ?? ctx.el.z.querySelector('.poke-ring');
      expect(r?.getAttribute('cx')).toBe('70');
      expect(r?.getAttribute('cy')).toBe('90');
    });

    it('los dos primeros juegan con una de las nueve; `force.poke` elige cuál', () => {
      const ctx = bot();
      ctx.force.poke = 'boop';
      poke(ctx, 100, 112);
      expect(ctx.svg.dataset['poke']).toBe('boop');
      expect(ctx.lastPokeV).toBe('boop');
      expect(ctx.pokes).toBe(1);
    });

    it('del tercero en adelante se fastidia (annoyed) y luego se enoja (angry)', () => {
      const ctx = bot({ wander: true });
      ctx.force.poke = 'ouch';
      for (let i = 0; i < 3; i++) poke(ctx, 100, 112);
      expect(ctx.svg.dataset['poke']?.startsWith('annoyed')).toBe(true);
      poke(ctx, 100, 112);
      expect(ctx.svg.dataset['poke']?.startsWith('angry')).toBe(true);
    });

    it('al quinto se enoja de verdad: gesto de enojo y reinicia la cuenta', () => {
      const ctx = bot({ wander: true });
      const acts: number[] = [];
      const act = ctx.hooks.act;
      ctx.hooks.act = (ms) => {
        acts.push(ms);
        act(ms);
      };
      for (let i = 0; i < 5; i++) poke(ctx, 100, 112);
      expect(acts).toContain(2300); // angry()
      expect(ctx.pokes).toBe(0);
    });

    it('la cuenta se olvida a los 1.8 s', () => {
      const ctx = bot();
      ctx.force.poke = 'ouch';
      poke(ctx, 100, 112);
      poke(ctx, 100, 112);
      expect(ctx.pokes).toBe(2);
      vi.advanceTimersByTime(1800);
      expect(ctx.pokes).toBe(0);
    });

    it('cada toque le da un empujoncito al sombrero hacia el lado contrario', () => {
      const ctx = bot();
      poke(ctx, 40, 112);
      expect(ctx.hatPhys.vth).toBeGreaterThan(0);
      const otro = bot();
      poke(otro, 160, 112);
      expect(otro.hatPhys.vth).toBeLessThan(0);
    });
  });
});
