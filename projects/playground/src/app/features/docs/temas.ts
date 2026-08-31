import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { GfIconComponent, bellIcon } from 'glyphflow';

@Component({
  selector: 'app-docs-temas',
  imports: [TranslocoPipe, GfIconComponent],
  templateUrl: './temas.html',
  styleUrl: './docs-page.css',
})
export class Temas {
  /** El mismo icono en las dos demos: lo que cambia es el color/tamaño heredado, no la forma. */
  protected readonly iconoDemo = bellIcon;
}
