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
