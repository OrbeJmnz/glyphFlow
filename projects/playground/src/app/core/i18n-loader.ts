import type { Translation, TranslocoLoader } from '@jsverse/transloco';

/**
 * `import()` dinámico y no `TranslocoHttpLoader`: `npm run test:ssr` renderiza sin
 * `window`/`document`/`fetch`, y esto no depende de ninguno de los dos — el JSON viaja como
 * cualquier otro chunk de JS, lo resuelve esbuild en build-time.
 *
 * Solo cubre el root (`en`/`es`, sin scope). Las traducciones por feature van con su propio
 * loader inline en `app.routes.ts`, vía `provideTranslocoScope({ loader: {...} })` — ese patrón
 * ya es el que documenta Transloco para JSON por scope, no hace falta reinventarlo aquí.
 */
export class RaizI18nLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    return lang === 'en'
      ? import('../../i18n/en.json').then((m) => m.default)
      : import('../../i18n/es.json').then((m) => m.default);
  }
}
