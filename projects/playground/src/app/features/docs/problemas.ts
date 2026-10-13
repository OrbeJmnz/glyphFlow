import { Component, DOCUMENT, DestroyRef, effect, inject } from '@angular/core';
import { TranslocoPipe, TranslocoService, translateObjectSignal } from '@jsverse/transloco';
import { faqDe } from '../../core/datos-estructurados';
import { fijarJsonLd } from '../../core/json-ld';
import { ruta } from '../../core/rutas';
import type { Idioma } from '../../core/idioma';

@Component({
  selector: 'app-docs-problemas',
  imports: [TranslocoPipe],
  templateUrl: './problemas.html',
  styleUrl: './docs-page.css',
})
export class Problemas {
  /**
   * Cada problema de la página es una pregunta con su respuesta: se declara como `FAQPage` con LOS MISMOS textos que se ven (sin contenido aparte).
   * Se lee de las traducciones y no de la plantilla para que siga al idioma y llegue ya en el HTML prerenderizado.
   */
  constructor() {
    const doc = inject(DOCUMENT, { optional: true });
    if (!doc) return;
    const transloco = inject(TranslocoService);
    const textos = translateObjectSignal('docs.problemas');
    effect(() => {
      const t = textos() as Record<string, Record<string, string>>;
      if (!t['noAnima']) return;
      const idioma = transloco.getActiveLang() as Idioma;
      const parte = (k: string, ...campos: string[]): { pregunta: string; respuesta: string[] } => ({
        pregunta: t[k]?.['titulo'] ?? '',
        respuesta: campos.map((c) => t[k]?.[c] ?? ''),
      });
      fijarJsonLd(
        doc,
        'faq',
        faqDe(idioma, ruta(idioma, 'docs', 'problemas'), [
          parte('noAnima', 'texto', 'reducido', 'trigger', 'variante'),
          parte('morphRaro', 'texto', 'queHacer'),
          parte('nameVacio', 'texto'),
          parte('ssr', 'texto', 'nota'),
        ]),
      );
    });
    // Al salir de la página el FAQ no puede quedarse en el `<head>` de otra.
    inject(DestroyRef).onDestroy(() => fijarJsonLd(doc, 'faq', null));
  }
}
