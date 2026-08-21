import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { IconImport } from './icon-import';
import { MorphPicker } from './morph-picker';
import { MorphBench } from './morph-bench';

/**
 * Las herramientas de autoría, juntas y fuera del showcase.
 *
 * Nada de esto es producto: son arneses para DECIDIR mirando las cosas juntas (cuántos pasos, qué
 * hacer con la cola del resorte, cómo se ve un par arbitrario). Mezclarlos con el catálogo hacía
 * que la página de entrada pareciera un tablero de depuración.
 */
@Component({
  selector: 'app-lab',
  imports: [IconImport, MorphPicker, MorphBench, TranslocoPipe],
  templateUrl: './lab.html',
  styleUrl: './lab.css',
})
export class Lab {}
