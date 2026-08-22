import { Component } from '@angular/core';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import labEn from '../../../i18n/lab/en.json';
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
  // El scope va aquí y no en la ruta: `app.routes.ts` es eager, así que su loader se resuelve en
  // un `import()` aparte que se encadena DESPUÉS de bajar este chunk — dos esperas en fila, y
  // mientras tanto el texto se pinta vacío. Declarado aquí, el idioma por defecto viaja DENTRO de
  // este chunk y llega con él. El otro sigue diferido: solo lo baja quien usa el switcher.
  providers: [
    provideTranslocoScope({
      scope: 'lab',
      loader: {
        en: () => Promise.resolve(labEn),
        es: () => import('../../../i18n/lab/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './lab.html',
  styleUrl: './lab.css',
})
export class Lab {}
