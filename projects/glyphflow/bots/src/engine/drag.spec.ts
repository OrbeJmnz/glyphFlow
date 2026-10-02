import { mochiShape } from '../shapes/mochi';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { beginDrag, dragTo, enableTouch, endDrag, gooP, gooShape, gooT, hcOf, soft, T } from './drag';
import { installKawaiiHooks } from './kawaii';
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

const pointer = (type: string, x: number, y: number): Event => {
  const e = new MouseEvent(type, { bubbles: true, clientX: x, clientY: y });
  Object.assign(e, { pointerId: 1 });
  return e;
};

describe('glyphflow/bots · arrastre gomoso', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    svgProto['getScreenCTM'] = () => null;
    proto['animate'] = function (this: Element, frames: Keyframe[]) {
      return { cancel: vi.fn(), onfinish: null, effect: { target: this, getKeyframes: () => frames } };
    };
    proto['getAnimations'] = () => [];
    proto['getBoundingClientRect'] = () => ({ left: 0, top: 0, width: 200, height: 212, right: 200, bottom: 212, x: 0, y: 0 });
    proto['setPointerCapture'] = () => undefined;
    vi.stubGlobal('requestAnimationFrame', () => 1);
    vi.stubGlobal('cancelAnimationFrame', () => undefined);
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    for (const k of ['animate', 'getAnimations', 'getBoundingClientRect', 'setPointerCapture']) Reflect.deleteProperty(proto, k);
    Reflect.deleteProperty(svgProto, 'getScreenCTM');
    document.body.innerHTML = '';
  });

  describe('matemática de la liga', () => {
    it('soft cede mucho al inicio y se topa en el límite', () => {
      expect(soft(bot(), 0, 40, 100)).toBe(0);
      expect(soft(bot(), 10, 40, 100)).toBeCloseTo(3.98, 1);
      expect(soft(bot(), 1e6, 40, 100)).toBeCloseTo(40);
      expect(soft(bot(), -1e6, 40, 100)).toBeCloseTo(-40);
    });

    it('hcOf mide de los pies al centro del cuerpo', () => {
      expect(hcOf(bot())).toBe(172 - mochiShape.cy);
    });

    it('T es una sola receta de transformación; en reposo, la identidad', () => {
      const ctx = bot();
      expect(T(ctx)).toBe(`translate(0.00px,0.00px) translateY(${(-hcOf(ctx)).toFixed(2)}px) rotate(0.00deg) translateY(${hcOf(ctx).toFixed(2)}px) rotate(0.00deg) skewX(0.00deg) scale(1.000,1.000)`);
      expect(T(ctx, { x: 5, rot: 90 })).toContain('translate(5.00px,0.00px)');
      expect(T(ctx, { x: 5, rot: 90 })).toContain('rotate(90.00deg)');
    });

    it('gooShape en reposo no deforma; jalar hacia arriba estira y hacia abajo aplasta', () => {
      const ctx = bot();
      const reposo = gooShape(ctx, { x: 0, y: 0, vx: 0, vy: 0 });
      expect(reposo.sy).toBeCloseTo(1);
      expect(reposo.shear).toBeCloseTo(0);
      expect(gooShape(ctx, { x: 0, y: -80, vx: 0, vy: 0 }).sy).toBeGreaterThan(1.2);
      expect(gooShape(ctx, { x: 0, y: 80, vx: 0, vy: 0 }).sy).toBeLessThan(0.85);
      expect(gooShape(ctx, { x: 60, y: 0, vx: 0, vy: 0 }).shear).toBeGreaterThan(10);
      expect(gooShape(ctx, { x: 0, y: 0, vx: 0, vy: 0 }, 0.14).sy).toBeCloseTo(0.86); // derretido
    });

    it('gooP y gooT escalan la deformación con v', () => {
      const ctx = bot();
      const d = gooShape(ctx, { x: 40, y: -40, vx: 0, vy: 0 });
      expect(gooP(ctx, d, 0)).toEqual({ x: 0, lean: 0, sk: -0, sx: 1, sy: 1 });
      expect(gooP(ctx, d, 1).sy).toBeCloseTo(d.sy);
      expect(gooT(ctx, d, 0)).toBe(T(ctx));
    });
  });

  describe('agarrar y soltar', () => {
    it('beginDrag lo despierta, corta la rutina, cancela el salto y pone cara de sorpresa', () => {
      const ctx = bot({ wander: true });
      setState(ctx, 'sleeping');
      const cancel = vi.fn();
      ctx.running.set(ctx.el.hop, { cancel } as unknown as Animation);
      beginDrag(ctx);
      expect(ctx.state).toBe('idle');
      expect(ctx.dragging).toBe(true);
      expect(ctx.drag).not.toBeNull();
      expect(cancel).toHaveBeenCalled();
      expect(ctx.svg.classList.contains('grabbing')).toBe(true);
      expect(ctx.svg.dataset['kface']).toBe('amazed');
      expect(ctx.kLockUntil).toBe(0);
    });

    it('dragTo apunta el resorte y gira la cabeza hacia donde jalas, con tope', () => {
      const ctx = bot();
      beginDrag(ctx);
      dragTo(ctx, 35, -35);
      expect(ctx.drag?.tgt).toEqual({ x: 35, y: -35 });
      expect(ctx.pose.yaw).toBeCloseTo(0.3);
      expect(ctx.pose.pitch).toBeCloseTo(-0.16);
      dragTo(ctx, 900, 900);
      expect(ctx.pose.yaw).toBeCloseTo(0.6);
      expect(ctx.pose.pitch).toBeCloseTo(0.32);
    });

    it('endDrag sin arrastre no hace nada', () => {
      const ctx = bot();
      expect(() => endDrag(ctx)).not.toThrow();
      expect(ctx.lastDragEnd).toBe(0);
    });

    it('al soltar limpia el arrastre, quita la clase y registra cuándo', () => {
      const ctx = bot();
      beginDrag(ctx);
      vi.advanceTimersByTime(500);
      endDrag(ctx);
      expect(ctx.dragging).toBe(false);
      expect(ctx.drag).toBeNull();
      expect(ctx.svg.classList.contains('grabbing')).toBe(false);
      expect(ctx.lastDragEnd).toBe(500);
      expect(ctx.el.hop.style.transform).toBe('');
      expect(ctx.svg.dataset['goo']).toBeDefined();
    });

    const CASOS: [string, (c: BotContext) => void][] = [
      ['spin', (c) => { c.drag!.turn = 7; }],
      ['shake', (c) => { c.drag!.flips = 5; }],
      ['splat', (c) => { c.drag!.d = { sy: 0.7, shear: 0, lean: 0, tx: 0, sx: 1.2 }; c.drag!.sag = 0.1; }],
      ['taffy', (c) => { c.drag!.held = 2; c.drag!.peak = 0.5; c.drag!.d = { sy: 1, shear: 5, lean: 0, tx: 0, sx: 1 }; }],
      ['flip', (c) => { c.drag!.d = { sy: 1.4, shear: 0, lean: 0, tx: 0, sx: 0.9 }; c.drag!.tgt = { x: 60, y: -60 }; }],
      ['sling', (c) => { c.drag!.d = { sy: 1.4, shear: 0, lean: 0, tx: 0, sx: 0.9 }; }],
      ['boing', (c) => { c.drag!.d = { sy: 0.7, shear: 0, lean: 0, tx: 0, sx: 1.2 }; }],
      ['whip', (c) => { c.drag!.d = { sy: 1, shear: 30, lean: 0, tx: 0, sx: 1 }; }],
      ['flick', (c) => { c.drag!.path = 30; }],
    ];
    for (const [kind, ajustar] of CASOS) {
      it(`lo que hizo el dedo decide la reacción: ${kind}`, () => {
        const ctx = bot({ wander: true });
        beginDrag(ctx);
        vi.advanceTimersByTime(kind === 'flick' ? 100 : 800);
        ajustar(ctx);
        endDrag(ctx);
        expect(ctx.svg.dataset['goo']).toBe(kind);
        vi.advanceTimersByTime(4000);
      });
    }

    it('sin nada especial elige entre gelatina y bamboleo', () => {
      const vistas = new Set<string>();
      for (const r of [0.2, 0.8]) {
        vi.spyOn(Math, 'random').mockReturnValue(r);
        const ctx = bot();
        beginDrag(ctx);
        vi.advanceTimersByTime(800);
        ctx.drag!.path = 200;
        endDrag(ctx);
        vistas.add(ctx.svg.dataset['goo'] ?? '');
      }
      expect([...vistas].sort()).toEqual(['jelly', 'wobble']);
    });

    it('girarlo elige una de cinco reacciones, o `force.spin`', () => {
      const ctx = bot({ wander: true });
      beginDrag(ctx);
      vi.advanceTimersByTime(800);
      ctx.drag!.turn = 7;
      ctx.force.spin = 'fall';
      endDrag(ctx);
      expect(ctx.svg.dataset['spin']).toBe('fall');
    });

    it('con muchas vueltas solo salen las más mareadas', () => {
      const vistas = new Set<string>();
      for (let i = 0; i < 8; i++) {
        vi.spyOn(Math, 'random').mockReturnValue(i / 8);
        const c = bot({ wander: true });
        beginDrag(c);
        vi.advanceTimersByTime(800);
        c.drag!.turn = 14;
        endDrag(c);
        vistas.add(c.svg.dataset['spin'] ?? '');
      }
      expect([...vistas].sort()).toEqual(['fall', 'stagger', 'stars']);
    });

    it('en reposo vuelve a respirar cuando termina la reacción', () => {
      const ctx = bot();
      beginDrag(ctx);
      vi.advanceTimersByTime(800);
      ctx.drag!.path = 200;
      endDrag(ctx);
      const antes = ctx.subAnims.length;
      vi.advanceTimersByTime(3000);
      expect(ctx.subAnims.length).toBeGreaterThanOrEqual(antes);
    });
  });

  describe('enableTouch', () => {
    const breath = (ctx: BotContext) => ctx.el.breath;

    it('un toque corto sin mover es un poke', () => {
      const ctx = bot();
      enableTouch(ctx);
      ctx.force.poke = 'boop';
      breath(ctx).dispatchEvent(pointer('pointerdown', 100, 112));
      breath(ctx).dispatchEvent(pointer('pointerup', 100, 112));
      expect(ctx.svg.dataset['poke']).toBe('boop');
      expect(ctx.dragging).toBe(false);
      expect(ctx.lastTouchAt).toBeGreaterThanOrEqual(0);
    });

    it('moverse más de 6 px arranca el arrastre y soltar lo termina', () => {
      const ctx = bot();
      enableTouch(ctx);
      breath(ctx).dispatchEvent(pointer('pointerdown', 100, 112));
      breath(ctx).dispatchEvent(pointer('pointermove', 103, 112));
      expect(ctx.dragging).toBe(false);
      breath(ctx).dispatchEvent(pointer('pointermove', 120, 112));
      expect(ctx.dragging).toBe(true);
      expect(ctx.drag?.tgt).toEqual({ x: 20, y: 0 });
      breath(ctx).dispatchEvent(pointer('pointerup', 120, 112));
      expect(ctx.dragging).toBe(false);
    });

    it('un arrastre no se convierte en poke al soltar', () => {
      const ctx = bot();
      enableTouch(ctx);
      breath(ctx).dispatchEvent(pointer('pointerdown', 100, 112));
      breath(ctx).dispatchEvent(pointer('pointermove', 140, 112));
      breath(ctx).dispatchEvent(pointer('pointerup', 140, 112));
      expect(ctx.svg.dataset['poke']).toBeUndefined();
      expect(ctx.pokes).toBe(0);
    });

    it('cancelar el puntero suelta sin hacer poke', () => {
      const ctx = bot();
      enableTouch(ctx);
      breath(ctx).dispatchEvent(pointer('pointerdown', 100, 112));
      breath(ctx).dispatchEvent(pointer('pointercancel', 100, 112));
      expect(ctx.svg.dataset['poke']).toBeUndefined();
      breath(ctx).dispatchEvent(pointer('pointermove', 160, 112));
      expect(ctx.dragging).toBe(false);
    });

    it('en pausa, o si no tocaste el cuerpo, no pasa nada', () => {
      const ctx = bot();
      enableTouch(ctx);
      ctx.paused = true;
      breath(ctx).dispatchEvent(pointer('pointerdown', 100, 112));
      breath(ctx).dispatchEvent(pointer('pointermove', 160, 112));
      expect(ctx.dragging).toBe(false);
      ctx.paused = false;
      ctx.el.shadow.dispatchEvent(pointer('pointerdown', 100, 112)); // la sombra no es el cuerpo
      ctx.el.shadow.dispatchEvent(pointer('pointermove', 160, 112));
      expect(ctx.dragging).toBe(false);
    });

    it('devuelve la función que quita los listeners', () => {
      const ctx = bot();
      const quitar = enableTouch(ctx);
      quitar();
      ctx.force.poke = 'boop';
      breath(ctx).dispatchEvent(pointer('pointerdown', 100, 112));
      breath(ctx).dispatchEvent(pointer('pointerup', 100, 112));
      expect(ctx.svg.dataset['poke']).toBeUndefined();
    });
  });
});
