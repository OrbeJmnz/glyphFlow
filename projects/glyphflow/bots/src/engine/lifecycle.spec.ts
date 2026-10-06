import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createBot, gfBotKit, ghostShape, type GfBotApi, type GfBotGestureContext } from '../public-api';

/**
 * El ciclo de vida de un gesto: promesa de fin, política de interrupción, cola y un scheduler propio por gesto
 * (jsdom, WAAPI simulada y timers falsos). Los gestos de prueba duran 1000 ms y anotan lo que programan.
 */
describe('glyphflow/bots · ciclo de vida de un gesto', () => {
  const animate = Element.prototype.animate;
  const getAnimations = Element.prototype.getAnimations;
  const fake = () => ({ cancel: () => undefined, finish: () => undefined, commitStyles: () => undefined, finished: Promise.resolve(), currentTime: 0, effect: null, addEventListener: () => undefined, onfinish: null });
  const host = document.createElement('div');
  let bot: GfBotApi & { a(): unknown; b(): unknown; sin(): unknown };
  let marcas: string[];

  beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.animate = vi.fn(fake) as never;
    Element.prototype.getAnimations = (() => []) as never;
    marcas = [];
    document.body.append(host);
    // Un gesto que programa una marca a mitad de camino con `later`: cae en la bolsa del gesto, no en la de la rutina.
    const gesto = (id: string, ms: number) => (ctx: GfBotGestureContext) => {
      ctx.hooks.act(ms);
      marcas.push(`${id}:inicio`);
      gfBotKit.later(ctx, () => marcas.push(`${id}:mitad`), ms / 2);
      return ms;
    };
    bot = createBot(host, {
      shape: ghostShape,
      wander: false,
      gestures: { a: gesto('a', 1000), b: gesto('b', 1000), sin: (ctx: GfBotGestureContext) => void ctx.hooks.act(10) },
    }) as never;
  });
  afterEach(() => {
    bot.destroy();
    host.remove();
    vi.useRealTimers();
    Element.prototype.animate = animate;
    Element.prototype.getAnimations = getAnimations;
  });

  it('devuelve un handle con la duración y una promesa que se resuelve al terminar', async () => {
    const h = bot.gesture('a');
    expect(h.id).toBe('a');
    expect(h.ms).toBe(1000);
    let fin: string | undefined;
    void h.finished.then((r) => (fin = r));
    await vi.advanceTimersByTimeAsync(999);
    expect(fin).toBeUndefined();
    await vi.advanceTimersByTimeAsync(1);
    expect(fin).toBe('done');
  });

  it('el gesto como método y por nombre son la misma cosa', async () => {
    const h = bot.a() as ReturnType<GfBotApi['gesture']>;
    expect(h.ms).toBe(1000);
  });

  it('un nombre que no existe, o un gesto del motor, se ignora ya', async () => {
    expect(await bot.gesture('noExiste').finished).toBe('ignored');
    expect(await bot.gesture('hop').finished).toBe('ignored');
  });

  it('un gesto sin duración se da por terminado de inmediato', async () => {
    expect(bot.gesture('sin').ms).toBe(0);
    expect(await bot.gesture('sin').finished).toBe('done');
  });

  it('replace (por defecto): el nuevo corta al actual, y los timers del viejo no disparan', async () => {
    const a = bot.gesture('a');
    await vi.advanceTimersByTimeAsync(200);
    const b = bot.gesture('b');
    expect(await a.finished).toBe('interrupted');
    await vi.advanceTimersByTimeAsync(1000);
    expect(await b.finished).toBe('done');
    expect(marcas).toEqual(['a:inicio', 'b:inicio', 'b:mitad']); // nunca «a:mitad»
  });

  it('ignore: si hay uno corriendo, el nuevo no corre y el actual sigue', async () => {
    const a = bot.gesture('a');
    const b = bot.gesture('b', { policy: 'ignore' });
    expect(b.ms).toBe(0);
    expect(await b.finished).toBe('ignored');
    await vi.advanceTimersByTimeAsync(1000);
    expect(await a.finished).toBe('done');
    expect(marcas).toEqual(['a:inicio', 'a:mitad']);
  });

  it('ignore sin nadie corriendo sí corre', async () => {
    expect(bot.gesture('a', { policy: 'ignore' }).ms).toBe(1000);
  });

  it('queue: espera a que el actual termine y entonces arranca', async () => {
    const a = bot.gesture('a');
    const b = bot.gesture('b', { policy: 'queue' });
    expect(b.ms).toBe(0); // todavía espera
    expect(marcas).toEqual(['a:inicio']);
    await vi.advanceTimersByTimeAsync(1000);
    expect(await a.finished).toBe('done');
    expect(marcas).toEqual(['a:inicio', 'a:mitad', 'b:inicio']);
    expect(b.ms).toBe(1000);
    await vi.advanceTimersByTimeAsync(1000);
    expect(await b.finished).toBe('done');
  });

  it('queue con el bot libre corre de una vez', () => {
    expect(bot.gesture('a', { policy: 'queue' }).ms).toBe(1000);
  });

  it('queue guarda hasta tres; el cuarto se ignora', async () => {
    bot.gesture('a');
    const q = [1, 2, 3, 4].map(() => bot.gesture('b', { policy: 'queue' }));
    expect(await q[3].finished).toBe('ignored');
  });

  it('un replace descarta la cola: lo que llegó a interrumpir manda', async () => {
    bot.gesture('a');
    const encolado = bot.gesture('b', { policy: 'queue' });
    bot.gesture('a'); // replace
    await vi.advanceTimersByTimeAsync(5000);
    expect(marcas.filter((m) => m === 'b:inicio')).toEqual([]);
    void encolado;
  });

  it('cancel() corta el gesto vivo y apaga sus timers; cancelar uno en cola lo saca de la cola', async () => {
    const a = bot.gesture('a');
    const b = bot.gesture('b', { policy: 'queue' });
    b.cancel();
    expect(await b.finished).toBe('ignored');
    a.cancel();
    expect(await a.finished).toBe('interrupted');
    await vi.advanceTimersByTimeAsync(5000);
    expect(marcas).toEqual(['a:inicio']);
  });

  it('cancelar uno que ya terminó no hace nada', async () => {
    const a = bot.gesture('a');
    await vi.advanceTimersByTimeAsync(1000);
    a.cancel();
    expect(await a.finished).toBe('done');
  });

  it('una acción del motor (hop) o un cambio de estado interrumpen el gesto en curso', async () => {
    const a = bot.gesture('a');
    bot.hop();
    expect(await a.finished).toBe('interrupted');
    const b = bot.gesture('b');
    bot.setState('working');
    expect(await b.finished).toBe('interrupted');
  });

  it('en pausa no corre nada', async () => {
    bot.hover(false); // congela
    expect(await bot.gesture('a').finished).toBe('ignored');
    bot.hover(true);
  });

  it('destruir el bot interrumpe el gesto en curso y descarta la cola', async () => {
    const a = bot.gesture('a');
    bot.gesture('b', { policy: 'queue' });
    bot.destroy();
    expect(await a.finished).toBe('interrupted');
    await vi.advanceTimersByTimeAsync(5000);
    expect(marcas).toEqual(['a:inicio']);
  });
});
