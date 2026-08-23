import { describe, expect, it } from 'vitest';
import { NIVELES, nivelDe, normalizar, ordenarPorRelevancia } from './buscador';

describe('normalizar', () => {
  it('quita acentos y mayúsculas', () => {
    expect(normalizar('Círculo')).toBe('circulo');
    expect(normalizar('ÁÉÍÓÚñ')).toBe('aeioun');
    // El catálogo está en inglés, pero lo que se normaliza es lo que TECLEA la gente.
    expect(normalizar('Trash')).toBe('trash');
  });

  it('no toca lo que ya está normalizado', () => {
    expect(normalizar('arrow-down')).toBe('arrow-down');
  });
});

describe('nivelDe', () => {
  const tags = ['garbage', 'delete', 'remove', 'bin'];

  it('reconoce los tres niveles de nombre, en orden', () => {
    expect(nivelDe('trash-2', 'trash-2')).toBe('exacto');
    expect(nivelDe('trash-2', 'trash')).toBe('empieza');
    expect(nivelDe('trash-2', 'rash')).toBe('contiene');
  });

  it('el nombre gana siempre al tag', () => {
    // `bin` está en los tags de trash-2, pero también dentro de nombres como `binary`. Si el tag
    // pesara más, buscar `bin` pondría trash-2 por delante de binary — y quien teclea `bin`
    // buscando `binary` vería primero una basura.
    expect(nivelDe('binary', 'bin', ['numbers'])).toBe('empieza');
    expect(nivelDe('trash-2', 'bin', tags)).toBe('tag-exacto');
    expect(NIVELES.indexOf('empieza')).toBeLessThan(NIVELES.indexOf('tag-exacto'));
  });

  it('cae en los tags cuando el nombre no dice nada — el caso que justifica T7a', () => {
    // El criterio de aceptación del ticket: quien teclea `delete` no sabe que el icono se llama
    // `trash-2`. Sin tags, esta búsqueda daba cero.
    expect(nivelDe('trash-2', 'delete', tags)).toBe('tag-exacto');
    expect(nivelDe('trash-2', 'delete')).toBeNull();
  });

  it('distingue tag exacto de tag parcial', () => {
    expect(nivelDe('trash-2', 'garba', tags)).toBe('tag-contiene');
    expect(nivelDe('trash-2', 'garbage', tags)).toBe('tag-exacto');
  });

  it('el mejor tag manda, aunque venga después', () => {
    // `deleted` contiene la consulta y va primero; `delete` la iguala y va al final. Un corte
    // temprano al primer acierto habría devuelto el nivel peor.
    expect(nivelDe('x', 'delete', ['deleted', 'delete'])).toBe('tag-exacto');
  });

  it('sin coincidencia, null', () => {
    expect(nivelDe('trash-2', 'zzz', tags)).toBeNull();
  });
});

describe('ordenarPorRelevancia', () => {
  const nombre = (s: string) => s;

  it('agrupa por nivel, y dentro de cada nivel los nombres base van antes que los compuestos', () => {
    const items = ['binary', 'bin-full', 'bin', 'cabinet'];
    expect(ordenarPorRelevancia(items, 'bin', nombre)).toEqual([
      'bin', // exacto
      'binary', // empieza, un solo segmento
      'bin-full', // empieza, pero compuesto
      'cabinet', // contiene
    ]);
  });

  it('el desempate por segmentos es lo que salva el caso real de los tags', () => {
    // Buscar `delete` da 63 iconos con ESE tag exacto — Lucide se lo pone a todos los `*-minus` y
    // `*-x`. Empatan todos en nivel, así que el desempate ES el resultado. Con alfabético a secas
    // la lista arrancaba en `badge-minus` y `trash` quedaba enterrado; contando segmentos, primero
    // va lo que SIGNIFICA borrar y después lo que además lo significa.
    const tags: Record<string, string[]> = {
      'badge-minus': ['delete'],
      eraser: ['delete'],
      trash: ['delete'],
      'trash-2': ['delete'],
    };
    const items = Object.keys(tags);
    expect(ordenarPorRelevancia(items, 'delete', nombre, (n) => tags[n])).toEqual([
      'trash', // base, 5 letras
      'eraser', // base, 6 letras
      'trash-2', // compuesto de 7 — entre compuestos vuelve a mandar la longitud
      'badge-minus', // compuesto de 11
    ]);
  });

  it('un nombre base largo gana a un compuesto corto — el caso que descartó ordenar solo por longitud', () => {
    // `tag-x` tiene 5 letras y `trash` también, pero `tag-x` es una etiqueta con una equis y
    // `trash` es el bote de basura. Medido sobre el catálogo real: ordenando solo por longitud,
    // `tag-x` se colaba delante de `trash` al buscar «delete».
    const tags: Record<string, string[]> = { 'tag-x': ['delete'], shredder: ['delete'] };
    expect(ordenarPorRelevancia(['tag-x', 'shredder'], 'delete', nombre, (n) => tags[n])).toEqual([
      'shredder',
      'tag-x',
    ]);
  });

  it('a igual forma, alfabético — para que la lista no parezca barajarse', () => {
    const tags: Record<string, string[]> = { 'user-x': ['delete'], 'file-x': ['delete'] };
    expect(ordenarPorRelevancia(['user-x', 'file-x'], 'delete', nombre, (n) => tags[n])).toEqual([
      'file-x',
      'user-x',
    ]);
  });

  it('sin tags cargados ordena solo por nombre, y no truena', () => {
    // Es el estado de las primeras pulsaciones, antes de que llegue el chunk de tags.
    expect(ordenarPorRelevancia(['trash-2'], 'delete', nombre)).toEqual([]);
  });

  it('con tags, encuentra lo que el nombre no dice', () => {
    const tags: Record<string, string[]> = { 'trash-2': ['delete'], binary: ['numbers'] };
    expect(ordenarPorRelevancia(['binary', 'trash-2'], 'delete', nombre, (n) => tags[n])).toEqual([
      'trash-2',
    ]);
  });

  it('consulta vacía devuelve todo, sin reordenar', () => {
    const items = ['zeta', 'alfa'];
    expect(ordenarPorRelevancia(items, '   ', nombre)).toEqual(items);
  });
});
