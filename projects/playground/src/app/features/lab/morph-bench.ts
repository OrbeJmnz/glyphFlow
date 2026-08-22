import { Component, ElementRef, ViewChild, signal, computed } from '@angular/core';
import { TranslocoPipe, translateSignal } from '@jsverse/transloco';
import {
  AnimatedIconDef,
  bellIcon,
  bellRingIcon,
  circleIcon,
  heartIcon,
  squareIcon,
  starIcon,
  userIcon,
  userRoundIcon,
} from 'glyphflow';
import {
  morphKeyframes,
  runMorph,
  GfIconMorphComponent,
  STEPS_DEFAULT,
  type SpringTail,
  RESOLUTION_DEFAULT,
  SPRING_PRESETS,
  type MorphKeyframes,
  type MorphIcon,
  type SpringPreset,
} from 'glyphflow/morph';
import { aIconNode } from './icon-node';
import { Boton } from '../../shared/ui/boton';
import { Chip } from '../../shared/ui/chip';

/**
 * Arnés del benchmark de morph. NO es producto: existe para decidir números mirando las cosas
 * juntas — cómo se ve, cuánto pesa, cuánto dura.
 *
 * Dos modos, mismo patrón de comparación: 4 variantes en fila, reproducir todas a la vez, loop.
 * - `pasos`: cuántas poses discretas (decidido: 20).
 * - `cola`:  qué hacer con la cola asintótica del spring (en decisión).
 */

interface Par {
  id: string;
  origen: AnimatedIconDef;
  destino: AnimatedIconDef;
}

/**
 * Imports NOMBRADOS, no `ANIMATED_ICONS['bell']`. El lookup por nombre ancla el registro completo
 * de 1767 iconos: el bundle del playground pasaba de 191KB a 575KB por 8 iconos. Esta es además
 * la ruta que la librería recomienda a sus consumidores — el arnés predica con el ejemplo.
 */
const PARES: Par[] = [
  { id: 'bell → bell-ring', origen: bellIcon, destino: bellRingIcon },
  { id: 'heart → star', origen: heartIcon, destino: starIcon },
  { id: 'circle → square', origen: circleIcon, destino: squareIcon },
  { id: 'user → user-round', origen: userIcon, destino: userRoundIcon },
];

type Cola = SpringTail;

/**
 * `titulo`/`nota` NO son texto: son claves de traducción bajo `lab.morphBench.variantes.<id>`
 * (ver `lab/en.json` / `lab/es.json`). El template arma la ruta completa con `id` — así los 14
 * literales no viven duplicados aquí Y en el JSON. `porDefecto` es la única bandera que compara
 * ESTADO (para el resaltado `elegida`), separada a propósito de `tieneNota` (que solo decide si
 * el `<span>` de la nota se pinta): antes ambas vivían encimadas en el valor literal `'default'`
 * de `nota`, lo que habría atado el resaltado al TEXTO traducido en vez de al id.
 */
interface Variante {
  id: string;
  tieneNota?: boolean;
  porDefecto?: boolean;
  pasos: number;
  cola: Cola;
  /** `alternate` regresa por la trayectoria; `normal` reinicia desde el origen. */
  direccion: 'alternate' | 'normal';
  /** Ida y vuelta en una sola iteración, con resorte propio en cada tramo. */
  idaYVuelta?: boolean;
  /** Preset por nombre o `{k, c}` crudo: el motor acepta los dos. */
  spring?: SpringPreset | { k: number; c: number };
  /** Dibuja las poses más allá del destino cuando el resorte rebota. */
  sobrepaso?: boolean;
}

const VARIANTES_PASOS: Variante[] = [10, 15, 20, 30].map((n) => ({
  id: `p${n}`,
  tieneNota: n === STEPS_DEFAULT,
  porDefecto: n === STEPS_DEFAULT,
  pasos: n,
  cola: 'full',
  direccion: 'alternate',
}));

const VARIANTES_VUELTA: Variante[] = [
  {
    id: 'v-alternate',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'short',
    direccion: 'alternate',
  },
  {
    id: 'v-ida-vuelta',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'short',
    direccion: 'normal',
    idaYVuelta: true,
  },
];

