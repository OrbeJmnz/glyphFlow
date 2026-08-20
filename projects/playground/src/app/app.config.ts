import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { registrarExterna } from './core/transicion';
import { provideEscalaEnVivo } from './core/duration-scale';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // `scrollPositionRestoration` porque el showcase es una página larga: volver del detalle o de
    // las docs al tope de la lista de 180 sería perder el lugar cada vez.
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
      withViewTransitions({
        // La primera carga no es una navegación desde ningún lado: animarla haría parpadear el
        // sitio entero antes de que se vea nada.
        skipInitialTransition: true,
        // El router abre la transición por su cuenta; esto se la presta al coordinador para que
        // sepa que hay una en curso. Sin este puente vuelve el problema de dos a la vez.
        onViewTransitionCreated: ({ transition }) => registrarExterna(transition),
      }),
    ),
    provideEscalaEnVivo(),
  ],
};
