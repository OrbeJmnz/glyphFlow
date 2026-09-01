/*
 * Motion Inspector como check de CI.
 *
 * El brief define el inspector como «un linter determinista de motion» y le da una segunda vida:
 * la misma pieza corriendo sobre el catálogo canónico en cada PR que lo toca. Hasta ahora existía
 * solo como panel del sitio, o sea como autoevaluación de quien pasa por ahí.
 *
 * **Una sola implementación, dos consumidores.** El análisis NO se copia aquí: se importa el mismo
 * `analizarIcono` que pinta el panel. Ya era una función pura sin Angular —lo dice su propio
 * docblock— así que no hubo nada que extraer. Vive en el playground y este script lo alcanza por
 * ruta relativa, como ya hacen `bundle-size-check`, `gen-examples`, `gen-sitemap` y
 * `snippets-check`. Copiarlo aquí habría creado dos linters que divergen en silencio, que es
 * exactamente lo que el criterio de aceptación prohíbe.
 *
 * Lee el catálogo del FUENTE y no de `dist/`, igual que `snippets-check`: corre sin depender de un
 * build previo y, sobre todo, mira lo que trae el PR. Un `dist/` de antes revisaría el catálogo
 * anterior al cambio, que es justo lo que un check de PR no debe hacer.
 */
import { CURATED_ICONS } from '../projects/glyphflow/src/lib/icon/curated-icons';
import type { AnimatedIconDef } from '../projects/glyphflow/src/lib/icon/animated-icon.model';
import {
  analizarIcono,
  type VariantReport,
} from '../projects/playground/src/app/features/iconos/motion-inspector';

type Nivel = 'error' | 'aviso';

interface Hallazgo {
  icono: string;
  variante: string;
  regla: string;
  nivel: Nivel;
  detalle: string;
}

/*
 * Los umbrales salen de MEDIR el catálogo entero antes de fijarlos, no de números redondos: con
 * 911 iconos y 2236 variantes, `duracion-larga` marca 53 (2.4 %) y `rotacion-alta` marca 2. Un
 * umbral por debajo del catálogo real convierte el check en ruido que todo el mundo aprende a
 * ignorar, y entonces deja de proteger nada.
 */
const DURACION_LARGA_MS = 1200;

/*
 * Un BUCLE lento no es un GESTO lento, y hasta ahora la regla no los distinguia: marcaba 134
 * variantes, entre ellas el `idle` de un gato y la deriva de una nube, que son lentos porque
 * ese es el punto. El ruido tapaba lo que si importaba -- 65 `default`, o sea el gesto de
 * hover, con mediana 1500 ms y maxima 3000. Quien pasa el puntero ya se fue.
 *
 * Se exime lo ciclico por definicion, de dos formas distintas a proposito:
 *
 *   · Por NOMBRE de variante: `idle` y `wander` son ambiente por lo que significan. Es una
 *     regla, no una lista, asi que cubre sola cualquier icono que las gane manana.
 *   · Por NOMBRE de icono: hay `default` que son ciclicos aunque la variante no lo diga. Un
 *     `orbit` da una vuelta entera, un `radar` barre, una `rocking-chair` se mece, las nubes
 *     van a la deriva. Eso no se deduce del nombre de la variante y va en lista, mirado uno
 *     por uno (2026-09-01) -- como los `hold` sutiles a proposito.
 *
 * Lo que NO se exime, aunque tambien pase de 1200: `pulse` y `reveal`. Son candidatos reales
 * a una pasada futura y la regla debe seguir apuntandolos.
 */
