// Reporte de comparación fuente (lucide-static) vs. generado (ANIMATED_ICONS) — de solo lectura,
// no escribe nada. Ver "Estrategia de actualización de Lucide" en el plan del proyecto.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const iconNodes = require('lucide-static/icon-nodes.json');
const lucideVersion = require('lucide-static/package.json').version;

// Import dinámico de los .ts vía tsx (este script se corre con `npx tsx`).
const { CURATED_ICONS } = await import('../projects/glyphflow/src/lib/icon/curated-icons.ts');
const { GENERATED_ICONS } = await import('../projects/glyphflow/src/lib/icon/generated-icons.ts');

const lucideNames = new Set(Object.keys(iconNodes));
const curatedNames = new Set(Object.keys(CURATED_ICONS));
const generatedNames = new Set(Object.keys(GENERATED_ICONS));
const catalogNames = new Set([...curatedNames, ...generatedNames]);

const missing = [...lucideNames].filter((n) => !catalogNames.has(n));
const extra = [...catalogNames].filter((n) => !lucideNames.has(n));

console.log(`lucide-static instalado: v${lucideVersion}`);
console.log(`Lucide (canónico): ${lucideNames.size}`);
console.log(`Catálogo (curado ${curatedNames.size} + generado ${generatedNames.size}): ${catalogNames.size}`);
console.log('');
console.log(`MISSING (en Lucide, no en el catálogo): ${missing.length}`);
if (missing.length) console.log('  ' + missing.join(', '));
console.log(`EXTRA (en el catálogo, no en Lucide actual): ${extra.length}`);
if (extra.length) console.log('  ' + extra.join(', '));

// CHANGED: de los curados que SÍ tienen nombre vigente en Lucide, ¿la geometría actual coincide
// con lo que quedó hand-copiado en curated-icons.ts? Nunca se autocorrige — solo se marca.
//
// Los valores se comparan NUMÉRICAMENTE cuando ambos lados son números: Lucide escribe `.5` donde
// el curado tiene `0.5`, y el path `d` trae espaciado/notación distinta sin cambiar un solo punto.
// Compararlos como strings marcaba `key-round` como "geometría cambiada" cuando el dibujo es
// idéntico — un falso positivo que hace ruido justo donde se necesita señal.
function normalizeValue(v) {
  const s = String(v);
  const n = Number(s);
  return Number.isNaN(n) ? s.replace(/\s+/g, ' ').trim() : String(n);
}

function normalizeShape(tag, attrs) {
  const norm = Object.fromEntries(
    Object.entries(attrs)
      .map(([k, v]) => [k, normalizeValue(v)])
      .sort(([a], [b]) => a.localeCompare(b)),
  );
  return JSON.stringify([tag, norm]);
}

const changed = [];
for (const name of curatedNames) {
  if (!lucideNames.has(name)) continue; // de los 5 "missing" del lado curado, no hay con qué comparar
  const currentNodes = iconNodes[name];
  const curatedShapes = CURATED_ICONS[name].shapes;
  if (currentNodes.length !== curatedShapes.length) {
    changed.push(`${name}: Lucide tiene ${currentNodes.length} figuras, curado tiene ${curatedShapes.length}`);
    continue;
  }
  for (let i = 0; i < currentNodes.length; i++) {
    const [curTag, curAttrs] = currentNodes[i];
    const own = curatedShapes[i];
    const ownAttrs = Object.fromEntries(
      Object.entries(own).filter(([k]) => k !== 'tag' && own[k] !== undefined).map(([k, v]) => [k, String(v)]),
    );
    if (normalizeShape(curTag, curAttrs) !== normalizeShape(own.tag, ownAttrs)) {
      changed.push(`${name}[${i}]: geometría distinta entre Lucide actual y curated-icons.ts`);
      break;
    }
  }
}
console.log(`\nCHANGED (curado con geometría distinta a Lucide actual — revisar a mano, NO se toca): ${changed.length}`);
if (changed.length) console.log('  ' + changed.join('\n  '));

// Los curados que NO tienen nombre vigente en Lucide — o son renombres viejos (ver ICON_ALIASES)
// o Lucide dejó de tenerlos con ese nombre exacto.
const curatedNotInLucide = [...curatedNames].filter((n) => !lucideNames.has(n));
console.log(`\nCurados sin nombre vigente directo en Lucide: ${curatedNotInLucide.length}`);
if (curatedNotInLucide.length) console.log('  ' + curatedNotInLucide.join(', '));
