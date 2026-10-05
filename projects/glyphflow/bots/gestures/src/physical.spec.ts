import { describe, expect, it } from 'vitest';
import { gfBotKit, type GfBotGestureDef as GestureDef } from 'glyphflow/bots';
import { scaredRecoilDef, stretchSnapDef, superBounceDef } from './physical';

const { frameAt, tracksOf } = gfBotKit.motion;

const frames = (def: GestureDef, n = 200) => {
  const tr = tracksOf(def.score);
  return Array.from({ length: n + 1 }, (_, i) => frameAt(def, tr, i / n));
};
const at = (def: GestureDef, t: number) => frameAt(def, tracksOf(def.score), t);

describe.each([
  ['superBounce', superBounceDef],
  ['stretchSnap', stretchSnapDef],
  ['scaredRecoil', scaredRecoilDef],
])('%s', (_n, def) => {
  it('empieza y termina exactamente en reposo', () => {
    for (const t of [0, 1]) {
      const f = at(def(), t);
      expect(f.x).toBeCloseTo(0, 9);
      expect(f.y).toBeCloseTo(0, 9);
      expect(f.roll).toBeCloseTo(0, 9);
      expect(f.hopX * f.poseX).toBeCloseTo(1, 9);
      expect(f.hopY * f.poseY).toBeCloseTo(1, 9);
      expect(f.spread).toBeCloseTo(0, 9);
      expect(f.drag).toBeCloseTo(0, 9);
    }
  });
  it('nunca atraviesa el suelo más de unas unidades', () => {
    expect(Math.max(...frames(def()).map((f) => f.y))).toBeLessThan(10);
  });
});

describe('superBounce', () => {
  it('anticipa aplastándose, se estira al despegar y se aplasta fuerte al impactar', () => {
    const d = superBounceDef();
    const a = at(d, 0.15);
    expect(a.hopX * a.poseX).toBeGreaterThan(1.12);
    expect(a.hopY * a.poseY).toBeLessThan(0.85);
    const l = at(d, 0.26);
    expect(l.hopX * l.poseX).toBeLessThan(0.92);
    expect(l.hopY * l.poseY).toBeGreaterThan(1.15);
    const i = at(d, 0.77);
    expect(i.hopX * i.poseX).toBeGreaterThan(1.15);
    expect(i.hopY * i.poseY).toBeLessThan(0.84);
  });
  it('sube mucho más que el flip y los rebotes pierden energía', () => {
    const d = superBounceDef();
    const f = frames(d, 400);
    const apex = Math.min(...f.map((x) => x.y));
    expect(apex).toBeLessThan(-110);
    // alturas de los picos tras el impacto (t > 0.78)
    const picos: number[] = [];
    for (let i = 1; i < f.length - 1; i++) {
      if (i / 400 > 0.78 && f[i].y < f[i - 1].y && f[i].y <= f[i + 1].y && f[i].y < -2) picos.push(-f[i].y);
    }
    expect(picos.length).toBe(2);
    expect(picos[1] / picos[0]).toBeGreaterThan(0.3);
    expect(picos[1] / picos[0]).toBeLessThan(0.5);
  });
});

describe('stretchSnap', () => {
  it('estira 1.2–1.3 con la base fija (todo en .hop) y rebota por debajo y por encima', () => {
    const d = stretchSnapDef();
    const s = at(d, 0.44);
    expect(s.hopY).toBeGreaterThan(1.2);
    expect(s.hopY).toBeLessThan(1.3);
    expect(s.y).toBeCloseTo(0, 6);
    expect(s.poseY).toBeCloseTo(1, 9);
    const o = at(d, 0.6);
    expect(o.hopY).toBeLessThan(0.95);
    expect(o.hopX).toBeGreaterThan(1.04);
  });
  it('la falda reacciona después que el cuerpo', () => {
    const f = frames(stretchSnapDef(), 400);
    const tBody = f.findIndex((x, i) => i > 200 && x.hopY < 0.95);
    const tHem = f.findIndex((x, i) => i > 200 && x.spread > 0.1);
    expect(tHem).toBeGreaterThan(tBody);
  });
});

describe('scaredRecoil', () => {
  it('sube estirado y estrecho, aguanta y tiembla con amplitud decreciente', () => {
    const d = scaredRecoilDef();
    const r = at(d, 0.2);
    expect(r.y).toBeLessThan(-15);
    expect(r.hopX * r.poseX).toBeLessThan(0.95);
    expect(r.hopY * r.poseY).toBeGreaterThan(1.1);
    const roll = frames(d, 600).filter((x, i) => i / 600 > 0.42 && i / 600 < 0.95).map((x) => x.roll);
    const maxima: number[] = [];
    for (let i = 1; i < roll.length - 1; i++) {
      const v = Math.abs(roll[i]);
      if (v > Math.abs(roll[i - 1]) && v >= Math.abs(roll[i + 1]) && v > 0.3) maxima.push(v);
    }
    expect(maxima.length).toBeGreaterThanOrEqual(4);
    for (let i = 1; i < maxima.length; i++) expect(maxima[i]).toBeLessThan(maxima[i - 1]);
  });
});

