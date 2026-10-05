import { ghostShape } from '../shapes/ghost';
import { buildShape } from './build';
import { createBotContext, type BotContext } from './context';
import { installKawaiiHooks, K } from './kawaii';
import { act, clearFace, clearRoutine, installStateHooks } from './state';

function built(): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: ghostShape });
  buildShape(ctx);
  installStateHooks(ctx);
  installKawaiiHooks(ctx);
  return ctx;
}

/** jsdom no trae Web Animations: cada pieza recibe un `getAnimations` que devuelve una animación falsa. */
function conAnimacion(nodes: Element[], conOpacity = true): ReturnType<typeof vi.fn>[] {
  return nodes.map((n) => {
    const cancel = vi.fn();
    (n as unknown as { getAnimations: unknown }).getAnimations = () => [
      { cancel, effect: { getKeyframes: () => [conOpacity ? { opacity: 1 } : { transform: 'none' }] } },
    ];
    return cancel;
  });
}

/** Las piezas de cara que un gesto anima con `opacity` (cejas, ojos felices…). */
const piezasDeCara = (ctx: BotContext): Element[] => [
  ...ctx.fe.happy, ...ctx.fe.closed, ...ctx.fe.squeeze, ...ctx.fe.browA, ...ctx.fe.browS, ...ctx.fe.tears, ctx.fe.sweat,
];

describe('glyphflow/bots · la cara de un gesto no se mezcla con la del anterior', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('un gesto nuevo, en reposo, corta las piezas de cara que dejó el anterior (cejas, ojos felices, sudor…)', () => {
    const ctx = built();
    const cortes = conAnimacion(piezasDeCara(ctx));
    expect(ctx.state).toBe('idle');
    act(ctx, 1000);
    for (const c of cortes) expect(c).toHaveBeenCalled();
  });

  it('también corta los ojos ocultos por un cambio de forma, pero no un parpadeo (transform)', () => {
    const ctx = built();
    const oculto = conAnimacion([ctx.fe.eyeList[0]], true)[0];
    const parpadeo = conAnimacion([ctx.fe.eyeList[1]], false)[0];
    act(ctx, 1000);
    expect(oculto).toHaveBeenCalled();
    expect(parpadeo).not.toHaveBeenCalled();
  });

  it('corta el grupo de ojos y los cachetes, y limpia los vahos', () => {
    const ctx = built();
    const [cOjos] = conAnimacion([ctx.fe.eyes]);
    const cCachetes = conAnimacion(ctx.fe.cheeks);
    ctx.fe.faceFx.innerHTML = '<circle/>';
    act(ctx, 1000);
    expect(cOjos).toHaveBeenCalled();
    for (const c of cCachetes) expect(c).toHaveBeenCalled();
    expect(ctx.fe.faceFx.childElementCount).toBe(0);
  });

  it('clearFace es lo que usa clearRoutine: cambiar de rutina sigue limpiando la cara', () => {
    const ctx = built();
    const cortes = conAnimacion(piezasDeCara(ctx));
    // `clearRoutine` también toca las luces, que este test no usa: jsdom no trae getAnimations y se
    // presta uno mudo en el prototipo (se RETIRA al terminar; las piezas de cara llevan el suyo).
    const proto = Element.prototype as unknown as Record<string, unknown>;
    proto['getAnimations'] = () => [];
    try {
      clearRoutine(ctx);
    } finally {
      delete proto['getAnimations'];
    }
    for (const c of cortes) expect(c).toHaveBeenCalled();
  });

  it('clearFace por sí sola no toca los temporizadores ni la pose', () => {
    const ctx = built();
    const t = setTimeout(() => undefined, 60_000);
    ctx.subTimers.push(t);
    clearFace(ctx);
    expect(ctx.subTimers).toEqual([t]);
    clearTimeout(t);
  });
});

describe('glyphflow/bots · una cara kawaii activa no se queda debajo de un gesto', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('un gesto normal suelta la kawaii activa', () => {
    const ctx = built();
    const soltar = vi.fn();
    ctx.hooks.kawaiiRelease = soltar;
    ctx.hooks.act(1000);
    expect(soltar).toHaveBeenCalledTimes(1);
  });

  it('un gesto kawaii la conserva (pone la suya justo después; soltarla haría parpadear la cara base)', () => {
    const ctx = built();
    const soltar = vi.fn();
    ctx.hooks.kawaiiRelease = soltar;
    ctx.hooks.act(1500, true);
    expect(soltar).not.toHaveBeenCalled();
  });

  it('los 16 gestos kawaii conservan la suya: ninguno la suelta al empezar', () => {
    const ctx = built();
    const soltar = vi.fn();
    ctx.hooks.kawaiiRelease = soltar;
    // jsdom no trae Web Animations: se presta un animate mudo y se RETIRA al terminar.
    const proto = Element.prototype as unknown as Record<string, unknown>;
    proto['animate'] = () => ({ cancel: vi.fn(), finished: Promise.resolve(), addEventListener: vi.fn(), onfinish: null });
    vi.useFakeTimers();
    try {
      const nombres = Object.keys(K) as (keyof typeof K)[];
      expect(nombres.length).toBe(16);
      for (const k of nombres) {
        (K[k] as (c: BotContext) => void)(ctx);
        expect(soltar, k).not.toHaveBeenCalled();
      }
    } finally {
      vi.useRealTimers();
      delete proto['animate'];
    }
    // 30 s: recorre los 16 gestos en un solo caso y con la suite en paralelo roza los 5 s de Vitest.
  }, 30_000);
});
