import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { GfIconComponent, searchIcon } from 'glyphflow';
import { Rutas } from '../../core/rutas.service';
import { type RutaId } from '../../core/rutas';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';

interface EntradaIndice {
  idioma: string;
  ruta: string;
  ancla: string;
  titulo: string;
  texto: string;
}

/** Sin acentos y en minúsculas, para que «configuración» se encuentre tecleando «configuracion». */
function normalizar(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function palabras(s: string): string[] {
  return normalizar(s)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * Decide si una entrada casa con lo tecleado.
 *
 * Dos reglas, y las dos hacen falta:
 *
 * - **Subcadena de la consulta entera.** Es la que responde a teclear a medias: «tree-shak»
 *   encuentra «tree-shakeable» aunque ninguna palabra suelta coincida.
 * - **Cada palabra, prefijo de alguna palabra del texto.** Es la que hace útil el buscador de API:
 *   «prov» encuentra `provideGfIcons` sin haber escrito el nombre entero.
 *
 * Se descartó el emparejado difuso por parecido. Con 40 entradas y textos cortos, un umbral de
 * similitud da más falsos positivos que aciertos —«config» casando con «confirm»— y un buscador que
 * devuelve cosas que no pediste se deja de usar antes que uno que devuelve poco.
 */
export function casa(entrada: EntradaIndice, consulta: string): boolean {
  const q = normalizar(consulta).trim();
  if (!q) return false;

  const heno = normalizar(`${entrada.titulo} ${entrada.texto}`);
  if (heno.includes(q)) return true;

  const delTexto = palabras(heno);
  return palabras(q).every((t) => delTexto.some((p) => p.startsWith(t)));
}

/**
 * Buscador de Docs con `Ctrl+K` / `⌘K`.
 *
 * El índice se construye EN TIEMPO DE BUILD (`npm run gen:docs-index`) y se carga con `import()` al
 * abrir por primera vez — mismo patrón que `tags-catalogo.json`: importarlo de arriba lo metería en
 * el bundle de Docs, y el 90 % de las visitas nunca abren el buscador.
 *
 * Vive en el marco de Docs y no en el shell del sitio a propósito: lo que busca es el contenido de
 * Docs, así que ofrecer el atajo desde el catálogo de iconos prometería algo que no cumple.
 */
@Component({
  selector: 'app-buscador-docs',
  imports: [TranslocoPipe, GfIconComponent, CampoBusqueda],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './buscador-docs.html',
  styleUrl: './buscador-docs.css',
})
export class BuscadorDocs {
  private readonly router = inject(Router);
  private readonly rutas = inject(Rutas);

  protected readonly iconoBuscar = searchIcon;

  protected readonly abierto = signal(false);
  protected readonly consulta = signal('');
  protected readonly indice = signal<EntradaIndice[] | null>(null);
  protected readonly resaltado = signal(0);

  private readonly campo = viewChild<CampoBusqueda>('campo');

  protected readonly resultados = computed(() => {
    const todos = this.indice();
    const q = this.consulta().trim();
    if (!todos || !q) return [];

    return todos.filter((e) => e.idioma === this.rutas.idioma() && casa(e, q)).slice(0, 8);
  });

  /**
   * Los mismos `resultados()`, agrupados por documento -- «API» una vez, con sus coincidencias
   * debajo, en vez de repetir el nombre del documento en cada fila. Cada item conserva su índice
   * PLANO original (`i`): es contra ese índice que compara `resaltado()`, así que agrupar
   * visualmente no puede desincronizar qué fila resalta el teclado.
   */
  protected readonly resultadosAgrupados = computed(() => {
    const porDoc = new Map<string, { r: EntradaIndice; i: number }[]>();
    this.resultados().forEach((r, i) => {
      const lista = porDoc.get(r.ruta);
      if (lista) lista.push({ r, i });
      else porDoc.set(r.ruta, [{ r, i }]);
    });
    return Array.from(porDoc, ([ruta, items]) => ({ ruta, items }));
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => this.cerrar());
    /*
     * Se abre siempre con el foco YA en el campo: quien dispara Ctrl+K viene tecleando y no debería
     * tener que hacer un click extra. El `queueMicrotask` no es cosmético: en el mismo instante en
     * que este efecto ve `abierto() === true`, `CampoBusqueda` recién se insertó y su propio
     * `viewChild` interno del `<input>` puede no haberse resuelto todavía — una vuelta de microtask
     * le da tiempo a Angular a terminar antes de pedirle el foco.
     */
    effect(() => {
      if (this.abierto()) queueMicrotask(() => this.campo()?.focus());
    });
  }

  /*
   * El atajo se escucha en el documento y no en el propio cuadro: mientras está cerrado no hay
   * nada enfocado a lo que colgarlo. `preventDefault` porque `Ctrl+K` es «buscar enlace» en algunos
   * navegadores y, si no se corta, se abren los dos.
   */
  @HostListener('document:keydown', ['$event'])
  protected alTeclearGlobal(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (this.abierto()) this.cerrar();
      else void this.abrir();
      return;
    }
    if (e.key === 'Escape' && this.abierto()) {
      e.preventDefault();
      this.cerrar();
    }
  }

  /** Público: el toolbar móvil de `Docs` también lo dispara, desde fuera de este componente. */
  async abrir(): Promise<void> {
    this.abierto.set(true);
    this.consulta.set('');
    this.resaltado.set(0);
    if (this.indice()) return;

    const modulo = await import('./indice-busqueda.json');
    this.indice.set(modulo.default as EntradaIndice[]);
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  protected alEscribir(valor: string): void {
    this.consulta.set(valor);
    // Vuelve al primero en cada tecla: si no, al acortar la lista el resaltado quedaba apuntando a
    // un índice que ya no existe y `Enter` no hacía nada.
    this.resaltado.set(0);
  }

  /** Flechas y `Enter` DENTRO del campo: mover el resaltado sin sacar el foco de donde se escribe. */
  protected alTeclearEnCampo(e: KeyboardEvent): void {
    const total = this.resultados().length;
    if (!total) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.resaltado.update((i) => (i + 1) % total);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.resaltado.update((i) => (i - 1 + total) % total);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.ir(this.resultados()[this.resaltado()]);
    }
  }

  protected ir(entrada: EntradaIndice | undefined): void {
    if (!entrada) return;
    this.cerrar();
    /*
     * Por el router y con `fragment`, no con `location.hash`: aquí sí se cambia de página, y el
     * router ya tiene `anchorScrolling: 'enabled'`, así que el desplazamiento al ancla lo hace él.
     */
    void this.router.navigate([this.rutas.a('docs', entrada.ruta as RutaId)], {
      fragment: entrada.ancla,
    });
  }
}
