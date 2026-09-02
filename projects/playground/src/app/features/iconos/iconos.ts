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
  PendingTasks,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { provideTranslocoScope, TranslocoPipe, translateSignal } from '@jsverse/transloco';
import iconosEn from '../../../i18n/iconos/en.json';
import {
  GfIconComponent,
  sparklesIcon,
  faceSlightlyFrowningIcon,
  AnimatedIconDef,
  circleIcon,
  squareIcon,
  diamondIcon,
  triangleIcon,
  leafIcon,
  codeIcon,
  checkIcon,
  copyIcon,
  infoIcon,
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
import { NombreTruncado } from '../../shared/ui/nombre-truncado';
import { IconDetailPanel } from './icon-detail-panel';
import { insigniasDe, type ClaveInsignia, type Insignia } from './icon-badges';
import { Paginador } from './paginador';
import { CIFRAS } from '../../core/cifras';
import { iconoPlano } from '../../core/morph-icon-plano';
import { conTransicion } from '../../core/transicion';
import { Copiador } from '../../shared/ui/copiar';
import { normalizar, ordenarPorRelevancia, sugerencias } from './buscador';
import { Rutas } from '../../core/rutas.service';
import { tema, temaSiguiendoAlSistema } from '../../core/tema';
import { cargarCurados } from '../../core/catalogo';
import { Visible } from '../../shared/ui/visible';
import { SinResultados } from '../../shared/ui/sin-resultados';
import { Tooltip } from '../../shared/ui/tooltip';
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
  /**
   * Booleano precalculado y no un `tiene(entry, 'hold')` en la plantilla: con zoneless la función
   * correría por tarjeta en cada detección, y son 1767.
   */
  tieneHold: boolean;
}

