import { describe, it, expect } from 'vitest';
import { GENERATED_ICONS, CURATED_ICONS } from 'glyphflow';
import { NOMBRES_GENERADOS } from './nombres-generados';

/**
 * `nombres-generados.ts` es una copia de los nombres, escrita a mano en el sitio. Tiene que
 * seguir así: leerlos del paquete significa `ANIMATED_ICON_NAMES`, que es
 * `Object.keys(ANIMATED_ICONS)` — pedirlo arrastra los 1767 iconos CON su geometría. Medido:
 * +224 kB en el bundle inicial, por encima del presupuesto duro.
 *
 * Este test es el precio de esa decisión, igual que `cifras.spec.ts` lo es de `CIFRAS.catalogo`.
 * Corre en Node, así que puede importar el registro completo sin que un solo byte llegue al
 * cliente. Sin él, la lista se queda atrás en silencio en cuanto `generate:icons` traiga otra
 * versión de Lucide, y el buscador diría "no existe" de un icono que sí existe — que es
 * exactamente el bug que esta lista viene a arreglar.
 */
describe('NOMBRES_GENERADOS', () => {
  it('coincide exactamente con el registro real', () => {
    const reales = Object.keys(GENERATED_ICONS).sort();
    expect([...NOMBRES_GENERADOS]).toEqual(reales);
  });

  it('no se cruza con los curados', () => {
    const curados = new Set(Object.keys(CURATED_ICONS));
    const cruzados = NOMBRES_GENERADOS.filter((n) => curados.has(n));
    expect(cruzados, 'un nombre no puede estar en las dos capas').toEqual([]);
  });
});
