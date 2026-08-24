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

// --- 4. Nada de español dentro del código que se publica ---
//
// Los snippets se copian y además se generan como proyectos reales en `examples/`, o sea son
// superficie pública. Un comentario en español ahí es el mismo bug que dejó al README en español
// enseñando la API de la v1 y al `og:title` anunciando en inglés una página en español: la frontera
// que fijó T19 es que lo que sale al público va en inglés, y el código lo es.
//
// Se revisa el VALOR del snippet, no el archivo: la documentación de `snippets.ts` sobre sí mismo
// sigue en español, como todo el código interno del repo.
for (const [nombre, codigo] of Object.entries(patrones)) {
  const acentos = (codigo as string).match(/[áéíóúñÁÉÍÓÚÑ¿¡]/g);
  if (acentos) {
    console.error(
      `  ✗ ${nombre}: contiene español (${[...new Set(acentos)].join('')}). Los snippets se copian ` +
        `y se publican en examples/ — van en inglés.`,
    );
    fallos++;
  }
}

// --- 5. Ningún snippet enseña un `trigger` que no existe ---
//
// El del acordeón enseñaba `trigger="none"`, que NO es un valor válido — el mismo que no compiló
// al escribir el demo. Se coló porque ese snippet no tiene versión completa, así que nada lo
// type-chequeaba: los checks de arriba solo miran los `_COMPLETO`.
//
// Los válidos se leen del paquete PUBLICADO, no de una lista escrita aquí: una copia a mano se
// queda atrás en cuanto la librería agregue o quite uno, y entonces el check aprobaría lo que ya
// no funciona.
const TRIGGERS = new Set(
  (
    readFileSync(
      new URL('../node_modules/glyphflow-published/types/glyphflow.d.ts', import.meta.url),
      'utf8',
    ).match(/AnimatedIconTrigger = ([^;]*)/)?.[1] ?? ''
  )
    .split('|')
    .map((t) => t.trim().replace(/'/g, ''))
    .filter(Boolean),
);

for (const [nombre, codigo] of Object.entries(patrones)) {
  for (const m of (codigo as string).matchAll(/trigger="([^"]*)"/g)) {
    if (!TRIGGERS.has(m[1])) {
      console.error(
        `  ✗ ${nombre}: enseña trigger="${m[1]}", que no existe. Válidos: ${[...TRIGGERS].join(', ')}`,
      );
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
