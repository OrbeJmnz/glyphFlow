/**
 * Los dos idiomas del sitio y dónde se recuerda la elección. Sin Angular y sin Transloco a
 * propósito: `rutas.ts` lo necesita para construir el árbol de rutas, que se evalúa antes de que
 * exista un inyector.
 */
export const IDIOMAS = ['en', 'es'] as const;

export type Idioma = (typeof IDIOMAS)[number];

export function esIdioma(v: string | undefined): v is Idioma {
  return v === 'en' || v === 'es';
}

/**
 * Clave en inglés como todas las demás: lo que se guarda en `localStorage` se ve en las
 * herramientas del navegador, así que es superficie expuesta y no se traduce (T19).
 *
 * `translocoLang` es la de `@jsverse/transloco-persist-lang`, que ESTE archivo reemplaza. Se lee
 * una sola vez para no tirar la elección de quien ya había usado el switcher antes de las rutas
 * con prefijo.
 */
const CLAVE = 'gf:lang';
const CLAVE_VIEJA = 'translocoLang';

/**
 * Solo decide a dónde manda `/` — la URL, cuando trae prefijo, siempre gana. Por eso esto NO es un
 * `navigator.language`: el default sigue siendo inglés por tráfico, y salir de ahí sigue siendo
 * una elección explícita. Ver el bloque de `provideI18n()`.
 */
export function idiomaPreferido(): Idioma {
  try {
    const guardado = localStorage.getItem(CLAVE) ?? localStorage.getItem(CLAVE_VIEJA) ?? '';
    return esIdioma(guardado) ? guardado : 'en';
  } catch {
    return 'en'; // Modo privado o cookies bloqueadas: default y sin persistir.
  }
}

export function recordarIdioma(idioma: Idioma): void {
  try {
    localStorage.setItem(CLAVE, idioma);
  } catch {
    // Sin storage la elección dura lo que la pestaña. Degradación aceptable, no un error.
  }
}
