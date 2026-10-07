import { TOYS } from './toys-data';
import { ghostShape } from '../../src/shapes/ghost';
import { mochiShape } from '../../src/shapes/mochi';
import { octopusShape } from '../../src/shapes/octopus';
import { createBotContext, type BotContext, type GfBotOptions } from '../../src/engine/context';
import { installKawaiiHooks } from '../../src/engine/kawaii';
import { setShape } from '../../src/engine/setters';
import { installStateHooks, setState } from '../../src/engine/state';
import { lookAtPt, toy, toyAt, toyClear } from './toys';

// Estos tests recorren las formas y los estados enteros en un solo caso: en una máquina cargada (o con
// toda la suite en paralelo) rozan los 5 s de Vitest. No es lentitud del motor, es el volumen que cubren.
const jugar = (ctx: BotContext, kind: string, x: number, y: number): void => toy(ctx, kind, x, y, TOYS);

vi.setConfig({ testTimeout: 30_000 });

const proto = Element.prototype as unknown as Record<string, unknown>;
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;
const svgSvgProto = SVGSVGElement.prototype as unknown as Record<string, unknown>;

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

describe('glyphflow/bots · juguetes', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    svgProto['getScreenCTM'] = () => null;
    // el cuerpo ocupa un recuadro fijo: lo de dentro «cae encima», lo de fuera «cae junto»
    svgProto['isPointInFill'] = (p: { x: number; y: number }) => Math.abs(p.x - 100) < 56 && p.y > 60 && p.y < 170;
    svgSvgProto['createSVGPoint'] = () => ({ x: 0, y: 0 });
    proto['animate'] = function (this: Element, frames: Keyframe[], options?: KeyframeAnimationOptions) {
      const anim = { cancel: vi.fn(), onfinish: null as (() => void) | null, effect: { target: this, getKeyframes: () => frames } };
      setTimeout(() => anim.onfinish?.(), Number(options?.duration ?? 0)); // el fundido termina y retira el nodo
      return anim;
    };
    proto['getAnimations'] = () => [];
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    Reflect.deleteProperty(svgProto, 'getScreenCTM');
    Reflect.deleteProperty(svgProto, 'isPointInFill');
    Reflect.deleteProperty(svgSvgProto, 'createSVGPoint');
    document.body.innerHTML = '';
  });

  const KINDS = Object.keys(TOYS);

  it('hay tres juguetes con cuatro variantes cada uno', () => {
    expect(KINDS).toEqual(['star', 'ball', 'cookie']);
  });

  it('un juguete desconocido, en pausa o con el bot en arrastre, se ignora', () => {
    const ctx = bot();
    jugar(ctx, 'nada', 100, 100);
    expect(ctx.el.toys.childElementCount).toBe(0);
    ctx.paused = true;
    jugar(ctx, 'ball', 40, 150);
    expect(ctx.el.toys.childElementCount).toBe(0);
    ctx.paused = false;
    ctx.dragging = true;
    jugar(ctx, 'ball', 40, 150);
    expect(ctx.el.toys.childElementCount).toBe(0);
  });

  it('las claves heredadas de Object no son juguetes', () => {
    const ctx = bot();
    jugar(ctx, 'constructor', 40, 150);
    jugar(ctx, 'toString', 40, 150);
    expect(ctx.el.toys.childElementCount).toBe(0);
  });

  for (const kind of KINDS) {
    it(`${kind}: cae junto o encima según dónde lo sueltes y lo anota`, () => {
      const junto = bot();
      jugar(junto, kind, 30, 150);
      expect(junto.svg.dataset['toy']).toMatch(new RegExp(`^${kind}·.+·beside$`));
      const encima = bot();
      jugar(encima, kind, 100, 50);
      expect(encima.svg.dataset['toy']).toMatch(new RegExp(`^${kind}·.+·onTop$`));
      expect(junto.el.toys.querySelector('.toy')).not.toBeNull();
    });

    it(`${kind}: reparte sus cuatro variantes en orden y avisa la etiqueta`, () => {
      const labels: (string | null)[] = [];
      const ctx = bot({ onRoutine: (_s, l) => labels.push(l) });
      for (let i = 0; i < 5; i++) {
        jugar(ctx, kind, 30, 150);
        vi.advanceTimersByTime(12000);
      }
      const con = labels.filter((l): l is string => l !== null && l.startsWith(TOYS[kind as keyof typeof TOYS].label.toLowerCase()));
      expect(con).toHaveLength(5);
      expect(new Set(con.slice(0, 4)).size).toBe(4);
      expect(con[4]).toBe(con[0]); // da la vuelta
      expect(labels.filter((l) => l === null)).toHaveLength(5); // cada una avisa al terminar
    });

    for (const [forma, shape] of [['mochi', mochiShape], ['ghost', ghostShape], ['octopus', octopusShape]] as const) {
      it(`${kind} en ${forma}: las cuatro variantes corren enteras sin tronar y limpian el escenario`, () => {
        const ctx = bot({ shape, wander: true });
        for (let i = 0; i < 4; i++) {
          jugar(ctx, kind, i % 2 ? 100 : 40, i % 2 ? 50 : 150);
          vi.advanceTimersByTime(12000);
        }
        expect(ctx.el.toys.querySelector('.toy')).toBeNull();
      });
    }
  }

  it('un juguete nuevo quita al anterior y cancela sus timers', () => {
    const ctx = bot();
    jugar(ctx, 'ball', 30, 150);
    const primero = ctx.el.toys.querySelector('.toy');
    expect(ctx.toyTimers.length).toBeGreaterThan(0);
    jugar(ctx, 'star', 30, 150);
    vi.advanceTimersByTime(200);
    expect(ctx.el.toys.contains(primero)).toBe(false);
  });

  it('toyClear funde y retira los objetos y vacía los timers', () => {
    const ctx = bot();
    jugar(ctx, 'cookie', 30, 150);
    toyClear(ctx);
    expect(ctx.toyTimers).toEqual([]);
  });

  it('toyAt no ejecuta si se pausó o lo están arrastrando', () => {
    const ctx = bot();
    const fn = vi.fn();
    toyAt(ctx, fn, 100);
    ctx.paused = true;
    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
    const g = vi.fn();
    ctx.paused = false;
    toyAt(ctx, g, 100);
    ctx.dragging = true;
    vi.advanceTimersByTime(100);
    expect(g).not.toHaveBeenCalled();
  });

  it('lookAtPt gira la cabeza hacia el punto, con tope', () => {
    const ctx = bot();
    lookAtPt(ctx, 170, 112);
    expect(ctx.pose.yaw).toBeCloseTo(0.55);
    lookAtPt(ctx, 1000, 1000);
    expect(ctx.pose.yaw).toBeCloseTo(0.55);
    expect(ctx.pose.pitch).toBeCloseTo(0.3);
  });

  it('el objeto se limita al área visible', () => {
    const ctx = bot();
    jugar(ctx, 'ball', 9999, 9999);
    expect(ctx.el.toys.querySelector('.toy')).not.toBeNull();
  });
});
