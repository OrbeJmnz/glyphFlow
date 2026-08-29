import {
  morphKeyframes,
  runMorph,
  canonicalD,
  morphAt,
  STEPS_DEFAULT,
  RESOLUTION_DEFAULT,
  SPRING_TAIL_DEFAULT,
  SPRING_PRESETS,
  // Los alias de la v1: se importan justamente para probar que siguen vivos.
  PASOS_DEFAULT,
  RESOLUCION_DEFAULT,
  COLA_DEFAULT,
  type SpringPreset,
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
    for (const [k, v] of Object.entries(attrs))
      if (v !== undefined) limpio[k] = v as string | number;
    return [tag, limpio];
  });
}

const bell = aIconNode(bellIcon);
const bellRing = aIconNode(bellRingIcon);
const star = aIconNode(starIcon);

describe('morphKeyframes', () => {
  it('entrega tantos keyframes como pasos, con offsets crecientes de 0 a 1', () => {
    const { keyframes } = morphKeyframes(bell, bellRing, { steps: 12 });
    expect(keyframes.length).toBe(12);
    expect(keyframes[0].offset).toBe(0);
    expect(keyframes[keyframes.length - 1].offset).toBe(1);
    for (let i = 1; i < keyframes.length; i++) {
      expect(keyframes[i].offset as number).toBeGreaterThan(keyframes[i - 1].offset as number);
    }
  });

  it('usa los defaults medidos en el benchmark cuando no se le pasa nada', () => {
    expect(STEPS_DEFAULT).toBe(20);
    expect(RESOLUTION_DEFAULT).toBe(64);
    expect(morphKeyframes(bell, bellRing).keyframes.length).toBe(STEPS_DEFAULT);
  });

  it('todas las poses son polilíneas homogéneas — sin esto WAAPI no interpola, salta', () => {
    // Verificado en navegador real: entre `d` con estructuras de comando distintas la
    // interpolación degrada a discreta. Por eso en vuelo NO puede haber arcos ni cúbicas.
    for (const kf of morphKeyframes(bell, bellRing, { steps: 8 }).keyframes) {
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
      const completa = morphKeyframes(bell, bellRing, { spring, tail: 'full' }).duration;
      const corta = morphKeyframes(bell, bellRing, { spring, tail: 'short' }).duration;
      const recorte = morphKeyframes(bell, bellRing, { spring, tail: 'clip' }).duration;
      expect(
        corta / completa,
        `resorte ${spring}: la cola corta decapitó el rebote`,
      ).toBeGreaterThan(0.6);
      expect(corta).toBeLessThanOrEqual(completa);
      // `corta` y `recorte` son criterios distintos que hoy caen casi en el mismo instante.
      expect(Math.abs(corta - recorte) / completa).toBeLessThan(0.05);
    }
  });

  it('la duración la fija el spring, no el número de pasos', () => {
    const pocos = morphKeyframes(bell, bellRing, { steps: 10 });
    const muchos = morphKeyframes(bell, bellRing, { steps: 30 });
    expect(Math.round(pocos.duration)).toBe(Math.round(muchos.duration));
    expect(pocos.duration).toBeGreaterThan(0);
  });

  it('bajar la resolución abarata cada pose', () => {
    const alta = morphKeyframes(bell, bellRing, { steps: 10, resolution: 64 });
    const baja = morphKeyframes(bell, bellRing, { steps: 10, resolution: 32 });
    expect(baja.bytes).toBeLessThan(alta.bytes);
  });
});

