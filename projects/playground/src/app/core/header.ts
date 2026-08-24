/**
 * El hueco que debe quedar bajo el header fijo, leído del CSS en vez de escrito a mano.
 *
 * Antes esto era un `88` literal en dos archivos, más `top: 5.5rem` en dos hojas de estilo, más un
 * `71px` que solo vivía en comentarios. Cuatro copias del mismo número en dos unidades distintas:
 * cambiar la altura del header las descuadraba todas y ninguna se quejaba.
 *
 * Ahora la fuente es `--gf-header-h` (ver `styles.css`) y esto la lee. El criterio de aceptación de
 * T24 es exactamente eso: cambiar la altura del header en el CSS no debe descuadrar ningún sticky.
 */
export function huecoBajoHeader(doc: Document): number {
  // El prerender no tiene `getComputedStyle` (ni ventana). Ahí no hay scroll que ajustar, así que
  // devolver 0 es correcto y no una degradación: el valor solo se usa para desplazar la página.
  const vista = doc.defaultView;
  if (!vista?.getComputedStyle) return 0;

  const estilo = vista.getComputedStyle(doc.documentElement);
  const leer = (nombre: string): number => Number.parseFloat(estilo.getPropertyValue(nombre)) || 0;
  const alto = leer('--gf-header-h');
  // El hueco puede venir en rem; se convierte con el tamaño de fuente raíz, no asumiendo 16.
  const raiz = Number.parseFloat(estilo.fontSize) || 16;
  const hueco = estilo.getPropertyValue('--gf-header-hueco').trim();
  const huecoPx = hueco.endsWith('rem')
    ? Number.parseFloat(hueco) * raiz
    : Number.parseFloat(hueco) || 0;
  return alto + huecoPx;
}
