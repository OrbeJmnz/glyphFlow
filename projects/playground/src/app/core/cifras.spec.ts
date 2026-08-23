import { describe, it, expect } from 'vitest';
import { ANIMATED_ICONS, CURATED_ICONS } from 'glyphflow';
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

  it('curados y catálogo son coherentes entre sí', () => {
    expect(CIFRAS.curados).toBeGreaterThan(0);
    expect(CIFRAS.curados).toBeLessThanOrEqual(CIFRAS.catalogo);
  });
});
