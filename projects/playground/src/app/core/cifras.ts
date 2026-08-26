import { CURATED_ICONS } from 'glyphflow';

/**
 * Las cifras de portada — las mismas en el hero y en el menú móvil. Solo `curados` sale del
 * catálogo en vivo; el resto son hechos de build (tamaño del bundle, catálogo completo de Lucide,
 * cero deps de animación) que no hay de dónde leerlos en el cliente.
 *
 * `catalogo` NO se deriva de `ANIMATED_ICONS` a propósito, aunque sería lo obvio: ese registro
 * arrastra los 868 generados al bundle del sitio, y evitarlo es una decisión deliberada del
 * proyecto (ver el mismo criterio en `morph-picker.ts` y `morph-bench.ts`). Pagar ~100KB de
 * catálogo para pintar un número de cuatro dígitos sería un mal negocio.
 *
 * Que el número no se quede atrás lo cuida `cifras.spec.ts`, que sí puede importar el registro
 * completo porque corre en Node y no viaja al cliente.
 */
export const CIFRAS = {
  curados: Object.keys(CURATED_ICONS).length,
  catalogo: 1767,
  /**
   * Escrito a mano por la misma razón que `catalogo`, pero con una trampa propia: **nada lo
   * ancla**, y por eso derivó. Decía 4.09 desde que el catálogo tenía 180 curados; con 911 el
   * `bundle-check` mide 4.83, o sea el hero llevaba meses presumiendo un número que el CI ya no
   * producía. Lo mismo le pasó a la tabla de los dos README.
   *
   * Sale de `npm run bundle-check`, escenario A (un icono suelto, tree-shakeable), y describe el
   * paquete PUBLICADO, que es el que el sitio consume — no el árbol de trabajo. Al publicar una
   * versión que mueva el número, se actualiza aquí junto con el `npm update glyphflow-published`.
   */
  pesoIconoKb: 4.83,
  /**
   * Los otros dos escenarios de `bundle-check`. Están aquí y no sueltos en la plantilla de
   * `empezando.html` porque ahí YA se pudrieron una vez: publicaban 3.74 / 4.09 / 94.48, las
   * cifras de cuando el catálogo tenía 180 curados, mientras el CI medía otra cosa. Con los tres
   * juntos, `bundle-size-check.ts` los verifica de una y no hay dónde esconder una copia.
   */
  bundleCoreKb: 4.57,
  bundleCatalogoKb: 151.74,
  depsAnimacion: 0,
  /**
   * El rango de Angular que el paquete declara. Escrito a mano por la MISMA razón que
   * `catalogo`: leerlo en el cliente obligaría a importar el `package.json` del paquete, y
   * un rango de versiones no vale un byte de bundle. Lo ancla `cifras.spec.ts` contra las
   * `peerDependencies` reales del publicado, así que no se puede quedar atrás en silencio.
   */
  angularPeer: '>=20.0.0 <23.0.0',
  /**
   * La versión que el pie de página muestra. Escrita a mano por la MISMA razón que `angularPeer`:
   * leerla en vivo obligaría a importar el `package.json` del paquete, y un número de versión no
   * vale un byte de bundle.
   *
   * Que no mienta lo cuida `cifras.spec.ts`, que sí puede importarlo porque corre en Node. El
   * criterio de aceptación de T16 es literal —«la versión mostrada coincide con la publicada en
   * npm»— y ese spec es quien lo hace cierto: al publicar una versión nueva, truena hasta que
   * alguien actualice esto.
   */
  version: '2.1.0',
} as const;