/** El sitio de la lista al que se vuelve tras cerrar el panel. Ver `regreso`. */
interface PuntoDeRegreso {
  /** La tarjeta que estaba pegada al borde de arriba. `null` si no había ninguna montada. */
  ancla: string | null;
  /** Su distancia al borde superior del viewport, para reponerla exactamente igual. */
  desfase: number;
  /** Respaldo para cuando el ancla ya no exista. */
  scrollY: number;
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
    NombreTruncado,
    Paginador,
    TranslocoPipe,
    Visible,
    SinResultados,
    Tooltip,
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
  /** El inicio de la rejilla: adónde se vuelve al cambiar de página. */
  @ViewChild('rejillaCatalogo') private rejillaCatalogo?: ElementRef<HTMLElement>;

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  /**
   * Teclear ya NO arrastra la página al catálogo.
   *
   * Lo hacía a los 300ms, y tenía sentido mientras el hero enseñaba seis iconos de muestra que no
   * respondían a nada: lo único que había que ver estaba abajo. Desde que los seis SON los seis
   * primeros resultados, bajar solo se lleva al visitante justo cuando el hero acaba de contestar
   * — y con el cursor todavía en el campo. Para el resto está el botón, que lo pide él.
   */
  protected buscarDesdeHero(texto: string): void {
    this.busqueda.set(texto);
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
    // Dentro de una transición de vista, igual que el filtro de insignias: cambiar de densidad
    // reordena la rejilla entera —de 8 columnas a 6, y cada tarjeta de tamaño—, así que las
    // tarjetas VIAJAN a su sitio nuevo en vez de que la cuadrícula se re-arme de golpe.
    conTransicion(() => elegirDensidad(d));
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

  /**
   * El catálogo llega DIFERIDO, en su propio chunk.
   *
   * Importar `CURATED_ICONS` de forma estática desde una ruta diferida lo mete en el bundle
   * INICIAL: esbuild sube a la entrada lo que alcanzan varios chunks, y el catálogo curado entero
   * son más de un megabyte que bajaba también quien sólo abría Docs. Medido en `ng build`:
   * 1.43 MB de entrada con él, 373 KB sin él.
   *
   * Es la página que PINTA el catálogo, así que diferirlo aquí no ahorra la descarga a quien entra
   * a la portada: la mueve fuera del arranque, para que no la paguen las otras rutas. La rejilla
   * arranca vacía un instante, que es lo mismo que ya pasaba mientras bajaba el chunk de la página.
   */
  private readonly todos = signal<CuratedEntry[]>([]);

  /**
   * El total ANUNCIADO. Sale de `CIFRAS` y no de `todos()` a propósito: es lo que el título y el
   * marcador del buscador interpolan, y tiene que decir la verdad desde el primer fotograma —antes
   * de que llegue el catálogo—, no empezar en cero y saltar. `cifras.spec.ts` lo ancla contra el
   * registro real, así que no puede quedarse atrás en silencio.
   */
  protected readonly total = CIFRAS.curados;

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
  /**
   * Los seis del hero. Sin búsqueda son una MUESTRA elegida a mano —cada una enseña una
   * coreografía distinta: giro, resorte, trazo, rebote— y en cuanto alguien teclea pasan a ser los
   * seis primeros resultados.
   *
   * Que respondan es lo que convierte la fila en la respuesta a la pregunta que el visitante acaba
   * de escribir, en vez de en seis iconos decorativos que ya no vienen a cuento. Y son los MISMOS
   * seis primeros de la rejilla, no otra selección: dos listas ordenadas por criterios distintos
   * en la misma pantalla se leen como un error.
   */
  private readonly MUESTRA = ['sparkles', 'bell', 'settings', 'star', 'zap', 'send'];

  protected readonly demo = computed<CuratedEntry[]>(() => {
    if (this.busqueda().trim()) return this.entries().slice(0, 6);
    return this.MUESTRA.map((name) => this.todos().find((e) => e.name === name)).filter(
      (e): e is CuratedEntry => !!e,
    );
  });

  /** Cuántos resultados quedan fuera de los seis del hero — lo que anuncia el botón de bajar. */
  protected readonly restantes = computed(() => Math.max(0, this.entries().length - 6));

  /**
   * El comando que la portada ofrece copiar. Constante y no traducible: es literalmente lo que hay
   * que teclear, igual en los dos idiomas.
   */
  protected readonly COMANDO_INSTALAR = 'npm i glyphflow';

  /**
   * Su propio `Copiador`, y no el de la sección de API: son dos botones que pueden estar en
   * acuse a la vez, y compartir el estado haría que copiar uno pusiera el otro en «copiado».
   * La CLASE sí se comparte — la lógica del portapapeles y su temporizador viven en un solo sitio.
   */
  private readonly copiadorInstalar = new Copiador();

  /** `copy → check` con morph, el mismo gesto que el resto de las acciones de copiado del sitio. */
  protected readonly iconoCopiarInstalacion = computed<MorphIcon>(() =>
    this.copiadorInstalar.copiado() ? checkIcon : this.copyIconPlano,
  );

  /** El nombre accesible cambia con el estado: sin eso, un lector de pantalla no se entera. */
  protected readonly etiquetaCopiarInstalacion = translateSignal(
    computed(() =>
      this.copiadorInstalar.copiado()
        ? 'iconos.hero.instalarCopiado'
        : 'iconos.hero.instalarCopiar',
    ),
  );

  /** Lo lee la plantilla para el acuse visual, que es distinto del rótulo accesible. */
  protected readonly copiadoInstalar = this.copiadorInstalar.copiado;

  /**
   * El rótulo del tooltip: «Copy» y «Copied», cortos. Reusa las claves del botón de la sección de
   * API en vez de un par nuevo — dicen exactamente lo mismo, y dos textos separados para la misma
   * acción acaban divergiendo en cuanto alguien retoca uno.
   *
   * Es distinto del `aria-label`, que dice «Copy npm i glyphflow»: el tooltip lo lee quien YA ve
   * el comando al lado, y un lector de pantalla no.
   */
  protected readonly rotuloCopiarInstalacion = translateSignal(
    computed(() => (this.copiadorInstalar.copiado() ? 'iconos.api.copiado' : 'iconos.api.copiar')),
  );

  protected copiarInstalacion(): void {
    void this.copiadorInstalar.copiar(this.COMANDO_INSTALAR);
  }

  /** La cara del bloque de «no hay nada». Suelta y no del registro: es un export podable. */
  protected readonly caraTriste = faceSlightlyFrowningIcon;

  /** El disclosure que explica número/hold. Suelto y no del registro, mismo criterio que arriba. */
  protected readonly infoIcon = infoIcon;

  /**
   * El logotipo del hero, en su versión por tema. Son DOS assets porque el arte es distinto, no el
   * mismo con otro color: el claro pesa 39 KB contra 284 del oscuro.
   *
   * Van en WebP animado y no en GIF. La conversión es LOSSLESS —`gif2webp` sin `-lossy`—, así que
   * el arte es idéntico píxel a píxel y el `mix-blend-mode: lighten` del CSS sigue funcionando
   * igual; lo único que cambia es el peso: el oscuro bajó de 415 a 284 KB, 132 KB menos en el
   * elemento que además va con `fetchpriority="high"`, o sea el LCP de la portada.
   *
   * En lossy el archivo CRECE (medido: 544 KB a q90, 399 a q80). No es un error de configuración:
   * el arte es plano con degradados suaves, y el ruido que introduce el lossy rompe la predicción
   * entre fotogramas, que es de donde sale toda la compresión de una animación.
   */
  protected readonly logoAnimado = computed(() =>
    tema() === 'claro'
      ? '/images/glyphflow-anim-preview-light.webp'
      : '/images/glyphflow-anim-preview.webp',
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
   * oscuro— y quien prefiere claro se bajaba el asset oscuro de 284 KB para verlo cambiar al claro
   * de 39 en cuanto hidrataba. Una media query la resuelve el navegador antes de pintar y solo
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
            ? '/images/glyphflow-anim-preview-light.webp'
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

  /**
   * Deja de avanzar solo en cuanto alguien elige un paso a mano: a partir de ahí manda su elección
   * y no el reloj. Sin esto, tocar un punto duraba 1.9s — el carrusel se lo llevaba por delante.
   */
  protected readonly avanceManual = signal(false);

  /**
   * El showcase avanza SOLO mientras el movimiento esté activo y nadie haya tomado el control.
   *
   * Era un `setInterval` incondicional de campo, y eso lo hacía dos cosas a la vez: movimiento
   * automático de duración indefinida sin ninguna forma de pararlo (WCAG 2.2 · 2.2.2 Pause, Stop,
   * Hide — nivel A), y una contradicción con lo que la librería anuncia, porque ignoraba
   * `hayMovimiento()`, que es la señal que el propio sitio ofrece en su barra superior.
   *
   * Como `effect` y no como campo porque así el reloj se ata a las señales: se rearma cuando el
   * movimiento vuelve y se limpia solo con `onCleanup` — al destruir el componente y también en
   * cada re-evaluación, sin dejar temporizadores huérfanos.
   */
  private readonly efectoShowcase = effect((onCleanup) => {
    if (!hayMovimiento() || this.avanceManual()) return;
    const reloj = setInterval(() => this.paso.update((p) => (p + 1) % this.formas.length), 1900);
    onCleanup(() => clearInterval(reloj));
  });

  protected formaEn(hueco: number): MorphIcon {
    return this.formas[(this.paso() + hueco) % this.formas.length];
  }

  protected irAlPaso(n: number): void {
    // El clic gana al reloj: ver `avanceManual`.
    this.avanceManual.set(true);
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
      icono: sparklesIcon,
      titulo: 'iconos.argumentos.movimiento.titulo',
      texto: 'iconos.argumentos.movimiento.texto',
    },
  ];

  constructor() {
    // El catálogo, por su propio chunk. La rejilla arranca vacía un instante —el mismo que ya
    // pasaba mientras bajaba el chunk de esta página— y el conteo del hero no espera a nadie
    // porque sale de `CIFRAS`.
    // `PendingTasks.run` y no un `then` suelto: registra la carga como trabajo pendiente de la
    // aplicación, y de eso dependen dos cosas que si no fallan en silencio — el PRERENDER, que
    // serializaría el HTML antes de que llegue el catálogo y publicaría la rejilla vacía, y el
    // `whenStable()` de los tests, que daría por estable un componente a medio llenar.
    inject(PendingTasks).run(() =>
      cargarCurados().then((catalogo) => {
        this.todos.set(
          Object.entries(catalogo)
            .map(([name, def]) => ({
              name,
              def,
              insignias: insigniasDe(name, def),
              numAnimaciones: Object.keys(def.animations).length,
              tieneHold: !!def.animations['hold'],
            }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        );
      }),
    );
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
      this.sincronizarUrl();
    });
  }

  private readonly ruta = inject(ActivatedRoute);
  private readonly ubicacion = inject(Location);
  private temporizadorUrl?: ReturnType<typeof setTimeout>;

  /**
   * Escribe `?q=`/`?page=` sin navegar. `Location.replaceState` y NO `router.navigate`: el router
   * tiene `withViewTransitions` puesto, así que navegar por cada tecla animaría la página entera en
   * cada pulsación. Esto no es una navegación, es la URL poniéndose al día con la interfaz.
   *
   * Los 150 ms son del ticket y aquí sí ganan algo: sin ellos el historial recibe una reescritura
   * por letra. El FILTRADO en cambio sigue siendo inmediato — ver la nota de `buscarDesdeHero`.
   *
   * `replaceState`, no `pushState`: teclear no debería llenar el botón de atrás de estados
   * intermedios. Y el `canonical` de `core/enlaces-idioma.ts` ignora el query a propósito, así que
   * esto no parte el showcase en tantas URLs como búsquedas haga la gente.
   *
   * `q`/`pagina` se leen AQUÍ, fuera del `setTimeout`: el `effect` que llama a este método solo
   * seguirá disparándose cuando cambien señales leídas de forma SÍNCRONA durante su ejecución —
   * leerlas dentro del temporizador las dejaría fuera del rastreo de dependencias.
   */
  private sincronizarUrl(): void {
    const q = this.busqueda().trim();
    const pagina = this.paginaEfectiva();
    clearTimeout(this.temporizadorUrl);
    this.temporizadorUrl = setTimeout(() => {
      const partes: string[] = [];
      if (q) partes.push(`q=${encodeURIComponent(q)}`);
      if (pagina > 1) partes.push(`page=${pagina}`);
      const base = this.ubicacion.path().split(/[?#]/)[0];
      this.ubicacion.replaceState(base + (partes.length ? `?${partes.join('&')}` : ''));
    }, 150);
  }

  ngOnDestroy(): void {
    // El reloj del showcase ya no se limpia aquí: vive en un `effect` y lo cierra su `onCleanup`.
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
   * `computed` y no un campo plano, aunque el catálogo sea estático: desde que llega por su propio
   * chunk, `todos()` está VACÍO cuando se construye el componente. Como campo, los tres conteos
   * salían 0, el `.filter(n > 0)` los borraba y la barra de filtros no llegaba a pintarse nunca.
   */
  protected readonly conteos = computed<
    { clave: ClaveInsignia; etiqueta: string; n: number; traducir: boolean }[]
  >(() => {
    const todos = this.todos();

    /*
     * Los chips por NOMBRE de variante salen del catálogo, no de una lista escrita a mano: cada
     * tanda de curado añade nombres, y una lista fija se queda atrás en silencio — que es
     * exactamente como `extras` acabó casando con el 62 % sin que nadie lo notara.
     *
     * Se ordenan por cuántos iconos casan y se cortan en TOPE. Sin ese corte la barra tendría 53
     * chips, que es otra forma de no acotar. Los que quedan fuera siguen siendo alcanzables: el
     * buscador filtra por nombre de icono, y el panel de detalle enseña las variantes de cada uno.
     */
    const porNombre = new Map<string, number>();
    for (const e of todos) {
      for (const i of e.insignias) {
        if (!i.clave.startsWith('variante:')) continue;
        porNombre.set(i.clave, (porNombre.get(i.clave) ?? 0) + 1);
      }
    }
    const variantes = [...porNombre.entries()]
      .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
      .slice(0, Iconos.TOPE_CHIPS_VARIANTE)
      .map(([clave, n]) => ({
        clave: clave as ClaveInsignia,
        etiqueta: clave.slice('variante:'.length),
        n,
        traducir: false,
      }));

    // `held` y `solo-draw` NO son nombres de variante, así que no salen del mapa de arriba y
    // conservan su clave de transloco: son prosa, no API.
    const banderas = (
      [
        { clave: 'held', etiqueta: 'iconos.barra.insignias.held' },
        { clave: 'solo-draw', etiqueta: 'iconos.barra.insignias.soloDraw' },
      ] as { clave: ClaveInsignia; etiqueta: string }[]
    )
      .map((o) => ({ ...o, n: todos.filter((e) => tiene(e, o.clave)).length, traducir: true }))
      .filter((o) => o.n > 0);

    return [...variantes, ...banderas];
  });

  protected readonly entries = computed<CuratedEntry[]>(() => {
    const f = this.filtro();
    const q = this.busqueda().trim();
    const todos = this.todos();
    const base = f ? todos.filter((e) => tiene(e, f)) : todos;
    if (!q) return base;
    const tags = this.tagsNormalizados();
    return ordenarPorRelevancia(base, q, (e) => e.name, tags ? (e) => tags[e.name] : undefined);
  });

  /**
   * Cuántos iconos por página. Filtro y búsqueda siguen operando sobre `entries()` — el catálogo
   * COMPLETO filtrado— esto solo decide qué TAJADA de ese resultado llega a existir en el DOM.
   */
  /**
   * Cuántos chips de variante caben en la barra. Hay 53 nombres; enseñarlos todos sería cambiar
   * un filtro que no acota por una barra que no se puede leer.
   */
  private static readonly TOPE_CHIPS_VARIANTE = 8;

  private static readonly TAMANO_PAGINA = 200;

  /**
   * Lo que decide si la página vuelve a 1. Deliberadamente NO es `entries` entero: `entries()`
   * también cambia de referencia cuando `todos()` termina de cargar (de `[]` al catálogo real), y
   * ese cambio no debería pisar una página que venga de la URL. Filtro y búsqueda sí la resetean.
   */
  private readonly claveReset = computed(() => `${this.filtro() ?? ''}|${this.busqueda().trim()}`);

  /** `?page=` de la URL, leído UNA sola vez — se consume en el primer cálculo de `pagina`. */
  private paginaInicialUrl = this.leerPaginaDeUrl();

  private leerPaginaDeUrl(): number | null {
    const p = Number(this.ruta.snapshot.queryParamMap.get('page'));
    return Number.isInteger(p) && p > 1 ? p : null;
  }

  protected readonly pagina = linkedSignal({
    source: this.claveReset,
    // Mismo criterio que `montadas` de aquí abajo: volver a la página 1 ES parte de la definición
    // de cambiar de filtro o de búsqueda, no un efecto secundario que alguien pueda olvidar.
    computation: () => {
      const p = this.paginaInicialUrl;
      this.paginaInicialUrl = null;
      return p ?? 1;
    },
  });

  protected readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.entries().length / Iconos.TAMANO_PAGINA)),
  );

  /** Cubre un `?page=` fuera de rango sin tocar `pagina` en sí — por si el catálogo encogió. */
  protected readonly paginaEfectiva = computed(() =>
    Math.min(Math.max(1, this.pagina()), this.totalPaginas()),
  );

  protected readonly entriesPagina = computed<CuratedEntry[]>(() => {
    const inicio = (this.paginaEfectiva() - 1) * Iconos.TAMANO_PAGINA;
    return this.entries().slice(inicio, inicio + Iconos.TAMANO_PAGINA);
  });

  /** Lo que pinta el pie de página: «Mostrando 401–600 de 1767». */
  protected readonly rangoPagina = computed(() => {
    const total = this.entries().length;
    const desde = total ? (this.paginaEfectiva() - 1) * Iconos.TAMANO_PAGINA + 1 : 0;
    const hasta = Math.min(this.paginaEfectiva() * Iconos.TAMANO_PAGINA, total);
    return { desde, hasta, total };
  });

  protected irAPagina(n: number): void {
    this.pagina.set(n);
    this.desplazarAlGrid();
  }

  /**
   * Al inicio de la rejilla, no de la página entera — el header y el hero no se mueven al paginar.
   *
   * `scrollIntoView` no existe en jsdom (entorno de test): sin la guarda, cada test que cambia de
   * página truena con un método indefinido en vez de probar lo que de verdad importa.
   */
  private desplazarAlGrid(): void {
    const destino = this.rejillaCatalogo?.nativeElement;
    if (!destino || typeof destino.scrollIntoView !== 'function') return;
    destino.scrollIntoView({ behavior: hayMovimiento() ? 'smooth' : 'auto', block: 'start' });
  }

  /**
   * Cuántas tarjetas hay montadas ahora mismo DENTRO de la página. Crece al llegar al final.
   *
   * NO es paginación de la búsqueda —eso ya lo hace `entriesPagina` de arriba, que sigue operando
   * sobre el catálogo COMPLETO filtrado— esto solo decide cuántas de las hasta 200 tarjetas de la
   * página existen en el DOM.
   *
   * Existe por una medición: con los 1767 curados montados de golpe, el hilo principal se quedaba
   * bloqueado 18 segundos. La culpa no la tiene el número de nodos sino el modo `group` de
   * `<gf-icon>`, que DIBUJA AL MONTARSE — y para dibujar mide `getTotalLength()` de cada figura,
   * que fuerza layout. Eran 7 097 mediciones seguidas en el mismo tick — proyectado a 200 (el
   * tamaño de una página) siguen siendo ~2 segundos, muy por encima del techo de 50ms que se cita
   * más abajo para `repetirVisibles`. Por eso el tramo se mantiene DENTRO de la página en vez de
   * asumir sin medir que 200 ya es poco.
   *
   * El tramo se recalcula, no se acumula ciegamente: al cambiar de página, de filtro o de búsqueda
   * vuelve al inicial, porque si no, quien viene de mirar 180 iconos monta 180 de la lista nueva.
   */
  private static readonly TRAMO = 120;
  protected readonly montadas = linkedSignal({
    source: this.entriesPagina,
    // `linkedSignal` y no un `effect` que escriba la señal: volver al tramo inicial ES parte de la
    // definición del tramo —al cambiar de página la lista de detrás es otra— y no un efecto
    // secundario que alguien pueda olvidar al añadir un filtro nuevo.
    computation: () => Iconos.TRAMO,
  });

  /** Lo que de verdad se pinta: el principio de `entriesPagina()`, hasta donde se haya ampliado. */
  protected readonly visibles = computed(() => this.entriesPagina().slice(0, this.montadas()));

  /** `true` mientras quede algo por montar EN ESTA PÁGINA — decide si el centinela sigue en el DOM. */
  protected readonly hayMas = computed(() => this.entriesPagina().length > this.montadas());

  /**
   * Amplía el tramo. Lo llama el centinela del final de la rejilla y también el botón de al lado,
   * que existe para quien navega con teclado y nunca dispara un `IntersectionObserver`.
   */
  protected montarMas(): void {
    this.montadas.update((n) => n + Iconos.TRAMO);
  }

  /**
   * Los nombres más parecidos a una búsqueda que no encontró nada (T10).
   *
   * Se calcula SOLO con la rejilla vacía: recorrer 1767 nombres midiendo distancia de edición en
   * cada pulsación sería trabajo tirado el 99% de las veces, porque el 99% de las veces hay
   * resultados. Aquí el usuario ya está parado.
   *
   * Mira también los tags —`delet` llega a `trash-2` por su sinónimo `delete`— pero devuelve
   * siempre el NOMBRE: sugerir el sinónimo mandaría a buscar algo que tampoco existe.
   */
  protected readonly sugerencias = computed<string[]>(() => {
    const q = this.busqueda().trim();
    if (!q || this.entries().length) return [];
    const tags = this.tagsNormalizados();
    return sugerencias(
      q,
      this.todos().map((e) => e.name),
      tags ? (n) => tags[n] : undefined,
    );
  });

  /** El enlace para pedir un icono que no está. Prellenado: quien lo abre no escribe de cero. */
  protected readonly urlPedirIcono = computed(() => {
    const q = this.busqueda().trim();
    const titulo = encodeURIComponent(`Icon request: ${q}`);
    return `https://github.com/OrbeJmnz/glyphFlow/issues/new?title=${titulo}`;
  });

  /** Icono bajo inspección en el Motion Inspector. `null` = panel cerrado. */
  protected readonly inspeccionado = signal<CuratedEntry | null>(null);

  /**
   * Selección directa, no toggle: con la cápsula "Todos" ya hay una forma explícita de volver a
   * `null`, así que cada botón de insignia siempre ACTIVA la suya — sin el "click de nuevo para
   * quitar" que antes era la única salida y no se anunciaba en ningún lado.
   */
  /** Baja a la rejilla. Reusa `irAlCatalogo`, que ya sabe respetar el movimiento reducido. */
  protected verElResto(): void {
    this.irAlCatalogo();
  }

  /** Desde el estado vacío: se busca la sugerencia tal cual, como si la hubiera tecleado. */
  protected buscarSugerencia(nombre: string): void {
    this.buscarDesdeHero(nombre);
  }

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
    // Sin `matchMedia` (entorno de test, navegador viejo) no hay cómo saber si es escritorio —
    // mejor no robarle el foco a nadie que dejar que la llamada truene sin capturar.
    if (!this.esEscritorio()) return;
    this.host.nativeElement.querySelector<HTMLInputElement>('.busqueda-hero input')?.focus();
  }

