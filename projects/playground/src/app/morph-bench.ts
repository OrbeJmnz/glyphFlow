import { Component, ElementRef, ViewChild, signal, computed } from '@angular/core';
import {
  AnimatedIconDef,
  IconShape,
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
  PASOS_DEFAULT,
  RESOLUCION_DEFAULT,
  type MorphKeyframes,
} from 'glyphflow/morph';

/**
 * Arnés del benchmark de morph. NO es producto: existe para decidir un número (cuántos pasos
 * discretos) mirando las tres cosas juntas — cómo se ve, cuánto pesa y cuánto dura.
 *
 * El patrón es de comparación, no de galería: un par a la vez, las 4 variantes de pasos lado a
 * lado, con reproducir y loop. Ver 15 contra 20 del MISMO par tiene que costar un clic.
 */

const PASOS = [10, 15, 20, 30] as const;

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

/** `IconShape[]` → data estilo Lucide (`[tag, attrs][]`), que es lo que come el core. */
function aIconNode(def: AnimatedIconDef): [string, Record<string, string | number>][] {
  return def.shapes.map((s: IconShape) => {
    const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
    const limpio: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined) limpio[k] = v as string | number;
    }
    return [tag, limpio];
  });
}

interface Medida {
  pasos: number;
  bytes: number;
  duracion: number;
  keyframes: number;
}

@Component({
  selector: 'app-morph-bench',
  templateUrl: './morph-bench.html',
  styleUrl: './morph-bench.css',
})
export class MorphBench {
  @ViewChild('lienzos', { static: true }) private lienzos!: ElementRef<HTMLElement>;

  protected readonly pares = PARES;
  protected readonly pasos = PASOS;
  protected readonly parActivo = signal(PARES[0]);
  protected readonly loop = signal(false);
  protected readonly reversa = signal(false);
  /**
   * La otra perilla del peso: puntos por subpath. Arranca en el default real de la librería, no
   * en un número suelto — si mañana cambia allá, el arnés lo refleja sin que nadie lo recuerde.
   * Se queda aunque el benchmark ya cerró: retomar esto con más pares no debería costar rearmarlo.
   */
  protected readonly resolucion = signal<number>(RESOLUCION_DEFAULT);
  protected readonly resoluciones = [64, 32] as const;
  protected readonly pasosDefault = PASOS_DEFAULT;

  private readonly animaciones = new Map<number, Animation>();

  /** Todo el cálculo del par activo, memoizado: 4 variantes × (keyframes, bytes, duración). */
  protected readonly medidas = computed<Record<number, MorphKeyframes>>(() => {
    const par = this.parActivo();
    const resolucion = this.resolucion();
    const a = aIconNode(par.origen);
    const b = aIconNode(par.destino);
    const salida: Record<number, MorphKeyframes> = {};
    for (const n of PASOS) salida[n] = morphKeyframes(a, b, { pasos: n, resolucion });
    return salida;
  });

  protected readonly tabla = computed<Medida[]>(() => {
    const m = this.medidas();
    return PASOS.map((n) => ({
      pasos: n,
      bytes: m[n].bytes,
      duracion: Math.round(m[n].duracion),
      keyframes: m[n].keyframes.length,
    }));
  });

  /** `d` inicial de cada lienzo: la pose de origen, para que el SVG no arranque vacío. */
  protected dInicial(n: number): string {
    const kf = this.medidas()[n].keyframes[0]['d'] as string;
    return kf.slice(6, -2); // path("…") → …
  }

  protected elegirPar(par: Par): void {
    this.cancelar();
    this.parActivo.set(par);
  }

  protected reproducir(n: number): void {
    const path = this.lienzos.nativeElement.querySelector<SVGPathElement>(`[data-pasos="${n}"] path`);
    if (!path) return;
    this.animaciones.get(n)?.cancel();

    const { keyframes, duracion } = this.medidas()[n];
    const anim = path.animate(this.reversa() ? [...keyframes].reverse().map((k, i, arr) => ({
      ...k,
      offset: 1 - (arr[arr.length - 1 - i]['offset'] as number),
    })) : keyframes, {
      duration: duracion,
      easing: 'linear',
      fill: 'forwards',
      iterations: this.loop() ? Infinity : 1,
      direction: this.loop() ? 'alternate' : 'normal',
    });
    this.animaciones.set(n, anim);
  }

  /** Lo que de verdad se compara: las 4 variantes disparadas en el mismo instante. */
  protected reproducirTodas(): void {
    for (const n of PASOS) this.reproducir(n);
  }

  protected cancelar(): void {
    for (const anim of this.animaciones.values()) anim.cancel();
    this.animaciones.clear();
  }

  protected alternarLoop(): void {
    this.loop.update((v) => !v);
    this.cancelar();
  }

  protected elegirResolucion(r: number): void {
    this.cancelar();
    this.resolucion.set(r);
  }
}
