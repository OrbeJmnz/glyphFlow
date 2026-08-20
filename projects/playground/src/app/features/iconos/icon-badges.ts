import { AnimatedIconDef } from 'glyphflow';
import { analizarIcono } from './motion-inspector';

/**
 * La taxonomía de los filtros del grid: cómo se parte un catálogo de cientos en grupos que valen
 * la pena mirar por separado.
 *
 * Se calcula del MISMO `analizarIcono` que alimenta al Motion Inspector — el grid y el panel de
 * detalle no pueden discrepar sobre lo que hace un icono porque leen el mismo análisis.
 *
 * NACIÓ como insignias pintadas en cada tarjeta, y de ahí el nombre. Ya no se pintan: la tarjeta
 * muestra el conteo de animaciones, que dice lo mismo con más precisión que un `+1` constante. Lo
 * que queda es filtrar, y el criterio pasó de «esto DESTACA» a «esto ACOTA».
 *
 * `draw` no entra: lo trae cualquier curado (lo inyecta el registro), así que filtrar por él
 * devolvería el catálogo entero.
 */
export type ClaveInsignia = 'extras' | 'held' | 'solo-draw';

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
