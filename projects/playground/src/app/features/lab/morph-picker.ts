import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  PendingTasks,
  computed,
  linkedSignal,
  inject,
  signal,
} from '@angular/core';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import {
  AnimatedIconDef,
  GfIconComponent,
  bellIcon,
  bellRingIcon,
  circleIcon,
  heartIcon,
  squareIcon,
  starIcon,
  userIcon,
  userRoundIcon,
} from 'glyphflow';
import { cargarAlias, cargarCurados } from '../../core/catalogo';
import { GfIconMorphComponent, morphKeyframes, correspondenceIsPoor } from 'glyphflow/morph';
import { aIconNode } from './icon-node';
import { MorphScrubber, RESORTE_LENTO } from './morph-scrubber';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';
import { Boton } from '../../shared/ui/boton';
import { Tooltip } from '../../shared/ui/tooltip';
import { Visible } from '../../shared/ui/visible';

interface Elegido {
  nombre: string;
  def: AnimatedIconDef;
}

/**
 * Cadena de arranque: los mismos 8 iconos (4 pares) que el benchmark ya valida, no una
 * combinación arbitraria. Mismo criterio que la referencia (morphicons.com): el picker no arranca
 * vacío — muestra de entrada que se puede quitar icono por icono, sin ocultar que también se arma
 * la propia desde cero con el buscador.
 */
const SECUENCIA_INICIAL: Elegido[] = [
  { nombre: 'bell', def: bellIcon },
  { nombre: 'bell-ring', def: bellRingIcon },
  { nombre: 'heart', def: heartIcon },
  { nombre: 'star', def: starIcon },
  { nombre: 'circle', def: circleIcon },
  { nombre: 'square', def: squareIcon },
  { nombre: 'user', def: userIcon },
  { nombre: 'user-round', def: userRoundIcon },
];

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
  imports: [
    GfIconComponent,
    GfIconMorphComponent,
    MorphScrubber,
    CampoBusqueda,
    Boton,
    Tooltip,
    TranslocoPipe,
    Visible,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './morph-picker.html',
  styleUrl: './morph-picker.css',
})
export class MorphPicker implements OnDestroy {
  /**
   * Mismo resorte que usa `MorphScrubber` — compartido desde ahí para que arrastrar el deslizador
   * de un tramo se sienta igual de lento que reproducir la cadena completa del mismo par.
   */
  protected readonly resorteLento = RESORTE_LENTO;

  /**
   * El catálogo llega DIFERIDO, no en el chunk de esta página.
   *
   * `CURATED_ICONS` importado de forma estática desde una ruta diferida acaba en el bundle
   * INICIAL —esbuild sube a la entrada lo que alcanzan varios chunks—, y con el catálogo curado
   * entero eso son 1.05 MB que baja hasta quien sólo abre Docs. Medido: 1.43 MB de entrada contra
   * 373 KB sin él. Con `import()` se va a su propio chunk y sólo lo pide quien abre esta pantalla.
   *
   * Arranca vacío y se llena al resolver: la lista tiene su propio scroll y un instante en blanco
   * ahí no rompe nada.
   */
  private readonly todos = signal<Elegido[]>([]);

  protected readonly filtro = signal('');
  protected readonly secuencia = signal<Elegido[]>(SECUENCIA_INICIAL);
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
  private readonly porAlias = signal(new Map<string, string>());

  constructor() {
    // `PendingTasks.run` y no un `then` suelto: registra la carga como trabajo pendiente de la
    // aplicación, y de eso dependen el PRERENDER —que serializaría antes de que llegue el
    // catálogo— y el `whenStable()` de los tests.
    const pendientes = inject(PendingTasks);
    pendientes.run(() =>
      cargarCurados().then((curados) => {
        this.todos.set(
          Object.entries(curados)
            .map(([nombre, def]) => ({ nombre, def }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre)),
        );
      }),
    );
    pendientes.run(() =>
      cargarAlias().then((alias) => this.porAlias.set(new Map(Object.entries(alias)))),
    );
  }

  /**
   * Sin `slice`: se ofrecen todos. El corte anterior en 60 era invisible — la lista tiene
   * `max-height` con scroll, así que 60-de-899 se veía igual que 60-de-60 y el usuario llegaba al
   * fondo creyendo que el catálogo terminaba en `axis-3d`. Un picker que solo sirve si ya sabes el
   * nombre del icono no es un picker.
   */
  protected readonly resultados = computed(() => {
    const todos = this.todos();
    const q = this.filtro().trim().toLowerCase();
    if (!q) return todos;
    const canonico = this.porAlias().get(q);
    return todos.filter((i) => i.nombre.includes(q) || (canonico && i.nombre === canonico));
  });

  /** Derivado, nunca a mano: el placeholder que decía «180» llevaba 719 iconos de retraso. */
  protected readonly totalCurados = computed(() => this.todos().length);

  /**
   * Se monta un TRAMO de `resultados()`, que crece al llegar al final.
   *
   * El comentario de arriba rechazaba cortar, y tenía razón con el corte que había: 60 de 899
   * dentro de una lista con scroll propio se veía igual que 60 de 60, y quien llegaba al fondo
   * concluía que el catálogo terminaba en `axis-3d`. Este corte es lo contrario de invisible —
   * dice cuántos faltan y hay un botón para traerlos—, y lo que compra está medido: 1 767 botones
   * son 16 289 nodos de golpe.
   *
   * Al buscar vuelve al principio: la lista de detrás es otra.
   */
  private static readonly TRAMO = 120;
  protected readonly montados = linkedSignal({
    source: this.resultados,
    computation: () => MorphPicker.TRAMO,
  });