  private esEscritorio(): boolean {
    try {
      return matchMedia('(min-width: 768px) and (pointer: fine)').matches;
    } catch {
      return false;
    }
  }

  /**
   * Dónde estaba la lista antes de abrir el panel, para poder devolverla ahí al cerrarlo.
   *
   * No es un `scrollY` a secas: con el panel abierto se pueden montar más tramos, y entonces ese
   * número apunta a otro sitio de la lista. Se ancla a una TARJETA —la primera pegada al borde de
   * arriba— y a su desfase, que sobreviven a que la rejilla crezca por debajo. El `scrollY` queda
   * de respaldo para cuando esa tarjeta ya no esté (otro filtro, otra búsqueda).
   */
  private regreso: PuntoDeRegreso | null = null;

  protected inspeccionar(entry: CuratedEntry, ev?: Event): void {
    const celda = (ev?.currentTarget as HTMLElement) ?? null;
    this.origenFoco = celda;
    // La transición SOLO cuando el panel pasa de cerrado a abierto, que es cuando la rejilla se
    // estrecha para hacerle hueco. Con el panel ya abierto, pulsar otro icono no mueve nada —ni
    // hay scroll que corregir, ni punto de regreso que pisar.
    if (this.inspeccionado()) {
      this.inspeccionado.set(entry);
      return;
    }

    this.regreso = this.puntoDeRegreso();
    // La posición EN PANTALLA de la tarjeta antes del recolumnado. Es la referencia de todo lo que
    // viene: el objetivo no es llevarla a un sitio bonito, es que no se mueva de donde ya estaba.
    const topAntes = celda?.getBoundingClientRect().top ?? null;

    conTransicion(() => this.inspeccionado.set(entry), {
      // La tarjeta, no su nombre: el `@for` traquea por `entry.name`, así que recolumnar reusa el
      // MISMO nodo y no hay nada que volver a buscar.
      trasPintar: () => this.seguirLaTarjeta(celda, topAntes),
    });
  }

