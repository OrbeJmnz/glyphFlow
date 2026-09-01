import { describe, it, expect } from 'vitest';
import { ANIMATED_ICONS, GENERATED_ICONS, type AnimatedIconDef } from 'glyphflow';
import { insigniasDe } from '../features/iconos/icon-badges';
import { CIFRAS } from './cifras';
import catalogoJson from './catalogo-curado.json';

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

  /*
   * Contra el JSON del sitio y NO contra `CURATED_ICONS` de `glyphflow`: en el playground ese
   * import resuelve al paquete PUBLICADO, mientras `catalogo-curado.json` se genera del código
   * FUENTE. Comparar la portada con lo publicado afirma «lo local ya está en npm», que sólo es
   * cierto justo después de un release — y entre release y release el hero acaba contradiciendo
   * a la rejilla de abajo, que sí come el JSON. Es la misma trampa que puso rojo a
   * `taller.spec` en `05d7cdb`.
   */
  it('los curados salen del catálogo que el sitio de verdad pinta', () => {
    expect(CIFRAS.curados).toBe(Object.keys(catalogoJson.iconos).length);
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

  /*
   * `conVariantes`/`conHold` son la MISMA cuenta que ya decide los chips de filtro del catálogo
   * (`iconos.ts`, `conteos`) y el badge de cada tarjeta — corriendo `insigniasDe()` aquí, en Node,
   * contra el registro real, así que no se puede inventar un número ni quedarse atrás en silencio.
   */
  it('conVariantes y conHold coinciden con insigniasDe() sobre el catálogo real', () => {
    let conVariantes = 0;
    let conHold = 0;
    for (const [nombre, def] of Object.entries(catalogoJson.iconos)) {
      const insignias = insigniasDe(nombre, def as unknown as AnimatedIconDef);
      if (insignias.some((i) => i.clave === 'extras')) conVariantes++;
      if (insignias.some((i) => i.clave === 'hold')) conHold++;
    }
    expect(CIFRAS.conVariantes).toBe(conVariantes);
    expect(CIFRAS.conHold).toBe(conHold);
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
