import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';

/**
 * Todo va por `loadComponent`. Lo que eso compra, medido en `ng build playground`: quien entra a
 * `/docs/empezando` no baja el chunk del showcase (23KB) ni el del lab (44KB).
 *
 * Lo que NO compra, y hay que decirlo: el catálogo de curados sigue en el chunk inicial.
 * `CURATED_ICONS` lo importan DOS rutas diferidas (showcase y el picker del lab), y esbuild sube a
 * la entrada lo que comparten varios chunks en vez de emitir un chunk común. Por eso `main` creció
 * de 261KB a 306KB al meter el router: el router se suma, y el catálogo no se fue.
 *
 * Sacarlo pide `await import('glyphflow')` en ambos consumidores — un slice aparte, no un efecto
 * colateral de partir las páginas.
 *
 * Las traducciones siguen la MISMA frontera lazy: cada `provideTranslocoScope` trae su propio
 * `en.json`/`es.json` por `import()` dinámico, así que el chunk de `/docs` no arrastra las
 * traducciones del editor ni viceversa. `route.title` ya no es texto — es una CLAVE que resuelve
 * `TranslatedTitleStrategy` (ver `core/translated-title-strategy.ts`) contra el scope `root`
 * (`i18n/{en,es}.json`), que ya está cargado desde el arranque.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // Sin el conteo: el titulo fino lo pone el propio componente, que ya tiene el catalogo
    // cargado. Derivarlo AQUI costaba 460KB — el router es eager y `import('glyphflow')` subia el
    // registro entero (1767 iconos) al chunk inicial. Medido: 354KB -> 813KB.
    title: 'routes.iconos.title',
    loadComponent: () => import('./features/iconos/iconos').then((m) => m.Iconos),
    providers: [
      provideTranslocoScope({
        scope: 'iconos',
        loader: {
          en: () => import('../i18n/iconos/en.json').then((m) => m.default),
          es: () => import('../i18n/iconos/es.json').then((m) => m.default),
        },
      }),
    ],
  },
  {
    path: 'patrones',
    title: 'routes.patrones.title',
    loadComponent: () => import('./features/patrones/patrones').then((m) => m.Patrones),
    providers: [
      provideTranslocoScope({
        scope: 'patrones',
        loader: {
          en: () => import('../i18n/patrones/en.json').then((m) => m.default),
          es: () => import('../i18n/patrones/es.json').then((m) => m.default),
        },
      }),
    ],
  },
  {
    path: 'editor',
    title: 'routes.editor.title',
    loadComponent: () => import('./features/editor/editor').then((m) => m.Editor),
    providers: [
      provideTranslocoScope({
        scope: 'editor',
        loader: {
          en: () => import('../i18n/editor/en.json').then((m) => m.default),
          es: () => import('../i18n/editor/es.json').then((m) => m.default),
        },
      }),
    ],
  },
  {
    path: 'lab',
    title: 'routes.lab.title',
    loadComponent: () => import('./features/lab/lab').then((m) => m.Lab),
    providers: [
      provideTranslocoScope({
        scope: 'lab',
        loader: {
          en: () => import('../i18n/lab/en.json').then((m) => m.default),
          es: () => import('../i18n/lab/es.json').then((m) => m.default),
        },
      }),
    ],
  },
  {
    path: 'docs',
    loadComponent: () => import('./features/docs/docs').then((m) => m.Docs),
    // Una sola scope para las 4 hijas: comparten el mismo tema (documentación), y las cuatro se
    // navegan entre sí sin recargar — separar en 4 scopes solo multiplicaría el round-trip de
    // `import()` sin que ninguna quede más aislada de las otras.
    providers: [
      provideTranslocoScope({
        scope: 'docs',
        loader: {
          en: () => import('../i18n/docs/en.json').then((m) => m.default),
          es: () => import('../i18n/docs/es.json').then((m) => m.default),
        },
      }),
    ],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'empezando' },
      {
        path: 'empezando',
        title: 'routes.docsEmpezando.title',
        loadComponent: () => import('./features/docs/empezando').then((m) => m.Empezando),
      },
      {
        path: 'accesibilidad',
        title: 'routes.docsAccesibilidad.title',
        loadComponent: () => import('./features/docs/accesibilidad').then((m) => m.Accesibilidad),
      },
      {
        path: 'ssr',
        title: 'routes.docsSsr.title',
        loadComponent: () => import('./features/docs/ssr').then((m) => m.Ssr),
      },
      {
        path: 'api',
        title: 'routes.docsApi.title',
        loadComponent: () => import('./features/docs/api').then((m) => m.Api),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
