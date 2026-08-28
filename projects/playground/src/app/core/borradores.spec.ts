import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  MAX_BORRADORES,
  actualizarBorrador,
  borradores,
  borrarBorrador,
  guardarBorrador,
  hayBorradores,
  renombrarBorrador,
} from './borradores';

/**
 * El módulo guarda su estado en `localStorage` Y en una señal. Los tests parten de un storage
 * limpio y usan sólo la API pública, que es lo que el editor ve.
 *
 * Lo que se prueba de verdad es lo que puede perder trabajo ajeno: que el tope no borre el
 * borrador equivocado, y que un storage manipulado no rompa el arranque.
 */
describe('borradores', () => {
  beforeEach(() => {
    localStorage.clear();
    for (const b of borradores()) borrarBorrador(b.id);
  });

  it('guarda, renombra y borra', () => {
    expect(hayBorradores()).toBe(false);
    const id = guardarBorrador({ icono: 'heart', paths: ['M1 1'] });
    expect(hayBorradores()).toBe(true);
    expect(borradores()[0].nombre).toBe('heart');

    renombrarBorrador(id, '  mi corazón  ');
    expect(borradores()[0].nombre).toBe('mi corazón');

    borrarBorrador(id);
    expect(borradores()).toEqual([]);
  });

  it('un nombre en blanco no pisa el que ya tenía', () => {
    const id = guardarBorrador({ icono: 'bell', paths: ['M1 1'] }, 'campana');
    renombrarBorrador(id, '   ');
    expect(borradores()[0].nombre).toBe('campana');
  });

  it('actualizar cambia los trazos y lo sube al principio', () => {
    const viejo = guardarBorrador({ icono: 'a', paths: ['M1 1'] });
    const nuevo = guardarBorrador({ icono: 'b', paths: ['M2 2'] });
    expect(borradores()[0].id).toBe(nuevo);

    actualizarBorrador(viejo, { icono: 'a', paths: ['M9 9'] });
    expect(borradores()[0].id).toBe(viejo);
    expect(borradores()[0].paths).toEqual(['M9 9']);
  });

  it('actualizar un id que ya no existe no rompe nada', () => {
    guardarBorrador({ icono: 'a', paths: ['M1 1'] });
    actualizarBorrador('fantasma', { icono: 'z', paths: ['M0 0'] });
    expect(borradores().length).toBe(1);
    expect(borradores()[0].icono).toBe('a');
  });

  it('al llegar al tope cae el MÁS VIEJO, no el último de la lista', () => {
    // La lista se ordena para VERSE; ordenarla no debería decidir qué se borra.
    for (let i = 0; i < MAX_BORRADORES + 3; i++) {
      guardarBorrador({ icono: `i${i}`, paths: [`M${i} ${i}`] });
    }
    const lista = borradores();
    expect(lista.length).toBe(MAX_BORRADORES);
    // Los tres primeros que entraron son justo los que faltan.
    const nombres = lista.map((b) => b.icono);
    expect(nombres).not.toContain('i0');
    expect(nombres).not.toContain('i2');
    expect(nombres).toContain(`i${MAX_BORRADORES + 2}`);
  });

  it('un storage manipulado a mano no se cuela', async () => {
    // El storage es de quien tenga el navegador: se puede editar, y una versión anterior pudo
    // escribirlo con otra forma. Lo que no encaja se descarta en vez de llegar al editor.
    localStorage.setItem(
      'gf:drafts',
      JSON.stringify([
        { id: 'ok', nombre: 'bueno', icono: 'heart', paths: ['M1 1'], guardado: 1 },
        { id: 'malo-sin-paths', nombre: 'x', icono: 'heart', guardado: 2 },
        { id: 'malo-paths-no-texto', nombre: 'x', icono: 'heart', paths: [3], guardado: 3 },
        'ni siquiera un objeto',
        null,
      ]),
    );
    // El módulo lee el storage AL CARGARSE, así que hay que reimportarlo con el entorno ya
    // falseado — mismo patrón que `movimiento.spec.ts`. Reutilizar la instancia viva probaría el
    // filtro contra una lista que ya está en memoria, que no es el caso que importa.
    vi.resetModules();
    const recargado = await import('./borradores');
    expect(recargado.borradores().map((b) => b.id)).toEqual(['ok']);
  });
});
