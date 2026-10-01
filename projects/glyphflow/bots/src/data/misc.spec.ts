import { HATS } from './hats';
import { hatAccs } from './hat-accs';
import { ROUTINES, STATE_LABEL } from './routines';
import { LUCIDE_STAR, TOYS } from './toys';
import { GF_BOT_STATES } from '../bot-state';
import { TAU, S, clamp01, easeInOut } from '../engine/math';
import { cuboShape } from '../shapes/retired';
import { gatoShape } from '../shapes/gato';
import { mochiShape } from '../shapes/mochi';
import { robotShape } from '../shapes/robot';

describe('glyphflow/bots · matemática', () => {
  it('easeInOut arranca en 0, termina en 1 y es simétrica en el medio', () => {
    expect(easeInOut(0)).toBe(0);
    expect(easeInOut(1)).toBe(1);
    expect(easeInOut(0.5)).toBeCloseTo(0.5, 10);
  });
  it('clamp01 recorta y S arma el scale', () => {
    expect([clamp01(-3), clamp01(0.4), clamp01(9)]).toEqual([0, 0.4, 1]);
    expect(S(2)).toBe('scale(2,2)');
    expect(S(2, 3)).toBe('scale(2,3)');
    expect(TAU).toBeCloseTo(6.283185, 5);
  });
});

describe('glyphflow/bots · estados y rutinas', () => {
  it('hay una etiqueta por cada estado y las rutinas solo existen para los largos', () => {
    expect(Object.keys(STATE_LABEL)).toEqual([...GF_BOT_STATES]);
    expect(ROUTINES.working.length).toBe(6);
    expect(ROUTINES.sleeping.length).toBe(9);
  });
});

describe('glyphflow/bots · juguetes', () => {
  it('son tres, heredan el color del bot por tokens y cuelgan del prefijo que les dan', () => {
    expect(Object.keys(TOYS)).toEqual(['estrella', 'pelota', 'galleta']);
    for (const t of Object.values(TOYS)) {
      const svg = t.draw('t7');
      expect(svg).toContain('var(--bot-');
      for (const [, pref] of svg.matchAll(/(?:url\(#|id=")(t\d+)-/g)) expect(pref).toBe('t7');
    }
    expect(LUCIDE_STAR.startsWith('M11.525')).toBe(true);
  });
  it('la galleta mezcla su color con el del bot (color-mix) y conserva uno de respaldo', () => {
    const svg = TOYS.galleta.draw('t1');
    expect(svg).toContain('color-mix(in srgb');
    expect(svg).toMatch(/fill:#E5B27A;fill:color-mix/);
  });
});

describe('glyphflow/bots · sombreros pegados a una forma', () => {
  it('un sombrero normal es UN accesorio; el que trae detalle suma otro por delante', () => {
    expect(hatAccs('mago', mochiShape).length).toBe(1);
    const conDeco = (Object.keys(HATS) as (keyof typeof HATS)[]).filter(
      (k) => 'deco' in HATS[k],
    );
    expect(conDeco.length).toBeGreaterThan(0);
    for (const k of conDeco) expect(hatAccs(k, mochiShape).length, k).toBe(2);
  });

  it('el sombrero se asienta en la coronilla de la forma (hatAt)', () => {
    const [acc] = hatAccs('mago', gatoShape);
    expect(acc.p[1]).toBeCloseTo((gatoShape.hatAt ?? 0) + (HATS.mago.oy ?? 0) * (gatoShape.hatK ?? 1), 10);
    expect(acc.hat).toBe(true);
  });

  it('audífonos y visera se ajustan al CUERPO cuando la forma lo permite', () => {
    const robot = robotShape(cuboShape);
    expect(hatAccs('audifonos', gatoShape)[0].p[1]).toBe(
      (gatoShape.bodyFit?.y ?? 0) - gatoShape.cy,
    );
    expect(Number.isNaN(hatAccs('audifonos', robot)[0].p[1])).toBe(false);
  });

  it('una forma sin hatAt ni bodyFit no propaga NaN al transform', () => {
    for (const k of Object.keys(HATS) as (keyof typeof HATS)[]) {
      for (const a of hatAccs(k, cuboShape)) {
        expect(a.p.some(Number.isNaN), k).toBe(false);
        expect(a.draw(100, 60, 'b1', 'neu'), k).not.toContain('NaN');
      }
    }
  });
});
