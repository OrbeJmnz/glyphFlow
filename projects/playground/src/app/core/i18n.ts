import { DOCUMENT, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { RaizI18nLoader } from './i18n-loader';

export type Idioma = 'en' | 'es';

/**
 * Default inglés a propósito, por tráfico — no `navigator.language`. Auto-detectar el idioma del
 * visitante movería el default sin que nadie lo haya pedido, que es justo lo contrario de la
 * razón por la que se pidió esto. La única forma de salir de inglés es una elección explícita
 * (el switcher) o una ya guardada — de eso se encarga `provideTranslocoPersistLang` abajo.
 */
export function provideI18n() {
  return [
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'] satisfies Idioma[],
        defaultLang: 'en' satisfies Idioma,
        reRenderOnLangChange: true,
        prodMode: true,
        // Sin esto, un componente instanciado DENTRO de una ruta con scope (p. ej.
        // `<app-boton-github>` en el hero de `/`, que vive en el scope `iconos`) le antepone el
        // nombre del scope a CUALQUIER clave que pida, incluidas las de `shell.*`/`marca.*` del
        // root — rompía exactamente eso, y en silencio (solo un warning en consola). Con esto
        // apagado toda clave es la ruta completa que se ve en el JSON, sin magia ambiental.
        scopes: { autoPrefixKeys: false },
      },
      loader: RaizI18nLoader,
    }),
    // Guard de SSR interno (`isBrowser()`), lee `localStorage`, cae a `defaultLang` si no hay
    // nada guardado. No hace falta un `core/idioma.ts` que reimplemente esto a mano.
    provideTranslocoPersistLang({
      storage: { useValue: typeof localStorage === 'undefined' ? null : localStorage },
    }),
  ];
}

/**
 * Mantiene `<html lang>` igual al idioma activo. Se llama una vez desde `App`, como
 * `conectarTema()` — el `index.html` solo puede traer el default (`en`), y sin esto el atributo se
 * queda clavado ahí para siempre aunque el visitante cambie de idioma.
 *
 * No es cosmético, y menos en un sitio que se puso en inglés justamente por tráfico: `lang` es de
 * dónde Google saca el idioma de la página, y de dónde el lector de pantalla saca la voz — con el
 * valor equivocado, el inglés se lee con fonética española. Es lo mismo que ya hace `tema.ts` al
 * escribir `data-tema` en el mismo elemento.
 */
export function conectarIdiomaDelDocumento(): void {
  // `optional`: `test:ssr` prerenderiza sin documento, y ahí no hay nada que marcar.
  const doc = inject(DOCUMENT, { optional: true });
  if (!doc) return;
  const transloco = inject(TranslocoService);
  const idioma = toSignal(transloco.langChanges$, {
    initialValue: transloco.getActiveLang(),
  });
  effect(() => {
    doc.documentElement.lang = idioma();
  });
}
