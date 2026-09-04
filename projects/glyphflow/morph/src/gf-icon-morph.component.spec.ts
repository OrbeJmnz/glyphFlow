import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  bellCheckIcon,
  bellIcon,
  bellOffIcon,
  bellRingIcon,
  checkIcon,
  loaderCircleIcon,
  provideGfIcons,
  sparklesIcon,
  triangleAlertIcon,
  type IconShape,
} from 'glyphflow';
import {
  GfIconMorphComponent,
  type GfAsyncState,
  type MorphIcon,
} from './gf-icon-morph.component';
import { canonicalD, PASOS_DEFAULT, SPRING_PRESETS, type SpringPreset } from './morph-keyframes';
import {
  COPY_INTENT,
  EXPAND_COLLAPSE_INTENT,
  MENU_CLOSE_INTENT,
  PASSWORD_INTENT,
  PLAY_PAUSE_INTENT,
  THEME_INTENT,
} from './intents';
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
 * `shapes` → data estilo Lucide — replica de `aIconInput` del componente (privada), igual que la
 * que usa `live-morph.spec.ts`. Descarta las figuras que el icono no enseña en reposo.
 */
function aIconNode(icono: MorphIcon): [string, Record<string, string | number>][] {
  return icono.shapes
    .filter((s: IconShape) => s.opacity !== '0')
    .map((s: IconShape) => {
      const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
      const limpio: Record<string, string | number> = {};
      for (const [k, v] of Object.entries(attrs))
        if (v !== undefined) limpio[k] = v as string | number;
      return [tag, limpio];
    });
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
  /** Lo que se le pidió al navegador. Distingue un morph (un tiro) de un giro (`iterations: Infinity`). */
  options?: number | KeyframeAnimationOptions;
  /** Sobre QUÉ elemento. El giro no puede ir en el mismo `<path>` que el morph reescribe. */
  target: Element;
  /** La `Animation` devuelta. Mutable: los tests le mueven `currentTime` para simular el reloj. */
  animacion: AnimacionFalsa;
}

interface AnimacionFalsa {
  canceladas: number;
  currentTime: number;
  cancel(): void;
}

