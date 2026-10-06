import { gfBotKit } from 'glyphflow/bots';
import { describe, expect, it } from 'vitest';
import { diveEmergeDef, HIDE_DY, peekPopDef } from './ground';

const { frameAt, tracksOf } = gfBotKit.motion;
const SUELO = gfBotKit.GROUND_Y;

/** Una forma de ejemplo: ojos a y = 108, la parte de arriba a y = 49, la base a 175 (como el Tofu). */
const OJOS = 108;
const TOPE = 49;
const BASE = 175;

describe('peekPop', () => {
  const dy = SUELO - OJOS - 14;
  const d = peekPopDef(dy);
  const f = (t: number) => frameAt(d, tracksOf(d.score), t);

  it('termina exactamente en reposo', () => {
    for (const t of [0, 1]) {
      expect(f(t).y).toBeCloseTo(0, 9);
      expect(f(t).yaw).toBeCloseTo(0, 9);
      expect(f(t).hopX * f(t).poseX).toBeCloseTo(1, 9);
      expect(f(t).hopY * f(t).poseY).toBeCloseTo(1, 9);
    }
  });

  it('se esconde del todo: ni la punta de arriba queda por encima del suelo', () => {
    expect(TOPE + f(0.3).y).toBeGreaterThan(SUELO);
    expect(TOPE + HIDE_DY).toBeGreaterThan(SUELO);
  });

  it('al asomar quedan a la vista los ojos y la parte de arriba, y la base sigue escondida', () => {
    const y = f(0.5).y;
    expect(OJOS + y).toBeLessThan(SUELO); // los ojos se ven
    expect(BASE + y).toBeGreaterThan(SUELO); // la base no
    expect(SUELO - (TOPE + y)).toBeLessThan(80); // solo asoma la cabeza
  });

  it('mira a los dos lados mientras asoma', () => {
    const yaws = Array.from({ length: 101 }, (_, i) => f(0.42 + (0.24 * i) / 100).yaw);
    expect(Math.min(...yaws)).toBeLessThan(-0.35);
    expect(Math.max(...yaws)).toBeGreaterThan(0.35);
  });

  it('se esconde otra vez unos 50–150 ms y reaparece con un estirón vertical de 1.12', () => {
    const ms = 2400;
    expect((0.745 - 0.7) * ms).toBeGreaterThanOrEqual(50);
    expect((0.745 - 0.7) * ms).toBeLessThanOrEqual(150);
    expect(f(0.72).y).toBeCloseTo(HIDE_DY, 3);
    expect(f(0.8).hopY * f(0.8).poseY).toBeCloseTo(1.12, 2);
    expect(f(0.8).y).toBeLessThan(-15);
  });

  it('aterriza con un squash chico', () => {
    expect(f(0.87).hopY * f(0.87).poseY).toBeCloseTo(0.88, 2);
  });
});

describe('diveEmerge', () => {
  const d = diveEmergeDef();
  const f = (t: number) => frameAt(d, tracksOf(d.score), t);
  const sy = (t: number) => f(t).hopY * f(t).poseY;

  it('termina exactamente en reposo', () => {
    for (const t of [0, 1]) {
      expect(f(t).y).toBeCloseTo(0, 9);
      expect(sy(t)).toBeCloseTo(1, 9);
      expect(f(t).spread).toBeCloseTo(0, 9);
    }
  });

  it('antes de sumergirse sube un poco y se estira hacia abajo, y al tocar se aplasta', () => {
    expect(f(0.1).y).toBeLessThan(-5);
    expect(sy(0.18)).toBeGreaterThan(1.15);
    expect(sy(0.22)).toBeLessThan(0.9);
    expect(f(0.22).hopX * f(0.22).poseX).toBeGreaterThan(1.1);
  });

  it('se sumerge de golpe hacia abajo y queda del todo escondido', () => {
    const ys = [0.22, 0.32, 0.42, 0.5].map((t) => f(t).y);
    for (let i = 1; i < ys.length; i++) expect(ys[i]).toBeGreaterThan(ys[i - 1]);
    expect(TOPE + f(0.55).y).toBeGreaterThan(SUELO);
  });

  it('emerge primero la cabeza, luego sale estirado, da un saltito y aterriza con squash', () => {
    expect(TOPE + f(0.7).y).toBeLessThan(SUELO); // ya asoma la cabeza
    expect(BASE + f(0.7).y).toBeGreaterThan(SUELO); // la base todavía no
    expect(sy(0.78)).toBeGreaterThan(1.15);
    expect(f(0.86).y).toBeLessThan(-20);
    expect(sy(0.93)).toBeLessThan(0.9);
  });
});
