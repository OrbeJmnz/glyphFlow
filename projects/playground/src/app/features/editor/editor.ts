import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  PendingTasks,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import editorEn from '../../../i18n/editor/en.json';
import {
  GfIconComponent,
  // Sueltos y NO desde el registro: cada icono es su propio export y se poda solo. El registro
  // completo llega diferido (ver `curados` más abajo); estos hacen falta ya, al construir.
  playIcon,
  checkIcon,
  circleMinusIcon,
  circlePlusIcon,
  copyIcon,
  faceSlightlyFrowningIcon,
  grid3x3Icon,
  magnetIcon,
  penToolIcon,
  type AnimatedIconDef,
  type IconShape,
} from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { cargarAlias, cargarCurados } from '../../core/catalogo';
import { TOPE_URL, aFragmento, deFragmento, type EstadoEditor } from '../../core/estado-url';
import {
  actualizarBorrador,
  borradores,
  borrarBorrador,
  guardarBorrador,
  hayBorradores,
  renombrarBorrador,
  type Borrador,
} from '../../core/borradores';
import { Copiador } from '../../shared/ui/copiar';
import { parseD, type Punto, type SubPath } from './geometria/path-model';
import {
  agregarPunto,
  cerrarSubpath,
  convertirACurva,
  dDeSubpath,
  limpiar,
  manijasDe,
  moverManija,
  insertarNodo,
  moverNodo,
  moverSubpath,
  nodosDe,
  nuevoSubpath,
  quitarNodo,
  type Manija,
  type Nodo,
} from './geometria/path-edit';
import { crearHistorial } from './geometria/historial';
import { Taller } from '../../core/taller';
import { Rutas } from '../../core/rutas.service';
import { Boton } from '../../shared/ui/boton';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';
import { Chip } from '../../shared/ui/chip';
import { Tooltip } from '../../shared/ui/tooltip';
import { Visible } from '../../shared/ui/visible';
import { SinResultados } from '../../shared/ui/sin-resultados';

const LADO = 24;

/** Zoom: 1 = el icono completo. No se baja de ahí porque debajo del 100% solo se ve vacío. */
const ZOOM_MIN = 1;
const ZOOM_MAX = 8;
const ZOOM_PASO = 1.35;

/** Mismo espaciado que dibuja la rejilla visible (menor+mayor intercaladas cada 2 unidades) — el
    ajuste tiene que caer donde el ojo ya espera una línea, no en un paso inventado aparte. */
const PASO_REJILLA = 2;

/** T30 · por debajo de esto, el editor de nodos no cabe sin romperse. Ver `angosto`. */
const ANCHO_MINIMO = 900;

/** Pluma: clic a menos de esto del punto de arranque cierra el subtrazo en vez de agregar otro. */
const CIERRE_PLUMA = 0.6;

interface Curado {
  nombre: string;
  def: AnimatedIconDef;
}

/**
 * Las 4 sub-secciones del panel — una a la vista, el resto es scroll perdido. Mismo patrón que
 * `TabDetalle` en `icon-detail-panel.ts`: un tipo cerrado, un signal, y `@switch` en la plantilla.
 */
