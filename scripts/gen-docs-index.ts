/*
 * Índice de búsqueda de Docs, construido EN TIEMPO DE BUILD.
 *
 * La ficha de T27 lo pide así y sin servicio externo. Nada que indexar en runtime: el contenido de
 * Docs es texto estático que ya vive en `i18n/docs/{en,es}.json`.
 *
 * **Se deriva de los archivos reales, sin tabla a mano.** El generador lee cada plantilla, corta
 * por sus `<h2 id="…">` y recoge las claves de traducción que aparecen en cada tramo; después las
 * resuelve contra el JSON del idioma. Así el ancla y su texto salen del MISMO sitio del que salen
 * en la página: un encabezado nuevo entra solo, y uno sin `id` no entra — que es exactamente la
 * regla que ya sigue el índice lateral.
 *
 * Un mapa escrito a mano de «clave i18n → ancla» sería una tercera copia de esa relación,
 * y la que nadie actualizaría.
 *
 * Sale a `indice-busqueda.json` junto al componente, y el sitio lo carga con `import()` al primer
 * tecleo — mismo patrón que `tags-catalogo.json`, para que no pese en el bundle inicial.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  API_VALORES,
  API_TIPOS,
} from '../projects/playground/src/app/features/docs/api-surface';

const RAIZ = join(import.meta.dirname, '..');
const DOCS = join(RAIZ, 'projects/playground/src/app/features/docs');
const I18N = join(RAIZ, 'projects/playground/src/i18n/docs');
const SALIDA = join(DOCS, 'indice-busqueda.json');

/** Plantilla → id de ruta, el mismo que usa `Rutas` para armar la URL. */
const PAGINAS = [
  { archivo: 'empezando.html', ruta: 'empezando' },
  { archivo: 'api.html', ruta: 'api' },
  { archivo: 'accesibilidad.html', ruta: 'accesibilidad' },
  { archivo: 'ssr.html', ruta: 'ssr' },
] as const;

const IDIOMAS = ['en', 'es'] as const;

export interface EntradaIndice {
  idioma: string;
  /** Id de ruta de la página; el sitio lo traduce a slug según el idioma activo. */
  ruta: string;
  /** El `id` del `<h2>`. Estable y en inglés: es una URL pública. */
  ancla: string;
  titulo: string;
  texto: string;
}

