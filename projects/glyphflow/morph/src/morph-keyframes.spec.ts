import {
  morphKeyframes,
  runMorph,
  canonicalD,
  PASOS_DEFAULT,
  RESOLUCION_DEFAULT,
} from './morph-keyframes';
import {
  bellIcon,
  bellRingIcon,
  circleIcon,
  squareIcon,
  starIcon,
  type AnimatedIconDef,
  type IconShape,
} from 'glyphflow';

/**
 * El movimiento en sí no se prueba aquí (jsdom no implementa Web Animations API, igual que en
 * max-icon.component.spec.ts). Lo que sí se prueba es todo lo que se calcula ANTES de tocar el
 * DOM: la forma de los keyframes, el timing que dicta el spring y el `d` de aterrizaje.
 */

/** `IconShape[]` → data estilo Lucide, que es lo que come el core. */
function aIconNode(def: AnimatedIconDef): [string, Record<string, string | number>][] {
  return def.shapes.map((s: IconShape) => {
    const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
    const limpio: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(attrs)) if (v !== undefined) limpio[k] = v as string | number;
    return [tag, limpio];
  });
}

const bell = aIconNode(bellIcon);
const bellRing = aIconNode(bellRingIcon);
const star = aIconNode(starIcon);

describe('morphKeyframes', () => {
  it('entrega tantos keyframes como pasos, con offsets crecientes de 0 a 1', () => {
    const { keyframes } = morphKeyframes(bell, bellRing, { pasos: 12 });
    expect(keyframes.length).toBe(12);
    expect(keyframes[0].offset).toBe(0);
    expect(keyframes[keyframes.length - 1].offset).toBe(1);
    for (let i = 1; i < keyframes.length; i++) {
      expect(keyframes[i].offset as number).toBeGreaterThan(keyframes[i - 1].offset as number);
    }
  });

  it('usa los defaults medidos en el benchmark cuando no se le pasa nada', () => {
    expect(PASOS_DEFAULT).toBe(20);
    expect(RESOLUCION_DEFAULT).toBe(64);
    expect(morphKeyframes(bell, bellRing).keyframes.length).toBe(PASOS_DEFAULT);
  });

  it('todas las poses son polilíneas homogéneas — sin esto WAAPI no interpola, salta', () => {
    // Verificado en navegador real: entre `d` con estructuras de comando distintas la
    // interpolación degrada a discreta. Por eso en vuelo NO puede haber arcos ni cúbicas.
    for (const kf of morphKeyframes(bell, bellRing, { pasos: 8 }).keyframes) {
      const d = kf['d'] as string;
      expect(d.startsWith('path("')).toBe(true);
      expect(/[ACQSTacqst]/.test(d.slice(6, -2))).toBe(false);
    }
  });

  it('la cola corta NO se come el rebote de los presets que sobrepasan', () => {
    // La versión ingenua de `corta` (solo |1−x| < 0.01, sin la condición de velocidad) cortaba
    // `bouncy` a los 121ms de 925 — el resorte cumplía el criterio mientras PASABA subiendo por el
    // destino a v=7.53, rumbo a 1.24. Este test clava que la duración conserve el rebote.
    for (const spring of ['snappy', 'bouncy'] as const) {
      const completa = morphKeyframes(bell, bellRing, { spring, cola: 'completa' }).duracion;
      const corta = morphKeyframes(bell, bellRing, { spring, cola: 'corta' }).duracion;
      const recorte = morphKeyframes(bell, bellRing, { spring, cola: 'recorte' }).duracion;
      expect(corta / completa, `${spring}: la cola corta decapitó el rebote`).toBeGreaterThan(0.6);
      expect(corta).toBeLessThanOrEqual(completa);
      // `corta` y `recorte` son criterios distintos que hoy caen casi en el mismo instante.
      expect(Math.abs(corta - recorte) / completa).toBeLessThan(0.05);
    }
  });

  it('la duración la fija el spring, no el número de pasos', () => {
    const pocos = morphKeyframes(bell, bellRing, { pasos: 10 });
    const muchos = morphKeyframes(bell, bellRing, { pasos: 30 });
    expect(Math.round(pocos.duracion)).toBe(Math.round(muchos.duracion));
    expect(pocos.duracion).toBeGreaterThan(0);
  });

  it('bajar la resolución abarata cada pose', () => {
    const alta = morphKeyframes(bell, bellRing, { pasos: 10, resolucion: 64 });
    const baja = morphKeyframes(bell, bellRing, { pasos: 10, resolucion: 32 });
    expect(baja.bytes).toBeLessThan(alta.bytes);
  });
});

