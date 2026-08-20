/**
 * El `d` de un path como lista de tramos EDITABLES, y de vuelta.
 *
 * Por qué un parser propio y no el del core de morph: se midió. `cubicsToPathD` convierte todo a
 * cubics y el `d` crece 3.17x en mediana sobre los curados — y lo curioso es que los iconos SIN
 * arcos crecen más (3.78x) que los que sí tienen (3.24x). No lo causan los arcos: lo causa
 * escribir cada tramo como cubic completo, donde un `h6` se vuelve seis números. Ese serializador
 * es correcto para muestrear una trayectoria; sería pésimo para guardar geometría editada.
 *
 * La regla de esta capa: **un tramo que nadie tocó se re-escribe TAL CUAL**. Cada tramo guarda su
 * texto original y solo se re-formatea si se marcó sucio. Así editar un nodo de un icono no
 * reescribe el resto del `d`, y el diff de un cambio de geometría se lee.
 */

/** Comandos de path que aparecen en el catálogo, más Q/T por si Lucide los estrena. */
const LETRAS = 'MmLlHhVvCcSsQqTtAaZz';

export interface Segmento {
  /** La letra tal como venía: `a` y `A` no se normalizan, para poder re-escribir igual. */
  letra: string;
  /** Los números del tramo, en el orden del comando. Vacío en `Z`. */
  numeros: number[];
  /**
   * El texto original EXACTO, separadores incluidos. Concatenar los crudos de todos los tramos
   * devuelve el `d` de entrada byte por byte — de ahí sale la garantía de round-trip.
   */
  crudo: string;
  /** `true` cuando alguien editó los números: al serializar se re-formatea en vez de copiar. */
  sucio: boolean;
  /** Punto donde arranca el tramo, ya en absolutas. */
  inicio: Punto;
  /** Punto donde termina, ya en absolutas. */
  fin: Punto;
}

export type Punto = readonly [number, number];

export interface SubPath {
  segmentos: Segmento[];
  /** Hubo `Z`/`z`. Un subpath cerrado vuelve a su punto inicial. */
  cerrado: boolean;
}

/** Cuántos números consume cada comando (en mayúscula). `Z` no lleva. */
const ARIDAD: Record<string, number> = {
  M: 2,
  L: 2,
  T: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  A: 7,
  Z: 0,
};

/** Parte el `d` en tramos crudos: cada uno va de su letra hasta la siguiente. */
function trozos(d: string): { letra: string; cuerpo: string; crudo: string }[] {
  const salida: { letra: string; cuerpo: string; crudo: string }[] = [];
  let i = 0;
  // Lo que hay ANTES de la primera letra (espacios) se pega al primer tramo, no se pierde.
  let colgado = '';
  while (i < d.length && !LETRAS.includes(d[i])) colgado += d[i++];

  while (i < d.length) {
    const letra = d[i];
    let j = i + 1;
    while (j < d.length && !LETRAS.includes(d[j])) j++;
    const cuerpo = d.slice(i + 1, j);
    salida.push({ letra, cuerpo, crudo: colgado + d.slice(i, j) });
    colgado = '';
    i = j;
  }
  return salida;
}

/** Lo que separa números en un `d`: espacio, coma o salto de línea. */
const SEPARADOR = /[\s,]/;
const NUMERO = /-?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g;

/** Los números de un cuerpo. Acepta `.5`, `-3`, `1e-4` y separadores por coma o espacio. */
export function numerosDe(cuerpo: string): number[] {
  return (cuerpo.match(NUMERO) ?? []).map(Number);
}

/**
 * Un comando puede traer varios juegos de argumentos seguidos (`l1 2 3 4` son dos `l`). Se parten
 * en tramos independientes: el editor necesita un nodo por juego, no uno por letra escrita.
 *
 * El CRUDO se parte con ellos, no se le deja entero al primero. Con `M20 6 9 17` (el icono
 * `check`) eso duplicaba: se emitía el crudo completo y además el segundo juego re-escrito. Cada
 * juego se queda exactamente el texto que le corresponde, separadores incluidos, así que
 * concatenarlos reproduce el cuerpo original.
 */
