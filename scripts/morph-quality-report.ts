// Calibra los umbrales de "correspondencia mala" del morph (residuo de Procrustes + fragmentación
// de subpaths) contra el catálogo real, en vez de inventar números.
//
// Por qué existe: el picker del lab admite que "combinaciones arbitrarias entre iconos muy
// distintos pueden verse mal — es un límite real de la interpolación de formas". Hasta ahora eso
// era una advertencia sin número detrás. `buildPlan` ya calcula el residuo de Procrustes de cada
// par (gratis, ver `MorphPlan.quality`); este script lo mide contra el catálogo completo para
// encontrar un umbral que separe "se ve bien" de "no hay correspondencia buena que encontrar".
//
// Recorrer los 1767² pares (~3.1M) no aporta más señal que un muestreo dirigido + uno aleatorio, y
// sería impracticable en CI. En cambio:
//   1. Un set fijo de iconos de referencia, topológicamente diversos, contra el catálogo completo.
//   2. Una muestra aleatoria de pares arbitrarios, para no sesgar por el set de referencia.
//   3. Los 4 pares del benchmark (deben quedar BAJOS) contra una lista curada a mano de pares
//      deliberadamente incompatibles (deben quedar ALTOS) — la separación entre esos dos grupos es
//      lo que calibra el umbral.
//
// Uso:
//   tsx scripts/morph-quality-report.ts            # imprime percentiles y sugiere un umbral
//   tsx scripts/morph-quality-report.ts --check     # falla si benchmark y "feos" se mezclan
//
// `--check` NO valida todavía QUALITY_RESIDUAL_MAX/QUALITY_FRAGMENTATION_MAX de
// `morph-keyframes.ts` (esos se fijan a mano en el commit de diseño, leyendo este reporte) — valida
// que SEPARAR sea posible, es decir, que el peor de los 4 pares validados siga por debajo del mejor
// (más bajo) de la lista de pares feos. Si eso deja de cumplirse, la métrica dejó de servir para lo
// que se diseñó.

import { ANIMATED_ICONS } from '../projects/glyphflow/src/lib/icon/animated-icons.registry.ts';
import { buildPlan } from '../projects/glyphflow/morph/src/core/plan.ts';
import { resampleIcon } from '../projects/glyphflow/morph/src/core/resample.ts';
import type { AnimatedIconDef } from '../projects/glyphflow/src/lib/icon/animated-icon.model.ts';
import type { IconInput, Sampled } from '../projects/glyphflow/morph/src/core/types.ts';

function aIconInput(def: AnimatedIconDef): IconInput {
  return def.shapes.map(({ tag, ...a }) => [tag, a]) as IconInput;
}

const NOMBRES = Object.keys(ANIMATED_ICONS).sort();
const cacheResample = new Map<string, Sampled[]>();
function resampleCached(nombre: string): Sampled[] {
  let s = cacheResample.get(nombre);
  if (!s) {
    s = resampleIcon(aIconInput(ANIMATED_ICONS[nombre]));
    cacheResample.set(nombre, s);
  }
  return s;
}

interface Medida {
  par: string;
  residual: number;
  fragmentation: number;
}

function medir(a: string, b: string): Medida {
  const plan = buildPlan(resampleCached(a), resampleCached(b));
  return { par: `${a}→${b}`, residual: plan.quality.residual, fragmentation: plan.quality.fragmentation };
}

// --- 1. Los 4 pares del benchmark (deben quedar bajos) ---
const BENCHMARK: [string, string][] = [
  ['bell', 'bell-ring'],
  ['heart', 'star'],
  ['circle', 'square'],
  ['user', 'user-round'],
];

// --- 2. Pares deliberadamente incompatibles (deben quedar altos) ---
// Curados a mano por topología: blob cerrado contra racimo de subpaths sueltos, trazo abierto
// contra figura sólida, etc. — punto de partida a refinar mirando el resultado en el picker
// (ver Parte E del plan), no un oráculo cerrado.
const INCOMPATIBLES: [string, string][] = [
  ['circle', 'grip'],
  ['square', 'dice-6'],
  ['slash', 'asterisk'],
  ['qr-code', 'circle'],
  ['atom', 'minus'],
  ['plus', 'dice-5'],
];

// --- 3. Set de referencia, topológicamente diverso ---
const REFERENCIA = ['circle', 'grip', 'star', 'square', 'slash', 'dice-6', 'plus', 'atom'].filter(
  (n) => ANIMATED_ICONS[n],
);

