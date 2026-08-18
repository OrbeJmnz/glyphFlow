import { resampleIcon } from './core/resample';
import { buildPlan, type MorphPlan } from './core/plan';
import { allocOutputs, interpPolar } from './core/interpolate';
import { serialize, cubicsToPathD } from './core/serialize';
import { iconToCubics } from './core/normalize';
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

/**
 * Qué se hace con la cola asintótica del resorte. Ver `MorphKeyframesOpts.cola`.
 *
 * `corta` en vez de `completa` porque la cola estricta se lleva el 51% de la duración en
 * movimiento que nadie ve, y al reproducir en reversa (soltar el hover) queda al principio: el
 * morph aterriza de golpe. Medido en `bell→bell-ring`: 737ms → 521ms, y el último tramo entre
 * keyframes baja de 51% a 31% de la duración.
 */
export const COLA_DEFAULT: 'completa' | 'corta' | 'recorte' = 'corta';

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
  /**
   * Qué hacer con la cola asintótica del spring. EXPERIMENTAL — se está eligiendo el default.
   *
   * Un spring nunca "llega": se acerca a 1 para siempre. Con el criterio estricto, el último tramo
   * entre keyframes se come la mitad de la duración en movimiento imperceptible, y al reproducir
   * en reversa (`reverse()` al soltar el hover, o `alternate` en loop) esa cola queda al principio
   * y el tramo veloz al final — el morph aterriza de golpe.
   *
   * - `corta` (default): afloja el criterio a |1−x| < 0.01 **y |v| < 0.2**. La condición de
   *   velocidad NO es decorativa: sin ella, un preset que rebota cumple |1−x| < 0.01 mientras
   *   PASA subiendo por el destino, y el corte se come el rebote entero (medido: `bouncy` cortaba
   *   a los 121ms de 925, con el resorte cruzando a v=7.53 rumbo a 1.24).
   * - `completa`: el criterio estricto del core, |1−x| < 0.001 y |v| < 0.02. Deja una cola
   *   asintótica imperceptible que se lleva la mitad de la duración.
   * - `recorte`: integra completo y tira desde el ÚLTIMO instante en que |1−x| ≥ 0.01. Equivale a
   *   `corta` dentro de unos pocos ms en los tres presets (517/308/633 contra 521/317/637); se
   *   conserva porque son criterios distintos y podrían separarse con presets futuros.
   */
  cola?: 'completa' | 'corta' | 'recorte';
  /**
   * Construye ida Y vuelta en UNA sola iteración, con resorte propio en cada tramo.
   *
   * Existe porque `alternate` (y `reverse()`) recorren los offsets en espejo: la cola lenta queda
   * al principio del regreso y el tramo veloz al final, así que aterriza de golpe. Con dos tramos
   * propios, los dos salen despacio y llegan despacio.
   *
   * Casi gratis, medido: el plan de Procrustes se reusa entero y las poses de vuelta son **byte a
   * byte** las de ida invertidas, así que no se recalcula geometría. Lo único que se duplica es
   * integrar el resorte: 0.0075 ms, un 0.2% de construir una dirección. Lo que sí se duplica de
   * verdad es el PESO del arreglo (2·pasos−1 keyframes).
   */
  idaYVuelta?: boolean;
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
function curvaDelSpring(
  preset: SpringPreset,
  cola: 'completa' | 'corta' | 'recorte',
): { tiempos: number[]; progreso: number[] } {
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
    // `corta`: cerca del destino Y ya casi quieto. Las dos condiciones, no una — ver el comentario
    // de `cola` en las opciones: sin la de velocidad, un resorte que rebota se corta a sí mismo el
    // rebote al pasar por el destino a toda velocidad.
    if (cola === 'corta' ? Math.abs(1 - spring.x) < 0.01 && Math.abs(spring.v) < 0.2 : asentado) {
      break;
    }
  }

  if (cola === 'recorte') {
    // Desde el ÚLTIMO instante fuera de la banda del 1%, no el primero: con sobrepaso, el primero
    // cae subiendo y decapitaría el rebote igual que la versión ingenua de `corta`.
    let hasta = progreso.length - 1;
    while (hasta > 0 && Math.abs(1 - progreso[hasta]) < 0.01) hasta--;
    if (hasta > 0 && hasta < progreso.length - 1) {
      tiempos.length = hasta + 1;
      progreso.length = hasta + 1;
    }
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

  const { tiempos, progreso } = curvaDelSpring(opts.spring ?? 'smooth', opts.cola ?? COLA_DEFAULT);

  // Las poses: se calculan UNA vez. La vuelta son estas mismas al revés — un morph es simétrico,
  // así que reusarlas no es una optimización sucia, es la misma trayectoria leída de derecha a
  // izquierda (verificado byte a byte).
  const poses: string[] = [];
  const offsetsDeTramo: number[] = [];
  for (let i = 0; i < pasos; i++) {
    const t = i / (pasos - 1);
    interpPolar(plan, t, out);
    poses.push(`path("${serialize(out, cerrados)}")`);
    // El offset lo dicta el spring: con progreso no lineal, keyframes repartidos uniformemente
    // en el tiempo darían movimiento uniforme — justo lo que un spring no es.
    offsetsDeTramo.push(offsetPara(t, tiempos, progreso));
  }

  const duracionDeTramo = tiempos[tiempos.length - 1] * 1000;
  const keyframes: Keyframe[] = [];

  if (opts.idaYVuelta) {
    // Tramo de ida en la primera mitad del reloj…
    for (let i = 0; i < pasos; i++) {
      keyframes.push({ d: poses[i], offset: offsetsDeTramo[i] / 2 });
    }
    // …y de vuelta en la segunda, con SU PROPIA curva de resorte, no la de ida en espejo. Se
    // arranca en i=1 para no repetir la pose del centro (el destino), que ya quedó en offset 0.5.
    for (let i = 1; i < pasos; i++) {
      keyframes.push({ d: poses[pasos - 1 - i], offset: 0.5 + offsetsDeTramo[i] / 2 });
    }
  } else {
    for (let i = 0; i < pasos; i++) {
      keyframes.push({ d: poses[i], offset: offsetsDeTramo[i] });
    }
  }

  const bytes = new TextEncoder().encode(JSON.stringify(keyframes)).length;
  return {
    keyframes,
    duracion: opts.idaYVuelta ? duracionDeTramo * 2 : duracionDeTramo,
    bytes,
    plan,
  };
}

