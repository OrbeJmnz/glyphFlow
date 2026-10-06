import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createBot, ghostShape } from 'glyphflow/bots';
import { physicalGestures } from './public-api';

/** Los gestos físicos corren de punta a punta con el motor (jsdom, WAAPI simulada) y limpian lo que tocan. */
describe('gestos físicos en el motor', () => {
  const animate = Element.prototype.animate;
  const getAnimations = Element.prototype.getAnimations;
  const fake = () => ({ cancel: () => undefined, finish: () => undefined, commitStyles: () => undefined, finished: Promise.resolve(), currentTime: 0, effect: null, addEventListener: () => undefined, onfinish: null });
  beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.animate = vi.fn(fake) as never;
    Element.prototype.getAnimations = (() => []) as never;
  });
  afterEach(() => {
    vi.useRealTimers();
    Element.prototype.animate = animate;
    Element.prototype.getAnimations = getAnimations;
  });

  it('un nombre que no es de un paquete no corre nada', () => {
    const host = document.createElement('div');
    document.body.append(host);
    const bot = createBot(host, { shape: ghostShape, wander: false, gestures: physicalGestures });
    expect(bot.gesture('constructor')).toBe(false);
    expect(bot.gesture('hop')).toBe(false);
    host.remove();
  });

  it.each(['frontFlip', 'superBounce', 'stretchSnap', 'scaredRecoil', 'jellyWobble', 'waveThroughBody', 'tornadoSpin', 'spinSquash', 'sideDodge', 'backflip', 'doubleFlip', 'sideCartwheel', 'ghostSwoop', 'inflateRelease', 'puddleMorph', 'jellyDrop', 'squishTeleport'] as const)('%s existe, anima y apaga la bandera de la sombra', (id) => {
    const host = document.createElement('div');
    document.body.append(host);
    const bot = createBot(host, { shape: ghostShape, wander: false, gestures: physicalGestures });
    expect(typeof bot[id]).toBe('function');
    expect(bot.gesture(id)).toBe(true);
    expect((Element.prototype.animate as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(5);
    const svg = host.querySelector('svg')!;
    // los gestos que se despegan del suelo encienden la sombra; los de región no se mueven de sitio
    const conSombra = !['jellyWobble', 'waveThroughBody', 'tornadoSpin', 'spinSquash', 'inflateRelease'].includes(id);
    expect('flip' in svg.dataset).toBe(conSombra);
    vi.advanceTimersByTime(5000);
    expect('flip' in svg.dataset).toBe(false);
    host.remove();
  });
});
