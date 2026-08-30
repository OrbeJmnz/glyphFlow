import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { providersI18nTest } from '../../core/i18n-testing';
import { BloqueCodigo } from './bloque-codigo';

/*
 * `resaltado-codigo.ts` pinta `<span class="tok-...">` sobre el mismo texto que muestra `mostrado()`
 * -- el riesgo real es que el botón de copiar termine copiando ese HTML en vez del código plano que
 * el usuario ve. Este spec existe SOLO para blindar esa costura; el tokenizador en sí ya tiene su
 * propia tabla de casos en `resaltado-codigo.spec.ts`.
 */
describe('BloqueCodigo — copiar vs. resaltar', () => {
  const CODIGO = 'const x = "hola"; // nota';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueCodigo, providersI18nTest()],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resaltado() lleva HTML pero mostrado() se queda en texto plano', async () => {
    const fixture = TestBed.createComponent(BloqueCodigo);
    fixture.componentRef.setInput('codigo', CODIGO);
    await fixture.whenStable();
    const cmp = fixture.componentInstance;

    expect(cmp['mostrado']()).toBe(CODIGO);
    expect(cmp['resaltado']()).toContain('<span');
    expect(cmp['resaltado']()).not.toBe(CODIGO);
  });

  it('copiar() manda al portapapeles el texto plano, nunca el HTML resaltado', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const fixture = TestBed.createComponent(BloqueCodigo);
    fixture.componentRef.setInput('codigo', CODIGO);
    await fixture.whenStable();

    await fixture.componentInstance['copiar']();

    expect(writeText).toHaveBeenCalledWith(CODIGO);
    expect(writeText).not.toHaveBeenCalledWith(expect.stringContaining('<span'));
  });
});
