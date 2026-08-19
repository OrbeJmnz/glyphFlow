import { fmt, type Punto, type Segmento, type SubPath } from './path-model';
import { dividirSegmento } from './path-split';

/**
 * Editar nodos de un `d` sin que se mueva nada más.
 *
 * El problema que resuelve, y que no es obvio: en un path RELATIVO cada tramo se mide desde el
 * anterior, así que mover un nodo arrastra todo lo que viene después. Para mover UN punto hay que
 * tocar dos tramos — el que termina ahí, y el siguiente, compensándolo por el mismo delta al revés.
 *
 * Y a veces el comando ya no alcanza: un `h` solo sabe de x. Si el nodo se mueve en y, ese tramo
 * tiene que ascender a `l`. Ignorar eso es el bug clásico de los editores de path: arrastras un
 * nodo en diagonal y la figura se rompe tres segmentos más adelante.
 */

/** A qué punto arrastrable corresponde: subpath y tramo que TERMINA en él. */
export interface RefNodo {
  sub: number;
  seg: number;
}

export interface Nodo extends RefNodo {
  punto: Punto;
  /** `Z` no tiene punto propio: vuelve al inicio del subpath. No se arrastra. */
  movible: boolean;
}

export function nodosDe(subs: SubPath[]): Nodo[] {
  const salida: Nodo[] = [];
  subs.forEach((sub, i) => {
    sub.segmentos.forEach((seg, j) => {
      salida.push({
        sub: i,
        seg: j,
        punto: seg.fin,
        movible: seg.letra.toUpperCase() !== 'Z',
      });
    });
  });
  return salida;
}

const esRelativo = (letra: string) => letra === letra.toLowerCase();

/** Aplica un delta al punto final de un tramo, ascendiendo el comando si se queda corto. */
function moverFin(seg: Segmento, dx: number, dy: number): Segmento {
  const L = seg.letra.toUpperCase();
  const rel = esRelativo(seg.letra);
  const nums = [...seg.numeros];

  if (L === 'H') {
    // `h` no sabe de y: si el nodo sube o baja, el tramo tiene que volverse línea completa.
    if (dy === 0) {
      nums[0] += dx;
      return { ...seg, numeros: nums, sucio: true };
    }
    const x = rel ? nums[0] + dx : nums[0] + dx;
    const y = rel ? dy : seg.inicio[1] + dy;
    return { ...seg, letra: rel ? 'l' : 'L', numeros: [x, y], sucio: true };
  }

  if (L === 'V') {
    if (dx === 0) {
      nums[0] += dy;
      return { ...seg, numeros: nums, sucio: true };
    }
    const x = rel ? dx : seg.inicio[0] + dx;
    const y = rel ? nums[0] + dy : nums[0] + dy;
    return { ...seg, letra: rel ? 'l' : 'L', numeros: [x, y], sucio: true };
  }

  // El resto (M/L/T/C/S/Q/A, abs o rel) lleva el punto final en los dos últimos números, y en los
  // dos casos el delta se suma igual: en absolutas mueve el punto, en relativas mueve el desplazamiento.
  nums[nums.length - 2] += dx;
  nums[nums.length - 1] += dy;
  return { ...seg, numeros: nums, sucio: true };
}

/**
 * Compensa el tramo SIGUIENTE para que su punto final no se mueva.
 *
 * Solo aplica a comandos relativos: uno absoluto ya dice a dónde va y no le afecta de dónde salió.
 */
