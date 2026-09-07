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
  chevronDownIcon,
  circleCheckIcon,
  GfIconComponent,
  heartIcon,
  loaderCircleIcon,
  searchIcon,
  sendIcon,
  type AnimatedIconDef,
  xIcon,
} from 'glyphflow';
import {
  COPY_INTENT,
  EXPAND_COLLAPSE_INTENT,
  FAVORITE_INTENT,
  GfIconMorphComponent,
  LIKE_INTENT,
  MENU_CLOSE_INTENT,
  NOTIFY_INTENT,
  PASSWORD_INTENT,
  PIN_INTENT,
  PLAY_PAUSE_INTENT,
  THEME_INTENT,
  VOLUME_INTENT,
  type MorphIcon,
} from 'glyphflow/morph';
import { provideTranslocoScope, TranslocoPipe, translateSignal } from '@jsverse/transloco';
import patronesEn from '../../../i18n/patrones/en.json';
import { Boton } from '../../shared/ui/boton';
import { BloqueCodigo } from '../../shared/ui/bloque-codigo';
import { Recuadro } from '../../shared/ui/recuadro';
import { MotorBadge } from './motor-badge';
import { huecoBajoHeader } from '../../core/header';
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
  SNIPPET_FAVORITO,
  SNIPPET_FAVORITO_COMPLETO,
  SNIPPET_NOTIFICAR,
  SNIPPET_NOTIFICAR_COMPLETO,
  SNIPPET_FIJAR,
  SNIPPET_FIJAR_COMPLETO,
  SNIPPET_SILENCIAR,
  SNIPPET_SILENCIAR_COMPLETO,
  SNIPPET_QUITAR_LIKE,
  SNIPPET_QUITAR_LIKE_COMPLETO,
  SNIPPET_CONTRASENA,
  SNIPPET_CONTRASENA_COMPLETO,
  SNIPPET_EXPANDIR,
  SNIPPET_EXPANDIR_COMPLETO,
} from './snippets';
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
  imports: [
    BloqueCodigo,
    Recuadro,
    MotorBadge,
    GfIconComponent,
    GfIconMorphComponent,
    Boton,
    RouterLink,
    TranslocoPipe,
  ],
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
  protected readonly SNIPPET_FAVORITO = SNIPPET_FAVORITO;
  protected readonly SNIPPET_FAVORITO_COMPLETO = SNIPPET_FAVORITO_COMPLETO;
  protected readonly SNIPPET_NOTIFICAR = SNIPPET_NOTIFICAR;
  protected readonly SNIPPET_NOTIFICAR_COMPLETO = SNIPPET_NOTIFICAR_COMPLETO;
  protected readonly SNIPPET_FIJAR = SNIPPET_FIJAR;
  protected readonly SNIPPET_FIJAR_COMPLETO = SNIPPET_FIJAR_COMPLETO;
  protected readonly SNIPPET_SILENCIAR = SNIPPET_SILENCIAR;
  protected readonly SNIPPET_SILENCIAR_COMPLETO = SNIPPET_SILENCIAR_COMPLETO;
  protected readonly SNIPPET_QUITAR_LIKE = SNIPPET_QUITAR_LIKE;
  protected readonly SNIPPET_QUITAR_LIKE_COMPLETO = SNIPPET_QUITAR_LIKE_COMPLETO;
  protected readonly SNIPPET_CONTRASENA = SNIPPET_CONTRASENA;
  protected readonly SNIPPET_CONTRASENA_COMPLETO = SNIPPET_CONTRASENA_COMPLETO;
  protected readonly SNIPPET_EXPANDIR = SNIPPET_EXPANDIR;
  protected readonly SNIPPET_EXPANDIR_COMPLETO = SNIPPET_EXPANDIR_COMPLETO;

  private readonly relojes: ReturnType<typeof setTimeout>[] = [];

  // ── Copiar al portapapeles ──────────────────────────────────────────────────
  protected readonly COPY_INTENT = COPY_INTENT;
  protected readonly copiado = signal(false);
  protected readonly TEXTO_A_COPIAR = 'npm i glyphflow';
  /** La rama elige la CLAVE, no el texto — mismo patrón que `boton-github.ts`. */
  private readonly claveCopiar = computed(() =>
    this.copiado() ? 'patrones.copiar.boton.copiado' : 'patrones.copiar.boton.copiar',
  );
  protected readonly etiquetaCopiar = translateSignal(this.claveCopiar);

  /*
   * El acuse para lectores de pantalla (T22, punto 5). El botón YA cambia su texto de «Copiar» a
   * «Copiado», pero eso solo se anuncia si el foco está encima y depende del lector — el estado
   * cambiaba visualmente sin decir nada. Es el mismo trato que en `bloque-codigo`, y por lo mismo:
   * la página que enseña el patrón tiene que cumplirlo.
   *
   * Vacío mientras no ha pasado nada: una región viva que arranca CON texto lo anuncia al montar.
   */
  private readonly claveAnuncioCopiar = computed(() =>
    this.copiado() ? 'patrones.copiar.boton.copiado' : '',
  );
  protected readonly anuncioCopiar = translateSignal(this.claveAnuncioCopiar);

  protected async copiar(): Promise<void> {
    // El write real puede fallar (sin permiso, sin foco, http). Si truena, no se miente con la
    // palomita: el icono se queda en `copy` y el estado nunca cambia.
    try {
      await navigator.clipboard.writeText(this.TEXTO_A_COPIAR);
    } catch {
      return;
    }
    this.copiado.set(true);
    // El icono ya vuelve solo por el `autoReset` de `COPY_INTENT` — esto es lo mismo, pero para
    // el resto del demo (el texto del botón, el anuncio), que el intent no puede tocar.
    this.enUnRato(() => this.copiado.set(false), COPY_INTENT.autoReset ?? 2000);
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
    { ancla: 'star-unstar', titulo: 'patrones.favorito.titulo' },
    { ancla: 'mute-notifications', titulo: 'patrones.notificar.titulo' },
    { ancla: 'pin-unpin', titulo: 'patrones.fijar.titulo' },
    { ancla: 'mute-sound', titulo: 'patrones.silenciar.titulo' },
    { ancla: 'remove-like', titulo: 'patrones.quitarLike.titulo' },
    { ancla: 'password-visibility', titulo: 'patrones.contrasena.titulo' },
    { ancla: 'expand-collapse', titulo: 'patrones.expandir.titulo' },
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
    const visibledMap = new Map<string, boolean>();

    this.observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          visibledMap.set(e.target.id, e.isIntersecting);
        }

        for (const { ancla } of this.indicePatrones) {
          if (visibledMap.get(ancla)) {
            this.anclaVisible.set(ancla);
            break;
          }
        }
      },
      { rootMargin: '-70px 0px -50% 0px' },
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
  protected readonly MENU_CLOSE_INTENT = MENU_CLOSE_INTENT;
  protected readonly menuAbierto = signal(false);
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
  protected readonly PLAY_PAUSE_INTENT = PLAY_PAUSE_INTENT;
  protected readonly reproduciendo = signal(false);
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
  protected readonly THEME_INTENT = THEME_INTENT;
  protected readonly claro = signal(false);
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

  // ── Cinco MorphIntent — [intent] en vez de armar el ternario a mano ──────────
  // A diferencia de TODO lo de arriba (`iconoCopiar`/`iconoMenu`/…, un `computed` por patrón que
  // decide qué figura toca), un intent ya trae el par y el resorte decididos: el input es un
  // booleano, no un icono. `[animateAtRest]` de regalo — hover real en los dos lados, sin la
  // señal de tipo que exige `iconoPlano()` para los pares p≠q de arriba.
  protected readonly FAVORITE_INTENT = FAVORITE_INTENT;
  protected readonly NOTIFY_INTENT = NOTIFY_INTENT;
  protected readonly PIN_INTENT = PIN_INTENT;
  protected readonly VOLUME_INTENT = VOLUME_INTENT;
  protected readonly LIKE_INTENT = LIKE_INTENT;

  protected readonly favorito = signal(false);
  protected alternarFavorito(): void {
    this.favorito.update((v) => !v);
  }
  /** El aria-label dice la ACCIÓN, no el estado — mismo criterio que `ariaMenu`/`ariaBuscar`. */
  private readonly claveAriaFavorito = computed(() =>
    this.favorito() ? 'patrones.favorito.quitar' : 'patrones.favorito.agregar',
  );
  protected readonly ariaFavorito = translateSignal(this.claveAriaFavorito);

  /** `active` = silenciadas — arranca en `false` (notificaciones prendidas es el default sano). */
  protected readonly notificacionesSilenciadas = signal(false);
  protected alternarNotificaciones(): void {
    this.notificacionesSilenciadas.update((v) => !v);
  }
  private readonly claveAriaNotificar = computed(() =>
    this.notificacionesSilenciadas() ? 'patrones.notificar.activar' : 'patrones.notificar.silenciar',
  );
  protected readonly ariaNotificar = translateSignal(this.claveAriaNotificar);

  protected readonly fijado = signal(true);
  protected alternarFijado(): void {
    this.fijado.update((v) => !v);
  }
  private readonly claveAriaFijar = computed(() =>
    this.fijado() ? 'patrones.fijar.desanclar' : 'patrones.fijar.marcar',
  );
  protected readonly ariaFijar = translateSignal(this.claveAriaFijar);

  /** `active` = silenciado. `VOLUME_INTENT.idle` es `volume2Icon` (con ondas) a propósito. */
  protected readonly sonidoSilenciado = signal(false);
  protected alternarSonido(): void {
    this.sonidoSilenciado.update((v) => !v);
  }
  private readonly claveAriaSilenciar = computed(() =>
    this.sonidoSilenciado() ? 'patrones.silenciar.encender' : 'patrones.silenciar.apagar',
  );
  protected readonly ariaSilenciar = translateSignal(this.claveAriaSilenciar);

  /**
   * `active` = quitado. Va SEPARADO de `meGusta`/`corazon` de arriba a propósito — ese patrón
   * es coreografía sobre la MISMA forma (un tap que reacciona); este es un morph real a
   * `heartOffIcon` (partido por una raya), la decisión de "ya no me gusta esto" con más peso.
   */
  protected readonly likeQuitado = signal(false);
  protected alternarLike(): void {
    this.likeQuitado.update((v) => !v);
  }
  private readonly claveAriaQuitarLike = computed(() =>
    this.likeQuitado() ? 'patrones.quitarLike.restaurar' : 'patrones.quitarLike.quitar',
  );
  protected readonly ariaQuitarLike = translateSignal(this.claveAriaQuitarLike);

  // ── Mostrar/ocultar contraseña ───────────────────────────────────────────────
  protected readonly PASSWORD_INTENT = PASSWORD_INTENT;
  /** `active` = a la vista, tal cual lo documenta el intent. */
  protected readonly contrasenaVisible = signal(false);
  protected alternarContrasena(): void {
    this.contrasenaVisible.update((v) => !v);
  }
  private readonly claveAriaContrasena = computed(() =>
    this.contrasenaVisible() ? 'patrones.contrasena.ocultar' : 'patrones.contrasena.mostrar',
  );
  protected readonly ariaContrasena = translateSignal(this.claveAriaContrasena);

  // ── Desplegar/plegar, la versión morph del contraejemplo de arriba ──────────
  protected readonly EXPAND_COLLAPSE_INTENT = EXPAND_COLLAPSE_INTENT;
  protected readonly expandido = signal(false);
  protected alternarExpandido(): void {
    this.expandido.update((v) => !v);
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
   * El hueco sale de `--gf-header-h` (ver `core/header.ts`), no de un número aquí: es el mismo
   * offset que usa el resto del sitio y cambiar el header tiene que moverlos todos a la vez.
   */
  private irAlAncla(): void {
    const id = location.hash.slice(1);
    if (!id) return;
    const destino = this.host.nativeElement.querySelector(`#${CSS.escape(id)}`);
    if (!destino) return;
    // `requestAnimationFrame`: dentro del mismo cuadro el layout todavía puede moverse.
    requestAnimationFrame(() => {
      const y = destino.getBoundingClientRect().top + window.scrollY - huecoBajoHeader(document);
      window.scrollTo({ top: y, behavior: 'auto' });
    });
  }

  ngOnDestroy(): void {
    for (const r of this.relojes) clearTimeout(r);
    this.observador?.disconnect();
  }
}
