import { GF_BOT_VIEWS, isGfBotView, viewYaw } from '../../src/data/views';
import { ghostShape } from '../../src/shapes/ghost';
import { mochiShape } from '../../src/shapes/mochi';
import { baseFor } from '../../src/engine/base-pose';
import { buildShape } from '../../src/engine/build';
import { createBotContext, type BotContext, type GfBotOptions } from '../../src/engine/context';
import { gfBotKit } from 'glyphflow/bots';
import { frontFlip, gelPhase } from './flip';
import { clearFlipFx, flipEffects } from './flip-fx';
import { projectPose } from '../../src/engine/pose';
import { act, installStateHooks } from '../../src/engine/state';
import { setView } from '../../src/engine/view';
import { installKawaiiHooks } from '../../src/engine/kawaii';
const { gelBody, pathExtent } = gfBotKit.body;

function built(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: ghostShape, ...opts });
  buildShape(ctx);
  installStateHooks(ctx);
  installKawaiiHooks(ctx);
  return ctx;
}

/** jsdom no trae Web Animations: se presta un `animate` que anota qué se animó y se RETIRA al terminar. */
interface Call {
  node: Element;
  frames: Keyframe[];
  options: KeyframeAnimationOptions;
}
function conAnimate<T>(fn: (calls: Call[]) => T): T {
  const calls: Call[] = [];
  const proto = Element.prototype as unknown as Record<string, unknown>;
  proto['animate'] = function (this: Element, frames: Keyframe[], options: KeyframeAnimationOptions) {
    calls.push({ node: this, frames, options });
    return { cancel: vi.fn(), finished: Promise.resolve(), addEventListener: vi.fn(), onfinish: null };
  };
  try {
    return fn(calls);
  } finally {
    delete proto['animate'];
  }
}

