import type { Translation, TranslocoLoader } from '@jsverse/transloco';
import en from '../../i18n/en.json';
import es from '../../i18n/es.json';

/**
 * El loader del scope raíz, pero para el PRERENDER: los dos idiomas importados estáticos, ninguno
 * por `import()`.
 *
 * El del navegador (`i18n-loader.ts`, al lado) trae el inglés estático y difiere el español a
 * propósito, para que nadie pague por adelantado el idioma que no usa. Ese `import()` es una
 * promesa que Angular NO cuenta como tarea pendiente, así que al prerenderizar la foto se toma
 * antes de que resuelva: `/es` salía con el título de respaldo del `index.html` en vez del suyo.
 *
 * Aquí ese ahorro no existe —el bundle del servidor no viaja a ningún visitante— así que la
 * decisión se invierte sin costo. **Solo cambia el idioma del HTML generado, nunca el runtime.**
 */
export class RaizI18nLoaderServidor implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    return Promise.resolve((lang === 'es' ? es : en) as Translation);
  }
}
