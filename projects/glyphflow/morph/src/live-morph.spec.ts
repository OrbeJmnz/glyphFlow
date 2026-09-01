import {
  bellIcon,
  bellRingIcon,
  starIcon,
  circleIcon,
  gripIcon,
  sunIcon,
  moonIcon,
  copyIcon,
  checkIcon,
  eyeIcon,
  eyeOffIcon,
  type AnimatedIconDef,
  type IconShape,
} from 'glyphflow';
import { createLiveMorph } from './live-morph';
import { canonicalD, correspondenceIsPoor } from './morph-keyframes';
import { allocOutputs, interpPolar } from './core/interpolate';
import { buildPlan } from './core/plan';
import { resampleIcon } from './core/resample';
import { serialize } from './core/serialize';
import type { IconInput } from './core/types';

/**
 * El entorno de tests SÍ trae `requestAnimationFrame` (jsdom lo implementa, a diferencia de
 * `animate`), pero real y asíncrono — no sirve para probar interrupción/asentamiento de forma
 * determinista. Se reemplaza por una versión síncrona y controlable a mano, mismo criterio que ya
 * usa este repo para espiar `animate` (ver `gf-icon-morph.component.spec.ts`).
 */
function espiarRaf() {
  let loopActivo: FrameRequestCallback | null = null;
  let llamadasRaf = 0;
  const original = {
    raf: globalThis.requestAnimationFrame,
    caf: globalThis.cancelAnimationFrame,
  };
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    loopActivo = cb;
    llamadasRaf++;
    return 1;
  }) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = (() => {
    loopActivo = null;
  }) as typeof cancelAnimationFrame;
  return {
    /** Corre un frame con el timestamp dado. El loop puede volver a programarse solo. */
    avanzar(ts: number): void {
      const fn = loopActivo;
      if (!fn) throw new Error('no hay ningún loop activo — nada que avanzar');
      fn(ts);
    },
    /** `true` mientras el scheduler siga teniendo trabajo pendiente (no asentó). */
    get activo(): boolean {
      return loopActivo !== null;
    },
    get llamadasRaf(): number {
      return llamadasRaf;
    },
    restaurar(): void {
      globalThis.requestAnimationFrame = original.raf;
      globalThis.cancelAnimationFrame = original.caf;
    },
  };
}

/** `IconShape[]` → data estilo Lucide, que es lo que come el core. Copia local — mismo patrón que
 *  ya usan `morph-keyframes.spec.ts` y `gf-icon-morph.component.ts`. */
function aIconNode(def: AnimatedIconDef): [string, Record<string, string | number>][] {
  // Replica de `aIconInput`: descarta las figuras que el icono no enseña en reposo.
  return def.shapes.filter((s: IconShape) => s.opacity !== '0').map((s: IconShape) => {
    const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
    const limpio: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(attrs)) if (v !== undefined) limpio[k] = v as string | number;
    return [tag, limpio];
  });
}

const bell = aIconNode(bellIcon);
const bellRing = aIconNode(bellRingIcon);
const star = aIconNode(starIcon);
const circle = aIconNode(circleIcon);
const grip = aIconNode(gripIcon);
const sun = aIconNode(sunIcon);
const moon = aIconNode(moonIcon);
const copy = aIconNode(copyIcon);
const check = aIconNode(checkIcon);
const eyeAbierto = aIconNode(eyeIcon);
const eyeOff = aIconNode(eyeOffIcon);

/** Pose exacta en t=0 de un plan desde→hacia, calculada aparte del motor — para comparar contra lo
 *  que de verdad pintó `createLiveMorph`, sin confiar en su propia matemática. */
function poseInicialDe(desde: IconInput, hacia: IconInput): string {
  const plan = buildPlan(resampleIcon(desde), resampleIcon(hacia));
  const out = allocOutputs(plan);
  interpPolar(plan, 0, out);
  return serialize(
    out,
    plan.items.map((it) => it.closed),
  );
}

/** `<path>` falso: solo necesita `setAttribute`, igual que `pathFalso()` en `morph-keyframes.spec.ts`.
 *
 * `d` es un GETTER a propósito — mismo criterio que `capturado` en `runMorph — lo que le entrega a
 * WAAPI` (morph-keyframes.spec.ts): desestructurarlo (`const { d } = pathFalso()`) lo evaluaría UNA
 * vez, antes de que exista ningún `d` pintado, y quedaría clavado en `''` para siempre por más que
 * `createLiveMorph` siga escribiendo. Se guarda la referencia al objeto y se lee `.d` fresco en
 * cada assert. */
