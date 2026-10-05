import { mochiSkin, mochiTuft } from '../data/mochi';
import { mochiShape } from '../shapes/mochi';
import { buildShape } from './build';
import { createBotContext, type BotContext, type GfBotOptions } from './context';
import { animateShape, collectOutlines, syncOutlineD, twinAnimation } from './outlines';
import { setPose } from './pose-motion';
import { loop, play } from './timing';

function built(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: mochiShape, ...opts });
  buildShape(ctx);
  return ctx;
}

/** jsdom no trae Web Animations: cada nodo recibe un `animate` propio y se anota qué se animó. */
interface Call {
  node: Element;
  frames: Keyframe[];
  options: KeyframeAnimationOptions;
  anim: { cancel: ReturnType<typeof vi.fn> };
}
function spyAnimate(nodes: Element[]): Call[] {
  const calls: Call[] = [];
  for (const node of nodes) {
    (node as unknown as { animate: unknown }).animate = (frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const anim = { cancel: vi.fn(), onfinish: null };
      calls.push({ node, frames, options, anim });
      return anim;
    };
  }
  return calls;
}

describe('glyphflow/bots · contornos de la silueta', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('convierte los <use> de la silueta en <path> con su propio d, y les copia origen y transición', () => {
    const ctx = built({ mochi: 'line' });
    expect(ctx.outlines.length).toBeGreaterThan(0);
    // `d` solo existe en <path>: un <use> no se podría animar. Y no queda ninguno apuntando a la silueta.
    expect(ctx.q(`use[href="#${ctx.id}-cs"]`)).toBeNull();
    for (const o of ctx.outlines) {
      expect(o.tagName.toLowerCase()).toBe('path');
      expect(o.getAttribute('d')).toBe(ctx.el.clip.getAttribute('d'));
      expect(o.hasAttribute('href')).toBe(false);
      expect(o.style.transformOrigin).toBe(ctx.el.clip.style.transformOrigin);
      expect(o.style.transition).toBe(ctx.el.clip.style.transition);
    }
  });

  it('el contorno conserva los atributos del <use> que reemplaza (trazo, relleno, filtro)', () => {
    const ctx = built({ mochi: 'line' });
    const over = ctx.q('.skinOver [data-gf-outline]')!;
    expect(over.getAttribute('stroke')).toBe('#2E2896');
    expect(over.getAttribute('stroke-width')).toBe('7');
    expect(over.getAttribute('fill')).toBe('none');
  });

  it('recolectar dos veces es idempotente', () => {
    const ctx = built({ mochi: 'line' });
    const antes = [...ctx.outlines];
    collectOutlines(ctx);
    expect(ctx.outlines).toEqual(antes);
  });

  it('syncOutlineD copia el d nuevo a todos (la ruta de Safari fija d a mano)', () => {
    const ctx = built({ mochi: 'line' });
    syncOutlineD(ctx, 'M0 0 L9 9 Z');
    for (const o of ctx.outlines) expect(o.getAttribute('d')).toBe('M0 0 L9 9 Z');
  });

  it('al cambiar de piel se recolectan los de la piel nueva, no los viejos', () => {
    const ctx = built({ mochi: 'line' });
    const viejos = [...ctx.outlines];
    ctx.mochiVar = 'neu';
    buildShape(ctx);
    expect(ctx.outlines.length).toBeGreaterThan(0);
    expect(ctx.outlines.some((o) => viejos.includes(o))).toBe(false);
    expect(ctx.outlines.every((o) => o.isConnected)).toBe(true);
  });

  it('la pose se copia al contorno: giran, se aplastan y se inclinan juntos', () => {
    const ctx = built({ mochi: 'line' });
    setPose(ctx, { roll: 20, pitch: 0.4 });
    const t = ctx.el.clip.style.transform;
    expect(t).toContain('rotate(20.00deg)');
    for (const o of ctx.outlines) expect(o.style.transform).toBe(t);
  });

  it('play sobre la silueta anima también cada contorno con los MISMOS fotogramas y opciones', () => {
    const ctx = built({ mochi: 'line' });
    const calls = spyAnimate([ctx.el.clip, ...ctx.outlines]);
    const frames: Keyframe[] = [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }];
    const opts = { duration: 600, easing: 'linear' };
    play(ctx, ctx.el.clip, frames, opts);
    const porNodo = (n: Element) => calls.filter((c) => c.node === n);
    expect(porNodo(ctx.el.clip).length).toBe(1);
    for (const o of ctx.outlines) {
      const [c] = porNodo(o);
      expect(c.frames).toBe(frames);
      expect(c.options).toEqual(opts);
    }
  });

  it('play sobre OTRO nodo no toca los contornos', () => {
    const ctx = built({ mochi: 'line' });
    const calls = spyAnimate([ctx.el.flip, ...ctx.outlines]);
    play(ctx, ctx.el.flip, [{ transform: 'none' }, { transform: 'none' }], { duration: 100 });
    expect(calls.filter((c) => c.node !== ctx.el.flip).length).toBe(0);
  });

  it('loop sobre la silueta también lo duplica, en bucle', () => {
    const ctx = built({ mochi: 'line' });
    const calls = spyAnimate([ctx.el.clip, ...ctx.outlines]);
    loop(ctx, ctx.el.clip, [{ transform: 'none' }, { transform: 'none' }], { duration: 300 });
    for (const o of ctx.outlines) {
      const [c] = calls.filter((x) => x.node === o);
      expect(c.options.iterations).toBe(Infinity);
    }
  });

  it('animateShape (la onda del borde, los tentáculos) anima `d` en la silueta y en los contornos', () => {
    const ctx = built({ mochi: 'line' });
    const calls = spyAnimate([ctx.el.clip, ...ctx.outlines]);
    const frames = [{ d: 'path("M0 0 L1 1")' }, { d: 'path("M0 0 L2 2")' }];
    animateShape(ctx, frames, { duration: 900, iterations: Infinity });
    expect(calls.length).toBe(1 + ctx.outlines.length);
    for (const c of calls) expect(c.frames).toBe(frames);
  });

  it('cancelar la animación de la silueta cancela las gemelas EN EL ACTO, sin esperar un fotograma', () => {
    const ctx = built({ mochi: 'line' });
    const calls = spyAnimate([ctx.el.clip, ...ctx.outlines]);
    const anim = animateShape(ctx, [{ d: 'path("M0 0")' }], { duration: 100 });
    const gemelas = calls.filter((c) => c.node !== ctx.el.clip);
    expect(gemelas.length).toBe(ctx.outlines.length);
    anim.cancel();
    for (const g of gemelas) expect(g.anim.cancel).toHaveBeenCalledTimes(1);
  });

  it('sin Web Animations en los contornos (jsdom, navegadores viejos) no truena', () => {
    const ctx = built({ mochi: 'line' });
    const animacionFalsa = { cancel: vi.fn() } as unknown as Animation;
    for (const o of ctx.outlines) (o as unknown as { animate?: unknown }).animate = undefined;
    expect(() => twinAnimation(ctx, animacionFalsa, [], {})).not.toThrow();
  });

  it('collectOutlines sin <use> deja la lista vacía', () => {
    const ctx = built({ mochi: 'flat' });
    ctx.outlines.forEach((o) => o.remove());
    collectOutlines(ctx);
    expect(ctx.outlines.length).toBe(0);
  });
});

describe('glyphflow/bots · piel Línea: cuerpo transparente', () => {
  it('no pinta relleno dentro de la silueta; solo el contorno por encima', () => {
    const s = mochiSkin('line', 'b1');
    expect(s.paint).toBe('');
    expect(s.back).toBe('');
    expect(s.over).toContain('stroke="#2E2896"');
    expect(s.over).toContain('fill="none"');
  });

  it('el copete es solo trazo, cortado donde nace del contorno del cuerpo', () => {
    const d = 'M78 60 C80 50 90 44 100 40 C110 44 120 50 122 60 Z';
    const t = mochiTuft('line', 'b1', d);
    expect(t).toContain('fill="none"');
    expect(t).toContain('clip-path="url(#b1-ltc)"');
    expect(t).toContain('<clipPath id="b1-ltc">');
    expect(t).not.toContain('#E7E8F8');
  });

  it('el pie del Tofu no deja relleno (solo el arco que lo dibuja)', () => {
    expect(mochiTuft('line', 'b1', 'M0 0', true)).toBe('');
  });
});