  protected cerrarDetalle(): void {
    const destino = this.regreso;
    this.regreso = null;
    // Al cerrar, la rejilla recupera su ancho: las tarjetas VIAJAN a su sitio en vez de que la
    // cuadrícula se re-arme de golpe. Es lo que responde a la objeción por la que este hueco se
    // había quitado — «al cerrar, nadie encontraba dónde iba».
    conTransicion(() => this.inspeccionado.set(null), {
      trasPintar: () => this.volverAlPunto(destino),
    });
    this.origenFoco?.focus();
    this.origenFoco = null;
  }

  // ── Que la lista no pierda a nadie al abrir ni al cerrar ─────────────────────
  //
  // Abrir el panel recorta las columnas —8→6 en compacta, 6→4 en cómoda— y eso baja a cada tarjeta
  // un tercio de las filas que tenía encima. En el icono 800 son más de treinta filas: quien lo
  // pulsa lo pierde de vista con el mismo gesto con el que lo eligió.
  //
  // Todo esto corre en `trasPintar`, o sea DENTRO de la transición y con el layout nuevo ya
  // aplicado. Corregir el scroll después sería un salto encima de la animación; corregirlo ahí
  // entra en la foto final, y las tarjetas viajan una sola vez y ya al sitio bueno.

  private get ventana(): (Window & typeof globalThis) | null {
    return this.host.nativeElement.ownerDocument.defaultView;
  }

