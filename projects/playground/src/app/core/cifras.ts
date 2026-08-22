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
  pesoIconoKb: 4.09,
  depsAnimacion: 0,
} as const;
