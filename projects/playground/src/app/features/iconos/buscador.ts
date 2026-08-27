/**
 * Relevancia del buscador del catálogo. Módulo puro: sin Angular, sin señales, sin DOM — así se
 * prueba el orden con una tabla de casos en vez de montando un componente.
 *
 * El orden lo fija T7b y no es arbitrario, describe cómo se busca de verdad: quien teclea el
 * nombre completo quiere ESE icono y nada más; quien teclea un prefijo está tanteando una familia
 * (`arrow-` → todos los arrow); y quien teclea `delete` no sabe el nombre — está describiendo lo
 * que necesita, y ahí es donde entran los sinónimos de Lucide.
 */
export const NIVELES = ['exacto', 'empieza', 'contiene', 'tag-exacto', 'tag-contiene'] as const;

export type Nivel = (typeof NIVELES)[number];

/**
 * Minúsculas y sin acentos. `NFD` parte cada letra acentuada en letra + marca combinante, y
 * U+0300–U+036F es el bloque de esas marcas — barrerlo deja `Círculo` y `circulo` iguales.
 *
 * Escrito con escapes y no con los caracteres literales A PROPÓSITO: literales son invisibles al
 * leer el archivo (parecen un corchete vacío) y cualquier recodificación los rompe en silencio.
 *
 * Hace falta aunque el catálogo esté en inglés: lo que se normaliza es lo que TECLEA la gente, y
 * un teclado español mete acentos sin pedir permiso.
 */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * En qué nivel cae un icono para una consulta ya normalizada, o `null` si no cae en ninguno.
 *
 * `tags` es opcional a propósito: viajan en un chunk aparte que se baja al primer tecleo (ver
 * `iconos.ts`), así que las primeras pulsaciones ordenan solo por nombre y los niveles de tag
 * aparecen cuando el dato llega. Degradar así es lo que permite no cobrarle 33 kB a quien nunca
 * busca; sin el `?`, el buscador tendría que esperar a la red para dar el primer resultado.
 */
export function nivelDe(nombre: string, q: string, tags?: readonly string[]): Nivel | null {
  const n = normalizar(nombre);
  if (n === q) return 'exacto';
  if (n.startsWith(q)) return 'empieza';
  if (n.includes(q)) return 'contiene';

  if (!tags) return null;
  let porContener = false;
  for (const tag of tags) {
    const t = normalizar(tag);
    // Sin corte temprano en el exacto: un icono puede tener `delete` exacto en un tag y `deleted`
    // en otro, y el mejor de los dos es el que manda.
    if (t === q) return 'tag-exacto';
    porContener ||= t.includes(q);
  }
  return porContener ? 'tag-contiene' : null;
}

/**
 * Ordena por nivel y, a igualdad, por nombre MÁS CORTO primero; alfabético al final.
 *
 * Lo de la longitud sale de medir el caso real que motivó T7a. Buscar `delete` da **63 iconos con
 * ese tag exacto**, porque Lucide se lo pone a todos los `*-minus` y `*-x`. Los 63 empatan en
 * nivel, así que el desempate ES el resultado — y con alfabético a secas la lista arrancaba en
 * `badge-minus`, `badge-x`, `bell-minus`, con `trash` y `trash-2` enterrados. Justo los dos que
 * alguien busca cuando teclea «delete».
 *
 * El primer candidato fue la POSICIÓN del tag dentro de su lista, y el dato lo descartó:
 * `bookmark-minus` trae `delete` en la posición 0 y `trash` en la 6ª. Lucide no ordena sus tags
 * por relevancia.
 *
 * La longitud sí correlaciona, y por una razón que se sostiene: los nombres de Lucide son
 * composicionales. El concepto base es corto (`trash`), su variante añade un sufijo (`trash-2`), y
 * un compuesto que *además* significa lo mismo es largo (`bookmark-minus`). Más corto = menos
 * calificado = más canónico.
 *
 * El alfabético se queda de último desempate, y eso también importa: sin él el orden dentro de un
 * empate sería el del catálogo —estable pero arbitrario— y la lista PARECERÍA barajarse al
 * escribir una letra más.
 */
export function ordenarPorRelevancia<T>(
  items: readonly T[],
  q: string,
  nombreDe: (item: T) => string,
  tagsDe?: (item: T) => readonly string[] | undefined,
): T[] {
  // `.trim()` aquí y no dentro de `normalizar`: esa función normaliza CARACTERES y no debe opinar
  // sobre espacios. Aquí sí importa — una consulta de puros espacios es una consulta vacía, y sin
  // el trim no entraba por el atajo, no casaba con nada y la rejilla se vaciaba entera.
  const consulta = normalizar(q).trim();
  if (!consulta) return [...items];

  const conNivel: { item: T; peso: number; segmentos: number; nombre: string }[] = [];
  for (const item of items) {
    const nombre = nombreDe(item);
    const nivel = nivelDe(nombre, consulta, tagsDe?.(item));
    if (nivel)
      conNivel.push({
        item,
        peso: NIVELES.indexOf(nivel),
        segmentos: nombre.split('-').length,
        nombre,
      });
  }

  conNivel.sort(
    (a, b) =>
      a.peso - b.peso ||
      a.segmentos - b.segmentos ||
      a.nombre.length - b.nombre.length ||
      a.nombre.localeCompare(b.nombre),
  );
  return conNivel.map((c) => c.item);
}

