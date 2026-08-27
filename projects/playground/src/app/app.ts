import { Component, DOCUMENT, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {
  GfIconComponent,
  menuIcon,
  moonIcon,
  pauseIcon,
  playIcon,
  sunIcon,
  workflowIcon,
  xIcon,
  zapIcon,
  type AnimatedIconDef,
} from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import { velocidadGlobal, elegirVelocidad, PRESETS_VELOCIDAD } from './core/duration-scale';
import { conectarEnlacesDeIdioma } from './core/enlaces-idioma';
import { CIFRAS } from './core/cifras';
import { cargarEstrellas } from './core/github';
import { huecoBajoHeader } from './core/header';
import { conectarIdiomaDelDocumento } from './core/i18n';
import { recordarIdioma, type Idioma } from './core/idioma';
import { traducirRuta } from './core/rutas';
import { Rutas } from './core/rutas.service';
import { alternarMovimiento, conectarMovimiento, hayMovimiento } from './core/movimiento';
import { conectarPausaOculta } from './core/pausa-oculta';
import { alternarTema, conectarTema, tema } from './core/tema';
import { conectarTransiciones } from './core/transicion';
import { BotonGithub } from './shared/marca/boton-github';
import { Logo } from './shared/marca/logo';
import { Boton } from './shared/ui/boton';
import { CarrilActivo } from './shared/ui/carril-activo';
import { Chip } from './shared/ui/chip';
import { Grupo } from './shared/ui/grupo';

/**
 * Shell del playground: navegación, control global de velocidad, acciones y el outlet. Nada de
 * contenido.
 *
 * Los chips de velocidad viven AQUÍ y no en el showcase porque `durationScale` es config global
 * (`provideGfIcons`): gobierna las coreografías de `<gf-icon>` y las transiciones de
 * `<gf-icon-morph>` por igual. Ponerlos dentro de una página sugeriría que solo aplican ahí.
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    GfIconComponent,
    GfIconMorphComponent,
    BotonGithub,
    Logo,
    Boton,
    CarrilActivo,
    Chip,
    Grupo,
    TranslocoPipe,
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
  protected readonly presets = PRESETS_VELOCIDAD;
  protected readonly velocidad = velocidadGlobal;

  protected elegirVelocidad(v: number): void {
    elegirVelocidad(v);
  }

  /**
   * Flechas dentro del `radiogroup`. Es lo que el rol PROMETE: sin esto, anunciar "1 de 4" y que
   * las flechas no hagan nada es peor que no haberlo anunciado.
   *
   * Mueve la selección Y el foco a la vez, que es como se comporta un grupo de radios nativo —
   * no un recorrido de foco separado del valor.
   */
  protected teclaVelocidad(ev: KeyboardEvent): void {
    const pasos: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const paso = pasos[ev.key];
    if (paso === undefined) return;
    ev.preventDefault();

    const i = PRESETS_VELOCIDAD.findIndex((p) => p.valor === velocidadGlobal());
    // Envuelve por los dos lados: llegar al final y quedarse clavado obliga a desandar el camino.
    const siguiente = (i + paso + PRESETS_VELOCIDAD.length) % PRESETS_VELOCIDAD.length;
    elegirVelocidad(PRESETS_VELOCIDAD[siguiente].valor);

    // Desde el botón que recibió la tecla, no desde el contenedor: el evento llega al elemento
    // enfocado, y sus hermanos son las otras opciones del mismo carril.
    const boton = ev.currentTarget as HTMLElement;
    boton.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]')[siguiente]?.focus();
  }
  /** Qué píldora está puesta. Lo consume el CSS como `--i` para desplazar el indicador. */
  protected readonly indiceVelocidad = computed(() =>
    Math.max(
      0,
      PRESETS_VELOCIDAD.findIndex((p) => p.valor === velocidadGlobal()),
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

  /** La versión publicada, para el pie. Fijada en `CIFRAS` y anclada por `cifras.spec.ts`. */
  protected readonly cifras = CIFRAS;

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

  /*
   * ── Movimiento ────────────────────────────────────────────────────────────────────────────
   *
   * Mismo criterio que el tema: el icono dice A DÓNDE vas. Con movimiento se ofrece la pausa; sin
   * movimiento, el play.
   *
   * `aria-pressed` y no `role="switch"`: es UN control que enciende y apaga una sola cosa, que es
   * exactamente lo que `aria-pressed` describe. El carril de velocidad usa radios porque ahí se
   * elige entre cuatro.
   */
  protected readonly hayMovimiento = hayMovimiento;
  protected readonly iconoMovimiento = computed<MorphIcon>(() =>
    hayMovimiento() ? pauseIcon : playIcon,
  );
  protected readonly claveMovimiento = computed(() =>
    hayMovimiento() ? 'shell.movimiento.pausar' : 'shell.movimiento.reanudar',
  );
  protected readonly etiquetaMovimiento = translateSignal(this.claveMovimiento);

  protected alternarMovimiento(): void {
    alternarMovimiento();
  }

  /**
   * Los enlaces del nav se piden por ID, no por ruta: el slug cambia con el idioma (`/en/patterns`
   * ↔ `/es/patrones`) y `Rutas` lo resuelve leyendo el idioma activo por señal. Escribirlos duros
   * dejaría al visitante en español navegando a URLs en inglés.
   */
  protected readonly rutas = inject(Rutas);
  private readonly router = inject(Router);

  /**
   * El switcher es un solo botón que alterna, igual que el de tema — no un `<select>` ni una
   * pastilla de 2 opciones: con solo 2 idiomas, alternar es más rápido que elegir.
   *
   * Ya no cambia el idioma: NAVEGA. Con el idioma en la URL, cambiarlo sin moverse dejaría a
   * `/en/patterns` pintado en español — contenido y dirección diciendo cosas distintas, que es el
   * bug que T19 vino a cerrar. Quien recibe el enlace tiene que ver lo mismo que quien lo mandó.
   *
   * Conserva la página, el query y el fragmento (`traducirRuta`): mandar a la portada por cambiar
   * de idioma es perder el lugar, y en las docs es perder el ancla exacta que alguien compartió.
   */
  protected readonly idioma = this.rutas.idioma;
  protected readonly etiquetaIdioma = translateSignal('shell.idioma.cambiar');

  protected alternarIdioma(): void {
    const destino: Idioma = this.idioma() === 'en' ? 'es' : 'en';
    // Se recuerda aquí y no en el guard: lo que se guarda es la ELECCIÓN, no el idioma de la URL
    // que alguien te compartió. Solo decide a dónde manda `/` en la próxima visita.
    recordarIdioma(destino);
    void this.router.navigateByUrl(traducirRuta(this.router.url, destino));
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

  /*
   * El header es sticky, así que un enlace a `#algo` deja su destino justo DEBAJO de él: quien
   * siguió el enlace no ve lo que vino a ver. Medido: la fila aterrizaba en top −0.x.
   *
   * El hueco sale de `--gf-header-h` y NO de un número aquí (T24): había cuatro copias del mismo
   * valor en dos unidades, y cambiar el header las descuadraba todas en silencio.
   *
   * No basta con `scroll-padding-top` en el CSS —está puesto y no alcanza—: el `anchorScrolling`
   * de Angular no usa `scrollIntoView`, va por `ViewportScroller`, que hace `window.scrollTo` y
   * esa vía IGNORA `scroll-padding`. `setOffset` es el punto donde el router sí lo respeta.
   * Se dejan los dos: el CSS cubre los saltos que hace el navegador por su cuenta.
   */
  constructor() {
    const doc = inject(DOCUMENT);
    inject(ViewportScroller).setOffset([0, huecoBajoHeader(doc)]);

    // Antes que `conectarTema()`: el tema ya pide transiciones al alternar.
    conectarTransiciones();
    conectarTema();
    conectarMovimiento();
    conectarIdiomaDelDocumento();
    // `hreflang` recíproco + `canonical` en cada navegación: sin eso las dos ramas de idioma se
    // leen como contenido duplicado. Ver `core/enlaces-idioma.ts`.
    conectarEnlacesDeIdioma();
    // Con la pestaña oculta no se anima contra un DOM que nadie mira. Ver `core/pausa-oculta.ts`.
    conectarPausaOculta();
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
