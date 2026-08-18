import { morphKeyframes, canonicalD, PASOS_DEFAULT, RESOLUCION_DEFAULT } from './morph-keyframes';
import { bellIcon, bellRingIcon, circleIcon, squareIcon } from '../icon/curated-icons';
import { AnimatedIconDef, IconShape } from '../icon/animated-icon.model';

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
