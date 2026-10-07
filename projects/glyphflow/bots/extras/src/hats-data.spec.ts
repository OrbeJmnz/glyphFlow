import { HATS, HAT_ACC, HAT_MAT, type GfBotHeadMetrics } from './hats-data';

const HEAD: GfBotHeadMetrics = { w: 62, ry: 12 };

describe('glyphflow/bots · sombreros', () => {
  const ids = Object.keys(HATS) as (keyof typeof HATS)[];

  it('declara los 16 sombreros en su orden', () => {
    expect(ids.length).toBe(16);
    expect(ids[0]).toBe('wizard');
    expect(ids[ids.length - 1]).toBe('antenna');
  });

  it('todos traen la física del resorte con valores sensatos', () => {
    for (const id of ids) {
      const h: { k: number; sway: number; lift: number; tip: number } = HATS[id];
      expect(h.k, id).toBeGreaterThan(0);
      expect(h.k, id).toBeLessThan(0.5);
      expect(h.sway, id).toBeGreaterThanOrEqual(0);
      expect(h.lift, id).toBeGreaterThan(0);
      expect(h.tip, id).toBeGreaterThan(0);
    }
  });

  it('las capas que dibujan devuelven SVG y cuelgan del prefijo del bot', () => {
    for (const id of ids) {
      const hat: { back?: (p: string, hd: GfBotHeadMetrics) => string; front?: (p: string, hd: GfBotHeadMetrics) => string; shadow?: (p: string, hd: GfBotHeadMetrics) => string } = HATS[id];
      // Una capa puede ser vacía a propósito (los audífonos no tienen nada detrás del cuerpo),
      // pero el sombrero en conjunto tiene que pintar algo.
      const pintado = [hat.back, hat.front, hat.shadow].map((layer) => layer?.('b5', HEAD) ?? '');
      expect(pintado.join('').length, id).toBeGreaterThan(0);
      for (const svg of pintado) {
        expect(svg, id).not.toContain('undefined');
        expect(svg, id).not.toContain('NaN');
        for (const [, pref] of svg.matchAll(/(?:url\(#|id=")(b\d+)-/g)) expect(pref, id).toBe('b5');
      }
    }
  });

  it('el material toma el color del bot por tokens, no por colores fijos', () => {
    const svg = HAT_MAT('b1', 'x', 'M0 0 L1 1 Z', { g: [0, 0, 1, 1], blobs: [[0, 0, 1, 1, 'tertiary', 0.5]] });
    expect(svg).toContain('var(--bot-highlight)');
    expect(svg).toContain('var(--bot-tertiary)');
  });

  it('el oro es un acento fijo, igual en todas las pieles', () => {
    expect(HAT_ACC.gold('b1')).toContain('#FFD75A');
  });
});
