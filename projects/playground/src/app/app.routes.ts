import { inject } from '@angular/core';
import type { CanActivateFn, Route, Routes } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { IDIOMAS, idiomaPreferido, type Idioma } from './core/idioma';
import { slug, traducirRuta } from './core/rutas';

/**
 * Todo va por `loadComponent`. Lo que eso compra, medido en `ng build playground`: quien entra a
 * `/en/docs/getting-started` no baja el chunk del showcase (23KB) ni el del lab (44KB).
 *
 * Lo que NO compra, y hay que decirlo: el catálogo de curados sigue en el chunk inicial.
 * `CURATED_ICONS` lo importan DOS rutas diferidas (showcase y el picker del lab), y esbuild sube a
 * la entrada lo que comparten varios chunks en vez de emitir un chunk común. Por eso `main` creció
 * de 261KB a 306KB al meter el router: el router se suma, y el catálogo no se fue.
 *
 * Sacarlo NO se puede desde aquí, y está medido: `import('glyphflow')` dinámico lo empeora a
 * 1.61 MB —al pedir el módulo entero se conserva su namespace y deja de podarse—, y un módulo
 * intermedio que re-exporte sólo `CURATED_ICONS` da 1.44 MB porque su chunk se fusiona en `main`
 * igual. Con NADIE pidiendo el registro la entrada baja a 0.37 MB, así que el peso es él.
 *
 * La causa es la forma del paquete: `fesm2022/glyphflow.mjs` es un solo archivo de 2.27 MB donde
 * el registro convive con el motor. La salida real es de la LIBRERÍA —un entry point secundario
 * para el catálogo, como ya lo es `glyphflow/morph`— o servirlo como asset JSON, igual que ya se
 * hace con `tags-catalogo.json`. Las dos son un slice propio y una decisión de Orbe.
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
 *
 * El árbol se construye DOS veces, una por idioma, desde la tabla de `core/rutas.ts`. Escribirlo a
 * mano sería mantener dos listas que tienen que decir lo mismo para siempre — y la que se olvide
 * no truena, solo deja una página sin su gemela y el `hreflang` mintiendo.
 */

/**
 * El idioma lo manda la URL, no lo que quedó guardado. Es lo que hace que `/es/patrones` compartido
 * por chat se abra en español aunque quien lo reciba haya usado el sitio en inglés — sin esto, el
 * contenido y la URL dirían cosas distintas, que es justo lo que T19 viene a matar.
 *
 * Corre como guard y no dentro del componente: así el cambio ocurre ANTES de que se instancie la
 * página, y el chunk de traducciones que Transloco pide es el correcto a la primera.
 */
const fijarIdioma =
  (idioma: Idioma): CanActivateFn =>
  () => {
    const transloco = inject(TranslocoService);
    if (transloco.getActiveLang() !== idioma) transloco.setActiveLang(idioma);
    return true;
  };

