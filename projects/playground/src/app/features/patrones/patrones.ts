import {
  Component,
  ElementRef,
  afterNextRender,
  signal,
  computed,
  inject,
  OnDestroy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  bellIcon,
  checkIcon,
  chevronDownIcon,
  circleCheckIcon,
  copyIcon,
  GfIconComponent,
  heartIcon,
  loaderCircleIcon,
  menuIcon,
  moonIcon,
  pauseIcon,
  playIcon,
  searchIcon,
  sendIcon,
  sunIcon,
  type AnimatedIconDef,
  xIcon,
} from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { provideTranslocoScope, TranslocoPipe, translateSignal } from '@jsverse/transloco';
import patronesEn from '../../../i18n/patrones/en.json';
import { Boton } from '../../shared/ui/boton';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import {
  SNIPPET_ACORDEON,
  SNIPPET_BUSCAR,
  SNIPPET_BUSCAR_COMPLETO,
  SNIPPET_CAMPANA,
  SNIPPET_CAMPANA_COMPLETO,
  SNIPPET_COPIAR,
  SNIPPET_COPIAR_COMPLETO,
  SNIPPET_ENVIAR,
  SNIPPET_ENVIAR_COMPLETO,
  SNIPPET_MENU,
  SNIPPET_MENU_COMPLETO,
  SNIPPET_PLAY,
  SNIPPET_PLAY_COMPLETO,
  SNIPPET_REACCION,
  SNIPPET_REACCION_COMPLETO,
  SNIPPET_TEMA,
  SNIPPET_TEMA_COMPLETO,
} from './snippets';
import { iconoPlano } from '../../core/morph-icon-plano';
import { Rutas } from '../../core/rutas.service';

/**
 * Patrones reales, no una vitrina de iconos sueltos.
 *
 * El grid de `/` enseña QUÉ hay; esto enseña PARA QUÉ sirve. Cada tarjeta es un control que de
 * verdad hace lo que dice — el de copiar copia, el de tema cambia colores, el de enviar tiene sus
 * tres estados — porque un patrón que solo simula su efecto no se puede juzgar: la animación se
 * siente distinta cuando compite con trabajo real en el mismo frame.
 *
 * Los snippets están al lado a propósito: lo que la gente viene a llevarse es el código.
 */
@Component({
  selector: 'app-patrones',
  imports: [BloqueCodigo, GfIconComponent, GfIconMorphComponent, Boton, RouterLink, TranslocoPipe],
  // El scope va aquí y no en la ruta: `app.routes.ts` es eager, así que su loader se resuelve en
  // un `import()` aparte que se encadena DESPUÉS de bajar este chunk — dos esperas en fila, y
  // mientras tanto el texto se pinta vacío. Declarado aquí, el idioma por defecto viaja DENTRO de
  // este chunk y llega con él. El otro sigue diferido: solo lo baja quien usa el switcher.
  providers: [
    provideTranslocoScope({
      scope: 'patrones',
      loader: {
        en: () => Promise.resolve(patronesEn),
        es: () => import('../../../i18n/patrones/es.json').then((m) => m.default),
      },
    }),
  ],
  templateUrl: './patrones.html',
  styleUrl: './patrones.css',
})
export class Patrones implements OnDestroy {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  /** Los enlaces se piden por ID: el slug cambia con el idioma. Ver `core/rutas.ts`. */
  protected readonly rutas = inject(Rutas);

  /** Los snippets viven en `snippets.ts`, en texto plano. El porqué está en su cabecera. */
  protected readonly SNIPPET_COPIAR = SNIPPET_COPIAR;
  protected readonly SNIPPET_TEMA = SNIPPET_TEMA;
  protected readonly SNIPPET_ENVIAR = SNIPPET_ENVIAR;
  protected readonly SNIPPET_REACCION = SNIPPET_REACCION;
  protected readonly SNIPPET_COPIAR_COMPLETO = SNIPPET_COPIAR_COMPLETO;
  protected readonly SNIPPET_TEMA_COMPLETO = SNIPPET_TEMA_COMPLETO;
  protected readonly SNIPPET_ENVIAR_COMPLETO = SNIPPET_ENVIAR_COMPLETO;
  protected readonly SNIPPET_REACCION_COMPLETO = SNIPPET_REACCION_COMPLETO;
  protected readonly SNIPPET_MENU = SNIPPET_MENU;
  protected readonly SNIPPET_MENU_COMPLETO = SNIPPET_MENU_COMPLETO;
  protected readonly SNIPPET_PLAY = SNIPPET_PLAY;
  protected readonly SNIPPET_PLAY_COMPLETO = SNIPPET_PLAY_COMPLETO;
  protected readonly SNIPPET_ACORDEON = SNIPPET_ACORDEON;
  protected readonly SNIPPET_CAMPANA = SNIPPET_CAMPANA;
  protected readonly SNIPPET_CAMPANA_COMPLETO = SNIPPET_CAMPANA_COMPLETO;
  protected readonly SNIPPET_BUSCAR = SNIPPET_BUSCAR;
  protected readonly SNIPPET_BUSCAR_COMPLETO = SNIPPET_BUSCAR_COMPLETO;

