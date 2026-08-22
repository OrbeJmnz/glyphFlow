import type { Translation, TranslocoLoader } from '@jsverse/transloco';
import en from '../../i18n/en.json';

/**
 * El idioma por DEFECTO se importa estático, así viaja dentro del bundle inicial y está listo en el
 * primer render. No es una micro-optimización: con `import()` dinámico, entre que Angular arranca y
 * que llega el JSON, TODO el texto del shell se pinta vacío — nav sin enlaces, botones sin
 * etiqueta, las cifras del hero como cajas grises. Medido en 3G lento, ese hueco duraba ~2.6s, y se
 * ve como si el sitio estuviera roto.
 *
 * El otro idioma sí va por `import()`: solo lo baja quien lo pide con el switcher, y para entonces
 * ya hay una página pintada donde esperar. Nadie paga por adelantado el idioma que no usa.
 *
 * Nada de `TranslocoHttpLoader`: `npm run test:ssr` renderiza sin `window`/`document`/`fetch`, y
 * esto no depende de ninguno — el JSON lo resuelve esbuild en build-time.
 *
 * Solo cubre el root (`en`/`es`, sin scope). Las traducciones por feature van con su propio loader
 * en el `providers` de cada componente diferido, para viajar dentro de SU chunk.
 */
export class RaizI18nLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    // `Promise.resolve` y no `import()`: la interfaz pide una promesa, pero esta ya viene resuelta
    // —el objeto está en el bundle— así que se cumple en el siguiente microtask, sin tocar la red.
    return lang === 'en'
      ? Promise.resolve(en as Translation)
      : import('../../i18n/es.json').then((m) => m.default);
  }
}
