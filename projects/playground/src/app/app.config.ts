import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, TitleStrategy, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { registrarExterna } from './core/transicion';
import { provideConfigEnVivo } from './core/duration-scale';
import { provideI18n } from './core/i18n';
import { TranslatedTitleStrategy } from './core/translated-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    /*
     * SIN esto, prerenderizar no servía de nada para el visitante: Angular arrancaba, TIRABA el DOM
     * que venía del servidor y lo volvía a construir desde cero. El HTML con los 120 primeros
     * iconos, el buscador y el comando de instalación llegaba, se pintaba, y desaparecía.
     *
     * Medido antes de ponerlo: CLS 0.2654 en 24 saltos (banda «poor» de Core Web Vitals empieza en
     * 0.25), con `main` pasando de 96px de alto a 780 y el `footer` destruyéndose y recreándose. Se
     * estaba pagando el coste del prerender —29 rutas estáticas— sin cobrar ninguno de sus
     * beneficios salvo el de los buscadores, que no ejecutan JS y por eso nunca vieron el problema.
     *
     * Con hidratación, el mismo DOM que pintó el servidor es el que Angular adopta: no hay
     * reemplazo, así que no hay salto.
     *
     * Y hay una ironía que conviene dejar escrita: la página de docs de SSR de este mismo sitio
     * promete que «el SVG que pinta el servidor es el mismo nodo que el cliente anima, nunca se
     * reemplaza» y remata con «si ves un parpadeo, busca otra cosa que esté cambiando el DOM». Es
     * cierto del componente. Era mentira de la página que lo contaba: la otra cosa era esto.
     */
    provideClientHydration(),
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
    provideConfigEnVivo(),
    provideI18n(),
    // `route.title` ahora es una clave de traducción, no texto — ver `translated-title-strategy.ts`.
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
  ],
};
