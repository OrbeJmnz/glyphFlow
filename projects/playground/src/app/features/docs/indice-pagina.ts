import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

interface Titulo {
  id: string;
  texto: string;
  /** 2 = h2, 3 = h3 -- para indentar el subnivel en la plantilla, nada más. */
  nivel: 2 | 3;
}

/**
 * El índice de la página actual, a la derecha, con la sección visible resaltada.
 *
 * Se construye LEYENDO EL DOM (`h2[id], h3[id]` del artículo) y no de una lista declarada por
 * página. Con una lista, cada encabezado nuevo obligaría a acordarse de registrarlo en otro
 * archivo, y el síntoma de olvidarlo sería un índice incompleto que nadie nota. Leyendo el DOM, un
 * encabezado con `id` aparece solo; uno sin `id` no aparece, que es exactamente la regla que se
 * quiere. El `h3` se indenta como subnivel; no hay `h4` en ninguna página de Docs hoy.
 *
 * **También pone los enlaces de ancla** en los propios encabezados. Va aquí y no en una directiva
 * aparte porque ya recorre esos mismos nodos: separarlo obligaría a barrer el artículo dos veces
 * por cada navegación, y a mantener dos definiciones de «qué cuenta como encabezado enlazable».
 *
 * Los `id` los escribe la plantilla a mano y NO se derivan del texto: los títulos salen de i18n, así
 * que un id derivado cambiaría con el idioma y `/en/docs/api#gf-icon-morph` no existiría en
 * español. Un ancla es una URL pública; no puede depender de la traducción.
 */