function pathFalso() {
  let d = '';
  // Igual que `CSSStyleDeclaration` real: una propiedad nunca tocada lee `''`, no `undefined`.
  const style: Record<string, string> = { opacity: '', transform: '' };
  return {
    el: {
      setAttribute: (_: string, valor: string) => (d = valor),
      getAttribute: (nombre: string) => (nombre === 'd' ? d : null),
      style,
    } as unknown as SVGPathElement,
    get d() {
      return d;
    },
    get style() {
      return style;
    },
  };
}

describe('createLiveMorph — set()', () => {
  it('pinta el `d` canónico del icono inicial, sin registrar ningún frame', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    createLiveMorph(p.el, bell);
    expect(p.d).toBe(canonicalD(bell));
    expect(raf.llamadasRaf).toBe(0);
    raf.restaurar();
  });

  it('salta al icono sin animar, incluso a medio vuelo', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    morph.morphTo(bellRing);
    raf.avanzar(16); // a medio camino
    morph.set(star);
    expect(p.d).toBe(canonicalD(star));
    expect(raf.activo).toBe(false); // no queda ningún ticker pendiente
    raf.restaurar();
  });
});

describe('createLiveMorph — morphTo()', () => {
  it('registra un ticker y pinta hacia el destino frame a frame', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    morph.morphTo(bellRing);
    expect(raf.llamadasRaf).toBe(1);

    const antes = p.d;
    // Timestamps ESTRICTAMENTE crecientes, no el mismo dos veces: `agregarTicker` resetea
    // `ultimo = -1` al registrar, así que el PRIMER frame SIEMPRE calcula dt=0 sin importar qué
    // timestamp se le pase. Con un solo frame (o el mismo repetido) el resorte nunca se mueve de
    // x=0, y la aserción de abajo pasaría solo por diferencia de FORMATO (polilínea vs. curva
    // canónica) — no porque haya avanzado de verdad.
    raf.avanzar(16);
    raf.avanzar(32);
    raf.avanzar(48);
    expect(p.d).not.toBe(antes); // se movió
    expect(p.d).not.toBe(canonicalD(bell)); // ya no es la pose de reposo original
    // El scheduler es un singleton de MÓDULO compartido por todo el archivo: si este morph se deja
    // volando, el siguiente test heredaría un `rafId` vivo y su propio `espiarRaf()` nunca vería
    // pedido un frame (mismo criterio que ya evita el resto de tests que sí asientan o llaman
    // `set()`, los cuales limpian el scheduler por su cuenta).
    morph.destroy();
    raf.restaurar();
  });

  it('asienta en el `d` canónico exacto del destino y suelta el ticker', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    morph.morphTo(bellRing, { spring: 'smooth' });

    let ts = 0;
    while (raf.activo && ts < 5000) {
      ts += 16;
      raf.avanzar(ts);
    }
    expect(raf.activo).toBe(false);
    expect(p.d).toBe(canonicalD(bellRing));
    raf.restaurar();
  });

  it('interrumpir a medio vuelo continúa desde la pose EN PANTALLA, sin salto', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    morph.morphTo(bellRing, { spring: 'smooth' });
    // Timestamps crecientes — ver la nota del test anterior: con el mismo `ts` dos veces el resorte
    // nunca sale de x=0 y la interrupción "continúa" desde ahí sin que la prueba diga nada.
    raf.avanzar(16);
    raf.avanzar(32);
    raf.avanzar(48);
    const poseAlInterrumpir = p.d;

    morph.morphTo(star, { spring: 'smooth' });
    // `morphTo` no pinta síncrono — el `setAttribute` del plan nuevo ocurre en el SIGUIENTE tick, no
    // al llamarlo. Sin avanzar un frame más, la aserción de abajo pasaría trivialmente ("no se
    // escribió nada") sin decir nada sobre si el replanteo es correcto. Se avanza EN EL MISMO
    // timestamp donde se interrumpió: como el ticker sigue vivo, `morphTo` no vuelve a pasar por
    // `agregarTicker` y `ultimo` no se resetea, así que este frame calcula dt=0 — pinta exactamente
    // t=0 del plan NUEVO. Si el replanteo arranca de la pose EN PANTALLA (y no del icono `bell`
    // completo), ese t=0 tiene que reproducirla byte a byte.
    raf.avanzar(48);
    expect(p.d).toBe(poseAlInterrumpir);
    morph.destroy(); // limpia el scheduler compartido — ver la nota del test anterior
    raf.restaurar();
  });

  it('interrumpir ANTES de que pinte ningún frame no replanea desde un buffer vacío', () => {
    // `figuraActual()` leía `out` para replanear desde "la pose en pantalla" — pero si NINGÚN
    // frame pintó todavía, `out` sigue siendo los Float64Array en cero de `allocOutputs`, no una
    // figura real. Dos `morphTo` seguidos sin que corra un tick (posible en la vida real: una
    // pestaña oculta no corre rAF, o dos cambios de `[icon]` en el mismo ciclo de detección) debe
    // seguir replaneando desde el ORIGEN real (`bell`), no desde ceros.
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    // try/finally a propósito: si la aserción de abajo truena (que es justo lo que hace este test
    // MIENTRAS el bug sigue vivo), un `restaurar()`/`destroy()` al final del cuerpo nunca correría
    // y dejaría el mock de rAF y el ticker del scheduler compartido corruptos para TODOS los tests
    // que corran después en este archivo — no solo este falla, fallan otros por una razón que no
    // tiene nada que ver. Ver la nota de higiene en `describe('createLiveMorph — destroy()', …)`.
    try {
      morph.morphTo(bellRing, { spring: 'smooth' }); // registra el ticker, todavía no pinta nada
      morph.morphTo(star, { spring: 'smooth' }); // interrumpe ANTES de que corra el primer tick

      // Primer tick real: `ultimo` sigue en -1 (ningún `agregarTicker` se repitió, `volando` ya
      // era `true`), así que este frame pinta exactamente t=0 del plan bell→star.
      raf.avanzar(16);

      expect(p.d).toBe(poseInicialDe(bell, star));
      // Control cruzado: si el bug estuviera de vuelta, la fuente sería el buffer en cero del
      // plan bell→bellRing, no bell — y esa pose NO coincide con la correcta.
      expect(p.d).not.toBe(poseInicialDe(bellRing, star));
    } finally {
      morph.destroy();
      raf.restaurar();
    }
  });

  it('sin requestAnimationFrame (SSR) salta directo, como set()', () => {
    const original = globalThis.requestAnimationFrame;
    // @ts-expect-error — se simula su ausencia a propósito
    delete globalThis.requestAnimationFrame;
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    morph.morphTo(bellRing);
    expect(p.d).toBe(canonicalD(bellRing));
    globalThis.requestAnimationFrame = original;
  });

  it('durationScale ≤ 0 (o negativo) salta directo, sin ticker ni `d` corrompido por NaN', () => {
    // Regresión del guard en `morphTo`: `spring.step(dt / escala)` con `escala <= 0` produce NaN al
    // segundo frame (dt/0 = Infinity → v = NaN → x = NaN), y el criterio de asentamiento
    // `|1-x| < 0.001` queda permanentemente falso — el ticker nunca suelta y cada frame pinta un `d`
    // corrompido. `durationScale: 0` es el mismo valor que usa `provideGfIcons` para "sin
    // animación", y WAAPI lo resuelve con un salto instantáneo (`duration * 0`); el motor en vivo
    // tiene que dar el mismo resultado observable, no un loop infinito.
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    morph.morphTo(bellRing, { durationScale: 0 });
    expect(raf.llamadasRaf).toBe(0); // no llegó a pedir ni un solo frame
    expect(raf.activo).toBe(false); // no quedó ningún ticker pendiente
    expect(p.d).toBe(canonicalD(bellRing)); // salto instantáneo y exacto, no un `d` con NaN
    raf.restaurar();
  });

  it('durationScale mayor tarda más frames simulados en asentar', () => {
    const contarFrames = (durationScale: number): number => {
      const raf = espiarRaf();
      const { el } = pathFalso();
      const morph = createLiveMorph(el, bell);
      morph.morphTo(bellRing, { spring: 'smooth', durationScale });
      let frames = 0;
      let ts = 0;
      while (raf.activo && ts < 10_000) {
        ts += 16;
        frames++;
        raf.avanzar(ts);
      }
      morph.destroy(); // por si el tope de 10s se alcanzó sin asentar — no deja el scheduler sucio
      raf.restaurar();
      return frames;
    };

    expect(contarFrames(2)).toBeGreaterThan(contarFrames(0.5));
  });
});

