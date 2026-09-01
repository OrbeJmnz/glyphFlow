// Escribe robots.txt y sitemap.xml en `projects/playground/public/`, desde la MISMA tabla de rutas
// que usa el sitio. Escribirlos a mano significaba mantener una tercera lista que tiene que decir
// lo mismo que `core/rutas.ts` y que `app.routes.ts` — y la que se olvide no truena, solo deja una
// página fuera del índice o promete una URL que no existe.
//
// Antes de esto NO EXISTÍA ninguno de los dos: el rewrite de `vercel.json` los servía como
// `index.html` con 200 y `content-type: text/html`. Un crawler que pedía robots.txt recibía HTML.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { IDIOMAS } from '../projects/playground/src/app/core/idioma.ts';
import { ORIGEN } from '../projects/playground/src/app/core/sitio.ts';
import { ruta, type RutaId } from '../projects/playground/src/app/core/rutas.ts';
import { sinCr } from './sin-cr';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'projects', 'playground', 'public');

/** Las páginas indexables. `docs` a secas NO va: redirige a `empezando`, no es contenido propio. */
const PAGINAS: RutaId[][] = [
  [],
  ['patrones'],
  ['editor'],
  ['lab'],
  ['docs', 'empezando'],
  ['docs', 'accesibilidad'],
  ['docs', 'ssr'],
  ['docs', 'api'],
  ['docs', 'migracion'],
  ['docs', 'comparativa'],
  ['docs', 'verificar'],
  ['docs', 'problemas'],
  ['docs', 'temas'],
];

/*
 * OJO: ésta es la TERCERA lista a mano de «qué páginas tiene Docs» — las otras son `secciones` en
 * `docs.ts` (la barra lateral) y `PAGINAS` en `gen-docs-index.ts` (el buscador). Agregar una página
 * y olvidar una de las tres deja un fallo distinto en cada caso: sin enlace, sin resultado de
 * búsqueda, o fuera del sitemap. Las tres se derivan del mismo hecho y deberían salir de un solo
 * sitio; hasta que eso pase, quien agregue una página tiene que tocar las tres.
 */

/**
 * Cada `<url>` declara sus alternativas en los dos idiomas, incluida ella misma. Es la misma regla
 * recíproca que `core/enlaces-idioma.ts` aplica en el `<head>`: si una versión no devuelve a la
 * otra, Google descarta el grupo entero y las dos páginas compiten como duplicados.
 */
const urls = IDIOMAS.flatMap((idioma) =>
  PAGINAS.map((pagina) => {
    const alternativas = IDIOMAS.map(
      (otro) =>
        `    <xhtml:link rel="alternate" hreflang="${otro}" href="${ORIGEN}${ruta(otro, ...pagina)}"/>`,
    ).join('\n');
    return [
      '  <url>',
      `    <loc>${ORIGEN}${ruta(idioma, ...pagina)}</loc>`,
      alternativas,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGEN}${ruta('en', ...pagina)}"/>`,
      '  </url>',
    ].join('\n');
  }),
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGEN}/sitemap.xml
`;

const salidas: [string, string][] = [
  ['sitemap.xml', sitemap],
  ['robots.txt', robots],
];

/**
 * `--check` no escribe: falla si lo commiteado no es lo que la tabla de rutas produce HOY. Es la
 * red que impide que estos dos se queden atrás — viven en `public/`, o sea se commitean y nadie
 * los vuelve a mirar. Sin esto, agregar una página y olvidar regenerar deja al sitemap prometiendo
 * el catálogo viejo, y la página nueva no entra al índice sin que truene nada.
 *
 * Va como script y no como spec porque las pruebas del sitio corren en un entorno de navegador,
 * sin `node:fs`. Mismo trato que `curated:lock:check` y `sync:package-files --check`.
 */
if (process.argv.includes('--check')) {
  const desincronizados = salidas.filter(([archivo, esperado]) => {
    try {
      return sinCr(readFileSync(join(PUBLIC, archivo), 'utf8')) !== esperado;
    } catch {
      return true;
    }
  });
  if (desincronizados.length > 0) {
    console.error(
      `gen:sitemap --check: ${desincronizados.map(([a]) => a).join(' y ')} ${desincronizados.length === 1 ? 'no refleja' : 'no reflejan'} las rutas actuales.
` + '  Corre `npm run gen:sitemap` y commitea el resultado.',
    );
    process.exit(1);
  }
  console.log('gen:sitemap --check: sitemap.xml y robots.txt en sync con las rutas.');
} else {
  mkdirSync(PUBLIC, { recursive: true });
  for (const [archivo, contenido] of salidas)
    writeFileSync(join(PUBLIC, archivo), contenido, 'utf8');
  console.log(`sitemap.xml: ${IDIOMAS.length * PAGINAS.length} URLs. robots.txt escrito.`);
}