/**
 * Distancia de edición entre dos cadenas, con corte temprano.
 *
 * Es Levenshtein por filas —una sola fila viva en vez de la matriz entera— y abandona en cuanto la
 * mejor distancia posible de la fila supera `tope`. Eso importa porque esto se llama contra los
 * 1767 nombres del catálogo: sin el corte, una consulta larga recorre la matriz completa de cada
 * uno para descubrir al final que ninguno estaba cerca.
 */
export function distancia(a: string, b: string, tope: number): number {
  if (a === b) return 0;
  // Dos palabras cuya longitud ya difiere más que el tope no pueden acercarse: cada carácter de
  // más es al menos una edición.
  if (Math.abs(a.length - b.length) > tope) return tope + 1;

  const fila = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let anterior = fila[0];
    fila[0] = i;
    let mejorDeLaFila = fila[0];
    for (let j = 1; j <= b.length; j++) {
      const sustituir = anterior + (a[i - 1] === b[j - 1] ? 0 : 1);
      anterior = fila[j];
      fila[j] = Math.min(fila[j] + 1, fila[j - 1] + 1, sustituir);
      if (fila[j] < mejorDeLaFila) mejorDeLaFila = fila[j];
    }
    if (mejorDeLaFila > tope) return tope + 1;
  }
  return fila[b.length];
}

/**
 * Cuánta distancia se tolera según lo que se escribió. Una consulta de tres letras con dos errores
 * ya no se parece a nada —`arw` estaría igual de "cerca" de media docena de palabras—, mientras
 * que en una de doce un dedo torcido no debería costar la sugerencia.
 */
function topeSegunLargo(largo: number): number {
  if (largo <= 4) return 1;
  if (largo <= 8) return 2;
  return 3;
}

/**
 * Los nombres más parecidos a una consulta que NO encontró nada.
 *
 * Mira el nombre y sus etiquetas, y devuelve siempre el NOMBRE: una sugerencia que devolviera
 * `delete` porque es sinónimo de `trash-2` mandaría a buscar algo que tampoco existe.
 *
 * También compara contra cada segmento del nombre por separado (`arrow` de `arrow-up-right`),
 * porque quien escribe mal una palabra rara vez escribe mal el compuesto entero.
 */
export function sugerencias(
  q: string,
  nombres: readonly string[],
  tagsDe?: (nombre: string) => readonly string[] | undefined,
  max = 5,
): string[] {
  const consulta = normalizar(q).trim();
  if (consulta.length < 2) return [];
  const tope = topeSegunLargo(consulta.length);

  // DE DÓNDE viene el parecido, y no sólo cuánto: a igual distancia, un icono que se parece por su
  // nombre gana a otro que se parece por un sinónimo. Sin esto, `arrw` devolvía `log-in` antes que
  // `arrow-up` — los dos a distancia 1, pero uno por su tag «arrow» y el otro por su propio nombre.
  const NOMBRE = 0;
  const SEGMENTO = 1;
  const TAG = 2;

  const cerca: { nombre: string; d: number; via: number }[] = [];
  for (const nombre of nombres) {
    const n = normalizar(nombre);
    let mejor = distancia(consulta, n, tope);
    let via = NOMBRE;
    if (mejor > tope) {
      for (const seg of n.split('-')) {
        const d = distancia(consulta, seg, tope);
        if (d < mejor) {
          mejor = d;
          via = SEGMENTO;
        }
        if (mejor === 0) break;
      }
    }
    if (mejor > tope) {
      for (const tag of tagsDe?.(nombre) ?? []) {
        const d = distancia(consulta, normalizar(tag), tope);
        if (d < mejor) {
          mejor = d;
          via = TAG;
        }
        if (mejor === 0) break;
      }
    }
    if (mejor <= tope) cerca.push({ nombre, d: mejor, via });
  }

  // Más cerca primero; luego lo que casó por el nombre antes que lo que casó por un sinónimo; y a
  // igualdad, el nombre más corto — es el más probable y el que se lee antes en una fila.
  cerca.sort(
    (a, b) =>
      a.d - b.d ||
      a.via - b.via ||
      a.nombre.length - b.nombre.length ||
      a.nombre.localeCompare(b.nombre),
  );
  return cerca.slice(0, max).map((c) => c.nombre);
}
