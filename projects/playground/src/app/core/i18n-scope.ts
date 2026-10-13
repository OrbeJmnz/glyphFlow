import { inject, PendingTasks, type Provider } from '@angular/core';
import { TRANSLOCO_SCOPE, type Translation } from '@jsverse/transloco';

/**
 * El scope de traducciones de una feature, con el idioma por defecto dentro de su chunk y el otro diferido.
 *
 * Es `provideTranslocoScope` con UNA diferencia que importa para el SEO: la carga del idioma diferido se registra como trabajo pendiente
 * de la aplicación (`PendingTasks`). Un `import()` suelto no cuenta como tarea pendiente, así que el prerender tomaba la foto ANTES de que
 * el JSON en español resolviera: las páginas en español salían con el `<h1>` y los `<h2>` vacíos (`<h1><!--ngetn--></h1>`) y un rastreador
 * que no ejecuta JavaScript las veía en blanco. Con la tarea registrada el prerender espera, y en el navegador no cambia nada.
 *
 * Va como fábrica y no como valor porque `PendingTasks` solo se puede pedir dentro de un contexto de inyección.
 */
export function provideScopeI18n(scope: string, en: Translation, es: () => Promise<{ default: Translation }>): Provider {
  return {
    provide: TRANSLOCO_SCOPE,
    multi: true,
    useFactory: () => {
      const tareas = inject(PendingTasks);
      return {
        scope,
        loader: {
          en: () => Promise.resolve(en),
          es: () => {
            // `add()` y no `run()`: en Angular 22 `run` devuelve `void`, y el loader tiene que devolver la promesa.
            const cerrar = tareas.add();
            return es()
              .then((m) => m.default)
              .finally(cerrar);
          },
        },
      };
    },
  };
}
