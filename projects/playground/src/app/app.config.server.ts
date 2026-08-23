import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { TRANSLOCO_LOADER } from '@jsverse/transloco';
import { appConfig } from './app.config';
import { RaizI18nLoaderServidor } from './core/i18n-loader.server';

/**
 * Config del prerender. Se fusiona con la del navegador en vez de duplicarla: el sitio se
 * prerenderiza para que cada ruta llegue con su `<title>`, su `lang`, su `canonical` y sus
 * `hreflang` YA en el HTML — no para comportarse distinto.
 *
 * La salida es ESTÁTICA (`outputMode: 'static'`): no hay servidor Node en producción, solo 10
 * archivos HTML que Vercel sirve como cualquier otro asset. Nada de esto cambia el runtime del
 * visitante; cambia lo que ve quien NO ejecuta JavaScript, que es la mitad que importa aquí
 * (buscadores antes de renderizar, scrapers de redes, motores de respuesta).
 */
export const serverConfig: ApplicationConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(),
    // Va DESPUÉS del `appConfig` fusionado, así que gana sobre el loader del navegador. Ver el
    // porqué completo en `core/i18n-loader.server.ts`: sin esto, `/es` se prerenderiza con el título
    // equivocado porque el `import()` del español no resuelve antes de la foto.
    { provide: TRANSLOCO_LOADER, useClass: RaizI18nLoaderServidor },
  ],
});
