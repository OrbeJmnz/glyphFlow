import { ROUTINES } from '../data/routines';
import { ghostShape } from '../shapes/ghost';
import { catShape } from '../shapes/cat';
import { mochiShape } from '../shapes/mochi';
import { nCloudShape } from '../shapes/night';
import { octopusShape } from '../shapes/octopus';
import { cubeShape } from '../shapes/retired';
import { makeRobot } from '../shapes/robot';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { FIDGETS, RUN } from './routines';
import { setShape } from './setters';
import { clearRoutine, installStateHooks, setState } from './state';
import { WORK } from './work-variants';

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
  setShape(ctx, ctx.shape);
  setState(ctx, 'idle');
  ctx.ready = true;
  return ctx;
}

const FORMAS = [mochiShape, ghostShape, catShape, octopusShape, nCloudShape, makeRobot(cubeShape)];

describe('glyphflow/bots · rutinas', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // jsdom no mide el SVG: sin CTM la física del sombrero y de la nube no hace nada
    svgProto['getScreenCTM'] = () => null;
    stubAnimations();
  });
  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    Reflect.deleteProperty(svgProto, 'getScreenCTM');
    document.body.innerHTML = '';
  });

  it('hay una rutina por cada nombre de ROUTINES, más la de reposo', () => {
    expect(Object.keys(RUN).sort()).toEqual(['idle', ...ROUTINES.working, ...ROUTINES.sleeping].sort());
    for (const fn of Object.values(RUN)) expect(typeof fn).toBe('function');
  });

  it('el trabajo trae 4 variantes por rutina, con etiquetas únicas y la primera es la rutina base', () => {
    expect(Object.keys(WORK).sort()).toEqual([...ROUTINES.working].sort());
    const etiquetas = new Set<string>();
    for (const [rutina, variantes] of Object.entries(WORK)) {
      expect(variantes, rutina).toHaveLength(4);
      for (const [etiqueta, fn] of variantes) {
        expect(typeof fn).toBe('function');
        expect(etiquetas.has(etiqueta), etiqueta).toBe(false);
        etiquetas.add(etiqueta);
      }
    }
    expect(etiquetas.size).toBe(24);
    expect(WORK.typing.map(([l]) => l)).toEqual(['tapping', 'rushing', 'fixing', 'sending']);
  });

  it('los fidgets de reposo son cinco y todos corren sin tronar', () => {
    expect(Object.keys(FIDGETS)).toEqual(['lookSide', 'lookUp', 'stretch', 'sway', 'wink']);
    const ctx = bot();
    for (const fn of Object.values(FIDGETS)) {
      expect(() => fn(ctx)).not.toThrow();
      vi.advanceTimersByTime(3000);
    }
  });

  for (const shape of FORMAS) {
    it(`${shape.id}: las rutinas de reposo, trabajo y sueño corren enteras sin tronar`, () => {
      const ctx = bot({ shape });
      for (const name of Object.keys(RUN) as (keyof typeof RUN)[]) {
        clearRoutine(ctx);
        expect(() => RUN[name](ctx), name).not.toThrow();
        vi.advanceTimersByTime(5000);
      }
    });

    it(`${shape.id}: cada variante de trabajo corre entera sin tronar`, () => {
      const ctx = bot({ shape });
      for (const variantes of Object.values(WORK)) {
        for (const [etiqueta, fn] of variantes) {
          clearRoutine(ctx);
          expect(() => fn(ctx), etiqueta).not.toThrow();
          vi.advanceTimersByTime(5000);
        }
      }
    }, 20_000); // recorre ~30 variantes con 5 s virtuales cada una: ronda los 5 s reales con la CPU ocupada
  }

  it('al limpiar la rutina no queda ningún timer suelto de la anterior', () => {
    const ctx = bot();
    const base = vi.getTimerCount();
    RUN.planning(ctx);
    expect(ctx.subTimers.length).toBeGreaterThan(0);
    expect(vi.getTimerCount()).toBeGreaterThan(base);
    clearRoutine(ctx);
    expect(ctx.subTimers).toEqual([]);
    expect(vi.getTimerCount()).toBe(base);
  });

  it('creating arranca un intervalo de chispas y el ¡ta-da! lo detiene', () => {
    const ctx = bot();
    RUN.creating(ctx);
    expect(ctx.zTimer).not.toBeNull();
    vi.advanceTimersByTime(3500);
    expect(ctx.zTimer).toBeNull();
  });
});