/**
 * El sobrepaso, ahora con los nombres públicos: `snappy` (ζ=0.73) y `bouncy` (ζ=0.40). Estuvieron
 * fuera de la superficie mientras el motor no dibujaba su rebote; al dibujarlo, la etiqueta pasó a
 * cumplir y volvieron. La variante «sin dibujarlo» se queda como control: es `sobrepaso: false`.
 */
const VARIANTES_SOBREPASO: Variante[] = [
  {
    id: 's-smooth',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'short',
    direccion: 'normal',
    spring: 'smooth',
  },
  {
    id: 's-073-sin',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'short',
    direccion: 'normal',
    spring: 'snappy',
    sobrepaso: false,
  },
  {
    id: 's-073-con',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'short',
    direccion: 'normal',
    spring: 'snappy',
  },
  {
    id: 's-040-con',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'short',
    direccion: 'normal',
    spring: 'bouncy',
  },
];

const VARIANTES_COLA: Variante[] = [
  {
    id: 'completa',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'full',
    direccion: 'alternate',
  },
  {
    id: 'corta',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'short',
    direccion: 'alternate',
  },
  {
    id: 'recorte',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'clip',
    direccion: 'alternate',
  },
  {
    id: 'reinicio',
    tieneNota: true,
    pasos: STEPS_DEFAULT,
    cola: 'full',
    direccion: 'normal',
  },
];

interface Medida extends Variante {
  bytes: number;
  duracion: number;
  keyframes: number;
  /** Porcentaje de la duración que se lleva el ÚLTIMO tramo entre keyframes. El síntoma. */
  colaPct: number;
}

@Component({
  selector: 'app-morph-bench',
  imports: [GfIconMorphComponent, Boton, Chip, TranslocoPipe],
  templateUrl: './morph-bench.html',
  styleUrl: './morph-bench.css',
})
export class MorphBench {
  @ViewChild('lienzos', { static: true }) private lienzos!: ElementRef<HTMLElement>;

  protected readonly pares = PARES;
  protected readonly parActivo = signal(PARES[0]);
  protected readonly modo = signal<'pasos' | 'cola' | 'vuelta' | 'sobrepaso'>('pasos');
  protected readonly loop = signal(false);
  /** Mismo patrón que `etiquetaEnvio` de patrones.ts: la rama elige la CLAVE, no el texto. */
  private readonly claveLoop = computed(() =>
    this.loop() ? 'lab.morphBench.controles.loop.on' : 'lab.morphBench.controles.loop.off',
  );
  protected readonly etiquetaLoop = translateSignal(this.claveLoop);
  /**
   * La otra perilla del peso: puntos por subpath. Arranca en el default real de la librería, no
   * en un número suelto. Se queda aunque el benchmark de pasos ya cerró: retomar esto con más
   * pares no debería costar rearmarlo.
   */
  protected readonly resolucion = signal<number>(RESOLUTION_DEFAULT);
  protected readonly resoluciones = [64, 32] as const;

  private readonly animaciones = new Map<string, Animation>();

  /**
   * Demo del envoltorio: el binding ES el estado, sin `trigger` ni `from`/`to`.
   * Tres iconos, no dos, para poder cambiar de destino a media transición (A→B→C).
   */
  private readonly DEMO: MorphIcon[] = [bellIcon, bellRingIcon, starIcon, heartIcon];
  private readonly NOMBRES = ['bell', 'bell-ring', 'star', 'heart'];
  protected readonly demoIndice = signal(0);
  protected readonly iconoDemo = computed<MorphIcon>(() => this.DEMO[this.demoIndice()]);
  protected readonly nombreDemo = computed(
    () => this.NOMBRES[(this.demoIndice() + 1) % this.NOMBRES.length],
  );

  /**
   * Los tres presets, por su nombre público. Volvieron a la superficie cuando el sobrepaso empezó
   * a dibujarse: antes `bouncy` habría sido una etiqueta sin rebote detrás.
   */
  protected readonly resortes = Object.keys(SPRING_PRESETS) as SpringPreset[];
  protected readonly resorte = signal<SpringPreset>('smooth');

  protected siguienteDemo(): void {
    this.demoIndice.update((i) => (i + 1) % this.DEMO.length);
  }

  protected readonly variantes = computed(() => {
    const modo = this.modo();
    if (modo === 'pasos') return VARIANTES_PASOS;
    if (modo === 'cola') return VARIANTES_COLA;
    if (modo === 'sobrepaso') return VARIANTES_SOBREPASO;
    return VARIANTES_VUELTA;
  });

