import { resampleIcon } from './core/resample';
import { buildPlan, type MorphPlan } from './core/plan';
import { allocOutputs, interpPolar } from './core/interpolate';
import { serialize, cubicsToPathD } from './core/serialize';
import { iconToCubics } from './core/normalize';
import { Spring, SPRING_PRESETS as PRESETS_UPSTREAM } from './core/spring';
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
 * Qué se hace con la cola asintótica del resorte — ver `MorphKeyframesOpts.tail`.
 *
 * Los tres valores viajan al usuario, así que van en inglés. El vocabulario viejo
 * (`'completa' | 'corta' | 'recorte'`) se sigue aceptando en tiempo de ejecución durante una
 * minor; ver `normalizarCola`.
 */
export type SpringTail = 'full' | 'short' | 'clip';

/** El vocabulario de la v1. @deprecated Usa {@link SpringTail}. */
export type SpringTailLegacy = 'completa' | 'corta' | 'recorte';

/**
 * Poses discretas que se le entregan a WAAPI. Fijado midiendo los 4 pares de referencia
 * (`bell→bell-ring`, `heart→star`, `circle→square`, `user→user-round`) en 10/15/20/30: la
 * desviación se parte a la mitad con cada escalón y el peso sube lineal, así que 20 es donde deja
 * de pagar la pena. El caso duro es `bell→bell-ring`, el único con rotación real: 1.05 unidades de
 * desviación con 10 pasos contra 0.28 con 20, sobre un lienzo de 24.
 */
export const STEPS_DEFAULT = 20;

/**
 * Puntos por subpath con los que se muestrea la geometría.
 *
 * Alimenta el matching de Procrustes y el anclaje de esquinas — no es muestreo temporal como
 * STEPS_DEFAULT: bajarla puede cambiar qué punto corresponde a cuál, no solo suavizar. Medido:
 * `heart→star` se degrada 42x con res 32 pese a que `bell→bell-ring` mejora. Cualquier ajuste
 * futuro se mide con distancia SIMÉTRICA, nunca de un solo lado — ver el bug de Hausdorff
 * unidireccional de este benchmark.
 */
export const RESOLUTION_DEFAULT = 64;

/**
 * Qué se hace con la cola asintótica del resorte. Ver `MorphKeyframesOpts.tail`.
 *
 * `short` en vez de `full` porque la cola estricta se lleva el 51% de la duración en movimiento
 * que nadie ve, y al reproducir en reversa (soltar el hover) queda al principio: el morph aterriza
 * de golpe. Medido en `bell→bell-ring`: 737ms → 521ms, y el último tramo entre keyframes baja de
 * 51% a 31% de la duración.
 */
export const SPRING_TAIL_DEFAULT: SpringTail = 'short';

/*
 * ── Alias de la v1 ──────────────────────────────────────────────────────────────────────────
 *
 * Se conservan una minor para que un proyecto que ya importaba estos nombres siga compilando.
 * Son la MISMA referencia, no copias: `PASOS_DEFAULT === STEPS_DEFAULT` es `true`, y para un
 * `InjectionToken` esa distinción sería la diferencia entre funcionar y fallar en silencio.
 */

/** @deprecated Renombrada a {@link STEPS_DEFAULT}. Sale en la próxima major. */
export const PASOS_DEFAULT = STEPS_DEFAULT;

/** @deprecated Renombrada a {@link RESOLUTION_DEFAULT}. Sale en la próxima major. */
export const RESOLUCION_DEFAULT = RESOLUTION_DEFAULT;

/**
 * @deprecated Renombrada a {@link SPRING_TAIL_DEFAULT}. Sale en la próxima major.
 *
 * **Su valor cambió de `'corta'` a `'short'`**, no solo su nombre. Un `{ cola: COLA_DEFAULT }`
 * escrito contra la v1 sigue funcionando porque `tail`/`cola` aceptan los dos vocabularios
 * (`normalizarCola`), pero si lo estabas COMPARANDO (`x === COLA_DEFAULT`) contra un `'corta'`
 * literal, esa comparación ahora da `false`.
 */
export const COLA_DEFAULT = SPRING_TAIL_DEFAULT;