  protected readonly visibles = computed(() => this.resultados().slice(0, this.montados()));
  protected readonly hayMas = computed(() => this.resultados().length > this.montados());

  protected montarMas(): void {
    this.montados.update((n) => n + MorphPicker.TRAMO);
  }

  /** El icono que el componente muestra ahora. Cambiarlo ES lo que dispara el morph. */
  protected readonly iconoActual = computed<AnimatedIconDef | null>(() => {
    const s = this.secuencia();
    return s.length ? s[Math.min(this.indiceActual(), s.length - 1)].def : null;
  });

  /**
   * Por cada tramo de la cadena (posición 0 no tiene "antes", siempre `false`), si ESE par cae en
   * modo fundido — mismo criterio (`correspondenceIsPoor`) que ya decide `morphKeyframes`/
   * `createLiveMorph`, no un cálculo aparte. `buildPlan` está medido sub-ms (ver `morphAt`), así
   * que recalcularlo en cada cambio de la cadena no pesa.
   */
  protected readonly calidadCadena = computed<boolean[]>(() => {
    const s = this.secuencia();
    const out: boolean[] = [false];
    for (let i = 1; i < s.length; i++) {
      const { plan } = morphKeyframes(aIconNode(s[i - 1].def), aIconNode(s[i].def));
      out.push(correspondenceIsPoor(plan));
    }
    return out;
  });

  /**
   * El tramo (par consecutivo) que se está recorriendo a mano con el scrubber, en vez de
   * reproducirse solo. `null` = lienzo en vivo de siempre.
   */
  protected readonly tramoActivo = signal<{ origen: Elegido; destino: Elegido } | null>(null);

  /**
   * Clic en un icono de la cadena en posición `indice` lo vuelve el DESTINO del tramo activo
   * (`indice-1 → indice`); el índice 0 no tiene "antes" y no hace nada. Clic otra vez sobre el
   * mismo destino lo CIERRA — toggle, no acumulación de tramos.
   */
  protected elegirTramo(indice: number): void {
    if (indice === 0) return;
    const s = this.secuencia();
    const destino = s[indice];
    const yaActivo = this.tramoActivo()?.destino === destino;
    this.detener();
    this.tramoActivo.set(yaActivo ? null : { origen: s[indice - 1], destino });
  }

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
   * Mismo botón hace de play y de stop: si ya está corriendo, un segundo clic la detiene. Con la
   * secuencia en loop (ver `programarVuelta`) no hay un final natural que la apague sola — sin
   * esto, la única forma de pararla sería "limpiar", que además borra toda la cadena.
   */
  protected reproducir(): void {
    if (this.corriendo()) {
      this.detener();
      return;
    }
    const s = this.secuencia();
    if (s.length < 2) return;
    this.corriendo.set(true);
    this.programarVuelta(s);
  }

  /**
   * Encadena los pares consecutivos en SERIE — mismo patrón de orquestación que "Repetir todo"
   * del grid, solo que en serie en vez de en paralelo. El tiempo de cada salto sale de
   * `morphKeyframes().duration` (el resorte manda, aquí `resorteLento`), no de un número inventado.
   * Mismo resorte que el `<gf-icon-morph>` del lienzo — si no calzaran, el temporizador dispararía
   * el siguiente paso antes o después de que la animación real termine.
   *
   * Al llegar al final se vuelve a llamar a sí misma: la secuencia gira en loop (último → primero
   * → …) hasta que el usuario la detiene, no hasta que se acaba.
   *
   * Si el lienzo no estaba ya en el primer icono —la cadena recién armada con `agregar()` deja
   * viendo el ÚLTIMO agregado, y cada vuelta del loop termina en el último— el regreso a él TAMBIÉN
   * es un morph real, con su propia duración. Cicatriz real: tratarlo como gratis (retraso 0 para
   * el primer paso) hacía que el siguiente tramo lo interrumpiera de inmediato — el regreso al
   * primer icono, y con él el primer tramo de la secuencia, nunca llegaban a verse.
   */
  private programarVuelta(s: Elegido[]): void {
    this.temporizadores = [];
    const previo = this.indiceActual();
    let acumulado = 0;
    if (previo !== 0) {
      acumulado = morphKeyframes(aIconNode(s[previo].def), aIconNode(s[0].def), {
        spring: this.resorteLento,
      }).duracion;
    }
    this.indiceActual.set(0);

    for (let i = 1; i < s.length; i++) {
      const { duracion } = morphKeyframes(aIconNode(s[i - 1].def), aIconNode(s[i].def), {
        spring: this.resorteLento,
      });
      acumulado += duracion;
      const paso = i;
      this.temporizadores.push(setTimeout(() => this.indiceActual.set(paso), acumulado - duracion));
    }
    this.temporizadores.push(setTimeout(() => this.programarVuelta(s), acumulado));
  }

  protected detener(): void {
    for (const t of this.temporizadores) clearTimeout(t);
    this.temporizadores = [];
    this.corriendo.set(false);
    // Cierra el scrubber de tramo: "Reproducir" juega la cadena por el lienzo en vivo, no por
    // ahí, y agregar/quitar/limpiar pueden dejarlo apuntando a un índice que ya no existe.
    this.tramoActivo.set(null);
  }

  ngOnDestroy(): void {
    this.detener();
  }
}
