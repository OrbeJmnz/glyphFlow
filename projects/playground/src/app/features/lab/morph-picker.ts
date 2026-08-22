import { ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { AnimatedIconDef, CURATED_ICONS, ICON_ALIASES, MaxIconComponent } from 'glyphflow';
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
 * Alcance deliberado: el picker ofrece los CURADOS, no el catálogo completo. `ANIMATED_ICONS` arrastraría
 * el registro completo al bundle del playground (~94KB gzip) por una lista de selección — y los
 * curados ya están en el bundle porque el grid los pinta. Si algún día hace falta el set completo,
 * es una decisión de peso a tomar a propósito, no un efecto colateral de este panel.
 */
@Component({
  selector: 'app-morph-picker',
  imports: [MaxIconComponent, MaxIconMorphComponent, CampoBusqueda, Boton, Tooltip, TranslocoPipe],
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
  /** Reposo → corriendo, cada uno su clave — mismo patrón que el botón de enviar de patrones.ts. */
  private readonly claveReproducir = computed(() =>
    this.corriendo() ? 'lab.morphPicker.reproducir.corriendo' : 'lab.morphPicker.reproducir.reposo',
  );
  protected readonly etiquetaReproducir = translateSignal(this.claveReproducir);

  private temporizadores: ReturnType<typeof setTimeout>[] = [];

  /**
   * Nombre viejo de Lucide → nombre actual, para que quien busque `alert-triangle` encuentre
   * `triangle-alert` en vez de una lista vacía.
   */
  private readonly porAlias = new Map<string, string>(Object.entries(ICON_ALIASES));

  /**
   * Sin `slice`: se ofrecen todos. El corte anterior en 60 era invisible — la lista tiene
   * `max-height` con scroll, así que 60-de-899 se veía igual que 60-de-60 y el usuario llegaba al
   * fondo creyendo que el catálogo terminaba en `axis-3d`. Un picker que solo sirve si ya sabes el
   * nombre del icono no es un picker.
   */
  protected readonly resultados = computed(() => {
    const q = this.filtro().trim().toLowerCase();
    if (!q) return this.todos;
    const canonico = this.porAlias.get(q);
    return this.todos.filter((i) => i.nombre.includes(q) || (canonico && i.nombre === canonico));
  });

  /** Derivado, nunca a mano: el placeholder que decía «180» llevaba 719 iconos de retraso. */
  protected readonly totalCurados = this.todos.length;

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
   * `morphKeyframes().duration` (el resorte manda, aquí `resorteLento`), no de un número inventado.
   * Mismo resorte que el `<max-icon-morph>` del lienzo — si no calzaran, el temporizador dispararía
   * el siguiente paso antes o después de que la animación real termine.
   */
  protected reproducir(): void {
    const s = this.secuencia();
    if (s.length < 2) return;
    this.detener();
    this.corriendo.set(true);
    this.indiceActual.set(0);

    // Dos relojes distintos y por eso van en timers separados: cada paso se DISPARA cuando arranca
    // su tramo (`acumulado - duracion`), pero la secuencia TERMINA cuando el último tramo acaba
    // (`acumulado`). Apagar `corriendo` en el disparo del último paso —como estaba— soltaba el
    // botón una duración completa antes de tiempo: la etiqueta volvía a «play» con el morph a media
    // máquina y dejaba re-disparar encima de la animación en curso.
    let acumulado = 0;
    for (let i = 1; i < s.length; i++) {
      const { duracion } = morphKeyframes(aIconNode(s[i - 1].def), aIconNode(s[i].def), {
        spring: this.resorteLento,
      });
      acumulado += duracion;
      const paso = i;
      this.temporizadores.push(setTimeout(() => this.indiceActual.set(paso), acumulado - duracion));
    }
    this.temporizadores.push(setTimeout(() => this.corriendo.set(false), acumulado));
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
