import { mochiShape } from '../shapes/mochi';
import { createBotContext, nextBotId, type BotContext, type GfBotOptions } from './context';
import { flash, lit, sweep, tint } from './light';
import { later, loop, play } from './timing';

/** jsdom no trae Web Animations: cada nodo recibe un `animate` propio (nunca en el prototipo, que se filtra a otros specs). */
const fakeAnimation = () => ({ cancel: vi.fn(), onfinish: null as null | (() => void) });
function stubAnimate(node: Element) {
  const calls: { frames: Keyframe[]; options: KeyframeAnimationOptions }[] = [];
  const made: ReturnType<typeof fakeAnimation>[] = [];
  (node as unknown as { animate: unknown }).animate = (frames: Keyframe[], options: KeyframeAnimationOptions) => {
    calls.push({ frames, options });
    const a = fakeAnimation();
    made.push(a);
    return a;
  };
  return { calls, made };
}

function make(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  return createBotContext(host, { shape: mochiShape, ...opts });
}

describe('glyphflow/bots · contexto', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  describe('createBotContext', () => {
    it('monta el esqueleto en el host y resuelve todas las referencias fijas', () => {
      const ctx = make();
      expect(ctx.host.firstElementChild).toBe(ctx.svg);
      for (const [name, node] of Object.entries(ctx.el)) {
        if (name === 'L') continue;
        for (const n of [node].flat()) expect(n, name).toBeInstanceOf(SVGElement);
      }
      expect(Object.keys(ctx.el.L)).toEqual(['key', 'sheen', 'rl', 'rr', 'rt', 'rb', 'lift', 'dim', 'mood', 'gloss']);
      expect(ctx.el.dotList).toHaveLength(3);
      expect(ctx.el.thoughtList).toHaveLength(3);
    });

    it('dos bots no comparten ids ni referencias', () => {
      const a = make();
      const b = make();
      expect(a.id).not.toBe(b.id);
      const idsA = [...a.svg.querySelectorAll('[id]')].map((n) => n.id);
      const idsB = new Set([...b.svg.querySelectorAll('[id]')].map((n) => n.id));
      expect(idsA.length).toBeGreaterThan(0);
      expect(idsA.some((i) => idsB.has(i))).toBe(false);
      expect(a.el.hop).not.toBe(b.el.hop);
      expect(a.subTimers).not.toBe(b.subTimers);
      expect(a.running).not.toBe(b.running);
    });

    it('acepta un id explícito (hidratación) y nextBotId nunca repite', () => {
      const ctx = createBotContext(document.createElement('div'), { shape: mochiShape }, 'srv-7');
      expect(ctx.id).toBe('srv-7');
      expect(ctx.svg.querySelector('#srv-7-body')).not.toBeNull();
      expect(nextBotId()).not.toBe(nextBotId());
    });

    it('arranca en reposo, sin forma construida y sin nada vivo', () => {
      const ctx = make();
      expect(ctx.state).toBe('idle');
      expect(ctx.ready).toBe(false);
      expect(ctx.pose).toEqual({ yaw: 0, pitch: 0, roll: 0 });
      expect(ctx.shape).toBe(mochiShape);
      expect(ctx.fe.eyes).toBeNull();
      expect(ctx.fe.eyeList).toEqual([]);
      expect(ctx.fe.mflow).toBeNull();
      expect([ctx.subAnims, ctx.subTimers, ctx.lookTimers, ctx.toyTimers, ctx.poseEls, ctx.feats]).toEqual([[], [], [], [], [], []]);
      expect(ctx.running.size).toBe(0);
      expect(ctx.paused).toBe(false);
      expect(ctx.hatPhys.px).toBeNull();
      expect(ctx.cloudPhys.px).toBeNull();
    });

    it('traduce las opciones a estado inicial', () => {
      const ctx = make({ palette: 'coral', material: 'oro', mochi: 'gel', face: 'geo', fx: 'glow', mouthk: 'w', hoverOnly: true });
      expect(ctx).toMatchObject({
        paletteKey: 'coral', materialKey: 'oro', mochiVar: 'gel', faceStyle: 'geo', fxVar: 'glow',
        mouthPref: 'w', hoverHold: true,
      });
      const defaults = make();
      expect(defaults).toMatchObject({
        paletteKey: 'auto', materialKey: 'auto', mochiVar: 'neu', faceStyle: null, fxVar: null,
        mouthPref: null, hoverHold: false, accX: null, hatKey: null,
      });
      expect(make({ mouthk: 'auto' }).mouthPref).toBeNull();
    });

    it('un sombrero va a hatKey y un accesorio extra a accX, nunca a los dos', () => {
      const withHat = make({ hat: 'copa' });
      expect(withHat.hatKey).toBe('copa');
      expect(withHat.accX).toBeNull();
      const withAcc = make({ hat: 'halo' });
      expect(withAcc.accX).toBe('halo');
      expect(withAcc.hatKey).toBeNull();
    });

    it('descarta lo que no existe, incluidas las claves heredadas de Object', () => {
      for (const bad of ['no-existe', 'constructor', 'toString', '__proto__'] as const) {
        const ctx = make({ hat: bad as never, fx: bad as never, face: bad as never });
        expect([ctx.hatKey, ctx.accX, ctx.fxVar, ctx.faceStyle], bad).toEqual([null, null, null, null]);
      }
      expect(make({ hat: null }).hatKey).toBeNull();
    });

    it('falla con un mensaje claro si el esqueleto pierde una capa del contrato', () => {
      const host = document.createElement('div');
      const original = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML')!;
      Object.defineProperty(host, 'innerHTML', {
        configurable: true,
        set(html: string) {
          original.set!.call(host, html.replace('class="spinner"', 'class="otra-cosa"'));
        },
      });
      expect(() => createBotContext(host, { shape: mochiShape })).toThrow(/spinner/);
    });
  });

  describe('later / loop / play', () => {
    it('later programa y anota el timer en el bag vigente, no en el que había al crear el contexto', () => {
      vi.useFakeTimers();
      const ctx = make();
      const fn = vi.fn();
      const viejo = ctx.subTimers;
      ctx.subTimers = []; // el prototipo reasigna al limpiar la rutina
      later(ctx, fn, 100);
      expect(ctx.subTimers).toHaveLength(1);
      expect(viejo).toHaveLength(0);
      vi.advanceTimersByTime(99);
      expect(fn).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('later respeta un bag propio y el timer se puede cancelar desde ahí', () => {
      vi.useFakeTimers();
      const ctx = make();
      const fn = vi.fn();
      later(ctx, fn, 50, ctx.lookTimers);
      expect(ctx.subTimers).toHaveLength(0);
      ctx.lookTimers.forEach(clearTimeout);
      vi.advanceTimersByTime(100);
      expect(fn).not.toHaveBeenCalled();
    });

    it('loop anima en bucle infinito y la deja en subAnims', () => {
      const ctx = make();
      const { calls, made } = stubAnimate(ctx.el.breath);
      const a = loop(ctx, ctx.el.breath, [{ opacity: 0 }, { opacity: 1 }], { duration: 900, direction: 'alternate' });
      expect(calls[0].options).toEqual({ iterations: Infinity, duration: 900, direction: 'alternate' });
      expect(ctx.subAnims).toEqual([a]);
      expect(a).toBe(made[0]);
    });

    it('play arranca desde la pose ACTUAL del nodo, no desde el cuadro 0', () => {
      const ctx = make();
      ctx.el.hop.style.transform = 'translate(4px, 7px)';
      const { calls } = stubAnimate(ctx.el.hop);
      const frames: Keyframe[] = [{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(2)', offset: 1 }];
      play(ctx, ctx.el.hop, frames, { duration: 300 });
      expect(calls[0].frames[0]).toEqual({ transform: 'translate(4px, 7px)', offset: 0 });
      expect(calls[0].frames[1]).toEqual({ transform: 'scale(2)', offset: 1 });
    });

    it('play sobre un nodo sin transform arranca en `none`', () => {
      const ctx = make();
      stubAnimate(ctx.el.hop);
      const frames: Keyframe[] = [{ transform: 'scale(1)' }, { transform: 'scale(2)' }];
      play(ctx, ctx.el.hop, frames, { duration: 300 });
      expect(frames[0]['transform']).toBe('none');
    });

    it('play cancela la anterior del mismo nodo y se borra de running al terminar', () => {
      const ctx = make();
      const { made } = stubAnimate(ctx.el.hop);
      const first = play(ctx, ctx.el.hop, [{ opacity: 0 }, { opacity: 1 }], { duration: 100 });
      expect(ctx.running.get(ctx.el.hop)).toBe(first);
      const second = play(ctx, ctx.el.hop, [{ opacity: 0 }, { opacity: 1 }], { duration: 100 });
      expect(made[0].cancel).toHaveBeenCalledTimes(1);
      expect(ctx.running.get(ctx.el.hop)).toBe(second);
      // una animación vieja que termina tarde no debe borrar a la nueva
      (first as unknown as { onfinish: () => void }).onfinish();
      expect(ctx.running.get(ctx.el.hop)).toBe(second);
      (second as unknown as { onfinish: () => void }).onfinish();
      expect(ctx.running.has(ctx.el.hop)).toBe(false);
    });
  });

  describe('luces', () => {
    it('lit anima la luz por nombre con easing por defecto y deja pasar opciones', () => {
      const ctx = make();
      const { calls } = stubAnimate(ctx.el.L.rt);
      lit(ctx, 'rt', [{ opacity: 0 }, { opacity: 1 }], 400, { delay: 50 });
      expect(calls[0].options).toEqual({ duration: 400, easing: 'ease-in-out', delay: 50 });
    });

    it('tint escribe variables CSS con el prefijo --', () => {
      const ctx = make();
      tint(ctx, { rt: '#f0f', sh: '#fff' });
      expect(ctx.svg.style.getPropertyValue('--rt')).toBe('#f0f');
      expect(ctx.svg.style.getPropertyValue('--sh')).toBe('#fff');
    });

    it('flash sin color enciende lift y gloss, y no toca el borde', () => {
      const ctx = make();
      const lift = stubAnimate(ctx.el.L.lift);
      const gloss = stubAnimate(ctx.el.L.gloss);
      const rt = stubAnimate(ctx.el.L.rt);
      flash(ctx, 0.4, 500);
      expect(lift.calls[0].frames[1]).toEqual({ opacity: 0.4, offset: 0.15 });
      expect(lift.calls[0].options.duration).toBe(500);
      expect(gloss.calls[0].frames[1]).toMatchObject({ transform: 'scale(1.3,1.25)' });
      expect(rt.calls).toHaveLength(0);
    });

    it('flash con color tiñe y enciende el borde de arriba un 20% más de tiempo', () => {
      const ctx = make();
      stubAnimate(ctx.el.L.lift);
      stubAnimate(ctx.el.L.gloss);
      const rt = stubAnimate(ctx.el.L.rt);
      flash(ctx, 0.3, 1000, '#0ff');
      expect(ctx.svg.style.getPropertyValue('--rt')).toBe('#0ff');
      expect(rt.calls[0].options.duration).toBe(1200);
    });

    it('flash en una piel de color pintado (mflow/mhalo) también enciende su color interno', () => {
      const ctx = make();
      stubAnimate(ctx.el.L.lift);
      stubAnimate(ctx.el.L.gloss);
      const mflow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const mhalo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const f = stubAnimate(mflow);
      const h = stubAnimate(mhalo);
      ctx.fe.mflow = mflow;
      ctx.fe.mhalo = mhalo;
      flash(ctx, 0.3, 1000);
      expect(f.calls[0].options.duration).toBe(1300);
      expect(h.calls[0].frames[1]).toEqual({ opacity: 1.6, offset: 0.18 });
    });

    it('sweep cruza de `from` a `to` con el color elegido', () => {
      const ctx = make();
      const sheen = stubAnimate(ctx.el.L.sheen);
      sweep(ctx, 700, { color: '#ff0', from: 10, to: 150, peak: 0.8, delay: 90 });
      expect(ctx.svg.style.getPropertyValue('--sh')).toBe('#ff0');
      const { frames, options } = sheen.calls[0];
      expect(frames[0]).toEqual({ transform: 'translateX(10px) skewX(-14deg)', opacity: 0 });
      expect(frames[1]).toEqual({ opacity: 0.8, offset: 0.5 });
      expect(frames[2]).toEqual({ transform: 'translateX(150px) skewX(-14deg)', opacity: 0 });
      expect(options).toEqual({ duration: 700, easing: 'ease-in-out', delay: 90 });
    });

    it('sweep sin opciones usa los valores del prototipo', () => {
      const ctx = make();
      const sheen = stubAnimate(ctx.el.L.sheen);
      sweep(ctx, 500);
      expect(ctx.svg.style.getPropertyValue('--sh')).toBe('#fff');
      expect(sheen.calls[0].frames[0]['transform']).toBe('translateX(20px) skewX(-14deg)');
      expect(sheen.calls[0].frames[1]['opacity']).toBe(0.5);
      expect(sheen.calls[0].options.delay).toBe(0);
    });
  });
});
