import { ghostShape } from '../shapes/ghost';
import { catShape } from '../shapes/cat';
import { mochiShape } from '../shapes/mochi';
import { cubeShape } from '../shapes/retired';
import { makeRobot } from '../shapes/robot';
import {
  antenna, antTip, antWiggle, breathe, cloudBubble, flushCheeks, gearPath, glow, headTop, holdEyes, isRobot,
  miniHop, mk, mood, nod, pick, popIn, puff, shadowFor, showFor, slow, spark, SPARK_COLORS, spawnZ, squint,
  startle, starPath, stopLoops, tremble, typing,
} from './actions';
import { buildShape } from './build';
import { createBotContext, type BotContext, type GfBotCue, type GfBotOptions } from './context';

const proto = Element.prototype as unknown as Record<string, unknown>;
interface Call {
  node: Element;
  frames: Keyframe[];
  options: KeyframeAnimationOptions;
  anim: { cancel: ReturnType<typeof vi.fn>; onfinish: (() => void) | null };
}
function stubAnimations(): Call[] {
  const calls: Call[] = [];
  proto['animate'] = function (this: Element, frames: Keyframe[], options: KeyframeAnimationOptions) {
    const anim = { cancel: vi.fn(), onfinish: null as (() => void) | null, effect: { target: this, getKeyframes: () => frames } };
    calls.push({ node: this, frames, options, anim });
    return anim;
  };
  proto['getAnimations'] = () => [];
  return calls;
}

function bot(opts: Partial<GfBotOptions> = {}): { ctx: BotContext; cues: GfBotCue[] } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, ...opts });
  const cues: GfBotCue[] = [];
  ctx.hooks.cue = (c) => cues.push(c);
  buildShape(ctx);
  return { ctx, cues };
}

