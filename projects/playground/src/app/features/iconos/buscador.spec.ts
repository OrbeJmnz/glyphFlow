import { describe, expect, it } from 'vitest';
import { NIVELES, distancia, nivelDe, normalizar, ordenarPorRelevancia, sugerencias } from './buscador';

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

describe('sugerencias', () => {
  const CATALOGO = ['arrow-up', 'arrow-down', 'arrow-up-right', 'trash-2', 'bell', 'bell-ring', 'circle'];

  it('acerca un dedo torcido al nombre que se quería', () => {
    // El caso literal del criterio de aceptación de T10.
    expect(sugerencias('arrw', CATALOGO)).toContain('arrow-up');
  });

  it('el parecido por NOMBRE gana al parecido por sinónimo', () => {
    // Medido contra el catálogo real: `arrw` devolvía `log-in` antes que `arrow-up`. Los dos a
    // distancia 1 — pero uno por su tag «arrow» y el otro por su propio nombre.
    const tags = (n: string) => (n === 'circle' ? ['arrow'] : undefined);
    expect(sugerencias('arrw', CATALOGO, tags)[0]).toBe('arrow-up');
  });

  it('compara también contra cada SEGMENTO del nombre', () => {
    // Quien escribe mal una palabra rara vez escribe mal el compuesto entero: sin partir por
    // guiones, `arow` no se acerca a `arrow-up-right` — son diez ediciones de diferencia.
    expect(sugerencias('arow', CATALOGO).length).toBeGreaterThan(0);
  });

  it('devuelve el NOMBRE aunque el parecido lo haya dado una etiqueta', () => {
    // Sugerir `delete` porque es sinónimo de `trash-2` mandaría a buscar algo que tampoco existe.
    const tags = (n: string) => (n === 'trash-2' ? ['delete'] : undefined);
    expect(sugerencias('delet', CATALOGO, tags)).toEqual(['trash-2']);
  });

  it('no sugiere nada cuando de verdad no se parece a nada', () => {
    expect(sugerencias('xyzabc', CATALOGO)).toEqual([]);
  });

  it('con dos letras o menos se calla: todo está cerca de todo', () => {
    expect(sugerencias('a', CATALOGO)).toEqual([]);
  });

  it('devuelve como mucho las que se le piden, y las más cercanas primero', () => {
    const cinco = sugerencias('bel', CATALOGO, undefined, 5);
    expect(cinco.length).toBeLessThanOrEqual(5);
    expect(cinco[0]).toBe('bell');
  });

  it('la distancia corta por longitud antes de recorrer la matriz', () => {
    // Con el tope en 2, dos palabras que difieren en 6 caracteres no pueden acercarse — y el corte
    // es lo que hace viable llamar a esto contra los 1767 nombres del catálogo.
    expect(distancia('bell', 'circle-dashed', 2)).toBeGreaterThan(2);
    expect(distancia('bell', 'belt', 2)).toBe(1);
    expect(distancia('bell', 'bell', 2)).toBe(0);
  });
});
