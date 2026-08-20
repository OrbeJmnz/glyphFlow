import { ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';
import { AnimatedIconDef, CURATED_ICONS, MaxIconComponent } from 'glyphflow';
import { MaxIconMorphComponent, morphKeyframes, type SpringConfig } from 'glyphflow/morph';
import { aIconNode } from './icon-node';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';
import { Boton } from '../../shared/ui/boton';
import { Tooltip } from '../../shared/ui/tooltip';

interface Elegido {
  nombre: string;
  def: AnimatedIconDef;
}

/**
 * Picker + secuencias de morph: elige cualquier par (o cadena de 3+) y corre el core sobre ESA
 * selección, en vivo. No es motor nuevo — es exponer `buildPlan()` a input arbitrario del usuario
 * en lugar de a los 4 pares fijos del benchmark.
 *
 * Alcance deliberado: el picker ofrece los 180 CURADOS, no los 1767. `ANIMATED_ICONS` arrastraría
 * el registro completo al bundle del playground (~94KB gzip) por una lista de selección — y los
 * curados ya están en el bundle porque el grid los pinta. Si algún día hace falta el set completo,
 * es una decisión de peso a tomar a propósito, no un efecto colateral de este panel.
 */
@Component({
  selector: 'app-morph-picker',
  imports: [MaxIconComponent, MaxIconMorphComponent, CampoBusqueda, Boton, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './morph-picker.html',
  styleUrl: './morph-picker.css',
})
export class MorphPicker implements OnDestroy {
  /**
   * Mismo amortiguamiento crítico que `smooth` (ζ = c/(2√k) ≈ 1, sin rebote) pero con la rigidez a
   * un cuarto: el tiempo de asentamiento de un resorte crítico escala con 1/√k, así que k/4 ≈ el
   * doble de lento, MISMO carácter. Se pide "más lenta", no "más rebote" — `bouncy`/`snappy` habrían
   * cambiado la forma de la curva, no solo su duración.
   */
  protected readonly resorteLento: SpringConfig = { k: 42, c: 13 };

  private readonly todos: Elegido[] = Object.entries(CURATED_ICONS)
    .map(([nombre, def]) => ({ nombre, def }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  protected readonly filtro = signal('');
  protected readonly secuencia = signal<Elegido[]>([]);
  protected readonly indiceActual = signal(0);
  protected readonly corriendo = signal(false);

  private temporizadores: ReturnType<typeof setTimeout>[] = [];

  protected readonly resultados = computed(() => {
    const q = this.filtro().trim().toLowerCase();
    const base = q ? this.todos.filter((i) => i.nombre.includes(q)) : this.todos;
    return base.slice(0, 60);
  });

  /** El icono que el componente muestra ahora. Cambiarlo ES lo que dispara el morph. */
  protected readonly iconoActual = computed<AnimatedIconDef | null>(() => {
    const s = this.secuencia();
    return s.length ? s[Math.min(this.indiceActual(), s.length - 1)].def : null;
  });

  protected readonly pares = computed(() => {
    const s = this.secuencia();
    return s.length >= 2 ? s.slice(1).map((x, i) => `${s[i].nombre} → ${x.nombre}`) : [];
  });

  protected agregar(item: Elegido): void {
    this.detener();
    this.secuencia.update((s) => [...s, item]);
    this.indiceActual.set(this.secuencia().length - 1);
  }

  protected quitar(indice: number): void {
    this.detener();
    this.secuencia.update((s) => s.filter((_, i) => i !== indice));
    this.indiceActual.set(0);
  }

  protected limpiar(): void {
    this.detener();
    this.secuencia.set([]);
    this.indiceActual.set(0);
  }

  /**
   * Encadena los pares consecutivos en SERIE — mismo patrón de orquestación que "Repetir todo"
   * del grid, solo que en serie en vez de en paralelo. El tiempo de cada salto sale de
   * `morphKeyframes().duracion` (el resorte manda, aquí `resorteLento`), no de un número inventado.
   * Mismo resorte que el `<max-icon-morph>` del lienzo — si no calzaran, el temporizador dispararía
   * el siguiente paso antes o después de que la animación real termine.
   */
  protected reproducir(): void {
    const s = this.secuencia();
    if (s.length < 2) return;
    this.detener();
    this.corriendo.set(true);
    this.indiceActual.set(0);

    let acumulado = 0;
    for (let i = 1; i < s.length; i++) {
      const { duracion } = morphKeyframes(aIconNode(s[i - 1].def), aIconNode(s[i].def), {
        spring: this.resorteLento,
      });
      acumulado += duracion;
      const paso = i;
      this.temporizadores.push(
        setTimeout(() => {
          this.indiceActual.set(paso);
          if (paso === s.length - 1) this.corriendo.set(false);
        }, acumulado - duracion),
      );
    }
  }

  protected detener(): void {
    for (const t of this.temporizadores) clearTimeout(t);
    this.temporizadores = [];
    this.corriendo.set(false);
  }

  ngOnDestroy(): void {
    this.detener();
  }
}
