import { cubeShape } from '../../src/shapes/retired';
import { catShape } from '../../src/shapes/cat';
import { mochiShape } from '../../src/shapes/mochi';
import { makeRobot } from '../../src/shapes/robot';
import { hatAccs } from './hat-accs';
import { HATS } from './hats-data';

describe('glyphflow/bots · sombreros pegados a una forma', () => {
  it('un sombrero normal es UN accesorio; el que trae detalle suma otro por delante', () => {
    expect(hatAccs('wizard', mochiShape).length).toBe(1);
    const conDeco = (Object.keys(HATS) as (keyof typeof HATS)[]).filter(
      (k) => 'deco' in HATS[k],
    );
    expect(conDeco.length).toBeGreaterThan(0);
    for (const k of conDeco) expect(hatAccs(k, mochiShape).length, k).toBe(2);
  });

  it('el sombrero se asienta en la coronilla de la forma (hatAt)', () => {
    const [acc] = hatAccs('wizard', catShape);
    expect(acc.p[1]).toBeCloseTo((catShape.hatAt ?? 0) + (HATS.wizard.oy ?? 0) * (catShape.hatK ?? 1), 10);
    expect(acc.hat).toBe(true);
  });

  it('audífonos y visera se ajustan al CUERPO cuando la forma lo permite', () => {
    const robot = makeRobot(cubeShape);
    expect(hatAccs('headphones', catShape)[0].p[1]).toBe(
      (catShape.bodyFit?.y ?? 0) - catShape.cy,
    );
    expect(Number.isNaN(hatAccs('headphones', robot)[0].p[1])).toBe(false);
  });

  it('una forma sin hatAt ni bodyFit no propaga NaN al transform', () => {
    for (const k of Object.keys(HATS) as (keyof typeof HATS)[]) {
      for (const a of hatAccs(k, cubeShape)) {
        expect(a.p.some(Number.isNaN), k).toBe(false);
        expect(a.draw(100, 60, 'b1', 'neu'), k).not.toContain('NaN');
      }
    }
  });
});
