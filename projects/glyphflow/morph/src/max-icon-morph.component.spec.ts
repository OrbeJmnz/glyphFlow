import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { bellIcon, bellRingIcon } from 'glyphflow';
import { MaxIconMorphComponent, type MorphIcon } from './max-icon-morph.component';
import { PASOS_DEFAULT, SPRING_PRESETS, type SpringPreset } from './morph-keyframes';

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
  imports: [MaxIconMorphComponent],
  template: '<max-icon-morph [icon]="icono()" [spring]="resorte()" label="prueba" />',
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

describe('<max-icon-morph> — input spring', () => {
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
