import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  afterNextRender,
  signal,
  computed,
  linkedSignal,
  effect,
  inject,
  OnDestroy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
import { hayMovimiento, siguiendoAlSistema } from '../../core/movimiento';
import { NombreTransicion } from '../../shared/ui/nombre-transicion';
import { RejillaTeclado } from '../../shared/ui/rejilla-teclado';
import { TituloSiTruncado } from '../../shared/ui/titulo-si-truncado';
import { IconDetailPanel } from './icon-detail-panel';
import { insigniasDe, type ClaveInsignia, type Insignia } from './icon-badges';
import { CIFRAS } from '../../core/cifras';
import { iconoPlano } from '../../core/morph-icon-plano';
import { conTransicion } from '../../core/transicion';
import { Copiador } from '../../shared/ui/copiar';
import { normalizar, ordenarPorRelevancia } from './buscador';
import { Rutas } from '../../core/rutas.service';
import { tema, temaSiguiendoAlSistema } from '../../core/tema';
import { Visible } from '../../shared/ui/visible';
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
    RejillaTeclado,
    TituloSiTruncado,
    TranslocoPipe,
    Visible,
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
  /** Los enlaces se piden por ID: el slug cambia con el idioma. Ver `core/rutas.ts`. */
  protected readonly rutas = inject(Rutas);

  @ViewChildren(GfIconComponent) private icons!: QueryList<GfIconComponent>;
  /* En paralelo a `icons` y en el MISMO orden: la instancia sabe animarse, pero solo el elemento
     sabe dónde está. Angular garantiza que las dos consultas recorren la vista igual. */
  @ViewChildren(GfIconComponent, { read: ElementRef })
  private iconEls!: QueryList<ElementRef<HTMLElement>>;
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

  protected readonly copiador = new Copiador();
  protected readonly copiado = this.copiador.copiado;

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

  /**
   * La lógica sale de `Copiador`, compartida con `<app-bloque-codigo>`: era la cuarta copia de lo
   * mismo en el repo, con temporizadores distintos entre sí. El BOTÓN sigue siendo el de aquí —
   * rotulado y siempre visible, en la cabecera de la sección — porque en la portada el copiar es
   * la acción principal, no un accesorio que aparece al pasar el ratón.
   */
  protected copiarSnippet(): void {
    void this.copiador.copiar(SNIPPET_PORTADA);
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
  //
  // La guarda del vacío NO es defensiva de más: `translateSignal` devuelve `''` mientras la
  // traducción del root no ha cargado, y en español eso es un `import()` dinámico. En el navegador
  // se autocorregía al llegar el JSON y nadie lo notó nunca; al prerenderizar, la foto se toma en
  // ese hueco y `/es` salía con `<title></title>` publicado. Es la MISMA guarda que ya tiene
  // `TranslatedTitleStrategy`, y por la misma razón.
  private readonly efectoTitulo = effect(() => {
    const texto = this.tituloConConteo();
    if (texto) this.tituloServicio.setTitle(texto);
  });

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

  /** Sin movimiento se sirve quieto — y también tiene que seguir al tema. */
  protected readonly logoQuieto = computed(() =>
    tema() === 'claro' ? '/images/glyphflow-logo-light.svg' : '/images/glyphflow-logo.svg',
  );

  /**
   * Los `<source>` del `<picture>`, en el orden en que el navegador los prueba: gana el PRIMERO
   * que casa, así que lo más específico va arriba.
   *
   * Existen porque el sitio se prerenderiza y el `src` del `<img>` se hornea en el HTML estático.
   * En el servidor no hay `matchMedia`, así que salía siempre el par por defecto —animado y
   * oscuro— y quien prefiere claro se bajaba el GIF oscuro de 425 KB para verlo cambiar al claro
   * de 50 en cuanto hidrataba. Una media query la resuelve el navegador antes de pintar y solo
   * descarga la fuente que casa, así que no hay ni salto ni descarga tirada.
   *
   * Cada dimensión aporta su `<source>` SOLO mientras la mande el sistema: en cuanto alguien
   * elige a mano, la media query siempre le ganaría —el navegador resuelve el `<picture>` antes
   * de mirar el `src`— y por eso se retira y manda la señal.
   */
  protected readonly fuentesLogo = computed<{ media: string; srcset: string }[]>(() => {
    const sistemaTema = temaSiguiendoAlSistema();
    const sistemaMovimiento = siguiendoAlSistema();
    const fuentes: { media: string; srcset: string }[] = [];

    if (sistemaMovimiento && sistemaTema) {
      fuentes.push({
        media: '(prefers-reduced-motion: reduce) and (prefers-color-scheme: light)',
        srcset: '/images/glyphflow-logo-light.svg',
      });
    }
    if (sistemaMovimiento) {
      // Quieto. Con el tema a mano ya viene resuelto en `logoQuieto()`; con el tema del sistema,
      // el caso claro lo agarró la línea de arriba y aquí solo queda el oscuro.
      fuentes.push({
        media: '(prefers-reduced-motion: reduce)',
        srcset: sistemaTema ? '/images/glyphflow-logo.svg' : this.logoQuieto(),
      });
    }
    if (sistemaTema) {
      // Claro. Si el movimiento lo eligió el visitante, se respeta cuál de los dos claros toca.
      fuentes.push({
        media: '(prefers-color-scheme: light)',
        srcset:
          sistemaMovimiento || hayMovimiento()
            ? '/images/glyphflow-anim-preview-light.gif'
            : '/images/glyphflow-logo-light.svg',
      });
    }
    return fuentes;
  });

  /*
   * El que acaba en el `src` del `<img>`. Sale de la preferencia EFECTIVA, no de la del sistema:
   * el `<source>` de al lado cubre el caso por defecto, y esto cubre el de quien eligió a mano.
   */
  protected readonly siguiendoAlSistema = siguiendoAlSistema;
  protected readonly logoHero = computed(() =>
    hayMovimiento() ? this.logoAnimado() : this.logoQuieto(),
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

    // `?q=` de la URL, para que un enlace de búsqueda compartido abra ya filtrado. Se lee del
    // snapshot y no por suscripción: esta página no se re-navega a sí misma —el query lo escribe
    // `replaceState`, que NO dispara al router— así que un stream aquí no tendría nada que emitir.
    const inicial = this.ruta.snapshot.queryParamMap.get('q');
    if (inicial) this.busqueda.set(inicial);

    /*
     * Un solo efecto para las dos vías de entrada: el campo del héroe pasa por un método, pero el
     * del catálogo escribe la señal directo con `[(texto)]`. Enganchar el método habría dejado la
     * mitad de los tecleos sin cargar los tags, y el síntoma —buscar `delete` funciona arriba y no
     * abajo— es de los que se atribuyen a cualquier cosa menos a esto.
     */
    effect(() => {
      const q = this.busqueda().trim();
      if (q.length >= 2) this.asegurarTags();
      this.sincronizarUrl(q);
    });
  }

  private readonly ruta = inject(ActivatedRoute);
  private readonly ubicacion = inject(Location);
  private temporizadorUrl?: ReturnType<typeof setTimeout>;

  /**
   * Escribe `?q=` sin navegar. `Location.replaceState` y NO `router.navigate`: el router tiene
   * `withViewTransitions` puesto, así que navegar por cada tecla animaría la página entera en cada
   * pulsación. Esto no es una navegación, es la URL poniéndose al día con un filtro de interfaz.
   *
   * Los 150 ms son del ticket y aquí sí ganan algo: sin ellos el historial recibe una reescritura
   * por letra. El FILTRADO en cambio sigue siendo inmediato — ver la nota de `buscarDesdeHero`.
   *
   * `replaceState`, no `pushState`: teclear no debería llenar el botón de atrás de estados
   * intermedios. Y el `canonical` de `core/enlaces-idioma.ts` ignora el query a propósito, así que
   * esto no parte el showcase en tantas URLs como búsquedas haga la gente.
   */
  private sincronizarUrl(q: string): void {
    clearTimeout(this.temporizadorUrl);
    this.temporizadorUrl = setTimeout(() => {
      const base = this.ubicacion.path().split(/[?#]/)[0];
      this.ubicacion.replaceState(base + (q ? `?q=${encodeURIComponent(q)}` : ''));
    }, 150);
  }

  ngOnDestroy(): void {
    clearInterval(this.reloj);
    clearTimeout(this.temporizadorScroll);
    clearTimeout(this.temporizadorUrl);
  }

  /** Filtro por insignia. `null` = "Todos", que es el estado normal. */
  protected readonly filtro = signal<ClaveInsignia | null>(null);

  /** Filtro por nombre y por sinónimo. Ver `buscador.ts` para el orden de relevancia. */
  protected readonly busqueda = signal('');

  /**
   * Los sinónimos de Lucide, `null` hasta que alguien busca.
   *
   * **No se importan de `glyphflow`, y eso está medido**: el shell ya importa el paquete
   * estáticamente (el `<gf-icon>` del header), así que referenciar `ICON_TAGS` lo ancla al bundle
   * INICIAL en vez de al chunk de esta página. Transferencia inicial 147.90 → 181.10 kB, +33 kB
   * gzip que pagaría TODO visitante, incluido el que nunca escribe en el buscador. Es el mismo
   * mecanismo que midió T29, y por el que ya existe `nombres-generados.ts`.
   *
   * Con `import()` sobre una copia local, esbuild le da su propio chunk — igual que a `es.json` —
   * y solo lo baja quien busca. Lo mantiene en sync `tags-catalogo.spec.ts`.
   */
  private readonly tags = signal<Record<string, readonly string[]> | null>(null);
  private pidiendoTags = false;

  /**
   * Normalizados UNA vez al llegar, no en cada tecla. Son 13 829 tags: normalizarlos por pulsación
   * significaba pagar 13 829 `normalize('NFD')` por letra tecleada. Aquí se paga una sola vez y
   * el filtrado queda en comparaciones de cadenas.
   */
  private readonly tagsNormalizados = computed<Record<string, readonly string[]> | null>(() => {
    const crudos = this.tags();
    if (!crudos) return null;
    return Object.fromEntries(
      Object.entries(crudos).map(([nombre, tags]) => [nombre, tags.map(normalizar)]),
    );
  });

  /**
   * Se dispara al primer tecleo útil, no al montar: quien entra a mirar la rejilla no debería
   * bajar 162 kB de sinónimos que no pidió. Mientras el chunk viaja, el buscador ya responde por
   * nombre — los niveles de tag simplemente aparecen cuando el dato llega (ver `buscador.ts`).
   */
  private asegurarTags(): void {
    // Bandera plana y no `this.tags()`: esto se llama DESDE un efecto, y leer la señal ahí la
    // volvería una dependencia — el efecto se re-dispararía al llegar el chunk, sin necesidad.
    if (this.pidiendoTags) return;
    this.pidiendoTags = true;
    void import('./tags-catalogo.json').then((m) => {
      this.tags.set(m.default as Record<string, readonly string[]>);
    });
  }

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
    const q = this.busqueda().trim();
    const base = f ? this.todos.filter((e) => tiene(e, f)) : this.todos;
    if (!q) return base;
    const tags = this.tagsNormalizados();
    return ordenarPorRelevancia(base, q, (e) => e.name, tags ? (e) => tags[e.name] : undefined);
  });

  /**
   * Cuántas tarjetas hay montadas ahora mismo. Crece al llegar al final de la lista.
   *
   * NO es paginación de la búsqueda: `entries()` sigue siendo el resultado COMPLETO —el conteo, el
   * filtro y la relevancia se calculan sobre todo el catálogo— y esto solo decide cuántas de esas
   * tarjetas existen en el DOM. Quien busca «arrow» ve las 145 que hay, no un tramo de ellas.
   *
   * Existe por una medición: con los 1767 curados montados de golpe, el hilo principal se quedaba
   * bloqueado 18 segundos. La culpa no la tiene el número de nodos sino el modo `group` de
   * `<gf-icon>`, que DIBUJA AL MONTARSE — y para dibujar mide `getTotalLength()` de cada figura,
   * que fuerza layout. Eran 7 097 mediciones seguidas en el mismo tick.
   *
   * El tramo se recalcula, no se acumula ciegamente: al filtrar o buscar vuelve al inicial, porque
   * si no, quien viene de mirar 900 iconos monta 900 de la lista nueva.
   */
  private static readonly TRAMO = 120;
  protected readonly montadas = linkedSignal({
    source: this.entries,
    // `linkedSignal` y no un `effect` que escriba la señal: volver al tramo inicial ES parte de la
    // definición del tramo —al filtrar, la lista de detrás es otra— y no un efecto secundario que
    // alguien pueda olvidar al añadir un filtro nuevo. Sin esto, quien viene de mirar 900 iconos
    // monta 900 de la lista siguiente.
    computation: () => Iconos.TRAMO,
  });

  /** Lo que de verdad se pinta: el principio de `entries()`, hasta donde se haya ampliado. */
  protected readonly visibles = computed(() => this.entries().slice(0, this.montadas()));

  /** `true` mientras quede algo por montar — lo que decide si el centinela sigue en el DOM. */
  protected readonly hayMas = computed(() => this.entries().length > this.montadas());

  /**
   * Amplía el tramo. Lo llama el centinela del final de la rejilla y también el botón de al lado,
   * que existe para quien navega con teclado y nunca dispara un `IntersectionObserver`.
   */
  protected montarMas(): void {
    this.montadas.update((n) => n + Iconos.TRAMO);
  }

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

  /**
   * Repite SOLO los iconos en pantalla, no los 911.
   *
   * Medido en producción antes de cambiarlo: «Repetir todo» lanzaba **2186 animaciones** y bloqueaba
   * el hilo principal **166.9 ms** en el clic — 3.3× el techo de 50 ms que el propio ticket fija. Y
   * lo peor era que casi todo ese trabajo era invisible: animaba tarjetas a miles de píxeles del
   * viewport, para nadie.
   *
   * Los rectángulos se leen TODOS antes de tocar nada. Intercalar lecturas y `play()` obligaría al
   * navegador a recalcular el layout en cada vuelta; en una sola pasada de lectura paga un layout.
   */
  protected repetirVisibles(): void {
    const alto = window.innerHeight;
    const elementos = this.iconEls.toArray();
    const enPantalla = this.icons.toArray().filter((_, i) => {
      const r = elementos[i]?.nativeElement.getBoundingClientRect();
      return !!r && r.bottom > 0 && r.top < alto;
    });

    for (const icon of enPantalla) icon.play();
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
