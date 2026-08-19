import { fmt, type Punto, type Segmento, type SubPath } from './path-model';

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