/** Instala el espía y devuelve lo que se le fue entregando, en orden. */
function espiarAnimate(): { llamadas: Llamada[]; restaurar: () => void } {
  const llamadas: Llamada[] = [];
  const original = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
  Object.defineProperty(Element.prototype, 'animate', {
    configurable: true,
    writable: true,
    value(this: Element, keyframes: Keyframe[], options?: number | KeyframeAnimationOptions) {
      // Lo mínimo que el llamador toca. `currentTime` lo mueven a mano los tests que simulan reloj.
      const animacion: AnimacionFalsa & Record<string, unknown> = {
        canceladas: 0,
        currentTime: 0,
        cancel(): void {
          this.canceladas++;
        },
        finished: Promise.resolve(),
        playbackRate: 1,
        playState: 'running',
      };
      llamadas.push({ keyframes, options, target: this, animacion });
      return animacion as unknown as Animation;
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

describe('<gf-icon-morph> — input `asyncState`', () => {
  @Component({
    imports: [GfIconMorphComponent],
    template: `<gf-icon-morph
      [asyncState]="estado()"
      [autoReset]="reset()"
      [idleIcon]="idle"
      [loadingIcon]="loading"
      [successIcon]="success"
      [errorIcon]="error"
      label="prueba"
    />`,
  })
  class AnfitrionAsync {
    readonly estado = signal<GfAsyncState>('idle');
    readonly reset = signal(0);
    readonly idle = sparklesIcon;
    readonly loading = loaderCircleIcon;
    readonly success = checkIcon;
    readonly error = triangleAlertIcon;
  }

  let espia: ReturnType<typeof espiarAnimate>;
  beforeEach(() => (espia = espiarAnimate()));
  afterEach(() => espia.restaurar());

  /** El `d` que hay pintado ahora mismo. */
  function dDe(fixture: { nativeElement: unknown }): string | null | undefined {
    return (fixture.nativeElement as HTMLElement).querySelector('path')?.getAttribute('d');
  }

  /** Las llamadas a `animate` que piden un bucle infinito: el giro, y nada más. */
  function giros(): Llamada[] {
    return espia.llamadas.filter(
      (l) => (l.options as KeyframeAnimationOptions | undefined)?.iterations === Infinity,
    );
  }

  it('el estado decide qué se pinta, sin pasar por el input `icon`', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();

    expect(dDe(fixture)).toBe(canonicalD(aIconNode(sparklesIcon)));
  });

  it('cambiar de estado morphea la figura, no la corta en seco', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    const antes = espia.llamadas.length;

    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();

    const morph = espia.llamadas.slice(antes).find((l) => 'd' in (l.keyframes[0] ?? {}));
    expect(morph, 'el cambio de estado no pasó por el motor de morph').toBeDefined();
    expect(morph!.keyframes.length).toBeGreaterThan(1);
  });

  it('mientras carga, la figura gira en bucle: un spinner no es un morph', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();

    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();

    // Un morph es UN tiro con final; un spinner no lo tiene. Implementarlo como "morph en bucle"
    // reproduce la transición una y otra vez — parpadea en vez de girar.
    expect(giros().length, 'el estado `loading` se quedó quieto').toBe(1);
    expect(giros()[0]!.keyframes.map((k) => k['transform'])).toEqual([
      'rotate(0deg)',
      'rotate(360deg)',
    ]);
  });

  it('el giro NO va sobre el `<path>`: el morph le reescribe el `transform` en el crossfade', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();

    // Dos animaciones sobre el `transform` del mismo elemento se pisan: gana la última en empezar,
    // así que el crossfade de `runMorph` mataría el giro (o al revés) sin que nadie se entere.
    expect(giros()[0]?.target.tagName).toBe('g');
  });

  it('al salir de `loading` el giro se detiene', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();

    fixture.componentInstance.estado.set('success');
    await fixture.whenStable();

    expect(
      giros()[0]?.animacion.canceladas,
      'el spinner sigue girando sobre un icono que ya dice «listo»',
    ).toBe(1);
  });

  /** Lleva el spinner a `fraccion` de vuelta y lo para; devuelve la animación de asentado. */
  async function pararEn(
    fixture: { componentInstance: AnfitrionAsync; whenStable(): Promise<unknown> },
    fraccion: number,
  ): Promise<{ llamada?: Llamada; vuelta: number }> {
    const vuelta = Number((giros()[0]!.options as KeyframeAnimationOptions).duration);
    giros()[0]!.animacion.currentTime = vuelta * fraccion;

    const antes = espia.llamadas.length;
    fixture.componentInstance.estado.set('success');
    await fixture.whenStable();

    return {
      llamada: espia.llamadas
        .slice(antes)
        .find((l) => 'transform' in ((l.keyframes[0] ?? {}) as Record<string, unknown>)),
      vuelta,
    };
  }

  it('parar el giro asienta la figura, no la deja dando vueltas con la respuesta ya puesta', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();

    // Un cuarto de vuelta: el camino corto al reposo es RETROCEDER 90°, no seguir 270° más.
    const { llamada, vuelta } = await pararEn(fixture, 0.25);

    expect(llamada, 'el giro se cortó en seco: 90° de salto en un solo frame').toBeDefined();
    expect(llamada!.keyframes.map((k) => k['transform'])).toEqual(['rotate(90deg)', 'rotate(0deg)']);
    // LO IMPORTANTE: parar tiene que durar poco. Completar la vuelta a velocidad constante deja la
    // palomita girando hasta un segundo DESPUÉS de que la respuesta ya está en pantalla.
    expect(
      Number((llamada!.options as KeyframeAnimationOptions).duration),
      'asentarse tarda más que media vuelta: la respuesta llega y el icono sigue girando',
    ).toBeLessThan(vuelta / 2);
  });

  it('pasado el medio giro asienta hacia adelante, sin retroceder media vuelta', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();

    const { llamada } = await pararEn(fixture, 0.75);

    expect(llamada!.keyframes.map((k) => k['transform'])).toEqual([
      'rotate(270deg)',
      'rotate(360deg)',
    ]);
  });

  /** Lleva el componente hasta un estado terminal pasando por `loading`, como en la vida real. */
  async function hasta(
    fixture: { componentInstance: AnfitrionAsync; whenStable(): Promise<unknown> },
    estado: 'success' | 'error',
    autoReset = 0,
  ): Promise<void> {
    fixture.componentInstance.reset.set(autoReset);
    await fixture.whenStable();
    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();
    fixture.componentInstance.estado.set(estado);
    await fixture.whenStable();
  }

  it('`autoReset` vuelve a idle solo: el consumidor no agenda el regreso', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    await hasta(fixture, 'success', 20);
    expect(dDe(fixture)).toBe(canonicalD(aIconNode(checkIcon)));

    await new Promise((listo) => setTimeout(listo, 60));
    await fixture.whenStable();

    expect(dDe(fixture), 'el «listo» se quedó pegado en pantalla para siempre').toBe(
      canonicalD(aIconNode(sparklesIcon)),
    );
  });

  it('sin `autoReset` el estado terminal se queda: apagarlo es el default', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    await hasta(fixture, 'success');

    await new Promise((listo) => setTimeout(listo, 60));
    await fixture.whenStable();

    expect(dDe(fixture)).toBe(canonicalD(aIconNode(checkIcon)));
  });

  it('`error` también vuelve solo: los dos estados terminales se comportan igual', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    await hasta(fixture, 'error', 20);
    expect(dDe(fixture)).toBe(canonicalD(aIconNode(triangleAlertIcon)));

    await new Promise((listo) => setTimeout(listo, 60));
    await fixture.whenStable();

    expect(dDe(fixture)).toBe(canonicalD(aIconNode(sparklesIcon)));
  });

  it('un `loading` nuevo mata el regreso pendiente del ciclo anterior', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    await hasta(fixture, 'success', 40);

    // Segundo ciclo ANTES de que venza el regreso del primero.
    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();
    await new Promise((listo) => setTimeout(listo, 80));
    await fixture.whenStable();

    // Si el temporizador viejo hubiera sobrevivido, habría pisado la carga en curso con el icono
    // de reposo: el spinner desaparecería solo a mitad de una operación que sigue viva.
    expect(dDe(fixture), 'el regreso del ciclo anterior disparó encima del nuevo').toBe(
      canonicalD(aIconNode(loaderCircleIcon)),
    );
  });

  it('`asyncState` manda sobre `icon`: un solo dueño del `<path>`', async () => {
    @Component({
      imports: [GfIconMorphComponent],
      template: `<gf-icon-morph [icon]="bell" [asyncState]="'success'" [successIcon]="check" />`,
    })
    class AnfitrionDoble {
      readonly bell = bellIcon;
      readonly check = checkIcon;
    }

    const fixture = TestBed.createComponent(AnfitrionDoble);
    await fixture.whenStable();

    expect(dDe(fixture)).toBe(canonicalD(aIconNode(checkIcon)));
  });

  it('con movimiento reducido el icono de carga SE PINTA, solo no gira', async () => {
    const original = window.matchMedia;
    window.matchMedia = ((consulta: string) => ({
      matches: consulta.includes('prefers-reduced-motion'),
      media: consulta,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    })) as unknown as typeof window.matchMedia;

    try {
      const fixture = TestBed.createComponent(AnfitrionAsync);
      await fixture.whenStable();
      fixture.componentInstance.estado.set('loading');
      await fixture.whenStable();

      // El estado es INFORMACIÓN, no adorno: quitarle el movimiento no puede quitarle el mensaje.
      expect(dDe(fixture)).toBe(canonicalD(aIconNode(loaderCircleIcon)));
      expect(giros().length, 'giró pese a `prefers-reduced-motion`').toBe(0);
    } finally {
      window.matchMedia = original;
    }
  });

  it('destruir el componente no deja el giro corriendo', async () => {
    const fixture = TestBed.createComponent(AnfitrionAsync);
    await fixture.whenStable();
    fixture.componentInstance.estado.set('loading');
    await fixture.whenStable();

    fixture.destroy();

    expect(giros()[0]?.animacion.canceladas).toBe(1);
  });
});