  private readonly relojes: ReturnType<typeof setTimeout>[] = [];

  // ── Copiar al portapapeles ──────────────────────────────────────────────────
  protected readonly copiado = signal(false);
  /**
   * `copyIcon` aplanado a un solo path: son 2 figuras (rect + trazo) contra la 1 de `checkIcon`,
   * y el plan de morph resuelve p≠q con asignación surjectiva — las dos convergen al MISMO
   * destino, así que a media transición se ven cruzándose. Aplanado, es 1↔1 real.
   */
  private readonly copyIconPlano = iconoPlano(copyIcon);
  protected readonly iconoCopiar = computed<MorphIcon>(() =>
    this.copiado() ? checkIcon : this.copyIconPlano,
  );
  protected readonly TEXTO_A_COPIAR = 'npm i glyphflow';
  /** La rama elige la CLAVE, no el texto — mismo patrón que `boton-github.ts`. */
  private readonly claveCopiar = computed(() =>
    this.copiado() ? 'patrones.copiar.boton.copiado' : 'patrones.copiar.boton.copiar',
  );
  protected readonly etiquetaCopiar = translateSignal(this.claveCopiar);

  protected async copiar(): Promise<void> {
    // El write real puede fallar (sin permiso, sin foco, http). Si truena, no se miente con la
    // palomita: el icono se queda en `copy` y el estado nunca cambia.
    try {
      await navigator.clipboard.writeText(this.TEXTO_A_COPIAR);
    } catch {
      return;
    }
    this.copiado.set(true);
    this.enUnRato(() => this.copiado.set(false), 1600);
  }

  /**
   * Las tres columnas de la caja de decisión (T21). Se declaran como DATOS y no como tres bloques
   * repetidos en la plantilla: son la misma estructura tres veces, y escribirla tres veces es
   * garantizar que la cuarta se escriba distinta.
   *
   * Cada una enlaza al patrón que la ilustra — las anclas existen desde T25.
   *
   * `tono` va SEPARADO de `ancla` a propósito, y no es purismo: el color estuvo atado al ancla y se
   * rompió en cuanto T23 las renombró a la forma derivada del título. Un ancla es una URL pública
   * que puede cambiar; el color de una columna no debería depender de eso.
   *
   * Las claves llevan NOMBRE (`forma`, `reacciona`, `duracion`) y no índice: primero fueron un
   * array en el JSON y Transloco no indexa arrays con notación de punto — la página salió pintando
   * `patrones.decision.cols.0.pregunta` en crudo. Con nombre además se lee qué es cada columna.
   */
  protected readonly columnasDecision = [
    {
      ancla: 'menu-hamburger-x',
      tono: 'morph',
      pregunta: 'patrones.decision.forma.pregunta',
      motor: 'patrones.decision.forma.motor',
      ejemplos: 'patrones.decision.forma.ejemplos',
      porque: 'patrones.decision.forma.porque',
      ver: 'patrones.decision.forma.ver',
    },
    {
      ancla: 'bell-with-notification',
      tono: 'coreografia',
      pregunta: 'patrones.decision.reacciona.pregunta',
      motor: 'patrones.decision.reacciona.motor',
      ejemplos: 'patrones.decision.reacciona.ejemplos',
      porque: 'patrones.decision.reacciona.porque',
      ver: 'patrones.decision.reacciona.ver',
    },
    {
      ancla: 'three-state-action',
      tono: 'bucle',
      pregunta: 'patrones.decision.duracion.pregunta',
      motor: 'patrones.decision.duracion.motor',
      ejemplos: 'patrones.decision.duracion.ejemplos',
      porque: 'patrones.decision.duracion.porque',
      ver: 'patrones.decision.duracion.ver',
    },
  ];

  // ── T23 · Índice, anclas y cierre ───────────────────────────────────────────

  /**
   * El índice lateral. Los nueve patrones, con su ancla y su clave de título — las mismas claves
   * que pinta cada `<h2>`, así que el índice no puede quedarse diciendo un nombre viejo.
   */
  protected readonly indicePatrones = [
    { ancla: 'copy-to-clipboard', titulo: 'patrones.copiar.titulo' },
    { ancla: 'theme-switch', titulo: 'patrones.tema.titulo' },
    { ancla: 'three-state-action', titulo: 'patrones.enviar.titulo' },
    { ancla: 'reaction', titulo: 'patrones.reaccion.titulo' },
    { ancla: 'menu-hamburger-x', titulo: 'patrones.menu.titulo' },
    { ancla: 'player-play-pause', titulo: 'patrones.play.titulo' },
    { ancla: 'accordion', titulo: 'patrones.acordeon.titulo' },
    { ancla: 'bell-with-notification', titulo: 'patrones.campana.titulo' },
    { ancla: 'search-close', titulo: 'patrones.buscar.titulo' },
  ];

