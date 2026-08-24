import { Component, signal, computed, inject, OnDestroy } from '@angular/core';
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

  ngOnDestroy(): void {
    for (const r of this.relojes) clearTimeout(r);
  }
}
