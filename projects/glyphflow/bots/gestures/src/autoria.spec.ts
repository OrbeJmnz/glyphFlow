import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createBot, gfBotKit, ghostShape, type GfBotGestureContext, type GfBotGestureDef } from 'glyphflow/bots';
import { perform } from './public-api';

/**
 * El ejemplo de «Escribir un gesto propio» del README, tal cual: si deja de compilar o de correr, la guía miente. Usa SOLO la superficie estable:
 * `GfBotGestureContext`, `gfBotKit` (sin `.internal`) y `perform`.
 */
const kit = gfBotKit;

/** Un cabeceo: el cuerpo baja y sube dos veces con un pequeño giro, y la sombra lo sigue. */
const cabeceo = (ctx: GfBotGestureContext): number =>
  perform(
    ctx,
    'cabeceo', // el nombre de la variable CSS: --gf-bot-cabeceo-duration
    (): GfBotGestureDef => ({
      score: kit.motion.score(
        kit.motion.settle(0),
        kit.motion.anticipate(0.2, { y: 6, sx: 1.06, sy: 0.92 }),
        kit.motion.launch(0.4, { y: -14, sx: 0.95, sy: 1.06 }),
        kit.motion.impact(0.6, { y: 3, sx: 1.08, sy: 0.9 }),
        kit.motion.settle(1),
      ),
    }),
    { ms: 700, alto: 14 },
  );

describe('autoría de gestos con la superficie estable', () => {
  const animate = Element.prototype.animate;
  const getAnimations = Element.prototype.getAnimations;
  beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.animate = vi.fn(() => ({ cancel: () => undefined, finish: () => undefined, commitStyles: () => undefined, finished: Promise.resolve(), currentTime: 0, effect: null, addEventListener: () => undefined, onfinish: null })) as never;
    Element.prototype.getAnimations = (() => []) as never;
  });
  afterEach(() => {
    vi.useRealTimers();
    Element.prototype.animate = animate;
    Element.prototype.getAnimations = getAnimations;
  });

  it('un gesto propio corre como método, por nombre, con handle, y respeta la intensidad', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const bot = createBot(host, { shape: ghostShape, wander: false, gestures: { cabeceo } });
    expect(typeof bot.cabeceo).toBe('function');
    const h = bot.cabeceo();
    expect(h.ms).toBe(700);
    let fin: string | undefined;
    void h.finished.then((r) => (fin = r));
    await vi.advanceTimersByTimeAsync(700);
    expect(fin).toBe('done');
    expect(bot.gesture('cabeceo', { intensity: 0.5 }).ms).toBe(700);
    expect((Element.prototype.animate as unknown as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(3);
    host.remove();
  });

  it('con movimiento reducido degrada a un saltito corto (300–450 ms) en vez de correr la partitura', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce'), media: q, addEventListener: () => undefined, removeEventListener: () => undefined }));
    const host = document.createElement('div');
    document.body.append(host);
    const bot = createBot(host, { shape: ghostShape, wander: false, gestures: { cabeceo } });
    const ms = bot.cabeceo().ms;
    expect(ms).toBeGreaterThanOrEqual(300);
    expect(ms).toBeLessThanOrEqual(450);
    vi.unstubAllGlobals();
    host.remove();
  });
});