const VARIANTES_AMBIENTE = new Set(['idle', 'wander']);
const ICONOS_AMBIENTE = new Set([
  'orbit', 'tornado', 'radar', 'loader', 'rocking-chair', 'ship', 'sun', 'settings',
  'cloud', 'cloud-alert', 'cloud-backup', 'cloud-check', 'cloud-drizzle', 'cloud-fog',
  'cloud-hail', 'cloud-lightning', 'cloud-moon', 'cloud-moon-rain', 'cloud-rain',
  'cloud-rain-wind', 'cloud-snow', 'cloud-sun', 'cloud-sun-rain', 'cloud-sync',
]);
const ROTACION_ALTA_DEG = 720;

/*
 * Un `hold` retiene su ultimo keyframe (`fill: 'forwards'`), asi que esa pose ES la variante: es
 * lo unico que el usuario ve mientras deja el puntero encima. Si apenas se distingue del reposo,
 * la variante existe en el catalogo y no existe en pantalla.
 *
 * Umbral MEDIDO, como los de arriba: hoy el catalogo tiene 496 `hold` y el mas flojo esta en 0.60
 * unidades, asi que 0.8 marca 7 -- los que no pueden crecer mas sin salirse del lienzo y necesitan
 * otro gesto, no uno mas grande. No bloquea nada de lo que ya existe.
 *
 * La regla es nueva porque el defecto era masivo y no lo veia nadie: antes de la tanda que la
 * introdujo, 258 de los 496 quedaban por debajo de 1.2 -- `scale(1.04)`, `rotate(3deg)`,
 * `translateY(-0.5px)`. Se ven en el codigo; no se ven en el icono.
 */
const POSE_HOLD_MINIMA = 0.8;

/*
 * Sutiles A PROPOSITO. Al revisar la tanda que introdujo la regla (2026-09-01), Orbe amplifico
 * 219 `hold` y devolvio estos diez a su magnitud original: en un coche que se asienta o una
 * tortuga que apenas asoma, lo discreto ES el gesto.
 *
 * Van en una lista y no en un umbral mas bajo porque el numero no puede distinguirlos: `gem`
 * retiene 0.40 y `turtle` 0.50, justo en la banda donde vivia el defecto (`scale(1.04)` son
 * 0.32; `rotate(3deg)`, 0.42). Bajar el corte hasta dejarlos pasar apagaria la regla entera.
 * Una lista dice la verdad -- "esto se miro y se decidio" -- en vez de fingir que lo decide la
 * aritmetica. Si alguno vuelve a tocarse, sacarlo de aqui y volver a mirarlo.
 */
const SUTILES_A_PROPOSITO = new Set([
  'barrel', 'car', 'car-front', 'caravan', 'cuboid', 'gem', 'spool', 'turtle', 'van', 'wand',
]);

/*
 * Lo que este linter NO revisa, y por qué — para que nadie lo vuelva a agregar:
 *
 * `tracksSolapados`. El inspector reporta cualquier par de tracks cuyos intervalos se cruzan,
 * incluidos los de figuras DISTINTAS. Dos figuras animando a la vez es coreografía normal, no un
 * defecto: medido, 772 de las 2236 variantes lo hacen (35 %). Como dato del panel sirve —dice qué
 * corre a la vez—; como regla de CI sería ruido puro.
 */
