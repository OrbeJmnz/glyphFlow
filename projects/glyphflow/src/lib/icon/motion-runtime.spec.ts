import { conRelevo, easingSeguro, EASING_FALLBACK, resetSoporteLinear } from './motion-runtime';
import { SPRING_SNAPPY } from './spring-easings';
import { CURATED_ICONS } from './curated-icons';

/**
 * Estas dos funciones existen aparte del componente porque jsdom no implementa Web Animations API:
 * probarlas a través de `element.animate()` es imposible aquí. Aisladas sí se pueden probar, y son
 * justo donde vive el riesgo (un easing que lanza, unos offsets que se reescriben mal).
 */
describe('easingSeguro', () => {
  beforeEach(() => resetSoporteLinear());

  it('deja pasar intacto lo que no es linear()', () => {
    expect(easingSeguro('ease-in-out')).toBe('ease-in-out');
    expect(easingSeguro('cubic-bezier(0.16, 1, 0.3, 1)')).toBe('cubic-bezier(0.16, 1, 0.3, 1)');
    expect(easingSeguro(undefined)).toBeUndefined();
  });

  it('degrada al expo-out cuando el navegador no parsea linear()', () => {
    // jsdom no trae `animate`, así que la detección falla igual que en un Safari viejo — que es
    // exactamente el caso que esto tiene que cubrir.
    const original = Element.prototype.animate;
    Reflect.deleteProperty(Element.prototype, 'animate');
    try {
      expect(easingSeguro(SPRING_SNAPPY)).toBe(EASING_FALLBACK);
    } finally {
      if (original) Element.prototype.animate = original;
    }
  });

  it('conserva el linear() donde sí lo soportan', () => {
    const original = Element.prototype.animate;
    Element.prototype.animate = (() => ({})) as unknown as typeof Element.prototype.animate;
    try {
      expect(easingSeguro(SPRING_SNAPPY)).toBe(SPRING_SNAPPY);
    } finally {
      if (original) Element.prototype.animate = original;
      else Reflect.deleteProperty(Element.prototype, 'animate');
    }
  });

  it('pregunta UNA sola vez por documento, no una por animación', () => {
    let llamadas = 0;
    const original = Element.prototype.animate;
    Element.prototype.animate = (() => {
      llamadas++;
      return {} as Animation;
    }) as unknown as typeof Element.prototype.animate;
    try {
      easingSeguro(SPRING_SNAPPY);
      easingSeguro(SPRING_SNAPPY);
      easingSeguro(SPRING_SNAPPY);
      expect(llamadas).toBe(1);
    } finally {
      if (original) Element.prototype.animate = original;
      else Reflect.deleteProperty(Element.prototype, 'animate');
    }
  });
});

describe('conRelevo', () => {
  it('tira el keyframe 0 y CONSERVA los offsets originales de los demás', () => {
    // 7 keyframes = la campana. n = 6, así que el primero que queda va en 1/6, no en 0.
    const kf = [0, 20, -10, 10, -5, 3, 0].map((d) => ({ transform: `rotate(${d}deg)` }));
    const relevo = conRelevo(kf);
    expect(relevo).not.toBeNull();
    expect(relevo).toHaveLength(6);
    // Sin keyframe en offset 0: es lo que hace que WAAPI use el valor subyacente (el inline que
    // dejó commitStyles) como keyframe implícito. Si alguien pone 0 aquí, el relevo se rompe y
    // vuelve el salto.
    expect(relevo![0].offset).toBeCloseTo(1 / 6, 6);
    expect(relevo![0]['transform']).toBe('rotate(20deg)');
    expect(relevo![5].offset).toBe(1);
    expect(relevo![5]['transform']).toBe('rotate(0deg)');
  });

  it('el ritmo no se deforma: los offsets quedan uniformes como estaban', () => {
    const kf = [1, 1.25, 1].map((v) => ({ transform: `scale(${v})` }));
    const relevo = conRelevo(kf);
    expect(relevo!.map((k) => k.offset)).toEqual([0.5, 1]);
  });

  it('se niega con offsets escritos a mano — reescribirlos cambiaría la coreografía', () => {
    const kf = [
      { transform: 'scale(1)', offset: 0 },
      { transform: 'scale(1.22)', offset: 0.14 },
      { transform: 'scale(1)', offset: 1 },
    ];
    expect(conRelevo(kf)).toBeNull();
  });

  it('se niega con menos de 3 keyframes (ahí caen los trazos, que no necesitan relevo)', () => {
    const strokeDraw = [
      { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' },
      { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
    ];
    expect(conRelevo(strokeDraw)).toBeNull();
  });

  it('no muta la lista original — el track del catálogo se reusa en cada hover', () => {
    const kf = [0, 20, -10].map((d) => ({ transform: `rotate(${d}deg)` }));
    const copia = JSON.parse(JSON.stringify(kf));
    conRelevo(kf);
    expect(kf).toEqual(copia);
  });

  /**
   * El contrato real contra el catálogo: de los 180 curados, los tracks que conRelevo ACEPTA no
   * deben perder información al tirar su keyframe 0. Si el keyframe 0 declara una propiedad que
   * los demás no repiten, el relevo la dejaría sin destino.
   *
   * Hoy pasa porque `rotateSeq`/`scaleSeq`/`moveXSeq`/`moveYSeq` emiten `transform` en TODOS sus
   * keyframes y `burst()` emite transform+opacity en los tres. Este test es el que avisa si
   * alguien escribe a mano un track que rompa esa suposición.
   */
  it('ningún track curado apto para relevo declara propiedades solo en su keyframe 0', () => {
    const culpables: string[] = [];
    for (const [nombre, def] of Object.entries(CURATED_ICONS)) {
      for (const [variante, chor] of Object.entries(def.animations)) {
        const tracks = [chor.root, ...Object.values(chor.shapes ?? {})].filter(Boolean);
        for (const track of tracks) {
          const kf = track!.keyframes;
          if (conRelevo(kf) === null) continue;
          const propsCero = Object.keys(kf[0]).filter((k) => k !== 'offset' && k !== 'easing');
          const propsResto = new Set(
            kf.slice(1).flatMap((k) => Object.keys(k).filter((p) => p !== 'offset' && p !== 'easing')),
          );
          const huerfanas = propsCero.filter((p) => !propsResto.has(p));
          if (huerfanas.length) culpables.push(`${nombre}/${variante}: ${huerfanas.join(', ')}`);
        }
      }
    }
    expect(culpables).toEqual([]);
  });
});
