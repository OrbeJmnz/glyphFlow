import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { bellIcon, bellRingIcon } from 'glyphflow';
import { morphKeyframes } from 'glyphflow/morph';
import { aIconNode } from './icon-node';
import { MorphScrubber, RESORTE_LENTO } from './morph-scrubber';
import { providersI18nTest } from '../../core/i18n-testing';
import labEn from '../../../i18n/lab/en.json';
import labEs from '../../../i18n/lab/es.json';

/**
 * Lo que se prueba es el CABLEADO del scrubber: que arranque en pausa con los keyframes correctos,
 * que el deslizador mueva `currentTime` y que el ciclo de vida cancele lo que dejó vivo.
 *
 * Mismo patrón que `gf-icon-morph.component.spec.ts`: se espía `animate` porque el entorno de
 * tests no trae WAAPI.
 */
@Component({
  imports: [MorphScrubber],
  template: '<app-morph-scrubber [origen]="origen()" [destino]="destino()" />',
})
class Anfitrion {
  readonly origen = signal(bellIcon);
  readonly destino = signal(bellRingIcon);
}

interface FakeAnim {
  keyframes: Keyframe[];
  options: unknown;
  currentTime: number;
  pausada: boolean;
  cancel: () => void;
  pause: () => void;
}

function espiarAnimate(): { animaciones: FakeAnim[]; restaurar: () => void } {
  const animaciones: FakeAnim[] = [];
  const original = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
  Object.defineProperty(Element.prototype, 'animate', {
    configurable: true,
    writable: true,
    value(keyframes: Keyframe[], options: unknown) {
      const fake: FakeAnim = {
        keyframes,
        options,
        currentTime: 0,
        pausada: false,
        cancel: () => undefined,
        pause() {
          this.pausada = true;
        },
      };
      animaciones.push(fake);
      return fake as unknown as Animation;
    },
  });
  return {
    animaciones,
    restaurar: () => {
      if (original) Object.defineProperty(Element.prototype, 'animate', original);
      else delete (Element.prototype as unknown as Record<string, unknown>)['animate'];
    },
  };
}

describe('<app-morph-scrubber>', () => {
  let espia: ReturnType<typeof espiarAnimate>;

  beforeEach(async () => {
    espia = espiarAnimate();
    await TestBed.configureTestingModule({
      imports: [Anfitrion, providersI18nTest({ 'lab/en': labEn, 'lab/es': labEs })],
    }).compileComponents();
  });
  afterEach(() => espia.restaurar());

  it('arranca en pausa con los keyframes del par elegido', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();

    expect(espia.animaciones.length).toBe(1);
    const esperado = morphKeyframes(aIconNode(bellIcon), aIconNode(bellRingIcon), {
      spring: RESORTE_LENTO,
    }).keyframes;
    expect(espia.animaciones[0].keyframes).toEqual(esperado);
    expect(espia.animaciones[0].pausada).toBe(true);
  });

  it('arrastrar el deslizador a la mitad mueve el playhead a la mitad de la duración', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();

    const rango = (fixture.nativeElement as HTMLElement).querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    rango.value = '500';
    rango.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    // El componente redondea la duración a ms enteros ANTES de repartirla — así el contador que
    // se ve y el `currentTime` que de verdad se mueve coinciden exacto, sin un residuo de
    // fracción de ms entre los dos.
    const { duration } = morphKeyframes(aIconNode(bellIcon), aIconNode(bellRingIcon), {
      spring: RESORTE_LENTO,
    });
    expect(espia.animaciones[0].currentTime).toBe(Math.round(duration) / 2);
  });

  it('cambiar el par cancela la animación anterior y construye una nueva', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();

    let cancelada = false;
    espia.animaciones[0].cancel = () => (cancelada = true);
    fixture.componentInstance.destino.set(bellIcon);
    await fixture.whenStable();

    expect(cancelada).toBe(true);
    expect(espia.animaciones.length).toBe(2);
  });

  it('al destruirse cancela la animación en curso', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();

    let cancelada = false;
    espia.animaciones[0].cancel = () => (cancelada = true);
    fixture.destroy();

    expect(cancelada).toBe(true);
  });
});
