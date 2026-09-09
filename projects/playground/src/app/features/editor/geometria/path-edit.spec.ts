import { describe, it, expect } from 'vitest';
import { CURATED_ICONS } from 'glyphflow';
import { parseD, serializeD, type SubPath } from './path-model';
import {
  moverNodo,
  nodosDe,
  limpiar,
  recalcular,
  manijasDe,
  moverManija,
  dDeSubpath,
  nuevoSubpath,
  agregarPunto,
  cerrarSubpath,
  moverSubpath,
  convertirACurva,
} from './path-edit';

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

describe('manijasDe / moverManija', () => {
  it('un cubic expone sus DOS controles, cada uno unido a su extremo', () => {
    const [m0, m1] = manijasDe(parseD('M0 0C1 2 3 4 5 6'));
    expect(m0.punto).toEqual([1, 2]);
    expect(m0.ancla).toEqual([0, 0]);
    expect(m1.punto).toEqual([3, 4]);
    expect(m1.ancla).toEqual([5, 6]);
  });

  it('en un cubic relativo los controles salen en absolutas', () => {
    const [m0, m1] = manijasDe(parseD('M10 10c1 2 3 4 5 6'));
    expect(m0.punto).toEqual([11, 12]);
    expect(m1.punto).toEqual([13, 14]);
  });

  it('las líneas y los arcos no traen manijas', () => {
    expect(manijasDe(parseD('M0 0h5v5L2 2z'))).toEqual([]);
    // El arco tiene radios y flags, no puntos de control: se edita por sus nodos.
    expect(manijasDe(parseD('M4 8a8 8 0 0 1 16 0'))).toEqual([]);
  });

  it('mover una manija NO desplaza el punto final del tramo', () => {
    // La diferencia con un nodo: un control cambia CÓMO llega la curva, no a dónde.
    const subs = parseD('M0 0C1 2 3 4 5 6L9 9');
    const antes = nodosDe(subs).map((n) => n.punto);
    const movido = moverManija(subs, { sub: 0, seg: 1, cual: 0 }, 2, -1);
    expect(nodosDe(movido).map((n) => n.punto)).toEqual(antes);
    expect(manijasDe(movido)[0].punto).toEqual([3, 1]);
  });

  it('el `S` esconde su primer control: se muestra por reflejo del anterior', () => {
    // Tras `C…3 4 5 6`, el reflejo de (3,4) sobre (5,6) es (7,8).
    const manijas = manijasDe(parseD('M0 0C1 2 3 4 5 6S9 9 10 10'));
    const entradaDelS = manijas.find((m) => m.seg === 2 && m.cual === 0)!;
    expect(entradaDelS.punto).toEqual([7, 8]);
  });

  it('tocar el control escondido de un `S` lo asciende a `C`', () => {
    // Ese punto solo existía como reflejo; en cuanto deja de serlo, hay que escribirlo.
    const subs = parseD('M0 0C1 2 3 4 5 6S9 9 10 10');
    const movido = moverManija(subs, { sub: 0, seg: 2, cual: 0 }, 1, 1);
    const seg = movido[0].segmentos[2];
    expect(seg.letra).toBe('C');
    expect(seg.numeros).toEqual([8, 9, 9, 9, 10, 10]);
    // Y el final del tramo sigue exactamente donde estaba.
    expect(nodosDe(movido).at(-1)!.punto).toEqual([10, 10]);
  });

  it('el segundo control de un `S` se mueve sin ascender nada', () => {
    const subs = parseD('M0 0C1 2 3 4 5 6S9 9 10 10');
    const movido = moverManija(subs, { sub: 0, seg: 2, cual: 1 }, -2, 3);
    expect(movido[0].segmentos[2].letra).toBe('S');
    expect(movido[0].segmentos[2].numeros).toEqual([7, 12, 10, 10]);
  });

  it('mover y devolver una manija deja el `d` geométricamente igual', () => {
    for (const { icono, d } of TODOS_LOS_D.slice(0, 120)) {
      const subs = parseD(d);
      for (const m of manijasDe(subs)) {
        const ida = moverManija(subs, m, 1.5, -2);
        const vuelta = moverManija(ida, m, -1.5, 2);
        const antes = manijasDe(subs).map((x) => x.punto);
        const despues = manijasDe(vuelta).map((x) => x.punto);
        for (let k = 0; k < antes.length; k++) {
          expect(cerca(despues[k][0], antes[k][0]), `${icono} manija ${k} x`).toBe(true);
          expect(cerca(despues[k][1], antes[k][1]), `${icono} manija ${k} y`).toBe(true);
        }
      }
    }
  });

  it('ninguna manija del catálogo mueve un nodo al arrastrarla', () => {
    for (const { icono, d } of TODOS_LOS_D.slice(0, 120)) {
      const subs = parseD(d);
      const antes = nodosDe(subs).map((n) => n.punto);
      for (const m of manijasDe(subs)) {
        const despues = nodosDe(moverManija(subs, m, 2, 2)).map((n) => n.punto);
        for (let k = 0; k < antes.length; k++) {
          expect(
            cerca(despues[k][0], antes[k][0]) && cerca(despues[k][1], antes[k][1]),
            `${icono}: mover una manija movió el nodo ${k}`,
          ).toBe(true);
        }
      }
    }
  });
});