describe('createLiveMorph — scheduler compartido', () => {
  it('dos instancias volando a la vez comparten UN solo requestAnimationFrame activo', () => {
    const raf = espiarRaf();
    const a = pathFalso();
    const b = pathFalso();
    const morphA = createLiveMorph(a.el, bell);
    const morphB = createLiveMorph(b.el, bell);

    morphA.morphTo(bellRing);
    expect(raf.llamadasRaf).toBe(1);
    morphB.morphTo(star); // ya hay un loop corriendo: no debería pedir uno nuevo
    expect(raf.llamadasRaf).toBe(1);

    raf.avanzar(16);
    // el loop se reprogramó una vez (para el frame siguiente), pero sigue siendo UNO
    expect(raf.llamadasRaf).toBe(2);
    morphA.destroy();
    morphB.destroy();
    raf.restaurar();
  });
});

describe('createLiveMorph — destroy()', () => {
  it('suelta el ticker; un frame posterior ya no toca el elemento', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, bell);
    morph.morphTo(bellRing);
    raf.avanzar(16);
    morph.destroy();
    const trasDestruir = p.d;
    expect(raf.activo).toBe(false);
    // llamar de nuevo tras destroy no hace nada
    morph.morphTo(star);
    expect(p.d).toBe(trasDestruir);
    raf.restaurar();
  });
});

