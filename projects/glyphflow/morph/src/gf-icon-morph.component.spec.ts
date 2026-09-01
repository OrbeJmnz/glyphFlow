import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  bellCheckIcon,
  bellIcon,
  bellOffIcon,
  bellRingIcon,
  provideGfIcons,
  type IconShape,
} from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from './gf-icon-morph.component';
import { PASOS_DEFAULT, SPRING_PRESETS, type SpringPreset } from './morph-keyframes';
import { allocOutputs, interpPolar } from './core/interpolate';
import { buildPlan } from './core/plan';
import { resampleIcon } from './core/resample';
import { serialize } from './core/serialize';

/**
 * `requestAnimationFrame` SÍ existe en el entorno de tests (jsdom lo implementa), pero real y
 * asíncrono — se reemplaza por una versión síncrona controlable, mismo criterio que `espiarRaf()`
 * en `live-morph.spec.ts`.
 *
 * A DIFERENCIA de esa versión (una sola `loopActivo`), esta rastrea un `Map<id, callback>`. Motivo,
 * encontrado corriendo estos tests: `fixture.whenStable()` NO es inocuo para `requestAnimationFrame`
 * — `@angular/core` (`scheduleCallbackWithRafRace`/`cleanup` en `_pending_tasks-chunk.mjs`) TAMBIÉN
 * registra y cancela su propio frame ahí dentro, para su carrera interna de estabilidad. Con una
 * sola variable compartida, el `cancelAnimationFrame` de Angular (que no sabe nada del ticker de
 * `live-morph.ts`) lo pisa en silencio: el ticker queda registrado en el scheduler de MÓDULO de
 * `live-morph.ts` pero su callback nunca se vuelve a disparar vía `avanzar()`, y el test "pasa" sin
 * haber probado nada (confirmado con logging: exactamente esto le pasaba a las pruebas de este
 * describe, que solo hacían un `set()` + `whenStable()` + UN `avanzar()`). Cada registro necesita su
 * propio slot, igual que hace el navegador real con sus ids.
 */
function espiarRaf(): { avanzar(ts: number): void; restaurar: () => void } {
  let siguienteId = 1;
  const pendientes = new Map<number, FrameRequestCallback>();
  const original = {
    raf: globalThis.requestAnimationFrame,
    caf: globalThis.cancelAnimationFrame,
  };
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    const id = siguienteId++;
    pendientes.set(id, cb);
    return id;
  }) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) => {
    pendientes.delete(id);
  }) as typeof cancelAnimationFrame;
  return {
    avanzar(ts: number): void {
      // Instantánea + limpieza ANTES de invocar: si un callback vuelve a pedir un frame (el `loop`
      // de `live-morph.ts` se re-programa solo), ese nuevo registro es para el SIGUIENTE `avanzar`,
      // no para este — mismo contrato que el rAF real.
      const callbacks = [...pendientes.values()];
      pendientes.clear();
      for (const cb of callbacks) cb(ts);
    },
    restaurar(): void {
      globalThis.requestAnimationFrame = original.raf;
      globalThis.cancelAnimationFrame = original.caf;
    },
  };
}

/**
 * Lo que se prueba aquí es el CABLEADO, no la matemática (esa ya tiene sus tests): que el input
 * `spring` llegue al motor y que el componente entregue el rebote que su etiqueta promete.
 *
 * Se ESPÍA `animate` en vez de leer `getAnimations()`: el entorno de tests no trae WAAPI, así que
 * el componente ni siquiera intentaría animar (tiene un guard por `typeof …animate === 'function'`,
 * el mismo que lo salva en SSR). El espía sirve doble: hace que el guard pase y deja ver los
 * keyframes exactos que se le entregaron al navegador.
 */
@Component({
  imports: [GfIconMorphComponent],
  template: '<gf-icon-morph [icon]="icono()" [spring]="resorte()" label="prueba" />',
})
class Anfitrion {
  readonly icono = signal<MorphIcon | undefined>(bellIcon);
  readonly resorte = signal<SpringPreset | undefined>(undefined);
}

interface Llamada {
  keyframes: Keyframe[];
}

/** Instala el espía y devuelve lo que se le fue entregando, en orden. */
function espiarAnimate(): { llamadas: Llamada[]; restaurar: () => void } {
  const llamadas: Llamada[] = [];
  const original = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
  // Lo mínimo que el llamador toca. `cancel` no hace nada porque no hay nada real que cancelar.
  const falsa = {
    cancel: () => undefined,
    finished: Promise.resolve(),
    playbackRate: 1,
    playState: 'running',
  };
  Object.defineProperty(Element.prototype, 'animate', {
    configurable: true,
    writable: true,
    value(keyframes: Keyframe[]) {
      llamadas.push({ keyframes });
      return falsa as unknown as Animation;
    },
  });
  return {
    llamadas,
    restaurar: () => {
      if (original) Object.defineProperty(Element.prototype, 'animate', original);
      else delete (Element.prototype as unknown as Record<string, unknown>)['animate'];
    },
  };
}

