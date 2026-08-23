// Vigila los dos README, que son la puerta de entrada del repo público y hasta hoy no los miraba
// NADIE. Los dos bugs que esto viene a impedir ya ocurrieron, el mismo día:
//
//   1. `README.es.md` enseñó `MaxIconComponent`, `<max-icon>` y `provideMaxIcons` durante TODA la
//      v2. El inglés se migró con el major y el español no. 17 ocurrencias contra 0.
//   2. La tabla de bundle presumía cifras "medidas en CI" que el CI no producía desde que el
//      catálogo pasó de 180 a 911 curados. (Esa mitad la vigila `bundle-size-check.ts`, que es
//      quien mide: ahí quien afirma es quien midió.)
//
// Ninguno tronó nada. El síntoma de los dos es gente aprendiendo algo que ya no es cierto.
import { readFileSync } from 'node:fs';

const leer = (archivo: string) => readFileSync(new URL(`../${archivo}`, import.meta.url), 'utf8');

/**
 * Los símbolos de API que aparecen en un README. Se comparan como INVENTARIO —qué símbolos y
 * cuántas veces— y no como texto: la prosa está traducida y debe diferir; los símbolos no.
 */
function simbolos(md: string): Map<string, number> {
  const encontrados =
    md.match(
      /Gf[A-Za-z]+|provide[A-Za-z]+|<gf-[a-z-]+>|ANIMATED_[A-Z_]+|GF_[A-Z_]+|ICON_[A-Z_]+/g,
    ) ?? [];
  const conteo = new Map<string, number>();
  for (const s of encontrados) conteo.set(s, (conteo.get(s) ?? 0) + 1);
  return conteo;
}

/** Lo que la v2 renombró. Sigue exportado y deprecado, pero un README no debe ENSEÑARLO. */
const V1 =
  /MaxIcon[A-Za-z]*|provideMaxIcons|MAX_ICON[A-Z_]*|<?max-icon(-morph)?>?|prefijo `max`|`max` prefix/g;

const READMES = ['README.md', 'README.es.md'];
let ok = true;

// --- 1. Ningún README enseña la API de la v1 ---
for (const archivo of READMES) {
  const fugas = leer(archivo).match(V1) ?? [];
  if (fugas.length > 0) {
    console.error(
      `  ✗ ${archivo} enseña ${fugas.length} referencia(s) a la API de la v1: ${[...new Set(fugas)].join(', ')}`,
    );
    ok = false;
  }
}

// --- 2. Los dos README describen la MISMA API ---
const [en, es] = READMES.map((a) => simbolos(leer(a)));
const todos = new Set([...en.keys(), ...es.keys()]);
for (const simbolo of [...todos].sort()) {
  const a = en.get(simbolo) ?? 0;
  const b = es.get(simbolo) ?? 0;
  if (a !== b) {
    console.error(
      `  ✗ "${simbolo}" aparece ${a} vez/veces en README.md y ${b} en README.es.md — uno de los dos se quedó atrás.`,
    );
    ok = false;
  }
}

if (!ok) {
  console.error('\ndocs-check FALLÓ — los README de cara al público no dicen lo mismo.');
  process.exit(1);
}
console.log(
  `docs-check OK — los ${READMES.length} README describen la misma API, sin rastros de la v1.`,
);
