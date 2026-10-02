import { MOCHI_VARS } from './faces';
import { ghostSkin } from './ghost';
import { catSkin } from './cat';
import { mochiSkin, mochiTuft } from './mochi';
import { octopusSkin } from './octopus';

describe('glyphflow/bots · piel Mochi', () => {
  const variantes = Object.keys(MOCHI_VARS);
  const D = 'M78 60 C80 50 90 44 100 40 C110 44 120 50 122 60 Z';

  it('cada una de las 18 pieles devuelve las tres capas y solo usa ids de su bot', () => {
    expect(variantes.length).toBe(18);
    for (const v of variantes) {
      const s = mochiSkin(v, 'b8');
      expect(Object.keys(s).sort(), v).toEqual(['back', 'over', 'paint']);
      expect(s.paint.length, v).toBeGreaterThan(0);
      for (const [, pref] of `${s.back}${s.paint}${s.over}`.matchAll(/(?:url\(#|href="#)(b\d+)-/g)) {
        expect(pref, v).toBe('b8');
      }
    }
  });

  it('delega las pieles de las otras familias en su propia función', () => {
    expect(mochiSkin('g4', 'b1')).toEqual(catSkin('g4', 'b1'));
    expect(mochiSkin('f7', 'b1')).toEqual(ghostSkin('f7', 'b1'));
    expect(mochiSkin('o3', 'b1')).toEqual(octopusSkin('o3', 'b1'));
  });

  it('una piel desconocida cae en la neumórfica (la de partida)', () => {
    expect(mochiSkin('zz', 'b1')).toEqual(mochiSkin('neu', 'b1'));
  });

  it('"Línea" lleva contorno encima y "Plano" no lleva nada fuera del relleno', () => {
    expect(mochiSkin('line', 'b1').over).toContain('stroke="#2E2896"');
    expect(mochiSkin('flat', 'b1')).toEqual({
      back: '',
      paint: '<rect x="0" y="0" width="200" height="212" fill="#5E61FC"/>',
      over: '',
    });
  });

  it('las pieles con color vivo envuelven sus manchas en .mflow y numeran cada .mb', () => {
    for (const v of ['gel', 'app', 'ether', 'pastel', 'n1', 'n4']) {
      const { paint } = mochiSkin(v, 'b1');
      expect(paint, v).toContain('class="mflow"');
      expect(paint.match(/class="mb mb\d+"/g)?.length, v).toBeGreaterThan(2);
    }
  });

  it('el copete respeta el contorno y en "Línea" el pie no repite el trazo', () => {
    expect(mochiTuft('line', 'b1', D)).toContain('stroke="#2E2896"');
    expect(mochiTuft('line', 'b1', D, true)).not.toContain('stroke');
    expect(mochiTuft('flat', 'b1', D)).toContain(`d="${D}"`);
  });
});
