import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  afterNextRender,
  signal,
  computed,
  effect,
  inject,
  OnDestroy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { provideTranslocoScope, TranslocoPipe, translateSignal } from '@jsverse/transloco';
import iconosEn from '../../../i18n/iconos/en.json';
import {
  GfIconComponent,
  CURATED_ICONS,
  AnimatedIconDef,
  circleIcon,
  squareIcon,
  diamondIcon,
  triangleIcon,
  leafIcon,
  codeIcon,
  checkIcon,
  copyIcon,
} from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { RouterLink } from '@angular/router';
import { BotonDonar } from '../../shared/marca/boton-donar';
import { BotonGithub } from '../../shared/marca/boton-github';
import { Boton } from '../../shared/ui/boton';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';
import { Chip } from '../../shared/ui/chip';
import { Contador } from '../../shared/ui/contador';
import { Grupo } from '../../shared/ui/grupo';
import { NombreTransicion } from '../../shared/ui/nombre-transicion';
import { TituloSiTruncado } from '../../shared/ui/titulo-si-truncado';
import { IconDetailPanel } from './icon-detail-panel';
import { insigniasDe, type ClaveInsignia, type Insignia } from './icon-badges';
import { CIFRAS } from '../../core/cifras';
import { NOMBRES_GENERADOS } from './nombres-generados';
import { iconoPlano } from '../../core/morph-icon-plano';
import { conTransicion } from '../../core/transicion';
import { tema } from '../../core/tema';
import { densidad, elegirDensidad, type Densidad } from '../../core/densidad';

/**
 * Lo que se enseña en la portada. Es el uso REAL, no una ilustración: cubre el import, el
 * `imports:` de un standalone y la etiqueta con un input de configuración.
 *
 * Gemelo del de `docs/empezando.html`, que es la versión larga. Que los dos digan la verdad lo
 * cuida `iconos.spec.ts`: comprueba que cada símbolo citado aquí EXISTA en el paquete, así que
 * el próximo renombrado de la API rompe el test en vez de dejar la portada mintiendo.
 */
const SNIPPET_PORTADA = `import { Component } from '@angular/core';
import { GfIconComponent, bellIcon } from 'glyphflow';

@Component({
  selector: 'app-alert',
  imports: [GfIconComponent],
  template: '<gf-icon [iconDef]="bell" [size]="24" label="Notifications" />',
})
export class Alert {
  protected readonly bell = bellIcon;
}`;

export { SNIPPET_PORTADA };

interface CuratedEntry {
  name: string;
  def: AnimatedIconDef;
  /** Lo que distingue a ESTA tarjeta de las otras 179. Vacío en la mayoría, y está bien. */
  insignias: Insignia[];
  /** `draw` + `default` + extras — el indicador numérico de la tarjeta, no el detalle de cuáles. */
  numAnimaciones: number;
}

/**
 * Los curados, cada uno con su coreografía real corriendo en el navegador.
 *
 * Consume el paquete PUBLICADO (`glyphflow` del registro, vía el alias en tsconfig.paths.json),
 * nunca `dist/glyphflow` ni el código de projects/glyphflow. Si algo de la API pública no alcanza,
 * esta página es la que se entera — que es justo para lo que existe.
 *
 * Se usa `[iconDef]` y NO `name=`: esa es la ruta tree-shakeable, y de paso evita arrastrar el
 * registro completo de 1767 iconos a una demo que solo enseña 180.
 */
