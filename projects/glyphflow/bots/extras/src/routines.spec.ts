import { ROUTINES } from '../../src/data/routines';
import { ghostShape } from '../../src/shapes/ghost';
import { catShape } from '../../src/shapes/cat';
import { mochiShape } from '../../src/shapes/mochi';
import { nCloudShape } from '../../src/shapes/night';
import { octopusShape } from '../../src/shapes/octopus';
import { cubeShape } from '../../src/shapes/retired';
import { makeRobot } from '../../src/shapes/robot';
import { createBotContext, type BotContext, type GfBotOptions } from '../../src/engine/context';
import { FIDGETS, RUN as RUN_REPOSO } from '../../src/engine/routines';
import { routinesExtra } from './routines';
import { RUN as RUN_TRABAJO } from './routines-run';
import { setShape } from '../../src/engine/setters';
import { clearRoutine, installStateHooks, setState } from '../../src/engine/state';
import { WORK as WORK_EXTRA } from './work-variants';
import { AGENT_RUN, AGENT_WORK } from '../../src/engine/agent-routines';
import type { GfBotWorkRoutine } from '../../src/data/routines';

const RUN = { ...RUN_REPOSO, ...RUN_TRABAJO, ...AGENT_RUN };
const WORK = { ...WORK_EXTRA, ...AGENT_WORK } as Record<GfBotWorkRoutine, [string, (ctx: BotContext) => void][]>;

// Estos tests recorren las formas y los estados enteros en un solo caso: en una máquina cargada (o con
// toda la suite en paralelo) rozan los 5 s de Vitest. No es lentitud del motor, es el volumen que cubren.
vi.setConfig({ testTimeout: 30_000 });

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
  const ctx = createBotContext(host, { shape: mochiShape, extras: { routines: routinesExtra }, ...opts });
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
