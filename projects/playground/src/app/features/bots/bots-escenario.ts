import { ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { GfIconComponent, cameraIcon, chevronDownIcon, maximizeIcon, playIcon, slidersHorizontalIcon } from 'glyphflow';
import { GfBotComponent } from 'glyphflow/bots';
import { routinesExtra } from 'glyphflow/bots/extras';
import { physicalGestures } from 'glyphflow/bots/gestures';
import { Chip } from '../../shared/ui/chip';
import { Grupo } from '../../shared/ui/grupo';
import { BotMiniatura } from './bot-miniatura';
import { BotsEstado } from './bots-estado';
import { ESTADOS, FORMAS, VELOCIDADES } from './bots-datos';

/**
 * El escenario: el bot grande sobre un fondo oscuro (lo único oscuro de la página: es lo que el ojo debe buscar primero), con el
 * selector de personaje arriba, tres acciones y un reproductor abajo.
 *
 * El reproductor dice la verdad: el tiempo es el del gesto que corre (`handle.ms` del motor) y la barra avanza con el reloj real.
 * No se puede arrastrar porque los gestos no admiten saltar a un instante (son una coreografía, no un video): por eso es una barra
 * de progreso, no un control deslizante.
 */
@Component({
  selector: 'app-bots-escenario',
  imports: [GfBotComponent, GfIconComponent, BotMiniatura, Chip, Grupo, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bots-escenario.html',
  styleUrl: './bots-escenario.css',
  host: { '(document:fullscreenchange)': 'alCambiarPantalla()', '(document:keydown.escape)': 'cerrarAjustes()' },
})
export class BotsEscenario {
  protected readonly e = inject(BotsEstado);
  private readonly doc = inject(DOCUMENT);
  protected readonly formas = FORMAS;
  protected readonly estados = ESTADOS;
  protected readonly velocidades = VELOCIDADES;
  protected readonly gestos = physicalGestures;
  /** Las rutinas de `working` y `sleeping` (el selector de estado las enseña). */
  protected readonly extras = { routines: routinesExtra };

  protected readonly iconoPlay = playIcon;
  protected readonly iconoAjustes = slidersHorizontalIcon;
  protected readonly iconoPantalla = maximizeIcon;
  protected readonly iconoCaptura = cameraIcon;
  protected readonly iconoFlecha = chevronDownIcon;

  protected readonly ajustes = signal(false);
  protected readonly pantallaCompleta = signal(false);
  protected readonly capturaFallo = signal(false);

  private readonly bot = viewChild<GfBotComponent>('bot');
  private readonly escena = viewChild<ElementRef<HTMLElement>>('escena');

  /** «0.4 / 1.0 s»: lo que lleva el gesto y lo que dura. Sin gesto en curso, lo que durará el elegido (o un guion si es Idle). */
  protected readonly tiempo = computed(() => {
    const total = this.e.duracion();
    if (!total) return '0.0 s';
    return `${((this.e.avance() * total) / 1000).toFixed(1)} / ${(total / 1000).toFixed(1)} s`;
  });
  protected readonly porcentaje = computed(() => Math.round(this.e.avance() * 100));

  constructor() {
    this.e.registrar(() => this.bot()?.api);
    afterNextRender(() => this.saludar());
  }

  /** Lo único que se mueve solo al llegar: el bot cae, como se presenta. Una vez, y solo si hay movimiento. */
  private saludar(intentos = 0): void {
    const api = this.bot()?.api;
    if (!api) {
      if (intentos < 20) setTimeout(() => this.saludar(intentos + 1), 60);
      return;
    }
    if (this.e.movimiento()) api.gesture('jellyDrop');
  }

  protected valor(ev: Event): string {
    return (ev.target as HTMLSelectElement | HTMLInputElement).value;
  }

  protected alternarPantalla(): void {
    const el = this.escena()?.nativeElement;
    if (!el) return;
    if (this.doc.fullscreenElement) void this.doc.exitFullscreen();
    else void el.requestFullscreen?.();
  }

  protected alCambiarPantalla(): void {
    this.pantallaCompleta.set(!!this.escena() && this.doc.fullscreenElement === this.escena()?.nativeElement);
  }

  /** Esc cierra los ajustes (escucha el documento: el panel no es un diálogo con el foco atrapado, se cierra desde donde esté el foco). */
  protected cerrarAjustes(): void {
    this.ajustes.set(false);
  }

  /**
   * Baja el bot como PNG con fondo transparente. El motor pinta con estilos de una hoja y variables CSS que un `<svg>` suelto no trae,
   * así que cada figura se copia con sus estilos ya calculados; si el navegador no puede serializarlo se avisa en vez de bajar un
   * archivo vacío.
   */
  protected async capturar(): Promise<void> {
    const svg = this.bot()?.api?.svg;
    if (!svg) return;
    try {
      const { width, height } = svg.getBoundingClientRect();
      const clon = svg.cloneNode(true) as SVGSVGElement;
      const props = [
        'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'fill-opacity', 'stroke-opacity',
        'stop-color', 'stop-opacity', 'display', 'visibility', 'filter', 'transform', 'transform-origin', 'transform-box',
        'mix-blend-mode', 'clip-path', 'mask',
      ];
      const origen = svg.querySelectorAll('*');
      clon.querySelectorAll('*').forEach((nodo, i) => {
        const cs = getComputedStyle(origen[i]);
        for (const p of props) (nodo as SVGElement).style.setProperty(p, cs.getPropertyValue(p));
      });
      clon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clon.setAttribute('width', String(width));
      clon.setAttribute('height', String(height));
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clon)], { type: 'image/svg+xml' }));
      const img = new Image();
      await new Promise<void>((ok, mal) => {
        img.onload = () => ok();
        img.onerror = () => mal(new Error('svg'));
        img.src = url;
      });
      const lienzo = this.doc.createElement('canvas');
      const k = 2;
      lienzo.width = Math.round(width * k);
      lienzo.height = Math.round(height * k);
      lienzo.getContext('2d')?.drawImage(img, 0, 0, lienzo.width, lienzo.height);
      URL.revokeObjectURL(url);
      const png = await new Promise<Blob | null>((ok) => lienzo.toBlob(ok, 'image/png'));
      if (!png) throw new Error('png');
      const enlace = this.doc.createElement('a');
      enlace.href = URL.createObjectURL(png);
      enlace.download = `glyphflow-${this.e.forma()}.png`;
      enlace.click();
      setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
      this.capturaFallo.set(false);
    } catch {
      this.capturaFallo.set(true);
    }
  }
}
