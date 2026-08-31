import {
  Component,
  HostListener,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import { GfIconComponent, menuIcon, searchIcon, xIcon } from 'glyphflow';
import { filter, map } from 'rxjs';
import docsEn from '../../../i18n/docs/en.json';
import { type RutaId } from '../../core/rutas';
import { Rutas } from '../../core/rutas.service';
import { IndicePagina } from './indice-pagina';
import { BuscadorDocs } from './buscador-docs';
import { CIFRAS } from '../../core/cifras';

/** Marco de las docs: índice lateral fijo + la página. */
@Component({
  selector: 'app-docs',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    IndicePagina,
    BuscadorDocs,
    GfIconComponent,
    TranslocoPipe,
  ],
  // El scope va aquí y no en la ruta: `app.routes.ts` es eager, así que su loader se resuelve en
  // un `import()` aparte que se encadena DESPUÉS de bajar este chunk — dos esperas en fila, y
  // mientras tanto el texto se pinta vacío. Declarado aquí, el idioma por defecto viaja DENTRO de
  // este chunk y llega con él. El otro sigue diferido: solo lo baja quien usa el switcher.
  providers: [
    provideTranslocoScope({
      scope: 'docs',
      loader: {
        en: () => Promise.resolve(docsEn),
        es: () => import('../../../i18n/docs/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './docs.html',
  styleUrl: './docs.css',
})
export class Docs {
  /**
   * El índice guarda el ID de cada página, no su ruta: el slug cambia con el idioma
   * (`getting-started` ↔ `empezando`) y lo resuelve `Rutas` contra el activo. Los enlaces siguen
   * siendo RELATIVOS, así que el prefijo de idioma lo pone la ruta padre y no se repite aquí.
   */
  protected readonly rutas = inject(Rutas);
  private readonly router = inject(Router);

  protected readonly iconoMenu = menuIcon;
  protected readonly iconoCerrar = xIcon;
  protected readonly iconoBuscar = searchIcon;

  /** Solo importa debajo de 768px -- ahí el sidebar es un drawer, no una columna siempre visible. */
  protected readonly menuMovil = signal(false);

  /*
   * UNA sola instancia del buscador (vive donde siempre, dentro de `.docs-lateral`): el botón del
   * toolbar móvil no duplica el componente, solo le pide que se abra desde fuera -- su propio
   * diálogo es `fixed` y cubre toda la pantalla sin importar en qué parte del DOM esté montado.
   */
  private readonly buscador = viewChild<BuscadorDocs>('buscador');

  protected buscarDesdeToolbar(): void {
    void this.buscador()?.abrir();
  }

  /** Mismo criterio que el diálogo de búsqueda: Escape cierra el drawer sin tocar el mouse. */
  @HostListener('document:keydown.escape')
  protected alEscapar(): void {
    this.menuMovil.set(false);
  }

  constructor() {
    // Cambiar de página cierra el drawer -- si no, "Menu" quedaba abierto tapando la página nueva.
    effect(() => {
      this.urlActual();
      this.menuMovil.set(false);
    });
  }

  /*
   * El pie de cada página de Docs. Vive en el MARCO y no repetido en las cuatro páginas: es el
   * mismo en todas, y copiarlo cuatro veces garantiza que alguna se quede atrás.
   *
   * «Editar en GitHub» apunta al JSON de i18n del idioma activo y NO a la plantilla: ahí es donde
   * está la prosa. Quien ve una errata quiere ese archivo, no el HTML que la coloca.
   */
  protected readonly version = CIFRAS.version;
  protected readonly editarEnGitHub = computed(
    () =>
      `https://github.com/OrbeJmnz/glyphFlow/blob/main/projects/playground/src/i18n/docs/${this.rutas.idioma()}.json`,
  );

  /**
   * El sidebar agrupado visualmente. Es la ÚNICA fuente de verdad: `secciones` (abajo) se deriva de
   * aquí en vez de mantenerse como una segunda lista aparte. Título y nota son CLAVES, no texto — la
   * plantilla las resuelve con el pipe.
   */
  protected readonly grupos: {
    tituloClave: string;
    items: { id: RutaId; tituloClave: string; notaClave: string }[];
  }[] = [
    {
      tituloClave: 'docs.nav.grupoStart',
      items: [
        {
          id: 'empezando',
          tituloClave: 'docs.nav.empezando.titulo',
          notaClave: 'docs.nav.empezando.nota',
        },
        {
          id: 'accesibilidad',
          tituloClave: 'docs.nav.accesibilidad.titulo',
          notaClave: 'docs.nav.accesibilidad.nota',
        },
        { id: 'ssr', tituloClave: 'docs.nav.ssr.titulo', notaClave: 'docs.nav.ssr.nota' },
      ],
    },
    {
      tituloClave: 'docs.nav.grupoReference',
      items: [
        { id: 'api', tituloClave: 'docs.nav.api.titulo', notaClave: 'docs.nav.api.nota' },
        { id: 'temas', tituloClave: 'docs.nav.temas.titulo', notaClave: 'docs.nav.temas.nota' },
      ],
    },
    {
      tituloClave: 'docs.nav.grupoGuides',
      items: [
        {
          id: 'migracion',
          tituloClave: 'docs.nav.migracion.titulo',
          notaClave: 'docs.nav.migracion.nota',
        },
        {
          id: 'verificar',
          tituloClave: 'docs.nav.verificar.titulo',
          notaClave: 'docs.nav.verificar.nota',
        },
        {
          id: 'problemas',
          tituloClave: 'docs.nav.problemas.titulo',
          notaClave: 'docs.nav.problemas.nota',
        },
      ],
    },
    {
      tituloClave: 'docs.nav.grupoDecisions',
      items: [
        {
          id: 'comparativa',
          tituloClave: 'docs.nav.comparativa.titulo',
          notaClave: 'docs.nav.comparativa.nota',
        },
      ],
    },
  ];

  /** Orden lineal de las 9 páginas, para Prev/Next — derivado de `grupos`, no una lista aparte. */
  protected readonly secciones = this.grupos.flatMap((g) => g.items);

  /*
   * Prev/Next necesita saber qué página está activa, y `Docs` no se destruye entre navegaciones
   * internas (el `<router-outlet>` solo cambia el hijo) — de ahí escuchar `NavigationEnd` en vez de
   * leer la URL una sola vez en el constructor.
   */
  private readonly urlActual = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  private readonly indiceActual = computed(() => {
    const url = this.urlActual();
    return this.secciones.findIndex((s) => url.endsWith(`/${this.rutas.slug(s.id)}`));
  });

  protected readonly anterior = computed(() => {
    const i = this.indiceActual();
    return i > 0 ? this.secciones[i - 1] : null;
  });

  protected readonly siguiente = computed(() => {
    const i = this.indiceActual();
    return i >= 0 && i < this.secciones.length - 1 ? this.secciones[i + 1] : null;
  });
}
