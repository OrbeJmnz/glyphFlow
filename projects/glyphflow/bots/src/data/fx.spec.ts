import { estimateSilhouette, measureSilhouette, sampleSilhouette } from '../engine/silhouette';
import { ACCX, FX_VARS, accXMarkup, fxBackMarkup, fxInMarkup, fxOutMarkup } from './fx';
import { BOT_TOKENS, botTokens } from './tokens';

describe('glyphflow/bots · efectos y accesorios', () => {
  it('declara los 4 efectos y los 4 accesorios extra', () => {
    expect(Object.keys(FX_VARS)).toEqual(['glow', 'pixel', 'glitch', 'bug']);
    expect(Object.keys(ACCX)).toEqual(['halo', 'glasses', 'heart', 'earphones']);
  });

  it('cada efecto vive en su capa y se enciende por clase, no por estilo en línea', () => {
    const inside = fxInMarkup('b1', { cy: 112 });
    expect(inside).toContain('xfx-glow');
    expect(inside).toContain('xfx-bug');
    expect(fxBackMarkup('b1')).toContain('xfx-glow');
    const out = fxOutMarkup('b1', { cy: 112 });
    expect(out).toContain('xfx-glitch');
    expect(out).toContain('xfx-bug');
  });

  it('el glow sigue la silueta animada y el escarabajo la recorre', () => {
    expect(fxInMarkup('b4', { cy: 112 })).toContain('href="#b4-cs"');
    expect(fxOutMarkup('b4', { cy: 112 })).toContain('<mpath href="#b4-cs"/>');
  });

  const sh = { cy: 112, d: 'M0 0', faceY: 112 };
  const m = { top: 52, topX: 100, l: 42, r: 158 };

  it('los accesorios se colocan con las medidas que se les pasan', () => {
    const halo = accXMarkup('halo', sh, 'b1', m);
    expect(halo).toContain(`translate(${(100 - 104).toFixed(2)} ${(52 - 64).toFixed(2)})`);
    expect(accXMarkup('earphones', sh, 'b1', m)).toContain('url(#b1-nag)');
  });

  it('las gafas no se dibujan aquí (van en la cara) y un accesorio desconocido es vacío', () => {
    expect(accXMarkup('glasses', sh, 'b1', m)).toBe('');
    expect(accXMarkup('zz', sh, 'b1', m)).toBe('');
  });
});

describe('glyphflow/bots · tokens de color', () => {
  it('las pieles con paleta propia devuelven los 8 canales', () => {
    for (const t of Object.values(BOT_TOKENS)) {
      for (const c of ['base', 'primary', 'secondary', 'tertiary', 'highlight', 'shadow', 'edge', 'glow'] as const) {
        expect(t[c]).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    }
  });

  it('el gato y el pulpo derivan sus tokens de su paleta; lo desconocido es null', () => {
    expect(botTokens('g1')?.tertiary).toBe('#FF7180');
    expect(botTokens('g3')?.stroke).toBe('#D85B3F');
    expect(botTokens('o4')?.edge).toBe('#8C6CFF');
    expect(botTokens('neu')).toBeNull();
  });
});

describe('glyphflow/bots · silueta', () => {
  // Un círculo de radio 50 centrado en (100, 112): coronilla en y=62.
  const circulo = {
    getTotalLength: () => 2 * Math.PI * 50,
    getPointAtLength: (s: number) => ({
      x: 100 + 50 * Math.cos(s / 50 - Math.PI / 2),
      y: 112 + 50 * Math.sin(s / 50 - Math.PI / 2),
    }),
  };

  it('encuentra la coronilla y el ancho a la altura de los ojos', () => {
    const r = sampleSilhouette(circulo, 112);
    expect(r.top).toBeCloseTo(62, 0);
    expect(r.topX).toBeCloseTo(100, 0);
    expect(r.l).toBeCloseTo(50, 0);
    expect(r.r).toBeCloseTo(150, 0);
  });

  it('si el trazo no cruza la altura pedida, cae a un ancho por defecto', () => {
    const r = sampleSilhouette(circulo, 500);
    expect([r.l, r.r]).toEqual([40, 160]);
  });

  it('sin DOM estima en vez de romper', () => {
    expect(estimateSilhouette(112).top).toBe(64);
  });

  it('con DOM mide el trazo y no deja el probe con contenido pegado al body', () => {
    // jsdom no implementa la geometría de SVG: se presta un círculo y se RETIRA siempre.
    const proto = Element.prototype as unknown as Record<string, unknown>;
    proto['getTotalLength'] = () => circulo.getTotalLength();
    proto['getPointAtLength'] = (s: number) => circulo.getPointAtLength(s);
    try {
      const m = measureSilhouette('M0 0 circulo-unico', 112);
      expect(m.top).toBeCloseTo(62, 0);
      // segunda llamada: sale del caché aunque ya no haya geometría que medir
      expect(measureSilhouette('M0 0 circulo-unico', 112)).toBe(m);
      const probe = document.getElementById('gf-bot-silhouette-probe');
      expect(probe?.getAttribute('aria-hidden')).toBe('true');
      expect(probe?.childElementCount ?? 0).toBe(0);
      probe?.remove();
    } finally {
      delete proto['getTotalLength'];
      delete proto['getPointAtLength'];
    }
  });
});
