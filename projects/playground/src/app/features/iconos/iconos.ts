import {
  Component,
  ViewChildren,
  QueryList,
  signal,
  computed,
  inject,
  OnDestroy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  MaxIconComponent,
  CURATED_ICONS,
  AnimatedIconDef,
  circleIcon,
  squareIcon,
  diamondIcon,
  triangleIcon,
  leafIcon,
  codeIcon,
} from 'glyphflow';
import { MaxIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { RouterLink } from '@angular/router';
import { Boton } from '../../shared/ui/boton';
import { CampoBusqueda } from '../../shared/ui/campo-busqueda';
import { Chip } from '../../shared/ui/chip';
import { Contador } from '../../shared/ui/contador';
import { Grupo } from '../../shared/ui/grupo';
import { NombreTransicion } from '../../shared/ui/nombre-transicion';
import { Tooltip } from '../../shared/ui/tooltip';
import { IconDetailPanel } from './icon-detail-panel';
import { insigniasDe, type ClaveInsignia, type Insignia } from './icon-badges';
import { CIFRAS } from '../../core/cifras';
import { conTransicion } from '../../core/transicion';
import { tema } from '../../core/tema';

interface CuratedEntry {
  name: string;
  def: AnimatedIconDef;
  /** Lo que distingue a ESTA tarjeta de las otras 179. Vacío en la mayoría, y está bien. */
  insignias: Insignia[];
  /** `draw` + `default` + extras — el indicador numérico de la tarjeta, no el detalle de cuáles. */
  numAnimaciones: number;
}

/**
 * Los 180 curados, cada uno con su coreografía real corriendo en el navegador.
 *
 * Consume el paquete PUBLICADO (`glyphflow` del registro, vía el alias en tsconfig.paths.json),
 * nunca `dist/glyphflow` ni el código de projects/glyphflow. Si algo de la API pública no alcanza,
 * esta página es la que se entera — que es justo para lo que existe.
 *
 * Se usa `[iconDef]` y NO `name=`: esa es la ruta tree-shakeable, y de paso evita arrastrar el
 * registro completo de 1767 iconos a una demo que solo enseña 180.
 */
@Component({
  selector: 'app-iconos',
  imports: [
    MaxIconComponent,
    MaxIconMorphComponent,
    IconDetailPanel,
    RouterLink,
    Boton,
    CampoBusqueda,
    Chip,
    Contador,
    Grupo,
    NombreTransicion,
    Tooltip,
  ],
  templateUrl: './iconos.html',
  styleUrl: './iconos.css',
})
export class Iconos implements OnDestroy {
  @ViewChildren(MaxIconComponent) private icons!: QueryList<MaxIconComponent>;

  private readonly todos: CuratedEntry[] = Object.entries(CURATED_ICONS)
    .map(([name, def]) => ({
      name,
      def,
      insignias: insigniasDe(name, def),
      numAnimaciones: Object.keys(def.animations).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  protected readonly total = this.todos.length;

  /**
   * El conteo del título sale del catálogo, y se pone DESDE AQUÍ y no desde la ruta.
   *
   * Estaba fijo en «180» y la 1.2.0 lo dejó en 405 sin que nadie se enterara. Derivarlo en el
   * router costaba 460KB —es eager, y `import('glyphflow')` ahí subía el registro entero al chunk
   * inicial (medido: 354KB → 813KB)—. Este componente ya importa `CURATED_ICONS`, así que el dato
   * es gratis. Corre después del `title` de la ruta, que queda como respaldo sin número.
   */
  private readonly titulo = inject(Title).setTitle(
    `glyphflow — ${this.todos.length} iconos animados`,
  );

  /**
   * Media docena para la fila animada del hero — la primera prueba de "esto se mueve" antes de
   * llegar al catálogo completo. Nombres fijos y no un `slice` al azar: se eligieron por variedad de
   * coreografía (giro, resorte, trazo, rebote), no porque quedaran primero alfabéticamente.
   */
  protected readonly demo: CuratedEntry[] = ['sparkles', 'bell', 'settings', 'star', 'zap', 'send']
    .map((name) => this.todos.find((e) => e.name === name))
    .filter((e): e is CuratedEntry => !!e);

  /**
   * El logotipo del hero, en su versión por tema. Son DOS assets porque el arte es distinto, no el
   * mismo con otro color: el claro pesa 50 KB contra 425 del oscuro.
   */
  protected readonly logoAnimado = computed(() =>
    tema() === 'claro'
      ? '/images/glyphflow-anim-preview-light.gif'
      : '/images/glyphflow-anim-preview.gif',
  );

  /** Con movimiento reducido se sirve quieto — y también tiene que seguir al tema. */
  protected readonly logoQuieto = computed(() =>
    tema() === 'claro' ? '/images/glyphflow-logo-light.svg' : '/images/glyphflow-logo.svg',
  );

  /** El destello de la nota. Sale del propio catálogo: el sitio no dibuja iconos que no vende. */
  protected readonly destello: AnimatedIconDef = CURATED_ICONS['sparkles'];

  /** El resto de las cifras del hero — mismos números que repite el menú móvil. */
  protected readonly cifras = CIFRAS;

  /**
   * La secuencia del showcase de morph: cuatro FORMAS, no cuatro iconos de UI.
   *
   * Es deliberado. Lo que el morph hace es interpolar contornos, y con formas geométricas se ve el
   * contorno viajar; con un `copy → check` se ve un cambio de símbolo y el mecanismo queda tapado
   * por el significado. Para el «para qué sirve» ya está la página de Patrones.
   */
  protected readonly formas: MorphIcon[] = [circleIcon, squareIcon, diamondIcon, triangleIcon];

  /** Qué paso muestra cada hueco. Las cuatro posiciones avanzan a la vez, corridas una de otra. */
  protected readonly paso = signal(0);

  private readonly reloj = setInterval(
    () => this.paso.update((p) => (p + 1) % this.formas.length),
    1900,
  );

  protected formaEn(hueco: number): MorphIcon {
    return this.formas[(this.paso() + hueco) % this.formas.length];
  }

  protected irAlPaso(n: number): void {
    this.paso.set(n);
  }

  /**
   * Los tres argumentos del pie. Viven en el componente y no en la plantilla porque así el bloque
   * de traducción de mañana es un arreglo y no tres trozos de markup repetidos.
   */
  protected readonly argumentos = [
    {
      icono: leafIcon,
      titulo: 'Ligero por diseño',
      texto: 'Tree-shaking real. Solo pesa lo que de verdad usas.',
    },
    {
      icono: codeIcon,
      titulo: 'API moderna',
      texto: 'Standalone, señales y tipado estricto. Sin NgModules.',
    },
    {
      icono: CURATED_ICONS['sparkles'],
      titulo: 'Hecho para moverse',
      texto: 'Animaciones declarativas sobre WAAPI, sin dependencias pesadas.',
    },
  ];

  ngOnDestroy(): void {
    clearInterval(this.reloj);
  }

  /** Filtro por insignia. `null` = "Todos", que es el estado normal. */
  protected readonly filtro = signal<ClaveInsignia | null>(null);

  /** Filtro por nombre. Substring, sin distinguir mayúsculas. */
  protected readonly busqueda = signal('');

  /**
   * Cuántos iconos trae cada insignia — el número va en el propio botón del filtro.
   *
   * Campo plano, no `computed`: el catálogo es estático, así que esto se calcula una vez y no
   * depende de ninguna señal. Envolverlo en `computed` fingiría una reactividad que no existe —
   * `entries` sí la tiene, y el contraste entre los dos es la señal de cuál reacciona a qué.
   */
  protected readonly conteos: { clave: ClaveInsignia; etiqueta: string; n: number }[] = (
    [
      { clave: 'extras', etiqueta: 'con variante extra' },
      { clave: 'held', etiqueta: 'held' },
      { clave: 'solo-draw', etiqueta: 'solo trazo' },
    ] as { clave: ClaveInsignia; etiqueta: string }[]
  )
    .map((o) => ({ ...o, n: this.todos.filter((e) => tiene(e, o.clave)).length }))
    .filter((o) => o.n > 0);

  protected readonly entries = computed<CuratedEntry[]>(() => {
    const f = this.filtro();
    const q = this.busqueda().trim().toLowerCase();
    const base = f ? this.todos.filter((e) => tiene(e, f)) : this.todos;
    return q ? base.filter((e) => e.name.toLowerCase().includes(q)) : base;
  });

  /** Icono bajo inspección en el Motion Inspector. `null` = panel cerrado. */
  protected readonly inspeccionado = signal<CuratedEntry | null>(null);

  /**
   * Selección directa, no toggle: con la cápsula "Todos" ya hay una forma explícita de volver a
   * `null`, así que cada botón de insignia siempre ACTIVA la suya — sin el "click de nuevo para
   * quitar" que antes era la única salida y no se anunciaba en ningún lado.
   */
  protected elegirFiltro(clave: ClaveInsignia | null): void {
    // Dentro de una transición de vista: las tarjetas que sobreviven al filtro VIAJAN a su sitio
    // nuevo en vez de que la cuadrícula se re-arme de golpe. Es el propio sitio demostrando lo que
    // vende — y no cuesta una librería, porque el navegador ya trae el motor.
    conTransicion(() => this.filtro.set(clave));
  }

  protected repetirTodo(): void {
    for (const icon of this.icons) icon.play();
  }

  protected inspeccionar(entry: CuratedEntry): void {
    this.inspeccionado.set(entry);
  }
}

function tiene(entry: CuratedEntry, clave: ClaveInsignia): boolean {
  return entry.insignias.some((i) => i.clave === clave);
}