function revisar(icono: string, v: VariantReport): Hallazgo[] {
  const hallazgos: Hallazgo[] = [];

  /*
   * La ÚNICA regla que rompe el build, y se puede permitir porque está medida: hoy el catálogo
   * tiene CERO variantes que animen `d` fuera de `autoDraw`. O sea no bloquea nada de lo que ya
   * existe — es una guarda contra la regresión, no una deuda que alguien tenga que pagar.
   *
   * Animar `d` redibuja el path en cada cuadro; `transform`/`opacity` las mueve el compositor sin
   * repintar. Es la señal de costo que el brief nombra por su nombre.
   *
   * `autoDraw` queda fuera: ahí lo que se anima es `stroke-dashoffset`, y el trazo progresivo no
   * tiene equivalente barato — es la técnica, no un descuido.
   */
  if (v.animaD && !v.autoDraw) {
    hallazgos.push({
      icono,
      variante: v.variante,
      regla: 'anima-d',
      nivel: 'error',
      detalle: `anima \`d\` (${v.propiedadesAnimadas.join(', ')}) — usa transform/opacity`,
    });
  }

  const esAmbiente =
    VARIANTES_AMBIENTE.has(v.variante) ||
    (v.variante === 'default' && ICONOS_AMBIENTE.has(icono));
  if (!esAmbiente && v.duracionMs !== null && v.duracionMs > DURACION_LARGA_MS) {
    hallazgos.push({
      icono,
      variante: v.variante,
      regla: 'duracion-larga',
      nivel: 'aviso',
      detalle: `${v.duracionMs} ms (tope ${DURACION_LARGA_MS})`,
    });
  }

  /*
   * Solo se mide en las variantes que RETIENEN. En una que vuelve al reposo la pose final es ~0
   * por definicion, y marcarla seria marcar el 80 % del catalogo por hacer bien su trabajo.
   */
  if (
    v.reverseOnLeave &&
    !v.autoDraw &&
    !SUTILES_A_PROPOSITO.has(icono) &&
    v.poseFinalUnidades < POSE_HOLD_MINIMA
  ) {
    hallazgos.push({
      icono,
      variante: v.variante,
      regla: 'pose-imperceptible',
      nivel: 'aviso',
      detalle: `retiene una pose de ${v.poseFinalUnidades} unidades (minimo ${POSE_HOLD_MINIMA}) — no se distingue del reposo`,
    });
  }

  if (v.rotacionMaximaDeg > ROTACION_ALTA_DEG) {
    hallazgos.push({
      icono,
      variante: v.variante,
      regla: 'rotacion-alta',
      nivel: 'aviso',
      detalle: `${v.rotacionMaximaDeg}° (tope ${ROTACION_ALTA_DEG}°)`,
    });
  }

  return hallazgos;
}

const entradas = Object.entries(CURATED_ICONS as Record<string, AnimatedIconDef>);
const informes = entradas.map(([nombre, def]) => analizarIcono(nombre, def));
const variantes = informes.reduce((n, r) => n + r.variantes.length, 0);
const hallazgos = informes.flatMap((r) => r.variantes.flatMap((v) => revisar(r.icono, v)));

console.log(`motion-lint — ${entradas.length} iconos curados, ${variantes} variantes analizadas`);

const errores = hallazgos.filter((h) => h.nivel === 'error');
const avisos = hallazgos.filter((h) => h.nivel === 'aviso');

/*
 * Agrupado por regla y con tope por grupo. Una lista plana de cientos de líneas es indistinguible
 * de un fallo de infraestructura: nadie la lee, y el check deja de servir para lo que existe.
 */
const TOPE = 12;
function imprimir(titulo: string, lista: Hallazgo[]): void {
  if (!lista.length) return;
  const porRegla = new Map<string, Hallazgo[]>();
  for (const h of lista) porRegla.set(h.regla, [...(porRegla.get(h.regla) ?? []), h]);

  for (const [regla, hs] of [...porRegla].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n── ${titulo}: ${regla} · ${hs.length}`);
    for (const h of hs.slice(0, TOPE)) console.log(`   ${h.icono}/${h.variante}: ${h.detalle}`);
    if (hs.length > TOPE) console.log(`   … y ${hs.length - TOPE} más`);
  }
}

imprimir('ERROR', errores);
imprimir('aviso', avisos);

if (!hallazgos.length) console.log('Sin hallazgos.');

/*
 * Los avisos NO rompen el PR: miden COSTO, no correctitud, y una coreografía cara puede ser la
 * decisión correcta para un icono concreto. Un check que rompe por una valoración de gusto se
 * desactiva en una semana. Los errores sí, y hoy son cero.
 */
console.log(`\n${errores.length} errores · ${avisos.length} avisos`);
if (errores.length) process.exit(1);
