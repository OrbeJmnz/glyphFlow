import { gfBotKit, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';
import { describe, expect, it } from 'vitest';
import { jellyWobbleDef, tornadoSpinDef, waveThroughBodyDef } from './region';

const { motion, body } = gfBotKit;
const { applyField, shear, wave, taper, frameAt, tracksOf } = motion;

const CAJA = 'M60 60 L140 60 L140 180 L60 180 Z';
const puntos = (d: string): number[][] => [...d.matchAll(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g)].map((m) => [+m[1], +m[2]]);
const frames = (def: GestureDef, n = 300) => {
  const tr = tracksOf(def.score);
  return Array.from({ length: n + 1 }, (_, i) => frameAt(def, tr, i / n));
};

describe('campo de deformación por región', () => {
  it('shear: la cabeza se desplaza más que la base', () => {
    const [a, b, c, d] = puntos(applyField(CAJA, [shear(() => 10, 0)], 0.5, 60, 180));
    expect(a[0] - 60).toBeGreaterThan(9.9); // arriba
    expect(d[0] - 60).toBeLessThan(2); // abajo, anclada
    expect(b[0] - 140).toBeGreaterThan(9.9);
    expect(c[0] - 140).toBeLessThan(2);
  });

  it('shear: la base responde con retraso', () => {
    const amp = (t: number) => (t > 0.3 ? 10 : 0);
    const arriba = (t: number) => puntos(applyField(CAJA, [shear(amp, 0.3)], t, 60, 180))[0][0];
    const abajo = (t: number) => puntos(applyField(CAJA, [shear(amp, 0.3)], t, 60, 180))[3][0];
    expect(arriba(0.32)).toBeGreaterThan(65);
    expect(abajo(0.32)).toBeCloseTo(60, 1); // todavía no llegó
    expect(abajo(0.62)).toBeGreaterThan(61);
  });

  it('wave: la onda llega antes a la izquierda y el centro no se desplaza', () => {
    const amp = (t: number) => (t > 0.2 && t < 0.4 ? 0.1 : 0);
    const f = [wave(amp, 0.5, 1)];
    const t = 0.3;
    const [izq, der] = puntos(applyField(CAJA, f, t, 60, 180));
    expect(izq[1]).toBeGreaterThan(60.5); // ya pasó por la izquierda: la tapa baja
    expect(der[1]).toBeCloseTo(60, 1); // la derecha todavía no
    // la base nunca se mueve
    const base = puntos(applyField(CAJA, f, t, 60, 180)).slice(2);
    for (const p of base) expect(p[1]).toBeCloseTo(180, 0);
  });

  it('taper: cabeza ancha, base estrecha', () => {
    const [a, , , d] = puntos(applyField(CAJA, [taper(() => 0.5, 0)], 0.5, 60, 180));
    expect(Math.abs(a[0] - 100)).toBeGreaterThan(40);
    expect(Math.abs(d[0] - 100)).toBeLessThan(40);
  });

  it('sin amplitud devuelve el trazo igual', () => {
    expect(applyField(CAJA, [shear(() => 0), wave(() => 0), taper(() => 0)], 0.4, 60, 180)).toBe(CAJA);
  });
});

describe('flexD', () => {
  it('Tofu (H/V) pasa a L y dibuja lo mismo', () => {
    const tofu = 'M68 49 H131 C149.2 49 164 63.8 164 82 V148 C164 162.9 151.9 175 137 175 H63 C48.1 175 36 162.9 36 148 V82 C36 63.8 50.3 49 68 49 Z';
    const d = body.flexD(tofu)!;
    expect(d).not.toMatch(/[HV]/);
    expect(d).toContain('L131 49');
    expect(d).toContain('L164 148');
    expect(body.canFlexHem(d)).toBe(true);
    expect(body.pathExtent(d)).toEqual(body.pathExtent(tofu));
  });
  it('un arco o un relativo no se deforman', () => {
    expect(body.flexD('M0 0 A5 5 0 0 1 10 10')).toBeUndefined();
    expect(body.flexD('m0 0 l5 5')).toBeUndefined();
  });
});

describe.each([
  ['jellyWobble', jellyWobbleDef],
  ['waveThroughBody', waveThroughBodyDef],
  ['tornadoSpin', tornadoSpinDef],
])('%s', (_n, def) => {
  it('empieza y termina en reposo (el giro, módulo una vuelta)', () => {
    for (const t of [0, 1]) {
      const f = frameAt(def(), tracksOf(def().score), t);
      expect(f.x).toBeCloseTo(0, 9);
      expect(f.y).toBeCloseTo(0, 9);
      expect(f.roll).toBeCloseTo(0, 9);
      expect(Math.sin(f.yaw)).toBeCloseTo(0, 6);
      expect(Math.cos(f.yaw)).toBeCloseTo(1, 6);
      expect(f.hopX * f.poseX).toBeCloseTo(1, 9);
      expect(f.hopY * f.poseY).toBeCloseTo(1, 9);
    }
  });
  it('el campo vale cero en los extremos: la silueta termina en la original', () => {
    for (const f of def().field ?? []) {
      expect(f.amp(0)).toBeCloseTo(0, 9);
      expect(f.amp(1)).toBeCloseTo(0, 9);
    }
  });
});

describe('jellyWobble', () => {
  it('la oscilación se apaga y cada región va retrasada', () => {
    const f = jellyWobbleDef().field![0];
    const picos: number[] = [];
    for (let i = 1; i < 400; i++) {
      const [a, b, c] = [f.amp((i - 1) / 400), f.amp(i / 400), f.amp((i + 1) / 400)];
      if (Math.abs(b) > 0.5 && Math.abs(b) >= Math.abs(a) && Math.abs(b) > Math.abs(c)) picos.push(Math.abs(b));
    }
    expect(picos.length).toBeGreaterThanOrEqual(4);
    for (let i = 1; i < picos.length; i++) expect(picos[i]).toBeLessThan(picos[i - 1]);
    expect(f.lag).toBeGreaterThanOrEqual(0.02);
    expect(f.lag).toBeLessThanOrEqual(0.05);
  });
});

describe('tornadoSpin', () => {
  it('gira dos vueltas acelerando y frena', () => {
    const fr = frames(tornadoSpinDef());
    const yaw = fr.map((f) => f.yaw);
    expect(Math.max(...yaw)).toBeGreaterThan(8 * Math.PI - 0.1);
    const v = (a: number, b: number) => (yaw[b] - yaw[a]) / (b - a);
    expect(v(150, 180)).toBeGreaterThan(v(60, 90)); // más rápido a mitad que al principio
    expect(v(270, 300)).toBeLessThan(v(150, 180)); // frenado al final
  });
  it('a máxima velocidad la silueta es ancha arriba y estrecha abajo', () => {
    const t = tornadoSpinDef().field![0];
    expect(t.amp(0.6)).toBeGreaterThan(0.4);
  });
});