/** Quita el marcado que el propio sitio pinta con `innerHTML`. Se busca sobre texto, no sobre HTML. */
function aTextoPlano(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function resolver(json: Record<string, unknown>, ruta: string): string | null {
  // Las claves de la plantilla vienen con el prefijo del scope (`docs.`), que el JSON no lleva.
  const partes = ruta.replace(/^docs\./, '').split('.');
  let actual: unknown = json;
  for (const p of partes) {
    if (typeof actual !== 'object' || actual === null) return null;
    actual = (actual as Record<string, unknown>)[p];
  }
  return typeof actual === 'string' ? actual : null;
}

const entradas: EntradaIndice[] = [];

for (const { archivo, ruta } of PAGINAS) {
  const html = readFileSync(join(DOCS, archivo), 'utf8');

  /*
   * Los cortes son los `<h2 id="…">`. El `<h2 [attr.id]>` del bucle de exports queda fuera a
   * propósito: su ancla se calcula en runtime a partir del nombre del entry point, así que aquí no
   * hay un valor que escribir. Lo que caiga en ese tramo se cuelga del encabezado anterior.
   */
  const cortes = [...html.matchAll(/<h2\s+id="([a-z0-9-]+)"[^>]*>([\s\S]*?)<\/h2>/g)];

  for (const [i, corte] of cortes.entries()) {
    const desde = corte.index;
    const hasta = i + 1 < cortes.length ? cortes[i + 1].index : html.length;
    const tramo = html.slice(desde, hasta);

    // Todas las claves `docs.…` que se usan en el tramo, en orden y sin repetir.
    const claves = [...new Set([...tramo.matchAll(/'(docs\.[a-zA-Z0-9_.]+)'/g)].map((m) => m[1]))];
    if (!claves.length) continue;

    for (const idioma of IDIOMAS) {
      const json = JSON.parse(readFileSync(join(I18N, `${idioma}.json`), 'utf8'));
      const textos = claves.map((c) => resolver(json, c)).filter((t): t is string => t !== null);
      if (!textos.length) continue;

      /*
       * El título sale de la clave del propio encabezado si la tiene, y si no del texto literal
       * que trae dentro. Los `<h2>&lt;gf-icon&gt;</h2>` de la API no pasan por i18n —son nombres
       * de elemento, no prosa—, y sin este caso el índice les ponía de título la primera clave del
       * tramo: las dos tablas de la API salían tituladas «Input».
       */
      /*
       * La clave se busca en la etiqueta COMPLETA (`corte[0]`) y no solo en su cuerpo: la mitad de
       * los encabezados la llevan en un atributo (`<h2 [innerHTML]="'docs.…' | transloco">`) y ahí
       * el cuerpo viene vacío. Buscándola solo dentro, cinco de los dieciocho títulos salían en
       * blanco.
       */
      const claveDelTitulo = /'(docs\.[a-zA-Z0-9_.]+)'/.exec(corte[0])?.[1];
      const crudo = claveDelTitulo ? (resolver(json, claveDelTitulo) ?? corte[2]) : corte[2];
      const titulo = aTextoPlano(crudo);

      entradas.push({
        idioma,
        ruta,
        ancla: corte[1],
        // `titulo` ya viene plano: volver a pasarlo por `aTextoPlano` se comía `<gf-icon>` — el
        // decodificador de entidades lo deja como `<gf-icon>` y la segunda pasada lo borra creyendo
        // que es marcado.
        titulo,
        texto: `${titulo} ${aTextoPlano(textos.join(' '))}`.trim(),
      });
    }
  }
}

/*
 * Segunda pasada: los SÍMBOLOS de la API.
 *
 * No están en i18n ni en la plantilla — se pintan desde `api-surface.ts`, así que el barrido de
 * arriba no los ve. Y son justo lo que se busca: nadie teclea «Exports from glyphflow», teclea
 * `provideGfIcons` o `spring`. Sin esto, el buscador encontraría los títulos de las secciones y no
 * su contenido, que es la mitad que importa.
 *
 * Cuelgan del ancla `exports-<entrada>`, la misma que la página calcula en runtime para el bucle.
 */
for (const idioma of IDIOMAS) {
  const json = JSON.parse(readFileSync(join(I18N, `${idioma}.json`), 'utf8'));
  const porEntrada = new Map<string, string[]>();

  const agregar = (entrada: string, nombre: string, claveResumen: string): void => {
    const resumen = resolver(json, claveResumen) ?? '';
    porEntrada.set(entrada, [...(porEntrada.get(entrada) ?? []), `${nombre} ${resumen}`]);
  };

  for (const s of API_VALORES) agregar(s.entrada, s.nombre, s.resumen);
  for (const t of API_TIPOS) agregar(t.entrada, t.nombre, t.resumen);

  for (const [entrada, piezas] of porEntrada) {
    entradas.push({
      idioma,
      ruta: 'api',
      ancla: `exports-${entrada}`,
      titulo: entrada,
      texto: aTextoPlano(piezas.join(' · ')),
    });
  }
}

const json = JSON.stringify(entradas, null, 2) + '\n';

if (process.argv.includes('--check')) {
  const enDisco = readFileSync(SALIDA, 'utf8');
  if (enDisco !== json) {
    console.error(
      'indice-busqueda.json está desfasado respecto a las plantillas o a los textos.\n' +
        'Corre `npm run gen:docs-index` y comitea el resultado.',
    );
    process.exit(1);
  }
  console.log(`indice-busqueda.json al día — ${entradas.length} entradas.`);
} else {
  writeFileSync(SALIDA, json);
  const porIdioma = IDIOMAS.map((l) => `${l}: ${entradas.filter((e) => e.idioma === l).length}`);
  console.log(`indice-busqueda.json escrito — ${entradas.length} entradas (${porIdioma.join(', ')})`);
}