describe('ida y vuelta en una sola iteración', () => {
  it('reusa las poses de ida: la vuelta son las mismas al revés, sin recalcular geometría', () => {
    const solaIda = morphKeyframes(bell, bellRing, { steps: 10 });
    const completo = morphKeyframes(bell, bellRing, { steps: 10, roundTrip: true });

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
    const completo = morphKeyframes(bell, bellRing, { steps: 10, roundTrip: true });
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
    const ida = morphKeyframes(bell, bellRing, { steps: 10 });
    const completo = morphKeyframes(bell, bellRing, { steps: 10, roundTrip: true });
    expect(completo.duration).toBeCloseTo(ida.duration * 2, 5);
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
    const primero = morphKeyframes(bell, bellRing, { steps: 20 });
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
    const arranqueSinInterrumpir = morphKeyframes(bellRing, star, { steps: 20 }).keyframes[0][
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

describe('sobrepaso — dibujar el rebote', () => {
  /** Los dos subamortiguados, ahora sí por su nombre público: ζ = 0.73 y ζ = 0.40. */
  const REBOTA_POCO = SPRING_PRESETS.snappy;
  const REBOTA_MUCHO = SPRING_PRESETS.bouncy;

  const extremos = (kf: Keyframe[]): [number, number] => {
    let min = Infinity;
    let max = -Infinity;
    for (const k of kf) {
      for (const v of (k['d'] as string).match(/-?\d+(\.\d+)?/g) ?? []) {
        const n = Number(v);
        if (n < min) min = n;
        if (n > max) max = n;
      }
    }
    return [min, max];
  };

  it('con un resorte que NO rebota, prenderlo o apagarlo da lo mismo', () => {
    // Esta es la garantía que permite que el default sea `true`: en el camino normal (`smooth`,
    // ζ=1) la opción no puede alterar un solo byte de lo que ya producía la librería.
    const apagado = morphKeyframes(bell, bellRing, { overshoot: false });
    const prendido = morphKeyframes(bell, bellRing, { overshoot: true });
    expect(morphKeyframes(bell, bellRing, {}).keyframes).toEqual(apagado.keyframes);
    expect(prendido.keyframes).toEqual(apagado.keyframes);
    expect(prendido.duration).toBe(apagado.duration);
  });

  it('con un resorte que rebota, el default YA dibuja el rebote', () => {
    // El default importa más que la opción: quien pide `bouncy` quiere el rebote, no un reloj más
    // largo. Si esto se rompe, la etiqueta vuelve a mentir.
    const apagado = morphKeyframes(bell, bellRing, { spring: REBOTA_MUCHO, overshoot: false });
    const porDefecto = morphKeyframes(bell, bellRing, { spring: REBOTA_MUCHO });
    expect(porDefecto.keyframes.length).toBeGreaterThan(apagado.keyframes.length);
    // Y esas poses son GEOMÉTRICAMENTE más grandes: el rebote se pasa del destino, no solo dura más.
    expect(extremos(porDefecto.keyframes)[1]).toBeGreaterThan(extremos(apagado.keyframes)[1]);
  });

  it('los tres presets tienen nombre público y solo el crítico no rebota', () => {
    expect(Object.keys(SPRING_PRESETS).sort()).toEqual(['bouncy', 'smooth', 'snappy']);
    const poses = (spring: SpringPreset) =>
      morphKeyframes(bell, bellRing, { spring }).keyframes.length;
    const base = morphKeyframes(bell, bellRing, { spring: 'smooth', overshoot: false }).keyframes
      .length;
    expect(poses('smooth')).toBe(base);
    expect(poses('snappy')).toBeGreaterThan(base);
    expect(poses('bouncy')).toBeGreaterThan(base);
  });

  it('el rebote no se sale del lienzo — el trazo entero cabe en el viewBox', () => {
    // Extrapolar la similaridad hace crecer la figura; sin tope, ζ=0.40 llegaba a [-2.03, 26.03]
    // sobre un lienzo de 24 y el SVG la recortaba. El límite descuenta el grosor del trazo (1
    // unidad hacia afuera con stroke-width 2), no solo el borde de la caja.
    for (const spring of [REBOTA_POCO, REBOTA_MUCHO]) {
      const { keyframes } = morphKeyframes(bell, bellRing, { spring });
      const [min, max] = extremos(keyframes);
      expect(min - 1, `el trazo se sale por la izquierda con k=${spring.k}`).toBeGreaterThanOrEqual(
        -0.01,
      );
      expect(max + 1, `el trazo se sale por la derecha con k=${spring.k}`).toBeLessThanOrEqual(
        24.01,
      );
    }
  });

  it('los offsets siguen creciendo — WAAPI los rechaza si no', () => {
    // El bug que esto clava: `offsetPara` devolvía 1 de un saque para objetivo >= 1, así que el
    // último keyframe del tramo principal caía al final del reloj y el rebote quedaba por detrás.
    for (const spring of [REBOTA_POCO, REBOTA_MUCHO]) {
      const { keyframes } = morphKeyframes(bell, bellRing, { spring });
      const offsets = keyframes.map((k) => k['offset'] as number);
      for (let i = 1; i < offsets.length; i++) {
        expect(offsets[i], `offset ${i} retrocede con k=${spring.k}`).toBeGreaterThanOrEqual(
          offsets[i - 1],
        );
      }
      expect(offsets[offsets.length - 1]).toBe(1);
    }
  });

  it('termina en el destino exacto, no en la última muestra del rebote', () => {
    const soloIda = morphKeyframes(bell, bellRing, { spring: REBOTA_MUCHO, overshoot: false });
    const conRebote = morphKeyframes(bell, bellRing, { spring: REBOTA_MUCHO });
    expect(conRebote.keyframes[conRebote.keyframes.length - 1]['d']).toBe(
      soloIda.keyframes[soloIda.keyframes.length - 1]['d'],
    );
  });
});

describe('canonicalD — el `d` de aterrizaje', () => {
  it('devuelve curvas, no la polilínea de vuelo', () => {
    const d = canonicalD(bell);
    expect(d).toContain('C');
    expect(d.length).toBeLessThan(
      (morphKeyframes(bell, bellRing).keyframes[0]['d'] as string).length,
    );
  });

  it('convierte figuras que no son path (circle, rect) a datos de path', () => {
    // `circle`/`rect` se animan como `<path>`, así que su reposo también tiene que serlo.
    expect(canonicalD(aIconNode(circleIcon)).startsWith('M')).toBe(true);
    expect(canonicalD(aIconNode(squareIcon)).startsWith('M')).toBe(true);
  });
});

/**
 * La promesa de la deprecación, clavada.
 *
 * Los alias no son documentación: son un contrato con quien ya escribió código contra la v1. Si se
 * rompieran en silencio, el `@deprecated` sería una mentira y el usuario se enteraría en runtime.
 */
describe('alias de la v1 — siguen funcionando una minor', () => {
  it('las constantes viejas son la MISMA referencia que las nuevas', () => {
    // Idénticas, no copias que casualmente valen lo mismo: para un `InjectionToken` esa
    // distinción es la diferencia entre funcionar y fallar sin ruido.
    expect(PASOS_DEFAULT).toBe(STEPS_DEFAULT);
    expect(RESOLUCION_DEFAULT).toBe(RESOLUTION_DEFAULT);
    expect(COLA_DEFAULT).toBe(SPRING_TAIL_DEFAULT);
  });

  it('un objeto de opciones escrito contra la v1 produce EXACTAMENTE lo mismo', () => {
    const v1 = morphKeyframes(bell, bellRing, {
      pasos: 12,
      resolucion: 32,
      cola: 'corta',
      sobrepaso: false,
    });
    const v2 = morphKeyframes(bell, bellRing, {
      steps: 12,
      resolution: 32,
      tail: 'short',
      overshoot: false,
    });
    expect(v1.keyframes).toEqual(v2.keyframes);
    expect(v1.duration).toBe(v2.duration);
  });

  it('el vocabulario viejo de la cola se traduce, no se ignora', () => {
    // Con `bouncy` los tres criterios dan duraciones DISTINTAS, así que si alguno cayera al
    // default en vez de traducirse, la igualdad se rompería. Con `smooth` pasaría por casualidad.
    for (const [viejo, nuevo] of [
      ['completa', 'full'],
      ['corta', 'short'],
      ['recorte', 'clip'],
    ] as const) {
      expect(morphKeyframes(bell, bellRing, { spring: 'bouncy', tail: viejo }).duration).toBe(
        morphKeyframes(bell, bellRing, { spring: 'bouncy', tail: nuevo }).duration,
      );
    }
  });

  it('si vienen los dos nombres, gana el nuevo', () => {
    // Es el que la persona escribió a conciencia después de migrar.
    const mezcla = morphKeyframes(bell, bellRing, { steps: 30, pasos: 5 });
    expect(mezcla.keyframes.length).toBe(30);
  });

  it('`duracion` sigue rellenándose con el mismo número que `duration`', () => {
    const m = morphKeyframes(bell, bellRing, { steps: 10 });
    expect(m.duracion).toBe(m.duration);
  });
});

describe('morphAt — pose exacta sin animación', () => {
  it('en los extremos devuelve el `d` canónico, no una interpolación', () => {
    expect(morphAt(bell, bellRing, 0)).toBe(canonicalD(bell));
    expect(morphAt(bell, bellRing, 1)).toBe(canonicalD(bellRing));
  });

  it('en un punto intermedio no es ninguno de los dos extremos, y es determinista', () => {
    const t = 0.37;
    const a = morphAt(bell, bellRing, t);
    const b = morphAt(bell, bellRing, t);
    expect(a).toBe(b);
    expect(a).not.toBe(canonicalD(bell));
    expect(a).not.toBe(canonicalD(bellRing));
  });

  it('es pura: mismo par y mismo t siempre dan el mismo resultado, sin estado previo', () => {
    const primero = morphAt(bell, star, 0.5);
    const segundo = morphAt(bell, star, 0.5);
    expect(primero).toBe(segundo);
  });
});
