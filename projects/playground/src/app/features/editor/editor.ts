import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import editorEn from '../../../i18n/editor/en.json';
import {
  CURATED_ICONS,
  ICON_ALIASES,
  GfIconComponent,
  type AnimatedIconDef,
  type IconShape,
} from 'glyphflow';
import { parseD, type SubPath } from './geometria/path-model';
import {
  dDeSubpath,
  limpiar,
  manijasDe,
  moverManija,
  insertarNodo,
  moverNodo,
  nodosDe,
  quitarNodo,
  type Manija,
  type Nodo,
} from './geometria/path-edit';
import { crearHistorial } from './geometria/historial';
import { Taller } from '../../core/taller';
import { Boton } from '../../shared/ui/boton';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';
import { Chip } from '../../shared/ui/chip';
import { Tooltip } from '../../shared/ui/tooltip';

const LADO = 24;

/** Zoom: 1 = el icono completo. No se baja de ahí porque debajo del 100% solo se ve vacío. */
const ZOOM_MIN = 1;
const ZOOM_MAX = 8;
const ZOOM_PASO = 1.35;

interface Curado {
  nombre: string;
  def: AnimatedIconDef;
}

/**
 * Un nodo listo para pintar: además de dónde está, QUÉ es. Sin esto todos los puntos se ven
 * iguales y el usuario no sabe cuál está manipulando ni por dónde abre el trazo.
 */
