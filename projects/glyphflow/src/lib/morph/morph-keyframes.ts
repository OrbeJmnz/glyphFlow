import { resampleIcon } from './core/resample';
import { buildPlan, type MorphPlan } from './core/plan';
import { allocOutputs, interpPolar } from './core/interpolate';
import { serialize } from './core/serialize';
import { Spring, SPRING_PRESETS, type SpringPreset } from './core/spring';
import type { IconInput, Sampled } from './core/types';

/**
 * Capa mínima morphicons → WAAPI. La frontera es dura y es el punto entero del diseño:
 *
 * - El core hace la matemática UNA vez (`buildPlan`) y se muestrea en N poses discretas.
 * - Esas N poses son keyframes de `element.animate()`. El navegador interpola entre ellas en el
 *   hilo del compositor, sin que nosotros pintemos frames.
 * - El spring NO corre en vivo. Se integra offline, una sola vez, para responder dos cosas:
 *   cuánto dura el morph y EN QUÉ MOMENTO cae cada keyframe. Esa es toda su influencia.
 *
 * Es la diferencia con el upstream, que sí lleva un loop de rAF: aquí no hay loop, no hay
 * `requestAnimationFrame` y no hay trabajo por frame en JS. El costo se paga una vez, al construir.
 */

/**
 * Poses discretas que se le entregan a WAAPI. Fijado midiendo los 4 pares de referencia
 * (`bell→bell-ring`, `heart→star`, `circle→square`, `user→user-round`) en 10/15/20/30: la
 * desviación se parte a la mitad con cada escalón y el peso sube lineal, así que 20 es donde deja
 * de pagar la pena. El caso duro es `bell→bell-ring`, el único con rotación real: 1.05 unidades de
 * desviación con 10 pasos contra 0.28 con 20, sobre un lienzo de 24.
 */
export const PASOS_DEFAULT = 20;

/**
 * Puntos por subpath con los que se muestrea la geometría.
 *
 * Alimenta el matching de Procrustes y el anclaje de esquinas — no es muestreo temporal como
 * PASOS_DEFAULT: bajarla puede cambiar qué punto corresponde a cuál, no solo suavizar. Medido:
 * `heart→star` se degrada 42x con res 32 pese a que `bell→bell-ring` mejora. Cualquier ajuste
 * futuro se mide con distancia SIMÉTRICA, nunca de un solo lado — ver el bug de Hausdorff
 * unidireccional de este benchmark.
 */
export const RESOLUCION_DEFAULT = 64;

export interface MorphKeyframesOpts {
  /** Cuántas poses discretas se le entregan a WAAPI. Default: `PASOS_DEFAULT`. */
  pasos?: number;
  /**
   * Puntos por subpath. Es la OTRA perilla del peso, y pega más fuerte que los pasos: el costo
   * total es (pasos × resolución), pero la resolución multiplica el tamaño de CADA pose. Lee la
   * advertencia de `RESOLUCION_DEFAULT` antes de moverla. Default: `RESOLUCION_DEFAULT`.
   */
  resolucion?: number;
  /** Preset del spring: solo decide duración y reparto temporal de los keyframes. */
  spring?: SpringPreset;
}

export interface MorphKeyframes {
  /** Keyframes listos para `element.animate()`, con su `offset` ya calculado por el spring. */
  keyframes: Keyframe[];
  /** Duración total en ms, medida integrando el spring hasta que asienta. */
  duracion: number;
  /** Peso del arreglo de keyframes en bytes (UTF-8), que es lo que cuesta en memoria y en parse. */
  bytes: number;
  plan: MorphPlan;
}

/**
 * Integra el spring hasta que asienta y devuelve su curva de progreso muestreada en el tiempo.
 * Un solo barrido: de aquí salen la duración y los offsets.
 */
