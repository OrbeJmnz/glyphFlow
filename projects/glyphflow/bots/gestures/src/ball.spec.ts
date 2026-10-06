import { gfBotKit } from 'glyphflow/bots';
import { describe, expect, it } from 'vitest';
import { ballMorphDef } from './ball';

const { applyField, ball, frameAt, tracksOf } = gfBotKit.motion;

const CAJA = 'M60 60 L140 60 L140 180 L60 180 Z';
const puntos = (d: string): number[][] => [...d.matchAll(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g)].map((m) => [+m[1], +m[2]]);

describe('ball (campo)', () => {
  it('con amp = 1 todo el contorno queda en un círculo apoyado en el suelo', () => {
    const f = [ball(() => 1, { lag: 0, lagX: 0, r: 0.4 })];
    const R = 0.4 * 120; // 48
    const cyb = 180 - R;
    const pts = puntos(applyField(CAJA, f, 0.5, 60, 180));
    for (const [x, y] of pts) expect(Math.hypot(x - 100, y - cyb)).toBeCloseTo(R, 1);
    // la parte más baja de la bola toca el suelo
    expect(Math.max(...pts.map((p) => p[1]))).toBeLessThanOrEqual(180 + 1e-6);
    expect(Math.max(...pts.map((p) => p[1]))).toBeGreaterThan(150);
  });

  it('sin amplitud devuelve el trazo igual, y a medias queda entre la forma y la bola', () => {
    expect(applyField(CAJA, [ball(() => 0)], 0.5, 60, 180)).toBe(CAJA);
    const a = puntos(applyField(CAJA, [ball(() => 0.5, { lag: 0, lagX: 0 })], 0.5, 60, 180));
    const b = puntos(applyField(CAJA, [ball(() => 1, { lag: 0, lagX: 0 })], 0.5, 60, 180));
    // la esquina de abajo-izquierda (60, 180): a medias está a mitad de camino
    expect(a[3][0]).toBeGreaterThan(60);
    expect(a[3][0]).toBeLessThan(b[3][0]);
  });

  it('la falda se recoge antes que la cabeza', () => {
    const f = [ball((t) => (t < 0.2 ? 0 : 1), { lag: 0.3, lagX: 0, r: 0.4 })];
    const en = (t: number) => puntos(applyField(CAJA, f, t, 60, 180));
    // t = 0.3: abajo (retraso 0) ya empezó; arriba (retraso 0.3) todavía no
    expect(en(0.3)[3][0]).toBeGreaterThan(60); // la esquina de abajo ya se movió
    expect(en(0.3)[0]).toEqual([60, 60]); // la de arriba sigue donde estaba
  });

  it('no lo modera flex', () => {
    const f = [ball(() => 1, { lag: 0, lagX: 0 })];
    expect(applyField(CAJA, f, 0.5, 60, 180, 0.45)).toBe(applyField(CAJA, f, 0.5, 60, 180, 1));
  });
});

describe('la cara dentro de la bola', () => {
  const { fieldOffset } = gfBotKit.motion;
  it('un punto de dentro baja con el centro del cuerpo; uno del borde va al círculo', () => {
    const f = [ball(() => 1, { lag: 0, lagX: 0, r: 0.4 })];
    // centro original y = 120, centro de la bola y = 180 - 48 = 132: la cara baja 12
    const [, oy] = fieldOffset(f, 0.5, 0.5, 60, 180, 1, true);
    expect(oy).toBeCloseTo(12, 6);
    // el borde de arriba (la cabeza) baja hasta el techo de la bola: 132 - 48 = 84, desde 60
    const [, ay] = fieldOffset(f, 0.5, 0, 60, 180, 1, false);
    expect(ay).toBeCloseTo(24, 6);
  });
});

describe('ballMorph', () => {
  const d = ballMorphDef();
  const fr = (t: number) => frameAt(d, tracksOf(d.score), t);

  it('termina exactamente en reposo (silueta, posición y giro)', () => {
    for (const t of [0, 1]) {
      expect(fr(t).x).toBeCloseTo(0, 9);
      expect(fr(t).y).toBeCloseTo(0, 9);
      expect(fr(t).roll).toBeCloseTo(0, 9);
      expect(fr(t).hopX * fr(t).poseX).toBeCloseTo(1, 9);
      expect(fr(t).hopY * fr(t).poseY).toBeCloseTo(1, 9);
    }
    for (const f of d.field!) {
      expect(f.amp(0)).toBeCloseTo(0, 9);
      expect(f.amp(1)).toBeCloseTo(0, 9);
    }
  });

  it('se hace bola, aguanta, salta una vez girando un poco y aterriza con squash de pelota', () => {
    const b = d.field![0];
    expect(b.amp(0.3)).toBeCloseTo(1, 6);
    expect(b.amp(0.5)).toBeCloseTo(1, 6); // sigue siendo bola en el aire
    const ys = Array.from({ length: 401 }, (_, i) => fr(i / 400).y);
    expect(Math.min(...ys)).toBeLessThan(-40);
    const rolls = Array.from({ length: 401 }, (_, i) => fr(i / 400).roll);
    expect(Math.max(...rolls)).toBeGreaterThan(20);
    expect(Math.max(...rolls)).toBeLessThan(60); // no hace falta 360°
    const l = fr(0.6);
    expect(l.hopX * l.poseX).toBeGreaterThan(1.1);
    expect(l.hopY * l.poseY).toBeLessThan(0.9);
  });

  it('se despliega desde el centro y la falda vuelve después', () => {
    const b = d.field![0];
    expect(b.lagX).toBeGreaterThan(0.02);
    expect(b.amp(0.72)).toBeLessThan(b.amp(0.62));
    expect(b.amp(0.84)).toBeLessThan(0.2);
  });
});
