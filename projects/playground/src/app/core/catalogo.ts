import type { AnimatedIconDef } from 'glyphflow';

interface CatalogoJson {
  iconos: Record<string, AnimatedIconDef>;
  alias: Record<string, string>;
}

/**
 * El catálogo curado, por su propio chunk.
 *
 * **No sale del paquete a propósito.** Importar `CURATED_ICONS` de `glyphflow` mete el catálogo
 * entero en el bundle INICIAL, y desde el sitio no hay forma de sacarlo: `glyphflow` ya se alcanza
 * desde la entrada —el header usa media docena de iconos sueltos— así que cualquier símbolo suyo
 * que alguien necesite acaba ahí. Están medidos cinco caminos en `app.routes.ts`, incluido el
 * `import('glyphflow')` dinámico, que lo empeora.
 *
 * Un `.json` del propio sitio no lo alcanza nadie más, y ahí `import()` sí hace su trabajo: el
 * catálogo se va a un chunk que sólo baja quien abre una pantalla que lo necesita. Medido en
 * `ng build playground`: la entrada pasa de 1.43 MB a 0.38 MB, y el JSON son 108 KB con brotli.
 *
 * El archivo lo GENERA `npm run gen:catalogo` desde el CÓDIGO FUENTE de la librería
 * (`projects/glyphflow/src/lib/icon/curated-icons.ts`), no desde el paquete publicado — el sitio
 * enseña el catálogo de este repo, que va por delante de npm entre release y release. Su
 * `--check` está en `verify:clean`: no puede quedarse atrás en silencio.
 *
 * La promesa se guarda para que dos pantallas no bajen el mismo chunk dos veces.
 */
let pendiente: Promise<CatalogoJson> | null = null;

function cargar(): Promise<CatalogoJson> {
  pendiente ??= import('./catalogo-curado.json').then((m) => m.default as unknown as CatalogoJson);
  return pendiente;
}

export function cargarCurados(): Promise<Record<string, AnimatedIconDef>> {
  return cargar().then((c) => c.iconos);
}

/**
 * Nombre viejo de Lucide → nombre actual. Viaja en el mismo archivo que el catálogo: son 30 KB al
 * lado de un megabyte, y quien los necesita —los buscadores del editor y del picker— ya está
 * esperando al catálogo de todas formas.
 */
export function cargarAlias(): Promise<Record<string, string>> {
  return cargar().then((c) => c.alias);
}
