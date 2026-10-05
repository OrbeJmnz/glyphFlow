import { describe, expect, it } from 'vitest';
import { flipFrame } from './flip';
import { smoothstep, track } from './track';

/**
 * El front flip se recompuso con las primitivas de `motion.ts`. Esto es la tabla ORIGINAL (la de antes
 * de la extracción) y la fórmula de entonces: si alguna vez `flipFrame` se aparta de ella, el flip ya
 * no se ve como el que se aprobó.
 */
const T = {
  y: track([[0, 0], [0.1, 7], [0.2, -34], [0.35, -72], [0.5, -88], [0.65, -72], [0.8, -10], [0.9, 4], [0.95, -3], [1, 0]]),
  x: track([[0, 0], [0.1, -1.5], [0.2, 0], [0.5, 4], [0.8, 1.5], [0.9, 0], [1, 0]]),
  roll: track([[0, 0], [0.1, 0], [0.15, 3], [0.2, 15], [0.35, 90], [0.5, 180], [0.65, 270], [0.8, 350], [0.9, 360], [1, 360]]),
  sx: track([[0, 1], [0.1, 1.08], [0.2, 0.9], [0.35, 0.95], [0.5, 1], [0.65, 0.96], [0.8, 0.92], [0.9, 1.13], [0.95, 0.97], [1, 1]]),
  sy: track([[0, 1], [0.1, 0.88], [0.2, 1.15], [0.35, 1.05], [0.5, 0.94], [0.65, 1.06], [0.8, 1.1], [0.9, 0.84], [0.95, 1.04], [1, 1]]),
  spread: track([[0, 0], [0.1, 0.14], [0.2, -0.05], [0.35, 0], [0.5, 0], [0.65, 0], [0.8, -0.04], [0.9, 0.28], [0.95, 0.06], [1, 0]]),
  gel: track([[0, 0], [0.18, 0], [0.3, 7], [0.5, 11], [0.7, 8], [0.84, 3], [0.92, 0], [1, 0]]),
  drag: track([[0, 0], [0.1, -2], [0.2, 6], [0.35, 4.5], [0.5, 1], [0.65, -3], [0.8, -5.5], [0.9, -3], [0.95, 1.5], [1, 0]]),
};

describe('flipFrame sigue siendo el original', () => {
  it('coincide en 201 instantes', () => {
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const sx = T.sx(t);
      const sy = T.sy(t);
      const g = t < 0.5 ? 1 - smoothstep(0.16, 0.3, t) : smoothstep(0.7, 0.84, t);
      const hopX = Math.pow(sx, g);
      const hopY = Math.pow(sy, g);
      const f = flipFrame(t);
      expect(f.x).toBeCloseTo(T.x(t), 9);
      expect(f.y).toBeCloseTo(T.y(t), 9);
      expect(f.roll).toBeCloseTo(T.roll(t), 9);
      expect(f.hopX).toBeCloseTo(hopX, 9);
      expect(f.hopY).toBeCloseTo(hopY, 9);
      expect(f.poseX).toBeCloseTo(Math.pow(sx, 1 - g), 9);
      expect(f.poseY).toBeCloseTo(Math.pow(sy, 1 - g), 9);
      expect(f.faceX).toBeCloseTo((1 + (sx - 1) * 0.4) / hopX, 9);
      expect(f.faceY).toBeCloseTo((1 + (sy - 1) * 0.4) / hopY, 9);
      expect(f.spread).toBeCloseTo(T.spread(t), 9);
      expect(f.drag).toBeCloseTo(T.drag(t), 9);
      expect(f.gel).toBeCloseTo(T.gel(t), 9);
      expect(f.grounded).toBeCloseTo(g, 9);
    }
  });
});
