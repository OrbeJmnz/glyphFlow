import { botSkeleton } from './skeleton';

/** Las capas y huecos que el motor y las pieles buscan por clase: renombrar una rompe en silencio. */
const CONTRATO = [
  'hop', 'breath', 'flip', 'face', 'light', 'gloss', 'clipShape', 'skinBack', 'skinPaint',
  'skinOver', 'shapeFxBack', 'shapeFxIn', 'shapeFxOut', 'accBack', 'accFront', 'hatShadow',
  'shadow', 'dots', 'thought', 'spinner', 'zlayer', 'world', 'toys',
  'key', 'sheen', 'rl', 'rr', 'rt', 'rb', 'lift', 'mood', 'dim',
];

describe('glyphflow/bots · esqueleto SVG', () => {
  const svg = botSkeleton('b1');

  it('es un solo <svg> de 200×212 sin interpolaciones sin resolver', () => {
    expect(svg.trim().startsWith('<svg class="bot" viewBox="0 0 200 212"')).toBe(true);
    expect(svg.trim().endsWith('</svg>')).toBe(true);
    expect(svg).not.toContain('${');
  });

  it('trae todas las capas del contrato', () => {
    for (const c of CONTRATO) expect(svg, c).toMatch(new RegExp(`class="[^"]*\\b${c}\\b`));
  });

  it('todos los ids cuelgan del prefijo y los url(#…) apuntan a ids que existen', () => {
    const ids = [...svg.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
    expect(ids.every((i) => i.startsWith('b1-'))).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
    const refs = [...svg.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
    for (const r of refs) expect(ids, r).toContain(r);
  });

  it('dos bots no comparten ningún id', () => {
    const a = new Set([...botSkeleton('b1').matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
    const b = [...botSkeleton('b2').matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
    expect(b.some((i) => a.has(i))).toBe(false);
  });
});