  /** El borde de abajo del header pegajoso: lo que quede por encima no se ve. */
  private altoHeader(): number {
    const head = this.host.nativeElement.ownerDocument.querySelector('.shell-head');
    return head ? head.getBoundingClientRect().bottom : 0;
  }

  /**
   * Recorriendo y comparando, no con un selector de atributo: construirlo pide `CSS.escape`, que
   * NO existe ni en jsdom ni en el render de servidor —lo destapó su propio test— y meter el
   * nombre crudo en un selector es la otra mitad del mismo problema.
   */
  private celda(nombre: string): HTMLElement | null {
    const celdas = this.host.nativeElement.querySelectorAll<HTMLElement>('[data-celda]');
    for (const celda of celdas) if (celda.dataset['icono'] === nombre) return celda;
    return null;
  }

  private puntoDeRegreso(): PuntoDeRegreso {
    const limite = this.altoHeader();
    const celdas = this.host.nativeElement.querySelectorAll<HTMLElement>('[data-celda]');
    // En orden de documento, o sea el de la rejilla: la primera que asome bajo el header es la de
    // arriba a la izquierda de la primera fila visible.
    for (const celda of celdas) {
      const top = celda.getBoundingClientRect().top;
      if (top >= limite - 1) {
        return {
          ancla: celda.dataset['icono'] ?? null,
          desfase: top,
          scrollY: this.ventana?.scrollY ?? 0,
        };
      }
    }
    return { ancla: null, desfase: 0, scrollY: this.ventana?.scrollY ?? 0 };
  }

