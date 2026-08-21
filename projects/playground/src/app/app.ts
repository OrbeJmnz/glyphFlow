import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  MaxIconComponent,
  menuIcon,
  moonIcon,
  sunIcon,
  workflowIcon,
  xIcon,
  zapIcon,
  type AnimatedIconDef,
} from 'glyphflow';
import { MaxIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { filter, map } from 'rxjs';
import { TranslocoPipe, TranslocoService, translateSignal } from '@jsverse/transloco';
import { configureBoneyard, SkeletonComponent } from 'boneyard-js/angular';
import { escalaDuracion, PRESETS_ESCALA } from './core/duration-scale';
import { cargarEstrellas } from './core/github';
import { conectarIdiomaDelDocumento, type Idioma } from './core/i18n';
import { alternarTema, conectarTema, tema } from './core/tema';
import { conectarTransiciones } from './core/transicion';
import { BotonGithub } from './shared/marca/boton-github';
import { Logo } from './shared/marca/logo';
import { Boton } from './shared/ui/boton';
import { CarrilActivo } from './shared/ui/carril-activo';
import { Chip } from './shared/ui/chip';
import { Grupo } from './shared/ui/grupo';

/**
 * Nombre del esqueleto que le toca a una URL. Las cuatro páginas de `/docs` comparten uno: viven en
 * el mismo chunk y su marco es idéntico, así que capturar cuatro sería guardar el mismo hueso.
 */
function esqueletoDe(url: string): string {
  const raiz = url.split(/[?#]/)[0].split('/')[1] ?? '';
  return `pagina-${raiz || 'iconos'}`;
}

/**
 * Cuánto se espera antes de pintar el esqueleto. Con el chunk ya en caché la navegación tarda
 * ~150ms: pintarlo para quitarlo al instante es un parpadeo, peor que no pintar nada. Solo lo paga
 * quien de verdad está esperando.
 */
const RETRASO_ESQUELETO = 160;

/**
 * Shell del playground: navegación, control global de velocidad, acciones y el outlet. Nada de
 * contenido.
 *
 * Los chips de velocidad viven AQUÍ y no en el showcase porque `durationScale` es config global
 * (`provideMaxIcons`): gobierna las coreografías de `<max-icon>` y las transiciones de
 * `<max-icon-morph>` por igual. Ponerlos dentro de una página sugeriría que solo aplican ahí.
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MaxIconComponent,
    MaxIconMorphComponent,
    BotonGithub,
    Logo,
    Boton,
    CarrilActivo,
    Chip,
    Grupo,
    TranslocoPipe,
    SkeletonComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    // Con el menú móvil abierto, Escape lo cierra desde cualquier punto de la página — no solo con
    // el foco puesto en el propio disparador.
    '(document:keydown.escape)': 'cerrarMenu()',
  },
})
export class App {
  protected readonly presets = PRESETS_ESCALA;
  protected readonly escala = escalaDuracion;
  /** Qué píldora está puesta. Lo consume el CSS como `--i` para desplazar el indicador. */
  protected readonly indiceEscala = computed(() =>
    Math.max(
      0,
      PRESETS_ESCALA.findIndex((p) => p.valor === escalaDuracion()),
    ),
  );
  protected readonly iconoVelocidad: AnimatedIconDef = zapIcon;

  /**
   * En móvil el header solo enseña el disparador del menú y el tema — nav, velocidad y GitHub se
   * mudan al panel lateral. En escritorio este estado nunca se lee: el disparador está oculto por
   * CSS y el panel no tiene dónde engancharse.
   */
  protected readonly menuAbierto = signal(false);

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  /** El disparador hace morph entre hamburguesa y X — dice lo que hace, no solo lo que es. */
  protected readonly iconoMenu = computed<MorphIcon>(() => (this.menuAbierto() ? xIcon : menuIcon));

  /** El glifo de la marca, junto al logotipo. Se dibuja al montar y repite al pasar por el enlace. */
  protected readonly glifo: AnimatedIconDef = workflowIcon;
  protected readonly tema = tema;
  /** El sol se ofrece cuando estás en oscuro: el icono dice A DÓNDE vas, no dónde estás. */
  protected readonly iconoTema = computed<MorphIcon>(() =>
    tema() === 'oscuro' ? sunIcon : moonIcon,
  );
  protected readonly claveTema = computed(() =>
    tema() === 'oscuro' ? 'shell.tema.aClaro' : 'shell.tema.aOscuro',
  );
  protected readonly etiquetaTema = translateSignal(this.claveTema);

  /**
   * Esqueleto de la página que está cargando, o `null` si no hay navegación en curso.
   *
   * Las rutas son `loadComponent`, así que entre pulsar y ver contenido hay un hueco real: medido
   * en 3G lento contra el build de producción, la PRIMERA navegación tarda ~2s porque paga el chunk
   * compartido de 180KB. Sin esto son 2s de blanco.
   */
  private readonly destinoNavegacion = signal<string | null>(null);
  protected readonly cargandoPagina = computed(() => this.destinoNavegacion() !== null);

  /**
   * Qué huesos pintar. Mientras se navega, los del DESTINO; el resto del tiempo, los de la ruta
   * actual — y eso segundo es lo que hace el esqueleto 1:1 sin dibujar nada a mano:
   * `skeleton:capture` visita cada ruta, encuentra este envoltorio alrededor del contenido YA
   * renderizado, y guarda la geometría real de esa página.
   */
  private readonly router = inject(Router);
  private readonly rutaActual = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );
  protected readonly esqueletoRutaActual = computed(() => esqueletoDe(this.rutaActual()));
  protected readonly esqueletoPagina = computed(
    () => this.destinoNavegacion() ?? this.esqueletoRutaActual(),
  );

  /**
   * El switcher es un solo botón que alterna, igual que el de tema — no un `<select>` ni una
   * pastilla de 2 opciones: con solo 2 idiomas, alternar es más rápido que elegir.
   */
  private readonly transloco = inject(TranslocoService);
  protected readonly idioma = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang() as Idioma,
  });
  protected readonly etiquetaIdioma = translateSignal('shell.idioma.cambiar');

  protected alternarIdioma(): void {
    this.transloco.setActiveLang(this.idioma() === 'en' ? 'es' : 'en');
  }

  /**
   * El círculo sale del CENTRO del botón y no del punto del clic: con teclado, `Enter` dispara un
   * click con coordenadas 0,0, así que usar las del evento abriría el tema desde la esquina
   * superior izquierda para quien no usa ratón.
   */
  protected cambiarTema(ev: Event): void {
    const caja = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    alternarTema({ x: caja.left + caja.width / 2, y: caja.top + caja.height / 2 });
  }

  constructor() {
    // Mismo var para `color` y `darkColor` a propósito: boneyard trae su PROPIA detección de
    // claro/oscuro (probablemente `prefers-color-scheme`), que no tiene por qué coincidir con nuestro
    // tema manual (`data-tema`). Pasarle el mismo custom property a los dos neutraliza esa detección
    // — el color correcto lo sigue resolviendo el CSS del sitio, no boneyard.
    configureBoneyard({
      color: 'var(--gf-panel-alto)',
      darkColor: 'var(--gf-panel-alto)',
      animate: 'shimmer',
    });

    // Antes que `conectarTema()`: el tema ya pide transiciones al alternar.
    conectarTransiciones();
    conectarTema();
    conectarIdiomaDelDocumento();

    // El esqueleto de página, atado al router. `NavigationStart` no lo enciende de inmediato: se
    // arma un temporizador, y si la navegación termina antes de `RETRASO_ESQUELETO` no se pinta
    // nada. Cancelar en `Cancel`/`Error` además del `End` evita dejarlo prendido si un guard
    // rechaza la ruta.
    let temporizador: ReturnType<typeof setTimeout> | undefined;
    this.router.events.pipe(takeUntilDestroyed()).subscribe((e) => {
      if (e instanceof NavigationStart) {
        const destino = esqueletoDe(e.url);
        temporizador = setTimeout(() => this.destinoNavegacion.set(destino), RETRASO_ESQUELETO);
      } else if (
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      ) {
        clearTimeout(temporizador);
        this.destinoNavegacion.set(null);
      }
    });
    // Sin `await` ni bloqueo: si nunca responde, el botón se queda diciendo «GitHub» y el sitio ya
    // está usable desde el primer cuadro.
    void cargarEstrellas();

    // El menú móvil SÍ es modal (tiene backdrop, a diferencia del drawer de detalle de icono):
    // con el fondo bloqueado, arrastrar detrás del blur no mueve la página que ya no se ve.
    // Guardia de SSR: `test:ssr` renderiza sin `document`.
    effect(() => {
      if (typeof document === 'undefined') return;
      document.body.style.overflow = this.menuAbierto() ? 'hidden' : '';
    });
  }
}
