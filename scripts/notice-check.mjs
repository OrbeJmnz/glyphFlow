// Verifica que NOTICE liste las atribuciones esperadas. Solo Lucide es obligatorio hoy (es lo
// único ya vendorizado); morphicons/bezier-js se vuelven obligatorios cuando v2/v4 los vendoricen.
import { readFileSync } from 'node:fs';

const notice = readFileSync(new URL('../NOTICE', import.meta.url), 'utf8');
const required = ['Lucide', 'ISC'];
const missing = required.filter((s) => !notice.includes(s));

if (missing.length > 0) {
  console.error(`NOTICE no menciona: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('notice-check OK.');
