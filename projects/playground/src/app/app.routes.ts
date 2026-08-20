import { Routes } from '@angular/router';

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
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // Sin el conteo: el titulo fino lo pone el propio componente, que ya tiene el catalogo
    // cargado. Derivarlo AQUI costaba 460KB — el router es eager y `import('glyphflow')` subia el
    // registro entero (1767 iconos) al chunk inicial. Medido: 354KB -> 813KB.
    title: 'glyphflow — iconos de Lucide animados para Angular',
    loadComponent: () => import('./features/iconos/iconos').then((m) => m.Iconos),
  },
  {
    path: 'patrones',
    title: 'Patrones — glyphflow',
    loadComponent: () => import('./features/patrones/patrones').then((m) => m.Patrones),
  },
  {
    path: 'editor',
    title: 'Editor de nodos — glyphflow',
    loadComponent: () => import('./features/editor/editor').then((m) => m.Editor),
  },
  {
    path: 'lab',
    title: 'Lab — glyphflow',
    loadComponent: () => import('./features/lab/lab').then((m) => m.Lab),
  },
  {
    path: 'docs',
    loadComponent: () => import('./features/docs/docs').then((m) => m.Docs),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'empezando' },
      {
        path: 'empezando',
        title: 'Empezando — glyphflow',
        loadComponent: () => import('./features/docs/empezando').then((m) => m.Empezando),
      },
      {
        path: 'accesibilidad',
        title: 'Accesibilidad — glyphflow',
        loadComponent: () => import('./features/docs/accesibilidad').then((m) => m.Accesibilidad),
      },
      {
        path: 'ssr',
        title: 'SSR — glyphflow',
        loadComponent: () => import('./features/docs/ssr').then((m) => m.Ssr),
      },
      {
        path: 'api',
        title: 'API — glyphflow',
        loadComponent: () => import('./features/docs/api').then((m) => m.Api),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
