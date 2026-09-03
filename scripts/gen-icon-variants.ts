// Genera icon-variants.ts a partir del registro YA COMPUESTO (curado + generado).
//
// Por qué es un script aparte de generate-lucide-icons.ts: ICON_TAGS sale de lucide-static (fuente
// externa, versionada, solo cambia en un bump deliberado). Las variantes salen de la coreografía
// escrita A MANO en curated-icons.ts, que cambia en cada PR que toca un icono — atarlo al ciclo de
// `generate:icons` lo dejaría desfasado en silencio justo el mismo día que alguien agrega una
// variante nueva. Por eso corre solo, con su propio `--check` colgado de verify:clean.
//
// Uso:
//   tsx scripts/gen-icon-variants.ts            # escribe el archivo
//   tsx scripts/gen-icon-variants.ts --check     # falla si lo escrito no coincide (CI)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ANIMATED_ICONS } from '../projects/glyphflow/src/lib/icon/animated-icons.registry.ts';
import { sinCr } from './sin-cr.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'projects', 'glyphflow', 'src', 'lib', 'icon', 'icon-variants.ts');

const header = `// AUTO-GENERADO por scripts/gen-icon-variants.ts — NO EDITAR A MANO, se pierde en el siguiente
// \`npm run gen:variants\`. Fuente: Object.keys(animations) del registro compuesto (curado +
// generado), no de lucide-static — regenerar tras cualquier cambio de coreografía en
// curated-icons.ts, no solo tras un bump de Lucide.
//
// Las variantes de animación que trae cada icono, sin arrastrar su geometría: quien solo necesita
// saber QUÉ hay para elegir no debería pagar el catálogo completo por preguntarlo.

`;

/** Mismas comillas simples que el resto del generado, mismo escape real (ver generate-lucide-icons.ts). */
function comillar(texto: string): string {
  return `'${texto.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/** Orden estable: el `--check` compara texto, y un orden que cambia entre corridas rompería el
 * check por nada. */
const nombres = Object.keys(ANIMATED_ICONS).sort();

const entries = nombres
  .map((name) => {
    const keyText = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `'${name}'`;
    const variantes = Object.keys(ANIMATED_ICONS[name].animations);
    return `  ${keyText}: [${variantes.map(comillar).join(', ')}],`;
  })
  .join('\n');

const contenido = `${header}export const ICON_VARIANTS: Record<string, readonly string[]> = {\n${entries}\n};\n`;

const check = process.argv.includes('--check');
if (check) {
  let actual: string;
  try {
    actual = sinCr(readFileSync(OUT, 'utf8'));
  } catch {
    console.error(`✗ falta ${OUT}. Corre \`npm run gen:variants\` y commitea el resultado.`);
    process.exit(1);
  }
  if (actual !== sinCr(contenido)) {
    console.error(
      `✗ icon-variants.ts no refleja las variantes actuales del registro.\n` +
        `  Corre \`npm run gen:variants\` y commitea el resultado.`,
    );
    process.exit(1);
  }
  console.log(`gen:variants:check OK — ${nombres.length} iconos.`);
} else {
  writeFileSync(OUT, contenido, 'utf8');
  console.log(`gen:variants: ${nombres.length} iconos, ${Math.round(contenido.length / 1024)} KB en ${OUT}.`);
}
