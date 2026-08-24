import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  afterNextRender,
  inject,
} from '@angular/core';

/** Lo que hace falta saber de una pulsación para decidir a dónde va el foco. */
export interface Pulsacion {
  readonly tecla: string;
  readonly conControl: boolean;
}

/**
 * Decide el índice de destino, o `null` si esa tecla no mueve nada desde aquí.
 *
 * Va suelta y pura a propósito: es TODA la aritmética de la navegación, y así se prueba con una
 * tabla de casos en vez de montar un DOM con un número de columnas creíble. El entorno de pruebas
 * no calcula layout, así que medir columnas de verdad ahí no demuestra nada.
 *
 * Ninguna tecla se sale por los bordes: al llegar al extremo el foco se queda donde está en vez de
 * dar la vuelta. Envolver haría que `ArrowRight` en el final de una fila saltara al principio de la
 * siguiente, que es justo lo que una rejilla NO debe hacer — la fila es la unidad que el ojo sigue.
 */
export function siguienteIndice(
  actual: number,
  pulsacion: Pulsacion,
  columnas: number,
  total: number,
): number | null {
  if (total <= 0 || columnas <= 0) return null;

  const ultimo = total - 1;
  const fila = Math.floor(actual / columnas);
  const inicioFila = fila * columnas;
  const finFila = Math.min(inicioFila + columnas - 1, ultimo);
  const ultimaFila = Math.floor(ultimo / columnas);

  switch (pulsacion.tecla) {
    case 'ArrowRight':
      return actual < ultimo ? actual + 1 : null;
    case 'ArrowLeft':
      return actual > 0 ? actual - 1 : null;
    /*
     * `min(…, ultimo)` y no `actual + columnas` a secas: la última fila casi nunca viene completa,
     * y sin el tope bajar desde la penúltima no llegaba a los últimos elementos — quedaban
     * alcanzables solo con `ArrowRight`.
     */
    case 'ArrowDown':
      return fila < ultimaFila ? Math.min(actual + columnas, ultimo) : null;
    case 'ArrowUp':
      return fila > 0 ? actual - columnas : null;
    case 'Home':
      return pulsacion.conControl ? 0 : inicioFila;
    case 'End':
      return pulsacion.conControl ? ultimo : finFila;
    default:
      return null;
  }
}

/**
 * Convierte una rejilla de celdas en UNA sola parada de tabulación, recorrible con flechas
 * (*roving tabindex*).
 *
 * Existe por un número: el catálogo pinta 911 tarjetas y cada una traía `tabindex="0"`. Llegar con
 * el teclado a lo que hay DEBAJO de la rejilla costaba 911 pulsaciones de `Tab`. Ahora cuesta una.
 *
 * **Por qué mueve el atributo a mano y no por binding.** `[attr.tabindex]="$index === enfocado()"`
 * dentro del `@for` obliga a Angular a reevaluar la expresión en las 911 celdas cada vez que el
 * foco avanza una posición. Aquí se tocan exactamente dos elementos: el que lo suelta y el que lo
 * toma.
 *
 * **El reparto de salida sí lo siembra la plantilla** (`[attr.tabindex]="$first ? 0 : -1"`), y no
 * es redundante: el sitio se prerenderiza, y sin ese atributo en el HTML la rejilla no sería
 * alcanzable con `Tab` hasta que hidratara. `$first` no cambia nunca, así que no cuesta nada. De
 * ahí en adelante manda esta directiva, que además vuelve a repartir tras cada filtrado.
 *
 * **Por qué las columnas se leen del estilo calculado.** El número real lo decide `auto-fill`
 * contra el ancho disponible y la densidad elegida, así que no hay constante que valga: cambia al
 * redimensionar y al conmutar de densidad. Se lee en el momento de la pulsación y no se cachea —
 * es una lectura, no un observador de más.
 *
 * **Por qué no `role="grid"`.** Un `grid` de ARIA exige `role="row"` entre el contenedor y las
 * celdas, y aquí las filas no existen en el DOM: las forma `auto-fill` y cambian de tamaño con la
 * ventana. Inventar filas obligaría a partir la lista en trozos desde TypeScript y a repintarla en
 * cada `resize`. Un `grid` sin filas es ARIA inválido, que se anuncia peor que no declararlo: el
 * contenedor va como `group` con su rótulo, y cada celda conserva el suyo.
 */
@Directive({ selector: '[appRejillaTeclado]' })
export class RejillaTeclado {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observadorHijos?: MutationObserver;

  constructor() {
    // En el constructor los hijos todavía no existen: no habría a quién darle el `tabindex`.
    afterNextRender(() => this.arrancar());
    inject(DestroyRef).onDestroy(() => this.observadorHijos?.disconnect());
  }

  private arrancar(): void {
    this.normalizar();

    // Detrás de su comprobación, como en `appCarrilActivo`: el entorno de pruebas no siempre trae
    // los observadores, y sin esto la excepción se llevaría por delante el reparto inicial.
    if (typeof MutationObserver === 'undefined') return;

    /*
     * Solo `childList`. Filtrar y buscar rehacen la lista, y la celda que tenía el `tabindex` puede
     * haber desaparecido — sin esto la rejilla se queda sin ninguna parada de tabulación y deja de
     * ser alcanzable. Escribir el `tabindex` no vuelve a dispararlo (es un atributo, no un hijo),
     * así que no hay bucle.
     */
    this.observadorHijos = new MutationObserver(() => this.normalizar());
    this.observadorHijos.observe(this.host.nativeElement, { childList: true });
  }

  private celdas(): HTMLElement[] {
    return Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>(':scope > [data-celda]'),
    );
  }

  /** Exactamente una celda tabulable. Conserva la que ya lo era si sobrevivió al filtro. */
  private normalizar(): void {
    const celdas = this.celdas();
    if (!celdas.length) return;

    const superviviente = celdas.findIndex((c) => c.tabIndex === 0);
    this.repartir(celdas, superviviente === -1 ? 0 : superviviente);
  }

  private repartir(celdas: readonly HTMLElement[], destino: number): void {
    celdas.forEach((c, i) => {
      c.tabIndex = i === destino ? 0 : -1;
    });
  }

  private columnas(): number {
    const plantilla = getComputedStyle(this.host.nativeElement).gridTemplateColumns;
    if (!plantilla || plantilla === 'none') return 1;

    return Math.max(1, plantilla.split(/\s+/).filter(Boolean).length);
  }

  @HostListener('keydown', ['$event'])
  protected alTeclear(evento: KeyboardEvent): void {
    // `closest` y no `evento.target` pelado: el foco está en la celda, pero el `keydown` puede
    // venir de cualquier cosa que haya dentro de ella.
    const celda = (evento.target as HTMLElement | null)?.closest<HTMLElement>('[data-celda]');
    if (!celda) return;

    const celdas = this.celdas();
    const actual = celdas.indexOf(celda);
    if (actual === -1) return;

    const destino = siguienteIndice(
      actual,
      { tecla: evento.key, conControl: evento.ctrlKey || evento.metaKey },
      this.columnas(),
      celdas.length,
    );
    if (destino === null) return;

    // Solo cuando la tecla SÍ es de las nuestras: `Home` y las flechas desplazan la página, y
    // cancelarlas cuando no movemos nada le quitaría al usuario el scroll de teclado.
    evento.preventDefault();
    this.repartir(celdas, destino);
    celdas[destino].focus();
  }
}
