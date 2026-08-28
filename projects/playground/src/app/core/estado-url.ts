/**
 * El estado del editor, ida y vuelta por el hash de la URL (T31 · nivel 1).
 *
 * Lo que viaja son los datos MÍNIMOS que reconstruyen la pantalla: qué icono se está editando y
 * cómo quedaron sus trazos. Todo lo demás —el zoom, qué nodo está activo, si el JSON está
 * desplegado— es postura de la sesión de quien edita, no del dibujo: meterlo alargaría el enlace
 * para reproducir dónde tenía otro la vista.
 *
 * Se comprime con `CompressionStream`, que traen los navegadores desde 2023. Sin él —o en el
 * servidor— el enlace se genera sin comprimir: un poco más largo, igual de válido. Es la razón de
 * que todo esto sea asíncrono.
 *
 * El alfabeto es base64url (`-` y `_` en vez de `+` y `/`, sin `=`): base64 normal mete caracteres
 * que el navegador re-codifica al copiar la barra de direcciones, y el enlace pegado ya no
 * deserializa.
 */
export interface EstadoEditor {
  /** El nombre del icono del catálogo del que se partió. */
  icono: string;
  /** El `d` de cada `path`, en el orden del `shapes` original. */
  paths: string[];
}

/**
 * A partir de aquí el enlace deja de ser fiable: IE lo cortaba en 2 083 y algunos proxies y
 * clientes de correo siguen recortando por ahí. Superado el tope, el editor ofrece el archivo en
 * vez del enlace — es el aviso que pide el ticket, no un límite del formato.
 */
export const TOPE_URL = 1800;

const PREFIJO = 'e1.';

function aBase64Url(bytes: Uint8Array): string {
  let binario = '';
  for (const b of bytes) binario += String.fromCharCode(b);
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function deBase64Url(texto: string): Uint8Array {
  const normal = texto.replace(/-/g, '+').replace(/_/g, '/');
  const binario = atob(normal.padEnd(Math.ceil(normal.length / 4) * 4, '='));
  return Uint8Array.from(binario, (c) => c.charCodeAt(0));
}

/**
 * Empuja los bytes por el transformador y recoge lo que sale.
 *
 * Se escribe el bucle a mano en vez de `new Blob([...]).stream()`, que sería más corto: `Blob` no
 * trae `stream()` en el DOM simulado de los tests, así que esa vía dejaba la compresión sin
 * cubrir — y probar el viaje de ida y vuelta es justo lo que hace fiable un enlace compartido.
 *
 * El tipo del parámetro describe lo que se usa —escribir bytes, leer bytes— y no
 * `TransformStream<Uint8Array, Uint8Array>`: desde TypeScript 5.7 `Uint8Array` es genérico sobre
 * su buffer y las firmas nativas dejaron de encajar en el estricto.
 */
interface FlujoDeBytes {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
}

async function pasarPor(flujo: FlujoDeBytes, datos: Uint8Array): Promise<Uint8Array> {
  const escritor = flujo.writable.getWriter();
  void escritor.write(datos);
  void escritor.close();

  const trozos: Uint8Array[] = [];
  const lector = flujo.readable.getReader();
  for (;;) {
    const { done, value } = await lector.read();
    if (done) break;
    trozos.push(value);
  }

  const salida = new Uint8Array(trozos.reduce((n, t) => n + t.length, 0));
  let i = 0;
  for (const t of trozos) {
    salida.set(t, i);
    i += t.length;
  }
  return salida;
}

/** El fragmento listo para el hash, SIN `#`. Cadena vacía si no hay nada que serializar. */
export async function aFragmento(estado: EstadoEditor): Promise<string> {
  if (!estado.paths.length) return '';
  const crudo = new TextEncoder().encode(JSON.stringify([estado.icono, ...estado.paths]));
  // `deflate-raw` y no `gzip`: el mismo algoritmo sin los 18 bytes de cabecera y CRC, que en una
  // URL de mil y pico caracteres no son ruido despreciable.
  if (typeof CompressionStream === 'undefined') return PREFIJO + '0' + aBase64Url(crudo);
  const comprimido = await pasarPor(new CompressionStream('deflate-raw') as unknown as FlujoDeBytes, crudo);
  return PREFIJO + '1' + aBase64Url(comprimido);
}

/** Lo contrario. `null` ante cualquier fragmento que no sea nuestro o venga roto. */
export async function deFragmento(fragmento: string): Promise<EstadoEditor | null> {
  if (!fragmento.startsWith(PREFIJO)) return null;
  const cuerpo = fragmento.slice(PREFIJO.length);
  const comprimido = cuerpo[0] === '1';
  try {
    const bytes = deBase64Url(cuerpo.slice(1));
    const crudo =
      comprimido && typeof DecompressionStream !== 'undefined'
        ? await pasarPor(new DecompressionStream('deflate-raw') as unknown as FlujoDeBytes, bytes)
        : bytes;
    const datos = JSON.parse(new TextDecoder().decode(crudo)) as unknown;
    // La entrada es HOSTIL por definición: llega de una URL que pudo escribir cualquiera. Se
    // valida la forma entera antes de devolverla, no se confía en el `as`.
    if (!Array.isArray(datos) || datos.length < 2) return null;
    if (!datos.every((x) => typeof x === 'string')) return null;
    const [icono, ...paths] = datos as string[];
    return { icono, paths };
  } catch {
    // Base64 inválido, deflate corrupto, JSON roto: todo lo mismo — el enlace no sirve, y el
    // editor arranca como si no lo hubiera.
    return null;
  }
}
