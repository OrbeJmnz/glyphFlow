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
 *
 * Las traducciones siguen la MISMA frontera lazy, pero su scope NO se declara aquí: va en el
 * `providers` de cada componente diferido. Este archivo es eager, así que un loader puesto aquí se
 * resuelve en un `import()` aparte que se encadena DESPUÉS de bajar el chunk de la página — dos
 * esperas en fila, y mientras tanto el texto se pinta vacío. Medido en 3G lento, los textos del
 * hero tardaban ~9.5s. Declarado en el componente, el idioma por defecto viaja DENTRO de su chunk.
 *
 * `route.title` ya no es texto — es una CLAVE que resuelve `TranslatedTitleStrategy` (ver
 * `core/translated-title-strategy.ts`) contra el scope raíz (`i18n/{en,es}.json`), que va en el
 * bundle inicial para que el shell nunca se pinte sin texto (ver `core/i18n-loader.ts`).
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // Sin el conteo: el titulo fino lo pone el propio componente, que ya tiene el catalogo
    // cargado. Derivarlo AQUI costaba 460KB — el router es eager y `import('glyphflow')` subia el
    // registro entero (1767 iconos) al chunk inicial. Medido: 354KB -> 813KB.
    title: 'routes.iconos.title',
    // El scope `iconos` NO se declara aquí sino en el propio componente: este archivo es eager, y
    // su loader vive en un `import()` aparte que se encadena DESPUÉS del chunk de la página. Puesto
    // en el componente, el JSON viaja DENTRO de su chunk y llega con él. Ver `iconos.ts`.
    loadComponent: () => import('./features/iconos/iconos').then((m) => m.Iconos),
  },
  {
    path: 'patrones',
    title: 'routes.patrones.title',
    loadComponent: () => import('./features/patrones/patrones').then((m) => m.Patrones),
  },
  {
    path: 'editor',
    title: 'routes.editor.title',
    loadComponent: () => import('./features/editor/editor').then((m) => m.Editor),
  },
  {
    path: 'lab',
    title: 'routes.lab.title',
    loadComponent: () => import('./features/lab/lab').then((m) => m.Lab),
  },
  {
    path: 'docs',
    loadComponent: () => import('./features/docs/docs').then((m) => m.Docs),
    // Una sola scope para las 4 hijas: comparten el mismo tema (documentación), y las cuatro se
    // navegan entre sí sin recargar — separar en 4 scopes solo multiplicaría el round-trip de
    // `import()` sin que ninguna quede más aislada de las otras.
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