interface NodoVista extends Nodo {
  /** 1-based, en el orden en que se recorre el trazo. Es el número que se le enseña al usuario. */
  indice: number;
  inicio: boolean;
  /** Solo en subpaths ABIERTOS: en uno cerrado el final es el inicio y marcarlo dos veces miente. */
  fin: boolean;
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
  imports: [Boton, CampoBusqueda, Chip, GfIconComponent, Tooltip, TranslocoPipe],
  // El scope va aquí y no en la ruta: `app.routes.ts` es eager, así que su loader se resuelve en
  // un `import()` aparte que se encadena DESPUÉS de bajar este chunk — dos esperas en fila, y
  // mientras tanto el texto se pinta vacío. Declarado aquí, el idioma por defecto viaja DENTRO de
  // este chunk y llega con él. El otro sigue diferido: solo lo baja quien usa el switcher.
  providers: [
    provideTranslocoScope({
      scope: 'editor',
      loader: {
        en: () => Promise.resolve(editorEn),
        es: () => import('../../../i18n/editor/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
  // El atajo va en el host y no en un `div` del template: Ctrl+Z es global, no una interacción de
  // ese elemento. Colgarlo de un `div` además obligaba a hacerlo focusable para nada.
  host: {
    '(window:keydown)': 'atajo($event)',
    '(document:fullscreenchange)': 'sincronizarPantalla()',
  },
})
export class Editor implements OnDestroy {
  @ViewChild('lienzo', { static: true }) private lienzo!: ElementRef<SVGSVGElement>;
  /** El marco que entra a pantalla completa: el lienzo con su barra, no el `<svg>` pelón. */
  @ViewChild('zona', { static: true }) private zona!: ElementRef<HTMLElement>;

  protected readonly lado = LADO;
  protected readonly zoomMin = ZOOM_MIN;

  /**
   * Las señales del lienzo, en el orden en que se encuentran al usarlo: primero el nodo suelto,
   * luego los estados que puede tomar, y al final lo que NO es un nodo.
   *
   * Solo la clave: el texto vive en `editor.leyenda.*` y la muestra la dibuja la plantilla con las
   * clases reales del lienzo. Meter aquí colores o etiquetas crearía una segunda copia que deriva
   * en cuanto alguien toque el CSS.
   */
  protected readonly leyenda = [
    { clave: 'nodo' },
    { clave: 'activo' },
    { clave: 'inicio' },
    { clave: 'fin' },
    { clave: 'manija' },
    { clave: 'silueta' },
  ] as const;
  protected readonly zoomMax = ZOOM_MAX;
  /** El glifo del CTA. Va por `iconDef` y no por `name=`: el playground no registra el catálogo. */
  protected readonly iconoPlay = CURATED_ICONS['play'];

  /**
   * Coordenada para leer, no para calcular. Dos decimales y sin ceros de relleno: la cifra cambia
   * en cada píxel del arrastre y `12.30` saltando a `12.4` marea más de lo que informa.
   */
  protected dec(v: number): string {
    return String(Math.round(v * 100) / 100);
  }

  private readonly curados: Curado[] = Object.entries(CURATED_ICONS)
    .map(([nombre, def]) => ({ nombre, def }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  /**
   * Nombre viejo de Lucide → nombre actual. Quien llega con `alert-triangle` en la cabeza no tiene
   * por qué saber que ahora se llama `triangle-alert`; sin esto la búsqueda le devuelve una
   * pantalla vacía y concluye que el icono no existe.
   */
  private readonly porAlias = new Map<string, string>(Object.entries(ICON_ALIASES));

  protected readonly filtro = signal('');

  /**
   * Sin `slice`: se renderiza el catálogo completo, igual que el showcase.
   *
   * Antes cortaba en 60 y el corte era invisible — el `max-height` con scroll de la lista hace que
   * 60-de-899 se vea idéntico a 60-de-60, así que el usuario llegaba al fondo, veía `axis-3d` y
   * concluía que el catálogo se acababa en la letra "a". Peor: el icono `x` quedaba INALCANZABLE,
   * porque su única consulta posible (`x`) lo dejaba en la posición 60 de 61 coincidencias, un
   * lugar afuera. Un editor al que no se le puede pedir un icono del catálogo no es un editor.
   */
  protected readonly candidatos = computed(() => {
    const q = this.filtro().trim().toLowerCase();
    if (!q) return this.curados;
    const canonico = this.porAlias.get(q);
    return this.curados.filter((c) => c.nombre.includes(q) || (canonico && c.nombre === canonico));
  });

  /** Para que la lista diga cuántos hay: un corte silencioso se lee como "esto es todo". */
  protected readonly totalCurados = this.curados.length;

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

  /**
   * Los nodos con jerarquía: cuál es el primero del trazo, cuál lo cierra, y qué número lleva.
   * Solo los movibles — el `Z` no tiene punto propio y pintarlo sería un nodo fantasma.
   */
  protected readonly nodosVista = computed<NodoVista[]>(() => {
    const todos = this.nodos();
    const movibles = todos.filter((n) => n.movible);
    // Un subpath con `Z` está cerrado: su último punto vuelve al primero, así que no tiene «fin».
    const cerrados = new Set(todos.filter((n) => !n.movible).map((n) => n.sub));
    const primeros = new Map<number, number>();
    const ultimos = new Map<number, number>();
    for (const n of movibles) {
      if (!primeros.has(n.sub)) primeros.set(n.sub, n.seg);
      ultimos.set(n.sub, n.seg);
    }
    return movibles.map((n, i) => ({
      ...n,
      indice: i + 1,
      inicio: primeros.get(n.sub) === n.seg,
      fin: !cerrados.has(n.sub) && ultimos.get(n.sub) === n.seg,
    }));
  });

  /**
   * El nodo seleccionado tal como está AHORA, no como estaba al agarrarlo. `activo()` guarda la
   * referencia del `pointerdown`; leer su `punto` dejaría las coordenadas congeladas en el sitio
   * donde empezó el arrastre en vez de seguir al puntero.
   */
  protected readonly nodoActivo = computed<NodoVista | null>(() => {
    const a = this.activo();
    if (!a) return null;
    return this.nodosVista().find((n) => n.sub === a.sub && n.seg === a.seg) ?? null;
  });

  // ── Encuadre: zoom y paneo ──────────────────────────────────────────────────

  protected readonly zoom = signal(1);
  /** Esquina superior izquierda del viewBox, en unidades del icono. */
  protected readonly pan = signal<[number, number]>([0, 0]);

  /** El lado visible: a más zoom, menos icono cabe. */
  private readonly ladoVisible = computed(() => LADO / this.zoom());

  protected readonly vista = computed(() => {
    const l = this.ladoVisible();
    const [x, y] = this.pan();
    return `${x} ${y} ${l} ${l}`;
  });

  protected readonly porcentaje = computed(() => Math.round(this.zoom() * 100));

  /**
   * El tamaño de las manijas se divide entre el zoom para que el cuadrito mida siempre lo mismo en
   * PANTALLA. Sin esto, acercarse convierte los agarres en bloques que tapan la figura que se está
   * editando — justo cuando más precisión hace falta.
   */
  protected readonly ladoManija = computed(() => 0.84 / this.zoom());
  protected readonly radioNodo = computed(() => 0.5 / this.zoom());
  /** El halo del nodo seleccionado engorda mientras se arrastra: «esto es lo que traigo». */
  protected readonly radioHalo = computed(
    () => (this.arrastrandoNodo() ? 1.5 : 1.05) / this.zoom(),
  );

  /** El pan no puede salirse del icono: fuera del 0–24 no hay nada que ver. */
  private encuadrar(x: number, y: number): [number, number] {
    const tope = LADO - this.ladoVisible();
    const dentro = (v: number) => Math.min(Math.max(v, 0), tope);
    return [dentro(x), dentro(y)];
  }

  /** Aplica un zoom nuevo dejando fijo el punto del icono que está bajo `ancla`. */
  private aplicarZoom(destino: number, ancla?: [number, number]): void {
    const z = Math.min(Math.max(destino, ZOOM_MIN), ZOOM_MAX);
    if (z === this.zoom()) return;
    const [ax, ay] = ancla ?? [
      this.pan()[0] + this.ladoVisible() / 2,
      this.pan()[1] + this.ladoVisible() / 2,
    ];
    // Regla de tres: la fracción del viewBox donde cae el ancla se conserva al cambiar la escala.
    const fx = (ax - this.pan()[0]) / this.ladoVisible();
    const fy = (ay - this.pan()[1]) / this.ladoVisible();
    this.zoom.set(z);
    const l = LADO / z;
    this.pan.set(this.encuadrar(ax - fx * l, ay - fy * l));
  }

  protected acercar(): void {
    this.aplicarZoom(this.zoom() * ZOOM_PASO);
  }

  protected alejar(): void {
    this.aplicarZoom(this.zoom() / ZOOM_PASO);
  }

  protected reencuadrar(): void {
    this.zoom.set(1);
    this.pan.set([0, 0]);
  }

  /** Rueda del ratón / pinch del trackpad: zoom sobre el punto que está bajo el puntero. */
  protected rueda(ev: WheelEvent): void {
    ev.preventDefault();
    const factor = ev.deltaY < 0 ? ZOOM_PASO : 1 / ZOOM_PASO;
    this.aplicarZoom(this.zoom() * factor, this.aViewBox(ev));
  }

  protected readonly enPantalla = signal(false);

  protected alternarPantalla(): void {
    // `?.` en las dos: jsdom no implementa la API de pantalla completa y el navegador puede
    // negarla por política. Ninguna de las dos es motivo para tronar.
    if (document.fullscreenElement) void document.exitFullscreen?.();
    else void this.zona.nativeElement.requestFullscreen?.();
  }

  protected sincronizarPantalla(): void {
    this.enPantalla.set(document.fullscreenElement === this.zona.nativeElement);
  }

  protected readonly dPorPath = computed<string[]>(() =>
    this.modelos().map((subs) => subs.map(dDeSubpath).join('')),
  );

  protected readonly editado = computed(() => this.dPorPath().join('\n'));

  /**
   * El icono editado, listo para coreografiar: la geometría nueva con la coreografía ORIGINAL.
   *
   * Los `d` editados se reponen EN SU SITIO dentro del arreglo de figuras, no al final. Los tracks
   * de la coreografía apuntan a `shapes[i]` por índice, así que reordenar aquí rompería en
   * silencio justo la animación que se quiere conservar.
   */
  protected readonly defEditado = computed<AnimatedIconDef>(() => {
    const ds = this.dPorPath();
    let k = 0;
    const shapes = this.elegido().def.shapes.map((f) =>
      f.tag === 'path' && typeof (f as { d?: unknown }).d === 'string'
        ? ({ ...f, d: ds[k++] } as IconShape)
        : f,
    );
    return { ...this.elegido().def, shapes };
  });

  /** El mismo formato que acepta el importador del Lab: no hay una ruta privilegiada. */
  protected readonly json = computed(() =>
    JSON.stringify(
      {
        icono: this.elegido().nombre,
        viewBox: this.elegido().def.viewBox,
        shapes: this.defEditado().shapes,
        animations: this.elegido().def.animations,
      },
      null,
      2,
    ),
  );

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

  /**
   * Aplica una operación atómica al trazo activo, dejándola como UN paso de deshacer.
   * Si la operación se niega — devuelve el mismo objeto — no se registra nada.
   */
  private aplicar(op: (subs: SubPath[]) => SubPath[]): void {
    const i = this.indiceActivo();
    const antes = this.modelos();
    const nuevo = op(antes[i]);
    if (nuevo === antes[i]) return;
    this.historial.registrar(antes);
    this.modelos.set(antes.map((m, k) => (k === i ? nuevo : m)));
    this.tocado.set(true);
    this.sincronizarPila();
  }

  /** Parte por la mitad el tramo que termina en el nodo elegido. */
  protected agregarNodo(): void {
    const n = this.activo();
    if (!n) return;
    this.aplicar((subs) => insertarNodo(subs, n));
  }

  protected borrarNodo(): void {
    const n = this.activo();
    if (!n) return;
    this.aplicar((subs) => quitarNodo(subs, n));
    this.activo.set(null);
  }

  /** Ctrl+Z / Ctrl+Shift+Z, y Ctrl+Y para quien venga de Windows. */
  protected atajo(ev: KeyboardEvent): void {
    // Borrar y agregar no llevan modificador, pero solo aplican con un nodo seleccionado — y nunca
    // mientras se escribe en el buscador.
    const enCampo = (ev.target as HTMLElement | null)?.tagName === 'INPUT';
    if (!ev.ctrlKey && !ev.metaKey && !enCampo && this.activo()) {
      if (ev.key === 'Delete' || ev.key === 'Backspace') {
        ev.preventDefault();
        this.borrarNodo();
        return;
      }
      if (ev.key === '+' || ev.key === '=') {
        ev.preventDefault();
        this.agregarNodo();
        return;
      }
    }
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
    this.activo.set(null);
    this.manijaActiva.set(null);
    // Un encuadre heredado deja el icono nuevo fuera de cuadro: cada figura tiene su propio centro.
    this.reencuadrar();
    // El historial del icono anterior no aplica al nuevo.
    this.historial.limpiar();
    this.sincronizarPila();
  }

  protected restablecer(): void {
    this.cargar();
  }

  // ── Arrastre ────────────────────────────────────────────────────────────────

  private arrastrando:
    | { tipo: 'nodo'; ref: Nodo; ultimo: [number, number]; movio: boolean }
    | { tipo: 'manija'; ref: Manija; ultimo: [number, number]; movio: boolean }
    | null = null;
  protected readonly activo = signal<Nodo | null>(null);
  protected readonly manijaActiva = signal<Manija | null>(null);
  /** Se pinta el nodo agrandado mientras se arrastra: la señal de «esto es lo que traigo». */
  protected readonly arrastrandoNodo = signal(false);

  /**
   * El paneo va por su propio carril, no por `arrastrando`. Mueve la CÁMARA, no la geometría: ni
   * toca el modelo ni entra al historial, y meterlo en la misma unión obligaría a filtrarlo en
   * cada rama que sí edita.
   */
  private paneando: { cliente: [number, number]; inicio: [number, number] } | null = null;

  protected empezarPan(ev: PointerEvent): void {
    // Al 100% no hay nada que revelar; y si ya se está agarrando un nodo o una manija, ese gesto
    // manda. Sin este guardia, arrastrar un punto movería además el encuadre debajo de él.
    if (this.zoom() === 1 || this.arrastrando) return;
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
    this.paneando = { cliente: [ev.clientX, ev.clientY], inicio: this.pan() };
  }

  /**
   * De coordenadas de pantalla a unidades del viewBox. Se usa el rect real del `<svg>` en vez de
   * un factor fijo porque el lienzo es responsivo: con un número quemado, el nodo se despega del
   * puntero en cuanto cambia el ancho de la ventana.
   */
  private aViewBox(ev: { clientX: number; clientY: number }): [number, number] {
    const r = this.lienzo.nativeElement.getBoundingClientRect();
    // El zoom entra aquí y en ningún otro lado: es el único punto donde pantalla y viewBox se
    // tocan. Con zoom 1 y pan (0,0) la cuenta es idéntica a la de antes.
    const l = this.ladoVisible();
    const [px, py] = this.pan();
    return [px + ((ev.clientX - r.left) / r.width) * l, py + ((ev.clientY - r.top) / r.height) * l];
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
    this.arrastrando = { tipo: 'nodo', ref: nodo, ultimo: this.aViewBox(ev), movio: false };
    this.activo.set(nodo);
    this.arrastrandoNodo.set(true);
    this.manijaActiva.set(null);
  }

  protected empezarManija(ev: PointerEvent, manija: Manija): void {
    ev.preventDefault();
    ev.stopPropagation();
    (ev.target as Element).setPointerCapture(ev.pointerId);
    this.historial.abrir(this.modelos());
    this.arrastrando = { tipo: 'manija', ref: manija, ultimo: this.aViewBox(ev), movio: false };
    this.manijaActiva.set(manija);
    this.activo.set(null);
  }

  protected mover(ev: PointerEvent): void {
    if (this.paneando) {
      const r = this.lienzo.nativeElement.getBoundingClientRect();
      const l = this.ladoVisible();
      // El encuadre se mueve al REVÉS que el puntero: se arrastra el papel, no la ventana.
      const dx = ((ev.clientX - this.paneando.cliente[0]) / r.width) * l;
      const dy = ((ev.clientY - this.paneando.cliente[1]) / r.height) * l;
      this.pan.set(this.encuadrar(this.paneando.inicio[0] - dx, this.paneando.inicio[1] - dy));
      return;
    }
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
    this.arrastrando.movio = true;
    this.tocado.set(true);
  }

  protected terminar(): void {
    this.paneando = null;
    this.arrastrandoNodo.set(false);
    if (!this.arrastrando) return;
    const movio = this.arrastrando.movio;
    this.arrastrando = null;

    // Solo se redondea si de verdad hubo arrastre. Redondear en cada click parecía inofensivo y no
    // lo era: un simple SELECCIONAR cambiaba los decimales de una edición anterior, el historial lo
    // veía como cambio y metía un paso — así que el siguiente Ctrl+Z deshacía ese redondeo en vez
    // de la operación que el usuario quería deshacer.
    if (movio) {
      const i = this.indiceActivo();
      this.modelos.update((todos) => {
        const copia = [...todos];
        copia[i] = limpiar(copia[i]);
        return copia;
      });
    }
    this.historial.cerrar(this.modelos());
    this.sincronizarPila();
  }

  private readonly taller = inject(Taller);
  private readonly router = inject(Router);

  /** Manda la forma editada al Lab y navega: el traspaso que evita copiar y pegar a mano. */
  protected coreografiar(): void {
    this.taller.enviar(this.elegido().nombre, this.defEditado());
    void this.router.navigate(['/lab']);
  }

  // ── Salida ──────────────────────────────────────────────────────────────────

  /** El `d` abierto y el JSON cerrado: uno se lee de un vistazo, el otro son cien líneas. */
  protected readonly verPath = signal(true);
  protected readonly verJson = signal(false);

  /** Cuál de los dos bloques acaba de copiarse, para acusar recibo. */
  protected readonly copiado = signal<'path' | 'json' | null>(null);
  private avisoCopiado?: ReturnType<typeof setTimeout>;

  /**
   * Copiar de verdad o no decir nada. El `catch` vacío es a propósito: sin permiso de portapapeles
   * el acuse NO se pinta, en vez de mentirle al usuario diciendo «copiado» sobre un buffer vacío.
   */
  private async alPortapapeles(texto: string, cual: 'path' | 'json'): Promise<void> {
    try {
      await navigator.clipboard.writeText(texto);
      this.copiado.set(cual);
      clearTimeout(this.avisoCopiado);
      this.avisoCopiado = setTimeout(() => this.copiado.set(null), 1600);
    } catch {
      /* sin permiso: no se finge que copió */
    }
  }

  protected copiarJson(): Promise<void> {
    return this.alPortapapeles(this.json(), 'json');
  }

  /**
   * Baja el JSON como archivo. Cierra el ciclo que ya existía a medias: el editor sabía EXPORTAR
   * (al portapapeles) y el Lab sabe IMPORTAR, pero entre los dos solo había un copiar-pegar. Con
   * archivo, lo que se hizo aquí se puede guardar, mandar y volver a abrir.
   *
   * Es el mismo texto que copia el botón de al lado — no una serialización aparte que pudiera
   * divergir. Que ese texto sea exactamente lo que el importador acepta lo ancla un test.
   *
   * El `revokeObjectURL` va en un tick posterior y no justo después del `click()`: revocar en el
   * mismo turno puede cancelar la descarga antes de que el navegador la haya tomado.
   */
  protected descargarJson(): void {
    const doc = this.lienzo.nativeElement.ownerDocument;
    const url = URL.createObjectURL(new Blob([this.json()], { type: 'application/json' }));
    const enlace = doc.createElement('a');
    enlace.href = url;
    enlace.download = `${this.elegido().nombre}.json`;
    enlace.click();
    setTimeout(() => URL.revokeObjectURL(url));
  }

  protected copiar(): Promise<void> {
    return this.alPortapapeles(this.editado(), 'path');
  }

  ngOnDestroy(): void {
    clearTimeout(this.avisoCopiado);
  }
}
