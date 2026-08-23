import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { SNIPPET_DECORATIVO_VS_SEMANTICO } from './snippets';

@Component({
  selector: 'app-docs-accesibilidad',
  imports: [TranslocoPipe, BloqueCodigo],
  templateUrl: './accesibilidad.html',
  styleUrl: './docs-page.css',
})
export class Accesibilidad {
  /** Los snippets viven en `snippets.ts`, en texto plano. Ver su cabecera. */
  protected readonly SNIPPET_DECORATIVO_VS_SEMANTICO = SNIPPET_DECORATIVO_VS_SEMANTICO;
}
