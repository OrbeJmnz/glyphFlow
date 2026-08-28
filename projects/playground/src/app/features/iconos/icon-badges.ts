import { AnimatedIconDef } from 'glyphflow';
import { analizarIcono } from './motion-inspector';

/**
 * La taxonomía de los filtros del grid: cómo se parte un catálogo de cientos en grupos que valen
 * la pena mirar por separado.
 *
 * Se calcula del MISMO `analizarIcono` que alimenta al Motion Inspector — el grid y el panel de
 * detalle no pueden discrepar sobre lo que hace un icono porque leen el mismo análisis.
 *
 * NACIÓ como insignias pintadas en cada tarjeta, y de ahí el nombre. Casi ninguna se pinta ya: la
 * tarjeta muestra el conteo de animaciones, que dice lo mismo con más precisión que un `+1`
 * constante. Las demás solo FILTRAN, y ahí el criterio es «esto ACOTA», no «esto DESTACA».
 *
 * La excepción es `hold`, que sí vuelve a la tarjeta. Es la única que anuncia algo que se puede
 * HACER —dejá el puntero encima y la pose se queda— y sin marcarla no hay forma de saber cuál de
 * los 1767 la tiene sin abrirlos uno por uno.
 *
 * `draw` no entra: lo trae cualquier curado (lo inyecta el registro), así que filtrar por él
 * devolvería el catálogo entero.
 */
export type ClaveInsignia = 'extras' | 'hold' | 'held' | 'solo-draw';

export interface Insignia {
  clave: ClaveInsignia;
  etiqueta: string;
  /** El porqué, para el tooltip y el lector de pantalla — la etiqueta sola no se explica. */
  titulo: string;
}

/** Las dos variantes que trae CUALQUIER curado: no distinguen a nadie. */
const UNIVERSALES = new Set(['draw', 'default']);

export function insigniasDe(nombre: string, def: AnimatedIconDef): Insignia[] {
  const reporte = analizarIcono(nombre, def);
  const salida: Insignia[] = [];

  const extras = reporte.variantes.map((v) => v.variante).filter((v) => !UNIVERSALES.has(v));
  if (extras.length) {
    salida.push({
      clave: 'extras',
      etiqueta: `+${extras.length}`,
      titulo: `Variante extra: ${extras.join(', ')} — pásala por el panel de detalle`,
    });
  }

  // `hold` y `held` NO son lo mismo, y por eso conviven: `hold` es una variante APARTE que
  // sostiene su pose; `held` es que el propio `default` se queda mientras el puntero siga encima.
  // Medido sobre el catálogo: 473 y 128, y CERO en común.
  if (reporte.variantes.some((v) => v.variante === 'hold')) {
    salida.push({
      clave: 'hold',
      etiqueta: 'hold',
      titulo: 'Tiene variante `hold`: deja el puntero encima y la pose se queda',
    });
  }

  const base = reporte.variantes.find((v) => v.variante === 'default');
  if (base?.reverseOnLeave) {
    salida.push({
      clave: 'held',
      etiqueta: 'held',
      titulo: 'Se sostiene mientras el puntero siga encima y regresa al salir',
    });
  }
  // `default` con `autoDraw` y CERO tracks propios: el curado no le puso coreografía a mano, solo
  // hereda el trazo. Marcarlo es honesto — y de paso señala qué iconos piden trabajo humano.
  if (base?.autoDraw && base.propiedadesAnimadas.length === 0) {
    salida.push({
      clave: 'solo-draw',
      etiqueta: 'solo trazo',
      titulo: 'Sin coreografía propia: su `default` es el trazo automático',
    });
  }

  return salida;
}
