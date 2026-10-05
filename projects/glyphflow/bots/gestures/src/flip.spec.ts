import { ghostShape } from '../../src/shapes/ghost';
import { tofuShape } from '../../src/shapes/tofu';
import { mochiShape } from '../../src/shapes/mochi';
import { buildShape } from '../../src/engine/build';
import { createBotContext, type BotContext, type GfBotOptions } from '../../src/engine/context';
import { gfBotKit } from 'glyphflow/bots';
import { flipDuration, flipFrame, FLIP_FACE_K, frontFlip } from './flip';
import { projectPose } from '../../src/engine/pose';
import { track } from '../../src/engine/track';
const { canFlexHem, flexHem, idleDAt, pathExtent } = gfBotKit.body;

function built(opts: Partial<GfBotOptions> = {}): BotContext {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const ctx = createBotContext(host, { shape: ghostShape, ...opts });
  buildShape(ctx);
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

describe('glyphflow/bots · pistas (track)', () => {
  it('pasa por los nodos, no se pasa de ellos y arranca y termina quieta', () => {
    const f = track([[0, 0], [0.5, 10], [1, 4]]);
    expect(f(0)).toBe(0);
    expect(f(0.5)).toBeCloseTo(10, 6);
    expect(f(1)).toBe(4);
    for (let t = 0; t <= 1; t += 0.01) expect(f(t)).toBeLessThanOrEqual(10.0001);
    // velocidad cero en los extremos: casi nada se mueve en el primer 1 %
    expect(Math.abs(f(0.01) - f(0))).toBeLessThan(0.05);
  });

  it('en un máximo local la pendiente es cero (la cima es plana)', () => {
    const f = track([[0, 0], [0.5, 10], [1, 0]]);
    expect(Math.abs(f(0.5 + 0.001) - f(0.5 - 0.001))).toBeLessThan(0.001);
  });

  it('sin nodos vale 0 y con uno es constante', () => {
    expect(track([])(0.3)).toBe(0);
    expect(track([[0, 7]])(0.9)).toBe(7);
  });
});

describe('glyphflow/bots · front flip · los canales', () => {
  it('arranca y termina EXACTAMENTE en reposo (la pose inicial, sin residuos)', () => {
    for (const t of [0, 1]) {
      const f = flipFrame(t);
      expect(f.x).toBeCloseTo(0, 9);
      expect(f.y).toBeCloseTo(0, 9);
      expect(f.hopX * f.poseX).toBeCloseTo(1, 9);
      expect(f.hopY * f.poseY).toBeCloseTo(1, 9);
      expect(f.faceX * f.hopX).toBeCloseTo(1, 9);
      expect(f.faceY * f.hopY).toBeCloseTo(1, 9);
      expect(f.spread).toBeCloseTo(0, 9);
      expect(f.drag).toBeCloseTo(0, 9);
    }
    expect(flipFrame(0).roll).toBe(0);
    // 360° ≡ 0°: la vuelta cierra, y el estado de reposo del bot nunca guarda los 360
    expect(flipFrame(1).roll % 360).toBe(0);
  });

  it('da EXACTAMENTE una vuelta completa, siempre hacia el mismo lado', () => {
    expect(flipFrame(1).roll - flipFrame(0).roll).toBe(360);
    let prev = -1;
    for (let i = 0; i <= 200; i++) {
      const r = flipFrame(i / 200).roll;
      expect(r).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = r;
    }
  });

  it('pasa por 90°, 180° y 270° a los 35 %, 50 % y 65 %', () => {
    expect(flipFrame(0.35).roll).toBeCloseTo(90, 5);
    expect(flipFrame(0.5).roll).toBeCloseTo(180, 5);
    expect(flipFrame(0.65).roll).toBeCloseTo(270, 5);
  });

  it('el giro es lento al principio, rápido en el centro y frena al caer', () => {
    const v = (a: number, b: number) => (flipFrame(b).roll - flipFrame(a).roll) / (b - a);
    expect(flipFrame(0.1).roll).toBeLessThan(2); // anticipación: sin girar todavía
    expect(v(0.35, 0.65)).toBeGreaterThan(v(0, 0.15) * 20);
    expect(v(0.35, 0.65)).toBeGreaterThan(v(0.82, 0.92) * 3);
  });

  it('la trayectoria es una parábola: la cima está hacia el 50 % y la subida y la bajada se parecen', () => {
    let min = 0;
    let at = 0;
    for (let i = 0; i <= 400; i++) {
      const y = flipFrame(i / 400).y;
      if (y < min) {
        min = y;
        at = i / 400;
      }
    }
    expect(at).toBeGreaterThan(0.45);
    expect(at).toBeLessThan(0.55);
    expect(min).toBeLessThan(-80);
    expect(flipFrame(0.35).y).toBeCloseTo(flipFrame(0.65).y, 5);
  });

  it('anticipación: baja y se aplasta ANTES de girar', () => {
    const f = flipFrame(0.1);
    expect(f.y).toBeGreaterThan(5); // baja
    expect(f.hopX * f.poseX).toBeCloseTo(1.08, 3);
    expect(f.hopY * f.poseY).toBeCloseTo(0.88, 3);
    expect(f.spread).toBeGreaterThan(0.1); // la falda se abre
  });

  it('despegue: se estira en vertical y la falda se arrastra hacia abajo', () => {
    const f = flipFrame(0.2);
    expect(f.hopX * f.poseX).toBeCloseTo(0.9, 3);
    expect(f.hopY * f.poseY).toBeCloseTo(1.15, 3);
    expect(f.drag).toBeGreaterThan(4);
  });

  it('antes de aterrizar se estira; al caer la falda se arrastra al revés que al subir', () => {
    const f = flipFrame(0.8);
    expect(f.hopY * f.poseY).toBeCloseTo(1.1, 3);
    expect(f.hopX * f.poseX).toBeCloseTo(0.92, 3);
    expect(f.drag).toBeLessThan(0); // subiendo era positivo
    expect(flipFrame(0.2).drag).toBeGreaterThan(0);
  });

  it('impacto: el mayor squash horizontal, y la falda se ensancha', () => {
    const f = flipFrame(0.9);
    expect(f.hopX * f.poseX).toBeCloseTo(1.13, 3);
    expect(f.hopY * f.poseY).toBeCloseTo(0.84, 3);
    expect(f.y).toBeGreaterThan(2);
    let maxX = 0;
    for (let i = 0; i <= 200; i++) maxX = Math.max(maxX, flipFrame(i / 200).hopX * flipFrame(i / 200).poseX);
    expect(maxX).toBeCloseTo(1.13, 2);
    expect(f.spread).toBeGreaterThan(0.2);
  });

  it('overshoot: tras el impacto rebota un poco al otro lado y se asienta, sin otro salto', () => {
    const f = flipFrame(0.95);
    expect(f.hopX * f.poseX).toBeCloseTo(0.97, 3);
    expect(f.hopY * f.poseY).toBeCloseTo(1.04, 3);
    expect(f.y).toBeLessThan(0);
    expect(f.y).toBeGreaterThan(-6);
  });

  it('la deformación total es la misma sea en el suelo (.hop) o en el aire (pose): se reparte, no se cambia', () => {
    for (const t of [0, 0.1, 0.2, 0.3, 0.5, 0.7, 0.8, 0.9, 1]) {
      const f = flipFrame(t);
      const sx = (flipFrame(t).hopX * f.poseX);
      expect(sx).toBeGreaterThan(0.8);
      expect(sx).toBeLessThan(1.2);
    }
    expect(flipFrame(0).grounded).toBe(1);
    expect(flipFrame(1).grounded).toBe(1);
    expect(flipFrame(0.5).grounded).toBe(0);
  });

  it('la cara se deforma menos que el cuerpo (cuerpo 0.84 → cara ≈ 0.94)', () => {
    const f = flipFrame(0.9);
    const cuerpo = f.hopY * f.poseY;
    const cara = f.faceY * f.hopY;
    expect(cuerpo).toBeCloseTo(0.84, 3);
    expect(cara).toBeCloseTo(1 + (0.84 - 1) * FLIP_FACE_K, 6);
    expect(cara).toBeGreaterThan(0.92);
    expect(cara).toBeLessThan(0.97);
  });
});

describe('glyphflow/bots · front flip · la pose lleva la deformación a lo largo del eje del cuerpo', () => {
  const feats = [{ x: 80, y: 110 }];
  const sh = { cy: 112, model: 'sphere' as const, R: 59 };

  it('sin deformación la pose es la de siempre (texto idéntico)', () => {
    const a = projectPose(sh, { roll: 30 }, feats);
    const b = projectPose(sh, { roll: 30, sx: 1, sy: 1, fx: 1, fy: 1 }, feats);
    expect(b).toEqual(a);
  });

  it('el scale va DESPUÉS del rotate en el texto = se aplica antes del giro, en los ejes del cuerpo', () => {
    const out = projectPose(sh, { roll: 180, sx: 1.1, sy: 0.9 }, feats);
    expect(out[feats.length].transform).toBe('rotate(180.00deg) scale(1.100,0.900)');
  });

  it('la cara y los accesorios llevan su propia deformación', () => {
    const out = projectPose(sh, { roll: 10, sx: 1.2, sy: 0.8, fx: 1.05, fy: 0.95 }, feats);
    const base = feats.length;
    expect(out[base + 5].transform).toBe('rotate(10.00deg) scale(1.050,0.950)'); // cara (.flip)
    expect(out[base + 7].transform).toBe('rotate(10.00deg) scale(1.200,0.800)'); // accBack
    expect(out[base + 8].transform).toBe('rotate(10.00deg) scale(1.200,0.800)'); // accFront
    expect(out[base + 6].transform).toBe('rotate(-10.00deg)'); // el brillo no se deforma
  });
});

describe('glyphflow/bots · front flip · la falda', () => {
  const sabana = ghostShape.d as string;

  it('el fantasma y las formas de trazo absoluto se pueden deformar; el Tofu (H/V) no', () => {
    expect(canFlexHem(sabana)).toBe(true);
    expect(canFlexHem(tofuShape.d)).toBe(false);
    expect(canFlexHem(undefined)).toBe(false);
  });

  it('sin deformación devuelve el mismo trazo', () => {
    const { top, bottom } = pathExtent(sabana);
    expect(flexHem(sabana, bottom - 0.38 * (bottom - top), bottom, 0, 0)).toBe(sabana);
  });

  it('solo se mueve la parte de abajo: la cabeza se queda donde está', () => {
    const { top, bottom } = pathExtent(sabana);
    const y0 = bottom - 0.38 * (bottom - top);
    const flex = flexHem(sabana, y0, bottom, 0.25, 6);
    expect(pathExtent(flex).top).toBeCloseTo(top, 1);
    expect(pathExtent(flex).bottom).toBeGreaterThan(bottom + 4);
    // misma estructura de comandos y de números: se puede interpolar y animar con `d`
    expect(flex.replace(/-?\d*\.?\d+/g, '#')).toBe(sabana.replace(/-?\d*\.?\d+/g, '#'));
  });

  it('spread ensancha la falda en horizontal y drag la mueve en vertical', () => {
    const { top, bottom } = pathExtent(sabana);
    const y0 = bottom - 0.38 * (bottom - top);
    const anchoDe = (d: string) => {
      const xs = [...d.matchAll(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g)].filter((m) => Number(m[2]) > bottom - 4).map((m) => Number(m[1]));
      return Math.max(...xs) - Math.min(...xs);
    };
    expect(anchoDe(flexHem(sabana, y0, bottom, 0.3, 0))).toBeGreaterThan(anchoDe(sabana));
    expect(pathExtent(flexHem(sabana, y0, bottom, 0, -6)).bottom).toBeLessThan(bottom - 4);
  });

  it('sin onda de reposo (movimiento reducido o forma estática) el reposo es el d fijo', () => {
    const ctx = built({ shape: mochiShape });
    expect(idleDAt(ctx, 0)).toBe(idleDAt(ctx, 700));
  });

  it('con onda de reposo calcula en qué punto estará: ping-pong entre d y d2', () => {
    const ctx = built();
    const fake = {
      currentTime: 0,
      effect: { getTiming: () => ({ iterations: Infinity, duration: 900, direction: 'alternate', easing: 'linear' }) },
    } as unknown as Animation;
    ctx.shapeAnims = [fake];
    expect(idleDAt(ctx, 0)).toBe(ghostShape.d);
    expect(idleDAt(ctx, 900)).toBe(ghostShape.d2); // fin de la ida
    expect(idleDAt(ctx, 1800)).toBe(ghostShape.d); // y vuelta
    expect(idleDAt(ctx, 450)).not.toBe(ghostShape.d);
  });
});

describe('glyphflow/bots · front flip · duración', () => {
  it('por defecto 1000 ms; se ajusta con --gf-bot-flip-duration (o --flip-duration), con tope', () => {
    const ctx = built();
    expect(flipDuration(ctx)).toBe(1000);
    ctx.svg.style.setProperty('--gf-bot-flip-duration', '1.5s');
    expect(flipDuration(ctx)).toBe(1500);
    ctx.svg.style.setProperty('--gf-bot-flip-duration', '800ms');
    expect(flipDuration(ctx)).toBe(800);
    ctx.svg.style.setProperty('--gf-bot-flip-duration', '60000ms');
    expect(flipDuration(ctx)).toBe(4000);
    ctx.svg.style.setProperty('--gf-bot-flip-duration', '10ms');
    expect(flipDuration(ctx)).toBe(300);
    ctx.svg.style.removeProperty('--gf-bot-flip-duration');
    ctx.svg.style.setProperty('--flip-duration', '700ms');
    expect(flipDuration(ctx)).toBe(700);
  });
});

describe('glyphflow/bots · front flip · el gesto', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('anima a la vez trayectoria, giro, falda, sombra y ojos, y enciende la sombra durante el salto', () => {
    const ctx = built();
    conAnimate((calls) => {
      frontFlip(ctx);
      const en = (n: Element) => calls.filter((c) => c.node === n);
      expect(en(ctx.el.hop).length).toBe(1);
      expect(en(ctx.el.clip).some((c) => 'd' in c.frames[0])).toBe(true); // la falda
      expect(en(ctx.el.clip).some((c) => 'transform' in c.frames[0])).toBe(true); // el giro
      expect(en(ctx.el.shadow).length).toBe(1);
      expect(en(ctx.el.hop)[0].options.duration).toBe(1000);
      expect(calls.some((c) => ctx.fe.eyeList.includes(c.node as SVGElement))).toBe(true);
    });
    expect(ctx.svg.dataset['flip']).toBeDefined();
  });

  it('la trayectoria arranca y termina en reposo y el giro hace una sola vuelta', () => {
    const ctx = built();
    conAnimate((calls) => {
      frontFlip(ctx);
      const hop = calls.find((c) => c.node === ctx.el.hop)!;
      const ult = hop.frames[hop.frames.length - 1];
      expect(String(ult['transform'])).toBe('translate(0.00px,0.00px) scale(1.000,1.000)');
      const giro = calls.find((c) => c.node === ctx.el.clip && 'transform' in c.frames[0])!;
      // el primer fotograma lo reemplaza `play` por la pose ACTUAL del nodo (relevo): no es de la curva
      const rolls = giro.frames.slice(1).map((f) => Number(/rotate\((-?[\d.]+)deg\)/.exec(String(f['transform']))?.[1]));
      expect(Math.max(...rolls)).toBe(360);
      expect(rolls[rolls.length - 1] % 360).toBe(0);
    });
  });

  it('la falda empieza y acaba en la onda de reposo (sin salto)', () => {
    const ctx = built();
    conAnimate((calls) => {
      frontFlip(ctx);
      const falda = calls.find((c) => c.node === ctx.el.clip && 'd' in c.frames[0])!;
      const d = (f: Keyframe) => /path\("(.*)"\)/.exec(String(f['d']))?.[1];
      expect(d(falda.frames[0])).toBe(idleDAt(ctx, 0));
      expect(d(falda.frames[falda.frames.length - 1])).toBe(idleDAt(ctx, 1000));
    });
  });

  it('el giro se suma a la inclinación de reposo: una forma que descansa torcida acaba torcida igual', () => {
    const ctx = built();
    ctx.pose = { yaw: 0, pitch: 0, roll: -3 };
    conAnimate((calls) => {
      frontFlip(ctx);
      const giro = calls.find((c) => c.node === ctx.el.clip && 'transform' in c.frames[0])!;
      const rolls = giro.frames.slice(1).map((f) => Number(/rotate\((-?[\d.]+)deg\)/.exec(String(f['transform']))?.[1]));
      expect(rolls[0]).toBeCloseTo(-3, 1);
      expect(rolls[rolls.length - 1]).toBeCloseTo(357, 1); // -3° + una vuelta = -3° otra vez
    });
  });

  it('el Tofu (con H/V) hace el flip igual, solo sin la falda', () => {
    const ctx = built({ shape: tofuShape });
    conAnimate((calls) => {
      frontFlip(ctx);
      expect(calls.some((c) => c.node === ctx.el.clip && 'd' in c.frames[0])).toBe(false);
      expect(calls.some((c) => c.node === ctx.el.hop)).toBe(true);
    });
  });

  it('con movimiento reducido NO hay vuelta: un saltito de 300–450 ms', () => {
    const ctx = built();
    (ctx as { reduce: boolean }).reduce = true;
    conAnimate((calls) => {
      frontFlip(ctx);
      const hop = calls.find((c) => c.node === ctx.el.hop)!;
      expect(Number(hop.options.duration)).toBeGreaterThanOrEqual(300);
      expect(Number(hop.options.duration)).toBeLessThanOrEqual(450);
      expect(calls.some((c) => c.node === ctx.el.clip)).toBe(false); // ni giro ni falda
      expect(calls.some((c) => c.node === ctx.el.flip)).toBe(false);
    });
  });
});

describe('contrato con el motor', () => {
  it('la marca de los efectos del flip es la que retira el motor', async () => {
    const { GESTURE_FX_MARK } = gfBotKit;
    expect(GESTURE_FX_MARK).toBe('flipfx');
  });
});
