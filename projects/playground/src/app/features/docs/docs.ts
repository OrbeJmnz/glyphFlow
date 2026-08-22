import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import docsEn from '../../../i18n/docs/en.json';

/** Marco de las docs: índice lateral fijo + la página. */
@Component({
  selector: 'app-docs',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslocoPipe],
  // El scope va aquí y no en la ruta: `app.routes.ts` es eager, así que su loader se resuelve en
  // un `import()` aparte que se encadena DESPUÉS de bajar este chunk — dos esperas en fila, y
  // mientras tanto el texto se pinta vacío. Declarado aquí, el idioma por defecto viaja DENTRO de
  // este chunk y llega con él. El otro sigue diferido: solo lo baja quien usa el switcher.
  providers: [
    provideTranslocoScope({
      scope: 'docs',
      loader: {
        en: () => Promise.resolve(docsEn),
        es: () => import('../../../i18n/docs/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './docs.html',
  styleUrl: './docs.css',
})
export class Docs {
  /** El título y la nota son CLAVES, no texto — la plantilla las resuelve con el pipe. */
  protected readonly secciones = [
    {
      ruta: 'empezando',
      tituloClave: 'docs.nav.empezando.titulo',
      notaClave: 'docs.nav.empezando.nota',
    },
    {
      ruta: 'accesibilidad',
      tituloClave: 'docs.nav.accesibilidad.titulo',
      notaClave: 'docs.nav.accesibilidad.nota',
    },
    { ruta: 'ssr', tituloClave: 'docs.nav.ssr.titulo', notaClave: 'docs.nav.ssr.nota' },
    { ruta: 'api', tituloClave: 'docs.nav.api.titulo', notaClave: 'docs.nav.api.nota' },
  ];
}