  private seguirLaTarjeta(celda: HTMLElement | null, topAntes: number | null): void {
    const ventana = this.ventana;
    if (!celda || !ventana) return;

    // 1. Que se quede donde estaba, pese al recolumnado.
    if (topAntes !== null) {
      const delta = celda.getBoundingClientRect().top - topAntes;
      if (delta) ventana.scrollBy({ top: delta, behavior: 'instant' });
    }
    // 2. Y si aun así queda fuera de lo que se ve, traérsela.
    this.asegurarVisible(celda);
  }

  /**
   * La banda útil no es el viewport entero: arriba la recorta el header, y en móvil el panel ancla
   * ABAJO a ancho completo hasta 80vh, así que centrar contra el viewport dejaría la tarjeta detrás
   * del panel que se acaba de abrir. Al lado (≥769px) no quita altura y la banda llega al suelo.
   */
  private asegurarVisible(celda: HTMLElement): void {
    const ventana = this.ventana;
    if (!ventana) return;
    const arriba = this.altoHeader();
    const alto = ventana.innerHeight;
    const panel = this.host.nativeElement.ownerDocument
      .querySelector('.detalle')
      ?.getBoundingClientRect();
    // Ancla abajo, no al lado: pegado al borde izquierdo Y al de abajo. Medido, no supuesto — el
    // breakpoint vive en el CSS del panel y copiarlo aquí sería un número que se despega del otro.
    const anclaAbajo = !!panel && panel.left <= 1 && panel.bottom >= alto - 1;
    const abajo = anclaAbajo ? panel.top : alto;

    const r = celda.getBoundingClientRect();
    if (r.top >= arriba && r.bottom <= abajo) return;
    const centro = arriba + (abajo - arriba) / 2;
    ventana.scrollBy({ top: r.top + r.height / 2 - centro, behavior: 'instant' });
  }

  private volverAlPunto(destino: PuntoDeRegreso | null): void {
    const ventana = this.ventana;
    if (!destino || !ventana) return;
    const ancla = destino.ancla ? this.celda(destino.ancla) : null;
    if (!ancla) {
      ventana.scrollTo({ top: destino.scrollY, behavior: 'instant' });
      return;
    }
    const delta = ancla.getBoundingClientRect().top - destino.desfase;
    if (delta) ventana.scrollBy({ top: delta, behavior: 'instant' });
  }
}

function tiene(entry: CuratedEntry, clave: ClaveInsignia): boolean {
  return entry.insignias.some((i) => i.clave === clave);
}
