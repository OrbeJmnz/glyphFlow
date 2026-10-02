import { KAWAII, kEye, kMouth, cloudIn, type GfKawaiiMouth } from './kawaii';

describe('glyphflow/bots · caras kawaii', () => {
  const entries = Object.entries(KAWAII);

  it('trae las 30 expresiones de la hoja + yawn, drowsy y error', () => {
    expect(entries.length).toBe(33);
    for (const k of ['yawn', 'drowsy', 'error']) expect(k in KAWAII).toBe(true);
  });

  it('toda expresión tiene ojo izquierdo y una boca que el dibujador conoce', () => {
    for (const [id, e] of entries) {
      expect(e.L, id).toBeDefined();
      expect(kMouth(e.M, 100, 150, 1, '#202047').length, id).toBeGreaterThan(0);
    }
  });

  it('una boca desconocida no rompe: devuelve vacío', () => {
    expect(kMouth('nope' as GfKawaiiMouth, 100, 150, 1, '#000')).toBe('');
  });

  it('el ojo derecho es espejo del izquierdo: lo de afuera cambia de lado', () => {
    const brow = { t: 'dot', brow: 'in' } as const;
    const izq = kEye(brow, 70, 118, 11, 16, 0.5, -1, '#000', 'b1');
    const der = kEye(brow, 70, 118, 11, 16, 0.5, 1, '#000', 'b1');
    expect(izq).not.toBe(der);
  });

  it('los cachetes solo salen si la cara los pide', () => {
    const dot = { t: 'dot' } as const;
    expect(kEye(dot, 70, 118, 11, 16, 0.5, -1, '#000', 'b1')).not.toContain('kcheek');
    expect(kEye(dot, 70, 118, 11, 16, 0.5, -1, '#000', 'b1', '#F5AED6')).toContain('kcheek');
  });

  it('el párpado recorta con un clipPath que cuelga del prefijo del bot', () => {
    const svg = kEye({ t: 'dot', lid: 1 }, 70, 118, 11, 16, 0.5, -1, '#000', 'b7');
    expect(svg).toContain('id="b7-klL"');
    expect(svg).toContain('url(#b7-klL)');
  });

  it('el borde de la nube sigue a la silueta animada por medio de <use>', () => {
    const svg = cloudIn('b4');
    expect(svg.match(/<use href="#b4-cs"/g)?.length).toBe(3);
  });
});
