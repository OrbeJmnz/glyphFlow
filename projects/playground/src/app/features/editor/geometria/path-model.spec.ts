import { describe, it, expect } from 'vitest';
import { CURATED_ICONS } from 'glyphflow';
import { parseD, serializeD, numerosDe, fmt, type Segmento } from './path-model';

/** Todos los `d` del catálogo curado: 450 paths reales, no ejemplos inventados. */
const TODOS_LOS_D: { icono: string; d: string }[] = Object.entries(CURATED_ICONS).flatMap(
  ([nombre, def]) =>
    def.shapes
      .filter(
        (s): s is typeof s & { d: string } =>
          s.tag === 'path' && typeof (s as { d?: unknown }).d === 'string',
      )
      .map((s) => ({ icono: nombre, d: s.d })),
);

describe('parseD / serializeD', () => {
  it('hay geometría real que probar', () => {
    expect(TODOS_LOS_D.length).toBeGreaterThan(300);
  });

  it('round-trip EXACTO: lo que nadie tocó se re-escribe byte por byte', () => {
    // La garantía de la capa. Si esto se rompe, editar un nodo reescribiría todo el `d` y el diff
    // de un cambio de geometría dejaría de leerse.
    for (const { icono, d } of TODOS_LOS_D) {
      expect(serializeD(parseD(d)), `${icono}`).toBe(d);
    }
  });

  it('round-trip GEOMÉTRICO: re-formatear todo conserva los puntos', () => {
    // El test anterior pasa solo con copiar el crudo. Este ensucia TODOS los tramos para forzar el
    // formateador, que es el código que de verdad corre al editar.
    for (const { icono, d } of TODOS_LOS_D) {
      const original = parseD(d);
      const sucios = original.map((s) => ({
        ...s,
        segmentos: s.segmentos.map((seg): Segmento => ({ ...seg, sucio: true })),
      }));
      const revuelto = parseD(serializeD(sucios));

      const puntos = (subs: ReturnType<typeof parseD>) =>
        subs.flatMap((s) => s.segmentos.map((g) => g.fin));
      const antes = puntos(original);
      const despues = puntos(revuelto);
      expect(despues.length, `${icono}: cambió el número de tramos`).toBe(antes.length);
      for (let i = 0; i < antes.length; i++) {
        expect(despues[i][0], `${icono} tramo ${i} x`).toBeCloseTo(antes[i][0], 2);
        expect(despues[i][1], `${icono} tramo ${i} y`).toBeCloseTo(antes[i][1], 2);
      }
    }
  });

  it('los puntos finales quedan en absolutas, aunque el comando sea relativo', () => {
    const [sub] = parseD('M10 10h5v5z');
    expect(sub.segmentos.map((s) => s.fin)).toEqual([
      [10, 10],
      [15, 10],
      [15, 15],
      [10, 10],
    ]);
    expect(sub.cerrado).toBe(true);
  });

  it('un comando con varios juegos se parte en tramos independientes', () => {
    // `l1 1 2 2` son DOS líneas. El editor necesita un nodo por juego, no uno por letra escrita.
    const [sub] = parseD('M0 0l1 1 2 2');
    expect(sub.segmentos.length).toBe(3);
    expect(sub.segmentos[2].fin).toEqual([3, 3]);
  });

  it('un `M` con juegos de más se vuelve línea, como manda la spec', () => {
    const [sub] = parseD('M0 0 5 5');
    expect(sub.segmentos[1].letra).toBe('L');
    expect(sub.segmentos[1].fin).toEqual([5, 5]);
  });

  it('separa subpaths por cada `M`', () => {
    const subs = parseD('M0 0h2M10 10h2');
    expect(subs.length).toBe(2);
    expect(subs[1].segmentos[0].fin).toEqual([10, 10]);
  });

  it('el arco conserva sus 7 argumentos y su punto final', () => {
    // Los arcos son el comando más usado del catálogo (500 apariciones): si se parten mal, no hay
    // editor que valga.
    const [sub] = parseD('M10.268 21a2 2 0 0 0 3.464 0');
    expect(sub.segmentos[1].letra).toBe('a');
    expect(sub.segmentos[1].numeros).toEqual([2, 2, 0, 0, 0, 3.464, 0]);
    expect(sub.segmentos[1].fin[0]).toBeCloseTo(13.732, 3);
  });

  it('lee números pegados, sin cero inicial y con signo', () => {
    expect(numerosDe('.5-3 1e-2')).toEqual([0.5, -3, 0.01]);
  });

  it('formatea corto: sin cero delante del punto y sin ceros de cola', () => {
    expect(fmt(0.5)).toBe('.5');
    expect(fmt(-0.25)).toBe('-.25');
    expect(fmt(3.0)).toBe('3');
    expect(fmt(3.14159)).toBe('3.142');
  });
});
