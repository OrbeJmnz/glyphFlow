/**
 * Lo que el motor necesita saber del navegador, detrás de funciones perezosas. El prototipo
 * evaluaba `matchMedia` al CARGAR el módulo; aquí nada toca `window` hasta que alguien pregunta,
 * así que importar `glyphflow/bots` en el servidor no truena.
 */

/** `true` si el usuario pidió menos movimiento. En servidor (sin `matchMedia`) es `false`. */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