function percentiles(vals: number[]): Record<string, number> {
  const s = [...vals].sort((a, b) => a - b);
  const p = (q: number) => s[Math.min(s.length - 1, Math.floor(q * s.length))];
  return { p50: p(0.5), p90: p(0.9), p99: p(0.99), max: s[s.length - 1] };
}

function fmt(v: number): string {
  return v.toFixed(4);
}

const check = process.argv.includes('--check');

console.log(`morph-quality-report — ${NOMBRES.length} iconos en el catálogo\n`);

// Barrido de referencia × catálogo completo.
const residualesRef: number[] = [];
const fragmentacionesRef: number[] = [];
for (const ref of REFERENCIA) {
  for (const nombre of NOMBRES) {
    if (nombre === ref) continue;
    const m = medir(ref, nombre);
    residualesRef.push(m.residual);
    fragmentacionesRef.push(m.fragmentation);
  }
}
console.log(`Barrido de referencia (${REFERENCIA.length} iconos × catálogo, ${residualesRef.length} pares):`);
console.log(`  residual:      ${JSON.stringify(percentiles(residualesRef))}`);
console.log(`  fragmentation: ${JSON.stringify(percentiles(fragmentacionesRef))}\n`);

// Muestra aleatoria de pares arbitrarios.
const MUESTRA_ALEATORIA = 5000;
const residualesRand: number[] = [];
const fragmentacionesRand: number[] = [];
for (let i = 0; i < MUESTRA_ALEATORIA; i++) {
  const a = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  let b = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  if (a === b) continue;
  const m = medir(a, b);
  residualesRand.push(m.residual);
  fragmentacionesRand.push(m.fragmentation);
}
console.log(`Muestra aleatoria (${residualesRand.length} pares):`);
console.log(`  residual:      ${JSON.stringify(percentiles(residualesRand))}`);
console.log(`  fragmentation: ${JSON.stringify(percentiles(fragmentacionesRand))}\n`);

// Los extremos que calibran el umbral.
const medidasBenchmark = BENCHMARK.map(([a, b]) => medir(a, b));
const medidasFeas = INCOMPATIBLES.map(([a, b]) => medir(a, b));

console.log('Pares del benchmark (deben quedar bajos):');
for (const m of medidasBenchmark) console.log(`  ${m.par}: residual=${fmt(m.residual)} fragmentation=${fmt(m.fragmentation)}`);
console.log('\nPares deliberadamente incompatibles (deben quedar altos):');
for (const m of medidasFeas) console.log(`  ${m.par}: residual=${fmt(m.residual)} fragmentation=${fmt(m.fragmentation)}`);

const peorBenchmarkRes = Math.max(...medidasBenchmark.map((m) => m.residual));
const mejorFeaRes = Math.min(...medidasFeas.map((m) => m.residual));
const peorBenchmarkFrag = Math.max(...medidasBenchmark.map((m) => m.fragmentation));
const mejorFeaFrag = Math.min(...medidasFeas.map((m) => m.fragmentation));

console.log(
  `\nSeparación en residual: benchmark peor=${fmt(peorBenchmarkRes)} vs feos mejor=${fmt(mejorFeaRes)}` +
    (peorBenchmarkRes < mejorFeaRes ? ' ✓ separable' : ' ✗ SE MEZCLAN'),
);
console.log(
  `Separación en fragmentation: benchmark peor=${fmt(peorBenchmarkFrag)} vs feos mejor=${fmt(mejorFeaFrag)}` +
    (peorBenchmarkFrag < mejorFeaFrag ? ' ✓ separable' : ' ✗ SE MEZCLAN'),
);

if (peorBenchmarkRes < mejorFeaRes) {
  console.log(`\nUmbral sugerido para QUALITY_RESIDUAL_MAX: ${fmt((peorBenchmarkRes + mejorFeaRes) / 2)}`);
}
if (peorBenchmarkFrag < mejorFeaFrag) {
  console.log(`Umbral sugerido para QUALITY_FRAGMENTATION_MAX: ${fmt((peorBenchmarkFrag + mejorFeaFrag) / 2)}`);
}

if (check) {
  const separaResidual = peorBenchmarkRes < mejorFeaRes;
  const separaFragmentacion = peorBenchmarkFrag < mejorFeaFrag;
  if (!separaResidual && !separaFragmentacion) {
    console.error(
      '\n✗ morph-quality-report:check — ni el residuo ni la fragmentación separan los pares ' +
        'validados de los deliberadamente incompatibles. La métrica no sirve para el gate tal como ' +
        'está, o la lista de pares feos necesita revisión.',
    );
    process.exit(1);
  }
  console.log('\nmorph-quality-report:check OK — hay al menos una métrica que separa los dos grupos.');
}