  /** Qué patrón está a la vista. `null` hasta que el observador dice algo. */
  protected readonly anclaVisible = signal<string | null>(null);
  private observador?: IntersectionObserver;

  /**
   * Marca el patrón visible mientras se hace scroll.
   *
   * `IntersectionObserver` y no un listener de scroll: el scroll dispara decenas de veces por
   * segundo y esto solo necesita saber cuándo ENTRA o SALE un patrón del viewport.
   *
   * El `rootMargin` recorta 45% arriba y 45% abajo, dejando una franja del 10% en el centro de la
   * pantalla: así el resaltado marca lo que estás MIRANDO, no lo primero que asoma por el borde.
   * Sin eso, con nueve patrones había siempre dos o tres intersecando a la vez.
   */
  private conectarIndice(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) this.anclaVisible.set(e.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const { ancla } of this.indicePatrones) {
      const el = this.host.nativeElement.querySelector(`#${ancla}`);
      if (el) this.observador.observe(el);
    }
  }

  // ── T25 · Los cinco patrones que la gente viene buscando ────────────────────

  /**
   * Hamburguesa → X. **El ejemplo canónico de morph de iconos**, y el primero que busca quien
   * llega a evaluar la librería. Es el mismo control del header de este sitio, que ya lo usaba —
   * aquí se enseña aislado, con lo que un menú de verdad necesita: `aria-expanded` y el foco de
   * vuelta al disparador al cerrar.
   */
  protected readonly menuAbierto = signal(false);
  protected readonly iconoMenu = computed<MorphIcon>(() => (this.menuAbierto() ? xIcon : menuIcon));
  private readonly claveMenu = computed(() =>
    this.menuAbierto() ? 'patrones.menu.cerrar' : 'patrones.menu.abrir',
  );
  protected readonly ariaMenu = translateSignal(this.claveMenu);

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  /**
   * Cierra y DEVUELVE el foco al disparador. Sin esto, `Esc` deja el foco en el `<body>` y el
   * siguiente `Tab` reinicia el recorrido desde el header.
   *
   * El elemento sale de `ev.currentTarget` y NO de una referencia de plantilla: `#dispMenu` sobre
   * un `<button app-boton>` resuelve al DIRECTIVO `Boton`, no al elemento, y pasarlo directo no
   * compila. Es el mismo patrón que ya usa `teclaVelocidad` en el shell.
   */
  protected cerrarMenuDemo(ev: Event): void {
    this.menuAbierto.set(false);
    (ev.currentTarget as HTMLElement).focus();
  }

  /** Play / pause. Dos formas distintas para el mismo control: morph. */
  protected readonly reproduciendo = signal(false);
  protected readonly iconoPlay = computed<MorphIcon>(() =>
    this.reproduciendo() ? pauseIcon : playIcon,
  );
  private readonly clavePlay = computed(() =>
    this.reproduciendo() ? 'patrones.play.pausar' : 'patrones.play.reproducir',
  );
  protected readonly ariaPlay = translateSignal(this.clavePlay);

  /**
   * El chevron del acordeón. **NO es morph, y ese es el punto**: la forma no cambia, gira. Meter
   * un motor de interpolación de trazos para rotar 180° sería pagar por resolver un problema que
   * no se tiene — es el contraejemplo que hace concreta la regla de cuándo NO usar morph.
   */
  protected readonly desplegado = signal(false);
  /* `trigger="manual"` y nadie llama a `play()`: la geometría se pinta quieta y el giro lo hace
     CSS. Es lo que el patrón enseña — el motor no participa. */
  protected readonly chevron: AnimatedIconDef = chevronDownIcon;

  /**
   * La campana. Choreography sobre la MISMA forma: no hay a qué transicionar, hay un movimiento
   * con intención sobre una figura que no cambia.
   */
  protected readonly campana: AnimatedIconDef = bellIcon;
  protected readonly noLeidas = signal(3);

  protected marcarLeidas(): void {
    this.noLeidas.set(0);
  }

  /** Buscar → cerrar. El campo se expande y el icono dice qué hace ahora el botón. */
  protected readonly buscando = signal(false);
  protected readonly iconoBuscar = computed<MorphIcon>(() =>
    this.buscando() ? xIcon : searchIcon,
  );
  private readonly claveBuscar = computed(() =>
    this.buscando() ? 'patrones.buscar.cerrar' : 'patrones.buscar.abrir',
  );
  protected readonly ariaBuscar = translateSignal(this.claveBuscar);

  protected alternarBuscar(campo: HTMLInputElement): void {
    this.buscando.update((v) => !v);
    // El foco entra al campo al abrir; al cerrar se queda en el botón, que es donde estaba la mano.
    if (this.buscando()) queueMicrotask(() => campo.focus());
  }

  // ── Tema claro/oscuro ───────────────────────────────────────────────────────
  protected readonly claro = signal(false);
  protected readonly iconoTema = computed<MorphIcon>(() => (this.claro() ? sunIcon : moonIcon));
  /** El aria-label dice A DÓNDE vas, no dónde estás — mismo criterio que el switcher del shell. */
  private readonly claveAriaTema = computed(() =>
    this.claro() ? 'patrones.tema.ariaAOscuro' : 'patrones.tema.ariaAClaro',
  );
  protected readonly ariaTema = translateSignal(this.claveAriaTema);
  /** El `label` del icono, en cambio, nombra el estado actual. */
  private readonly claveLabelTema = computed(() =>
    this.claro() ? 'patrones.tema.labelClaro' : 'patrones.tema.labelOscuro',
  );
  protected readonly labelTema = translateSignal(this.claveLabelTema);

  protected alternarTema(): void {
    this.claro.update((v) => !v);
  }

  // ── Enviar: reposo → enviando → enviado ─────────────────────────────────────
  protected readonly estadoEnvio = signal<'reposo' | 'enviando' | 'enviado'>('reposo');
  /** `send` y `circle-check` van por morph; el spinner NO — ver la nota del template. */
  protected readonly iconoEnvio = computed<MorphIcon>(() =>
    this.estadoEnvio() === 'enviado' ? circleCheckIcon : sendIcon,
  );
  protected readonly spinner: AnimatedIconDef = loaderCircleIcon;
  /** Reposo → enviando → enviado, cada uno su propia clave. */
  private readonly claveEnvio = computed(() => {
    switch (this.estadoEnvio()) {
      case 'enviando':
        return 'patrones.enviar.boton.enviando';
      case 'enviado':
        return 'patrones.enviar.boton.enviado';
      default:
        return 'patrones.enviar.boton.reposo';
    }
  });
  protected readonly etiquetaEnvio = translateSignal(this.claveEnvio);

  protected enviar(): void {
    if (this.estadoEnvio() !== 'reposo') return;
    this.estadoEnvio.set('enviando');
    this.enUnRato(() => {
      this.estadoEnvio.set('enviado');
      this.enUnRato(() => this.estadoEnvio.set('reposo'), 2000);
    }, 1200);
  }

  // ── Me gusta ────────────────────────────────────────────────────────────────
  protected readonly corazon: AnimatedIconDef = heartIcon;
  protected readonly meGusta = signal(false);
  protected readonly votos = signal(128);

  protected alternarMeGusta(): void {
    this.meGusta.update((v) => !v);
    this.votos.update((n) => n + (this.meGusta() ? 1 : -1));
  }

  /** Los timers se cancelan al destruir: cambiar de ruta a media animación no debe escribir señales. */
  private enUnRato(fn: () => void, ms: number): void {
    this.relojes.push(setTimeout(fn, ms));
  }

  constructor() {
    // Tras el primer render: antes de eso los `<article>` no existen y no hay qué observar.
    afterNextRender(() => {
      this.conectarIndice();
      this.irAlAncla();
    });
  }

  /**
   * Vuelve a aplicar el ancla de la URL una vez que la página ya asentó.
   *
   * **Medido**: entrar directo a `/en/patterns#accordion` aterrizaba a 1376 px del destino, aunque
   * disparar el mismo hash DESDE la página funcionaba. La diferencia es el momento — con la página
   * prerenderizada el navegador intenta desplazar en cuanto ve el hash, y entonces todavía faltan
   * por asentar las fuentes y los nueve demos, así que el destino se mueve DEBAJO del scroll ya
   * hecho. Es el primer criterio de aceptación de T23, y sin esto no se cumplía.
   *
   * Los 88 px son el mismo offset que usa el resto del sitio (`ViewportScroller.setOffset`), y por
   * la misma razón: el header es fijo y mide 71: sin el hueco, el destino queda debajo de él.
   */
  private irAlAncla(): void {
    const id = location.hash.slice(1);
    if (!id) return;
    const destino = this.host.nativeElement.querySelector(`#${CSS.escape(id)}`);
    if (!destino) return;
    // `requestAnimationFrame`: dentro del mismo cuadro el layout todavía puede moverse.
    requestAnimationFrame(() => {
      const y = destino.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: 'auto' });
    });
  }

  ngOnDestroy(): void {
    for (const r of this.relojes) clearTimeout(r);
    this.observador?.disconnect();
  }
}
