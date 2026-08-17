import { Component, ViewChildren, QueryList, signal } from '@angular/core';
import { MaxIconComponent, CURATED_ICONS, AnimatedIconDef } from 'glyphflow';
import { MorphBench } from './morph-bench';

interface CuratedEntry {
  name: string;
  def: AnimatedIconDef;
}

/**
 * Playground mínimo: los 180 curados, cada uno con su coreografía real corriendo en el navegador.
 *
 * Consume el paquete PUBLICADO (`glyphflow@1.0.0` del registro, vía el alias en tsconfig.app.json),
 * nunca `dist/glyphflow` ni el código de projects/glyphflow. Si algo de la API pública no alcanza,
 * esta app es la que se entera — que es justo para lo que existe.
 *
 * Se usa `[iconDef]` y NO `name=`: esa es la ruta tree-shakeable, y de paso evita arrastrar el
 * registro completo de 1767 iconos a una demo que solo enseña 180.
 */
@Component({
  selector: 'app-root',
  imports: [MaxIconComponent, MorphBench],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChildren(MaxIconComponent) private icons!: QueryList<MaxIconComponent>;

  protected readonly entries: CuratedEntry[] = Object.entries(CURATED_ICONS)
    .map(([name, def]) => ({ name, def }))
    .sort((a, b) => a.name.localeCompare(b.name));

  protected readonly total = signal(this.entries.length);

  /** Repite la coreografía de UNA tarjeta. El índice del @for casa con el orden del QueryList. */
  protected repetir(index: number): void {
    this.icons.get(index)?.play();
  }

  protected repetirTodo(): void {
    for (const icon of this.icons) icon.play();
  }
}
