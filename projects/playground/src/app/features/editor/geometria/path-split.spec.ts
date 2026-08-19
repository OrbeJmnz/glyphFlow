import { describe, it, expect } from 'vitest';
import { CURATED_ICONS } from 'glyphflow';
import { parseD } from './path-model';
import { puntoEn, dividirSegmento, arcoACentro } from './path-split';
import { insertarNodo, nodosDe, quitarNodo } from './path-edit';

const TODOS_LOS_D: { icono: string; d: string }[] = Object.entries(CURATED_ICONS).flatMap(
  ([nombre, def]) =>
    def.shapes
      .filter(
        (s): s is typeof s & { d: string } =>
          s.tag === 'path' && typeof (s as { d?: unknown }).d === 'string',
      )
      .map((s) => ({ icono: nombre, d: s.d })),
);

const cerca = (a: number, b: number, eps = 0.01) => Math.abs(a - b) < eps;

describe('puntoEn', () => {
  it('en los extremos devuelve los extremos, en TODOS los tramos del catálogo', () => {
    // Si no clava t=0 y t=1, partir un tramo movería la curva.
    for (const { icono, d } of TODOS_LOS_D) {
      for (const sub of parseD(d)) {
        for (const seg of sub.segmentos) {
          const L = seg.letra.toUpperCase();
          if (L === 'M' || L === 'Z') continue;
          const p0 = puntoEn(seg, 0)!;
          const p1 = puntoEn(seg, 1)!;
          expect(
            cerca(p0[0], seg.inicio[0]) && cerca(p0[1], seg.inicio[1]),
            `${icono} t=0 en ${seg.letra}`,
          ).toBe(true);
          expect(
            cerca(p1[0], seg.fin[0]) && cerca(p1[1], seg.fin[1]),
            `${icono} t=1 en ${seg.letra}`,
          ).toBe(true);
        }
      }
    }
  });

  it('el punto medio de una recta es el promedio', () => {
    const [sub] = parseD('M0 0L10 20');
    expect(puntoEn(sub.segmentos[1], 0.5)).toEqual([5, 10]);
  });

  it('el arco pasa por donde debe: un cuarto de círculo de radio 10', () => {
    // De (0,10) a (10,0) con radio 10 hay DOS centros posibles. Con `fS=1` (sentido positivo) el
    // que toca es (10,10), no (0,0) — el punto medio cae a 225 grados de ese centro.
    const [sub] = parseD('M0 10A10 10 0 0 1 10 0');
    const m = puntoEn(sub.segmentos[1], 0.5)!;
    expect(cerca(Math.hypot(m[0] - 10, m[1] - 10), 10)).toBe(true);
    expect(cerca(m[0], m[1])).toBe(true);
    expect(cerca(m[0], 10 - 10 / Math.SQRT2)).toBe(true);
  });

  it('un arco con radio cero degenera en recta, como manda la spec', () => {
    expect(arcoACentro([0, 0], 0, 5, 0, 0, 1, [10, 0])).toBeNull();
    const [sub] = parseD('M0 0A0 0 0 0 1 10 10');
    expect(puntoEn(sub.segmentos[1], 0.5)).toEqual([5, 5]);
  });
});

describe('dividirSegmento', () => {
  it('las dos mitades se tocan en el corte y respetan los extremos', () => {
    for (const { icono, d } of TODOS_LOS_D) {
      for (const sub of parseD(d)) {
        for (const seg of sub.segmentos) {
          const partes = dividirSegmento(seg, 0.5);
          const L = seg.letra.toUpperCase();
          if (L === 'M' || L === 'Z') {
            expect(partes, `${icono}: ${seg.letra} no se parte`).toBeNull();
            continue;
          }
          const [a, b] = partes!;
          expect(
            cerca(a.inicio[0], seg.inicio[0]) && cerca(a.inicio[1], seg.inicio[1]),
            `${icono} arranque`,
          ).toBe(true);
          expect(
            cerca(a.fin[0], b.inicio[0]) && cerca(a.fin[1], b.inicio[1]),
            `${icono} unión`,
          ).toBe(true);
          expect(cerca(b.fin[0], seg.fin[0]) && cerca(b.fin[1], seg.fin[1]), `${icono} final`).toBe(
            true,
          );
        }
      }
    }
  });

  it('la curva no se mueve: las mitades pasan por los mismos puntos que el original', () => {
    // La prueba de verdad. Se muestrea el tramo original y se compara contra la mitad que toca.
    for (const { icono, d } of TODOS_LOS_D.slice(0, 150)) {
      for (const sub of parseD(d)) {
        for (const seg of sub.segmentos) {
          const partes = dividirSegmento(seg, 0.5);
          if (!partes) continue;
          for (const t of [0.1, 0.25, 0.4, 0.6, 0.75, 0.9]) {
            const esperado = puntoEn(seg, t)!;
            const [mitad, tLocal] = t < 0.5 ? [partes[0], t * 2] : [partes[1], (t - 0.5) * 2];
            const obtenido = puntoEn(mitad, tLocal)!;
            expect(
              cerca(obtenido[0], esperado[0], 0.02) && cerca(obtenido[1], esperado[1], 0.02),
              `${icono} ${seg.letra} en t=${t}`,
            ).toBe(true);
          }
        }
      }
    }
  });

  it('la bandera de arco largo se RECALCULA por mitad, no se hereda', () => {
    // Media vuelta partida en dos: ninguna mitad es ya un arco largo.
    const [sub] = parseD('M0 0A5 5 0 1 1 10 0');
    const [a, b] = dividirSegmento(sub.segmentos[1], 0.5)!;
    expect(a.numeros[3]).toBe(0);
    expect(b.numeros[3]).toBe(0);
  });

  it('partir una `h` la vuelve `l`: el corte ya no comparte eje con el destino', () => {
    const [sub] = parseD('M0 0h10');
    const [a] = dividirSegmento(sub.segmentos[1], 0.5)!;
    expect(a.letra).toBe('l');
    expect(a.fin).toEqual([5, 0]);
  });
});

