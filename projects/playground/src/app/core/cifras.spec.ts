import { describe, it, expect } from 'vitest';
import { ANIMATED_ICONS, CURATED_ICONS, GENERATED_ICONS } from 'glyphflow';
import { CIFRAS } from './cifras';

/**
 * `CIFRAS.catalogo` está escrito a mano y tiene que seguir así: derivarlo de `ANIMATED_ICONS`
 * arrastraría los generados al bundle del sitio (ver el porqué en `cifras.ts`).
 *
 * Este test es el precio de esa decisión — corre en Node, así que puede importar el registro
 * completo sin que un solo byte llegue al cliente. Sin él, el número se queda atrás en silencio
 * en cuanto `generate:icons` traiga otra versión de Lucide, y la contradicción sale en el hero:
 * `curados` sí es derivado y `catalogo` no.
 */
describe('CIFRAS', () => {
  it('el catálogo escrito a mano coincide con el registro real', () => {
    expect(CIFRAS.catalogo).toBe(Object.keys(ANIMATED_ICONS).length);
  });

  it('los curados salen del catálogo en vivo', () => {
    expect(CIFRAS.curados).toBe(Object.keys(CURATED_ICONS).length);
  });

  /*
   * El sitio anuncia este rango en la portada (T4). Si el paquete cambia sus peers y nadie mueve
   * la constante, la portada promete compatibilidad que ya no existe — y eso se descubre cuando
   * a alguien le truena el `npm i`, no antes.
   */
  it('el rango de Angular coincide con las peerDependencies del paquete publicado', async () => {
    const pkg = (await import('glyphflow-published/package.json', { with: { type: 'json' } }))
      .default as { peerDependencies: Record<string, string> };
    expect(CIFRAS.angularPeer).toBe(pkg.peerDependencies['@angular/core']);
    expect(CIFRAS.angularPeer).toBe(pkg.peerDependencies['@angular/common']);
  });

  it('la versión del pie coincide con la publicada en npm', async () => {
    // Criterio de aceptación de T16. Sin esto, el pie sigue anunciando la versión de hace tres
    // publicaciones y nadie se entera: no truena nada, solo miente.
    const pkg = (await import('glyphflow-published/package.json', { with: { type: 'json' } }))
      .default as { version: string };
    expect(CIFRAS.version).toBe(pkg.version);
  });

  it('curados y catálogo son coherentes entre sí', () => {
    expect(CIFRAS.curados).toBeGreaterThan(0);
    expect(CIFRAS.curados).toBeLessThanOrEqual(CIFRAS.catalogo);
  });

  /*
   * Hereda el trabajo de `nombres-generados.spec.ts`, que se borró con su lista: mientras hubo
   * iconos sin coreografía, el sitio llevaba una copia de sus nombres para poder decir «sí existe»
   * sin pagar su geometría. Desde que el catálogo se curó entero esa lista sobra — pero la red no:
   * si un día `generate:icons` trae una versión de Lucide con iconos nuevos, vuelven a existir
   * iconos que el sitio no anuncia, y ese es justo el bug que la lista venía a arreglar.
   *
   * Si esto truena, la decisión es de persona: o se curan los nuevos, o el sitio vuelve a
   * anunciarlos. Lo que no puede pasar es que nadie se entere.
   */
  it('el catálogo está entero — ningún icono se queda sin coreografía', () => {
    expect(Object.keys(GENERATED_ICONS)).toEqual([]);
    expect(CIFRAS.curados).toBe(CIFRAS.catalogo);
  });
});
