// Genera generated-icons.ts a partir de lucide-static (icon-nodes.json).
//
// Versión fijada en package.json: "lucide-static": "1.31.0" (exacta, sin ^) — publicada
// 2026-08-09, la última estable al escribir esto. Se fija exacta (no rango) porque el set de
// iconos/paths de Lucide cambia entre versiones (nuevos iconos, paths retocados, renombres) y
// queremos que regenerar el catálogo sea un acto deliberado (bump manual + revisión), nunca un
// `npm install` cualquiera trayendo geometría distinta sin que nadie se entere. Ver NOTICE.
//
// Reglas duras (ver CONTRIBUTING.md y el plan del proyecto):
// - Solo escribe en generated-icons.ts. NUNCA modifica curated-icons.ts.
// - SÍ importa `CURATED_ICONS` de curated-icons.ts, pero únicamente para leer sus NOMBRES (Object.
//   keys) y no generar un export duplicado — dos módulos no pueden exportar el mismo identificador
//   (`bellIcon` en ambos archivos sería un error de compilación). Nunca lee ni usa su coreografía.
//   Esto es el generador (herramienta de build, no corre en el bundle publicado) leyendo el
//   catálogo curado para no chocar con él — no es generated-icons.ts (el ARCHIVO de salida)
//   importando de curated-icons.ts en tiempo de ejecución, eso sigue sin pasar nunca.
// - Cada icono queda como variante `draw` únicamente (geométrica, sin criterio) — ver "Alcance de
//   la animación automática vs. curada" en el plan: coreografía con intención nunca se genera en
//   lote.
//
// Uso:
//   tsx scripts/generate-lucide-icons.ts                  # el set completo (1587 no curados)
//   tsx scripts/generate-lucide-icons.ts --only=bell,dot   # solo esos nombres (lote canario)
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import iconNodesJson from 'lucide-static/icon-nodes.json' with { type: 'json' };
import tagsJson from 'lucide-static/tags.json' with { type: 'json' };
import lucidePkg from 'lucide-static/package.json' with { type: 'json' };
import { CURATED_ICONS } from '../projects/glyphflow/src/lib/icon/curated-icons.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICON_DIR = join(__dirname, '..', 'projects', 'glyphflow', 'src', 'lib', 'icon');
const OUT_FILE = join(ICON_DIR, 'generated-icons.ts');
/**
 * Los tags cubren el catálogo COMPLETO (curados + generados), así que no caben en
 * `generated-icons.ts`, que por definición solo tiene los generados. Archivo aparte, y exportado
 * aparte: quien solo quiera buscar por sinónimo no debería arrastrar la geometría de los 1767.
 */
const TAGS_FILE = join(ICON_DIR, 'icon-tags.ts');

/** Leída del paquete, no escrita a mano: una cabecera que miente sobre su fuente es peor que ninguna. */
const LUCIDE_VERSION = (lucidePkg as { version: string }).version;

// Atributos que en el SVG/JSON de Lucide vienen como string pero IconShape los tipa `number`
// (confirmado contra los datos curados existentes: `{ tag: 'circle', cx: 12, cy: 12, r: 10 }`, no
// strings). `d` y `points` sí son texto de verdad, se dejan tal cual.
const NUMERIC_ATTRS = new Set([
  'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'rx', 'ry', 'x1', 'y1', 'x2', 'y2',
]);

function toConstBase(key: string): string {
  return key.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

// Mismo set de 7 tags que soporta IconShape (confirmado contra el escaneo real del set completo,
// ver docs/lucide-shape-distribution.md) y los atributos que cada uno necesita para pintarse. La
// spec de Vitest tenía este mismo mapa SIN `ellipse` — validaba cero atributos para ese tag desde
// que se agregó. Corregido aquí y también en la spec.
const REQUIRED_ATTRS: Record<string, string[]> = {
  path: ['d'],
  circle: ['cx', 'cy', 'r'],
  rect: ['x', 'y', 'width', 'height'],
  line: ['x1', 'y1', 'x2', 'y2'],
  ellipse: ['cx', 'cy', 'rx', 'ry'],
  polyline: ['points'],
  polygon: ['points'],
};

function validateNode(iconName: string, tag: string, attrs: Record<string, string>): string[] {
  const errors: string[] = [];
  const required = REQUIRED_ATTRS[tag];
  if (!required) {
    errors.push(`${iconName}: tag desconocido "${tag}" — IconShape no lo soporta.`);
    return errors;
  }
  for (const attr of required) {
    if (!(attr in attrs)) errors.push(`${iconName} (${tag}): le falta el atributo "${attr}".`);
  }
  return errors;
}

function shapeLiteral(tag: string, attrs: Record<string, string>): string {
  const parts = [`tag: '${tag}'`];
  for (const [k, v] of Object.entries(attrs)) {
    parts.push(NUMERIC_ATTRS.has(k) ? `${k}: ${Number(v)}` : `${k}: ${JSON.stringify(v)}`);
  }
  return `{ ${parts.join(', ')} }`;
}

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const onlyNames = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',')) : null;

const curatedKeys = new Set(Object.keys(CURATED_ICONS));
const iconNodes = iconNodesJson as Record<string, [string, Record<string, string>][]>;
const tags = tagsJson as Record<string, string[]>;

const skippedCurated: string[] = [];
const entries: { name: string; constName: string; shapesLiteral: string }[] = [];
const validationErrors: string[] = [];