describe('<gf-icon-morph> — input spring', () => {
  let espia: ReturnType<typeof espiarAnimate>;

  beforeEach(() => (espia = espiarAnimate()));
  afterEach(() => espia.restaurar());

  /** Monta con `preset`, cambia el icono y devuelve los keyframes que recibió el navegador. */
  async function transicionar(preset?: SpringPreset): Promise<Keyframe[]> {
    const fixture = TestBed.createComponent(Anfitrion);
    fixture.componentInstance.resorte.set(preset);
    await fixture.whenStable();
    const antes = espia.llamadas.length;
    fixture.componentInstance.icono.set(bellRingIcon);
    await fixture.whenStable();
    return espia.llamadas[antes]?.keyframes ?? [];
  }

  it('el primer valor se pinta estático: no hay desde dónde transicionar', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('path')?.getAttribute('d'),
    ).toBeTruthy();
    expect(espia.llamadas).toEqual([]);
  });

  it('sin `spring` usa el default de la librería: `smooth`, que no rebota', async () => {
    // Un resorte crítico no sobrepasa, así que no hay poses extra: salen exactamente los pasos.
    expect((await transicionar()).length).toBe(PASOS_DEFAULT);
  });

  it('`bouncy` y `snappy` entregan MÁS poses que `smooth` — la etiqueta cumple', async () => {
    const smooth = (await transicionar('smooth')).length;
    expect(smooth).toBe(PASOS_DEFAULT);
    // Si esto se rompe, el componente aceptó el nombre y no dibujó el rebote: exactamente la
    // trampa por la que estos presets estuvieron fuera de la superficie pública.
    expect((await transicionar('bouncy')).length).toBeGreaterThan(smooth);
    expect((await transicionar('snappy')).length).toBeGreaterThan(smooth);
  });

  it('los tres presets del catálogo son nombres válidos para el input', async () => {
    for (const nombre of Object.keys(SPRING_PRESETS) as SpringPreset[]) {
      expect((await transicionar(nombre)).length, nombre).toBeGreaterThanOrEqual(PASOS_DEFAULT);
    }
  });
});

