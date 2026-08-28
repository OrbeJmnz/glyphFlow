import { describe, expect, it } from 'vitest';
import { TOPE_URL, aFragmento, deFragmento, type EstadoEditor } from './estado-url';

/**
 * Lo que se prueba es el VIAJE COMPLETO, no el formato: un enlace sirve si lo que sale al otro
 * lado es lo que entró, y el resto —qué compresor, qué alfabeto— puede cambiar sin que a nadie le
 * importe mientras eso se cumpla.
 *
 * La otra mitad es la entrada hostil. El fragmento llega de una URL que pudo escribir cualquiera,
 * así que cada forma de venir roto tiene que acabar en `null` y no en una excepción que se lleve
 * por delante el arranque del editor.
 */
describe('estado en la URL', () => {
  const HEART: EstadoEditor = {
    icono: 'heart',
    paths: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
  };

  it('lo que entra es lo que sale', async () => {
    const ida = await aFragmento(HEART);
    expect(await deFragmento(ida)).toEqual(HEART);
  });

  it('aguanta varios paths y los devuelve en orden', async () => {
    const varios: EstadoEditor = { icono: 'bell', paths: ['M1 1h2', 'M3 3v4', 'M5 5 6 6'] };
    expect(await deFragmento(await aFragmento(varios))).toEqual(varios);
  });

  it('comprime de verdad — un icono real cabe de sobra en el tope', async () => {
    const fragmento = await aFragmento(HEART);
    expect(fragmento.length).toBeLessThan(TOPE_URL);
    // Y comprimido pesa menos que el JSON en claro, que es la razón de comprimirlo.
    expect(fragmento.length).toBeLessThan(JSON.stringify(HEART).length);
  });

  it('sin paths no hay enlace que dar', async () => {
    expect(await aFragmento({ icono: 'heart', paths: [] })).toBe('');
  });

  it('devuelve null ante cualquier fragmento que no sea suyo o venga roto', async () => {
    for (const basura of [
      '',
      'algo',
      '#e1.1abc',
      'e1.1no-es-base64-valido!!',
      // base64url válido que descomprime a JSON válido pero de otra forma
      'e1.0' + btoa('{"a":1}').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
      // un array de un solo elemento: hay icono pero ningún path
      'e1.0' + btoa('["heart"]').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
      // el icono no es texto
      'e1.0' + btoa('[3,"M1 1"]').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
    ]) {
      expect(await deFragmento(basura), basura).toBeNull();
    }
  });

  it('un path enorme se serializa igual — decidir si cabe es de quien lo va a enseñar', async () => {
    const enorme: EstadoEditor = { icono: 'x', paths: [Array.from({ length: 400 }, (_, i) => `L${i} ${i}`).join(' ')] };
    const fragmento = await aFragmento(enorme);
    expect(await deFragmento(fragmento)).toEqual(enorme);
    // Este sí pasa del tope: es el caso en el que el editor ofrece el archivo en vez del enlace.
    expect(fragmento.length).toBeGreaterThan(0);
  });
});
