import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { NoEncontrado } from './no-encontrado';
import { providersI18nTest } from '../../core/i18n-testing';
import noEncontradoEn from '../../../i18n/no-encontrado/en.json';
import noEncontradoEs from '../../../i18n/no-encontrado/es.json';

describe('NoEncontrado', () => {
  async function montar() {
    await TestBed.configureTestingModule({
      imports: [
        NoEncontrado,
        providersI18nTest({ 'noEncontrado/en': noEncontradoEn, 'noEncontrado/es': noEncontradoEs }),
      ],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(NoEncontrado);
    await fixture.whenStable();
    return fixture;
  }

  it('muestra el título y la descripción', async () => {
    const fixture = await montar();
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain('Page not found');
  });

  it('buscar navega al inicio con el término como query param `q`', async () => {
    const fixture = await montar();
    const router = TestBed.inject(Router);
    const espia = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    const campo = fixture.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;
    campo.value = 'bell';
    campo.dispatchEvent(new Event('input'));
    fixture.nativeElement
      .querySelector('form')
      ?.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();

    expect(espia).toHaveBeenCalledWith(['/en'], { queryParams: { q: 'bell' } });
  });

  it('un término vacío no navega a ningún lado', async () => {
    const fixture = await montar();
    const router = TestBed.inject(Router);
    const espia = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture.nativeElement
      .querySelector('form')
      ?.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();

    expect(espia).not.toHaveBeenCalled();
  });

  it('«ir atrás» llama a history.back()', async () => {
    const fixture = await montar();
    const espia = vi.spyOn(window.history, 'back').mockImplementation(() => undefined);

    const botones = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button'),
    );
    const boton = botones.find((b) => b.textContent?.includes('Go back')) as HTMLButtonElement;
    boton.click();

    expect(espia).toHaveBeenCalled();
    espia.mockRestore();
  });

  it('«ir al inicio» apunta a la ruta de iconos del idioma activo', async () => {
    const fixture = await montar();
    const enlace = fixture.nativeElement.querySelector('a[href]') as HTMLAnchorElement;
    expect(enlace.getAttribute('href')).toBe('/en');
  });
});
