import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { CURATED_ICONS, type AnimatedIconDef, type IconShape } from 'glyphflow';
import { parseD, type SubPath } from '../geometria/path-model';
import {
  dDeSubpath,
  limpiar,
  manijasDe,
  moverManija,
  moverNodo,
  nodosDe,
  type Manija,
  type Nodo,
} from '../geometria/path-edit';
import { crearHistorial } from '../geometria/historial';

const LADO = 24;

interface Curado {
  nombre: string;
  def: AnimatedIconDef;
}

/**
 * Editor de nodos: arrastra los puntos de un `d` y mira el resultado en vivo.
 *
 * La matemática vive en `geometria/`, probada aparte sobre los 450 paths del catálogo. Este
 * componente solo hace tres cosas: convertir coordenadas de pantalla a unidades del viewBox,
 * mandar el delta, y pintar.
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.html',
  styleUrl: './editor.css',
  // El atajo va en el host y no en un `div` del template: Ctrl+Z es global, no una interacción de
  // ese elemento. Colgarlo de un `div` además obligaba a hacerlo focusable para nada.
  host: { '(window:keydown)': 'atajo($event)' },
})
export class Editor {
  @ViewChild('lienzo', { static: true }) private lienzo!: ElementRef<SVGSVGElement>;

  protected readonly lado = LADO;

  private readonly curados: Curado[] = Object.entries(CURATED_ICONS)
    .map(([nombre, def]) => ({ nombre, def }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  protected readonly filtro = signal('');
  protected readonly candidatos = computed(() => {
    const q = this.filtro().trim().toLowerCase();
    return this.curados.filter((c) => !q || c.nombre.includes(q)).slice(0, 60);
  });

  protected readonly elegido = signal<Curado>(
    this.curados.find((c) => c.nombre === 'heart') ?? this.curados[0],
  );

  /**
   * Las figuras que NO son `path` se pintan pero no se editan. Decirlo es más honesto que
   * convertirlas a path por detrás: un `rect` con `rx` reescrito como cubics ya no se lee.
   */
  protected readonly otrasFiguras = computed<IconShape[]>(() =>
    this.elegido().def.shapes.filter((s) => s.tag !== 'path'),
  );

  private readonly pathsOriginales = computed<string[]>(() =>
    this.elegido()
      .def.shapes.filter(
        (s): s is IconShape & { d: string } =>
          s.tag === 'path' && typeof (s as { d?: unknown }).d === 'string',
      )
      .map((s) => s.d),
  );

  /** Estado editable: un modelo por cada `<path>` del icono. */
  protected readonly modelos = signal<SubPath[][]>([]);
  protected readonly indiceActivo = signal(0);

  protected readonly nodos = computed<Nodo[]>(() => {
    const m = this.modelos()[this.indiceActivo()];
    return m ? nodosDe(m) : [];
  });

  protected readonly manijas = computed<Manija[]>(() => {
    const m = this.modelos()[this.indiceActivo()];
    return m ? manijasDe(m) : [];
  });

  protected readonly dPorPath = computed<string[]>(() =>
    this.modelos().map((subs) => subs.map(dDeSubpath).join('')),
  );

  protected readonly editado = computed(() => this.dPorPath().join('\n'));
  protected readonly tocado = signal(false);

  /**
   * El historial guarda el modelo COMPLETO, no un diff. Cada entrada es una lista de objetos ya
   * inmutables — `moverNodo` nunca muta — así que la copia es de referencias, no de geometría.
   */
  private readonly historial = crearHistorial<SubPath[][]>();
  /** Señal espejo del estado de la pila: un objeto plano no dispara los `computed` al mutar. */
  protected readonly pila = signal({ deshacer: false, rehacer: false });

  private sincronizarPila(): void {
    this.pila.set({
      deshacer: this.historial.puedeDeshacer(),
      rehacer: this.historial.puedeRehacer(),
    });
  }

  protected deshacer(): void {
    const previo = this.historial.deshacer(this.modelos());
    if (!previo) return;
    this.modelos.set(previo);
    this.sincronizarPila();
  }

  protected rehacer(): void {
    const siguiente = this.historial.rehacer(this.modelos());
    if (!siguiente) return;
    this.modelos.set(siguiente);
    this.sincronizarPila();
  }

  /** Ctrl+Z / Ctrl+Shift+Z, y Ctrl+Y para quien venga de Windows. */
  protected atajo(ev: KeyboardEvent): void {
    if (!(ev.ctrlKey || ev.metaKey)) return;
    const k = ev.key.toLowerCase();
    if (k === 'z' && !ev.shiftKey) {
      ev.preventDefault();
      this.deshacer();
    } else if ((k === 'z' && ev.shiftKey) || k === 'y') {
      ev.preventDefault();
      this.rehacer();
    }
  }

  constructor() {
    this.cargar();
  }

  protected elegir(c: Curado): void {
    this.elegido.set(c);
    this.cargar();
  }

  /** Reconstruye los modelos desde el `d` original del icono elegido. */
  private cargar(): void {
    this.modelos.set(this.pathsOriginales().map((d) => parseD(d)));
    this.indiceActivo.set(0);
    this.tocado.set(false);
    this.arrastrando = null;
    // El historial del icono anterior no aplica al nuevo.
    this.historial.limpiar();
    this.sincronizarPila();
  }

  protected restablecer(): void {
    this.cargar();
  }

  // ── Arrastre ────────────────────────────────────────────────────────────────

  private arrastrando:
    | { tipo: 'nodo'; ref: Nodo; ultimo: [number, number] }
    | { tipo: 'manija'; ref: Manija; ultimo: [number, number] }
    | null = null;
  protected readonly activo = signal<Nodo | null>(null);
  protected readonly manijaActiva = signal<Manija | null>(null);

  /**
   * De coordenadas de pantalla a unidades del viewBox. Se usa el rect real del `<svg>` en vez de
   * un factor fijo porque el lienzo es responsivo: con un número quemado, el nodo se despega del
   * puntero en cuanto cambia el ancho de la ventana.
   */
  private aViewBox(ev: PointerEvent): [number, number] {
    const r = this.lienzo.nativeElement.getBoundingClientRect();
    return [((ev.clientX - r.left) / r.width) * LADO, ((ev.clientY - r.top) / r.height) * LADO];
  }

  protected empezar(ev: PointerEvent, nodo: Nodo): void {
    if (!nodo.movible) return;
    ev.preventDefault();
    // `setPointerCapture`: si el puntero sale del círculo a media arrastrada — y sale siempre, es
    // de 5px — los eventos siguen llegando a este elemento en vez de perderse.
    (ev.target as Element).setPointerCapture(ev.pointerId);
    // Se abre el gesto ANTES de mover: el arrastre entero cuenta como un paso de deshacer, no uno
    // por píxel recorrido.
    this.historial.abrir(this.modelos());
    this.arrastrando = { tipo: 'nodo', ref: nodo, ultimo: this.aViewBox(ev) };
    this.activo.set(nodo);
    this.manijaActiva.set(null);
  }

  protected empezarManija(ev: PointerEvent, manija: Manija): void {
    ev.preventDefault();
    ev.stopPropagation();
    (ev.target as Element).setPointerCapture(ev.pointerId);
    this.historial.abrir(this.modelos());
    this.arrastrando = { tipo: 'manija', ref: manija, ultimo: this.aViewBox(ev) };
    this.manijaActiva.set(manija);
    this.activo.set(null);
  }

  protected mover(ev: PointerEvent): void {
    if (!this.arrastrando) return;
    const [x, y] = this.aViewBox(ev);
    const [px, py] = this.arrastrando.ultimo;
    const dx = x - px;
    const dy = y - py;
    if (dx === 0 && dy === 0) return;

    const i = this.indiceActivo();
    const gesto = this.arrastrando;
    this.modelos.update((todos) => {
      const copia = [...todos];
      copia[i] =
        gesto.tipo === 'nodo'
          ? moverNodo(copia[i], gesto.ref, dx, dy)
          : moverManija(copia[i], gesto.ref, dx, dy);
      return copia;
    });
    this.arrastrando.ultimo = [x, y];
    this.tocado.set(true);
  }

  protected terminar(): void {
    if (!this.arrastrando) return;
    // Al soltar se recortan decimales: durante el arrastre importa la precisión, al guardar no.
    const i = this.indiceActivo();
    this.modelos.update((todos) => {
      const copia = [...todos];
      copia[i] = limpiar(copia[i]);
      return copia;
    });
    this.arrastrando = null;
    this.historial.cerrar(this.modelos());
    this.sincronizarPila();
  }

  protected async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.editado());
    } catch {
      /* sin permiso: no se finge que copió */
    }
  }
}