function compensar(seg: Segmento, dx: number, dy: number): Segmento {
  const L = seg.letra.toUpperCase();
  if (L === 'Z') return seg;

  if (!esRelativo(seg.letra)) {
    // `H` y `V` absolutos son MEDIO absolutos: `V4` fija la y y hereda la x del punto actual. Si
    // ese punto se movió, este nodo se va con él aunque el comando sea mayúscula. Para clavarlo
    // donde estaba hay que escribir las dos coordenadas, o sea ascender a `L`.
    if (L === 'V' && dx !== 0) {
      return { ...seg, letra: 'L', numeros: [seg.fin[0], seg.numeros[0]], sucio: true };
    }
    if (L === 'H' && dy !== 0) {
      return { ...seg, letra: 'L', numeros: [seg.numeros[0], seg.fin[1]], sucio: true };
    }
    return seg;
  }

  const nums = [...seg.numeros];

  if (L === 'H') {
    if (dy === 0) {
      nums[0] -= dx;
      return { ...seg, numeros: nums, sucio: true };
    }
    return { ...seg, letra: 'l', numeros: [nums[0] - dx, -dy], sucio: true };
  }

  if (L === 'V') {
    if (dx === 0) {
      nums[0] -= dy;
      return { ...seg, numeros: nums, sucio: true };
    }
    return { ...seg, letra: 'l', numeros: [-dx, nums[0] - dy], sucio: true };
  }

  nums[nums.length - 2] -= dx;
  nums[nums.length - 1] -= dy;
  return { ...seg, numeros: nums, sucio: true };
}

/** Recalcula `inicio`/`fin` de todos los tramos. Los números mandan; las posiciones se derivan. */
export function recalcular(subs: SubPath[]): SubPath[] {
  let actual: Punto = [0, 0];
  return subs.map((sub) => {
    let arranque: Punto = actual;
    const segmentos = sub.segmentos.map((seg, j) => {
      const L = seg.letra.toUpperCase();
      const rel = esRelativo(seg.letra);
      const inicio = actual;
      let fin: Punto;

      if (L === 'Z') fin = arranque;
      else if (L === 'H') fin = [rel ? actual[0] + seg.numeros[0] : seg.numeros[0], actual[1]];
      else if (L === 'V') fin = [actual[0], rel ? actual[1] + seg.numeros[0] : seg.numeros[0]];
      else {
        const dx = seg.numeros[seg.numeros.length - 2];
        const dy = seg.numeros[seg.numeros.length - 1];
        fin = rel ? [actual[0] + dx, actual[1] + dy] : [dx, dy];
      }

      if (L === 'M' && j === 0) arranque = fin;
      actual = fin;
      return { ...seg, inicio, fin };
    });
    return { ...sub, segmentos };
  });
}

/**
 * Mueve UN nodo. Devuelve una estructura nueva — nada se muta, para que la pila de deshacer del
 * slice siguiente pueda guardar estados sin copiarlos a mano.
 */
export function moverNodo(subs: SubPath[], ref: RefNodo, dx: number, dy: number): SubPath[] {
  if (dx === 0 && dy === 0) return subs;
  const copia = subs.map((s) => ({ ...s, segmentos: [...s.segmentos] }));
  const segs = copia[ref.sub]?.segmentos;
  if (!segs?.[ref.seg] || segs[ref.seg].letra.toUpperCase() === 'Z') return subs;

  segs[ref.seg] = moverFin(segs[ref.seg], dx, dy);

  // El tramo siguiente puede estar en el SUBPATH siguiente: un `m` relativo arranca desde donde
  // terminó el anterior, así que mover el último nodo de un subpath desplaza al que sigue.
  const [sSig, gSig] = ref.seg + 1 < segs.length ? [ref.sub, ref.seg + 1] : [ref.sub + 1, 0];
  const siguiente = copia[sSig]?.segmentos[gSig];
  // El `Z` que cierra no se compensa: vuelve al inicio del subpath, no a un punto propio.
  if (siguiente && siguiente.letra.toUpperCase() !== 'Z') {
    copia[sSig].segmentos[gSig] = compensar(siguiente, dx, dy);
  }

  return recalcular(copia);
}

/** Redondea los números de los tramos tocados, para que el `d` no salga con 14 decimales. */
export function limpiar(subs: SubPath[], decimales = 3): SubPath[] {
  const factor = 10 ** decimales;
  return subs.map((sub) => ({
    ...sub,
    segmentos: sub.segmentos.map((seg) =>
      seg.sucio
        ? { ...seg, numeros: seg.numeros.map((n) => Math.round(n * factor) / factor) }
        : seg,
    ),
  }));
}

/** El `d` de un solo subpath, para pintar el contorno que se está editando. */
export function dDeSubpath(sub: SubPath): string {
  return sub.segmentos.map((s) => (s.sucio || !s.crudo ? escribir(s) : s.crudo)).join('');
}

