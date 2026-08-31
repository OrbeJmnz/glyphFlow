import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { Recuadro } from '../../shared/ui/recuadro';
import { SNIPPET_GUARDIA_WINDOW } from './snippets';

@Component({
  selector: 'app-docs-ssr',
  imports: [TranslocoPipe, BloqueCodigo, Recuadro],
  templateUrl: './ssr.html',
  styleUrl: './docs-page.css',
})
export class Ssr {
  /** Los snippets viven en `snippets.ts`, en texto plano. Ver su cabecera. */
  protected readonly SNIPPET_GUARDIA_WINDOW = SNIPPET_GUARDIA_WINDOW;
}
