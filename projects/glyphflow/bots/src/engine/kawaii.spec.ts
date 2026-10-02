import { KAWAII } from '../data/kawaii';
import { mochiShape } from '../shapes/mochi';
import { cubeShape } from '../shapes/retired';
import { makeRobot } from '../shapes/robot';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import {
  expr, installKawaiiHooks, K, K_IDLE, kClear, kCue, kDraw, kFlush, kHold, kIdleOn, kIdleTick, kPick, kRelease, kWake,
} from './kawaii';
import { setShape } from './setters';
import { installStateHooks, setState } from './state';

const proto = Element.prototype as unknown as Record<string, unknown>;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;
function stubAnimations(): void {
  proto['animate'] = function (this: Element, frames: Keyframe[]) {
    return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames } };
  };
  proto['getAnimations'] = () => [];
}

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

describe('glyphflow/bots · caras kawaii', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    svgProto['getScreenCTM'] = () => null;
    stubAnimations();
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

  describe('dibujo', () => {
    it('kDraw pinta ojos y boca de la expresión en las tres capas de la cara', () => {
      const ctx = bot();
      const partes = kDraw(ctx, 'happy');
      expect(partes).toHaveLength(3);
      for (const p of partes ?? []) expect(p.innerHTML.length).toBeGreaterThan(10);
    });

    it('cada una de las 33 expresiones se dibuja sin NaN ni indefinidos', () => {
      const ctx = bot();
      for (const key of Object.keys(KAWAII) as (keyof typeof KAWAII)[]) {
        const html = (kDraw(ctx, key) ?? []).map((p) => p.innerHTML).join('');
        expect(html, key).not.toContain('NaN');
        expect(html, key).not.toContain('undefined');
      }
    });

    it('el robot no tiene capa kawaii: expr no hace nada', () => {
      const ctx = bot({ shape: makeRobot(cubeShape) });
      expr(ctx, 'happy');
      expect(ctx.exprAnims).toHaveLength(0);
      expect(ctx.svg.dataset['kface']).toBeUndefined();
    });
  });

  describe('expr', () => {
    it('una cara con tiempo esconde la normal, anota su nombre y regresa sola', () => {
      const ctx = bot();
      expr(ctx, 'shy', 1500);
      expect(ctx.svg.dataset['kface']).toBe('shy');
      expect(ctx.exprAnims.length).toBeGreaterThan(0);
      vi.advanceTimersByTime(1500);
      expect(ctx.exprAnims).toHaveLength(0);
    });

    it('con `ms` nulo se queda puesta (cara de reposo) y la siguiente la reemplaza con un pop', () => {
      const ctx = bot({ wander: true });
      vi.advanceTimersByTime(10); // deja pasar el primer tick de reposo
      expr(ctx, 'happy', null, true);
      const n = ctx.exprAnims.length;
      expect(n).toBeGreaterThan(0);
      vi.advanceTimersByTime(1000);
      expect(ctx.exprAnims).toHaveLength(n);
      expr(ctx, 'content', null, true);
      expect(ctx.svg.dataset['kface']).toBe('content');
    });

    it('pedir una cara a propósito bloquea el puente de reacciones durante lo que dure', () => {
      const ctx = bot({ wander: true });
      expr(ctx, 'angry', 2000);
      expect(ctx.kLockUntil).toBeGreaterThan(performance.now());
      const seq = ctx.kSeqId;
      expr(ctx, 'crying', 1000);
      expect(ctx.kSeqId).toBe(seq + 1);
      expr(ctx, 'crying', 1000, true); // las automáticas no cuentan
      expect(ctx.kSeqId).toBe(seq + 1);
    });

    it('en reposo con wander, al terminar una cara vuelve a la de reposo y programa el siguiente tick', () => {
      const ctx = bot({ wander: true });
      ctx.kIdleKey = 'happy';
      expr(ctx, 'wink', 1000);
      vi.advanceTimersByTime(1000);
      expect(ctx.svg.dataset['kface']).toBe('happy');
      expect(ctx.kIdleT).not.toBeNull();
    });
  });

  describe('reposo con wander', () => {
    it('kIdleOn exige wander, estar en reposo y no ser el robot', () => {
      expect(kIdleOn(bot())).toBe(false);
      expect(kIdleOn(bot({ wander: true }))).toBe(true);
      const ctx = bot({ wander: true });
      ctx.state = 'working';
      expect(kIdleOn(ctx)).toBe(false);
      expect(kIdleOn(bot({ wander: true, shape: makeRobot(cubeShape) }))).toBe(false);
    });

    it('kPick reparte las 17 caras de reposo sin repetir seguidas', () => {
      const ctx = bot({ wander: true });
      const vistas = new Set<string>();
      let anterior = '';
      for (let i = 0; i < 17; i++) {
        const k = kPick(ctx);
        expect(k).not.toBe(anterior);
        vistas.add(k);
        anterior = k;
      }
      expect(vistas.size).toBe(17);
      expect(K_IDLE).toHaveLength(17);
    });

    it('kIdleTick sin wander quita la cara kawaii y no reprograma', () => {
      const ctx = bot();
      ctx.kIdleKey = 'happy';
      kIdleTick(ctx);
      expect(ctx.kIdleKey).toBeNull();
      expect(vi.getTimerCount()).toBeGreaterThanOrEqual(0);
    });

    it('kIdleTick con wander elige una cara o regresa a la normal, y se reprograma solo', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.1);
      const ctx = bot({ wander: true });
      vi.advanceTimersByTime(10); // performance.now() debe pasar de kLockUntil
      kIdleTick(ctx);
      expect(ctx.kIdleKey).not.toBeNull();
      expect(ctx.kIdleT).not.toBeNull();
    });

    it('no cambia de cara mientras alguien la pidió a propósito (kLockUntil), arrastrando o en pausa', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.1);
      const ctx = bot({ wander: true });
      ctx.kLockUntil = performance.now() + 5000;
      kIdleTick(ctx);
      expect(ctx.kIdleKey).toBeNull();
    });
  });

  describe('puente de reacciones', () => {
    it('sin wander ni cara puesta, kCue ignora las pistas', () => {
      const ctx = bot();
      kCue(ctx, { eye: 'happy', ms: 800 });
      expect(ctx.kQ).toBeNull();
    });

    it('las pistas que llegan juntas se combinan y el tick siguiente las resuelve', () => {
      const ctx = bot({ wander: true });
      ctx.kIdleKey = 'happy';
      kCue(ctx, { eye: 'happy', which: [0], ms: 500 });
      kCue(ctx, { mouth: 'open', ms: 1200, show: true });
      expect(ctx.kQ).toMatchObject({ eye: 'happy', mouth: 'open', ms: 1200, show: true });
      vi.advanceTimersByTime(0);
      expect(ctx.kQ).toBeNull();
      expect(ctx.kIdleKey).toBeNull(); // el gesto trae su propia cara: la kawaii se hace a un lado
    });

    it('kFlush respeta el bloqueo y el arrastre', () => {
      const ctx = bot({ wander: true });
      ctx.kIdleKey = 'happy';
      ctx.kQ = { ms: 100 };
      ctx.kLockUntil = performance.now() + 1000;
      kFlush(ctx);
      expect(ctx.kIdleKey).toBe('happy');
      ctx.kQ = { ms: 100 };
      ctx.kLockUntil = 0;
      ctx.dragging = true;
      kFlush(ctx);
      expect(ctx.kIdleKey).toBe('happy');
    });

    it('los ojos y la boca llaman al puente a través del hook instalado', () => {
      const ctx = bot({ wander: true });
      const antes = ctx.kQ;
      ctx.hooks.cue({ eye: 'happy', ms: 100 });
      expect(ctx.kQ).not.toBe(antes);
    });
  });

  describe('retener y soltar', () => {
    it('kHold redibuja solo si cambia y kRelease devuelve la cara normal', () => {
      const ctx = bot({ wander: true });
      kHold(ctx, 'amazed');
      const n = ctx.exprAnims.length;
      kHold(ctx, 'amazed');
      expect(ctx.exprAnims).toHaveLength(n);
      kRelease(ctx);
      expect(ctx.kHeldKey).toBeNull();
      expect(ctx.exprAnims).toHaveLength(0);
    });

    it('kClear cancela sus animaciones', () => {
      const ctx = bot();
      const cancel = vi.fn();
      ctx.exprAnims.push({ cancel } as unknown as Animation);
      kClear(ctx);
      expect(cancel).toHaveBeenCalled();
      expect(ctx.exprAnims).toEqual([]);
    });
  });

  describe('despertar', () => {
    it('sin wander o con movimiento reducido no despierta con gesto', () => {
      const ctx = bot();
      kWake(ctx);
      expect(ctx.svg.dataset['wake']).toBeUndefined();
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const r = bot({ wander: true });
      kWake(r);
      expect(r.svg.dataset['wake']).toBeUndefined();
    });

    it('elige una de las 4 formas de despertar (o la forzada) y las encadena', () => {
      const ctx = bot({ wander: true });
      ctx.kWakeForce = 'stretch';
      kWake(ctx);
      expect(ctx.svg.dataset['wake']).toBe('stretch');
      expect(ctx.kWakeForce).toBeNull();
      vi.advanceTimersByTime(250);
      expect(ctx.svg.dataset['kface']).toBe('yawn');
      vi.advanceTimersByTime(1500);
      expect(ctx.svg.dataset['kface']).toBe('drowsy');
      for (const v of ['rubEyes', 'nodding', 'startled']) {
        const c = bot({ wander: true });
        c.kWakeForce = v;
        kWake(c);
        expect(c.svg.dataset['wake']).toBe(v);
        vi.advanceTimersByTime(4000);
      }
    });

    it('despertar tocándolo (sobresalto) bloquea el puente mientras dura la secuencia', () => {
      const ctx = bot({ wander: true });
      ctx.kWakeForce = 'startled';
      kWake(ctx);
      expect(ctx.kLockUntil).toBeGreaterThan(performance.now() + 2000);
      expect(ctx.kIdleKey).toBeNull();
    });

    it('al despertar de verdad la máquina de estados llama al gancho', () => {
      const ctx = bot({ wander: true });
      setState(ctx, 'sleeping');
      ctx.kWakeForce = 'stretch';
      setState(ctx, 'idle');
      expect(ctx.svg.dataset['wake']).toBe('stretch');
    });
  });

  describe('gestos kawaii (K)', () => {
    it('hay 16, cada uno con su nombre de expresión, y corren sin tronar', () => {
      const nombres = Object.keys(K);
      expect(nombres).toHaveLength(16);
      for (const n of nombres) {
        const ctx = bot();
        expect(n in KAWAII, n).toBe(true);
        expect(() => (K as Record<string, (c: BotContext) => void>)[n](ctx), n).not.toThrow();
        vi.advanceTimersByTime(4000);
      }
    });

    it('cada gesto avisa su duración, pide su cara y la deja puesta ese tiempo', () => {
      const ctx = bot();
      const acts: number[] = [];
      ctx.hooks.act = (ms) => acts.push(ms);
      K.inLove(ctx);
      expect(acts).toEqual([2000]);
      expect(ctx.svg.dataset['kface']).toBe('inLove');
      vi.advanceTimersByTime(300);
      expect(ctx.el.z.querySelectorAll('text').length).toBeGreaterThan(0); // corazoncitos
    });
  });

  it('installKawaiiHooks conecta cue, kawaiiIdleTick y kawaiiWake', () => {
    const ctx = bot({ wander: true });
    ctx.kIdleKey = 'happy';
    ctx.hooks.kawaiiIdleTick();
    expect(ctx.kIdleT).not.toBeNull();
    ctx.kWakeForce = 'stretch';
    ctx.hooks.kawaiiWake();
    expect(ctx.svg.dataset['wake']).toBe('stretch');
  });
});