/** Las páginas de un idioma, con sus slugs ya resueltos. */
function paginas(idioma: Idioma): Routes {
  return [
    {
      path: '',
      pathMatch: 'full',
      // Sin el conteo: el titulo fino lo pone el propio componente, que ya tiene el catalogo
      // cargado. Derivarlo AQUI costaba 460KB — el router es eager y `import('glyphflow')` subia el
      // registro entero (1767 iconos) al chunk inicial. Medido: 354KB -> 813KB.
      title: 'routes.iconos.title',
      // El scope `iconos` NO se declara aquí sino en el propio componente: este archivo es eager, y
      // su loader vive en un `import()` aparte que se encadena DESPUÉS del chunk de la página.
      // Puesto en el componente, el JSON viaja DENTRO de su chunk y llega con él. Ver `iconos.ts`.
      loadComponent: () => import('./features/iconos/iconos').then((m) => m.Iconos),
    },
    {
      path: slug('patrones', idioma),
      title: 'routes.patrones.title',
      loadComponent: () => import('./features/patrones/patrones').then((m) => m.Patrones),
    },
    {
      path: slug('editor', idioma),
      title: 'routes.editor.title',
      loadComponent: () => import('./features/editor/editor').then((m) => m.Editor),
    },
    {
      path: slug('lab', idioma),
      title: 'routes.lab.title',
      loadComponent: () => import('./features/lab/lab').then((m) => m.Lab),
    },
    {
      path: slug('docs', idioma),
      loadComponent: () => import('./features/docs/docs').then((m) => m.Docs),
      // Una sola scope para las 4 hijas: comparten el mismo tema (documentación), y las cuatro se
      // navegan entre sí sin recargar — separar en 4 scopes solo multiplicaría el round-trip de
      // `import()` sin que ninguna quede más aislada de las otras.
      children: [
        { path: '', pathMatch: 'full', redirectTo: slug('empezando', idioma) },
        {
          path: slug('empezando', idioma),
          title: 'routes.docsEmpezando.title',
          loadComponent: () => import('./features/docs/empezando').then((m) => m.Empezando),
        },
        {
          path: slug('accesibilidad', idioma),
          title: 'routes.docsAccesibilidad.title',
          loadComponent: () => import('./features/docs/accesibilidad').then((m) => m.Accesibilidad),
        },
        {
          path: slug('ssr', idioma),
          title: 'routes.docsSsr.title',
          loadComponent: () => import('./features/docs/ssr').then((m) => m.Ssr),
        },
        {
          path: slug('api', idioma),
          title: 'routes.docsApi.title',
          loadComponent: () => import('./features/docs/api').then((m) => m.Api),
        },
        {
          path: slug('migracion', idioma),
          title: 'routes.docsMigracion.title',
          loadComponent: () => import('./features/docs/migracion').then((m) => m.Migracion),
        },
        {
          path: slug('comparativa', idioma),
          title: 'routes.docsComparativa.title',
          loadComponent: () => import('./features/docs/comparativa').then((m) => m.Comparativa),
        },
        {
          path: slug('verificar', idioma),
          title: 'routes.docsVerificar.title',
          loadComponent: () => import('./features/docs/verificar').then((m) => m.Verificar),
        },
        {
          path: slug('problemas', idioma),
          title: 'routes.docsProblemas.title',
          loadComponent: () => import('./features/docs/problemas').then((m) => m.Problemas),
        },
        {
          path: slug('temas', idioma),
          title: 'routes.docsTemas.title',
          loadComponent: () => import('./features/docs/temas').then((m) => m.Temas),
        },
      ],
    },
    // Relativo al prefijo: `/en/basura` cae en `/en`, no en la portada del otro idioma.
    { path: '**', redirectTo: '' },
  ];
}

/** La rama de un idioma: su prefijo, su guard y sus páginas. */
function rama(idioma: Idioma): Route {
  return {
    path: idioma,
    // Factory y no un guard fijo que lea `route.data`: así el idioma es un ARGUMENTO obligatorio.
    // Con `data` una rama nueva que olvide declararlo compila igual y activa `undefined` en
    // silencio — que es exactamente la cicatriz de los guards con default.
    canActivate: [fijarIdioma(idioma)],
    children: paginas(idioma),
  };
}

export const routes: Routes = [
  ...IDIOMAS.map(rama),
  // `/` no es una página: es el único punto donde la elección guardada decide, porque no hay URL
  // que la contradiga. Sin nada guardado cae en inglés, que es el default por tráfico.
  { path: '', pathMatch: 'full', redirectTo: () => `/${idiomaPreferido()}` },
  /*
   * Las rutas viejas sin prefijo (`/patterns`, `/docs/api`…) las atiende Vercel con un 301 de
   * verdad — ver `vercel.json`. Esto es la red de abajo: en `ng serve` no hay redirecciones de
   * servidor, y sin esto el dev vería un comportamiento distinto al de producción justo en las
   * URLs que más se van a teclear a mano.
   */
  {
    path: '**',
    redirectTo: ({ url, queryParams, fragment }) => {
      const camino = '/' + url.map((s) => s.path).join('/');
      // Query y fragmento se rearman a mano: el 301 de Vercel los conserva por su cuenta, y sin
      // esto `ng serve` se los comería. El síntoma sería un ancla compartida (`#api-…`) que
      // funciona en producción y no en local — se leería como si el enlace estuviera roto.
      const query = new URLSearchParams(queryParams as Record<string, string>).toString();
      const cola = (query ? `?${query}` : '') + (fragment ? `#${fragment}` : '');
      return traducirRuta(camino + cola, idiomaPreferido());
    },
  },
];
