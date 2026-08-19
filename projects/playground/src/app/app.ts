import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaxIconComponent, workflowIcon, type AnimatedIconDef } from 'glyphflow';
import { escalaDuracion, PRESETS_ESCALA } from './core/duration-scale';

/**
 * Shell del playground: navegación, control global de velocidad y el outlet. Nada de contenido.
 *
 * Los chips de velocidad viven AQUÍ y no en el showcase porque `durationScale` es config global
 * (`provideMaxIcons`): gobierna las coreografías de `<max-icon>` y las transiciones de
 * `<max-icon-morph>` por igual. Ponerlos dentro de una página sugeriría que solo aplican ahí.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MaxIconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /** El glifo de la marca. `trigger="group"` lo cuelga del hover del header entero. */
  protected readonly glifo: AnimatedIconDef = workflowIcon;
  protected readonly presets = PRESETS_ESCALA;
  protected readonly escala = escalaDuracion;
}
