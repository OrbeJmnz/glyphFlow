import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { bellIcon, bellRingIcon, starIcon } from 'glyphflow';
import { morphAt } from 'glyphflow/morph';
import { aIconNode } from './icon-node';
import { MorphScrubber } from './morph-scrubber';
import { providersI18nTest } from '../../core/i18n-testing';
import labEn from '../../../i18n/lab/en.json';
import labEs from '../../../i18n/lab/es.json';

/**
 * Ya no hace falta espiar `animate`/WAAPI: `morphAt` es una función pura, así que se prueba
 * comparando el `d` pintado contra su resultado directo — sin maquinaria de animación de por
 * medio.
 */
@Component({
  imports: [MorphScrubber],
  template: '<app-morph-scrubber [origen]="origen()" [destino]="destino()" />',
})
class Anfitrion {
  readonly origen = signal(bellIcon);
  readonly destino = signal(bellRingIcon);
}

describe('<app-morph-scrubber>', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anfitrion, providersI18nTest({ 'lab/en': labEn, 'lab/es': labEs })],
    }).compileComponents();
  });

  function figura(html: HTMLElement): SVGPathElement {
    return html.querySelector('path') as SVGPathElement;
  }

  it('arranca en t=0: pinta el `d` canónico del origen', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();
    expect(figura(fixture.nativeElement).getAttribute('d')).toBe(
      morphAt(aIconNode(bellIcon), aIconNode(bellRingIcon), 0),
    );
  });

  it('arrastrar el deslizador pinta la pose EXACTA de morphAt en ese t', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();

    const rango = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    rango.value = '500';
    rango.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(figura(fixture.nativeElement).getAttribute('d')).toBe(
      morphAt(aIconNode(bellIcon), aIconNode(bellRingIcon), 0.5),
    );
  });

  it('cambiar el par vuelve el deslizador a 0 y pinta el nuevo origen', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();

    const rango = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    rango.value = '700';
    rango.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    fixture.componentInstance.destino.set(starIcon);
    await fixture.whenStable();

    expect(rango.value).toBe('0');
    expect(figura(fixture.nativeElement).getAttribute('d')).toBe(
      morphAt(aIconNode(bellIcon), aIconNode(starIcon), 0),
    );
  });
});