/**
 * `d` canónico de un icono: cúbicas exactas, no la polilínea de vuelo.
 *
 * No es el string literal de Lucide y no puede serlo: el morph pinta UN `<path>` mientras el icono
 * tiene N figuras (y algunas ni siquiera son paths — `circle`, `rect`). Esto las baja todas a
 * cúbicas y las concatena, que es la forma canónica más fiel que existe para un solo elemento.
 * Un llamador que tenga el string exacto puede pasarlo por `dFinal` y gana él.
 */
export function canonicalD(icono: IconInput): string {
  return cubicsToPathD(iconToCubics(icono));
}

/**
 * Marca de qué morph es dueño cada elemento. Existe por una carrera que un `.catch()` NO cubre:
 * si el morph viejo alcanza a TERMINAR bien justo cuando arranca uno nuevo, su `finished` resuelve
 * (no rechaza) y escribiría el `d` del destino VIEJO sobre un elemento que ya está a media
 * transición nueva. `WeakMap` para no retener elementos removidos del DOM.
 */
const duenoDelElemento = new WeakMap<Element, object>();

export interface RunMorphOpts extends MorphKeyframesOpts {
  fill?: FillMode;
  /** Repite indefinidamente, ida y vuelta. Modo comparador; ver la nota de `direction`. */
  loop?: boolean;
  iterations?: number;
  direction?: PlaybackDirection;
  /** `d` exacto al que aterrizar. Por default, el canónico del destino. */
  dFinal?: string;
}

/**
 * Lanza el morph sobre un `<path>`. Sin loop de animación: se entrega a WAAPI y el navegador se
 * encarga; el spring ya hizo su trabajo al construir los keyframes.
 *
 * **Aterrizaje exacto**: en vuelo las poses son polilíneas (obligatorio — WAAPI solo interpola
 * entre `d` con la MISMA estructura de comandos; mezclar arcos con líneas degrada a salto
 * discreto, verificado en navegador). Al asentar se escribe el `d` canónico del destino, así el
 * DOM en reposo vuelve a ser curvas y no 252 segmentos rectos.
 */
export function runMorph(
  el: SVGPathElement,
  origen: IconInput,
  destino: IconInput,
  opts: RunMorphOpts = {},
): { animation: Animation; medidas: MorphKeyframes } {
  const medidas = morphKeyframes(origen, destino, opts);
  const animation = el.animate(medidas.keyframes, {
    duration: medidas.duracion,
    // `linear`: la no-linealidad ya vive en los offsets de los keyframes. Un easing encima
    // deformaría dos veces la misma curva.
    easing: 'linear',
    fill: opts.fill ?? 'forwards',
    iterations: opts.iterations ?? (opts.loop ? Infinity : 1),
    // `alternate` para que la vuelta recorra la trayectoria en vez de saltar al inicio. OJO: con
    // los offsets del spring, la vuelta los recorre en espejo — la cola lenta queda al principio y
    // el tramo rápido al final, así que aterriza de golpe. Es timing, no dirección.
    direction: opts.direction ?? (opts.loop ? 'alternate' : 'normal'),
  });

  const marca = {};
  duenoDelElemento.set(el, marca);

  /**
   * Dónde aterriza esto, que NO siempre es el destino:
   * - `idaYVuelta` termina donde empezó, en el origen.
   * - reproducido en reversa (`reverse()` al soltar el hover) también termina en el origen —
   *   `finished` resuelve igual, así que sin mirar `playbackRate` se escribiría el destino sobre
   *   una figura que quedó en la pose de origen.
   */
  const poseFinal = (): string => {
    if (opts.idaYVuelta || animation.playbackRate < 0) return canonicalD(origen);
    return opts.dFinal ?? canonicalD(destino);
  };

  animation.finished
    .then(() => {
      // Otro morph tomó el elemento mientras este terminaba: no es nuestro, no se escribe. Pero sí
      // se cancela lo propio — con `fill: forwards` esta animación seguiría viva en el stack,
      // tapada por la nueva y sin dueño, y `getAnimations()` la arrastraría para siempre.
      if (duenoDelElemento.get(el) !== marca) {
        animation.cancel();
        return;
      }
      // El atributo PRIMERO y el `cancel()` después, en este orden: mientras el `fill: forwards`
      // siga aplicado tapa el cambio, y al soltarlo abajo ya está el `d` bueno. Al revés se ve un
      // parpadeo con la pose original entre el cancel y la escritura.
      el.setAttribute('d', poseFinal());
      animation.cancel();
      duenoDelElemento.delete(el);
    })
    .catch(() => {
      // `cancel()` rechaza `finished` con AbortError. Interrumpir un morph es normal (el puntero
      // se movió, cambió el estado), no un error: se ignora en silencio. Sin este catch sería una
      // promesa rechazada sin manejar en la consola de cualquier consumidor.
    });

  return { animation, medidas };
}
