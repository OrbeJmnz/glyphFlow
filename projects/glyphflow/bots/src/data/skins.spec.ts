import { hexMix, mixHex } from './color';
import { fantPath, fantSkin, FANT_VARS, isFant } from './fantasma';
import { GATO_PAL, GATO_VARS, gatoPart, gatoSkin, isGato } from './gato';
import { PULPO_PAL, PULPO_VARS, isPulpo, pulpoD, pulpoIdleSt, pulpoSkin } from './pulpo';

describe('glyphflow/bots · color', () => {
  it('mixHex mezcla en proporción y hexMix da lo mismo', () => {
    expect(mixHex('#000000', '#ffffff', 0)).toBe('#000000');
    expect(mixHex('#000000', '#ffffff', 1)).toBe('#ffffff');
    expect(mixHex('#000000', '#ffffff', 0.5)).toBe('#808080');
    expect(hexMix('#336699', '#ffcc00', 0.3)).toBe(mixHex('#336699', '#ffcc00', 0.3));
  });
});

describe('glyphflow/bots · pieles', () => {
  it('cada familia declara tantas paletas como variantes', () => {
    expect(Object.keys(GATO_PAL)).toEqual(Object.keys(GATO_VARS));
    expect(Object.keys(PULPO_PAL)).toEqual(Object.keys(PULPO_VARS));
    expect(Object.keys(FANT_VARS).length).toBe(12);
  });

  it('los reconocedores aceptan solo su familia', () => {
    expect(isGato('g7') && !isGato('f7') && !isGato('o1')).toBe(true);
    expect(isFant('f12') && !isFant('g12')).toBe(true);
    expect(isPulpo('o6') && !isPulpo('n6')).toBe(true);
  });

  it('toda piel devuelve las tres capas y cuelga de los ids del bot', () => {
    for (const skin of [
      ...Object.keys(GATO_VARS).map((v) => gatoSkin(v, 'b9')),
      ...Object.keys(FANT_VARS).map((v) => fantSkin(v, 'b9')),
      ...Object.keys(PULPO_VARS).map((v) => pulpoSkin(v, 'b9')),
    ]) {
      expect(Object.keys(skin).sort()).toEqual(['back', 'over', 'paint']);
      for (const [, id] of `${skin.back}${skin.paint}${skin.over}`.matchAll(/url\(#(b\d+)-/g)) {
        expect(id).toBe('b9');
      }
    }
  });

  it('una piel desconocida cae en la de partida en vez de romper', () => {
    expect(gatoSkin('zz', 'b1')).toEqual(gatoSkin('g12', 'b1'));
    expect(pulpoSkin('zz', 'b1')).toEqual(pulpoSkin('o1', 'b1'));
  });

  it('el gato pinta orejas y cola; la cola es una cadena de 3 tramos', () => {
    expect(gatoPart('g1', 'b1', 'earL')).toContain('<path');
    expect(gatoPart('g1', 'b1', 'tail').match(/class="gt gt\d"/g)?.length).toBe(3);
  });

  it('la sábana del fantasma ondula entre dos fases y cierra el trazo', () => {
    expect(fantPath(0)).not.toBe(fantPath(1));
    expect(fantPath(0.5).endsWith(' Z')).toBe(true);
  });

  it('el pulpo en reposo es simétrico por espejo y un gesto cambia el trazo', () => {
    expect(pulpoD({}).endsWith(' Z')).toBe(true);
    expect(pulpoD({ aL: 40 })).not.toBe(pulpoD({}));
    expect(pulpoD(pulpoIdleSt(0))).toBe(pulpoD(pulpoIdleSt(0)));
    expect(pulpoIdleSt(Math.PI / 2).aL).toBeCloseTo(9, 5);
  });
});