describe('pluma: nuevoSubpath / agregarPunto / cerrarSubpath', () => {
  it('nuevoSubpath arranca un M suelto, abierto, con un solo nodo movible', () => {
    const sub = nuevoSubpath([3, 4]);
    expect(sub.cerrado).toBe(false);
    const nodos = nodosDe([sub]);
    expect(nodos).toHaveLength(1);
    expect(nodos[0].movible).toBe(true);
    expect(nodos[0].punto).toEqual([3, 4]);
  });

  it('agregarPunto encadena tramos L en el orden en que se colocan', () => {
    let sub = nuevoSubpath([0, 0]);
    sub = agregarPunto(sub, [5, 0]);
    sub = agregarPunto(sub, [5, 5]);
    const nodos = nodosDe([sub]);
    expect(nodos.map((n) => n.punto)).toEqual([
      [0, 0],
      [5, 0],
      [5, 5],
    ]);
    expect(nodos.every((n) => n.movible)).toBe(true);
  });

  it('cerrarSubpath agrega un Z no-movible que vuelve al punto de arranque', () => {
    let sub = nuevoSubpath([0, 0]);
    sub = agregarPunto(sub, [5, 0]);
    sub = agregarPunto(sub, [5, 5]);
    sub = cerrarSubpath(sub);
    expect(sub.cerrado).toBe(true);
    const nodos = nodosDe([sub]);
    expect(nodos).toHaveLength(4);
    expect(nodos[3].movible).toBe(false);
  });

  it('el d resultante hace round-trip: parseD(dDeSubpath(...)) reproduce los mismos nodos', () => {
    let sub = nuevoSubpath([1, 1]);
    sub = agregarPunto(sub, [9, 1]);
    sub = agregarPunto(sub, [5, 9]);
    sub = cerrarSubpath(sub);

    const d = dDeSubpath(sub);
    const releido = parseD(d);
    expect(releido).toHaveLength(1);
    expect(releido[0].cerrado).toBe(true);

    const movibles = nodosDe(releido).filter((n) => n.movible);
    expect(movibles.map((n) => n.punto)).toEqual([
      [1, 1],
      [9, 1],
      [5, 9],
    ]);
  });

  it('un trazo cerrado con la pluma se puede seguir editando con las herramientas normales', () => {
    let sub = nuevoSubpath([0, 0]);
    sub = agregarPunto(sub, [10, 0]);
    sub = agregarPunto(sub, [10, 10]);
    sub = cerrarSubpath(sub);

    const movido = moverNodo([sub], { sub: 0, seg: 1 }, 2, -3);
    const nodos = nodosDe(movido);
    expect(nodos[1].punto[0]).toBeCloseTo(12, 6);
    expect(nodos[1].punto[1]).toBeCloseTo(-3, 6);
    // El resto no se movió — misma garantía que ya prueba moverNodo sobre el catálogo.
    expect(nodos[0].punto).toEqual([0, 0]);
    expect(nodos[2].punto).toEqual([10, 10]);
  });
});

