import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createBot, ghostShape, gfBotKit } from 'glyphflow/bots';
import { physicalGestures } from './public-api';

const { motion } = gfBotKit;

/** Cuánto se mueve un gesto: 1 = como está escrito, 0 = reposo, 2 = el doble. */
describe('intensity · frameAt (puro)', () => {
  const def = { score: motion.key(0.5, { x: 10, y: -40, roll: 90, sx: 1.4, sy: 0.6, spread: 0.2, drag: 6, gel: 3 }) };
  const tr = motion.tracksOf(def.score);
  const medio = (I: number) => motion.frameAt(def, tr, 0.5, 1, I);

  it('1 es el gesto tal como está escrito', () => {
    const f = medio(1);
    expect(f.y).toBeCloseTo(-40, 6);
    expect(f.x).toBeCloseTo(10, 6);
    expect(f.hopX).toBeCloseTo(1.4, 6);
    expect(f.spread).toBeCloseTo(0.2, 6);
  });

  it('0 es el reposo: nada se separa de él, salvo los giros', () => {
    const f = medio(0);
    expect(f.x).toBeCloseTo(0, 9);
    expect(f.y).toBeCloseTo(0, 9);
    expect(f.hopX).toBeCloseTo(1, 9);
    expect(f.hopY).toBeCloseTo(1, 9);
    expect(f.spread).toBeCloseTo(0, 9);
    expect(f.drag).toBeCloseTo(0, 9);
    expect(f.gel).toBeCloseTo(0, 9);
    expect(f.roll).toBeCloseTo(90, 6); // un giro es un giro
  });

  it('0.5 es la mitad del recorrido y de la deformación; 2 es el doble', () => {
    expect(medio(0.5).y).toBeCloseTo(-20, 6);
    expect(medio(0.5).hopX - 1).toBeCloseTo(0.2, 6);
    expect(medio(2).y).toBeCloseTo(-80, 6);
    expect(medio(2).gel).toBeCloseTo(6, 6);
  });

  it('los giros no se escalan con ninguna intensidad', () => {
    for (const I of [0, 0.3, 1, 2]) expect(medio(I).roll).toBeCloseTo(90, 6);
  });
});

describe('intensity · de punta a punta con el motor', () => {
  const animate = Element.prototype.animate;
  const getAnimations = Element.prototype.getAnimations;
  /** Cada animación del contenedor `.hop` deja sus keyframes aquí. */
  let hops: Keyframe[][];
  beforeEach(() => {
    vi.useFakeTimers();
    hops = [];
    Element.prototype.animate = vi.fn(function (this: Element, frames: Keyframe[]) {
      if ((this as Element).classList?.contains('hop')) hops.push(frames);
      return { cancel: () => undefined, finish: () => undefined, commitStyles: () => undefined, finished: Promise.resolve(), currentTime: 0, effect: null, addEventListener: () => undefined, onfinish: null };
    }) as never;
    Element.prototype.getAnimations = (() => []) as never;
  });
  afterEach(() => {
    vi.useRealTimers();
    Element.prototype.animate = animate;
    Element.prototype.getAnimations = getAnimations;
  });

  /** La altura máxima del salto (unidades) en la última animación del contenedor `.hop`. */
  const altura = (): number => {
    const frames = hops.at(-1);
    if (!frames?.length) throw new Error('no se capturó ninguna animación de .hop');
    return Math.max(...frames.map((f) => Math.abs(Number(/translate\([^,]+,\s*(-?[\d.]+)px/.exec(String(f['transform']))?.[1] ?? 0))));
  };
  const nuevo = (opts: { intensity?: number } = {}) => {
    const host = document.createElement('div');
    document.body.append(host);
    return { bot: createBot(host, { shape: ghostShape, wander: false, gestures: physicalGestures, ...opts }), host };
  };

  it('por llamada: la mitad de intensidad salta la mitad, y 0 no se despega', () => {
    const { bot, host } = nuevo();
    bot.gesture('superBounce', { intensity: 1 });
    const completo = altura();
    expect(completo).toBeGreaterThan(5);
    bot.gesture('superBounce', { intensity: 0.5 });
    expect(altura()).toBeCloseTo(completo / 2, 0);
    bot.gesture('superBounce', { intensity: 0 });
    expect(altura()).toBeLessThan(0.5);
    host.remove();
  });

  it('por bot: la intensity del bot es el valor por defecto, y la llamada lo pisa', () => {
    const { bot, host } = nuevo({ intensity: 0.5 });
    bot.gesture('superBounce');
    const porBot = altura();
    bot.gesture('superBounce', { intensity: 1 });
    expect(altura()).toBeGreaterThan(porBot * 1.8);
    host.remove();
  });

  it('se acota a 0–2 y un valor que no es número vale 1', () => {
    const { bot, host } = nuevo();
    bot.gesture('superBounce', { intensity: 1 });
    const uno = altura();
    bot.gesture('superBounce', { intensity: 9 });
    expect(altura()).toBeCloseTo(uno * 2, 0);
    bot.gesture('superBounce', { intensity: -3 });
    expect(altura()).toBeLessThan(0.5);
    bot.gesture('superBounce', { intensity: Number.NaN });
    expect(altura()).toBeCloseTo(uno, 0);
    host.remove();
  });

  it('un gesto en cola conserva su propia intensidad', () => {
    const { bot, host } = nuevo();
    bot.gesture('superBounce');
    bot.gesture('superBounce', { policy: 'queue', intensity: 0.5 });
    vi.advanceTimersByTime(5000);
    const completo = Math.max(...hops[0].map((f) => Math.abs(Number(/translate\([^,]+,\s*(-?[\d.]+)px/.exec(String(f['transform']))?.[1] ?? 0))));
    expect(altura()).toBeCloseTo(completo / 2, 0);
    host.remove();
  });
});
