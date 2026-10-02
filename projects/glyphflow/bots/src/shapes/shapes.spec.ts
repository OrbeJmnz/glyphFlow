import { MATERIALS, PALETTES, RIM } from '../data/palettes';
import { morphPath, pathLerp } from '../data/morph';
import type { GfBotShape } from '../data/shape';
import { ghostShape } from './ghost';
import { catShape } from './cat';
import { MOCHI_TUFT } from './mochi-tuft';
import { mochiShape } from './mochi';
import {
  nAuroraShape, nCobaltShape, nCrystalShape, nJellyShape, nMaskShape, nNeonShape, nCloudShape,
  nPearlShape, nPrismShape, nVibrantShape,
} from './night';
import { octopusShape } from './octopus';
import { cubeShape, dropShape, eggShape, pillShape, candyShape } from './retired';
import { makeRobot } from './robot';
import { tofuShape } from './tofu';

const ACTIVAS: Record<string, GfBotShape> = {
  mochi: mochiShape, tofu: tofuShape, ghost: ghostShape, cat: catShape, octopus: octopusShape,
  robot: makeRobot(cubeShape),
};
const NOCHE: Record<string, GfBotShape> = {
  jalea: nJellyShape, nube: nCloudShape, neon: nNeonShape, aurora: nAuroraShape, cobalto: nCobaltShape,
  perla: nPearlShape, vibrante: nVibrantShape, mascara: nMaskShape, cristal: nCrystalShape, prisma: nPrismShape,
};
const RETIRADAS = [eggShape, candyShape, cubeShape, pillShape, dropShape];

describe('glyphflow/bots · formas', () => {
  it('cada forma trae lo que el motor necesita: silueta, centro, ojos y paleta existente', () => {
    for (const [k, s] of Object.entries({ ...ACTIVAS, ...NOCHE })) {
      expect(typeof s.d, k).toBe('string');
      expect(s.cy, k).toBeGreaterThan(80);
      expect(s.faceY, k).toBeGreaterThan(80);
      expect(Object.keys(PALETTES), k).toContain(s.palette);
    }
  });

  it('cada forma trae un id estable y único: el CSS de las pieles se engancha a él', () => {
    const todas = [...Object.values(ACTIVAS), ...Object.values(NOCHE), ...RETIRADAS];
    const ids = todas.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((i) => /^[a-zA-Z]+$/.test(i))).toBe(true);
    // el CSS del prototipo usa estos cuatro y el motor ramifica por pulpo y nNube
    expect(ids).toEqual(expect.arrayContaining(['ghost', 'cat', 'nJelly', 'nCloud', 'octopus']));
    expect(ACTIVAS['robot'].id).toBe('robot'); // no hereda el id del cuerpo (cubo)
  });

  it('las formas retiradas están marcadas y el robot toma el cuerpo del cubo sin heredar la marca', () => {
    for (const s of RETIRADAS) expect(s.retired).toBe(true);
    const robot = ACTIVAS['robot'];
    expect(robot.retired).toBe(false);
    expect(robot.body).toBe('cube');
    expect(robot.model).toBe('box');
    expect(robot.acc?.length).toBe(3); // antena + dos tornillos
  });

  it('cada familia declara la suya y su cara', () => {
    expect(ghostShape.family).toBe('ghost');
    expect(catShape.family).toBe('cat');
    expect(octopusShape.family).toBe('octopus');
    expect(mochiShape.family).toBeUndefined();
  });

  it('las formas con contorno animado traen fotogramas que cierran el ciclo', () => {
    for (const s of [octopusShape, nJellyShape, nCloudShape, nPrismShape]) {
      const keys = s.dKeys ?? [];
      expect(keys.length).toBeGreaterThan(4);
      expect(keys[0]).toBe(keys[keys.length - 1]);
      expect(s.dAt?.(0)).toBe(keys[0]);
      expect(s.dAt?.(1)).toBe(keys[keys.length - 1]);
    }
  });

  it('las promovidas de Noche se anuncian como tales y arrancan con su piel', () => {
    expect(nJellyShape.promoted && nJellyShape.mochiDefault).toBe('n1');
    expect(nCloudShape.promoted && nCloudShape.mochiDefault).toBe('n2');
    expect(nPrismShape.promoted && nPrismShape.mochiDefault).toBe('n10');
    expect(nNeonShape.promoted).toBeUndefined();
  });

  it('la Nube respira con sus lóbulos y la Jalea sube burbujas', () => {
    expect(nCloudShape.lobes?.length).toBe(5);
    expect(nJellyShape.fxIn?.('b1')).toContain('class="jbubs"');
    expect(nPrismShape.fxOut?.('b1')).toContain('class="psparks"');
  });

  it('los accesorios dibujan con la piel actual y el copete usa el contorno medido', () => {
    const tuft = mochiShape.acc?.find((a) => a.tuft);
    expect(tuft?.draw(101, 62.5, 'b1', 'neu')).toContain('<path');
    expect(MOCHI_TUFT.startsWith('M')).toBe(true);
  });
});

describe('glyphflow/bots · paletas y deformación', () => {
  it('paletas, luz de contorno y materiales van parejos', () => {
    expect(Object.keys(RIM).sort()).toEqual(Object.keys(PALETTES).sort());
    expect(MATERIALS.plastic).toBeNull();
    const metal = MATERIALS.metal?.(PALETTES.lavender);
    expect(metal?.length).toBe(6);
    expect(MATERIALS.gold?.(PALETTES.lavender)[0]).toBe('#FFE59A');
  });

  it('morphPath mueve cada par de coordenadas y conserva los comandos', () => {
    expect(morphPath('M10 20 L30 40 Z', (x, y) => [x + 1, y * 2])).toBe('M11 40 L31 80 Z');
  });

  it('pathLerp interpola a mitad de camino entre dos siluetas de igual estructura', () => {
    expect(pathLerp(['M0 0 L10 10', 'M10 10 L20 20'], 0.5)).toBe('M5 5 L15 15');
    expect(pathLerp(['M0 0 L10 10', 'M10 10 L20 20'], 0)).toBe('M0 0 L10 10');
  });
});
