import {
  morphKeyframes,
  runMorph,
  canonicalD,
  morphAt,
  STEPS_DEFAULT,
  RESOLUTION_DEFAULT,
  SPRING_TAIL_DEFAULT,
  SPRING_PRESETS,
  correspondenceIsPoor,
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
  gripIcon,
  sunIcon,
  moonIcon,
  copyIcon,
  checkIcon,
  volumeIcon,
  volumeOffIcon,
  bellOffIcon,
  eyeIcon,
  eyeClosedIcon,
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
  // Replica de `aIconInput`: descarta las figuras que el icono no enseña en reposo.
  return def.shapes.filter((s: IconShape) => s.opacity !== '0').map((s: IconShape) => {
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
const circle = aIconNode(circleIcon);
const square = aIconNode(squareIcon);
const grip = aIconNode(gripIcon);
const sun = aIconNode(sunIcon);
const moon = aIconNode(moonIcon);
const copy = aIconNode(copyIcon);
const check = aIconNode(checkIcon);
const volume = aIconNode(volumeIcon);
const volumeOff = aIconNode(volumeOffIcon);
const bellOff = aIconNode(bellOffIcon);
const eye = aIconNode(eyeIcon);
const eyeClosed = aIconNode(eyeClosedIcon);

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

  it('el default es adaptativo: bell→bell-ring (el más rotado) cae en STEPS_DEFAULT, pares sin rotación real usan menos', () => {
    expect(STEPS_DEFAULT).toBe(20);
    expect(RESOLUTION_DEFAULT).toBe(64);
    // bell→bell-ring es el caso de calibración: el único de los 4 pares del benchmark con
    // rotación real (el badajo), por eso sigue cayendo exactamente en STEPS_DEFAULT.
    expect(morphKeyframes(bell, bellRing).keyframes.length).toBe(STEPS_DEFAULT);
    // circle→square no rota — el esquema adaptativo le da MENOS pasos, no el mismo número parejo.
    expect(morphKeyframes(circle, square).keyframes.length).toBeLessThan(STEPS_DEFAULT);
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

describe('crossfade — fallback cuando la correspondencia es mala', () => {
  it('un par validado (bell→bell-ring) NO activa el crossfade: los keyframes son geometría, no opacidad', () => {
    const { keyframes, plan } = morphKeyframes(bell, bellRing);
    expect(correspondenceIsPoor(plan)).toBe(false);
    expect(keyframes[0]).not.toHaveProperty('opacity');
    expect((keyframes[0]['d'] as string).startsWith('path("M')).toBe(true);
  });

  it('circle→grip (1 subpath contra varios sueltos) SÍ activa el crossfade', () => {
    const { keyframes, plan } = morphKeyframes(circle, grip);
    expect(correspondenceIsPoor(plan)).toBe(true);
    expect(keyframes[0]).toHaveProperty('opacity');
    expect(keyframes[0]).toHaveProperty('transform');
  });

  it('en crossfade, la opacidad toca (casi) cero justo cuando el `d` cambia de origen a destino', () => {
    const { keyframes } = morphKeyframes(circle, grip);
    const dOrigen = keyframes[0]['d'];
    let cambioEn = -1;
    for (let i = 1; i < keyframes.length; i++) {
      if (keyframes[i]['d'] !== dOrigen) {
        cambioEn = i;
        break;
      }
    }
    expect(cambioEn).toBeGreaterThan(0);
    // El punto más oscuro del fundido debe caer justo alrededor del salto, no lejos de él.
    const opacidadAntes = keyframes[cambioEn - 1]['opacity'] as number;
    const opacidadDespues = keyframes[cambioEn]['opacity'] as number;
    expect(Math.min(opacidadAntes, opacidadDespues)).toBeLessThan(0.15);
  });

  it('en crossfade, los extremos son los `d` canónicos de origen y destino, opacidad plena', () => {
    const { keyframes } = morphKeyframes(circle, grip);
    expect(keyframes[0]['opacity'] as number).toBeCloseTo(1, 10);
    expect(keyframes[keyframes.length - 1]['opacity'] as number).toBeCloseTo(1, 10);
    expect(keyframes[0]['d']).toBe(`path("${canonicalD(circle)}")`);
    expect(keyframes[keyframes.length - 1]['d']).toBe(`path("${canonicalD(grip)}")`);
  });

  it('runMorph entrega los keyframes de crossfade a WAAPI sin tocarlos', () => {
    const llamadas: Keyframe[][] = [];
    const el = {
      animate: (kf: Keyframe[]) => {
        llamadas.push(kf);
        return {
          playbackRate: 1,
          finished: new Promise<void>(() => undefined),
          cancel: () => undefined,
        } as unknown as Animation;
      },
      setAttribute: () => undefined,
    } as unknown as SVGPathElement;

    runMorph(el, circle, grip, {});
    expect(llamadas[0][0]).toHaveProperty('opacity');
  });
});

describe('curado — sun↔moon tiene coreografía a mano, no cae en fundido', () => {
  it('sun→moon NO activa el fundido: sin opacity/transform, con la forma esperada', () => {
    const { keyframes, plan } = morphKeyframes(sun, moon);
    expect(correspondenceIsPoor(plan)).toBe(false);
    expect(keyframes[0]).not.toHaveProperty('opacity');
    for (const kf of keyframes) {
      expect((kf['d'] as string).startsWith('path("')).toBe(true);
    }
  });

  it('cada pose tiene 9 subpaths (el disco/medialuna + los 8 rayos), en TODAS las poses', () => {
    const { keyframes } = morphKeyframes(sun, moon);
    for (const kf of keyframes) {
      const d = kf['d'] as string;
      expect((d.match(/M/g) ?? []).length).toBe(9);
    }
  });

  it('los rayos encogen a longitud cero al llegar a la luna, sin quedar puntos sueltos', () => {
    const { keyframes } = morphKeyframes(sun, moon, { steps: 10 });
    const ultimo = keyframes[keyframes.length - 1]['d'] as string;
    const subpaths = ultimo.slice(6, -2).split(/(?=M)/g);
    // El primero es el disco/medialuna (cerrado con Z); los otros 8 son los rayos.
    for (const rayo of subpaths.slice(1)) {
      const nums = (rayo.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
      const [x0, y0] = nums;
      const [x1, y1] = nums.slice(-2);
      expect(Math.hypot(x1 - x0, y1 - y0)).toBeLessThan(0.01);
    }
  });

  it('moon→sun es sun→moon leído al revés, byte a byte', () => {
    const ida = morphKeyframes(sun, moon, { steps: 10 });
    const vuelta = morphKeyframes(moon, sun, { steps: 10 });
    for (let i = 0; i < 10; i++) {
      expect(vuelta.keyframes[i]['d']).toBe(ida.keyframes[9 - i]['d']);
    }
  });

  it('un par sin relación con sun/moon sigue el camino genérico de siempre', () => {
    const { plan } = morphKeyframes(bell, bellRing);
    expect(plan.items.length).toBeGreaterThan(0);
    // Si esto alguna vez "encontrara" una coreografía curada por error, el residuo/theta no
    // coincidiría con lo medido para bell→bell-ring en otros tests de este archivo.
    expect(morphKeyframes(bell, bellRing).keyframes.length).toBe(STEPS_DEFAULT);
  });
});

describe('curado — copy↔check retrae el cuadrado en vez de forzarlo a una V', () => {
  it('copy→check usa el curado: la "L" de atrás morfea, el cuadrado de adelante se retrae', () => {
    const { keyframes, plan } = morphKeyframes(copy, check);
    expect(correspondenceIsPoor(plan)).toBe(false);
    expect(keyframes[0]).not.toHaveProperty('opacity');
    for (const kf of keyframes) {
      expect((kf['d'] as string).match(/M/g)?.length).toBe(2); // cuerpo + 1 satélite (el cuadrado)
    }
  });

  it('el cuadrado (satélite) encoge a longitud/área cero al llegar a check', () => {
    const { keyframes } = morphKeyframes(copy, check, { steps: 10 });
    const ultimo = keyframes[keyframes.length - 1]['d'] as string;
    const satelite = ultimo.slice(6, -2).split(/(?=M)/g)[1];
    const nums = (satelite.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
    const xs = nums.filter((_, i) => i % 2 === 0);
    const ys = nums.filter((_, i) => i % 2 === 1);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThan(0.01);
    expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(0.01);
  });

  it('check→copy es copy→check leído al revés, byte a byte', () => {
    const ida = morphKeyframes(copy, check, { steps: 10 });
    const vuelta = morphKeyframes(check, copy, { steps: 10 });
    for (let i = 0; i < 10; i++) {
      expect(vuelta.keyframes[i]['d']).toBe(ida.keyframes[9 - i]['d']);
    }
  });
});

describe('curado — volume↔volume-off reusa construirConSatelites con otro índice de cuerpo', () => {
  it('el parlante (cuerpo) morfea; ondas cortadas + raya + arco chico son satélites', () => {
    const { keyframes, plan } = morphKeyframes(volumeOff, volume);
    expect(correspondenceIsPoor(plan)).toBe(false);
    expect(keyframes[0]).not.toHaveProperty('opacity');
    for (const kf of keyframes) {
      expect((kf['d'] as string).match(/M/g)?.length).toBe(5);
    }
  });
});

describe('curado — patrón "-off": la base no cambia de forma, solo crece la raya', () => {
  it('bell→bell-off: el domo y el badajo quedan IDÉNTICOS en todas las poses', () => {
    const { keyframes } = morphKeyframes(bell, bellOff, { steps: 6 });
    const subpaths = (d: string) => d.slice(6, -2).split(/(?=M)/g);
    const primeraVezBadajo = subpaths(keyframes[0]['d'] as string)[0];
    const primeraVezDomo = subpaths(keyframes[0]['d'] as string)[1];
    for (const kf of keyframes) {
      const subs = subpaths(kf['d'] as string);
      expect(subs[0]).toBe(primeraVezBadajo);
      expect(subs[1]).toBe(primeraVezDomo);
    }
  });

  it('la raya crece de longitud 0 a la diagonal completa', () => {
    const { keyframes } = morphKeyframes(bell, bellOff, { steps: 5 });
    const largoDe = (d: string) => {
      const raya = d.slice(6, -2).split(/(?=M)/g)[2];
      const n = (raya.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
      return Math.hypot(n[n.length - 2] - n[0], n[n.length - 1] - n[1]);
    };
    expect(largoDe(keyframes[0]['d'] as string)).toBeCloseTo(0, 5);
    expect(largoDe(keyframes[keyframes.length - 1]['d'] as string)).toBeCloseTo(Math.hypot(20, 20), 1);
  });

  it('bell-off→bell es la misma coreografía invertida', () => {
    const ida = morphKeyframes(bell, bellOff, { steps: 8 });
    const vuelta = morphKeyframes(bellOff, bell, { steps: 8 });
    for (let i = 0; i < 8; i++) {
      expect(vuelta.keyframes[i]['d']).toBe(ida.keyframes[7 - i]['d']);
    }
  });
});

describe('curado — eye↔eye-closed: sin cuerpo compartido, converge/emerge del centro', () => {
  it('no activa el fundido, y todos los subpaths de ambos lados están presentes en cada pose', () => {
    const { keyframes, plan } = morphKeyframes(eye, eyeClosed);
    expect(correspondenceIsPoor(plan)).toBe(false);
    for (const kf of keyframes) {
      // eye trae 2 subpaths, eye-closed trae 5 — los 7 conviven en cada pose.
      expect((kf['d'] as string).match(/M/g)?.length).toBe(7);
    }
  });

  it('en t=0 eye-closed está colapsado en el centro; en t=1, eye lo está', () => {
    const { keyframes } = morphKeyframes(eye, eyeClosed, { steps: 2 });
    const subs0 = (keyframes[0]['d'] as string).slice(6, -2).split(/(?=M)/g);
    const subs1 = (keyframes[1]['d'] as string).slice(6, -2).split(/(?=M)/g);
    const anchoDe = (sub: string) => {
      const n = (sub.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
      const xs = n.filter((_, i) => i % 2 === 0);
      return Math.max(...xs) - Math.min(...xs);
    };
    // Los últimos 5 subpaths (eye-closed) están colapsados en t=0…
    for (const s of subs0.slice(2)) expect(anchoDe(s)).toBeLessThan(0.01);
    // …y los primeros 2 (eye) están colapsados en t=1.
    for (const s of subs1.slice(0, 2)) expect(anchoDe(s)).toBeLessThan(0.01);
  });
});
