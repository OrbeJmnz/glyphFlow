import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/** Marco de las docs: índice lateral fijo + la página. */
@Component({
  selector: 'app-docs',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslocoPipe],
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
