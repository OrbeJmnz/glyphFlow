import { ROUTINES } from '../data/routines';
import { routinesExtra } from '../../extras/src/routines';
import { mochiShape } from '../shapes/mochi';
import { makeRobot } from '../shapes/robot';
import { cubeShape } from '../shapes/retired';
import { baseFor, baseRoll } from './base-pose';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { REANUDA_MS, act, clearFace, clearRoutine, installStateHooks, nextRoutine, setRoutine, setState } from './state';
import { setShape } from './setters';
import { hop } from './gestures';

/** jsdom no trae Web Animations: se instala un `animate` mínimo en el prototipo y se BORRA al terminar (no filtrarlo a otros specs). */
const proto = Element.prototype as unknown as Record<string, unknown>;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;
function stubAnimations(): { calls: Element[] } {
  const calls: Element[] = [];
  proto['animate'] = function (this: Element) {
    calls.push(this);
    const anim = { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => [] } };
    return anim;
  };
  proto['getAnimations'] = () => [];
  return { calls };
}

function bot(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, extras: { routines: routinesExtra }, ...opts });
  installStateHooks(ctx);
  setShape(ctx, ctx.shape);
  setState(ctx, 'idle');
  ctx.ready = true;
  return ctx;
}

describe('glyphflow/bots · estados y rutinas', () => {
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

  describe('pose base', () => {
    it('cada forma se inclina lo suyo (su `tilt`) salvo dormido, que se recuesta −5°', () => {
      const ctx = bot({ shape: makeRobot(cubeShape) });
      expect(baseFor(ctx, 'idle').roll).toBe(-3);
      expect(baseFor(ctx, 'working').roll).toBe(-3);
      expect(baseFor(ctx, 'sleeping').roll).toBe(-5);
      ctx.state = 'idle';
      expect(baseRoll(ctx)).toBe(-3);
    });

    it('sin `tilt` la pose de reposo es recta', () => {
      expect(baseFor(bot(), 'idle')).toEqual({ yaw: 0, pitch: 0, roll: 0 });
    });
  });

  describe('setState', () => {
    it('trabajando: boca plana, luces normales y arranca la primera rutina', () => {
      const onRoutine = vi.fn();
      const ctx = bot({ onRoutine });
      setState(ctx, 'working');
      expect(ctx.state).toBe('working');
      expect(ctx.svg.dataset['mstate']).toBe('working');
      expect(ctx.el.L.dim.style.opacity).toBe('0');
      expect(ctx.el.L.gloss.style.opacity).toBe('1');
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('flat');
      expect(onRoutine).toHaveBeenLastCalledWith('working', 'typing · tapping');
    });

    it('dormido: baja la luz, el reflejo pierde fuerza, boca de sueño y los ojos se cierran tras 1.38 s', () => {
      const ctx = bot();
      setState(ctx, 'sleeping');
      expect(ctx.el.L.dim.style.opacity).toBe('0.36');
      expect(ctx.el.L.gloss.style.opacity).toBe('0.5');
      expect(ctx.fe.mouths.find((m) => m.style.opacity === '1')?.dataset['m']).toBe('sleep');
      expect(ctx.fe.eyeList.every((e) => e.style.opacity === '1')).toBe(true); // se va quedando dormido
      vi.advanceTimersByTime(1380);
      expect(ctx.fe.eyeList.every((e) => e.style.opacity === '0')).toBe(true);
      expect(ctx.fe.closed.every((c) => c.getAttribute('opacity') === '1')).toBe(true);
    });

    it('con quiet se reanuda sin gestos de transición y deja los ojos como toca', () => {
      const ctx = bot();
      setState(ctx, 'sleeping');
      vi.advanceTimersByTime(2000);
      const { calls } = stubAnimations();
      setState(ctx, 'idle', true);
      expect(calls.some((n) => ctx.fe.eyeList.includes(n as SVGElement))).toBe(false);
      expect(ctx.fe.eyeList.every((e) => e.style.opacity === '1')).toBe(true);
      setState(ctx, 'sleeping', true);
      expect(ctx.fe.eyeList.every((e) => e.style.opacity === '0')).toBe(true);
    });

    it('al cambiar de estado cancela lo que dejó la rutina anterior', () => {
      const ctx = bot();
      setState(ctx, 'working');
      const cancel = vi.fn();
      ctx.subAnims.push({ cancel } as unknown as Animation);
      const timer = setTimeout(vi.fn(), 99999);
      ctx.subTimers.push(timer);
      setState(ctx, 'idle');
      expect(cancel).toHaveBeenCalled();
      expect(ctx.routineIdx).toBe(0);
    });

    it('con movimiento reducido cambia de estado pero se salta los gestos de transición', () => {
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      const ctx = bot();
      const { calls } = stubAnimations();
      setState(ctx, 'working');
      expect(calls.some((n) => n === ctx.el.hop)).toBe(false); // sin miniHop de «manos a la obra»
    });

    it('reposo → trabajando da un salto corto («manos a la obra»); dormido → reposo se estira', () => {
      const ctx = bot();
      const { calls } = stubAnimations();
      setState(ctx, 'working');
      expect(calls).toContain(ctx.el.hop);
      setState(ctx, 'sleeping');
      calls.length = 0;
      const kawaiiWake = vi.fn();
      ctx.hooks.kawaiiWake = kawaiiWake;
      setState(ctx, 'idle');
      expect(kawaiiWake).toHaveBeenCalledTimes(1);
      expect(calls).toContain(ctx.el.breath); // estirón al despertar
    });

    it('avisa a las caras kawaii en cada cambio para que decidan si toca una', () => {
      const ctx = bot();
      const tick = vi.fn();
      ctx.hooks.kawaiiIdleTick = tick;
      setState(ctx, 'working');
      vi.advanceTimersByTime(1);
      expect(tick).toHaveBeenCalledTimes(1);
    });
  });

  describe('rutinas', () => {
    it('trabajando rota por las seis rutinas en orden y cada una toca su siguiente variante', () => {
      const labels: string[] = [];
      const ctx = bot({ onRoutine: (_s, l) => l && labels.push(l) });
      setState(ctx, 'working');
      vi.advanceTimersByTime(4700 * 7);
      const rutinas = labels.map((l) => l.split(' · ')[0]);
      expect(rutinas.slice(0, 6)).toEqual([...ROUTINES.working]);
      expect(rutinas[6]).toBe('typing'); // da la vuelta
      expect(labels[0]).toBe('typing · tapping');
      expect(labels[6]).toBe('typing · rushing'); // y en la vuelta toca la siguiente variante
    });

    it('dormido las rutinas se turnan con su etiqueta legible y la «burbuja» dura menos', () => {
      const seen: { l: string | null; at: number }[] = [];
      const ctx = bot({ onRoutine: (_s, l) => seen.push({ l, at: Date.now() }) });
      setState(ctx, 'sleeping');
      vi.advanceTimersByTime(4700 * 9);
      const l = seen.map((s) => s.l);
      expect(l.slice(0, 9)).toEqual(['deep', 'snoring', 'nodding', 'dreaming', 'bubble', 'counting sheep', 'sleepwalking', 'almost falling', 'starry night']);
      expect(seen[5].at - seen[4].at).toBe(4000); // tras la burbuja entra la siguiente a los 4 s
      expect(seen[4].at - seen[3].at).toBe(4700);
    });

    it('setRoutine fija una rutina: se queda en ella y rota solo sus variantes; `auto` la suelta', () => {
      const labels: string[] = [];
      const ctx = bot({ onRoutine: (_s, l) => l && labels.push(l) });
      setRoutine(ctx, 'planning');
      vi.advanceTimersByTime(4700 * 2);
      expect(labels).toEqual(['planning · list', 'planning · notes', 'planning · route']);
      setRoutine(ctx, 'auto');
      vi.advanceTimersByTime(4700);
      expect(labels.at(-1)?.startsWith('planning')).toBe(false);
    });

    it('setRoutine de otro estado cambia de estado y lo avisa', () => {
      const onStateChange = vi.fn();
      const ctx = bot({ onStateChange });
      setRoutine(ctx, 'snoring', 'sleeping');
      expect(ctx.state).toBe('sleeping');
      expect(onStateChange).toHaveBeenCalledWith('sleeping');
    });

    it('clearRoutine vacía animaciones, timers y las capas de efectos de la rutina', () => {
      const ctx = bot();
      const cancel = vi.fn();
      ctx.subAnims.push({ cancel } as unknown as Animation);
      ctx.subTimers.push(setTimeout(vi.fn(), 5000));
      ctx.zTimer = setInterval(vi.fn(), 1000);
      ctx.el.z.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
      ctx.el.world.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
      ctx.el.dots.setAttribute('opacity', '1');
      ctx.el.spinner.setAttribute('opacity', '1');
      clearRoutine(ctx);
      expect(cancel).toHaveBeenCalled();
      expect(ctx.subAnims).toEqual([]);
      expect(ctx.subTimers).toEqual([]);
      expect(ctx.zTimer).toBeNull();
      expect(ctx.el.z.childElementCount).toBe(0);
      expect(ctx.el.world.childElementCount).toBe(0);
      expect(ctx.el.dots.getAttribute('opacity')).toBe('0');
      expect(ctx.el.spinner.getAttribute('opacity')).toBe('0');
    });

    describe('salida suave (clearRoutine con `suave`)', () => {
      const NS = 'http://www.w3.org/2000/svg';
      const efecto = (ctx: BotContext): SVGElement => {
        const g = document.createElementNS(NS, 'g');
        ctx.el.z.appendChild(g);
        return g;
      };

      it('lo que se veía SALE desvaneciéndose: sigue en el DOM un instante y luego se quita', () => {
        const ctx = bot();
        const { calls } = stubAnimations();
        const fx = efecto(ctx);
        clearRoutine(ctx, true);
        expect(fx.isConnected).toBe(true);
        expect(calls).toContain(fx);
        vi.advanceTimersByTime(219);
        expect(fx.isConnected).toBe(true);
        vi.advanceTimersByTime(1);
        expect(fx.isConnected).toBe(false);
      });

      it('sin `suave` sigue siendo instantáneo', () => {
        const ctx = bot();
        const fx = efecto(ctx);
        clearRoutine(ctx);
        expect(fx.isConnected).toBe(false);
      });

      it('con movimiento reducido no hay nada que desvanecer: se quita al instante', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: true }));
        const ctx = bot();
        const fx = efecto(ctx);
        clearRoutine(ctx, true);
        expect(fx.isConnected).toBe(false);
      });

      it('las animaciones de lo que sale siguen vivas mientras se desvanece (el engrane no se rebobina)', () => {
        const ctx = bot();
        const fx = efecto(ctx);
        const giro = { cancel: vi.fn(), effect: { target: fx } };
        ctx.subAnims.push(giro as unknown as Animation);
        clearRoutine(ctx, true);
        expect(giro.cancel).not.toHaveBeenCalled();
      });

      it('lo que animaba un nodo SE SUELTA fundiéndose a su estilo base; la silueta y la pose se cortan como siempre', () => {
        const ctx = bot();
        const { calls } = stubAnimations();
        const suelta = { cancel: vi.fn(), effect: { target: ctx.el.dots } };
        const cortada = { cancel: vi.fn(), effect: { target: ctx.el.breath } };
        ctx.subAnims.push(suelta as unknown as Animation, cortada as unknown as Animation);
        clearRoutine(ctx, true);
        expect(suelta.cancel).toHaveBeenCalled();
        expect(calls).toContain(ctx.el.dots);
        expect(cortada.cancel).toHaveBeenCalled();
        expect(calls).not.toContain(ctx.el.breath);
      });

      it('una capa apagada por atributo (la nube de puntos, el spinner) se ve apagarse y queda en 0 desde ya', () => {
        const ctx = bot();
        const { calls } = stubAnimations();
        ctx.el.spinner.setAttribute('opacity', '1');
        clearRoutine(ctx, true);
        expect(ctx.el.spinner.getAttribute('opacity')).toBe('0');
        expect(calls).toContain(ctx.el.spinner);
      });

      it('la cara de un gesto se corta DURA aunque la rutina salga suave (dos caras a la vez se mezclan)', () => {
        const ctx = bot();
        expect(ctx.fe.faceFx).toBeTruthy();
        ctx.fe.faceFx?.appendChild(document.createElementNS(NS, 'g'));
        clearRoutine(ctx, true, false);
        expect(ctx.fe.faceFx?.childElementCount).toBe(0);
      });

      it('la cara de una rutina que cede a otra sale suave', () => {
        const ctx = bot();
        const g = document.createElementNS(NS, 'g');
        ctx.fe.faceFx?.appendChild(g);
        clearFace(ctx, true);
        expect(g.isConnected).toBe(true);
        vi.advanceTimersByTime(220);
        expect(g.isConnected).toBe(false);
      });
    });

    it('nextRoutine arranca una rutina ya y deja la siguiente programada a los 4.7 s', () => {
      const onRoutine = vi.fn();
      const ctx = bot({ onRoutine });
      setState(ctx, 'working');
      onRoutine.mockClear();
      nextRoutine(ctx);
      expect(onRoutine).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(4699);
      expect(onRoutine).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(1);
      expect(onRoutine).toHaveBeenCalledTimes(2);
    });
  });

  describe('act', () => {
    it('despierta al dormido y lo avisa', () => {
      const onWake = vi.fn();
      const ctx = bot({ onWake });
      setState(ctx, 'sleeping');
      act(ctx, 800);
      expect(ctx.state).toBe('idle');
      expect(onWake).toHaveBeenCalledTimes(1);
    });

    it('trabajando pausa la rutina y la retoma REANUDA_MS (150 ms) después de lo que dure el gesto', () => {
      const labels: string[] = [];
      const ctx = bot({ onRoutine: (_s, l) => l && labels.push(l) });
      setState(ctx, 'working');
      vi.advanceTimersByTime(1000);
      const n = labels.length;
      act(ctx, 1000);
      vi.advanceTimersByTime(1000 + REANUDA_MS - 1);
      expect(labels).toHaveLength(n);
      vi.advanceTimersByTime(1);
      expect(labels).toHaveLength(n + 1);
    });

    it('al reanudar repite la variante que estaba corriendo: el gesto la pausó, no la terminó', () => {
      const labels: string[] = [];
      const ctx = bot({ onRoutine: (_s, l) => l && labels.push(l) });
      ctx.fixedRoutine.working = 'thinking';
      setState(ctx, 'working');
      act(ctx, 500);
      vi.advanceTimersByTime(500 + REANUDA_MS);
      expect(labels).toHaveLength(2);
      expect(labels[0]).toMatch(/^thinking · /);
      expect(labels[1]).toBe(labels[0]);
    });

    it('en reposo solo corta los timers sueltos del gesto anterior', () => {
      const ctx = bot();
      const fn = vi.fn();
      ctx.subTimers.push(setTimeout(fn, 500));
      act(ctx, 100);
      vi.advanceTimersByTime(1000);
      expect(fn).not.toHaveBeenCalled();
      expect(ctx.subTimers).toEqual([]);
    });

    it('con `wander` deja un fidget programado para 4 s después del gesto', () => {
      const ctx = bot({ wander: true });
      act(ctx, 500);
      expect(ctx.subTimers.length).toBe(1);
    });

    it('installStateHooks conecta los gestos: hop() avisa a la máquina y despierta al dormido', () => {
      const ctx = bot();
      setState(ctx, 'sleeping');
      hop(ctx);
      expect(ctx.state).toBe('idle');
    });

    it('sin instalar los hooks, un gesto no toca el estado (el gancho es un no-op)', () => {
      const host = document.createElement('div');
      const ctx = createBotContext(host, { shape: mochiShape });
      setShape(ctx, ctx.shape);
      ctx.state = 'sleeping';
      hop(ctx);
      expect(ctx.state).toBe('sleeping');
    });
  });
});
