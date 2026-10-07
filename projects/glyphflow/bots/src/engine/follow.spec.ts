import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ghostShape } from '../shapes/ghost';
import { buildShape } from './build';
import { createBotContext, type BotContext } from './context';
import { alinearMirada, followPointer } from './follow';

function built(): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: ghostShape });
  buildShape(ctx);
  // jsdom no mide nada: el bot «mide» 100 × 100 centrado en (500, 500)
  ctx.svg.getBoundingClientRect = () => ({ left: 450, top: 450, width: 100, height: 100, right: 550, bottom: 550, x: 450, y: 450 }) as DOMRect;
  return ctx;
}

const mover = (x: number, y: number, pointerType = 'mouse'): void => {
  const e = new Event('pointermove') as Event & { clientX: number; clientY: number; pointerType: string };
  Object.assign(e, { clientX: x, clientY: y, pointerType });
  window.dispatchEvent(e);
};

describe('glyphflow/bots · seguir el puntero', () => {
  let raf: FrameRequestCallback[];
  beforeEach(() => {
    raf = [];
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => raf.push(cb));
    vi.stubGlobal('cancelAnimationFrame', () => (raf = []));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });
  const cuadro = (): void => {
    const cbs = raf;
    raf = [];
    cbs.forEach((cb) => cb(0));
  };

  it('un gesto endereza la cabeza, no la sigue mientras corre y al terminar vuelve a mirar el cursor', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    try {
      const ctx = built();
      const off = followPointer(ctx);
      mover(900, 700);
      cuadro();
      expect(ctx.pose.yaw).toBeGreaterThan(0.3);

      alinearMirada(ctx, 1000);
      expect(ctx.pose.yaw).toBe(ctx.view);
      expect(ctx.pose.pitch).toBe(0);

      mover(100, 300); // el cursor se mueve en pleno gesto: la cabeza no lo atiende
      cuadro();
      expect(ctx.pose.yaw).toBe(ctx.view);

      vi.advanceTimersByTime(1121);
      cuadro();
      expect(ctx.pose.yaw).toBeLessThan(-0.3); // volvió a mirar, y a donde está ahora el cursor
      off();
    } finally {
      vi.useRealTimers();
    }
  });

  it('con el cursor quieto, al terminar el gesto vuelve a mirarlo igual', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    try {
      const ctx = built();
      const off = followPointer(ctx);
      mover(900, 700);
      cuadro();
      const antes = ctx.pose.yaw;
      alinearMirada(ctx, 500);
      vi.advanceTimersByTime(621);
      cuadro();
      expect(ctx.pose.yaw).toBeCloseTo(antes, 5);
      off();
    } finally {
      vi.useRealTimers();
    }
  });

  it('un bot que no sigue el puntero no se toca', () => {
    const ctx = built();
    ctx.pose = { yaw: 0.4, pitch: 0.1, roll: 0 };
    alinearMirada(ctx, 500);
    expect(ctx.pose.yaw).toBe(0.4);
  });

  it('la cabeza mira hacia donde está el cursor (derecha → yaw +, abajo → pitch +)', () => {
    const ctx = built();
    const off = followPointer(ctx);
    mover(900, 700);
    cuadro();
    expect(ctx.pose.yaw).toBeGreaterThan(0.3);
    expect(ctx.pose.pitch).toBeGreaterThan(0);
    mover(100, 300);
    cuadro();
    expect(ctx.pose.yaw).toBeLessThan(-0.3);
    expect(ctx.pose.pitch).toBeLessThan(0);
    off();
  });

  it('mira «del todo» a un tamaño de bot de distancia y no más allá (se limita a ±1)', () => {
    const ctx = built();
    const off = followPointer(ctx);
    mover(5000, 500);
    cuadro();
    expect(ctx.pose.yaw).toBeCloseTo(0.5, 2);
    off();
  });

  it('trabaja una vez por cuadro, no una por evento', () => {
    const ctx = built();
    const off = followPointer(ctx);
    mover(600, 500);
    mover(700, 500);
    mover(800, 500);
    expect(raf.length).toBe(1);
    off();
  });

  it('un movimiento imperceptible no reescribe la pose', () => {
    const ctx = built();
    const off = followPointer(ctx);
    mover(800, 500);
    cuadro();
    const antes = ctx.pose;
    mover(800.5, 500);
    cuadro();
    expect(ctx.pose).toBe(antes);
    off();
  });

  it('ignora el tacto, el movimiento reducido, la pausa y el arrastre', () => {
    const ctx = built();
    const off = followPointer(ctx);
    mover(900, 500, 'touch');
    expect(raf.length).toBe(0);
    (ctx as { reduce: boolean }).reduce = true;
    mover(900, 500);
    cuadro();
    expect(ctx.pose.yaw).toBe(0);
    (ctx as { reduce: boolean }).reduce = false;
    ctx.paused = true;
    mover(900, 520);
    cuadro();
    expect(ctx.pose.yaw).toBe(0);
    ctx.paused = false;
    ctx.dragging = true;
    mover(900, 540);
    cuadro();
    expect(ctx.pose.yaw).toBe(0);
    off();
  });

  it('al salir el cursor de la ventana vuelve a mirar al frente', () => {
    const ctx = built();
    const off = followPointer(ctx);
    mover(900, 500);
    cuadro();
    expect(ctx.pose.yaw).toBeGreaterThan(0.2);
    document.dispatchEvent(Object.assign(new Event('mouseout'), { relatedTarget: null }));
    cuadro();
    expect(ctx.pose.yaw).toBeCloseTo(0, 6);
    off();
  });

  it('con la vista de reposo en 3/4 mira alrededor de ella, no de cero', () => {
    const ctx = built();
    ctx.view = 0.6;
    const off = followPointer(ctx);
    mover(500, 500);
    cuadro();
    expect(ctx.pose.yaw).toBeCloseTo(0.6, 2);
    off();
  });

  it('un solo listener para todos los bots, y se quita al apagar el último', () => {
    const add = vi.spyOn(window, 'addEventListener');
    const rem = vi.spyOn(window, 'removeEventListener');
    const a = built();
    const b = built();
    const offA = followPointer(a);
    const offB = followPointer(b);
    expect(add.mock.calls.filter((c) => c[0] === 'pointermove').length).toBe(1);
    offA();
    expect(rem.mock.calls.filter((c) => c[0] === 'pointermove').length).toBe(0);
    offB();
    expect(rem.mock.calls.filter((c) => c[0] === 'pointermove').length).toBe(1);
    add.mockRestore();
    rem.mockRestore();
  });

  it('apagarlo devuelve la cabeza al frente', () => {
    const ctx = built();
    const off = followPointer(ctx);
    mover(900, 500);
    cuadro();
    off();
    expect(ctx.pose.yaw).toBeCloseTo(0, 6);
  });
});
