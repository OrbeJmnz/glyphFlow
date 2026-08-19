import { TestBed } from '@angular/core/testing';
import { Patrones } from './patrones';

/** Cada patrón afirma hacer algo real. Esto verifica que el estado se mueva de verdad. */
describe('Patrones', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Patrones] }).compileComponents();
  });

  function montar() {
    const fixture = TestBed.createComponent(Patrones);
    fixture.detectChanges();
    return { fixture, html: fixture.nativeElement as HTMLElement };
  }

  function boton(html: HTMLElement, i: number): HTMLButtonElement {
    return html.querySelectorAll<HTMLButtonElement>('.demo .boton')[i];
  }

  it('pinta los cuatro patrones, cada uno con su snippet', () => {
    const { html } = montar();
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

    const { fixture, html } = montar();
    boton(html, 0).click();
    await fixture.whenStable();
    expect(escrito).toBe('npm i glyphflow');
    expect(html.querySelector('.boton.hecho')).not.toBeNull();
  });

  it('si el portapapeles falla, el botón NO se pone en «copiado»', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('sin permiso')) },
    });

    const { fixture, html } = montar();
    boton(html, 0).click();
    await fixture.whenStable();
    // La trampa que esto cierra: confirmar con una palomita algo que nunca pasó.
    expect(html.querySelector('.boton.hecho')).toBeNull();
    expect(html.querySelector('.demo .boton')?.textContent?.trim()).toBe('Copiar');
  });

  it('el tema cambia solo su panel, no el resto de la página', async () => {
    const { fixture, html } = montar();
    const panel = html.querySelectorAll('.demo')[1];
    expect(panel.classList.contains('claro')).toBe(false);
    boton(html, 1).click();
    await fixture.whenStable();
    expect(panel.classList.contains('claro')).toBe(true);
    // Nada fuera del panel se enteró: es la limitación que la propia tarjeta declara.
    expect(html.querySelectorAll('.claro').length).toBe(1);
  });

  it('me gusta mueve el conteo en los dos sentidos', async () => {
    const { fixture, html } = montar();
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
    vi.useFakeTimers();
    try {
      const { fixture, html } = montar();
      const btn = html.querySelectorAll<HTMLButtonElement>('.demo .boton')[2];
      expect(btn.textContent?.trim()).toBe('Enviar');

      btn.click();
      fixture.detectChanges();
      expect(btn.textContent?.trim()).toBe('Enviando…');
      expect(btn.disabled).toBe(true);

      vi.advanceTimersByTime(1200);
      fixture.detectChanges();
      expect(btn.textContent?.trim()).toBe('Enviado');

      vi.advanceTimersByTime(2000);
      fixture.detectChanges();
      expect(btn.textContent?.trim()).toBe('Enviar');
      expect(btn.disabled).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
