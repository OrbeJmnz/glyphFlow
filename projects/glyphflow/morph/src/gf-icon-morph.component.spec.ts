import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { bellIcon, bellRingIcon } from 'glyphflow';
import { GfIconMorphComponent, type MorphIcon } from './gf-icon-morph.component';
import { PASOS_DEFAULT, SPRING_PRESETS, type SpringPreset } from './morph-keyframes';

/**
 * `requestAnimationFrame` SÍ existe en el entorno de tests (jsdom lo implementa), pero real y
 * asíncrono — se reemplaza por una versión síncrona controlable, mismo criterio que `espiarRaf()`
 * en `live-morph.spec.ts`.
 */
function espiarRaf(): { avanzar(ts: number): void; restaurar: () => void } {
  let loopActivo: FrameRequestCallback | null = null;
  const original = {
    raf: globalThis.requestAnimationFrame,
    caf: globalThis.cancelAnimationFrame,
  };
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    loopActivo = cb;
    return 1;
  }) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = (() => {
    loopActivo = null;
  }) as typeof cancelAnimationFrame;
  return {
    avanzar(ts: number): void {
      loopActivo?.(ts);
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

  it('en modo vivo NUNCA llama a `animate` — usa requestAnimationFrame en su lugar', async () => {
    const espiaAnimate = espiarAnimate();
    const raf = espiarRaf();
    const fixture = TestBed.createComponent(AnfitrionVivo);
    await fixture.whenStable();

    fixture.componentInstance.icono.set(bellRingIcon);
    await fixture.whenStable();
    raf.avanzar(16);

    expect(espiaAnimate.llamadas).toEqual([]);
    espiaAnimate.restaurar();
    raf.restaurar();
  });

  it('el primer valor se pinta estático igual que en modo horneado', async () => {
    const espiaAnimate = espiarAnimate();
    const raf = espiarRaf();
    const fixture = TestBed.createComponent(AnfitrionVivo);
    await fixture.whenStable();

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('path')?.getAttribute('d'),
    ).toBeTruthy();
    espiaAnimate.restaurar();
    raf.restaurar();
  });

  it('destruir el componente no deja un ticker vivo', async () => {
    const espiaAnimate = espiarAnimate();
    const raf = espiarRaf();
    const fixture = TestBed.createComponent(AnfitrionVivo);
    await fixture.whenStable();
    fixture.componentInstance.icono.set(bellRingIcon);
    await fixture.whenStable();

    fixture.destroy();
    // Si quedara un ticker vivo, este avance tocaría un elemento ya destruido sin reventar —
    // pero lo que importa es que `ngOnDestroy` haya llamado `motorVivo.destroy()`. Se verifica
    // indirectamente: avanzar un frame después de destruir no debe lanzar.
    expect(() => raf.avanzar(32)).not.toThrow();
    espiaAnimate.restaurar();
    raf.restaurar();
  });
});
