import { Component, DOCUMENT, DestroyRef, effect, inject } from '@angular/core';
import { TranslocoPipe, TranslocoService, translateObjectSignal } from '@jsverse/transloco';
import { howToDe } from '../../core/datos-estructurados';
import type { Idioma } from '../../core/idioma';
import { fijarJsonLd } from '../../core/json-ld';
import { ruta } from '../../core/rutas';
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

  /**
   * Instalar y pintar el primer icono son pasos de verdad: se declaran como `HowTo` con los textos que se ven y el comando de instalación. Se lee de las
   * traducciones para que siga al idioma y llegue ya en el HTML prerenderizado.
   */
  constructor() {
    const doc = inject(DOCUMENT, { optional: true });
    if (!doc) return;
    const transloco = inject(TranslocoService);
    const textos = translateObjectSignal('docs.empezando');
    effect(() => {
      const t = textos() as Record<string, Record<string, string> | string>;
      const instalar = t['instalar'] as Record<string, string> | undefined;
      const primero = t['primerIcono'] as Record<string, string> | undefined;
      if (!instalar || !primero) return;
      const idioma = transloco.getActiveLang() as Idioma;
      fijarJsonLd(
        doc,
        'howto',
        howToDe(idioma, ruta(idioma, 'docs', 'empezando'), String(t['titulo'] ?? ''), String(t['bajada'] ?? ''), [
          { nombre: instalar['titulo'] ?? '', texto: `${instalar['texto'] ?? ''} ${SNIPPET_INSTALAR}` },
          { nombre: primero['titulo'] ?? '', texto: primero['texto1'] ?? '' },
        ]),
      );
    });
    inject(DestroyRef).onDestroy(() => fijarJsonLd(doc, 'howto', null));
  }
}
