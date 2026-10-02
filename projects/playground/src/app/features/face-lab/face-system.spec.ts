import { describe, expect, it } from 'vitest';
import { BOT_SHAPES, SHAPE_ORDER } from './bot-shapes';
import {
  EXPRESSION_ORDER,
  FACE_STYLES,
  metricsFromRows,
  renderBot,
  resolveTokens,
  type ShapeMetrics,
} from './face-system';

/** Métricas falsas pero coherentes: una silueta de `w` de ancho entre `top` y `top + h`. */
function fake(top: number, h: number, w: number, anchaAbajo = false): ShapeMetrics {
  const rows: [number, number][] = [];
  for (let y = top; y <= top + h; y += 2) {
    const t = (y - top) / h;
    rows.push([
      y,
      Math.round(w * (anchaAbajo ? Math.sin(t * Math.PI * 0.8 + 0.2) : Math.sin(t * Math.PI))),
    ]);
  }
  return metricsFromRows(rows, { x: 100 - w / 2, y: top, w, h });
}

describe('sistema facial', () => {
  it('12 variantes, cada una con tokens para UI clara, UI oscura y visor', () => {
    expect(FACE_STYLES.map((v) => v.n)).toEqual([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ]);
    for (const v of FACE_STYLES)
      for (const s of ['light', 'dark', 'visor'] as const)
        expect(v.tok[s].primary, `${v.id}/${s}`).toMatch(/^#/);
  });

  it('las 12 × 10 × 8 combinaciones pintan un SVG sano, grande y chico', () => {
    for (const v of FACE_STYLES)
      for (const expr of EXPRESSION_ORDER)
        for (const shape of SHAPE_ORDER)
          for (const lod of ['lg', 'sm'] as const) {
            const svg = renderBot({ shape, face: v.id, expr, lod, uid: 't' });
            const donde = `${v.id}/${expr}/${shape}/${lod}`;
            expect(svg.startsWith('<svg'), donde).toBe(true);
            expect(svg, donde).not.toMatch(/NaN|undefined|Infinity/);
            // Nada rasterizado: la cara es geometría.
            expect(svg, donde).not.toMatch(/<image|data:image|\.png|\.webp/);
            expect(svg.match(/class="fl-eye"/g)?.length, donde).toBe(2);
          }
  });

  it('las expresiones cambian la geometría, no solo un color', () => {
    const cuerpo = (expr: (typeof EXPRESSION_ORDER)[number]) =>
      renderBot({ shape: 'huevo', face: 'system', expr, uid: 't' }).replace(
        /--face-accent:[^;]+;/,
        '',
      );
    const vistas = new Set(EXPRESSION_ORDER.map(cuerpo));
    expect(vistas.size).toBe(EXPRESSION_ORDER.length);
  });

  it('el parpadeo solo toma los ojos abiertos', () => {
    const abiertos = (expr: 'neutral' | 'wink' | 'sleeping') =>
      renderBot({ shape: 'huevo', face: 'flat', expr, uid: 't' }).match(/data-open/g)?.length ?? 0;
    expect(abiertos('neutral')).toBe(2);
    expect(abiertos('wink')).toBe(1);
    expect(abiertos('sleeping')).toBe(0);
  });

  it('a tamaño chico se quitan los detalles finos', () => {
    const pinta = (expr: 'neutral' | 'success', lod: 'sm' | 'lg') =>
      renderBot({ shape: 'huevo', face: 'pastel', expr, lod, uid: 't' });
    // El brillito y las mejillas viven en los ojos abiertos; la chispa, en el éxito.
    expect(pinta('neutral', 'lg')).toContain('fl-spec');
    expect(pinta('neutral', 'lg')).toContain('fl-cheek');
    expect(pinta('success', 'lg')).toContain('fl-spark');
    expect(pinta('neutral', 'sm')).not.toContain('fl-spec');
    expect(pinta('neutral', 'sm')).not.toContain('fl-cheek');
    expect(pinta('success', 'sm')).not.toContain('fl-spark');
  });

  it('10 Adaptive lee la silueta; las demás no', () => {
    const alto = fake(40, 136, 90); // píldora: alta y angosta
    const ancho = fake(58, 114, 142); // caramelo: ancho y bajo
    const gap = (svg: string) => Number(/--face-eye-gap:([\d.]+)/.exec(svg)?.[1]);
    const a1 = renderBot({ shape: 'pildora', face: 'adaptive', expr: 'neutral', uid: 't' }, alto);
    const a2 = renderBot({ shape: 'circulo', face: 'adaptive', expr: 'neutral', uid: 't' }, ancho);
    expect(gap(a1)).toBeLessThan(gap(a2));
    const f1 = renderBot({ shape: 'pildora', face: 'flat', expr: 'neutral', uid: 't' }, alto);
    const f2 = renderBot({ shape: 'circulo', face: 'flat', expr: 'neutral', uid: 't' }, ancho);
    expect(gap(f1)).toBe(gap(f2));
  });

  it('el robot usa los tokens de su visor, y Solid/System un acento por expresión', () => {
    const solid = FACE_STYLES.find((v) => v.id === 'solid')!;
    expect(resolveTokens(solid, 'robot', 'light', 'neutral')).toBe(solid.tok.visor);
    expect(resolveTokens(solid, 'huevo', 'light', 'happy').accent).toBe('#FF5FA2');
    expect(resolveTokens(solid, 'huevo', 'light', 'success').accent).toBe('#22C57E');
    expect(BOT_SHAPES.robot.skin).toBe('robot');
  });
});