@Component({
  selector: 'app-iconos',
  imports: [
    GfIconComponent,
    GfIconMorphComponent,
    IconDetailPanel,
    RouterLink,
    BotonDonar,
    BotonGithub,
    Boton,
    CampoBusqueda,
    Chip,
    Contador,
    Grupo,
    NombreTransicion,
    TituloSiTruncado,
    TranslocoPipe,
  ],
  // El scope vive aquí y no en la ruta a propósito: `app.routes.ts` es eager, así que su loader
  // se resuelve en un `import()` aparte que se encadena DESPUÉS de bajar este chunk — dos esperas
  // en fila. Medido en 3G lento, los textos del hero tardaban ~9.5s en aparecer y mientras tanto
  // se veían cajas vacías. Declarado aquí, el inglés viaja DENTRO de este chunk y llega con él.
  providers: [
    provideTranslocoScope({
      scope: 'iconos',
      loader: {
        en: () => Promise.resolve(iconosEn),
        es: () => import('../../../i18n/iconos/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './iconos.html',
  styleUrl: './iconos.css',
})
export class Iconos implements OnDestroy {
  @ViewChildren(GfIconComponent) private icons!: QueryList<GfIconComponent>;
  @ViewChild('barraCatalogo') private barraCatalogo?: ElementRef<HTMLElement>;

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private temporizadorScroll?: ReturnType<typeof setTimeout>;

  /**
   * Escribir arriba filtra abajo y ARRASTRA la página hasta el catálogo. Solo desde el héroe: el
   * campo de abajo ya está en el catálogo, y moverle el suelo a alguien mientras teclea es
   * exactamente lo que no debe pasar.
   *
   * Los 300 ms no son un debounce del filtrado —ese es inmediato, la señal se escribe ya— sino
   * del SCROLL: arrastrar la página en la primera letra le quitaría el campo de debajo del dedo
   * a quien todavía está escribiendo.
   */
  protected buscarDesdeHero(texto: string): void {
    this.busqueda.set(texto);
    clearTimeout(this.temporizadorScroll);
    if (texto.trim().length < 2) return;
    this.temporizadorScroll = setTimeout(() => this.irAlCatalogo(), 300);
  }

  private irAlCatalogo(): void {
    const destino = this.barraCatalogo?.nativeElement;
    if (!destino) return;
    // Quien pidió menos movimiento no quiere que la página se deslice sola bajo sus pies.
    const suave = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    destino.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
  }

  protected readonly densidad = densidad;

  /* El glifo cambia de tamaño con la densidad, no la tarjeta sola: a 104px de caja, un glifo de 48
     deja el nombre sin sitio y la tarjeta se lee apretada en vez de densa. */
  protected readonly tamGlifo = computed(() => (densidad() === 'comoda' ? 48 : 32));

  protected cambiarDensidad(d: Densidad): void {
    elegirDensidad(d);
  }

  protected readonly snippet = SNIPPET_PORTADA;
  protected readonly angularPeer = CIFRAS.angularPeer;

  protected readonly copiado = signal(false);

  /* `copyIcon` aplanado: son 2 figuras contra la 1 de `checkIcon`, y WAAPI solo interpola entre
     `d` con la misma estructura. Mismo tratamiento que en el panel de detalle. */
  private readonly copyIconPlano = iconoPlano(copyIcon);
  protected readonly iconoCopiar = computed<MorphIcon>(() =>
    this.copiado() ? checkIcon : this.copyIconPlano,
  );

  /* Una sola lectura de `copiado()` alimenta rótulo y `aria-label`: con dos lecturas sueltas es
     cuestión de tiempo que el botón diga una cosa y el lector de pantalla otra. */
  private readonly claveCopiar = computed(() =>
    this.copiado() ? 'iconos.api.copiado' : 'iconos.api.copiar',
  );
  protected readonly rotuloCopiar = translateSignal(this.claveCopiar);

  protected async copiarSnippet(): Promise<void> {
    try {
      await navigator.clipboard.writeText(SNIPPET_PORTADA);
      this.copiado.set(true);
      setTimeout(() => this.copiado.set(false), 1500);
    } catch {
      // La Clipboard API pide contexto seguro o permiso. Sin eso el `<pre>` sigue siendo
      // seleccionable, así que Ctrl+C funciona igual — no hay nada que reponer.
    }
  }

  private readonly todos: CuratedEntry[] = Object.entries(CURATED_ICONS)
    .map(([name, def]) => ({
      name,
      def,
      insignias: insigniasDe(name, def),
      numAnimaciones: Object.keys(def.animations).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  protected readonly total = this.todos.length;

  /**
   * El conteo del título sale del catálogo, y se pone DESDE AQUÍ y no desde la ruta.
   *
   * Estaba fijo en «180» y la 1.2.0 lo dejó en 405 sin que nadie se enterara. Derivarlo en el
   * router costaba 460KB —es eager, y `import('glyphflow')` ahí subía el registro entero al chunk
   * inicial (medido: 354KB → 813KB)—. Este componente ya importa `CURATED_ICONS`, así que el dato
   * es gratis. Corre después del `title` de la ruta, que queda como respaldo sin número.
   *
   * Vive como `effect()` y no como un `setTitle` de una sola vez: la clave está en el scope
   * ROOT (`routes.iconos.tituloConConteo`, en `i18n/{en,es}.json`), así que un cambio de idioma
   * en vivo tiene que volver a pintar el título tal como lo hace `TranslatedTitleStrategy` con el
   * resto de las rutas — si no, cambiar de idioma dejaría ESTE título congelado en el viejo.
   */
  private readonly tituloServicio = inject(Title);
  private readonly tituloConConteo = translateSignal(
    'routes.iconos.tituloConConteo',
    computed(() => ({ n: this.total })),
  );
  // `inject()` solo es válido en el cuerpo de la clase, no dentro del callback del effect — por
  // eso el servicio se inyecta arriba, como campo, y aquí solo se usa `this.tituloServicio`.
  private readonly efectoTitulo = effect(() =>
    this.tituloServicio.setTitle(this.tituloConConteo()),
  );

  /**
   * Media docena para la fila animada del hero — la primera prueba de "esto se mueve" antes de
   * llegar al catálogo completo. Nombres fijos y no un `slice` al azar: se eligieron por variedad de
   * coreografía (giro, resorte, trazo, rebote), no porque quedaran primero alfabéticamente.
   */
  protected readonly demo: CuratedEntry[] = ['sparkles', 'bell', 'settings', 'star', 'zap', 'send']
    .map((name) => this.todos.find((e) => e.name === name))
    .filter((e): e is CuratedEntry => !!e);

  /**
   * El logotipo del hero, en su versión por tema. Son DOS assets porque el arte es distinto, no el
   * mismo con otro color: el claro pesa 50 KB contra 425 del oscuro.
   */
  protected readonly logoAnimado = computed(() =>
    tema() === 'claro'
      ? '/images/glyphflow-anim-preview-light.gif'
      : '/images/glyphflow-anim-preview.gif',
  );

  /** Con movimiento reducido se sirve quieto — y también tiene que seguir al tema. */
  protected readonly logoQuieto = computed(() =>
    tema() === 'claro' ? '/images/glyphflow-logo-light.svg' : '/images/glyphflow-logo.svg',
  );

  /** El resto de las cifras del hero. */
  protected readonly cifras = CIFRAS;

  /**
   * La secuencia del showcase de morph: cuatro FORMAS, no cuatro iconos de UI.
   *
   * Es deliberado. Lo que el morph hace es interpolar contornos, y con formas geométricas se ve el
   * contorno viajar; con un `copy → check` se ve un cambio de símbolo y el mecanismo queda tapado
   * por el significado. Para el «para qué sirve» ya está la página de Patrones.
   */
  protected readonly formas: MorphIcon[] = [circleIcon, squareIcon, diamondIcon, triangleIcon];

  /** Qué paso muestra cada hueco. Las cuatro posiciones avanzan a la vez, corridas una de otra. */
  protected readonly paso = signal(0);

  private readonly reloj = setInterval(
    () => this.paso.update((p) => (p + 1) % this.formas.length),
    1900,
  );

  protected formaEn(hueco: number): MorphIcon {
    return this.formas[(this.paso() + hueco) % this.formas.length];
  }

  protected irAlPaso(n: number): void {
    this.paso.set(n);
  }

  /**
   * Los tres argumentos del pie. Viven en el componente y no en la plantilla porque así el bloque
   * de traducción de mañana es un arreglo y no tres trozos de markup repetidos.
   */
  protected readonly argumentos = [
    {
      icono: leafIcon,
      titulo: 'iconos.argumentos.liviano.titulo',
      texto: 'iconos.argumentos.liviano.texto',
    },
    {
      icono: codeIcon,
      titulo: 'iconos.argumentos.api.titulo',
      texto: 'iconos.argumentos.api.texto',
    },
    {
      icono: CURATED_ICONS['sparkles'],
      titulo: 'iconos.argumentos.movimiento.titulo',
      texto: 'iconos.argumentos.movimiento.texto',
    },
  ];

  constructor() {
    afterNextRender(() => this.enfocarBuscadorSiProcede());
  }

  ngOnDestroy(): void {
    clearInterval(this.reloj);
    clearTimeout(this.temporizadorScroll);
  }

  /** Filtro por insignia. `null` = "Todos", que es el estado normal. */
  protected readonly filtro = signal<ClaveInsignia | null>(null);

  /** Filtro por nombre. Substring, sin distinguir mayúsculas. */
  protected readonly busqueda = signal('');

  /**
   * Cuántos iconos trae cada insignia — el número va en el propio botón del filtro.
   *
   * Campo plano, no `computed`: el catálogo es estático, así que esto se calcula una vez y no
   * depende de ninguna señal. Envolverlo en `computed` fingiría una reactividad que no existe —
   * `entries` sí la tiene, y el contraste entre los dos es la señal de cuál reacciona a qué.
   */
  protected readonly conteos: { clave: ClaveInsignia; etiqueta: string; n: number }[] = (
    [
      { clave: 'extras', etiqueta: 'iconos.barra.insignias.extras' },
      { clave: 'held', etiqueta: 'iconos.barra.insignias.held' },
      { clave: 'solo-draw', etiqueta: 'iconos.barra.insignias.soloDraw' },
    ] as { clave: ClaveInsignia; etiqueta: string }[]
  )
    .map((o) => ({ ...o, n: this.todos.filter((e) => tiene(e, o.clave)).length }))
    .filter((o) => o.n > 0);

  protected readonly entries = computed<CuratedEntry[]>(() => {
    const f = this.filtro();
    const q = this.busqueda().trim().toLowerCase();
    const base = f ? this.todos.filter((e) => tiene(e, f)) : this.todos;
    return q ? base.filter((e) => e.name.toLowerCase().includes(q)) : base;
  });

  /**
   * Los generados que casan con la búsqueda.
   *
   * El catálogo del paquete tiene 1767 iconos y esta rejilla enseña 911: los otros 856 existen, se
   * pueden usar, y hasta ahora quien buscaba uno concluía que no estaba. Eso es lo que arregla
   * esto — decirlo, no pintarlos. Pintarlos costaba +224 kB en el bundle inicial (medido), y este
   * sitio vende tree-shaking real en su propia portada.
   *
   * Solo los NOMBRES, que es lo que hace falta para responder "sí existe": la geometría no.
   */
  protected readonly generadosCoincidentes = computed<string[]>(() => {
    const q = this.busqueda().trim().toLowerCase();
    if (q.length < 2) return [];
    return NOMBRES_GENERADOS.filter((n) => n.includes(q));
  });

  /** Una muestra, no los 856: la lista es una pista, no un segundo catálogo. */
  protected readonly muestraGenerados = computed(() => this.generadosCoincidentes().slice(0, 10));

  /** Icono bajo inspección en el Motion Inspector. `null` = panel cerrado. */
  protected readonly inspeccionado = signal<CuratedEntry | null>(null);

  /**
   * Selección directa, no toggle: con la cápsula "Todos" ya hay una forma explícita de volver a
   * `null`, así que cada botón de insignia siempre ACTIVA la suya — sin el "click de nuevo para
   * quitar" que antes era la única salida y no se anunciaba en ningún lado.
   */
  protected elegirFiltro(clave: ClaveInsignia | null): void {
    // Dentro de una transición de vista: las tarjetas que sobreviven al filtro VIAJAN a su sitio
    // nuevo en vez de que la cuadrícula se re-arme de golpe. Es el propio sitio demostrando lo que
    // vende — y no cuesta una librería, porque el navegador ya trae el motor.
    conTransicion(() => this.filtro.set(clave));
  }

  protected repetirTodo(): void {
    for (const icon of this.icons) icon.play();
  }

  /**
   * La tarjeta que abrió el panel. Se guarda para devolverle el foco al cerrar: sin esto, `Esc`
   * deja el foco en el `<body>` y el siguiente `Tab` reinicia el recorrido desde el header —
   * quien navega por teclado pierde el sitio donde iba, que es justo lo que el panel-overlay
   * venía a arreglar para el ratón.
   */
  private origenFoco: HTMLElement | null = null;

  /**
   * `autofocus` solo en escritorio y solo sin ancla en la URL.
   *
   * En móvil abriría el teclado nada más entrar, tapando media pantalla antes de que nadie haya
   * pedido buscar. Y con un ancla, el visitante venía a un sitio concreto de la página: robarle
   * el foco lo devolvería arriba.
   */
  private enfocarBuscadorSiProcede(): void {
    if (location.hash) return;
    if (!matchMedia('(min-width: 768px) and (pointer: fine)').matches) return;
    this.host.nativeElement.querySelector<HTMLInputElement>('.busqueda-hero input')?.focus();
  }

  protected inspeccionar(entry: CuratedEntry, ev?: Event): void {
    this.origenFoco = (ev?.currentTarget as HTMLElement) ?? null;
    this.inspeccionado.set(entry);
  }

  protected cerrarDetalle(): void {
    this.inspeccionado.set(null);
    this.origenFoco?.focus();
    this.origenFoco = null;
  }
}

function tiene(entry: CuratedEntry, clave: ClaveInsignia): boolean {
  return entry.insignias.some((i) => i.clave === clave);
}
