import { gfBotKit } from 'glyphflow/bots';
import { describe, expect, it } from 'vitest';
import { squishTeleportDef, teleportVisibility, TELEPORT_DX } from './teleport';

const { frameAt, tracksOf } = gfBotKit.motion;

describe('squishTeleport', () => {
  const d = squishTeleportDef();
  const f = (t: number) => frameAt(d, tracksOf(d.score), t);
  const sx = (t: number) => f(t).hopX * f(t).poseX;
  const sy = (t: number) => f(t).hopY * f(t).poseY;

  it('termina exactamente donde empezó', () => {
    for (const t of [0, 1]) {
      expect(f(t).x).toBeCloseTo(0, 9);
      expect(f(t).y).toBeCloseTo(0, 9);
      expect(sx(t)).toBeCloseTo(1, 9);
      expect(sy(t)).toBeCloseTo(1, 9);
      expect(f(t).spread).toBeCloseTo(0, 9);
    }
  });

  it('se comprime hasta casi una línea (alto 100 → 60 → 20 → 5 %, ancho 110 → 125 %)', () => {
    expect(sy(0.1)).toBeCloseTo(0.6, 2);
    expect(sy(0.15)).toBeCloseTo(0.2, 2);
    expect(sy(0.19)).toBeCloseTo(0.05, 2);
    expect(sx(0.1)).toBeCloseTo(1.1, 2);
    expect(sx(0.19)).toBeCloseTo(1.25, 2);
  });

  it('cambia de sitio SOLO mientras no se ve', () => {
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      // a medio camino (lejos de los dos extremos) ya no se ve
      if (f(t).x > 14 && f(t).x < TELEPORT_DX - 14) expect(teleportVisibility(t)).toBeLessThan(0.3);
    }
    expect(f(0.3).x).toBeCloseTo(TELEPORT_DX, 6);
    expect(f(0.5).x).toBeCloseTo(TELEPORT_DX, 6);
    expect(teleportVisibility(0.22)).toBe(0);
    expect(teleportVisibility(0.05)).toBe(1);
    expect(teleportVisibility(0.9)).toBe(1);
  });

  it('reaparece como línea horizontal → charco → squash → normal, pasándose de alto 1.05', () => {
    expect(sy(0.25)).toBeLessThan(0.1);
    expect(sy(0.3)).toBeGreaterThan(0.2);
    expect(sy(0.36)).toBeGreaterThan(0.7);
    expect(sy(0.42)).toBeCloseTo(1.05, 2);
    expect(sy(0.54)).toBeCloseTo(1, 2);
  });

  it('la cara se aplasta igual que el cuerpo', () => {
    const fr = f(0.19);
    expect(fr.faceY * fr.hopY).toBeCloseTo(fr.hopY * fr.poseY, 6);
  });

  it('vuelve al origen con la misma secuencia', () => {
    expect(f(0.73).x).toBeCloseTo(TELEPORT_DX, 6);
    expect(f(0.83).x).toBeCloseTo(0, 6);
    expect(sy(0.94)).toBeCloseTo(1.05, 2);
  });
});
