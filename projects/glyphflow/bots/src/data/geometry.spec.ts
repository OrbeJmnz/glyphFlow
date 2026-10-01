import { FACES, MOCHI_VARS, isMochiNight } from './faces';
import { bolt, catEar, catEarInner, ghostPath, ghostWave, squircle } from './geometry';

describe('glyphflow/bots · geometría', () => {
  it('la onda del fantasma cierra el trazo y sus dos fases son simétricas', () => {
    expect(ghostWave(9).endsWith(' Z')).toBe(true);
    expect(ghostPath(0)).toBe(ghostWave(9));
    expect(ghostPath(1)).toBe(ghostWave(-9));
    expect(ghostWave(9)).not.toBe(ghostWave(-9));
  });

  it('el squircle sale cerrado, con 72 curvas y números con dos decimales', () => {
    const d = squircle(100, 112, 48, 48, 4, 3);
    expect(d.startsWith('M')).toBe(true);
    expect(d.endsWith(' Z')).toBe(true);
    expect(d.match(/ C/g)?.length).toBe(72);
    expect(d).not.toMatch(/\d\.\d{3,}/);
  });

  it('las orejas son espejo y la parte rosa solo se ve de frente', () => {
    expect(catEar(-1).p[0]).toBe(-catEar(1).p[0]);
    expect(catEarInner(1).faceOnly).toBe(true);
    expect(catEar(1).faceOnly).toBeUndefined();
    expect(catEar(1).draw(0, 0, 'b1')).toContain('url(#b1-body)');
  });

  it('el tornillo no gira con la pose y mira hacia afuera', () => {
    const b = bolt(-1);
    expect(b.fixed).toBe(true);
    expect(b.n).toEqual([-1, 0, 0]);
  });
});

describe('glyphflow/bots · caras y pieles', () => {
  it('las caras ocultas son las atadas a una familia de formas', () => {
    const ocultas = Object.entries(FACES)
      .filter(([, f]) => 'hidden' in f && f.hidden)
      .map(([k]) => k);
    expect(ocultas).toEqual(['globo', 'night', 'gato', 'fant']);
  });

  it('las pieles de noche son exactamente n1…n10', () => {
    const noche = Object.keys(MOCHI_VARS).filter(isMochiNight);
    expect(noche).toEqual(['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10']);
    expect(isMochiNight('neu')).toBe(false);
    expect(isMochiNight('n')).toBe(false);
  });
});
