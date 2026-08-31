import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { Recuadro } from '../../shared/ui/recuadro';
import { CIFRAS } from '../../core/cifras';
import {
  SNIPPET_INSTALAR,
  SNIPPET_PRIMER_ICONO,
  SNIPPET_CATALOGO_POR_NOMBRE,
  SNIPPET_VELOCIDAD,
  SNIPPET_MORPH,
} from './snippets';

@Component({
  selector: 'app-docs-empezando',
  imports: [TranslocoPipe, BloqueCodigo, Recuadro],
  templateUrl: './empezando.html',
  styleUrl: './docs-page.css',
})
export class Empezando {
  /** Las cifras de bundle salen de `CIFRAS`, no escritas a mano: ya derivaron una vez. */
  protected readonly cifras = CIFRAS;

  /** Los snippets viven en `snippets.ts`, en texto plano. Ver su cabecera. */
  protected readonly SNIPPET_INSTALAR = SNIPPET_INSTALAR;
  protected readonly SNIPPET_PRIMER_ICONO = SNIPPET_PRIMER_ICONO;
  protected readonly SNIPPET_CATALOGO_POR_NOMBRE = SNIPPET_CATALOGO_POR_NOMBRE;
  protected readonly SNIPPET_VELOCIDAD = SNIPPET_VELOCIDAD;
  protected readonly SNIPPET_MORPH = SNIPPET_MORPH;
}
