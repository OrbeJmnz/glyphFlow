// Verifica que NOTICE liste las atribuciones esperadas. Solo Lucide es obligatorio hoy (es lo
// único ya vendorizado); morphicons/bezier-js se vuelven obligatorios cuando v2/v4 los vendoricen.
import { readFileSync } from 'node:fs';

const notice = readFileSync(new URL('../NOTICE', import.meta.url), 'utf8');
const required = ['Lucide', 'ISC', 'morphicons', 'MIT'];
const missing = required.filter((s) => !notice.includes(s));

if (missing.length > 0) {
  console.error(`NOTICE no menciona: ${missing.join(', ')}`);
  process.exit(1);
}

// El aviso de permiso COMPLETO de morphicons vive en su propio archivo, porque MIT exige que
// viaje con cualquier porción sustancial — y 47KB de core matemático lo es. Que el NOTICE lo
// mencione no basta: el archivo tiene que existir y llegar al tarball (ver sync-package-files).
const licenciaMorphicons = readFileSync(new URL('../LICENSE-morphicons', import.meta.url), 'utf8');
for (const frase of ['MIT License', 'Copyright (c)', 'WITHOUT WARRANTY OF ANY KIND']) {
  if (!licenciaMorphicons.includes(frase)) {
    console.error(`LICENSE-morphicons incompleto: falta "${frase}"`);
    process.exit(1);
  }
}
console.log('notice-check OK.');