describe('moverSubpath', () => {
  it('traslada un subtrazo absoluto: todos los nodos se mueven el MISMO delta', () => {
    const subs = parseD('M0 0L10 0L5 10Z');
    const movido = moverSubpath(subs, 0, 3, -2);
    expect(
      nodosDe(movido)
        .filter((n) => n.movible)
        .map((n) => n.punto),
    ).toEqual([
      [3, -2],
      [13, -2],
      [8, 8],
    ]);
  });

  it('con comandos relativos, el delta INTERNO no cambia -- solo se ancla distinto', () => {
    // M absoluto + dos líneas relativas: mismo triángulo que arriba, otra sintaxis.
    const subs = parseD('M0 0l10 0l-5 10Z');
    const antes = nodosDe(subs)
      .filter((n) => n.movible)
      .map((n) => n.punto);
    const movido = moverSubpath(subs, 0, 3, -2);
    const despues = nodosDe(movido)
      .filter((n) => n.movible)
      .map((n) => n.punto);
    for (let i = 0; i < antes.length; i++) {
      expect(despues[i][0]).toBeCloseTo(antes[i][0] + 3, 6);
      expect(despues[i][1]).toBeCloseTo(antes[i][1] - 2, 6);
    }
  });

  it('mover un subtrazo NO toca los demás -- ni siquiera cuando el siguiente arranca en m relativo', () => {
    // Dos subtrazos: el segundo con `m` RELATIVO, ancla al fin del primero. Es justo el caso que
    // necesita compensación -- sin ella, mover el primero arrastraría el segundo con él.
    const subs = parseD('M0 0L10 0L0 10Z m5 5l5 0l0 5z');
    const segundoAntes = nodosDe(subs)
      .filter((n) => n.sub === 1 && n.movible)
      .map((n) => n.punto);

    const movido = moverSubpath(subs, 0, 100, 100);

    const primeroDespues = nodosDe(movido)
      .filter((n) => n.sub === 0 && n.movible)
      .map((n) => n.punto);
    const segundoDespues = nodosDe(movido)
      .filter((n) => n.sub === 1 && n.movible)
      .map((n) => n.punto);

    expect(primeroDespues).toEqual([
      [100, 100],
      [110, 100],
      [100, 110],
    ]);
    // El segundo subtrazo, intacto -- ni un decimal de arrastre por la compensación del `m`.
    for (let i = 0; i < segundoAntes.length; i++) {
      expect(segundoDespues[i][0]).toBeCloseTo(segundoAntes[i][0], 6);
      expect(segundoDespues[i][1]).toBeCloseTo(segundoAntes[i][1], 6);
    }
  });

  it('el propio d re-serializado hace round-trip a la misma geometría', () => {
    const subs = parseD('M0 0l10 0l-5 10Z m8 8l4 0l0 4z');
    const movido = moverSubpath(subs, 0, 2, 2);
    const d = movido.map(dDeSubpath).join('');
    const releido = parseD(d);
    const puntos = (s: SubPath[]) =>
      nodosDe(s)
        .filter((n) => n.movible)
        .map((n) => n.punto);
    expect(puntos(releido)).toEqual(puntos(movido));
  });
});

describe('convertirACurva', () => {
  it('convierte un tramo L a C, sin mover inicio ni fin', () => {
    const subs = parseD('M0 0L12 0');
    const curvo = convertirACurva(subs, { sub: 0, seg: 1 });
    const nodos = nodosDe(curvo).filter((n) => n.movible);
    expect(nodos[0].punto).toEqual([0, 0]);
    expect(nodos[1].punto).toEqual([12, 0]); // el fin no se movió, solo el camino hasta ahí
    expect(curvo[0].segmentos[1].letra).toBe('C');
  });

  it('los controles caen al tercio y dos tercios de la línea original', () => {
    const subs = parseD('M0 0L12 0');
    const curvo = convertirACurva(subs, { sub: 0, seg: 1 });
    const [m1] = manijasDe(curvo).filter((m) => m.cual === 0);
    const [m2] = manijasDe(curvo).filter((m) => m.cual === 1);
    expect(m1.punto[0]).toBeCloseTo(4, 6);
    expect(m2.punto[0]).toBeCloseTo(8, 6);
  });

  it('un tramo YA curvo, o un arco, no se toca', () => {
    const conArco = parseD('M0 0A5 5 0 0 1 10 0');
    expect(convertirACurva(conArco, { sub: 0, seg: 1 })).toBe(conArco);

    const conCurva = parseD('M0 0C1 1 2 2 3 3');
    expect(convertirACurva(conCurva, { sub: 0, seg: 1 })).toBe(conCurva);
  });

  it('el resultado se puede editar con las manijas que ya existen, sin geometría nueva', () => {
    const subs = parseD('M0 0L12 0');
    const curvo = convertirACurva(subs, { sub: 0, seg: 1 });
    const manija = manijasDe(curvo).find((m) => m.cual === 0)!;
    const movido = moverManija(curvo, manija, 0, 5);
    // Mover la manija dobla la curva pero NO mueve los nodos -- misma garantía que ya prueba
    // `moverManija` sobre el catálogo.
    expect(nodosDe(movido).filter((n) => n.movible)[0].punto).toEqual([0, 0]);
  });
});
