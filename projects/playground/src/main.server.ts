import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { serverConfig } from './app/app.config.server';

/**
 * El `context` NO es opcional desde Angular 20: sin él el arranque en servidor truena con NG0401
 * («Missing Platform»), y el mensaje llega minificado en medio de la extracción de rutas, sin
 * decir qué archivo lo causó. Es el mismo `bootstrapApplication` del navegador, con la plataforma
 * que le presta el prerender.
 */
export default (context: BootstrapContext) => bootstrapApplication(App, serverConfig, context);
