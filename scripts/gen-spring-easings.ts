// Genera spring-easings.ts: integra un resorte real y lo emite como easing `linear()` de CSS.
//
// Por qué existe este script y no unos números escritos a mano: WAAPI no tiene físicas de
// resorte, pero `linear()` de CSS acepta puntos de control FUERA de [0,1] — y WAAPI extrapola el
// keyframe de destino cuando el easing rebasa 1. O sea que un resorte con rebote cabe en UNA
// cadena de texto, sin un keyframe por frame. Lo que no cabe es acertarle a mano a la curva de un
// oscilador amortiguado.
//
// Reglas duras (mismo criterio que scripts/generate-lucide-icons.ts):
// - Solo escribe en spring-easings.ts. NUNCA toca choreography.ts ni curated-icons.ts.
// - Los { k, c } NO se re-declaran aquí: se leen del catálogo vendorizado de morphicons
//   (morph/src/core/spring.ts). Si upstream afina un preset, esto lo hereda al regenerar.
// - El integrador es el MISMO que usa la capa de morph (Euler semi-implícito, h = 1/240). Dos
//   integradores distintos darían dos físicas distintas en la misma librería.
//
// Uso:
//   npm run gen:springs              # regenera el archivo
//   npm run gen:springs -- --check   # CI/verify: falla si el archivo no refleja la integración
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SPRING_PRESETS } from '../projects/glyphflow/morph/src/core/spring.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(
  __dirname, '..', 'projects', 'glyphflow', 'src', 'lib', 'icon', 'spring-easings.ts',
);

/** Paso de integración. Idéntico al de morph/src/core/spring.ts — no es un parámetro a afinar. */
const H = 1 / 240;
/** Puntos de control del `linear()`. 24 tramos ≈ 17-38 ms cada uno: por debajo se ve facetado. */
const PUNTOS = 24;
/** Tope de seguridad. Un resorte que no asienta en 5 s está mal configurado. */
const MAX_S = 5;

/**
 * Integra ẍ = k(1−x) − c·ẋ desde x=0 hasta que el resorte asienta.
 *
 * El criterio de asentamiento incluye VELOCIDAD, no solo posición: un resorte subamortiguado
 * cruza |1−x| < 0.001 a media carrera (justo al pasar por el destino rumbo al sobrepaso) y con
 * solo el criterio de posición se cortaría el rebote a sí mismo. Es la misma cicatriz que ya
 * está documentada en `cola` dentro de morph-keyframes.ts.
 */
function integrar(k: number, c: number): { xs: number[]; ms: number } {
  let x = 0;
  let v = 0;
  let t = 0;
  const xs = [0];
  while (t < MAX_S) {
    const a = k * (1 - x) - c * v;
    v += a * H;
    x += v * H;
    t += H;
    xs.push(x);
    if (Math.abs(1 - x) < 0.001 && Math.abs(v) < 0.02) break;
  }
  return { xs, ms: Math.round(t * 1000) };
}

/** Remuestrea la curva a N+1 puntos uniformes en el tiempo → `linear()` con stops implícitos. */
function springEasing(k: number, c: number): { easing: string; ms: number; pico: number } {
  const { xs, ms } = integrar(k, c);
  const pts = Array.from({ length: PUNTOS + 1 }, (_, i) =>
    +xs[Math.min(xs.length - 1, Math.round((i / PUNTOS) * (xs.length - 1)))].toFixed(4),
  );
  // Extremos exactos: el resorte arranca en reposo y aterriza EN el destino. Sin esto, el
  // último punto queda en 0.9995 y la figura se estaciona a un pelo de donde debía.
  pts[0] = 0;
  pts[PUNTOS] = 1;
  return { easing: `linear(${pts.join(', ')})`, ms, pico: Math.max(...pts) };
}

/** ζ = c / (2√k). < 1 subamortiguado (rebota), = 1 crítico, > 1 sobreamortiguado. */
const zeta = (k: number, c: number) => c / (2 * Math.sqrt(k));

