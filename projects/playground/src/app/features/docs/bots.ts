import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Rutas } from '../../core/rutas.service';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { Recuadro } from '../../shared/ui/recuadro';
import { GESTOS, PESOS } from '../bots/bots-datos';
import { FILAS_TRADUCCION } from './bots-traduccion';
import {
  SNIPPET_BOTS_INICIO,
  SNIPPET_BOTS_GESTOS,
  SNIPPET_BOTS_PERSONALIZAR,
  SNIPPET_BOTS_PIEL,
  SNIPPET_BOTS_IA_VERCEL,
  SNIPPET_BOTS_IA_ANTHROPIC,
  SNIPPET_BOTS_PUNTERO,
  SNIPPET_INSTALAR,
} from './snippets';

/** Los ocho pasos del modo IA, en el orden en que suelen ocurrir. Los textos viven en `docs.bots.ia.pasos`. */
const PASOS = ['prompt', 'thinking', 'tool', 'loading', 'writing', 'done', 'error', 'idle'] as const;

/**
 * `/docs/bots`: la guía pública de `glyphflow/bots`. Lo que se puede derivar NO se escribe a mano: los pesos salen de `PESOS` (que
 * `bundle-check` compara con lo medido), la lista de gestos de `GESTOS` y la tabla «qué ve el bot por cada evento» de correr los
 * adaptadores de verdad (`bots-traduccion.ts`). Lo único que sí es prosa es el porqué.
 */
@Component({
  selector: 'app-docs-bots',
  imports: [TranslocoPipe, RouterLink, BloqueCodigo, Recuadro],
  templateUrl: './bots.html',
  styleUrl: './docs-page.css',
})
export class BotsDocs {
  protected readonly rutas = inject(Rutas);
  protected readonly pesos = PESOS;
  protected readonly gestos = GESTOS.map((g) => g.id);
  protected readonly pasos = PASOS;
  protected readonly filas = FILAS_TRADUCCION;

  protected readonly SNIPPET_INSTALAR = SNIPPET_INSTALAR;
  protected readonly SNIPPET_BOTS_INICIO = SNIPPET_BOTS_INICIO;
  protected readonly SNIPPET_BOTS_GESTOS = SNIPPET_BOTS_GESTOS;
  protected readonly SNIPPET_BOTS_PERSONALIZAR = SNIPPET_BOTS_PERSONALIZAR;
  protected readonly SNIPPET_BOTS_PIEL = SNIPPET_BOTS_PIEL;
  protected readonly SNIPPET_BOTS_IA_VERCEL = SNIPPET_BOTS_IA_VERCEL;
  protected readonly SNIPPET_BOTS_IA_ANTHROPIC = SNIPPET_BOTS_IA_ANTHROPIC;
  protected readonly SNIPPET_BOTS_PUNTERO = SNIPPET_BOTS_PUNTERO;
}