/**
 * Presets de resorte: los tres del catálogo vendorizado.
 *
 * Estuvieron acotados a `smooth` a propósito: los subamortiguados NO rebotaban aquí, porque las
 * poses se muestreaban en t ∈ [0,1] y el sobrepaso vive en t > 1 — `snappy` y `bouncy` solo
 * habrían alargado el reloj con el icono ya quieto, y exportar esos nombres era vender un rebote
 * que el motor no entregaba. Ahora `overshoot` dibuja las poses de t > 1 (topadas al lienzo por
 * bisección), así que la etiqueta cumple y la superficie se reabre — aditivo, como decía el plan.
 *
 * Los valores salen del catálogo vendorizado, no se re-declaran: si upstream afina uno, esto lo
 * hereda. ζ = c / (2·√k): `smooth` 1.00, `snappy` 0.73, `bouncy` 0.40.
 */
export const SPRING_PRESETS = PRESETS_UPSTREAM;

export type SpringPreset = keyof typeof SPRING_PRESETS;

/**
 * Resorte a la medida: rigidez y amortiguamiento crudos, sin pasar por un nombre.
 *
 * Queda abierto a propósito — quien sepa lo que hace puede pedir un subamortiguado y obtendrá lo
 * que la física da hoy (más duración, sin rebote dibujado). Lo que no existe es la ETIQUETA que se
 * lo prometa.
 */
export interface SpringConfig {
  /** Rigidez. */
  k: number;
  /** Amortiguamiento. ζ = c / (2·√k): 1 es crítico, menos rebota. */
  c: number;
}

/*
 * Nombres de opciones en INGLÉS, comentarios en español.
 *
 * No es incoherencia: es dónde está la frontera. Todo lo que el usuario ESCRIBE viaja fuera del
 * proyecto —lo teclea alguien que quizá no habla español— así que va en inglés. Lo que se lee
 * puertas adentro se queda en el idioma del equipo, y por eso más abajo `const pasos = opts.steps`
 * no es un descuido.
 */
export interface MorphKeyframesOpts {
  /** Cuántas poses discretas se le entregan a WAAPI. Default: `STEPS_DEFAULT`. */
  steps?: number;
  /**
   * Puntos por subpath. Es la OTRA perilla del peso, y pega más fuerte que los pasos: el costo
   * total es (pasos × resolución), pero la resolución multiplica el tamaño de CADA pose. Lee la
   * advertencia de `RESOLUTION_DEFAULT` antes de moverla. Default: `RESOLUTION_DEFAULT`.
   */
  resolution?: number;
  /**
   * Resorte: solo decide duración y reparto temporal de los keyframes, nunca la geometría.
   * Un preset por nombre (`'smooth'`) o un `{ k, c }` propio.
   */
  spring?: SpringPreset | SpringConfig;
  /**
   * Qué hacer con la cola asintótica del spring. EXPERIMENTAL — se está eligiendo el default.
   *
   * Un spring nunca "llega": se acerca a 1 para siempre. Con el criterio estricto, el último tramo
   * entre keyframes se come la mitad de la duración en movimiento imperceptible, y al reproducir
   * en reversa (`reverse()` al soltar el hover, o `alternate` en loop) esa cola queda al principio
   * y el tramo veloz al final — el morph aterriza de golpe.
   *
   * - `short` (default): afloja el criterio a |1−x| < 0.01 **y |v| < 0.2**. La condición de
   *   velocidad NO es decorativa: sin ella, un resorte subamortiguado cumple |1−x| < 0.01 mientras
   *   PASA subiendo por el destino, y el corte se come el rebote entero (medido con ζ = 0.40:
   *   cortaba a los 121ms de 925, cruzando a v=7.53 rumbo a x=1.24).
   * - `full`: el criterio estricto del core, |1−x| < 0.001 y |v| < 0.02. Deja una cola asintótica
   *   imperceptible que se lleva la mitad de la duración.
   * - `clip`: integra completo y tira desde el ÚLTIMO instante en que |1−x| ≥ 0.01. Equivale a
   *   `short` dentro de unos pocos ms en los tres presets (517/308/633 contra 521/317/637); se
   *   conserva porque son criterios distintos y podrían separarse con presets futuros.
   *
   * Acepta también el vocabulario de la v1 (`'completa' | 'corta' | 'recorte'`) durante una minor.
   */
  tail?: SpringTail | SpringTailLegacy;
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
  roundTrip?: boolean;
  /**
   * Dibuja el SOBREPASO del resorte: las poses más allá del destino, cuando el preset rebota.
   *
   * Sin esto, un resorte subamortiguado solo alarga el reloj — el icono llega al destino y se
   * queda quieto mientras la física termina de oscilar en el papel. Con esto, el rebote se ve.
   *
   * `interpPolar` extrapola para t > 1 (lo dice su encabezado), pero extrapola la SIMILARIDAD:
   * rebotar = seguir escalando/moviendo más allá del destino. Medido en `bell→bell-ring`, la pose
   * se sale del viewBox 24×24 pasando t≈1.12 y el SVG la recorta. Por eso el muestreo se topa en
   * el t más grande que todavía cabe (`limiteSeguro`), y ese tope depende del PAR — no hay un
   * número universal. Con `smooth` (ζ≈1, sin rebote) esta opción no cambia absolutamente nada.
   *
   * **Default `true`.** Con el resorte por default los keyframes salen byte por byte idénticos
   * (hay test que lo clava), así que prenderlo no le cuesta nada al camino normal; y quien pide un
   * subamortiguado quiere el rebote, no un reloj más largo. `false` es la salida para quien
   * prefiera la trayectoria truncada.
   */
  overshoot?: boolean;