describe('ida y vuelta en una sola iteración', () => {
  it('reusa las poses de ida: la vuelta son las mismas al revés, sin recalcular geometría', () => {
    const solaIda = morphKeyframes(bell, bellRing, { pasos: 10 });
    const completo = morphKeyframes(bell, bellRing, { pasos: 10, idaYVuelta: true });

    expect(completo.keyframes.length).toBe(10 * 2 - 1);
    // La pose del centro es el destino; la última es de nuevo el origen (vuelve a casa).
    expect(completo.keyframes[9]['d']).toBe(solaIda.keyframes[9]['d']);
    expect(completo.keyframes[completo.keyframes.length - 1]['d']).toBe(solaIda.keyframes[0]['d']);
    // Espejo exacto: la pose k de la vuelta es la pose (n−1−k) de la ida.
    for (let i = 1; i < 10; i++) {
      expect(completo.keyframes[9 + i]['d']).toBe(solaIda.keyframes[9 - i]['d']);
    }
  });

  it('cada tramo trae su propio resorte, no el de ida en espejo', () => {
    const completo = morphKeyframes(bell, bellRing, { pasos: 10, idaYVuelta: true });
    const offs = completo.keyframes.map((k) => k['offset'] as number);

    expect(offs[0]).toBe(0);
    expect(offs[9]).toBeCloseTo(0.5, 5);
    expect(offs[offs.length - 1]).toBe(1);
    for (let i = 1; i < offs.length; i++) expect(offs[i]).toBeGreaterThan(offs[i - 1]);

    // La firma de que NO es un espejo: el primer salto de cada tramo es el mismo (los dos arrancan
    // igual de lento). Con `alternate` el segundo tramo empezaría con el salto MÁS GRANDE.
    const primerSaltoIda = offs[1] - offs[0];
    const primerSaltoVuelta = offs[10] - offs[9];
    expect(primerSaltoVuelta).toBeCloseTo(primerSaltoIda, 5);
  });

  it('dura el doble que una sola dirección', () => {
    const ida = morphKeyframes(bell, bellRing, { pasos: 10 });
    const completo = morphKeyframes(bell, bellRing, { pasos: 10, idaYVuelta: true });
    expect(completo.duracion).toBeCloseTo(ida.duracion * 2, 5);
  });
});

