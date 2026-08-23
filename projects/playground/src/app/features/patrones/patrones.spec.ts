import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { providersI18nTest } from '../../core/i18n-testing';
import { Patrones } from './patrones';
import patronesEn from '../../../i18n/patrones/en.json';
import patronesEs from '../../../i18n/patrones/es.json';

/** Cada patrón afirma hacer algo real. Esto verifica que el estado se mueva de verdad. */
describe('Patrones', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // `Patrones` vive en el scope `patrones` (ver `app.routes.ts`) — el módulo de testing
      // acepta la clave con scope incluido directo. Ver `core/i18n-testing.ts`.
      imports: [
        Patrones,
        providersI18nTest({ 'patrones/en': patronesEn, 'patrones/es': patronesEs }),
      ],
      // La nota que enlaza a la referencia de API usa `routerLink`, y sin router el componente ni
      // siquiera monta.
      providers: [provideRouter([])],
    }).compileComponents();
  });

  async function montar() {
    const fixture = TestBed.createComponent(Patrones);
    await fixture.whenStable();
    return { fixture, html: fixture.nativeElement as HTMLElement };
  }

  function boton(html: HTMLElement, i: number): HTMLButtonElement {
    return html.querySelectorAll<HTMLButtonElement>('.demo button.ui-boton')[i];
  }

  it('pinta los cuatro patrones, cada uno con su snippet', async () => {
    const { html } = await montar();
    expect(html.querySelectorAll('.patron').length).toBe(4);
    expect(html.querySelectorAll('.patron pre code').length).toBe(4);
  });

  it('copiar escribe en el portapapeles de verdad y vuelve solo', async () => {
    let escrito = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (t: string) => {
          escrito = t;
          return Promise.resolve();
        },
      },
    });

    const { fixture, html } = await montar();
    boton(html, 0).click();
    await fixture.whenStable();
    expect(escrito).toBe('npm i glyphflow');
    expect(html.querySelector('button.ui-boton.hecho')).not.toBeNull();
  });

  it('si el portapapeles falla, el botón NO se pone en «copiado»', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('sin permiso')) },
    });

    const { fixture, html } = await montar();
    boton(html, 0).click();
    await fixture.whenStable();
    // La trampa que esto cierra: confirmar con una palomita algo que nunca pasó.
    expect(html.querySelector('button.ui-boton.hecho')).toBeNull();
    expect(html.querySelector('.demo button.ui-boton')?.textContent?.trim()).toBe('Copy');
  });

  it('el tema cambia solo su panel, no el resto de la página', async () => {
    const { fixture, html } = await montar();
    const panel = html.querySelectorAll('.demo')[1];
    expect(panel.classList.contains('claro')).toBe(false);
    boton(html, 1).click();
    await fixture.whenStable();
    expect(panel.classList.contains('claro')).toBe(true);
    // Nada fuera del panel se enteró: es la limitación que la propia tarjeta declara.
    expect(html.querySelectorAll('.claro').length).toBe(1);
  });

  it('me gusta mueve el conteo en los dos sentidos', async () => {
    const { fixture, html } = await montar();
    const btn = html.querySelector<HTMLButtonElement>('.me-gusta')!;
    const votos = () => Number(btn.textContent?.trim());
    const inicial = votos();
    btn.click();
    await fixture.whenStable();
    expect(votos()).toBe(inicial + 1);
    btn.click();
    await fixture.whenStable();
    expect(votos()).toBe(inicial);
  });

  it('enviar pasa por los tres estados y regresa a reposo', async () => {
    // `useFakeTimers` DESPUÉS de montar, no antes: `montar()` espera un tick real
    // (`whenStable()`), y con timers falsos activos desde el arranque esa espera no se resuelve.
    const { fixture, html } = await montar();
    vi.useFakeTimers();
    try {
      const btn = html.querySelectorAll<HTMLButtonElement>('.demo button.ui-boton')[2];
      expect(btn.textContent?.trim()).toBe('Send');

      btn.click();
      fixture.detectChanges();
      expect(btn.textContent?.trim()).toBe('Sending…');
      expect(btn.disabled).toBe(true);

      vi.advanceTimersByTime(1200);
      fixture.detectChanges();
      expect(btn.textContent?.trim()).toBe('Sent');

      vi.advanceTimersByTime(2000);
      fixture.detectChanges();
      expect(btn.textContent?.trim()).toBe('Send');
      expect(btn.disabled).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