  /*
   * ── Nombres de la v1 ──────────────────────────────────────────────────────────────────────
   *
   * Siguen leyéndose una minor: un `{ pasos: 30 }` escrito contra la v1 sigue haciendo lo mismo.
   * El nuevo GANA si vienen los dos, porque es el que la persona escribió a conciencia después
   * de migrar. Salen en la próxima major.
   */

  /** @deprecated Renombrada a {@link MorphKeyframesOpts.steps}. */
  pasos?: number;
  /** @deprecated Renombrada a {@link MorphKeyframesOpts.resolution}. */
  resolucion?: number;
  /** @deprecated Renombrada a {@link MorphKeyframesOpts.tail}. */
  cola?: SpringTail | SpringTailLegacy;
  /** @deprecated Renombrada a {@link MorphKeyframesOpts.roundTrip}. */
  idaYVuelta?: boolean;
  /** @deprecated Renombrada a {@link MorphKeyframesOpts.overshoot}. */
  sobrepaso?: boolean;
}

export interface MorphKeyframes {
  /** Keyframes listos para `element.animate()`, con su `offset` ya calculado por el spring. */
  keyframes: Keyframe[];
  /** Duración total en ms, medida integrando el spring hasta que asienta. */
  duration: number;
  /**
   * @deprecated Renombrada a {@link MorphKeyframes.duration}. Sale en la próxima major.
   *
   * Se sigue rellenando con el mismo número — es un campo de SALIDA, así que no hay ambigüedad
   * que resolver: quien lea cualquiera de los dos lee lo mismo.
   */
  duracion: number;
  /** Peso del arreglo de keyframes en bytes (UTF-8), que es lo que cuesta en memoria y en parse. */
  bytes: number;
  plan: MorphPlan;
}

/**
 * Traduce el vocabulario de la v1 al de hoy. Todo lo de adentro compara contra los nombres
 * nuevos y solo contra ellos; el mapa vive aquí, en un punto único, y se borra entero cuando
 * caiga la deprecación.
 */
function normalizarCola(v: SpringTail | SpringTailLegacy): SpringTail {
  switch (v) {
    case 'completa':
      return 'full';
    case 'corta':
      return 'short';
    case 'recorte':
      return 'clip';
    default:
      return v;
  }
}

/**
 * Integra el spring hasta que asienta y devuelve su curva de progreso muestreada en el tiempo.
 * Un solo barrido: de aquí salen la duración y los offsets.
 */