const CARACTER: Record<keyof typeof SPRING_PRESETS, string> = {
  smooth: 'crítico, sin rebote. El reemplazo directo de un expo-out.',
  snappy: 'rápido, sobrepaso sutil. El default de la casa.',
  bouncy: 'juguetón, sobrepaso franco. Solo para lo que celebra algo.',
};

const bloques = Object.entries(SPRING_PRESETS).map(([nombre, { k, c }]) => {
  const { easing, ms, pico } = springEasing(k, c);
  const z = zeta(k, c);
  const sobrepaso = pico > 1.001 ? `sobrepaso ${pico}` : 'sin sobrepaso';
  return `/**
 * ζ = ${z.toFixed(2)} — ${CARACTER[nombre as keyof typeof SPRING_PRESETS]}
 *
 * k = ${k}, c = ${c} · duración natural ${ms} ms · ${sobrepaso}
 */
export const SPRING_${nombre.toUpperCase()} =
  '${easing}';`;
});

const contenido = `// AUTO-GENERADO por scripts/gen-spring-easings.ts desde los presets de
// morph/src/core/spring.ts (morphicons v1.7.0, MIT).
// NO EDITAR A MANO — un PR aquí se pierde en el siguiente \`npm run gen:springs\`. Los valores
// salen de integrar el resorte, no de afinar dígitos: para cambiar la sensación se cambian los
// { k, c } del preset, no esta cadena.
//
// LOS VALORES > 1 NO SON UN ERROR DE REDONDEO. Son el sobrepaso, y son la razón de ser del
// preset: \`linear()\` de CSS admite puntos de control fuera de [0,1] y WAAPI extrapola el keyframe
// de destino cuando el easing los rebasa. Ahí vive el rebote que un \`cubic-bezier\` no puede dar.
//
// DOS CUIDADOS AL APLICARLOS:
//
// 1. \`opacity\` está sujeta a [0,1] por spec — un easing con sobrepaso sobre opacity se aplana
//    solo, SIN AVISAR. El sobrepaso solo se ve en \`transform\` y en propiedades numéricas sin
//    rango (\`stroke-dashoffset\`, \`stroke-width\`).
// 2. Un preset con sobrepaso encima de keyframes que YA oscilan a mano (la campana:
//    \`rotateSeq([0, 20, -10, 10, -5, 3, 0])\`) oscila doble y se ve mal. Ahí los keyframes ya SON
//    el resorte y lo correcto sigue siendo \`EASE\`. Estos presets son para ir de A a B.
//
// La duración natural de cada preset es informativa: aplicar el easing con otra duración estira o
// encoge el reloj sin deformar la curva, así que el CARÁCTER (la ζ) se conserva. Es justo la
// ventaja de resolver el resorte en el dominio del tiempo y no en el del valor.

${bloques.join('\n\n')}
`;

const esCheck = process.argv.includes('--check');

if (esCheck) {
  let actual = '';
  try {
    actual = readFileSync(OUT_FILE, 'utf8');
  } catch {
    console.error(`✗ ${OUT_FILE} no existe. Corre \`npm run gen:springs\`.`);
    process.exit(1);
  }
  if (actual !== contenido) {
    console.error(
      '✗ spring-easings.ts no refleja la integración actual del resorte.\n' +
        '  Alguien editó el archivo a mano o cambiaron los { k, c } del preset vendorizado.\n' +
        '  Corre `npm run gen:springs` y commitea el resultado.',
    );
    process.exit(1);
  }
  console.log('✓ spring-easings.ts está al día con los presets vendorizados.');
} else {
  writeFileSync(OUT_FILE, contenido, 'utf8');
  console.log(`✓ ${Object.keys(SPRING_PRESETS).length} easings escritos en spring-easings.ts:`);
  for (const [nombre, { k, c }] of Object.entries(SPRING_PRESETS)) {
    const { ms, pico } = springEasing(k, c);
    const marca = pico > 1.001 ? `pico ${pico}` : 'sin sobrepaso';
    console.log(`  - SPRING_${nombre.toUpperCase().padEnd(6)} ζ=${zeta(k, c).toFixed(2)}  ${String(ms).padStart(4)} ms  ${marca}`);
  }
}