describe('<gf-icon-morph> — input `live`', () => {
  @Component({
    imports: [GfIconMorphComponent],
    template: '<gf-icon-morph [icon]="icono()" [live]="true" label="prueba" />',
  })
  class AnfitrionVivo {
    readonly icono = signal<MorphIcon | undefined>(bellIcon);
  }

  /** `shapes` → data estilo Lucide — copia local del mismo patrón que ya usan
   *  `gf-icon-morph.component.ts` y `live-morph.spec.ts` (`aIconNode`). */
  function aIconNode(icono: MorphIcon): [string, Record<string, string | number>][] {
    // Replica de `aIconInput`: descarta las figuras que el icono no enseña en reposo.
  return icono.shapes.filter((s: IconShape) => s.opacity !== '0').map((s: IconShape) => {
      const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
      const limpio: Record<string, string | number> = {};
      for (const [k, v] of Object.entries(attrs))
        if (v !== undefined) limpio[k] = v as string | number;
      return [tag, limpio];
    });
  }

  /**
   * La pose EXACTA que pinta el motor en vivo en su primer frame (t=0) de un morph `desde` →
   * `hacia`: mismo pipeline resample → plan → interpolar → serializar que usa `motorVivo`
   * internamente (`live-morph.ts`). Sirve de control cruzado — comparar contra `canonicalD` NO
   * serviría, es otro formato por completo (curvas `C` de la geometría original, no la polilínea
   * `M…L…` que emite un frame en vuelo; ver el comentario de cabecera en `core/serialize.ts`).
   */
  function poseInicialDe(desde: MorphIcon, hacia: MorphIcon): string {
    const plan = buildPlan(resampleIcon(aIconNode(desde)), resampleIcon(aIconNode(hacia)));
    const out = allocOutputs(plan);
    interpPolar(plan, 0, out);
    return serialize(
      out,
      plan.items.map((it) => it.closed),
    );
  }

  let espiaAnimate: ReturnType<typeof espiarAnimate>;
  let raf: ReturnType<typeof espiarRaf>;

  // Mismo criterio que el describe de arriba (`espia`/`beforeEach`/`afterEach`): si un `expect`
  // truena a media prueba, un `restaurar()` al final del cuerpo del test NUNCA se ejecuta y los dos
  // parches globales (`Element.prototype.animate`, `requestAnimationFrame`) quedan corruptos para
  // TODO lo que corra después en este archivo — un solo fallo real se disfraza de cascada de fallos
  // ajenos.
  beforeEach(() => {
    espiaAnimate = espiarAnimate();
    raf = espiarRaf();
  });

  afterEach(() => {
    espiaAnimate.restaurar();
    raf.restaurar();
  });

  it('en modo vivo NUNCA llama a `animate` — usa requestAnimationFrame en su lugar', async () => {
    const fixture = TestBed.createComponent(AnfitrionVivo);
    await fixture.whenStable();

    fixture.componentInstance.icono.set(bellRingIcon);
    await fixture.whenStable();
    raf.avanzar(16);

    expect(espiaAnimate.llamadas).toEqual([]);
    // Deja el morph asentar/destruirse: `live-morph.ts` guarda su scheduler en un singleton de
    // MÓDULO (un `Set` de tickers + un solo rAF compartido). Si este test terminara con un morph
    // todavía volando, el SIGUIENTE `espiarRaf()` instalaría su propio mock mientras `rafId` del
    // módulo sigue distinto de 0 — `agregarTicker` vería `rafId !== 0` y nunca pediría un frame
    // NUEVO contra el mock recién instalado, dejando ese test siguiente ciego a sus propios
    // avances. `fixture.destroy()` fuerza `ngOnDestroy` → `motorVivo.destroy()` → `quitarTicker`,
    // que deja el scheduler compartido limpio para el próximo test.
    fixture.destroy();
  });

  it('el primer valor se pinta estático igual que en modo horneado', async () => {
    const fixture = TestBed.createComponent(AnfitrionVivo);
    await fixture.whenStable();

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('path')?.getAttribute('d'),
    ).toBeTruthy();
    fixture.destroy();
  });

  it('destruir el componente no deja un ticker vivo', async () => {
    const fixture = TestBed.createComponent(AnfitrionVivo);
    await fixture.whenStable();
    fixture.componentInstance.icono.set(bellRingIcon);
    await fixture.whenStable();
    // Primer frame: fija `ultimo` en el scheduler y deja el resorte volando, sin asentar (un solo
    // frame con dt=0 no alcanza a asentar un resorte que arranca en x=0).
    raf.avanzar(16);

    const figura = (fixture.nativeElement as HTMLElement).querySelector('path')!;
    fixture.destroy();
    const dTrasDestruir = figura.getAttribute('d');

    // `expect(...).not.toThrow()` NO sirve aquí: avanzar un frame sobre un ticker fantasma escribe
    // en un elemento desmontado pero perfectamente válido — no revienta exista o no el bug. Lo que
    // sí lo delata es el CONTENIDO: si `ngOnDestroy` no hubiera llamado `motorVivo.destroy()`, este
    // segundo frame (dt > 0 porque `ultimo` ya quedó fijado arriba, no en su valor inicial -1)
    // seguiría integrando el resorte y `d` cambiaría. Con el ticker bien dado de baja, este avance
    // no toca nada — `d` se queda exactamente igual.
    raf.avanzar(32);
    expect(figura.getAttribute('d')).toBe(dTrasDestruir);
  });

  it('retomar el modo vivo tras una interrupción estática arranca desde la pose actual, no desde el último vuelo', async () => {
    // `animationsEnabled` vivo (getter): mismo patrón que `gf-icon.component.spec.ts` para
    // apagarlo/prenderlo a media sesión sin remontar el componente.
    const config = {
      activo: true,
      get animationsEnabled(): boolean {
        return this.activo;
      },
    };
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AnfitrionVivo],
      providers: [provideGfIcons(config)],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnfitrionVivo);
    await fixture.whenStable(); // pinta bellIcon (A): primer valor, todavía sin `motorVivo`

    // A → B en vivo: crea `motorVivo`; su `objetivo` interno queda en B (bellRingIcon).
    fixture.componentInstance.icono.set(bellRingIcon);
    await fixture.whenStable();

    // El interruptor se apaga A MEDIA SESIÓN (la config es viva, se relee en cada `ngOnChanges`):
    // B → C toma el atajo estático de `!animacionesActivas`.
    config.activo = false;
    fixture.componentInstance.icono.set(bellOffIcon);
    await fixture.whenStable();

    // Vuelve la animación — C → D tiene que replanear desde C. Si el atajo estático de arriba
    // hubiera escrito el `d` a mano sin avisarle a `motorVivo` (el bug que arregla este commit),
    // este vuelo arrancaría todavía desde B —el último `objetivo` que `motorVivo` conoció— y la
    // figura saltaría hacia atrás en vez de continuar desde lo que el usuario ve en pantalla.
    config.activo = true;
    fixture.componentInstance.icono.set(bellCheckIcon);
    await fixture.whenStable();
    // Primer tick del vuelo nuevo: `agregarTicker` resetea `ultimo` al registrar, así que este
    // frame SIEMPRE calcula dt=0 sin importar qué timestamp se le pase — pinta exactamente t=0 del
    // plan, que es la pose de origen byte a byte (mismo criterio que ya usa `live-morph.spec.ts`
    // para probar interrupciones).
    raf.avanzar(1000);

    const figura = (fixture.nativeElement as HTMLElement).querySelector('path')!;
    expect(figura.getAttribute('d')).toBe(poseInicialDe(bellOffIcon, bellCheckIcon));
    // Control cruzado: que la aserción de arriba no pase por casualidad de formato. Si el bug
    // estuviera presente, la pose sería la del vuelo roto (arrancando desde B), no la de C.
    expect(figura.getAttribute('d')).not.toBe(poseInicialDe(bellRingIcon, bellCheckIcon));

    fixture.destroy();
  });
});
