/**
 * Las cifras de portada — las mismas en el hero y en el menú móvil. TODAS escritas a mano: son
 * hechos de build (tamaño del bundle, catálogo de Lucide, cero deps de animación) y no hay de
 * dónde leerlos en el cliente sin pagarlo caro.
 *
 * Ningún registro se importa aquí, y eso es una decisión deliberada del proyecto (mismo criterio
 * en `morph-picker.ts` y `morph-bench.ts`): pedirlo arrastra la geometría entera al bundle del
 * sitio para pintar un número de cuatro dígitos.
 *
 * `curados` SÍ se derivaba de `CURATED_ICONS`, y funcionó mientras el catálogo curado era la
 * parte pequeña. Dejó de funcionar el 2026-08-27, cuando se curó entero: este archivo lo usa el
 * shell —hero y menú móvil—, así que los 1767 iconos con su geometría acabaron en el bundle
 * INICIAL y el build de producción se cayó por presupuesto, 1.43 MB contra un tope de 1.00 MB.
 *
 * Que ninguno se quede atrás lo cuida `cifras.spec.ts`, que sí puede importar los registros
 * porque corre en Node y no viaja al cliente.
 */
export const CIFRAS = {
  curados: 1767,
  catalogo: 1767,
  /**
   * Cuántos curados traen alguna variante además de `draw`/`default` (badge `extras`), y cuántos
   * traen `hold` (se sostiene mientras el puntero siga encima). Escritos a mano por la MISMA razón
   * que `catalogo`: derivarlos en el cliente exigiría el registro completo — `insigniasDe()`
   * necesita `def.animations` de cada icono, y eso es la geometría entera otra vez.
   *
   * Se calculan con `insigniasDe()` (`features/iconos/icon-badges.ts`) sobre `CURATED_ICONS`, y lo
   * ancla `cifras.spec.ts` corriendo esa MISMA función en Node — así que no pueden quedarse atrás
   * en silencio si el catálogo cambia.
   */
  conVariantes: 1095,
  conHold: 496,
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
  pesoIconoKb: 4.59,
  /**
   * Los otros dos escenarios de `bundle-check`. Están aquí y no sueltos en la plantilla de
   * `empezando.html` porque ahí YA se pudrieron una vez: publicaban 3.74 / 4.09 / 94.48, las
   * cifras de cuando el catálogo tenía 180 curados, mientras el CI medía otra cosa. Con los tres
   * juntos, `bundle-size-check.ts` los verifica de una y no hay dónde esconder una copia.
   */
  bundleCoreKb: 4.06,
  bundleCatalogoKb: 169.27,
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
  version: '2.4.0',
} as const;
