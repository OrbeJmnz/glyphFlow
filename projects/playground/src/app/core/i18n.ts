import { DOCUMENT, effect, inject, provideAppInitializer } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { IDIOMAS, idiomaPreferido, type Idioma } from './idioma';
import { RaizI18nLoader } from './i18n-loader';
import { idiomaDeLaRuta } from './rutas';

export type { Idioma } from './idioma';

/**
 * El idioma del primer render. **La URL manda**: `/es/patrones` abre en español aunque quien lo
 * reciba tenga inglés guardado, porque una URL compartida tiene que valer lo mismo en cualquier
 * navegador. La elección guardada solo entra cuando la URL no dice nada — o sea, en `/`.
 *
 * Y NO hay `navigator.language` en ninguno de los dos casos: auto-detectar el idioma del visitante
 * movería el default sin que nadie lo haya pedido. El default es inglés por tráfico, y salir de ahí
 * es siempre una elección explícita (el switcher) o una ya guardada.
 */
function idiomaInicial(): Idioma {
  try {
    return idiomaDeLaRuta(location.pathname) ?? idiomaPreferido();
  } catch {
    return 'en'; // Sin `location` (prerender, tests): el default.
  }
}

/**
 * `defaultLang` se queda en inglés SIEMPRE, aunque el visitante llegue en español: es el idioma al
 * que Transloco cae cuando una clave falta, y apuntarlo al idioma activo dejaría a las claves sin
 * traducir sin ningún sitio a donde caer. El idioma de arranque se pone aparte, en el inicializador
 * de abajo, que corre antes del primer pintado.
 *
 * Antes esto lo hacía `provideTranslocoPersistLang`. Se fue al llegar las rutas con prefijo: ese
 * paquete escribe el idioma activo desde `localStorage` al arrancar, o sea COMPITE con la URL por
 * la misma decisión, y quien gana depende del orden de dos providers. Con dos mecanismos que
 * pueden discrepar, la señal de un enlace compartido se pierde en silencio. Ahora hay uno solo, y
 * el storage se limita a lo suyo: recordar la elección para cuando `/` tenga que decidir.
 */
export function provideI18n() {
  return [
    provideTransloco({
      config: {
        availableLangs: [...IDIOMAS],
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
    provideAppInitializer(() => {
      const transloco = inject(TranslocoService);
      const inicial = idiomaInicial();
      if (transloco.getActiveLang() !== inicial) transloco.setActiveLang(inicial);
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
 * escribir `data-theme` en el mismo elemento.
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
