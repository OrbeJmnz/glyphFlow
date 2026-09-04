import { describe, it, expect } from 'vitest';
import { CURATED_ICONS, AnimatedIconDef } from 'glyphflow';
import { insigniasDe, varianteDe, type ClaveInsignia } from './icon-badges';
import { analizarIcono } from './motion-inspector';

const TODOS = Object.entries(CURATED_ICONS) as [string, AnimatedIconDef][];

function claves(nombre: string): ClaveInsignia[] {
  return insigniasDe(nombre, CURATED_ICONS[nombre]).map((i) => i.clave);
}

describe('insigniasDe', () => {
  it('no marca nada cuando el icono no se distingue en nada', () => {
    // `archive-x` tiene coreografía propia, sin variante extra y sin `held`: la tarjeta va limpia.
    expect(claves('archive-x')).toEqual([]);
  });

  it('marca la variante extra y la nombra en el tooltip', () => {
    // `search` trae `find` y `nudge` además de `default`.
    const insignias = insigniasDe('search', CURATED_ICONS['search']);
    const extra = insignias.find((i) => i.clave === 'extras');
    expect(extra?.etiqueta).toBe('+2');
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

  /**
   * Antes esto medía cuántas tarjetas llevaban ALGUNA insignia, porque se pintaban en el grid y una
   * insignia en todas partes deja de destacar. Ya no se pintan: la tarjeta muestra el conteo de
   * animaciones y `insigniasDe` quedó como la taxonomía de los FILTROS.
   *
   * Así que el invariante cambia con el uso. Lo que un filtro tiene que hacer es ACOTAR: si casa
   * con todo no sirve de nada, y si no casa con nada tampoco. Y se mide por clave y no en conjunto
   * — sumadas cruzaban la mitad (205 de 405) sin que ninguna hubiera perdido su poder de separar.
   */
  it('cada filtro acota de verdad: ni casa con todo ni se queda vacío', () => {
    /*
     * Las claves que se prueban son las que la barra USA COMO FILTRO, y ya no son las cuatro de
     * la taxonomía. `extras` salió de aquí porque dejó de acotar —1095 de 1767, el 62 %— y ese
     * fue justo el fallo que este test dio cuando el sitio pasó a consumir la 2.4.0: hizo su
     * trabajo. Sigue existiendo como CUENTA (lo ancla `cifras.spec.ts`), no como filtro.
     *
     * Los nombres de variante se toman del catálogo y no de una lista escrita a mano: una lista
     * fija es exactamente como `extras` se pudrió sin que nadie lo viera.
     */
    const nombres = [
      ...new Set(
        TODOS.flatMap(([n]) =>
          claves(n).filter((c): c is `variante:${string}` => c.startsWith('variante:')),
        ),
      ),
    ];
    const filtros: ClaveInsignia[] = ['held', 'solo-draw', ...nombres];
    for (const clave of filtros) {
      const n = TODOS.filter(([nombre]) =>
        insigniasDe(nombre, CURATED_ICONS[nombre]).some((i) => i.clave === clave),
      ).length;
      expect(n, `el filtro "${clave}" no casa con ningún icono`).toBeGreaterThan(0);
      expect(n, `el filtro "${clave}" casa con la mayoría: deja de acotar`).toBeLessThan(
        TODOS.length / 2,
      );
    }
  });
});

describe('varianteDe', () => {
  it('sin filtro no fija nada: el motor sigue eligiendo su gesto de hover', () => {
    // `undefined` y no `null` — es el centinela del input `animation` de `<gf-icon>`.
    expect(varianteDe(null)).toBeUndefined();
  });

  it('un filtro por nombre de variante reproduce ESA variante', () => {
    expect(varianteDe('variante:pulse')).toBe('pulse');
    expect(varianteDe('variante:dart')).toBe('dart');
    // El nombre puede traer guiones; se corta por el prefijo, no por el primer separador.
    expect(varianteDe('variante:play-pause')).toBe('play-pause');
  });

  it('`hold` es una variante de verdad y se reproduce tal cual', () => {
    expect(varianteDe('hold')).toBe('hold');
  });

  it('`held` y `solo-draw` describen el `default`, así que reproducen el `default`', () => {
    // Ninguna de las dos NOMBRA una variante: `held` es que el default se sostiene al salir, y
    // `solo-draw` que el default es solo el trazo automático. En ambas lo que hay que ver es él.
    expect(varianteDe('held')).toBe('default');
    expect(varianteDe('solo-draw')).toBe('default');
  });

  it('`extras` no reproduce nada: agrupa por tener alguna, no por cuál', () => {
    expect(varianteDe('extras')).toBeUndefined();
  });

  it('toda clave que `insigniasDe` sepa producir tiene una decisión tomada aquí', () => {
    // La red contra el olvido: si alguien agrega una insignia nueva y no decide qué reproduce,
    // este test la caza en vez de dejarla muda en la rejilla sin que nadie se entere.
    const vistas = new Set<ClaveInsignia>();
    for (const [nombre] of TODOS) for (const c of claves(nombre)) vistas.add(c);

    const sinDecidir = [...vistas].filter(
      (c) => varianteDe(c) === undefined && c !== 'extras',
    );
    expect(sinDecidir, 'insignias sin variante asignada en varianteDe()').toEqual([]);
  });
});
