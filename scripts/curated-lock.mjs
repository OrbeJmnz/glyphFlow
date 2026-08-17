// Regenera el lock de geometría de los curados (`curated-choreography.lock.json`).
//
// Correrlo es un ACTO DELIBERADO, igual que `generate:icons`: el lock existe para que actualizar
// la geometría de un icono curado NO pase en silencio por debajo de una coreografía ya escrita.
// Cuando el barrido truena, primero se revisa que los índices de los tracks sigan apuntando a la
// figura que la coreografía asume — y HASTA ENTONCES se corre esto. Al revés, el lock no sirve de
// nada. Ver la cicatriz de `calendar-clock` en curated-icons.spec.ts.
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const lucideVersion = require('lucide-static/package.json').version;

// Import dinámico de los .ts vía tsx (este script se corre con `npx tsx`).
const { CURATED_ICONS } = await import('../projects/glyphflow/src/lib/icon/curated-icons.ts');
const { shapesFingerprint } = await import('../projects/glyphflow/src/lib/icon/shape-fingerprint.ts');

const OUT = new URL('../projects/glyphflow/src/lib/icon/curated-choreography.lock.json', import.meta.url);

const icons = {};
for (const name of Object.keys(CURATED_ICONS).sort()) {
  icons[name] = shapesFingerprint(CURATED_ICONS[name].shapes);
}

const lock = {
  note: 'GENERADO por `npm run curated:lock`. Huella de la geometría contra la que se escribió cada coreografía curada. Si el barrido truena, revisa los índices ANTES de regenerar.',
  lucide: lucideVersion,
  icons,
};

writeFileSync(OUT, JSON.stringify(lock, null, 2) + '\n');
console.log(`lock actualizado: ${Object.keys(icons).length} iconos curados (lucide-static ${lucideVersion})`);
