import { AnimatedIconDef } from 'glyphflow';
import { analizarIcono } from './motion-inspector';

/**
 * Insignias del grid: la respuesta a "¿cuál de estas 180 tarjetas vale la pena abrir?".
 *
 * Se calculan del MISMO `analizarIcono` que alimenta al Motion Inspector — el grid y el panel de
 * detalle no pueden discrepar sobre lo que hace un icono porque leen el mismo análisis.
 *
 * Solo se pinta lo que DISTINGUE. `draw` no es insignia: las 180 lo traen (lo inyecta el registro),
 * así que marcarlo no separaría a ninguna de las otras 179.
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
