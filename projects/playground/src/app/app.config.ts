import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideEscalaEnVivo } from './duration-scale';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // `scrollPositionRestoration` porque el showcase es una página larga: volver del detalle o de
    // las docs al tope de la lista de 180 sería perder el lugar cada vez.
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideEscalaEnVivo(),
  ],
};
