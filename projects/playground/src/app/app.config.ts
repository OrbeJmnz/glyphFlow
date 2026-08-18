import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideEscalaEnVivo } from './duration-scale';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideEscalaEnVivo()],
};