  private readonly calculo = computed<Record<string, MorphKeyframes>>(() => {
    const par = this.parActivo();
    const resolucion = this.resolucion();
    const a = aIconNode(par.origen);
    const b = aIconNode(par.destino);
    const salida: Record<string, MorphKeyframes> = {};
    for (const v of this.variantes()) {
      salida[v.id] = morphKeyframes(a, b, {
        steps: v.pasos,
        resolucion,
        tail: v.cola,
        roundTrip: v.idaYVuelta,
        spring: v.spring,
        overshoot: v.sobrepaso,
      });
    }
    return salida;
  });

  protected readonly tabla = computed<Medida[]>(() =>
    this.variantes().map((v) => {
      const m = this.calculo()[v.id];
      const offs = m.keyframes.map((k) => k['offset'] as number);
      return {
        ...v,
        bytes: m.bytes,
        duracion: Math.round(m.duration),
        keyframes: m.keyframes.length,
        colaPct: Math.round((1 - offs[offs.length - 2]) * 100),
      };
    }),
  );

  /** `d` inicial de cada lienzo: la pose de origen, para que el SVG no arranque vacío. */
  protected dInicial(id: string): string {
    return (this.calculo()[id].keyframes[0]['d'] as string).slice(6, -2);
  }

  protected elegirPar(par: Par): void {
    this.cancelar();
    this.parActivo.set(par);
  }

  protected elegirModo(modo: 'pasos' | 'cola' | 'vuelta' | 'sobrepaso'): void {
    this.cancelar();
    this.modo.set(modo);
  }

  /**
   * Hover real: entrar dispara el morph, salir lo devuelve. Es el patrón de producción
   * (`reverseOnLeave`), y el único lugar donde se siente el problema de la vuelta.
   */
  protected entrar(v: Variante): void {
    const anim = this.animaciones.get(v.id);
    // Reversa de la reversa: si va de regreso y todavía no llega, se le da vuelta otra vez en vez
    // de arrancar un morph nuevo — así retoma desde donde está, sin saltos.
    if (anim && anim.playState === 'running' && anim.playbackRate < 0) {
      anim.reverse();
      return;
    }
    this.reproducir(v);
  }

  protected salir(v: Variante): void {
    const anim = this.animaciones.get(v.id);
    // `idaYVuelta` ya regresa solo: darle reverse a media ida lo mandaría al inicio por un camino
    // que ya trae de vuelta, encimando dos regresos.
    if (
      !anim ||
      anim.playState !== 'running' ||
      this.variantes().find((x) => x.id === v.id)?.idaYVuelta
    ) {
      return;
    }
    if (anim.playbackRate > 0) anim.reverse();
  }

  protected elegirResolucion(r: number): void {
    this.cancelar();
    this.resolucion.set(r);
  }

  /**
   * Reproduce vía `runMorph()`, la capa compartida — no una copia local del `element.animate()`.
   * Si el arnés replicara esa lógica dejaría de probar lo que de verdad se va a publicar.
   */
  protected reproducir(v: Variante): void {
    const path = this.lienzos.nativeElement.querySelector<SVGPathElement>(
      `[data-id="${v.id}"] path`,
    );
    if (!path) return;

    // Cancelar la anterior es del llamador, no de la capa: `runMorph` no puede saber si quieres
    // encimar dos morphs a propósito. Aquí no, así que se corta.
    this.animaciones.get(v.id)?.cancel();

    const par = this.parActivo();
    const { animation } = runMorph(path, aIconNode(par.origen), aIconNode(par.destino), {
      steps: v.pasos,
      resolucion: this.resolucion(),
      tail: v.cola,
      roundTrip: v.idaYVuelta,
      spring: v.spring,
      overshoot: v.sobrepaso,
      loop: this.loop(),
      direction: this.loop() ? v.direccion : 'normal',
    });
    this.animaciones.set(v.id, animation);
  }

  /** Lo que de verdad se compara: las 4 variantes disparadas en el mismo instante. */
  protected reproducirTodas(): void {
    for (const v of this.variantes()) this.reproducir(v);
  }

  protected cancelar(): void {
    for (const anim of this.animaciones.values()) anim.cancel();
    this.animaciones.clear();
  }

  protected alternarLoop(): void {
    this.loop.update((valor) => !valor);
    this.cancelar();
  }
}
