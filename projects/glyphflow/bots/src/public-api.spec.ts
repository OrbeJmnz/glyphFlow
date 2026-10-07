import * as bots from './public-api';
import { CAT_VARS } from './data/cat';
import { FACES, MOCHI_VARS } from './data/faces';
import { ACCX, FX_VARS } from './data/fx';
import { GHOST_VARS } from './data/ghost';
import { HATS } from '../extras/src/hats-data';
import { OCTOPUS_VARS } from './data/octopus';
import { cubeShape, dropShape, eggShape, candyShape, pillShape } from './shapes/retired';
import type { GfBotShape } from './data/shape';

const shapes = Object.entries(bots).filter(([k]) => k.endsWith('Shape')) as [string, GfBotShape][];

describe('glyphflow/bots · superficie pública', () => {
  it('exporta createBot y los estados', () => {
    expect(typeof bots.createBot).toBe('function');
    expect(bots.GF_BOT_STATES).toEqual(['idle', 'working', 'sleeping']);
  });

  it('exporta las formas activas, cada una con su `id` propio', () => {
    expect(shapes.map(([k]) => k).sort()).toEqual(
      [
        'catShape', 'ghostShape', 'mochiShape', 'octopusShape', 'robotShape', 'tofuShape',
        'nightAuroraShape', 'nightCloudShape', 'nightCobaltShape', 'nightCrystalShape', 'nightJellyShape',
        'nightMaskShape', 'nightNeonShape', 'nightPearlShape', 'nightPrismShape', 'nightVibrantShape',
      ].sort(),
    );
    const ids = shapes.map(([, s]) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const [, s] of shapes) expect(s.retired).toBeFalsy();
  });

  it('las formas retiradas no salen (solo sirven de cuerpo al robot)', () => {
    for (const s of [eggShape, candyShape, cubeShape, pillShape, dropShape]) expect(s.retired).toBe(true);
    expect(Object.keys(bots)).not.toContain('cubeShape');
  });

  it('las etiquetas visibles están en inglés: sin tildes ni eñes, ninguna vacía', () => {
    const labels: string[] = [
      ...shapes.map(([, s]) => s.label ?? ''),
      ...Object.values(FACES).map((f) => f.label),
      ...Object.values(HATS).map((h) => h.label ?? ''),
      ...Object.values(MOCHI_VARS), ...Object.values(CAT_VARS), ...Object.values(GHOST_VARS), ...Object.values(OCTOPUS_VARS),
      ...Object.values(FX_VARS), ...Object.values(ACCX),
    ];
    expect(labels.length).toBeGreaterThan(80);
    for (const l of labels) {
      expect(l.trim(), 'etiqueta vacía').not.toBe('');
      expect(l, `«${l}» parece español`).not.toMatch(/[áéíóúñÁÉÍÓÚÑ¿¡]/);
    }
  });
});
