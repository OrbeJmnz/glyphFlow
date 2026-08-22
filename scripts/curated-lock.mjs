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
//   npm run curated:lock:check        # CI: no escribe y SALE EN ERROR si hay drift
//
// El barrido (`curated-icons.spec.ts`) ya truena ante el mismo drift, pero con la huella cruda:
// `--check` existe para que el job de CI escupa el diff anotado — qué figura se movió y qué
// coreografía se apoya en ella — sin que nadie tenga que clonar el repo para averiguarlo.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const lucideVersion = require('lucide-static/package.json').version;

// Import dinámico de los .ts vía tsx (este script se corre con `npx tsx`).
const { CURATED_ICONS } = await import('../projects/glyphflow/src/lib/icon/curated-icons.ts');
const { shapesFingerprint, variantesPorFigura, choreographyFingerprint } = await import(
  '../projects/glyphflow/src/lib/icon/curated-audit.ts'
);

const check = process.argv.includes('--check');
const dryRun = process.argv.includes('--dry-run') || check;
const OUT = new URL('../projects/glyphflow/src/lib/icon/curated-choreography.lock.json', import.meta.url);

const icons = {};
const choreography = {};
for (const name of Object.keys(CURATED_ICONS).sort()) {
  icons[name] = shapesFingerprint(CURATED_ICONS[name].shapes);
  choreography[name] = choreographyFingerprint(CURATED_ICONS[name]);
}

// ── Diff contra el lock que ya está en disco ──────────────────────────────────────────────────
const enDisco = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : null;
const previo = enDisco ? enDisco.icons : null;
// `?? null` y no `?? {}`: un lock viejo sin el bloque de coreografía es "todavía no anclada", que se
// reporta como alta de cero. Un `{}` lo leería como "todos los iconos perdieron su coreografía".
const previoChor = enDisco ? (enDisco.choreography ?? null) : null;
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

// ── Diff de la COREOGRAFÍA ────────────────────────────────────────────────────────────────────
// Va aparte del de geometría a propósito: son dos preguntas distintas. Aquélla es "cambió el
// dibujo"; ésta es "cambió el movimiento". Un refactor que solo mueve código de archivo debe dejar
// las dos quietas — si ésta se mueve, algo se reasignó o se perdió en el camino.
const lineasChor = [];
if (!previoChor) {
  lineasChor.push(
    `  (el lock previo no anclaba coreografía — se anclan ${Object.keys(choreography).length} iconos de cero)`,
  );
} else {
  for (const name of Object.keys(choreography)) {
    if (!previoChor[name]) lineasChor.push(`+ ${name} — curado nuevo, sin coreografía previa`);
  }
  for (const name of Object.keys(previoChor)) {
    if (!choreography[name]) lineasChor.push(`- ${name} — ya no es curado`);
  }
  for (const [name, actual] of Object.entries(choreography)) {
    const antes = previoChor[name];
    if (!antes) continue;
    const cambios = [];
    for (const variante of Object.keys(actual)) {
      if (!antes[variante]) cambios.push(`    + variante '${variante}' nueva`);
      else if (antes[variante] !== actual[variante])
        cambios.push(`    ~ variante '${variante}': ${antes[variante]} → ${actual[variante]}`);
    }
    for (const variante of Object.keys(antes)) {
      if (!actual[variante]) cambios.push(`    - variante '${variante}' DESAPARECIÓ`);
    }
    if (cambios.length) lineasChor.push(`~ ${name}`, ...cambios);
  }
}

console.log(`\n=== curated:lock — qué cambia respecto al lock en disco ===`);
console.log('\n-- GEOMETRÍA (el dibujo) --');
console.log(lineas.length ? lineas.join('\n') : '  sin cambios: el lock ya refleja la geometría actual');
console.log(
  '\nUn `⚠ LA ANIMA` significa que hay una coreografía apoyada en esa figura: confirma que su\n' +
    'track sigue apuntando a lo que asume ANTES de aprobar este cambio.',
);
console.log('\n-- COREOGRAFÍA (el movimiento) --');
console.log(
  lineasChor.length ? lineasChor.join('\n') : '  sin cambios: el lock ya refleja la coreografía actual',
);
console.log(
  '\nSi esperabas mover SOLO código de sitio (partir el archivo, mover figuras a otro módulo) y\n' +
    'aquí aparece algo, el refactor no fue neutro: una coreografía se reasignó o se perdió.\n',
);

if (check) {
  if (!previo) {
    console.error('curated:lock --check: no hay lock en disco. Corre `npm run curated:lock`.');
    process.exit(1);
  }
  if (!previoChor) {
    console.error(
      'curated:lock --check: el lock en disco no ancla la coreografía todavía. Corre\n' +
        '`npm run curated:lock` y commitea el lock actualizado.',
    );
    process.exit(1);
  }
  if (lineas.length) {
    console.error(
      'curated:lock --check: el lock commiteado NO refleja la geometría de curated-icons.ts.\n' +
        'El diff de arriba es la lista completa de lo que cambió. Revisa cada `⚠ LA ANIMA` — su\n' +
        'coreografía puede haber quedado apuntando a otra figura — y recién entonces corre\n' +
        '`npm run curated:lock` y commitea el lock en el mismo PR.',
    );
    process.exit(1);
  }
  if (lineasChor.length) {
    console.error(
      'curated:lock --check: el lock commiteado NO refleja la coreografía de curated-icons.ts.\n' +
        'Si el cambio fue A PROPÓSITO (retocaste un timing, agregaste una variante), corre\n' +
        '`npm run curated:lock` y commitea el lock en el mismo PR. Si esperabas que el cambio\n' +
        'fuera solo estructural, esto es la alarma: algo se reasignó o se perdió.',
    );
    process.exit(1);
  }
  console.log('curated:lock --check: sin drift.');
  process.exit(0);
}

if (dryRun) {
  console.log('--dry-run: no se escribió nada.');
  process.exit(0);
}

const lock = {
  note: 'GENERADO por `npm run curated:lock`. `icons` huella la GEOMETRÍA contra la que se escribió cada coreografía; `choreography` huella el MOVIMIENTO mismo, una entrada por variante. Si el barrido truena, revisa los índices ANTES de regenerar.',
  lucide: lucideVersion,
  icons,
  choreography,
};

writeFileSync(OUT, JSON.stringify(lock, null, 2) + '\n');
console.log(`lock actualizado: ${Object.keys(icons).length} iconos curados (lucide-static ${lucideVersion})`);
