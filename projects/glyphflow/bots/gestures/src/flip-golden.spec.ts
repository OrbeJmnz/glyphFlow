import { describe, expect, it } from 'vitest';
import { flipFrame } from './flip';
import { smoothstep, track } from '../../src/engine/track';

/**
 * La tabla del front flip tal como se aprobó: un mortal EN 3D (cabeceo de 360° hacia delante, acercándose a quien mira) con el
 * cuerpo rígido en el aire. Antes giraba 360° en el plano (`roll`) y se iba hacia un lado: si alguna vez `flipFrame` se aparta de
 * esta tabla, el flip ya no se ve como el que se aprobó.
 */
const T = {
  y: track([[0, 0], [0.1, 7], [0.2, -34], [0.35, -72], [0.5, -88], [0.65, -72], [0.8, -10], [0.9, 4], [0.95, -3], [1, 0]]),
  x: track([[0, 0], [1, 0]]),
  roll: track([[0, 0], [1, 0]]),
  pitch: track([[0, 0], [0.1, -0.2], [0.2, 0.6], [0.35, Math.PI / 2], [0.5, Math.PI], [0.65, 1.5 * Math.PI], [0.8, 1.9 * Math.PI], [0.9, 2 * Math.PI], [1, 2 * Math.PI]]),
  z: track([[0, 0], [0.2, 0.04], [0.35, 0.12], [0.5, 0.2], [0.65, 0.14], [0.8, 0.05], [0.9, 0], [1, 0]]),
  sx: track([[0, 1], [0.1, 1.06], [0.2, 0.95], [0.3, 1], [0.7, 1], [0.8, 0.97], [0.9, 1.1], [0.95, 0.98], [1, 1]]),
  sy: track([[0, 1], [0.1, 0.9], [0.2, 1.08], [0.3, 1], [0.7, 1], [0.8, 1.04], [0.9, 0.88], [0.95, 1.03], [1, 1]]),
  spread: track([[0, 0], [0.1, 0.1], [0.2, -0.03], [0.3, 0], [0.7, 0], [0.8, -0.02], [0.9, 0.18], [0.95, 0.05], [1, 0]]),
  gel: track([[0, 0], [0.3, 0], [1, 0]]),
  drag: track([[0, 0], [0.1, -1.5], [0.2, 3], [0.3, 0], [0.7, 0], [0.8, -2], [0.9, -2], [0.95, 1], [1, 0]]),
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
      expect(f.pitch).toBeCloseTo(T.pitch(t), 9);
      expect(f.z).toBeCloseTo(T.z(t), 9);
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
