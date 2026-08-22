import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cargarEstrellas,
  conteoVisible,
  estrellas,
  formatearEstrellas,
  UMBRAL_ESTRELLAS,
} from './github';

/** Respuesta mínima de `fetch` con lo que el servicio consume. */
function respuesta(cuerpo: unknown, ok = true): Response {
  return { ok, json: async () => cuerpo } as Response;
}

describe('estrellas de GitHub', () => {
  beforeEach(() => {
    estrellas.set(null);
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('formatea sin depender del locale de quien mira', () => {
    // Nada de `Intl`: su separador cambia con el idioma del visitante y el mismo número se vería
    // distinto según quién entre.
    expect(formatearEstrellas(0)).toBe('0');
    expect(formatearEstrellas(999)).toBe('999');
    expect(formatearEstrellas(1000)).toBe('1k');
    expect(formatearEstrellas(1240)).toBe('1.2k');
    expect(formatearEstrellas(12500)).toBe('12.5k');
  });

  it('no enseña un conteo que juega en contra', () => {
    // Los tres estados que tienen que verse IGUAL de vacíos: no se sabe todavía, no se pudo saber,
    // y se sabe pero el número es tan bajo que decirlo resta.
    estrellas.set(null);
    expect(conteoVisible()).toBeNull();

    estrellas.set(0);
    expect(conteoVisible()).toBeNull();

    estrellas.set(UMBRAL_ESTRELLAS - 1);
    expect(conteoVisible()).toBeNull();

    // Desde el umbral, hacia arriba, el número deja de ser un problema y pasa a ser el argumento.
    estrellas.set(UMBRAL_ESTRELLAS);
    expect(conteoVisible()).toBe(UMBRAL_ESTRELLAS);

    estrellas.set(1240);
    expect(conteoVisible()).toBe(1240);
  });

  it('publica el conteo y lo guarda para el resto de la sesión', async () => {
    const fetchFalso = vi.fn().mockResolvedValue(respuesta({ stargazers_count: 42 }));
    vi.stubGlobal('fetch', fetchFalso);

    await cargarEstrellas();
    expect(estrellas()).toBe(42);

    // Segunda llamada: sale del caché, sin tocar la red. Es lo que evita agotar las 60 peticiones
    // por hora que da la API sin token — que se cuentan por IP, no por visitante.
    estrellas.set(null);
    await cargarEstrellas();
    expect(estrellas()).toBe(42);
    expect(fetchFalso).toHaveBeenCalledTimes(1);
  });

  it('si la API responde 403 por cuota, el conteo se queda sin saberse', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respuesta({}, false)));

    await cargarEstrellas();

    // `null`, no 0: son cosas distintas. Un 0 pintaría «0 estrellas», que sería mentir.
    expect(estrellas()).toBeNull();
    expect(sessionStorage.getItem('gf:estrellas')).toBeNull();
  });

  it('sin red no truena — es un caso normal, no un error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    await expect(cargarEstrellas()).resolves.toBeUndefined();
    expect(estrellas()).toBeNull();
  });

  it('ignora un caché corrupto en vez de arrastrar el fallo', async () => {
    sessionStorage.setItem('gf:estrellas', 'esto no es json');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respuesta({ stargazers_count: 7 })));

    await cargarEstrellas();

    expect(estrellas()).toBe(7);
  });
});
