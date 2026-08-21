import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// Registra las medidas capturadas por `npm run skeleton:capture` ANTES del bootstrap: sin este
// import, `<boneyard-skeleton name="github-conteo">` no encuentra sus huesos y no pinta nada
// mientras carga el conteo de estrellas. El archivo es generado — ver `scripts/skeleton-capture.mjs`.
import './bones/registry';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
