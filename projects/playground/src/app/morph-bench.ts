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
  runMorph,
  PASOS_DEFAULT,
  RESOLUCION_DEFAULT,
  type MorphKeyframes,
} from 'glyphflow/morph';

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

type Cola = 'completa' | 'corta' | 'recorte';

interface Variante {
  id: string;
  titulo: string;
  nota?: string;
  pasos: number;
  cola: Cola;
  /** `alternate` regresa por la trayectoria; `normal` reinicia desde el origen. */
  direccion: 'alternate' | 'normal';
}

const VARIANTES_PASOS: Variante[] = [10, 15, 20, 30].map((n) => ({
  id: `p${n}`,
  titulo: `${n} pasos`,
  nota: n === PASOS_DEFAULT ? 'default' : undefined,
  pasos: n,
  cola: 'completa',
  direccion: 'alternate',
}));

const VARIANTES_COLA: Variante[] = [
  { id: 'completa', titulo: 'Cola completa', nota: 'hoy', pasos: PASOS_DEFAULT, cola: 'completa', direccion: 'alternate' },
  { id: 'corta', titulo: 'Cola corta', nota: '|1−x| < 0.01', pasos: PASOS_DEFAULT, cola: 'corta', direccion: 'alternate' },
  { id: 'recorte', titulo: 'Recorte al 99%', nota: 'física intacta', pasos: PASOS_DEFAULT, cola: 'recorte', direccion: 'alternate' },
  { id: 'reinicio', titulo: 'Sin reversa', nota: 'reinicia desde el origen', pasos: PASOS_DEFAULT, cola: 'completa', direccion: 'normal' },
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

interface Medida extends Variante {
  bytes: number;
  duracion: number;
  keyframes: number;
  /** Porcentaje de la duración que se lleva el ÚLTIMO tramo entre keyframes. El síntoma. */
  colaPct: number;
}

@Component({
  selector: 'app-morph-bench',
  templateUrl: './morph-bench.html',
  styleUrl: './morph-bench.css',
})
export class MorphBench {
  @ViewChild('lienzos', { static: true }) private lienzos!: ElementRef<HTMLElement>;

  protected readonly pares = PARES;
  protected readonly parActivo = signal(PARES[0]);
  protected readonly modo = signal<'pasos' | 'cola'>('pasos');
  protected readonly loop = signal(false);
  /**
   * La otra perilla del peso: puntos por subpath. Arranca en el default real de la librería, no
   * en un número suelto. Se queda aunque el benchmark de pasos ya cerró: retomar esto con más
   * pares no debería costar rearmarlo.
   */
  protected readonly resolucion = signal<number>(RESOLUCION_DEFAULT);
  protected readonly resoluciones = [64, 32] as const;

  private readonly animaciones = new Map<string, Animation>();

  protected readonly variantes = computed(() =>
    this.modo() === 'pasos' ? VARIANTES_PASOS : VARIANTES_COLA,
  );

  private readonly calculo = computed<Record<string, MorphKeyframes>>(() => {
    const par = this.parActivo();
    const resolucion = this.resolucion();
    const a = aIconNode(par.origen);
    const b = aIconNode(par.destino);
    const salida: Record<string, MorphKeyframes> = {};
    for (const v of this.variantes()) {
      salida[v.id] = morphKeyframes(a, b, { pasos: v.pasos, resolucion, cola: v.cola });
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
        duracion: Math.round(m.duracion),
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

  protected elegirModo(modo: 'pasos' | 'cola'): void {
    this.cancelar();
    this.modo.set(modo);
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
    const path = this.lienzos.nativeElement.querySelector<SVGPathElement>(`[data-id="${v.id}"] path`);
    if (!path) return;

    // Cancelar la anterior es del llamador, no de la capa: `runMorph` no puede saber si quieres
    // encimar dos morphs a propósito. Aquí no, así que se corta.
    this.animaciones.get(v.id)?.cancel();

    const par = this.parActivo();
    const { animation } = runMorph(path, aIconNode(par.origen), aIconNode(par.destino), {
      pasos: v.pasos,
      resolucion: this.resolucion(),
      cola: v.cola,
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
