import { TestBed } from '@angular/core/testing';
import { playIcon } from 'glyphflow';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { eleccionMovimiento } from '../../core/movimiento';
import { providersI18nTest } from '../../core/i18n-testing';
import iconosEn from '../../../i18n/iconos/en.json';
import iconosEs from '../../../i18n/iconos/es.json';
import { IconScrubber } from './icon-scrubber';

/*
 * jsdom no implementa Web Animations API (`Element.prototype.animate` no existe) — mismo límite
 * que ya documenta `gf-icon.component.spec.ts` en la librería. Por eso este spec no prueba que el
 * transporte SÍ reproduzca de verdad (eso solo se ve en el navegador, ver la verificación manual
 * del ticket), sino que el nuevo código es inocuo sin WAAPI y que el candado de `hayMovimiento()`
 * no revienta nada al llamarlo en cualquier orden.
 */
describe('IconScrubber — transporte', () => {
  beforeEach(async () => {
    expect(typeof Element.prototype.animate).not.toBe('function');
    eleccionMovimiento.set(null);
    await TestBed.configureTestingModule({
      imports: [IconScrubber, providersI18nTest({ 'iconos/en': iconosEn, 'iconos/es': iconosEs })],
    }).compileComponents();
  });

  afterEach(() => {
    eleccionMovimiento.set(null);
  });

  async function montar() {
    const fixture = TestBed.createComponent(IconScrubber);
    fixture.componentRef.setInput('def', playIcon);
    fixture.componentRef.setInput('variante', 'default');
    await fixture.whenStable();
    return fixture;
  }

  it('sin WAAPI, reproducir/pausar/reiniciar no truenan y no marcan reproduciendo', async () => {
    eleccionMovimiento.set('on');
    const fixture = await montar();
    const cmp = fixture.componentInstance;

    // Sin `Animation`s que reproducir, el candado de `!this.animaciones.length` ya basta —
    // `hayMovimiento()` en `true` no debería colar nada igual.
    expect(cmp['reproduciendo']()).toBe(false);

    expect(() => cmp['reproducir']()).not.toThrow();
    expect(cmp['reproduciendo']()).toBe(false);

    expect(() => cmp['alternarTransporte']()).not.toThrow();
    expect(() => cmp['reiniciar']()).not.toThrow();
    expect(cmp['progreso']()).toBe(0);
  });

  it('con movimiento apagado, reproducir tampoco truena', async () => {
    eleccionMovimiento.set('off');
    const fixture = await montar();
    const cmp = fixture.componentInstance;

    expect(cmp['reproduciendo']()).toBe(false);
    expect(() => cmp['reproducir']()).not.toThrow();
    expect(cmp['reproduciendo']()).toBe(false);
  });

  it('cambiar de variante no truena aunque no haya WAAPI para reconstruir', async () => {
    const fixture = await montar();
    fixture.componentRef.setInput('variante', 'next');
    expect(() => fixture.detectChanges()).not.toThrow();
    await fixture.whenStable();
    expect(fixture.componentInstance['reproduciendo']()).toBe(false);
  });
});