for (const [name, nodes] of Object.entries(iconNodes)) {
  if (onlyNames && !onlyNames.has(name)) continue;
  if (curatedKeys.has(name)) {
    skippedCurated.push(name);
    continue;
  }
  if (nodes.length === 0) {
    validationErrors.push(`${name}: no tiene ninguna figura (array vacío).`);
    continue;
  }
  for (const [tag, attrs] of nodes) validationErrors.push(...validateNode(name, tag, attrs));

  const constName = toConstBase(name) + 'Icon';
  const shapesLiteral = nodes.map(([tag, attrs]) => shapeLiteral(tag, attrs)).join(',\n    ');
  entries.push({ name, constName, shapesLiteral });
}

/*
 * Los tags se validan contra el catálogo COMPLETO y no contra `entries`, a propósito: `entries` es
 * solo lo generado, y con `--only=` es además un subconjunto. Aquí se pregunta lo único que
 * importa — que ningún icono publicable se quede sin tags — para que `icon-tags.ts` no pueda
 * quedar parcial por construcción.
 *
 * Medido el 2026-08-23 contra lucide-static 1.31.0: 1767 = 1767, cero huecos en ambos sentidos.
 * Por eso `IconMeta.tags` va REQUERIDO y no opcional. Si Lucide algún día publica un icono sin
 * tags, esto truena aquí y la decisión se retoma a mano, en vez de colar un `[]` silencioso.
 */
const catalogo = [...new Set([...Object.keys(iconNodes), ...curatedKeys])].sort();
for (const name of catalogo) {
  if (!tags[name]?.length) validationErrors.push(`${name}: no tiene tags en tags.json.`);
}

// Un solo icono inválido aborta TODO el generado — nunca se escribe un generated-icons.ts a
// medias ni con datos rotos, ni se avisa solo por consola y se sigue de largo.
if (validationErrors.length > 0) {
  console.error(`✗ ${validationErrors.length} error(es) de validación — no se escribió nada:\n`);
  for (const err of validationErrors) console.error(`  - ${err}`);
  process.exit(1);
}

const individualExports = entries.map(
  ({ constName, shapesLiteral }) =>
    `export const ${constName}: AnimatedIconDef = /* @__PURE__ */ icon(\n  [\n    ${shapesLiteral},\n  ],\n  {},\n);`,
);

const composedEntries = entries
  .map(({ name, constName }) => {
    const keyText = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `'${name}'`;
    return `  ${keyText}: ${constName},`;
  })
  .join('\n');

/**
 * El import de `icon` solo se pone si queda algún icono que generar. Desde que el catálogo se curó
 * ENTERO este archivo se escribe vacío, y un import sin usar rompe el lint —que solo se ve en
 * `verify:clean`, así que el fallo aparecía a cinco minutos de distancia de su causa—.
 *
 * `AnimatedIconDef` se queda siempre: lo usa el tipo del registro, aunque el registro esté vacío.
 */
const header = `// AUTO-GENERADO por scripts/generate-lucide-icons.ts desde lucide-static@${LUCIDE_VERSION}.
// NO EDITAR A MANO — un PR aquí se pierde en el siguiente \`npm run generate:icons\`. Si un icono
// de este archivo necesita coreografía con intención, muévelo a curated-icons.ts (ver
// CONTRIBUTING.md) — este archivo es solo geometría + draw automático.
import { AnimatedIconDef } from './animated-icon.model';
${entries.length ? "import { icon } from './choreography';\n" : ''}
`;

const composed = `export const GENERATED_ICONS: Record<string, AnimatedIconDef> = {
${composedEntries}
};
`;

const output = header + individualExports.join('\n\n') + '\n\n' + composed;
writeFileSync(OUT_FILE, output, 'utf8');

const tagsHeader = `// AUTO-GENERADO por scripts/generate-lucide-icons.ts desde lucide-static@${LUCIDE_VERSION}.
// NO EDITAR A MANO — un PR aquí se pierde en el siguiente \`npm run generate:icons\`.
//
// Los sinónimos con los que Lucide indexa cada icono: \`trash-2\` trae \`delete\`, que es justo lo
// que alguien teclea cuando no se sabe el nombre. Va en su propio módulo, y no dentro del registro,
// para que buscar por sinónimo no obligue a bajar la geometría de los 1767.

`;

/**
 * Comillas simples, como el resto del generado — pero escapando de verdad. `bachlor's` y
 * `master's` están en tags.json, y una interpolación ingenua parte el literal a la mitad: el
 * archivo se escribe igual y truena después, en el `tsc` del build, a 180 KB de distancia de su
 * causa. El backslash va PRIMERO: al revés, el escape del apóstrofo se volvería a escapar.
 *
 * Hoy no hay ningún backslash en el dato; se escapa igual porque el costo es una línea y el
 * síntoma de que Lucide agregue uno sería exactamente el mismo desconcierto.
 */
function comillar(texto: string): string {
  return `'${texto.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

const tagsEntries = catalogo
  .map((name) => {
    const keyText = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `'${name}'`;
    return `  ${keyText}: [${tags[name].map(comillar).join(', ')}],`;
  })
  .join('\n');

writeFileSync(
  TAGS_FILE,
  `${tagsHeader}export const ICON_TAGS: Record<string, readonly string[]> = {\n${tagsEntries}\n};\n`,
  'utf8',
);

console.log(`Generados: ${entries.length} iconos.`);
console.log(`Omitidos por ya estar curados: ${skippedCurated.length}${skippedCurated.length ? ` (${skippedCurated.join(', ')})` : ''}`);
