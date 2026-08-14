import { AnimatedIconDef } from './animated-icon.model';

/**
 * Catálogo GENERADO — el script offline de v1 (aún no existe) lee el set completo de Lucide y
 * escupe aquí una entrada `icon(shapes, {})` (solo `draw` automático) por cada icono que NO
 * esté ya en `curated-icons.ts`. El generador nunca toca ese archivo ni sobreescribe un nombre
 * que ya exista ahí — la composición en animated-icons.registry.ts hace que lo curado siempre
 * gane si algún día hay colisión de nombre, pero la regla real es que el generador ni debería
 * intentarlo.
 *
 * Vacío hasta que el generador exista. Archivo generado — no se edita a mano.
 */
export const GENERATED_ICONS: Record<string, AnimatedIconDef> = {};
