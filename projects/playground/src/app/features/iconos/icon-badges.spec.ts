import { describe, it, expect } from 'vitest';
import { CURATED_ICONS, AnimatedIconDef } from 'glyphflow';
import { insigniasDe, type ClaveInsignia } from './icon-badges';
import { analizarIcono } from './motion-inspector';

const TODOS = Object.entries(CURATED_ICONS) as [string, AnimatedIconDef][];

function claves(nombre: string): ClaveInsignia[] {
  return insigniasDe(nombre, CURATED_ICONS[nombre]).map((i) => i.clave);
}

describe('insigniasDe', () => {
  it('no marca nada cuando el icono no se distingue en nada', () => {
    // `bell` tiene coreografía propia, sin variante extra y sin `held`: la tarjeta va limpia.
    expect(claves('bell')).toEqual([]);
  });

  it('marca la variante extra y la nombra en el tooltip', () => {
    const insignias = insigniasDe('search', CURATED_ICONS['search']);
    const extra = insignias.find((i) => i.clave === 'extras');
    expect(extra?.etiqueta).toBe('+1');
    expect(extra?.titulo).toContain('find');
  });

  it('no cuenta `draw` ni `default` como extra — las traen las 180', () => {
    for (const [nombre, def] of TODOS) {
      const variantes = analizarIcono(nombre, def).variantes.map((v) => v.variante);
      expect(variantes).toContain('draw');
      expect(variantes).toContain('default');
    }
    const conExtra = TODOS.filter(([n]) => claves(n).includes('extras'));
    expect(conExtra.length).toBeGreaterThan(0);
    expect(conExtra.length).toBeLessThan(TODOS.length);
  });

  it('marca `held` exactamente en los que se sostienen con el puntero', () => {
    // `x` se define con `held(...)`, que pone `reverseOnLeave: true`.
    expect(claves('x')).toContain('held');
    for (const [nombre, def] of TODOS) {
      const base = analizarIcono(nombre, def).variantes.find((v) => v.variante === 'default');
      expect(claves(nombre).includes('held')).toBe(!!base?.reverseOnLeave);
    }
  });

  it('marca `solo trazo` cuando el `default` no tiene coreografía propia', () => {
    const soloTrazo = TODOS.filter(([n]) => claves(n).includes('solo-draw'));
    expect(soloTrazo.length).toBeGreaterThan(0);
    for (const [nombre, def] of soloTrazo) {
      const base = analizarIcono(nombre, def).variantes.find((v) => v.variante === 'default');
      expect(base?.autoDraw).toBe(true);
      expect(base?.propiedadesAnimadas).toEqual([]);
    }
  });

  it('la mayoría no trae insignia — si eso deja de ser cierto, dejaron de distinguir', () => {
    const conAlguna = TODOS.filter(([n]) => claves(n).length > 0).length;
    expect(conAlguna).toBeLessThan(TODOS.length / 2);
  });
});