type PestanaPanel = 'icono' | 'edicion' | 'salida' | 'proyecto';

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
  imports: [
    Boton,
    CampoBusqueda,
    Chip,
    GfIconComponent,
    GfIconMorphComponent,
    SinResultados,
    Tooltip,
    TranslocoPipe,
    Visible,
  ],
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
  /*
   * T30: `static: true` -- SIN falta desde que `#lienzo`/`#zona` viven dentro de `@if (!angosto())`
   * (modo lectura <900px). Una query estática se resuelve ANTES de que Angular decida qué rama de
   * un `@if` instanciar, así que con `static: true` quedaban `undefined` incluso en la rama donde
   * SÍ existen -- el arrastre fallaba con "Cannot read properties of undefined (reading
   * 'nativeElement')" en CUALQUIER ancho, no solo por debajo de 900px. `static: false` (el default)
   * las resuelve después de cada pasada de detección de cambios, que es lo que un elemento
   * condicional necesita.
   */
  @ViewChild('lienzo') private lienzo!: ElementRef<SVGSVGElement>;
  /** El marco que entra a pantalla completa: el lienzo con su barra, no el `<svg>` pelón. */
  @ViewChild('zona') private zona!: ElementRef<HTMLElement>;
  /** El campo del `d` pegable. Opcional de verdad -- además de `@if (!angosto())`, vive dentro de
      `@if (verPath())`, que el usuario puede haber cerrado antes de llegar aquí. */
  @ViewChild('campoD') private campoD?: ElementRef<HTMLTextAreaElement>;

  protected readonly lado = LADO;
  protected readonly zoomMin = ZOOM_MIN;
  /** La rejilla menor, a medio camino entre las líneas mayores (4/8/12/16/20) -- nunca en la misma
      posición, para no dibujar dos veces la misma línea una encima de la otra. */
  protected readonly ejesMenor = [2, 6, 10, 14, 18, 22];

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
  protected readonly iconoPlay = playIcon;
  /** La cara del "sin resultados" -- misma cara que ya usa `iconos.ts` para lo mismo. */
  protected readonly caraTriste = faceSlightlyFrowningIcon;
  protected readonly iconoRejilla = grid3x3Icon;
  protected readonly iconoAjuste = magnetIcon;
  protected readonly iconoPluma = penToolIcon;
  protected readonly iconoInsertar = circlePlusIcon;
  protected readonly iconoBorrar = circleMinusIcon;

  /** La rejilla YA se dibujaba siempre; esto le suma un apagador (T30). */
  protected readonly mostrarRejilla = signal(true);
  /**
   * Ajuste a rejilla: SOLO al soltar el gesto (arrastre o flecha), nunca en cada píxel intermedio
   * -- ajustar de camino se sentiría como que el nodo tiembla en vez de responder al puntero. Ver
   * `snapNodoActivo`. Activo por default -- el toggle se movió de un botón propio en el dock del
   * lienzo a un chip en la pestaña "Edición", así que el valor de arranque importa más que antes.
   */
  protected readonly ajustarRejilla = signal(true);

  private redondearAGrid(v: number): number {
    return Math.round(v / PASO_REJILLA) * PASO_REJILLA;
  }

  /**
   * T30 · por debajo de `ANCHO_MINIMO` no se intenta encoger el editor -- se cambia a una vista de
   * solo lectura (icono + resultado). `matchMedia` y no un `HostListener('window:resize')`: el
   * navegador ya optimiza cuándo dispara el cambio, y sondear el ancho en cada resize sería
   * recalcular en cada frame del gesto en vez de solo cuando la condición realmente cruza el borde.
   *
   * Seed + `addEventListener('change', …)`, mismo patrón que `movimiento.ts`/`tema.ts`: sin
   * `matchMedia` (SSR) se asume que SÍ cabe, porque el prerender no tiene viewport que romper.
   */
  protected readonly angosto = signal(false);

  // ── Panel: pestañas ────────────────────────────────────────────────────────────

  /**
   * Qué sub-sección del panel se ve. Las 4 secciones de siempre (Icono/Edición/Salida/Proyecto)
   * iban apiladas en un solo scroll; con "Animar" sumándose pronto arriba del `.marco` (ver el plan
   * de pluma+animar) esa columna solo iba a crecer. Por pestaña y no por ruta/URL: es postura de
   * panel, no algo que valga compartir por enlace -- mismo criterio que dejó el modo forma/animar
   * fuera de `estado-url.ts`.
   */
  protected readonly pestanaActiva = signal<PestanaPanel>('icono');

  protected elegirPestana(p: PestanaPanel): void {
    this.pestanaActiva.set(p);
  }

  // ── Pluma: crear un subtrazo desde cero ──────────────────────────────────────

  /** `true` mientras el clic en el lienzo coloca puntos en vez de seleccionar/arrastrar. */
  protected readonly modoPluma = signal(false);
  /** El subtrazo que se está dibujando. `null` = pluma activa pero sin el primer punto todavía. */
  protected readonly plumaEnProgreso = signal<SubPath | null>(null);
  /** Posición del puntero en unidades del viewBox, solo mientras hay pluma -- para el segmento
      fantasma del último punto al cursor. */
  protected readonly punteroPluma = signal<Punto | null>(null);

  protected readonly nodosPluma = computed<Nodo[]>(() => {
    const p = this.plumaEnProgreso();
    return p ? nodosDe([p]) : [];
  });
  protected readonly dPluma = computed(() => {
    const p = this.plumaEnProgreso();
    return p ? dDeSubpath(p) : '';
  });
  protected readonly ultimoPuntoPluma = computed<Punto | null>(() => {
    const n = this.nodosPluma();
    return n.length ? n[n.length - 1].punto : null;
  });
  /** Con menos de 3 puntos cerrar daría un subtrazo degenerado (un segmento sobre sí mismo). */
  protected readonly plumaPuedeCerrar = computed(() => this.nodosPluma().length >= 3);
  /** Dos puntos ya son una línea válida -- ABIERTA, sin forzar el cierre. Cerrar sigue pidiendo 3. */
  protected readonly plumaPuedeTerminar = computed(() => this.nodosPluma().length >= 2);

  protected activarPluma(): void {
    this.modoPluma.set(true);
    this.plumaEnProgreso.set(null);
    this.activo.set(null);
    this.manijaActiva.set(null);
  }

  protected cancelarPluma(): void {
    this.modoPluma.set(false);
    this.plumaEnProgreso.set(null);
  }

  /** Clic en el lienzo mientras hay pluma activa. Primer clic arranca; los siguientes agregan un
      tramo recto; clic cerca del punto de arranque cierra. */
  protected clicPluma(ev: PointerEvent): void {
    const punto = this.aViewBox(ev);
    const actual = this.plumaEnProgreso();
    if (!actual) {
      this.plumaEnProgreso.set(nuevoSubpath(punto));
      return;
    }
    const inicio = actual.segmentos[0].fin;
    const distancia = Math.hypot(punto[0] - inicio[0], punto[1] - inicio[1]);
    if (distancia < CIERRE_PLUMA && this.plumaPuedeCerrar()) {
      this.confirmarPluma(true);
      return;
    }
    this.plumaEnProgreso.set(agregarPunto(actual, punto));
  }

  /**
   * Agrega el subtrazo en progreso al trazo activo como UN paso de deshacer. `cerrar` decide si
   * lleva `Z` o queda abierto -- una línea de 2 puntos es una figura válida por sí misma, no un
   * paso a medias de camino a un polígono. Cerrar sigue pidiendo 3 (ver `plumaPuedeCerrar`);
   * terminar abierto solo pide 2 (ver `plumaPuedeTerminar`).
   */
  private confirmarPluma(cerrar: boolean): void {
    const actual = this.plumaEnProgreso();
    if (!actual || (cerrar ? !this.plumaPuedeCerrar() : !this.plumaPuedeTerminar())) return;
    const listo = cerrar ? cerrarSubpath(actual) : actual;
    const i = this.indiceActivo();
    const antes = this.modelos();
    const subIndex = antes[i].length; // dónde queda el subtrazo nuevo: al final del arreglo
    this.historial.registrar(antes);
    this.modelos.set(antes.map((m, k) => (k === i ? [...m, listo] : m)));
    this.tocado.set(true);
    this.sincronizarPila();
    this.modoPluma.set(false);
    this.plumaEnProgreso.set(null);
    // Selecciona el último punto puesto. Sin esto, terminar un trazo dejaba el panel diciendo
    // "selecciona un nodo" justo después de crear varios -- y "curvar este tramo" (T-nuevo) y el
    // aviso de Alt+arrastre viven DENTRO de ese `@if`, así que nadie los veía sin un clic más, a
    // ciegas, sobre un punto que acababa de tocar.
    const ultimoSeg = cerrar ? listo.segmentos.length - 2 : listo.segmentos.length - 1;
    this.activo.set({
      sub: subIndex,
      seg: ultimoSeg,
      punto: listo.segmentos[ultimoSeg].fin,
      movible: true,
    });
  }

  /** El clic en un trazo de fondo cambia cuál se edita -- cancela una pluma en progreso si estaba
      dibujando para OTRO trazo, para no dejar puntos flotando sin dueño. */
  protected elegirIndiceActivo(i: number): void {
    if (this.plumaEnProgreso()) this.plumaEnProgreso.set(null);
    this.indiceActivo.set(i);
  }

  /**
   * Coordenada para leer, no para calcular. Dos decimales y sin ceros de relleno: la cifra cambia
   * en cada píxel del arrastre y `12.30` saltando a `12.4` marea más de lo que informa.
   */
  protected dec(v: number): string {
    return String(Math.round(v * 100) / 100);
  }

  /**
   * El catálogo llega DIFERIDO, no en el chunk de esta página.
   *
   * `CURATED_ICONS` importado de forma estática desde una ruta diferida acaba en el bundle
   * INICIAL —esbuild sube a la entrada lo que alcanzan varios chunks—, y con el catálogo curado
   * entero eso es más de un megabyte que baja hasta quien sólo abre Docs. Medido: 1.43 MB de
   * entrada contra 373 KB sin él.
   *
   * Arranca vacío y se llena al resolver. El editor no espera a esto para ser usable: `elegido`
   * ya vale desde el primer fotograma (hoy, un def en blanco -- ver su comentario), así que se
   * puede dibujar con la pluma o elegir un curado en cuanto la LISTA de la izquierda termine de
   * llegar, sin que el resto del componente tenga que tratar "sin catálogo todavía" como un caso
   * aparte.
   */
  private readonly curados = signal<Curado[]>([]);


  /**
   * Nombre viejo de Lucide → nombre actual. Quien llega con `alert-triangle` en la cabeza no tiene
   * por qué saber que ahora se llama `triangle-alert`; sin esto la búsqueda le devuelve una
   * pantalla vacía y concluye que el icono no existe.
   */
  private readonly porAlias = signal(new Map<string, string>());

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
    const curados = this.curados();
    const q = this.filtro().trim().toLowerCase();
    if (!q) return curados;
    const canonico = this.porAlias().get(q);
    return curados.filter((c) => c.nombre.includes(q) || (canonico && c.nombre === canonico));
  });

  private readonly ubicacion = inject(Location);
  private temporizadorUrl?: ReturnType<typeof setTimeout>;

  /*
   * La URL sigue a lo que se comparte —el icono y sus trazos— y a nada más. Un `effect` y no una
   * llamada dentro de cada gesto: hay una docena de sitios que tocan `modelos` (arrastrar, partir
   * un tramo, deshacer, rehacer, restablecer…) y el que se olvide de avisar deja el enlace
   * mintiendo, sin que nada truene.
   */
  private readonly urlAlDia = effect(() => {
    this.modelos();
    this.elegido();
    this.sincronizarUrl();
  });
  private readonly copiadorEnlace = new Copiador();

  /** El acuse del botón de enlace, para el rótulo y el icono. */
  protected readonly enlaceCopiado = this.copiadorEnlace.copiado;

  /**
   * `true` cuando el estado ya no cabe en una URL de fiar. Entonces el botón deja de ofrecer el
   * enlace y ofrece el archivo, que es lo que pide el ticket: avisar en vez de dar un enlace que
   * unos clientes recortan y otros no.
   */
  protected readonly enlaceDemasiadoLargo = signal(false);

  /**
   * Escribe el estado en el hash SIN navegar.
   *
   * `Location.replaceState` y no `router.navigate`, por lo mismo que el buscador del catálogo: el
   * router lleva `withViewTransitions`, así que navegar animaría la página entera — y arrastrar un
   * nodo dispararía una transición de vista por cada píxel del arrastre.
   *
   * `replaceState` y no `pushState`: mover un punto no es un paso del historial. Con push, salir
   * del editor pediría tantos «atrás» como gestos se hubieran hecho.
   *
   * Los 400 ms son de la ESCRITURA, no del dibujo: el lienzo va inmediato. Serializar comprime, y
   * hacerlo en cada `pointermove` sería trabajo tirado sesenta veces por segundo.
   */
  private sincronizarUrl(): void {
    clearTimeout(this.temporizadorUrl);
    this.temporizadorUrl = setTimeout(() => {
      void this.escribirHash();
    }, 400);
  }

  private async escribirHash(): Promise<void> {
    const paths = this.dPorPath();
    const base = this.ubicacion.path().split('#')[0];
    if (!paths.length) {
      this.ubicacion.replaceState(base);
      return;
    }
    const fragmento = await aFragmento({ icono: this.elegido().nombre, paths });
    const cabe = fragmento.length <= TOPE_URL;
    this.enlaceDemasiadoLargo.set(!cabe);
    // Un hash que no sirve es peor que ninguno: se deja la URL limpia y el botón pasa a ofrecer
    // el archivo.
    this.ubicacion.replaceState(cabe && fragmento ? `${base}#${fragmento}` : base);
  }

  /**
   * Restaura desde el hash al abrir. Sólo una vez, en el arranque: releerlo después pisaría lo que
   * el usuario esté editando cada vez que la URL se pone al día con su propio trabajo.
   */
  /**
   * Cicatriz real (T-nuevo, encontrada depurando la suite): con el arranque en blanco, `irABlanco`
   * dispara `sincronizarUrl` -- un timer de 400ms que escribe el estado en blanco al hash. El
   * catálogo tarda bastante más que eso en cargar (~2-3s, es JSON grande), así que para cuando
   * `cargarCurados()` resuelve y llama a ESTA función, el hash YA tiene ese "e1.blanco" escrito
   * por el propio arranque -- no por un enlace compartido de verdad. Sin el chequeo de abajo, eso
   * se decodifica y se aplica igual, pisando lo que el usuario haya elegido MIENTRAS el catálogo
   * cargaba (un curado real, o algo dibujado con la pluma) con el estado en blanco de vuelta.
   *
   * El chequeo va DESPUÉS del `await` a propósito: `deFragmento` es asíncrono, así que el usuario
   * pudo actuar durante ESE decode también, no solo antes de llamar a esta función.
   */
  private async restaurarDesdeHash(): Promise<void> {
    const hash = this.ubicacion.path(true).split('#')[1];
    if (!hash) return;
    const estado = await deFragmento(hash);
    if (!estado) return;
    if (this.elegido().nombre !== '' || this.tocado()) return;
    const suyo = this.curados().find((c) => c.nombre === estado.icono);
    if (suyo) this.elegido.set(suyo);
    // Los `d` del enlace mandan sobre los del catálogo: son justamente lo que alguien quiso
    // compartir. Se parsean con el mismo camino que `cargar()`, así que un `d` corrupto acaba en
    // un modelo vacío y no en una excepción durante el arranque.
    this.modelos.set(estado.paths.map((d) => parseD(d)));
    this.tocado.set(true);
    this.reencuadrar();
    this.historial.limpiar();
    this.sincronizarPila();
  }

  /** El enlace completo, para copiar. Se lee en el momento: la URL ya está al día. */
  protected copiarEnlace(): void {
    void this.copiadorEnlace.copiar(location.href);
  }

  // ── Borradores (T31 · nivel 2) ────────────────────────────────────────────────

  protected readonly borradores = borradores;
  protected readonly hayBorradores = hayBorradores;

  /** El borrador que se está editando, si esto salió de uno. Decide guardar vs. actualizar. */
  private readonly borradorActual = signal<string | null>(null);
  protected readonly renombrando = signal<string | null>(null);

  /**
   * Antes, guardar un borrador no daba ninguna señal -- el usuario solo se enteraba mirando la
   * lista de abajo. Mismo patrón que `copiado`: un aviso de vida corta, no un toast.
   */
  protected readonly guardado = signal(false);
  private avisoGuardado?: ReturnType<typeof setTimeout>;

  /** El estado que se guarda es el MISMO que viaja en el enlace: un dato, dos formas de llegar. */
  private estadoActual(): EstadoEditor {
    return { icono: this.elegido().nombre, paths: this.dPorPath() };
  }

  protected guardarComoBorrador(): void {
    const id = this.borradorActual();
    if (id) {
      actualizarBorrador(id, this.estadoActual());
    } else {
      this.borradorActual.set(guardarBorrador(this.estadoActual()));
    }
    clearTimeout(this.avisoGuardado);
    this.guardado.set(true);
    this.avisoGuardado = setTimeout(() => this.guardado.set(false), 1600);
  }

  protected abrirBorrador(b: Borrador): void {
    const suyo = this.curados().find((c) => c.nombre === b.icono);
    if (suyo) this.elegido.set(suyo);
    this.modelos.set(b.paths.map((d) => parseD(d)));
    this.borradorActual.set(b.id);
    this.tocado.set(true);
    this.reencuadrar();
    this.historial.limpiar();
    this.sincronizarPila();
  }

  protected renombrar(id: string, nombre: string): void {
    renombrarBorrador(id, nombre);
    this.renombrando.set(null);
  }

  protected borrar(id: string): void {
    borrarBorrador(id);
    // Si era el que se estaba editando, deja de serlo: guardar otra vez crearía uno nuevo en vez
    // de escribir sobre un id que ya no existe.
    if (this.borradorActual() === id) this.borradorActual.set(null);
  }

  // ── Llevárselo (T31 · los dos criterios que no son niveles) ───────────────────

  /**
   * El archivo listo para PEGAR EN UN PROYECTO, que es lo que el ticket llama «exportar a mi
   * proyecto»: no la geometría suelta, sino el módulo `.ts` que se importa como cualquier otro
   * icono de la librería.
   *
   * Es distinto del `.json`, que es el formato de ida y vuelta con el Lab. Los dos siguen ahí
   * porque responden a preguntas distintas: uno vuelve al editor, el otro entra en un `npm i`.
   */
  protected readonly moduloTs = computed(() => {
    const nombre = this.elegido().nombre;
    const constante = nombre.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()) + 'Icon';
    const def = this.defEditado();
    return (
      `import type { AnimatedIconDef } from 'glyphflow';\n\n` +
      `export const ${constante}: AnimatedIconDef = ${JSON.stringify(def, null, 2)};\n`
    );
  });

  protected exportarAMiProyecto(): void {
    const nombre = this.elegido().nombre;
    this.descargar(`${nombre}.icon.ts`, this.moduloTs(), 'text/typescript');
  }

  /**
   * Abre un issue con el icono dentro (T31 · «contribuir»).
   *
   * Un ISSUE y no un PR pre-rellenado: la API de GitHub no permite crear un pull request desde una
   * URL —hace falta una rama con el commit ya hecho, y para eso un token del usuario y un fork—,
   * así que el «PR pre-rellenado» del ticket, tal cual, no existe sin backend. Lo que sí se puede
   * es dejar el trabajo hecho: el cuerpo trae el módulo listo para pegar y el mantenedor lo
   * convierte en commit. Git sigue siendo la capa de autorización, que era el punto.
   */
  protected contribuir(): void {
    const nombre = this.elegido().nombre;
    const titulo = `Choreography: ${nombre}`;
    const cuerpo =
      `Edited with the path editor.\n\n` +
      `\`\`\`ts\n${this.moduloTs()}\`\`\`\n\n` +
      `Link with the exact shape: ${location.href}\n`;
    const url =
      `https://github.com/OrbeJmnz/glyphFlow/issues/new` +
      `?title=${encodeURIComponent(titulo)}&body=${encodeURIComponent(cuerpo)}`;
    window.open(url, '_blank', 'noopener');
  }

  /** Para que la lista diga cuántos hay: un corte silencioso se lee como "esto es todo". */
  protected readonly totalCurados = computed(() => this.curados().length);

  /**
   * El selector monta un TRAMO de `candidatos()`, no la lista entera.
   *
   * Medido el 2026-08-27 con los 1767 curados: 16 184 nodos y 3 732 ms de hilo principal
   * bloqueado solo por instanciar 1 772 `<gf-icon>`. Aquí no son las animaciones —`trigger="manual"`
   * no dibuja al montarse, y en toda la página hay UNA animación viva— es el coste de crear los
   * componentes y sus SVG.
   *
   * El conteo de al lado sigue diciendo la verdad (`candidatos().length` sobre el total), que es
   * justo lo que el comentario de arriba pedía: nada de cortes silenciosos.
   */
  private static readonly TRAMO = 120;
  protected readonly montados = linkedSignal({
    source: this.candidatos,
    // Al filtrar, la lista de detrás es otra: el tramo vuelve al principio en vez de arrastrar lo
    // que hubiera montado de la anterior.
    computation: () => Editor.TRAMO,
  });

  /**
   * El tramo, MÁS el icono que se está editando aunque caiga fuera.
   *
   * Sin eso, elegir uno del final de la lista deja la lista sin chip activo: el usuario no ve cuál
   * está editando. `heart`, por ejemplo, va por la posición 700 de 1767 -- fuera del primer tramo
   * ya salía sin marcar. Va DELANTE porque es lo que se busca con la vista, no perdido en su sitio
   * alfabético. (El editor arranca en blanco -- sin chip elegido todavía -- así que esta excepción
   * entra en juego en cuanto se elige algo, no antes.)
   */
  protected readonly visibles = computed(() => {
    const tramo = this.candidatos().slice(0, this.montados());
    const actual = this.elegido();
    if (!actual || tramo.some((c) => c.nombre === actual.nombre)) return tramo;
    // Por NOMBRE y no por identidad: `elegido` puede ser un objeto propio (el def en blanco de
    // arranque, o uno recién elegido antes de que el catálogo termine de llegar), y comparar por
    // referencia diría que no está en la lista aunque el icono sí exista ahí, con OTRO objeto.
    const enLista = this.candidatos().find((c) => c.nombre === actual.nombre);
    return enLista ? [enLista, ...tramo] : tramo;
  });
  protected readonly hayMas = computed(() => this.candidatos().length > this.montados());

  protected montarMas(): void {
    this.montados.update((n) => n + Editor.TRAMO);
  }

  /**
   * En blanco desde el primer fotograma, no `curados().find(...)`: el catálogo llega diferido, y
   * esta señal tiene que valer YA — la mitad del componente la lee para calcular nodos, manijas y
   * la salida. Un objeto literal (no `null`) evita hacerla nullable y guardar en los trece sitios
   * que la usan. Antes sembraba con `heartIcon` (un icono real) -- se decidió que el editor arranca
   * en blanco por defecto, con la pluma armada: es la entrada más honesta a "crear desde cero", el
   * caso que T-nuevo agrega. Elegir un icono del catálogo sigue siendo un clic, igual que siempre.
   */
  protected readonly elegido = signal<Curado>({
    nombre: '',
    def: { viewBox: '0 0 24 24', shapes: [], animations: {} },
  });

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

  /**
   * Un `<path>` de dibujo por SUBTRAZO, no uno por PATH -- hace falta para poder arrastrar por el
   * BORDE de una figura sin agarrar de paso las demás que comparten el mismo `<path>` de Lucide
   * (mover una figura entera desde su arista, no solo desde un nodo). `dPorPath()` se queda tal
   * cual para la salida/exportar -- eso SÍ necesita un `d` por path, no por subtrazo.
   */
  protected readonly subtrazosVista = computed<{ pathIndex: number; subIndex: number; d: string }[]>(
    () =>
      this.modelos().flatMap((subs, pathIndex) =>
        subs.map((sub, subIndex) => ({ pathIndex, subIndex, d: dDeSubpath(sub) })),
      ),
  );

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
   * El fantasma de referencia: el `d` ORIGINAL del stroke activo, solo mientras hay algo que
   * comparar. Sin `tocado()` el activo Y la referencia son el mismo trazo -- pintar un fantasma
   * idéntico encima de sí mismo no aporta nada, solo un `<path>` de más en cada frame.
   */
  protected readonly dReferencia = computed<string | null>(() =>
    this.tocado() ? (this.pathsOriginales()[this.indiceActivo()] ?? null) : null,
  );

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

  /** `true` cuando el tramo que termina en el nodo activo es recto (L/H/V) -- el único caso que
      `convertirACurva` de verdad transforma. Sirve para no ofrecer el botón sobre algo que ya es
      curva o un arco, donde no haría nada. */
  protected readonly puedeCurvar = computed(() => {
    const n = this.activo();
    const subs = this.modelos()[this.indiceActivo()];
    const seg = subs?.[n?.sub ?? -1]?.segmentos[n?.seg ?? -1];
    if (!n || !seg) return false;
    const L = seg.letra.toUpperCase();
    return L === 'L' || L === 'H' || L === 'V';
  });

  protected curvarTramo(): void {
    const n = this.activo();
    if (!n) return;
    this.aplicar((subs) => convertirACurva(subs, n));
  }

  /**
   * T30 · las coordenadas del nodo activo, editables a mano. Reusa `aplicar()` -- el mismo camino
   * que agregar/borrar nodo -- así que un valor tecleado entra al historial como UN paso, igual que
   * cualquier otro cambio. Sin ajuste a rejilla aquí a propósito: quien teclea 12.34 quiere 12.34,
   * no que se le redondee por detrás -- el ajuste (`ajustarRejilla`) es solo para gestos de puntero
   * o teclado donde el valor exacto no era la intención, ver `snapNodoActivo`.
   */
  protected fijarCoordenada(eje: 'x' | 'y', valor: string): void {
    const n = this.activo();
    const p = this.nodoActivo()?.punto;
    if (!n || !p) return;
    const num = Number(valor);
    if (!Number.isFinite(num)) return;
    const dx = eje === 'x' ? num - p[0] : 0;
    const dy = eje === 'y' ? num - p[1] : 0;
    if (dx === 0 && dy === 0) return;
    this.aplicar((subs) => moverNodo(subs, n, dx, dy));
  }

  /** Ctrl+Z / Ctrl+Shift+Z, y Ctrl+Y para quien venga de Windows. */
  protected atajo(ev: KeyboardEvent): void {
    // Borrar, agregar, Tab y Esc no llevan modificador, pero solo aplican con un nodo seleccionado
    // — y nunca mientras se escribe en el buscador, en las coordenadas o en el `d` (T30: los dos
    // últimos son nuevos, y sin este guardia Tab/flechas/Supr saltarían del campo al lienzo).
    const enCampo = ['INPUT', 'TEXTAREA'].includes((ev.target as HTMLElement | null)?.tagName ?? '');

    // Pluma: Esc cancela; Enter termina ABIERTO (2+ puntos, sin forzar cerrar);
    // Shift+Enter cierra (3+, lo mismo que clicar cerca del punto de arranque). Nada más del
    // teclado aplica mientras se dibuja a propósito -- ni deshacer, que operaría sobre `modelos` y
    // no sobre el trazo en progreso, que todavía no entró al historial.
    if (this.modoPluma() && !enCampo) {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        this.cancelarPluma();
      } else if (ev.key === 'Enter' && ev.shiftKey && this.plumaPuedeCerrar()) {
        ev.preventDefault();
        this.confirmarPluma(true);
      } else if (ev.key === 'Enter' && !ev.shiftKey && this.plumaPuedeTerminar()) {
        ev.preventDefault();
        this.confirmarPluma(false);
      }
      return;
    }

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
      if (ev.key === 'Escape') {
        ev.preventDefault();
        this.activo.set(null);
        return;
      }
      if (ev.key === 'Tab') {
        // Captura el foco a propósito: mientras hay un nodo activo, Tab recorre EL TRAZO en vez de
        // saltar a lo siguiente de la página. `Esc` suelta la selección y devuelve Tab a lo suyo —
        // es el contrato, no un efecto secundario: capturarlo siempre (sin nodo activo) rompería la
        // navegación normal del resto del sitio, que es justo lo que T30 no puede permitirse.
        ev.preventDefault();
        this.ciclarNodo(ev.shiftKey ? -1 : 1);
        return;
      }
      const paso = ev.shiftKey ? 0.1 : 1;
      switch (ev.key) {
        case 'ArrowUp':
          ev.preventDefault();
          this.nudgeNodo(0, -paso);
          return;
        case 'ArrowDown':
          ev.preventDefault();
          this.nudgeNodo(0, paso);
          return;
        case 'ArrowLeft':
          ev.preventDefault();
          this.nudgeNodo(-paso, 0);
          return;
        case 'ArrowRight':
          ev.preventDefault();
          this.nudgeNodo(paso, 0);
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

  /** Recorre `nodosVista()` en orden, con vuelta al principio/final -- lo mismo que Tab nativo. */
  private ciclarNodo(delta: 1 | -1): void {
    const lista = this.nodosVista();
    if (!lista.length) return;
    const actual = this.activo();
    const i = actual ? lista.findIndex((n) => n.sub === actual.sub && n.seg === actual.seg) : -1;
    const siguiente = lista[(i + delta + lista.length) % lista.length];
    this.activo.set(siguiente);
    this.manijaActiva.set(null);
  }

  private gestoNudgeAbierto = false;
  private temporizadorNudge?: ReturnType<typeof setTimeout>;

  /**
   * Flechas mueven el nodo activo: 1 unidad, 0.1 con Shift. Reusa el MISMO mutator que el drag
   * (`moverNodo`) — sin geometría nueva, y `RefNodo` solo necesita `sub`/`seg` para encontrar el
   * punto, así que sigue siendo válido aunque el nodo ya se haya movido por una tecla anterior.
   *
   * Mantener flecha presionada dispara keydown repetido del sistema operativo — sin agrupar, cada
   * repetición sería su propio paso de deshacer, y Ctrl+Z tendría que darse veinte veces para
   * volver a donde estaba. Se abre el gesto en la PRIMERA tecla y se cierra 500ms después de la
   * última — igual que un arrastre entero cuenta como un solo paso.
   */
  private nudgeNodo(dx: number, dy: number): void {
    const n = this.activo();
    if (!n) return;
    if (!this.gestoNudgeAbierto) {
      this.historial.abrir(this.modelos());
      this.gestoNudgeAbierto = true;
    }
    const i = this.indiceActivo();
    this.modelos.update((todos) => {
      const copia = [...todos];
      copia[i] = moverNodo(copia[i], n, dx, dy);
      return copia;
    });
    this.tocado.set(true);
    clearTimeout(this.temporizadorNudge);
    this.temporizadorNudge = setTimeout(() => {
      const i2 = this.indiceActivo();
      this.modelos.update((todos) => {
        const copia = [...todos];
        copia[i2] = limpiar(copia[i2]);
        return copia;
      });
      this.snapNodoActivo();
      this.historial.cerrar(this.modelos());
      this.gestoNudgeAbierto = false;
      this.sincronizarPila();
    }, 500);
  }

  /**
   * T30 · ajusta el nodo activo al punto de rejilla más cercano. Se llama SOLO al cerrar un gesto
   * (soltar el arrastre, o los 500ms de silencio tras una flecha) -- nunca en cada paso intermedio,
   * ver el porqué en `ajustarRejilla`. Reusa `moverNodo` con el delta que faltaba para llegar al
   * múltiplo de `PASO_REJILLA` más cercano, así que entra al mismo camino que cualquier otro
   * movimiento -- nada de geometría nueva.
   *
   * `subpathCompleto`: si el arrastre que acaba de soltarse movía el subtrazo entero (Alt), el
   * ajuste tiene que viajar CON él -- ajustar solo el nodo activo mientras el resto se queda donde
   * estaba rompería la rigidez que todo el gesto acababa de mantener.
   */
  private snapNodoActivo(subpathCompleto = false): void {
    if (!this.ajustarRejilla()) return;
    const n = this.activo();
    const p = this.nodoActivo()?.punto;
    if (!n || !p) return;
    const dx = this.redondearAGrid(p[0]) - p[0];
    const dy = this.redondearAGrid(p[1]) - p[1];
    if (dx === 0 && dy === 0) return;
    const i = this.indiceActivo();
    this.modelos.update((todos) => {
      const copia = [...todos];
      copia[i] = limpiar(
        subpathCompleto ? moverSubpath(copia[i], n.sub, dx, dy) : moverNodo(copia[i], n, dx, dy),
      );
      return copia;
    });
  }

  constructor() {
    this.irABlanco();
    try {
      const consulta = matchMedia(`(max-width: ${ANCHO_MINIMO - 1}px)`);
      this.angosto.set(consulta.matches);
      consulta.addEventListener('change', (e) => this.angosto.set(e.matches));
    } catch {
      // Sin `matchMedia` (SSR) la semilla `false` ya deja el editor completo, que es lo correcto
      // para un HTML que ningún viewport real va a medir.
    }
    // El catálogo y los alias llegan por su propio chunk. No se espera a ellos para nada de lo de
    // arriba: `elegido` ya vale (en blanco) desde el primer fotograma, así que se puede dibujar con
    // la pluma de inmediato y lo único que aparece más tarde es la LISTA de la izquierda.
    // `PendingTasks.run` y no un `then` suelto: registra la carga como trabajo pendiente de la
    // aplicación, y de eso dependen el PRERENDER —que serializaría antes de que llegue el
    // catálogo— y el `whenStable()` de los tests.
    const pendientes = inject(PendingTasks);
    pendientes.run(() =>
      cargarCurados().then((catalogo) => {
        const lista = Object.entries(catalogo)
          .map(([nombre, def]) => ({ nombre, def }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.curados.set(lista);
        // Si ya se eligió un curado ANTES de que esto resolviera (rarísimo, el catálogo llega
        // rápido, pero posible), se re-siembra con la entrada REAL: hasta aquí `elegido` tenía un
        // objeto propio, y aunque el `def` sea el mismo, no es la MISMA entrada. Con el arranque en
        // blanco (`nombre: ''`), `find` no encuentra nada y esto no hace nada -- correcto: seguir
        // en blanco es el estado esperado hasta que alguien elija algo.
        const real = lista.find((c) => c.nombre === this.elegido().nombre);
        if (real) this.elegido.set(real);
        // Y AQUÍ el enlace compartido, no antes: el hash trae el NOMBRE del icono, así que hasta
        // que el catálogo no llega no hay con qué resolverlo.
        void this.restaurarDesdeHash();
      }),
    );
    pendientes.run(() =>
      cargarAlias().then((alias) => this.porAlias.set(new Map(Object.entries(alias)))),
    );
  }

  protected elegir(c: Curado): void {
    this.elegido.set(c);
    this.cargar();
    // Elegir un icono es la señal más fuerte de "quiero editar esto ya" -- saltar a la pestaña de
    // edición ahorra el clic extra que, sin esto, pedía cada vez (los controles de edición viven
    // ahora en el dock flotante del lienzo, pero "Edición" sigue teniendo Restablecer y los atajos).
    this.pestanaActiva.set('edicion');
  }

  /**
   * El estado de un lienzo vacío: un path, cero subtrazos -- el mínimo que la pluma necesita para
   * escribir desde el primer clic. NO reusa `cargar()`: esa reconstruye `modelos` desde
   * `pathsOriginales()`, que para un `def` sin `shapes` da un arreglo VACÍO (cero paths), no uno
   * con un path vacío.
   *
   * Reusado por el ARRANQUE del componente (el editor abre en blanco por defecto, con la pluma
   * como la entrada primaria a "crear desde cero") y por el botón "Icono en blanco" a mitad de
   * sesión. Arma la pluma en los DOS casos -- un lienzo en blanco no tiene NADA más que hacer, y
   * eso es cierto llegues por el botón o por la URL directa; obligar a un clic extra solo porque
   * "nadie pidió nada todavía" sería la misma sorpresa negativa al revés, un lienzo que se ve
   * listo pero no responde al primer clic. Lo que SÍ es exclusivo del botón (`empezarEnBlanco`,
   * abajo) es robar foco/scroll hacia el campo de pegar -- eso sí depende de una acción explícita.
   */
  private irABlanco(): void {
    this.elegido.set({ nombre: '', def: { viewBox: '0 0 24 24', shapes: [], animations: {} } });
    this.modelos.set([[]]);
    this.indiceActivo.set(0);
    this.tocado.set(false);
    this.arrastrando = null;
    this.activo.set(null);
    this.manijaActiva.set(null);
    this.reencuadrar();
    this.historial.limpiar();
    this.sincronizarPila();
    this.activarPluma();
  }

  /** El botón "Icono en blanco": mismo estado que `irABlanco()` (pluma incluida), más la vista
      llevada al campo de pegar -- la otra entrada a un lienzo en blanco. */
  protected empezarEnBlanco(): void {
    this.irABlanco();
    // El campo del `d` pegable vive en la pestaña "Salida" del panel. Enfocar y seleccionar deja
    // las DOS vías listas de una: dibujar con la pluma (ya armada por `irABlanco()`, funciona sobre
    // el lienzo sin importar qué pestaña esté abierta), o pegar encima (el paste reemplaza el `[[]]`
    // vacío igual que reemplazaría cualquier otro `d`).
    this.pestanaActiva.set('salida');
    // Un tick para que Angular pinte la pestaña nueva antes de buscar el campo -- mismo patrón que
    // `elegirVariante` en `icon-detail-panel.ts`: disparar antes de que el `@switch` re-pinte deja
    // `campoD` apuntando al `<textarea>` de la pestaña vieja (o a nada).
    setTimeout(() => this.llevarAlCampoD());
  }

  /** Desplaza y enfoca el campo del `d` pegable -- ver el porqué en `empezarEnBlanco`. */
  private llevarAlCampoD(): void {
    const el = this.campoD?.nativeElement;
    if (!el) return;
    let suave = true;
    try {
      suave = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      // SSR: sin matchMedia, no hay nada que desplazar de todos modos.
    }
    el.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'center' });
    el.focus();
    el.select();
  }

  /** Reconstruye los modelos desde el `d` original del icono elegido. */
  private cargar(): void {
    const paths = this.pathsOriginales();
    // Sin `shapes` (el def en blanco) `paths` es `[]` -- CERO paths, no uno vacío. `[[]]` es el
    // mínimo que la pluma necesita para escribir desde el primer clic (mismo motivo que
    // `irABlanco()`); sin esto, "Restablecer" después de dibujar algo en blanco dejaba
    // `indiceActivo` apuntando a nada.
    this.modelos.set(paths.length ? paths.map((d) => parseD(d)) : [[]]);
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
    // La pluma solo tiene sentido en un lienzo en blanco. Sin esto, `irABlanco()` la arma, y elegir
    // DESPUÉS un curado real la dejaba armada -- el primer clic en un nodo del icono recién cargado
    // no arrastraba nada, porque `empezar()` se sale temprano mientras `modoPluma()` es verdad.
    this.cancelarPluma();
  }

  protected restablecer(): void {
    this.cargar();
  }

  // ── Arrastre ────────────────────────────────────────────────────────────────

  private arrastrando:
    | {
        tipo: 'nodo';
        ref: Nodo;
        ultimo: [number, number];
        movio: boolean;
        /** Alt al empezar: mueve TODO el subtrazo del nodo, no solo él. Ver `moverSubpath`. */
        subpathCompleto: boolean;
      }
    | { tipo: 'manija'; ref: Manija; ultimo: [number, number]; movio: boolean }
    /** Arrastre desde el BORDE de una figura (no un nodo): mueve el subtrazo entero directo, sin
        necesitar Alt -- clicar la arista, lejos de cualquier punto, ya es inequívoco. */
    | { tipo: 'subtrazo'; sub: number; ultimo: [number, number]; movio: boolean }
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
    // Con la pluma activa el clic es de ELLA (burbujea a `clicPluma` en el `<svg>`) -- un nodo de
    // OTRO trazo debajo del cursor no debe además empezar su propio arrastre.
    if (this.modoPluma() || !nodo.movible) return;
    ev.preventDefault();
    // `setPointerCapture`: si el puntero sale del círculo a media arrastrada — y sale siempre, es
    // de 5px — los eventos siguen llegando a este elemento en vez de perderse.
    (ev.target as Element).setPointerCapture(ev.pointerId);
    // Se abre el gesto ANTES de mover: el arrastre entero cuenta como un paso de deshacer, no uno
    // por píxel recorrido.
    this.historial.abrir(this.modelos());
    this.arrastrando = {
      tipo: 'nodo',
      ref: nodo,
      ultimo: this.aViewBox(ev),
      movio: false,
      subpathCompleto: ev.altKey,
    };
    this.activo.set(nodo);
    this.arrastrandoNodo.set(true);
    this.manijaActiva.set(null);
  }

  protected empezarManija(ev: PointerEvent, manija: Manija): void {
    // Sin `stopPropagation` aquí: el evento burbujea al `<svg>` y lo toma `clicPluma`.
    if (this.modoPluma()) return;
    ev.preventDefault();
    ev.stopPropagation();
    (ev.target as Element).setPointerCapture(ev.pointerId);
    this.historial.abrir(this.modelos());
    this.arrastrando = { tipo: 'manija', ref: manija, ultimo: this.aViewBox(ev), movio: false };
    this.manijaActiva.set(manija);
    this.activo.set(null);
  }

  /**
   * Arrastre desde el BORDE de una figura: clicar el trazo mismo, lejos de cualquier nodo, mueve
   * el subtrazo entero -- sin necesitar Alt, porque el punto de agarre ya lo dice todo (un nodo
   * cerca habría ganado el evento primero, por el orden de pintado del SVG). También pone ese
   * subtrazo como el trazo activo: arrastrar una figura y seguir editándola con las herramientas
   * de nodo debería ser el mismo gesto, no dos.
   */
  protected empezarSubtrazo(ev: PointerEvent, pathIndex: number, subIndex: number): void {
    if (this.modoPluma()) return;
    ev.preventDefault();
    (ev.target as Element).setPointerCapture(ev.pointerId);
    this.elegirIndiceActivo(pathIndex);
    this.historial.abrir(this.modelos());
    this.arrastrando = { tipo: 'subtrazo', sub: subIndex, ultimo: this.aViewBox(ev), movio: false };
    this.activo.set(null);
    this.manijaActiva.set(null);
  }

  protected mover(ev: PointerEvent): void {
    // Solo actualiza el fantasma del último punto al cursor -- la pluma no arrastra ni panea.
    if (this.modoPluma()) {
      if (this.plumaEnProgreso()) this.punteroPluma.set(this.aViewBox(ev));
      return;
    }
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
      if (gesto.tipo === 'nodo') {
        copia[i] = gesto.subpathCompleto
          ? moverSubpath(copia[i], gesto.ref.sub, dx, dy)
          : moverNodo(copia[i], gesto.ref, dx, dy);
      } else if (gesto.tipo === 'subtrazo') {
        copia[i] = moverSubpath(copia[i], gesto.sub, dx, dy);
      } else {
        copia[i] = moverManija(copia[i], gesto.ref, dx, dy);
      }
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
    const gesto = this.arrastrando;
    this.arrastrando = null;

    // Solo se redondea si de verdad hubo arrastre. Redondear en cada click parecía inofensivo y no
    // lo era: un simple SELECCIONAR cambiaba los decimales de una edición anterior, el historial lo
    // veía como cambio y metía un paso — así que el siguiente Ctrl+Z deshacía ese redondeo en vez
    // de la operación que el usuario quería deshacer.
    if (gesto.movio) {
      const i = this.indiceActivo();
      this.modelos.update((todos) => {
        const copia = [...todos];
        copia[i] = limpiar(copia[i]);
        return copia;
      });
      // Solo nodos: una manija bézier no vive EN la rejilla, apunta hacia dónde se curva el trazo
      // -- ajustarla al múltiplo más cercano rompería la curva en vez de alinear un punto.
      if (gesto.tipo === 'nodo') this.snapNodoActivo(gesto.subpathCompleto);
    }
    this.historial.cerrar(this.modelos());
    this.sincronizarPila();
  }

  private readonly taller = inject(Taller);
  private readonly router = inject(Router);
  private readonly rutas = inject(Rutas);

  /**
   * Manda la forma editada al Lab y navega: el traspaso que evita copiar y pegar a mano.
   *
   * `rutas.a('lab')` y no `['/lab']` a secas: sin prefijo de idioma, esto SÍ llegaba porque cae en
   * la red de redirección catch-all de `app.routes.ts` -- pero es un salto de más que el resto del
   * sitio ya no necesita en ningún otro lado (`patrones.html` usa el mismo patrón para ir a Docs).
   */
  protected coreografiar(): void {
    this.taller.enviar(this.elegido().nombre, this.defEditado());
    void this.router.navigate([this.rutas.a('lab')]);
  }

  // ── Salida ──────────────────────────────────────────────────────────────────

  /** El `d` abierto y el JSON cerrado: uno se lee de un vistazo, el otro son cien líneas. */
  protected readonly verPath = signal(true);
  protected readonly verJson = signal(false);

  /**
   * Copiar `d` y copiar JSON usaban un `alPortapapeles()` casero que duplicaba exactamente lo que
   * `Copiador` ya hace en todo el resto del sitio (incluido el propio botón de enlace de aquí
   * abajo) -- sin el morph copy→check que sí usa `bloque-codigo.ts`. Dos instancias porque son dos
   * acuses independientes: copiar el JSON no debe apagar la palomita del `d`, ni viceversa.
   */
  protected readonly copiadorPath = new Copiador();
  protected readonly copiadorJson = new Copiador();

  protected readonly iconoCopiarPath = computed<MorphIcon>(() =>
    this.copiadorPath.copiado() ? checkIcon : copyIcon,
  );
  protected readonly iconoCopiarJson = computed<MorphIcon>(() =>
    this.copiadorJson.copiado() ? checkIcon : copyIcon,
  );

  protected copiarJson(): Promise<void> {
    return this.copiadorJson.copiar(this.json());
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
    this.descargar(`${this.elegido().nombre}.json`, this.json(), 'application/json');
  }

  /** El mecanismo, en un sitio: dos formatos que se bajan igual no son dos funciones. */
  private descargar(archivo: string, contenido: string, tipo: string): void {
    const doc = this.lienzo.nativeElement.ownerDocument;
    const url = URL.createObjectURL(new Blob([contenido], { type: tipo }));
    const enlace = doc.createElement('a');
    enlace.href = url;
    enlace.download = archivo;
    enlace.click();
    setTimeout(() => URL.revokeObjectURL(url));
  }

  protected copiar(): Promise<void> {
    return this.copiadorPath.copiar(this.editado());
  }

  /**
   * T30 · el campo del `d` deja de ser solo lectura: pegar un `d` válido carga esa forma.
   * `preventDefault()` en el paste porque la aplicación ya reescribe el `<textarea>` — el binding a
   * `editado()` reacciona en cuanto `modelos` cambia, así que dejar que el navegador inserte el
   * texto crudo ADEMÁS solo duplicaría lo que ya se está pintando por su cuenta.
   */
  protected pegarD(ev: ClipboardEvent): void {
    const texto = ev.clipboardData?.getData('text/plain');
    if (!texto) return;
    ev.preventDefault();
    this.cargarDesdeTexto(texto);
  }

  /**
   * También en `(change)` (blur tras editar a mano), no solo en `paste` — es lo que hace al campo
   * "editable" de verdad y no solo "pegable". Comparado contra `editado()` antes de tocar nada: un
   * `blur` que sigue a un `paste` ya aplicado no debe meter un segundo paso vacío al historial.
   *
   * Reglas de correspondencia: N líneas para N trazos reemplaza todos; UNA línea reemplaza solo el
   * trazo activo (el caso común — la mayoría de los iconos son un solo `path`). Cualquier otro
   * conteo no se aplica: adivinar a cuál de varios trazos pertenece una línea de más es más riesgo
   * de silenciosamente romper otro trazo que el beneficio de intentarlo. `parseD` no truena con
   * geometría inválida (ver su comentario) — el peor caso es una forma rara, recuperable con
   * Ctrl+Z o «Restablecer», nunca una excepción.
   */
  protected cargarDesdeTexto(texto: string): void {
    const lineas = texto
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (!lineas.length) return;
    const actuales = this.modelos();
    let nuevos: SubPath[][];
    if (lineas.length === actuales.length) {
      nuevos = lineas.map(parseD);
    } else if (lineas.length === 1) {
      const i = this.indiceActivo();
      nuevos = actuales.map((m, k) => (k === i ? parseD(lineas[0]) : m));
    } else {
      return;
    }
    const dNuevo = nuevos.map((subs) => subs.map(dDeSubpath).join('')).join('\n');
    if (dNuevo === this.editado()) return;
    this.historial.registrar(actuales);
    this.modelos.set(nuevos);
    this.tocado.set(true);
    this.activo.set(null);
    this.manijaActiva.set(null);
    this.sincronizarPila();
  }

  ngOnDestroy(): void {
    this.copiadorPath.destruir();
    this.copiadorJson.destruir();
    this.copiadorEnlace.destruir();
    clearTimeout(this.temporizadorUrl);
    clearTimeout(this.avisoGuardado);
    clearTimeout(this.temporizadorNudge);
  }
}