describe('runMorph — lo que le entrega a WAAPI', () => {
  /** jsdom no trae Web Animations API: se finge lo mínimo para leer las options que se le pasan. */
  function pathFalso() {
    const llamadas: { keyframes: Keyframe[]; options: KeyframeAnimationOptions }[] = [];
    const animaciones: { cancelada: boolean }[] = [];
    const el = {
      animate: (keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
        llamadas.push({ keyframes, options });
        const propia = { cancelada: false };
        animaciones.push(propia);
        return {
          playbackRate: 1,
          finished: new Promise<void>(() => undefined), // nunca resuelve: aquí no interesa aterrizar
          cancel: () => {
            propia.cancelada = true;
          },
        } as unknown as Animation;
      },
      setAttribute: () => undefined,
    };
    return {
      el: el as unknown as SVGPathElement,
      llamadas,
      animaciones,
      get capturado() {
        return llamadas[llamadas.length - 1] ?? {};
      },
    };
  }

  /** Caja envolvente de una pose, para comparar formas sin depender del número de vértices. */
  function bbox(d: string): [number, number, number, number] {
    const n = (d.replace(/^path\("|"\)$/g, '').match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i + 1 < n.length; i += 2) {
      xs.push(n[i]);
      ys.push(n[i + 1]);
    }
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  }

  const separacion = (a: string, b: string): number => {
    const A = bbox(a);
    const B = bbox(b);
    return Math.max(...A.map((v, i) => Math.abs(v - B[i])));
  };

  it('durationScale multiplica el reloj y deja los offsets intactos', () => {
    const base = pathFalso();
    runMorph(base.el, bell, bellRing, {});
    const escalado = pathFalso();
    runMorph(escalado.el, bell, bellRing, { durationScale: 2 });

    expect(escalado.capturado.options?.duration).toBe(
      (base.capturado.options?.duration as number) * 2,
    );
    // Los offsets son fracciones normalizadas: la forma del resorte no se toca, solo el tiempo.
    const offsetsBase = base.capturado.keyframes?.map((k) => k['offset']);
    const offsetsEscalados = escalado.capturado.keyframes?.map((k) => k['offset']);
    expect(offsetsEscalados).toEqual(offsetsBase);
  });

  it('al interrumpir arranca desde la pose EN PANTALLA, no desde el icono canónico', () => {
    // Sin esto, el morph nuevo empieza en el icono completo del origen y se traga de golpe todo lo
    // que le faltaba al anterior: medido en navegador, 3.72 unidades sobre un lienzo de 24.
    const primero = morphKeyframes(bell, bellRing, { pasos: 20 });
    const intermedio = (primero.keyframes[9]['d'] as string).slice(6, -2); // ~47% del camino

    const { el, llamadas, animaciones } = pathFalso();
    const original = globalThis.getComputedStyle;
    try {
      runMorph(el, bell, bellRing, {});
      // A partir de aquí el elemento "muestra" la pose intermedia.
      globalThis.getComputedStyle = (() => ({ d: `path("${intermedio}")` })) as never;
      runMorph(el, bellRing, star, {});
    } finally {
      globalThis.getComputedStyle = original;
    }

    const arranqueTrasInterrumpir = llamadas[1].keyframes[0]['d'] as string;
    const arranqueSinInterrumpir = morphKeyframes(bellRing, star, { pasos: 20 }).keyframes[0][
      'd'
    ] as string;

    // Arranca en la pose que se veía…
    expect(separacion(arranqueTrasInterrumpir, `path("${intermedio}")`)).toBeLessThan(0.6);
    // …y NO en el icono canónico de origen, que es de donde vendría el salto.
    expect(separacion(arranqueTrasInterrumpir, arranqueSinInterrumpir)).toBeGreaterThan(0.6);

    // Y la vieja se soltó: no quedan dos animaciones encimadas sobre el mismo elemento.
    expect(animaciones[0].cancelada).toBe(true);
    expect(animaciones[1].cancelada).toBe(false);
  });

  it('sin loop entrega una sola iteración hacia adelante', () => {
    // Ojo: `capturado` es un getter — desestructurarlo lo evalúa cuando todavía no hay llamadas.
    const falso = pathFalso();
    runMorph(falso.el, bell, bellRing, {});
    expect(falso.capturado.options?.iterations).toBe(1);
    expect(falso.capturado.options?.direction).toBe('normal');
    expect(falso.capturado.options?.easing).toBe('linear');
  });
});

describe('canonicalD — el `d` de aterrizaje', () => {
  it('devuelve curvas, no la polilínea de vuelo', () => {
    const d = canonicalD(bell);
    expect(d).toContain('C');
    expect(d.length).toBeLessThan((morphKeyframes(bell, bellRing).keyframes[0]['d'] as string).length);
  });

  it('convierte figuras que no son path (circle, rect) a datos de path', () => {
    // `circle`/`rect` se animan como `<path>`, así que su reposo también tiene que serlo.
    expect(canonicalD(aIconNode(circleIcon)).startsWith('M')).toBe(true);
    expect(canonicalD(aIconNode(squareIcon)).startsWith('M')).toBe(true);
  });
});
