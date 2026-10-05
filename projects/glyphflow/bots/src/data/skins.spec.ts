import { hexMix, mixHex } from './color';
import { ghostSheetPath, ghostSkin, GHOST_VARS, isGhost } from './ghost';
import { CAT_PAL, CAT_VARS, catPart, catSkin, isCat } from './cat';
import { OCTOPUS_PAL, OCTOPUS_VARS, isOctopus, octopusD, octopusIdleSt, octopusSkin } from './octopus';

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
    expect(Object.keys(CAT_PAL)).toEqual(Object.keys(CAT_VARS));
    expect(Object.keys(OCTOPUS_PAL)).toEqual(Object.keys(OCTOPUS_VARS));
    expect(Object.keys(GHOST_VARS).length).toBe(12);
  });

  it('los reconocedores aceptan solo su familia', () => {
    expect(isCat('g7') && !isCat('f7') && !isCat('o1')).toBe(true);
    expect(isGhost('f12') && !isGhost('g12')).toBe(true);
    expect(isOctopus('o6') && !isOctopus('n6')).toBe(true);
  });

  it('toda piel devuelve las tres capas y cuelga de los ids del bot', () => {
    for (const skin of [
      ...Object.keys(CAT_VARS).map((v) => catSkin(v, 'b9')),
      ...Object.keys(GHOST_VARS).map((v) => ghostSkin(v, 'b9')),
      ...Object.keys(OCTOPUS_VARS).map((v) => octopusSkin(v, 'b9')),
    ]) {
      expect(Object.keys(skin).sort()).toEqual(['back', 'over', 'paint']);
      for (const [, id] of `${skin.back}${skin.paint}${skin.over}`.matchAll(/url\(#(b\d+)-/g)) {
        expect(id).toBe('b9');
      }
    }
  });

  it('una piel desconocida cae en la de partida en vez de romper', () => {
    expect(catSkin('zz', 'b1')).toEqual(catSkin('g12', 'b1'));
    expect(octopusSkin('zz', 'b1')).toEqual(octopusSkin('o1', 'b1'));
  });

  it('Línea (g3 y f3) es transparente: sin relleno, solo contorno encima', () => {
    expect(catSkin('g3', 'b1').paint).toBe('');
    expect(ghostSkin('f3', 'b1').paint).toBe('');
    expect(catSkin('g3', 'b1').over).toContain('fill="none"');
    expect(ghostSkin('f3', 'b1').over).toContain('fill="none"');
  });

  it('en Línea las orejas son solo trazo recortado fuera de la cabeza y la cola es una línea', () => {
    const oreja = catPart('g3', 'b1', 'earL');
    expect(oreja).toContain('fill="none"');
    expect(oreja).toContain('clip-path="url(#b1-lec)"');
    expect(oreja).toContain('clip-rule="evenodd"');
    expect(catPart('g1', 'b1', 'earL')).not.toContain('clip-path');
    expect(catPart('g3', 'b1', 'tail')).not.toContain('stroke-width="25.2"');
  });

  it('el gato pinta orejas y cola; la cola es una cadena de 3 tramos', () => {
    expect(catPart('g1', 'b1', 'earL')).toContain('<path');
    expect(catPart('g1', 'b1', 'tail').match(/class="gt gt\d"/g)?.length).toBe(3);
  });

  it('la sábana del fantasma ondula entre dos fases y cierra el trazo', () => {
    expect(ghostSheetPath(0)).not.toBe(ghostSheetPath(1));
    expect(ghostSheetPath(0.5).endsWith(' Z')).toBe(true);
  });

  it('el pulpo en reposo es simétrico por espejo y un gesto cambia el trazo', () => {
    expect(octopusD({}).endsWith(' Z')).toBe(true);
    expect(octopusD({ aL: 40 })).not.toBe(octopusD({}));
    expect(octopusD(octopusIdleSt(0))).toBe(octopusD(octopusIdleSt(0)));
    expect(octopusIdleSt(Math.PI / 2).aL).toBeCloseTo(9, 5);
  });
});