describe('createLiveMorph — fundido cuando la correspondencia es mala', () => {
  it('circle→grip fuerza el modo fundido: opacidad/transform en vuelo, nunca una polilínea a medias', () => {
    expect(correspondenceIsPoor(buildPlan(resampleIcon(circle), resampleIcon(grip)))).toBe(true);

    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, circle);
    morph.morphTo(grip, { spring: 'smooth' });
    raf.avanzar(16);
    expect(p.style['opacity']).not.toBe('');
    expect(p.style['transform']).not.toBe('');
    // En vuelo el `d` es SIEMPRE uno de los dos canónicos exactos — un swap, no una interpolación.
    expect([canonicalD(circle), canonicalD(grip)]).toContain(p.d);
    morph.destroy();
    raf.restaurar();
  });

  it('asienta en el destino exacto y limpia opacidad/transform, mismo criterio que el camino geométrico', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, circle);
    morph.morphTo(grip, { spring: 'smooth' });
    let ts = 0;
    while (raf.activo && ts < 5000) {
      ts += 16;
      raf.avanzar(ts);
    }
    expect(raf.activo).toBe(false);
    expect(p.d).toBe(canonicalD(grip));
    expect(p.style['opacity']).toBe('');
    expect(p.style['transform']).toBe('');
    raf.restaurar();
  });
});

describe('createLiveMorph — curado (sun↔moon) tiene prioridad sobre fundido y geométrico', () => {
  it('sun→moon en vivo NO usa fundido: nunca escribe opacity/transform durante el vuelo', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, sun);
    morph.morphTo(moon, { spring: 'smooth' });
    raf.avanzar(16);
    raf.avanzar(32);
    expect(p.style['opacity']).toBe('');
    expect(p.style['transform']).toBe('');
    // 9 subpaths en la pose intermedia: disco/medialuna + los 8 rayos, igual que el motor horneado.
    expect((p.d.match(/M/g) ?? []).length).toBe(9);
    morph.destroy();
    raf.restaurar();
  });

  it('asienta en el `d` canónico exacto de la luna', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, sun);
    morph.morphTo(moon, { spring: 'smooth' });
    let ts = 0;
    while (raf.activo && ts < 5000) {
      ts += 16;
      raf.avanzar(ts);
    }
    expect(p.d).toBe(canonicalD(moon));
    raf.restaurar();
  });

  it('interrumpir a medio vuelo (sun→moon) cae al camino genérico, no reintenta lo curado a medias', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, sun);
    morph.morphTo(moon, { spring: 'smooth' });
    raf.avanzar(16);
    raf.avanzar(32);
    // Interrumpir hacia un tercer icono desde una pose a medio camino (ni sol ni luna exactos): no
    // hay coreografía curada que sepa posar eso, así que debe seguir funcionando sin tronar.
    expect(() => morph.morphTo(bell, { spring: 'smooth' })).not.toThrow();
    raf.avanzar(48);
    morph.destroy();
    raf.restaurar();
  });

  it('copy→check también usa lo curado en vivo (el registro no es solo sun/moon)', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, copy);
    morph.morphTo(check, { spring: 'smooth' });
    let ts = 0;
    while (raf.activo && ts < 5000) {
      ts += 16;
      raf.avanzar(ts);
    }
    expect(p.d).toBe(canonicalD(check));
    raf.restaurar();
  });

  it('eye→eye-off (patrón "-off", base+raya) también asienta en el `d` canónico exacto', () => {
    const raf = espiarRaf();
    const p = pathFalso();
    const morph = createLiveMorph(p.el, eyeAbierto);
    morph.morphTo(eyeOff, { spring: 'smooth' });
    let ts = 0;
    while (raf.activo && ts < 5000) {
      ts += 16;
      raf.avanzar(ts);
    }
    expect(p.d).toBe(canonicalD(eyeOff));
    raf.restaurar();
  });
});
