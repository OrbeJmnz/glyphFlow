import { LUCIDE_STAR, TOYS } from './toys-data';

describe('glyphflow/bots · juguetes', () => {
  it('son tres, heredan el color del bot por tokens y cuelgan del prefijo que les dan', () => {
    expect(Object.keys(TOYS)).toEqual(['star', 'ball', 'cookie']);
    for (const t of Object.values(TOYS)) {
      const svg = t.draw('t7');
      expect(svg).toContain('var(--bot-');
      for (const [, pref] of svg.matchAll(/(?:url\(#|id=")(t\d+)-/g)) expect(pref).toBe('t7');
    }
    expect(LUCIDE_STAR.startsWith('M11.525')).toBe(true);
  });
  it('la galleta mezcla su color con el del bot (color-mix) y conserva uno de respaldo', () => {
    const svg = TOYS.cookie.draw('t1');
    expect(svg).toContain('color-mix(in srgb');
    expect(svg).toMatch(/fill:#E5B27A;fill:color-mix/);
  });
});
