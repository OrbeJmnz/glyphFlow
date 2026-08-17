// Regenera el lock de geometría de los curados (`curated-choreography.lock.json`).
//
// Correrlo es un ACTO DELIBERADO, igual que `generate:icons`: el lock existe para que actualizar
// la geometría de un icono curado NO pase en silencio por debajo de una coreografía ya escrita.
// Cuando el barrido truena, primero se revisa que los índices de los tracks sigan apuntando a la
// figura que la coreografía asume — y HASTA ENTONCES se corre esto. Al revés, el lock no sirve de
// nada. Ver la cicatriz de `calendar-clock` en curated-icons.spec.ts.
//
// Por eso IMPRIME EL DIFF ANTES DE ESCRIBIR, figura por figura y marcando cuáles están animadas:
// un lock que se regenera en silencio convierte cualquier regresión en "el nuevo estado correcto"
// con solo aprobar el PR, que es exactamente el fallo que este mecanismo debía cerrar.
//
//   npm run curated:lock              # muestra el diff y escribe
//   npm run curated:lock -- --dry-run # solo muestra el diff, no toca el archivo
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const lucideVersion = require('lucide-static/package.json').version;

// Import dinámico de los .ts vía tsx (este script se corre con `npx tsx`).
const { CURATED_ICONS } = await import('../projects/glyphflow/src/lib/icon/curated-icons.ts');
const { shapesFingerprint, variantesPorFigura } = await import(
  '../projects/glyphflow/src/lib/icon/curated-audit.ts'
);

const dryRun = process.argv.includes('--dry-run');
const OUT = new URL('../projects/glyphflow/src/lib/icon/curated-choreography.lock.json', import.meta.url);

const icons = {};
for (const name of Object.keys(CURATED_ICONS).sort()) {
  icons[name] = shapesFingerprint(CURATED_ICONS[name].shapes);
}

// ── Diff contra el lock que ya está en disco ──────────────────────────────────────────────────
const previo = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')).icons : null;
const lineas = [];

if (!previo) {
  lineas.push(`  (no había lock previo — se anclan ${Object.keys(icons).length} iconos de cero)`);
} else {
  for (const name of Object.keys(icons)) {
    if (!previo[name]) lineas.push(`+ ${name} — curado nuevo, ${icons[name].length} figuras`);
  }
  for (const name of Object.keys(previo)) {
    if (!icons[name]) lineas.push(`- ${name} — ya no es curado`);
  }
  for (const [name, actual] of Object.entries(icons)) {
    const antes = previo[name];
    if (!antes) continue;
    const animadas = variantesPorFigura(CURATED_ICONS[name]);

    if (antes.length !== actual.length) {
      const idx = [...animadas.keys()].sort((a, b) => a - b);
      lineas.push(
        `~ ${name} — ${antes.length} → ${actual.length} figuras. LOS ÍNDICES SE RECORREN: revisa ` +
          `TODA la coreografía (anima ${idx.join(', ') || 'ninguna'})`,
      );
      continue;
    }
    const movidas = actual
      .map((f, i) => [i, f])
      .filter(([i, f]) => antes[i] !== f);
    if (!movidas.length) continue;

    lineas.push(`~ ${name}`);
    for (const [i, f] of movidas) {
      const quien = animadas.get(i);
      const tag = CURATED_ICONS[name].shapes[i].tag;
      lineas.push(
        `    figura ${i} (${tag}): ${antes[i]} → ${f}` +
          (quien ? `   ⚠ LA ANIMA: ${quien.join(', ')}` : '   (no la anima nadie)'),
      );
    }
  }
}

console.log(`\n=== curated:lock — qué cambia respecto al lock en disco ===`);
console.log(lineas.length ? lineas.join('\n') : '  sin cambios: el lock ya refleja la geometría actual');
console.log(
  '\nUn `⚠ LA ANIMA` significa que hay una coreografía apoyada en esa figura: confirma que su\n' +
    'track sigue apuntando a lo que asume ANTES de aprobar este cambio.\n',
);

if (dryRun) {
  console.log('--dry-run: no se escribió nada.');
  process.exit(0);
}

const lock = {
  note: 'GENERADO por `npm run curated:lock`. Huella de la geometría contra la que se escribió cada coreografía curada. Si el barrido truena, revisa los índices ANTES de regenerar.',
  lucide: lucideVersion,
  icons,
};

writeFileSync(OUT, JSON.stringify(lock, null, 2) + '\n');
console.log(`lock actualizado: ${Object.keys(icons).length} iconos curados (lucide-static ${lucideVersion})`);