describe('insertarNodo / quitarNodo', () => {
  it('insertar agrega UN nodo y no mueve ninguno de los que ya estaban', () => {
    for (const { icono, d } of TODOS_LOS_D.slice(0, 120)) {
      const subs = parseD(d);
      const antes = nodosDe(subs);
      antes.forEach((n, i) => {
        // Insertar "en un nodo" parte el tramo que TERMINA ahí. El `M` no tiene tramo previo que
        // partir, y el `Z` vuelve al inicio: ninguno de los dos aplica.
        const letra = subs[n.sub].segmentos[n.seg].letra.toUpperCase();
        if (letra === 'M' || letra === 'Z') return;
        const despues = nodosDe(insertarNodo(subs, n));
        expect(despues.length, `${icono}: no agregó nodo`).toBe(antes.length + 1);
        // El nuevo se cuela en la posición del tramo partido; los viejos siguen donde estaban.
        const sinNuevo = [...despues.slice(0, i), ...despues.slice(i + 1)];
        for (let k = 0; k < antes.length; k++) {
          expect(
            cerca(sinNuevo[k].punto[0], antes[k].punto[0]) &&
              cerca(sinNuevo[k].punto[1], antes[k].punto[1]),
            `${icono}: insertar movió el nodo ${k}`,
          ).toBe(true);
        }
      });
    }
  });

  it('quitar deja los demás nodos donde estaban, aunque el path sea relativo', () => {
    for (const { icono, d } of TODOS_LOS_D.slice(0, 120)) {
      const subs = parseD(d);
      const antes = nodosDe(subs);
      antes.forEach((n, i) => {
        if (!n.movible) return;
        const resultado = quitarNodo(subs, n);
        if (resultado === subs) return; // se negó: era el último tramo dibujable
        const despues = nodosDe(resultado);
        expect(despues.length).toBe(antes.length - 1);
        const esperados = [...antes.slice(0, i), ...antes.slice(i + 1)];
        for (let k = 0; k < esperados.length; k++) {
          expect(
            cerca(despues[k].punto[0], esperados[k].punto[0]) &&
              cerca(despues[k].punto[1], esperados[k].punto[1]),
            `${icono}: quitar el nodo ${i} movió el ${k}`,
          ).toBe(true);
        }
      });
    }
  });

  it('insertar y quitar el nodo nuevo devuelve la geometría original', () => {
    for (const { icono, d } of TODOS_LOS_D.slice(0, 80)) {
      const subs = parseD(d);
      const antes = nodosDe(subs).map((n) => n.punto);
      for (const n of nodosDe(subs)) {
        const letra = subs[n.sub].segmentos[n.seg].letra.toUpperCase();
        if (letra === 'M' || letra === 'Z') continue;
        const conNodo = insertarNodo(subs, n);
        // El nuevo quedó en `n.seg`: quitarlo devuelve el tramo a su forma anterior.
        const devuelto = nodosDe(quitarNodo(conNodo, { sub: n.sub, seg: n.seg }));
        expect(devuelto.length, icono).toBe(antes.length);
        for (let k = 0; k < antes.length; k++) {
          expect(
            cerca(devuelto[k].punto[0], antes[k][0]) && cerca(devuelto[k].punto[1], antes[k][1]),
            `${icono} nodo ${k}`,
          ).toBe(true);
        }
      }
    }
  });

  it('no se borra el `M` ni el `Z`: uno ancla el subpath, el otro no tiene punto propio', () => {
    const subs = parseD('M0 0h5v5z');
    expect(quitarNodo(subs, { sub: 0, seg: 0 })).toBe(subs);
    expect(quitarNodo(subs, { sub: 0, seg: 3 })).toBe(subs);
  });

  it('no se vacía un subpath: el último tramo dibujable se queda', () => {
    const subs = parseD('M0 0h5');
    expect(quitarNodo(subs, { sub: 0, seg: 1 })).toBe(subs);
  });
});