function escribir(seg: Segmento): string {
  if (seg.letra.toUpperCase() === 'Z') return seg.letra;
  return seg.letra + seg.numeros.map(fmt).join(' ');
}

// ── Manijas de bézier ─────────────────────────────────────────────────────────

/**
 * Los puntos de control de un tramo curvo.
 *
 * A diferencia de un nodo, mover una manija NO desplaza lo que sigue: los controles no cambian
 * dónde termina el tramo, solo cómo llega. Por eso aquí no hay compensación de ningún tipo.
 *
 * Los arcos quedan fuera a propósito: un `a` no tiene puntos de control, tiene radios y flags.
 * Darle manijas exigiría convertirlo a cubics, y eso reescribe el tramo entero — con 500 arcos en
 * el catálogo, sería cambiar la geometría de casi todo por tocar un punto. Se editan por sus nodos.
 */
export interface Manija extends RefNodo {
  /** 0 = control de salida del tramo; 1 = control de entrada al punto final. */
  cual: 0 | 1;
  punto: Punto;
  /** El extremo al que pertenece: la manija se dibuja unida a él. */
  ancla: Punto;
}

/** El primer control de un `S` es el REFLEJO del segundo control del tramo anterior. */
function reflejoDe(previo: Segmento | undefined, inicio: Punto): Punto {
  if (!previo) return inicio;
  const L = previo.letra.toUpperCase();
  if (L !== 'C' && L !== 'S') return inicio;
  const n = previo.numeros;
  const rel = esRelativo(previo.letra);
  // El segundo control del previo, en absolutas: penúltimo par de sus números.
  const cx = n[n.length - 4];
  const cy = n[n.length - 3];
  const abs: Punto = rel ? [previo.inicio[0] + cx, previo.inicio[1] + cy] : [cx, cy];
  return [2 * inicio[0] - abs[0], 2 * inicio[1] - abs[1]];
}

/** Un punto de los números de un tramo, pasado a absolutas. */
function aAbsoluto(seg: Segmento, i: number): Punto {
  const rel = esRelativo(seg.letra);
  const x = seg.numeros[i];
  const y = seg.numeros[i + 1];
  return rel ? [seg.inicio[0] + x, seg.inicio[1] + y] : [x, y];
}

export function manijasDe(subs: SubPath[]): Manija[] {
  const salida: Manija[] = [];
  subs.forEach((sub, i) => {
    sub.segmentos.forEach((seg, j) => {
      const L = seg.letra.toUpperCase();
      if (L === 'C') {
        salida.push({ sub: i, seg: j, cual: 0, punto: aAbsoluto(seg, 0), ancla: seg.inicio });
        salida.push({ sub: i, seg: j, cual: 1, punto: aAbsoluto(seg, 2), ancla: seg.fin });
      } else if (L === 'S') {
        // El de entrada existe aunque no esté escrito: se calcula por reflejo para poder mostrarlo.
        salida.push({
          sub: i,
          seg: j,
          cual: 0,
          punto: reflejoDe(sub.segmentos[j - 1], seg.inicio),
          ancla: seg.inicio,
        });
        salida.push({ sub: i, seg: j, cual: 1, punto: aAbsoluto(seg, 0), ancla: seg.fin });
      }
    });
  });
  return salida;
}

/**
 * Mueve un punto de control.
 *
 * Si se toca el control ESCONDIDO de un `S`, el tramo asciende a `C`: ese punto solo existía como
 * reflejo del anterior, y en cuanto deja de ser el reflejo hay que escribirlo. Es la misma regla
 * que con `h` → `l`: cuando el comando ya no alcanza para decir lo que hay, se sube de nivel.
 */