@Component({
  selector: 'app-indice-pagina',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (titulos().length > 1) {
      <nav class="indice-pagina" [attr.aria-label]="'docs.indicePagina.aria' | transloco">
        <!--
          Dos cabeceras, una visible a la vez por CSS: el párrafo de siempre en desktop (donde el
          índice ya está a la vista, sticky) y un botón-disclosure debajo de 1200px, donde no hay
          hueco para mostrarlo siempre abierto.
        -->
        <p class="indice-pagina-tit">{{ 'docs.indicePagina.titulo' | transloco }}</p>
        <button
          type="button"
          class="indice-pagina-toggle"
          [attr.aria-expanded]="abiertoMovil()"
          (click)="abiertoMovil.set(!abiertoMovil())"
        >
          {{ 'docs.indicePagina.titulo' | transloco }}
          <span class="flecha" [class.abierta]="abiertoMovil()" aria-hidden="true">▾</span>
        </button>
        <ol [class.abierto-movil]="abiertoMovil()">
          @for (t of titulos(); track t.id) {
            <li>
              <a
                [href]="'#' + t.id"
                [class.activo]="t.id === activo()"
                [class.sub]="t.nivel === 3"
                (click)="ir($event, t.id)"
                >{{ t.texto }}</a
              >
            </li>
          }
        </ol>
      </nav>
    }
  `,
  styleUrl: './indice-pagina.css',
})
export class IndicePagina {
  /** El artículo que contiene la página. Llega por referencia de plantilla desde `docs.html`. */
  readonly articulo = input.required<HTMLElement>();

  protected readonly titulos = signal<Titulo[]>([]);
  protected readonly activo = signal<string | null>(null);
  /** Solo importa debajo de 1200px -- el CSS ignora esto en desktop, donde el índice ya está abierto. */
  protected readonly abiertoMovil = signal(false);

  private observadorContenido?: MutationObserver;
  private alScroll?: () => void;
  private ventana?: Window;

  constructor() {
    // En el constructor el `<router-outlet>` todavía no ha puesto la página: no habría encabezados.
    afterNextRender(() => this.arrancar());
    inject(DestroyRef).onDestroy(() => {
      this.observadorContenido?.disconnect();
      this.desconectarScroll();
    });
  }

  private arrancar(): void {
    this.barrer();

    // Cada navegación dentro de Docs cambia el contenido del artículo sin destruir este componente:
    // sin esto, el índice se quedaría con los títulos de la primera página que se abrió.
    if (typeof MutationObserver === 'undefined') return;
    this.observadorContenido = new MutationObserver(() => this.barrer());
    this.observadorContenido.observe(this.articulo(), { childList: true, subtree: true });
  }

  private barrer(): void {
    const encabezados = Array.from(
      this.articulo().querySelectorAll<HTMLElement>('h2[id], h3[id]'),
    );

    const nuevos = encabezados.map((h) => ({
      id: h.id,
      texto: this.textoDe(h),
      nivel: (h.tagName === 'H3' ? 3 : 2) as 2 | 3,
    }));
    // Comparar antes de escribir: el `MutationObserver` también se dispara cuando ESTE método mete
    // el enlace de ancla, y reescribir la señal en ese caso dejaría un bucle.
    const iguales =
      nuevos.length === this.titulos().length &&
      nuevos.every(
        (t, i) =>
          t.id === this.titulos()[i].id &&
          t.texto === this.titulos()[i].texto &&
          t.nivel === this.titulos()[i].nivel,
      );
    if (!iguales) this.titulos.set(nuevos);

    for (const h of encabezados) this.ponerAncla(h);
    this.observarVisibles(encabezados);
  }

  /**
   * El texto del encabezado SIN el enlace de ancla que este mismo componente le añade — si no, al
   * segundo barrido el índice diría «<título>#».
   */
  private textoDe(h: HTMLElement): string {
    return Array.from(h.childNodes)
      .filter((n) => !(n instanceof HTMLElement && n.classList.contains('ancla')))
      .map((n) => n.textContent ?? '')
      .join('')
      .trim();
  }

  private ponerAncla(h: HTMLElement): void {
    if (h.querySelector(':scope > .ancla')) return;

    const doc = h.ownerDocument;
    const a = doc.createElement('a');
    a.className = 'ancla';
    a.href = `#${h.id}`;
    a.textContent = '#';
    // El `#` es decoración: quien navega con lector de pantalla ya oyó el encabezado, y este enlace
    // solo repetiría su texto. El destino, en cambio, sí hay que nombrarlo.
    a.setAttribute('aria-label', `${this.textoDe(h)} — #${h.id}`);
    h.appendChild(a);
  }

  /** Suelta los oyentes anteriores: cada navegación dentro de Docs vuelve a barrer. */
  private desconectarScroll(): void {
    if (this.ventana && this.alScroll) {
      this.ventana.removeEventListener('scroll', this.alScroll);
      this.ventana.removeEventListener('resize', this.alScroll);
    }
    this.alScroll = undefined;
  }

  private observarVisibles(encabezados: HTMLElement[]): void {
    this.desconectarScroll();
    if (!encabezados.length) return;

    /*
     * Va por evento de scroll y NO por `IntersectionObserver`, contra lo que decía la ficha. La
     * razón está medida, no supuesta.
     *
     * Un `IntersectionObserver` avisa cuando algo CRUZA un umbral, no de dónde quedó. Al pulsar un
     * enlace del índice, su última llamada ocurre a media animación de scroll suave; cuando el
     * scroll se detiene ya no hay más cruces, así que no vuelve a dispararse y el resaltado se
     * queda congelado en un fotograma intermedio. El síntoma era exacto y reproducible: el índice
     * marcaba SIEMPRE la sección anterior a la pulsada, en las cinco.
     *
     * Se probaron antes dos parches por debajo del problema —afinar `rootMargin` y luego mover el
     * umbral geométrico— y ninguno podía arreglarlo: el cálculo estaba bien, lo que faltaba era
     * volver a hacerlo al terminar de moverse.
     */
    const ventana = encabezados[0].ownerDocument.defaultView;
    if (!ventana) return;

    let pendiente = 0;
    this.alScroll = () => {
      // Un `requestAnimationFrame` de guardia: el evento de scroll llega decenas de veces por
      // segundo y medir rectángulos en cada uno fuerza layout otras tantas.
      if (pendiente) return;
      pendiente = ventana.requestAnimationFrame(() => {
        pendiente = 0;
        this.recalcularActivo(encabezados);
      });
    };

    ventana.addEventListener('scroll', this.alScroll, { passive: true });
    ventana.addEventListener('resize', this.alScroll, { passive: true });
    this.ventana = ventana;
    this.recalcularActivo(encabezados);
  }

  private recalcularActivo(encabezados: HTMLElement[]): void {
    if (!encabezados.length) return;

    const ventana = encabezados[0].ownerDocument.defaultView;
    const raiz = encabezados[0].ownerDocument.documentElement;
    const alturaHeader =
      parseFloat(ventana?.getComputedStyle(raiz).getPropertyValue('--gf-header-h') ?? '') || 0;
    /*
     * La «línea de lectura»: la sección activa es el último encabezado que quedó POR ENCIMA de ella.
     *
     * Es una fracción de la ventana y no la posición donde `scrollIntoView` aparca el título, y eso
     * viene de medir. Primero se ató al `scroll-margin-top` (95 px) y el índice marcaba siempre la
     * sección anterior; al medir de verdad, el título aparcaba en 183 px, no en 95 — la posición
     * final depende del scroll suave, del alto de la ventana y de cuánto contenido queda debajo.
     * Perseguir ese número es perseguir algo que cambia solo.
     *
     * Un tercio de la ventana no depende de nada de eso y responde a la pregunta real: qué título
     * es el último que ya pasé. El piso con la altura del header cubre las ventanas muy bajas,
     * donde un tercio caería por encima del propio header.
     */
    const umbral = Math.max(alturaHeader + 64, (ventana?.innerHeight ?? 0) / 3);

    /*
     * Al fondo del scroll manda el ÚLTIMO, sin mirar geometría.
     *
     * Es el caso clásico que rompe todo índice: la última sección casi nunca tiene contenido
     * suficiente debajo para llegar al borde superior, así que por posición nunca gana y queda
     * imposible de resaltar. Medido aquí: pulsando su enlace, la página llegaba a su tope (4224 de
     * 4224) con el título todavía a 376 px del borde, y el índice seguía marcando la sección
     * anterior — o sea el enlace parecía no funcionar.
     */
    const alFondo = (ventana?.scrollY ?? 0) >= raiz.scrollHeight - (ventana?.innerHeight ?? 0) - 2;
    if (alFondo) {
      this.activo.set(encabezados[encabezados.length - 1].id);
      return;
    }

    let elegido = encabezados[0];
    for (const h of encabezados) {
      if (h.getBoundingClientRect().top <= umbral) elegido = h;
    }
    this.activo.set(elegido.id);
  }

  /**
   * Desplaza sin navegar. `replaceState` y no `router.navigate`: el sitio corre con
   * `withViewTransitions`, así que navegar por un fragmento animaría la página entera para moverse
   * dentro de ella. Misma decisión que el `?q=` del buscador de iconos.
   */
  protected ir(evento: Event, id: string): void {
    const destino = this.articulo().querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!destino) return;

    evento.preventDefault();
    destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activo.set(id);
    // En mobile el índice es un disclosure: elegir una sección lo cierra, igual que un menú.
    this.abiertoMovil.set(false);

    /*
     * La URL se rearma con `pathname` + `search` delante y NO solo con `#id`. Medido: pasar
     * únicamente el fragmento dejaba `localhost:4300/#icons` — se comía la ruta entera, así que
     * copiar la barra de direcciones daba un enlace a la portada. Es el `<base href>` del sitio
     * resolviendo el relativo contra la raíz, no contra la página.
     */
    const ventana = destino.ownerDocument.defaultView;
    ventana?.history.replaceState(
      null,
      '',
      `${ventana.location.pathname}${ventana.location.search}#${id}`,
    );
  }
}
