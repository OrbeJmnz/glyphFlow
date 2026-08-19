import { Routes } from '@angular/router';

/**
 * Todo va por `loadComponent`. Lo que eso compra, medido en `ng build playground`: quien entra a
 * `/docs/empezando` no baja el chunk del showcase (23KB) ni el del lab (44KB).
 *
 * Lo que NO compra, y hay que decirlo: el catálogo de los 180 curados sigue en el chunk inicial.
 * `CURATED_ICONS` lo importan DOS rutas diferidas (showcase y el picker del lab), y esbuild sube a
 * la entrada lo que comparten varios chunks en vez de emitir un chunk común. Por eso `main` creció
 * de 261KB a 306KB al meter el router: el router se suma, y el catálogo no se fue.
 *
 * Sacarlo pide `await import('glyphflow')` en ambos consumidores — un slice aparte, no un efecto
 * colateral de partir las páginas.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'glyphflow — 180 iconos animados',
    loadComponent: () => import('./pages/showcase').then((m) => m.Showcase),
  },
  {
    path: 'lab',
    title: 'Lab — glyphflow',
    loadComponent: () => import('./pages/lab').then((m) => m.Lab),
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs/docs').then((m) => m.Docs),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'empezando' },
      {
        path: 'empezando',
        title: 'Empezando — glyphflow',
        loadComponent: () => import('./pages/docs/empezando').then((m) => m.Empezando),
      },
      {
        path: 'accesibilidad',
        title: 'Accesibilidad — glyphflow',
        loadComponent: () => import('./pages/docs/accesibilidad').then((m) => m.Accesibilidad),
      },
      {
        path: 'ssr',
        title: 'SSR — glyphflow',
        loadComponent: () => import('./pages/docs/ssr').then((m) => m.Ssr),
      },
      {
        path: 'api',
        title: 'API — glyphflow',
        loadComponent: () => import('./pages/docs/api').then((m) => m.Api),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