describe('glyphflow/bots · vocabulario de acciones', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    Reflect.deleteProperty(proto, 'animate');
    Reflect.deleteProperty(proto, 'getAnimations');
    document.body.innerHTML = '';
  });

  describe('puros', () => {
    it('pick elige un elemento y respeta el azar', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.99);
      expect(pick(['a', 'b', 'c'])).toBe('c');
      vi.spyOn(Math, 'random').mockReturnValue(0);
      expect(pick(['a', 'b', 'c'])).toBe('a');
    });

    it('starPath dibuja una estrella de 4 puntas cerrada alrededor de (x, y)', () => {
      const d = starPath(10, 20, 5);
      expect(d.startsWith('M10 15 ')).toBe(true);
      expect(d.endsWith('Z')).toBe(true);
      expect((d.match(/L/g) ?? []).length).toBe(7);
    });

    it('gearPath dibuja n dientes con 4 puntos cada uno', () => {
      const d = gearPath(0, 0, 5, 8);
      expect(d.startsWith('M')).toBe(true);
      expect((d.match(/L/g) ?? []).length).toBe(8 * 4 - 1);
      expect(d.endsWith('Z')).toBe(true);
    });

    it('SPARK_COLORS trae cinco colores', () => {
      expect(SPARK_COLORS).toHaveLength(5);
    });
  });

  describe('con el bot', () => {
    it('slow alarga los saltos 1.8 veces con movimiento reducido', () => {
      expect(slow(bot().ctx)).toBe(1);
      vi.stubGlobal('matchMedia', () => ({ matches: true }));
      expect(slow(bot().ctx)).toBe(1.8);
    });

    it('mk crea un elemento SVG con sus atributos, lo cuelga y le pone HTML interno', () => {
      const { ctx } = bot();
      const n = mk(ctx, 'rect', { x: 3, class: 'caja' }, ctx.el.world, '<title>t</title>');
      expect(n.namespaceURI).toBe('http://www.w3.org/2000/svg');
      expect(n.getAttribute('x')).toBe('3');
      expect(n.parentElement).toBe(ctx.el.world);
      expect(n.innerHTML).toContain('title');
      expect(mk(ctx, 'g', {}).parentElement).toBe(ctx.el.z); // por defecto, la capa z
    });

    it('headTop: la coronilla de cada forma, y el robot la sube 26', () => {
      const medir = (shape: GfBotOptions['shape']) => headTop(bot({ shape }).ctx);
      expect(medir(mochiShape)).toBe(mochiShape.top);
      expect(medir(ghostShape)).toBe(48);
      expect(medir(catShape)).toBe(48);
      expect(medir(makeRobot(cubeShape))).toBe((cubeShape.top ?? 0) - 26);
    });

    it('isRobot solo es cierto con la piel del robot', () => {
      expect(isRobot(bot().ctx)).toBe(false);
      expect(isRobot(bot({ shape: makeRobot(cubeShape) }).ctx)).toBe(true);
    });

    it('popIn aparece con resorte desde el 40%', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      const n = mk(ctx, 'g', {});
      popIn(ctx, n, 10, 20);
      expect(n.style.transformOrigin).toBe('10px 20px');
      expect(calls[0].frames[0]).toEqual({ transform: 'scale(0.4,0.4)', opacity: 0 });
      expect(calls[0].options.duration).toBe(ctx.spring.duration);
    });

    it('spawnZ suelta una «z» que sube y desaparece al terminar', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      spawnZ(ctx);
      const z = ctx.el.z.querySelector('text.zz');
      expect(z?.textContent).toBe('z');
      calls[0].anim.onfinish?.();
      expect(ctx.el.z.querySelector('text.zz')).toBeNull();
    });

    it('spark sale de la cabeza, tiñe la luz salvo en ráfaga y se borra al terminar', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      spark(ctx, 50);
      expect(ctx.el.z.querySelectorAll('path').length).toBe(1);
      expect(ctx.svg.style.getPropertyValue('--rt')).not.toBe('');
      expect(calls.some((c) => c.node === ctx.el.L.rt)).toBe(true);
      calls[0].anim.onfinish?.();
      expect(ctx.el.z.querySelectorAll('path').length).toBe(0);
      ctx.svg.style.removeProperty('--rt');
      spark(ctx, 50, true);
      expect(ctx.svg.style.getPropertyValue('--rt')).toBe('');
    });

    it('spark acepta colores y centro propios', () => {
      const { ctx } = bot();
      stubAnimations();
      spark(ctx, 50, false, ['#123456'], 160);
      expect(ctx.el.z.querySelector('path')?.getAttribute('fill')).toBe('#123456');
    });

    it('cloudBubble monta las burbujas y la nube, que aparecen escalonadas', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      const nube = cloudBubble(ctx, 60, 150, 40);
      expect(nube.children.length).toBe(3);
      expect(calls.map((c) => c.options.delay)).toEqual([0, 150, 300]);
    });

    it('startle abre los ojos de golpe y los vuelve a cerrar', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      startle(ctx, 700, 1.2);
      expect(calls.filter((c) => ctx.fe.closed.includes(c.node as SVGElement))).toHaveLength(2);
      expect(calls.filter((c) => ctx.fe.eyeList.includes(c.node as SVGElement))).toHaveLength(2);
    });

    it('breathe y squint dejan bucles en subAnims; stopLoops los corta salvo la respiración', () => {
      const { ctx } = bot();
      stubAnimations();
      breathe(ctx, [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }], 1000);
      squint(ctx, 0.8);
      expect(ctx.subAnims).toHaveLength(1 + ctx.fe.eyeList.length);
      stopLoops(ctx);
      const vivas = ctx.subAnims.filter((a) => !(a.cancel as unknown as ReturnType<typeof vi.fn>).mock.calls.length);
      expect(vivas).toHaveLength(1);
      expect((vivas[0].effect as KeyframeEffect).target).toBe(ctx.el.breath);
    });

    it('typing arranca los tres puntos, la mirada que lee y la luz de pantalla', () => {
      const { ctx } = bot();
      stubAnimations();
      typing(ctx, 2);
      expect(ctx.el.dots.getAttribute('opacity')).toBe('1');
      expect(ctx.pose.pitch).toBeCloseTo(0.12);
      expect(ctx.svg.style.getPropertyValue('--rb')).toBe('#86E9FF');
    });

    it('nod asiente desde la pose actual', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      nod(ctx, 0.2, 400);
      expect(calls.length).toBeGreaterThan(0);
    });

    it('shadowFor deriva de la escala de la sombra la altura: luz, reflejo y brillo', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      shadowFor(ctx, [{ transform: 'scale(1)' }, { transform: 'scale(0.5)', offset: 0.5 }, { transform: 'scale(1)' }], 600);
      const luces = [ctx.el.shadow, ctx.el.L.lift, ctx.el.L.key, ctx.el.L.gloss];
      expect(calls.map((c) => c.node)).toEqual(luces);
      const lift = calls[1].frames;
      expect(lift[1]['opacity']).toBeCloseTo(0.16); // up = 0.5 → 0.5 * .32
      expect(calls[2].frames[1]['transform']).toBe('translateY(8.00px)'); // up * 16
    });

    it('miniHop salta y mueve la sombra', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      miniHop(ctx, 18);
      expect(calls[0].node).toBe(ctx.el.hop);
      expect(calls[0].frames[2]['transform']).toContain('translateY(-18px)');
      expect(calls.some((c) => c.node === ctx.el.shadow)).toBe(true);
    });

    it('showFor muestra piezas con entrada y salida suaves y avisa a kawaii', () => {
      const { ctx, cues } = bot();
      const calls = stubAnimations();
      showFor(ctx, ctx.fe.browA, 1000);
      expect(calls).toHaveLength(2);
      expect(calls[0].frames).toEqual([{ opacity: 0 }, { opacity: 1, offset: 0.14 }, { opacity: 1, offset: 0.86 }, { opacity: 0 }]);
      expect(cues).toEqual([{ show: true, ms: 1000 }]);
    });

    it('holdEyes sostiene la forma de ojo y avisa si es muy abierta o muy cerrada', () => {
      const { ctx, cues } = bot();
      stubAnimations();
      holdEyes(ctx, 'scale(1.3,1.36)', 1000);
      holdEyes(ctx, 'scale(1,0.5)', 1000);
      holdEyes(ctx, 'scale(1,1)', 1000, [0]);
      expect(cues.map((c) => c.eye ?? null)).toEqual(['wide', 'narrow', null]);
    });

    it('mood tiñe el cuerpo; glow es mood con un pico suave', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      mood(ctx, '#f00', [{ opacity: 0 }, { opacity: 0.3 }], 800);
      expect(ctx.svg.style.getPropertyValue('--mood')).toBe('#f00');
      expect(calls.some((c) => c.node === ctx.el.L.mood)).toBe(true);
      glow(ctx, '#0f0', 0.5, 1000);
      expect(ctx.svg.style.getPropertyValue('--mood')).toBe('#0f0');
      expect(calls.at(-1)?.frames.map((f) => f['opacity'])).toEqual([0, 0.5, 0.4, 0]);
    });

    it('con el gato, cualquier emoción agita la cola', () => {
      const { ctx } = bot({ shape: catShape });
      const calls = stubAnimations();
      mood(ctx, '#f00', [{ opacity: 0 }, { opacity: 0.3 }], 800);
      expect(calls.some((c) => (c.node as Element).classList.contains('gtw') && c.options.composite === 'add')).toBe(true);
    });

    it('tremble termina en reposo exacto y puff se limpia solo', () => {
      const { ctx } = bot();
      const calls = stubAnimations();
      tremble(ctx, 450, 2);
      expect(calls[0].frames.at(-1)?.['transform']).toBe('translate(0px,0px)');
      expect(calls[0].frames).toHaveLength(11);
      puff(ctx, 62, 40);
      calls.at(-1)?.anim.onfinish?.();
      expect(ctx.el.z.querySelectorAll('.puff')).toHaveLength(0);
    });

    it('antenas y mejillas: antenna/antWiggle/antTip animan las del robot, flushCheeks las mejillas', () => {
      const { ctx } = bot({ shape: makeRobot(cubeShape) });
      const calls = stubAnimations();
      antenna(ctx, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(10deg)' }], 500);
      expect(calls.filter((c) => ctx.fe.ants.includes(c.node as SVGElement)).length).toBe(ctx.fe.ants.length);
      antWiggle(ctx, 800);
      antTip(ctx, 500);
      expect(ctx.fe.ants.length).toBeGreaterThan(0);
      expect(ctx.fe.antTips.length).toBeGreaterThan(0);
      const m = bot();
      const c2 = stubAnimations();
      flushCheeks(m.ctx, 500);
      expect(c2.length).toBe(m.ctx.fe.cheeks.length);
    });
  });
});