function repartir(letra: string, cuerpo: string): { args: number[]; crudo: string }[] {
  const n = ARIDAD[letra.toUpperCase()];
  if (n === 0) return [{ args: [], crudo: '' }];

  const esArco = letra.toUpperCase() === 'A';
  const juegos: { args: number[]; crudo: string }[] = [];
  let i = 0;
  let inicioJuego = 0;

  const saltarSeparadores = () => {
    while (i < cuerpo.length && SEPARADOR.test(cuerpo[i])) i++;
  };

  /** Un número normal desde `i`. Devuelve NaN si ahí no empieza uno. */
  const leerNumero = (): number => {
    saltarSeparadores();
    NUMERO.lastIndex = i;
    const m = NUMERO.exec(cuerpo);
    if (!m || m.index !== i) return NaN;
    i = m.index + m[0].length;
    return Number(m[0]);
  };

  /**
   * Un flag de arco es UN SOLO carácter, `0` o `1`, y puede venir pegado a lo que sigue.
   * En `a5 5 0 014 2` ese `014` no es el número 14: son los flags 0 y 1, y luego el 4. Leerlo con
   * el regex de números se comía media instrucción — y con 500 arcos en el catálogo, eso rompía
   * cualquier icono redondeado.
   */
  const leerFlag = (): number => {
    saltarSeparadores();
    const c = cuerpo[i];
    if (c !== '0' && c !== '1') return NaN;
    i++;
    return Number(c);
  };

  while (i < cuerpo.length) {
    const antesDeSeparadores = i;
    saltarSeparadores();
    if (i >= cuerpo.length) {
      // Solo quedaban separadores. Viajan con el ULTIMO juego o se pierden: el `while` corta aquí
      // y el rescate de abajo no llega a correr porque `i` ya está al final. Sin esto, un cuerpo
      // como ` 12.248 21.969 ` se re-escribía sin su espacio de cola y el siguiente comando se le
      // pegaba — `21.969a` en vez de `21.969 a`. Sigue siendo SVG válido, pero rompe la promesa
      // del editor de re-escribir tal cual lo que nadie tocó.
      if (juegos.length) juegos[juegos.length - 1].crudo += cuerpo.slice(antesDeSeparadores);
      break;
    }
    const args: number[] = [];
    let roto = false;

    for (let k = 0; k < n; k++) {
      const v = esArco && (k === 3 || k === 4) ? leerFlag() : leerNumero();
      if (Number.isNaN(v)) {
        roto = true;
        break;
      }
      args.push(v);
    }
    if (roto) break;

    // Desde donde arrancó este juego hasta donde arranca el siguiente: los separadores viajan con
    // el número que los precede, así concatenar los crudos reproduce el cuerpo original.
    const desde = juegos.length === 0 ? 0 : inicioJuego;
    juegos.push({ args, crudo: cuerpo.slice(desde, i) });
    inicioJuego = i;
  }

  // Sobró texto que no formó un juego completo (`d` inválido): se pega al último para no perderlo.
  if (i < cuerpo.length && juegos.length) {
    juegos[juegos.length - 1].crudo += cuerpo.slice(i);
  }
  return juegos.length ? juegos : [{ args: numerosDe(cuerpo), crudo: cuerpo }];
}

/** Punto final de un tramo, en absolutas, a partir del punto actual. */
function finDe(letra: string, args: number[], actual: Punto, arranque: Punto): Punto {
  const rel = letra === letra.toLowerCase();
  const L = letra.toUpperCase();
  const [x, y] = actual;
  if (L === 'Z') return arranque;
  if (L === 'H') return [rel ? x + args[0] : args[0], y];
  if (L === 'V') return [x, rel ? y + args[0] : args[0]];
  const [dx, dy] = [args[args.length - 2], args[args.length - 1]];
  return rel ? [x + dx, y + dy] : [dx, dy];
}

export function parseD(d: string): SubPath[] {
  const subs: SubPath[] = [];
  let actual: Punto = [0, 0];
  let arranque: Punto = [0, 0];
  let sub: SubPath | null = null;

  for (const { letra, cuerpo, crudo } of trozos(d)) {
    // `crudo` incluye la letra y lo que colgaba antes; el cuerpo se reparte por juego.
    const prefijo = crudo.slice(0, crudo.length - cuerpo.length);
    const juegos = repartir(letra, cuerpo);
    juegos.forEach(({ args, crudo: trozo }, indice) => {
      const L = letra.toUpperCase();
      // Un `M` con varios juegos: el primero mueve, los siguientes son líneas implícitas (spec SVG).
      const efectiva = L === 'M' && indice > 0 ? (letra === 'm' ? 'l' : 'L') : letra;

      if (L === 'M' && indice === 0) {
        sub = { segmentos: [], cerrado: false };
        subs.push(sub);
        arranque = letra === 'm' ? [actual[0] + args[0], actual[1] + args[1]] : [args[0], args[1]];
      }
      if (!sub) {
        // `d` que no empieza con M: geometría inválida, pero no se truena — se abre un subpath.
        sub = { segmentos: [], cerrado: false };
        subs.push(sub);
        arranque = actual;
      }

      const inicio = actual;
      const fin = finDe(efectiva, args, actual, arranque);
      sub.segmentos.push({
        letra: efectiva,
        numeros: args,
        // El primer juego carga con la letra; los siguientes eran implícitos y no la llevaban.
        crudo: indice === 0 ? prefijo + trozo : trozo,
        sucio: false,
        inicio,
        fin,
      });
      if (L === 'Z') sub.cerrado = true;
      actual = fin;
    });
  }
  return subs;
}

/** Formatea un número corto: sin ceros de cola y sin el 0 delante del punto, como Lucide. */
export function fmt(n: number): string {
  const r = Number(n.toFixed(3));
  const s = String(r);
  return s.startsWith('0.') ? s.slice(1) : s.startsWith('-0.') ? '-' + s.slice(2) : s;
}

function escribir(seg: Segmento): string {
  if (seg.letra.toUpperCase() === 'Z') return seg.letra;
  return seg.letra + seg.numeros.map(fmt).join(' ');
}

export function serializeD(subs: SubPath[]): string {
  let out = '';
  for (const sub of subs) {
    for (const seg of sub.segmentos) {
      // El crudo trae sus propios separadores; lo re-escrito necesita uno para no pegarse al anterior.
      if (!seg.sucio && seg.crudo) out += seg.crudo;
      else out += (out && !out.endsWith(' ') ? '' : '') + escribir(seg);
    }
  }
  return out;
}
