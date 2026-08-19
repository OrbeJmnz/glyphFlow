import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/** Marco de las docs: índice lateral fijo + la página. */
@Component({
  selector: 'app-docs',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './docs.html',
  styleUrl: './docs.css',
})
export class Docs {
  protected readonly secciones = [
    { ruta: 'empezando', titulo: 'Empezando', nota: 'instalar y pintar el primer icono' },
    { ruta: 'accesibilidad', titulo: 'Accesibilidad', nota: 'una regla, no una matriz' },
    { ruta: 'ssr', titulo: 'SSR', nota: 'render sin window' },
    { ruta: 'api', titulo: 'API', nota: 'la superficie pública completa' },
  ];
}
