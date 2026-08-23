import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import docsEn from '../../../i18n/docs/en.json';
import { Rutas, type RutaId } from '../../core/rutas';

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
  /**
   * El índice guarda el ID de cada página, no su ruta: el slug cambia con el idioma
   * (`getting-started` ↔ `empezando`) y lo resuelve `Rutas` contra el activo. Los enlaces siguen
   * siendo RELATIVOS, así que el prefijo de idioma lo pone la ruta padre y no se repite aquí.
   */
  protected readonly rutas = inject(Rutas);

  /** El título y la nota son CLAVES, no texto — la plantilla las resuelve con el pipe. */
  protected readonly secciones: { id: RutaId; tituloClave: string; notaClave: string }[] = [
    {
      id: 'empezando',
      tituloClave: 'docs.nav.empezando.titulo',
      notaClave: 'docs.nav.empezando.nota',
    },
    {
      id: 'accesibilidad',
      tituloClave: 'docs.nav.accesibilidad.titulo',
      notaClave: 'docs.nav.accesibilidad.nota',
    },
    { id: 'ssr', tituloClave: 'docs.nav.ssr.titulo', notaClave: 'docs.nav.ssr.nota' },
    { id: 'api', tituloClave: 'docs.nav.api.titulo', notaClave: 'docs.nav.api.nota' },
  ];
}