describe('<gf-icon-morph> — input `intent`', () => {
  @Component({
    imports: [GfIconMorphComponent],
    template: `<gf-icon-morph
      [intent]="copiar"
      [active]="activo()"
      [autoReset]="reset()"
      label="copiar"
    />`,
  })
  class AnfitrionIntent {
    readonly copiar = COPY_INTENT;
    readonly activo = signal(false);
    readonly reset = signal<number | undefined>(undefined);
  }

  let espia: ReturnType<typeof espiarAnimate>;
  beforeEach(() => (espia = espiarAnimate()));
  afterEach(() => espia.restaurar());

  function dDe(fixture: { nativeElement: unknown }): string | null | undefined {
    return (fixture.nativeElement as HTMLElement).querySelector('path')?.getAttribute('d');
  }

  it('en reposo pinta la figura `idle` del intent', async () => {
    const fixture = TestBed.createComponent(AnfitrionIntent);
    await fixture.whenStable();

    expect(dDe(fixture)).toBe(canonicalD(aIconNode(COPY_INTENT.idle)));
  });

  it('activarlo morfea a la figura `active`: el binding ES el estado', async () => {
    const fixture = TestBed.createComponent(AnfitrionIntent);
    await fixture.whenStable();

    fixture.componentInstance.activo.set(true);
    await fixture.whenStable();

    expect(dDe(fixture)).toBe(canonicalD(aIconNode(COPY_INTENT.active)));
  });

  it('el intent trae su propio resorte: no hay que repetirlo en cada plantilla', async () => {
    const fixture = TestBed.createComponent(AnfitrionIntent);
    await fixture.whenStable();
    const antes = espia.llamadas.length;

    fixture.componentInstance.activo.set(true);
    await fixture.whenStable();

    // `COPY_INTENT` pide `snappy`, que sobrepasa: entrega MÁS poses que los pasos base. Si el
    // resorte del intent no llegara al motor, saldrían exactamente PASOS_DEFAULT.
    const morph = espia.llamadas.slice(antes).find((l) => 'd' in ((l.keyframes[0] ?? {}) as object));
    expect(morph!.keyframes.length).toBeGreaterThan(PASOS_DEFAULT);
  });

  it('`COPY_INTENT` vuelve solo a reposo sin escribir `autoReset` en la plantilla', async () => {
    const fixture = TestBed.createComponent(AnfitrionIntent);
    await fixture.whenStable();
    fixture.componentInstance.activo.set(true);
    await fixture.whenStable();
    expect(dDe(fixture)).toBe(canonicalD(aIconNode(COPY_INTENT.active)));

    await new Promise((listo) => setTimeout(listo, (COPY_INTENT.autoReset ?? 0) + 40));
    await fixture.whenStable();

    expect(dDe(fixture), 'el «copiado» se quedó pegado').toBe(
      canonicalD(aIconNode(COPY_INTENT.idle)),
    );
  });

  it('un `autoReset` explícito gana sobre el del intent, y `0` significa apagarlo', async () => {
    const fixture = TestBed.createComponent(AnfitrionIntent);
    // `0` es un valor legítimo, no «sin fijar»: mismo centinela que ya mordió con `animation`.
    fixture.componentInstance.reset.set(0);
    await fixture.whenStable();
    fixture.componentInstance.activo.set(true);
    await fixture.whenStable();

    await new Promise((listo) => setTimeout(listo, (COPY_INTENT.autoReset ?? 0) + 40));
    await fixture.whenStable();

    expect(dDe(fixture), '`autoReset=0` no apagó el regreso que traía el intent').toBe(
      canonicalD(aIconNode(COPY_INTENT.active)),
    );
  });

  it('los seis intents del catálogo traen par completo y son distintos entre sí', () => {
    const todos = [
      COPY_INTENT,
      THEME_INTENT,
      PASSWORD_INTENT,
      PLAY_PAUSE_INTENT,
      MENU_CLOSE_INTENT,
      EXPAND_COLLAPSE_INTENT,
    ];
    for (const intent of todos) {
      expect(intent.idle.shapes.length).toBeGreaterThan(0);
      expect(intent.active.shapes.length).toBeGreaterThan(0);
      // Un intent cuyas dos figuras sean la misma no comunica nada al cambiar de estado.
      expect(canonicalD(aIconNode(intent.idle))).not.toBe(canonicalD(aIconNode(intent.active)));
    }
  });
});
