// Verifica las versiones "componente completo" de los snippets del sitio.
//
// El criterio de aceptación de T20 es literal: «compila pegada tal cual en un proyecto Angular
// limpio con la librería instalada». Un snippet que se publica como copiable y no compila es peor
// que no ofrecerlo: quien lo pega pierde el tiempo culpando a la librería.
//
// **Lo que esto SÍ prueba**: que el TypeScript parsea, y que cada símbolo importado de `glyphflow`
// o `glyphflow/morph` existe de verdad en el paquete PUBLICADO. Esto último es la mitad que
// importa — es exactamente la clase de error que dejó al README en español enseñando
// `MaxIconComponent` durante un major entero.
//
// **Lo que NO prueba**: los tipos. No hay type-check completo aquí; para eso haría falta compilar
// contra Angular en un proyecto de verdad. Se dice en la salida en vez de dejar creer lo contrario.
import { transformSync } from 'esbuild';
import { readFileSync } from 'node:fs';
import * as patrones from '../projects/playground/src/app/features/patrones/snippets.ts';

/** Los símbolos que el paquete publicado exporta de verdad, leídos de sus tipos. */
function exportados(dts: string): Set<string> {
  const bloque = readFileSync(new URL(dts, import.meta.url), 'utf8').match(/export \{([^}]*)\}/g);
  if (!bloque) throw new Error(`No encontré la lista de exports en ${dts}`);
  const nombres = bloque
    .join(' ')
    .replace(/export \{|\}/g, '')
    .split(',')
    .map((n) =>
      n
        .trim()
        .split(/\s+as\s+/)
        .pop()!
        .trim(),
    )
    .filter(Boolean);
  return new Set(nombres);
}

const API = {
  glyphflow: exportados('../node_modules/glyphflow-published/types/glyphflow.d.ts'),
  'glyphflow/morph': exportados('../node_modules/glyphflow-published/types/glyphflow-morph.d.ts'),
};

let fallos = 0;
const completos = Object.entries(patrones).filter(([k]) => k.endsWith('_COMPLETO'));

for (const [nombre, codigo] of completos) {
  // 1. ¿Parsea? `transformSync` con loader ts hace el análisis sintáctico real.
  try {
    transformSync(codigo as string, { loader: 'ts' });
  } catch (e) {
    console.error(`  ✗ ${nombre}: no parsea como TypeScript.\n    ${(e as Error).message}`);
    fallos++;
    continue;
  }

  // 2. ¿Cada símbolo importado del paquete existe en el paquete?
  for (const m of (codigo as string).matchAll(
    /import \{([^}]*)\} from '(glyphflow(?:\/morph)?)'/g,
  )) {
    const entrada = m[2] as keyof typeof API;
    for (const simbolo of m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)) {
      if (!API[entrada].has(simbolo)) {
        console.error(`  ✗ ${nombre}: importa '${simbolo}' de '${entrada}', que NO lo exporta.`);
        fallos++;
      }
    }
  }

  // 3. Todo componente usado en la plantilla tiene que estar en `imports:`.
  const usados = new Set(
    [...(codigo as string).matchAll(/<(gf-icon(?:-morph)?)[\s/>]/g)].map((m) => m[1]),
  );
  const declarados = (codigo as string).match(/imports: \[([^\]]*)\]/)?.[1] ?? '';
  const clase = { 'gf-icon': 'GfIconComponent', 'gf-icon-morph': 'GfIconMorphComponent' };
  for (const etiqueta of usados) {
    const necesaria = clase[etiqueta as keyof typeof clase];
    if (!declarados.includes(necesaria)) {
      console.error(`  ✗ ${nombre}: usa <${etiqueta}> pero no declara ${necesaria} en imports.`);
      fallos++;
    }
  }
}

if (fallos > 0) {
  console.error(`\nsnippets-check FALLÓ — ${fallos} problema(s) en los snippets copiables.`);
  process.exit(1);
}
console.log(
  `snippets-check OK — ${completos.length} snippets completos parsean y solo importan símbolos que el ` +
    `paquete publicado exporta.\n  (No es un type-check: comprueba sintaxis, imports y componentes declarados.)`,
);
