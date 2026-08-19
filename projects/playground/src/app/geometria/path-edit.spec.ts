import { describe, it, expect } from 'vitest';
import { CURATED_ICONS } from 'glyphflow';
import { parseD, serializeD } from './path-model';
import { moverNodo, nodosDe, limpiar, recalcular } from './path-edit';

const TODOS_LOS_D: { icono: string; d: string }[] = Object.entries(CURATED_ICONS).flatMap(
  ([nombre, def]) =>
    def.shapes
      .filter(
        (s): s is typeof s & { d: string } =>
          s.tag === 'path' && typeof (s as { d?: unknown }).d === 'string',
      )
      .map((s) => ({ icono: nombre, d: s.d })),
);

const puntos = (d: string) => nodosDe(parseD(d)).map((n) => n.punto);
const cerca = (a: number, b: number) => Math.abs(a - b) < 0.005;

describe('moverNodo', () => {
  it('mueve el nodo pedido exactamente el delta pedido', () => {
    const subs = parseD('M10 10h5v5z');
    const movido = moverNodo(subs, { sub: 0, seg: 1 }, 3, -2);
    expect(nodosDe(movido)[1].punto[0]).toBeCloseTo(18, 6);
    expect(nodosDe(movido)[1].punto[1]).toBeCloseTo(8, 6);
  });

  it('NO mueve ningún otro nodo, aunque el path sea relativo', () => {
    // El corazón del slice. Sin compensar el tramo siguiente, mover un nodo de un path relativo
    // arrastra toda la figura de ahí en adelante.
    for (const { icono, d } of TODOS_LOS_D.slice(0, 120)) {
      const subs = parseD(d);
      const nodos = nodosDe(subs);
      const antes = nodos.map((n) => n.punto);

      nodos.forEach((n, i) => {
        if (!n.movible) return;
        const resultado = nodosDe(moverNodo(subs, n, 1.5, -0.75));
        const despues = resultado.map((x) => x.punto);
        for (let k = 0; k < antes.length; k++) {
          // El nodo de un `Z` no es un punto propio: es el inicio del subpath. Si se movió ese
          // inicio, el `Z` lo sigue por definición — se verifica aparte, no aquí.
          if (!nodos[k].movible) continue;
          const esperadoX = k === i ? antes[k][0] + 1.5 : antes[k][0];
          const esperadoY = k === i ? antes[k][1] - 0.75 : antes[k][1];
          expect(
            cerca(despues[k][0], esperadoX) && cerca(despues[k][1], esperadoY),
            `${icono}: mover el nodo ${i} movió el ${k} — [${despues[k]}] en vez de [${esperadoX}, ${esperadoY}]`,
          ).toBe(true);
        }
      });
    }
  });

  it('mover y devolver deja la geometría donde estaba', () => {
    for (const { icono, d } of TODOS_LOS_D.slice(0, 60)) {
      const subs = parseD(d);
      const antes = nodosDe(subs).map((n) => n.punto);
      nodosDe(subs).forEach((n) => {
        if (!n.movible) return;
        const ida = moverNodo(subs, n, 2, 3);
        const vuelta = moverNodo(ida, n, -2, -3);
        const despues = nodosDe(vuelta).map((x) => x.punto);
        for (let k = 0; k < antes.length; k++) {
          expect(cerca(despues[k][0], antes[k][0]), `${icono} x en ${k}`).toBe(true);
          expect(cerca(despues[k][1], antes[k][1]), `${icono} y en ${k}`).toBe(true);
        }
      });
    }
  });

  it('un `h` movido en vertical asciende a `l` — si no, la figura se rompe más adelante', () => {
    const subs = parseD('M0 0h10h10');
    const movido = moverNodo(subs, { sub: 0, seg: 1 }, 0, 5);
    expect(movido[0].segmentos[1].letra).toBe('l');
    // Y el nodo de después sigue en su sitio: el `h` que lo seguía tuvo que ascender también.
    expect(nodosDe(movido)[2].punto).toEqual([20, 0]);
  });

  it('un `v` movido en horizontal asciende a `l`', () => {
    const subs = parseD('M0 0v10v10');
    const movido = moverNodo(subs, { sub: 0, seg: 1 }, 4, 0);
    expect(movido[0].segmentos[1].letra).toBe('l');
    expect(nodosDe(movido)[2].punto).toEqual([0, 20]);
  });

  it('el nodo de un tramo ABSOLUTO no necesita compensar al siguiente', () => {
    const subs = parseD('M0 0L5 5L10 0');
    const movido = moverNodo(subs, { sub: 0, seg: 1 }, 1, 1);
    expect(movido[0].segmentos[2].sucio).toBe(false);
    expect(nodosDe(movido)[2].punto).toEqual([10, 0]);
  });

  it('el nodo del `Z` sigue al inicio del subpath — es su espejo, no un punto aparte', () => {
    const subs = parseD('M0 0h5v5z');
    const movido = moverNodo(subs, { sub: 0, seg: 0 }, 2, 3);
    const nodos = nodosDe(movido);
    expect(nodos[0].punto).toEqual([2, 3]);
    // El `z` cierra contra el nuevo inicio, no contra el viejo: geometría, no bug.
    expect(nodos.at(-1)!.punto).toEqual([2, 3]);
  });

  it('el `Z` no se arrastra: no tiene punto propio', () => {
    const subs = parseD('M0 0h5v5z');
    const cierre = nodosDe(subs).at(-1)!;
    expect(cierre.movible).toBe(false);
    expect(moverNodo(subs, cierre, 3, 3)).toBe(subs);
  });

  it('solo se re-escriben los tramos tocados; el resto conserva su texto', () => {
    const d = 'M10.268 21a2 2 0 0 0 3.464 0M4 8a8 8 0 0 1 16 0';
    const movido = moverNodo(parseD(d), { sub: 0, seg: 1 }, 1, 0);
    const salida = serializeD(movido);
    // El segundo subpath no se toco: su texto original sigue ahi, byte por byte.
    expect(salida).toContain('M4 8a8 8 0 0 1 16 0');
  });

  it('`limpiar` recorta decimales solo de lo editado', () => {
    const subs = moverNodo(parseD('M0 0l1 1'), { sub: 0, seg: 1 }, 0.1234567, 0);
    const limpio = limpiar(subs);
    expect(limpio[0].segmentos[1].numeros[0]).toBe(1.123);
    expect(limpio[0].segmentos[0].numeros).toEqual([0, 0]);
  });

  it('`recalcular` no altera la geometría de un path intacto', () => {
    for (const { icono, d } of TODOS_LOS_D.slice(0, 80)) {
      const antes = puntos(d);
      const despues = nodosDe(recalcular(parseD(d))).map((n) => n.punto);
      expect(despues.length, icono).toBe(antes.length);
      for (let i = 0; i < antes.length; i++) {
        expect(
          cerca(despues[i][0], antes[i][0]) && cerca(despues[i][1], antes[i][1]),
          `${icono} nodo ${i}`,
        ).toBe(true);
      }
    }
  });
});
