import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * La semilla de la preferencia se lee AL CARGAR el módulo — tiene que estar puesta antes del primer
 * pintado, igual que el tema. Así que probarla obliga a reimportar con el entorno ya falseado; con
 * un import normal, la primera prueba fijaría el valor para todas las demás.
 */
async function cargar(opciones: { reducido: boolean; guardado?: string }) {
  vi.resetModules();
  localStorage.clear();
  if (opciones.guardado) localStorage.setItem('gf:motion', opciones.guardado);

  vi.stubGlobal('matchMedia', (consulta: string) => ({
    matches: consulta.includes('prefers-reduced-motion') && opciones.reducido,
    // `vi.fn()` y no `() => {}`: el lint prohíbe funciones vacías, y además así se puede
    // afirmar si el módulo se suscribió al cambio de preferencia.
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

  return import('./movimiento');
}

describe('movimiento', () => {
  // Mismo criterio que `tema.spec.ts`: `document.documentElement` es compartido entre specs, y
  // `leerPreferenciaDelSistema()` mira `data-motion` ANTES que `matchMedia` — un valor que dejó
  // pegado otra prueba (o el `conectarMovimiento()` real de `app.ts` en un spec que monta el shell)
  // secuestra el resultado sin que el mock de `matchMedia` de aquí importe para nada.
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-motion');
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
    document.documentElement.removeAttribute('data-motion');
  });

  it('sin elección previa, manda el sistema', async () => {
    const quieto = await cargar({ reducido: true });
    expect(quieto.hayMovimiento()).toBe(false);
    expect(quieto.siguiendoAlSistema()).toBe(true);

    const animado = await cargar({ reducido: false });
    expect(animado.hayMovimiento()).toBe(true);
    expect(animado.siguiendoAlSistema()).toBe(true);
  });

  it('la elección manual le GANA al sistema, en los dos sentidos', async () => {
    // Es el requisito del ticket, y el que se pierde si alguien "simplifica" esto a un booleano:
    // sin el tercer estado no hay forma de contradecir a la media query.
    const insiste = await cargar({ reducido: true, guardado: 'on' });
    expect(insiste.hayMovimiento()).toBe(true);
    expect(insiste.siguiendoAlSistema()).toBe(false);

    const apaga = await cargar({ reducido: false, guardado: 'off' });
    expect(apaga.hayMovimiento()).toBe(false);
    expect(apaga.siguiendoAlSistema()).toBe(false);
  });

  it('un valor basura en el storage no cuenta como elección', async () => {
    const m = await cargar({ reducido: true, guardado: 'siempre' });
    expect(m.siguiendoAlSistema()).toBe(true);
    expect(m.hayMovimiento()).toBe(false);
  });

  it('alternar persiste y sobrevive a una recarga', async () => {
    const m = await cargar({ reducido: false });
    m.alternarMovimiento();

    expect(m.hayMovimiento()).toBe(false);
    expect(localStorage.getItem('gf:motion')).toBe('off');

    // La "recarga": se vuelve a cargar el módulo con el storage tal cual quedó.
    vi.resetModules();
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const trasRecargar = await import('./movimiento');
    expect(trasRecargar.hayMovimiento()).toBe(false);
  });

  it('alternar desde el estado que puso el sistema arranca en el contrario', async () => {
    const m = await cargar({ reducido: true });
    expect(m.hayMovimiento()).toBe(false);

    m.alternarMovimiento();
    expect(m.hayMovimiento()).toBe(true);
    expect(localStorage.getItem('gf:motion')).toBe('on');
  });
});