describe('glyphflow/bots · vistas', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('declara las cinco vistas y cada una tiene su giro', () => {
    expect([...GF_BOT_VIEWS]).toEqual(['front', 'quarterLeft', 'side', 'back', 'quarterRight']);
    expect(viewYaw('front')).toBe(0);
    expect(viewYaw('quarterLeft')).toBeCloseTo(-Math.PI / 4, 10);
    expect(viewYaw('quarterRight')).toBeCloseTo(Math.PI / 4, 10);
    expect(viewYaw('side')).toBeCloseTo(-Math.PI / 2, 10);
    expect(viewYaw('back')).toBeCloseTo(Math.PI, 10);
  });

  it('acepta también un ángulo en radianes y cae a de frente con lo desconocido', () => {
    expect(viewYaw(0.3)).toBe(0.3);
    expect(viewYaw(null)).toBe(0);
    expect(viewYaw(undefined)).toBe(0);
    expect(viewYaw('nope' as never)).toBe(0);
    expect(isGfBotView('side')).toBe(true);
    expect(isGfBotView('nope')).toBe(false);
    expect(isGfBotView(3)).toBe(false);
  });

  it('la vista de creación es la pose inicial y la de reposo', () => {
    const ctx = built({ view: 'quarterRight' });
    expect(ctx.view).toBeCloseTo(Math.PI / 4, 10);
    expect(ctx.pose.yaw).toBeCloseTo(Math.PI / 4, 10);
    expect(baseFor(ctx, 'idle').yaw).toBeCloseTo(Math.PI / 4, 10);
    expect(baseFor(ctx, 'sleeping').yaw).toBeCloseTo(Math.PI / 4, 10);
  });

  it('setView cambia el reposo y gira el bot hasta ahí', () => {
    const ctx = built();
    expect(ctx.view).toBe(0);
    setView(ctx, 'side');
    expect(ctx.view).toBeCloseTo(-Math.PI / 2, 10);
    expect(ctx.pose.yaw).toBeCloseTo(-Math.PI / 2, 10);
    setView(ctx, null);
    expect(ctx.pose.yaw).toBe(0);
  });

  it('de lado la silueta se estrecha (depth) y de espaldas la cara se esconde sola', () => {
    const feats = [{ x: 80, y: 110 }];
    const ancho = (yaw: number) => Number(/scale\(([\d.]+),/.exec(projectPose(ghostShape, { yaw }, feats)[feats.length].transform)?.[1]);
    expect(ancho(viewYaw('front'))).toBe(1);
    expect(ancho(viewYaw('side'))).toBeCloseTo(ghostShape.depth ?? 1, 2);
    const trasera = projectPose(ghostShape, { yaw: viewYaw('back') }, feats)[0];
    expect(trasera.opacity).toBe(0);
  });

  it('el flip parte de la vista de reposo: el giro de la pose se conserva durante todo el salto', () => {
    const ctx = built({ view: 'quarterLeft' });
    conAnimate((calls) => {
      frontFlip(ctx);
      const giro = calls.find((c) => c.node === ctx.el.clip && 'transform' in c.frames[0])!;
      // el yaw no se anima: la silueta lleva la misma anchura de 3/4 en todos los fotogramas del giro
      const anchos = giro.frames.slice(1).map((f) => Number(/scale\(([\d.]+),/.exec(String(f['transform']))?.[1]));
      expect(new Set(anchos.map((a) => a.toFixed(2))).size).toBeLessThan(10);
      expect(Math.min(...anchos)).toBeGreaterThan(0.5);
    });
    expect(ctx.pose.yaw).toBeCloseTo(-Math.PI / 4, 10);
  });
});

describe('glyphflow/bots · front flip · cuerpo de gel', () => {
  const d = ghostShape.d as string;
  const estructura = (t: string) => t.replace(/-?\d*\.?\d+/g, '#');

  it('sin amplitud devuelve el trazo igual', () => {
    expect(gelBody(d, 100, 117, 0, 3)).toBe(d);
  });

  it('con amplitud conserva la estructura del trazo (se puede animar con d) y lo deforma', () => {
    const g = gelBody(d, 100, 117, 8, 2);
    expect(estructura(g)).toBe(estructura(d));
    expect(g).not.toBe(d);
  });

  it('el desplazamiento es radial y acotado por la amplitud', () => {
    const amp = 6;
    const pares = (t: string) => [...t.matchAll(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
    const a = pares(d);
    const b = pares(gelBody(d, 100, 117, amp, 1.2));
    for (let i = 0; i < a.length; i++) {
      const mov = Math.hypot(b[i][0] - a[i][0], b[i][1] - a[i][1]);
      expect(mov).toBeLessThanOrEqual(amp + 0.02); // |0.62 + 0.38| · amp
    }
  });

  it('los bultos viajan: con otra fase la silueta es otra', () => {
    expect(gelBody(d, 100, 117, 8, gelPhase(0.4))).not.toBe(gelBody(d, 100, 117, 8, gelPhase(0.6)));
  });

  it('el gel arranca y termina en cero: el primer y el último fotograma son la onda de reposo', () => {
    const ctx = built();
    conAnimate((calls) => {
      frontFlip(ctx);
      const falda = calls.find((c) => c.node === ctx.el.clip && 'd' in c.frames[0])!;
      const trazo = (f: Keyframe) => /path\("(.*)"\)/.exec(String(f['d']))?.[1] ?? '';
      // sin el gel sería la falda sola; aquí los extremos coinciden con el reposo
      expect(pathExtent(trazo(falda.frames[0])).bottom).toBeCloseTo(pathExtent(d).bottom, 1);
      // y a mitad de vuelo el contorno SÍ está deformado
      const medio = trazo(falda.frames[Math.floor(falda.frames.length / 2)]);
      expect(medio).not.toBe(trazo(falda.frames[0]));
    });
  });
});

describe('glyphflow/bots · front flip · efectos', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('crea las flechas y las líneas de velocidad en .fx, y los rayos y destellos en .world', () => {
    const ctx = built();
    conAnimate(() => flipEffects(ctx, 1000));
    const aire = ctx.el.fx.querySelector('.flipfx')!;
    const suelo = ctx.el.world.querySelector('.flipfx')!;
    expect(aire).not.toBeNull();
    expect(suelo).not.toBeNull();
    expect(aire.querySelectorAll('g').length).toBe(6); // 3 flechas hacia arriba + 3 hacia abajo
    expect(aire.querySelectorAll('line').length).toBe(8); // líneas de velocidad: 2 por lado × 2 fases
    expect(suelo.querySelectorAll('line').length).toBe(9); // rayos del impacto
    expect(suelo.querySelectorAll('path').length).toBe(5); // destellos
  });

  it('las flechas de despegue son cian y de caída rosa; los rayos van en rosa y lavanda', () => {
    const ctx = built();
    conAnimate(() => flipEffects(ctx, 1000));
    const trazos = [...ctx.el.fx.querySelectorAll('.flipfx g path')].map((p) => p.getAttribute('stroke'));
    expect(trazos.slice(0, 3).every((c) => c === '#47E4FF')).toBe(true);
    expect(trazos.slice(3).every((c) => c === '#FF5FA8')).toBe(true);
    const rayos = new Set([...ctx.el.world.querySelectorAll('.flipfx line')].map((l) => l.getAttribute('stroke')));
    expect([...rayos].sort()).toEqual(['#B38CFF', '#FF5FA8']);
  });

  it('cada pieza nace invisible y entra con su propio delay dentro de la duración del gesto', () => {
    const ctx = built();
    conAnimate((calls) => {
      flipEffects(ctx, 1000);
      expect(calls.length).toBeGreaterThan(20);
      for (const c of calls) {
        expect(String(c.frames[0]['opacity'])).toBe('0');
        expect(Number(c.options.delay)).toBeGreaterThanOrEqual(0);
        expect(Number(c.options.delay) + Number(c.options.duration)).toBeLessThanOrEqual(1000.001);
      }
      for (const n of ctx.svg.querySelectorAll('.flipfx line, .flipfx g, .flipfx > path')) {
        expect(n.getAttribute('opacity')).toBe('0');
      }
    });
  });

  it('los rayos del impacto salen al final (después del 89 % del gesto)', () => {
    const ctx = built();
    conAnimate((calls) => {
      flipEffects(ctx, 1000);
      const rayos = calls.filter((c) => ctx.el.world.contains(c.node));
      expect(rayos.length).toBeGreaterThanOrEqual(9);
      for (const r of rayos) expect(Number(r.options.delay)).toBeGreaterThanOrEqual(890);
    });
  });

  it('se retiran solos al terminar y clearFlipFx los quita antes si otro gesto los corta', () => {
    vi.useFakeTimers();
    const ctx = built();
    conAnimate(() => flipEffects(ctx, 1000));
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(2);
    vi.advanceTimersByTime(1300);
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(0);
    conAnimate(() => flipEffects(ctx, 1000));
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(2);
    clearFlipFx(ctx);
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(0);
  });

  it('empezar otro gesto retira los efectos de un flip a medias', () => {
    const ctx = built();
    conAnimate(() => flipEffects(ctx, 1000));
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(2);
    const proto = Element.prototype as unknown as Record<string, unknown>;
    proto['getAnimations'] = () => [];
    try {
      act(ctx, 500);
    } finally {
      delete proto['getAnimations'];
    }
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(0);
  });

  it('un flip nuevo no acumula los efectos del anterior', () => {
    const ctx = built();
    conAnimate(() => {
      flipEffects(ctx, 1000);
      flipEffects(ctx, 1000);
    });
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(2);
  });

  it('con movimiento reducido el flip no pinta efectos', () => {
    const ctx = built({ shape: mochiShape });
    (ctx as { reduce: boolean }).reduce = true;
    conAnimate(() => frontFlip(ctx));
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(0);
  });

  it('el flip normal sí los pinta', () => {
    const ctx = built();
    conAnimate(() => frontFlip(ctx));
    expect(ctx.svg.querySelectorAll('.flipfx').length).toBe(2);
  });
});
