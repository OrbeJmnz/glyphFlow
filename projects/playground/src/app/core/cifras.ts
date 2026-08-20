import { CURATED_ICONS } from 'glyphflow';

/**
 * Las cifras de portada — las mismas en el hero y en el menú móvil. Solo `curados` sale del
 * catálogo en vivo; el resto son hechos de build (tamaño del bundle, catálogo completo de Lucide,
 * cero deps de animación) que no hay de dónde leerlos en el cliente.
 */
export const CIFRAS = {
  curados: Object.keys(CURATED_ICONS).length,
  catalogo: 1767,
  pesoIconoKb: 4.09,
  depsAnimacion: 0,
} as const;