function curvaDelSpring(preset: SpringPreset): { tiempos: number[]; progreso: number[] } {
  const { k, c } = SPRING_PRESETS[preset];
  const spring = new Spring();
  spring.config(k, c);
  spring.start();

  const dt = 1 / 240;
  const tiempos: number[] = [0];
  const progreso: number[] = [0];
  let t = 0;
  // Tope de seguridad: 5s a 240Hz. Un spring que no asienta ahí está mal configurado, y es
  // preferible una duración absurda visible que un bucle infinito silencioso.
  for (let i = 0; i < 1200; i++) {
    const asentado = spring.step(dt);
    t += dt;
    tiempos.push(t);
    progreso.push(spring.x);
    if (asentado) break;
  }
  return { tiempos, progreso };
}

/**
 * Momento (0-1, normalizado sobre la duración total) en que el spring alcanza `objetivo`.
 * Interpola linealmente entre las dos muestras que lo cruzan.
 */
function offsetPara(objetivo: number, tiempos: number[], progreso: number[]): number {
  const total = tiempos[tiempos.length - 1];
  if (objetivo <= 0) return 0;
  if (objetivo >= 1) return 1;
  for (let i = 1; i < progreso.length; i++) {
    if (progreso[i] < objetivo) continue;
    const p0 = progreso[i - 1];
    const p1 = progreso[i];
    const f = p1 === p0 ? 0 : (objetivo - p0) / (p1 - p0);
    return (tiempos[i - 1] + f * (tiempos[i] - tiempos[i - 1])) / total;
  }
  return 1;
}

/**
 * Construye los keyframes de un morph entre dos iconos.
 *
 * `origen`/`destino` aceptan lo mismo que el core: un `d` suelto o data estilo Lucide
 * (`[tag, attrs][]`), que es exactamente la forma de `IconShape[]` una vez mapeada.
 */
export function morphKeyframes(
  origen: IconInput,
  destino: IconInput,
  opts: MorphKeyframesOpts = {},
): MorphKeyframes {
  const pasos = Math.max(2, Math.floor(opts.pasos ?? PASOS_DEFAULT));
  const resolucion = Math.max(8, Math.floor(opts.resolucion ?? RESOLUCION_DEFAULT));
  const a: Sampled[] = resampleIcon(origen, resolucion);
  const b: Sampled[] = resampleIcon(destino, resolucion);
  const plan = buildPlan(a, b);
  const out = allocOutputs(plan);
  const cerrados = a.map((s) => s.closed);

  const { tiempos, progreso } = curvaDelSpring(opts.spring ?? 'smooth');

  const keyframes: Keyframe[] = [];
  for (let i = 0; i < pasos; i++) {
    const t = i / (pasos - 1);
    interpPolar(plan, t, out);
    keyframes.push({
      d: `path("${serialize(out, cerrados)}")`,
      // El offset lo dicta el spring: con progreso no lineal, keyframes repartidos uniformemente
      // en el tiempo darían movimiento uniforme — justo lo que un spring no es.
      offset: offsetPara(t, tiempos, progreso),
    });
  }

  const bytes = new TextEncoder().encode(JSON.stringify(keyframes)).length;
  return { keyframes, duracion: tiempos[tiempos.length - 1] * 1000, bytes, plan };
}

/** Lanza el morph sobre un `<path>`. Sin loop: se entrega a WAAPI y el navegador se encarga. */
export function runMorph(
  el: SVGPathElement,
  origen: IconInput,
  destino: IconInput,
  opts: MorphKeyframesOpts & { fill?: FillMode },
): { animation: Animation; medidas: MorphKeyframes } {
  const medidas = morphKeyframes(origen, destino, opts);
  const animation = el.animate(medidas.keyframes, {
    duration: medidas.duracion,
    // `linear`: la no-linealidad ya vive en los offsets de los keyframes. Un easing encima
    // deformaría dos veces la misma curva.
    easing: 'linear',
    fill: opts.fill ?? 'forwards',
  });
  return { animation, medidas };
}
