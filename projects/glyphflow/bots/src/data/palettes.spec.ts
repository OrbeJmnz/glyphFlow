import { PALETTES, RIM, resolvePalette } from './palettes';

describe('glyphflow/bots · resolvePalette', () => {
  it('una de serie trae sus tres tonos y su contorno', () => {
    expect(resolvePalette('coral', 'lavender')).toEqual({ colors: PALETTES.coral, rim: RIM.coral });
  });

  it('auto es la de la forma', () => {
    expect(resolvePalette('auto', 'mint').colors).toBe(PALETTES.mint);
  });

  it('un trío propio se usa tal cual y su contorno es la luz', () => {
    const r = resolvePalette(['#FFD6E8', '#FF4F9A', '#7A1049'], 'lavender');
    expect(r.colors).toEqual(['#FFD6E8', '#FF4F9A', '#7A1049']);
    expect(r.rim).toBe('#FFD6E8');
  });

  it('con { colors, rim } el contorno es el que se pide', () => {
    expect(resolvePalette({ colors: ['#111', '#222', '#333'], rim: '#0FF' }, 'lavender').rim).toBe('#0FF');
  });

  it('una propia mal formada falla con un mensaje claro: el error es de quien la define', () => {
    for (const mala of [['#111', '#222'], ['#111', '#222', ''], ['#111', 42, '#333'], { colors: ['#111'] }, { colors: 'rojo' }]) {
      expect(() => resolvePalette(mala as never, 'lavender')).toThrow(/paleta propia/);
    }
  });
});