function curvaDelSpring(
  resorte: SpringPreset | SpringConfig,
  cola: SpringTail,
): { tiempos: number[]; progreso: number[] } {
  const { k, c } = typeof resorte === 'string' ? SPRING_PRESETS[resorte] : resorte;
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
    if (cola === 'short' ? Math.abs(1 - spring.x) < 0.01 && Math.abs(spring.v) < 0.2 : asentado) {
      break;
    }
  }

  if (cola === 'clip') {
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
/**
 * Extremos de una pose serializada, para saber si todavía cabe en el lienzo.
 * Se lee del `d` ya generado en vez de recorrer los Float64Array: es la MISMA cadena que va a
 * pintar el navegador, así que no hay forma de que la medición y lo dibujado se separen.
 */
/**
 * Lado del lienzo contra el que se mide si una pose extrapolada todavía cabe.
 *
 * Constante, no derivado: `IconInput` (el tipo que come el core) es `IconNode | string` y NO
 * carga el `viewBox` — ese vive en `AnimatedIconDef`, que nunca llega hasta aquí. 24 es el lado
 * de Lucide y el default de la librería, así que es correcto para todo el catálogo. Si algún día
 * entra geometría con otro lienzo, esto tiene que pasar a ser un parámetro; fingir que se deduce
 * sería peor que dejarlo escrito.
 */
const LADO_VIEWBOX = 24;

/**
 * Mitad del `stroke-width` por default (2). El trazo se pinta centrado en el path, así que se
 * come esta distancia hacia afuera — es lo que hay que descontar del lienzo para que no lo corten.
 */
const MARGEN_TRAZO = 1;

function extremos(d: string): { min: number; max: number } {
  const n = d.match(/-?\d+(\.\d+)?/g);
  if (!n) return { min: 0, max: 0 };
  let min = Infinity;
  let max = -Infinity;
  for (const v of n) {
    const x = Number(v);
    if (x < min) min = x;
    if (x > max) max = x;
  }
  return { min, max };
}

/**
 * Hasta dónde se puede extrapolar sin que la figura se salga del lienzo.
 *
 * El sobrepaso extrapola la similaridad, así que rebotar = seguir creciendo. Pasado cierto punto
 * la pose desborda el viewBox y el SVG la recorta — se vería un icono mordido, no un rebote. Este
 * tope se BUSCA por bisección sobre la geometría real del par, porque depende del par: `bell` crece
 * hacia afuera y desborda pronto; un par que encoge aguantaría mucho más.
 */
function limiteSeguro(
  plan: MorphPlan,
  out: Float64Array[],
  cerrados: boolean[],
  lado: number,
  tMaximo: number,
): number {
  const cabe = (t: number): boolean => {
    interpPolar(plan, t, out);
    const { min, max } = extremos(serialize(out, cerrados));
    // El margen NO es una tolerancia generosa: es el grosor del trazo. Un `stroke-width` de 2
    // (el default) se pinta centrado en el path, así que sobresale 1 unidad hacia afuera. Un path
    // en x=24 con ese trazo llega hasta 25 y el viewBox lo recorta. Por eso el límite útil es
    // [1, lado-1], no [0, lado] — medirlo contra la caja completa dejaba pasar poses que SÍ se
    // recortaban (visto: pico en [-0.31, 24.31] aprobado por una tolerancia de ±0.5).
    return min >= MARGEN_TRAZO && max <= lado - MARGEN_TRAZO;
  };
  if (cabe(tMaximo)) return tMaximo;

  let seguro = 1;
  let excesivo = tMaximo;
  for (let i = 0; i < 12; i++) {
    const medio = (seguro + excesivo) / 2;
    if (cabe(medio)) seguro = medio;
    else excesivo = medio;
  }
  return seguro;
}

function offsetPara(objetivo: number, tiempos: number[], progreso: number[]): number {
  const total = tiempos[tiempos.length - 1];
  if (objetivo <= 0) return 0;
  // Sin atajo para objetivo >= 1: con sobrepaso, el resorte CRUZA el destino mucho antes del
  // final, y devolver 1 de un saque ponía el último keyframe del tramo principal al final del
  // reloj — dejando los offsets del rebote por detrás, en desorden. WAAPI exige offsets no
  // decrecientes. Con `smooth` no cambia nada: nunca llega a 1 exacto (máximo 0.999), así que
  // igual cae en el `return 1` de abajo.
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
  const pasos = Math.max(2, Math.floor(opts.steps ?? opts.pasos ?? STEPS_DEFAULT));
  const resolucion = Math.max(8, Math.floor(opts.resolution ?? opts.resolucion ?? RESOLUTION_DEFAULT));
  const a: Sampled[] = resampleIcon(origen, resolucion);
  const b: Sampled[] = resampleIcon(destino, resolucion);
  const plan = buildPlan(a, b);
  const out = allocOutputs(plan);
  const cerrados = a.map((s) => s.closed);

  const { tiempos, progreso } = curvaDelSpring(
    opts.spring ?? 'smooth',
    normalizarCola(opts.tail ?? opts.cola ?? SPRING_TAIL_DEFAULT),
  );

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

  /*
   * SOBREPASO: las poses más allá del destino, cuando el resorte rebota.
   *
   * Se AÑADEN al final en vez de reemplazar el muestreo de [0,1], y eso es a propósito: con
   * `smooth` (ζ≈1, sin rebote) no entra ni una pose nueva, así que el comportamiento por default
   * queda byte por byte igual que antes. El rebote solo existe si la física lo produce.
   *
   * Los offsets salen del reloj REAL del resorte (`tiempos[i]/total`), no de un reparto inventado:
   * el rebote ocupa exactamente el tramo de tiempo en que la física estuvo del otro lado del 1.
   */
  const xMaximo = Math.max(...progreso);
  if ((opts.overshoot ?? opts.sobrepaso ?? true) && xMaximo > 1.001) {
    const tope = limiteSeguro(plan, out, cerrados, LADO_VIEWBOX, xMaximo);
    const totalTiempo = tiempos[tiempos.length - 1];
    const primerCruce = progreso.findIndex((x) => x >= 1);

    if (primerCruce > 0 && tope > 1.001) {
      // Una muestra por cada `salto` de progreso recorrido, para que el rebote tenga la MISMA
      // densidad espacial que el tramo principal en vez de un puñado de poses sueltas.
      const salto = 1 / (pasos - 1);
      let ultimoTomado = 1;
      for (let i = primerCruce; i < progreso.length; i++) {
        const x = Math.min(progreso[i], tope);
        if (Math.abs(x - ultimoTomado) < salto) continue;
        interpPolar(plan, x, out);
        poses.push(`path("${serialize(out, cerrados)}")`);
        offsetsDeTramo.push(tiempos[i] / totalTiempo);
        ultimoTomado = x;
      }
      // El destino exacto cierra la secuencia: el rebote termina AHÍ, no en la última muestra que
      // haya caído. Sin esto la figura se queda con el residuo del último punto medido.
      interpPolar(plan, 1, out);
      poses.push(`path("${serialize(out, cerrados)}")`);
      offsetsDeTramo.push(1);
    }
  }

  const duracionDeTramo = tiempos[tiempos.length - 1] * 1000;
  const keyframes: Keyframe[] = [];

  // `poses.length`, NO `pasos`: con sobrepaso el tramo trae poses de más (el rebote). Iterar
  // sobre `pasos` las dejaba calculadas y fuera del arreglo final, en silencio.
  const total = poses.length;

  if (opts.roundTrip ?? opts.idaYVuelta) {
    // Tramo de ida en la primera mitad del reloj…
    for (let i = 0; i < total; i++) {
      keyframes.push({ d: poses[i], offset: offsetsDeTramo[i] / 2 });
    }
    // …y de vuelta en la segunda, con SU PROPIA curva de resorte, no la de ida en espejo. Se
    // arranca en i=1 para no repetir la pose del centro (el destino), que ya quedó en offset 0.5.
    for (let i = 1; i < total; i++) {
      keyframes.push({ d: poses[total - 1 - i], offset: 0.5 + offsetsDeTramo[i] / 2 });
    }
  } else {
    for (let i = 0; i < total; i++) {
      keyframes.push({ d: poses[i], offset: offsetsDeTramo[i] });
    }
  }

  const bytes = new TextEncoder().encode(JSON.stringify(keyframes)).length;
  const duracion = (opts.roundTrip ?? opts.idaYVuelta) ? duracionDeTramo * 2 : duracionDeTramo;
  return {
    keyframes,
    duration: duracion,
    // El alias de la v1 se rellena con el mismo número. Sale en la próxima major.
    duracion,
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

interface MorphEnCurso {
  marca: object;
  animation: Animation;
}

/**
 * Quién es dueño de cada elemento, y con qué animación. Cubre dos cosas que un `.catch()` no:
 *
 * 1. Si el morph viejo alcanza a TERMINAR bien justo cuando arranca uno nuevo, su `finished`
 *    resuelve (no rechaza) y escribiría el `d` del destino VIEJO sobre un elemento que ya está a
 *    media transición nueva. La marca lo frena.
 * 2. Al interrumpir, hay que soltar la animación vieja — y se hace por aquí, con la referencia que
 *    este mismo mapa guarda, no con una cancelación paralela que pueda desincronizarse.
 *
 * `WeakMap` para no retener elementos removidos del DOM.
 */
const duenoDelElemento = new WeakMap<Element, MorphEnCurso>();

/**
 * La pose que el elemento muestra AHORA, ya interpolada por el navegador.
 *
 * Se lee del estilo computado porque ahí vive el valor animado; el atributo `d` sigue teniendo la
 * pose vieja. Hay que leerla ANTES de cancelar la animación: al cancelar, el valor animado
 * desaparece y el computado cae de vuelta al atributo. Mismo orden que el aterrizaje, misma razón.
 */
function poseActual(el: SVGPathElement): string | null {
  if (typeof getComputedStyle !== 'function') return null;
  const d = getComputedStyle(el).d;
  if (!d || d === 'none') return null;
  const m = /^path\(["']?(.*?)["']?\)$/.exec(d.trim());
  return m?.[1] ? m[1] : null;
}

export interface RunMorphOpts extends MorphKeyframesOpts {
  fill?: FillMode;
  /** Repite indefinidamente, ida y vuelta. Modo comparador; ver la nota de `direction`. */
  loop?: boolean;
  iterations?: number;
  direction?: PlaybackDirection;
  /**
   * Multiplicador de la duración final (el `durationScale` global de `provideGfIcons`). Se aplica
   * al reloj y NADA más: los offsets son fracciones normalizadas de la duración, así que la forma
   * del resorte se conserva intacta — solo se estira o encoge el tiempo.
   */
  durationScale?: number;
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
  /*
   * INTERRUPCIÓN: si este elemento ya venía morpheando, el punto de partida NO es el icono que nos
   * pasaron — es la forma a medio camino que se está viendo. Arrancar desde el icono completo
   * significa tragarse de golpe todo lo que faltaba: medido, 3.72 unidades sobre un lienzo de 24,
   * el 15% en un frame.
   *
   * El core lo soporta de fábrica: `buildPlan` acepta formas intermedias, e `IconInput` acepta un
   * `d` suelto, así que la pose actual vuelve a entrar sin maquinaria nueva.
   */
  const enCurso = duenoDelElemento.get(el);
  let origenEfectivo = origen;
  if (enCurso) {
    const pose = poseActual(el); // leer PRIMERO…
    if (pose) origenEfectivo = pose;
    enCurso.animation.cancel(); // …y recién entonces soltar la vieja
  }

  const medidas = morphKeyframes(origenEfectivo, destino, opts);
  const animation = el.animate(medidas.keyframes, {
    duration: medidas.duration * (opts.durationScale ?? 1),
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
  duenoDelElemento.set(el, { marca, animation });

  /**
   * Dónde aterriza esto, que NO siempre es el destino:
   * - `idaYVuelta` termina donde empezó, en el origen.
   * - reproducido en reversa (`reverse()` al soltar el hover) también termina en el origen —
   *   `finished` resuelve igual, así que sin mirar `playbackRate` se escribiría el destino sobre
   *   una figura que quedó en la pose de origen.
   *
   * "Origen" aquí es el EFECTIVO, no el que nos pasaron: si esto nació de una interrupción, la
   * animación vuelve a la pose intermedia de la que arrancó, no al icono completo del llamador.
   * Escribir ese icono sería reintroducir el salto justo al final.
   */
  const poseFinal = (): string => {
    if ((opts.roundTrip ?? opts.idaYVuelta) || animation.playbackRate < 0) return canonicalD(origenEfectivo);
    return opts.dFinal ?? canonicalD(destino);
  };

  animation.finished
    .then(() => {
      // Otro morph tomó el elemento mientras este terminaba: no es nuestro, no se escribe. Pero sí
      // se cancela lo propio — con `fill: forwards` esta animación seguiría viva en el stack,
      // tapada por la nueva y sin dueño, y `getAnimations()` la arrastraría para siempre.
      if (duenoDelElemento.get(el)?.marca !== marca) {
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