export function moverManija(
  subs: SubPath[],
  m: RefNodo & { cual: 0 | 1 },
  dx: number,
  dy: number,
): SubPath[] {
  if (dx === 0 && dy === 0) return subs;
  const copia = subs.map((s) => ({ ...s, segmentos: [...s.segmentos] }));
  const seg = copia[m.sub]?.segmentos[m.seg];
  if (!seg) return subs;

  const L = seg.letra.toUpperCase();
  const rel = esRelativo(seg.letra);

  if (L === 'C') {
    const nums = [...seg.numeros];
    const i = m.cual === 0 ? 0 : 2;
    nums[i] += dx;
    nums[i + 1] += dy;
    copia[m.sub].segmentos[m.seg] = { ...seg, numeros: nums, sucio: true };
    return recalcular(copia);
  }

  if (L === 'S') {
    if (m.cual === 1) {
      const nums = [...seg.numeros];
      nums[0] += dx;
      nums[1] += dy;
      copia[m.sub].segmentos[m.seg] = { ...seg, numeros: nums, sucio: true };
      return recalcular(copia);
    }
    // Asciende a cubic: se materializa el reflejo, ya movido.
    const previo = copia[m.sub].segmentos[m.seg - 1];
    const [rx, ry] = reflejoDe(previo, seg.inicio);
    const c1: Punto = [rx + dx, ry + dy];
    const c2 = aAbsoluto(seg, 0);
    const fin = seg.fin;
    const nums = rel
      ? [
          c1[0] - seg.inicio[0],
          c1[1] - seg.inicio[1],
          c2[0] - seg.inicio[0],
          c2[1] - seg.inicio[1],
          fin[0] - seg.inicio[0],
          fin[1] - seg.inicio[1],
        ]
      : [c1[0], c1[1], c2[0], c2[1], fin[0], fin[1]];
    copia[m.sub].segmentos[m.seg] = {
      ...seg,
      letra: rel ? 'c' : 'C',
      numeros: nums,
      sucio: true,
    };
    return recalcular(copia);
  }

  // Lineas y arcos no tienen controles: no hay nada que mover.
  return subs;
}

// ── Agregar y quitar nodos ────────────────────────────────────────────────────

/**
 * Parte el tramo por t y deja un nodo nuevo ahí. La curva no se mueve: el tramo original se
 * reemplaza por dos que juntos describen lo mismo.
 */
export function insertarNodo(subs: SubPath[], ref: RefNodo, t = 0.5): SubPath[] {
  const original = subs[ref.sub]?.segmentos[ref.seg];
  if (!original) return subs;
  const partes = dividirSegmento(original, t);
  if (!partes) return subs;

  const copia = subs.map((s) => ({ ...s, segmentos: [...s.segmentos] }));
  copia[ref.sub].segmentos.splice(ref.seg, 1, partes[0], partes[1]);
  return recalcular(copia);
}

/**
 * Quita el nodo en el que termina un tramo. Lo que desaparece es ese tramo; el siguiente pasa a
 * arrancar donde arrancaba el borrado.
 *
 * Con comandos relativos hay que compensar igual que al mover: los números del siguiente se miden
 * desde un punto que acaba de cambiar. Sin eso, borrar un nodo arrastra el resto de la figura.
 */
export function quitarNodo(subs: SubPath[], ref: RefNodo): SubPath[] {
  const sub = subs[ref.sub];
  const seg = sub?.segmentos[ref.seg];
  if (!seg) return subs;

  const L = seg.letra.toUpperCase();
  // El `M` es el ancla del subpath y el `Z` no tiene punto propio: ninguno de los dos se borra por
  // aquí. Quitar el arranque sería borrar el subpath entero, que es otra operación.
  if (L === 'M' || L === 'Z') return subs;
  // Un subpath necesita al menos un tramo dibujable para seguir siendo algo.
  if (sub.segmentos.filter((s) => !'MZ'.includes(s.letra.toUpperCase())).length <= 1) return subs;

  const copia = subs.map((s) => ({ ...s, segmentos: [...s.segmentos] }));
  const segs = copia[ref.sub].segmentos;
  const siguiente = segs[ref.seg + 1];

  if (siguiente && siguiente.letra.toUpperCase() !== 'Z') {
    // El siguiente pasa a salir de donde EMPEZABA el tramo borrado, o sea su arranque retrocede
    // por el desplazamiento que el borrado aportaba. `compensar` espera "tu arranque se movió
    // ESTO", así que el delta va en NEGATIVO: pasarlo en positivo movía la figura al doble, en la
    // dirección contraria.
    const dx = seg.inicio[0] - seg.fin[0];
    const dy = seg.inicio[1] - seg.fin[1];
    segs[ref.seg + 1] = compensar(siguiente, dx, dy);
  }

  segs.splice(ref.seg, 1);
  return recalcular(copia);
}
