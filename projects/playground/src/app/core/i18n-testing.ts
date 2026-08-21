import { TranslocoTestingModule, type Translation } from '@jsverse/transloco';
import rootEn from '../../i18n/en.json';
import rootEs from '../../i18n/es.json';

/**
 * `TranslocoTestingModule` es el módulo OFICIAL de testing de Transloco — no el `provideI18n()`
 * de producción. Su `TestingLoader` devuelve `of(dato)`, un Observable SÍNCRONO: no hay
 * `import()` dinámico, no hay carrera de carga que esperar, no hay reintentos de asentamiento que
 * hacer. `langs` acepta claves con scope incluido (`'editor/en'`) directo, así que un spec que
 * monta un componente con scope propio solo necesita pasar SU json ahí — nada de
 * `provideTranslocoScope` con loader, nada de sembrar el servicio a mano.
 *
 * Se llegó aquí después de perseguir un rato largo una carrera que resultó no ser tal: sembrar el
 * servicio a mano con `setTranslation(..., { emitChange: false })` dejaba el dato bien puesto
 * (por eso `.translate()` directo funcionaba) pero nada reactivo se enteraba — ningún número de
 * reintentos iba a arreglar eso, porque el problema nunca fue tiempo. El módulo oficial no tiene
 * ese modo de falla: usa el pipeline normal de carga (`APP_INITIALIZER` + `service.load()`), solo
 * que con datos ya en memoria en vez de un fetch real.
 *
 * Uso:
 * ```ts
 * import editorEn from '../../../i18n/editor/en.json';
 * import editorEs from '../../../i18n/editor/es.json';
 *
 * TestBed.configureTestingModule({
 *   imports: [Editor, providersI18nTest({ 'editor/en': editorEn, 'editor/es': editorEs })],
 * });
 * ```
 */
export function providersI18nTest(scopes: Record<string, Translation> = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en: rootEn, es: rootEs, ...scopes },
    translocoConfig: {
      defaultLang: 'en',
      availableLangs: ['en', 'es'],
      reRenderOnLangChange: true,
      scopes: { autoPrefixKeys: false },
    },
    preloadLangs: true,
  });
}
