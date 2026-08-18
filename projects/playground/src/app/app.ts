import { Component, ViewChildren, QueryList, signal, computed } from '@angular/core';
import { MaxIconComponent, CURATED_ICONS, AnimatedIconDef } from 'glyphflow';
import { MorphBench } from './morph-bench';
import { IconDetailPanel } from './icon-detail-panel';
import { IconImport } from './icon-import';
import { MorphPicker } from './morph-picker';
import { insigniasDe, type ClaveInsignia, type Insignia } from './icon-badges';
import { escalaDuracion, PRESETS_ESCALA } from './duration-scale';

interface CuratedEntry {
  name: string;
  def: AnimatedIconDef;
  /** Lo que distingue a ESTA tarjeta de las otras 179. Vacío en la mayoría, y está bien. */
  insignias: Insignia[];
}

/**
 * Playground mínimo: los 180 curados, cada uno con su coreografía real corriendo en el navegador.
 *
 * Consume el paquete PUBLICADO (`glyphflow` del registro, vía el alias en tsconfig.paths.json),
 * nunca `dist/glyphflow` ni el código de projects/glyphflow. Si algo de la API pública no alcanza,
 * esta app es la que se entera — que es justo para lo que existe.
 *
 * Se usa `[iconDef]` y NO `name=`: esa es la ruta tree-shakeable, y de paso evita arrastrar el
 * registro completo de 1767 iconos a una demo que solo enseña 180.
 */
@Component({
  selector: 'app-root',
  imports: [MaxIconComponent, MorphBench, IconDetailPanel, IconImport, MorphPicker],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChildren(MaxIconComponent) private icons!: QueryList<MaxIconComponent>;

  private readonly todos: CuratedEntry[] = Object.entries(CURATED_ICONS)
    .map(([name, def]) => ({ name, def, insignias: insigniasDe(name, def) }))
    .sort((a, b) => a.name.localeCompare(b.name));

  protected readonly total = this.todos.length;

  /** Filtro por insignia. `null` = sin filtrar, que es el estado normal. */
  protected readonly filtro = signal<ClaveInsignia | null>(null);

  /**
   * Cuántos iconos trae cada insignia — el número va en el propio botón del filtro.
   *
   * Campo plano, no `computed`: el catálogo es estático, así que esto se calcula una vez y no
   * depende de ninguna señal. Envolverlo en `computed` fingiría una reactividad que no existe —
   * `entries` sí la tiene, y el contraste entre los dos es la señal de cuál reacciona a qué.
   */
  protected readonly conteos: { clave: ClaveInsignia; etiqueta: string; n: number }[] = (
    [
      { clave: 'extras', etiqueta: 'con variante extra' },
      { clave: 'held', etiqueta: 'held' },
      { clave: 'solo-draw', etiqueta: 'solo trazo' },
    ] as { clave: ClaveInsignia; etiqueta: string }[]
  )
    .map((o) => ({ ...o, n: this.todos.filter((e) => tiene(e, o.clave)).length }))
    .filter((o) => o.n > 0);

  protected readonly entries = computed<CuratedEntry[]>(() => {
    const f = this.filtro();
    return f ? this.todos.filter((e) => tiene(e, f)) : this.todos;
  });

  protected readonly presets = PRESETS_ESCALA;
  protected readonly escala = escalaDuracion;

  /** Icono bajo inspección en el Motion Inspector. `null` = panel cerrado. */
  protected readonly inspeccionado = signal<CuratedEntry | null>(null);

  protected alternarFiltro(clave: ClaveInsignia): void {
    this.filtro.update((actual) => (actual === clave ? null : clave));
  }

  /**
   * Repite la coreografía de UNA tarjeta. El índice del `@for` casa con el orden del QueryList
   * porque ambos recorren `entries()` — por eso el filtro reordena las dos cosas a la vez.
   */
  protected repetir(index: number): void {
    this.icons.get(index)?.play();
  }

  protected repetirTodo(): void {
    for (const icon of this.icons) icon.play();
  }

  protected inspeccionar(entry: CuratedEntry): void {
    this.inspeccionado.set(entry);
  }
}

function tiene(entry: CuratedEntry, clave: ClaveInsignia): boolean {
  return entry.insignias.some((i) => i.clave === clave);
}
